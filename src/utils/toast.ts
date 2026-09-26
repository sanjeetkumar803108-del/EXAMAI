/**
 * AP EXAM APP — GLOBAL IN-APP TOAST SYSTEM
 *
 * Replaces ALL native alert() / window.alert() calls across the app.
 * Usage:  showToast("Your message here")
 *         showToast("Success!", "success")
 *         showToast("Something failed", "error")
 *         showToast("Camera blocked", "warning")
 *
 * Automatically intercepts window.alert() so that even existing alerts
 * across third-party plugins or old components render as sleek in-app toasts.
 */

export type ToastType = 'info' | 'success' | 'error' | 'warning';

export interface ToastEvent {
  message: string;
  type: ToastType;
  duration?: number; // ms, default 3500
}

/**
 * Condense verbose messages into crisp, short 2-3 word toast notifications.
 */
export function condenseToastMessage(rawMessage: string, type: ToastType = 'info'): string {
  const clean = String(rawMessage || '')
    .replace(/^(\w+\s*:\s*)+/g, '') // remove prefixes like "Error: "
    .trim();

  if (!clean) return 'Notice';

  const lower = clean.toLowerCase();

  // Known short mappings
  if (lower.includes('copied') || lower.includes('clipboard')) return 'Copied!';
  if (lower.includes('save to vault') || lower.includes('saved to vault') || lower.includes('added to vault')) return 'Saved to Vault';
  if (lower.includes('saved to device') || lower.includes('saved offline') || lower.includes('download')) return 'Saved to Device';
  if (lower.includes('saved') || lower.includes('bookmark')) return 'Saved!';
  if (lower.includes('downloaded') || lower.includes('download complete')) return 'Downloaded!';
  if (lower.includes('download fail') || lower.includes('failed to download')) return 'Download Failed';
  if (lower.includes('offline') || lower.includes('no internet') || lower.includes('network connection')) return 'Offline Mode';
  if (lower.includes('network error') || lower.includes('connection error')) return 'Network Error';
  if (lower.includes('sync complete') || lower.includes('synced')) return 'Workspace Synced!';
  if (lower.includes('syncing') || lower.includes('refreshing')) return 'Syncing...';
  if (lower.includes('permission') || lower.includes('access denied')) return 'Access Needed';
  if (lower.includes('logged in') || lower.includes('welcome back')) return 'Welcome Back!';
  if (lower.includes('logged out') || lower.includes('signed out')) return 'Signed Out';
  if (lower.includes('report sent') || lower.includes('reported')) return 'Report Sent!';
  if (lower.includes('level unlocked') || lower.includes('unlocked')) return 'Level Unlocked!';
  if (lower.includes('quiz complete') || lower.includes('victory')) return 'Quiz Completed!';
  if (lower.includes('streak')) return 'Streak Updated!';
  if (lower.includes('generating') || lower.includes('synthesizing')) return 'Generating...';
  if (lower.includes('restored') || lower.includes('auto-heal')) return 'Restored!';
  if (lower.includes('cleared') || lower.includes('deleted') || lower.includes('purged')) return 'Cleared!';

  // If already 1-3 words and short, preserve it
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= 3 && clean.length <= 26) {
    return clean;
  }

  // If longer than 3 words, take the first 2-3 words or provide clean type fallback
  if (words.length >= 2 && words.slice(0, 3).join(' ').length <= 22) {
    return words.slice(0, 3).join(' ');
  }

  switch (type) {
    case 'success': return 'Success!';
    case 'error': return 'Action Failed';
    case 'warning': return 'Warning';
    default: return 'Notice';
  }
}

/**
 * Show a global in-app toast notification.
 */
export function showToast(message: string, type: ToastType = 'info', duration = 2200): void {
  if (typeof window === 'undefined') return;

  const shortMessage = condenseToastMessage(message, type);
  if (!shortMessage) return;

  window.dispatchEvent(
    new CustomEvent<ToastEvent>('show-toast', {
      detail: { message: shortMessage, type, duration },
    })
  );
}

// ─── AUTOMATIC WINDOW.ALERT INTERCEPTOR ─────────────────────────────────────
// Ensures NO native black OS alert boxes can EVER appear anywhere in the app!
if (typeof window !== 'undefined') {
  const originalAlert = window.alert;

  window.alert = (msg?: any) => {
    try {
      const text = typeof msg === 'string' ? msg : (msg?.message || JSON.stringify(msg || ''));
      
      // Clean newlines from legacy multiline alert strings (e.g. "Title\n\nBody message")
      const formatted = text.replace(/\\n/g, '\n').replace(/\n+/g, ' — ').trim();

      const lower = formatted.toLowerCase();
      let type: ToastType = 'info';

      if (lower.includes('success') || lower.includes('copied') || lower.includes('saved') || lower.includes('restored') || lower.includes('subscribed')) {
        type = 'success';
      } else if (lower.includes('permission') || lower.includes('blocked') || lower.includes('denied') || lower.includes('allow') || lower.includes('offline')) {
        type = 'warning';
      } else if (lower.includes('fail') || lower.includes('error') || lower.includes('wrong') || lower.includes('invalid') || lower.includes('restricted')) {
        type = 'error';
      }

      showToast(formatted, type, 2200);
    } catch (e) {
      if (typeof originalAlert === 'function') {
        originalAlert(msg);
      }
    }
  };
}

