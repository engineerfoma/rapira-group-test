<template>
    <div class="max-w-[1210px] mx-auto">
        <!-- Mobile Layout -->
        <div class="md:hidden">
            <div class="flex items-center justify-between mb-2.5">
                <h1 class="text-[24px] font-bold leading-[24px] tracking-normal text-center">
                    Блог
                </h1>
                <div class="flex items-center gap-4">
                    <ClearButton
                        v-if="hasActiveFilters"
                        @click="$emit('clearAll')"
                    />
                    <FilterButton
                        :is-open="isFiltersOpen"
                        :badge-count="selectedFiltersCount"
                        @click="$emit('update:isFiltersOpen', !isFiltersOpen)"
                    />
                </div>
            </div>

            <SearchInput
                :model-value="searchQuery"
                class="mb-4"
                @update:model-value="$emit('update:searchQuery', $event)"
            />

            <div
                v-if="isFiltersOpen"
                class="space-y-3"
            >
                <div class="w-full h-px bg-gray-100" />
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

        <!-- Desktop Layout -->
        <div class="hidden md:block">
            <div class="flex items-center gap-10 py-6 px-8">
                <h1 class="text-[32px] font-bold leading-[32px] tracking-normal flex-shrink-0">
                    БЛОГ
                </h1>

                <div class="flex-1">
                    <SearchInput
                        :model-value="searchQuery"
                        @update:model-value="$emit('update:searchQuery', $event)"
                    />
                </div>

                <div class="flex items-center gap-6 flex-shrink-0">
                    <ClearButton
                        v-if="hasActiveFilters"
                        @click="$emit('clearAll')"
                    />
                    <FilterButton
                        :is-open="isFiltersOpen"
                        :badge-count="selectedFiltersCount"
                        @click="$emit('update:isFiltersOpen', !isFiltersOpen)"
                    />
                </div>
            </div>

            <div
                v-if="isFiltersOpen"
                class="px-8 pb-6"
            >
                <div class="w-full h-px bg-gray-100 mb-3" />
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
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SearchInput from '@/shared/ui/SearchInput.vue';
import FilterButton from '@/shared/ui/FilterButton.vue';
import ClearButton from '@/shared/ui/ClearButton.vue';
import FilterChip from './FilterChip.vue';
import type { BlogFiltersProps, BlogFiltersEmits } from '@/types/blog';

const props = defineProps<BlogFiltersProps>();
const emit = defineEmits<BlogFiltersEmits>();

const selectedFiltersCount = computed(() =>
    props.filters.filter(f => f.isSelected).length
);

const hasActiveFilters = computed(() =>
    props.searchQuery !== '' || selectedFiltersCount.value > 0
);

const toggleFilter = (filterId: string) => {
    return props.filters.map(f =>
        f.id === filterId ? { ...f, isSelected: !f.isSelected } : f
    );
};
</script>

<style scoped lang="scss">
// Кастомные стили для точности
.mobile-layout {
padding: 0 16px;
}

.desktop-layout {
padding: 24px 30px;
}

.filter-chips-container {
display: flex;
flex-wrap: wrap;
gap: 8px;
padding: 12px 0;
}
</style>