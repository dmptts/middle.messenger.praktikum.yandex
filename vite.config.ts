import { defineConfig } from 'vite';
import svgSpritePlugin from 'vite-plugin-svg-sprite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html',
    }
  },
  css: {
    postcss: './postcss.config.ts',
  },
  plugins: [
    svgSpritePlugin({
      exportType: 'vanilla',
      include: ['**/icons/*.svg'],
      symbolId: 'icon-[name]'
    }),
  ],
})
