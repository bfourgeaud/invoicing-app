import { fetchWrapper } from 'lib/helpers/fetch-wrapper';
import { useMemo } from 'react';
import useSWR, { KeyedMutator } from 'swr'
import { APIResponse, UpdateRequest } from 'types';

const fetcher = <T>(url:string):Promise<T> => fetchWrapper.get<T>(url)


/* START SWR QUERY */
interface DataResponse<T> {
  data: T | undefined
  isLoading: boolean
  isError: any,
  mutate: KeyedMutator<T>
}

function useQuery<T>(url?: string, initialData?:T): DataResponse<T> {
  const { data, error, mutate } = useSWR<T>(url, fetcher)
  return {
      data: data,
      isLoading: !data && !error,
      isError: error,
      mutate
  }
}
/* END SWR QUERY */

/* START FETCH DATA & CACHE */
type Mapper<T> = (e:APIResponse<T>) => APIResponse<T>

// !!! \\\ ATTENTION MARCHE QUE POUR DES RETOUR DE TYPE ARRAY
const useFetched = <T>(url:string, mapper?:Mapper<T>) => {
  const {data:result, isLoading, isError, mutate} = useQuery<Array<APIResponse<T>>>(url)
  
  const data = useMemo(() => {
    if(!result || !result.length) return []
    if(!mapper) return result
    return result?.map(mapper)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  return { data, mutate, isError, isLoading }
}
/* END */

/* START Main HOOK */
export const useData = <T>(url:string, mapper?:Mapper<T>) => {
  const { data, mutate, isError, isLoading } = useFetched<T>(url, mapper)

  /* Cache handlers */
  const cUpdate = (obj:APIResponse<T>) => {
    const index = data.findIndex(i => i.id === obj.id)
    if(index >= 0) {
      const dataCopy = data.slice()
      dataCopy[index] = obj
      mutate(dataCopy, false)
    }
    return obj
  }

  const cAdd = (obj:APIResponse<T>) => {
    mutate([...data, obj], false)
    return obj
  }

  const cDelete = (obj:APIResponse<T>) => {
    mutate(data.filter(i => i.id !== obj.id), false)
    return obj
  }

  /* Mutation handlers */
  const add = (obj:T):Promise<APIResponse<T>> => fetchWrapper.post<T>(url, obj).then(cAdd)
  const update = (obj:UpdateRequest<T>):Promise<APIResponse<T>> => {
    const { id, ...data} = obj
    if(!id) throw new Error('Cannot be updated without id')
    return fetchWrapper.put<T>(`${url}/${id}`, data).then(cUpdate)
  }
  const _delete = (id:string):Promise<APIResponse<T>> => fetchWrapper.delete<T>(`${url}/${id}`).then(cDelete)

  return { data, isError, isLoading, add, update, delete:_delete}
}
/* END Main HOOK */


