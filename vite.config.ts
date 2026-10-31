import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Stripe SDK — only needed on booking/payment pages
          'vendor-stripe': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          // Framer Motion — used on marketing + studio pages
          'vendor-motion': ['framer-motion'],
          // Recharts — only dashboard
          'vendor-recharts': ['recharts'],
          // Supabase client
          'vendor-supabase': ['@supabase/supabase-js'],
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
