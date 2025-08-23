import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BlogFilters from '@/components/BlogFilters/BlogFilters.vue';

const mockClearButton = {
    template: '<button data-test="clear-button">Очистить</button>'
};

const mockFilterButton = {
    template: '<button data-test="filter-button">Фильтр</button>'
};

const mockSearchInput = {
    template: '<input data-test="search-input" />',
    props: ['modelValue']
};

const mockFilterChip = {
    template: '<div data-test="filter-chip">Фильтр</div>',
    props: ['label', 'isSelected']
};

describe('BlogFilters', () => {
    const mountOptions = {
        global: {
            mocks: {
                $t: (key: string) => key
            },
            components: {
                ClearButton: mockClearButton,
                FilterButton: mockFilterButton,
                SearchInput: mockSearchInput,
                FilterChip: mockFilterChip
            }
        }
    };

    it('компонент рендерится без ошибок', () => {
        const wrapper = mount(BlogFilters, {
            props: {
                filters: [],
                searchQuery: '',
                isFiltersOpen: false
            },
            ...mountOptions
        });

        expect(wrapper.exists()).toBe(true);
    });

    it('emits clearAll при клике на кнопку очистки', async() => {
        const wrapper = mount(BlogFilters, {
            props: {
                filters: [{ id: '1', label: 'Test', isSelected: true }],
                searchQuery: 'test',
                isFiltersOpen: false
            },
            ...mountOptions
        });

        await wrapper.vm.$nextTick();

        const clearButton = wrapper.find('[data-test="clear-button"]');
        expect(clearButton.exists()).toBe(true);

        await clearButton.trigger('click');
        expect(wrapper.emitted('clearAll')).toBeTruthy();
    });

    it('emits update:isFiltersOpen при клике на кнопку фильтра', async() => {
        const wrapper = mount(BlogFilters, {
            props: {
                filters: [],
                searchQuery: '',
                isFiltersOpen: false
            },
            ...mountOptions
        });

        await wrapper.vm.$nextTick();

        const filterButton = wrapper.find('[data-test="filter-button"]');
        expect(filterButton.exists()).toBe(true);

        await filterButton.trigger('click');
        expect(wrapper.emitted('update:isFiltersOpen')).toBeTruthy();
    });
});