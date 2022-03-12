import styles from './styles/Badge.module.scss'

interface BadgeProps {
  type: "danger" | "warning" | "success";
}

const Badge:React.FC<BadgeProps> = ({ type, children }) => {
  return (
    <div className={[styles.main, styles[type]].join(' ')}>
      {children}
    </div>
  );
}

export default Badge;