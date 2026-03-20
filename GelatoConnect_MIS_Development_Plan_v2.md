# GelatoConnect MIS Development Plan - Version 2

**Version:** 2.1  
**Date:** March 18, 2026  
**Phase 1 Target:** May 1, 2026

---

## Executive Summary

This document provides a comprehensive development plan for GelatoConnect MIS, split into two distinct phases to focus delivery efforts and manage risk. Phase 1 targets core MIS capabilities with a go-live date of May 1, 2026, while Phase 2 contains advanced features available post-delivery.

### Strategic Context

GelatoConnect MIS represents a major market opportunity for Gelato. We have already secured **$850K+ in MIS deals** with contracts going live on May 1, 2026. This plan ensures we deliver the core capabilities needed to serve our target market: Print Service Providers (PSPs) with EUR 300K - EUR 5M annual revenue who need to replace their legacy systems but cannot tolerate implementation heavylifts. 

### Two-Tier System

We serve two distinct user personas with different needs:

| Tier | Target User | Go-Live Target | Design Principle |
| --- | --- | --- | --- |
| **Core** | Average PSP user assigned as MIS admin | Less than 1 week | Simplicity trumps everything |
| **Advanced** | Technical user with IT/systems experience (e.g., Switch integrator) | Use-case dependent | Full automation capability |

---

## Part 1: Key Product Requirements to Win PSP Market

Based on discovery with 100+ PSPs, Madrid Summit deepdives with 20+ customers, and individual discussions throughout 2025.

### 1. ICP Focus: EUR 300K - EUR 5M PSPs

Our primary target is PSPs between EUR 300,000 and EUR 5 million revenue. These PSPs typically:

* **Do NOT have a dedicated technical person on staff**
* Need systems that are simple and easy to use
* Cannot tolerate complex configuration or edge cases
* Must be able to use AND configure the system without IT support

**Design Principle:** Simplicity trumps everything for the core workflow. An average PSP user who is assigned as MIS admin should be able to configure and run the system without technical assistance.

### 2. Core vs Advanced Flow Separation

The system must be clearly divided into two tiers:

**CORE MIS (Simple)**

* Target: An average PSP MIS admin. Not technical, but understands print and day-to-day operations.
* Design principle: Simplicity trumps everything
* Must work out of the box with minimal configuration
* Must be 100% ready, committed, delivered, and validated by May 1, 2026
* Every feature labeled as "Core"

**ADVANCED MIS (Technical)**

* Target: Technical user with some IT/systems experience (like someone who has set up Enfocus Switch)
* Design principle: Full automation capability for those who want it
* Can require in-depth configuration
* Can be delivered in phases post May 1
* Every feature labeled as "Advanced"

**Critical:** The goal is not to achieve a fully automated flow (email to estimate to order to production to shipping) for 100% of jobs, like we do in Programmatic. The goal is to make GelatoConnect the PSP's operating system: something they can deploy across the business, replace their legacy setup with, and immediately benefit from.

### 3. Support Both AI Estimator Only AND MIS Customers

**2026 Budget Breakdown:**

* **350 customers** using AI Estimator only
* **70 customers** on full MIS

This means the vast majority of customers will ONLY use AI Estimator. We must:

* Protect AI Estimator as a standalone product
* Cannot make onboarding more complex by adding MIS features
* Configuration must work independently even if linked

### 4. Protect AI Estimator Onboarding Simplicity

**Current Reality:** AI Estimator onboarding takes 4-8 weeks despite all data being in a single place.

**Target:** Customer can go live on AI Estimator in ONE DAY.

We have a long way to go to simplify - we CANNOT add complexity. This means:

* Don't spread configuration across multiple systems
* Don't require customers to navigate between GCP/GCL/GCW/other/AI Estimator
* Keep data entry consolidated
* Don't assume "utopian solutions" will simplify real complexity

### 5. Configuration Linking Strategy

| Link Area | Core Approach | Advanced Approach |
| --- | --- | --- |
| **Substrates/Materials** | Link to GCP inventory without adding complexity | Same as core |
| **Shipping Rates** | Static lookup tables (as in AI Estimator today) and flexibility for operators to set/adjust | Real-time carrier API integration incl freight |
| **Machines** | Shared source of truth between MIS and machine parjk, but customer journey is simple for all types of users | Same as core |
| **Inventory** | Basic link between GCP and AI Estimator to deduct stock when an estimate becomes an order | Automated supplier integrations and additional automations that require setup effort |

### 6. One-Week Go-Live Requirement

**Madrid Summit Insight:** The #1 reason PSPs said they won't buy a new MIS from Gelato or anyone else is the **heavy lift needed for implementation**.

We must prove and demonstrate with real customers:

* **Core workflow go-live in less than 1 week**
* Not theoretical - actual customers going live
* This validates our ICP focus (EUR 300K - EUR 5M PSPs)

**Timeline Commitments:**

* Core workflow: 100% ready by May 1, 2026
* Advanced features: Delivered in phases post May 1
* AI Estimator onboarding: Absolutely protected, cannot become more complex

---

## Part 2: Delivery plan - we will deliver in two phases 

**Phase 1 (May 1, 2026 Delivery):** 4 workstreams covering core capabilities essential for a functioning MIS, plus cross-cutting customer communication triggers:

* Pre-Order Workflow (Quote to Order to Job Ticket to Proofing, Post-Conversion Order Editing, Reprints/Remakes)
* Production Operations (Tracking, Station Views, Outsourcing)
* Fulfillment and Inventory (Shipping, Multi-address Orders, Allocation)
* Finance and Integrations (Invoicing, Customer CRM, ERP Sync)
* Automated Customer Communication Triggers (cross-cutting)

**Phase 2 (Post May 1):** Advanced features for progressive adoption:

* Customer Portal
* AI Scheduling (press-first, substrate-based) and External Imposition
* Automated Carrier Integration and Advanced Inventory
* Analytics and P&L

‌

### **Key Product/Engg Principle for both phases: Build on Existing GelatoConnect Infrastructure**

**GelatoConnect IS the MIS**. We are not building a separate system. Instead, we are building a "pluggable" MIS layer on top of existing GelatoConnect infrastructure such as Production tracking, order service, AI Estimator integration. 

This approach eliminates rework, ensures consistency, and accelerates delivery.

---

## Part 3: Phase 1 - Core MIS Development (Target: May 1, 2026)

