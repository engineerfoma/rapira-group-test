<template>
    <section
        :class="['bg-white', $style.filters]"
    >
        <div :class="['max-w-[1210px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between md:gap-4', $style.container]">
            <div class="order-1 flex justify-between items-center md:contents">
                <h2 class="font-gilroy md:order-1 mr-[35px]">
                    {{ $t('blog.title') }}
                </h2>
                <div class="order-2 md:order-3 flex gap-[10px]">
                    <clear-button
                        v-if="hasActiveFilters"
                        @click="$emit('clearAll')"
                    />
                    <filter-button
                        :is-open="isFiltersOpen"
                        @click="$emit('update:isFiltersOpen', !isFiltersOpen)"
                    />
                </div>
            </div>

            <div class="order-3 mt-4 md:mt-0 md:order-2 md:flex-1">
                <SearchInput
                    :model-value="searchQuery"
                    @update:model-value="$emit('update:searchQuery', $event)"
                />
            </div>
        </div>
        <div
            v-if="isFiltersOpen"
            class="md:order-4"
        >
            <div class="w-full h-px bg-gray-100" />
            <div class="flex flex-wrap gap-2 py-3 md:py-5">
                <FilterChip
                    v-for="filter in filters"
                    :key="filter.id"
                    :label="filter.label"
                    :is-selected="filter.isSelected"
                    @toggle="$emit('update:filters', toggleFilter(filter.id))"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
    ClearButton,
    FilterButton,
    SearchInput,
} from '@/shared/ui/';
import FilterChip from './FilterChip.vue';
import type { BlogFiltersEmits, BlogFiltersProps } from '@/types/blog';

const props = defineProps<BlogFiltersProps>();
defineEmits<BlogFiltersEmits>();

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

<style lang="scss" module>
.filters {
    padding-inline: 10px;

    @media (min-width: 800px) {
        padding-inline: 30px;
    }
}

.container {
    padding-block: 12px;

    @media (min-width: 800px) {
        padding-block: 20px;
    }
}

</style>