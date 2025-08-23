import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextareaExpander from '@/shared/ui/TextareaExpander.vue';

const $t = (key: string) => {
    const translations: Record<string, string> = {
        'modal.cancel': 'Отмена',
        'modal.publish': 'Опубликовать'
    };
    return translations[key] || key;
};

describe('TextareaExpander', () => {
    it('отображает textarea с placeholder', () => {
        const wrapper = mount(TextareaExpander, {
            props: {
                placeholder: 'Введите комментарий'
            },
            global: {
                mocks: { $t }
            }
        });

        const textarea = wrapper.find('textarea');
        expect(textarea.attributes('placeholder')).toBe('Введите комментарий');
    });

    it('принимает начальное значение через modelValue', () => {
        const wrapper = mount(TextareaExpander, {
            props: {
                modelValue: 'Тестовый текст'
            },
            global: {
                mocks: { $t }
            }
        });

        const textarea = wrapper.find('textarea');
        expect(textarea.element.value).toBe('Тестовый текст');
    });

    it('раскрывается при фокусе', async() => {
        const wrapper = mount(TextareaExpander, {
            global: {
                mocks: { $t }
            }
        });

        const textarea = wrapper.find('textarea');
        await textarea.trigger('focus');

        expect(textarea.attributes('rows')).toBe('4');

        expect(wrapper.find('.cancel-btn').exists()).toBe(true);
        expect(wrapper.find('.submit-btn').exists()).toBe(true);
    });

    it('emits update:modelValue при вводе текста', async() => {
        const wrapper = mount(TextareaExpander, {
            global: {
                mocks: { $t }
            }
        });

        const textarea = wrapper.find('textarea');
        await textarea.setValue('Новый текст');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Новый текст']);
    });

    it('emits submit при нажатии кнопки и наличии текста', async() => {
        const wrapper = mount(TextareaExpander, {
            global: {
                mocks: { $t }
            }
        });

        const textarea = wrapper.find('textarea');
        await textarea.setValue('Текст для отправки');
        await textarea.trigger('focus');

        const submitBtn = wrapper.find('.submit-btn');
        await submitBtn.trigger('click');

        expect(wrapper.emitted('submit')).toBeTruthy();
        expect(wrapper.emitted('submit')?.[0]).toEqual(['Текст для отправки']);
    });

    it('emits cancel при нажатии кнопки отмены', async() => {
        const wrapper = mount(TextareaExpander, {
            global: {
                mocks: { $t }
            }
        });

        const textarea = wrapper.find('textarea');
        await textarea.trigger('focus');

        const cancelBtn = wrapper.find('.cancel-btn');
        await cancelBtn.trigger('click');

        expect(wrapper.emitted('cancel')).toBeTruthy();
    });

    it('блокирует кнопку отправки при пустом тексте', async() => {
        const wrapper = mount(TextareaExpander, {
            global: {
                mocks: { $t }
            }
        });

        const textarea = wrapper.find('textarea');
        await textarea.trigger('focus');

        const submitBtn = wrapper.find('.submit-btn');
        expect(submitBtn.attributes('disabled')).toBeDefined();
    });
});