import React, { useState } from 'react';
import { Card } from '../common/Card';
import type { ImportedReport, ImportReportType, ScheduleEvent } from '../../types';
import { scheduleService } from '../../services/scheduleService';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface ParsedRow {
  [key: string]: string | number | undefined;
}

const parseCSV = (file: File): Promise<ParsedRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => resolve(results.data as ParsedRow[]),
      error: (err) => reject(err)
    });
  });
};

const parseXLSX = async (file: File): Promise<ParsedRow[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer);
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(firstSheet);
};

const mapToScheduleEvent = (row: ParsedRow, reportType: ImportReportType): ScheduleEvent | null => {
  try {
    // Generic mapping - can be customized per report type
    const id = `imported-${Date.now()}-${Math.random()}`;
    const title = String(row.title || row.Title || row.event || row.Event || 'Imported Event');
    const aircraftTail = String(row.tail || row.Tail || row.aircraft || row.Aircraft || 'Unknown');
    
    const startStr = String(row.start || row.Start || row.startTime || row.StartTime || new Date().toISOString());
    const endStr = String(row.end || row.End || row.endTime || row.EndTime || new Date().toISOString());
    
    const startTime = new Date(startStr);
    const endTime = new Date(endStr);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return null;
    }

    const eventType = String(row.type || row.Type || 'maintenance');
    const validTypes = ['maintenance', 'operation', 'training', 'flight', 'other'];
    const type = validTypes.includes(eventType) ? eventType as any : 'other';

    return {
      id,
      title,
      aircraftTail,
      startTime,
      endTime,
      type,
      status: 'draft',
      source: reportType,
      notes: String(row.notes || row.Notes || '')
    };
  } catch (err) {
    console.warn('Failed to parse row:', row, err);
    return null;
  }
};

export const ImportTool = () => {
  const [reports, setReports] = useState<ImportedReport[]>(scheduleService.getReports());
  const [isProcessing, setIsProcessing] = useState(false);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>, reportType: ImportReportType) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);

    for (const file of Array.from(files)) {
      try {
        let rows: ParsedRow[] = [];
        
        if (file.name.endsWith('.csv')) {
          rows = await parseCSV(file);
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          rows = await parseXLSX(file);
        } else {
          alert(`Unsupported file type: ${file.name}`);
          continue;
        }

        const parsedEvents = rows
          .map(row => mapToScheduleEvent(row, reportType))
          .filter((e): e is ScheduleEvent => e !== null);

        const report: ImportedReport = {
          id: `R-${Date.now()}-${Math.random()}`,
          type: reportType,
          filename: file.name,
          importedAt: new Date(),
          rawData: rows,
          parsedEvents
        };

        scheduleService.addReport(report);
        setReports(scheduleService.getReports());
      } catch (err) {
        console.error('Import failed:', err);
        alert(`Failed to import ${file.name}: ${err}`);
      }
    }

    setIsProcessing(false);
    e.target.value = '';
  };

  const reportTypes: ImportReportType[] = ['mmPairs', 'PRA', 'G081', 'GTIMS', 'PEX', 'TMS', 'other'];

  return (
    <div className="import-tool-page" style={{ padding: '1rem' }}>
      <Card title="Import Reports">
        <p style={{ marginBottom: 12, color: '#9aa9c7' }}>
          Upload CSV or Excel files. The tool will attempt to map columns to schedule events.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {reportTypes.map(type => (
            <div key={type} style={{ padding: 8, background: 'rgba(255,255,255,0.02)', borderRadius: 4 }}>
              <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>{type}</label>
              <input 
                type="file" 
                multiple 
                accept=".csv,.xlsx,.xls"
                onChange={(e) => onFileChange(e, type)}
                disabled={isProcessing}
              />
            </div>
          ))}
        </div>

        {isProcessing && <div style={{ marginTop: 12, color: '#6495ed' }}>Processing files...</div>}
      </Card>

      <div style={{ marginTop: 12 }}>
        <Card title="Import History">
        <div>
          {reports.length === 0 ? (
            <p style={{ color: '#888' }}>No imports yet</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Filename</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Type</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Imported</th>
                  <th style={{ textAlign: 'right', padding: 8 }}>Events</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: 8 }}>{r.filename || 'N/A'}</td>
                    <td style={{ padding: 8 }}>{r.type}</td>
                    <td style={{ padding: 8 }}>{r.importedAt.toLocaleString()}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{r.parsedEvents?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
      </div>
    </div>
  );
};

export default ImportTool;
