import { fetchWrapper } from 'helpers/fetch-wrapper';
import useSWR from 'swr'
interface DataResponse<T> {
    data: T | undefined
    isLoading: boolean
    isError: any
}

const fetcher = <T>(url:string):Promise<T> => fetchWrapper.get(url)

function useQuery<T>(url?: string, initialData?:T): DataResponse<T> {
    const { data, error } = useSWR<T>(url, fetcher, {fallbackData: initialData || undefined})
    return {
        data,
        isLoading: !data && !error,
        isError: error,
    }
}

export default useQuery