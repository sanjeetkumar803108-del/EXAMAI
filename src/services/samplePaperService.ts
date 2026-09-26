import { db } from '../lib/firebase';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { get as idbGet, set as idbSet } from 'idb-keyval';
import { safeGetItem, safeSetItem } from '../utils/storage';
import { APSamplePaper } from '../types/samplePapers';
import { getApiUrl } from '../utils/api';
import defaultSamplePapersData from '../data/defaultSamplePapers.json';

const IDB_PAPERS_KEY = 'ap_sample_papers_permanent_vault_v1';
const CACHE_KEY = 'ap_sample_papers_cache';
const COLLECTION_NAME = 'ap_sample_papers';
const CHUNKS_COLLECTION = 'ap_sample_paper_chunks';
const CHUNK_SIZE = 500000; // 500KB per chunk to safely stay within Firestore's 1MB limit

/**
 * Fetch all AP Sample Papers.
 * Reads from:
 * 1. Permanent IndexedDB storage (instant, holds large base64 PDFs without quota limits)
 * 2. Static bundled sample papers seed (CALC AB Unit 1 Notes, guaranteed available on first run)
 * 3. Server Vault API (/api/sample-papers)
 * 4. Cloud Firestore (with automatic chunk reassembly for large PDFs)
 *
 * Merges and permanently writes to IndexedDB so all users always keep the papers permanently.
 */
export async function fetchSamplePapers(): Promise<APSamplePaper[]> {
  const papersMap = new Map<string, APSamplePaper>();

  // 1. Seed with built-in default sample papers (guaranteed baseline even on fresh install)
  try {
    if (Array.isArray(defaultSamplePapersData)) {
      (defaultSamplePapersData as APSamplePaper[]).forEach(p => {
        if (p && p.id) {
          papersMap.set(p.id, p);
        }
      });
    }
  } catch (seedErr) {
    console.warn('[SamplePaperService] Seed papers parse notice:', seedErr);
  }

  // 2. Load from permanent IndexedDB (never lost across reloads/app restarts)
  let idbPapers: APSamplePaper[] = [];
  try {
    const stored = await idbGet<APSamplePaper[]>(IDB_PAPERS_KEY);
    if (Array.isArray(stored) && stored.length > 0) {
      idbPapers = stored;
      idbPapers.forEach(p => {
        if (p && p.id) papersMap.set(p.id, p);
      });
    }
  } catch (idbErr) {
    console.warn('[SamplePaperService] IndexedDB read notice:', idbErr);
  }

  // 3. Fallback: check localStorage cache for any legacy papers
  try {
    const legacyCached = getCachedSamplePapers();
    legacyCached.forEach(p => {
      if (p && p.id && !papersMap.has(p.id)) {
        papersMap.set(p.id, p);
      }
    });
  } catch (legacyErr) {
    console.warn('[SamplePaperService] Legacy cache notice:', legacyErr);
  }

  // 4. Fetch from Cloud Backend Vault API
  let serverPapers: APSamplePaper[] = [];
  try {
    const res = await fetch(getApiUrl('/api/sample-papers'), {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.papers)) {
        serverPapers = json.papers;
        serverPapers.forEach((p: APSamplePaper) => {
          if (p && p.id) papersMap.set(p.id, p);
        });
      }
    }
  } catch (apiErr) {
    console.warn('[SamplePaperService] Cloud API fetch notice:', apiErr);
  }

  // 5. Fetch from Cloud Firestore (with automatic chunk reassembly)
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (!snapshot.empty) {
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data() as any;
        const id = docSnap.id || data.id;

        // If paper was stored in multiple chunks due to >800KB size
        if (data.isChunked && data.chunkCount && data.chunkCount > 0) {
          try {
            const chunkPromises: Promise<any>[] = [];
            for (let i = 0; i < data.chunkCount; i++) {
              chunkPromises.push(getDoc(doc(db, CHUNKS_COLLECTION, `${id}_chunk_${i}`)));
            }
            const chunkSnaps = await Promise.all(chunkPromises);
            const fullPdfUrl = chunkSnaps.map(cs => cs.data()?.chunk || '').join('');
            if (fullPdfUrl) {
              papersMap.set(id, {
                ...data,
                id,
                pdfUrl: fullPdfUrl
              });
              continue;
            }
          } catch (chunkErr) {
            console.warn(`[SamplePaperService] Failed to reassemble chunks for paper ${id}:`, chunkErr);
          }
        }

        if (data.pdfUrl) {
          papersMap.set(id, { ...data, id });
        }
      }
    }
  } catch (firestoreErr) {
    console.warn('[SamplePaperService] Firestore fetch notice:', firestoreErr);
  }

  const mergedPapers = Array.from(papersMap.values()).sort(
    (a, b) => (b.uploadedAt || 0) - (a.uploadedAt || 0)
  );

  // 6. PERMANENT SAVE: Persist to IndexedDB so papers are permanently available offline for all users
  if (mergedPapers.length > 0) {
    try {
      await idbSet(IDB_PAPERS_KEY, mergedPapers);
    } catch (saveIdbErr) {
      console.warn('[SamplePaperService] Failed to save merged papers to IndexedDB:', saveIdbErr);
    }

    // Also update localStorage cache if size allows
    try {
      safeSetItem(CACHE_KEY, JSON.stringify(mergedPapers));
    } catch {
      // localStorage may fail if >5MB; IndexedDB already holds the permanent copy
    }
  }

  // 7. Background Auto-Sync to Cloud:
  // If this device has any local paper not yet on server vault or Firestore, sync it
  if (mergedPapers.length > 0) {
    const serverIds = new Set(serverPapers.map(p => p.id));
    const unsynced = mergedPapers.filter(p => !serverIds.has(p.id) && p.pdfUrl);
    if (unsynced.length > 0) {
      for (const paper of unsynced) {
        syncPaperToCloud(paper).catch(console.warn);
      }
    }
  }

  return mergedPapers;
}

