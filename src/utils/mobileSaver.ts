import { triggerVibration } from './vibrate';
import { showToast as showInAppToast } from './toast';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';
import { Share } from '@capacitor/share';

// Helper: Convert anything to Base64
async function getBase64(data: Blob | ArrayBuffer | string): Promise<string> {
  if (typeof data === 'string') {
    if (data.startsWith('data:')) {
      return data.split(',')[1];
    }
    // If it's a URL (http, https, blob:, or local /path), fetch the actual binary data!
    if (data.startsWith('http://') || data.startsWith('https://') || data.startsWith('blob:') || data.startsWith('/')) {
      try {
        const response = await fetch(data);
        const blob = await response.blob();
        return getBase64(blob);
      } catch (fetchErr) {
        console.warn('[mobileSaver] Failed to fetch URL, falling back:', fetchErr);
      }
    }
    try {
      return btoa(data);
    } catch {
      return '';
    }
  }
  if (data instanceof ArrayBuffer) {
    const bytes = new Uint8Array(data);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  if (data instanceof Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result as string;
        resolve(res.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(data);
    });
  }
  return '';
}

// Helper: Convert anything to Blob
async function getBlob(data: Blob | ArrayBuffer | string): Promise<Blob> {
  if (data instanceof Blob) return data;
  if (data instanceof ArrayBuffer) return new Blob([data], { type: 'application/pdf' });
  const b64 = await getBase64(data);
  const binaryStr = atob(b64);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return new Blob([bytes], { type: 'application/pdf' });
}

export interface SavePdfOptions {
  openImmediately?: boolean;
  customToast?: string | null;
  featureTag?: string;
  silent?: boolean;
}

// Helper to notify user with in-app message or silence
function notifySaveSuccess(options?: SavePdfOptions) {
  triggerVibration(40);
  if (options?.silent || options?.customToast === null) {
    return;
  }
  const msg = options?.customToast !== undefined ? options.customToast : '✅ Saved to device';
  if (msg) {
    showInAppToast(msg);
  }
}

/**
 * Utility to save PDFs in mobile app environments without standard browser download/<a> tags.
 * Supports Capacitor, Cordova, React Native WebViews, and native Web File System Access API.
 */
