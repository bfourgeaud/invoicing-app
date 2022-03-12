import { transcode } from 'buffer';
import toMoney from 'lib/utils/toMoney';
import { useState } from 'react';
import { BarChart, Bar, Cell, CartesianGrid, XAxis, ResponsiveContainer, YAxis } from 'recharts';

type DataType = {
  x: string,
  y:string| number
}
interface BarChartProps {
  data: DataType[],
  vertical?: boolean,
  yAxis?:boolean
}

const MBarChart:React.FC<BarChartProps> = ({ data, vertical=false, yAxis=true }) => {
  const [focusBar, setFocusBar] = useState(null);

  const onMouseEnter = (state:any) => {
    if (state?.payload) {
      setFocusBar(state.payload);
    }
  }

  const CustomBars = () => data.map((item, index) => (
    <Cell key={`cell-${index}`} fill={focusBar && focusBar === item ? '#0057B6' : '#007AFF'} />
  ))

  return (
    <ResponsiveContainer width="100%" height="100%" className="overflow-hidden" minWidth={0}>
      <BarChart width={150} height={40}  data={data}  layout={vertical ? "vertical": "horizontal"}>
        <XAxis dataKey={vertical ? "y" : "x"} type={vertical ? "number" : "category"} fontSize={10} />
        {yAxis && <YAxis dataKey={vertical ? "x" : "y"} type={vertical ? "category" : "number"} fontSize={10} interval={0} />}
        <Bar dataKey="y" fill="#ff6f31" className='cursor-pointer' label={{ position: vertical ? "insideRight" : "insideTop", fontSize:8, fill:'#FFF'}} onMouseEnter={onMouseEnter} onMouseLeave={() => setFocusBar(null)}>
          {CustomBars()}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MBarChart;