/**
 * Helper to sync a paper to both Cloud Server Vault and Firestore (with chunking support).
 */
async function syncPaperToCloud(paper: APSamplePaper): Promise<void> {
  // A. Post to Cloud Server Vault
  try {
    await fetch(getApiUrl('/api/sample-papers'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paper)
    });
    console.log(`[SamplePaperService] Synced '${paper.title}' to cloud vault.`);
  } catch (e) {
    console.warn(`[SamplePaperService] Could not sync paper to server vault:`, e);
  }

  // B. Save to Firestore with chunking support
  try {
    const pdf = paper.pdfUrl || '';
    if (pdf.length <= CHUNK_SIZE) {
      // Fits safely inside a single Firestore document (<1MB)
      const docRef = doc(db, COLLECTION_NAME, paper.id);
      await setDoc(docRef, { ...paper, isChunked: false }, { merge: true });
    } else {
      // Exceeds single doc size - split into safe chunks in CHUNKS_COLLECTION
      const chunks: string[] = [];
      for (let i = 0; i < pdf.length; i += CHUNK_SIZE) {
        chunks.push(pdf.substring(i, i + CHUNK_SIZE));
      }

      // 1. Upload chunks
      const uploadPromises = chunks.map((chunk, index) => {
        const chunkDocRef = doc(db, CHUNKS_COLLECTION, `${paper.id}_chunk_${index}`);
        return setDoc(chunkDocRef, {
          paperId: paper.id,
          index,
          chunk
        });
      });
      await Promise.all(uploadPromises);

      // 2. Upload metadata root document
      const metaDocRef = doc(db, COLLECTION_NAME, paper.id);
      const { pdfUrl: _removed, ...metadataOnly } = paper;
      await setDoc(metaDocRef, {
        ...metadataOnly,
        isChunked: true,
        chunkCount: chunks.length,
        totalLength: pdf.length
      }, { merge: true });

      console.log(`[SamplePaperService] Successfully chunked & uploaded '${paper.title}' (${chunks.length} chunks) to Firestore.`);
    }
  } catch (e) {
    console.warn(`[SamplePaperService] Could not sync paper to Firestore:`, e);
  }
}

/**
 * Upload a new AP Sample Paper.
 * Saves immediately to IndexedDB (permanent local), Cloud Server Vault, and Firestore.
 */
export async function uploadSamplePaper(paperData: Omit<APSamplePaper, 'id' | 'uploadedAt'>): Promise<APSamplePaper> {
  const id = `paper_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const paper: APSamplePaper = {
    ...paperData,
    id,
    uploadedAt: Date.now(),
    uploadedBy: 'sanjeetkumar803108@gmail.com'
  };

  // 1. Save to permanent IndexedDB first for instant UI response and persistence
  try {
    const currentStored = (await idbGet<APSamplePaper[]>(IDB_PAPERS_KEY)) || [];
    const updated = [paper, ...currentStored.filter(p => p.id !== id)];
    await idbSet(IDB_PAPERS_KEY, updated);
  } catch (e) {
    console.error('[SamplePaperService] Failed to save to IndexedDB:', e);
  }

  // 2. Update localStorage cache if it fits
  try {
    const existing = getCachedSamplePapers();
    const updated = [paper, ...existing.filter(p => p.id !== id)];
    safeSetItem(CACHE_KEY, JSON.stringify(updated));
  } catch {
    // Non-fatal if localStorage overflows
  }

  // 3. Persist to Cloud Server and Firestore
  await syncPaperToCloud(paper);

  return paper;
}

/**
 * Delete a sample paper by ID.
 */
export async function deleteSamplePaper(id: string): Promise<void> {
  // 1. Remove from permanent IndexedDB
  try {
    const currentStored = (await idbGet<APSamplePaper[]>(IDB_PAPERS_KEY)) || [];
    const updated = currentStored.filter(p => p.id !== id);
    await idbSet(IDB_PAPERS_KEY, updated);
  } catch (e) {
    console.error('[SamplePaperService] IndexedDB delete error:', e);
  }

  // 2. Remove from localStorage cache
  try {
    const existing = getCachedSamplePapers();
    const updated = existing.filter(p => p.id !== id);
    safeSetItem(CACHE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('[SamplePaperService] Cache delete error:', e);
  }

  // 3. Remove from Cloud Server Vault
  try {
    await fetch(getApiUrl(`/api/sample-papers/${id}`), {
      method: 'DELETE'
    });
  } catch (e) {
    console.warn('[SamplePaperService] Server delete error:', e);
  }

  // 4. Remove from Firestore (metadata doc + chunks)
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.warn('[SamplePaperService] Firestore delete error:', error);
  }
}

/**
 * Get cached sample papers synchronously (fallback helper).
 */
export function getCachedSamplePapers(): APSamplePaper[] {
  try {
    const cached = safeGetItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.error('[SamplePaperService] Local read error:', e);
  }
  return [];
}

