import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { Address, Client, Invoice, Item } from "types";
import { addDays, format } from "date-fns";
import styles from "./styles/InvoiceForm.module.scss";
import { emptyInvoice } from "lib/utils/emptyInvoice";
import { Input } from "components/ui/Input";
import { useInvoices } from "lib/hooks/useInvoices";
import createInvoiceNumber from "lib/utils/createInvoiceNumber";
import { FormItemList } from "./FormItemList";
import toMoney from "lib/utils/toMoney";
import FormDrawer from "components/ui/FormDrawer";
import { useClients } from "lib/hooks/useClients";
import ClientCard from "components/client/ClientCard";
import { SearchField } from "components/ui/SearchField";
import { Icon } from "@iconify/react";
import ClientForm from "./ClientForm";
import { useToggle } from "lib/hooks/useToggle";

interface InvoiceFormProps {
  editing?: boolean;
  invoice?: Required<Invoice>;
  show: boolean;
  cancel: () => void;
}

export const InvoiceForm: FC<InvoiceFormProps> = ({editing = false, invoice, cancel, show}) => {
  const { invoices, add, update } = useInvoices()

  

  const [data, setData] = useState<Invoice>(invoice || emptyInvoice());
  const [items, setItems] = useState<Array<Item>>( invoice?.items || []);

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
    if(data.clientName !== clientSearchTerm) {
      setFound(false)
    }
  }, [data,clientSearchTerm])

  const ResetFound = () => {
    setClientSearchTerm("")
    setData(prev => ({
      ...prev,
      clientName: '',
      clientEmail: '',
      clientAddress: emptyInvoice().clientAddress
    }))
    setFound(false)
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
    setData((prev) => ({
      ...prev,
      paymentTerms: newTerms,
    }));
  };

  const handleCancel = () => {
    // reset data and cancel
    if (invoice) {
      setData(invoice);
    }
    cancel();
  };

  const handleSave: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if(!editing) {
      let invoiceNumber = createInvoiceNumber(invoices.map(i => i.invoiceNumber))
      add({...data, state: "PENDING", invoiceNumber})
        .then(setData)
        .catch(err => alert(err))
        .finally(quitAndReset)
    } else {
      update({...data, state: "PENDING"})
      .then(setData)
      .catch(err => alert(err))
      .finally(cancel)
    }
  }

  const handleSaveAsDraft = () => {
    if(editing || data.invoiceNumber) return
    let invoiceNumber = createInvoiceNumber(invoices.map(i => i.invoiceNumber))
    add({...data, state: "DRAFT", invoiceNumber})
      .then(setData)
      .catch(err => alert(err))
      .finally(quitAndReset)
  }

  const quitAndReset = () => {
    setData(emptyInvoice());
    setItems([{ name: "New Item", quantity: 1, total: 0, price: 0 }]);
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
  
  return (
    <>
      <FormDrawer cancel={handleCancel} save={handleSave} show={show} editing={editing} saveDraft={handleSaveAsDraft}>
        <div className={styles.invoiceForm}>
          <h1>
            {editing && invoice? (<>Edit <span>#</span>{invoice.invoiceNumber}</>) : ("New Invoice")}
          </h1>

          {!found && <SearchField value={clientSearchTerm} suggestions={filteredClients} found={found} label="Client" onChange={(e) => setClientSearchTerm(e.target.value)} onNew={modalHandler.on}/>}
          {found &&
            <div className="inline-flex items-center space-x-2 py-2 px-4 my-4 bg-$content-bg rounded-full cursor-pointer">
              <p>{data.clientName}</p>
              <div onClick={ResetFound} className="text-red-300 hover:text-red-500"><Icon icon="ic:round-cancel" /></div>
            </div>
          }

          <p className={styles.colorLabel}>Bill From</p>
          <Input label="Street" value={data.senderAddress.street} data-obj="senderAddress" name="street" id="sender-street" onChange={onChange} required />
          <div className={styles.inputGrid}>
            <Input label="City" value={data.senderAddress.city} data-obj="senderAddress" name="city" id="sender-city" onChange={onChange} required />
            <Input label="Post Code" value={data.senderAddress.postCode} data-obj="senderAddress" name="postCode" id="sender-postCode" onChange={onChange} required />
            <Input label="Country" value={data.senderAddress.country} data-obj="senderAddress" name="country" id="sender-country" onChange={onChange} required />
          </div>

          <p className={styles.colorLabel}>Bill To</p>
          <Input label="Client's Name" value={data.clientName} name="clientName" id="client-name" onChange={onChange} required />
          <Input label="Client's email" value={data.clientEmail} name="clientEmail" id="client-email" onChange={onChange} required />
          <Input label="Street" value={data.clientAddress.street} data-obj="clientAddress" name="street" id="client-street" onChange={onChange} required />
          <div className={styles.inputGrid}>
            <Input label="City" value={data.clientAddress.city} data-obj="clientAddress" name="city" id="client-city" onChange={onChange} required />
            <Input label="Post Code" value={data.clientAddress.postCode} data-obj="clientAddress" name="postCode" id="client-postCode" onChange={onChange} required />
            <Input label="Country" value={data.clientAddress.country} data-obj="clientAddress" name="country" id="client-country" onChange={onChange} required />
          </div>

          {/*<div className={styles.dateAndTerms}>
            <DatePicker {...datePickerProps} />
            <SelectDropdown {...paymentTermsProps} />
          </div>*/}
          <Input label="Description" value={data.description} name="description" id="description" onChange={onChange} />
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