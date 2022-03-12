import { Spinner } from "components/ui/Spinner";
import { useInvoices } from "lib/hooks/useInvoices";
import Image from "next/image";
import { ItemStatus, ScreenType } from "types";
import { InvoiceItem } from "./InvoiceItem";
import styles from "./styles/InvoiceList.module.scss";

interface InvoiceListProps {
  filters: ItemStatus[];
  screenType: ScreenType;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ filters, screenType }) => {
  const { invoices, isError, isLoading } = useInvoices()
  let content;

  if(isLoading) {
    content = (
      <li className={styles.emptyRoot}>
        <Spinner />
        <h2>Loading ...</h2>
      </li>
    )
  }
  else if(!invoices.length) {
    content = (
      <li className={styles.emptyRoot}>
        <Image height={130} width={150} src="/assets/illustration-empty.svg" alt="Empty Image" />
        <h2>There is nothing here</h2>
        <p className={styles.emptyText}>Create an invoice by clicking the <strong>New Invoice</strong> button and get started</p>
      </li>
    )
  } else if(filters.length > 0) {
    content = invoices.filter(inv => filters.includes(inv.state)).map(invoice => (
      <InvoiceItem invoice={invoice} key={invoice.id} screenType={screenType} />
    ))
  } else {
    content = invoices.map(invoice => (
      <InvoiceItem invoice={invoice} key={invoice.id} screenType={screenType} />
    ))
  }

  return <ul className={styles.list}>{content}</ul>
}