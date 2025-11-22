# SMORQUE Development Roadmap
**Version**: 2.0 - Production Ready
**Target Users**: USAF Aircraft Maintenance Scheduling & Analysis Teams
**Goal**: Transform from demo to operational production tool

---

## Current State (v1.0)
✅ **What's Working:**
- Visual UI with Evangelion black/purple theme
- Basic routing and navigation
- Client-side search/filtering on some pages
- Drag-drop scheduling (no validation)
- Mock data display for 5 sorties, 5 aircraft, 10 crew

❌ **What's NOT Working:**
- **15% Functional** - 85% of buttons show alerts instead of actions
- No data persistence (lost on refresh)
- No conflict detection
- No validation
- No real analytics or charts
- No export/import functionality
- No user management
- No approval workflows

**Conclusion**: Beautiful demo, not usable for actual operations

---

## Phase 1: Core Functionality (P0 - Mission Critical)
**Timeline**: 4-6 weeks | **Priority**: BLOCKER
**Goal**: Make the app actually functional for daily use

### 1.1 Data Persistence Layer ⭐⭐⭐
**Why**: Users lose all work on page refresh
**Implementation**:
- Install Dexie.js for IndexedDB wrapper
- Create database schema for all entities
- Auto-save on every change
- Export/Import data (JSON, CSV)
- Backup/restore functionality
- Sync status indicator in header

**Files to Create**:
- `src/db/database.ts` - Dexie DB setup
- `src/db/models.ts` - DB table definitions
- `src/services/storageService.ts` - CRUD operations
- `src/hooks/useDatabase.ts` - React hook for DB access

**Testing**: 
- Can refresh page without losing data
- Export data, clear DB, import back
- Works offline

---

### 1.2 CRUD Operations for All Entities ⭐⭐⭐
**Why**: Can't add, edit, or delete anything
**Implementation**:

**Sorties Page**:
- "Add New Sortie" button → modal form
- Edit icon on each row → modal with pre-filled data
- Delete icon → confirmation dialog
- Form validation (required fields, date logic)

**Aircraft Page**:
- "Add Aircraft" button
- Edit/delete actions
- Update flight hours after sortie completion
- Schedule maintenance button

**Maintenance Page**:
- "Create Work Order" button → modal
- Priority selector (AOG, Urgent, Routine, Scheduled)
- Assign crew dropdown
- Parts requisition list
- Completion tracking
- Status updates (Open → In Progress → Complete)

**Crew Page**:
- "Add Personnel" button
- Edit qualifications/certifications
- Update availability status
- Assign to missions/work orders

**Components to Create**:
- `src/components/modals/SortieModal.tsx`
- `src/components/modals/AircraftModal.tsx`
- `src/components/modals/WorkOrderModal.tsx`
- `src/components/modals/CrewModal.tsx`
- `src/components/common/ConfirmDialog.tsx`

---

### 1.3 Conflict Detection Engine ⭐⭐⭐
**Why**: Can schedule impossible situations (aircraft in 2 places at once)
**Implementation**:

**Validations to Add**:
1. **Aircraft Double-Booking**
   - Check if aircraft already scheduled at overlapping time
   - Visual indicator on schedule (red outline)
   - Block save with error message

2. **Crew Duty Limits**
   - Track 12-hour crew rest requirements
   - Enforce FAA/USAF duty time regulations
   - Calculate crew availability windows

3. **Maintenance vs Operations**
   - Can't schedule flight during maintenance
   - Can't start maintenance if mission pending
   - Minimum turnaround time between sorties

4. **Parts Availability**
   - Check parts inventory before work order
   - Alert if parts on backorder
   - Suggest alternative parts

5. **Qualification Matching**
   - Only show qualified crew for aircraft type
   - Warn if certification expires soon
   - Block assignment if not qualified

**Files to Create**:
- `src/services/conflictDetectionService.ts`
- `src/utils/validators.ts`
- `src/utils/dateHelpers.ts`

**UI Updates**:
- Red border on conflicts
- Warning icons with tooltips
- Conflict resolution suggestions
- Override option for supervisors (with reason)

---

### 1.4 Real Export/Import ⭐⭐⭐
**Why**: Can't share schedules or integrate with other systems
**Implementation**:

**Install Libraries**:
```bash
npm install jspdf xlsx papaparse react-hot-toast
```

**Reports Page - Make Functional**:
Replace all `alert()` calls with real functions:

1. **Excel Export** (using `xlsx` library):
   - Generate .xlsx file from schedule events
   - Customizable templates (weekly, monthly, maintenance)
   - Include filters and date ranges
   - Auto-download to user's computer

