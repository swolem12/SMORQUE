# SMORQUE Functionality Audit Report
**Date**: November 22, 2025
**Purpose**: Identify non-functional features and gaps for USAF aircraft maintenance scheduling teams

---

## Current State Analysis

### ✅ What's Working
1. **Visual Display**: All pages render with tables, metrics, search inputs
2. **Basic Navigation**: Routing between pages works
3. **Search/Filter**: Client-side filtering works on Sorties, Aircraft, Crew pages
4. **Mock Data Display**: Shows 5 sorties, 5 aircraft, 10 crew members
5. **Drag-Drop**: Schedule checkerboard allows event dragging (no validation)
6. **Inline Editing**: Schedule events can be edited (title, times)

---

## ❌ What's NOT Working (Critical Issues)

### 1. **All Buttons Are Fake** 🚨
**Impact**: SEVERE - Nothing actionable for users

**Sorties Page:**
- ❌ No "Add New Sortie" button
- ❌ No edit/delete actions on table rows
- ❌ Search works but no "Clear" button
- ❌ No sortie detail view/modal

**Aircraft Page:**
- ❌ No "Add Aircraft" button
- ❌ No maintenance action buttons
- ❌ No aircraft detail modal
- ❌ Can't update flight hours
- ❌ Can't schedule maintenance

**Maintenance Page:**
- ❌ No "Create Work Order" button
- ❌ No assign crew functionality
- ❌ No priority setting
- ❌ No completion tracking
- ❌ Can't add parts to work orders

**Crew Page:**
- ❌ No "Add Personnel" button
- ❌ No certification management
- ❌ No assign to mission functionality
- ❌ Can't update availability status
- ❌ No training schedule

