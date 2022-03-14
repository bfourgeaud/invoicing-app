import { Client } from "types"
import { useData } from "lib/hooks/useData";

const useClients = () => {
  const { data:clients, ...rest} = useData<Client>('/api/clients')
  return { clients, ...rest}
}

export default useClients