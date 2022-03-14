import checkOverdue from "lib/utils/checkOverdue"
import { APIResponse, Invoice } from "types"
import { useData } from "lib/hooks/useData";

const useInvoices = () => {
  const mapper = (invoice:APIResponse<Invoice>) => ({...invoice, state: checkOverdue(invoice)})
  const { data:invoices, ...rest} = useData<Invoice>('/api/invoices', mapper)
  return { invoices, ...rest}
}

export default useInvoices