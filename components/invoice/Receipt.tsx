import React from "react";
import { useScreenContext } from "lib/context/ScreenContext";
import { Invoice, Item } from "types";
import styles from "./styles/Receipt.module.scss";

interface ReceiptProps {
  invoice: Invoice;
}

interface ReceiptItemProps {
  item: Item
}

export const Receipt: React.FC<ReceiptProps> = ({ invoice }) => {
  const { screenType } = useScreenContext();

  const totalString = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(invoice.total);

  switch (screenType) {
    case "phone":
      return (
        <div className={styles.root}>
          <div className={styles.padding}>
            {invoice.items.map((item) => (
              <ReceiptItem item={item} key={item.name} />
            ))}
          </div>
          <div className={styles.subTotal} >
            <p className={styles.totalLabel}>Grand Total</p>
            <h2>{totalString}</h2>
          </div>
        </div>
      );
    case "tablet":
    case "desktop":
    default:
      return (
        <>
          <table className={styles.receiptTable}>
            <thead>
              <tr>
                <td>Item Name</td>
                <td>QTY.</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td className={styles.tableLightText}>{item.quantity}</td>
                  <td className={styles.tableLightText}>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(item.price)}
                  </td>
                  <td className={styles.tableDarkText}>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.subTotal}>
            <p className={styles.totalLabel}>Amount Due</p>
            <h2>{totalString}</h2>
          </div>
        </>
      );
  }
};

const ReceiptItem: React.FC<ReceiptItemProps> = ({ item }) => {
  const priceString = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(item.price);

  const totalString = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(item.total);

  return (
    <div className={styles.item}>
      <div>
        <p className={styles.itemName}>{item.name}</p>
        <p className={styles.quantityAndPrice}>
          {item.quantity} x {priceString}
        </p>
      </div>
      <div>
        <p className={styles.total}>{totalString}</p>
      </div>
    </div>
  );
};