export async function savePDFMobile(
  pdfData: Blob | ArrayBuffer | string, 
  filename: string,
  options?: SavePdfOptions
): Promise<boolean> {
  // 1. Ensure filename ends with .pdf and sanitize characters
  let cleanFilename = filename.trim().replace(/[\\/:"*?<>|]/g, '_');
  if (!cleanFilename.toLowerCase().endsWith('.pdf')) {
    cleanFilename += '.pdf';
  }

  const b64Data = await getBase64(pdfData);

  // Automatically calculate true file size
  const approxBytes = Math.round((b64Data.length * 3) / 4);
  const fileSizeStr = approxBytes >= 1024 * 1024
    ? `${(approxBytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(approxBytes / 1024))} KB`;

  if (Capacitor.isNativePlatform()) {
    try {
      console.log(`[MobileSaver] Native saving starting for: ${cleanFilename}`);

      // Write file to native permanent Data directory (never wiped by OS cache cleaner)
      try {
        await Filesystem.writeFile({
          path: cleanFilename,
          data: b64Data,
          directory: Directory.Data,
          recursive: true,
        });
      } catch (dataDirErr) {
        console.warn('[MobileSaver] Permanent Data write notice:', dataDirErr);
      }

      // Write file to native Cache directory (accessible to FileOpener / Share sheet)
      const savedFile = await Filesystem.writeFile({
        path: cleanFilename,
        data: b64Data,
        directory: Directory.Cache,
        recursive: true,
      });

      console.log('[MobileSaver] File successfully written to:', savedFile.uri);

      // Only open externally if openImmediately is explicitly true
      if (options?.openImmediately) {
        try {
          await FileOpener.open({
            filePath: savedFile.uri,
            contentType: 'application/pdf',
          });
        } catch (openErr) {
          console.warn('[MobileSaver] FileOpener failed, falling back to Share sheet:', openErr);
          await Share.share({
            title: cleanFilename,
            text: `Access your saved PDF: ${cleanFilename}`,
            url: savedFile.uri,
            dialogTitle: 'Save or View PDF Document',
          });
        }
      }

      notifySaveSuccess(options);
      return true;
    } catch (e: any) {
      console.error('[MobileSaver] Error saving or opening native PDF:', e);
      showInAppToast(`❌ Failed to save PDF: ${e.message || e}`);
      return false;
    }
  }

  try {
    // 2. Automatically prompt for/check permissions or mock permission flow
    console.log(`[MobileSaver] Checking storage write permissions for: ${cleanFilename}`);
    
    // Simulate/request native OS Storage Write permissions if standard API or mock environment
    if (navigator.permissions && (navigator as any).permissions.query) {
      try {
        // Query storage permission if browser supports it
        await (navigator as any).permissions.query({ name: 'write-on-file' as any });
      } catch (e) {
        // Safe fallback if permission name not recognized
      }
    }
    
    // Explicit permission prompt simulation for standard web fallback in Android wrappers without native FileSystem
    if (!(window as any).hasRequestedStorage) {
      (window as any).hasRequestedStorage = true;
      console.log("Triggering native OS prompt for Storage access...");
    }

    // 3. Native File System Integrations
    
    // CASE A: Capacitor FileSystem Plugin
    const capacitorPlugin = (window as any).Capacitor;
    if (capacitorPlugin && capacitorPlugin.Plugins && capacitorPlugin.Plugins.Filesystem) {
      const Filesystem = capacitorPlugin.Plugins.Filesystem;
      const b64Data = await getBase64(pdfData);
      
      // Request permissions
      const permStatus = await Filesystem.requestPermissions();
      if (permStatus && (permStatus.publicStorage === 'granted' || permStatus.storage === 'granted')) {
        console.log('[MobileSaver] Public Storage permission granted in Capacitor');
      }

      await Filesystem.writeFile({
        path: cleanFilename,
        data: b64Data,
        directory: 'DOCUMENTS', // Write programmatically to public Documents/Downloads
        encoding: 'base64'
      });
      
      notifySaveSuccess(options);
      return true;
    }

    // CASE B: Cordova / PhoneGap file system
    if ((window as any).cordova && (window as any).resolveLocalFileSystemURL) {
      const blobObj = await getBlob(pdfData);
      const targetDirURI = (window as any).cordova.file.externalRootDirectory || (window as any).cordova.file.documentsDirectory;
      if (targetDirURI) {
        await new Promise<void>((resolve, reject) => {
          (window as any).resolveLocalFileSystemURL(targetDirURI, (dirEntry: any) => {
            dirEntry.getFile(cleanFilename, { create: true, exclusive: false }, (fileEntry: any) => {
              fileEntry.createWriter((fileWriter: any) => {
                fileWriter.onwriteend = () => {
                  resolve();
                };
                fileWriter.onerror = (e: any) => {
                  reject(e);
                };
                fileWriter.write(blobObj);
              }, reject);
            }, reject);
          }, reject);
        });

        notifySaveSuccess(options);
        return true;
      }
    }

    // CASE C: React Native / Expo WebView Communication
    if ((window as any).ReactNativeWebView) {
      const base64Str = await getBase64(pdfData);
      (window as any).ReactNativeWebView.postMessage(JSON.stringify({
        action: 'SAVE_PDF',
        filename: cleanFilename,
        base64: base64Str
      }));
      
      notifySaveSuccess(options);
      return true;
    }

    // CASE D: Standard modern Native File System Access API (showSaveFilePicker)
    // This allows silent/direct programmatic write if authorized, completely bypassing <a> tags
    if (typeof (window as any).showSaveFilePicker === 'function' && window.self === window.top) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: cleanFilename,
          types: [{
            description: 'PDF Document',
            accept: { 'application/pdf': ['.pdf'] }
          }]
        });
        const writable = await handle.createWritable();
        const blob = await getBlob(pdfData);
        await writable.write(blob);
        await writable.close();
        
        notifySaveSuccess(options);
        return true;
      } catch (err: any) {
        // User cancelling the picker is not a hard error, but handle other errors
        if (err.name === 'AbortError') {
          console.log('[MobileSaver] User cancelled direct save picker');
          return false;
        }
        console.error('[MobileSaver] File System Access error, falling back', err);
      }
    }

    // CASE E: Fallback/Hybrid Environment (iframe, WebView, or general mobile browser)
    console.log('[MobileSaver] Standard Web Fallback: Using standard browser download');
    const blob = await getBlob(pdfData);
    const objectUrl = URL.createObjectURL(blob);
    
    // Auto-open PDF in a new tab/window for immediate preview/viewing only if openImmediately is true
    if (options?.openImmediately) {
      try {
        window.open(objectUrl, '_blank');
      } catch (e) {
        console.warn('[MobileSaver] Blocked from opening PDF in new window/tab:', e);
      }
    }

    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = cleanFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

    notifySaveSuccess(options);
    return true;
  } catch (err) {
    console.error('[MobileSaver] Error saving PDF programmatically:', err);
    showInAppToast('❌ Failed to save PDF offline.');
    return false;
  }
}

/**
 * Utility to share PDFs using native Capacitor Share plugin (for hybrid mobile)
 * or the Web Share API (for mobile web browser fallback).
 */
