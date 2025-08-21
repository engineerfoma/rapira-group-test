import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';
import { home } from '@/pages/home';
import { blog } from '@/pages/blog';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        home,
        blog,
    ],
});

router.beforeEach(async(to: RouteLocationNormalized, from, next) => {
    let title = to.meta.title;

    if (typeof title === 'function') {
        title = title(to);
    }

    if (!title && to.matched.some((record) => record.meta.title)) {
        const matchedTitle = to.matched.find((record) => record.meta.title)?.meta.title;
        if (typeof matchedTitle === 'function') {
            title = matchedTitle(to);
        } else {
            title = matchedTitle as string;
        }
    }

    document.title = title as string;

    next();
});

export default router;
