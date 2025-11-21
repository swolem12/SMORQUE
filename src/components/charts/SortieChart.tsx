import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';
import './Charts.css';

interface SortieChartProps {
  data: ChartDataPoint[];
}

export const SortieChart = ({ data }: SortieChartProps) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8"
            style={{ fontSize: '0.75rem' }}
          />
          <YAxis 
            stroke="#94a3b8"
            style={{ fontSize: '0.75rem' }}
          />
          <Tooltip 
            contentStyle={{
              background: 'rgba(30, 41, 59, 0.95)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
