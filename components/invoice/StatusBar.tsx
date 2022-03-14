import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { ItemStatus, ScreenType } from "../../types";
import { Indicator } from "../shared/Indicator";
import { Controls } from "./Controls";
import styles from "./styles/StatusBar.module.scss";

interface StatusBarProps {
  status: ItemStatus;
  screenType: ScreenType;
  onClickEditing: () => void;
  onClickDelete: () => void;
  onClickPaid: () => void;
  onClickPublish: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  status,
  screenType,
  onClickEditing,
  onClickDelete,
  onClickPaid,
  onClickPublish
}) => {
  const { dark } = useThemeContext();
  return (
    <div className={styles.root}>
      <div className={styles.statusInfo}>
        <p className={styles.statusText}>Status</p>
        <Indicator type={status} />
      </div>
      {screenType !== "phone" && (
        <Controls
          status={status}
          onClickEditing={onClickEditing}
          onClickDelete={onClickDelete}
          onClickPaid={onClickPaid}
          onClickPublish={onClickPublish}
        />
      )}
    </div>
  );
};