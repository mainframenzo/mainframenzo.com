import path from 'node:path';
import fs from 'node:fs';
import { defineConfig, ViteDevServer } from 'vite';
//import basicSsl from '@vitejs/plugin-basic-ssl';

const sourceRoot = path.resolve(__dirname, '..');

export const copyVendorScripts = () => {
  const srcPath = path.resolve(sourceRoot, 'src/frontend/scripts/vendor/css-browser-selector.js');
  const destPath = path.resolve(sourceRoot, 'dist.frontend/scripts/vendor/css-browser-selector.js');

  const copy = () => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
  };

  return {
    name: 'copy-vendor-scripts',
    buildStart() {
      copy();
    },
    configureServer() {
      copy();
    }
  };
};

// FIXME This doesn't work.
// FIXME Also watch EJS files - since the migration to Vite,
//  those don't work all the time. Partials?
export const watchBookmarks = () => {
  const watcher = (server: ViteDevServer) => {
    server.watcher.add(path.resolve(sourceRoot, 'src/frontend/public/downloads/bookmarks.html'));

    server.watcher.on('change', (file) => {
      if (file.includes('bookmarks.html')) {
        server.hot.send({ type: 'full-reload' });
      }
    });
  }

  return {
    name: 'watch-bookmarks',
    configureServer(server: ViteDevServer) {
      watcher(server);
    }
  };
}

export default defineConfig({
// plugins: [
//   basicSsl({
//     name: 'test',
//     ttlDays: 30,
//     certDir: path.join(sourceRoot, 'config'),
//   }),
// ],
  root: path.resolve(sourceRoot, 'dist.frontend'),
  resolve: {
    alias: {
      '/src': path.join(sourceRoot, 'src'),
    }
  },
  plugins: [copyVendorScripts(), watchBookmarks()],
  build: {
    outDir: path.resolve(sourceRoot, 'dist.frontend'),
    emptyOutDir: false
  },
  optimizeDeps: {
    exclude: [path.resolve(sourceRoot, 'src/frontend/scripts/vendor/css-browser-selector.js')],
  },
  publicDir: path.join(sourceRoot, 'src/frontend/public'),
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
    watch: { usePolling: true },
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
});
