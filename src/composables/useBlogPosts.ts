import { ref } from 'vue';
import type { BlogPost, Comment } from '@/types/blog';

interface PostsResponse {
  data: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ApiResponse<T> {
  data: T;
  total: number;
  error?: string;
}

export function useBlogPosts() {
    const posts = ref<BlogPost[]>([]);
    const categories = ref<string[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const total = ref(0);

    const fetchPosts = async(search: string = '', categoryIds: string[] = []) => {
        loading.value = true;
        error.value = null;

        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            categoryIds.forEach(id => params.append('categoryIds', id));

            const response = await fetch(`/api/posts?${params}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: PostsResponse = await response.json();

            posts.value = result.data;
            total.value = result.total;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch posts';
            console.error('Error fetching posts:', err);
        } finally {
            loading.value = false;
        }
    };

    const addComment = async(postId: string, comment: Omit<Comment, 'id'>): Promise<Comment | null> => {
        try {
            const response = await fetch(`/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: ApiResponse<Comment> = await response.json();
            return result.data;
        } catch (err) {
            console.error('Error adding comment:', err);
            return null;
        }
    };

    return {
        posts,
        categories,
        loading,
        error,
        total,
        fetchPosts,
        addComment
    };
}