import React from "react";
import { ItemStatus } from "types";
import styles from "./styles/Indicators.module.scss";

interface IndicatorProps {
  type: ItemStatus
}
export const Indicator: React.FC<IndicatorProps> = ({ type }) => {
  switch (type) {
    case "DRAFT":
      return (
        <div className={styles.draft}>
          <span></span>
          <p>Draft</p>
        </div>
      );
    case "PENDING":
      return (
        <div className={styles.pending}>
          <span></span>
          <p>Pending</p>
        </div>
      );
    case "PAID":
      return (
        <div className={styles.paid}>
          <span></span>
          <p>Paid</p>
        </div>
      );
    case "OVERDUE":
    default:
      return (
        <div className={styles.overdue}>
          <span></span>
          <p>Overdue</p>
        </div>
      );
  }
}