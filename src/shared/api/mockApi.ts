import { type BlogPost, type Comment } from '@/types/blog';
import { mockBlogPosts } from '@/mocks/BlogPosts.ts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    // Получить все посты
    async getPosts(): Promise<BlogPost[]> {
        await delay(700);
        return JSON.parse(JSON.stringify(mockBlogPosts));
    },

    // Добавить комментарий к посту
    async addComment(postId: string, commentData: Omit<Comment, 'id'>): Promise<Comment> {
        await delay(400);

        const post = mockBlogPosts.find(p => p.id === postId);
        if (!post) {
            throw new Error(`Post with id ${postId} not found`);
        }

        const newComment: Comment = {
            id: Date.now().toString(),
            ...commentData
        };

        post.comments.push(newComment);
        return JSON.parse(JSON.stringify(newComment));
    },
};

// Типы для API
export interface AddCommentRequest {
  postId: string;
  comment: Omit<Comment, 'id'>;
}

export interface UpdateCommentRequest {
  postId: string;
  commentId: string;
  updates: Partial<Omit<Comment, 'id'>>;
}

export interface DeleteCommentRequest {
  postId: string;
  commentId: string;
}