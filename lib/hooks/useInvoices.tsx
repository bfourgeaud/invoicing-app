import { fetchWrapper } from "lib/helpers/fetch-wrapper"
import useQuery from "lib/hooks/useQuery"
import checkOverdue from "lib/utils/checkOverdue"
import { useMemo } from "react"
import { Invoice } from "types"

const useFetchedInvoices = () => {
  const {data, isLoading, isError, mutate} = useQuery<Array<Required<Invoice>>>('/api/invoices')
  
  const invoices = useMemo(() => {
    if(!data || !data.length) return []
    return data?.map(invoice => ({ ...invoice, state: checkOverdue(invoice) }))
  }, [data])

  const setInvoices = mutate
  return { invoices, setInvoices, isError, isLoading }
}

export const useInvoices = () => {
  const { invoices, setInvoices, isError, isLoading } = useFetchedInvoices()

  const updateCache = (invoice: Required<Invoice>) => {
    const index = invoices.findIndex(i => i.id === invoice.id)
    if(index >= 0) {
      const invoicesCopy = invoices.slice()
      invoicesCopy[index] = invoice
      setInvoices(invoicesCopy, false)
    }

    return invoice
  }

  const addCache = (invoice: Required<Invoice>) => {
    setInvoices([...invoices, invoice], false)
    return invoice
  }

  const deleteCache = (invoice: Invoice) => {
    setInvoices(invoices.filter(i => i.id !== invoice.id), false)
    return invoice
  }

  /**
   * TODO: Add catch
   */
  const add = (invoice: Partial<Invoice>):Required<Promise<Invoice>> => fetchWrapper.post<Invoice>(`/api/invoices`, invoice).then(addCache)
  const update = (invoice: Partial<Invoice>):Required<Promise<Invoice>> => {
    const { id, createdAt, ...data} = invoice
    if(!id) throw new Error('Invoice cannot be updated without id')
    return fetchWrapper.put<Invoice>(`/api/invoices/${id}`, data).then(updateCache)
  }
  const _delete = (id:string):Required<Promise<Invoice>> => fetchWrapper.delete<Invoice>(`/api/invoices/${id}`).then(deleteCache)

  return { invoices, isError, isLoading, add, update, delete:_delete}
}