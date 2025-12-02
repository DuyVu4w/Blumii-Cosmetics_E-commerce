import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Cổng hiện tại của React App
    proxy: {
      // Chuyển hướng MỌI yêu cầu bắt đầu bằng '/api'
      '/api': {
        target: 'http://localhost:3000', // Server Node.js của bạn
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ''), // Giữ nguyên '/api' nếu BE cũng có '/api'
      },
    },
  },
});