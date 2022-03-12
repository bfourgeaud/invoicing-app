import { Icon } from "@iconify/react";
import Badge from "components/ui/Badge";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { Client, ScreenType } from "types";
import styles from './styles/ClientCard.module.scss'

interface ClientCardProps {
  client: Client,
  screenType?: ScreenType,
  onSelect?: (e:Client) => void,
  linkDisabled?: boolean
}

const ClientCard:React.FC<ClientCardProps> = ({ client, linkDisabled=false, onSelect, ...props}) => {

  const handleClick:MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault()
    console.log('CLICK')
    if(linkDisabled && onSelect) onSelect(client)
  }

  return (
    <li className={styles.card} onClick={handleClick}>
      <Link href={linkDisabled ? '#' : `/clients/${client.id}`} passHref>
        <a>
          <div className={styles.cardHeader}>
            <div>
              <Image src={client.picture?.url || '/assets/image-avatar.jpg'} width={48} height={48} alt="client-avatar"/>
            </div>
            <div className={styles.clientContact}>
              <h3>{client.firstname} {client.lastname}</h3>
              <p>{client.email}</p>
              <p>{client.phone}</p>
            </div>
            <div className={styles.warning}>
              <Icon width={20} height={20} icon="ic:round-warning-amber" />
            </div>
          </div>
        </a>
      </Link>

    </li>
  );
}

export default ClientCard;