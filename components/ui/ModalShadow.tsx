import { useEffect } from "react";
import styles from './styles/ModalShadow.module.scss'

const ModalShadow = ({ show, cancel }: { show: boolean; cancel: () => void; }) => {
  
  useEffect(() => {
    if(show) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [show])

  return (
  <div
    className={styles.darkOut}
    onClick={cancel}
    style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateX(0%)" : `translateX(-100%)`,
    }}
  />
)};

export default ModalShadow