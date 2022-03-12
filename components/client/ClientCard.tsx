import { Icon } from "@iconify/react";
import Badge from "components/ui/Badge";
import Image from "next/image";
import Link from "next/link";
import { Client, ScreenType } from "types";
import styles from './styles/ClientCard.module.scss'

interface ClientCardProps {
  client: Client,
  screenType: ScreenType
}

const ClientCard:React.FC<ClientCardProps> = ({ client, screenType}) => {
  return (
    <li className={styles.card}>
      <Link href={`/clients/${client.id}`} passHref>
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