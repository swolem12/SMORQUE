import type { 
  Sortie, 
  Aircraft, 
  Mission, 
  CrewMember, 
  Alert, 
  AnalyticsData,
  ChartDataPoint 
} from '../types';

// Generate placeholder sorties
export const sorties: Sortie[] = [
  {
    id: 'S001',
    missionNumber: 'TQ-2501',
    aircraft: 'F-16C',
    tailNumber: '88-0001',
    crew: ['Capt. Johnson', 'Lt. Smith'],
    status: 'completed',
    scheduledTime: new Date('2025-11-21T06:00:00'),
    actualTime: new Date('2025-11-21T06:15:00'),
    duration: 120,
    missionType: 'Combat Air Patrol',
    location: 'Zone Alpha'
  },
  {
    id: 'S002',
    missionNumber: 'TQ-2502',
    aircraft: 'F-16C',
    tailNumber: '88-0002',
    crew: ['Maj. Williams', 'Lt. Davis'],
    status: 'in-progress',
    scheduledTime: new Date('2025-11-21T08:00:00'),
    duration: 90,
    missionType: 'Air Interdiction',
    location: 'Zone Bravo'
  },
  {
    id: 'S003',
    missionNumber: 'TQ-2503',
    aircraft: 'F-15E',
    tailNumber: '89-0123',
    crew: ['Lt. Col. Brown', 'Capt. Miller'],
    status: 'scheduled',
    scheduledTime: new Date('2025-11-21T14:00:00'),
    duration: 150,
    missionType: 'Close Air Support',
    location: 'Zone Charlie'
  },
  {
    id: 'S004',
    missionNumber: 'TQ-2504',
    aircraft: 'A-10C',
    tailNumber: '81-0956',
    crew: ['Capt. Anderson', 'Lt. Wilson'],
    status: 'delayed',
    scheduledTime: new Date('2025-11-21T10:00:00'),
    duration: 180,
    missionType: 'Close Air Support',
    location: 'Zone Delta'
  },
  {
    id: 'S005',
    missionNumber: 'TQ-2505',
    aircraft: 'KC-135',
    tailNumber: '58-0100',
    crew: ['Maj. Taylor', 'Lt. Moore', 'SSgt. Jackson'],
    status: 'scheduled',
    scheduledTime: new Date('2025-11-21T16:00:00'),
    duration: 240,
    missionType: 'Air Refueling',
    location: 'Zone Echo'
  }
];

// Generate placeholder aircraft
export const aircraft: Aircraft[] = [
  {
    id: 'A001',
    tailNumber: '88-0001',
    type: 'F-16C',
    squadron: '34th FS',
    status: 'mission-ready',
    location: 'Home Base',
    maintenanceStatus: {
      level: 'green',
      nextScheduled: new Date('2025-11-25T00:00:00'),
      openWorkOrders: 0,
      criticalItems: 0
    },
    flightHours: 4523,
    nextMaintenance: new Date('2025-11-25T00:00:00')
  },
  {
    id: 'A002',
    tailNumber: '88-0002',
    type: 'F-16C',
    squadron: '34th FS',
    status: 'in-flight',
    location: 'Zone Bravo',
    maintenanceStatus: {
      level: 'green',
      nextScheduled: new Date('2025-11-23T00:00:00'),
      openWorkOrders: 1,
      criticalItems: 0
    },
    flightHours: 3891,
    nextMaintenance: new Date('2025-11-23T00:00:00'),
    currentMission: 'TQ-2502'
  },
  {
    id: 'A003',
    tailNumber: '89-0123',
    type: 'F-15E',
    squadron: '335th FS',
    status: 'standby',
    location: 'Home Base',
    maintenanceStatus: {
      level: 'yellow',
      nextScheduled: new Date('2025-11-22T00:00:00'),
      openWorkOrders: 2,
      criticalItems: 1
    },
    flightHours: 5234,
    nextMaintenance: new Date('2025-11-22T00:00:00')
  },
  {
    id: 'A004',
    tailNumber: '81-0956',
    type: 'A-10C',
    squadron: '75th FS',
    status: 'maintenance',
    location: 'Maintenance Hangar',
    maintenanceStatus: {
      level: 'red',
      nextScheduled: new Date('2025-11-21T00:00:00'),
      openWorkOrders: 5,
      criticalItems: 2
    },
    flightHours: 6789,
    nextMaintenance: new Date('2025-11-21T00:00:00')
  },
  {
    id: 'A005',
    tailNumber: '58-0100',
    type: 'KC-135',
    squadron: '91st ARS',
    status: 'mission-ready',
    location: 'Home Base',
    maintenanceStatus: {
      level: 'green',
      nextScheduled: new Date('2025-11-28T00:00:00'),
      openWorkOrders: 0,
      criticalItems: 0
    },
    flightHours: 12456,
    nextMaintenance: new Date('2025-11-28T00:00:00')
  }
];

