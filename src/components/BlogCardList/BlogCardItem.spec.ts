import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BlogCardItem from '@/components/BlogCardList/BlogCardItem.vue';

vi.mock('@/utils', () => ({
    shortDate: () => '09 апр',
    pluralize: () => 'комментарии'
}));

vi.mock('@/shared/ui', () => ({
    ChipItem: { template: '<div><slot /></div>' },
    MetaInfo: { template: '<div><slot /></div>' }
}));

vi.mock('@/shared/assets/icons/icon-comments.svg', () => ({ default: '' }));
vi.mock('@/shared/assets/icons/icon-clock.svg', () => ({ default: '' }));

describe('BlogCardItem', () => {
    const mockPost = {
        id: '1',
        title: 'Тест',
        description: 'Описание',
        text: 'длинный текст',
        image: '/test.jpg',
        date: '2024-01-01',
        readTime: '5',
        categories: ['Категория'],
        comments: []
    };

    it('рендерится без ошибок', () => {
        const wrapper = mount(BlogCardItem, {
            props: { post: mockPost }
        });

        expect(wrapper.exists()).toBe(true);
    });

    it('отображает заголовок и описание', () => {
        const wrapper = mount(BlogCardItem, {
            props: { post: mockPost }
        });

        expect(wrapper.text()).toContain('Тест');
        expect(wrapper.text()).toContain('Описание');
    });

    it('клик по карточке emits событие', async() => {
        const wrapper = mount(BlogCardItem, {
            props: { post: mockPost }
        });

        await wrapper.find('article').trigger('click');
        expect(wrapper.emitted('click')).toHaveLength(1);
    });
});