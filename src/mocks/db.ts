import type { Comment } from '@/types/blog';
import { mockBlogPosts } from './blogPosts';

export const db = {
    posts: mockBlogPosts,
};

export const blogDB = {
    getPosts: (params: {
    search?: string;
    categoryIds?: string[];
    page?: number;
    limit?: number;
  }) => {
        let filteredPosts = [...db.posts];

        if (params.search) {
            const searchTerm = params.search.toLowerCase().trim();
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm)
            );
        }

        if (params.categoryIds && params.categoryIds.length > 0) {
            filteredPosts = filteredPosts.filter(post =>
        params.categoryIds!.some(categoryId =>
            post.categories.includes(categoryId)
        )
            );
        }

        filteredPosts.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const page = params.page || 1;
        const limit = params.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

        return {
            posts: paginatedPosts,
            total: filteredPosts.length,
            page,
            limit,
            totalPages: Math.ceil(filteredPosts.length / limit),
        };
    },

    getPostById: (id: string) => {
        return db.posts.find(post => post.id === id);
    },

    addComment: (postId: string, comment: Comment) => {
        const post = db.posts.find(p => p.id === postId);
        if (!post) return null;

        const newComment = {
            ...comment,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        };

        post.comments.push(newComment);
        return newComment;
    },
};