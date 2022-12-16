import useSWR from 'swr';

export function useSwrPlus(path, query) {
    const fetcher = async () => {
        return fetch(`${path}${query}`).then((res) => res.json());
    };

    const { data, error, mutate } = useSWR(path, fetcher);

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}
