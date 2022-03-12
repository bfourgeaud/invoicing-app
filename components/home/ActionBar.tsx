import { FilterDropdown } from "components/ui/FilterDropdown";
import { PlusButton } from "components/ui/PlusButton";
import { useInvoices } from "lib/hooks/useInvoices";
import { FilterType, ScreenType } from "types";
import styles from "./styles/ActionBar.module.scss"

interface ActionBarProps {
  screenType: ScreenType
  filterHandlers: {
    paid: FilterType;
    pending: FilterType;
    draft: FilterType;
  };
  handleNewInvoice: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ screenType, filterHandlers, handleNewInvoice }) => {
  const { invoices } = useInvoices()
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>Invoices</h1>
        <p className={styles.invoiceOverview}>
          {screenType === "phone" ? `${invoices.length || 0} Invoices` : `There are ${invoices.length || 0} total invoices`}
        </p>
      </div>
      <div className={styles.actionControls}>
        <FilterDropdown screenType={screenType} filters={filterHandlers} />
        <PlusButton screenType={screenType} onClick={handleNewInvoice} />
      </div>
    </div>
  )
}