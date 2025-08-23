import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useBlogPosts } from '@/composables/useBlogPosts';
import { mockBlogPosts } from '@/mocks/blogPosts';
import { delay } from '@/utils';

vi.mock('@/utils', () => ({
    delay: vi.fn(() => Promise.resolve())
}));

vi.mock('@/mocks/blogPosts', () => ({
    mockBlogPosts: [
        {
            id: '1',
            title: 'Вдохновение в каждом шаге',
            description: 'Наши художники выражают всю красоту окружающего мира через творчество.',
            text: 'Каждое утро, когда я просыпаюсь в палатке, окружённой лесом и горами, я чувствую, как природа наполняет меня энергией. Величественные вершины, покрытые зелёными лесами, напоминают мне о том, как важно сохранять связь с природой. Каждый шаг по тропе — это не просто движение вперёд, это путешествие внутрь себя, где я нахожу вдохновение и силу. В такие моменты я понимаю, что настоящая красота мира скрыта в его простоте и величии.',
            image: '/public/images/image-1.png',
            date: '2024-04-09',
            readTime: '2',
            categories: ['Природа', 'Люди'],
            comments: [
                {
                    id: '1',
                    author: 'Мира Гусева',
                    avatar: '/public/images/avatar.png',
                    text: 'Эти мгновения наполняют наши сердца радостью и любовью.',
                    date: '2024-01-15T14:30:25.123Z',
                }
            ]
        },
        {
            id: '2',
            title: 'Моменты тишины и покоя',
            description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
            text: 'Каждое утро, когда я просыпаюсь в палатке, окружённой лесом и горами, я чувствую, как природа наполняет меня энергией. Величественные вершины, покрытые зелёными лесами, напоминают мне о том, как важно сохранять связь с природой. Каждый шаг по тропе — это не просто движение вперёд, это путешествие внутрь себя, где я нахожу вдохновение и силу. В такие моменты я понимаю, что настоящая красота мира скрыта в его простоте и величии.',
            image: '/public/images/image-2.png',
            date: '2024-04-06',
            readTime: '3',
            categories: ['Природа', 'Животные'],
            comments: []
        },
    ]
}));

describe('useBlogPosts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('корректно инициализируется с пустыми данными', () => {
        const { posts, loading, error } = useBlogPosts();

        expect(posts.value).toEqual([]);
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    describe('filterPosts computed', () => {
        it('возвращает все посты без фильтров', () => {
            const { filterPosts } = useBlogPosts();
            const result = filterPosts.value();

            expect(result).toHaveLength(2);
            expect(result).toEqual(mockBlogPosts);
        });

        it('фильтрует посты по поисковому запросу', () => {
            const { filterPosts } = useBlogPosts();

            const result1 = filterPosts.value('вдохновение');
            expect(result1).toHaveLength(1);
            expect(result1[0].title).toBe('Вдохновение в каждом шаге');
            expect(result1.every(post =>
                post.title.toLowerCase().includes('вдохновение')
            )).toBe(true);

            const result3 = filterPosts.value('тишины');
            expect(result3).toHaveLength(1);
            expect(result3[0].title).toBe('Моменты тишины и покоя');

            const result4 = filterPosts.value('фыафыа');
            expect(result4).toHaveLength(0);
        });

        it('фильтрует посты по категориям', () => {
            const { filterPosts } = useBlogPosts();

            const result1 = filterPosts.value('', ['Природа']);
            expect(result1).toHaveLength(2);
            expect(result1.every(post =>
                post.categories.some(cat => cat.toLowerCase() === 'природа')
            )).toBe(true);

            const result2 = filterPosts.value('', ['Люди', 'Животные']);
            expect(result2).toHaveLength(2);
        });

        it('комбинирует поиск и фильтрацию по категориям', () => {
            const { filterPosts } = useBlogPosts();

            const result1 = filterPosts.value('вдохновение', ['Природа']);
            expect(result1).toHaveLength(1);
            expect(result1[0].title).toBe('Вдохновение в каждом шаге');
            expect(result1[0].categories).toContain('Природа');

            const result2 = filterPosts.value('вдохновение', ['фыафыа']);
            expect(result2).toHaveLength(0);
        });

        it('возвращает пустой массив при отсутствии результатов', () => {
            const { filterPosts } = useBlogPosts();

            const result1 = filterPosts.value('фыа');
            expect(result1).toHaveLength(0);

            const result2 = filterPosts.value('', ['фыа']);
            expect(result2).toHaveLength(0);

            const result3 = filterPosts.value('фыа', ['фа']);
            expect(result3).toHaveLength(0);
        });

        it('игнорирует регистр при поиске', () => {
            const { filterPosts } = useBlogPosts();

            const result1 = filterPosts.value('ВДОХНОВЕНИЕ');
            expect(result1).toHaveLength(1);
            expect(result1[0].title).toBe('Вдохновение в каждом шаге');

            const result2 = filterPosts.value('вдохновение');
            expect(result2).toHaveLength(1);
            expect(result2[0].title).toBe('Вдохновение в каждом шаге');
        });

        it('обрабатывает пробелы в поисковом запросе', () => {
            const { filterPosts } = useBlogPosts();

            const result1 = filterPosts.value('  вдохновение  ');
            expect(result1).toHaveLength(1);

            const result2 = filterPosts.value(' ');
            expect(result2).toHaveLength(2);
        });

        it('возвращает все посты при пустой строке поиска', () => {
            const { filterPosts } = useBlogPosts();

            const result1 = filterPosts.value('');
            expect(result1).toHaveLength(2);

            const result2 = filterPosts.value('   ');
            expect(result2).toHaveLength(2);
        });
    });

    describe('fetchPosts', () => {
        it('успешно загружает посты без фильтров', async() => {
            const { posts, loading, error, fetchPosts } = useBlogPosts();

            await fetchPosts();

            expect(delay).toHaveBeenCalledWith(700);
            expect(loading.value).toBe(false);
            expect(error.value).toBeNull();
            expect(posts.value).toHaveLength(2);
        });

        it('обрабатывает ошибки', async() => {
            const mockError = new Error('Network error');
            vi.mocked(delay).mockRejectedValueOnce(mockError);

            const { error, fetchPosts } = useBlogPosts();

            await fetchPosts();

            expect(error.value).toBe('Network error');
        });
    });
});