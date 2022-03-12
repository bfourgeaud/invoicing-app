import { fetchWrapper } from 'lib/helpers/fetch-wrapper';
import useSWR, { KeyedMutator } from 'swr'
interface DataResponse<T> {
    data: Required<T> | T | undefined
    isLoading: boolean
    isError: any,
    mutate: KeyedMutator<Required<T>>
}

const fetcher = <T>(url:string):Promise<Required<T>> => fetchWrapper.get<Required<T>>(url)

function useQuery<T>(url?: string, initialData?:T): DataResponse<T> {
    const { data, error, mutate } = useSWR<Required<T>>(url, fetcher)
    return {
        data,
        isLoading: !data && !error,
        isError: error,
        mutate
    }
}

export default useQuery