import { describe, it, expect, beforeEach } from 'vitest';
import { scheduleService } from '../services/scheduleService';
import type { ScheduleEvent } from '../types';

describe('ScheduleService', () => {
  const mockEvent: ScheduleEvent = {
    id: 'test-1',
    title: 'Test Event',
    aircraftTail: '88-0001',
    startTime: new Date('2025-11-22T08:00:00'),
    endTime: new Date('2025-11-22T10:00:00'),
    type: 'maintenance',
    status: 'draft',
  };

  beforeEach(() => {
    scheduleService.init([], [], {
      windowStart: new Date(),
      windowEnd: new Date(),
      priorityRules: [],
      allowOverlaps: false
    });
  });

  it('should add an event', () => {
    const added = scheduleService.addEvent(mockEvent);
    expect(added).toEqual(mockEvent);
    expect(scheduleService.getEvents()).toHaveLength(1);
  });

  it('should update an event', () => {
    scheduleService.addEvent(mockEvent);
    const updated = { ...mockEvent, title: 'Updated Event' };
    scheduleService.updateEvent(updated);
    const events = scheduleService.getEvents();
    expect(events[0].title).toBe('Updated Event');
  });

  it('should delete an event', () => {
    scheduleService.addEvent(mockEvent);
    expect(scheduleService.getEvents()).toHaveLength(1);
    scheduleService.deleteEvent(mockEvent.id);
    expect(scheduleService.getEvents()).toHaveLength(0);
  });

  it('should filter events by date range', () => {
    const event1 = { ...mockEvent, id: 'e1', startTime: new Date('2025-11-20T08:00:00') };
    const event2 = { ...mockEvent, id: 'e2', startTime: new Date('2025-11-22T08:00:00') };
    const event3 = { ...mockEvent, id: 'e3', startTime: new Date('2025-11-25T08:00:00') };

    scheduleService.addEvent(event1);
    scheduleService.addEvent(event2);
    scheduleService.addEvent(event3);

    const filtered = scheduleService.getEventsInRange(
      new Date('2025-11-21T00:00:00'),
      new Date('2025-11-23T00:00:00')
    );

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('e2');
  });
});
