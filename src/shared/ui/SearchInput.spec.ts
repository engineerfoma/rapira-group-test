import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchInput from '@/shared/ui/SearchInput.vue';

vi.mock('@/shared/assets/icons/icon-magnifier.svg', () => ({
    default: 'search-icon'
}));

vi.mock('lodash-es', () => ({
    debounce: vi.fn((fn) => fn)
}));

describe('SearchInput', () => {
    it('отображает значение и placeholder', () => {
        const wrapper = mount(SearchInput, {
            props: {
                modelValue: 'тест'
            }
        });

        const input = wrapper.find('input');
        expect(input.element.value).toBe('тест');
        expect(input.attributes('placeholder')).toBe('Поиск');
    });

    it('emits событие при вводе', async() => {
        const wrapper = mount(SearchInput, {
            props: {
                modelValue: ''
            }
        });

        const input = wrapper.find('input');
        await input.setValue('поиск');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['поиск']);
    });
});