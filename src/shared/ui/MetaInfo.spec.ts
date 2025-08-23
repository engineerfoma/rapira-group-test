import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MetaInfo from '@/shared/ui/MetaInfo.vue';

describe('MetaInfo', () => {
    it('отображает текст', () => {
        const wrapper = mount(MetaInfo, {
            props: {
                text: '5 минут'
            }
        });

        expect(wrapper.text()).toContain('5 минут');
    });

    it('отображает иконку с alt текстом', () => {
        const wrapper = mount(MetaInfo, {
            props: {
                text: 'Комментарии',
                icon: 'comment-icon.svg',
                altText: 'Иконка'
            }
        });

        const img = wrapper.find('img');
        expect(img.exists()).toBe(true);
        expect(img.attributes('alt')).toBe('Иконка');
    });

    it('имеет разделитель по умолчанию', () => {
        const wrapper = mount(MetaInfo, {
            props: {
                text: 'Тест'
            }
        });

        expect(wrapper.find('.meta-info__separator').exists()).toBe(true);
    });
});