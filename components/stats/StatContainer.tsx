import Link from 'next/link';
import styles from './styles/StatContainer.module.scss'

interface StatContainerProps {
  label: string,
  isSpan?: boolean
}

const StatContainer:React.FC<StatContainerProps> = ({ isSpan, label, children }) => {
  return (
    <div className={[styles.root, isSpan ? styles.span : ''].join(' ')}>
      <div className={styles.label}>
        {label}
      </div>

      <div className={styles.chart}>
        {children}
      </div>

      <div className={styles.details}>
        <Link href={'#'} passHref>
          <a>Voir les détails</a>
        </Link>
      </div>
    </div>
  );
}

export default StatContainer;