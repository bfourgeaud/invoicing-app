import { Spinner } from 'components/ui/Spinner';
import { useClients } from "lib/database";
import { ClientState, ScreenType } from 'types';
import Image from "next/image";
import ClientCard from './ClientCard';
import styles from './styles/ClientGrid.module.scss'

interface ClientGridProps {
  filters: ClientState[];
  screenType: ScreenType;
}

const ClientGrid:React.FC<ClientGridProps> = ({ filters, screenType }) => {
  const { clients, isError, isLoading } = useClients()

  let content;

  if(isLoading) {
    content = (
      <li className={styles.emptyRoot}>
        <Spinner />
        <h2>Loading ...</h2>
      </li>
    )
  }else if(!clients.length) {
    content = (
      <li className={styles.emptyRoot}>
        <Image height={130} width={150} src="/assets/illustration-empty.svg" alt="Empty Image" />
        <h2>There is nothing here</h2>
        <p className={styles.emptyText}>Create an invoice by clicking the <strong>New Client</strong> button and get started</p>
      </li>
    )
  } else if(filters.length > 0) {
    content = clients.filter(cl => filters.includes(cl.state)).map(client => (
      <ClientCard client={client} key={client.id} screenType={screenType}/>
    ))
  } else {
    content = clients.map(client => (
      <ClientCard client={client} key={client.id} screenType={screenType}/>
    ))
  }

  return <ul className={styles.grid}>{content}</ul>
}

export default ClientGrid;