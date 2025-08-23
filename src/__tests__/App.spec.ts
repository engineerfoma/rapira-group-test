import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import App from '@/app/App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: { template: '<div>Home</div>' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
describe('App', () => {
    it('mounts and renders properly', async() => {
        const wrapper = mount(App, {
            global: {
                plugins: [router]
            }
        });

        await router.isReady();

        expect(wrapper.exists()).toBe(true);
    });
});
