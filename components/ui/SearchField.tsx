import { Icon } from "@iconify/react";
import { Component, MouseEventHandler } from "react";
import { Input } from "./Input";
import { PlusButton } from "./PlusButton";
import styles from './styles/SearchField.module.scss'

interface SearchFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNew: MouseEventHandler<HTMLElement>,
  suggestions: Array<JSX.Element> | null,
  found: boolean
}

export const SearchField:React.FC<SearchFieldProps> = ({ suggestions, found, onNew, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <Input { ...props } />
      {props.value && suggestions && !found && 
        <div className={styles.dropdown}>
          <ul>
            {suggestions.map(e => e)}
            {!suggestions.length && 
              <PlusButton contentType="Client" onClick={onNew} />
            }
          </ul>
        </div>
      }
    </div>
  );
}