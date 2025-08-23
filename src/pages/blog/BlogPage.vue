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
    <blog-card-modal
        :is-open="isOpen"
        :post="selectedPost"
        @close="closeModal"
        @add-comment="handleAddComment"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BlogFilters, BlogCardList, BlogCardModal } from '@/components';
import type { BlogFilter, BlogPost, Comment } from '@/types/blog';
import { mockBlogPosts } from '@/mocks/BlogPosts';
import { INIT_BLOG_ITEM } from '@/constants';

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
const blogPosts = ref(mockBlogPosts);
const selectedPost = ref<BlogPost>(INIT_BLOG_ITEM);
const searchQuery = ref('');
const isFiltersOpen = ref(false);

const openPostModal = (post: BlogPost) => {
    isOpen.value = true;
    selectedPost.value = post;
};

const closeModal = () => {
    isOpen.value = false;
    selectedPost.value = INIT_BLOG_ITEM;
};

const updateFilters = (newFilters: BlogFilter[]) => {
    filters.value = newFilters;
};

const clearAllFilters = () => {
    filters.value = filters.value.map(f => ({ ...f, isSelected: false }));
    searchQuery.value = '';
    isFiltersOpen.value = false;
};

const handleAddComment = (payload: {postId: string, comment: Omit<Comment, 'id'>}) => {
    if (selectedPost.value) {
        const newComment = {
            ...payload.comment,
            id: payload.postId
        };
        selectedPost.value.comments.push(newComment);
    }
};
</script>