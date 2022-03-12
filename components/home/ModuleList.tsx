import { ModuleDef } from 'types';
import ModuleItem from './ModuleItem';
import styles from './styles/ModuleList.module.scss'

interface ModuleListProps {
  modules: Array<ModuleDef>
}

const ModuleList:React.FC<ModuleListProps> = ({ modules=[] }) => {
  return (
    <div className={styles.wrapper}>
      <h1>Modules</h1>
      <ul className={styles.list}>
        {modules.map((module, idx) => (
          <ModuleItem key={idx} module={module} />
        ))}
      </ul>
    </div>
  );
}

export default ModuleList;