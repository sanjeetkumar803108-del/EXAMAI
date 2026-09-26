import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      emptyOutDir: false, // Keep previous hashed chunks alive so active sessions never hit 404
      target: 'es2022',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'vendor-firebase';
              if (id.includes('katex') || id.includes('rehype-katex') || id.includes('remark-math')) return 'vendor-katex';
              if (id.includes('jspdf') || id.includes('html2canvas')) return 'vendor-pdf';
              if (id.includes('recharts')) return 'vendor-charts';
              if (id.includes('motion')) return 'vendor-motion';
              if (id.includes('lucide-react')) return 'vendor-icons';
              if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react';
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react-dom/server',
        'lucide-react',
        'motion/react',
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
        'firebase/storage',
        '@capacitor/core',
        '@capacitor/app',
        '@capacitor/network',
        '@capacitor/haptics',
        '@capacitor/filesystem',
        '@capacitor/local-notifications',
        '@capacitor/share',
        '@capacitor/camera',
        '@capawesome/capacitor-file-picker',
        '@capacitor-community/file-opener',
        '@capacitor-firebase/authentication',
        '@revenuecat/purchases-capacitor',
        'canvas-confetti',
        'jspdf',
        'html2canvas',
        'katex',
        'react-markdown',
        'remark-math',
        'remark-gfm',
        'rehype-katex',
        'rehype-raw',
        'recharts',
        'idb-keyval'
      ],
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        ignored: [
          '**/android/**',
          '**/dist/**',
          '**/api/**',
          '**/.system_generated/**',
          '**/.tempmediaStorage/**',
          '**/.user_uploaded/**',
          '**/scratch/**',
          '**/*.log',
          '**/subscriptions.json',
          '**/node_modules/**',
        ],
      },
    },
  };
});
