import React from "react";
import { ItemStatus } from "types";
import { Controls } from "./Controls";
import styles from "./styles/BottomControls.module.scss";

interface BottomControlsProps {
  onClickEditing: () => void;
  onClickDelete: () => void;
  onClickPaid: () => void;
  status: ItemStatus;
}

export const BottomControls: React.FC<BottomControlsProps> = (props) => {
  return (
    <div className={styles.root}>
      <Controls {...props} />
    </div>
  );
};