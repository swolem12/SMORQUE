// Core type definitions for USAF Torque Dashboard

export interface Sortie {
  id: string;
  missionNumber: string;
  aircraft: string;
  tailNumber: string;
  crew: string[];
  status: SortieStatus;
  scheduledTime: Date;
  actualTime?: Date;
  duration: number;
  missionType: string;
  location: string;
}

export type SortieStatus = 
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'delayed'
  | 'cancelled'
  | 'maintenance';

export interface Aircraft {
  id: string;
  tailNumber: string;
  type: string;
  squadron: string;
  status: AircraftStatus;
  location: string;
  maintenanceStatus: MaintenanceStatus;
  flightHours: number;
  nextMaintenance: Date;
  currentMission?: string;
}

export type AircraftStatus = 
  | 'mission-ready'
  | 'in-flight'
  | 'maintenance'
  | 'grounded'
  | 'standby';

export interface MaintenanceStatus {
  level: 'green' | 'yellow' | 'red';
  nextScheduled: Date;
  openWorkOrders: number;
  criticalItems: number;
}

export interface Mission {
  id: string;
  name: string;
  type: string;
  status: MissionStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  startTime: Date;
  endTime: Date;
  assignedAircraft: string[];
  assignedCrew: string[];
  objectives: string[];
  location: {
    lat: number;
    lng: number;
    name: string;
  };
}

export type MissionStatus = 
  | 'planning'
  | 'approved'
  | 'active'
  | 'completed'
  | 'cancelled';

export interface CrewMember {
  id: string;
  name: string;
  rank: string;
  role: string;
  squadron: string;
  status: 'available' | 'deployed' | 'training' | 'unavailable';
  certifications: string[];
  flightHours: number;
  qualifications: string[];
  availability: 'available' | 'on-mission' | 'training' | 'leave';
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  source: string;
}

export interface AnalyticsData {
  sortieRate: number;
  missionReadiness: number;
  aircraftAvailability: number;
  maintenanceBacklog: number;
  averageTurnaroundTime: number;
  completionRate: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'stat' | 'table' | 'map' | 'alert';
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  data: unknown;
}

// Scheduling / Aircraft Schedule types (from Aircraft Schedule user guide)
export interface ScheduleEvent {
  id: string;
  title: string;
  aircraftTail: string;
  aircraftId?: string;
  startTime: Date;
  endTime: Date;
  durationMinutes?: number;
  type: 'maintenance' | 'operation' | 'training' | 'flight' | 'other';
  status: 'draft' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'approved';
  source?: ImportReportType | 'manual';
  assignedCrew?: string[];
  location?: string;
  notes?: string;
  approvalStatus?: ApprovalStatus;
}

export type ImportReportType = 'mmPairs' | 'PRA' | 'G081' | 'GTIMS' | 'PEX' | 'TMS' | 'other';

export interface ImportedReport {
  id: string;
  type: ImportReportType;
  filename?: string;
  importedAt: Date;
  rawData?: unknown;
  parsedEvents?: ScheduleEvent[];
}

export interface OptimizationSettings {
  windowStart: Date;
  windowEnd: Date;
  priorityRules: string[];
  allowOverlaps: boolean;
}

export type ApprovalStatus = 'draft' | 'pending' | 'approved' | 'published';

export type UserRole = 'ps-maintainer' | 'leadership' | 'viewer' | 'admin';

export type ScheduleView = 'weekly' | 'monthly' | 'presentation';
