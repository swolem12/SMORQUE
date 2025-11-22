import * as XLSX from 'xlsx';
import type { Sortie, Aircraft, CrewMember, ScheduleEvent } from '../types';

export const exportToExcel = (data: any[], filename: string, sheetName: string) => {
  try {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    
    // Generate Excel file and download
    XLSX.writeFile(wb, `${filename}.xlsx`);
    
    return true;
  } catch (error) {
    console.error('Excel export failed:', error);
    return false;
  }
};

export const exportScheduleToExcel = (events: ScheduleEvent[]) => {
  const formattedData = events.map(event => ({
    'Title': event.title,
    'Aircraft': event.aircraftTail,
    'Type': event.type,
    'Start Time': new Date(event.startTime).toLocaleString(),
    'End Time': new Date(event.endTime).toLocaleString(),
    'Status': event.status,
    'Approval': event.approvalStatus,
    'Location': event.location || 'N/A',
    'Assigned Crew': event.assignedCrew?.join(', ') || 'None',
    'Notes': event.notes || ''
  }));
  
  return exportToExcel(formattedData, `schedule-${new Date().toISOString().split('T')[0]}`, 'Schedule');
};

export const exportSortiesToExcel = (sorties: Sortie[]) => {
  const formattedData = sorties.map(sortie => ({
    'Mission Number': sortie.missionNumber,
    'Aircraft': sortie.aircraft,
    'Tail Number': sortie.tailNumber,
    'Crew': sortie.crew.join(', '),
    'Status': sortie.status,
    'Mission Type': sortie.missionType,
    'Scheduled Time': new Date(sortie.scheduledTime).toLocaleString(),
    'Actual Time': sortie.actualTime ? new Date(sortie.actualTime).toLocaleString() : 'N/A',
    'Duration (min)': sortie.duration,
    'Location': sortie.location
  }));
  
  return exportToExcel(formattedData, `sorties-${new Date().toISOString().split('T')[0]}`, 'Sorties');
};

export const exportAircraftToExcel = (aircraft: Aircraft[]) => {
  const formattedData = aircraft.map(ac => ({
    'Tail Number': ac.tailNumber,
    'Type': ac.type,
    'Squadron': ac.squadron,
    'Status': ac.status,
    'Location': ac.location,
    'Flight Hours': ac.flightHours,
    'Next Maintenance': new Date(ac.nextMaintenance).toLocaleDateString(),
    'Work Orders': ac.maintenanceStatus.openWorkOrders,
    'Critical Items': ac.maintenanceStatus.criticalItems,
    'Maintenance Level': ac.maintenanceStatus.level
  }));
  
  return exportToExcel(formattedData, `aircraft-${new Date().toISOString().split('T')[0]}`, 'Aircraft');
};

export const exportCrewToExcel = (crew: CrewMember[]) => {
  const formattedData = crew.map(member => ({
    'Name': member.name,
    'Rank': member.rank,
    'Role': member.role,
    'Squadron': member.squadron,
    'Flight Hours': member.flightHours,
    'Qualifications': member.qualifications.join(', '),
    'Certifications': member.certifications.join(', '),
    'Availability': member.availability,
    'Status': member.status
  }));
  
  return exportToExcel(formattedData, `crew-${new Date().toISOString().split('T')[0]}`, 'Crew');
};
