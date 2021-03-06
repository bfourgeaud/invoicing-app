import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Invoice, UpdateRequest } from "types";
import { useScreenContext } from "lib/context/ScreenContext";
import { useToggle } from "lib/hooks/useToggle";
import { InvoiceForm } from "components/shared/InvoiceForm";
import styles from "styles/InvoicePage.module.scss";
import { BackButton } from "components/shared/BackButton";
import { useInvoices } from "lib/database";
import { StatusBar } from "components/invoice/StatusBar";
import { Summary } from "components/invoice/Summary";
import { BottomControls } from "components/invoice/BottomControls";
import { DeleteModal } from "components/ui/DeleteModal";

const InvoicePage: React.FC = ({}) => {
  const router = useRouter();
  const { id } = router.query

  const { delete:_delete, update, invoices } = useInvoices();
  const [invoice, setInvoice] = useState<Required<Invoice>>()
  const [isEditing, setEditing] = useToggle(false);
  const [deleting, deletingHandlers] = useToggle(false);
  const { screenType } = useScreenContext();

  useEffect(() => setInvoice(invoices.find(i => i.id === id)), [invoices, id])

  const handleDeletion = (id: string) => {
    _delete(id);
    router.replace("/");
  };

  const handleMarkAsPaid = () => update({ ...invoice, state: "PAID" } as UpdateRequest<Invoice>)
  const handlePublish = () => update({ ...invoice, state: "PENDING" } as UpdateRequest<Invoice>)

  return (
    <main role="main" className={styles.main} >
      <Head>
        <title>Invoice #{invoice?.invoiceNumber} | Invoice App</title>
      </Head>
      <BackButton />
      {invoice && (
        <InvoiceForm
          editing={true}
          show={isEditing}
          cancel={setEditing.off}
          invoice={invoice}
        />
      )}
      {invoice && (
        <StatusBar
          status={invoice.state}
          screenType={screenType}
          onClickEditing={setEditing.toggle}
          onClickDelete={deletingHandlers.on}
          onClickPaid={handleMarkAsPaid}
          onClickPublish={handlePublish}
        />
      )}
      {invoice && <Summary invoice={invoice} />}
      {invoice && screenType === "phone" && (
        <BottomControls
          onClickEditing={setEditing.toggle}
          onClickDelete={deletingHandlers.on}
          onClickPaid={handleMarkAsPaid}
          onClickPublish={handlePublish}
          status={invoice.state}
        />
      )}
      {deleting && invoice && (
        <DeleteModal
          message={`Are you sure you want to delete invoice #${invoice.invoiceNumber}? This action cannot be
          undone.`}
          onConfirm={() => handleDeletion(invoice.id as string)}
          onCancel={deletingHandlers.off}
        />
      )}
    </main>
  );
};

export default InvoicePage;