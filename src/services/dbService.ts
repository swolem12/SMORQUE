import { db } from '../db/database';
import { sorties, aircraft, missions, crewMembers, scheduleEvents, alerts } from '../data/mockData';
import type { Sortie, Aircraft, CrewMember, ScheduleEvent } from '../types';

class DatabaseService {
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    try {
      // Check if database is empty
      const sortieCount = await db.sorties.count();
      
      if (sortieCount === 0) {
        // Seed with mock data on first load
        await db.sorties.bulkAdd(sorties);
        await db.aircraft.bulkAdd(aircraft);
        await db.missions.bulkAdd(missions);
        await db.crew.bulkAdd(crewMembers);
        await db.scheduleEvents.bulkAdd(scheduleEvents);
        await db.alerts.bulkAdd(alerts);
        
        console.log('✅ Database initialized with mock data');
      }
      
      this.initialized = true;
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
    }
  }

  // Sortie operations
  async getSorties() {
    return await db.sorties.toArray();
  }

  async addSortie(sortie: Sortie) {
    return await db.sorties.add(sortie);
  }

  async updateSortie(id: string, changes: Partial<Sortie>) {
    return await db.sorties.update(id, changes);
  }

  async deleteSortie(id: string) {
    return await db.sorties.delete(id);
  }

  // Aircraft operations
  async getAircraft() {
    return await db.aircraft.toArray();
  }

  async addAircraft(aircraft: Aircraft) {
    return await db.aircraft.add(aircraft);
  }

  async updateAircraft(id: string, changes: Partial<Aircraft>) {
    return await db.aircraft.update(id, changes);
  }

  async deleteAircraft(id: string) {
    return await db.aircraft.delete(id);
  }

  // Crew operations
  async getCrew() {
    return await db.crew.toArray();
  }

  async addCrewMember(crew: CrewMember) {
    return await db.crew.add(crew);
  }

  async updateCrewMember(id: string, changes: Partial<CrewMember>) {
    return await db.crew.update(id, changes);
  }

  async deleteCrewMember(id: string) {
    return await db.crew.delete(id);
  }

  // Schedule operations
  async getScheduleEvents() {
    return await db.scheduleEvents.toArray();
  }

  async addScheduleEvent(event: ScheduleEvent) {
    return await db.scheduleEvents.add(event);
  }

  async updateScheduleEvent(id: string, changes: Partial<ScheduleEvent>) {
    return await db.scheduleEvents.update(id, changes);
  }

  async deleteScheduleEvent(id: string) {
    return await db.scheduleEvents.delete(id);
  }

  // Export/Import
  async exportData() {
    const data = {
      sorties: await db.sorties.toArray(),
      aircraft: await db.aircraft.toArray(),
      missions: await db.missions.toArray(),
      crew: await db.crew.toArray(),
      scheduleEvents: await db.scheduleEvents.toArray(),
      workOrders: await db.workOrders.toArray(),
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smorque-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async importData(jsonData: string) {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.sorties) await db.sorties.bulkPut(data.sorties);
      if (data.aircraft) await db.aircraft.bulkPut(data.aircraft);
      if (data.missions) await db.missions.bulkPut(data.missions);
      if (data.crew) await db.crew.bulkPut(data.crew);
      if (data.scheduleEvents) await db.scheduleEvents.bulkPut(data.scheduleEvents);
      if (data.workOrders) await db.workOrders.bulkPut(data.workOrders);
      
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }

  async clearAllData() {
    await db.sorties.clear();
    await db.aircraft.clear();
    await db.missions.clear();
    await db.crew.clear();
    await db.scheduleEvents.clear();
    await db.workOrders.clear();
    await db.alerts.clear();
  }
}

export const dbService = new DatabaseService();
