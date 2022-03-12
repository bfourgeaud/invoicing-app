import ModuleList from "components/home/ModuleList"
import { NextPage } from "next"
import Link from "next/link"
import styles from "styles/HomePage.module.scss"

const HomePage: NextPage = () => {
  const modules = [
    { label:"Invoices", link: '/invoices', icon:"ic:round-euro" },
    { label:"Products", link: '/products', icon:"ic:twotone-storefront", disabled:true },
    { label:"Clients", link: '/clients',icon:"ic:round-person" },
    { label:"Calendrier", link: '/calendar',icon:"ic:round-calendar-month", disabled:true },
    { label:"Messages", link: '/messages',icon:"ic:round-email", disabled:true },
    { label:"Stats", link: '/stats', icon:"ic:baseline-bar-chart" },
    { label:"Assistance", link: '/help', icon:"ic:round-headset-mic", disabled:true },
    { label:"Params", link: '/params',icon:"ic:round-settings", disabled:true }
  ]
  return (
    <main role="main" className={styles.main}>
      <ModuleList modules={modules} />
    </main>
  )
}

export default HomePage