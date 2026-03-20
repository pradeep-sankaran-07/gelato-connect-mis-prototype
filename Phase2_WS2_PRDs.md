### WS2 Phase 2: AI Scheduling, Automated Imposition, and Automated Workflow

---

#### PRD 17: AI Scheduling \[ADVANCED\] — Owner: Felix (WS2a)

##### 1. Problem Statement

Production scheduling today is manual - done in spreadsheets or whiteboards. This leads to suboptimal machine utilization, excessive makeready/setup time, missed deadlines, and constant manual re-scheduling.

##### 2. Solution Overview

Provide AI-powered scheduling that automatically assigns jobs to machines and time slots, optimizing for on-time delivery, setup reduction, and capacity utilization. Humans can always override.

**Scope Clarification (from Clarke Murphy workshop, Feb 2026):** The initial scope of AI Scheduling focuses on **press scheduling** as the primary optimization target, with **substrate type as the #1 scheduling criterion**. Grouping jobs by substrate (lightest to heaviest paper weight) reduces makeready time and extends press consumable life by 15-20%. Due date remains a constraint but substrate grouping is the primary optimization axis. Scheduling for downstream operations (cutting, folding, binding, lamination) follows as a secondary phase - once press scheduling is optimized, the downstream flow naturally improves. This was strongly validated by Clarke Murphy, who confirmed that substrate-based press scheduling would deliver the single biggest production efficiency gain.

##### 3. User Stories

**US-4.1: Auto-schedule jobs**

> As a Scheduler, I want jobs automatically scheduled based on due dates and capacity, so that I don't have to manually plan each job.

Acceptance Criteria:

* System generates schedule for all jobs in queue
* Schedule respects due dates (priority to tight deadlines)
* Schedule assigns jobs to specific machines and time slots
* **Primary grouping: by substrate type (lightest to heaviest weight)**
* Schedule updates as new jobs arrive
* Scheduler can accept or reject suggested schedule

**US-4.2: Optimize for setup reduction**

> As a Scheduler, I want similar jobs grouped together, so that we reduce makeready time.

Acceptance Criteria:

* Jobs with same substrate grouped on same machine (primary criterion)
* Jobs with same finished size grouped together (secondary)
* Estimated setup reduction shown
* Configurable grouping rules

**US-4.3: Balance machine load**

> As a Scheduler, I want work distributed across machines, so that no machine is overloaded while others sit idle.

Acceptance Criteria:

* All machines of same type receive balanced load
* Machine utilization visible on dashboard
* Alerts when machine is overloaded

**US-4.4: Manual override**

> As a Scheduler, I want to manually move jobs in the schedule, so that I can handle exceptions.

Acceptance Criteria:

* Drag-and-drop interface for schedule adjustment
* Warnings when override creates conflicts
* System won't auto-move manually placed jobs
* Can lock jobs in place

**US-4.5: View schedule as Gantt**

> As a Scheduler, I want to see the schedule as a Gantt chart.

Acceptance Criteria:

* Gantt chart view by machine
* Time scale: day, week, month views
* Jobs colored by status or product type
* Click job to see details
* Print schedule for shop floor posting

##### 4. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR4.1 | Auto-schedule jobs based on substrate grouping and due date | P0 | Substrate is primary criterion |
| FR4.2 | Load balancing across machines of same type | P0 | Even distribution |
| FR4.3 | Setup time optimization (group by substrate weight) | P0 | Primary optimization axis |
| FR4.4 | Material availability check before scheduling | P1 | Links to inventory |
| FR4.5 | Manual schedule override with conflict warnings | P0 | Human in control |
| FR4.6 | Reschedule on job priority change | P1 | Dynamic updates |
| FR4.7 | Gantt chart visualization | P1 | Interactive view |
| FR4.8 | Schedule performance metrics | P2 | For continuous improvement |

---

#### PRD 18: Automated Imposition and Workflow Automation \[ADVANCED\] — Owner: Nilesh (WS2b)

##### 1. Problem Statement

Today, when an estimate is converted to an order, the pre-press team must manually select the correct imposition template for that product, configure the workflow (cutting, folding, binding steps), and set up the production job for each downstream operation. This causes delays, human error, and inconsistent job setup. The system should do this automatically.

##### 2. Solution Overview

When an estimate is converted into an order, the system automatically:

1. **Selects and applies the correct imposition template** based on the product specifications (e.g., a stitched book with 24 pages, 4-page cover, 4-color would match a specific imposition template)
2. **Selects and applies the correct workflow template** from the workflow builder based on product type (e.g., the production steps for cutting, folding, binding, lamination are automatically configured)
3. **Creates a production-ready job** with no manual pre-press intervention needed

This is the "auto-ready-for-production" concept: estimate → order conversion → auto-apply imposition → auto-apply workflow → job is automatically ready for production. No manual steps are needed between order conversion and the job being ready on the production floor.