2. **PDF Export** (using `jsPDF`):
   - Landscape and Portrait layouts
   - Include squadron logo
   - Headers with dates and approvals
   - Page numbers and timestamps

3. **CSV Export** (using `papaparse`):
   - Simple data export
   - Import into Excel/Google Sheets
   - For data analysis

**Files to Create**:
- `src/utils/excelExport.ts`
- `src/utils/pdfExport.ts`
- `src/utils/csvExport.ts`
- `src/templates/reportTemplates.ts`

**Testing**:
- Export schedule → open in Excel → verify data
- Export PDF → verify formatting
- Import CSV → verify parsing

---

### 1.5 Notification System ⭐⭐
**Why**: Users miss critical events (maintenance due, conflicts)
**Implementation**:

**Toast Notifications** (react-hot-toast):
- Success: "Sortie added successfully"
- Error: "Conflict detected - aircraft already scheduled"
- Warning: "Maintenance due in 10 flight hours"
- Info: "Schedule approved by supervisor"

**Alert Center** (persistent):
- Header bell icon with badge count
- Dropdown panel with categorized alerts
- Mark as read/unread
- Snooze/dismiss options
- Priority levels (critical, warning, info)

**Alert Types**:
1. Maintenance Due (flight hours threshold)
2. Certification Expiring (30/60/90 day warnings)
3. Parts Shortages
4. Schedule Conflicts
5. Approval Requests
6. Mission Status Changes

**Files to Create**:
- `src/components/notifications/ToastManager.tsx`
- `src/components/notifications/AlertCenter.tsx`
- `src/services/alertService.ts`
- `src/hooks/useAlerts.ts`

---

## Phase 2: Enhanced Scheduling (P1 - High Priority)
**Timeline**: 3-4 weeks | **Priority**: HIGH
**Goal**: Professional scheduling system

### 2.1 Work Order Management System ⭐⭐⭐
**Maintenance Page Overhaul**:

**Features**:
- Create work order wizard (multi-step form)
- Assign aircraft, crew, parts
- Set priority: AOG, Urgent, Routine, Scheduled
- Estimated completion time
- Actual time tracking
- Parts requisition integration
- Sign-off requirements
- Completion photos/notes

**Work Order Lifecycle**:
```
Draft → Assigned → In Progress → Awaiting Parts → Complete → Approved
```

**Components**:
- `src/components/maintenance/WorkOrderWizard.tsx`
- `src/components/maintenance/WorkOrderCard.tsx`
- `src/components/maintenance/PartsRequisition.tsx`
- `src/components/maintenance/SignOffForm.tsx`

---

### 2.2 Crew Qualification Matrix ⭐⭐⭐
**Crew Page Enhancement**:

**Features**:
- Qualification matrix table (crew × aircraft types)
- Certification tracking with expiration dates
- Training requirements and schedules
- Rest period enforcement (auto-calculate availability)
- Deployment status
- Skill level ratings

**Smart Assignment**:
- Only show qualified crew when assigning to sortie
- Auto-filter by aircraft type
- Highlight expiring certifications
- Suggest training needs

**Components**:
- `src/components/crew/QualificationMatrix.tsx`
- `src/components/crew/CertificationTracker.tsx`
- `src/components/crew/TrainingSchedule.tsx`

---

### 2.3 Mission Planning Workflow ⭐⭐
**Missions Page Enhancement**:

**Mission Lifecycle**:
```
Request → Planning → Crew Assignment → Aircraft Assignment → 
Weather Check → Preflight → Execution → Debrief → Analytics
```

**Features**:
- Mission request form
- Risk assessment (METT-TC analysis)
- Weather integration (API placeholder)
- Crew briefing checklist
- Fuel calculation
- Loadout configuration
- Debrief form with lessons learned

**Components**:
- `src/components/missions/MissionWizard.tsx`
- `src/components/missions/RiskAssessment.tsx`
- `src/components/missions/CrewBriefing.tsx`
- `src/components/missions/DebriefForm.tsx`

---

### 2.4 Advanced Search & Filtering ⭐⭐
**All Pages Enhancement**:

**Features**:
- Multi-field search with AND/OR logic
- Date range picker (react-datepicker)
- Status combinations (checkboxes)
- Save search presets (localStorage)
- Export filtered results
- Keyboard shortcuts (Cmd/Ctrl+K for search)

**Components**:
- `src/components/common/AdvancedSearch.tsx`
- `src/components/common/DateRangePicker.tsx`
- `src/components/common/FilterPanel.tsx`
- `src/hooks/useAdvancedFilter.ts`

---

## Phase 3: Analytics & Intelligence (P2 - Medium Priority)
**Timeline**: 2-3 weeks | **Priority**: MEDIUM
**Goal**: Data-driven decision making

