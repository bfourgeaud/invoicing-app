import React, { SetStateAction, useEffect } from "react";
import { useToggle } from "../../lib/hooks/useToggle";
import { getDaysInMonth, format, getYear } from "date-fns";
import { useThemeContext } from "../../lib/context/ThemeContext";
import styles from "./styles/DatePicker.module.scss";
import useOnClickOutside from "lib/hooks/useClickOutside";
import { Icon } from "@iconify/react";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  setDate: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  setDate,
  value,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { dark } = useThemeContext();

  // initial values
  const initialSelectedDate = value ? new Date(value) : new Date(Date.now());
  const initialCurrentMonth = new Date(initialSelectedDate).getMonth();
  const initialCurrentYear = getYear(initialSelectedDate);
  const initialDaysInMonth = getDaysInMonth(initialSelectedDate);

  // hooks
  const [open, openHandlers] = useToggle();
  const [selectedDate, setSelectedDate] = React.useState(initialSelectedDate);
  const [currentMonth, setCurrentMonth] = React.useState(initialCurrentMonth);
  const [currentYear, setCurrentYear] = React.useState(initialCurrentYear);
  const [daysInMonth, setDaysInMonth] = React.useState(initialDaysInMonth);

  useOnClickOutside(ref, () => openHandlers.off())

  useEffect(() => {
    setSelectedDate(new Date(value));
  }, [value]);

  const resetDaysInMonthEffect = () => {
    setDaysInMonth(getDaysInMonth(new Date(currentYear, currentMonth)));
  };

  

  const setFocus = () => {
    if (open) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  };

  React.useEffect(resetDaysInMonthEffect, [currentYear, currentMonth]);
  React.useEffect(setFocus, [open]);

  // handlers
  const handlePrevMonth = () => {
    setCurrentMonth((curr) => {
      if (curr - 1 < 0) {
        setCurrentYear((prev) => prev - 1);
        return 11;
      } else {
        return curr - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((curr) => {
      if (curr + 1 > 11) {
        setCurrentYear((prev) => prev + 1);
        return 0;
      } else {
        return curr + 1;
      }
    });
  };

  const handleDateSelect = (selectedDay: number) => {
    const newDate = new Date(currentYear, currentMonth, selectedDay);
    setSelectedDate(newDate);
    setDate(format(newDate, "yyyy-MM-dd"));
    openHandlers.off();
  };

  // props and styles
  const rootProps = { className: styles.root, ref: ref };
  const pickerClass = styles.picker;

  const inputProps = {
    type: "text",
    ...props,
    className: styles.input,
    readOnly: true,
    onFocus: openHandlers.on,
    ref: inputRef,
    value: format(selectedDate, "dd MMM yyyy"),
  };

  return (
    <div {...rootProps}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className={styles.inputWrapper}>
        <input {...inputProps} />
        <Icon icon="ic:round-calendar-today" className={styles.calendarIcon} />
      </div>
      {open && (
        <div className={pickerClass}>
          <div className={styles.pickerNav}>
            <button type="button" onClick={handlePrevMonth}>
              <Icon icon="ic:round-arrow-back" />
            </button>
            <p>
              {format(new Date(currentYear, currentMonth), "MMM")} {currentYear}
            </p>
            <button type="button" onClick={handleNextMonth}>
              <Icon icon="ic:round-arrow-forward" />
            </button>
          </div>
          <div className={styles.days}>
            {Array.from(Array(daysInMonth).keys())
              .map((p) => p + 1)
              .map((p, i) =>
                selectedDate.getDate() === p &&
                selectedDate.getFullYear() === currentYear &&
                selectedDate.getMonth() === currentMonth ? (
                  <p
                    key={i}
                    className={styles.selectedDay}
                    onClick={() => handleDateSelect(p)}
                  >
                    {p}
                  </p>
                ) : (
                  <p key={i} onClick={() => handleDateSelect(p)}>
                    {p}
                  </p>
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
};