import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './src/index.html',
    }
  },
  css: {
    postcss: './postcss.config.js',
  }
})