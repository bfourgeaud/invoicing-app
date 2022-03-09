import useSWR from 'swr';
import graphcms from "../libs/graphcms"

interface DataPaylaod<T> {
    [key: string]: T;
}

interface DataResponse<T> {
    data: T | undefined;
    isLoading: boolean;
    isError: any;
}

function useQuery<T>(query: string, key: string, initialData?:T, ...args:any[]): DataResponse<T> {
    const opts = initialData ? {fallbackData: {[key]:initialData}} : undefined
    const { data: payload, error } = useSWR<DataPaylaod<T>>([query, ...args], graphcms, opts);
    const data = payload ? payload[key] : undefined
    return {
        data,
        isLoading: !data && !error,
        isError: error,
    }
}

export default useQuery;