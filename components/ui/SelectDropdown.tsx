import { Icon } from "@iconify/react";
import useOnClickOutside from "lib/hooks/useClickOutside";
import React from "react";
import { useToggle } from "../../lib/hooks/useToggle";
import styles from "./styles/SelectDropdown.module.scss";

interface SelectDropdownProps {
  label: string;
  name: string;
  options: { label: string; value: number }[];
  value: number;
  onChange: (n: number) => void;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = (props) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [currentLabel, setCurrentLabel] = React.useState(
    props.options.filter((opt) => opt.value === props.value)[0].label
  );
  const [show, showHandlers] = useToggle();

  useOnClickOutside(ref, () => showHandlers.off())

  const handleChange = (newValue: number) => {
    if(!newValue) return
    props.onChange(newValue);
    setCurrentLabel(
      props.options.filter((opt) => opt.value === newValue)[0].label
    );
    showHandlers.off()
  };

  const inputProps = {
    value: currentLabel,
    readOnly: true,
    onFocus: showHandlers.on
  };

  return (
    <div className={styles.root} ref={ref}>
      <label htmlFor={props.name} className={styles.label}>
        {props.label}
      </label>
      <div className={styles.inputWrapper}>
        <input {...inputProps} />
        <Icon icon="ic:round-chevron-left" />
      </div>
      {show && (
        <div className={styles.dropdown}>
          {props.options && props.options.length && props.options.map((option, i) => (
            <div key={i} className={styles.option} onClick={() => handleChange(option.value)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};