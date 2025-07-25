import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    overlay: true,            // keep your overlay
    proxy: {
      '/api': 'http://localhost:5000'  // proxy API calls to backend
    }
  }
})
