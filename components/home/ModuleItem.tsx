import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Link from "next/link";
import { ModuleDef } from "types";
import styles from './styles/ModuleItem.module.scss'

interface ModuleItemProps {
  module: ModuleDef
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module }) => {
  return (
    <li className={[styles.wrapper, module.disabled ? styles.disabled : ''].join(' ')}>
      <Link href={module.link}>
        <a className={styles.content}>
          <Icon width={40} height={40} icon={module.icon} />
          <h2>{module.label}</h2>
        </a>
      </Link>
    </li>
  );
}

export default ModuleItem;