**Schedule Page:**
- ❌ "Run Optimization" shows alert (does nothing)
- ❌ "Approve Schedule" shows alert (doesn't update status)
- ❌ "Export to Excel" shows alert (doesn't export)
- ❌ Monthly view is placeholder text
- ❌ No conflict detection on drag-drop
- ❌ No crew/aircraft availability checking

**Reports Page:**
- ❌ "Export Report" shows alert (doesn't generate file)
- ❌ "Print Landscape/Portrait" shows alert (doesn't print)
- ❌ "Presentation View" shows alert (doesn't open view)
- ❌ Download buttons on recent reports do nothing

**Analytics Page:**
- ❌ No interactive charts (just static tables)
- ❌ No date range selector
- ❌ No drill-down capability
- ❌ Can't export chart data

---

### 2. **No Data Persistence** 🚨
**Impact**: CRITICAL - All changes lost on refresh

- Changes to schedule events lost after page refresh
- No save/load functionality
- No export to file
- No import from file (ImportTool parses but doesn't persist)
- In-memory only (scheduleService resets on reload)

---

### 3. **No Validation or Conflict Detection** 🚨
**Impact**: HIGH - Can create invalid schedules

- Can assign same aircraft to multiple missions at same time
- No crew rest period enforcement (12-hour rule)
- No maintenance downtime checking
- Can schedule maintenance during flight operations
- No parts availability validation
- No certification expiration warnings

---

### 4. **No Real Analytics** 🚨
**Impact**: HIGH - Can't actually analyze trends

- Static numbers (87.5% success rate is hardcoded)
- No real trend calculations
- No charts (should use Recharts library)
- Can't compare time periods
- No predictive analytics
- Missing: utilization heatmaps, failure patterns, cost analysis

---

### 5. **No User Management** 🚨
**Impact**: MEDIUM - Can't control access

- No login system
- No role-based permissions
- Everyone has full edit access
- No audit trail
- Can't track who made changes

---

### 6. **Limited Schedule Functionality** 🚨
**Impact**: HIGH - Core feature incomplete

**Missing:**
- Conflict detection when dragging events
- Aircraft resource constraints (only 1 per mission)
- Crew assignment to events (shows in data but can't edit)
- Parts inventory tracking
- Approval workflow (just shows count, can't approve individual events)
- Version control (can't revert changes)
- Template schedules (can't copy previous week)
- Recurring events
- Blackout dates

---

### 7. **No Real Import/Export** 🚨
**Impact**: HIGH - Can't integrate with USAF systems

**Import Tool:**
- ✅ Parses CSV/XLSX files
- ❌ Doesn't validate data
- ❌ Doesn't check for duplicates
- ❌ Doesn't persist to storage
- ❌ No error handling for bad data
- ❌ Can't map custom column headers

**Export:**
- ❌ All export buttons are fake alerts
- ❌ No actual PDF generation
- ❌ No Excel file creation
- ❌ Can't export filtered results

---

### 8. **No Notification System** 🚨
**Impact**: MEDIUM - Users miss critical events

**Missing:**
- Maintenance due alerts
- Certification expiration warnings
- Schedule conflict notifications
- Part shortage alerts
- Mission updates
- Approval requests
- Real-time updates

---

### 9. **Poor Data Quality** 🚨
**Impact**: MEDIUM - Unrealistic for production use

**Current Mock Data:**
- Only 5 sorties (need 50-100)
- Only 5 aircraft (need 20-30 per squadron)
- Only 10 crew (need 50-100)
- No historical data
- No maintenance history
- No parts inventory
- No mission templates

---

### 10. **No Mobile Support** 🚨
**Impact**: LOW-MEDIUM - Can't use in field

- Tables don't scroll on mobile
- Drag-drop doesn't work on touch
- No offline capability
- Navigation menu too wide for phones

---

## Missing Features for USAF Operations

### Critical Missing Features:
1. **Work Order Management**
   - Create/assign/track maintenance tasks
   - Parts requisition
   - Estimated completion times
   - Priority levels (AOG, urgent, routine, scheduled)
   - Sign-off requirements

2. **Flight Hour Tracking**
   - Automatic increment after sorties
   - Phase inspection triggers
   - Time-compliance technical orders (TCTO)
   - Hourly vs calendar maintenance

3. **Qualification Matrix**
   - Crew certs mapped to aircraft types
   - Expiration tracking
   - Training requirements
   - Currency tracking (90-day, etc.)

4. **Mission Planning Workflow**
   - Mission request → approval → scheduling → execution
   - Weather integration
   - Risk assessment
   - Debrief/lessons learned

5. **Parts Inventory**
   - Stock levels
   - Reorder points
   - Critical parts tracking
   - Lead times
   - Alternative parts

6. **Predictive Maintenance**
   - Failure probability based on hours
   - Optimal maintenance timing
   - Cost optimization
   - Historical failure patterns

7. **Approval Workflow**
   - Multi-level approvals
   - Rejection with comments
   - Change tracking
   - Version history

8. **Real-time Status**
   - Aircraft location tracking
   - Maintenance progress updates
   - Mission status updates
   - Crew availability updates

---

## Functional Gaps Summary

### Data Management: 0/10 ❌
- No CRUD operations work
- No persistence
- No data validation
- No import/export

### Scheduling: 3/10 ⚠️
- ✅ Visual checkerboard
- ✅ Drag-drop (no validation)
- ✅ Week navigation
- ❌ No conflict detection
- ❌ No optimization
- ❌ No approval workflow
- ❌ No recurring events

### Analytics: 1/10 ❌
- ✅ Shows static metrics
- ❌ No real calculations
- ❌ No charts
- ❌ No trends
- ❌ No predictions

### Reporting: 0/10 ❌
- All export buttons fake
- No PDF generation
- No Excel export
- No print functionality

### User Experience: 4/10 ⚠️
- ✅ Visual design decent
- ✅ Navigation works
- ✅ Search works (local only)
- ❌ No mobile support
- ❌ No loading states
- ❌ No error handling

### Mission Critical: 2/10 ❌
- ❌ Can't actually schedule maintenance
- ❌ Can't track work orders
- ❌ Can't manage certifications
- ❌ Can't detect conflicts
- ❌ Can't integrate with USAF systems

---

## Recommendations by Priority

### P0 (Immediate - Blockers):
1. Implement data persistence (IndexedDB)
2. Add CRUD operations for all entities
3. Build conflict detection engine
4. Create work order management system
5. Implement real Excel/PDF export

### P1 (High - Core Features):
6. Build qualification/certification tracking
7. Add approval workflow
8. Implement notification system
9. Create real analytics with charts
10. Add parts inventory management

### P2 (Medium - Enhanced Features):
11. Predictive maintenance module
12. Mobile responsive design
13. User roles and permissions
14. Advanced search/filtering
15. Calendar integration

### P3 (Low - Nice to Have):
16. What-if scenario planning
17. Template schedules
18. Automated reporting
19. Weather integration
20. External system APIs

---

## Bottom Line

**Current Functionality: 15%**
- App looks good but is mostly a demo
- 85% of buttons don't work
- No real value for maintenance schedulers
- Cannot replace spreadsheets in current state

**To Be Production-Ready:**
- Need 20+ core features implemented
- Need real data persistence
- Need conflict detection
- Need actual CRUD operations
- Need export/import that works

**Estimated Work:**
- 200+ hours of development
- Full state management refactor
- Database integration
- Testing and validation
- User acceptance testing with USAF personnel
