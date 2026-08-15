import path from 'node:path';
import { defineConfig } from 'vite';

const sourceRoot = path.resolve(__dirname, '..');

export default defineConfig({
  build: {
    outDir: path.resolve(sourceRoot, 'dist.frontend.release'),
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: [
        path.resolve(sourceRoot, 'src/frontend/scripts/index.ts'),
        path.resolve(sourceRoot, 'src/frontend/styles/index.css')
      ]
    }
  },
  preview: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
});
