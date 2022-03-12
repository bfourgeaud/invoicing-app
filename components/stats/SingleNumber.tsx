import { Icon } from '@iconify/react';
import toMoney from 'lib/utils/toMoney';
import styles from './styles/SingleNumber.module.scss'

type Trend = "UP" | "DOWN" | "FLAT";
interface TrendIconProps {
  trend: Trend
}
interface SingleNumberProps {
  value:number,
  currency?:string,
  trend?: Trend
  trendValue?: string
}

const SingleNumber:React.FC<SingleNumberProps> = ({ value, ...props }) => {
  return (
    <div className={[styles.root, props.trend ? styles[props.trend] : ''].join(' ')}>
      <p>{props.currency ? toMoney(value, props.currency) : value}</p>
      {props.trend && (
        <span className={styles.trend}>
          <TrendIcon trend={props.trend} />
          {props.trendValue && <p>({props.trendValue})</p>}
        </span>
      )}
    </div>
  );
}

const TrendIcon:React.FC<TrendIconProps> = ({ trend }) => {
  switch(trend) {
    case "UP" :
      return <Icon width={40} height={40} icon="ic:round-trending-up" />
    case "DOWN":
      return <Icon width={40} height={40} icon="ic:round-trending-down" />
    case "FLAT":
      return <Icon width={40} height={40} icon="ic:round-trending-flat" />
    default:
      return <></>
  }
}

export default SingleNumber;