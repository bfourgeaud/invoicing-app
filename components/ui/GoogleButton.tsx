import { Icon } from "@iconify/react";
import React from "react";
import styles from './styles/GoogleButton.module.scss'

interface GoogleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({ ...props }) => {
  return (
    <button className={styles.button} {...props}>
      <div className={styles.logo}>
        <Icon width={24} height={24} icon="logos:google-icon" />
      </div>
      <div className={styles.text}>
        {"Log in with Google"}
      </div>
    </button>
  )
}