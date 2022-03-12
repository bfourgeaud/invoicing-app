
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles/BackButton.module.scss";
interface BackButtonProps {
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const router = useRouter();

  const clickHandler = onClick ? () => onClick() : () => router.back();
  return (
    <div className={styles.backBtnWrapper}>
      <button
        className={styles.backBtn}
        onClick={clickHandler}
        role="navigation"
      >
        <Icon width={20} height={20} icon="ic:round-chevron-left" />
        <span>Go back</span>
      </button>
    </div>
  );
};