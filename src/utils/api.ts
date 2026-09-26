import { Capacitor } from '@capacitor/core';

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  if (typeof window !== 'undefined') {
    const isNative = Capacitor.isNativePlatform();

    // If running in any web browser (localhost, 127.0.0.1, 192.168.x.x LAN IP, Vercel, or custom host),
    // always use relative endpoint so requests stay on the exact host that served the page!
    if (!isNative) {
      return cleanEndpoint;
    }
  }

  let baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://ap-exam-five.vercel.app').trim();
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }

  return `${baseUrl}${cleanEndpoint}`;
};

export const getBattleApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (typeof window !== 'undefined') {
    const target = localStorage.getItem('BATTLE_SERVER_TARGET');
    if (target === 'cloud') {
      return `https://ap-exam-five.vercel.app${cleanEndpoint}`;
    }
    if (target === 'local') {
      return cleanEndpoint;
    }
  }

  return getApiUrl(cleanEndpoint);
};

export const getBattleServerTarget = (): 'cloud' | 'local' | 'auto' => {
  if (typeof window === 'undefined') return 'auto';
  const target = localStorage.getItem('BATTLE_SERVER_TARGET');
  if (target === 'cloud' || target === 'local') return target;
  return 'auto';
};

export const setBattleServerTarget = (target: 'cloud' | 'local' | 'auto') => {
  if (typeof window === 'undefined') return;
  if (target === 'auto') {
    localStorage.removeItem('BATTLE_SERVER_TARGET');
  } else {
    localStorage.setItem('BATTLE_SERVER_TARGET', target);
  }
};

