import { ref } from 'vue';
import type { BlogPost } from '@/types/blog';
import { mockApi } from '@/shared/api/mockApi';

export function useBlogPosts() {
    const posts = ref<BlogPost[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchPosts = async() => {
        loading.value = true;
        error.value = null;

        try {
            posts.value = await mockApi.getPosts();
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch posts';
        } finally {
            loading.value = false;
        }
    };

    return {
        posts,
        loading,
        error,
        fetchPosts,
    };
}