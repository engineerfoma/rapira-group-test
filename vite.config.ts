import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';


// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        VueI18nPlugin({
            include: resolve(__dirname, './src/locales/**'),
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    css: {
        postcss: './postcss.config.js'
    },
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{vue,ts}'],
            exclude: ['node_modules/', 'src/mocks/']
        }
    }
});
