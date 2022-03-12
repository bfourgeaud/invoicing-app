import { fetchWrapper } from "lib/helpers/fetch-wrapper"
import useQuery from "lib/hooks/useQuery"
import { useMemo } from "react"
import { Client } from "types"

const useFetchedClients = () => {
  const {data, isLoading, isError, mutate} = useQuery<Array<Required<Client>>>('/api/clients')
  
  const clients = useMemo(() => {
    if(!data || !data.length) return []
    return data?.map(client => ({ ...client })) /*Set State Depending if he has some overdued invoices etc ... */
  }, [data])

  const setClients = mutate
  return { clients, setClients, isError, isLoading }
}

export const useClients = () => {
  const { clients, setClients, isError, isLoading } = useFetchedClients()

  const updateCache = (client: Required<Client>) => {
    const index = clients.findIndex(i => i.id === client.id)
    if(index >= 0) {
      const clientsCopy = clients.slice()
      clientsCopy[index] = client
      setClients(clientsCopy, false)
    }

    return client
  }

  const addCache = (client: Required<Client>) => {
    setClients([...clients, client], false)
    return client
  }

  const deleteCache = (client: Client) => {
    setClients(clients.filter(i => i.id !== client.id), false)
    return client
  }

  /**
   * TODO: Add catch
   */
  const add = (client: Partial<Client>):Required<Promise<Client>> => fetchWrapper.post<Client>(`/api/clients`, client).then(addCache)
  const update = (client: Partial<Client>):Required<Promise<Client>> => {
    const { id, state, ...data} = client
    if(!id) throw new Error('Invoice cannot be updated without id')
    return fetchWrapper.put<Client>(`/api/clients/${id}`, data).then(updateCache)
  }
  const _delete = (id:string):Required<Promise<Client>> => fetchWrapper.delete<Client>(`/api/clients/${id}`).then(deleteCache)

  return { clients, isError, isLoading, add, update, delete:_delete}
}