import { Card } from '../common/Card';
import { missions } from '../../data/mockData';
import { MapPin, Users, Target, Calendar } from 'lucide-react';
import './Missions.css';

export const Missions = () => {
  const getStatusColor = (status: string): string => {
    const statusMap: Record<string, string> = {
      'planning': 'warning',
      'approved': 'info',
      'active': 'success',
      'completed': 'success',
      'cancelled': 'error'
    };
    return statusMap[status] || 'info';
  };

  const getPriorityColor = (priority: string): string => {
    const priorityMap: Record<string, string> = {
      'low': 'info',
      'medium': 'warning',
      'high': 'error',
      'critical': 'error'
    };
    return priorityMap[priority] || 'info';
  };

  return (
    <div className="missions-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Mission Planning</h1>
          <p className="page-subtitle">Operational mission management and coordination</p>
        </div>
        <button className="btn-primary">
          <Target size={18} />
          New Mission
        </button>
      </div>

      <div className="missions-grid">
        {missions.map((mission) => (
          <Card key={mission.id} className="mission-card">
            <div className="mission-header">
              <div>
                <h3 className="mission-name">{mission.name}</h3>
                <div className="mission-meta">
                  <span className={`status-badge status-${getStatusColor(mission.status)}`}>
                    {mission.status}
                  </span>
                  <span className={`priority-badge priority-${getPriorityColor(mission.priority)}`}>
                    {mission.priority.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="mission-id">{mission.id}</div>
            </div>

            <div className="mission-info">
              <div className="info-item">
                <Calendar size={16} />
                <span>
                  {mission.startTime.toLocaleDateString()} {mission.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="info-item">
                <MapPin size={16} />
                <span>{mission.location.name}</span>
              </div>
              <div className="info-item">
                <Users size={16} />
                <span>{mission.assignedCrew.length} crew members</span>
              </div>
            </div>

            <div className="mission-objectives">
              <h4>Objectives:</h4>
              <ul>
                {mission.objectives.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="mission-footer">
              <div className="assigned-aircraft">
                <strong>Aircraft:</strong> {mission.assignedAircraft.join(', ')}
              </div>
              <div className="mission-actions">
                <button className="btn-ghost">View Details</button>
                <button className="btn-secondary">Edit</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