For customers who use specialized imposition tools, the system also supports integration with external imposition engines (Infostrip, Phoenix, PitStop, etc.) as an override or alternative to the internal auto-imposition.

##### 3. User Stories

**US-5.1: Auto-apply imposition on order conversion**

> As a System, I want to automatically apply the correct imposition template when an estimate is converted to an order, so that jobs are production-ready without manual pre-press setup.

Acceptance Criteria:

* When estimate → order conversion occurs, system identifies the product type from the estimate
* Based on product specifications (product type, page count, cover type, color mode, finished size), system automatically selects the matching imposition template
* Imposition templates are pre-configured by product type in admin settings
* Job is production-ready with correct imposition applied — no manual template selection required
* Pre-press team can override the auto-selected template if needed (with audit trail)
* If no matching template exists, job is flagged for manual imposition setup

**US-5.2: Auto-apply workflow on order conversion**

> As a System, I want to automatically apply the correct workflow from the workflow builder when an estimate is converted to an order, so that production steps are pre-configured.

Acceptance Criteria:

* When estimate → order conversion occurs, system identifies the product type from the estimate
* Based on product type, system automatically applies the correct workflow template from the workflow builder
* Workflow template determines the full sequence of downstream operations (printing, cutting, folding, binding, lamination, packing, etc.)
* Job is automatically routed through the correct production workflow with no manual configuration
* Pre-press team can adjust the auto-applied workflow if needed (with audit trail)
* Workflow steps are visible and editable in the workflow builder interface

**US-5.3: Configure imposition templates by product type**

> As an Admin, I want to configure which imposition template applies to each product type, so that auto-imposition works correctly for our product mix.

Acceptance Criteria:

* Admin UI to map product types to imposition templates
* Can set default templates and product-specific overrides
* Templates are reusable across multiple products
* Change history tracked with timestamps

**US-5.4: Configure workflow templates by product type**

> As an Admin, I want to configure which workflow template applies to each product type, so that auto-workflow works correctly for our production setup.

Acceptance Criteria:

* Admin UI to map product types to workflow builder templates
* Can set default templates and product-specific overrides
* Workflows are built and maintained in the workflow builder
* Change history tracked with timestamps

**US-5.5: Export to external imposition engine (optional override)**

> As a Pre-Press Operator, I want to export a job to an external imposition engine when the internal auto-imposition is not suitable for a specific job.

Acceptance Criteria:

* Manual "Export to External Tool" option available on any job as an override
* Supports integration with: Infostrip, Phoenix, PitStop, and custom tools
* Export format: JDF and/or XML (configurable)
* Export includes: full product specifications, size, pages, bleed, gripper, marks
* Export to file download or hot folder (configurable)

**US-5.6: Import imposed file from external engine**

> As a Pre-Press Operator, I want to import an imposed file from an external tool back into GelatoConnect, so that the job can continue through the automated workflow.

Acceptance Criteria:

* "Import Imposed File" button on job detail
* File upload interface for imposed PDF
* Validation: file matches expected page count and product specifications
* Imported file replaces auto-generated imposition
* File linked to job; job remains production-ready and continues through auto-applied workflow

##### 4. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR5.1 | Auto-select and apply imposition template on order conversion based on product type | P0 | Core to "auto-ready-for-production" concept |
| FR5.2 | Auto-select and apply workflow template on order conversion based on product type | P0 | Core to "auto-ready-for-production" concept |
| FR5.3 | Admin UI to configure product type → imposition template mapping | P0 | Required for setup |
| FR5.4 | Admin UI to configure product type → workflow template mapping | P0 | Required for setup |
| FR5.5 | Fallback to manual setup when no matching template exists | P0 | Graceful degradation |
| FR5.6 | Pre-press override of auto-applied templates (with audit trail) | P1 | Human control |
| FR5.7 | Integration with external imposition engines (Infostrip, Phoenix, PitStop) | P1 | For advanced users |
| FR5.8 | JDF/XML export for external tools | P1 | Standard format |
| FR5.9 | Hot folder / FTP integration for external tools | P1 | For automation |
| FR5.10 | External imposition file import and validation | P1 | Manual override capability |
| FR5.11 | Track imposition and workflow source for audit and cost attribution | P1 | Reporting |

##### 5. Dependencies

| Dependency | Source | Required By | Risk if Delayed |
| --- | --- | --- | --- |
| Product type definition from AI Estimator | Existing | Template matching | Cannot auto-map products to templates |
| Workflow builder | Existing | Workflow automation | Cannot apply workflow templates |
| Order conversion event from WS1 | WS1 | Trigger for auto-apply | No trigger point for automation |
| Imposition engine APIs | External | External integrations | Only internal imposition available |
