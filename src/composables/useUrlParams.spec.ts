import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUrlParams } from '@/composables/useUrlParams';

const mockReplace = vi.fn();
vi.mock('vue-router', () => ({
    useRoute: () => ({ query: {} }),
    useRouter: () => ({ replace: mockReplace })
}));

vi.mock('lodash-es', () => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    debounce: (fn: Function) => fn
}));

describe('useUrlParams', () => {
    beforeEach(() => {
        mockReplace.mockClear();
    });

    it('возвращает пустые значения по умолчанию', () => {
        const { getUrlParams } = useUrlParams();
        expect(getUrlParams()).toEqual({ search: '', categories: [] });
    });

    it('добавляет search в URL', () => {
        const { setUrlParams } = useUrlParams();
        setUrlParams({ search: 'горы' });

        expect(mockReplace).toHaveBeenCalledWith({
            query: { search: 'горы' }
        });
    });

    it('добавляет categories в URL', () => {
        const { setUrlParams } = useUrlParams();
        setUrlParams({ categories: ['природа', 'горы'] });

        expect(mockReplace).toHaveBeenCalledWith({
            query: { categories: 'природа,горы' }
        });
    });
});