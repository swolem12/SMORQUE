import { Header } from './Header';
import { Sidebar } from './Sidebar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  unreadAlerts?: number;
}

export const Layout = ({ children, unreadAlerts }: LayoutProps) => {
  return (
    <div className="layout">
      <Header unreadAlerts={unreadAlerts} />
      <div className="layout-body">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};
