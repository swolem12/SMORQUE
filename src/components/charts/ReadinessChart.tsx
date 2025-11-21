import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';

interface ReadinessChartProps {
  data: ChartDataPoint[];
}

export const ReadinessChart = ({ data }: ReadinessChartProps) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8"
            style={{ fontSize: '0.75rem' }}
          />
          <YAxis 
            stroke="#94a3b8"
            style={{ fontSize: '0.75rem' }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{
              background: 'rgba(30, 41, 59, 0.95)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Bar 
            dataKey="value" 
            fill="#10b981"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
