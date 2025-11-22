import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Missions } from './components/missions/Missions';
import { Schedule } from './components/schedule/Schedule';
import { ImportTool } from './components/schedule/ImportTool';
import { 
  Sorties, 
  AircraftPage, 
  Maintenance, 
  Crew, 
  Analytics, 
  Reports 
} from './components/dashboard/PlaceholderPages';
import { alerts } from './data/mockData';
import { dbService } from './services/dbService';
import { showSuccess } from './utils/toast';
import './App.css';

function App() {
  const unreadAlerts = alerts.filter(a => !a.acknowledged).length;

  useEffect(() => {
    // Initialize database on app load
    dbService.initialize().then(() => {
      showSuccess('SMORQUE initialized - Data persistence active');
    });
  }, []);

  return (
    <ThemeProvider>
      <Toaster position="top-right" />
      <Router basename="/smorque">
        <Layout unreadAlerts={unreadAlerts}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/sorties" element={<Sorties />} />
            <Route path="/aircraft" element={<AircraftPage />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/schedule/import" element={<ImportTool />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;