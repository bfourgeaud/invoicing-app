import StatGrid from "components/stats/StatGrid";
import styles from "styles/StatHome.module.scss"

const StatHome: React.FC = () => {
  return (
    <main role="main" className={styles.main}>
      <div className={styles.content}>
        <h1>Statistics</h1>
        <StatGrid />
      </div>
    </main>
  );
}

export default StatHome;