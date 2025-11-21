import { Bell, User, Settings } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  unreadAlerts?: number;
}

export const Header = ({ unreadAlerts = 0 }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <h1>TORQUE</h1>
          <span className="subtitle">Sortie Analytics</span>
        </div>
      </div>
      
      <div className="header-center">
        <div className="status-indicator">
          <span className="status-dot status-active"></span>
          <span>SYSTEM OPERATIONAL</span>
        </div>
      </div>
      
      <div className="header-right">
        <div className="header-actions">
          <button className="header-btn" title="Alerts">
            <Bell size={20} />
            {unreadAlerts > 0 && (
              <span className="badge">{unreadAlerts}</span>
            )}
          </button>
          <button className="header-btn" title="Settings">
            <Settings size={20} />
          </button>
          <button className="header-btn user-btn" title="User Profile">
            <User size={20} />
            <span className="user-name">Operator</span>
          </button>
        </div>
      </div>
    </header>
  );
};
