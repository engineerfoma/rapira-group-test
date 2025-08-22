<template>
    <blog-filters
        :filters="filters"
        :search-query="searchQuery"
        :is-filters-open="isFiltersOpen"
        @update:filters="updateFilters"
        @update:search-query="searchQuery = $event"
        @update:is-filters-open="isFiltersOpen = $event"
        @clear-all="clearAllFilters"
    />
    <blog-card-list
        :posts="blogPosts"
        @open-modal="openPostModal"
    />
<!--
    <blog-post-modal
        v-if="selectedPost"
        :post="selectedPost"
        @close="selectedPost = null"
        @add-comment="addCommentToPost"
    /> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BlogFilters, BlogCardList } from '@/components/BlogFilters';
import type { BlogFilter, BlogPost } from '@/types/blog';
import { mockBlogPosts } from '@/mocks/BlogPost';

const filters = ref<BlogFilter[]>([
    { id: 'design', label: 'Дизайн', isSelected: false },
    { id: 'development', label: 'Разработка', isSelected: false },
    { id: 'marketing', label: 'Маркетинг', isSelected: false },
    { id: 'city', label: 'Город', isSelected: false },
    { id: 'nature', label: 'Природа', isSelected: false },
]);

const blogPosts = ref(mockBlogPosts);
const selectedPost = ref<BlogPost | null>(null);
const searchQuery = ref('');
const isFiltersOpen = ref(false);

const openPostModal = (post: BlogPost) => {
    selectedPost.value = post;
};

const updateFilters = (newFilters: BlogFilter[]) => {
    filters.value = newFilters;
};

const clearAllFilters = () => {
    filters.value = filters.value.map(f => ({ ...f, isSelected: false }));
    searchQuery.value = '';
    isFiltersOpen.value = false;
};

// const addCommentToPost = (comment: Omit<Comment, 'id'>) => {
//     if (selectedPost.value) {
//         const newComment = {
//             ...comment,
//             id: Date.now().toString()
//         };
//         selectedPost.value.comments.push(newComment);
//     }
// };
</script>