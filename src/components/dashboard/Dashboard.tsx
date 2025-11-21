import { Card } from '../common/Card';
import { StatCard } from '../common/StatCard';
import { SortieChart } from '../charts/SortieChart';
import { ReadinessChart } from '../charts/ReadinessChart';
import { 
  analyticsData, 
  sortieChartData, 
  readinessChartData,
  sorties,
  aircraft,
  alerts
} from '../../data/mockData';
import { Plane, Activity, Wrench, AlertCircle, CheckCircle } from 'lucide-react';
import './Dashboard.css';

export const Dashboard = () => {
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged);
  
  const getStatusColor = (status: string): string => {
    const statusMap: Record<string, string> = {
      'completed': 'success',
      'in-progress': 'info',
      'scheduled': 'warning',
      'delayed': 'error',
      'cancelled': 'error'
    };
    return statusMap[status] || 'info';
  };

  const getAircraftStatusColor = (status: string): string => {
    const statusMap: Record<string, string> = {
      'mission-ready': 'success',
      'in-flight': 'info',
      'maintenance': 'error',
      'grounded': 'error',
      'standby': 'warning'
    };
    return statusMap[status] || 'info';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Mission Dashboard</h1>
          <p className="page-subtitle">Real-time sortie analytics and operational status</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <StatCard 
          title="Sortie Rate"
          value={analyticsData.sortieRate}
          unit="%"
          trend={5.2}
          icon={<Activity size={20} />}
          color="blue"
        />
        <StatCard 
          title="Mission Readiness"
          value={analyticsData.missionReadiness}
          unit="%"
          trend={2.1}
          icon={<CheckCircle size={20} />}
          color="green"
        />
        <StatCard 
          title="Aircraft Available"
          value={analyticsData.aircraftAvailability}
          unit="%"
          trend={-1.5}
          icon={<Plane size={20} />}
          color="yellow"
        />
        <StatCard 
          title="Maintenance Backlog"
          value={analyticsData.maintenanceBacklog}
          unit="items"
          trend={-3.2}
          icon={<Wrench size={20} />}
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        <Card title="Sortie Trends (7 Days)">
          <SortieChart data={sortieChartData} />
        </Card>
        <Card title="Aircraft Readiness (7 Days)">
          <ReadinessChart data={readinessChartData} />
        </Card>
      </div>

      {/* Data Tables Row */}
      <div className="tables-grid">
        {/* Active Sorties */}
        <Card 
          title="Active Sorties" 
          action={
            <button className="btn-secondary">View All</button>
          }
        >
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Mission</th>
                  <th>Aircraft</th>
                  <th>Crew</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sorties.slice(0, 5).map((sortie) => (
                  <tr key={sortie.id}>
                    <td className="font-medium">{sortie.missionNumber}</td>
                    <td>{sortie.tailNumber}</td>
                    <td>{sortie.crew[0]}</td>
                    <td>{sortie.missionType}</td>
                    <td>
                      <span className={`status-badge status-${getStatusColor(sortie.status)}`}>
                        {sortie.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Aircraft Status */}
        <Card 
          title="Aircraft Status"
          action={
            <button className="btn-secondary">Manage</button>
          }
        >
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tail #</th>
                  <th>Type</th>
                  <th>Squadron</th>
                  <th>Maintenance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {aircraft.map((ac) => (
                  <tr key={ac.id}>
                    <td className="font-medium">{ac.tailNumber}</td>
                    <td>{ac.type}</td>
                    <td>{ac.squadron}</td>
                    <td>
                      <span className={`status-dot status-${ac.maintenanceStatus.level}`}></span>
                      {ac.maintenanceStatus.level.toUpperCase()}
                    </td>
                    <td>
                      <span className={`status-badge status-${getAircraftStatusColor(ac.status)}`}>
                        {ac.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      {unacknowledgedAlerts.length > 0 && (
        <Card title="System Alerts">
          <div className="alerts-list">
            {unacknowledgedAlerts.map((alert) => (
              <div key={alert.id} className={`alert alert-${alert.type}`}>
                <div className="alert-icon">
                  <AlertCircle size={20} />
                </div>
                <div className="alert-content">
                  <div className="alert-title">{alert.title}</div>
                  <div className="alert-message">{alert.message}</div>
                  <div className="alert-meta">
                    {alert.source} • {alert.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                <button className="btn-ghost">Acknowledge</button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
