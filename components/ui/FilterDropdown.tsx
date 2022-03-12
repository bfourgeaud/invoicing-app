import { Icon } from "@iconify/react";
import useOnClickOutside from "lib/hooks/useClickOutside";
import { useToggle } from "lib/hooks/useToggle";
import { FC, useRef } from "react";
import { Filters, ScreenType } from "types";
import { Checkbox } from "./Checkbox";
import styles from "./styles/FilterDropdown.module.scss"

interface FilterDropdownProps {
  screenType: ScreenType;
  filters: Filters
}

export const FilterDropdown: FC<FilterDropdownProps> = ({ screenType, filters }) => {
  const [open, openHandler] = useToggle(false)
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => openHandler.off())

  return (
    <div className={styles.root} ref={ref}>
      <div className={styles.heading} onClick={openHandler.toggle}>
        {screenType === "phone" ? "Filter" : "Filter by status"}
        <Icon width={20} height={20} icon="ic:round-chevron-left" className={[styles.icon, open ? styles.open : ''].join(' ')} />
      </div>
      {open && (
        <div className={styles.dropdown}>
          {Object.values(filters).map(filter => (
            <Checkbox
              key={filter.name}
              name={filter.name}
              label={filter.label}
              onChange={filter.onChange}
              checked={filter.value}
            />
          ))}
        </div>
      )}
    </div>
  )
}