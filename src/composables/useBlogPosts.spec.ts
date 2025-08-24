import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useBlogPosts } from '@/composables/useBlogPosts';
import { mockBlogPosts } from '@/mocks/blogPosts';

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock('@/mocks/server', () => ({
    server: {
        listen: vi.fn(),
        close: vi.fn(),
        resetHandlers: vi.fn(),
    },
}));

describe('useBlogPosts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockFetch.mockReset();
    });

    it('корректно инициализируется с пустыми данными', () => {
        const { posts, loading, error } = useBlogPosts();
        expect(posts.value).toEqual([]);
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    describe('fetchPosts', () => {
        it('успешно загружает посты без фильтров', async() => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    data: mockBlogPosts,
                    total: mockBlogPosts.length,
                    page: 1,
                    limit: 10,
                    totalPages: 1
                })
            });

            const { posts, loading, error, fetchPosts } = useBlogPosts();
            await fetchPosts();

            expect(loading.value).toBe(false);
            expect(error.value).toBeNull();
            expect(posts.value).toHaveLength(mockBlogPosts.length);
            expect(posts.value).toEqual(mockBlogPosts);
        });

        it('обрабатывает ошибки сети', async() => {
            const mockError = new Error('Network error');
            mockFetch.mockRejectedValueOnce(mockError);

            const { error, fetchPosts } = useBlogPosts();
            await fetchPosts();

            expect(error.value).toBe('Network error');
        });

        it('обрабатывает HTTP ошибки', async() => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error'
            });

            const { error, fetchPosts } = useBlogPosts();
            await fetchPosts();

            expect(error.value).toBe('HTTP error! status: 500');
        });

        it('фильтрует посты при передаче параметров', async() => {
            const filteredPosts = [mockBlogPosts[0]];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    data: filteredPosts,
                    total: 1,
                    page: 1,
                    limit: 10,
                    totalPages: 1
                })
            });

            const { posts, fetchPosts } = useBlogPosts();
            await fetchPosts('вдохновение', ['Природа']);

            expect(posts.value).toHaveLength(1);
            expect(posts.value[0].title).toBe('Вдохновение в каждом шаге');
        });
    });

    describe('addComment', () => {
        it('успешно добавляет комментарий', async() => {
            const newComment = {
                author: 'Test User',
                avatar: '/test.png',
                text: 'Test comment',
                date: new Date().toISOString()
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    data: { id: '123', ...newComment },
                    total: 1
                })
            });

            const { addComment } = useBlogPosts();
            const result = await addComment('1', newComment);

            expect(result).toEqual({ id: '123', ...newComment });
            expect(mockFetch).toHaveBeenCalledWith(
                '/api/posts/1/comments',
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newComment)
                })
            );
        });

        it('обрабатывает ошибки при добавлении комментария', async() => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: 'Bad Request'
            });

            const { addComment } = useBlogPosts();
            const result = await addComment('1', {
                author: 'Test',
                avatar: '/test.png',
                text: 'Test',
                date: new Date().toISOString()
            });

            expect(result).toBeNull();
        });
    });
});