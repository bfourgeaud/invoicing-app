import { useClients } from "lib/database";
import { emptyClient } from "lib/utils/emptyClient";
import { ChangeEvent, useState } from "react";
import { APIResponse, Client, UpdateRequest } from "types";
import styles from './styles/ClientForm.module.scss'
import { Input } from "components/ui/Input";
import FormDrawer from "components/ui/FormDrawer";

interface ClientFormProps {
  editing?: boolean;
  client?: APIResponse<Client>;
  show: boolean;
  cancel: () => void;
}

const ClientForm:React.FC<ClientFormProps> = ({editing = false, client, cancel, show}) => {
  const { add, update } = useClients()
  const [data, setData] = useState<Client>(client || emptyClient());
  
  const handleCancel = () => {
    // reset data and cancel
    if (client) {
      setData(client);
    }
    cancel();
  };

  const handleSave: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if(!editing || !data.id) {
      add(data)
        .then(setData)
        .catch(err => alert(err.message))
        .finally(quitAndReset)
    } else {
      update(data as UpdateRequest<Client>)
      .then(setData)
      .catch(err => alert(err.message))
      .finally(cancel)
    }
  }

  const quitAndReset = () => {
    setData(emptyClient());
    cancel();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { dataset, name, value } = e.target
    setData(prev => ({
      ...prev,
      ...(dataset.obj ? {
          [dataset.obj]: {
            ...(prev[dataset.obj as keyof Client] as object),
            [name]: value
          }
        }: {
          [name]: value
        })
      }
    ))
  }


  return (
    <FormDrawer cancel={handleCancel} save={handleSave} show={show} editing={editing}>
      <div className={styles.clientForm}>
        <h1>
          {editing && client? (<>Edit : {client.firstname} {client.lastname}</>) : ("New Client")}
        </h1>

        <div className={styles.formGroup}>
          <Input label="First Name" placeholder="Firstname" value={data.firstname} name="firstname" id="firstname" onChange={onChange} required />
          <Input label="Last Name" placeholder="Lastname" value={data.lastname} name="lastname" id="lastname" onChange={onChange} required />
        </div>
        <Input label="Email" placeholder="john.doe@example.com" value={data.email} name="email" id="email" onChange={onChange} required />
        <Input label="Phone" placeholder="0X XX XX XX XX" value={data.phone} name="phone" id="phone" onChange={onChange} required />

        <p className={styles.colorLabel}>Address</p>
        <Input label="Street" placeholder="Street" value={data.address?.street} data-obj="address" name="street" id="street" onChange={onChange} required />
        <div className={styles.inputGrid}>
          <Input label="City" placeholder="City" value={data.address?.city} data-obj="address" name="city" id="city" onChange={onChange} required />
          <Input label="Post Code" placeholder="Post Code" value={data.address?.postCode} data-obj="address" name="postCode" id="postCode" onChange={onChange} required />
          <Input label="Country" placeholder="Country" value={data.address?.country} data-obj="address" name="country" id="country" onChange={onChange} required />
        </div>
      </div>
    </FormDrawer>
  )
}

export default ClientForm;