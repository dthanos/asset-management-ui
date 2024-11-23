import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

export default defineConfig({
    plugins: [
      vue(),
      Pages()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src/', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components/', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets/', import.meta.url)),
            '@stores': fileURLToPath(new URL('./src/stores/', import.meta.url)),
            '@services': fileURLToPath(new URL('./src/services/', import.meta.url)),
            '@util': fileURLToPath(new URL('./src/util/', import.meta.url)),
        },
    },
})
