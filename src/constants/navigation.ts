import { pathKeys } from '@/shared/lib/vue-router';

export const NAVIGATION = [
    { to: pathKeys.home(), text: 'Главная' },
    { to: pathKeys.blog(), text: 'Блог' },
] as const;

export type NavigationItem = typeof NAVIGATION[number]