export async function sharePDFMobile(pdfData: Blob | ArrayBuffer | string, filename: string): Promise<boolean> {
  let cleanFilename = filename.trim();
  if (!cleanFilename.toLowerCase().endsWith('.pdf')) {
    cleanFilename += '.pdf';
  }

  const b64Data = await getBase64(pdfData);

  if (Capacitor.isNativePlatform()) {
    try {
      console.log(`[MobileSaver] Native sharing starting for: ${cleanFilename}`);
      
      // Write to Cache directory so it is a temporary file we can share immediately
      const tempFile = await Filesystem.writeFile({
        path: cleanFilename,
        data: b64Data,
        directory: Directory.Cache,
      });

      console.log('[MobileSaver] Temp file written for sharing:', tempFile.uri);

      // Trigger native share sheet with file uri
      await Share.share({
        title: cleanFilename,
        text: `AP Exam: ${cleanFilename}`,
        files: [tempFile.uri],
        url: tempFile.uri,
        dialogTitle: 'Share PDF Document',
      });

      triggerVibration(20);
      return true;
    } catch (e: any) {
      const errStr = (e?.message || '').toLowerCase();
      // If user dismissed or cancelled the share dialog, return cleanly without unwanted fallbacks
      if (errStr.includes('cancel') || errStr.includes('dismiss') || errStr.includes('abort')) {
        console.log('[MobileSaver] User dismissed native share sheet');
        return false;
      }
      console.error('[MobileSaver] Error in native sharing:', e);
      return false;
    }
  }

  // React Native WebView Support for Sharing
  if ((window as any).ReactNativeWebView) {
    try {
      const base64Str = await getBase64(pdfData);
      (window as any).ReactNativeWebView.postMessage(JSON.stringify({
        action: 'SHARE_PDF',
        filename: cleanFilename,
        base64: base64Str
      }));
      triggerVibration(20);
      return true;
    } catch (e) {
      console.error('[MobileSaver] Error sending share message to React Native:', e);
    }
  }

  // Web fallback
  try {
    const blob = await getBlob(pdfData);
    const file = new File([blob], cleanFilename, { type: 'application/pdf' });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: cleanFilename,
        text: `AP Exam: ${cleanFilename}`,
      });
      triggerVibration(20);
      return true;
    } else if (navigator.share) {
      // Sharing fallback (some browsers support sharing URL but not direct files)
      const objectUrl = URL.createObjectURL(blob);
      await navigator.share({
        title: cleanFilename,
        text: `AP Exam: ${cleanFilename}`,
        url: objectUrl,
      });
      triggerVibration(20);
      return true;
    } else {
      // If Web Share is not supported, do not trigger an unintended save/vault toast
      console.warn('[MobileSaver] Web Share API not supported on this browser.');
      return false;
    }
  } catch (err: any) {
    if (err && (err.name === 'AbortError' || err.message?.includes('canceled') || err.message?.includes('cancelled'))) {
      console.log('[MobileSaver] Web sharing was cancelled by the user.');
      return false;
    }
    console.error('[MobileSaver] Web sharing failed:', err);
    return false;
  }
}

/**
 * Utility to save and share Audio Summary files on mobile (Capacitor/Android) and Web browsers.
 */
export async function saveAudioMobile(audioData: string | Blob, filename: string): Promise<boolean> {
  let cleanFilename = filename.trim().replace(/[\\/:"*?<>|]/g, '_');
  if (!cleanFilename.toLowerCase().endsWith('.wav') && !cleanFilename.toLowerCase().endsWith('.mp3')) {
    cleanFilename += '.wav';
  }

  if (Capacitor.isNativePlatform()) {
    try {
      const b64Data = await getBase64(audioData);
      const savedFile = await Filesystem.writeFile({
        path: cleanFilename,
        data: b64Data,
        directory: Directory.Cache,
        recursive: true,
      });

      try {
        await Share.share({
          title: cleanFilename,
          text: `Listen to your AI Audio Summary: ${cleanFilename}`,
          url: savedFile.uri,
          dialogTitle: 'Save or Share Audio Summary',
        });
      } catch (shareErr) {
        await FileOpener.open({
          filePath: savedFile.uri,
          contentType: 'audio/wav',
        });
      }

      triggerVibration(25);
      return true;
    } catch (e: any) {
      console.error('[MobileSaver] Error saving audio file:', e);
      return false;
    }
  }

  // Web Browser fallback
  try {
    const b64 = typeof audioData === 'string' && audioData.startsWith('data:')
      ? audioData
      : `data:audio/wav;base64,${await getBase64(audioData)}`;
    const link = document.createElement('a');
    link.href = b64;
    link.download = cleanFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (e) {
    console.error('[MobileSaver] Browser audio download failed:', e);
    return false;
  }
}
