import { ActionBar } from "components/client/ActionBar";
import ClientGrid from "components/client/ClientGrid";
import { useScreenContext } from "../../lib/context/ScreenContext";
import { NextPage } from "next";
import Head from "next/head";
import styles from 'styles/ClientHome.module.scss'
import { useToggle } from "lib/hooks/useToggle";
import { useState } from "react";
import { ClientState } from "types";
import ClientForm from "components/shared/ClientForm";

const filterHandlers = {
  draft: {
    name: 'draft',
    label: 'Draft',
    value: false,
    onChange: () => {/*draftFilterHandler.toggle()*/},
  },
  pending: {
    name: 'pending',
    label: 'Pending',
    value: false,
    onChange: () => {/*pendingFilterHandler.toggle()*/},
  },
  paid: {
    name: 'paid',
    label: 'Paid',
    value: false,
    onChange: () => {/*paidFilterHandler.toggle()*/},
  },
  overdue: {
    name: 'overdue',
    label: 'Overdue',
    value: false,
    onChange: () => {/*overdueFilterHandler.toggle()*/},
  },
}

const ClientHome:NextPage = () => {
  const { screenType } = useScreenContext()
  const [isModalOpen, modalHandler] = useToggle()
  const [activeFilters, setActiveFilters] = useState<Array<ClientState>>([])
  
  return (
    <>
      <main role="main" className={styles.main}>
        <Head>
          <title>Home | Clients</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover' />
          <meta name="description" content="A simple website to manage Invoices" key="description" />
        </Head>
        <ActionBar
          screenType={screenType}
          filterHandlers={filterHandlers}
          handleNew={modalHandler.on}
        />
        <ClientGrid filters={activeFilters} screenType={screenType} />
      </main>
      <ClientForm
        show={isModalOpen}
        cancel={modalHandler.off}
        editing={false}
      />
    </>
  )
}

export default ClientHome;