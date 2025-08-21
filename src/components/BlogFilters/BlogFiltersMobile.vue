<template>
    <div class="px-4">
        <!-- Заголовок и кнопки -->
        <div class="flex items-center justify-between mb-2.5">
            <h1 class="text-2xl font-bold leading-none tracking-normal text-center">
                Блог
            </h1>
            <div class="flex items-center gap-4">
                <button
                    v-if="searchQuery || selectedFiltersCount > 0"
                    class="text-sm font-medium text-[#2884EF]"
                    @click="$emit('clearAll')"
                >
                    Очистить
                </button>
                <FilterButton
                    :is-open="isFiltersOpen"
                    :badge-count="selectedFiltersCount"
                    @click="$emit('update:isFiltersOpen', !isFiltersOpen)"
                />
            </div>
        </div>

        <!-- Поиск -->
        <SearchInput
            :model-value="searchQuery"
            class="mb-4"
            @update:model-value="$emit('update:searchQuery', $event)"
        />

        <!-- Фильтры -->
        <div v-if="isFiltersOpen">
            <div class="w-full h-px bg-gray-100 my-3" />
            <div class="flex flex-wrap gap-2">
                <FilterChip
                    v-for="filter in filters"
                    :key="filter.id"
                    :label="filter.label"
                    :is-selected="filter.isSelected"
                    @toggle="$emit('update:filters', toggleFilter(filter.id))"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SearchInput from '@/components/UI/SearchInput.vue';
import FilterButton from '@/components/UI/FilterButton.vue';
import FilterChip from './FilterChip.vue';
import type { BlogFiltersProps, BlogFiltersEmits } from '@/types/blog';

defineProps<BlogFiltersProps>();
defineEmits<BlogFiltersEmits>();

const selectedFiltersCount = computed(() =>
    filters.filter(f => f.isSelected).length
);

const toggleFilter = (filterId: string) => {
    return filters.map(f =>
        f.id === filterId ? { ...f, isSelected: !f.isSelected } : f
    );
};
</script>