import Dexie, { type Table } from 'dexie';
import type { Sortie, Aircraft, Mission, CrewMember, ScheduleEvent, Alert } from '../types';

export interface WorkOrder {
  id: string;
  aircraftId: string;
  tailNumber: string;
  type: 'scheduled' | 'unscheduled' | 'inspection' | 'repair';
  priority: 'AOG' | 'urgent' | 'routine' | 'scheduled';
  assignedCrew: string[];
  parts: string[];
  status: 'draft' | 'assigned' | 'in-progress' | 'awaiting-parts' | 'complete' | 'approved';
  createdAt: Date;
  scheduledStart: Date;
  scheduledEnd: Date;
  actualStart?: Date;
  actualEnd?: Date;
  estimatedHours: number;
  actualHours?: number;
  description: string;
  notes: string;
  signedOffBy?: string;
}

export class SMORQUEDatabase extends Dexie {
  sorties!: Table<Sortie, string>;
  aircraft!: Table<Aircraft, string>;
  missions!: Table<Mission, string>;
  crew!: Table<CrewMember, string>;
  scheduleEvents!: Table<ScheduleEvent, string>;
  workOrders!: Table<WorkOrder, string>;
  alerts!: Table<Alert, string>;

  constructor() {
    super('SMORQUEDatabase');
    
    this.version(1).stores({
      sorties: 'id, missionNumber, tailNumber, status, scheduledTime',
      aircraft: 'id, tailNumber, type, squadron, status',
      missions: 'id, name, type, status, startTime',
      crew: 'id, name, rank, squadron, availability',
      scheduleEvents: 'id, aircraftTail, startTime, endTime, type, approvalStatus',
      workOrders: 'id, aircraftId, tailNumber, priority, status, scheduledStart',
      alerts: 'id, type, timestamp, acknowledged'
    });
  }
}

export const db = new SMORQUEDatabase();
