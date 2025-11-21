import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

export const StatCard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  icon,
  color = 'blue'
}: StatCardProps) => {
  const getTrendIcon = () => {
    if (!trend) return <Minus size={16} />;
    return trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />;
  };

  const getTrendClass = () => {
    if (!trend) return 'neutral';
    return trend > 0 ? 'positive' : 'negative';
  };

  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        {icon && <span className="stat-icon">{icon}</span>}
      </div>
      <div className="stat-value">
        <span className="stat-number">{value}</span>
        {unit && <span className="stat-unit">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div className={`stat-trend ${getTrendClass()}`}>
          {getTrendIcon()}
          <span>{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
  );
};
