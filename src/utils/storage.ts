// In-memory fallback for environments where localStorage is unavailable
const memoryStorage: Record<string, string> = {};

export const safeGetItem = (key: string, defaultValue: string | null = null): string | null => {
  try {
    const val = window.localStorage.getItem(key);
    return val !== null ? val : defaultValue;
  } catch (e) {
    console.warn('localStorage access denied, using memory storage fallback');
    return memoryStorage[key] !== undefined ? memoryStorage[key] : defaultValue;
  }
};

export const safeSetItem = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('academic_profile_updated', { detail: { key, value } }));
  } catch (e) {
    memoryStorage[key] = value;
    window.dispatchEvent(new CustomEvent('academic_profile_updated', { detail: { key, value } }));
  }
};

export const safeRemoveItem = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    delete memoryStorage[key];
  }
};

export const safeClearAll = (): void => {
  // Session tokens and ephemeral cache to clear on logout
  const sessionKeysToClear = [
    'study_session_token',
    'study_user_session_token',
    'active_temporary_session',
    'apexam_active_user_session',
    'apexam_user_authenticated',
    'apexam_login_in_progress',
    'last_logged_in_user',
    'last_logged_in_user_email'
  ];

  try {
    sessionKeysToClear.forEach(k => {
      window.localStorage.removeItem(k);
    });
  } catch (e) {
    console.warn('localStorage session clear notice:', e);
  }

  sessionKeysToClear.forEach(k => {
    delete memoryStorage[k];
  });
};

export const safePurgeKeysByPrefix = (prefix: string): void => {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(prefix)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach(k => window.localStorage.removeItem(k));
  } catch (_) {}
  for (const k in memoryStorage) {
    if (k.startsWith(prefix)) {
      delete memoryStorage[k];
    }
  }
};

/**
 * Permanently wipes all personal user data from storage upon account deletion,
 * while safely preserving bought subscriptions if keepSubscription is true.
 */
export const purgeUserDataPreservingSubscription = (keepSubscription: boolean): void => {
  const subscriptionKeys = new Set([
    'study_is_vip',
    'rc_vip_active',
    'is_pro_subscription',
    'user_subscription_status'
  ]);

  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k) {
        if (keepSubscription && (subscriptionKeys.has(k) || k.startsWith('study_is_vip_'))) {
          continue;
        }
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach(k => window.localStorage.removeItem(k));
  } catch (e) {
    console.warn('Error purging localStorage on account delete:', e);
  }

  // Wipe memory storage except subscription
  for (const k in memoryStorage) {
    if (keepSubscription && (subscriptionKeys.has(k) || k.startsWith('study_is_vip_'))) {
      continue;
    }
    delete memoryStorage[k];
  }

  if (keepSubscription) {
    safeSetItem('study_is_vip', 'true');
  }
};

export const safeJsonParse = <T>(jsonStr: string | null | undefined, fallback: T): T => {
  if (!jsonStr) return fallback;
  try {
    const parsed = JSON.parse(jsonStr);
    // Strict schema check: if fallback is an Array, parsed MUST be an Array
    if (Array.isArray(fallback) && !Array.isArray(parsed)) {
      console.warn('[SafeJsonParse] Expected array, got non-array. Recovering with fallback.');
      return fallback;
    }
    // Strict schema check: if fallback is a non-null object, parsed MUST be a non-null object and not an array
    if (fallback !== null && typeof fallback === 'object' && !Array.isArray(fallback)) {
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        console.warn('[SafeJsonParse] Expected object, got non-object. Recovering with fallback.');
        return fallback;
      }
    }
    return parsed as T;
  } catch (e) {
    console.warn('[SafeJsonParse] Corrupted JSON recovered with fallback:', e);
    return fallback;
  }
};
