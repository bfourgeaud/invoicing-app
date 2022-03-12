import { Icon } from "@iconify/react";
import React, { ChangeEvent } from "react";
import { Item } from "types";
import { FormItemInput } from "./FormItemInput";
import styles from "./styles/FormItemList.module.scss"

interface FormItemListProps {
  items: Array<Item>;
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}

export const FormItemList: React.FC<FormItemListProps> = ({ items, setItems }) => {

  const handleItemDelete = (i: number) => {
    setItems((prev) => prev.filter((_, index) => index !== i));
  };

  const handleItemAdd = () => {
    setItems((prev) => [
      ...prev,
      { name: "", quantity: 0, total: 0, price: 0 },
    ]);
  };

  const handleChange = (index:number, event:ChangeEvent<HTMLInputElement>) => {
    const values = [...items];
    if (event.target.name === 'name') {
      values[index].name = event.target.value;
    } else if (event.target.name === 'quantity') {
      values[index].quantity = +event.target.value;
    } else if (event.target.name === 'price') {
      values[index].price = +event.target.value;
    }

    values[index].total = values[index].quantity * values[index].price
    setItems(values);
  };

  return (
    <div className={styles.itemList}>
      <h2>Item List</h2>
      {items.map((item, i) => (
        <FormItemInput
          key={i}
          item={item}
          onChange={(e) => handleChange(i, e)}
          onDelete={() => handleItemDelete(i)}
        />
      ))}

      <button className={styles.addNewBtn} onClick={handleItemAdd} type="button">
        <Icon width={12} height={20} icon="ic:round-add" />
        Add New Item
      </button>
    </div>
  );
};