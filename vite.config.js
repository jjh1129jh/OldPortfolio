import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './', // 로컬/하위경로 배포 대비
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },

      workbox: {
        // 캐싱할 파일 패턴
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // ✅ PWA 캐시 용량 제한을 15MB로 상향 (기본값 2MB)
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024 
      },

      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: 'Coffee Shop',
        short_name: 'MyShop',
        description: '포트폴리오 페이지입니다.',
        display: 'standalone',
        theme_color: '#000000',
        icons: [
          {
            src: '/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
    })
  ],
})