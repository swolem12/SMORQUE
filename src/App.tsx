import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Missions } from './components/missions/Missions';
import { 
  Sorties, 
  Aircraft, 
  Maintenance, 
  Crew, 
  Analytics, 
  Reports 
} from './components/dashboard/PlaceholderPages';
import { alerts } from './data/mockData';
import './App.css';

function App() {
  const unreadAlerts = alerts.filter(a => !a.acknowledged).length;

  return (
    <Router>
      <Layout unreadAlerts={unreadAlerts}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/sorties" element={<Sorties />} />
          <Route path="/aircraft" element={<Aircraft />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
