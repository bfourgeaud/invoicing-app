import { FilterDropdown } from "components/ui/FilterDropdown";
import { PlusButton } from "components/ui/PlusButton";
import { useClients } from "lib/database";
import { Filters, FilterType, ScreenType } from "types";
import styles from "./styles/ActionBar.module.scss"

interface ActionBarProps {
  screenType: ScreenType
  filterHandlers: {
    paid: FilterType;
    pending: FilterType;
    draft: FilterType;
  };
  handleNew: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ screenType, filterHandlers, handleNew }) => {
  const { clients } = useClients()
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>Clients</h1>
        <p className={styles.invoiceOverview}>
          {screenType === "phone" ? `${clients.length || 0} Clients` : `There are ${clients.length || 0} total clients`}
        </p>
      </div>
      <div className={styles.actionControls}>
        <FilterDropdown screenType={screenType} filters={filterHandlers} />
        <PlusButton contentType="Client" screenType={screenType} onClick={handleNew} />
      </div>
    </div>
  )
}
