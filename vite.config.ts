import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "prompt",
    devOptions: {
      enabled: true
    },
    includeAssets: ['favicon.ico', "apple-touc-icon.png", "masked-icon.png"],
    manifest: {
      name: "CSC app",
      short_name: "CSC app",
      description: "An app for Candelária Sport Clube",
      icons: [

        {
          src: "./icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: 'favicon'
        },
        {
          src: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'apple touch icon',
        },
        {
          src: "./icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
          purpose: "any maskable"
        }
      ],
      theme_color: "#181818",
      background_color: "#e8eac2",
      display: "standalone",
      scope: "/",
      start_url: "/",
      orientation: "portrait",
    }
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  //trocar depois
  server: {
    port: 8080,
  },
})
