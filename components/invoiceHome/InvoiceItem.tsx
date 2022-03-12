import { Icon } from "@iconify/react";
import { Indicator } from "components/shared/Indicator";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { Invoice, ScreenType } from "types";
import styles from "./styles/InvoiceItem.module.scss";

interface InvoiceItemProps {
  invoice: Invoice;
  screenType: ScreenType;
}

export const InvoiceItem: React.FC<InvoiceItemProps> = ({ invoice, screenType }) => {
  const router = useRouter();

  const currencyOptions = {
    style: "currency",
    currency: "EUR",
  };

  const currencyFmt = new Intl.NumberFormat("fr-FR", currencyOptions);
  const currencyString = currencyFmt.format(invoice.total);

  return (
    <li className={styles.root} onClick={() => router.push(`/invoices/${invoice.id}`)}>
      <div className={styles.itemOverview}>
        <p className={styles.itemId}>
          <span>#</span>
          {invoice.invoiceNumber}
        </p>
        {screenType === 'phone' && (
          <p className={styles.clientName}>{invoice.clientName}</p>
        )}
        {screenType !== "phone" && (
          <p className={styles.date}>
            Due {format(new Date(invoice.paymentDue), "dd MMM yyyy")}
          </p>
        )}
      </div>

      <div className={styles.itemInfo}>
        <div className={styles.dateAndAmount}>
          {screenType === "phone" && (
            <p className={styles.date}>
              Due {format(new Date(invoice.paymentDue), "dd MMM yyyy")}
            </p>
          )}
          {screenType !== "phone" && (
            <p className={styles.clientName}>{invoice.clientName}</p>
          )}
          <p className={styles.amount}>{currencyString}</p>
        </div>

        <div className={styles.indicatorWrapper}>
            <Indicator type={invoice.state} />
            <Icon width={20} height={20} icon="ic:round-chevron-right" />
        </div>
      </div>
    </li>
  )
}