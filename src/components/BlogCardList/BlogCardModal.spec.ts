import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BlogCardModal from '@/components/BlogCardList/BlogCardModal.vue';

vi.mock('@/shared/ui', () => ({
    BaseModal: {
        template: '<div v-if="isOpen"><slot /></div>',
        props: ['isOpen']
    },
    MetaInfo: { template: '<div><slot /></div>' },
    ChipItem: { template: '<div><slot /></div>' },
    TextareaExpander: {
        template: '<textarea />',
        emits: ['submit', 'cancel']
    }
}));

vi.mock('@/utils', () => ({
    shortDate: () => '09 апр',
    pluralize: () => 'комментарии'
}));

vi.mock('@/shared/assets/icons/icon-comments.svg', () => ({ default: '' }));
vi.mock('@/shared/assets/icons/icon-clock.svg', () => ({ default: '' }));

vi.mock('dayjs', () => ({
    default: () => ({
        format: () => '01.01.2024 в 12:00'
    })
}));

const $t = (key: string) => key;

const mockPost = {
    id: '1',
    title: 'Тестовый заголовок',
    description: 'Тестовое описание',
    text: 'Полный текст поста',
    image: '/test.jpg',
    date: '2024-04-09',
    readTime: '5',
    categories: ['Природа'],
    comments: [
        {
            id: '1',
            author: 'Тестовый автор',
            avatar: null,
            text: 'Тестовый комментарий',
            date: '2024-01-01T12:00:00Z'
        }
    ]
};

describe('BlogCardModal', () => {
    it('не отображается когда isOpen = false', () => {
        const wrapper = mount(BlogCardModal, {
            props: {
                isOpen: false,
                post: mockPost
            },
            global: {
                mocks: { $t }
            }
        });

        expect(wrapper.html()).not.toContain('Тестовый заголовок');
    });

    it('отображается когда isOpen = true', () => {
        const wrapper = mount(BlogCardModal, {
            props: {
                isOpen: true,
                post: mockPost
            },
            global: {
                mocks: { $t }
            }
        });

        expect(wrapper.text()).toContain('Тестовый заголовок');
        expect(wrapper.text()).toContain('Полный текст поста');
    });

    it('emits close событие', async() => {
        const wrapper = mount(BlogCardModal, {
            props: {
                isOpen: true,
                post: mockPost
            },
            global: {
                mocks: { $t }
            }
        });

        wrapper.vm.$emit('close');
        expect(wrapper.emitted('close')).toBeTruthy();
    });
});