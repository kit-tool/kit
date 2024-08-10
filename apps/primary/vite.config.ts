import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
// import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 2024,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/crates/**"],
    },
  },
  css: {
    postcss: {
      // plugins: [tailwindcss]
    }
  }
}));
