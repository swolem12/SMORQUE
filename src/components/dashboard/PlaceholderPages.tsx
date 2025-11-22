import { useState, useEffect } from 'react';
import { Search, Filter, Plane, Clock, MapPin, Users, CheckCircle, AlertCircle, Wrench, Calendar, TrendingUp, Download, Printer, Eye, Plus, Edit, Trash2 } from 'lucide-react';
import { Card } from '../common/Card';
import { StatCard } from '../common/StatCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { SortieModal } from '../modals/SortieModal';
import { aircraft as mockAircraft, crewMembers as mockCrew } from '../../data/mockData';
import { dbService } from '../../services/dbService';
import { showSuccess, showError, showWarning, showLoading } from '../../utils/toast';
import { exportSortiesToExcel, exportScheduleToExcel, exportCrewToExcel, exportAircraftToExcel } from '../../utils/excelExport';
import type { Sortie, Aircraft, CrewMember } from '../../types';
import './Dashboard.css';

export const Sorties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sorties, setSorties] = useState<Sortie[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSortie, setEditingSortie] = useState<Sortie | undefined>();
  const [loading, setLoading] = useState(true);

  // Load sorties from database
  useEffect(() => {
    loadSorties();
  }, []);

  const loadSorties = async () => {
    setLoading(true);
    try {
      const data = await dbService.getSorties();
      setSorties(data);
    } catch (error) {
      showError('Failed to load sorties');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSortie = () => {
    setEditingSortie(undefined);
    setModalOpen(true);
  };

  const handleEditSortie = (sortie: Sortie) => {
    setEditingSortie(sortie);
    setModalOpen(true);
  };

  const handleDeleteSortie = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sortie?')) return;

    showLoading('Deleting sortie...');
    try {
      await dbService.deleteSortie(id);
      await loadSorties();
      showSuccess('Sortie deleted successfully');
    } catch (error) {
      showError('Failed to delete sortie');
      console.error(error);
    }
  };

  const handleSaveSortie = async (sortie: Sortie) => {
    showLoading(editingSortie ? 'Updating sortie...' : 'Creating sortie...');
    try {
      if (editingSortie) {
        await dbService.updateSortie(sortie.id, sortie);
        showSuccess('Sortie updated successfully');
      } else {
        await dbService.addSortie(sortie);
        showSuccess('Sortie created successfully');
      }
      await loadSorties();
      setModalOpen(false);
    } catch (error) {
      showError(editingSortie ? 'Failed to update sortie' : 'Failed to create sortie');
      console.error(error);
    }
  };

  const handleExportExcel = () => {
    const success = exportSortiesToExcel(filteredSorties);
    if (success) {
      showSuccess(`Exported ${filteredSorties.length} sorties to Excel`);
    } else {
      showError('Failed to export Excel file');
    }
  };

  const filteredSorties = sorties.filter(sortie => {
    const matchesSearch = sortie.missionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sortie.tailNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sortie.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle size={16} className="status-icon-success" />;
      case 'in-progress': return <Clock size={16} className="status-icon-info" />;
      case 'scheduled': return <Calendar size={16} className="status-icon-warning" />;
      case 'delayed': return <AlertCircle size={16} className="status-icon-error" />;
      default: return null;
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" text="Loading Sorties..." />;
  }

  const stats = {
    total: sorties.length,
    completed: sorties.filter(s => s.status === 'completed').length,
    inProgress: sorties.filter(s => s.status === 'in-progress').length,
    scheduled: sorties.filter(s => s.status === 'scheduled').length
  };

  return (
    <div>
      <h1 className="page-title">Sortie Management</h1>
      <p className="page-subtitle">Detailed sortie scheduling and tracking</p>

      <div className="metrics-grid">
        <StatCard title="Total Sorties" value={stats.total} icon={<Plane />} />
        <StatCard title="Completed" value={stats.completed} icon={<CheckCircle />} trend={12} />
        <StatCard title="In Progress" value={stats.inProgress} icon={<Clock />} />
        <StatCard title="Scheduled" value={stats.scheduled} icon={<Calendar />} />
      </div>

      <Card className="filter-card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', flex: 1, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
              <input
                type="text"
                placeholder="Search by mission number or tail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Filter size={18} />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ 
                  padding: '0.75rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="scheduled">Scheduled</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={handleExportExcel}
              className="action-button"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Download size={16} /> Export Excel
            </button>
            <button 
              onClick={handleAddSortie}
              className="action-button primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus size={16} /> Add Sortie
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mission</th>
                <th>Aircraft</th>
                <th>Tail Number</th>
                <th>Crew</th>
                <th>Type</th>
                <th>Scheduled</th>
                <th>Duration</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSorties.map(sortie => (
                <tr key={sortie.id}>
                  <td><strong>{sortie.missionNumber}</strong></td>
                  <td>{sortie.aircraft}</td>
                  <td><code>{sortie.tailNumber}</code></td>
                  <td>{sortie.crew.join(', ')}</td>
                  <td>{sortie.missionType}</td>
                  <td>{sortie.scheduledTime.toLocaleString()}</td>
                  <td>{sortie.duration} min</td>
                  <td><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />{sortie.location}</td>
                  <td>
                    <span className={`status-badge status-${sortie.status}`}>
                      {getStatusIcon(sortie.status)} {sortie.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleEditSortie(sortie)}
                        className="icon-button"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteSortie(sortie.id)}
                        className="icon-button danger"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {modalOpen && (
        <SortieModal
          sortie={editingSortie}
          onSave={handleSaveSortie}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export const AircraftPage = () => {
  const [searchTail, setSearchTail] = useState('');
  
  const filteredAircraft = mockAircraft.filter(ac => 
    ac.tailNumber.toLowerCase().includes(searchTail.toLowerCase()) ||
    ac.type.toLowerCase().includes(searchTail.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'mission-ready': return 'success';
      case 'in-flight': return 'info';
      case 'maintenance': return 'warning';
      case 'grounded': return 'error';
      default: return 'info';
    }
  };

  const stats = {
    total: mockAircraft.length,
    missionReady: mockAircraft.filter(a => a.status === 'mission-ready').length,
    maintenance: mockAircraft.filter(a => a.status === 'maintenance').length,
    inFlight: mockAircraft.filter(a => a.status === 'in-flight').length
  };

  return (
    <div>
      <h1 className="page-title">Aircraft Fleet</h1>
      <p className="page-subtitle">Aircraft inventory and status monitoring</p>

      <div className="metrics-grid">
        <StatCard title="Total Aircraft" value={stats.total} icon={<Plane />} />
        <StatCard title="Mission Ready" value={stats.missionReady} icon={<CheckCircle />} trend={5} />
        <StatCard title="In Maintenance" value={stats.maintenance} icon={<Wrench />} />
        <StatCard title="In Flight" value={stats.inFlight} icon={<MapPin />} />
      </div>

      <Card className="filter-card">
        <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
          <input
            type="text"
            placeholder="Search by tail number or type..."
            value={searchTail}
            onChange={(e) => setSearchTail(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem 0.75rem 0.75rem 2.5rem', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tail Number</th>
                <th>Type</th>
                <th>Squadron</th>
                <th>Status</th>
                <th>Location</th>
                <th>Flight Hours</th>
                <th>Next Maintenance</th>
                <th>Open Work Orders</th>
                <th>Critical Items</th>
              </tr>
            </thead>
            <tbody>
              {filteredAircraft.map(ac => (
                <tr key={ac.id}>
                  <td><strong><code>{ac.tailNumber}</code></strong></td>
                  <td>{ac.type}</td>
                  <td>{ac.squadron}</td>
                  <td>
                    <span className={`status-badge status-${getStatusColor(ac.status)}`}>
                      {ac.status}
                    </span>
                  </td>
                  <td>{ac.location}</td>
                  <td>{ac.flightHours.toLocaleString()} hrs</td>
                  <td>{ac.nextMaintenance.toLocaleDateString()}</td>
                  <td>{ac.maintenanceStatus.openWorkOrders}</td>
                  <td>
                    {ac.maintenanceStatus.criticalItems > 0 ? (
                      <span className="status-badge status-error">{ac.maintenanceStatus.criticalItems}</span>
                    ) : (
                      <span className="status-badge status-success">0</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const Maintenance = () => {
  const maintenanceEvents = mockAircraft.flatMap(ac => 
    ac.maintenanceStatus.openWorkOrders > 0 ? [{
      aircraft: ac.tailNumber,
      type: ac.type,
      squadron: ac.squadron,
      workOrders: ac.maintenanceStatus.openWorkOrders,
      criticalItems: ac.maintenanceStatus.criticalItems,
      nextScheduled: ac.maintenanceStatus.nextScheduled,
      status: ac.maintenanceStatus.level
    }] : []
  );

  const stats = {
    totalEvents: maintenanceEvents.length,
    critical: maintenanceEvents.filter(e => e.criticalItems > 0).length,
    scheduled: maintenanceEvents.filter(e => e.status === 'green').length,
    inProgress: maintenanceEvents.filter(e => e.status === 'yellow').length
  };

  return (
    <div>
      <h1 className="page-title">Maintenance Operations</h1>
      <p className="page-subtitle">Scheduled and unscheduled maintenance tracking</p>

      <div className="metrics-grid">
        <StatCard title="Active Events" value={stats.totalEvents} icon={<Wrench />} />
        <StatCard title="Critical Items" value={stats.critical} icon={<AlertCircle />} trend={-3} />
        <StatCard title="Scheduled" value={stats.scheduled} icon={<Calendar />} />
        <StatCard title="In Progress" value={stats.inProgress} icon={<Clock />} />
      </div>

      <Card>
        <h3 style={{ marginBottom: '1.5rem' }}>Maintenance Schedule</h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tail Number</th>
                <th>Aircraft Type</th>
                <th>Squadron</th>
                <th>Work Orders</th>
                <th>Critical Items</th>
                <th>Next Scheduled</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceEvents.map((event, idx) => (
                <tr key={idx}>
                  <td><strong><code>{event.aircraft}</code></strong></td>
                  <td>{event.type}</td>
                  <td>{event.squadron}</td>
                  <td>{event.workOrders}</td>
                  <td>
                    {event.criticalItems > 0 ? (
                      <span className="status-badge status-error"><AlertCircle size={14} /> {event.criticalItems}</span>
                    ) : (
                      <span className="status-badge status-success">None</span>
                    )}
                  </td>
                  <td>{event.nextScheduled.toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${event.status === 'green' ? 'success' : 'warning'}`}>
                      {event.status === 'green' ? 'On Schedule' : 'In Progress'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const Crew = () => {
  const [searchCrew, setSearchCrew] = useState('');
  
  const filteredCrew = mockCrew.filter(crew =>
    crew.name.toLowerCase().includes(searchCrew.toLowerCase()) ||
    crew.rank.toLowerCase().includes(searchCrew.toLowerCase())
  );

  const stats = {
    total: mockCrew.length,
    available: mockCrew.filter(c => c.availability === 'available').length,
    onMission: mockCrew.filter(c => c.availability === 'on-mission').length,
    training: mockCrew.filter(c => c.availability === 'training').length
  };

  return (
    <div>
      <h1 className="page-title">Crew Management</h1>
      <p className="page-subtitle">Personnel assignments and qualifications</p>

      <div className="metrics-grid">
        <StatCard title="Total Personnel" value={stats.total} icon={<Users />} />
        <StatCard title="Available" value={stats.available} icon={<CheckCircle />} />
        <StatCard title="On Mission" value={stats.onMission} icon={<Plane />} />
        <StatCard title="In Training" value={stats.training} icon={<TrendingUp />} />
      </div>

      <Card className="filter-card">
        <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
          <input
            type="text"
            placeholder="Search by name or rank..."
            value={searchCrew}
            onChange={(e) => setSearchCrew(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem 0.75rem 0.75rem 2.5rem', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rank</th>
                <th>Role</th>
                <th>Squadron</th>
                <th>Qualifications</th>
                <th>Flight Hours</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrew.map(crew => (
                <tr key={crew.id}>
                  <td><strong>{crew.name}</strong></td>
                  <td>{crew.rank}</td>
                  <td>{crew.role}</td>
                  <td>{crew.squadron}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {crew.qualifications.slice(0, 2).map((qual, idx) => (
                        <span key={idx} className="status-badge status-info" style={{ fontSize: '0.75rem' }}>
                          {qual}
                        </span>
                      ))}
                      {crew.qualifications.length > 2 && (
                        <span className="status-badge status-info" style={{ fontSize: '0.75rem' }}>
                          +{crew.qualifications.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>{crew.flightHours.toLocaleString()} hrs</td>
                  <td>
                    <span className={`status-badge status-${
                      crew.availability === 'available' ? 'success' : 
                      crew.availability === 'on-mission' ? 'info' : 'warning'
                    }`}>
                      {crew.availability}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const Analytics = () => {
  const missionSuccessRate = 87.5;
  const avgSortieDuration = 135;
  const aircraftUtilization = 72.3;
  const maintenanceEfficiency = 94.1;

  return (
    <div>
      <h1 className="page-title">Advanced Analytics</h1>
      <p className="page-subtitle">In-depth performance metrics and trends</p>

      <div className="metrics-grid">
        <StatCard title="Mission Success Rate" value={`${missionSuccessRate}%`} icon={<CheckCircle />} trend={2.3} />
        <StatCard title="Avg Sortie Duration" value={`${avgSortieDuration}m`} icon={<Clock />} />
        <StatCard title="Aircraft Utilization" value={`${aircraftUtilization}%`} icon={<Plane />} trend={5.1} />
        <StatCard title="Maintenance Efficiency" value={`${maintenanceEfficiency}%`} icon={<Wrench />} trend={1.8} />
      </div>

      <div className="charts-grid">
        <Card>
          <h3>Sortie Trends by Type</h3>
          <div className="table-wrapper" style={{ marginTop: '1rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Mission Type</th>
                  <th>Count</th>
                  <th>Avg Duration</th>
                  <th>Success Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Combat Air Patrol</td>
                  <td>12</td>
                  <td>120 min</td>
                  <td><span className="status-badge status-success">92%</span></td>
                </tr>
                <tr>
                  <td>Close Air Support</td>
                  <td>8</td>
                  <td>165 min</td>
                  <td><span className="status-badge status-success">85%</span></td>
                </tr>
                <tr>
                  <td>Air Interdiction</td>
                  <td>6</td>
                  <td>90 min</td>
                  <td><span className="status-badge status-warning">78%</span></td>
                </tr>
                <tr>
                  <td>Air Refueling</td>
                  <td>4</td>
                  <td>240 min</td>
                  <td><span className="status-badge status-success">100%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3>Squadron Performance</h3>
          <div className="table-wrapper" style={{ marginTop: '1rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Squadron</th>
                  <th>Aircraft</th>
                  <th>Sorties</th>
                  <th>Readiness</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>34th FS</strong></td>
                  <td>12</td>
                  <td>24</td>
                  <td><span className="status-badge status-success">95%</span></td>
                </tr>
                <tr>
                  <td><strong>421st FS</strong></td>
                  <td>10</td>
                  <td>18</td>
                  <td><span className="status-badge status-success">88%</span></td>
                </tr>
                <tr>
                  <td><strong>23rd FG</strong></td>
                  <td>8</td>
                  <td>15</td>
                  <td><span className="status-badge status-warning">76%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const Reports = () => {
  const [reportType, setReportType] = useState('schedule');
  const [format, setFormat] = useState('excel');
  const [sorties, setSorties] = useState<Sortie[]>([]);
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [sortiesData, aircraftData, crewData] = await Promise.all([
        dbService.getSorties(),
        dbService.getAircraft(),
        dbService.getCrew()
      ]);
      setSorties(sortiesData);
      setAircraft(aircraftData);
      setCrew(crewData);
    } catch (error) {
      showError('Failed to load data for reports');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    showLoading(`Generating ${reportType} report...`);
    
    try {
      let success = false;
      
      if (format === 'excel') {
        switch (reportType) {
          case 'schedule':
            dbService.getScheduleEvents().then(events => {
              success = exportScheduleToExcel(events);
              if (success) showSuccess('Schedule report exported successfully');
              else showError('Export failed');
            });
            return;
          case 'sortie':
            success = exportSortiesToExcel(sorties);
            break;
          case 'crew':
            success = exportCrewToExcel(crew);
            break;
          case 'maintenance':
            success = exportAircraftToExcel(aircraft);
            break;
          default:
            showWarning('This report type is not yet implemented');
            return;
        }
        
        if (success) {
          showSuccess(`${reportType} report exported successfully`);
        } else {
          showError('Export failed');
        }
      } else {
        showWarning(`${format.toUpperCase()} export coming soon`);
      }
    } catch (error) {
      showError('Failed to generate report');
      console.error(error);
    }
  };

  const handlePrint = (orientation: string) => {
    showWarning(`Print functionality coming soon (${orientation} orientation)`);
  };

  if (loading) {
    return <LoadingSpinner size="large" text="Loading Report Data..." />;
  }

  return (
    <div>
      <h1 className="page-title">Reports & Documentation</h1>
      <p className="page-subtitle">Generate and view operational reports</p>

      <div className="charts-grid">
        <Card>
          <h3 style={{ marginBottom: '1.5rem' }}>Report Generation</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#9CA3AF' }}>
                Report Type
              </label>
              <select 
                value={reportType} 
                onChange={(e) => setReportType(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '0.75rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              >
                <option value="schedule">Aircraft Schedule</option>
                <option value="maintenance">Maintenance Report</option>
                <option value="sortie">Sortie Summary</option>
                <option value="crew">Crew Assignments</option>
                <option value="analytics">Analytics Dashboard</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#9CA3AF' }}>
                Export Format
              </label>
              <select 
                value={format} 
                onChange={(e) => setFormat(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '0.75rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              >
                <option value="excel">Excel (.xlsx)</option>
                <option value="pdf">PDF Document</option>
                <option value="csv">CSV File</option>
              </select>
            </div>

            <button 
              onClick={handleExport}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Download size={18} />
              Export Report
            </button>
          </div>
        </Card>

        <Card>
          <h3 style={{ marginBottom: '1.5rem' }}>Print Options</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              onClick={() => handlePrint('landscape')}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Printer size={18} />
              Print Landscape
            </button>

            <button 
              onClick={() => handlePrint('portrait')}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Printer size={18} />
              Print Portrait
            </button>

            <button 
              onClick={() => alert('Opening presentation view...')}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Eye size={18} />
              Presentation View
            </button>
          </div>
        </Card>
      </div>

      <Card>
        <h3 style={{ marginBottom: '1rem' }}>Recent Reports</h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Type</th>
                <th>Generated</th>
                <th>Format</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Weekly Schedule - Week 47</strong></td>
                <td>Schedule</td>
                <td>{new Date().toLocaleDateString()}</td>
                <td><span className="status-badge status-info">XLSX</span></td>
                <td>
                  <button style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}>
                    <Download size={14} />
                  </button>
                </td>
              </tr>
              <tr>
                <td><strong>Maintenance Summary - November</strong></td>
                <td>Maintenance</td>
                <td>{new Date(Date.now() - 86400000).toLocaleDateString()}</td>
                <td><span className="status-badge status-error">PDF</span></td>
                <td>
                  <button style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}>
                    <Download size={14} />
                  </button>
                </td>
              </tr>
              <tr>
                <td><strong>Sortie Analytics - Q4 2025</strong></td>
                <td>Analytics</td>
                <td>{new Date(Date.now() - 172800000).toLocaleDateString()}</td>
                <td><span className="status-badge status-success">CSV</span></td>
                <td>
                  <button style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}>
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
