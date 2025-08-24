<template>
    <blog-filters
        :filters="filters"
        :search-query="searchQuery"
        :is-filters-open="isFiltersOpen"
        @update:filters="updateFilters"
        @update:search-query="updateSearchQuery"
        @update:is-filters-open="isFiltersOpen = $event"
        @clear-all="clearAllFilters"
    />
    <blog-card-list
        :posts="posts"
        :error="postError"
        :loading="postLoading"
        @open-modal="openPostModal"
    />
    <blog-card-modal
        :is-open="isOpen"
        :post="selectedPost"
        @close="closeModal"
        @add-comment="handleAddComment"
    />
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed, nextTick  } from 'vue';
import { BlogFilters, BlogCardList, BlogCardModal } from '@/components';
import type { BlogFilter, BlogPost, Comment } from '@/types/blog';
import { INIT_BLOG_ITEM } from '@/constants';
import { useBlogPosts, useUrlParams } from '@/composables';

const filters = ref<BlogFilter[]>([
    { id: 'design', label: 'Дизайн', isSelected: false },
    { id: 'development', label: 'Разработка', isSelected: false },
    { id: 'art', label: 'Искусство', isSelected: false },
    { id: 'people', label: 'Люди', isSelected: false },
    { id: 'nature', label: 'Природа', isSelected: false },
    { id: 'animals', label: 'Животные', isSelected: false },
    { id: 'food', label: 'Еда', isSelected: false },
]);

const isOpen = ref<boolean>(false);
const selectedPost = ref<BlogPost>(INIT_BLOG_ITEM);
const searchQuery = ref('');
const isFiltersOpen = ref(false);

const {
    loading: postLoading,
    error: postError,
    posts,
    fetchPosts,
    addComment
} = useBlogPosts();

const { getUrlParams, setUrlParams, syncWithUrl } = useUrlParams();

const selectedCategoryTitle = computed(() => {
    return filters.value
        .filter(filter => filter.isSelected)
        .map(filter => filter.label);
});

onMounted(async() => {
    const urlParams = getUrlParams();

    if (urlParams.search) {
        searchQuery.value = urlParams.search;
    }

    if (urlParams.categories.length > 0) {
        isFiltersOpen.value = true;

        filters.value = filters.value.map(filter => ({
            ...filter,
            isSelected: urlParams.categories.includes(filter.label)
        }));
    }

    fetchPosts(urlParams.search, urlParams.categories);
    await nextTick();
});

watch([searchQuery, selectedCategoryTitle], ([newSearch, newCategories]) => {
    syncWithUrl({
        search: newSearch,
        categories: newCategories
    });

    fetchPosts(newSearch, newCategories);
}, { deep: true });

const openPostModal = async(post: BlogPost) => {
    isOpen.value = true;
    selectedPost.value = { ...post };
};

const closeModal = () => {
    isOpen.value = false;
};

const updateFilters = (newFilters: BlogFilter[]) => {
    filters.value = newFilters;
};

const updateSearchQuery = (query: string) => {
    searchQuery.value = query;
};

const clearAllFilters = () => {
    filters.value = filters.value.map(f => ({ ...f, isSelected: false }));
    searchQuery.value = '';
    setUrlParams({ search: '', categories: [] });
};

const handleAddComment = async(payload: {postId: string, comment: Omit<Comment, 'id'>}) => {
    try {
        const newComment = await addComment(payload.postId, payload.comment);

        if (newComment && selectedPost.value) {
            const postIndex = posts.value.findIndex(p => p.id === payload.postId);
            if (postIndex !== -1) {
                posts.value[postIndex].comments.push(newComment);
            }
        }
    } catch (error) {
        console.error('Failed to add comment:', error);
    }
};
</script>