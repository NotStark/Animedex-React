import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Vite server configuration
  server: {
    // Port to use
    port: 5173,
    // Enable strict port checking will  throw error if port is already in use
    strictPort: true,
    // Open the browser when Vite server starts
    open: true,
    cors: true
  },
  
})

