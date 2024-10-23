import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@ti-sass': '@site0/tijs/sass',
    },
  },
  optimizeDeps: {
    exclude: ['vitest'],
  },
  build: {
    // 单位是 KB
    chunkSizeWarningLimit: 2000,
  },
});
