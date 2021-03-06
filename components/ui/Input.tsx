import { useToggle } from "lib/hooks/useToggle";
import React, { ChangeEvent, FormEvent } from "react"
import styles from "./styles/Input.module.scss"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, className, ...props }, ref) => {
    const [invalid, invalidHandlers] = useToggle();

    const handleInvalid: React.FormEventHandler<HTMLInputElement> = (e) => {
      e.preventDefault();

      const missing = (e.target as HTMLInputElement).validity.valueMissing;
      const valid = (e.target as HTMLInputElement).validity.valid;

      if (missing || !valid) {
        invalidHandlers.on();
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      invalidHandlers.off();
      props.onChange ? props.onChange(e) : null
    };

    const inputProps = {
      className: styles.input,
      ...props,
      onChange: handleChange,
      ref: ref,
      onInvalid: handleInvalid
    };

    return (
      <div className={[styles.root, className].join(" ")}>
        {label && <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>}
        {invalid && <span className={styles.invalidLabel}>{"can't be empty"}</span>}
        <input {...inputProps} aria-invalid={invalid} />
      </div>
    );
  }
);

Input.displayName = 'Input'