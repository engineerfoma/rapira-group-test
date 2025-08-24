import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import '@/shared/assets/styles/main.scss';

import App from './App.vue';
import router from './router';
import ru from '@/locales/ru.json';

const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    messages: {
        ru,
    }
});

async function prepare() {
    if (import.meta.env.MODE === 'development') {
        const { worker } = await import('@/mocks/browser');
        await worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
                url: '/mockServiceWorker.js',
            },
        });
        console.log('MSW worker started');
    }
}

const app = createApp(App);
const pinia = createPinia();

app.use(i18n);
app.use(pinia);
app.use(router);
prepare().then(() => {
    app.mount('#app');
});