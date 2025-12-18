import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: resolve(__dirname),
  base: '/gp-ui/', // GitHub Pages base path
  resolve: {
    alias: {
      // Use the library source directly for hot-reload during development
      '@gp/ui': resolve(__dirname, '../src/index.ts'),
    },
  },
  build: {
    outDir: resolve(__dirname, '../playground-dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5174,
  },
})
