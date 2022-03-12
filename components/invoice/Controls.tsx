
import React from "react";
import { ItemStatus } from "types";
import styles from "./styles/Controls.module.scss";

interface ControlsProps {
  onClickEditing: () => void;
  onClickDelete: () => void;
  onClickPaid: () => void;
  status: ItemStatus;
}

export const Controls: React.FC<ControlsProps> = ({
  onClickEditing,
  onClickDelete,
  onClickPaid,
  status,
}) => {
  return (
    <div className={styles.buttons}>
      <button className="btn btn-light" onClick={onClickEditing}>Edit</button>
      <button className="btn btn-orange" onClick={onClickDelete}>Delete</button>
      {["PENDING", "OVERDUE"].includes(status) && (
        <button className="btn btn-purple" onClick={onClickPaid}>Mark as Paid</button>
      )}
    </div>
  );
};