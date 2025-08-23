import { describe, it, expect } from 'vitest';
import { pluralize } from '@/utils/pluralize';
import type { PluralForms } from '@/utils/pluralize';

const mockForms: PluralForms = {
    one: 'комментарий',
    few: 'комментария',
    many: 'комментариев'
};

describe('pluralize', () => {
    describe('для чисел оканчивающихся на 1 (кроме 11)', () => {
        it('1 комментарий', () => {
            expect(pluralize(1, mockForms)).toBe('1 комментарий');
        });

        it('21 комментарий', () => {
            expect(pluralize(21, mockForms)).toBe('21 комментарий');
        });

        it('101 комментарий', () => {
            expect(pluralize(101, mockForms)).toBe('101 комментарий');
        });
    });

    describe('для чисел оканчивающихся на 2-4 (кроме 12-14)', () => {
        it('2 комментария', () => {
            expect(pluralize(2, mockForms)).toBe('2 комментария');
        });

        it('22 комментария', () => {
            expect(pluralize(22, mockForms)).toBe('22 комментария');
        });
    });

    describe('для чисел оканчивающихся на 0,5-9 и 11-14', () => {
        it('5 комментариев', () => {
            expect(pluralize(5, mockForms)).toBe('5 комментариев');
        });

        it('11 комментариев', () => {
            expect(pluralize(11, mockForms)).toBe('11 комментариев');
        });
    });

    describe('разные формы слов', () => {
        it('работает с разными формами слов', () => {
            const dayForms: PluralForms = {
                one: 'день',
                few: 'дня',
                many: 'дней'
            };

            expect(pluralize(1, dayForms)).toBe('1 день');
            expect(pluralize(2, dayForms)).toBe('2 дня');
            expect(pluralize(5, dayForms)).toBe('5 дней');
        });

        it('работает с английскими формами', () => {
            const englishForms: PluralForms = {
                one: 'apple',
                few: 'apples',
                many: 'apples'
            };

            expect(pluralize(1, englishForms)).toBe('1 apple');
            expect(pluralize(2, englishForms)).toBe('2 apples');
        });
    });
});