import { useState } from 'react';
import styles from './styles/MPieChart.module.scss'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type DataType = {
  name: string,
  value: number
}
interface PieChartProps {
  data: DataType[],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
interface CustomLabel {
  cx:number,
  cy: number,
  midAngle: number,
  innerRadius: number,
  outerRadius: number,
  percent: number,
  index?: number
}
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }:CustomLabel) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central" fontSize={10}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type KeyString = {
  [key:string]: number
}

const MPieChart:React.FC<PieChartProps> = ({ data }) => {
  const [opacity, setOpacity] = useState<KeyString>({});

  const handleMouseEnter = (o:any) => {
    const { value } = o;
    setOpacity({ [value]: 0.5 });
  };

  const handleMouseLeave = (o:any) => {
    setOpacity({ });
  };

  return (
    <ResponsiveContainer width="100%" height="100%" className={styles.root} minWidth={0}>
      <PieChart width={150} height={40}  data={data} >
        <Pie data={data} dataKey="value" cy="50%" cx="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" fontSize={10}>
          {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={opacity[entry.name] || 1} />
            ))}
        </Pie>
        <Legend layout='vertical' verticalAlign="middle" align="right" fontSize={10} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default MPieChart;