### 3.1 Real Analytics Dashboard ⭐⭐⭐
**Analytics Page Overhaul**:

**Replace Static Numbers with Real Calculations**:
- Mission success rate: `completed / total * 100`
- Aircraft utilization: `flight hours / available hours * 100`
- Maintenance efficiency: `on-time completions / total * 100`

**Real Charts** (using Recharts):
1. **Line Chart**: Sortie trends over time
2. **Bar Chart**: Maintenance by aircraft type
3. **Pie Chart**: Mission type distribution
4. **Heatmap**: Aircraft utilization by day/time
5. **Scatter Plot**: Flight hours vs maintenance costs

**Components**:
- `src/components/analytics/TrendChart.tsx`
- `src/components/analytics/UtilizationHeatmap.tsx`
- `src/components/analytics/MaintenanceAnalysis.tsx`
- `src/components/analytics/CostAnalysis.tsx`

---

### 3.2 Predictive Maintenance ⭐⭐
**Smart Scheduling**:

**Algorithms**:
- Predict failure probability based on flight hours
- Optimal maintenance windows (minimize mission impact)
- Parts replacement forecasting
- Cost optimization (proactive vs reactive)

**Machine Learning** (simple):
- Historical failure patterns
- Mean time between failures (MTBF)
- Trend analysis
- Anomaly detection

**Components**:
- `src/components/analytics/PredictiveMaintenance.tsx`
- `src/services/predictionService.ts`
- `src/utils/statistics.ts`

---

### 3.3 Parts Inventory Management ⭐⭐
**New Page: Parts Inventory**:

**Features**:
- Stock levels with thresholds
- Reorder points with auto-alerts
- Parts assigned to work orders (reserved)
- Delivery tracking (ETA)
- Vendor management
- Alternative parts database
- Cost tracking
- Usage history

**Components**:
- `src/components/parts/PartsInventory.tsx`
- `src/components/parts/PartsModal.tsx`
- `src/components/parts/ReorderAlert.tsx`
- `src/services/partsService.ts`

---

## Phase 4: Collaboration & Approval (P2 - Medium Priority)
**Timeline**: 2 weeks | **Priority**: MEDIUM
**Goal**: Multi-user workflows

### 4.1 User Roles & Permissions ⭐⭐
**Implementation**:

**Roles**:
1. **Scheduler** (full edit)
   - Create/edit/delete all entities
   - Submit for approval
   - Export reports

2. **Supervisor** (approve only)
   - View all
   - Approve/reject schedules
   - Add comments
   - Cannot edit published schedules

3. **Crew** (view assignments)
   - View own assignments
   - Update availability
   - View mission briefs
   - Cannot edit schedules

4. **Maintenance** (work orders only)
   - Update work order status
   - Add completion notes
   - Request parts
   - Cannot edit flight schedule

**Login Simulation**:
- Role selector dropdown in header
- Permission checks on all actions
- Disabled buttons for unauthorized actions
- Error messages for permission denial

**Components**:
- `src/components/auth/RoleSelector.tsx`
- `src/services/authService.ts`
- `src/hooks/usePermissions.ts`
- `src/utils/permissions.ts`

---

### 4.2 Approval Workflow System ⭐⭐
**Schedule Approval Process**:

**Workflow States**:
```
Draft → Submitted → Supervisor Review → Flight Chief Approval → Published
         ↓                ↓                        ↓
      Rejected ←──── Rejected ←──────────── Rejected
```

**Features**:
- Submit for approval button
- Approval queue (pending items)
- Approve/reject with comments
- Change requests (send back for edit)
- Version control (track changes)
- Email notifications (simulated)
- Approval history log

**Components**:
- `src/components/approval/ApprovalWorkflow.tsx`
- `src/components/approval/ApprovalQueue.tsx`
- `src/components/approval/VersionHistory.tsx`
- `src/services/approvalService.ts`

---

## Phase 5: Advanced Features (P3 - Nice to Have)
**Timeline**: 3-4 weeks | **Priority**: LOW
**Goal**: Power user features

### 5.1 Calendar & Timeline Views ⭐
**Multiple Visualization Options**:

1. **Daily Timeline** (hour blocks)
   - 24-hour view with hour columns
   - Events as horizontal bars
   - Drag to resize duration
   - Color-coded by type

2. **Monthly Calendar** (full implementation)
   - Replace current placeholder
   - Month grid with multi-event cells
   - Click day to view details
   - Drag between days

3. **Gantt Chart** (maintenance tasks)
   - Show task dependencies
   - Critical path highlighting
   - Resource allocation view
   - Milestone markers

