import { useState } from 'react';
import type { ScheduleEvent } from '../../types';
import './Schedule.css';

interface CheckerboardProps {
  events: ScheduleEvent[];
  onUpdateEvent: (e: ScheduleEvent) => void;
  weekStart: Date;
}

const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export const Checkerboard = ({ events, onUpdateEvent, weekStart }: CheckerboardProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<ScheduleEvent | null>(null);

  const days = Array.from({ length: 7 }).map((_, i) => {
    const dt = new Date(weekStart);
    dt.setDate(weekStart.getDate() + i);
    return dt;
  });

  const eventsForDay = (day: Date) => {
    return events.filter(ev => {
      return ev.startTime.toDateString() === day.toDateString();
    });
  };

  const saveEdit = (ev: ScheduleEvent, fields: Partial<ScheduleEvent>) => {
    const updated: ScheduleEvent = { ...ev, ...fields };
    onUpdateEvent(updated);
    setEditingId(null);
  };

  const handleDragStart = (e: React.DragEvent, event: ScheduleEvent) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetDay: Date) => {
    e.preventDefault();
    if (!draggedEvent) return;

    const newStart = new Date(targetDay);
    newStart.setHours(draggedEvent.startTime.getHours(), draggedEvent.startTime.getMinutes());
    
    const duration = draggedEvent.endTime.getTime() - draggedEvent.startTime.getTime();
    const newEnd = new Date(newStart.getTime() + duration);

    onUpdateEvent({
      ...draggedEvent,
      startTime: newStart,
      endTime: newEnd
    });
    setDraggedEvent(null);
  };

  const formatDateTimeLocal = (date: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const parseDateTimeLocal = (str: string) => {
    return new Date(str);
  };

  return (
    <div className="checkerboard">
      <div className="checkerboard-header">
        {days.map(d => (
          <div key={d.toDateString()} className="checkerboard-day-header">
            <div className="day-name">{dayNames[d.getDay()]}</div>
            <div className="day-date">{d.toLocaleDateString()}</div>
          </div>
        ))}
      </div>

      <div className="checkerboard-body">
        {days.map(d => (
          <div 
            key={d.toDateString()} 
            className="checkerboard-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, d)}
          >
            {eventsForDay(d).map(ev => (
              <div 
                className="cb-event" 
                key={ev.id}
                draggable={editingId !== ev.id}
                onDragStart={(e) => handleDragStart(e, ev)}
              >
                {editingId === ev.id ? (
                  <div className="cb-edit">
                    <label>Title:</label>
                    <input 
                      defaultValue={ev.title} 
                      className="cb-input" 
                      onBlur={(e) => saveEdit(ev, { title: e.target.value })} 
                    />
                    <label>Start:</label>
                    <input 
                      type="datetime-local"
                      defaultValue={formatDateTimeLocal(ev.startTime)}
                      className="cb-input"
                      onBlur={(e) => saveEdit(ev, { startTime: parseDateTimeLocal(e.target.value) })}
                    />
                    <label>End:</label>
                    <input 
                      type="datetime-local"
                      defaultValue={formatDateTimeLocal(ev.endTime)}
                      className="cb-input"
                      onBlur={(e) => saveEdit(ev, { endTime: parseDateTimeLocal(e.target.value) })}
                    />
                    <div className="cb-edit-actions">
                      <button onClick={() => setEditingId(null)}>Done</button>
                    </div>
                  </div>
                ) : (
                  <div className="cb-view">
                    <div className="cb-time">{ev.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    <div className="cb-title">{ev.title}</div>
                    <div className="cb-actions">
                      <button onClick={() => setEditingId(ev.id)}>Edit</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkerboard;
