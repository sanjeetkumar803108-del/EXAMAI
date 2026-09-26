import React, { ComponentType, lazy, useState, useEffect } from 'react';

// Global registry of chunk reset callbacks
const chunkResetCallbacks = new Set<() => void>();

/**
 * Detects if an error is caused by stale/missing dynamic chunks (common after app updates/rebuilds)
 */
export function isChunkLoadError(err: any): boolean {
  if (!err) return false;
  const msg = (err?.message || String(err || '')).toLowerCase();
  return (
    msg.includes('failed to fetch dynamically imported module') ||
    msg.includes('error loading dynamically imported module') ||
    msg.includes('loading chunk') ||
    msg.includes('chunkloaderror') ||
    msg.includes('dynamically imported module') ||
    msg.includes('error: 404')
  );
}

/**
 * Resets all lazy component instances across the entire application.
 * Clears any cached rejected promises from previous offline states.
 */
export function resetAllLazyChunks() {
  console.log(`[ResilientLazy] Resetting ${chunkResetCallbacks.size} lazy components...`);
  chunkResetCallbacks.forEach(cb => {
    try {
      cb();
    } catch (e) {
      console.error('[ResilientLazy] Error in chunk reset callback:', e);
    }
  });
}

function retryImport<T>(importer: () => Promise<T>, retriesLeft = 3, interval = 300): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    importer()
      .then(resolve)
      .catch((error) => {
        if (retriesLeft > 0) {
          console.warn(`[ResilientLazy] Dynamic import hitch. Retrying in ${interval}ms (${retriesLeft} retries remaining)...`);
          setTimeout(() => {
            retryImport(importer, retriesLeft - 1, Math.round(interval * 1.5)).then(resolve, reject);
          }, interval);
        } else {
          console.error('[ResilientLazy] Dynamic asset import failed after all retries:', error);
          // If a chunk load failed because of a new build/deployment (stale chunk 404)
          if (isChunkLoadError(error)) {
            const lastReload = Number(sessionStorage.getItem('last_chunk_reload_ts') || '0');
            if (Date.now() - lastReload > 10000) {
              sessionStorage.setItem('last_chunk_reload_ts', String(Date.now()));
              console.warn('[ResilientLazy] Stale chunk 404 detected after update. Refreshing page for latest assets...');
              window.location.reload();
              return;
            }
          }
          reject(error);
        }
      });
  });
}

/**
 * Creates a resilient dynamic lazy component that does NOT permanently cache
 * rejected module promises. If the import fails while offline or after an update,
 * it can be retried seamlessly on network restoration, "Resume" tap, or auto-reload.
 */
export function resilientLazy<T extends ComponentType<any>>(
  importer: () => Promise<{ default: T }>
): React.FC<any> & { resetChunk: () => void } {
  let activeLazy = lazy(() => retryImport(importer));
  const instanceListeners = new Set<() => void>();

  const reset = () => {
    activeLazy = lazy(() => retryImport(importer));
    instanceListeners.forEach(listener => {
      try { listener(); } catch (_) {}
    });
  };

  // Register immediately at module declaration time so resetAllLazyChunks works even before mount!
  chunkResetCallbacks.add(reset);

  const ResilientComponent: any = (props: any) => {
    const [, setTick] = useState(0);

    useEffect(() => {
      const update = () => setTick(t => t + 1);
      instanceListeners.add(update);

      const handleNetworkRestored = () => {
        console.log('[ResilientLazy] Network restored / force-refresh event: invalidating cached chunk...');
        reset();
      };

      window.addEventListener('online', handleNetworkRestored);
      window.addEventListener('app-force-refresh', handleNetworkRestored);

      return () => {
        instanceListeners.delete(update);
        window.removeEventListener('online', handleNetworkRestored);
        window.removeEventListener('app-force-refresh', handleNetworkRestored);
      };
    }, []);

    return React.createElement(activeLazy, props);
  };

  ResilientComponent.resetChunk = reset;
  return ResilientComponent;
}
