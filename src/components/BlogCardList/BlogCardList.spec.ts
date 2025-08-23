import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BlogCardList from '@/components/BlogCardList/BlogCardList.vue';
import type { BlogPost } from '@/types/blog';

const createMockPost = (overrides?: Partial<BlogPost>): BlogPost => ({
    id: '1',
    title: 'Test Post',
    description: 'Test description',
    text: 'Full text',
    image: '/test.jpg',
    date: '2024-01-01',
    readTime: '5',
    categories: ['Test'],
    comments: [],
    ...overrides
});

vi.mock('./BlogCardItem.vue', () => ({
    default: {
        template: '<div class="blog-card-item">{{ post.title }}</div>',
        props: ['post']
    }
}));

vi.mock('@/shared/ui', () => ({
    BaseLoading: { template: '<div>Loading</div>' },
    NotFound: { template: '<div>Not found</div>' }
}));

describe('BlogCardList', () => {
    it('показывает карточки при наличии постов', () => {
        const mockPosts = [
            createMockPost({ id: '1', title: 'Post 1' }),
            createMockPost({ id: '2', title: 'Post 2' })
        ];

        const wrapper = mount(BlogCardList, {
            props: {
                posts: mockPosts,
                error: null,
                loading: false
            }
        });

        const cards = wrapper.findAll('.blog-card-item');
        expect(cards).toHaveLength(2);
        expect(cards[0].text()).toContain('Post 1');
        expect(cards[1].text()).toContain('Post 2');
    });

    it('показывает not-found при пустом списке', () => {
        const wrapper = mount(BlogCardList, {
            props: {
                posts: [],
                error: null,
                loading: false
            }
        });

        expect(wrapper.text()).toContain('Not found');
    });

    it('показывает loading при загрузке', () => {
        const wrapper = mount(BlogCardList, {
            props: {
                posts: [createMockPost()],
                error: null,
                loading: true
            }
        });

        expect(wrapper.text()).toContain('Loading');
    });
});