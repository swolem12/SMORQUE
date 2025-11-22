import { Card } from '../common/Card';
import { scheduleEvents as initialEvents, importedReports, optimizationSettings } from '../../data/mockData';
import { showSuccess, showError } from '../../utils/toast';
import { exportScheduleToExcel } from '../../utils/excelExport';
import './Schedule.css';
import Checkerboard from './Checkerboard';
import type { ScheduleEvent } from '../../types';
import { useState, useEffect } from 'react';
import { scheduleService } from '../../services/scheduleService';
import { Settings, BarChart3, CheckSquare, FileText, Download } from 'lucide-react';

type ViewMode = 'weekly' | 'monthly';

export const Schedule = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('weekly');
  const [showOptimization, setShowOptimization] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const now = new Date();
    const diff = now.getDate() - now.getDay();
    const start = new Date(now);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
  });

  useEffect(() => {
    // Initialize service with mock data
    scheduleService.init(initialEvents, importedReports, optimizationSettings);
    setEvents(scheduleService.getEvents());
  }, []);

  const handleUpdateEvent = (updated: ScheduleEvent) => {
    scheduleService.updateEvent(updated);
    setEvents(scheduleService.getEvents());
  };

  const handlePrevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const handleToday = () => {
    const now = new Date();
    const diff = now.getDate() - now.getDay();
    const start = new Date(now);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    setCurrentWeekStart(start);
  };

  const handleOptimize = () => {
    alert('Running optimization algorithm with current settings...');
    // In real implementation, would call optimization service
  };

  const handleApprove = () => {
    alert('Schedule approved! Sending notifications...');
    // In real implementation, would update approval status
  };

  const eventStats = {
    total: events.length,
    maintenance: events.filter(e => e.type === 'maintenance').length,
    operations: events.filter(e => e.type === 'operation').length, // fixed type string
    pending: events.filter(e => e.approvalStatus === 'pending').length,
    approved: events.filter(e => e.approvalStatus === 'approved').length,
  };

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <h1>Aircraft Schedule</h1>
        <p className="sub">Drag events between days or click Edit to change times</p>
      </div>

      <div className="schedule-controls">
        <div className="view-toggle">
          <button 
            className={viewMode === 'weekly' ? 'active' : ''} 
            onClick={() => setViewMode('weekly')}
          >
            Weekly
          </button>
          <button 
            className={viewMode === 'monthly' ? 'active' : ''} 
            onClick={() => setViewMode('monthly')}
          >
            Monthly
          </button>
        </div>

        <div className="week-nav">
          <button onClick={handlePrevWeek}>← Prev</button>
          <button onClick={handleToday}>Today</button>
          <button onClick={handleNextWeek}>Next →</button>
          <span className="week-label">
            Week of {currentWeekStart.toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="schedule-main">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Settings size={18} />
              <h3 style={{ margin: 0 }}>Optimization</h3>
            </div>
            <button 
              onClick={() => setShowOptimization(!showOptimization)}
              className="panel-toggle"
            >
              {showOptimization ? 'Hide' : 'Show'} Settings
            </button>
            {showOptimization && (
              <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                <p>Window: {optimizationSettings.windowStart.toLocaleDateString()} - {optimizationSettings.windowEnd.toLocaleDateString()}</p>
                <p>Priority Rules: {optimizationSettings.priorityRules.join(', ')}</p>
                <p>Allow Overlaps: {optimizationSettings.allowOverlaps ? 'Yes' : 'No'}</p>
                <button onClick={handleOptimize} className="action-button primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                  Run Optimization
                </button>
              </div>
            )}
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <BarChart3 size={18} />
              <h3 style={{ margin: 0 }}>Statistics</h3>
            </div>
            <button 
              onClick={() => setShowStatistics(!showStatistics)}
              className="panel-toggle"
            >
              {showStatistics ? 'Hide' : 'Show'} Stats
            </button>
            {showStatistics && (
              <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                <p>Total: {eventStats.total}</p>
                <p>Maintenance: {eventStats.maintenance}</p>
                <p>Operations: {eventStats.operations}</p>
                <p>Pending: {eventStats.pending}</p>
              </div>
            )}
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <CheckSquare size={18} />
              <h3 style={{ margin: 0 }}>Approval</h3>
            </div>
            <button 
              onClick={() => setShowApproval(!showApproval)}
              className="panel-toggle"
            >
              {showApproval ? 'Hide' : 'Show'} Workflow
            </button>
            {showApproval && (
              <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                <p>Approved: {eventStats.approved}</p>
                <p>Pending: {eventStats.pending}</p>
                <button onClick={handleApprove} className="action-button primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                  Approve Schedule
                </button>
              </div>
            )}
          </Card>
        </div>

        <div style={{ marginBottom: 12 }}>
          <Card title="Import / Export Tools">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a href="/SMORQUE/schedule/import" className="action-button" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} /> Import Reports
              </a>
              <button 
                onClick={() => {
                  const success = exportScheduleToExcel(events);
                  if (success) {
                    showSuccess(`Exported ${events.length} schedule events to Excel`);
                  } else {
                    showError('Failed to export schedule');
                  }
                }}
                className="action-button"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Download size={16} /> Export to Excel
              </button>
            </div>
          </Card>
        </div>

        {viewMode === 'weekly' ? (
          <Card title="Weekly Checkerboard">
            <Checkerboard 
              events={events} 
              onUpdateEvent={handleUpdateEvent}
              weekStart={currentWeekStart}
            />
          </Card>
        ) : (
          <Card title="Monthly View">
            <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
              Monthly view coming soon — showing {events.length} events
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Schedule;
