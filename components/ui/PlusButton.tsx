import { Icon } from "@iconify/react";
import { ScreenType } from "types";
import styles from "./styles/PlusButton.module.scss"

interface PlusButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  screenType: ScreenType;
}

export const PlusButton: React.FC<PlusButtonProps> = ({ screenType, ...props }) => {
  return (
    <button className={styles.root} {...props}>
      <span>
        <Icon width={20} height={20} icon="ic:round-add" />
      </span>
      {screenType === "phone" ? "New" : "New Invoice"}
    </button>
  );
};