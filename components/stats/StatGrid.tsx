import BarChart from './MBarChart';
import MPieChart from './MPieChart';
import SingleNumber from './SingleNumber';
import StatContainer from './StatContainer';
import styles from './styles/StatGrid.module.scss'

const barData = [
  { x: '22-01', y: 1500 },
  { x: '22-02', y: 450 },
  { x: '22-03', y: 320 },
  { x: '22-04', y: 1500 },
  { x: '22-05', y: 750 },
  { x: '22-06', y: 1200 },
  { x: '22-07', y: 1300 },
  { x: '22-08', y: 250 },
  { x: '22-09', y: 1750 },
  { x: '22-10', y: 1750 },
  { x: '22-11', y: 1750 },
  { x: '22-12', y: 1750 },
];

const top5Clients = [
  {x: 'VitaFire', y:2300},
  {x: 'Clavier', y: 1850 },
  {x: 'Dewulf', y: 1500 },
  {x: 'Augier', y: 920 },
  {x: 'inconnu', y:560 }
]

const pieData = [
  { name: 'DRAFT', value: 8 },
  { name: 'OVERDUE', value: 2 },
  { name: 'PAID', value: 10 },
  { name: 'PENDING', value: 5 },
];

const StatGrid: React.FC = () => {
  return (
    <div className={styles.root}>
      <StatContainer label='Revenus (Année en cours)'>
        <SingleNumber value={2300} trend="UP" trendValue='+30%' currency='USD' />
      </StatContainer>

      <StatContainer label='Revenus (Mois en cours)'>
        <SingleNumber value={300} trend="DOWN" trendValue='-50%' currency='EUR'/>
      </StatContainer>

      <StatContainer label='Renvus (Année en cours)' isSpan>
        <BarChart data={barData} yAxis={false}/>
      </StatContainer>

      <StatContainer label='Pending Invoices'>
        <SingleNumber value={300} trend="FLAT" trendValue='+10%' currency='EUR' />
      </StatContainer>

      <StatContainer label='Clients Actifs'>
        <SingleNumber value={54} />
      </StatContainer>

      <StatContainer label='Top Clients'>
        <BarChart data={top5Clients} vertical />
      </StatContainer>

      <StatContainer label='Invoice Status'>
        <MPieChart data={pieData} />
      </StatContainer>
    </div>
  );
}

export default StatGrid;