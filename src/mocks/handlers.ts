import { http, HttpResponse } from 'msw';
import { blogDB } from './db';
import type { Comment, ApiError } from '@/types/blog';
import { delay } from '@/utils';

export const handlers = [
    http.get('/api/posts', async({ request }) => {
        const url = new URL(request.url);

        const search = url.searchParams.get('search') || undefined;
        const categoryIds = url.searchParams.getAll('categoryIds');
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');

        await delay(700);

        try {
            const result = blogDB.getPosts({
                search,
                categoryIds: categoryIds.length > 0 ? categoryIds : undefined,
                page,
                limit,
            });

            return HttpResponse.json({
                data: result.posts,
                total: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: result.totalPages,
            });
        } catch {
            return HttpResponse.json<ApiError>(
                { error: 'Failed to fetch posts' },
                { status: 500 }
            );
        }
    }),

    http.post('/api/posts/:id/comments', async({ params, request }) => {
        const { id } = params;

        try {
            const body = await request.json() as Omit<Comment, 'id' | 'date'>;

            const newComment = {
                ...body,
                id: Date.now().toString(),
                date: new Date().toISOString(),
            };

            const post = blogDB.getPostById(id as string);
            if (!post) {
                return HttpResponse.json<ApiError>(
                    { error: 'Post not found' },
                    { status: 404 }
                );
            }

            post.comments.push(newComment);

            return HttpResponse.json({ data: newComment }, { status: 201 });
        } catch {
            return HttpResponse.json<ApiError>(
                { error: 'Failed to add comment' },
                { status: 500 }
            );
        }
    }),
];