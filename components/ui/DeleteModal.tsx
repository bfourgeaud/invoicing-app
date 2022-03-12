import useOnClickOutside from "lib/hooks/useClickOutside";
import React from "react";
import styles from "./styles/DeleteModal.module.scss";

interface DeleteModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ message, onConfirm, onCancel }) => {
  
  const ref = React.useRef<HTMLDivElement>(null);
  const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onCancel();
  };

  useOnClickOutside(ref, handleCancel)

  return (
    <div className={styles.root}>
      <div className={styles.modal} ref={ref}>
        <h1>Confirm Deletion</h1>
        <p className={styles.text}>
          {message}
        </p>
        <div className={styles.buttons}>
          <button className="btn btn-light" onClick={handleCancel}>Cancel</button>
          <button className="btn btn-orange" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};