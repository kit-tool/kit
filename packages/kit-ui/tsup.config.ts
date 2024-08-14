import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/stories/index.ts'],
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
});
