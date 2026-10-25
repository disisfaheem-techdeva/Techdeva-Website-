import { defineConfig } from 'vite';
import { techdevaPages } from './src/build/plugin.js';

export default defineConfig({
  plugins: [techdevaPages({ siteUrl: 'https://techdeva.net' })],
  server: { port: 5173 },
  preview: { port: 4173 },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
  },
});
