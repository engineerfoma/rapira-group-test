<template>
    <div>
        <BlogFilters
            :filters="filters"
            :search-query="searchQuery"
            :is-filters-open="isFiltersOpen"
            @update:filters="filters = $event"
            @update:search-query="searchQuery = $event"
            @update:is-filters-open="isFiltersOpen = $event"
            @clear-all="handleClearAll"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BlogFilters from '@/components/BlogFilters/BlogFilters.vue';
import type { BlogFilter } from '@/types/blog';

const filters = ref<BlogFilter[]>([
    { id: '1', label: 'Дизайн', isSelected: false },
    { id: '2', label: 'Разработка', isSelected: false },
    { id: '3', label: 'Маркетинг', isSelected: false },
]);

const searchQuery = ref('');
const isFiltersOpen = ref(false);

const handleClearAll = () => {
    filters.value = filters.value.map(f => ({ ...f, isSelected: false }));
    searchQuery.value = '';
    isFiltersOpen.value = false;
};
</script>