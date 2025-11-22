import { Header } from './Header';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  unreadAlerts?: number;
}

export const Layout = ({ children, unreadAlerts }: LayoutProps) => {
  return (
    <div className="layout">
      <Header unreadAlerts={unreadAlerts} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
