import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/bpa/",
  plugins: [react()],
  server: {
    proxy: {
      '/bpa/api': {
        target: 'http://backend:3000',
        changeOrigin: true
      }
    },
  },
})
