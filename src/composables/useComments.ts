import { ref } from 'vue';
import type { Comment } from '@/types/blog';
import { mockApi } from '@/shared/api/mockApi';

export function useComments() {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const addComment = async(postId: string, commentData: Omit<Comment, 'id'>) => {
        loading.value = true;
        error.value = null;

        try {
            const newComment = await mockApi.addComment(postId, commentData);
            return newComment;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to add comment';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        error,
        addComment,
    };
}