// Generate placeholder missions
export const missions: Mission[] = [
  {
    id: 'M001',
    name: 'Operation Guardian',
    type: 'Combat Air Patrol',
    status: 'active',
    priority: 'high',
    startTime: new Date('2025-11-21T06:00:00'),
    endTime: new Date('2025-11-21T18:00:00'),
    assignedAircraft: ['88-0001', '88-0002'],
    assignedCrew: ['Capt. Johnson', 'Lt. Smith', 'Maj. Williams', 'Lt. Davis'],
    objectives: [
      'Maintain air superiority',
      'Monitor sector airspace',
      'Respond to threats'
    ],
    location: {
      lat: 35.5,
      lng: 45.2,
      name: 'Zone Alpha'
    }
  },
  {
    id: 'M002',
    name: 'Operation Thunderbolt',
    type: 'Close Air Support',
    status: 'planning',
    priority: 'critical',
    startTime: new Date('2025-11-22T08:00:00'),
    endTime: new Date('2025-11-22T16:00:00'),
    assignedAircraft: ['81-0956', '89-0123'],
    assignedCrew: ['Capt. Anderson', 'Lt. Wilson', 'Lt. Col. Brown', 'Capt. Miller'],
    objectives: [
      'Support ground forces',
      'Neutralize enemy positions',
      'Provide reconnaissance'
    ],
    location: {
      lat: 34.8,
      lng: 44.5,
      name: 'Zone Delta'
    }
  }
];

// Generate placeholder crew members
export const crewMembers: CrewMember[] = [
  {
    id: 'C001',
    name: 'Capt. Johnson',
    rank: 'Captain',
    role: 'Pilot',
    squadron: '34th FS',
    status: 'available',
    certifications: ['F-16C', 'Air-to-Air', 'Night Operations'],
    flightHours: 1250
  },
  {
    id: 'C002',
    name: 'Lt. Smith',
    rank: 'Lieutenant',
    role: 'Weapons System Officer',
    squadron: '34th FS',
    status: 'available',
    certifications: ['F-16C', 'Weapons Systems'],
    flightHours: 650
  },
  {
    id: 'C003',
    name: 'Maj. Williams',
    rank: 'Major',
    role: 'Pilot',
    squadron: '34th FS',
    status: 'deployed',
    certifications: ['F-16C', 'F-15E', 'Air-to-Air', 'Air-to-Ground'],
    flightHours: 2100
  },
  {
    id: 'C004',
    name: 'Lt. Col. Brown',
    rank: 'Lieutenant Colonel',
    role: 'Pilot',
    squadron: '335th FS',
    status: 'available',
    certifications: ['F-15E', 'F-16C', 'Instructor Pilot'],
    flightHours: 3200
  }
];

// Generate placeholder alerts
export const alerts: Alert[] = [
  {
    id: 'AL001',
    type: 'warning',
    title: 'Aircraft Maintenance Required',
    message: 'A-10C (81-0956) requires immediate inspection',
    timestamp: new Date('2025-11-21T09:30:00'),
    acknowledged: false,
    source: 'Maintenance System'
  },
  {
    id: 'AL002',
    type: 'info',
    title: 'Mission Update',
    message: 'TQ-2502 delayed by 15 minutes due to weather',
    timestamp: new Date('2025-11-21T07:45:00'),
    acknowledged: true,
    source: 'Operations'
  },
  {
    id: 'AL003',
    type: 'success',
    title: 'Mission Completed',
    message: 'TQ-2501 completed successfully',
    timestamp: new Date('2025-11-21T08:15:00'),
    acknowledged: true,
    source: 'Operations'
  }
];

// Generate analytics data
export const analyticsData: AnalyticsData = {
  sortieRate: 85.3,
  missionReadiness: 92.1,
  aircraftAvailability: 78.5,
  maintenanceBacklog: 12,
  averageTurnaroundTime: 3.5,
  completionRate: 96.8
};

// Generate chart data for sortie trends
export const sortieChartData: ChartDataPoint[] = [
  { date: '11/15', value: 12, label: 'Sorties' },
  { date: '11/16', value: 15, label: 'Sorties' },
  { date: '11/17', value: 10, label: 'Sorties' },
  { date: '11/18', value: 18, label: 'Sorties' },
  { date: '11/19', value: 14, label: 'Sorties' },
  { date: '11/20', value: 16, label: 'Sorties' },
  { date: '11/21', value: 20, label: 'Sorties' }
];

// Generate chart data for aircraft readiness
export const readinessChartData: ChartDataPoint[] = [
  { date: '11/15', value: 85, label: 'Ready' },
  { date: '11/16', value: 88, label: 'Ready' },
  { date: '11/17', value: 82, label: 'Ready' },
  { date: '11/18', value: 90, label: 'Ready' },
  { date: '11/19', value: 87, label: 'Ready' },
  { date: '11/20', value: 91, label: 'Ready' },
  { date: '11/21', value: 93, label: 'Ready' }
];
