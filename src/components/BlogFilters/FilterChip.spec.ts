import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FilterChip from '@/components/BlogFilters/FilterChip.vue';

vi.mock('@/shared/assets/icons/icon-plus.svg', () => ({
    default: 'icon-plus'
}));

vi.mock('@/shared/assets/icons/icon-check.svg', () => ({
    default: 'icon-check'
}));

describe('FilterChip', () => {
    it('отображает переданный label', () => {
        const wrapper = mount(FilterChip, {
            props: {
                label: 'Природа',
                isSelected: false
            }
        });

        expect(wrapper.text()).toContain('Природа');
    });

    it('отображает плюс когда не выбран', () => {
        const wrapper = mount(FilterChip, {
            props: {
                label: 'Тест',
                isSelected: false
            }
        });

        const img = wrapper.find('img');
        expect(img.attributes('src')).toBe('icon-plus');
    });

    it('отображает галочку когда выбран', () => {
        const wrapper = mount(FilterChip, {
            props: {
                label: 'Тест',
                isSelected: true
            }
        });

        const img = wrapper.find('img');
        expect(img.attributes('src')).toBe('icon-check');
    });

    it('emits toggle событие при клике', async() => {
        const wrapper = mount(FilterChip, {
            props: {
                label: 'Тест',
                isSelected: false
            }
        });

        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted('toggle')).toBeTruthy();
    });
});