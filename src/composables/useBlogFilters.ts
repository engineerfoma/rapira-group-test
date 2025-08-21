import { ref, computed } from 'vue';
import type { BlogFilter } from '@/types/blog';

export function useBlogFilters(initialFilters: BlogFilter[] = []) {
    const filters = ref<BlogFilter[]>(initialFilters);
    const searchQuery = ref('');
    const isFiltersOpen = ref(false);

    const toggleFilter = (filterId: string) => {
        filters.value = filters.value.map(filter =>
            filter.id === filterId
                ? { ...filter, isSelected: !filter.isSelected }
                : filter
        );
    };

    const clearAll = () => {
        filters.value = filters.value.map(filter => ({
            ...filter,
            isSelected: false
        }));
        searchQuery.value = '';
    };

    const selectedFiltersCount = computed(() =>
        filters.value.filter(filter => filter.isSelected).length
    );

    return {
        filters,
        searchQuery,
        isFiltersOpen,
        toggleFilter,
        clearAll,
        selectedFiltersCount
    };
}