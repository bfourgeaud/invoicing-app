import { Icon } from "@iconify/react";
import { ScreenType } from "types";
import styles from "./styles/PlusButton.module.scss"

interface PlusButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  screenType?: ScreenType;
  contentType: "Invoice" | "Client" | "Product";
}

export const PlusButton: React.FC<PlusButtonProps> = ({ screenType, contentType, ...props }) => {
  return (
    <button className={styles.root} {...props}>
      <span>
        <Icon width={20} height={20} icon="ic:round-add" />
      </span>
      {screenType === "phone" ? "New" : `New ${contentType}`}
    </button>
  );
};