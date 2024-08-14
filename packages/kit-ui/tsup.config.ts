import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/stories/*.tsx'],
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
});
