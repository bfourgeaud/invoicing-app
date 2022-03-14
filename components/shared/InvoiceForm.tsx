import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { Address, APIResponse, Client, Invoice, Item } from "types";
import { addDays, format } from "date-fns";
import styles from "./styles/InvoiceForm.module.scss";
import { emptyInvoice } from "lib/utils/emptyInvoice";
import { Input } from "components/ui/Input";
import { useInvoices, useClients } from "lib/database";
import { FormItemList } from "./FormItemList";
import toMoney from "lib/utils/toMoney";
import FormDrawer from "components/ui/FormDrawer";
import ClientCard from "components/client/ClientCard";
import { SearchField } from "components/ui/SearchField";
import ClientForm from "./ClientForm";
import { useToggle } from "lib/hooks/useToggle";
import { DatePicker } from "components/ui/DatePicker";
import { SelectDropdown } from "components/ui/SelectDropdown";

interface InvoiceFormProps {
  editing?: boolean;
  invoice?: APIResponse<Invoice>;
  show: boolean;
  cancel: () => void;
}

export const InvoiceForm: FC<InvoiceFormProps> = ({editing = false, invoice, cancel, show}) => {
  const { add, update } = useInvoices()
  const [data, setData] = useState<Invoice>(invoice || emptyInvoice());
  const [items, setItems] = useState<Array<Item>>( invoice?.items || []);

  // Handle prop changed
  useEffect(() => { setData(invoice || emptyInvoice()) }, [invoice])

  /* START Search Handler */
  const { clients } = useClients()
  const [clientSearchTerm, setClientSearchTerm] = useState("")
  const [found, setFound] = useState(false)
  const [isModalOpen, modalHandler] = useToggle()

  const filteredClients = useMemo(() => {
    if(found) return null

    const handleSelectClient = (client:Client) => {
      setFound(true)

      setData(prev => ({
        ...prev,
        clientName: `${client.firstname} ${client.lastname}`,
        clientEmail: client.email,
        clientAddress: client.address as Address
      }))

      setClientSearchTerm(`${client.firstname} ${client.lastname}`)
    }

    return clients
      .filter(client => client.firstname.concat(' ', client.lastname).toUpperCase().includes(clientSearchTerm.toUpperCase())) // Filter by firstName & Lastname
      .map((suggest) => (<ClientCard key={suggest.id} client={suggest} onSelect={handleSelectClient} linkDisabled/>)) //Return an array of of ClientCards <li>
  }, [clientSearchTerm, clients, found])
  /* END Search Handler */

  useEffect(() => {
    if(!clients.length) return
    const sender = clients.find(cl => cl.isSelf)
    if(sender) {
      setData(prev => ({
        ...prev,
        senderAddress: sender?.address as Address
      }))
    }
  }, [clients])

  useEffect(() => {
    if(data.clientName !== clientSearchTerm) {
      setFound(false)
    }
  }, [data, clientSearchTerm])

  const ResetFound = () => {
    setData(prev => ({
      ...prev,
      clientName: '',
      clientEmail: '',
      clientAddress: emptyInvoice().clientAddress
    }))
    clearFound()
  }

  const clearFound = () => {
    setClientSearchTerm("")
    setFound(false)
  }

  const clearData = () => {
    setItems([]);
    setData(emptyInvoice());
  }

  /* Update InvoiceItems Total */
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      items,
      total: items
        .map((item) => +item.total)
        .reduce((acc, val) => (acc += val), 0),
    }));
  }, [items])

  /* Update PaymentTerms */
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      paymentDue: format(
        addDays(new Date(Date.now()), data.paymentTerms || 7), "yyyy-MM-dd"),
    }));
  }, [data.paymentTerms])

  /* HANDLERS */
  const handlePaymentTermsChange = (newTerms: number) => {
    console.log("changed", newTerms)
    setData((prev) => ({
      ...prev,
      paymentTerms: newTerms,
    }));
  };

  const handleSave: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if(!editing) {
      add(data)
        .then(setData)
        .catch(err => alert(err.message))
        .finally(quitAndReset)
    } else {
      update(data)
      .then(setData)
      .catch(err => alert(err.message))
      .finally(cancel)
    }
  }

  const handleSaveAsDraft = () => {
    if(editing) return
    add({...data, state: "DRAFT"})
      .then(setData)
      .catch(err => alert(err))
      .finally(quitAndReset)
  }

  const handleCancel = () => {
    // reset data and cancel
    setData(invoice || emptyInvoice());
    clearFound()
    cancel();
  };

  const quitAndReset = () => {
    clearFound()
    clearData()
    cancel();
  };
  /* END OF HANDLERS */

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { dataset, name, value } = e.target
    setData(prev => ({
      ...prev,
      ...(dataset.obj ? {
          [dataset.obj]: {
            ...(prev[dataset.obj as keyof Invoice] as object),
            [name]: value
          }
        }: {
          [name]: value
        })
      }
    ))
  }

  const paymentTermsOptions = [
    { label: "Net 1 Day", value: 1 },
    { label: "Net 7 Days", value: 7 },
    { label: "Net 14 Days", value: 14 },
    { label: "Net 30 Days", value: 30 },
  ]
  
  return (
    <>
      <FormDrawer cancel={handleCancel} save={handleSave} show={show} editing={editing} saveDraft={handleSaveAsDraft}>
        <div className={styles.invoiceForm}>
          <h1>
            {editing && invoice? (<>Edit <span>#</span>{invoice.invoiceNumber}</>) : ("New Invoice")}
          </h1>

          <p className={styles.colorLabel}>Client</p>
          <SearchField
            placeholder="Search Client ..."
            value={clientSearchTerm}
            suggestions={filteredClients}
            onChange={(e) => setClientSearchTerm(e.target.value)}
            onNew={modalHandler.on}
            found={found}
            foundText={`${data.clientName}`}
            onReset={ResetFound}
          />

          <div className={styles.dateAndTerms}>
            <SelectDropdown label="Payment Terms" options={paymentTermsOptions} name="terms" value={data.paymentTerms} onChange={handlePaymentTermsChange}/>
            <DatePicker label="Due Date" value={data.paymentDue} setDate={(date:string) => { setData(prev => ({...prev, paymentDue: date})) }} disabled={editing} />
          </div>

          <Input label="Description" value={data.description} name="description" id="description" onChange={onChange} role="presentation" autoComplete="off"/>
          <FormItemList items={items} setItems={setItems} />

          <div className={styles.grandTotal}>
            <h2>Total</h2>
            <span>{toMoney(data.total)}</span>
          </div>
        </div>
      </FormDrawer>
      <ClientForm
        show={isModalOpen}
        cancel={modalHandler.off}
        editing={false}
      />
    </>
  )
  
}