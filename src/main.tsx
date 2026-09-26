import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error guard against uncaught async promises (e.g. cancelled audio, native bridge, audio play abort, chunk mismatches)
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.message || event.reason || '';
  const str = String(reason).toLowerCase();
  if (
    str.includes('play() request was interrupted') ||
    str.includes('aborterror') ||
    str.includes('the play() request was interrupted') ||
    str.includes('failed to fetch') ||
    str.includes('networkerror') ||
    str.includes('notallowederror') ||
    str.includes('the operation was aborted') ||
    str.includes('dynamically imported module') ||
    str.includes('loading chunk')
  ) {
    event.preventDefault();
    console.warn('[Global Unhandled Rejection absorbed safely]:', str);
    return;
  }
  console.warn('[Global Unhandled Rejection absorbed]:', event.reason);
  event.preventDefault();
});

window.addEventListener('error', (event) => {
  const msg = (event.message || '').toLowerCase();
  if (
    msg.includes('resizeobserver') || 
    msg.includes('script error') ||
    msg.includes('failed to fetch dynamically imported module') ||
    msg.includes('loading chunk')
  ) {
    event.preventDefault();
    console.warn('[Global Error absorbed safely]:', msg);
    return;
  }
});

import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary featureName="AP Exam Core" fallbackMessage="Restoring study workspace...">
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
