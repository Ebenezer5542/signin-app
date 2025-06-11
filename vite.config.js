import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/signin-app/',
  plugins: [react(), 
  VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'IPA Sign-in App',
    short_name: 'Sign-in App',
    start_url: '/signin-app/', // 👈 matches base
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#003c2d',
    icons: [
      {
        src: 'icons/ipa-logo-192.png', // 👈 leading slash
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'icons/ipa-logo-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
})

  ]
})
