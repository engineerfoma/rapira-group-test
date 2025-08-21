import { ref, computed } from 'vue';
import type { BlogFilter } from '@/types/blog';

export function useBlogFilters(initialFilters: BlogFilter[] = []) {
    const filters = ref<BlogFilter[]>(initialFilters);
    const searchQuery = ref('');
    const isFiltersOpen = ref(false);

    const selectedFilters = computed(() =>
        filters.value.filter(filter => filter.isSelected)
    );

    const selectedFiltersCount = computed(() =>
        selectedFilters.value.length
    );

    const hasActiveFilters = computed(() =>
        searchQuery.value !== '' || selectedFiltersCount.value > 0
    );

    const toggleFilter = (filterId: string) => {
        const updatedFilters = filters.value.map(filter =>
            filter.id === filterId
                ? { ...filter, isSelected: !filter.isSelected }
                : filter
        );
        return updatedFilters;
    };

    const clearAll = () => {
        const clearedFilters = filters.value.map(filter => ({
            ...filter,
            isSelected: false
        }));
        searchQuery.value = '';
        isFiltersOpen.value = false;
        return clearedFilters;
    };

    return {
        filters,
        searchQuery,
        isFiltersOpen,
        selectedFilters,
        selectedFiltersCount,
        hasActiveFilters,
        toggleFilter,
        clearAll
    };
}