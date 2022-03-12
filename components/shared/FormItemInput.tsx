import { Icon } from "@iconify/react";
import toMoney from "lib/utils/toMoney";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Item } from "types";
import { Input } from "../ui/Input";
import styles from "./styles/FormItemList.module.scss";

interface FormItemInputProps {
  item: Item;
  onDelete: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormItemInput: React.FC<FormItemInputProps> = ({item, onChange, onDelete }) => {
  return (
    <div className={styles.item}>
      <Input className={styles.nameInput} label="Item Name" name="name" placeholder="Product Name" value={item.name} id="name" onChange={onChange} />
      <div className={styles.priceInfo}>
        <Input type="number" label="Qty." name="quantity" value={item.quantity} id="quantity" onChange={onChange} />
        <Input type="number" label="Price" name="price" value={item.price} id="price" onChange={onChange} />
        <Input label="Total" name="total" value={toMoney(item.total)} id="total" disabled onChange={() => {}} />
        <button onClick={onDelete} className={styles.deleteBtn}>
          <Icon width={24} height={24} icon="ic:round-delete" />
        </button>
      </div>
    </div>
  );
};