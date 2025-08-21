import { type RouteRecordRaw } from 'vue-router';
import { pathKeys } from '@/shared/lib/vue-router';
import HomePage from './HomePage.vue';

export const home: RouteRecordRaw = {
    path: pathKeys.home(),
    name: 'home',
    component: HomePage,
    meta: {
        layout: 'DefaultLayout',
        title: 'Главная | Rapira test',
    },
};