**Libraries**:
- `react-big-calendar` for calendar
- `react-gantt-timeline` for Gantt
- `react-timeline` for timeline

**Components**:
- `src/components/schedule/DailyTimeline.tsx`
- `src/components/schedule/MonthlyCalendar.tsx`
- `src/components/schedule/GanttView.tsx`

---

### 5.2 What-If Scenario Planning ⭐
**Simulation Mode**:

**Features**:
- "Simulation Mode" toggle
- Test changes without saving
- Compare scenarios side-by-side
- Impact analysis:
  - What if aircraft X is grounded?
  - What if crew member Y is unavailable?
  - What if mission Z is priority 1?
- Resource optimization suggestions

**Components**:
- `src/components/scenario/SimulationMode.tsx`
- `src/components/scenario/ScenarioCompare.tsx`
- `src/services/simulationService.ts`

---

### 5.3 Mobile Responsive Design ⭐
**Tablet/Phone Optimization**:

**Features**:
- Touch-friendly drag controls
- Responsive tables (horizontal scroll)
- Mobile navigation drawer
- Offline capability (service workers)
- Progressive Web App (PWA)
- Field-ready UI for maintenance crews

**Technical**:
- Media queries for breakpoints
- Touch event handlers
- Service worker setup
- PWA manifest
- Offline data sync

---

## Technical Improvements

### Database Schema
```typescript
// Dexie DB Tables
db.sorties: { id, missionNumber, aircraft, crew[], status, times, ... }
db.aircraft: { id, tailNumber, type, squadron, status, maintenance, ... }
db.crew: { id, name, rank, role, qualifications[], availability, ... }
db.missions: { id, name, type, status, assignments, objectives, ... }
db.workOrders: { id, aircraft, type, priority, assignedCrew[], parts[], status, ... }
db.scheduleEvents: { id, title, aircraft, startTime, endTime, type, approval, ... }
db.parts: { id, partNumber, name, quantity, threshold, vendor, ... }
db.approvals: { id, scheduleId, submittedBy, status, comments[], timestamp, ... }
db.alerts: { id, type, message, priority, acknowledged, timestamp, ... }
```

### State Management
- Consider Zustand or Redux for complex global state
- React Query for data fetching/caching
- Optimistic UI updates

### Testing Strategy
- Vitest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests
- Test coverage >80%

### Performance
- Lazy loading for routes
- Virtual scrolling for large tables (react-window)
- Memoization for expensive calculations
- Debounced search inputs
- Pagination for 100+ items

---

## Success Metrics

### Functionality
- [ ] 100% of buttons perform actions (no alerts)
- [ ] Data persists across sessions
- [ ] Zero conflict bugs in production
- [ ] All exports generate actual files
- [ ] Real-time validation works

### User Experience
- [ ] <2 second page load
- [ ] <100ms for interactions
- [ ] Offline capability
- [ ] Mobile responsive
- [ ] Accessible (WCAG AA)

### Adoption
- [ ] 10+ active users (squadron schedulers)
- [ ] 100+ schedules created
- [ ] 500+ work orders tracked
- [ ] 50+ aircraft managed
- [ ] Positive user feedback

---

## Deployment Considerations

### Security
- Input sanitization
- XSS protection
- CSRF tokens (if backend added)
- Audit logging
- Data encryption at rest

### Scalability
- Handle 50+ aircraft per squadron
- 200+ crew members
- 1000+ sorties per month
- 5000+ work orders per year
- Sub-second query times

### Integration
- USAF systems (future):
  - IMDS (Integrated Maintenance Data System)
  - PEX (Patriot Excalibur)
  - AMOS (Aircraft Maintenance Operations System)
  - G081 (Logistics reporting)
- API endpoints for data sync
- SSO integration (CAC/PIV)

---

## Summary

**Current State**: 15% functional demo
**Phase 1 Complete**: 60% functional (basic operations work)
**Phase 2 Complete**: 80% functional (professional tool)
**Phase 3 Complete**: 90% functional (data-driven insights)
**Phase 4 Complete**: 95% functional (collaboration ready)
**Phase 5 Complete**: 100% functional (production enterprise tool)

**Total Estimated Effort**: 14-20 weeks (3.5-5 months)
**Priority**: Start with Phase 1 (core functionality) before adding advanced features

**Next Immediate Actions**:
1. Install Dexie.js and setup database
2. Create first CRUD modal (Sortie)
3. Implement conflict detection for aircraft double-booking
4. Make Export to Excel actually work
5. Add toast notifications

This transforms SMORQUE from a beautiful demo into a mission-critical tool that USAF maintenance teams will actually use and rely on.
