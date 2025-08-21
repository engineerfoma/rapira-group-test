import { type RouteRecordRaw } from 'vue-router';
import { pathKeys } from '@/shared/lib/vue-router';
import BlogPage from './BlogPage.vue';

export const blog: RouteRecordRaw = {
    path: pathKeys.blog(),
    name: 'blog',
    component: BlogPage,
    props: true,
    meta: {
        layout: 'DefaultLayout',
        title: 'Блог | Rapira test',
    },
};