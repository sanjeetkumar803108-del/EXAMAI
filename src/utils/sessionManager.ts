import { db } from '../lib/firebase';
import { doc, setDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { safeGetItem, safeSetItem } from './storage';
import { Capacitor } from '@capacitor/core';

const SESSION_TOKEN_KEY = 'study_active_session_token';
const DEVICE_ID_KEY = 'study_unique_device_id';

let lastClaimTimestamp = 0;

/**
 * Retrieves or generates a persistent device hardware/browser ID for this client.
 */
export function getPersistentDeviceId(): string {
  let devId = safeGetItem(DEVICE_ID_KEY);
  if (!devId) {
    const platform = Capacitor.getPlatform();
    const rand = Math.random().toString(36).substring(2, 9);
    devId = `dev_${platform}_${Date.now()}_${rand}`;
    safeSetItem(DEVICE_ID_KEY, devId);
  }
  return devId;
}

/**
 * Generates a unique session token for this specific login session.
 */
export function generateSessionToken(): string {
  const devId = getPersistentDeviceId();
  const time = Date.now();
  const rand = Math.random().toString(36).substring(2, 7);
  return `${devId}_sess_${time}_${rand}`;
}

/**
 * Gets the current active session token for this window/app instance.
 * Checks sessionStorage first (to isolate multiple tabs in the same browser if needed),
 * then falls back to localStorage (for persistent mobile app restarts).
 */
export function getLocalSessionToken(): string {
  let token: string | null = null;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      token = window.sessionStorage.getItem(SESSION_TOKEN_KEY);
    } catch {}
  }
  if (!token) {
    token = safeGetItem(SESSION_TOKEN_KEY);
  }
  return token || '';
}

/**
 * Saves the session token locally.
 */
export function setLocalSessionToken(token: string): void {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      window.sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    } catch {}
  }
  safeSetItem(SESSION_TOKEN_KEY, token);
}

/**
 * Clears local session token on logout.
 */
export function clearLocalSessionToken(): void {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      window.sessionStorage.removeItem(SESSION_TOKEN_KEY);
    } catch {}
  }
  try {
    localStorage.removeItem(SESSION_TOKEN_KEY);
  } catch {}
}

/**
 * Claims the single active session in Firestore for this user.
 * Overwrites any previous session, causing any other logged-in device to be logged out.
 */
export async function claimUserSession(userId: string): Promise<string> {
  if (!userId) return '';
  const token = generateSessionToken();
  setLocalSessionToken(token);
  lastClaimTimestamp = Date.now();

  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      activeSessionId_apexam: token,
      lastSessionLoginAt_apexam: new Date().toISOString(),
      lastDevicePlatform: Capacitor.getPlatform(),
      lastDeviceId: getPersistentDeviceId()
    }, { merge: true });
    console.log(`[SingleSession] Claimed active session in Firestore for ${userId}: ${token}`);
  } catch (err) {
    console.warn('[SingleSession] Failed to write activeSessionId to Firestore:', err);
  }

  return token;
}

/**
 * Releases the active session in Firestore (e.g. on manual logout).
 */
export async function releaseUserSession(userId: string): Promise<void> {
  clearLocalSessionToken();
  lastClaimTimestamp = 0;
  if (!userId) return;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      activeSessionId_apexam: '',
      lastSessionLogoutAt_apexam: new Date().toISOString()
    }, { merge: true });
    console.log(`[SingleSession] Cleanly released session in Firestore for ${userId}`);
  } catch (err) {
    console.warn('[SingleSession] Failed to release session in Firestore:', err);
  }
}

/**
 * Real-time listener for remote session revocation.
 * Guarantees that:
 * 1. Initial snapshot during login does NOT cause false kickout while write propagates.
 * 2. Only triggers revocation if this client's token was already established in Firestore
 *    AND another device writes a different non-empty activeSessionId.
 */
export function subscribeToSessionRevocation(
  userId: string,
  onRevoked: (remoteTime?: string) => void
): Unsubscribe {
  const userRef = doc(db, 'users', userId);
  let isSessionEstablished = false;

  return onSnapshot(userRef, (snapshot) => {
    if (!snapshot.exists()) return;

    const data = snapshot.data();
    const remoteSessionId = data?.activeSessionId_apexam;
    const localSessionId = getLocalSessionToken();

    // 1. If local session token is empty, this client hasn't established an active login yet
    if (!localSessionId) {
      return;
    }

    // 2. If remote matches local, our active session is officially established and confirmed in Firestore
    if (remoteSessionId && remoteSessionId === localSessionId) {
      isSessionEstablished = true;
      return;
    }

    // 3. Grace window right after claiming: if we just claimed a session within the last 5 seconds,
    // wait for our write to sync to Firestore instead of falsely kicking ourselves out
    if (Date.now() - lastClaimTimestamp < 5000) {
      if (remoteSessionId === localSessionId) {
        isSessionEstablished = true;
      }
      return;
    }

    // 4. Remote takeover detected:
    // If another device claimed a session while this app was open or active,
    // activeSessionId in Firestore will now point to that other device's token.
    if (remoteSessionId && remoteSessionId !== localSessionId) {
      console.warn(`[SingleSession] REVOKED! Remote: ${remoteSessionId} vs Local: ${localSessionId}`);
      onRevoked(data?.lastSessionLoginAt_apexam || data?.lastSessionLoginAt);
    }
  }, (err) => {
    console.warn('[SingleSession] Firestore snapshot notice:', err?.message || err);
  });
}

