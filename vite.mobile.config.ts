import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'

// Nelsy pro app (Capacitor). Separate entry from the website: mobile/index.html builds to dist-app/.
export default defineConfig({
  root: resolve(__dirname, 'mobile'),
  // Relative asset paths: Capacitor serves dist-app from the device filesystem.
  base: './',
  envDir: __dirname,
  publicDir: false,
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss({ config: resolve(__dirname, 'tailwind.config.js') }), autoprefixer()],
    },
  },
  server: {
    port: 5198,
    fs: { allow: [__dirname] },
  },
  build: {
    outDir: resolve(__dirname, 'dist-app'),
    emptyOutDir: true,
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
  },
})
