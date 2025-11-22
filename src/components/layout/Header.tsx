import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, User, Settings, LayoutDashboard, Plane, Map, Calendar, Wrench, Users, BarChart3, FileText, CalendarCheck } from 'lucide-react';
import { SettingsModal } from '../modals/SettingsModal';
import './Header.css';

interface HeaderProps {
  unreadAlerts?: number;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { path: '/schedule', label: 'Schedule', icon: <CalendarCheck size={18} /> },
  { path: '/missions', label: 'Missions', icon: <Map size={18} /> },
  { path: '/sorties', label: 'Sorties', icon: <Calendar size={18} /> },
  { path: '/aircraft', label: 'Aircraft', icon: <Plane size={18} /> },
  { path: '/maintenance', label: 'Maintenance', icon: <Wrench size={18} /> },
  { path: '/crew', label: 'Crew', icon: <Users size={18} /> },
  { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  { path: '/reports', label: 'Reports', icon: <FileText size={18} /> },
];

export const Header = ({ unreadAlerts = 0 }: HeaderProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="header-left">
            <div className="logo">
              <div className="logo-icon">⚡</div>
              <h1><span style={{ textDecoration: 'line-through', opacity: 0.5 }}>TORQUE</span> SMORQUE</h1>
              <span className="subtitle">v0.1.0</span>
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
              <button 
                className="header-btn" 
                title="Alerts"
                onClick={() => setShowAlerts(!showAlerts)}
              >
                <Bell size={20} />
                {unreadAlerts > 0 && (
                  <span className="badge">{unreadAlerts}</span>
                )}
              </button>
              <button 
                className="header-btn" 
                title="Settings"
                onClick={() => setShowSettings(true)}
              >
                <Settings size={20} />
              </button>
              <button 
                className="header-btn user-btn" 
                title="User Profile"
                onClick={() => setShowProfile(!showProfile)}
              >
                <User size={20} />
                <span className="user-name">Operator</span>
              </button>
            </div>
          </div>
        </div>
        
        <nav className="header-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </header>
      
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  );
};
