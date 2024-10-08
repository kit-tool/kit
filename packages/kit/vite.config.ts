import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';

export default defineConfig(async () => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  clearScreen: false,
  server: {
    port: 2024,
    strictPort: true,
    watch: {
      ignored: ['**/crates/**'],
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
}));
