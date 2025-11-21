import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plane, 
  Map, 
  Calendar,
  Wrench,
  Users,
  BarChart3,
  FileText
} from 'lucide-react';
import './Sidebar.css';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/missions', label: 'Missions', icon: <Map size={20} /> },
  { path: '/sorties', label: 'Sorties', icon: <Calendar size={20} /> },
  { path: '/aircraft', label: 'Aircraft', icon: <Plane size={20} /> },
  { path: '/maintenance', label: 'Maintenance', icon: <Wrench size={20} /> },
  { path: '/crew', label: 'Crew', icon: <Users size={20} /> },
  { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { path: '/reports', label: 'Reports', icon: <FileText size={20} /> },
];

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
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
      
      <div className="sidebar-footer">
        <div className="version-info">
          <div className="version-label">TORQUE v2.1.0</div>
          <div className="build-info">Build 2025.11.21</div>
        </div>
      </div>
    </aside>
  );
};
