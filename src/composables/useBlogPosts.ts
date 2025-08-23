import { ref, computed } from 'vue';
import type { BlogPost } from '@/types/blog';
import { mockBlogPosts } from '@/mocks/blogPosts';
import { delay } from '@/utils';

export function useBlogPosts() {
    const posts = ref<BlogPost[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const filterPosts = computed(() => {
        return (search: string = '', categoryIds: string[] = []) => {
            let filtered = [...mockBlogPosts];

            if (search) {
                const searchTerm = search.toLowerCase().trim();
                filtered = filtered.filter(post =>
                    post.title.toLowerCase().includes(searchTerm)
                );
            }

            if (categoryIds.length > 0) {
                filtered = filtered.filter(post =>
                    categoryIds.some(categoryId =>
                        post.categories.some(category =>
                            category.toLowerCase() === categoryId.toLowerCase()
                        )
                    )
                );
            }

            return filtered;
        };
    });

    const fetchPosts = async(search: string = '', categoryIds: string[] = []) => {
        loading.value = true;
        error.value = null;

        try {
            await delay(700);

            posts.value = filterPosts.value(search, categoryIds);
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
        filterPosts
    };
}