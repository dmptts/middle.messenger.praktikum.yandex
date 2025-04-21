import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html',
    }
  },
  css: {
    postcss: './postcss.config.ts',
  }
})
