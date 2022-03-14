
import React from "react";
import { ItemStatus } from "types";
import styles from "./styles/Controls.module.scss";

interface ControlsProps {
  onClickEditing: () => void
  onClickDelete: () => void
  onClickPaid: () => void
  onClickPublish: () => void
  status: ItemStatus
}

export const Controls: React.FC<ControlsProps> = ({
  onClickEditing,
  onClickDelete,
  onClickPaid,
  onClickPublish,
  status,
}) => {

  switch(status) {
    case "DRAFT" :
      return (
        <div className={styles.buttons}>
          <button className="btn btn-light" onClick={onClickEditing}>Edit</button>
          <button className="btn btn-orange" onClick={onClickDelete}>Delete</button>
          <button className="btn btn-purple" onClick={onClickPublish}>Publish</button>
        </div>
      )
    case "OVERDUE" :
    case "PENDING" :
      return (
        <div className={styles.buttons}>
          <button className="btn btn-light" onClick={onClickEditing}>Edit</button>
          <button className="btn btn-orange" onClick={onClickDelete}>Delete</button>
          <button className="btn btn-purple" onClick={onClickPaid}>Mark as Paid</button>
        </div>
      )
    case "PAID" :
      return (
        <div className={styles.buttons}>
          <button className="btn btn-purple" onClick={() => {}}>Print Receipt</button>
        </div>
      )
    default:
      return (
        <div className={styles.buttons}>
        </div>
      )
  }
};