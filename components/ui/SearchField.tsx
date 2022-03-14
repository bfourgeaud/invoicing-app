import { Icon } from "@iconify/react";
import { FormEventHandler, MouseEventHandler } from "react";
import { Input } from "./Input";
import { PlusButton } from "./PlusButton";
import styles from './styles/SearchField.module.scss'

interface SearchFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNew: MouseEventHandler<HTMLElement>,
  onReset: FormEventHandler<HTMLElement>,
  suggestions: Array<JSX.Element> | null,
  found: boolean,
  foundText: string
}

interface FoundItemProps {
  text: string,
  reset: MouseEventHandler<HTMLElement>
}

const FoundItem:React.FC<FoundItemProps> = ({ text, reset }) => (
  <div className="h-12 inline-flex items-center space-x-2 px-5 bg-$content-bg rounded-full cursor-pointer text-sm font-bold border border-$input-border">
    <p>{text}</p>
    <div onClick={reset} className="text-red-300 hover:text-red-500"><Icon icon="ic:round-cancel" /></div>
  </div>
)

export const SearchField:React.FC<SearchFieldProps> = ({ suggestions, found, foundText, onNew, onReset, ...props }) => {
  
  if(found) return (
    <div className={styles.wrapper}>
      <FoundItem text={foundText} reset={onReset} />
    </div>
  )
  
  return (
    <div className={styles.wrapper}>
      <Input { ...props } />
      {props.value && suggestions && 
        <div className={styles.dropdown}>
          <ul>
            {suggestions.map(e => e)}
            {!suggestions.length && 
              <button type="button" onClick={onNew} className="font-bold text-sm text-$purple flex items-center">
                <Icon width={15} icon="ic:round-plus" />
                <span>Nouveau</span>
              </button>
            }
          </ul>
        </div>
      }
    </div>
  );
}