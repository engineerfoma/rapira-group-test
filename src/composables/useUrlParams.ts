import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash-es';

export function useUrlParams() {
    const route = useRoute();
    const router = useRouter();

    const getUrlParams = () => {
        const search = route.query.search as string || '';
        const categories = route.query.categories as string || '';

        return {
            search: search,
            categories: categories ? categories.split(',').filter(Boolean) : []
        };
    };

    const setUrlParams = debounce((params: { search?: string; categories?: string[] }) => {
        const currentQuery = { ...route.query };

        if (params.search !== undefined) {
            if (params.search) {
                currentQuery.search = params.search;
            } else {
                delete currentQuery.search;
            }
        }

        if (params.categories !== undefined) {
            if (params.categories.length > 0) {
                currentQuery.categories = params.categories.join(',');
            } else {
                delete currentQuery.categories;
            }
        }

        router.replace({ query: currentQuery });
    }, 300);

    const syncWithUrl = (state: { search: string; categories: string[] }) => {
        const urlParams = getUrlParams();

        if (urlParams.search !== state.search ||
        JSON.stringify(urlParams.categories) !== JSON.stringify(state.categories)) {

            setUrlParams(state);
        }
    };

    return {
        getUrlParams,
        setUrlParams,
        syncWithUrl
    };
}