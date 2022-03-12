import { useScreenContext } from "lib/context/ScreenContext";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Invoice, Item } from "types";
import { addDays, format } from "date-fns";
import styles from "./styles/InvoiceForm.module.scss";
import { emptyInvoice } from "lib/utils/emptyInvoice";
import { Input } from "components/ui/Input";
import { useInvoices } from "lib/hooks/useInvoices";
import createInvoiceNumber from "lib/utils/createInvoiceNumber";
import { BackButton } from "./BackButton";
import { FormItemList } from "./FormItemList";
import toMoney from "lib/utils/toMoney";

interface InvoiceFormProps {
  editing?: boolean;
  invoice?: Required<Invoice>;
  show: boolean;
  cancel: () => void;
}

export const InvoiceForm: FC<InvoiceFormProps> = ({editing = false, invoice, cancel, show}) => {
  const { screenType } = useScreenContext();
  const { invoices, add, update } = useInvoices()
  const [data, setData] = useState<Invoice>(invoice || emptyInvoice());
  const [items, setItems] = useState<Array<Item>>( invoice?.items || []);

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

  const handleSaveInvoice: React.FormEventHandler<HTMLFormElement> = (e) => {
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
      <div className={styles.root} style={{transform: show ? "translateX(0%)" : `translateX(-100%)`}}>
        {screenType === "phone" && <BackButton onClick={cancel} />}
        <form className={styles.content} onSubmit={handleSaveInvoice}>
          <div className={styles.padding}>
            <h1>
              {editing && invoice? (<>Edit <span>#</span>{invoice.invoiceNumber}</>) : ("New Invoice")}
            </h1>

            <p className={styles.colorLabel}>Bill From</p>
            <Input label="Street" value={data.senderAddress.street} data-obj="senderAddress" name="street" onChange={onChange} required />
            <div className={styles.inputGrid}>
              <Input label="City" value={data.senderAddress.city} data-obj="senderAddress" name="city" onChange={onChange} required />
              <Input label="Post Code" value={data.senderAddress.postCode} data-obj="senderAddress" name="postCode" onChange={onChange} required />
              <Input label="Country" value={data.senderAddress.country} data-obj="senderAddress" name="country" onChange={onChange} required />
            </div>

            <p className={styles.colorLabel}>Bill To</p>
            <Input label="Client's Name" value={data.clientName} name="clientName" onChange={onChange} required />
            <Input label="Client's email" value={data.clientEmail} name="clientEmail" onChange={onChange} required />
            <Input label="Street" value={data.clientAddress.street} data-obj="clientAddress" name="street" onChange={onChange} required />
            <div className={styles.inputGrid}>
              <Input label="City" value={data.clientAddress.city} data-obj="clientAddress" name="city" onChange={onChange} required />
              <Input label="Post Code" value={data.clientAddress.postCode} data-obj="clientAddress" name="postCode" onChange={onChange} required />
              <Input label="Country" value={data.clientAddress.country} data-obj="clientAddress" name="country" onChange={onChange} required />
            </div>

            {/*<div className={styles.dateAndTerms}>
              <DatePicker {...datePickerProps} />
              <SelectDropdown {...paymentTermsProps} />
            </div>*/}
            <Input label="Description" value={data.description} name="description" onChange={onChange} />
            <FormItemList items={items} setItems={setItems} />

            <div className={styles.grandTotal}>
              <h2>Total</h2>
              <span>{toMoney(data.total)}</span>
            </div>
          </div>

          <div className={styles.bottomControls}>
            {editing && (
              <>
                {/* empty div for flexbox  */}
                <div />
                <div>
                  <button className="btn btn-light" type="button" onClick={handleCancel}>Cancel</button>
                  <button className="btn btn-purple" type="submit">Save Changes</button>
                </div>
              </>
            )}
            {!editing && (
              <>
                <div>
                  <button className="btn btn-light" type="button" onClick={handleCancel}>Discard</button>
                </div>
                <div>
                  <button className="btn btn-dark" type="button" onClick={handleSaveAsDraft}>Save as Draft</button>
                  <button className="btn btn-purple" type="submit">{"Save & Send"}</button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
      <ModalShadow show={show} cancel={cancel} />
    </>
  )
  
}

const ModalShadow = ({ show, cancel }: { show: boolean; cancel: () => void; }) => {
  
  useEffect(() => {
    if(show) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [show])

  return (
  <div
    className={styles.darkOut}
    onClick={cancel}
    style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateX(0%)" : `translateX(-100%)`,
    }}
  />
)};