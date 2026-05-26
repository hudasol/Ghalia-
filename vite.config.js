import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path' // Adding this to support the "@" alias imports in your code

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', 
  plugins: [
    react(), // Keeping only the React plugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // This ensures that "@/components" imports work
    },
  },
})