import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, '.src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@images': path.resolve(__dirname, '.src/assets/images'),
      '@components': path.resolve(__dirname, '.src/components'),
    },
  },
  plugins: [react()],
})
