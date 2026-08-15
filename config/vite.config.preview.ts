import path from 'node:path';
import { defineConfig } from 'vite';

const sourceRoot = path.resolve(__dirname, '..');
const releaseDir = path.resolve(sourceRoot, 'dist.frontend.release');

export default defineConfig({
  root: releaseDir,
  build: {
    outDir: releaseDir,
    emptyOutDir: false,
  },
  publicDir: false,
  preview: {
    port: 8080,
    proxy: {
      '/api': { target: 'http://localhost:8081', changeOrigin: true },
    },
  },
});
