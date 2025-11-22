import type { ScheduleEvent, ImportedReport, OptimizationSettings } from '../types';

// Simple in-memory service (can be replaced with API calls later)
class ScheduleService {
  private events: ScheduleEvent[] = [];
  private reports: ImportedReport[] = [];
  private settings: OptimizationSettings | null = null;

  // Initialize from mock data
  init(events: ScheduleEvent[], reports: ImportedReport[], settings: OptimizationSettings) {
    this.events = [...events];
    this.reports = [...reports];
    this.settings = settings;
  }

  // Get all events
  getEvents(): ScheduleEvent[] {
    return [...this.events];
  }

  // Get events in date range
  getEventsInRange(start: Date, end: Date): ScheduleEvent[] {
    return this.events.filter(e => 
      e.startTime >= start && e.startTime <= end
    );
  }

  // Add event
  addEvent(event: ScheduleEvent): ScheduleEvent {
    this.events.push(event);
    return event;
  }

  // Update event
  updateEvent(event: ScheduleEvent): ScheduleEvent {
    const index = this.events.findIndex(e => e.id === event.id);
    if (index >= 0) {
      this.events[index] = event;
    }
    return event;
  }

  // Delete event
  deleteEvent(id: string): void {
    this.events = this.events.filter(e => e.id !== id);
  }

  // Imported reports
  getReports(): ImportedReport[] {
    return [...this.reports];
  }

  addReport(report: ImportedReport): void {
    this.reports.push(report);
    if (report.parsedEvents) {
      this.events.push(...report.parsedEvents);
    }
  }

  // Optimization
  getOptimizationSettings(): OptimizationSettings | null {
    return this.settings;
  }

  setOptimizationSettings(settings: OptimizationSettings): void {
    this.settings = settings;
  }
}

export const scheduleService = new ScheduleService();
