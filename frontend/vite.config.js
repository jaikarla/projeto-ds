import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /* //esse proxy é retirado porque quem faz essa parte agora é o nginx.
  
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:3000',
        changeOrigin: true
      }
    },
  },*/
})
