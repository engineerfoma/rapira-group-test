<template>
    <div class="max-w-[1210px] mx-auto">
        <BlogFiltersMobile
            v-if="isMobile"
            :filters="filters"
            :search-query="searchQuery"
            :is-filters-open="isFiltersOpen"
            @update:filters="$emit('update:filters', $event)"
            @update:search-query="$emit('update:searchQuery', $event)"
            @update:is-filters-open="$emit('update:isFiltersOpen', $event)"
            @clear-all="$emit('clearAll')"
        />
        <BlogFiltersDesktop
            v-else
            :filters="filters"
            :search-query="searchQuery"
            :is-filters-open="isFiltersOpen"
            @update:filters="$emit('update:filters', $event)"
            @update:search-query="$emit('update:searchQuery', $event)"
            @update:is-filters-open="$emit('update:is-filters-open', $event)"
            @clear-all="$emit('clearAll')"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BlogFiltersMobile from './BlogFiltersMobile.vue';
import BlogFiltersDesktop from './BlogFiltersDesktop.vue';
import type { BlogFiltersProps, BlogFiltersEmits } from '@/types/blog';

defineProps<BlogFiltersProps>();
defineEmits<BlogFiltersEmits>();

const isMobile = computed(() => window.innerWidth <= 800);
</script>