<template>
    <div>
        <BlogFilters
            :filters="filters"
            :search-query="searchQuery"
            :is-filters-open="isFiltersOpen"
            @update:filters="updateFilters"
            @update:search-query="searchQuery = $event"
            @update:is-filters-open="isFiltersOpen = $event"
            @clear-all="clearAllFilters"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BlogFilters from '@/components/BlogFilters/BlogFilters.vue';
import type { BlogFilter } from '@/types/blog';

const filters = ref<BlogFilter[]>([
    { id: 'design', label: 'Дизайн', isSelected: false },
    { id: 'development', label: 'Разработка', isSelected: false },
    { id: 'marketing', label: 'Маркетинг', isSelected: false },
    { id: 'city', label: 'Город', isSelected: false },
    { id: 'nature', label: 'Природа', isSelected: false },
]);

const searchQuery = ref('');
const isFiltersOpen = ref(false);

const updateFilters = (newFilters: BlogFilter[]) => {
    filters.value = newFilters;
};

const clearAllFilters = () => {
    filters.value = filters.value.map(f => ({ ...f, isSelected: false }));
    searchQuery.value = '';
    isFiltersOpen.value = false;
};
</script>