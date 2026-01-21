import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => ({
  plugins: [react()],
  // User/Root GitHub Pages (repo name: arethusaryandhana.github.io)
  // So production base must be '/'
  base: '/',
}))
