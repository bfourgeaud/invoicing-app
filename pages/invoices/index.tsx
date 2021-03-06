import Head from "next/head";
import { useScreenContext } from "../../lib/context/ScreenContext";
import type { NextPage } from 'next'
import styles from 'styles/InvoiceHome.module.scss'
import { ActionBar } from "components/invoiceHome/ActionBar";
import { useToggle } from "lib/hooks/useToggle";
import { useEffect, useState } from "react";
import { ItemStatus } from "types";
import { InvoiceForm } from "components/shared/InvoiceForm";
import { InvoiceList } from "components/invoiceHome/InvoiceList";

const InvoiceHome: NextPage = () => {
  const { screenType } = useScreenContext()
  const [isModalOpen, modalHandler] = useToggle()
  
  const [draftFilter, draftFilterHandler] = useToggle()
  const [pendingFilter, pendingFilterHandler] = useToggle()
  const [paidFilter, paidFilterHandler] = useToggle()
  const [overdueFilter, overdueFilterHandler] = useToggle()

  const [activeFilters, setActiveFilters] = useState<Array<ItemStatus>>([])

  const updateFiltersEffect = () => {
    let filters: ItemStatus[] = [];

    if (draftFilter) filters.push("DRAFT");
    if (paidFilter) filters.push("PAID");
    if (pendingFilter) filters.push("PENDING");
    if (overdueFilter) filters.push("OVERDUE");

    setActiveFilters(filters);
  }

  useEffect(updateFiltersEffect, [
    paidFilter,
    pendingFilter,
    draftFilter,
    overdueFilter
  ])
  
  const filterHandlers = {
    draft: {
      name: 'draft',
      label: 'Draft',
      value: draftFilter,
      onChange: () => draftFilterHandler.toggle(),
    },
    pending: {
      name: 'pending',
      label: 'Pending',
      value: pendingFilter,
      onChange: () => pendingFilterHandler.toggle(),
    },
    paid: {
      name: 'paid',
      label: 'Paid',
      value: paidFilter,
      onChange: () => paidFilterHandler.toggle(),
    },
    overdue: {
      name: 'overdue',
      label: 'Overdue',
      value: overdueFilter,
      onChange: () => overdueFilterHandler.toggle(),
    },
  }

  return (
    <>
      <main role="main" className={styles.main}>
        <Head>
          <title>Home | Invoicing App</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover' />
          <meta name="description" content="A simple website to manage Invoices" key="description" />
        </Head>
        <ActionBar
          screenType={screenType}
          filterHandlers={filterHandlers}
          handleNewInvoice={modalHandler.on}
        />
        <InvoiceList filters={activeFilters} screenType={screenType} />
      </main>
      <InvoiceForm
        show={isModalOpen}
        cancel={modalHandler.off}
        editing={false}
      />
    </>
  )
}

export default InvoiceHome