**Prototype video:** [https://www.loom.com/share/6c00b49a7939437993201e8cc0c287da](https://www.loom.com/share/6c00b49a7939437993201e8cc0c287da)

**Clickable prototype:** <custom data-type="smartlink" data-id="id-0">https://gelato-connect-mis-rust.vercel.app/</custom> 

### Phase 1 Summary Table

| Workstream | Modules | Owner (PM) | Dependencies | Reuse % | Tier |
| --- | --- | --- | --- | --- | --- |
| **WS1: Pre-Order Workflow** | Job Ticketing, File Receipt and Proofing, Quote-to-Order, Post-Conversion Order Editing, Reprints/Remakes | Styrbjorn | AI Estimator, Auth | 35% | **All Core** |
| **WS2: Production Operations** | Production Tracking, Station Views, Outsourcing/Trade Work | Felix | WS1, Existing Workflow | 50% | **All Core** |
| **WS3a: Shipping and Fulfillment** | Pallet/Freight Shipping (manual), Multi-address Orders | Kian | WS2, GC Logistics | 60% | **All Core** |
| **WS3b: Inventory and Procurement** | Inventory Allocation | Vipul | WS2, GC Procurement | 60% | **All Core** |
| **WS4: Finance and Integrations** | Invoicing, Customer CRM, ERP Integration | Kirill | WS1-3, External APIs | 20% | **All Core** |
| **Cross-Cutting** | Automated Customer Communication Triggers | - | WS1-4, Existing GC Notifications | 70% | **Core** |

---

### WS1: Pre-Order Workflow \[ALL CORE\]

| Capability | Status | Build vs Reuse | Tier |
| --- | --- | --- | --- |
| **Quote-to-Order Conversion** | Extend | Extend | **Core** |
| **Post-Conversion Order Editing** | New | Build | **Core** |
| **Job Ticketing** | New | Build | **Core** |
| **File Receipt and Proofing** | New | Build | **Core** |
| **Reprints/Remakes** | Extend | Extend | **Core** |

#### PRD 1: Quote-to-Order Conversion

##### 1. Problem Statement

When an estimator creates a quote in AI Estimator and the customer approves it, the estimator must currently export the quote and manually create a job in their legacy MIS. This requires re-entering all job specifications, creating a customer record if new, setting up production steps manually, and tracking the connection between quote and job outside the system. This process takes 15-30 minutes per job and introduces transcription errors.

##### 2. Solution Overview

Provide a "Convert to Order" button on approved estimates that creates a complete job ticket with one click, capturing additional order-specific information (PO number, delivery date) and triggering downstream workflows.

##### 3. User Stories

**US-1.1: Convert estimate to order**

> As an Estimator, I want to convert an approved estimate to a production order with one click, so that I can process jobs quickly without re-entering data.

Acceptance Criteria:

* "Convert to Order" button is visible on estimates with status "Approved" or "Accepted"
* Clicking the button opens a conversion modal with required fields
* All estimate details (specs, quantities, pricing) are pre-populated on the order
* Order is created in "Pending Files" or "Ready for Production" status based on file attachment
* Estimate status changes to "Converted" with link to the created order
* Conversion completes in less than 5 seconds

**US-1.2: Add order-specific details**

> As an Estimator, I want to add PO number, required delivery date, and special instructions when converting, so that production has all necessary information.

Acceptance Criteria:

* Modal includes fields: PO Number (optional), Required Delivery Date (required), Customer Reference (optional), Special Instructions (optional)
* Required Delivery Date defaults to estimate's quoted delivery date if specified
* PO Number is searchable on the orders list
* Special Instructions appear on the job ticket and station views

**US-1.3: Trigger inventory allocation**

> As an Estimator, I want inventory to be allocated when I convert an estimate to an order, so that materials are reserved for this job.

Acceptance Criteria:

* Upon conversion, system allocates required substrate quantity from available inventory
* If insufficient inventory, user sees a warning but can still proceed (warning only, not blocking)
* Allocated quantities are visible on the order detail page
* If order is cancelled, allocated inventory is released automatically

**US-1.4: Prevent duplicate orders**

> As an Estimator, I want the system to warn me if I'm creating a potential duplicate order, so that I don't accidentally process the same job twice.

Acceptance Criteria:

* System checks for orders with matching: customer + finished size + quantity + paper within last 30 days
* Warning is displayed with link to potential duplicate
* User can choose to proceed anyway (not blocking)

**US-1.5: Send order confirmation**

> As an Estimator, I want the customer to receive an order confirmation email automatically, so that they know their job is in process.

Acceptance Criteria:

* Email is sent automatically upon conversion (configurable on/off)
* Email includes: order number, job summary, required delivery date, estimated ship date
* Email template is customizable in settings
* Email delivery status is logged on the order

##### 4. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR1.1 | "Convert to Order" button on approved estimates | P0 | Only shown for approved/accepted estimates |
| FR1.2 | Order data fields: PO number, required delivery date, customer reference | P0 | Delivery date required, others optional |
| FR1.3 | Validation: Required fields populated before conversion | P0 | Clear error messages |
| FR1.4 | Order confirmation email to customer | P1 | Configurable on/off per customer |
| FR1.5 | Duplicate order detection (same specs within 30 days) | P2 | Warning only, not blocking |
| FR1.6 | Trigger inventory allocation upon conversion | P0 | Links to WS3 inventory |
| FR1.7 | Estimate status update to "Converted" with order link | P0 | Bidirectional navigation |
| FR1.8 | Audit log of conversion action | P1 | Who converted, when, from which estimate |

##### 5. Data Requirements

**New Fields on Order Entity:**

* source_estimate_id (FK to Estimate, nullable for manual orders)
* po_number (string, 50 chars, optional)
* required_delivery_date (date, required)
* customer_reference (string, 100 chars, optional)
* special_instructions (text, optional)
* inventory_allocation_id (FK to Allocation, nullable)

**Estimate Entity Updates:**

* converted_to_order_id (FK to Order, nullable)
* converted_at (timestamp, nullable)
* converted_by (FK to User, nullable)

##### 6. Edge Cases

| Scenario | Handling |
| --- | --- |
| Estimate already converted | Show "Already Converted" badge, link to existing order |
| Customer record incomplete | Prompt to complete required fields before conversion |
| Estimate has expired pricing | Warning message suggesting re-quote, allow proceed |
| Network failure during conversion | Clear error message, retry button, no partial data |
| Concurrent conversion attempts | Second user sees "conversion in progress" message |

##### 7. Out of Scope

* Batch conversion of multiple estimates
* Automatic conversion without user action
* Complex approval workflows (multi-level)
* Split orders from single estimate

---

#### PRD 2: Post-Conversion Order Editing

##### 1. Problem Statement

In practice, orders change after conversion - sometimes significantly. Customers may revise quantities (overruns/underruns of up to 10% are standard in food and label packaging), add or change delivery addresses (over 50% of jobs are approved without a confirmed delivery address), request additional finishing, or incur unexpected costs (e.g., actual shipping differs from estimated). Today, PSPs must work around their MIS to handle these changes, leading to invoicing errors and lost revenue.

This was validated in the Clarke Murphy co-development workshop (Feb 25, 2026), where their team confirmed that order editing post-conversion is a daily workflow - from adjusting quantities after production to adding custom costs before invoicing.

##### 2. Solution Overview

Allow authorized users to edit orders at any point between conversion and invoicing. Edits happen at the order level (not requiring re-estimation), with a clear audit trail. For price-affecting changes (e.g., quantity change), the system recalculates line items using the original estimate's pricing model. For non-price changes (e.g., adding a delivery address), the update is immediate.

##### 3. User Stories

**US-E.1: Edit order quantities**

> As an Estimator, I want to adjust the quantity on a confirmed order, so that I can reflect actual production output (overruns/underruns).

Acceptance Criteria:

* Edit button available on orders in any status before "Invoiced"
* Quantity change triggers automatic price recalculation based on original estimate pricing tiers
* Original quantity preserved as "quantity_ordered", new quantity shown as "quantity_actual"
* Audit log records change with timestamp, user, old value, new value
* If inventory is allocated, allocation adjusts automatically

**US-E.2: Add or modify delivery addresses after conversion**

> As a Sales Rep, I want to add or change delivery addresses on an order after it has been converted, so that I can handle the common case where addresses are confirmed after the job is approved.

Acceptance Criteria:

* Delivery address is optional at order conversion (not blocking)
* Orders without a delivery address show "Pending Address" status indicator
* Addresses can be added or edited at any point before shipment
* System sends automated reminder to customer when address is missing and due date is within configurable threshold (default: 3 business days)
* Multiple addresses can be added post-conversion (links to multi-address capability in WS3)

**US-E.3: Add custom costs to an order**

> As a Sales Rep, I want to add ad-hoc costs to an order before invoicing, so that I can capture unexpected expenses (e.g., actual shipping differed from estimate, rush fee, additional finishing).

Acceptance Criteria:

* "Add Custom Cost" button on order detail page
* Custom cost fields: description, amount, cost type (material/labor/shipping/other)
* Custom costs appear as additional line items on the invoice
* Can add multiple custom costs per order
* Custom costs are included in job P&L calculations

**US-E.4: Edit special instructions after conversion**

> As an Estimator, I want to update special instructions on a confirmed order, so that production has the latest information.

Acceptance Criteria:

* Special instructions editable on the order detail page
* Changes trigger notification to production if job is already in progress
* Edit history preserved with timestamps

**US-E.5: View order edit history**

> As a Finance user, I want to see all changes made to an order since conversion, so that I can reconcile the invoice with what was originally quoted.

Acceptance Criteria:

* "Edit History" tab on order detail page
* Shows all modifications: field changed, old value, new value, who changed it, when
* Original estimate values always visible for comparison
* Export edit history as PDF for customer communication

##### 4. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FRE.1 | Edit order quantities with auto price recalculation | P0 | Based on original estimate tiers |
| FRE.2 | Delivery address optional at conversion | P0 | "Pending Address" status |
| FRE.3 | Add/edit delivery addresses post-conversion | P0 | Until shipment |
| FRE.4 | Automated address reminder to customer | P1 | Configurable threshold |
| FRE.5 | Add custom costs to orders | P0 | Before invoicing |
| FRE.6 | Edit special instructions post-conversion | P1 | With notification to production |
| FRE.7 | Complete order edit audit trail | P0 | All changes logged |
| FRE.8 | Order edit permissions (role-based) | P1 | Not all users can edit |

##### 5. Data Requirements

**Order Entity Updates:**

* quantity_actual (integer, nullable - set when quantity differs from original)
* custom_costs (JSON array of custom cost line items)
* edit_history (JSON array of edit records with field, old_value, new_value, user, timestamp)
* address_status (enum: Confirmed, Pending)
* address_reminder_sent_at (timestamp, nullable)

---

#### PRD 3: Job Ticketing

##### 1. Problem Statement

When orders are created (either from converted estimates or manual entry), the production floor needs a complete job ticket that contains all specifications, instructions, and production steps. Today this is either a paper job bag that gets lost or damaged, a screen in a legacy MIS that operators must navigate to, or verbal instructions that get forgotten.

##### 2. Solution Overview

Auto-generate a digital job ticket from each order that flows through production, containing all information needed for every step. Support both digital display (station views) and printable format (for shops that want paper backup).

##### 3. User Stories

**US-2.1: Auto-generate job ticket**

> As a system, I want to automatically create a job ticket when an order is created, so that production can begin without manual job setup.

Acceptance Criteria:

* Job ticket is created within 5 seconds of order creation
* Job ticket includes: job number, customer name, specs, quantities, due date, production steps
* Production steps are derived from estimate's production path
* Job ticket status starts as "Created"

**US-2.2: Manual job ticket creation**

> As an Estimator, I want to create a job ticket manually for walk-in or phone orders, so that all jobs go through the same production workflow.

Acceptance Criteria:

* "New Job Ticket" button available in orders section
* Form includes all standard job ticket fields
* Customer lookup with typeahead search
* Can link to existing customer or create new inline
* Specs can be entered manually or selected from product templates

**US-2.3: Job ticket versioning**

> As an Estimator, I want to see the history of changes to a job ticket, so that I can understand what changed and when.

Acceptance Criteria:

* All changes to job ticket are logged with timestamp and user
* Version history accessible from job ticket detail page
* Can compare any two versions side-by-side
* Major changes trigger notification to production (configurable)

**US-2.4: Print job ticket**

> As a Production Operator, I want to print a physical job ticket, so that I have a backup when digital systems are unavailable.

Acceptance Criteria:

* Print button on job ticket detail page
* PDF format optimized for standard paper sizes (Letter/A4)
* Includes barcode for job number (scannable)
* QR code linking to digital job ticket
* Essential info only - fits on one page for typical jobs

**US-2.5: Add step-level special instructions**

> As an Estimator, I want to add special instructions for specific production steps when converting an estimate to an order, so that each department gets targeted guidance relevant to their work.

Acceptance Criteria:

* Conversion modal includes an "Advanced" section for step-level instructions
* Each production step listed with an optional instructions field
* Step-level instructions appear on the job ticket next to the relevant step
* Step-level instructions visible in station views for the relevant station
* Can also be added or edited directly on the job ticket after conversion
* Job-level instructions remain as the default; step-level is an optional enhancement

##### 4. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR2.1 | Auto-generate job ticket from converted order | P0 | Within 5 seconds |
| FR2.2 | Job ticket includes: specs, quantities, due dates, production steps | P0 | All data from estimate |
| FR2.3 | Manual job ticket creation (for walk-in/phone orders) | P1 | Full form with validation |
| FR2.4 | Job ticket versioning (track changes) | P2 | Audit log with diffs |
| FR2.5 | Job ticket templates for repeat orders | P2 | Save as template, reuse |
| FR2.6 | Printable job ticket with barcode | P1 | PDF generation |
| FR2.7 | Job ticket status workflow | P0 | Created to In Progress to Complete |
| FR2.8 | Step-level special instructions (per production step) | P1 | Advanced option in conversion modal |

##### 5. Data Requirements

**Job Ticket Entity:**

* job_number (string, auto-generated, unique, searchable)
* order_id (FK to Order)
* customer_id (FK to Customer)
* status (enum: Created, In Progress, Complete, On Hold, Cancelled)
* specifications (JSON - size, paper, colors, finishing)
* quantity (integer)
* quantity_ordered (integer - original quantity)
* quantity_produced (integer - actual produced)
* production_steps (JSON array of steps with status)
* required_delivery_date (date)
* estimated_ship_date (date)
* special_instructions (text)
* step_instructions (JSON object mapping step_name to instruction text, optional)
* files (array of file references)
* created_at, updated_at, created_by

---

#### PRD 4: File Receipt and Proofing

##### 1. Problem Statement

After an order is placed, the PSP needs to receive artwork files from the customer, validate them for print-readiness, and get customer approval on a proof before production. Today this involves email chains with large attachments that fail, manual pre-flight checking in separate tools, PDF proofs sent via email with no tracking, phone calls to chase approvals, and no clear record of what was approved.

##### 2. Solution Overview

Provide integrated file upload (via portal and email), automated pre-flight with clear pass/fail results, proof generation and delivery, and a structured approval workflow with full audit trail.

##### 3. User Stories

**US-3.1: Upload files via portal**

> As a Customer, I want to upload my artwork files through a web portal, so that I don't have to deal with email attachment limits.

Acceptance Criteria:

* File upload interface accessible from order detail
* Drag-and-drop support
* Supports PDF, AI, EPS, PSD, TIFF, JPEG formats
* Maximum file size: 500MB per file
* Progress indicator for large files
* Confirmation message on successful upload
* Email notification sent to PSP on file receipt

**US-3.2: Upload files via email**

> As a Customer, I want to send my files via email to a unique job address, so that I can use my existing workflow.

Acceptance Criteria:

* Each job has a unique email address (e.g., [job-12345@upload.psp.gelatoconnect.com](mailto:job-12345@upload.psp.gelatoconnect.com))
* Files attached to emails are automatically linked to the job
* Email subject and body are logged as notes on the job
* Maximum attachment size: 25MB (email limitation documented)
* Confirmation email sent to customer

**US-3.3: Automated pre-flight**

> As a Pre-Press Operator, I want files to be automatically checked for print-readiness, so that I can focus on files that need attention.

Acceptance Criteria:

* Pre-flight runs automatically on file upload
* Checks include: resolution, color space, bleed, fonts, transparency
* Results displayed as: Pass, Warning, Fail with specific issues listed
* Warning = proceed with caution, Fail = requires fix
* Pre-flight report downloadable as PDF

**US-3.4: Generate soft proof**

> As a Pre-Press Operator, I want to generate a proof PDF for customer approval, so that the customer can see exactly what will be printed.

Acceptance Criteria:

* "Generate Proof" button on job ticket file section
* Proof is low-res PDF with watermark "PROOF - NOT FOR PRODUCTION"
* Proof is automatically uploaded to customer portal
* Customer receives email notification with link to proof

**US-3.5: Approve/reject proof**

> As a Customer, I want to approve or reject a proof through the portal, so that I have a clear record of my approval.

Acceptance Criteria:

* Proof displayed in portal with approve/reject buttons
* Reject requires comment field (what's wrong)
* Approve records timestamp, user, and IP address
* Approval triggers notification to PSP
* Approved proof is locked (cannot be changed without new version)

**US-3.6: Track proof versions**

> As a Pre-Press Operator, I want to see all proof versions for a job, so that I can track the approval history.

Acceptance Criteria:

* All proof versions retained and accessible
* Each version shows: date, status (Pending/Approved/Rejected), customer comments
* Can compare versions side-by-side
* Final approved version clearly marked

##### 4. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR3.1 | File upload via customer portal | P0 | Up to 500MB |
| FR3.2 | File upload via email with unique job address | P1 | 25MB limit (email) |
| FR3.3 | Automated pre-flight with pass/fail/warning | P0 | Reuse existing pre-flight engine |
| FR3.4 | Soft proof generation (PDF) | P0 | With watermark |
| FR3.5 | Proof approval workflow (Pending to Approved/Rejected) | P0 | Full audit trail |
| FR3.6 | Proof rejection with comments | P0 | Required field |
| FR3.7 | Email notification on proof ready | P1 | Link to portal |
| FR3.8 | Proof version history | P2 | All versions retained |
| FR3.9 | Pre-flight report download | P1 | PDF format |

##### 5. Edge Cases

| Scenario | Handling |
| --- | --- |
| File upload fails mid-transfer | Resume capability, clear error, retry button |
| Pre-flight service unavailable | Queue for retry, show "Pending Pre-flight" status |
| Customer uploads wrong file | Allow replacement, previous files retained in history |
| Proof expires before approval | Proofs don't expire, gentle reminder emails after 48h |
| Multiple contacts for same customer | All contacts with portal access can approve |

---

#### PRD 5: Reprints and Remakes

##### 1. Problem Statement

When a job needs to be reprinted (due to production error, shipping damage, or customer error), PSPs currently create a completely new job manually, lose track of the connection to the original job, cannot analyze reprint causes or costs, and have no standard process for determining who pays.

##### 2. Solution Overview

Enable one-click reprint initiation from completed orders with reason code tracking, automatic cost attribution, and linkage to original jobs for analysis. This capability is triggered by CSRs or production team members when something goes wrong with an order.

##### 3. User Stories

**US-5.1: Initiate reprint from order**

> As a CSR, I want to initiate a reprint from a completed order, so that I can quickly get a remake into production.

Acceptance Criteria:

* "Reprint" button on completed orders
* Original job details pre-filled
* Can modify quantity (partial reprint)
* Must select reason code
* Creates new job ticket linked to original

**US-5.2: Select reason code**

> As a CSR, I want to select a reason code for the reprint.

Acceptance Criteria:

* Reason codes: Production Error, Shipping Damage, Customer Error, Material Defect, Other
* Required before submit
* Free-text notes field
* Reason determines default cost attribution

**US-5.3: Track reprint costs**

> As a Finance user, I want to see reprint costs attributed by reason.

Acceptance Criteria:

* Each reprint has cost attribution: Internal or Customer-Chargeable
* Attribution based on reason code (configurable)
* Reports showing reprint costs by reason, customer, period
* Reprint jobs flagged in job list

**US-5.4: Link reprint to original**

> As a Production Manager, I want reprints linked to original jobs.

Acceptance Criteria:

* Original job shows "Reprinted" with link
* Reprint shows "Reprint of \[original\]" with link
* Both visible in order history
* Search can find all jobs in a reprint chain

##### 4. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR5.1 | Initiate reprint from completed order | P0 | One-click |
| FR5.2 | Link reprint to original job | P0 | Bidirectional |
| FR5.3 | Reason code selection (required) | P0 | Standard list |
| FR5.4 | Cost attribution based on reason | P1 | Configurable |
| FR5.5 | Partial reprint | P2 | Modify quantity |
| FR5.6 | Reprint from any job version | P2 | Select version |
| FR5.7 | Reprint analytics report | P1 | Links to Analytics |

---

#### WS1 Non-Functional Requirements

| Category | Requirement | Notes |
| --- | --- | --- |
| **Performance** | Quote-to-order conversion less than 5 seconds | Under normal load |
| **Performance** | File upload supports up to 500MB | With progress indication |
| **Performance** | Page load times less than 2 seconds | For all portal pages |
| **Availability** | Core functionality during partial outages | Graceful degradation |
| **Usability** | All core functions achievable in less than 3 clicks | From starting point |
| **Usability** | No IT expertise required for any feature | Average print user capable |
| **Security** | Customer data isolation | Customers see only their data |
| **Security** | Audit logging for all actions | Who did what, when |

#### WS1 Dependencies

| Dependency | Source | Required By | Risk if Delayed |
| --- | --- | --- | --- |
| AI Estimator estimate data | Existing | Quote-to-Order | Cannot convert without estimate |
| Authentication service | Existing | All modules | Cannot launch |
| Pre-flight engine | Existing | File Receipt | Must build from scratch |
| Email delivery service | Existing | Notifications | Emails not sent |
| GCP Inventory API | WS3 | Inventory allocation | Allocation feature delayed |
| Notification service | Shared | All notifications | Manual workarounds needed |

#### WS1 Out of Scope (Phase 2 or Future)

* Customer Portal (moved to Phase 2)
* Print-on-demand / variable data merging
* Complex approval workflows (multi-level approval)
* Automated proof generation from templates
* Batch operations (batch convert, batch upload)
* Customer portal white-labeling (custom domains)
* Online payment collection

---

### WS2: Production Operations \[ALL CORE\]

| Capability | Status | Build vs Reuse | Tier |
| --- | --- | --- | --- |
| **Production Tracking** | Existing | Reuse + Extend | **Core** |
| **Station Views** | Existing | Reuse + Extend | **Core** |
| **Outsourcing/Trade Work** | New | Build | **Core** |

#### PRD 6: Production Tracking

##### 1. Problem Statement

Production managers and CSRs constantly need to answer "Where is this job?" Without real-time tracking, they must walk the shop floor or call operators, causing delays and frustration.

##### 2. Solution Overview

Extend our existing production tracking system to support MIS job tickets. Jobs flow through defined production steps, with operators logging start/complete actions and exceptions. **Important:** This capability already exists for programmatic orders. We are extending it, not rebuilding it.

##### 3. User Stories

**US-1.1: Track job status**

> As a Production Manager, I want to see real-time status of all jobs, so that I can identify delays and take action.

Acceptance Criteria:

* Dashboard showing all active jobs with current step and status
* Filter by: status, due date, customer, product type
* Jobs highlighted when behind schedule (yellow) or at risk (red)
* Click on job opens detail view with full history
* Refresh in real-time (no manual refresh needed)

**US-1.2: View production step history**

> As a CSR, I want to see the history of production steps for a job, so that I can answer customer inquiries accurately.

Acceptance Criteria:

* Job detail shows all production steps with timestamps
* Each step shows: start time, complete time, operator, duration
* Exceptions/issues are visible in the timeline
* Actual vs. estimated time comparison
* Exportable as PDF for customer communication

**US-1.3: Log exceptions**

> As a Production Operator, I want to log an exception when something goes wrong, so that the issue is visible and tracked.

Acceptance Criteria:

* "Report Issue" button at each step
* Reason codes: Machine Down, Material Issue, File Problem, Quality Reject, Other
* Free-text description field
* Exception visible on production dashboard immediately
* Notification sent to Production Manager
* Exception must be resolved before job can proceed (or manager override)

**US-1.4: Track actual vs estimated time**

> As a Production Manager, I want to compare actual production time vs. estimated, so that I can improve our estimates over time.

Acceptance Criteria:

* Each step records actual duration (start to complete)
* Comparison to estimated time from the job ticket
* Variance shown as percentage and absolute time
* Report showing variance trends by step, machine, operator
* Data feeds into Analytics (Phase 2)

##### 4. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR1.1 | Real-time job status updates | P0 | Extend existing for MIS jobs |
| FR1.2 | Production step tracking (print to finish to pack) | P0 | Standard steps configurable |
| FR1.3 | Exception logging with reason codes | P0 | Blocks progress until resolved |
| FR1.4 | Actual vs. estimated time comparison | P1 | For continuous improvement |
| FR1.5 | Quality checkpoint recording | P1 | Pass/fail at defined points |
| FR1.6 | Photo capture for QC documentation | P2 | Mobile camera integration |
| FR1.7 | Production dashboard | P0 | Real-time, filterable |

##### 5. Data Requirements

**Production Step Entity (extend existing):**

* job_ticket_id (FK) - NEW: support MIS jobs
* step_name (string)
* status (enum: Pending, In Progress, Complete, Blocked)
* started_at, completed_at (timestamps)
* operator_id (FK to User)
* estimated_duration_minutes, actual_duration_minutes (integers)
* exceptions (array of exception records)
* quality_checks (array of check results)

---

#### PRD 7: Station Views

##### 1. Problem Statement

Operators at production stations need to know what job to work on next and access job specifications quickly.

##### 2. Solution Overview

Extend our existing station view application to display MIS job tickets alongside programmatic orders. **Important:** Station views already exist for programmatic orders. We are extending them, not rebuilding them.

##### 3. User Stories

**US-2.1: View station queue**

> As a Production Operator, I want to see all jobs waiting at my station, so that I know what to work on.

Acceptance Criteria:

* Station-specific job list showing jobs in queue
* Priority order: past due first, then by due date
* MIS jobs and programmatic jobs in same queue
* Job type indicated visually (badge or icon)
* Refresh automatically (no manual refresh)

**US-2.2: View job details**

> As a Production Operator, I want to see job specifications at my station, so that I can produce the job correctly.

Acceptance Criteria:

* Click/tap job to see full specifications
* Shows: quantity, size, paper, colors, finishing instructions
* Special instructions prominently displayed (job-level and step-level)
* Artwork preview (thumbnail of first page)
* Can zoom on artwork preview

**US-2.3: Start/complete jobs**

> As a Production Operator, I want to mark jobs as started and completed, so that production status is tracked.

Acceptance Criteria:

* "Start" button on job in queue
* Starting a job moves it to "In Progress" status
* "Complete" button visible on in-progress jobs
* Completing a job moves it to next step
* Confirmation before complete (prevent accidental taps)

**US-2.4: Scan job barcode**

> As a Production Operator, I want to scan a job barcode to pull up that job, so that I can find jobs quickly.

Acceptance Criteria:

* Barcode scanner icon in station view header
* Scan job barcode (on printed job ticket) to jump to that job
* Works with standard 1D barcodes (Code 128) and QR codes
* Error message if barcode not recognized

**US-2.5: Report exception**

> As a Production Operator, I want to report a problem with a job from my station, so that issues are visible immediately.

Acceptance Criteria:

* "Issue" button on job detail
* Quick reason selection (large touch targets)
* Optional photo capture from device camera
* Optional notes field
* Job flagged as blocked after issue reported

##### 4. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR2.1 | Station-specific job queue | P0 | Extend for MIS jobs |
| FR2.2 | Job detail view (specs, files, instructions including step-level) | P0 | All job info accessible |
| FR2.3 | Start/complete job actions | P0 | With confirmation |
| FR2.4 | Barcode scanning for job lookup | P1 | 1D and QR codes |
| FR2.5 | Exception reporting interface | P0 | Quick entry |
| FR2.6 | Touch-optimized UI | P1 | 44px minimum touch targets |
| FR2.7 | Offline queue for status updates | P1 | Sync when connected |
| FR2.8 | Auto-refresh (no manual refresh) | P0 | Real-time updates |

##### 5. UI/UX Requirements

* **Touch targets:** Minimum 44px x 44px
* **Font size:** Minimum 16px, larger for key info
* **Contrast:** WCAG AA compliant
* **Orientation:** Support landscape and portrait
* **Color coding:** yellow = attention, red = blocked, green = complete

##### 6. Edge Cases

| Scenario | Handling |
| --- | --- |
| Network disconnection | Queue status updates locally, sync when reconnected |
| Barcode scan fails | Show "Not Found" with manual search |
| Job started by another operator | Warning, allow takeover with confirmation |
| Complete tapped accidentally | Undo available for 30 seconds |
| Station view tablet loses power | Resume on restart |

---

#### PRD 8: Outsourcing / Trade Work

##### 1. Problem Statement

PSPs frequently send jobs or job steps to external vendors for specialized work (embossing, binding, large format printing, etc.). Today this is tracked via Excel spreadsheets, email threads, and phone calls.

##### 2. Solution Overview

Provide integrated vendor/trade work management within the production workflow. Production steps can be marked as outsourced, automatically generating POs and tracking vendor status until the work returns.

##### 3. User Stories

**US-3.1: Mark step as outsource**

> As a Production Manager, I want to mark a production step as outsourced, so that I can track work sent to vendors.

Acceptance Criteria:

* Any production step can be marked as "Outsource"
* Marking as outsource prompts vendor selection
* Original step shows "Outsourced to \[vendor\]" status
* Job cannot proceed past outsourced step until marked as returned

**US-3.2: Select vendor**

> As a Production Manager, I want to select from approved vendors, so that I use our established partners.

Acceptance Criteria:

* Vendor dropdown shows approved vendors
* Vendors filterable by capability (binding, finishing, etc.)
* Can add new vendor inline if needed
* Vendor contact info displayed for reference

**US-3.3: Generate PO**

> As a Production Manager, I want a PO generated automatically, so that I have documentation for the vendor.

Acceptance Criteria:

* PO generated with: job specs, quantities, delivery date, special instructions
* PO number auto-generated (unique)
* PO downloadable as PDF for sending to vendor
* Email PO directly to vendor (vendor email on file)
* If vendor rate card exists, pricing auto-populated on PO

**US-3.4: Track vendor status**

> As a Production Manager, I want to track vendor status, so that I know when to expect work back.

Acceptance Criteria:

* Status workflow: Sent to In Progress to Shipped to Received
* Status can be updated manually or via vendor portal (future)
* Expected return date visible
* Overdue vendors highlighted on dashboard

**US-3.5: Record vendor cost**

> As a Finance user, I want vendor costs recorded on the job, so that job costing is accurate.

Acceptance Criteria:

* Estimated cost captured at PO creation (from rate card if available)
* Actual cost entered when vendor invoice received
* Variance highlighted if actual differs from estimate
* Vendor costs included in job P&L

**US-3.6: Mark as received**

> As a Production Operator, I want to mark outsourced work as received, so that the job can continue production.

Acceptance Criteria:

* "Received" button on outsourced steps
* Optional quality check on receipt
* Marking as received unblocks the job
* Receive date recorded for cycle time tracking

**US-3.7: Store vendor rate cards**

> As a Production Manager, I want to store vendor pricing (rate cards) in the system, so that POs are auto-populated with correct pricing and I don't have to look up costs for every outsource request.

Acceptance Criteria:

* Vendor profile includes a "Rate Card" section
* Rate card supports tiered pricing: setup cost + rate per quantity tier (same model as AI Estimator tiered rate)
* Rate card linked to vendor capabilities (e.g., spot UV pricing, binding pricing)
* When generating a PO, system auto-populates pricing from rate card if available
* Rate card has effective date and expiry date
* Can override rate card pricing on individual POs
* Rate card import from PDF or Excel (AI-assisted extraction)

##### 4. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR3.1 | Mark job step as "outsource" | P0 | Any step can be outsourced |
| FR3.2 | Vendor selection from approved list | P0 | With capability filtering |
| FR3.3 | PO generation with job specs | P0 | Auto-numbered |
| FR3.4 | Vendor status tracking | P0 | Standard workflow |
| FR3.5 | Vendor cost recording | P0 | Estimated and actual |
| FR3.6 | Job blocked until vendor return | P0 | Enforced workflow |
| FR3.7 | Vendor performance metrics | P2 | On-time rate, quality |
| FR3.8 | Vendor portal for status updates | P2 | Future enhancement |
| FR3.9 | Vendor rate card storage and auto-population | P1 | Tiered pricing model |
| FR3.10 | Rate card import from PDF/Excel | P2 | AI-assisted extraction |

##### 5. Data Requirements

**Vendor Entity:**

* name, contact_name, email, phone (strings)
* capabilities (array of strings)
* status (enum: Active, Inactive)
* payment_terms (string)
* notes (text)
* rate_cards (array of rate card records: capability, setup_cost, tiers\[\], effective_date, expiry_date)

**Outsource Record Entity:**

* job_ticket_id (FK), production_step_id (FK), vendor_id (FK)
* po_number (string, unique)
* status (enum: Sent, In Progress, Shipped, Received, Cancelled)
* estimated_cost, actual_cost (decimals)
* expected_return_date, actual_return_date (dates)
* sent_at, received_at (timestamps)

---

#### WS2 Non-Functional Requirements

| Category | Requirement | Tier |
| --- | --- | --- |
| **Performance** | Status updates propagate in less than 1 second | Core |
| **Availability** | Station views 99.9% uptime | Core |
| **Availability** | Production dashboard 99.5% uptime | Core |
| **Usability** | Station view operable with gloves | Core |
| **Usability** | No training required for basic operations | Core |
| **Reliability** | Offline queue for status updates | Core |
| **Security** | Role-based access (operators vs. managers) | Core |

#### WS2 Dependencies

| Dependency | Source | Required By | Risk if Delayed |
| --- | --- | --- | --- |
| Job Ticket from WS1 | WS1 | Production Tracking | Cannot track without jobs |
| Existing Production Workflow | Existing | Station Views | Must extend existing |
| Machine Park configuration | Existing | Production operations | No machines to schedule |

#### WS2 Out of Scope (Phase 2 or Future)

* AI Scheduling (moved to Phase 2)
* External Imposition Integration (moved to Phase 2)
* Machine connectivity (real-time data from presses)
* Worker time tracking / clock in/out
* Quality management system (full QMS)

---

### WS3: Fulfillment and Inventory \[ALL CORE\]

| Capability | Status | Build vs Reuse | Tier |
| --- | --- | --- | --- |
| **Pallet/Freight Shipping (manual)** | Extend | Reuse + Extend | **Core** |
| **Multi-address Orders (manual)** | Extend | Reuse + Extend | **Core** |
| **Inventory Allocation** | Extend | Reuse + Extend | **Core** |

#### PRD 9: Pallet/Freight Shipping

##### 1. User Stories

**US-1.1: Select shipment type**

> As a Shipping Clerk, I want to indicate whether a shipment is small package, pallet, or freight, so that the right process is used.

Acceptance Criteria:

* Shipment type selection: Small Package, Pallet, LTL Freight, FTL Freight
* Selection determines available carriers
* Default based on order weight/size (configurable thresholds)
* Can override default

**US-1.2: Select carrier manually**

> As a Shipping Clerk, I want to select a freight carrier from our approved list, so that I can use our negotiated rates.

Acceptance Criteria:

* Carrier dropdown shows approved freight carriers
* Carrier list filtered by shipment type
* Carrier contact info visible for booking
* Can add tracking number after booking

**US-1.3: Use rate lookup tables**

> As an Estimator, I want shipping rates pulled from lookup tables, so that I can include accurate shipping in quotes without carrier integration.

Acceptance Criteria:

* Lookup tables configurable by: destination zone, weight range, shipment type
* Tables editable in admin settings (same as AI Estimator)
* Rates used for estimates and order shipping cost
* Clear override option for special quotes

**US-1.4: Generate BOL**

> As a Shipping Clerk, I want to generate a Bill of Lading for freight shipments, so that I have proper documentation.

Acceptance Criteria:

* "Generate BOL" button on freight shipments
* BOL includes: shipper info, consignee, item description, weight, class
* PDF download
* Can customize BOL template in settings

**US-1.5: Enter tracking number**

> As a Shipping Clerk, I want to enter the freight tracking number, so that customers can track their shipment.

Acceptance Criteria:

* Tracking number field on shipment
* Carrier link generated automatically (if carrier URL pattern known)
* Tracking visible to customer in portal
* Tracking updates trigger customer notification

##### 2. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR1.1 | Support pallet shipments with manual configuration | P0 | Shipment type selection |
| FR1.2 | Freight carrier selection (manual) | P0 | From approved list |
| FR1.3 | Shipping rate lookup tables | P0 | Same as AI Estimator |
| FR1.4 | BOL generation | P1 | PDF format |
| FR1.5 | Freight tracking number entry | P1 | With carrier link |
| FR1.6 | Weight/dimension capture for freight | P0 | For rate determination |

---

#### PRD 10: Multi-address Orders

##### 1. User Stories

**US-2.1: Add multiple addresses**

> As an Estimator, I want to add multiple delivery addresses to an order, so that I can quote multi-location jobs accurately.

Acceptance Criteria:

* "Add Address" button on order
* Each address has: name, company, street, city, state/province, postal, country
* Can specify quantity per address
* Total of address quantities must equal order quantity
* Can remove addresses before order is shipped
* Addresses can be added post-conversion (links to Post-Conversion Order Editing)

**US-2.2: Split shipments**

> As a Shipping Clerk, I want each address to generate a separate shipment, so that I can track and ship independently.

Acceptance Criteria:

* Each address creates a shipment record
* Shipments can be processed independently
* Each shipment gets its own tracking number
* Order status shows: "X of Y shipments sent"

**US-2.3: Track per address**

> As a Customer, I want to see tracking for each address I ordered to, so that I know when each location will receive their delivery.

Acceptance Criteria:

* Each ship-to address with status visible
* Tracking number visible per address
* Delivered status per address
* Email notifications per shipment (not per order)

**US-2.4: Invoice with per-address detail**

> As a Customer, I want the invoice to show shipping costs per address, so that I can allocate costs internally.

Acceptance Criteria:

* Invoice line items show shipping per address
* Total shipping is sum of all addresses
* Address labels/names visible on invoice

##### 2. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR2.1 | Multiple ship-to addresses per order | P0 | Manual entry |
| FR2.2 | Quantity allocation per address | P0 | Must sum to order total |
| FR2.3 | Split shipment management | P0 | Independent tracking |
| FR2.4 | Per-address tracking | P1 | Visible to customer |
| FR2.5 | Consolidated invoice with per-address detail | P1 | Cost transparency |
| FR2.6 | Address book / saved addresses | P2 | For repeat customers |

---

#### PRD 11: Inventory Allocation

##### 1. User Stories

**US-3.1: Auto-allocate on order**

> As a system, I want to allocate inventory when an estimate becomes an order, so that materials are reserved for this job.

Acceptance Criteria:

* On quote-to-order conversion, system calculates required materials
* Required quantity allocated from available stock
* Allocation visible on order detail page
* Allocation reduces "available" quantity (available = on-hand - allocated)

**US-3.2: Release on cancel**

> As an Estimator, I want inventory released if I cancel an order, so that materials are available for other jobs.

Acceptance Criteria:

* Cancelling order automatically releases allocation
* Released quantity returns to available pool
* Release logged in allocation history

**US-3.3: View available vs allocated**

> As an Inventory Manager, I want to see both on-hand and available quantities, so that I understand true availability.

Acceptance Criteria:

* Inventory view shows: On-Hand, Allocated, Available (on-hand - allocated)
* Filter by substrate/material
* Click on allocated to see which orders are holding

**US-3.4: Low stock alerts**

> As an Inventory Manager, I want alerts when available stock is low, so that I can reorder before stockouts.

Acceptance Criteria:

* Low stock threshold configurable per material
* Alert when available (not on-hand) falls below threshold
* Dashboard widget showing low stock items
* Email notification option

**US-3.5: Manual override**

> As an Inventory Manager, I want to manually adjust allocations, so that I can handle exceptions.

Acceptance Criteria:

* Edit allocation quantity on order
* Release partial allocation
* Transfer allocation between orders
* All manual changes logged

##### 2. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR3.1 | Allocate inventory when estimate converts to order | P0 | Auto-trigger |
| FR3.2 | Release allocation if order cancelled | P0 | Auto-release |
| FR3.3 | Show available vs allocated quantities | P0 | Everywhere inventory shown |
| FR3.4 | Low stock alerts | P1 | Configurable thresholds |
| FR3.5 | Manual allocation override | P1 | With logging |
| FR3.6 | Allocation history | P1 | What was allocated when |

##### 3. Data Requirements

**Allocation Entity:**

* order_id (FK), material_id (FK)
* quantity_allocated (decimal)
* unit_of_measure (enum: sheets, sq_m, sq_ft, etc.)
* allocated_at (timestamp), allocated_by (FK, nullable for auto)
* released_at (nullable), released_by (nullable)
* status (enum: Active, Released, Consumed)

---

#### WS3 Non-Functional Requirements

| Category | Requirement | Tier |
| --- | --- | --- |
| **Usability** | Shipping works with simple lookup tables | Core |
| **Usability** | No carrier API setup required for go-live | Core |
| **Performance** | Label generation less than 30 seconds | Core |
| **Availability** | Shipping functions 99.5% uptime | Core |

#### WS3 Dependencies

| Dependency | Source | Required By | Risk if Delayed |
| --- | --- | --- | --- |
| Order data from WS1 | WS1 | Shipping | Nothing to ship |
| GC Procurement inventory | Existing | Allocation | Cannot allocate |

#### WS3 Out of Scope (Phase 2 or Future)

* Automated Carrier Rate Integration (moved to Phase 2)
* Advanced Inventory Features (moved to Phase 2)
* Drop shipping, international customs, returns management
* Campaign kitting and fulfillment (future, beyond Phase 2)

---

### WS4: Finance and Integrations \[ALL CORE\]

| Capability | Status | Build vs Reuse | Tier |
| --- | --- | --- | --- |
| **Invoicing** | New | Build | **Core** |
| **Customer CRM** | Extend | Reuse + Extend | **Core** |
| **ERP Integration** | New | Build | **Core** |

#### PRD 12: Invoicing

##### 1. User Stories

**US-1.1: Auto-generate invoice**

> As a system, I want to automatically create an invoice when an order ships, so that billing happens without manual effort.

Acceptance Criteria:

* Invoice created within 5 minutes of shipment confirmation
* Invoice includes all line items from order (product, finishing, shipping) plus any custom costs added post-conversion
* Prices from the converted estimate (or manual order pricing), adjusted for any quantity changes
* Invoice number auto-generated (configurable format)
* Tax calculated based on customer tax settings

**US-1.2: Review and edit invoice**

> As a Bookkeeper, I want to review invoices before they are sent, so that I can catch errors.

Acceptance Criteria:

* Invoice list shows: draft, sent, paid, overdue
* Click invoice to view/edit
* Can modify line items, prices, quantities
* Can add miscellaneous charges
* Edit history logged

**US-1.3: Send invoice to customer**

> As a Bookkeeper, I want to send invoices to customers via email, so that they receive billing promptly.

Acceptance Criteria:

* "Send Invoice" button on invoice detail
* Email includes: invoice summary and PDF attachment
* Customer email(s) pulled from customer record
* CC/BCC option for internal recipients
* Delivery status tracked (sent, delivered, bounced)

**US-1.4: Record payments**

> As a Bookkeeper, I want to record when customers pay invoices, so that AR is accurate.

Acceptance Criteria:

* "Record Payment" button on invoice
* Payment fields: amount, date, method, reference
* Partial payment supported
* Payment reduces open balance
* Overpayment tracked as credit

**US-1.5: Generate PDF**

> As a Bookkeeper, I want to download invoices as PDF, so that I have a document for records or mailing.

Acceptance Criteria:

* PDF download button on invoice
* PDF includes: company logo, invoice details, line items, totals
* PDF template customizable (logo, colors, footer)

**US-1.6: Handle multi-address invoicing**

> As a Bookkeeper, I want invoices to show per-address shipping, so that customers can allocate costs.

Acceptance Criteria:

* Shipping line items broken out per address (from WS3)
* Address names/labels visible
* Subtotals per address optional

##### 2. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR1.1 | Auto-generate invoice from shipped order | P0 | Triggered on shipment |
| FR1.2 | Manual invoice creation | P1 | For non-order charges |
| FR1.3 | Line item details from estimate (incl. post-conversion edits) | P0 | Full breakdown |
| FR1.4 | Tax calculation | P0 | By customer location/settings |
| FR1.5 | Invoice email delivery | P0 | With PDF attachment |
| FR1.6 | Payment recording | P0 | Full and partial |
| FR1.7 | Partial payment support | P1 | Track balance |
| FR1.8 | Invoice PDF generation | P0 | Customizable template |
| FR1.9 | Credit memo creation | P1 | For returns/adjustments |

---

#### PRD 13: Customer CRM

##### 1. User Stories

**US-2.1: View customer profile**

> As a CSR, I want to see all customer information in one place, so that I can answer questions quickly.

Acceptance Criteria:

* Customer profile page with: company name, addresses, contacts
* Payment terms, credit limit visible
* Pricing tier / discount level shown
* Quick stats: total orders, total revenue, last order date
* Notification preferences visible

**US-2.2: Manage contacts**

> As a CSR, I want to manage multiple contacts per customer, so that I can reach the right person.

Acceptance Criteria:

* Contact list on customer profile
* Contact fields: name, title, email, phone
* Mark primary contact
* Mark billing vs shipping contacts
* Add/edit/delete contacts

**US-2.3: View order history**

> As a CSR, I want to see all orders for a customer, so that I can reference past jobs.

Acceptance Criteria:

* Order list on customer profile
* Shows: order number, date, amount, status
* Click to open order detail
* Filterable by date range, status

**US-2.4: Add notes**

> As a CSR, I want to add notes to customer records, so that I can track important information.

Acceptance Criteria:

* Notes section on customer profile
* Add note with timestamp
* Notes sorted newest first
* Can pin important notes to top

**US-2.5: Set pricing tier**

> As a Sales Manager, I want to assign pricing tiers to customers, so that they get appropriate discounts.

Acceptance Criteria:

* Pricing tier dropdown on customer profile
* Tiers: Standard, Gold, Platinum (configurable)
* Tier applies discount % to estimates
* Can override discount on individual estimates

**US-2.6: Configure payment terms**

> As a Bookkeeper, I want to set payment terms per customer, so that invoices have correct due dates.

Acceptance Criteria:

* Payment terms dropdown: Net 30, Net 15, Due on Receipt, etc.
* Terms apply to invoices automatically
* Can override on individual invoice

##### 2. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR2.1 | Customer profile management | P0 | Core fields |
| FR2.2 | Contact management (multiple per customer) | P0 | With roles |
| FR2.3 | Order history view | P0 | Linked orders |
| FR2.4 | Customer notes | P1 | Timestamped |
| FR2.5 | Pricing tier assignment | P1 | With discount % |
| FR2.6 | Payment terms configuration | P1 | For invoicing |
| FR2.7 | Customer search | P0 | Fast typeahead |
| FR2.8 | Merge duplicate customers | P2 | Data cleanup |

---

#### PRD 14: ERP Integration

##### 1. User Stories

**US-3.1: Connect QuickBooks**

> As an Owner, I want to connect my QuickBooks account, so that invoice data syncs automatically.

Acceptance Criteria:

* OAuth connection flow for QuickBooks Online
* Connection wizard guides through setup
* Test connection verifies access
* Connection status visible in settings

**US-3.2: Sync invoices to ERP**

> As a system, I want to push invoices to QuickBooks, so that AR is accurate in the accounting system.

Acceptance Criteria:

* Invoice syncs to QuickBooks when created/sent
* Line items, amounts, customer mapped correctly
* Duplicate detection prevents re-creating
* Sync status visible on invoice (synced/pending/error)

**US-3.3: Sync customers to ERP**

> As a system, I want to create customers in QuickBooks when they don't exist, so that invoices can be posted.

**US-3.4: Sync payments from ERP**

> As a system, I want to pull payment data from QuickBooks, so that GelatoConnect shows accurate payment status.

Acceptance Criteria:

* Periodic sync (daily) pulls payments
* Payments matched to invoices
* Invoice status updated (paid/partial)
* Unmatched payments flagged for review

**US-3.5: Handle sync errors**

> As a Bookkeeper, I want to see and resolve sync errors, so that data stays accurate.

Acceptance Criteria:

* Error log shows failed syncs
* Error messages explain the issue
* Retry button for failed syncs
* Email notification for critical errors

##### 2. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR3.1 | QuickBooks Online integration | P0 | OAuth connection |
| FR3.2 | Invoice sync to ERP | P0 | Automatic on create |
| FR3.3 | Customer sync to ERP | P1 | Create if missing |
| FR3.4 | Payment sync from ERP | P1 | Daily pull |
| FR3.5 | Sage integration | P2 | Secondary ERP |
| FR3.6 | Dynamics 365 integration | P2 | Secondary ERP |
| FR3.7 | Generic export (CSV/Excel) | P1 | Fallback for unsupported ERPs |
| FR3.8 | Sync error handling and logging | P0 | With retry |

---

#### WS4 Non-Functional Requirements

| Category | Requirement |
| --- | --- |
| **Performance** | Invoice generation less than 5 seconds |
| **Availability** | Finance functions 99.5% uptime |
| **Usability** | No accounting expertise required for basic invoicing |
| **Security** | Finance data access role-controlled |
| **Compliance** | Invoice formats meet tax requirements |

#### WS4 Dependencies

| Dependency | Source | Required By | Risk if Delayed |
| --- | --- | --- | --- |
| Shipped orders from WS1-3 | WS1-3 | Invoicing | Nothing to invoice |
| Job cost data | WS2 | Job profitability | Cannot calculate margin |
| QuickBooks API | External | ERP sync | Must use manual export |
| Customer data from WS1 | WS1 | CRM | Incomplete customer records |

#### WS4 Out of Scope (Phase 2 or Future)

* Analytics and P&L (moved to Phase 2)
* Full accounts receivable management (dunning, collections)
* Online payment processing
* Advanced financial reporting
* Integration with dedicated CRM systems (Salesforce, HubSpot)

---

### Cross-Cutting: Automated Customer Communication Triggers \[CORE\]

#### 1. Overview

Across all Phase 1 workstreams, the system must support automated email notifications to customers at key status changes throughout the order lifecycle. This provides the "Amazon-like experience" that PSP customers increasingly expect - proactive updates without having to call or email to check status.

This capability reuses existing GelatoConnect notification infrastructure (triggers, email templates, delivery tracking) already proven at scale with programmatic orders.

Validated by Clarke Murphy co-development workshop (Feb 2026): Ben Murphy emphasized that automated status notifications at every milestone - from file received to job shipped - is what customers expect today.

#### 2. User Stories

**US-N.1: Configure notification triggers per customer**

> As a Sales Rep, I want to configure which status-change notifications a customer receives, so that I can match communication to each customer's preferences.

Acceptance Criteria:

* Per-customer notification settings in customer profile (CRM)
* Toggle on/off for each trigger type
* Default: all triggers enabled for new customers
* Customer can manage their own preferences if portal is available (Phase 2)

**US-N.2: Automated status-change emails**

> As a system, I want to send email notifications at key order milestones, so that customers are proactively informed without manual effort.

Acceptance Criteria:

* Notifications triggered automatically at these status changes:

    * Order confirmed (already exists via US-1.5)
    * File received and pre-flight results
    * Proof ready for approval
    * Proof approved / production started
    * Job shipped (with tracking info)
    * Invoice sent
    
* Each notification includes: order number, job summary, current status, next expected step
* Email template customizable in settings (logo, colors, footer)
* Delivery status tracked (sent, delivered, bounced)

**US-N.3: Automated address reminder**

> As a system, I want to send reminders to customers when their delivery address is missing and the due date is approaching, so that shipment is not delayed.

Acceptance Criteria:

* Reminder sent when: order has no delivery address AND due date is within configurable threshold
* Reminder includes link to provide address (or reply to email)
* Configurable: number of reminders and interval (default: 1 reminder at 3 days before due)
* Reminder logged on order timeline

**US-N.4: Automated proof approval reminder**

> As a system, I want to send reminders to customers when proof approval is pending, so that production is not delayed.

Acceptance Criteria:

* Reminder sent after configurable period (default: 48 hours after proof sent)
* Gentle tone, includes link to proof in portal
* Maximum 2 reminders, then flagged for manual follow-up
* Reminder logged on order timeline

#### 3. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FRN.1 | Status-change email notifications | P0 | Reuse existing GC notification infrastructure |
| FRN.2 | Per-customer notification preferences | P1 | In customer profile |
| FRN.3 | Customizable email templates | P1 | Logo, colors, footer |
| FRN.4 | Address reminder automation | P1 | Configurable threshold |
| FRN.5 | Proof approval reminder automation | P1 | 48h default |
| FRN.6 | Notification delivery tracking | P1 | Sent/delivered/bounced |

#### 4. Dependencies

| Dependency | Source | Required By | Risk if Delayed |
| --- | --- | --- | --- |
| Existing GC notification infrastructure | Existing | All triggers | Must build from scratch |
| Customer email from CRM (WS4) | WS4 | Email delivery | No recipient |
| Order status tracking (WS2) | WS2 | Trigger events | Cannot trigger |

---

## Part 4: Phase 2 - Advanced MIS Development (Post May 1, 2026)

Phase 2 includes capabilities that are either advanced (requiring technical user setup) or were moved from Phase 1 to de-risk the May 1 delivery.

### Phase 2 Summary Table

| Workstream | Modules | Owner (PM) | Original Tier | Reason for Phase 2 |
| --- | --- | --- | --- | --- |
| **WS1 Phase 2** | Customer Portal | Styrbjorn | Was Core | Moved to reduce Phase 1 scope |
| **WS2 Phase 2** | AI Scheduling (press-first, substrate-based) | Felix | Advanced | Technical features requiring setup |
| **WS2 Phase 2** | Imposition, Workflow, External Imposition Integration | Nilesh | Advanced | Technical features requiring setup |
| **WS3 Phase 2** | Automated Carrier Integration | Kian | Advanced | Requires carrier API setup |
| **WS3 Phase 2** | Advanced Inventory Features | Vipul | Advanced | Requires detailed scoping post Phase 1 |
| **WS4 Phase 2** | Analytics and P&L | Kirill | Was Core | Can be delivered after core invoicing is live |

---

### WS1 Phase 2: Customer Portal

#### PRD 15: Customer Portal

##### 1. User Stories

**US-4.1: Customer login**

> As a Customer, I want to log in with my email and password, so that I can access my orders securely.

Acceptance Criteria:

* Login page with email/password fields
* "Forgot password" flow with email reset link
* Remember me option (30-day session)
* Account lockout after 5 failed attempts (30-minute timeout)

**US-4.2: View order list**

> As a Customer, I want to see all my orders with their current status, so that I can track what's in progress.

Acceptance Criteria:

* Order list shows: order number, job name, status, required delivery date
* Filter by status: All, Pending Files, In Production, Shipped, Complete
* Search by order number or job name
* Sort by date (newest first default)
* Pagination (20 per page)

**US-4.3: View order details**

> As a Customer, I want to see the details of a specific order, so that I can verify the specifications are correct.

Acceptance Criteria:

* Detail page shows: full specifications, quantities, pricing, status timeline
* Status timeline shows: Order Placed to Files Received to Proof Approved to In Production to Shipped
* If shipped: tracking number with carrier link

**US-4.4: Upload artwork**

> As a Customer, I want to upload artwork files for an order, so that production can begin.

Acceptance Criteria:

* Upload button visible on orders with "Pending Files" status
* Can upload multiple files per order
* Can replace previously uploaded files

**US-4.5: Approve proofs**

> As a Customer, I want to approve or reject proofs for my orders, so that I can confirm the design before printing.

Acceptance Criteria:

* Orders with pending proofs highlighted in list
* Proof displayed with zoom capability
* Approve/Reject buttons with confirmation
* Reject requires comment

**US-4.6: View invoices**

> As a Customer, I want to view and download invoices for my orders.

Acceptance Criteria:

* Invoice section showing all invoices
* Filter by: All, Paid, Unpaid
* Download invoice as PDF
* Shows payment status and due date

**US-4.7: Request reprint**

> As a Customer, I want to report an issue and request a reprint.

Acceptance Criteria:

* "Report Issue" button on completed orders
* Issue form with reason selection
* File upload for photos of issue
* Creates support ticket visible to CSR

##### 2. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR4.1 | Customer login (email/password) | P0 | Standard auth |
| FR4.2 | Password reset via email | P0 | Security |
| FR4.3 | Order list with status filters | P0 | Essential |
| FR4.4 | Order detail view | P0 | Full job info |
| FR4.5 | File upload interface | P0 | Up to 500MB |
| FR4.6 | Proof review and approval | P0 | With audit trail |
| FR4.7 | Invoice viewing and download | P1 | PDF |
| FR4.8 | Issue reporting / reprint request | P1 | Links to reprints |
| FR4.9 | SSO support (SAML/OIDC) | P2 | Enterprise |
| FR4.10 | Notification preferences | P2 | Email opt-in/out |

##### 3. Security Requirements

* All traffic over HTTPS
* Session timeout after 24 hours
* Customer can only see their own orders
* Audit log of all customer actions

---

### WS2 Phase 2: AI Scheduling and External Imposition

#### PRD 16: AI Scheduling \[ADVANCED\]

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

#### PRD 17: External Imposition Integration \[ADVANCED\]

##### 1. User Stories

**US-5.1: Select imposition method**

> As a Pre-Press Operator, I want to choose between internal and external imposition.

Acceptance Criteria:

* Imposition selection during pre-press step
* Options: Internal (GelatoConnect), External (specify tool)
* Default based on product type (configurable)
* Selection recorded on job for cost tracking

**US-5.2: Export to external tool**

> As a Pre-Press Operator, I want to export job specifications to my external imposition tool.

Acceptance Criteria:

* "Export for Imposition" button on job
* Export format: JDF and/or XML (configurable)
* Export includes: size, pages, bleed, gripper, marks
* Export to file download or hot folder

**US-5.3: Import imposed file**

> As a Pre-Press Operator, I want to import the imposed file back into GelatoConnect.

Acceptance Criteria:

* "Import Imposed File" button on job
* File upload interface for imposed PDF
* Validation: file matches expected page count
* File linked to job and available for production

##### 2. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR5.1 | Internal imposition for supported products | P0 | Existing |
| FR5.2 | Imposition source selection per job | P0 | Internal vs. external |
| FR5.3 | JDF/XML export for external tools | P0 | Standard format |
| FR5.4 | Hot folder / FTP integration | P1 | For automation |
| FR5.5 | Imposed file import and validation | P0 | Link to job |
| FR5.6 | Track imposition source for cost attribution | P1 | Reporting |

---

### WS3 Phase 2: Automated Carrier Integration and Advanced Inventory

#### PRD 18: Automated Carrier Integration \[ADVANCED\]

##### 1. User Stories

**US-4.1: Get real-time rates**

> As an Estimator, I want real-time shipping rates from carriers.

Acceptance Criteria:

* Fetch live rates from configured carriers when generating estimate
* Show multiple carrier options with prices
* Can select specific carrier or "best rate"
* Fallback to lookup tables if API fails

**US-4.2: Auto-select carrier**

> As a system, I want to automatically select the best carrier based on cost and speed.

Acceptance Criteria:

* Rules engine for carrier selection (cheapest, fastest, preferred)
* Configurable per customer or globally
* Selection logged for audit

**US-4.3: Generate labels automatically**

> As a Shipping Clerk, I want shipping labels generated automatically.

Acceptance Criteria:

* "Print Label" button on shipment
* Label generated via carrier API
* Tracking number captured automatically
* Label in standard formats (4x6 thermal)

##### 2. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR4.1 | Real-time carrier rate lookup via GCL | P1 | API integration |
| FR4.2 | Automated carrier selection based on rules | P1 | Cheapest/fastest/preferred |
| FR4.3 | Carrier API error handling | P1 | Fallback to lookup |
| FR4.4 | Rate caching for performance | P2 | Reduce API calls |
| FR4.5 | Automatic label generation | P1 | Via carrier API |

---

#### PRD 19: Advanced Inventory Features \[ADVANCED\]

Advanced inventory features include automated supplier integrations, automatic reorder points, multi-warehouse support, and advanced allocation strategies. Detailed PRD to be developed during Phase 2 planning based on customer feedback from Phase 1 deployment.

---

### WS4 Phase 2: Analytics and P&L

#### PRD 20: Analytics / P&L

##### 1. User Stories

**US-4.1: View revenue dashboard**

> As an Owner, I want to see revenue trends.

Acceptance Criteria:

* Dashboard shows: revenue this month, vs last month, vs goal
* Revenue trend chart (last 12 months)
* Filter by date range
* Breakout by product category

**US-4.2: Analyze job profitability**

> As an Owner, I want to see profit margin per job.

Acceptance Criteria:

* Job list with: revenue, cost, margin, margin %
* Cost includes: materials, labor (from estimate), outsourcing, custom costs
* Sort by margin to find worst performers

**US-4.3: Compare estimate vs actual**

> As an Owner, I want to see how accurate our estimates are.

Acceptance Criteria:

* Report showing estimated vs actual cost per job
* Variance shown as percentage and absolute
* Filter by date range, product type
* Summary: average variance, trends over time

**US-4.4: Analyze customer profitability**

> As an Owner, I want to see profitability by customer.

Acceptance Criteria:

* Customer list with: revenue, margin, order count
* Sort by revenue or margin
* Identify top 20 customers
* Flag customers with declining revenue

**US-4.5: Filter by date range**

> As an Owner, I want to set custom date ranges.

Acceptance Criteria:

* Date picker on all reports
* Preset ranges: This Week, This Month, Last Month, This Quarter, YTD
* Custom range selector
* All charts/tables update on date change

##### 2. Functional Requirements

| Req ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR4.1 | Revenue dashboard | P0 | With trends |
| FR4.2 | Job profitability (actual vs estimated) | P0 | Per-job margin |
| FR4.3 | Estimate-to-order conversion rate | P1 | Win rate tracking |
| FR4.4 | Customer profitability analysis | P1 | By customer |
| FR4.5 | Production efficiency metrics | P1 | Utilization |
| FR4.6 | Custom date range filtering | P0 | On all reports |
| FR4.7 | Export reports (PDF/Excel) | P1 | For sharing |
| FR4.8 | Scheduled report delivery | P2 | Email weekly summary |

---

## Appendix A: Glossary

| Term | Definition |
| --- | --- |
| **Core** | Features simple enough for any average print company user, with less than 1 week go-live target |
| **Advanced** | Features requiring technical user with IT background, phased delivery acceptable |
| **Job Ticket** | Internal production document containing all specifications and instructions for a print job |
| **Estimate** | Cost calculation and quote generated by AI Estimator |
| **Order** | Customer-confirmed job ready for production (converted from estimate or manual entry) |
| **Proof** | Visual representation of final output for customer approval |
| **Outsourcing/Trade Work** | Production steps sent to external vendors |
| **Reprint/Remake** | Reproduction of a previously completed job |
| **Station View** | Operator interface at a specific production workstation (existing capability) |
| **Imposition** | Arrangement of pages on a press sheet for efficient printing |
| **External Imposition** | Using third-party tools (Infostrip, Phoenix, PitStop) for imposition |
| **Inventory Allocation** | Reserving substrate/materials for a confirmed order |
| **BOL** | Bill of Lading - shipping document for freight shipments |
| **LTL** | Less Than Truckload - freight shipping for smaller shipments |
| **FTL** | Full Truckload - freight shipping for large shipments |
| **Vendor Rate Card** | Pre-loaded pricing from an outsource vendor, using tiered pricing model |

## Appendix B: Risk Register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Core workflow complexity creep | High | High | Strict Core/Advanced labeling; change control |
| Go-live target missed (more than 1 week) | Medium | High | Focus on core; defer advanced features |
| AI Estimator onboarding complexity | Medium | High | Protect standalone config; no forced linking |
| ERP integration delays | Medium | Medium | Prioritize QuickBooks; generic export as fallback |
| Customer portal security | Medium | High | Security review; penetration testing (Phase 2) |
| Station view extension complexity | Low | Medium | Existing codebase is well-understood |
| Outsourcing feature scope creep | Medium | Medium | Start simple; vendor portal is P2 |
| Phase 1 scope vs May 1 deadline | High | High | Strict Phase 1/2 separation; daily standups |
| Engineering resource conflicts | Medium | High | Priority alignment across teams |

## Appendix C: Timeline Overview

### Phase 1 Timeline (March 18 - May 1, 2026)

**Week 1 (Mar 18-21):** Architecture decisions, scope finalization, PM/tech lead handoff packages. Daily standups begin.

**Week 2-3 (Mar 24 - Apr 4):** Core development sprint 1. WS1: Job Ticketing, Quote-to-Order, Post-Conversion Order Editing. WS2: Production Tracking and Station Views extension. WS3: Manual shipping foundation. WS4: Invoicing and ERP foundation. Cross-cutting: Notification infrastructure.

**Week 4-5 (Apr 7 - Apr 18):** Core development sprint 2. WS1: File Receipt and Proofing. WS2: Outsourcing/Trade Work with vendor rate cards. WS3: Inventory allocation, multi-address. WS4: Customer CRM, ERP sync. Cross-cutting: Customer communication triggers.

**Week 6 (Apr 21 - Apr 25):** Integration testing, bug fixes, end-to-end flow validation.

**Week 7 (Apr 28 - May 1):** Customer UAT with co-development PSPs (incl. Clarke Murphy). Core workflow validation. Go-live preparation.

### Phase 2 Timeline (Post May 1, 2026)

Detailed Phase 2 timeline to be defined after Phase 1 delivery:

* Customer Portal
* AI Scheduling (press-first, substrate-based) and External Imposition
* Automated Carrier Integration and Advanced Inventory
* Analytics and P&L

## Appendix D: Key Decisions Summary

| Decision | Rationale | Impact |
| --- | --- | --- |
| Two-tier system (Core/Advanced) | ICP PSPs don't have technical staff | Clear priorities; fast go-live |
| Phase 1/Phase 2 split | Focus on must-haves for May 1 | Clear scope boundaries |
| Customer Portal moved to Phase 2 | Core MIS works without self-service portal | Faster Phase 1 delivery |
| Reprints/Remakes in Phase 1 (CSR-triggered) | CSR/production team needs to handle reprints from day one; customer self-service reprint stays in Phase 2 with Customer Portal | Core operational capability from go-live |
| Analytics/P&L moved to Phase 2 | Can follow once invoicing is live | Faster Phase 1 delivery |
| 1-week go-live target for Core | Madrid Summit #1 objection is heavy lift | Forces simplicity |
| Protect AI Estimator onboarding | 350 AI-only vs 70 MIS customers | Standalone config preserved |
| Lookup tables for shipping (Core) | Simple approach; no API required | Fast go-live |
| Inventory allocation on order only | Prevents false reservations | Accurate tracking |
| Production Tracking and Station Views reuse | Already exists; proven technology | Faster delivery |
| Outsourcing in Core tier | Essential for PSPs who use trade work | Broader applicability |
| Build on existing GC infrastructure | Engineering alignment March 17 | No rebuilding |
| Daily standups for core team | Fast coordination | Quick decisions |
| Post-conversion order editing in Phase 1 | Orders change daily in practice (quantities, addresses, costs); validated by Clarke Murphy workshop | Enables real-world workflow; reduces invoicing errors |
| Delivery address optional at conversion | 50%+ of jobs approved without confirmed address (Clarke Murphy insight) | Unblocks order flow; automated reminders handle follow-up |
| Automated customer communication triggers | "Amazon experience" expectation from PSP customers; reuses existing GC infrastructure | Proactive updates; reduces support inquiries |
| Vendor rate cards in outsourcing | Outsourcers have fixed pricing that can be pre-loaded; reduces manual PO creation | Faster outsourcing workflow; accurate cost tracking |
| AI Scheduling scoped to press-first, substrate-based | Substrate grouping delivers 15-20% efficiency gain (Clarke Murphy); downstream ops follow naturally | Focused Phase 2 scope; maximum impact |

---

**Document Status:** Ready for Review  
**Next Review:** Friday March 21, 2026 (PM/Tech Lead Handoff)