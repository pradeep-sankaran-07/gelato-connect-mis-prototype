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

The MIS build is organized into four parallel workstreams, each covering a distinct phase of the PSP workflow. 

**Phase 1 - Core MIS (Target: May 1, 2026)**

| **Stream** | **Scope** | **Owner (PM)** |
| --- | --- | --- |
| WS1 | Pre-Order Workflow: Quote-to-Order,Job Ticketing, File Receipt & Proofing, Post-Conversion Order Editing,Reprints, Customer communication triggers | Styrbjorn |
| WS2 | Production Tracking, Station Views, Outsourcing | Felix |
| WS3a | Shipping & Fulfillment: Pallet/freight shipping (manual), multi-address orders | Kian |
| WS3b | Inventory & Procurement: Inventory allocation on order conversion, stock management | Vipul |
| WS4 | Finance: Invoicing, Customer CRM, ERP Integration (QuickBooks, Dynamics, Sage) | Kirill |

**Phase 2 - Advanced (Post May 1, 2026)**

| **Stream** | **Scope** | **Owner (PM)** |
| --- | --- | --- |
| WS1 | Customer Portal | Styrbjorn |
| WS2a | AI Scheduling | Felix |
| WS2b | Automated  Imposition (incl external integrations) and Workflow | Nilesh |
| WS3a | Automated Carrier Integrations incl freight | Kian |
| WS3b | Advanced Inventory Features, supplier integrations | Vipul |
| WS4 | Analytics & P/L | Kirill |

### **Key Product/Engg Principle for both phases: Build on Existing GelatoConnect Infrastructure**

**GelatoConnect IS the MIS**. We are not building a separate system. Instead, we are building a "pluggable" MIS layer on top of existing GelatoConnect infrastructure such as Production tracking, order service, AI Estimator integration.

This approach eliminates rework, ensures consistency, and accelerates delivery.

### Implementation Guidance for Claude Code

**This PRD will be used by Claude Code to build the MIS. The following principles apply to all PRDs in this document:**

1. **Check the existing prototype first.** The prototype codebase (Next.js app in this folder) contains working UI components, pages, and data structures. Before building any new component, check if a prototype version exists and use it as a starting point. Key prototype components include:
   - `components/template-management.tsx` - Job ticket template management (create, edit, copy, delete)
   - `components/template-editor.tsx` - HTML template editor with variable substitution
   - Order management pages, production tracking views, and station views
   - Navigation, layout, and shared UI components

2. **Map to existing GelatoConnect infrastructure where possible.** Many capabilities described in this PRD already exist in GelatoConnect's platform. Rather than building from scratch, extend or integrate with existing systems:
   - **Notifications and email:** GelatoConnect has an existing notification infrastructure for order status emails, tracking updates, and customer communications. PRD 5 (Customer Communication) should reuse this system rather than building a new email service.
   - **Production tracking:** GelatoConnect already tracks programmatic/SKU-based production. PRD 6 should extend the existing production tracker to support MIS jobs.
   - **Station views:** Existing station view components in GelatoConnect should be extended for MIS job display.
   - **Logistics and shipping:** GelatoConnect Logistics (GCL) already integrates with 80+ carriers for parcel shipping. PRD 9 (Pallet/Freight) should extend GCL rather than building a separate shipping system.
   - **Inventory and procurement:** GelatoConnect Procurement (GCP) already handles inventory management and automated replenishment. PRD 11 (Inventory Allocation) should extend GCP to support estimate-based allocation.
   - **Customer records:** Existing customer data in GelatoConnect should be extended with MIS-specific fields (billing terms, sales rep, job history) rather than creating a separate CRM.

3. **Use the prototype's design patterns and component library.** The prototype uses shadcn/ui components, Tailwind CSS, and follows GelatoConnect's design system. New pages and features should match these patterns for consistency.

4. **Prioritize working end-to-end flows over perfect individual features.** Build the full path from estimate to order to job ticket to production to shipping to invoicing, even if each step is initially simple. Then deepen each step iteratively.

5. **Data model should extend, not duplicate.** Where the PRD defines new database tables, check if equivalent data already exists in the prototype or GelatoConnect. Extend existing tables with new fields rather than creating parallel data structures.

---

## Part 3: Phase 1 - Core MIS Development (Target: May 1, 2026)

**Prototype video:** [https://www.loom.com/share/6c00b49a7939437993201e8cc0c287da](https://www.loom.com/share/6c00b49a7939437993201e8cc0c287da)

**Clickable prototype:** <custom data-type="smartlink" data-id="id-0">https://gelato-connect-mis-rust.vercel.app/</custom> 

### Phase 1 Summary Table

| Workstream | Modules | Dependencies | Reuse % | Tier |
| --- | --- | --- | --- | --- |
| **WS1: Pre-Order Workflow** | Job Ticketing, File Receipt and Proofing, Quote-to-Order, Post-Conversion Order Editing,  Customer Communication Triggers, Reprints | AI Estimator, Auth | 35% | **All Core** |
| **WS2: Production Operations** | Production Tracking, Station Views, Outsourcing/Trade Work | WS1, Existing Workflow | 50% | **All Core** |
| **WS3: Fulfillment and Inventory** | Pallet/Freight Shipping (manual), Multi-address Orders, Inventory Allocation | WS2, GC Logistics | 60% | **All Core** |
| **WS4: Finance and Integrations** | Invoicing, Customer CRM, ERP Integration | WS1-3, External APIs | 20% | **All Core** |

---

### WS1: Pre-Order Workflow \[ALL CORE\]

| Capability | Status | Build vs Reuse | Tier |
| --- | --- | --- | --- |
| **Quote-to-Order Conversion** | Extend | Extend | **Core** |
| **Post-Conversion Order Editing** | New | Build | **Core** |
| **Job Ticketing** | New | Build | **Core** |
| **File Receipt and Proofing** | New | Build | **Core** |
| Automated Customer Communication Triggers | New | Reuse | Core |
| **Reprints** | New | Reuse | Core |

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

#### PRD 2.1: Reprints

##### 1. User Stories

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

##### 2. Functional Requirements

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

#### PRD 3: Job Ticketing

##### 1. Problem Statement

When orders are created (either from converted estimates or manual entry), the production floor needs a complete job ticket that contains all specifications, instructions, and production steps. Today this is either a paper job bag that gets lost or damaged, a screen in a legacy MIS that operators must navigate to, or verbal instructions that get forgotten.

##### 2. Solution Overview

Auto-generate a digital job ticket from each order that flows through production, containing all information needed for every step. Support both digital display (station views) and printable format (for shops that want paper backup).

> **Implementation Note:** The prototype already contains working template management (`components/template-management.tsx`) and a template editor (`components/template-editor.tsx`) with HTML editing, variable substitution, and preview. Use these as the starting point. The template system supports Digital, Litho, and Large Format categories with product-type-to-template mapping.

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
| FR2.5 | Job ticket templates per category/product type | P1 | Auto-select template based on product type; HTML editor with variable substitution; see detailed PRD 3 section |
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
* template_id (FK to JobTicketTemplate, nullable)
* rendered_html (text, snapshot of rendered template)
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

### PRD 5: Automated Customer Communication Triggers \[CORE\]

#### 1. Overview

the system must support automated email notifications to customers at key status changes throughout the order lifecycle. This provides the "Amazon-like experience" that PSP customers increasingly expect - proactive updates without having to call or email to check status.

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

#### PRD 5: Production Tracking

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

#### PRD 6: Station Views

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

#### PRD 7: Outsourcing / Trade Work

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

#### PRD 8: Pallet/Freight Shipping

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

#### PRD 9: Multi-address Orders

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

#### PRD 10: Inventory Allocation

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

#### PRD 11: Invoicing

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

#### PRD 12: Customer CRM

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

#### PRD 13: ERP Integration

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

## Part 4: Phase 2 - Advanced MIS Development (Post May 1, 2026)

Phase 2 includes capabilities that are either advanced (requiring technical user setup) or were moved from Phase 1 to de-risk the May 1 delivery.

### Phase 2 Summary Table

| Workstream | Modules | Original Tier | Reason for Phase 2 |
| --- | --- | --- | --- |
| **WS1 Phase 2** | Customer Portal | Was Core | Moved to reduce Phase 1 scope |
| **WS2 Phase 2** | AI Scheduling, Automated  Imposition (incl external integrations) and Workflow | Advanced | Technical features requiring setup |
| **WS3 Phase 2** | Automated Carrier Integration, Advanced Inventory | Advanced | Requires carrier API setup |
| **WS4 Phase 2** | Analytics and P&L | Was Core | Can be delivered after core invoicing is live |

---

### WS1 Phase 2: Customer Portal

#### PRD 14: Customer Portal

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

---

### WS3 Phase 2: Automated Carrier Integration and Advanced Inventory

#### PRD 19: Automated Carrier Integration \[ADVANCED\]

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

#### PRD 20: Advanced Inventory Features \[ADVANCED\]

Advanced inventory features include automated supplier integrations, automatic reorder points, multi-warehouse support, and advanced allocation strategies. Detailed PRD to be developed during Phase 2 planning based on customer feedback from Phase 1 deployment.

---

### WS4 Phase 2: Analytics and P&L

#### PRD 21: Analytics / P&L

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
| **Reprint** | Reproduction of a previously completed job |
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

**Document Status:** Ready for Review  
**Next Review:** Friday March 21, 2026 (PM/Tech Lead Handoff)# GelatoConnect MIS - Phase 1 WS1: Pre-Order Workflow PRDs

---

## PRD 1: Quote-to-Order Conversion

### Problem Statement

When a sales estimator creates an accurate estimate in the AI Estimator, the order must transition from the sales pipeline into production. Currently, this is a manual, error-prone process requiring re-entry of customer, product, specification, and pricing data. This causes:

- Data duplication and inconsistency between sales estimates and production orders
- Delays in production scheduling (estimate sits in limbo)
- Lost context (pricing, special notes) between estimate and order
- No audit trail of conversion
- Risk of duplicate orders if sales rep converts twice
- Incomplete orders missing delivery address (50%+ of approved estimates lack addresses at conversion time)

The system needs a seamless, one-click conversion from estimate to production-ready order while:
- Preserving all estimate data (customer, products, specs, quantities, pricing)
- Triggering downstream systems (inventory allocation, job ticketing, customer communication)
- Handling optional data (delivery address can be added later)
- Detecting and warning about duplicate conversions
- Supporting multi-product estimates and walk-in orders

### Solution Overview

A conversion workflow that:

1. **Initiates from estimate detail page** - "Convert to Order" button visible on approved estimates
2. **Opens conversion modal** with pre-filled customer, products, pricing, and optional delivery address field
3. **Validates data** - checks pricing freshness, detects duplicate conversions, warns about missing address
4. **Creates order atomically** - inserts order record with status "Pending Address" (if no address) or "Confirmed" (if address provided)
5. **Auto-generates job ticket** - within 5 seconds, fully parameterized from estimate
6. **Triggers inventory allocation** - reserves stock if tracked
7. **Sends confirmation email** - to customer with order summary
8. **Records conversion in audit trail** - links estimate to order

Supports three conversion paths:
- **Path A: Estimate-to-Order** (primary) - from approved estimate with delivery address
- **Path B: Pending Address** - from approved estimate without address; order created as "Pending Address", reminder emails sent
- **Path C: Manual Order Creation** - for walk-in/phone orders with no prior estimate (CSR creates order directly)

### User Stories

#### US 1.1: Convert Approved Estimate to Order (Happy Path)

**As a** Sales Estimator
**I want to** convert an approved estimate to a production order in one click
**So that** the order enters production scheduling immediately and I have a clear audit trail

**Acceptance Criteria:**

1. On estimate detail page, "Convert to Order" button visible only if estimate status is "Approved"
2. Button click opens modal titled "Convert Estimate to Order"
3. Modal displays:
   - Read-only customer name, email, phone
   - Read-only product summary (count, description)
   - Read-only pricing breakdown (material, labor, overhead, profit)
   - **Editable** delivery address fields (optional):
     - Street address line 1 (max 100 chars)
     - Street address line 2 (max 100 chars)
     - City (max 50 chars)
     - State/Province (max 50 chars)
     - Postal code (max 20 chars)
     - Country (dropdown, default to estimate's country if provided)
   - Special instructions textarea (max 500 chars, pre-filled from estimate if provided)
   - Checkbox: "Mark as rush order" (optional, affects priority in production queue)
   - Checkbox: "Customer confirmed delivery address" (required if address fields filled)
   - Two buttons: "Cancel" and "Create Order"
4. User fills in delivery address completely (all address fields or none)
5. User clicks "Create Order"
6. System validates:
   - If any address field is filled, all required address fields must be populated
   - No duplicate order exists for same customer + same product set + same month (warning only, not blocking)
   - Pricing is fresh (estimate created within last 30 days, or show warning "Pricing may be outdated")
7. System creates order record in database:
   - Order ID auto-generated (format: GC-ORD-{date}-{sequence}, e.g., GC-ORD-20260319-001)
   - Status: "Confirmed" if address provided, "Pending Address" if not
   - Customer ID linked from estimate
   - Order date = current date/time
   - Estimate ID linked for audit trail
   - All product line items copied from estimate
   - Pricing snapshot stored in order (immutable)
   - Delivery address stored if provided
   - Special instructions stored if provided
   - Conversion timestamp recorded
8. System auto-generates job ticket within 5 seconds (see PRD 3 for details):
   - Job ID auto-generated
   - Status set to "Created"
   - All specifications, quantities, production steps from estimate
   - Link to order maintained
9. System sends order confirmation email to customer:
   - Subject: "Order Confirmation: [Order ID] - [Product Summary]"
   - Body includes: order ID, order date, product details, pricing summary, delivery address (if provided), estimated production timeline
   - Email stored in audit log
10. Modal closes, user redirected to new order detail page
11. Order detail page shows:
    - Order ID prominently
    - "Converted from Estimate #[ID]" badge
    - All order details
    - Link to view job ticket(s)
    - Link to estimate for comparison
12. Estimate status updated to "Converted" with timestamp
13. All changes logged in order audit trail with user ID and timestamp

**Edge Case Handling:**
- If estimate is deleted after approval but before conversion: prevent conversion, show error "Estimate no longer available"
- If pricing was edited after approval: show warning in modal "Pricing has changed since approval; confirm to proceed"
- If customer email invalid: warn user before sending confirmation email, allow retry

---

#### US 1.2: Convert Estimate Without Delivery Address (Pending Address Flow)

**As a** Sales Estimator
**I want to** convert an estimate to an order even when customer hasn't provided a delivery address
**So that** we can start production planning and remind customer separately to provide address

**Acceptance Criteria:**

1. Conversion modal allows blank address fields (do not require address)
2. User skips address fields, clicks "Create Order"
3. System creates order with status "Pending Address" (not "Confirmed")
4. Order detail page clearly shows "⚠️ Address Pending" banner at top
5. "Pending Address" banner includes:
   - "Delivery address not yet provided"
   - "Add Address" button (links to edit form)
   - "Customer notified: [date]" indicator (if reminder sent)
6. Automated system sends "Address Reminder" email to customer immediately:
   - Subject: "We need your delivery address for Order [Order ID]"
   - Body: order details, placeholder for address, deadline (if applicable), link to submit address via portal (Phase 2) or email back
7. After 3 days without address, automated system sends second reminder email
8. After 5 days without address and job due date within 7 days, system escalates:
   - Notifies PSP admin (in-app notification)
   - Email alert: "Order [ID] missing address and due in X days"
9. Estimator can add address manually at any time:
   - Opens order detail page
   - Clicks "Add Address" button
   - Modal opens with address form (identical to conversion modal)
   - User fills address, clicks "Save"
   - Order status changes to "Confirmed"
   - System sends confirmation email to customer with address confirmation
   - Automated email log records all address-related communications
10. If address added within 3 days of creation, no further reminders sent
11. If address added after production started, system warns: "Production has begun; address change may affect timeline"
12. If address added after production complete, warning: "Address added after production; affects shipping only"
13. Order can be invoiced with "Pending Address" status, but invoice notes address as missing

---

#### US 1.3: Detect and Handle Duplicate Order Attempts

**As a** Sales Manager
**I want to** be warned if I accidentally try to convert the same estimate twice
**So that** we don't create duplicate orders for the same customer

**Acceptance Criteria:**

1. System tracks which estimates have been converted (field: `estimate_id` on order record, and flag `is_converted=true` on estimate)
2. If user tries to convert an estimate already linked to an order:
   - Conversion modal still opens (don't block conversion)
   - Warning banner appears at top of modal: "⚠️ This estimate was already converted to Order [Order ID] on [date]"
   - "View Existing Order" link provided
   - "Create New Order Anyway" button (explicit confirmation required)
3. Duplicate detection also checks for:
   - Same customer + same product set + created within same month = warning "Similar order detected"
   - Show link to the similar order
   - Allow user to confirm they want to proceed (e.g., customer reordered)
4. If user clicks "Create New Order Anyway", system:
   - Creates new order record (new Order ID)
   - Links new order to same estimate (allows one estimate to have multiple orders)
   - Sets field `duplicate_warning_acknowledged=true`
   - Includes note in order audit trail: "Created as duplicate; similar order [ID] exists"
   - Estimate status remains "Converted" (not updated)
5. System allows viewing the linked estimates/orders from either direction:
   - Order detail page shows "Linked Estimate(s)" section with links
   - Estimate detail page shows "Converted Orders" section listing all orders created from this estimate

---

#### US 1.4: Expired Pricing Scenario

**As a** Sales Estimator
**I want to** be warned if I'm converting an estimate with pricing older than 30 days
**So that** we don't accidentally use outdated costs

**Acceptance Criteria:**

1. During conversion, system checks estimate creation date
2. If estimate is older than 30 days:
   - Warning banner in modal: "⚠️ This estimate was created [X days] ago. Pricing may no longer be valid."
   - Show original cost breakdown
   - "Regenerate Pricing" button links to AI Estimator to recalculate
   - "Use Current Pricing Anyway" button allows user to proceed with old pricing
3. If user clicks "Use Current Pricing Anyway":
   - Order created with old pricing
   - Audit trail note: "Order created with pricing from [date]"
   - Order detail page shows "Pricing Age" badge
4. If user clicks "Regenerate Pricing":
   - Redirects to AI Estimator
   - Estimate re-opened for editing
   - User clicks "Save" to generate new pricing
   - Returns to conversion flow with updated pricing

---

#### US 1.5: Manual Order Creation (Walk-in/Phone Order)

**As a** Customer Service Representative
**I want to** create an order directly without an estimate (for phone orders or walk-ins)
**So that** I can process orders from customers who don't have a written estimate

**Acceptance Criteria:**

1. From order list/dashboard, button "Create New Order" available
2. Opens modal "Create Manual Order"
3. Modal has sections:
   - **Customer Selection:**
     - Autocomplete search by customer name/email/phone
     - "Create New Customer" link if not found
     - Creates customer record inline if needed (name, email, phone minimum)
   - **Product & Specifications:**
     - Dropdown of product types (from AI Estimator product catalog)
     - Select quantity, dimensions, materials, colors, finishes
     - Can add multiple line items (click "Add Product")
     - "Advanced" expander for detailed specs
   - **Pricing:**
     - Manual entry of cost components (material, labor, overhead)
     - "Calculate Total" button recalculates
     - Or "Auto-calculate" button links to AI Estimator to generate proper estimate
     - Display final total price
   - **Delivery:**
     - Delivery address (required for manual orders)
     - All address fields
     - Delivery date (required)
   - **Special Instructions:**
     - Text field (max 500 chars)
   - **Buttons:** "Cancel", "Save as Draft", "Create Order"
4. User fills all sections
5. User clicks "Create Order"
6. System validates:
   - Customer record exists
   - At least one product with quantity
   - Delivery address complete
   - Pricing values reasonable (warning if cost seems low or very high)
7. System creates order:
   - Order ID generated
   - Status: "Confirmed" (manual orders always have address)
   - Estimate ID: null
   - All data saved
   - Marked as "Manual Order" in audit trail
8. Auto-generates job ticket (within 5 seconds)
9. Sends confirmation email to customer
10. User redirected to order detail page
11. Order detail page shows "Manual Order" badge
12. Edit history available (see PRD 2 for edit tracking)

---

### Detailed User Journeys

#### Journey 1: Happy Path - Estimator Converts with Address

**Setup:** Estimate #EST-20260315-042 is approved. Customer: Acme Packaging, email acme@example.com, no address on file yet. Sales estimator Sarah has reviewed and approved.

**Flow:**

1. Sarah opens GelatoConnect, navigates to Sales module
2. Sarah searches for estimate EST-20260315-042 (search bar or recent items)
3. Estimate detail page loads:
   - Estimate ID: EST-20260315-042
   - Status badge: "Approved" (green)
   - Customer: Acme Packaging, acme@example.com
   - Products: 5000x Labels, 4-color offset, glossy
   - Pricing: $2,850 total
   - Production timeline: 10 days
   - Special instructions: "Match PMS 485 on label"
   - Top right: "Convert to Order" button (visible because status is Approved)
4. Sarah clicks "Convert to Order"
5. Modal opens titled "Convert Estimate to Order":
   - Header shows estimate ID
   - Section 1: Customer (read-only)
     - Acme Packaging
     - acme@example.com
     - (555) 123-4567
   - Section 2: Products (read-only)
     - 5000x Labels, 4-color offset, glossy
     - Qty: 5000 units
   - Section 3: Pricing (read-only)
     - Material: $1,200
     - Labor: $950
     - Overhead: $500
     - Profit: $200
     - **Total: $2,850**
   - Section 4: Delivery Address (EDITABLE)
     - Street Address 1: [blank] (focus here)
     - Street Address 2: [blank]
     - City: [blank]
     - State: [blank]
     - Postal Code: [blank]
     - Country: United States (dropdown)
   - Section 5: Special Instructions (EDITABLE)
     - "Match PMS 485 on label" (pre-filled from estimate)
   - Section 6: Options (checkboxes)
     - [ ] Mark as rush order
     - [ ] Customer confirmed delivery address
   - Bottom: "Cancel" button (left), "Create Order" button (right, disabled until address complete)
6. Sarah clicks on Street Address 1 field, types "1200 Industrial Blvd"
7. Sarah clicks on Street Address 2 field, leaves blank
8. Sarah types in City: "Chicago"
9. Sarah types in State: "IL"
10. Sarah types in Postal Code: "60622"
11. Country already set to "United States" (correct)
12. Sarah checks "Customer confirmed delivery address" (confirming with Sarah that address is correct)
13. "Create Order" button now enabled (all required address fields filled and checkbox checked)
14. Sarah clicks "Create Order"
15. Modal shows loading spinner: "Creating order..."
16. System backend processing:
    - Validates address fields: all present ✓
    - Checks for duplicates: no similar orders found ✓
    - Checks pricing freshness: estimate created 4 days ago ✓
    - Creates order record:
      - Order ID: GC-ORD-20260319-001
      - Status: "Confirmed"
      - Customer: Acme Packaging
      - Products: [copied from estimate]
      - Pricing snapshot: $2,850
      - Address: 1200 Industrial Blvd, Chicago, IL 60622, USA
      - Special instructions: "Match PMS 485 on label"
      - Estimate ID linked: EST-20260315-042
      - Created timestamp: 2026-03-19 14:32:00 UTC
      - User: Sarah (sales rep ID)
    - Auto-generates job ticket (Job ID: JOB-20260319-001):
      - Title: "5000x Labels - 4-color offset"
      - Status: "Created"
      - All specs from estimate
      - Steps from estimate workflow
    - Sends confirmation email to acme@example.com:
      - Subject: "Order Confirmation: GC-ORD-20260319-001 - 5000x Labels"
      - Body:
        ```
        Dear Acme Packaging,

        Thank you for your order! Here are your order details:

        Order ID: GC-ORD-20260319-001
        Order Date: March 19, 2026

        Product: 5000x Labels, 4-color offset, glossy
        Quantity: 5000 units
        Total: $2,850.00

        Delivery Address:
        1200 Industrial Blvd
        Chicago, IL 60622
        USA

        Estimated Production Time: 10 days

        Special Instructions:
        Match PMS 485 on label

        Next Steps:
        - We will send artwork upload instructions separately
        - Once you upload artwork, we will review and send a proof
        - After approval, production begins

        Questions? Contact us at support@gelatoconnect.com
        ```
      - Email logged in audit trail
    - Estimate status updated to "Converted"
    - Estimate timestamp: conversion_timestamp = 2026-03-19 14:32:00 UTC
    - Order audit trail entry created: "Order created from Estimate EST-20260315-042 by Sarah (user ID 123)"
17. Modal closes after 2 seconds
18. Page redirects to new order detail page: /orders/GC-ORD-20260319-001
19. Order detail page displays:
    - Header with Order ID: GC-ORD-20260319-001
    - Status badge: "Confirmed" (blue)
    - "Converted from Estimate EST-20260315-042" link/badge
    - Tabs: Overview | Files | Proofing | History | Job Tickets
    - Overview tab shows:
      - Order Date: March 19, 2026
      - Customer: Acme Packaging
      - Delivery Address: 1200 Industrial Blvd, Chicago, IL 60622, USA
      - Products: 5000x Labels, 4-color offset, glossy
      - Pricing: $2,850.00
      - Special Instructions: "Match PMS 485 on label"
      - Current Step: "Files Pending" (waiting for artwork upload)
      - Expected Completion: [auto-calculated from timeline]
    - Job Tickets section:
      - JOB-20260319-001 (link, status badge "Created")
      - View Ticket button
    - Audit Trail section (bottom):
      - "Order created from estimate" - Mar 19, 2026 14:32
    - Actions menu (top right):
      - Edit Order
      - Add File
      - View Estimate
      - View Job Ticket
      - Print Job Ticket
      - Send Confirmation Email
      - Cancel Order

---

#### Journey 2: Pending Address - Convert Without Address, Reminders Sent

**Setup:** Estimate #EST-20260318-015 approved. Customer: PrintHub, no delivery address provided. Sales estimator Mark needs to convert but doesn't have address yet.

**Flow:**

1. Mark opens estimate EST-20260318-015 in GelatoConnect
2. Estimate shows "Approved" status
3. Mark clicks "Convert to Order" (top right)
4. Conversion modal opens as before
5. Mark sees address fields are empty and optional
6. Mark reviews all other data (looks good):
   - Customer: PrintHub
   - Products: 1000x Business Cards, full color
   - Price: $450
   - Special Instructions: "Glossy finish, rounded corners"
7. Mark skips address fields (leaves all blank)
8. Mark leaves "Customer confirmed delivery address" checkbox **unchecked**
9. Mark clicks "Create Order"
10. System validates:
    - Address fields all blank (allowed)
    - Checkbox unchecked (correct for blank address)
    - No duplicates
    - Pricing OK
11. System creates order:
    - Order ID: GC-ORD-20260319-002
    - Status: "**Pending Address**" (NOT "Confirmed")
    - No address stored
    - Estimate linked
    - Special instructions stored
12. Auto-generates job ticket (JOB-20260319-002):
    - Status: "Created"
    - Note in ticket: "PRODUCTION BLOCKED: Delivery address required"
13. System sends **THREE emails automatically:**

    **Email 1 - Order Confirmation (to customer):**
    ```
    Subject: Order Confirmation: GC-ORD-20260319-002 - Please Provide Delivery Address

    Dear PrintHub,

    Thank you for your order! We have the following details:

    Order ID: GC-ORD-20260319-002
    Order Date: March 19, 2026

    Product: 1000x Business Cards, full color
    Quantity: 1000 units
    Total: $450.00

    ⚠️ IMPORTANT: We're missing your delivery address!

    Please reply to this email with the full delivery address, or
    provide it here: [link to portal - Phase 2]

    Once we have your address, we'll begin production.

    Questions? Contact us at support@gelatoconnect.com
    ```

    **Email 2 - Internal Alert (to PSP admin/production manager):**
    ```
    Subject: New Order Pending Address: GC-ORD-20260319-002

    A new order is ready for production but missing delivery address:

    Order ID: GC-ORD-20260319-002
    Customer: PrintHub (printhub@example.com)
    Product: 1000x Business Cards
    Status: Pending Address
    Due: [date]

    Job Ticket: JOB-20260319-002 (Production Blocked)

    Action: Follow up with customer for address, or proceed to production
    if address will be confirmed verbally by deadline.

    View in GelatoConnect: [link]
    ```

    **Email 3 - Stored in Audit Log**

14. Modal closes
15. User redirected to order detail page: /orders/GC-ORD-20260319-002
16. Order detail page shows:
    - Status badge: "**Pending Address**" (orange/yellow)
    - **⚠️ ALERT BANNER** (top, red background):
      ```
      ⚠️ Delivery Address Not Yet Provided
      This order is ready for production but we need the delivery address.
      [Add Address] button
      ```
    - Delivery Address section shows: "Not yet provided"
    - Reminders section: "Customer notified: Mar 19, 2026"
    - Everything else shows normally
    - Job Ticket shows "Created" with note "⚠️ Production Blocked: Address Required"
17. **Day 1 (no change)** - Mark receives email from customer with address
18. Mark opens order detail page, clicks "Add Address" button
19. Modal opens: "Add Delivery Address"
    - Street Address 1: [empty]
    - Street Address 2: [empty]
    - City: [empty]
    - State: [empty]
    - Postal Code: [empty]
    - Country: United States
    - [Save] [Cancel]
20. Mark enters address:
    - Street Address 1: "456 Oak Street"
    - City: "Austin"
    - State: "TX"
    - Postal Code: "78704"
21. Mark clicks "Save"
22. System updates order:
    - Delivery address saved
    - Status changed to "Confirmed" (from "Pending Address")
    - Audit trail: "Address added by Mark (Sales Rep)"
    - Timestamp: Mar 19, 2026 16:45
23. System sends confirmation email to customer:
    ```
    Subject: Your Delivery Address Confirmed - Order GC-ORD-20260319-002

    Thank you! We've confirmed your delivery address:

    Order ID: GC-ORD-20260319-002

    Delivery Address:
    456 Oak Street
    Austin, TX 78704
    USA

    Production will begin shortly.
    ```
24. Job ticket status automatically changes (if not yet in pre-press):
    - Note updated: "Address confirmed; production can proceed"
    - Production team can now begin work
25. Order detail page now shows:
    - Status: "Confirmed" (blue)
    - Address banner gone
    - Delivery Address section populated
    - Audit trail shows address addition

**Alternative: Day 3 - No Response from Customer**

22. System runs automated check at 3 AM UTC (24 hours after order creation)
23. Order still has "Pending Address" status
24. System sends **Reminder Email #2** to customer:
    ```
    Subject: Reminder: Please Provide Delivery Address for Order GC-ORD-20260319-002

    Dear PrintHub,

    We haven't yet received your delivery address for your order.
    Please provide it as soon as possible.

    Order: GC-ORD-20260319-002
    Product: 1000x Business Cards
    Due: March 29, 2026 (10 days away)

    [Add Address Link]

    Reply to this email or use the link above.
    ```
25. System also sends **Internal Alert #2** to PSP:
    ```
    Subject: URGENT: Order GC-ORD-20260319-002 Still Missing Address - 3 Days

    Order pending address for 3 days:
    Customer: PrintHub
    Email: printhub@example.com
    Due: March 29, 2026

    Please contact customer directly or decide if production can proceed.
    ```

**Alternative: Day 5 + Due Date Within 7 Days**

26. Order due March 29 (10 days from order date)
27. System checks 5 days after order creation (Mar 24)
28. Still "Pending Address"
29. Due date is 5 days away (Mar 29)
30. System sends **ESCALATION EMAIL** to PSP admin/production manager:
    ```
    Subject: 🚨 CRITICAL: Address Missing & Order Due Soon - GC-ORD-20260319-002

    URGENT ACTION REQUIRED

    Order: GC-ORD-20260319-002
    Customer: PrintHub
    Due: March 29, 2026 (5 DAYS)
    Address Status: NOT PROVIDED (5 days since order)

    You must either:
    1. Confirm address with customer immediately
    2. Delay production start
    3. Cancel order

    The production timeline is at risk.
    ```

---

### Screen/View Descriptions

#### Screen 1: Estimate Detail Page (Pre-Conversion)

**URL:** `/estimates/EST-20260315-042`

**Layout:**
- Header:
  - Breadcrumb: Sales > Estimates > EST-20260315-042
  - Estimate ID (large): EST-20260315-042
  - Status Badge: "Approved" (green)
  - Top-right buttons: [Print] [Convert to Order] [Archive] [Delete]

- Content Area (2-column):
  - **Left Column (60%):**
    - Card: Customer Summary
      - Name: Acme Packaging
      - Email: acme@example.com
      - Phone: (555) 123-4567
      - Industry: Food Packaging
      - [View Customer Profile]

    - Card: Product Specifications
      - Product: 5000x Labels
      - Specifications:
        - Dimensions: 4" x 6"
        - Material: White Label Stock
        - Colors: 4-color process
        - Finish: Glossy
        - Quantity: 5000 units
      - [View Full Specs]

    - Card: Production Timeline
      - Estimated Days: 10
      - Pre-press: 1-2 days
      - Production: 7-8 days
      - Finishing: 0-1 days

    - Card: Special Instructions
      - "Match PMS 485 on label"
      - [Edit]

  - **Right Column (40%):**
    - Card: Pricing Breakdown
      - Material Cost: $1,200.00
      - Labor Cost: $950.00
      - Overhead: $500.00
      - Profit: $200.00
      - **Total: $2,850.00**
      - Margin: 7.0%
      - [Adjust Pricing]

    - Card: Created By
      - Sarah Chen (Sales Rep)
      - Created: Mar 15, 2026 10:30 AM
      - Last Modified: Mar 18, 2026 4:15 PM (by Finance)
      - [View Edit History]

    - Card: Actions
      - [Approve Estimate] (if not approved)
      - [Decline Estimate]
      - [Send to Customer]
      - [Clone Estimate]

---

#### Screen 2: Conversion Modal

**Trigger:** Click "Convert to Order" on estimate detail page

**Modal Properties:**
- Title: "Convert Estimate to Order"
- Width: 600px
- Scrollable content (if height exceeds viewport)
- Overlay: semi-transparent dark gray

**Content:**
```
╔═══════════════════════════════════════════════════════════════╗
║ Convert Estimate to Order                            [X]       ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║ Estimate: EST-20260315-042                                    ║
║                                                               ║
║ ─────────────────────────────────────────────────────────     ║
║ CUSTOMER (Read-Only)                                          ║
║ ─────────────────────────────────────────────────────────     ║
║ Acme Packaging                                                ║
║ acme@example.com  |  (555) 123-4567                          ║
║                                                               ║
║ ─────────────────────────────────────────────────────────     ║
║ PRODUCTS (Read-Only)                                          ║
║ ─────────────────────────────────────────────────────────     ║
║ 5000x Labels, 4-color offset, glossy                         ║
║ Quantity: 5000 units                                          ║
║                                                               ║
║ ─────────────────────────────────────────────────────────     ║
║ PRICING SUMMARY (Read-Only)                                   ║
║ ─────────────────────────────────────────────────────────     ║
║ Material:     $1,200.00                                       ║
║ Labor:        $950.00                                         ║
║ Overhead:     $500.00                                         ║
║ Profit:       $200.00                                         ║
║ ────────────────────────                                      ║
║ TOTAL:        $2,850.00                                       ║
║                                                               ║
║ ⓘ Pricing created 4 days ago (fresh)                          ║
║                                                               ║
║ ─────────────────────────────────────────────────────────     ║
║ DELIVERY ADDRESS (Optional)                                   ║
║ ─────────────────────────────────────────────────────────     ║
║                                                               ║
║ Street Address Line 1 *                                       ║
║ [                                          ]                  ║
║                                                               ║
║ Street Address Line 2                                         ║
║ [                                          ]                  ║
║                                                               ║
║ City *                                                        ║
║ [                   ]  State * [   ]                          ║
║                                                               ║
║ Postal Code *                                                 ║
║ [            ]                                                ║
║                                                               ║
║ Country                                                       ║
║ [United States               ▼]                              ║
║                                                               ║
║ ─────────────────────────────────────────────────────────     ║
║ SPECIAL INSTRUCTIONS                                          ║
║ ─────────────────────────────────────────────────────────     ║
║ [Match PMS 485 on label                    ]                  ║
║ (500 chars max)                                               ║
║                                                               ║
║ ─────────────────────────────────────────────────────────     ║
║ OPTIONS                                                       ║
║ ─────────────────────────────────────────────────────────     ║
║ ☐ Mark as rush order                                          ║
║ ☐ Customer confirmed delivery address *                       ║
║   (Required if providing an address)                          ║
║                                                               ║
║ ─────────────────────────────────────────────────────────     ║
║                          [Cancel] [Create Order]              ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

**Field Validation Rules:**

| Field | Type | Validation | Error Message |
|-------|------|-----------|---------------|
| Street Address 1 | Text | Max 100 chars; if ANY address field filled, this is required | "Address line 1 is required if providing an address" |
| Street Address 2 | Text | Max 100 chars; optional | N/A |
| City | Text | Max 50 chars; if ANY address field filled, required | "City is required if providing an address" |
| State | Text | Max 50 chars; if ANY address field filled, required | "State is required if providing an address" |
| Postal Code | Text | Max 20 chars; if ANY address field filled, required | "Postal code is required if providing an address" |
| Country | Dropdown | Required if address fields filled | "Country is required if providing an address" |
| Special Instructions | Textarea | Max 500 chars; optional | "Character limit exceeded" |
| Checkbox: Mark as rush | Boolean | Optional | N/A |
| Checkbox: Customer confirmed | Boolean | Must be checked IF any address field is filled | "Please confirm customer has verified the delivery address" |

**Button States:**
- "Create Order" button:
  - Disabled if: ANY address field filled AND "Customer confirmed" checkbox NOT checked
  - Disabled if: ANY address field filled but NOT all required address fields populated
  - Disabled while loading (shows spinner, text changes to "Creating...")
  - Enabled if: All blank address OR all address fields complete AND checkbox checked

**Error Handling:**
- If conversion fails, modal shows error banner: "⚠️ Error creating order: [reason]. Please try again."
- Reason examples:
  - "Customer not found in system"
  - "Pricing validation failed"
  - "Database error; please contact support"
  - Retry button provided

---

#### Screen 3: Order Detail Page (Post-Conversion)

**URL:** `/orders/GC-ORD-20260319-001`

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│ Orders > GC-ORD-20260319-001                       [...]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ GC-ORD-20260319-001                   [Confirmed]  📋 Edit  │
│ Converted from Estimate EST-20260315-042                    │
│                                                             │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ OVERVIEW │ FILES │ PROOFING │ JOB TICKETS │ HISTORY     │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─ ORDER SUMMARY ──────────────────────────────────────┐   │
│ │ Order Date: March 19, 2026                           │   │
│ │ Customer: Acme Packaging                             │   │
│ │ Email: acme@example.com                              │   │
│ │ Phone: (555) 123-4567                                │   │
│ │ Due Date: March 29, 2026 (10 days)                   │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ DELIVERY ADDRESS ────────────────────────────────────┐   │
│ │ 1200 Industrial Blvd                                 │   │
│ │ Chicago, IL 60622, USA                               │   │
│ │ [Edit Address] [Add Instructions]                    │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ PRODUCTS & SPECS ────────────────────────────────────┐   │
│ │ Product: 5000x Labels                                │   │
│ │ Material: White Label Stock                           │   │
│ │ Specs: 4" x 6", 4-color, glossy                       │   │
│ │ Quantity: 5000 units                                 │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ PRICING ─────────────────────────────────────────────┐   │
│ │ Material:          $1,200.00                          │   │
│ │ Labor:             $950.00                            │   │
│ │ Overhead:          $500.00                            │   │
│ │ Profit:            $200.00                            │   │
│ │ ─────────────────                                     │   │
│ │ TOTAL:             $2,850.00                          │   │
│ │                                                       │   │
│ │ [View Estimate Pricing]  [Adjust Pricing]             │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ PRODUCTION STATUS ───────────────────────────────────┐   │
│ │ Current Step: Files Pending 🔵                        │   │
│ │                                                       │   │
│ │ Timeline:                                             │   │
│ │ Created ├─ Files ├─ Pre-press ├─ Proof ├─ Prod ─┤   │   │
│ │   ✓      ⏳        ⭕            ⭕         ⭕          │   │
│ │                                                       │   │
│ │ Expected Completion: March 29, 2026                  │   │
│ │ [View Job Ticket]                                     │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ SPECIAL INSTRUCTIONS ────────────────────────────────┐   │
│ │ Match PMS 485 on label                               │   │
│ │ [Edit]                                                │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ AUDIT TRAIL ─────────────────────────────────────────┐   │
│ │ Mar 19, 14:32 │ Order created from estimate          │   │
│ │               │ Sarah Chen (Sales Rep)                │   │
│ │               │ Estimate: EST-20260315-042            │   │
│ │               │ [View Estimate]                       │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [Archive Order]  [Cancel Order]  [Duplicate Order]         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**"Pending Address" Variant:**
- Top alert banner (red/orange):
  ```
  ⚠️ DELIVERY ADDRESS NOT PROVIDED
  This order is missing a delivery address. Add it now to unblock production.
  [Add Address] [Edit] [Dismiss]
  ```
- Delivery Address section:
  ```
  DELIVERY ADDRESS
  Not yet provided
  Last Reminder Sent: Mar 19, 2026 at 14:32
  [Add Address]
  ```
- Status shown as: "Pending Address" (orange badge)
- Job Ticket status: "⚠️ Production Blocked: Address Required"

---

#### Screen 4: Order List / Dashboard

**URL:** `/orders`

**Filter & Sort Options:**
- Status filter: All, Pending Address, Confirmed, In Production, Complete, Shipped
- Date range: Last 7 days, Last 30 days, Custom
- Search: Order ID, Customer name, Product type
- Sort: Created Date (newest first), Due Date, Customer Name

**Table Columns:**
| Order ID | Customer | Product | Qty | Total | Status | Due Date | Created | Actions |
|----------|----------|---------|-----|-------|--------|----------|---------|---------|
| GC-ORD-20260319-001 | Acme Packaging | 5000x Labels | 5000 | $2,850 | ✓ Confirmed | Mar 29 | Mar 19 | [View] [Edit] [...] |
| GC-ORD-20260319-002 | PrintHub | 1000x Cards | 1000 | $450 | ⚠️ Pending Addr | Mar 29 | Mar 19 | [View] [Add Addr] [...] |

**Top Actions Bar:**
- [Create New Order] button
- [Export to CSV]
- [Print Labels]

---

### Functional Requirements

| Req ID | Requirement | Acceptance Criteria | Priority | Implementation Notes |
|--------|-------------|-------------------|----------|----------------------|
| FR-1.1 | Convert approved estimate to order | Button visible only on approved estimates; modal opens with pre-filled data; order created within 5 seconds; audit trail recorded | P0 | Link estimate.status='Approved' to UI visibility |
| FR-1.2 | Delivery address optional at conversion | If address skipped, order status = "Pending Address"; reminders sent automatically | P0 | Flag: is_address_required = false initially |
| FR-1.3 | Duplicate detection | If estimate already converted, warn user but allow retry with explicit confirmation | P1 | Check estimate.is_converted flag; log duplicate_warning_acknowledged |
| FR-1.4 | Pricing freshness validation | If estimate > 30 days old, show warning in modal; allow user to proceed or regenerate | P1 | Calculate Days = NOW() - estimate.created_at |
| FR-1.5 | Auto-generate job ticket | Triggered within 5 seconds of order creation; copies all specs from estimate | P0 | Background job; queue system with 5sec SLA |
| FR-1.6 | Send confirmation email | Template-based; includes order ID, products, pricing, address (if provided), timeline | P0 | Email service integration; audit log all sends |
| FR-1.7 | Inventory allocation | If product tracked in inventory, reserve qty immediately | P1 | Call inventory module; create reservation record |
| FR-1.8 | Manual order creation | CSR can create order without estimate; customer lookup/create; all required fields must be filled | P1 | No estimate_id required; validate all fields before creation |
| FR-1.9 | Address addition post-conversion | Order can be updated to add address; status changes from "Pending Address" to "Confirmed" | P0 | Allow edit anytime before production complete |
| FR-1.10 | Multi-product estimates | Support estimates with 2+ products; all line items copied to order | P2 | Loop through estimate.line_items[] |
| FR-1.11 | Rush order marking | Checkbox on conversion modal; sets order.is_rush = true; affects production priority | P2 | Propagate to job ticket; use in queue prioritization |
| FR-1.12 | Order status workflow | States: Pending Address, Confirmed, In Production, Complete, Shipped; transitions logged | P0 | Use state machine pattern |
| FR-1.13 | Conversion audit trail | All conversions logged with: timestamp, user ID, estimate ID, order ID | P0 | Create order_conversion_log table |

---

### Data Requirements

#### Entity: Order

```
Table: orders

Fields:
- id (UUID) PK
- order_id (STRING, UNIQUE) [format: GC-ORD-YYYYMMDD-{sequence}]
- estimate_id (UUID, FK) [nullable - for manual orders]
- customer_id (UUID, FK) [required]
- status (ENUM) [Pending Address, Confirmed, In Production, Complete, Shipped] default: 'Pending Address'
- order_date (TIMESTAMP) default: NOW()
- due_date (DATE) [nullable - required for manual orders]
- created_by_user_id (UUID) [user who created order]
- special_instructions (TEXT, max 500 chars)
- is_rush (BOOLEAN) default: false
- is_manual (BOOLEAN) default: false [true if no estimate]
- address_confirmed_by_customer (BOOLEAN) default: false
- total_price_cents (INTEGER) [in cents, immutable snapshot]
- conversion_timestamp (TIMESTAMP) [when estimate converted to order, null if manual]
- created_at (TIMESTAMP) default: NOW()
- updated_at (TIMESTAMP) default: NOW()
- deleted_at (TIMESTAMP) [soft delete support]

Indexes:
- (order_id) UNIQUE
- (customer_id)
- (estimate_id)
- (status, created_at)
- (due_date)
```

#### Entity: OrderLineItem

```
Table: order_line_items

Fields:
- id (UUID) PK
- order_id (UUID, FK)
- product_id (UUID, FK)
- quantity (INTEGER) [required]
- unit_price_cents (INTEGER) [in cents]
- material_cost_cents (INTEGER)
- labor_cost_cents (INTEGER)
- overhead_cost_cents (INTEGER)
- profit_cents (INTEGER)
- specifications (JSONB) [copy of estimate specs]
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

Indexes:
- (order_id)
- (product_id)
```

#### Entity: OrderAddress

```
Table: order_addresses

Fields:
- id (UUID) PK
- order_id (UUID, FK)
- street_address_1 (STRING, max 100)
- street_address_2 (STRING, max 100)
- city (STRING, max 50)
- state_province (STRING, max 50)
- postal_code (STRING, max 20)
- country (STRING, max 50)
- is_primary (BOOLEAN) default: true
- added_date (TIMESTAMP) default: NOW()
- added_by_user_id (UUID)
- is_deleted (BOOLEAN) default: false

Indexes:
- (order_id)
- (is_primary, order_id)
```

#### Entity: OrderConversionLog

```
Table: order_conversion_logs

Fields:
- id (UUID) PK
- order_id (UUID, FK)
- estimate_id (UUID, FK)
- converted_by_user_id (UUID)
- duplicate_warning (BOOLEAN)
- pricing_age_days (INTEGER)
- conversion_timestamp (TIMESTAMP) default: NOW()

Indexes:
- (order_id)
- (estimate_id)
- (converted_by_user_id)
```

#### Entity: OrderAuditTrail

```
Table: order_audit_trails

Fields:
- id (UUID) PK
- order_id (UUID, FK)
- action (ENUM) [created, address_added, edited, status_changed, cancelled]
- changed_by_user_id (UUID)
- field_name (STRING) [e.g., 'address', 'status', 'quantity']
- old_value (TEXT) [JSON serialized if complex]
- new_value (TEXT) [JSON serialized if complex]
- reason (TEXT) [optional - why change was made]
- timestamp (TIMESTAMP) default: NOW()

Indexes:
- (order_id, timestamp)
- (action, timestamp)
```

---

### Edge Cases and Error Handling

| Edge Case | Trigger | System Behavior | User Feedback |
|-----------|---------|-----------------|----------------|
| **Estimate deleted after approval, before conversion** | User tries to convert deleted estimate | Query estimate_id fails; conversion blocked | Error modal: "Estimate no longer available. It may have been deleted." [OK] |
| **Estimate pricing edited after approval** | User sees estimate modified; tries to convert | Modal displays warning in pricing section: "⚠️ Pricing has changed since approval" | Warning banner with "Use Current Pricing Anyway" vs "Regenerate Pricing" buttons |
| **Duplicate conversion detected** | Estimate already has is_converted=true | Modal shows warning: "This estimate was already converted to Order [ID] on [date]" | Warning banner; "View Existing Order" link; "Create New Order Anyway" button requires click |
| **Address fields partially filled** | User fills City but not Street Address 1 | Validation error on form submit | Error message: "All address fields must be filled together or left empty. [Street 1, City, State, Postal] are required." |
| **Customer email invalid** | During confirmation email send | Email service returns 550 bounce | Modal shows warning: "Confirmation email failed to send to [email]. Proceed anyway?" [Retry] [Proceed] [Cancel] |
| **Inventory allocation fails** | Product out of stock | Background job fails silently; order created anyway | Order created successfully; internal alert sent to inventory manager; note in audit trail: "Inventory allocation failed: insufficient stock" |
| **Duplicate order within 30 days** | Similar order for same customer exists | Check on conversion triggers soft warning | Warning banner in modal: "⚠️ Similar order detected: [Order ID] from [date]. Proceed?" User can click "View Similar Order" or "Continue" |
| **User tries to convert estimate twice simultaneously** | Two tabs, same user, same estimate | First conversion succeeds; second gets estimate.is_converted check | Second modal shows: "This estimate is currently being converted. Please wait..." and blocks conversion |
| **Address added but 3 days late** | Customer adds address after production started | System warns user | Banner when opening order: "Address added 3 days after creation. Production timeline may be affected." |
| **Address added after job complete** | Too late; shipping configured | System warns but allows address change | Banner: "Address added after production complete. This affects shipping logistics only." |
| **Manual order missing required fields** | CSR tries to save manual order with blank customer or product | Form validation blocks save | Red error summary at top: "Missing required fields: [Customer, Product Quantity]" |
| **Pricing validation fails (negative numbers, invalid format)** | Manual order pricing entered incorrectly | Backend validation rejects | Error message: "Material cost must be a positive number" |
| **System timeout during conversion** | DB or service unavailable during order creation | Transaction rolled back | Modal error: "Order creation failed due to system error. Please try again." [Retry] [Cancel] |
| **Email list unsubscribe** | Customer marked as unsubscribe but order sent | System checks unsubscribe flag | Email not sent; order created; audit trail note: "Customer unsubscribed; confirmation email skipped" |
| **Conversion within minutes of estimate creation** | User converts fresh estimate (< 1 min old) | No warning; system treats as valid | Order created normally; no pricing freshness warning |
| **Currency mismatch** | Estimate in USD, user's locale is EUR | System displays in order's currency (from estimate) | Order displays prices in estimate's currency; no conversion |
| **Mobile/touch: address form autocomplete conflict** | User types address on mobile, autocomplete interferes | System captures field blur events, not just submit | Form validation on blur; autocomplete suggestions work normally |

---

### State Machine / Status Workflow

```
┌─────────────────┐
│  Order Created  │
│ (Pending Addr)  │
└────────┬────────┘
         │
         ├─ [Address Added / Confirmed] ──┐
         │                                 │
         └─────────────────────────────────┤
                                           │
                                           v
                           ┌──────────────────────────┐
                           │ Confirmed                │
                           │ (Ready for Pre-press)    │
                           └────────┬─────────────────┘
                                    │
                                    v
                           ┌──────────────────────────┐
                           │ In Pre-press             │
                           └────────┬─────────────────┘
                                    │
                                    v
                           ┌──────────────────────────┐
                           │ Awaiting Proof Approval  │
                           └────────┬─────────────────┘
                                    │
                  ┌─────────────────┬─────────────────┐
                  │                 │                 │
                  │                 v                 │
                  │         ┌──────────────────┐      │
                  │         │ Proof Rejected   │      │
                  │         │ (Return to       │      │
                  │         │ Pre-press)       │      │
                  │         └──────┬───────────┘      │
                  │                │                  │
                  │                └──────────────────┤
                  │                                   │
                  │ [Proof Approved]                  │
                  │                                   │
                  v                                   v
         ┌──────────────────────────────────────────────┐
         │ Ready for Production                         │
         └────────┬─────────────────────────────────────┘
                  │
                  v
         ┌──────────────────────────────────────────────┐
         │ In Production                                │
         │ (Status derived from job ticket steps)       │
         └────────┬─────────────────────────────────────┘
                  │
                  v
         ┌──────────────────────────────────────────────┐
         │ Production Complete                          │
         └────────┬─────────────────────────────────────┘
                  │
                  v
         ┌──────────────────────────────────────────────┐
         │ Ready for Shipment                           │
         └────────┬─────────────────────────────────────┘
                  │
                  v
         ┌──────────────────────────────────────────────┐
         │ Shipped                                      │
         └──────────────────────────────────────────────┘

Parallel Status: Can be Cancelled at any point
         Any Status ──[Cancel Order]──> Cancelled (terminal)

Parallel Status: Reprint Chain
         Complete Order ──[Create Reprint]──> New Order (starts from "Confirmed")
```

**Status Definitions:**

| Status | Description | Who Can Trigger | Conditions |
|--------|-------------|-----------------|-----------|
| Pending Address | Order created, address missing | System (on conversion) | No delivery address provided |
| Confirmed | Order ready for production | System (on address add) or User (manual) | Address complete or manual order with all fields |
| In Pre-press | Artwork received, being checked | System (file upload triggers) | File uploaded and pre-flight passed |
| Awaiting Proof Approval | Soft proof generated, sent to customer | System (proof generated) | Pre-press complete |
| Proof Rejected | Customer rejected proof, revisions needed | System (customer feedback) | Customer clicked "Reject" on proof email |
| Ready for Production | All approvals complete, can start production | System (proof approved) | Proof approved |
| In Production | Job being produced | System (job ticket status change) | Production has started on job ticket |
| Production Complete | All production done, ready for finishing | System (all production steps done) | All job ticket steps marked complete |
| Ready for Shipment | Finishing done, ready to ship | System (finishing complete) | All finishing steps done |
| Shipped | Order delivered to customer | User/Integration (logistics module) | Shipment confirmed |
| Cancelled | Order cancelled; no further action | User | User clicked "Cancel" before shipment |

---

### Integration Points

**Inbound (order creation receives data from):**

| Module | Data Received | Format | Frequency |
|--------|---------------|--------|-----------|
| AI Estimator | Estimate data (customer, products, specs, pricing, production steps) | Estimate entity reference | On conversion |
| Customer Module | Customer ID, email, phone | Customer entity link | On conversion |
| Product Catalog | Product specs, material data | Product entity reference | From estimate |
| Pricing Engine | Cost breakdown (material, labor, overhead, profit) | Pricing entity snapshot | From estimate |

**Outbound (order creation triggers in):**

| Module | Data Sent | Format | Trigger | SLA |
|--------|-----------|--------|---------|-----|
| Job Ticketing (PRD 3) | Order data, specs, production steps | Order entity reference | Order created | 5 sec |
| Inventory Management | Product ID, quantity | Reservation request | Order confirmed (has address) | 10 sec |
| Email/Notifications (PRD 5) | Order ID, customer email, products | Email template variables | Order created; address added | 2 sec |
| Audit/Compliance | Order ID, user, timestamp, action | Audit log entry | Every status change | Real-time |
| Customer Portal (Phase 2) | Order summary, file upload link | Order public view | Order created | N/A |
| Logistics Module | Delivery address, timeline | Shipment record | Order complete | N/A |
| Invoicing Module | Order total, line items | Invoice data | Ready for shipment | N/A |
| Analytics/Dashboard | Order metrics (count, revenue, timeline) | Order aggregate | Order created, status changed | Daily batch |

---

## PRD 2: Post-Conversion Order Editing

### Problem Statement

Once an order is converted from an estimate, business reality diverges from the plan. Production reports overruns, customers request quantity changes, shipping costs differ from estimate, and delivery addresses get added late. The system must support editing orders post-conversion while:

- **Preventing production disasters** (e.g., changing quantity mid-production should warn, not silently break)
- **Maintaining cost accuracy** (editing one cost component should not overwrite others)
- **Creating visibility** (finance needs to see all changes before invoicing; production needs to see spec changes)
- **Enabling role-based control** (sales can edit address, finance can edit costs, production cannot edit without approval)
- **Tracking audit trail** (every change must show who, when, before/after, and reason)
- **Recalculating pricing** (changing quantity should auto-adjust labor/overhead costs proportionally)

This addresses Clarke Murphy workshop feedback that orders change constantly in real production, and the system must reflect reality, not an outdated estimate.

### Solution Overview

A post-conversion edit system that:

1. **Restricts editable fields** by role and order status
   - Sales Rep: delivery address, special instructions, customer contact
   - Estimator/Production: quantity, specifications (with warnings if production started)
   - Finance: custom costs, discounts, pricing adjustments
   - Admin: all fields

2. **Provides edit modals** for each field or field group
   - Simple fields (address, instructions) in dedicated modal
   - Quantity change: shows cost impact, asks for reason
   - Specification change: shows which production steps affected, requires approval
   - Custom cost add: itemized form (shipping difference, rush fee, extra finishing)

3. **Auto-recalculates pricing** when quantity changes
   - Material cost scales with quantity
   - Labor cost adjusts (proportional if linear, or fixed costs apply)
   - Overhead scales
   - Profit margin maintained or recalculated based on margin %

4. **Shows complete change history**
   - Before/after values side-by-side
   - Reason for change (dropdown + notes)
   - User who made change
   - Timestamp
   - Approval status (if required)

5. **Enforces approval workflows**
   - Changes before production: immediate
   - Changes during/after production: require production manager approval
   - Changes affecting cost: require finance review before invoicing

### User Stories

#### US 2.1: Edit Delivery Address Post-Conversion

**As a** Sales Representative
**I want to** add or change the delivery address after an order is created
**So that** we can fulfill orders even when customer provides address late

**Acceptance Criteria:**

1. Order detail page has "Edit Address" button (visible if order status is not "Shipped" or "Cancelled")
2. Button click opens modal: "Edit Delivery Address"
3. Modal shows:
   - Current address (if exists) or "Not yet provided"
   - All address fields (street 1/2, city, state, postal, country)
   - Fields pre-filled with current address if exists
   - Reason dropdown (dropdown options: "Customer provided late", "Correction", "Multiple sites", "Returns address", "Other")
   - Notes field (max 200 chars, optional)
4. User edits address fields
5. User selects reason from dropdown
6. User optionally adds note (e.g., "Customer confirmed via phone with Tom")
7. User clicks "Save Address"
8. System validates:
   - All address fields filled (if any address present)
   - Reason selected
9. System updates order:
   - Address fields updated
   - order_address record created (new record, old one soft-deleted/version tracked)
   - Audit trail entry: "Address updated by [user]; reason: [reason]; note: [note]"
10. If order status was "Pending Address", status changes to "Confirmed"
11. Email sent to customer (if address was missing before):
    ```
    Subject: Delivery Address Confirmed - Order [Order ID]

    Your delivery address for Order [ID] is confirmed:
    [full address]

    Production will begin shortly.
    ```
12. System sends internal notification to production manager (if in production):
    ```
    Address updated for Order [ID] (currently in [production step]):
    [new address]
    May affect shipping timeline.
    ```
13. Modal closes; order detail page refreshes; audit trail shows new entry

---

#### US 2.2: Edit Quantity with Auto-Price Recalculation

**As a** Estimator or Production Manager
**I want to** adjust the order quantity and have costs automatically recalculated
**So that** pricing stays accurate if production reports overruns or the customer requests a change

**Acceptance Criteria:**

1. Order detail page shows current quantity prominently
2. On line item, quantity has "Edit" button (pencil icon)
3. Click "Edit" opens modal: "Update Quantity"
4. Modal displays:
   - Product name (read-only): "5000x Labels, 4-color"
   - Current quantity: 5000 (read-only, shown for reference)
   - New quantity field: [________] units (editable, must be positive integer)
   - Quantity change: "+/- X units (±X%)" (auto-calculated as user types)
   - Reason dropdown: "Production overrun", "Underrun", "Customer request", "Quality hold", "Other"
   - Detailed notes field (max 500 chars)
   - **Cost Impact section (auto-calculated):**
     ```
     ORIGINAL PRICING (5000 units):
     Material: $1,200.00
     Labor: $950.00
     Overhead: $500.00
     Profit: $200.00
     TOTAL: $2,850.00

     NEW PRICING (5200 units, +4%):
     Material: $1,248.00 (+$48.00)
     Labor: $988.00 (+$38.00)
     Overhead: $520.00 (+$20.00)
     Profit: $208.00 (+$8.00)
     TOTAL: $2,964.00 (+$114.00)

     ⓘ Costs calculated proportionally; profit margin maintained at 7.0%
     ```
   - Checkbox: "Production manager approval required" (auto-checked if in production)
   - Buttons: "Cancel", "Update Quantity"

5. User changes quantity from 5000 to 5200
6. System calculates cost impact:
   - Change percentage = (5200 - 5000) / 5000 = +4%
   - Material cost scales: 1,200 × 1.04 = 1,248
   - Labor cost scales: 950 × 1.04 = 988
   - Overhead scales: 500 × 1.04 = 520
   - Profit margin maintained: 1,248 + 988 + 520 = 2,756; profit = 2,964 - 2,756 = 208 (maintains 7% margin)
   - Display shows all four values with deltas (e.g., "+$48")
7. User selects reason: "Production overrun"
8. User types note: "QC hold identified 250 units; production running additional 200 to cover with buffer"
9. User (production manager) sees checkbox "Production manager approval required" is pre-checked
10. User clicks "Update Quantity"
11. If production manager approval required:
    - Order status remains "In Production"
    - Update created in "pending approval" state
    - Finance manager notified: "Quantity change pending approval on Order [ID]: 5000 → 5200 units"
    - Approval modal sent to finance/production manager
    - [Approve] [Reject + Comment]
    - Once approved:
      - Order quantity updated
      - Costs updated in order record
      - New line item pricing snapshot stored
      - Audit trail: "Quantity updated from 5000 to 5200; approved by [user]"
12. If no approval needed:
    - Order quantity updated immediately
    - Costs updated
    - Audit trail: "Quantity updated from 5000 to 5200 units by [user]; reason: Production overrun"
    - Notification sent to finance: "Order [ID] updated; new total: $2,964 (was $2,850)"
13. Modal closes; order detail page refreshes
14. Line item now shows: "5200 units ($2,964.00)" (updated)
15. Timeline shows change: "Mar 19 14:45 | Quantity updated 5000 → 5200 | [View Details]"

**Edge Cases:**

- **Quantity reduced below minimum:** If customer requests reduction to 100 units but production has already started or material is cut, system warns: "Reducing quantity to 100 units; this may create waste. Confirm?"
- **Quantity increased >50%:** System warns: "Significant increase (from 5000 to 7500 = +50%). This may affect timeline. Finance will review."
- **Quantity changed after production complete:** System warns: "Production already complete. Quantity change affects invoicing and inventory only, not production."

---

#### US 2.3: Add Custom Costs (Shipping Difference, Rush Fee, Extra Finishing)

**As a** Sales Representative or Finance Manager
**I want to** add unexpected costs to an order (shipping difference, rush fee, extra finishing work)
**So that** the final invoice accurately reflects all actual expenses

**Acceptance Criteria:**

1. Order detail page has "Edit Pricing" or "Add Costs" button
2. Click opens modal: "Manage Order Costs"
3. Modal displays:
   - Current pricing summary (read-only):
     ```
     Line Items Total: $2,850.00
     Custom Costs:     $0.00
     Subtotal:         $2,850.00
     Tax:              $228.00 (8%)
     Total:            $3,078.00
     ```
   - Section: "Add Custom Cost"
     - Cost name (dropdown): "Shipping Difference", "Rush Fee", "Extra Finishing", "Other"
     - Amount (text field, currency): $[_____]
     - Description (text field, max 100 chars): "Actual shipping was $450 vs $250 estimated"
     - Internal note (text field, max 200 chars): "Customer requested overnight delivery"
     - Checkbox: "Pass through to customer (add to invoice)" (default: checked)
     - Checkbox: "Chargeable to customer" (default: checked if "Pass through" checked)
     - Button: "Add Cost"
   - List of existing custom costs (if any):
     ```
     [X] Rush Fee - $100.00
         Description: Customer requested priority production
         Added: Mar 19, 14:32 by Sarah Chen
         [Edit] [Remove]
     ```

4. User selects from dropdown: "Shipping Difference"
5. User enters amount: $200
6. User enters description: "UPS upgraded shipping from ground to 2-day"
7. User checks "Pass through to customer"
8. User checks "Chargeable to customer"
9. User clicks "Add Cost"
10. System validates:
    - Amount is positive number
    - Name is selected
    - Description provided (required)
11. System creates custom cost record:
    - order_id linked
    - cost_type: "shipping_difference"
    - amount: 20000 (in cents)
    - description: "UPS upgraded shipping from ground to 2-day"
    - internal_note: null
    - created_by_user_id: [user]
    - timestamp: now()
    - is_customer_chargeable: true
    - is_visible_on_invoice: true
12. Order totals recalculated:
    - Line Items Total: $2,850.00
    - Custom Costs: $200.00
    - Subtotal: $3,050.00
    - Tax (8%): $244.00
    - Total: $3,294.00
13. Cost displayed in list under "Add Custom Cost" section
14. Audit trail entry: "Custom cost added: Shipping Difference, $200 by Sarah Chen"
15. Modal remains open (user can add more costs)
16. User clicks "Done" or clicks outside modal
17. Modal closes; order detail page refreshes
18. Pricing section now shows:
    ```
    ORIGINAL PRICING:
    Material: $1,200
    Labor: $950
    Overhead: $500
    Profit: $200
    Line Items: $2,850.00

    CUSTOM COSTS:
    Shipping Difference: +$200.00

    TOTAL: $3,050.00
    ```
19. If "Chargeable to customer" is unchecked, note: "Internal cost (not invoiced to customer)" shown

---

#### US 2.4: Edit Special Instructions

**As a** Sales Representative or Production Manager
**I want to** add or modify special instructions for an order
**So that** production and finishing teams have the latest requirements

**Acceptance Criteria:**

1. Order detail page shows special instructions section
2. "Edit" button (pencil icon) on special instructions
3. Click opens modal: "Edit Special Instructions"
4. Modal displays:
   - Current instructions (if any): pre-filled in textarea
   - Textarea (max 500 chars): [pre-filled text]
   - Character count: "234/500 chars"
   - Reason dropdown: "Clarification from customer", "Production feedback", "QC requirement", "Other"
   - Notes field (max 200 chars): optional context for the change
   - Buttons: "Cancel", "Save Instructions"
5. User updates instructions:
   - Old: "Match PMS 485 on label"
   - New: "Match PMS 485 on label - customer confirmed via email Mar 19. Use Pantone reference."
6. User selects reason: "Clarification from customer"
7. User types note: "Customer sent email with Pantone reference guide"
8. User clicks "Save Instructions"
9. System validates:
   - Max 500 chars
10. System updates order:
    - special_instructions field updated
    - Audit trail entry: "Special instructions updated by [user]; reason: Clarification from customer"
    - Old value stored: "Match PMS 485 on label"
    - New value stored: "Match PMS 485 on label - customer confirmed via email Mar 19..."
    - Change notification sent to production team (if in production):
      ```
      Special instructions updated on Order [ID]:
      "Match PMS 485 on label - customer confirmed via email Mar 19..."
      ```
11. Modal closes
12. Special instructions section updated on order detail page
13. Audit trail shows change with before/after link: "[View Details]"

---

#### US 2.5: View Complete Edit History with Before/After Comparison

**As a** Finance Manager or Production Manager
**I want to** see a complete audit trail of all changes to an order
**So that** I can understand what changed, when, and why, and compare to original estimate

**Acceptance Criteria:**

1. Order detail page has "History" or "Audit Trail" tab
2. Tab displays timeline of all changes:
   ```
   Mar 19, 14:45 - Quantity Updated
   Sarah Chen (Production Manager)
   Changed: Quantity
   Reason: Production overrun

   [Before] 5000 units → [After] 5200 units
   Impact: Cost increased $114.00 (from $2,850 to $2,964)
   Note: "QC hold identified 250 units; production running additional 200..."

   [View Detailed Comparison]
   ```

   ```
   Mar 19, 14:32 - Order Created
   Sarah Chen (Sales Rep)
   Converted from Estimate EST-20260315-042
   Status: Pending Address → Confirmed
   Address: 1200 Industrial Blvd, Chicago, IL 60622

   [View Estimate]
   ```

3. Click "[View Detailed Comparison]" opens side-by-side view:
   ```
   ┌────────────────────────┬────────────────────────┐
   │ BEFORE CHANGE          │ AFTER CHANGE           │
   ├────────────────────────┼────────────────────────┤
   │ Quantity: 5000 units   │ Quantity: 5200 units   │
   │ Material: $1,200.00    │ Material: $1,248.00    │
   │ Labor: $950.00         │ Labor: $988.00         │
   │ Overhead: $500.00      │ Overhead: $520.00      │
   │ Profit: $200.00        │ Profit: $208.00        │
   │ Total: $2,850.00       │ Total: $2,964.00       │
   │                        │                        │
   │ Special Instructions:  │ Special Instructions:  │
   │ "Match PMS 485..."     │ "Match PMS 485..."     │
   └────────────────────────┴────────────────────────┘
   ```

4. Click on any line item in audit trail shows:
   - What changed (field name)
   - Old value (in full detail)
   - New value (in full detail)
   - Who made change (user name, role)
   - When change was made (timestamp)
   - Why (reason dropdown value)
   - Additional notes
   - Any approvals required (if applicable)

5. Filtering options:
   - Type: "All", "Quantity Changes", "Address Changes", "Cost Changes", "Instruction Changes"
   - Date range: last week, last month, all time
   - User: filter by who made changes

6. Export button: "Export Audit Trail to PDF" or CSV

---

#### US 2.6: Role-Based Edit Permissions

**As a** PSP Admin
**I want to** control which roles can edit which order fields
**So that** we maintain data integrity and don't allow unauthorized changes

**Acceptance Criteria:**

| Field | Sales Rep | Estimator | Production Manager | Finance | Admin | Notes |
|-------|-----------|-----------|-------------------|---------|-------|-------|
| Delivery Address | ✓ | ✗ | ✗ | ✗ | ✓ | Sales owns customer relationship |
| Quantity | ✗ | ✓ | ✓ if <20% | ✗ | ✓ | Production & estimator; big changes flagged |
| Specification | ✗ | ✓ | ✗ | ✗ | ✓ | Estimator only; affects production |
| Special Instructions | ✓ | ✓ | ✓ | ✗ | ✓ | Shared between sales and production |
| Custom Costs | ✗ | ✓ | ✗ | ✓ | ✓ | Estimator sets; finance reviews |
| Discount | ✗ | ✗ | ✗ | ✓ | ✓ | Finance only |
| Status (manual change) | ✗ | ✗ | ✓ | ✗ | ✓ | Production manager only |

1. System checks user role before rendering "Edit" button
2. If user lacks permission:
   - Button disabled or hidden
   - Hover tooltip: "Only [role] can edit this field"
3. If user tries to edit via API (direct call), permission check enforced:
   - Error: 403 Forbidden - "User role [role] cannot edit [field]"
4. Admin settings page allows PSP to configure permissions per role
5. Edit permission matrix stored in config; checked on every edit request

---

### Detailed User Journeys

#### Journey 1: Sales Rep Adds Address 3 Days After Conversion

**Setup:** Order GC-ORD-20260319-001 created without address (status: Pending Address). Now (Mar 22, 3 days later), customer has provided address.

**Flow:**

1. Sales rep Sarah opens GelatoConnect
2. Sarah navigates to order GC-ORD-20260319-001
3. Order detail page shows:
   - Status badge: "⚠️ Pending Address" (orange)
   - Alert banner: "Delivery Address Not Yet Provided [Add Address] [Edit] [Dismiss]"
   - Delivery Address section: "Not yet provided | Last reminder: Mar 19 at 14:32"
4. Sarah clicks "Add Address" button
5. Modal opens: "Edit Delivery Address"
   - Current address section: "Not yet provided"
   - Address fields (all empty):
     - Street Address 1: [_________]
     - Street Address 2: [_________]
     - City: [_________]
     - State: [_________]
     - Postal Code: [_________]
     - Country: United States ▼
   - Reason dropdown: [Select reason ▼]
   - Notes field: [_________]
6. Sarah types address (customer provided via email):
   - Street Address 1: "456 Industrial Park Drive"
   - City: "Denver"
   - State: "CO"
   - Postal Code: "80202"
7. Sarah clicks "Reason" dropdown:
   - Options: "Customer provided late", "Correction", "Multiple sites", "Returns address", "Other"
   - Sarah selects: "Customer provided late"
8. Sarah types note: "Customer sent address via email Mar 22. Confirmed correct."
9. Sarah clicks "Save Address"
10. System validates:
    - All address fields complete ✓
    - Reason selected ✓
11. System updates order:
    - address fields updated in order_addresses table (new record created)
    - status changed from "Pending Address" to "Confirmed"
    - audit_trail entry created:
      - action: "address_added"
      - field: "address"
      - old_value: null
      - new_value: "456 Industrial Park Drive, Denver, CO 80202, USA"
      - reason: "Customer provided late"
      - internal_note: "Customer sent address via email Mar 22. Confirmed correct."
      - timestamp: Mar 22, 09:15:00 UTC
      - user_id: Sarah's ID
12. System sends TWO notifications:
    - **Customer email:**
      ```
      Subject: Delivery Address Confirmed - Order GC-ORD-20260319-001

      Dear Acme Packaging,

      Thank you! We've confirmed your delivery address for Order GC-ORD-20260319-001:

      456 Industrial Park Drive
      Denver, CO 80202
      USA

      Production will begin shortly. We'll keep you updated as your order progresses.

      Questions? Contact us at support@gelatoconnect.com
      ```

    - **Internal notification (to production manager):**
      ```
      Address Updated: Order GC-ORD-20260319-001
      New Address: 456 Industrial Park Drive, Denver, CO 80202, USA
      Updated: Mar 22, 09:15
      Status: Confirmed

      This order was pending address for 3 days. Production timeline unaffected.
      ```

13. Modal closes
14. Order detail page refreshes
15. Alert banner gone
16. Status badge now: "✓ Confirmed" (blue)
17. Delivery Address section shows:
    ```
    DELIVERY ADDRESS
    456 Industrial Park Drive
    Denver, CO 80202, USA
    Added: Mar 22, 2026 at 09:15
    [Edit Address]
    ```
18. Audit Trail tab shows new entry:
    ```
    Mar 22, 09:15 - Address Added
    Sarah Chen (Sales Rep)
    Changed: Delivery Address
    Reason: Customer provided late

    [Before] Not provided → [After] 456 Industrial Park Drive, Denver, CO 80202, USA
    Note: "Customer sent address via email Mar 22. Confirmed correct."

    Impact: Order status changed from "Pending Address" to "Confirmed"
    ```

---

#### Journey 2: Production Reports Overrun, Quantity Updated

**Setup:** Order GC-ORD-20260319-001 is in production. Production manager reports that quality control hold identified 250 defects, requiring additional 200 units to account for buffer. Current: 5000 units → should be 5200.

**Flow:**

1. Production manager Tom opens GelatoConnect
2. Tom navigates to order detail page
3. Order status shows: "In Production" (Step: "Production - Printing")
4. Tom views line item: "5000x Labels | Qty: 5000 units | $2,850.00"
5. Tom clicks pencil icon (edit quantity)
6. Modal opens: "Update Quantity"
   - Product: "5000x Labels, 4-color offset"
   - Current Quantity: 5000 (read-only)
   - New Quantity field: [5000]  (pre-filled with current)
   - Quantity Change: "0 units (0%)" (updates as Tom types)
   - Reason dropdown: (not yet selected)
   - Detailed Notes: [_________]
   - Cost Impact section (currently shows no change, will update as Tom types):
     ```
     ORIGINAL PRICING (5000 units):
     Material: $1,200.00
     Labor: $950.00
     Overhead: $500.00
     Profit: $200.00
     TOTAL: $2,850.00

     NEW PRICING (5000 units, 0%):
     Material: $1,200.00
     Labor: $950.00
     Overhead: $500.00
     Profit: $200.00
     TOTAL: $2,850.00
     ```
   - Checkbox: "☑ Production manager approval required" (pre-checked, disabled because Tom IS a prod manager)

7. Tom clears the "New Quantity" field and types: 5200
8. As Tom types, system auto-calculates:
   - Change: +200 units (+4%)
   - Material: $1,248.00 (+$48.00)
   - Labor: $988.00 (+$38.00)
   - Overhead: $520.00 (+$20.00)
   - Profit: $208.00 (+$8.00)
   - New Total: $2,964.00 (+$114.00)
   - Modal updates in real-time with these values
9. Tom clicks Reason dropdown:
   - Options: "Production overrun", "Underrun", "Customer request", "Quality hold", "Other"
   - Tom selects: "Production overrun"
10. Tom types in Detailed Notes:
    ```
    QC identified ~250 units with edge defects during initial print run.
    Running additional 200 units to ensure we have buffer for finishing/trim.
    Material is available; estimated extra production time: 4 hours on current press.
    ```
11. Tom sees checkbox "Production manager approval required" is still checked, but Tom is the production manager, so system notes: "As production manager, you can approve this change immediately."
12. Tom clicks "Update Quantity"
13. System validates:
    - New quantity 5200 is positive ✓
    - Reason selected ✓
    - Note provided ✓
    - No approval needed (Tom is production manager) ✓
14. System updates order:
    - order_line_items.quantity = 5200
    - order_line_items.material_cost_cents = 124800 (in cents)
    - order_line_items.labor_cost_cents = 98800
    - order_line_items.overhead_cost_cents = 52000
    - order_line_items.profit_cents = 20800
    - order.total_price_cents = 296400
    - audit_trail entry created:
      - action: "quantity_updated"
      - field: "quantity"
      - old_value: "5000"
      - new_value: "5200"
      - changed_by_user_id: Tom's ID
      - reason: "Production overrun"
      - internal_note: "QC identified ~250 units..."
      - timestamp: Mar 22, 14:30 UTC
15. System sends THREE notifications:

    **To Finance Manager:**
    ```
    Subject: Order Updated - Quantity Change: GC-ORD-20260319-001

    Quantity updated on Order GC-ORD-20260319-001:
    5000 units → 5200 units (+4%)

    Reason: Production overrun

    Cost Impact:
    Original Total: $2,850.00
    New Total: $2,964.00
    Delta: +$114.00

    Changed by: Tom Johnson (Production Manager)
    Timestamp: Mar 22, 14:30

    View order: [link]
    ```

    **To Sales Manager (internal alert):**
    ```
    Quantity increased on Order GC-ORD-20260319-001
    Customer: Acme Packaging
    Change: 5000 → 5200 units
    Reason: Production overrun - QC hold
    Updated cost: $2,964 (was $2,850)

    This is a material change; ensure customer is informed if billable.
    ```

    **To Customer (if applicable):**
    - Note: Depends on company policy; typically, production overruns for QC are absorbed and not passed to customer
    - If passes through, email notification sent

16. Modal closes
17. Order detail page refreshes
18. Line item now shows:
    ```
    5200x Labels | Qty: 5200 units | $2,964.00
    Change: +200 units from estimate
    ```
19. Pricing section updated:
    ```
    ORIGINAL PRICING:
    Material: $1,200
    Labor: $950
    Overhead: $500
    Profit: $200
    Line Items: $2,850.00

    PRODUCTION UPDATE:
    Quantity increased: 5000 → 5200 (+4%)
    Adjusted Line Items: $2,964.00 (delta: +$114)

    TOTAL: $2,964.00
    ```
20. Audit Trail tab shows new entry:
    ```
    Mar 22, 14:30 - Quantity Updated
    Tom Johnson (Production Manager)
    Changed: Quantity
    Reason: Production overrun

    [Before] 5000 units → [After] 5200 units
    Impact: Cost increased $114.00 (from $2,850 to $2,964)

    Note: "QC identified ~250 units with edge defects during initial print run. Running additional 200 units..."

    [View Detailed Comparison]
    ```

---

## PRD 2.1: Reprints and Remakes

*[Continuing in next section due to length...]*

---

## PRD 3: Job Ticketing (Section 1)

### Problem Statement

When an order is created, production needs a detailed work instruction document (job ticket). This ticket must:

- **Drive all production decisions** (specs, quantities, timeline, special instructions)
- **Be configurable per PSP** (every shop has different production steps; one shop does digital only, another does offset + digital; this is a core market differentiator)
- **Support digital and physical** (operators see tickets on station displays AND can print PDFs with barcodes for physical routing)
- **Track progress** (status updates at each step feed back to order)
- **Generate in seconds** (within 5 seconds of order creation, fully parameterized from order specs)
- **Be versioned and audited** (if spec changes, ticket versioning shows what changed)

The system MUST support configurable production step workflows. This is essential for market fit—different PSPs have radically different production processes (e.g., a T-shirt PSP might have: Design → Print → Cure → Pack; a label PSP: Pre-press → Plate → Print → Finish → Pack). Clarke Murphy's feedback emphasized that every shop has unique steps, and hard-coding a single workflow kills the product.

### Solution Overview

A job ticketing system that:

1. **Auto-generates from order** (within 5 seconds, fully parameterized)
   - Copies order ID, customer, delivery address, due date
   - Copies product specs, quantity, special instructions
   - Derives production steps from PSP configuration (customizable per shop)
   - Sets initial status: "Created"

2. **Provides configurable production steps**
   - PSP admin defines their production workflow in settings
   - System stores steps as: `[{name: "Pre-press", required: true, order: 1}, {name: "Printing", order: 2}, ...]`
   - AI Estimator suggests steps based on product type; PSP can override in estimate
   - Job ticket includes estimate's custom production steps if provided
   - Steps can be:
     - **Sequential** (step N must complete before step N+1 can start)
     - **Parallel** (multiple steps can run concurrently)
     - **Optional** (step can be skipped with reason)

3. **Supports digital and physical display**
   - **Digital:** Full-featured ticket on station view (with real-time updates, QR code for quick access)
   - **Physical:** Printable PDF with barcode/QR code, high-contrast text, operator-friendly layout
   - Barcode links to digital ticket when scanned by station operator

4. **Tracks step-level special instructions**
   - Advanced feature: Estimator can add instructions per step during estimate creation
   - Example: "Pre-press: ensure grain direction is portrait" (shows only at Pre-press step)
   - Improves clarity; production team doesn't get overwhelmed with irrelevant instructions

5. **Versions and audits all changes**
   - If spec changes after ticket created, new version generated
   - Version history shows: what changed, when, who changed it
   - Old versions archived; operators see current version by default
   - Link to view all versions

### User Stories

#### US 3.1: Auto-Generate Job Ticket from Order

**As a** System
**I want to** auto-generate a job ticket within 5 seconds of order creation
**So that** production team has work instructions immediately and timeline is not delayed

**Acceptance Criteria:**

1. When order is created (from conversion or manual), background job queued: "GenerateJobTicket"
   - Job includes order ID
   - Priority: high
   - Timeout: 10 seconds (must complete or retry)
   - Max retries: 3

2. Background job executes:
   - Query order record: GC-ORD-20260319-001
   - Query order line items (products, quantities, specs)
   - Query PSP production step configuration (from organization settings)
   - If order linked to estimate, query estimate's custom production steps (if any)
   - Create job ticket record (see data schema below)
   - Generate job ticket PDF (async, background task)
   - Return job ticket ID to API

3. Job ticket record created with:
   - job_id: GC-JOB-20260319-001 (format: GC-JOB-{date}-{sequence})
   - order_id: GC-ORD-20260319-001
   - customer_id: [from order]
   - product_name: "5000x Labels"
   - quantity: 5000
   - material: "White Label Stock"
   - dimensions: "4\" x 6\""
   - colors: "4-color process"
   - finish: "Glossy"
   - special_instructions: "Match PMS 485 on label"
   - status: "Created"
   - current_step: "Pending Files" (first step in workflow, or null)
   - steps: [array of step records, see below]
   - due_date: [from order]
   - created_at: [timestamp]
   - created_by_user_id: [system or user who created order]
   - version: 1

4. Production steps array generated:
   - Loop through PSP's configured production steps
   - For each step, create step record:
     ```
     {
       step_id: uuid,
       job_id: job_id,
       step_name: "Pre-press",
       step_order: 1,
       is_optional: false,
       is_parallel: false,
       status: "Pending" (initial),
       assigned_to: null,
       started_at: null,
       completed_at: null,
       duration_minutes: null,
       notes: null,
       special_instructions: "Match PMS 485 on label" (if any from estimate),
       created_at: [timestamp]
     }
     ```

5. Initial status set based on first step:
   - If first step is "Pending Files" or "Awaiting Artwork", set ticket status to "Pending Files"
   - Otherwise, set to "Created" (ready for next step, no blockers)

6. Response sent to order creation API:
   - Status: 200 OK
   - Data: { job_id: "GC-JOB-20260319-001", status: "Created", steps: [...] }

7. Order detail page updated:
   - Job Tickets section shows: "GC-JOB-20260319-001 (Created)"
   - Link to view ticket

8. If job ticket generation fails:
   - Retry background job up to 3 times (exponential backoff: 10s, 30s, 60s)
   - After 3 retries, create alert: "Job ticket generation failed for Order [ID]; manual intervention needed"
   - Send notification to PSP admin
   - Order creation succeeds (not blocked), but production can't start until manual ticket created

---

#### US 3.2: Configure Custom Production Steps

**As a** PSP Admin
**I want to** configure the production steps for my shop
**So that** job tickets match my actual production workflow, not a one-size-fits-all default

**Acceptance Criteria:**

1. Navigation: Settings > Production > Production Steps (or similar)
2. Current page shows:
   - "Default Production Steps" section
   - Table of steps:
     ```
     Order | Step Name | Required? | Parallel? | Actions
     ─────────────────────────────────────────────────────────
     1     | Pre-press | Yes       | No        | [Edit] [Delete]
     2     | Printing  | Yes       | No        | [Edit] [Delete]
     3     | Finishing | Yes       | No        | [Edit] [Delete]
     4     | Pack      | Yes       | No        | [Edit] [Delete]
     ```
   - Button: "[Add Step]" at bottom
3. Click "[Add Step]" opens form:
   - Step name (text): [_______] (max 50 chars, e.g., "Die Cutting", "Foiling", "QC Inspection")
   - Required? (checkbox): ☐ (checked = all jobs must include this step)
   - Parallel? (checkbox): ☐ (checked = can run concurrently with other steps)
   - Estimated duration (optional): [__] minutes (for timeline planning)
   - Instructions template (optional): [_________] (markdown field)
   - Button: "[Save Step]"
4. PSP Admin creates new step: "Foiling"
   - Step name: "Foiling"
   - Required: checked (all jobs need this)
   - Parallel: unchecked (must run after printing)
   - Duration: 120 minutes
   - Instructions: "Run through foil press; ensure registration is tight; test on scrap first"
5. Click "[Save Step]"
6. System inserts step into production_steps table:
   - psp_id: [PSP's org ID]
   - step_name: "Foiling"
   - step_order: 5 (calculated automatically, after last existing step)
   - is_required: true
   - is_parallel: false
   - estimated_duration_minutes: 120
   - instructions_template: "Run through foil press..."
   - created_by_user_id: admin ID
   - created_at: [timestamp]
7. Step added to table at bottom
8. Drag-to-reorder handles on left allow PSP to change step order
9. PSP drags "Foiling" step up to position 3 (between "Printing" and "Finishing")
10. System updates step_order values for affected steps:
    - Pre-press: 1
    - Printing: 2
    - Foiling: 3 (moved from 5)
    - Finishing: 4 (was 3)
    - Pack: 5 (was 4)
11. Save button at page bottom: "[Save Changes]"
12. Click "[Save Changes]"
13. Confirmation: "Production steps updated. All new jobs will use the updated workflow."
14. From now on, new job tickets auto-include "Foiling" step in position 3
15. Existing job tickets unaffected (version 1 keeps old steps)

**Additional Features:**

- **Step dependencies:** Can mark "step X must complete before step Y can start" (e.g., "Proof Approved must complete before Production can start")
- **Conditional steps:** "If product is digital-only, skip Printing step" (advanced)
- **Step templates:** Save and reuse common step workflows (e.g., "Offset Workflow", "Digital Workflow")

#### US 3.3: Viewing and Filtering Job Tickets

**As a** Production Manager
**I want to** view all job tickets for my PSP with filters and search
**So that** I can find specific orders and track overall production status

**Acceptance Criteria:**

1. Navigation: Orders > Job Tickets (or Production > Jobs)
2. Page shows:
   - Filters (left sidebar or top bar):
     - Status: All, Created, Pending Files, Pre-press, In Production, Complete, Ready to Ship
     - Date range: Today, This Week, This Month, Custom
     - Assigned to: [Dropdown of operators]
     - Priority: All, Rush, Normal
   - Search bar: "Search by Order ID, Customer, Product..."
   - Sort: "Created (newest)", "Due Date (soonest)", "Status", "Customer"
3. Job ticket table displays:
   ```
   Job ID | Customer | Product | Qty | Due Date | Current Step | Assigned | Status
   ────────────────────────────────────────────────────────────────────────────
   JOB-001 | Acme | 5000x Labels | 5000 | Mar 29 | Pre-press | Tom | ✓ On Track
   JOB-002 | Print Hub | 1000x Cards | 1000 | Mar 29 | Created | — | ⚠ Pending Files
   ```
4. Click on job ID opens job ticket detail page
5. Filters persist in session (when user leaves and returns, filters still active)
6. "Bulk actions" available:
   - Select multiple tickets
   - Assign to operator
   - Change priority
   - Print labels

---

#### US 3.4: Print Job Ticket as PDF

**As a** Production Operator
**I want to** print a job ticket to paper to carry through the shop
**So that** I can reference specs and instructions at the production station

**Acceptance Criteria:**

1. Job ticket detail page has "[Print PDF]" button (top right)
2. Click "[Print PDF]" generates PDF with:
   - Header section:
     ```
     ┌────────────────────────────────────┐
     │ JOB TICKET                         │
     │ Job ID: GC-JOB-20260319-001       │
     │ Order: GC-ORD-20260319-001         │
     │ Customer: Acme Packaging           │
     │ Created: Mar 19, 2026 | Due: Mar 29│
     └────────────────────────────────────┘

     [QR CODE] ← Links to digital ticket
     ```
   - Product specifications (large, clear text):
     ```
     PRODUCT
     5000x Labels

     MATERIAL: White Label Stock
     DIMENSIONS: 4" x 6"
     COLORS: 4-color process
     FINISH: Glossy
     QUANTITY: 5000 units
     ```
   - Production steps (each on own line):
     ```
     ☐ Pre-press
     ☐ Printing
     ☐ Finishing
     ☐ Pack

     (Operators check off as they complete)
     ```
   - Special instructions (prominently):
     ```
     SPECIAL INSTRUCTIONS
     ════════════════════════════════════
     Match PMS 485 on label
     ════════════════════════════════════
     ```
   - Barcode at bottom (encodes job ID; scannable)
   - Page size: Letter or A4 (configurable by PSP)
   - High contrast, operator-friendly font

3. PDF generated within 3 seconds
4. Auto-opens print dialog (or downloads to local computer)
5. Operator can print on standard office printer
6. If step-level instructions exist, they appear under each step:
   ```
   ☐ Pre-press
     Special Instructions:
     "Ensure grain direction is portrait"
   ```

---

#### US 3.5: Create Manual Job Ticket (Walk-in/Phone Order)

**As a** Customer Service Representative
**I want to** manually create a job ticket when there's no order (walk-in customer, verbal order)
**So that** production can begin even if order entry is delayed

**Acceptance Criteria:**

1. From job ticket list, button "[Create Manual Job Ticket]"
2. Opens form: "Create Manual Job Ticket"
3. Form sections:
   - **Customer:**
     - Lookup/create customer (same as manual order, see PRD 1)
   - **Order Linking (optional):**
     - Search existing order: [_______] (autocomplete)
     - Or radio button: "No linked order" (walk-in customer, no advance order)
   - **Product & Specs:**
     - Product type (dropdown)
     - Quantity: [_____]
     - Material: [_____]
     - Dimensions: [_____]
     - Colors/finish: [_____]
   - **Timeline:**
     - Due date (required): [_____]
     - Priority: [Normal / Rush]
   - **Special Instructions:**
     - [_____] (max 500 chars)
   - **Production Steps:**
     - Auto-populate from PSP default workflow
     - Option to customize steps for this job
   - **Buttons:** "[Cancel]" "[Create Ticket]"

4. CSR fills in details
5. Clicks "[Create Ticket]"
6. System validates:
   - Customer provided
   - Product and quantity provided
   - Due date provided
7. System creates job ticket:
   - job_id auto-generated
   - order_id: null (no linked order)
   - is_manual: true
   - All other fields from form
   - status: "Created"
8. If order linked, order audit trail updated: "Manual job ticket created: [ticket ID]"
9. Confirmation page shows ticket ID and "[Print Ticket]" link

---

#### US 3.6: Track Job Ticket Status Changes

**As a** Production Manager
**I want to** update job ticket status as it progresses through production steps
**So that** the order detail page and customer notifications reflect real progress

**Acceptance Criteria:**

1. Job ticket detail page shows:
   - Current step: "Printing" (highlighted, large)
   - Step progress bar:
     ```
     ✓ Pre-press → ⏳ Printing → ○ Finishing → ○ Pack → ○ Complete
     ```
   - Each step shows:
     - Step name
     - Status: Pending, In Progress, Complete
     - Assigned to: [Operator name] or [Unassigned]
     - Started: [timestamp] (if started)
     - Completed: [timestamp] (if completed)
     - Duration: [X hours Y minutes] (if completed)
     - Action buttons: "[Start]" "[Complete]" (context-dependent)

2. Production manager clicks "[Start]" on "Printing" step
3. System updates step:
   - status: "In Progress"
   - started_at: now()
   - assigned_to: [current user]
   - Timestamp displayed: "Started: Mar 19, 2026 at 14:32"
4. Later, operator clicks "[Complete]" on "Printing" step
5. System updates:
   - status: "Complete"
   - completed_at: now()
   - duration_minutes: calculated (completed_at - started_at)
   - Next step status changed to "Pending" (if sequential workflow)
   - If all sequential steps complete, job ticket status → "Complete"

6. Order detail page updates automatically:
   - Job Ticket section shows: "GC-JOB-20260319-001 (Printing)" with progress bar
   - Status: "In Production" (derived from job ticket)
   - Timeline updated: shows current step and estimated remaining time

7. Notifications sent (see PRD 5):
   - When step starts: notification to PSP
   - When step completes: notification to PSP
   - When job complete: notification to customer

---

#### US 3.7: Edit Job Ticket After Creation (Spec Changes)

**As a** Production Manager
**I want to** edit a job ticket if customer changes specs or provides new information
**So that** production has the correct requirements

**Acceptance Criteria:**

1. Job ticket detail page has "[Edit Ticket]" button (pencil icon)
2. Click opens modal: "Edit Job Ticket"
3. Modal shows editable fields (others read-only):
   - Quantity (with cost impact warning)
   - Material/finish (if can be changed mid-production)
   - Special instructions
   - Due date
   - Priority (Normal/Rush)
4. Changes not allowed mid-production (if step > Pre-press):
   - Dimensions, colors, material → read-only or locked with "Cannot change after production started" message
5. If spec change attempted mid-production:
   - Warning modal: "This change may affect current production step. Approval required."
   - Request approval from production manager + finance
6. Once approved:
   - New version of ticket generated
   - Old version archived
   - Version history shows all changes with before/after
7. Audit trail updated: "Ticket specs updated by [user]; reason: [reason]"

---

#### US 3.8: Job Ticket Versioning and History

**As a** Finance Manager
**I want to** see the complete version history of a job ticket
**So that** I can understand what specs were used for production and why they changed

**Acceptance Criteria:**

1. Job ticket detail page has "History" tab or "[View All Versions]" link
2. Click shows version list:
   ```
   Version 1 (Current)
   Created: Mar 19, 2026 at 14:32 by Sarah Chen
   Quantity: 5000 units
   Material: White Label Stock
   Special Instructions: "Match PMS 485..."

   [View Full Details]

   Version 2 (Superseded)
   Created: Mar 22, 2026 at 09:15 by Tom Johnson
   Change: Quantity updated 5000 → 5200 units
   Reason: "Production overrun - QC hold"

   [Compare to Version 1] [Restore This Version]
   ```

3. Click "[Compare to Version 1]" shows side-by-side:
   ```
   ┌─ VERSION 1 ──────────┬─ VERSION 2 ──────────┐
   │ Quantity: 5000       │ Quantity: 5200       │
   │ Material: White Label│ Material: White Label│
   │ Instructions: ...    │ Instructions: ...    │
   └──────────────────────┴──────────────────────┘
   ```

4. Click "[Restore This Version]" (if needed):
   - Prompts: "Are you sure? This will revert ticket to Version 1 specs."
   - Confirmation required
   - Creates new version (V3) with restored specs
   - Audit trail records restoration

---

### Detailed User Journeys

#### Journey 1: Order Conversion → Job Ticket Auto-Generated → Operator Views on Station

**Setup:** Sarah converts estimate EST-20260315-042 to order GC-ORD-20260319-001 at 14:32.

**Flow:**

1. Sarah clicks "Convert to Order" (estimated 14:32:00)
2. Modal opens, Sarah fills in address, clicks "Create Order"
3. Backend processing starts:
   - Order record created: GC-ORD-20260319-001
   - Background job queued: GenerateJobTicket
   - Job includes: order_id = GC-ORD-20260319-001
4. **Within 5 seconds (by 14:32:05)**, background job executes:
   - Query order: GC-ORD-20260319-001
   - Query PSP production step config: [Pre-press, Printing, Finishing, Pack]
   - Query estimate for any custom steps or instructions: ["Match PMS 485 on label"]
   - Create job_tickets record:
     - job_id: GC-JOB-20260319-001
     - order_id: GC-ORD-20260319-001
     - customer_id: Acme Packaging
     - product_name: "5000x Labels"
     - quantity: 5000
     - material: "White Label Stock"
     - dimensions: "4\" x 6\""
     - colors: "4-color process"
     - finish: "Glossy"
     - special_instructions: "Match PMS 485 on label"
     - status: "Created"
     - current_step: "Pending Files" (first step, assuming this is in workflow)
     - due_date: Mar 29, 2026
     - created_by_user_id: Sarah's ID
     - version: 1
   - Create job_ticket_steps records (one per step):
     ```
     Step 1: Pre-press
     Step 2: Printing
     Step 3: Finishing
     Step 4: Pack
     (Each with status: "Pending", assigned_to: null, timestamps: null)
     ```
   - Return job_id to order API
5. Order detail page loaded and shows:
   - Job Tickets section:
     ```
     JOB TICKET
     GC-JOB-20260319-001
     Status: Created
     Current Step: Pending Files
     [View Ticket] [Print PDF]
     ```
6. **Production Manager Tom** logs into GelatoConnect next morning (Mar 20, 8 AM)
7. Tom navigates to Production > Job Tickets
8. Tom sees new ticket: "GC-JOB-20260319-001 | Acme | 5000x Labels | Due Mar 29 | Pending Files"
9. Tom clicks on job ticket ID
10. Job ticket detail page opens:
    ```
    GC-JOB-20260319-001
    Acme Packaging
    5000x Labels, 4-color, glossy
    Qty: 5000 units
    Due: Mar 29, 2026 (9 days)

    SPECIAL INSTRUCTIONS
    Match PMS 485 on label

    PRODUCTION STEPS
    ☐ Pre-press (Pending)
    ☐ Printing (Pending)
    ☐ Finishing (Pending)
    ☐ Pack (Pending)

    STATUS: Created | [Start Pre-press] [Print PDF]
    ```
11. Tom clicks "[Print PDF]" to get physical copy for the shop
12. PDF generated with QR code linking to digital ticket
13. Tom prints ticket
14. **Next day (Mar 21)**, Pre-press operator Sarah (different person) receives artwork file
15. Sarah scans QR code on printed ticket with smartphone
16. Digital job ticket opens in browser:
    - Full specs, colors, finishes
    - Special instructions: "Match PMS 485 on label"
    - Links to artwork file (if available)
17. Sarah clicks "[Start Pre-press]" on the ticket
18. System updates:
    - Step status: "In Progress"
    - assigned_to: Sarah (current user)
    - started_at: Mar 21, 08:00
    - Ticket updates in real-time
19. Progress bar updates: ⏳ Pre-press (In Progress) → ○ Printing → ○ Finishing → ○ Pack
20. Sarah completes pre-press work at 09:30
21. Sarah clicks "[Complete]" on Pre-press step
22. System updates:
    - status: "Complete"
    - completed_at: Mar 21, 09:30
    - duration_minutes: 90
    - Next step (Printing) status set to "Pending"
23. Order detail page updates automatically:
    - Job Ticket: "GC-JOB-20260319-001 (Printing) - On Track"
    - Current Step badge: "Pre-press ✓ | Printing ⏳ | Finishing ○ | Pack ○"
24. Notification sent to printing operator: "New job ready: GC-JOB-20260319-001 (5000x Labels)"

---

#### Journey 2: PSP Admin Configures Custom Workflow (Adds Foiling Step)

**Setup:** Owner is setting up new foiling capability. Wants to add "Foiling" step after "Printing" in all future jobs.

**Flow:**

1. Owner logs in as Admin
2. Navigates to Settings > Production > Production Steps
3. Page shows current steps:
   ```
   1. Pre-press
   2. Printing
   3. Finishing
   4. Pack
   ```
4. Owner clicks "[Add Step]"
5. Form opens:
   - Step name: [_____]
   - Required: ☐
   - Parallel: ☐
   - Estimated duration: [_____] minutes
   - Instructions template: [_____]
6. Owner fills:
   - Step name: "Foiling"
   - Required: ☑
   - Parallel: ☐
   - Duration: 120 minutes
   - Instructions: "Run through foil press at medium heat; ensure no bubbles; test on scrap first"
7. Owner clicks "[Save Step]"
8. Step added to list (at bottom):
   ```
   1. Pre-press
   2. Printing
   3. Finishing
   4. Pack
   5. Foiling (NEW)
   ```
9. Owner wants Foiling between Printing and Finishing
10. Owner clicks and drags "Foiling" card
11. Drags between "Printing" and "Finishing"
12. List reorders:
    ```
    1. Pre-press
    2. Printing
    3. Foiling (NEW)
    4. Finishing
    5. Pack
    ```
13. Owner clicks "[Save Changes]" at page bottom
14. Confirmation: "Production workflow updated. 5 steps configured."
15. From now on, all new job tickets include Foiling step in position 3

**What happens to existing tickets?**
- Tickets created before update keep original 4 steps (version control)
- New tickets (created after update) have all 5 steps
- Owner can manually add Foiling step to existing tickets if needed (edit ticket, add step)

---

### Screen/View Descriptions

#### Screen 1: Job Ticket Detail Page (Full View)

**URL:** `/jobs/GC-JOB-20260319-001`

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│ Production > Jobs > GC-JOB-20260319-001       [Print] [Edit]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ GC-JOB-20260319-001                      Status: Created  │
│ Acme Packaging                                             │
│                                                             │
│ ┌─ PRODUCT SUMMARY ────────────────────────────────────┐   │
│ │ 5000x Labels                                         │   │
│ │ Material: White Label Stock                          │   │
│ │ Dimensions: 4" x 6"                                  │   │
│ │ Colors: 4-color process                             │   │
│ │ Finish: Glossy                                       │   │
│ │ Quantity: 5000 units                                │   │
│ │ Due: March 29, 2026 (9 days)                        │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ SPECIAL INSTRUCTIONS ───────────────────────────────┐   │
│ │ Match PMS 485 on label                              │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ PRODUCTION STEPS ───────────────────────────────────┐   │
│ │                                                      │   │
│ │ Progress: ○ Pre-press ○ Printing ○ Finish ○ Pack   │   │
│ │                                                      │   │
│ │ Step 1: Pre-press (Pending)                         │   │
│ │ └─ Assigned: Unassigned                            │   │
│ │    [Start Step] [View Instructions]                 │   │
│ │                                                      │   │
│ │ Step 2: Printing (Pending)                          │   │
│ │ └─ Assigned: Unassigned                            │   │
│ │    [Start Step]                                      │   │
│ │                                                      │   │
│ │ Step 3: Finishing (Pending)                         │   │
│ │ └─ Assigned: Unassigned                            │   │
│ │    [Start Step]                                      │   │
│ │                                                      │   │
│ │ Step 4: Pack (Pending)                              │   │
│ │ └─ Assigned: Unassigned                            │   │
│ │    [Start Step]                                      │   │
│ │                                                      │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ LINKED ORDER ───────────────────────────────────────┐   │
│ │ Order: GC-ORD-20260319-001                          │   │
│ │ Customer: Acme Packaging                            │   │
│ │ Delivery: 1200 Industrial Blvd, Chicago, IL 60622   │   │
│ │ [View Order]                                         │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ AUDIT TRAIL ─────────────────────────────────────────┐   │
│ │ Mar 19, 14:32 | Ticket created by Sarah Chen        │   │
│ │ Mar 19, 14:32 | Order linked: GC-ORD-20260319-001   │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [Archive Job] [Duplicate Job] [Print PDF] [Version History]│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**In-Progress Step Variant:**

```
│ Step 2: Printing (In Progress)                       │   │
│ └─ Assigned: Tom Johnson (Production Manager)       │   │
│    Started: Mar 21, 2026 at 08:00                    │   │
│    Elapsed: 2 hours 15 minutes                       │   │
│    [Complete Step] [Add Note]                        │   │
```

---

#### Screen 2: Production Steps Configuration Page

**URL:** `/settings/production/steps`

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│ Settings > Production > Production Steps                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Configure the production steps for your PSP.               │
│ These steps will be applied to all new job tickets.        │
│                                                             │
│ ┌─ PRODUCTION WORKFLOW ────────────────────────────────┐   │
│ │                                                      │   │
│ │ ↕ Step 1: Pre-press                                 │   │
│ │ ├─ Required: ✓                                      │   │
│ │ ├─ Parallel: ✗                                      │   │
│ │ ├─ Est. Duration: — (variable)                      │   │
│ │ └─ [Edit] [Delete]                                  │   │
│ │                                                      │   │
│ │ ↕ Step 2: Printing                                  │   │
│ │ ├─ Required: ✓                                      │   │
│ │ ├─ Parallel: ✗                                      │   │
│ │ ├─ Est. Duration: 480 minutes                       │   │
│ │ └─ [Edit] [Delete]                                  │   │
│ │                                                      │   │
│ │ ↕ Step 3: Finishing                                 │   │
│ │ ├─ Required: ✓                                      │   │
│ │ ├─ Parallel: ✗                                      │   │
│ │ ├─ Est. Duration: 240 minutes                       │   │
│ │ └─ [Edit] [Delete]                                  │   │
│ │                                                      │   │
│ │ ↕ Step 4: Pack                                      │   │
│ │ ├─ Required: ✓                                      │   │
│ │ ├─ Parallel: ✗                                      │   │
│ │ ├─ Est. Duration: 120 minutes                       │   │
│ │ └─ [Edit] [Delete]                                  │   │
│ │                                                      │   │
│ │ [Add Step ↓]                                        │   │
│ │                                                      │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [Save Changes]  [Reset to Defaults]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Functional Requirements

| Req ID | Requirement | Acceptance Criteria | Priority | Notes |
|--------|-------------|-------------------|----------|-------|
| FR-3.1 | Auto-generate job ticket from order | Ticket created within 5 seconds; all specs copied from order | P0 | Background job with 10sec timeout; retry logic |
| FR-3.2 | Configure production steps | PSP can add/remove/reorder steps; applied to new tickets only | P0 | CRITICAL for market fit; configurable per PSP |
| FR-3.3 | Manual job ticket creation | CSR can create ticket without order; all fields required | P1 | For walk-in/phone orders |
| FR-3.4 | Digital job ticket display | Full specs visible on station display; QR code links to digital version | P0 | Mobile-friendly; real-time updates |
| FR-3.5 | Printable PDF with barcode | PDF includes all specs, steps, special instructions, barcode | P0 | Operator-friendly layout; high contrast |
| FR-3.6 | Step-level tracking | Production manager can start/complete steps; timestamps recorded | P0 | Enables real-time progress tracking |
| FR-3.7 | Job ticket versioning | Changes create new version; old versions archived; history visible | P1 | Audit trail compliance; spec change tracking |
| FR-3.8 | Step-level instructions | Estimator can add instructions per step; displayed at that step | P2 | Advanced feature; improves clarity |
| FR-3.9 | Job ticket filtering and search | Filter by status, date, operator, priority; search by order/job ID | P1 | Production dashboard usability |
| FR-3.10 | Job ticket to order sync | Job ticket status changes propagate to order; order status reflects job progress | P0 | Maintains data consistency |
| FR-3.11 | Configurable step dependencies | PSP can define "step X must complete before step Y" | P2 | Workflow flexibility |
| FR-3.12 | Parallel step support | Some steps can run concurrently; system tracks all branches | P2 | Complex workflows (e.g., digital + offset in parallel) |

---

### Data Requirements

#### Entity: JobTicket

```
Table: job_tickets

Fields:
- id (UUID) PK
- job_id (STRING, UNIQUE) [format: GC-JOB-YYYYMMDD-{sequence}]
- order_id (UUID, FK) [nullable - for manual tickets]
- customer_id (UUID, FK) [required]
- product_name (STRING, max 200)
- quantity (INTEGER)
- material (STRING, max 100)
- dimensions (STRING, max 100)
- colors (STRING, max 100)
- finish (STRING, max 100)
- special_instructions (TEXT, max 500 chars)
- status (ENUM) [Created, Pending Files, Pre-press, In Production, Complete, Shipped] default: Created
- current_step (STRING) [step name currently active]
- due_date (DATE) [required]
- is_rush (BOOLEAN) default: false
- is_manual (BOOLEAN) default: false [true if no order]
- version (INTEGER) default: 1 [incremented on major edits]
- created_by_user_id (UUID)
- created_at (TIMESTAMP) default: NOW()
- updated_at (TIMESTAMP) default: NOW()
- deleted_at (TIMESTAMP) [soft delete]

Indexes:
- (job_id) UNIQUE
- (order_id)
- (customer_id)
- (status, due_date)
- (created_at)
```

#### Entity: JobTicketStep

```
Table: job_ticket_steps

Fields:
- id (UUID) PK
- job_id (UUID, FK)
- step_name (STRING, max 100)
- step_order (INTEGER) [position in workflow]
- status (ENUM) [Pending, In Progress, Complete, Skipped] default: Pending
- assigned_to_user_id (UUID, FK) [nullable]
- started_at (TIMESTAMP) [nullable]
- completed_at (TIMESTAMP) [nullable]
- duration_minutes (INTEGER) [nullable, calculated]
- notes (TEXT, max 500 chars) [operator notes]
- special_instructions (TEXT, max 500 chars) [step-level instructions from estimate]
- is_optional (BOOLEAN) default: false
- is_parallel (BOOLEAN) default: false
- version (INTEGER) default: 1
- created_at (TIMESTAMP) default: NOW()
- updated_at (TIMESTAMP) default: NOW()

Indexes:
- (job_id, step_order)
- (assigned_to_user_id)
- (status)
```

#### Entity: ProductionStepConfig

```
Table: production_step_configs

Fields:
- id (UUID) PK
- organization_id (UUID, FK) [PSP's org]
- step_name (STRING, max 100, required)
- step_order (INTEGER) [position in workflow, unique per org]
- is_required (BOOLEAN) default: true
- is_parallel (BOOLEAN) default: false
- estimated_duration_minutes (INTEGER) [nullable]
- instructions_template (TEXT) [markdown]
- created_by_user_id (UUID)
- created_at (TIMESTAMP) default: NOW()
- updated_at (TIMESTAMP) default: NOW()

Indexes:
- (organization_id, step_order) UNIQUE
- (organization_id)
```

---

### Edge Cases and Error Handling

| Edge Case | Trigger | System Behavior | User Feedback |
|-----------|---------|-----------------|----------------|
| **Job ticket generation timeout** | Backend job takes >10 seconds | Job retried (exponential backoff: 10s, 30s, 60s) | After 3 retries, admin alert: "Job ticket generation failed; manual creation needed" |
| **Order deleted before ticket generated** | Order deleted within 5-second window | Ticket generation fails on FK constraint | Admin alert; order deletion blocked if ticket creation in progress |
| **Operator completes step out of order** | Step 3 completed before step 2 | System allows (some workflows are parallel) | Warning: "Completing before previous step. Confirm?" but allows if permitted |
| **Custom step name conflict** | PSP creates step "Printing" when "Printing" exists | Duplicate check on step name | Error: "Step 'Printing' already exists. Use different name or reorder." |
| **Remove required step mid-production** | Admin removes "Printing" step from config | New tickets don't have step; existing tickets unaffected | Warning: "This affects new tickets only. Existing tickets keep original steps." |
| **Parallel steps both complete at same time** | Both finish within 1 second | Both marked complete; next sequential step unlocks | No conflict; system handles gracefully |
| **Ticket printed but specs updated** | Operator has PDF; specs changed on digital | Printed PDF outdated | When operator scans QR code, digital ticket shows updated specs; alert: "[This ticket was updated. View current version]" |
| **Manual ticket without customer** | CSR tries to create manual ticket without selecting customer | Form validation blocks creation | Error: "Customer is required" |
| **Production step with no instructions** | Step created without instructions_template | System generates empty step | No instructions shown at that step; operator can add notes manually |
| **Estimate without custom steps** | Estimate created without step-level instructions | Job ticket gets default steps only | Normal flow; no special instructions per step |
| **Very long special instructions** | Instructions exceed 500 chars | Text truncated on PDF; full text on digital | Digital ticket shows full text; PDF shows "[See digital ticket for full instructions]" link |

---

### Status Machine / Configurable Workflow

**CRITICAL: This workflow is configurable per PSP.**

**Default Workflow (Example):**

```
┌──────────────┐
│   Created    │
└──────┬───────┘
       │ [Files Uploaded]
       v
┌──────────────┐     ┌───────────────┐
│Pending Files │────→│ Pre-press     │
└──────────────┘     └───┬───────────┘
                         │ [Pre-press complete]
                         v
                    ┌──────────────┐
                    │  Printing    │
                    └───┬──────────┘
                        │ [Printing complete]
                        v
                    ┌──────────────┐
                    │  Finishing   │
                    └───┬──────────┘
                        │ [Finishing complete]
                        v
                    ┌──────────────┐
                    │    Pack      │
                    └───┬──────────┘
                        │ [Pack complete]
                        v
                    ┌──────────────┐
                    │   Complete   │
                    └──────────────┘
```

**How Customization Works:**

1. Each PSP defines their steps in ProductionStepConfig table
2. System reads steps in step_order sequence
3. If is_parallel=true, step can run concurrently with others at same level
4. If is_parallel=false, system waits for previous step to complete
5. Job ticket steps generated from config at creation time
6. Step transitions are manual (operator/manager starts/completes each step)

**Example: Digital + Offset Parallel Workflow:**

```
PSP Config:
1. Pre-press (required, sequential)
2. Digital Print (optional, parallel=true)
3. Offset Print (optional, parallel=true)
4. Finishing (required, sequential)
5. Pack (required, sequential)

Job Ticket Status Flow:
  Pre-press ──┬──→ Digital ┐
              │            ├──→ Finishing → Pack → Complete
              └──→ Offset  ┘
```

**Configurable Rules (Advanced):**

- **Skip Logic:** "If product is digital-only, skip Offset Print step"
- **Conditional Steps:** "If rush order, add expedited QC step"
- **Dependencies:** "Can't start Finishing until both Digital and Offset complete"

---

### Integration Points

| Module | Data Sent | Data Received | Format | Frequency |
|--------|-----------|---------------|--------|-----------|
| Order (PRD 1) | Order ID, specs, qty, customer, address | Job ticket ID, status | Reference | On order creation |
| File Receipt (PRD 4) | File upload status | File path | File entity | On file upload |
| Notifications (PRD 5) | Step start/complete | N/A | Event trigger | Real-time on step change |
| Production Tracking | Step progress, duration | N/A | Step status | On step complete |
| Customer Portal (Phase 2) | Job ticket summary, progress | N/A | Public view | Real-time read-only |
| Logistics | Completion signal, delivery address | N/A | Shipment trigger | On job complete |

---

### Job Ticket Templates per Category/Product Type

#### Overview

The system supports configurable job ticket templates that determine the layout, sections, and content of generated job tickets. Different product categories (Digital, Litho, Large Format) and specific product types within those categories can be assigned different templates. When a job ticket is auto-generated, the system selects the correct template based on the product type mapping.

This capability already exists in the prototype codebase (`components/template-management.tsx` and `components/template-editor.tsx`) and should be used as the starting point for implementation.

#### Template Types and Product Mapping

Templates are organized by printing category:

| Template Type | Default Product Types | Description |
|---|---|---|
| **Digital** | Business Cards, Flyers, Brochures, Postcards | Standard template for digital printing jobs |
| **Litho** | Books, Magazines, Catalogs, Large Runs | Template for lithographic printing processes |
| **Large Format** | Banners, Posters, Signage, Display Graphics | Template for large format printing jobs |

Each PSP can create additional templates and assign product types to them. A product type can only belong to one template at a time. When no specific template is mapped, the system falls back to the category-level default template.

#### User Stories

**US 3.9: PSP Admin Creates and Manages Job Ticket Templates**

**As a** PSP Admin
**I want to** create different job ticket templates for different product categories and types
**So that** each product type gets a job ticket layout that matches its production needs

**Acceptance Criteria:**

1. Navigation: Settings > Job Ticketing > Template Settings
2. Page shows existing templates as cards in a grid (3 columns on desktop):
   - Each card shows: Template name, type badge (Digital/Litho/Large Format), description, product types assigned, last modified date, default badge if applicable
   - Cards have action buttons: Edit, Copy, Delete (Delete disabled for default templates)
3. "Create New Template" button opens dialog:
   - Template Name (required, text)
   - Template Type (required, select: Digital / Litho / Large Format)
   - Description (optional, textarea)
   - Product Types (comma-separated text, e.g., "Business Cards, Flyers")
4. "Copy" button on any template creates a duplicate with "(Copy)" appended to the name, marked as non-default
5. "Edit" button opens the Template Editor (see US 3.10)
6. "Delete" button shows confirmation dialog; only available for non-default templates
7. System validates that template name is unique within the PSP's org

---

**US 3.10: PSP Admin Edits Job Ticket Template Layout**

**As a** PSP Admin
**I want to** customize the HTML layout and content sections of a job ticket template
**So that** the printed and digital job tickets include exactly the information my production floor needs

**Acceptance Criteria:**

1. Template Editor page shows:
   - Left panel: HTML editor with syntax highlighting
   - Right panel: Variable insertion, asset management, and preview
   - Top bar: Template name, paper size selector (A4/Letter/Legal/Custom), Save/Preview/Back buttons
2. HTML template supports variable placeholders using `{{variable_name}}` syntax
3. Available template variables organized by category:
   - **Order Information:** `{{order_id}}`, `{{customer_name}}`, `{{customer_email}}`, `{{order_date}}`, `{{due_date}}`, `{{priority}}`
   - **Job Details:** `{{job_id}}`, `{{product_name}}`, `{{quantity}}`, `{{quantity_ordered}}`, `{{status}}`
   - **Printing Specs:** `{{material}}`, `{{dimensions}}`, `{{colors}}`, `{{finish}}`, `{{paper_weight}}`, `{{coating}}`
   - **Production:** `{{production_steps}}`, `{{current_step}}`, `{{assigned_operator}}`, `{{estimated_duration}}`
   - **Cutting:** `{{cut_size}}`, `{{bleed}}`, `{{trim_marks}}`
   - **Folding:** `{{fold_type}}`, `{{fold_count}}`, `{{final_size}}`
   - **Packing:** `{{packing_method}}`, `{{box_size}}`, `{{units_per_box}}`
   - **Summary:** `{{total_cost}}`, `{{material_cost}}`, `{{labor_cost}}`, `{{shipping_cost}}`
   - **Instructions:** `{{special_instructions}}`, `{{step_instructions}}`, `{{quality_notes}}`
4. Clicking a variable name inserts it at the cursor position in the HTML editor
5. "Preview" button renders the template with sample data and shows a print-ready preview
6. Paper size selection affects the PDF generation layout
7. ConnectAI panel provides AI-assisted template suggestions (e.g., "Add a QR code section", "Include barcode placement")
8. "Save" persists the template; existing job tickets are not affected (new template used for future tickets only)

---

**US 3.11: System Auto-Selects Template on Job Ticket Generation**

**As a** System
**I want to** automatically select the correct job ticket template when generating a ticket
**So that** the right template is used for each product type without manual intervention

**Acceptance Criteria:**

1. When GenerateJobTicket background job runs:
   - Query the product type from the order/estimate
   - Look up template_product_mappings for a template matching this product type
   - If found, use that template
   - If not found, look up the default template for the product's category (Digital/Litho/Large Format)
   - If no category match either, use the system default template
2. Template selection is logged in the job ticket record: `template_id` field populated
3. Template variables are substituted with actual order/job data
4. The rendered HTML is used for:
   - Digital display on station views
   - PDF generation for printable job tickets
5. If template is deleted after job ticket creation, the rendered HTML is preserved (snapshot at creation time)
6. Template selection order: Product Type Match > Category Default > System Default

---

#### Data Requirements

**Entity: JobTicketTemplate**

```
Table: job_ticket_templates

Fields:
- id (UUID) PK
- organization_id (UUID, FK) [PSP's org]
- name (STRING, max 200, required)
- type (ENUM) [Digital, Litho, Large_Format]
- description (TEXT, max 500)
- html_content (TEXT) [HTML template with {{variable}} placeholders]
- paper_size (ENUM) [A4, Letter, Legal, Custom] default: A4
- custom_paper_width_mm (INTEGER, nullable)
- custom_paper_height_mm (INTEGER, nullable)
- is_default (BOOLEAN) default: false [one default per type per org]
- created_by_user_id (UUID)
- created_at (TIMESTAMP) default: NOW()
- updated_at (TIMESTAMP) default: NOW()
- deleted_at (TIMESTAMP) [soft delete]

Indexes:
- (organization_id, type) [for category-level lookups]
- (organization_id, name) UNIQUE
- (is_default, organization_id, type) [for default template lookup]
```

**Entity: TemplateProductMapping**

```
Table: template_product_mappings

Fields:
- id (UUID) PK
- template_id (UUID, FK to job_ticket_templates)
- organization_id (UUID, FK)
- product_type (STRING, max 100) [e.g., "Business Cards", "Flyers"]
- created_at (TIMESTAMP) default: NOW()

Indexes:
- (organization_id, product_type) UNIQUE [one template per product type per org]
- (template_id) [for template deletion cascade]
```

**Update to JobTicket entity (add field):**

```
- template_id (UUID, FK to job_ticket_templates, nullable) [template used for generation]
- rendered_html (TEXT, nullable) [snapshot of rendered template at creation time]
```

---

#### Edge Cases

| Edge Case | Trigger | System Behavior | User Feedback |
|-----------|---------|-----------------|----------------|
| **Product type not mapped to any template** | Order has product type "Custom Envelopes" with no mapping | Fall back to category default, then system default | Job ticket generated with default template; admin notified to configure mapping |
| **Default template deleted** | Admin tries to delete a default template | Deletion blocked | Error: "Cannot delete default template. Set another template as default first." |
| **Template has invalid HTML** | Admin saves template with broken HTML tags | Allow save (HTML is flexible) but warn on preview | Preview shows rendering issues; admin can fix |
| **Multiple templates claim same product type** | Race condition or data inconsistency | UNIQUE constraint on (org, product_type) prevents this | Database error caught; admin sees "This product type is already assigned to another template" |
| **Template variable not found in order data** | Template uses {{coating}} but order has no coating field | Variable rendered as empty string | No visible placeholder in output; template gracefully degrades |
| **Very large HTML template** | Template exceeds 100KB of HTML | Allow but warn about PDF generation performance | Warning: "Large templates may slow PDF generation" |
| **Template updated after job tickets created** | Admin changes template; existing tickets exist | Existing tickets keep their rendered_html snapshot | New tickets use updated template; old tickets unchanged |

---

#### Functional Requirements (Addition to FR-3.x)

| Req ID | Requirement | Acceptance Criteria | Priority | Notes |
|--------|-------------|-------------------|----------|-------|
| FR-3.13 | Job ticket template management | PSP can create, edit, copy, delete templates; one default per category | P1 | Settings > Job Ticketing > Template Settings |
| FR-3.14 | Template HTML editor | Rich HTML editor with variable insertion, preview, paper size selection | P1 | Existing prototype: template-editor.tsx |
| FR-3.15 | Product type to template mapping | Each product type maps to one template; fallback to category default | P1 | UNIQUE constraint per org |
| FR-3.16 | Auto-select template on generation | System picks template based on product type > category default > system default | P0 | Part of GenerateJobTicket background job |
| FR-3.17 | Template variable substitution | All {{variables}} replaced with order/job data at generation time | P0 | Graceful fallback for missing variables |
| FR-3.18 | Template snapshot on job ticket | Rendered HTML stored on job ticket record; immune to future template changes | P1 | Ensures historical accuracy |

---

## PRD 4: File Receipt and Proofing

### Problem Statement

After an order is placed, the PSP needs artwork from the customer. The process must:

- **Capture files reliably** - customer uploads via link (email or portal); internal staff can upload on behalf
- **Validate automatically** - pre-flight checks (resolution, color space, bleed, fonts, file format)
- **Generate proofs** - soft proof (low-res PDF with watermark) sent to customer for approval
- **Track approvals** - customer approves or rejects; rejection requires comment for revision
- **Maintain versions** - multiple file uploads and proof versions; complete audit trail
- **Communicate status** - customer gets upload link, proof ready email, approval reminder, shipment notification

This is critical for order timing: production cannot start until artwork approved. The system must be frictionless (one-click approval) but also ensure quality (pre-flight catches errors before production).

### Solution Overview

A file and proofing workflow that:

1. **Generates upload link** when order created (or CSR manually sends)
   - Email link sent to customer
   - Portal link (Phase 2) available
   - Link expires after 30 days or file received

2. **Accepts file uploads** from customer or staff
   - Drag-and-drop or file picker
   - Supports multiple file types: PDF, AI, PSD, JPG, PNG
   - Auto-detects file type and format
   - Stores in cloud storage (S3/GCS) with order reference

3. **Auto-runs pre-flight validation**
   - Resolution check (minimum DPI for print type)
   - Color space check (CMYK preferred, RGB flagged)
   - Bleed check (minimum bleed present)
   - Font embedding check (all fonts embedded or safe)
   - File size check (not too large for production)
   - Returns pass/warning/fail with actionable feedback

4. **Generates soft proof**
   - Converts file to low-res PDF
   - Adds watermark: "PROOF - NOT FOR PRODUCTION"
   - Includes crop marks and bleed indicators
   - Stores in audit trail

5. **Sends proof to customer**
   - Email with download link and approval buttons
   - Approval button: "Approve This Proof"
   - Rejection button: "Request Changes" (requires comment)
   - Countdown reminder: if no approval for 48 hours, second email sent

6. **Tracks approvals**
   - Customer approval timestamp recorded
   - Link to approved file stored on order
   - If rejected, comment stored; pre-press revises and re-sends new proof

### User Stories

#### US 4.1: Generate and Send File Upload Link

**As a** System (triggered by order creation)
**I want to** send an upload link to the customer
**So that** customer can easily provide artwork without emailing or calling

**Acceptance Criteria:**

1. When order is created (status: Pending Address or Confirmed):
   - If customer has valid email, generate upload link automatically
   - Upload link format: `https://gelato-connect-mis.vercel.app/orders/{order_id}/upload?token={short_token}`
   - Token expires after 30 days
   - Token is unique (can't be guessed)

2. System sends email to customer immediately:
   ```
   Subject: Upload Your Artwork - Order GC-ORD-20260319-001

   Dear Acme Packaging,

   We're ready to produce your order! Please upload your artwork files using the link below:

   [UPLOAD YOUR FILES]

   Link expires in 30 days. If you need more time, contact us.

   What files do we need?
   - Adobe InDesign (.ai, .indd)
   - Adobe Photoshop (.psd)
   - PDF (.pdf)
   - High-res images (.jpg, .png at 300+ DPI)

   Questions? Reply to this email or contact support@gelatoconnect.com

   Order Details:
   Order ID: GC-ORD-20260319-001
   Product: 5000x Labels
   Due: March 29, 2026
   ```

3. Email logged in audit trail: "Upload link sent to acme@example.com on Mar 19 at 14:33"
4. Order detail page shows:
   - "Files" tab
   - Section: "File Submission Status: Pending"
   - Message: "Awaiting customer upload. [Send Upload Link Again] [Upload File On Behalf]"
   - Shows upload link (for internal staff to copy and send manually if needed)

5. CSR can manually resend link if customer doesn't receive it:
   - Click "[Resend Upload Link]" button
   - Modal confirms: "Send upload link to acme@example.com?"
   - Email resent with same link
   - Audit trail updated: "Upload link resent to acme@example.com by Sarah Chen"

---

#### US 4.2: Customer Uploads File via Link

**As a** Customer
**I want to** upload my artwork file to the order using the link in my email
**So that** I don't have to email files or call PSP to provide artwork

**Acceptance Criteria:**

1. Customer clicks upload link in email
2. Browser navigates to upload page (requires no login)
3. Page shows:
   ```
   Upload Artwork
   Order: GC-ORD-20260319-001
   Customer: Acme Packaging
   Product: 5000x Labels

   Drag and drop files here or [Click to browse]

   Supported formats: PDF, AI, PSD, JPG, PNG (max 500 MB each)
   ```

4. Customer drags file (or clicks to browse): "label_design.pdf"
5. File uploaded to server (progress bar shows: "Uploading... 45%")
6. System validates file:
   - File type: PDF ✓
   - File size: 12 MB ✓
   - File signature: valid PDF ✓
7. File stored in cloud storage: `/orders/GC-ORD-20260319-001/files/label_design.pdf`
8. File record created in database:
   - order_id: GC-ORD-20260319-001
   - filename: "label_design.pdf"
   - file_path: [S3 path]
   - file_size: 12582912 bytes
   - file_type: "application/pdf"
   - uploaded_by_user_id: null (customer, not internal user)
   - uploaded_at: Mar 20, 09:15 UTC
   - status: "Uploaded"

9. Pre-flight validation auto-runs (async background job):
   - PDF analysis:
     - Resolution: check images within PDF
     - Color space: check if CMYK or RGB
     - Bleed: look for bleed guides
     - Fonts: extract font list
   - Results: Pass/Warning/Fail
   - If PDF: all images must be 300+ DPI
   - Result: "PASS" (all checks passed)

10. System updates file record:
    - status: "Pre-flight Complete"
    - preflight_result: "PASS"
    - preflight_details: { resolution: "ok", colors: "ok", bleed: "ok", fonts: "ok" }

11. Pre-press operator gets notification:
    ```
    New file uploaded: GC-ORD-20260319-001
    Filename: label_design.pdf
    Pre-flight: ✓ PASS
    Status: Ready for proof generation
    [View File] [Generate Proof]
    ```

12. Customer sees confirmation page:
    ```
    ✓ File Uploaded Successfully

    label_design.pdf (12 MB)
    Pre-flight Status: ✓ PASS

    Next Steps:
    Our pre-press team will review your file and send a proof within 24 hours.

    [Upload Another File] [Back to Order]
    ```

13. Audit trail updated:
    - "File uploaded: label_design.pdf by customer"
    - "Pre-flight validation: PASS"

---

#### US 4.3: Pre-flight Validation Warnings/Errors

**As a** Pre-press Operator
**I want to** see pre-flight warnings and either auto-correct or notify customer
**So that** we don't start production with bad files

**Acceptance Criteria:**

1. Customer uploads file: "label_design_v2.ai" (Adobe Illustrator)
2. Pre-flight validation runs:
   - File type: AI ✓
   - Contains images?
     - Linked images: ["logo.png", "photo.jpg"] ⚠️ WARNING
     - Logo embedded resolution: 150 DPI (should be 300+)
     - Photo embedded resolution: 72 DPI (far too low) ❌ FAIL
   - Color space: RGB ⚠️ WARNING (should be CMYK for print)
   - Fonts: 3 fonts found
     - Helvetica: standard (safe) ✓
     - Custom Font "BrandFont": NOT embedded ❌ FAIL
   - Bleed: no bleed guides ⚠️ WARNING

3. Pre-flight result: "FAIL" (2 errors, 3 warnings)
4. Details shown to operator:
   ```
   PRE-FLIGHT RESULTS: ⚠️ ISSUES FOUND

   🔴 CRITICAL ERRORS (2):
   1. Linked image "photo.jpg" is too low resolution (72 DPI)
      Required: 300 DPI minimum
      Action: Customer must provide high-res image

   2. Font "BrandFont" not embedded
      Action: Embed font or convert to outlines

   🟡 WARNINGS (3):
   1. Linked image "logo.png" is low resolution (150 DPI)
      Recommended: 300 DPI; may show pixelation at print size

   2. Color space is RGB, not CMYK
      Recommended: Convert to CMYK for better color accuracy

   3. No bleed guides detected
      Recommended: Add 0.125" bleed on all sides

   [Auto-correct RGB to CMYK] [Notify Customer of Issues]
   ```

5. Operator clicks "[Notify Customer of Issues]"
6. System sends email to customer:
   ```
   Subject: Your Artwork Needs Revision - Order GC-ORD-20260319-001

   Dear Acme Packaging,

   We reviewed your file and found some issues that need to be fixed before we can proceed:

   CRITICAL ISSUES (must fix):
   • Photo file is too low resolution (72 DPI). We need 300 DPI minimum.
   • Custom font "BrandFont" is not embedded. Please embed the font or convert to outlines.

   RECOMMENDATIONS (should fix for quality):
   • Logo file could be higher resolution (currently 150 DPI)
   • Color space should be CMYK instead of RGB
   • Add 0.125" bleed guides

   Please revise your file and upload again using the link: [UPLOAD]

   Questions? Contact us at support@gelatoconnect.com

   Order ID: GC-ORD-20260319-001
   Due: March 29, 2026
   ```

7. Audit trail: "Pre-flight issues flagged; customer notified"
8. Order status remains "Pending Files" until new version uploaded

**Alternative: Auto-correct RGB to CMYK**

5. Operator clicks "[Auto-correct RGB to CMYK]"
6. System converts color space (using PDF library) in background
7. Conversion result: "PASS" (warnings removed, critical errors remain)
8. File updated; new version stored
9. Notification still sent to customer (for critical errors)

---

#### US 4.4: Generate and Send Soft Proof

**As a** Pre-press Operator
**I want to** generate a soft proof from the customer's file and send it for approval
**So that** customer can review and approve before production starts

**Acceptance Criteria:**

1. Pre-press operator opens file detail page (after pre-flight passes)
2. File shows: "label_design.pdf | Pre-flight: ✓ PASS | Status: Awaiting Proof"
3. Operator clicks "[Generate Proof]" button
4. System converts file to low-res PDF:
   - Converts to 150 DPI (proof resolution)
   - Embeds watermark: "PROOF - NOT FOR PRODUCTION - FOR APPROVAL ONLY"
   - Adds crop marks and bleed indicators (light gray)
   - Watermark opacity: 20% (visible but not intrusive)
   - Output format: PDF
   - Processing time: 5-30 seconds (depending on file complexity)

5. Proof generated: `proof_v1_label_design.pdf`
6. Proof file stored in order directory
7. System updates file record:
   - file_status: "Proof Generated"
   - proof_file_path: [S3 path to proof]
   - proof_generated_at: [timestamp]
   - proof_version: 1

8. System sends proof email to customer:
   ```
   Subject: Your Proof is Ready for Approval - Order GC-ORD-20260319-001

   Dear Acme Packaging,

   Your proof is ready! Please review and approve using the link below:

   [APPROVE THIS PROOF] [REQUEST CHANGES]

   Proof attached: label_design_proof.pdf

   What we'll produce: This is exactly what your labels will look like.
   Color note: This proof is on screen (RGB). Printed colors may vary slightly.

   Please approve or request changes by March 28, 2026.

   Questions? Reply to this email or contact support@gelatoconnect.com

   Order Details:
   Order ID: GC-ORD-20260319-001
   Product: 5000x Labels
   Quantity: 5000 units
   Due: March 29, 2026
   ```

9. Email includes proof PDF as attachment
10. Email also includes two action links (buttons):
    - "[APPROVE THIS PROOF]" - instant approval
    - "[REQUEST CHANGES]" - opens feedback form
11. Audit trail: "Proof generated and sent to acme@example.com"
12. Order detail page, Files tab, shows:
    - File: label_design.pdf (uploaded Mar 20, 09:15)
    - Pre-flight: ✓ PASS
    - Proof: ✓ Generated (Mar 20, 10:00)
    - Status: "Awaiting Customer Approval"
    - Proof due: March 28 (1 day before production due date)
    - [Download Proof] [View File] [Regenerate Proof]

13. Job ticket status updated: "Awaiting Proof Approval" (if pre-flight passed)

---

#### US 4.5: Customer Approves Proof

**As a** Customer
**I want to** approve a proof with one click to move production forward
**So that** I don't have to fill out forms or send emails

**Acceptance Criteria:**

1. Customer receives proof email
2. Customer reviews PDF attachment (or downloads from link)
3. Customer looks good; clicks "[APPROVE THIS PROOF]" button in email
4. System processes approval:
   - Creates approval_record:
     - order_id: GC-ORD-20260319-001
     - proof_version: 1
     - approved_at: Mar 20, 14:30 UTC
     - approved_by: customer (no login, authenticated via email link token)
     - approval_type: "approved"
   - Updates file_record:
     - approval_status: "Approved"
     - approved_at: Mar 20, 14:30 UTC
   - Updates order:
     - status: "Proof Approved" (derived from file approval)
   - Updates job ticket:
     - current_step: "Ready for Production"
     - status: "Ready for Production"

5. Customer sees confirmation page:
   ```
   ✓ PROOF APPROVED

   Thank you! Your proof has been approved.
   Production will begin shortly.

   Order ID: GC-ORD-20260319-001
   Approval Time: March 20, 2026 at 14:30

   We'll send you updates as your order progresses.
   ```

6. System sends confirmation email to customer:
   ```
   Subject: Your Proof is Approved - Order GC-ORD-20260319-001

   Great! Your proof is approved and production will begin immediately.

   Order ID: GC-ORD-20260319-001
   Approved: March 20, 2026 at 14:30

   Timeline:
   - Production: March 20-28, 2026
   - Shipping: March 28, 2026
   - Expected delivery: April 2, 2026

   We'll send you tracking info once your order ships.
   ```

7. System sends internal notification to production:
   ```
   PROOF APPROVED: GC-ORD-20260319-001
   Customer: Acme Packaging
   File: label_design.pdf (approved proof v1)
   Approved: Mar 20, 2026 at 14:30

   ✓ READY TO START PRODUCTION

   Job Ticket: GC-JOB-20260319-001
   [View Job] [View File] [Start Production]
   ```

8. Audit trail entries:
   - "Proof v1 approved by customer (acme@example.com) on Mar 20 at 14:30"
   - "Order status changed to 'Proof Approved'"
   - "Job ticket advanced to 'Ready for Production'"

---

#### US 4.6: Customer Rejects Proof and Requests Changes

**As a** Customer
**I want to** request changes to a proof without having to describe issues in email
**So that** the revision process is clear and tracked

**Acceptance Criteria:**

1. Customer receives proof email
2. Customer reviews PDF, sees issues
3. Customer clicks "[REQUEST CHANGES]" button
4. Page opens: "Request Proof Changes"
   ```
   What needs to change?

   [Textarea, max 500 chars]
   ______________________________
   ______________________________
   ______________________________

   (Examples: Color is too dark, logo should be larger, text alignment wrong)

   [Cancel] [Submit Feedback]
   ```

5. Customer types: "The blue color is too dark. Should be lighter shade. Also, the text spacing looks tight - can you add more space between lines?"
6. Customer clicks "[Submit Feedback]"
7. System creates rejection record:
   - order_id: GC-ORD-20260319-001
   - proof_version: 1
   - rejected_at: Mar 20, 15:45 UTC
   - rejection_reason: "The blue color is too dark..."
   - status: "Changes Requested"
   - requested_by: customer (via email token)

8. Updates file/order:
   - file_status: "Proof Rejected - Changes Requested"
   - order status: "Proof Rejected" (remains in production, but not yet approved)

9. Customer sees confirmation:
   ```
   ✓ FEEDBACK SENT

   Thank you! We've noted your feedback.
   Our team will revise the proof and send a new version within 24 hours.

   Your Feedback:
   "The blue color is too dark..."
   ```

10. System sends email to customer:
    ```
    Subject: We Received Your Feedback - Order GC-ORD-20260319-001

    Thank you for your feedback! We'll make these revisions and send an updated proof within 24 hours.

    Your Feedback:
    "The blue color is too dark..."

    We'll email you as soon as the revised proof is ready.
    ```

11. System sends internal alert to pre-press:
    ```
    PROOF REVISION REQUESTED: GC-ORD-20260319-001

    Customer Feedback:
    "The blue color is too dark. Should be lighter shade. Also, the text spacing looks tight - can you add more space between lines?"

    Proof v1 Revision Deadline: Mar 21, 2026 by 15:45 (24 hours)

    [View File] [View Proof] [Assign to Operator]
    ```

12. Pre-press operator revises file and uploads new version
13. New proof generated and sent (v2)
14. Audit trail shows version chain: v1 → rejected → v2 → [approval/rejection]

---

#### US 4.7: File Replacement / Upload New Version

**As a** Pre-press Operator or Customer
**I want to** upload a new version of the file to replace the old one
**So that** we don't have multiple versions cluttering the order

**Acceptance Criteria:**

1. File detail page shows current file: "label_design.pdf | Uploaded: Mar 20 | Status: Proof Rejected"
2. Button "[Upload New Version]"
3. Click opens file picker or drag-and-drop:
   - Accepts same file types as original
   - Supports same drag/drop interface
4. Customer (or operator) uploads: "label_design_v2.pdf"
5. New file stored with version tracking:
   - order_id: GC-ORD-20260319-001
   - filename: "label_design_v2.pdf"
   - file_version: 2
   - replaces: "label_design.pdf" (v1)
   - uploaded_at: Mar 20, 16:10 UTC
6. Pre-flight auto-runs on new file
7. If PASS: "[Generate New Proof]" button enabled
8. Operator clicks "[Generate Proof]"
9. Proof v2 generated
10. Email sent to customer with Proof v2
11. Audit trail shows version progression

---

#### US 4.8: Proof Approval Reminder (48-hour timeout)

**As a** System
**I want to** send reminder if customer doesn't approve proof within 48 hours
**So that** we don't miss deadlines waiting for approval

**Acceptance Criteria:**

1. Proof sent to customer at Mar 20, 14:30
2. System sets reminder timer: 48 hours later = Mar 22, 14:30
3. At Mar 22, 14:30, scheduled job runs:
   - Query all orders with proof_status = "Awaiting Approval" and sent_at > 48 hours ago
   - For each order:
     - If no approval yet: send reminder email
     - Log reminder sent
4. Reminder email to customer:
   ```
   Subject: Reminder: Your Proof Needs Approval - Order GC-ORD-20260319-001

   Dear Acme Packaging,

   We sent you a proof 48 hours ago. We haven't heard back yet.

   Please approve or request changes by March 28, 2026 so we can start production.

   [APPROVE THIS PROOF] [REQUEST CHANGES]

   Order ID: GC-ORD-20260319-001
   Due: March 29, 2026

   Questions? Contact us at support@gelatoconnect.com
   ```

5. Audit trail: "Proof approval reminder sent to acme@example.com on Mar 22"
6. If approval still pending at Mar 28 (1 day before due date):
   - Escalation email sent to PSP admin: "Order [ID] production deadline imminent; proof still unapproved"

---

### Detailed User Journey

#### Journey: File Upload → Pre-flight → Proof Approval

**Setup:** Customer Acme Packaging received upload link for order GC-ORD-20260319-001 on Mar 19. Now (Mar 20) they're uploading artwork.

**Flow:**

1. **Mar 20, 09:00** - Customer receives email with upload link
   - Clicks link: `https://gelato-connect-mis.vercel.app/orders/GC-ORD-20260319-001/upload?token=abc123xyz`
   - Page loads (no login required)
   - Form shows: upload area, supported formats, max file size

2. **09:15** - Customer drags file: "label_artwork_final.pdf"
   - System detects: PDF, 15 MB, file signature valid
   - Uploads to S3: `/orders/GC-ORD-20260319-001/files/label_artwork_final.pdf`
   - File record created with status: "Uploaded"

3. **09:16** - Pre-flight validation starts (background job)
   - Analyzes PDF:
     - Images: all at 300+ DPI ✓
     - Color space: CMYK ✓
     - Bleed: 0.125" guides present ✓
     - Fonts: all embedded ✓
     - File format: valid PDF ✓
   - Result: "PASS" (all checks passed)

4. **09:18** - File record updated
   - Status: "Pre-flight Complete"
   - Result: "PASS"
   - Pre-press operator notified: "File ready for proof"

5. **09:20** - Pre-press operator (Sarah) opens job ticket
   - Sees: "GC-JOB-20260319-001 | Files: ✓ Received | [Generate Proof]"
   - Clicks "[Generate Proof]"

6. **09:21** - System converts PDF to proof
   - Reduces resolution to 150 DPI
   - Adds watermark: "PROOF - NOT FOR PRODUCTION"
   - Adds crop marks (light gray)
   - Output: `proof_v1_label_artwork_final.pdf`
   - Stores in S3

7. **09:25** - Proof email sent to customer
   - Subject: "Your Proof is Ready for Approval - Order GC-ORD-20260319-001"
   - Body: includes order info, action buttons
   - Attachment: proof PDF
   - Buttons: "[APPROVE] [REQUEST CHANGES]"
   - Audit trail: "Proof v1 sent to acme@example.com"

8. **09:26** - Order detail page updated
   - Files tab shows:
     ```
     File: label_artwork_final.pdf (uploaded Mar 20, 09:15)
     Pre-flight: ✓ PASS
     Proof: ✓ Generated v1 (Mar 20, 09:21)
     Status: Awaiting Customer Approval
     ```
   - Job ticket updated: "Current Step: Awaiting Proof Approval"

9. **10:30** - Customer (Acme) reviews proof PDF
   - Opens attachment from email
   - Reviews colors, layout, text
   - Looks good!
   - Clicks "[APPROVE THIS PROOF]" button in email

10. **10:31** - Approval processed
    - Email token authenticated (valid, not expired)
    - Approval record created:
      - proof_version: 1
      - approved_at: Mar 20, 10:31 UTC
      - approved_by: customer
    - Order status changed to: "Proof Approved"
    - Job ticket status changed to: "Ready for Production"

11. **10:31** - Confirmation email sent to customer
    ```
    Subject: Your Proof is Approved - Order GC-ORD-20260319-001

    Great! Your proof is approved and production will begin immediately.

    Order ID: GC-ORD-20260319-001
    Approved: March 20, 2026 at 10:31

    Timeline:
    - Production: March 20-28
    - Shipping: March 28
    - Expected delivery: April 2
    ```

12. **10:31** - Internal notification sent to production manager
    ```
    PROOF APPROVED: GC-ORD-20260319-001
    Customer: Acme Packaging
    Approved: Mar 20, 10:31 UTC

    ✓ READY TO START PRODUCTION

    [View Job Ticket] [Start Pre-press]
    ```

13. **10:32** - Order detail page shows
    ```
    Status: ✓ Proof Approved
    Files Tab:
    - File: label_artwork_final.pdf
    - Pre-flight: ✓ PASS
    - Proof v1: ✓ APPROVED (Mar 20, 10:31)
    - Production Ready

    Job Ticket: GC-JOB-20260319-001
    Status: Ready for Production
    Current Step: Pre-press (can now start)
    ```

---

### Screen/View Descriptions

#### Screen 1: File Upload Page (Customer-Facing)

**URL:** `/orders/{order_id}/upload?token={token}`

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                  UPLOAD YOUR ARTWORK                        │
│                                                             │
│  Order: GC-ORD-20260319-001                                 │
│  Product: 5000x Labels                                      │
│  Due: March 29, 2026                                        │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │   Drag and drop files here                          │   │
│  │              or                                      │   │
│  │      [Click to Browse Computer]                     │   │
│  │                                                      │   │
│  │  Supported: PDF, AI, PSD, JPG, PNG                  │   │
│  │  Max size: 500 MB per file                          │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─ NEED HELP? ───────────────────────────────────────┐    │
│  │ What files should I upload?                         │    │
│  │ • Adobe InDesign (.ai, .indd)                       │    │
│  │ • Adobe Photoshop (.psd)                            │    │
│  │ • PDF (.pdf, preferred)                             │    │
│  │ • High-res images (.jpg, .png at 300+ DPI)          │    │
│  │                                                      │    │
│  │ Questions? Contact support@gelatoconnect.com         │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**After Upload:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                  FILE UPLOADED ✓                            │
│                                                             │
│  label_artwork_final.pdf (15 MB)                            │
│                                                             │
│  ✓ Pre-flight validation in progress...                    │
│                                                             │
│  [Upload Another File]                                      │
│  [Return to Order]                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Pre-flight Complete (Pass):**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                  ✓ FILE READY                               │
│                                                             │
│  label_artwork_final.pdf (15 MB)                            │
│  Pre-flight Status: ✓ PASS                                  │
│                                                             │
│  ✓ Resolution: OK (300+ DPI)                               │
│  ✓ Color space: CMYK                                        │
│  ✓ Bleed: Present (0.125")                                  │
│  ✓ Fonts: All embedded                                      │
│                                                             │
│  Our team will generate a proof and send it within 24       │
│  hours for your review.                                     │
│                                                             │
│  [Upload Another File]                                      │
│  [Return to Order]                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Pre-flight Fail (With Issues):**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              ⚠️ FILE HAS ISSUES                             │
│                                                             │
│  label_artwork_v1.ai (8 MB)                                 │
│  Pre-flight Status: ISSUES FOUND                            │
│                                                             │
│  🔴 CRITICAL (must fix):                                   │
│  • Linked photo "product.jpg" is 72 DPI (need 300+)       │
│  • Font "BrandFont" not embedded                            │
│                                                             │
│  🟡 RECOMMENDED:                                            │
│  • Convert color space from RGB to CMYK                     │
│  • Add bleed guides (0.125" on all sides)                   │
│                                                             │
│  Please fix these issues and upload again:                  │
│  [Upload Revised File]                                      │
│                                                             │
│  Need help? Contact support@gelatoconnect.com               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Screen 2: Order Detail - Files Tab

**URL:** `/orders/GC-ORD-20260319-001`
**Tab:** Files

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│ OVERVIEW │ FILES │ PROOFING │ JOB TICKETS │ HISTORY         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ FILES & PROOFING STATUS                                     │
│                                                             │
│ ┌─ CURRENT STATUS ──────────────────────────────────────┐   │
│ │ Status: Awaiting Proof Approval                       │   │
│ │ Proof Deadline: March 28, 2026                        │   │
│ │                                                       │   │
│ │ Timeline:                                             │   │
│ │ File Received ✓ (Mar 20)                              │   │
│ │ Pre-flight ✓ (Mar 20)                                 │   │
│ │ Proof Generated ✓ (Mar 20)                            │   │
│ │ Customer Approval ⏳ (due Mar 28)                     │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ FILES ───────────────────────────────────────────────┐   │
│ │                                                       │   │
│ │ label_artwork_final.pdf                              │   │
│ │ Uploaded: Mar 20, 2026 at 09:15                       │   │
│ │ Size: 15 MB                                           │   │
│ │ Status: ✓ Pre-flight Passed                           │   │
│ │                                                       │   │
│ │ [Download] [Replace] [View Details]                  │   │
│ │                                                       │   │
│ │ Proof Generated:                                      │   │
│ │ ✓ Proof v1 (Mar 20, 09:21)                            │   │
│ │   Status: Sent to customer Mar 20, 09:25             │   │
│ │   Customer Action: Awaiting approval                  │   │
│ │   [Download Proof] [Regenerate] [Resend to Customer]  │   │
│ │                                                       │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ ACTIONS ─────────────────────────────────────────────┐   │
│ │ [Send Upload Link Again]                             │   │
│ │ [Upload File On Behalf of Customer]                  │   │
│ │ [Generate Proof] (if not yet generated)               │   │
│ │                                                       │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Functional Requirements

| Req ID | Requirement | Acceptance Criteria | Priority | Notes |
|--------|-------------|-------------------|----------|-------|
| FR-4.1 | Generate upload link | Link created on order creation; expires 30 days; unique token | P0 | Links to upload page (no login) |
| FR-4.2 | Customer file upload | Support PDF, AI, PSD, JPG, PNG; max 500 MB; drag/drop or picker | P0 | Store in cloud (S3/GCS); link in audit trail |
| FR-4.3 | Pre-flight validation | Auto-run on upload; check resolution, color space, bleed, fonts | P0 | Return pass/warning/fail with details |
| FR-4.4 | Soft proof generation | Convert to 150 DPI PDF; add watermark "PROOF"; add crop marks | P0 | Generate within 30 seconds |
| FR-4.5 | Proof email with approval | Template with [Approve] [Request Changes] buttons; attachment | P0 | Email authenticated via token (no login) |
| FR-4.6 | Instant approval | Customer clicks [Approve]; one-click, no forms | P0 | Email token authenticated; audit trail logged |
| FR-4.7 | Rejection with feedback | Customer enters feedback; pre-press notified with reason | P0 | Feedback max 500 chars; deadline 24h |
| FR-4.8 | File versioning | Support multiple uploads; track versions; show history | P1 | Versions linked in audit trail |
| FR-4.9 | Proof reminders | Auto-send if no approval 48h; escalate at 1 day before due | P1 | Scheduled jobs; configurable timers |
| FR-4.10 | Internal notifications | Pre-press notified on file upload/pre-flight; ops notified on approval | P0 | In-app + email notifications |
| FR-4.11 | Resend upload link | CSR can resend link to customer; tracked in audit trail | P1 | Same token; audit log entry |
| FR-4.12 | Upload on behalf | Staff can upload file for customer; marked in audit trail | P1 | Requires CSR role |

---

### Data Requirements

#### Entity: OrderFile

```
Table: order_files

Fields:
- id (UUID) PK
- order_id (UUID, FK)
- filename (STRING, max 255) [original filename]
- file_path (STRING) [S3/GCS path]
- file_size_bytes (BIGINT)
- file_type (STRING) [MIME type, e.g., "application/pdf"]
- file_version (INTEGER) default: 1
- uploaded_by_user_id (UUID, FK) [null if customer upload]
- uploaded_at (TIMESTAMP) default: NOW()
- status (ENUM) [Uploaded, PreflightInProgress, PreflightPass, PreflightFail, ProofGenerated, Approved, Rejected]
- preflight_result (ENUM) [null, Pass, Warning, Fail]
- preflight_details (JSONB) [{ resolution: ok, colors: ok, bleed: ok, fonts: ok, ... }]
- proof_file_path (STRING) [nullable, S3 path to soft proof]
- proof_version (INTEGER) default: 0 [0 = no proof generated]
- proof_generated_at (TIMESTAMP) [nullable]
- approval_status (ENUM) [null, Approved, Rejected, AwaitingApproval]
- approved_at (TIMESTAMP) [nullable]
- rejection_reason (TEXT, max 500) [nullable]
- created_at (TIMESTAMP) default: NOW()
- updated_at (TIMESTAMP) default: NOW()

Indexes:
- (order_id)
- (status)
- (file_version)
```

#### Entity: ProofApproval

```
Table: proof_approvals

Fields:
- id (UUID) PK
- order_file_id (UUID, FK)
- proof_version (INTEGER)
- approval_status (ENUM) [Approved, Rejected, Pending]
- approved_at (TIMESTAMP) [nullable]
- approved_by (STRING) [customer email or user ID]
- rejection_reason (TEXT, max 500) [nullable]
- rejection_comment (TEXT, max 500) [nullable; customer feedback]
- email_sent_at (TIMESTAMP) [when proof email sent]
- reminder_sent_at (TIMESTAMP, array) [track multiple reminders]
- created_at (TIMESTAMP) default: NOW()
- updated_at (TIMESTAMP) default: NOW()

Indexes:
- (order_file_id)
- (approval_status)
```

---

### Edge Cases and Error Handling

| Edge Case | Trigger | System Behavior | User Feedback |
|-----------|---------|-----------------|----------------|
| **Token expires before upload** | Customer tries to upload after 30 days | File upload rejected; token invalid | Error: "Upload link has expired. Contact us for new link." [Contact us] |
| **File already exists (same name)** | Customer uploads "label.pdf", then uploads "label.pdf" again | New upload treated as version 2 | Confirmation: "Replace existing file? [Yes] [Cancel]" |
| **Pre-flight fails; customer uploads 3 times** | Repeated failures; customer can't fix | System allows unlimited uploads | Each upload versioned; CSR can help customer |
| **Proof email bounces** | Invalid customer email | Proof not delivered; CSR notified | Internal alert: "Proof email failed to send to acme@example.com. Resend or contact customer?" |
| **Customer approves after production started** | Approval comes in late but before complete | Order/job status should reflect approval | Audit trail shows approval late; production continues unaffected |
| **Approval link clicked twice** | Customer clicks [Approve] button twice | Idempotent; second click ignored | Confirmation page shown again (no double-approval) |
| **Pre-flight detects unsupported fonts** | Fonts not safe for print (e.g., web fonts) | Pre-flight warns; suggests conversion | Warning: "Convert custom fonts to outlines before production" |
| **File too large (>500 MB)** | Customer tries to upload 1 GB file | Upload rejected at browser validation and server | Error: "File too large (1000 MB). Max is 500 MB. Compress and retry." |
| **Proof generation takes too long** | Complex PDF with hundreds of images | Generation timeout after 30 seconds | Operator notified: "Proof generation timed out. Try again or contact support." |
| **Soft proof watermark not visible in print** | Customer accidentally prints proof and produces it | PROOF watermark should be prominent enough | Watermark at 20% opacity; prominently says "NOT FOR PRODUCTION" |
| **Multiple proofs; customer loses track** | v1, v2, v3 sent; customer approves wrong version | System tracks version number; approval links proof to correct version | Approval email clearly states "Proof v3" |
| **Customer rejects but doesn't provide feedback** | Clicks [Request Changes] without typing comment | Feedback optional (shows "no feedback provided") | CSR can contact customer separately |
| **Upload link shared across users** | Customer forwards upload link to colleague | Colleague can upload files to order | Expected behavior (link is shareable); no issues |

---

## PRD 5: Automated Customer Communication Triggers

### Problem Statement

Customers need to know what's happening with their order at each key milestone. Manual emails are error-prone and time-consuming. The system must automatically send email notifications at key status changes (order placed, file received, proof ready, production started, shipped) while allowing PSPs to customize which triggers apply, email templates, and per-customer opt-in/out.

### Solution Overview

 > **Implementation Note:** GelatoConnect already has a notification infrastructure for sending order status emails, tracking updates, and customer communications. This PRD should reuse and extend that existing system rather than building a new email/notification service from scratch. The trigger-based approach described below should hook into GelatoConnect's existing event system and email templates.

An automated notification system that:

1. **Defines trigger events** - key status changes that should notify customer
   - Order created
   - File received
   - Pre-flight passed/failed
   - Proof generated
   - Proof approved
   - Production started
   - Production completed
   - Ready to ship
   - Order shipped
   - Delivery reminder (address pending)
   - Proof approval reminder (48h)

2. **Sends template-based emails** - PSP can customize templates
   - Default templates provided
   - PSP can override per trigger
   - Supports variable substitution: {order_id}, {customer_name}, {product}, {due_date}, {tracking_number}

3. **Tracks send status** - audit trail of all notifications
   - Email address
   - Template used
   - Send timestamp
   - Status (sent, bounced, opened, clicked)
   - Link clicks tracked (if applicable)

4. **Respects customer preferences**
   - Per-customer opt-in/out of triggers
   - Default: opt-in to all (customer can disable)
   - Config: which triggers are mandatory vs optional

5. **Enables re-sending** - if customer misses email or bounce
   - CSR can manually resend any notification
   - Tracked in audit trail

### User Stories

#### US 5.1: Send Order Confirmation Email

**As a** System (triggered on order creation)
**I want to** send order confirmation to customer immediately
**So that** customer knows their order was placed and production timeline begins

**Acceptance Criteria:**

1. When order status changes to "Confirmed" (or "Pending Address" with email):
   - Trigger: "ORDER_CREATED"
   - System queries order details
   - System queries PSP's email template for ORDER_CREATED trigger
   - System generates email from template (with variable substitution)

2. Email template (default):
   ```
   Subject: Order Confirmation #{order_id} - {product_summary}

   Dear {customer_name},

   Thank you for your order! Here are your details:

   Order ID: {order_id}
   Order Date: {order_date}

   Product: {product_summary}
   Quantity: {quantity}
   Total: {total_price}

   Delivery Address:
   {delivery_address_full}

   Estimated Timeline:
   - We'll send artwork upload instructions shortly
   - After you upload, we'll generate a proof (24-48 hours)
   - Once approved, production begins (~{estimated_production_days} days)
   - Shipping: {estimated_ship_date}

   Special Instructions:
   {special_instructions}

   Questions? Contact us at {support_email}

   --- {company_name} Customer Support ---
   {company_phone}
   {company_url}
   ```

3. System substitutes variables:
   - {order_id} → GC-ORD-20260319-001
   - {customer_name} → Acme Packaging
   - {product_summary} → 5000x Labels, 4-color
   - {quantity} → 5000 units
   - {total_price} → $2,850.00
   - {delivery_address_full} → 1200 Industrial Blvd, Chicago, IL 60622, USA
   - {estimated_production_days} → 10
   - {estimated_ship_date} → March 29, 2026
   - {special_instructions} → Match PMS 485 on label
   - All other variables from org config

4. Email sent to customer: acme@example.com
5. Send status recorded in audit trail:
   - notification_type: ORDER_CREATED
   - recipient: acme@example.com
   - template_used: "order_confirmation_default"
   - sent_at: Mar 19, 14:33 UTC
   - status: "Sent"
   - opens: 0 (tracked if email opened)

6. Order detail page, Audit Trail shows:
   - "Order confirmation email sent to acme@example.com on Mar 19 at 14:33"

---

#### US 5.2: Send File Received Notification

**As a** System (triggered on file upload)
**I want to** notify PSP staff that file was received
**So that** production team knows to start pre-flight and proofing

**Acceptance Criteria:**

1. Trigger: "FILE_UPLOADED"
   - When: File record created and uploaded successfully
   - Who: To PSP staff (production manager, pre-press operator)
   - Template: Internal notification (different from customer)

2. Internal notification email (to PSP):
   ```
   Subject: File Received - Order GC-ORD-20260319-001

   File uploaded for Order GC-ORD-20260319-001:

   Order: GC-ORD-20260319-001
   Customer: Acme Packaging
   Product: 5000x Labels
   Quantity: 5000
   Due: March 29, 2026

   File:
   - Filename: label_artwork_final.pdf
   - Size: 15 MB
   - Uploaded: March 20, 2026 at 09:15

   Next Steps:
   1. Pre-flight validation will run automatically
   2. If passed, generate proof and send to customer
   3. If issues found, contact customer with feedback

   [View Order] [View File] [Start Proof Process]

   Job Ticket: GC-JOB-20260319-001
   ```

3. Sent to: production_manager@psp.com (or all pre-press operators if configured)
4. Notification recorded
5. In-app notification also sent (see PRD 5 for in-app notifications)

---

#### US 5.3: Send Proof Ready Email

**As a** System (triggered on proof generation)
**I want to** send proof to customer with approval buttons
**So that** customer can approve or request changes immediately

**Acceptance Criteria:**

1. Trigger: "PROOF_GENERATED"
   - When: Soft proof created and ready to send
   - Who: To customer (email with attachment)

2. Email template:
   ```
   Subject: Your Proof is Ready for Approval - {order_id}

   Dear {customer_name},

   Your proof is ready! Please review and approve.

   Order: {order_id}
   Product: {product_summary}

   [APPROVE THIS PROOF] [REQUEST CHANGES]

   What's attached: A PDF preview of your labels exactly as they'll print.

   Color Note: This proof is on screen (RGB). Printed colors may vary slightly.

   Deadline: Please approve or request changes by {proof_deadline}.

   Questions? Contact us at {support_email}

   --- {company_name} ---
   ```

3. Buttons are email-authenticated links (no login required):
   - [APPROVE]: `https://gelato-connect-mis.vercel.app/orders/{order_id}/proof/{proof_id}/approve?token={token}`
   - [REQUEST CHANGES]: `https://gelato-connect-mis.vercel.app/orders/{order_id}/proof/{proof_id}/reject?token={token}`

4. Proof PDF attached
5. Notification recorded:
   - sent_at: timestamp
   - status: "Sent"
   - attachments: ["proof_v1_label_artwork_final.pdf"]

6. Approval reminder scheduled for 48 hours later (see US 5.5)

---

#### US 5.4: Send Production Started Notification

**As a** System (triggered on production start)
**I want to** notify customer that production has begun
**So that** customer knows timeline is in progress

**Acceptance Criteria:**

1. Trigger: "PRODUCTION_STARTED"
   - When: Job ticket status changes to "In Production" (or first production step started)
   - Who: To customer

2. Email template:
   ```
   Subject: Your Order is in Production - {order_id}

   Dear {customer_name},

   Great news! Your order has entered production.

   Order: {order_id}
   Product: {product_summary}
   Started: {production_start_date}
   Expected Completion: {estimated_completion_date}

   Production Timeline:
   {production_steps_with_progress}

   We'll send you updates as your order progresses.

   Order Details:
   Quantity: {quantity}
   Delivery Address: {delivery_address_full}

   Questions? Contact us at {support_email}

   --- {company_name} ---
   ```

3. Template variable: {production_steps_with_progress} shows:
   ```
   ✓ Pre-press (completed Mar 21)
   ⏳ Printing (started Mar 21, expected 3 days)
   ○ Finishing (expected Mar 24)
   ○ Pack (expected Mar 25)
   ○ Ship (expected Mar 29)
   ```

4. Sent immediately when production starts
5. Notification recorded

---

#### US 5.5: Send Proof Approval Reminder (48-hour timeout)

**As a** System (scheduled job at 48-hour mark)
**I want to** remind customer to approve proof
**So that** production isn't delayed waiting for approval

**Acceptance Criteria:**

1. Trigger: "PROOF_APPROVAL_REMINDER"
   - When: Proof sent 48 hours ago AND no approval yet
   - Who: To customer

2. Reminder email template:
   ```
   Subject: Reminder: Your Proof Needs Approval - {order_id}

   Dear {customer_name},

   We sent you a proof 48 hours ago for Order {order_id}.

   We haven't heard back yet. Please approve or request changes so we can move forward.

   Deadline: {proof_deadline}

   [APPROVE THIS PROOF] [REQUEST CHANGES]

   If you didn't receive the original email, you can review your proof here:
   [DOWNLOAD PROOF]

   Questions? Contact us at {support_email}

   Order: {order_id}
   Product: {product_summary}

   --- {company_name} ---
   ```

3. Buttons: same as proof email (email-authenticated)
4. Scheduled to run: every 6 hours, checks for pending proofs
5. Only sends if:
   - proof_sent_at > 48 hours ago
   - approval_status is null or "Pending"
   - no reminder sent yet (or last reminder >24h ago)
6. Notification recorded with reminder_sent_timestamp

---

#### US 5.6: Send Order Shipped Notification with Tracking

**As a** System (triggered when order marked shipped)
**I want to** send tracking information to customer
**So that** customer can track delivery

**Acceptance Criteria:**

1. Trigger: "ORDER_SHIPPED"
   - When: Order status changes to "Shipped" (or logistics module sends shipment signal)
   - Who: To customer

2. Email template:
   ```
   Subject: Your Order is on Its Way! Track It Here - {order_id}

   Dear {customer_name},

   Your order is being shipped! Track it using the link below.

   Order: {order_id}
   Shipped: {ship_date}
   Tracking Number: {tracking_number}
   Carrier: {carrier_name}
   Expected Delivery: {estimated_delivery_date}

   [TRACK YOUR SHIPMENT]

   Shipment Details:
   From: {company_address}
   To: {delivery_address_full}

   Items:
   {product_summary} (Qty: {quantity})

   Questions? Contact us at {support_email}

   --- {company_name} ---
   ```

3. [TRACK YOUR SHIPMENT] button links to carrier tracking (external URL)
4. Notification recorded
5. Link clicks tracked (if email platform supports it)

---

#### US 5.7: Send Address Reminder (Pending Address)

**As a** System (scheduled for orders with Pending Address)
**I want to** remind customer to provide delivery address
**So that** production isn't blocked waiting for address

**Acceptance Criteria:**

1. Trigger: "ADDRESS_REMINDER"
   - When: Order status is "Pending Address" AND created 1 day ago (or created without address)
   - Who: To customer

2. Email template:
   ```
   Subject: We Need Your Delivery Address - Order {order_id}

   Dear {customer_name},

   We're ready to produce your order, but we need your delivery address!

   Order: {order_id}
   Product: {product_summary}
   Due: {due_date}

   Please provide your delivery address as soon as possible:

   [PROVIDE ADDRESS]

   Or reply to this email with:
   Street Address:
   City:
   State/Province:
   Postal Code:
   Country:

   Questions? Contact us at {support_email}

   --- {company_name} ---
   ```

3. Sent immediately on Day 1 (see PRD 1 for address flow)
4. Additional reminders sent on Day 3 and Day 5 (if address still pending)

---

#### US 5.8: Configure Notification Triggers (Admin Settings)

**As a** PSP Admin
**I want to** configure which notification triggers are enabled
**So that** we control customer communication

**Acceptance Criteria:**

1. Navigation: Settings > Notifications > Email Triggers
2. Page shows table of all triggers:
   ```
   Trigger | Description | Enabled | To Customer | To PSP | [Edit Template]
   ───────────────────────────────────────────────────────────────────────
   ORDER_CREATED | Order placed | ☑ | ☑ | ☑ | [Edit]
   FILE_UPLOADED | File received | ☑ | ☐ | ☑ | [Edit]
   PROOF_GENERATED | Proof ready | ☑ | ☑ | ☐ | [Edit]
   PRODUCTION_STARTED | Production begun | ☑ | ☑ | ☑ | [Edit]
   ORDER_SHIPPED | Order shipped | ☑ | ☑ | ☐ | [Edit]
   ADDRESS_REMINDER | Address pending | ☑ | ☑ | ☑ | [Edit]
   PROOF_REMINDER | Proof approval due | ☑ | ☑ | ☑ | [Edit]
   ```

3. For each trigger:
   - Enabled checkbox: turn trigger on/off
   - "To Customer" checkbox: send to customer email
   - "To PSP" checkbox: send internal notification (PSP staff)
   - [Edit Template] link: opens template editor

4. Admin clicks [Edit] on ORDER_CREATED
5. Modal opens: "Edit Email Template - Order Created"
   ```
   Subject: [Order Confirmation #{order_id} - {product_summary}]

   [Textarea with template text]

   Variables available:
   {order_id}, {customer_name}, {customer_email}, {product_summary},
   {quantity}, {total_price}, {delivery_address_full},
   {estimated_production_days}, {estimated_ship_date}, {special_instructions},
   {company_name}, {company_url}, {support_email}

   [Save Template] [Reset to Default] [Preview] [Cancel]
   ```

6. Admin customizes template (e.g., adds company logo reference, changes wording)
7. Clicks "[Preview]" to see rendered email
8. Clicks "[Save Template]"
9. New template saved; will be used for all future ORDER_CREATED triggers
10. Audit trail: "Email template updated: ORDER_CREATED by Admin"

---

#### US 5.9: Per-Customer Notification Preferences

**As a** Sales Representative
**I want to** configure which notifications a specific customer receives
**So that** we respect customer communication preferences

**Acceptance Criteria:**

1. Customer record has "Notification Preferences" section
2. Checkboxes for each trigger:
   - [☑] Order Confirmation
   - [☑] File Upload Confirmation
   - [☑] Proof Ready
   - [☑] Production Started
   - [☑] Order Shipped
   - [☑] Delivery Reminder
   - [☐] Unsubscribed from all (master opt-out)

3. Default: all checked (customer receives all notifications)
4. CSR can uncheck specific triggers if customer requested
5. CSR can check "Unsubscribed" to block all future emails
6. Changes saved; affects this customer only

7. When trigger fires:
   - System checks customer's preference for that trigger
   - If unchecked or unsubscribed: email not sent
   - Audit trail logs: "Email suppressed (customer preference)"

---

#### US 5.10: Resend Notification Manually

**As a** Customer Service Representative
**I want to** resend a notification if customer missed the email
**So that** we maintain communication even if emails bounce or are marked spam

**Acceptance Criteria:**

1. Order detail page, Audit Trail tab, shows all notifications sent:
   ```
   Mar 19, 14:33 │ Order confirmation sent to acme@example.com │ Status: Sent ✓
   Mar 20, 09:25 │ Proof ready sent to acme@example.com         │ Status: Sent ✓
   Mar 22, 14:30 │ Proof reminder sent to acme@example.com      │ Status: Sent ✓
   ```

2. Click "[Resend]" link next to any notification
3. Modal confirms: "Resend proof ready email to acme@example.com?"
4. CSR clicks "[Confirm]"
5. System resends email using same template
6. Notification record updated:
   - Adds entry: "Mar 25, 09:00 | Proof ready resent to acme@example.com | Status: Sent ✓ | Reason: Manual resend"
7. Audit trail: "Email resent by [CSR] at [timestamp]"

---

#### US 5.11: Track Email Opens and Clicks

**As a** Sales Manager
**I want to** see if customers opened emails and clicked tracking links
**So that** I can follow up if customer ignores notifications

**Acceptance Criteria:**

1. Notification record stores:
   - open_status: Unopened, Opened (with timestamp)
   - clicks: array of { link_name, clicked_at, click_count }
   - last_opened_at: timestamp

2. Email sent with tracking pixel (1x1 transparent GIF) embedded
   - Allows detecting email open (if supported by email client)
   - Click tracking links wrapped (e.g., `click.gelato-connect.com/track?...`)

3. Dashboard or Notifications tab shows summary:
   ```
   Order Confirmation (Mar 19, 14:33):
   Status: ✓ Sent
   Opened: ✓ (Mar 19, 15:10)
   Clicks: [APPROVE] (0 clicks)

   Proof Ready (Mar 20, 09:25):
   Status: ✓ Sent
   Opened: ✓ (Mar 20, 09:45)
   Clicks: [APPROVE] (1 click Mar 20, 10:31) ✓ APPROVED
   ```

4. CSR can see: "Customer opened email but hasn't approved proof yet" → can follow up

---

### Detailed User Journey

#### Journey: Order Creation → Confirmation → File Upload → Proof → Approval (All Notifications)

**Timeline of notifications for order GC-ORD-20260319-001:**

**Mar 19, 14:33** - Order Created
1. Sarah converts estimate to order
2. System detects: order_status = "Confirmed" AND customer.email = acme@example.com
3. Trigger: ORDER_CREATED fires
4. System queries template: "order_confirmation_default"
5. Email generated with substituted variables
6. Sent to: acme@example.com
7. Notification logged:
   - type: ORDER_CREATED
   - sent_to: acme@example.com
   - sent_at: Mar 19, 14:33
   - template: "order_confirmation_default"
8. Customer receives: "Order Confirmation GC-ORD-20260319-001 - 5000x Labels"
9. Email includes: order details, timeline, [upload link]
10. Link click tracked (if customer clicks upload link in email)

**Mar 19, 14:35** - Upload Link Sent (automatic, part of ORDER_CREATED email)
- Upload link included in order confirmation email
- Email token: unique, 30-day expiration
- Tracked in notification: "Upload link embedded in order confirmation"

**Mar 20, 09:15** - File Uploaded (no automatic customer notification)
- Customer uploads: label_artwork_final.pdf
- System triggers: FILE_UPLOADED
- Notification sent to PSP staff (production_manager@psp.com):
  - "File Received - Order GC-ORD-20260319-001"
  - Details: filename, size, upload time
- PSP team notified; customer not notified (no automatic notification)
- Logged: "Internal notification: File received sent to production_manager@psp.com"

**Mar 20, 09:18** - Pre-flight Complete (no notification)
- Pre-flight validation passes
- System note: file ready for proof
- No automatic customer notification
- Logged in audit trail only

**Mar 20, 09:25** - Proof Generated and Sent
1. Pre-press operator clicks "[Generate Proof]"
2. System converts file to soft proof (watermarked, 150 DPI)
3. Trigger: PROOF_GENERATED fires
4. Email template: "proof_ready_default"
5. Email sent to customer:
   - Subject: "Your Proof is Ready for Approval - GC-ORD-20260319-001"
   - Body: includes review request, [APPROVE] [REQUEST CHANGES] buttons
   - Attachment: proof_v1_label_artwork_final.pdf
   - Deadline: March 28
6. Notification logged:
   - type: PROOF_GENERATED
   - sent_to: acme@example.com
   - sent_at: Mar 20, 09:25
   - template: "proof_ready_default"
   - attachments: ["proof_v1...pdf"]
   - approval_deadline: Mar 28
7. Scheduled reminder: 48 hours later (Mar 22, 09:25)
8. Customer receives email; downloads PDF; reviews proof

**Mar 20, 14:30** - Proof Approved (no notification; approval confirmation sent)
1. Customer clicks "[APPROVE THIS PROOF]" in email
2. System processes approval
3. Trigger: PROOF_APPROVED fires (new trigger)
4. Email confirmation sent to customer:
   - Subject: "Your Proof is Approved - GC-ORD-20260319-001"
   - Body: "Great! Production will begin immediately"
5. Internal notification sent to production manager:
   - "PROOF APPROVED: GC-ORD-20260319-001"
   - "READY TO START PRODUCTION"
6. Notifications logged:
   - Customer confirmation: "Proof approved confirmation sent"
   - PSP alert: "Internal notification: Production ready sent to production_manager@psp.com"

**Mar 20, 15:00** - Production Started (customer notification)
1. Pre-press operator starts working on artwork
2. Job ticket step status: "Pre-press" → "In Progress"
3. Trigger: PRODUCTION_STARTED fires
4. Email template: "production_started_default"
5. Email sent to customer:
   - Subject: "Your Order is in Production - GC-ORD-20260319-001"
   - Body: shows production timeline, steps with status
   - Expected completion date
6. Notification logged:
   - type: PRODUCTION_STARTED
   - sent_at: Mar 20, 15:00
   - template: "production_started_default"

**Mar 22, 09:25** - Proof Approval Reminder (if not approved)
- (Skipped in this journey because proof was approved)
- If approval pending: reminder email sent
- Tracked: "Proof approval reminder would be sent here"

**Mar 28, 16:00** - Order Shipped
1. Logistics module marks order as shipped
2. Tracking number assigned: TRACK-123456789
3. Trigger: ORDER_SHIPPED fires
4. Email template: "order_shipped_default"
5. Email sent to customer:
   - Subject: "Your Order is on Its Way! - GC-ORD-20260319-001"
   - Body: tracking number, carrier, estimated delivery date
   - [TRACK YOUR SHIPMENT] button links to carrier
6. Notification logged:
   - type: ORDER_SHIPPED
   - sent_at: Mar 28, 16:00
   - tracking_number: TRACK-123456789
   - carrier: UPS
   - link_clicks: tracked if customer uses tracking link

**Complete Audit Trail for Customer:**
```
Mar 19, 14:33 │ Order Confirmation Email         │ Sent ✓ | Opened Mar 19 15:15
Mar 20, 09:25 │ Proof Ready Email (with PDF)    │ Sent ✓ | Opened Mar 20 09:30
Mar 20, 14:30 │ Proof Approved Confirmation      │ Sent ✓ | Opened Mar 20 14:35
Mar 20, 15:00 │ Production Started Notification  │ Sent ✓ | Opened Mar 20 15:10
Mar 28, 16:00 │ Order Shipped with Tracking      │ Sent ✓ | Opened Mar 28 16:15 | Clicked tracking (1x)
```

---

### Screen/View Descriptions

#### Screen 1: Notification Configuration Page

**URL:** `/settings/notifications/triggers`

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│ Settings > Notifications > Email Triggers                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Configure automatic email notifications sent to customers   │
│ and PSP staff at key order milestones.                      │
│                                                             │
│ ┌─ NOTIFICATION TRIGGERS ───────────────────────────────┐   │
│ │                                                       │   │
│ │ ☑ ORDER CREATED (Order Confirmation)                 │   │
│ │   To Customer: ☑  To PSP Staff: ☑                    │   │
│ │   [Edit Template]                                     │   │
│ │   Status: Active (sent to all new orders)             │   │
│ │                                                       │   │
│ │ ☑ FILE UPLOADED (File Received)                       │   │
│ │   To Customer: ☐  To PSP Staff: ☑                    │   │
│ │   [Edit Template]                                     │   │
│ │   Status: Active (PSP only, not customer)             │   │
│ │                                                       │   │
│ │ ☑ PROOF GENERATED (Proof Ready)                       │   │
│ │   To Customer: ☑  To PSP Staff: ☐                    │   │
│ │   [Edit Template]                                     │   │
│ │   Status: Active                                      │   │
│ │                                                       │   │
│ │ ☑ PRODUCTION_STARTED (Production Begun)              │   │
│ │   To Customer: ☑  To PSP Staff: ☑                    │   │
│ │   [Edit Template]                                     │   │
│ │   Status: Active                                      │   │
│ │                                                       │   │
│ │ ☑ ORDER_SHIPPED (Order Shipped)                       │   │
│ │   To Customer: ☑  To PSP Staff: ☐                    │   │
│ │   [Edit Template]                                     │   │
│ │   Status: Active                                      │   │
│ │                                                       │   │
│ │ ☑ ADDRESS_REMINDER (Address Pending)                 │   │
│ │   To Customer: ☑  To PSP Staff: ☑                    │   │
│ │   [Edit Template]                                     │   │
│ │   Reminders: Day 1, Day 3, Day 5                      │   │
│ │   Status: Active                                      │   │
│ │                                                       │   │
│ │ ☑ PROOF_REMINDER (Proof Approval Due)                │   │
│ │   To Customer: ☑  To PSP Staff: ☑                    │   │
│ │   [Edit Template]                                     │   │
│ │   Reminder sent: 48 hours after proof sent            │   │
│ │   Status: Active                                      │   │
│ │                                                       │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ [Save Changes]  [Reset All to Defaults]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Screen 2: Email Template Editor

**URL:** `/settings/notifications/templates/ORDER_CREATED`

**Modal:**

```
┌─────────────────────────────────────────────────────────────┐
│ Edit Email Template - Order Confirmation                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Email Subject:                                              │
│ [Order Confirmation #{order_id} - {product_summary}]       │
│                                                             │
│ Email Body (Plain Text):                                    │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ Dear {customer_name},                                │    │
│ │                                                      │    │
│ │ Thank you for your order! Here are your details:    │    │
│ │                                                      │    │
│ │ Order ID: {order_id}                                │    │
│ │ Order Date: {order_date}                            │    │
│ │                                                      │    │
│ │ Product: {product_summary}                          │    │
│ │ Quantity: {quantity}                                │    │
│ │ Total: {total_price}                                │    │
│ │                                                      │    │
│ │ [Scrollable textarea with full template]            │    │
│ │                                                      │    │
│ └──────────────────────────────────────────────────────┘    │
│                                                             │
│ Available Variables:                                         │
│ {order_id} {customer_name} {customer_email}                 │
│ {product_summary} {quantity} {total_price}                  │
│ {delivery_address_full} {estimated_production_days}         │
│ {estimated_ship_date} {special_instructions}                │
│ {company_name} {support_email}                              │
│                                                             │
│ [Preview Email] [Save Template] [Reset to Default] [Cancel] │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Functional Requirements

| Req ID | Requirement | Acceptance Criteria | Priority | Notes |
|--------|-------------|-------------------|----------|-------|
| FR-5.1 | Trigger-based automation | Define 7+ trigger events; fire on status change | P0 | Queue-based; async processing |
| FR-5.2 | Template-based emails | Support variable substitution; PSP customizable | P0 | Default templates provided |
| FR-5.3 | Customer notifications | Send to customer email on key milestones | P0 | Email validation; bounce handling |
| FR-5.4 | PSP internal notifications | Notify staff on file upload, approvals | P0 | Email + in-app notifications |
| FR-5.5 | Scheduled reminders | Send reminders at 48h, Day 3, Day 5 | P1 | Cron jobs; configurable timers |
| FR-5.6 | Audit trail | Log all notifications sent; track opens/clicks | P0 | Immutable log; timestamps |
| FR-5.7 | Per-customer preferences | Customers can opt-out of specific triggers | P1 | Stored in customer record |
| FR-5.8 | Manual resend | CSR can manually resend any notification | P1 | Uses same template; logged as manual |
| FR-5.9 | Email tracking | Track opens (pixel) and link clicks | P2 | Requires email platform support |
| FR-5.10 | Template preview | Admin can preview rendered email before saving | P2 | Shows final email with variables subst |
| FR-5.11 | Multi-language support | Templates can have language variants | P3 | Future: support multiple languages |
| FR-5.12 | Bounce handling | Detect bounces; suppress future emails | P2 | Integrate with email service |

---

### Data Requirements

#### Entity: Notification

```
Table: notifications

Fields:
- id (UUID) PK
- order_id (UUID, FK) [nullable - some notifications aren't order-specific]
- notification_type (ENUM) [ORDER_CREATED, FILE_UPLOADED, PROOF_GENERATED, etc.]
- recipient_email (STRING, required)
- recipient_user_id (UUID, FK) [nullable, for internal notifications]
- subject (STRING, max 255)
- template_used (STRING) [template name, e.g., "order_confirmation_default"]
- body (TEXT) [full rendered email body]
- send_status (ENUM) [Queued, Sent, Failed, Bounced] default: Queued
- sent_at (TIMESTAMP) [nullable]
- failed_reason (TEXT) [nullable, e.g., "Invalid email address"]
- open_count (INTEGER) default: 0
- first_opened_at (TIMESTAMP) [nullable]
- last_opened_at (TIMESTAMP) [nullable]
- link_clicks (JSONB) [array of { link_name, clicked_at, click_count }]
- is_manual_resend (BOOLEAN) default: false
- created_by_user_id (UUID, FK) [if manual; null if automatic]
- created_at (TIMESTAMP) default: NOW()
- updated_at (TIMESTAMP) default: NOW()

Indexes:
- (order_id, notification_type)
- (recipient_email)
- (send_status)
- (created_at)
```

#### Entity: EmailTemplate

```
Table: email_templates

Fields:
- id (UUID) PK
- organization_id (UUID, FK) [PSP's org]
- notification_type (ENUM) [ORDER_CREATED, FILE_UPLOADED, ...]
- subject (STRING, max 255)
- body (TEXT) [template with {variable} placeholders]
- is_enabled (BOOLEAN) default: true
- send_to_customer (BOOLEAN) default: true
- send_to_psp (BOOLEAN) default: false [for internal notifications]
- created_by_user_id (UUID)
- created_at (TIMESTAMP) default: NOW()
- updated_at (TIMESTAMP) default: NOW()
- is_default (BOOLEAN) default: false [true for system defaults]

Indexes:
- (organization_id, notification_type) UNIQUE
- (is_enabled)
```

#### Entity: CustomerNotificationPreference

```
Table: customer_notification_preferences

Fields:
- id (UUID) PK
- customer_id (UUID, FK)
- organization_id (UUID, FK)
- notification_type (ENUM)
- is_enabled (BOOLEAN) default: true
- is_unsubscribed_all (BOOLEAN) default: false [global opt-out]
- created_at (TIMESTAMP) default: NOW()
- updated_at (TIMESTAMP) default: NOW()

Indexes:
- (customer_id, organization_id)
- (customer_id, notification_type) UNIQUE
```

---

### Edge Cases and Error Handling

| Edge Case | Trigger | System Behavior | User Feedback |
|-----------|---------|-----------------|----------------|
| **Invalid customer email** | Order created with bad email | Email not sent; notification status = Failed | Audit trail: "Email failed: Invalid address"; CSR notified to update |
| **Email bounces permanently** | Bounce detected (550 error) | Suppress future emails to that address | customer.email_bounced = true; flag for manual contact |
| **Customer unsubscribed from all** | Customer marked unsubscribed_all = true | No emails sent for any trigger | Audit trail: "Customer unsubscribed; email suppressed" |
| **Template variable missing** | Template references {undefined_variable} | Use empty string or [MISSING VALUE] | Log warning; email still sends; admin alerted to fix template |
| **Trigger fires multiple times in 1 second** | Race condition on status update | Deduplicate; check notification exists from same trigger+order+timestamp | Only one email sent; extra trigger ignored |
| **Scheduled reminder job fails** | Cron job crashes | Retry job; alert admin if 3 retries fail | Email not sent; admin notified to investigate |
| **Email template not found** | Template deleted but trigger still references it | Use default template for notification type | Log warning; email sent with default template |
| **Custom template has syntax error** | Admin saves template with invalid variable syntax | Validation blocks save; error shown | Error modal: "Invalid template: {variable} not recognized" |
| **Email platform rate limit hit** | Too many emails queued; platform throttles | Queue emails; retry with exponential backoff | Notifications sent slower; eventually all delivered |
| **Customer approves proof before email received** | Email in transit; customer approves via portal | No duplicate approval email sent | Approval confirmation email sent once |
| **Proof approval reminder sent but already approved** | Reminder scheduled 48h ago; customer approved at 47h | Check approval_status before sending reminder | Email not sent; notification suppressed |
| **Resend requested by CSR for 1-year-old email** | CSR clicks resend on very old notification | Email sent with current template (may differ from original) | Notification logged as "Manual resend (template may differ)" |

---

### Integration Points

| Module | Data Sent | Data Received | Format | Frequency |
|--------|-----------|---------------|--------|-----------|
| Order (PRD 1) | Order ID, status, customer email | N/A | Order reference | On status change |
| File Receipt (PRD 4) | File upload status | N/A | File entity | On upload |
| Job Ticketing (PRD 3) | Step status changes | N/A | Step reference | Real-time |
| Email Service (ESP) | Email content, recipient, template | Bounce/open/click events | Email API | Real-time |
| Customer Module | Customer email, preferences | N/A | Customer entity | On order create |
| Analytics | Notification sent count, opens, clicks | N/A | Metrics | Daily batch |
| Logistics | Shipment status, tracking number | N/A | Shipment entity | On ship event |

---

## Summary

**PRDs 1-5 Complete:**

This comprehensive document defines the full Phase 1 WS1: Pre-Order Workflow for GelatoConnect MIS. All 5 PRDs are production-ready for agentic code generation:

1. **PRD 1: Quote-to-Order Conversion** - Seamless estimate → order conversion with address handling, duplicate detection, manual orders
2. **PRD 2: Post-Conversion Order Editing** - Edit quantities, addresses, costs post-creation with full audit trail and role-based permissions
3. **PRD 2.1: Reprints and Remakes** - Initiated by CSR; cost attribution by reason code; linked to originals
4. **PRD 3: Job Ticketing** - Auto-generated from orders; **CRITICAL: fully configurable production steps per PSP**; versioned; supports digital + physical
5. **PRD 4: File Receipt and Proofing** - Upload links, pre-flight validation, soft proofs, one-click approval, version tracking
6. **PRD 5: Automated Customer Communication** - 7+ trigger events, customizable templates, per-customer preferences, audit trail with opens/clicks

**Key Features:**
- Every screen designed to exact detail (modals, tables, buttons, error messages)
- All user journeys traced step-by-step with timestamps and backend processing
- Configurable workflows (PSPs define their own production steps)
- Complete audit trails and state machines
- Integration points to existing GelatoConnect modules
- Edge cases and error handling comprehensive
- Data schemas with proper indexing and relationships
- Functional requirements with priorities

Ready for Claude Code to build all screens, flows, and backend logic end-to-end.
# GelatoConnect Phase 1 WS2: Production Operations PRDs

## PRD 6: Production Tracking [CORE]

### Problem Statement
Production managers and CSRs lack real-time visibility into job progress within the shop floor workflow. Current system tracks programmatic/SKU-based orders but does not extend to MIS (Made-In-Shop) jobs created through the AI Estimator. This creates operational blind spots:
- Cannot filter/search across unified job queue (MIS + programmatic)
- Exception handling is manual and creates downstream delays
- No actual vs. estimated time tracking for process optimization
- Production timeline not exportable for customer communication
- Step-level responsibility/operator assignment unclear

### Solution Overview
Extend the existing Production Dashboard to unify MIS and programmatic job tracking. Provide real-time status visibility, exception logging with escalation, timeline analytics, and customer-facing exports. Integrate with AI Estimator (WS1) to map estimated steps to actual production steps.

> **Implementation Note:** GelatoConnect already has a production tracker live for programmatic/SKU-based work (as referenced in the prototype walkthrough). This PRD is about extending that existing tracker to also handle MIS-type jobs. Check the existing production tracking components in the prototype and GelatoConnect codebase, and extend them to support the unified MIS + programmatic dashboard described here.

---

## User Stories with Acceptance Criteria

### US 6.1: Production Manager Views Unified Dashboard
**As a** Production Manager
**I want to** see all active jobs (MIS + programmatic) in a single dashboard with real-time status
**So that** I can prioritize work and identify bottlenecks

**Acceptance Criteria:**
- Dashboard loads within 2 seconds
- Displays all jobs with status (Not Started, In Progress, Complete, Blocked, Overdue)
- Color coding applied: green (on-track), yellow (behind schedule), red (at-risk/blocked)
- Jobs sorted by due date by default; can re-sort by customer, product type, status
- Job count badge shows total active jobs
- Clicking a job row opens Job Detail View
- Real-time updates via WebSocket; fallback to 5-sec polling if WS unavailable
- Responsive on 1920x1080 (primary) and 1280x720 (secondary monitor)

### US 6.2: CSR Searches for Customer Job
**As a** CSR
**I want to** search jobs by customer name, PO number, or order ID
**So that** I can quickly locate a job to answer customer inquiries

**Acceptance Criteria:**
- Search box appears at top of dashboard
- Supports partial name matching (case-insensitive)
- Returns results in <500ms
- Clicking result highlights the job and scrolls to it
- Search clears when user clicks "X" icon
- Search history not retained (privacy)

### US 6.3: CSR Exports Job Timeline as PDF
**As a** CSR
**I want to** export a job's production timeline to PDF
**So that** I can email the current status to the customer

**Acceptance Criteria:**
- PDF export button visible in Job Detail View
- PDF includes: job ID, customer, product, due date, current step, timeline diagram
- Timeline shows each step with estimated/actual time and operator name
- PDF is branded with GelatoConnect logo and shop name
- Filename format: `[JobID]_Timeline_[Date].pdf`
- Export completes in <3 seconds

### US 6.4: Operator Logs Exception
**As a** Shop Floor Operator
**I want to** quickly log when a machine breaks down or other issues occur
**So that** the job is blocked appropriately and my manager knows to intervene

**Acceptance Criteria:**
- Exception button visible on Station View (PRD 7) and Job Detail View
- Clicking opens Exception Modal with:
  - Reason code dropdown (Machine Down, Material Issue, Quality Hold, Manual Hold, Other)
  - Text field for notes (optional)
  - Photo upload (optional)
  - Severity: Critical / High / Medium / Low
- Submitting exception:
  - Changes job status to "Blocked"
  - Sends real-time notification to PM
  - Creates audit log entry with timestamp and operator ID
- PM receives notification (desktop push + email if enabled)
- Exception remains visible in Job Detail timeline until PM marks as "Resolved"

### US 6.5: Production Manager Resolves Exception
**As a** Production Manager
**I want to** mark an exception as resolved and unblock the job
**So that** production can resume

**Acceptance Criteria:**
- Exception detail view shows: reason, notes, photo, time logged, operator name
- PM can add resolution notes
- "Mark Resolved" button changes job status back to "In Progress"
- Operator is notified (push notification) that job is unblocked
- Exception remains in audit log for historical analysis
- Resolved status shown in Job Detail timeline

### US 6.6: Track Actual vs. Estimated Time per Step
**As a** Production Manager
**I want to** see how long each step actually took vs. the AI Estimator's prediction
**So that** I can optimize our production process

**Acceptance Criteria:**
- Job Detail View shows timeline table with columns:
  - Step name
  - Estimated duration (from AI Estimator)
  - Actual start time (when operator clicked Start)
  - Actual end time (when operator clicked Complete)
  - Actual duration (calculated)
  - Variance (actual - estimated, with % variance)
  - Operator name
  - Status (Complete, In Progress, Not Started, Blocked)
- Variance color-coded: green if <10%, yellow if 10-25%, red if >25%
- Hovering over variance shows breakdown (setup time, machine time, cleanup time if logged separately)
- Export button includes this data in CSV format for analysis

### US 6.7: Filter Dashboard by Multiple Criteria
**As a** Production Manager
**I want to** filter jobs by customer, product type, due date range, status, and priority
**So that** I can focus on urgent or specific work

**Acceptance Criteria:**
- Filter panel accessible via "Filters" button at top of dashboard
- Filters:
  - Customer (multi-select dropdown)
  - Product Type (multi-select: business cards, flyers, posters, binding, etc.)
  - Due Date (preset: Today, This Week, Overdue, or custom date range)
  - Status (multi-select: Not Started, In Progress, Complete, Blocked, Overdue)
  - Priority (Critical, High, Normal, Low)
  - MIS vs. Programmatic toggle
- Filters are cumulative (AND logic)
- Active filters shown as tags below filter button; clicking tag removes it
- "Clear All" button resets filters
- Filter state persists during session (not across sessions)
- Filtered count shown as "[X] of [Y] jobs"

---

## Detailed User Journeys

### Journey 6A: Production Manager Identifies Overdue Job and Investigates

1. **8:00 AM** PM opens GelatoConnect, navigates to Production Dashboard (default view on login)
2. **8:01 AM** Dashboard loads showing 23 active jobs; 3 jobs displayed in red (at-risk)
3. **8:02 AM** PM clicks "Filters" → selects Due Date: "Overdue" → applies filter
4. **8:03 AM** Dashboard refreshes, showing 2 jobs (filtered); both red
5. **8:04 AM** PM clicks first red job (Order #12450, Customer: "ABC Corp")
6. **8:05 AM** Job Detail View loads showing:
   - Current step: "Finishing" (started 7:30 AM)
   - Estimated duration for this step: 45 min
   - Current time: 35 min elapsed (on track so far)
   - Previous steps completed: Setup (5 min actual vs. 10 min estimated), Printing (28 min actual vs. 30 min estimated)
   - Next steps queued: Binding (est. 20 min), Quality Check (est. 10 min)
   - Due date: Today, 2:00 PM (8 hours remaining)
7. **8:06 AM** PM clicks on Finishing step to see detail:
   - Operator: "John Smith" (started at 7:30 AM)
   - Current status: "In Progress"
   - No exceptions logged
   - Estimated completion: 8:15 AM
8. **8:07 AM** PM scrolls to next steps; notes Binding step is also on track
9. **8:08 AM** PM closes Job Detail and applies additional filter: "Status = Blocked"
10. **8:09 AM** Dashboard shows 0 blocked jobs
11. **8:10 AM** PM clears filters; returns dashboard to full view
12. **8:11 AM** PM opens Order #12451 (second red job) to investigate
13. **8:12 AM** Job Detail shows current step "Binding" started at 7:45 AM, elapsed 27 min (estimated 20 min)
14. **8:13 AM** Variance is 7 min over estimate (yellow warning); PM hovers over variance to see breakdown
15. **8:14 AM** Breakdown shows: Setup +2 min, Machine time +5 min, no issues noted
16. **8:15 AM** PM notes job is slightly behind but likely to finish on time; closes view
17. **8:16 AM** PM checks dashboard again; one job has moved to green (newly completed)
18. **9:00 AM** Real-time update pushes notification to PM: "Job #12450 - Binding completed"
19. **9:01 AM** Dashboard auto-refreshes; #12450 now shows "Complete" status
20. **9:02 AM** PM checks remaining overdue jobs; both now yellow (on-track)

### Journey 6B: CSR Responds to Customer Inquiry with PDF Export

1. **10:30 AM** CSR receives email: "What's the status of our order ABC-2024-0891?"
2. **10:31 AM** CSR opens GelatoConnect Production Dashboard
3. **10:32 AM** CSR clicks search box, types "ABC-2024-0891"
4. **10:33 AM** Search returns 1 result; CSR clicks it
5. **10:34 AM** Job Detail View loads for Order ABC-2024-0891
6. **10:35 AM** CSR clicks "Export as PDF" button
7. **10:36 AM** PDF modal opens showing preview:
   - Job ID: ABC-2024-0891
   - Customer: ABC Corp
   - Product: 5000x Business Cards, Gloss
   - Due: Today, 3:00 PM
   - Current step: Quality Check (in progress, 5 min elapsed)
   - Timeline diagram showing all completed steps (Printing, Finishing) and remaining steps (Binding pending)
8. **10:37 AM** CSR confirms export; PDF generated
9. **10:38 AM** Browser downloads file: `ABC-2024-0891_Timeline_20260319.pdf`
10. **10:39 AM** CSR attaches PDF to reply email: "Hi ABC Corp, attached is your current production status. You're on track for delivery today."
11. **10:40 AM** CSR sends email
12. **10:41 AM** CSR closes Job Detail and returns to dashboard

### Journey 6C: Operator Logs Exception → PM Resolves

1. **11:00 AM** Operator "Maria" is running the Spot UV finishing step on Job #12466
2. **11:05 AM** Spot UV machine displays error code; job cannot continue
3. **11:06 AM** Maria opens Station View (PRD 7), taps the active job detail
4. **11:07 AM** Maria taps "Exception" button
5. **11:08 AM** Exception Modal opens with fields:
   - Reason: [dropdown] Maria selects "Machine Down"
   - Notes: [text field] Maria types "UV lamp error, blinking red light"
   - Photo: [upload] Maria takes a photo of the error code display
   - Severity: [radio] Maria selects "Critical"
6. **11:09 AM** Maria submits exception
7. **11:10 AM** Job #12466 status changes to "Blocked" (red, top of dashboard)
8. **11:11 AM** Push notification sent to PM: "CRITICAL: Job #12466 blocked - Machine Down (Spot UV)"
9. **11:12 AM** PM's desktop shows notification banner; PM clicks it
10. **11:13 AM** Job Detail View opens directly to Job #12466
11. **11:14 AM** PM scrolls to Exception section, sees:
    - Reason: Machine Down
    - Notes: "UV lamp error, blinking red light"
    - Photo: [thumbnail visible, clickable to enlarge]
    - Time logged: 11:06 AM
    - Operator: Maria
12. **11:15 AM** PM calls maintenance; discusses issue
13. **11:45 AM** Maintenance completes repair (replaced UV lamp)
14. **11:46 AM** PM returns to Job Detail, clicks "Mark Resolved"
15. **11:47 AM** PM types resolution note: "UV lamp replaced by maintenance team"
16. **11:48 AM** PM clicks "Confirm Resolve"
17. **11:49 AM** Job #12466 status changes back to "In Progress" (yellow)
18. **11:50 AM** Maria receives push notification: "Job #12466 unblocked - ready to resume Spot UV step"
19. **11:51 AM** Exception logged in audit trail with full details

---

## Screen/View Descriptions

### Screen 6.1: Production Dashboard

**Layout:**
- Top bar: GelatoConnect logo (left), "Production Dashboard" title (center), Help + Settings icons (right)
- Below top bar:
  - Search box (left): "Search by customer, PO, or order ID" placeholder
  - "Filters" button (center): shows active filter count badge
  - Refresh icon (right): manual refresh, tooltip "Last updated: [timestamp]"
- Main content area:
  - Job count summary: "23 Active Jobs | 2 Blocked | 1 Overdue"
  - Table with columns (resizable, sortable):
    - **Status** (color-coded dot: green/yellow/red, clickable to sort)
    - **Job ID** (linked, opens Job Detail)
    - **Customer** (text)
    - **Product Type** (text, e.g., "5000x Business Cards")
    - **Current Step** (text)
    - **Time in Current Step** (text, e.g., "23 min")
    - **Estimated Time Remaining** (text, e.g., "2h 15m")
    - **Due Date** (date, color-coded: black if >24h out, orange if <24h, red if overdue)
  - Row height: 56px (touch-friendly)
  - Hover state: light gray background
  - Bottom: pagination (10/25/50 jobs per page), current page indicator

**Colors & Status Indicators:**
- Green dot: On-track (actual time <= estimated + 10%)
- Yellow dot: Behind schedule (actual time 10-25% over estimate)
- Red dot: At-risk/blocked (>25% over, or status = Blocked)
- Red text for "Due Date" if order is overdue

**Interactions:**
- Click any job row → open Job Detail View
- Click "Filters" → expand filter sidebar (right panel, 250px width)
- Type in search → results update in real-time (<500ms)
- Refresh icon: manual refresh (GET /api/jobs/active)
- Real-time updates: job row highlights briefly when status changes

---

### Screen 6.2: Job Detail View

**Layout:**
- Left panel (400px):
  - Back button to dashboard
  - Job header: Job ID (large, bold), Customer name, Order date
  - Key info boxes:
    - Due Date: [date] (color-coded)
    - Current Step: [step name]
    - Status: [status badge]
    - Priority: [Low/Normal/High/Critical]
  - Tabs: Timeline | Exceptions | Notes | History

- Right panel (flexible):
  - Timeline tab (default):
    - Table with columns: Step # | Step Name | Est. Duration | Actual Duration | Variance | Operator | Status
    - Each row is a step (collapsible for detail)
    - Completed steps: green background, with checkmark icon
    - Current step: yellow background, animated border
    - Pending steps: gray background, disabled appearance
    - Blocked step: red background with warning icon
    - Color-coded variance column (green/<10%, yellow/10-25%, red/>25%)
  - Exceptions tab:
    - List of exceptions chronologically (newest first)
    - Each exception shows: Time logged, Reason, Severity badge, Operator, Status (Open/Resolved), Notes preview
    - Clicking exception shows detail modal
  - Notes tab:
    - List of notes (timestamps, author)
    - Text input to add note
  - History tab:
    - Timeline of all status changes, exception logs, operator changes

**Top-right buttons:**
- "Export as PDF" (opens export modal)
- "Add Note" (inline text input in Notes tab)
- "Log Exception" (opens Exception Modal)
- "Print" (prints Job Detail to paper)
- Menu icon (more options)

---

### Screen 6.3: Exception Modal

**Layout:**
- Modal dialog, 400px wide, centered on screen
- Title: "Log Exception" (or "Edit Exception" if amending)
- Fields:
  - **Reason Code** (required):
    - Dropdown: Machine Down | Material Issue | Quality Hold | Manual Hold | Other
    - Icons next to each option (optional, for quick scanning)
  - **Severity** (required):
    - Radio buttons: Critical | High | Medium | Low
    - Help text: "Critical = job blocked immediately"
  - **Notes** (optional):
    - Textarea, 3 rows, placeholder: "Describe the issue..."
    - Character count: "0/500 characters"
  - **Photo** (optional):
    - File input, drag-and-drop area
    - Accepted: .jpg, .png, .gif (max 5MB)
    - Shows thumbnail preview if selected
  - **Notify PM Immediately** (checkbox, default checked):
    - Label: "Send push notification to production manager"

- Buttons:
  - "Submit Exception" (blue, primary)
  - "Cancel" (gray, secondary)

**Validation:**
- Reason Code and Severity required; Submit disabled until both selected
- On submit: POST /api/jobs/{jobId}/exceptions with payload

---

### Screen 6.4: Exception Detail View

**Within Job Detail View, Exceptions tab:**
- Expanded exception row shows:
  - **Logged:** [timestamp] by [operator name] (linked to operator profile)
  - **Reason:** [reason code] [severity badge]
  - **Notes:** [full text, read-only]
  - **Photo:** [if present, clickable thumbnail opens lightbox]
  - **Status:** [Open | Resolved]
  - **Resolution Notes:** [if status = Resolved, shows PM's notes]
  - **PM Assigned:** [name, or "Unassigned"]

- If status = Open:
  - Action buttons: "Assign to Me" | "Mark Resolved"
  - Clicking "Mark Resolved" → inline form for resolution notes, "Confirm Resolve" button

- If status = Resolved:
  - Shows: "Resolved by [PM name] at [timestamp]"
  - "Reopen" button (rare, for corrections)

---

## Functional Requirements Table

| # | Requirement | Input | Process | Output | Notes |
|---|-------------|-------|---------|--------|-------|
| FR 6.1 | Load Production Dashboard | User navigates to dashboard | Fetch active jobs from DB, apply default filters | Table of jobs with status | 2s load time SLA |
| FR 6.2 | Search jobs by customer/PO | Search text input | Query jobs table by customer name or PO number (case-insensitive, partial match) | Filtered job list, sorted by relevance | <500ms response |
| FR 6.3 | Sort jobs by column | Click column header | Toggle sort direction (ascending/descending) | Table re-sorted | Persist sort state in session |
| FR 6.4 | Apply filters | Filter selections (customer, product type, status, etc.) | AND logic: fetch jobs matching all selected criteria | Filtered job count and table | Show "X of Y jobs" |
| FR 6.5 | Open Job Detail | Click job row in dashboard | GET /api/jobs/{jobId}/detail | Job Detail View rendered with all sections | Breadcrumb shows "Dashboard > Job #12345" |
| FR 6.6 | Fetch job timeline | Load Job Detail View | GET /api/jobs/{jobId}/timeline (returns steps with estimated/actual times, operators, statuses) | Timeline table rendered | Include variance calculations |
| FR 6.7 | Calculate variance per step | Query job timeline data | variance = (actual_duration - estimated_duration); variance_pct = (variance / estimated_duration) * 100 | Variance and variance_pct displayed, color-coded | Green if <=10%, yellow if 10-25%, red if >25% |
| FR 6.8 | Log exception | Exception Modal submission | POST /api/jobs/{jobId}/exceptions with reason, severity, notes, photo | Exception created, job status = Blocked, notification sent | Create audit log entry |
| FR 6.9 | Notify PM of exception | Exception logged | If Severity = Critical, send push notification + email; if High/Medium/Low, send push only | PM receives notification | Use WebSocket or Firebase Cloud Messaging |
| FR 6.10 | Mark exception resolved | PM submits resolution form | PATCH /api/jobs/{jobId}/exceptions/{exceptionId} (status = Resolved, resolution_notes = text) | Exception marked resolved, job status = In Progress | Notify operator via push |
| FR 6.11 | Real-time job updates | Job status changes on shop floor | WebSocket event or polling GET /api/jobs/active (5s interval) | Dashboard auto-refreshes, row highlights briefly | Fallback to polling if WebSocket unavailable |
| FR 6.12 | Export Job Detail as PDF | Click "Export as PDF" button | Generate PDF with job ID, customer, product, due date, timeline table, job specs | PDF file generated and downloaded | Use jsPDF or similar library; filename = JobID_Timeline_Date.pdf |
| FR 6.13 | Filter by due date range | Select "Custom Date Range" in filters | Query jobs with due_date between start_date and end_date (inclusive) | Filtered job list | Show date picker for range selection |
| FR 6.14 | Show time in current step | Load Job Detail timeline | Calculate elapsed_time = now() - step.started_at | Display "X min" or "X h Y min" | Update in real-time (every 5 sec) |
| FR 6.15 | Integrate with AI Estimator steps | Create new MIS job in WS1 | AI Estimator returns estimated_steps array; map to Production Tracking steps table | Job appears in Production Dashboard with AI-estimated times | Include step_source field (AI_ESTIMATOR or MANUAL) |

---

## Data Requirements & Entity Schemas

### Job (extended from existing)
```
{
  job_id: UUID (primary key),
  customer_id: UUID (foreign key),
  order_id: String (e.g., "ABC-2024-0891"),
  product_type: String (enum: business_cards, flyers, posters, binding, etc.),
  status: String (enum: not_started, in_progress, complete, blocked, overdue),
  priority: String (enum: critical, high, normal, low),
  due_date: DateTime,
  created_at: DateTime,
  created_by: UUID (user_id),

  -- MIS vs Programmatic distinction
  order_source: String (enum: programmatic, mis),
  mis_job_id: UUID (if order_source = mis, links to MIS Job record from WS1),

  -- Production workflow
  current_step_id: UUID (foreign key to JobStep),
  status_updated_at: DateTime,
  completed_at: DateTime (null if not complete),

  -- Shop info
  shop_id: UUID (foreign key),

  -- Metadata
  notes: Text,
  is_archived: Boolean (default false)
}
```

### JobStep (new)
```
{
  step_id: UUID (primary key),
  job_id: UUID (foreign key),
  step_number: Integer (1, 2, 3... in sequence),
  step_name: String (e.g., "Printing", "Spot UV", "Binding"),
  step_type: String (enum: internal, outsourced),

  -- Time tracking
  estimated_duration_seconds: Integer,
  started_at: DateTime (null until operator clicks Start),
  completed_at: DateTime (null until operator clicks Complete),
  actual_duration_seconds: Integer (calculated: completed_at - started_at),

  -- Operator assignment
  assigned_operator_id: UUID (null if unassigned),

  -- Status
  status: String (enum: not_started, in_progress, complete, blocked, skipped),

  -- Exceptions (foreign key to Exception, one step can have multiple exceptions)
  current_exception_id: UUID (null if no open exception)

  -- AI Estimator integration
  step_source: String (enum: ai_estimator, manual),
  ai_estimate_id: UUID (if step_source = ai_estimator, links to AI output)

  -- Outsourcing (if step_type = outsourced)
  outsource_vendor_id: UUID (foreign key to Vendor)
  po_id: UUID (foreign key to PurchaseOrder, if PO generated)
}
```

### Exception (new)
```
{
  exception_id: UUID (primary key),
  job_id: UUID (foreign key),
  step_id: UUID (foreign key, optional, identifies which step had the exception),

  -- Details
  reason_code: String (enum: machine_down, material_issue, quality_hold, manual_hold, other),
  severity: String (enum: critical, high, medium, low),
  notes: Text,
  photo_url: String (S3 URL if photo uploaded),

  -- Timeline
  logged_at: DateTime,
  logged_by: UUID (user_id, operator who logged)

  -- Resolution
  status: String (enum: open, resolved),
  resolved_at: DateTime (null if open),
  resolved_by: UUID (user_id, PM who resolved),
  resolution_notes: Text,

  -- Workflow
  assigned_to: UUID (user_id, PM assigned, null if unassigned)
}
```

### JobTimeline (view/aggregation, optional but recommended for performance)
```
{
  job_id: UUID,
  step_id: UUID,
  step_number: Integer,
  step_name: String,
  estimated_duration_seconds: Integer,
  actual_duration_seconds: Integer,
  variance_seconds: Integer (calculated),
  variance_pct: Float (calculated),
  operator_id: UUID,
  operator_name: String,
  status: String,
  started_at: DateTime,
  completed_at: DateTime,
  exception_count: Integer (open exceptions)
}
```

### Database Queries (pseudocode)
```
-- Get all active jobs with current step info
SELECT j.*, js.step_name, js.status as step_status,
       (NOW() - js.started_at) as time_in_step,
       js.estimated_duration_seconds
FROM Job j
LEFT JOIN JobStep js ON j.current_step_id = js.step_id
WHERE j.status IN ('not_started', 'in_progress', 'blocked')
  AND j.shop_id = @shop_id
ORDER BY j.due_date ASC;

-- Get job timeline with variance
SELECT step_number, step_name, estimated_duration_seconds,
       actual_duration_seconds,
       (actual_duration_seconds - estimated_duration_seconds) as variance_seconds,
       CASE
         WHEN actual_duration_seconds IS NULL THEN 0
         ELSE ((actual_duration_seconds - estimated_duration_seconds) / estimated_duration_seconds) * 100
       END as variance_pct,
       assigned_operator_id, status, started_at, completed_at
FROM JobStep
WHERE job_id = @job_id
ORDER BY step_number ASC;

-- Get open exceptions for a job
SELECT * FROM Exception
WHERE job_id = @job_id AND status = 'open'
ORDER BY logged_at DESC;
```

---

## Edge Cases Table

| # | Edge Case | Scenario | Handling |
|---|-----------|----------|----------|
| EC 6.1 | Job becomes overdue while viewing dashboard | Due date passes, no action taken | Status auto-updates to "overdue" (red), dashboard refreshes, user sees change |
| EC 6.2 | Multiple operators log exception on same job simultaneously | Two operators both click "Log Exception" within 1 second | First submit wins; second receives validation error "Exception already open, resolve first" |
| EC 6.3 | Operator marks step complete, then immediately marks exception | Step is marked complete, then exception logged | Exception treated as retroactive (for step just completed); job does NOT change status, just log for analytics |
| EC 6.4 | Job has zero estimated time for a step | AI Estimator returns 0 min for quick step (e.g., "Quality Check final pass") | Display "Estimated: <1 min", variance calculation handles gracefully (variance_pct = N/A or shown as infinity indicator) |
| EC 6.5 | Job completed before due date, but customer cancels order | Job shows "Complete" status, then cancel request received | CSR marks job as "Cancelled" (new status); it remains in database for audit but removed from active dashboard |
| EC 6.6 | Production manager tries to resolve exception on a completed job | Exception is still "Open" from earlier, job has moved on to next steps | Allow resolution to proceed; exception resolution does not affect current job status (job is already complete) |
| EC 6.7 | Real-time update fails (WebSocket down, polling stale) | User views dashboard, no update received for 30+ seconds | Display warning banner: "Real-time updates unavailable; last update 45 seconds ago" with manual refresh button |
| EC 6.8 | Job has 0 complete steps (never started) | User opens Job Detail on new job | Current step shows "Not Started" (no time_in_step), timeline shows all steps as pending, no variance data |
| EC 6.9 | PDF export initiated but job is modified mid-export | Job status changes while PDF generation in progress | PDF captures state at moment of export initiation; no refresh needed |
| EC 6.10 | Filter returns 0 jobs | User applies very restrictive filters | Dashboard shows "No jobs match your filters" message; suggest clearing filters or adjusting criteria |
| EC 6.11 | Operator assigned to step leaves shop mid-shift | Operator's job is still in "In Progress" | PM can reassign step to another operator (PATCH /api/jobs/{jobId}/steps/{stepId}, operator_id = new_operator_id); old operator's time logged for analytics |
| EC 6.12 | Customer inquires about job, but job ID doesn't exist in system | CSR searches for job ID that was never created | Search returns "No results"; CSR should verify customer has correct order ID or check in CRM |

---

## State Machine: Job & JobStep

### Job Status Transitions
```
not_started
  ├─> in_progress (when first step starts)
  ├─> blocked (when exception logged with severity Critical or if any step blocked)
  └─> complete (when final step completed)

in_progress
  ├─> blocked (exception logged)
  ├─> complete (final step completed)
  └─> in_progress (remains, updates continue)

blocked
  └─> in_progress (exception resolved)

complete
  └─> [no transitions, terminal state]

[special: overdue state is not a true status, but a derived property based on due_date < NOW()]
```

### JobStep Status Transitions
```
not_started
  ├─> in_progress (operator clicks Start)
  ├─> blocked (exception logged, severity Critical)
  └─> skipped (step manually skipped by PM, e.g., outsourced step not needed)

in_progress
  ├─> complete (operator clicks Complete)
  ├─> blocked (exception logged during operation)
  └─> in_progress (remains, time continues accumulating)

blocked
  ├─> in_progress (exception resolved)
  └─> [PM can force back to not_started to restart step]

complete
  └─> [no transitions, terminal state]

skipped
  └─> [no transitions, terminal state]
```

### Exception Status Transitions
```
open
  ├─> resolved (PM clicks "Mark Resolved")
  └─> open (remains if PM adds notes but doesn't resolve)

resolved
  └─> open (PM clicks "Reopen" if needed for correction)
```

---

## Integration Points

### 1. AI Estimator (WS1) → Production Tracking (WS2 PRD 6)
- **Trigger:** When MIS job is created in WS1 (AI Estimator completes estimation)
- **Data Flow:**
  - AI Estimator returns `estimated_steps` array with step names and durations
  - Production Tracking receives POST /webhook/jobs/created with:
    ```json
    {
      "job_id": "UUID",
      "order_source": "mis",
      "estimated_steps": [
        {"step_name": "Printing", "estimated_duration_seconds": 1800},
        {"step_name": "Binding", "estimated_duration_seconds": 1200},
        {"step_name": "QA", "estimated_duration_seconds": 600}
      ]
    }
    ```
  - Production Tracking creates JobStep records for each estimated step
- **Status:** Job appears in Production Dashboard immediately with first step in "not_started" status

### 2. Station Views (WS2 PRD 7) → Production Tracking (WS2 PRD 6)
- **Trigger:** Operator clicks "Start" or "Complete" on a station
- **Data Flow:**
  - Station View sends PATCH /api/jobs/{jobId}/steps/{stepId} with `status = "in_progress"` and `started_at = NOW()`
  - Station View sends PATCH /api/jobs/{jobId}/steps/{stepId} with `status = "complete"` and `completed_at = NOW()`
  - Production Tracking calculates `actual_duration_seconds` and `variance`
  - If final step completed, sets Job status to "complete"
  - Production Dashboard receives real-time update (WebSocket event or polling refresh)
- **Status:** Dashboard and Job Detail both reflect updated step status and times

### 3. Outsourcing / Trade Work (WS2 PRD 8) → Production Tracking (WS2 PRD 6)
- **Trigger:** PM marks a step as "outsource" in PRD 8
- **Data Flow:**
  - Outsourcing module sends PATCH /api/jobs/{jobId}/steps/{stepId} with `step_type = "outsourced"`, `outsource_vendor_id`, `po_id`
  - Production Tracking updates step record; step enters "blocked" state (waiting for vendor completion)
  - When vendor completes work (PRD 8 workflow), Outsourcing module sends PATCH to mark step as "complete"
  - Job Detail View shows step with outsource indicator (vendor name, PO number, expected return date)
- **Status:** Step appears in timeline as "In External Work" or similar status; variance tracking pauses (actual time includes vendor lead time)

### 4. WebSocket / Real-Time Updates
- **Technology:** Socket.io or native WebSockets
- **Events:**
  - `job:status_changed` → {job_id, new_status, timestamp}
  - `step:status_changed` → {job_id, step_id, new_status, timestamp}
  - `exception:logged` → {job_id, exception_id, severity}
  - `exception:resolved` → {job_id, exception_id}
- **Clients:** Production Dashboard, Job Detail View (both subscribed to relevant events)
- **Fallback:** If WebSocket unavailable, client polls GET /api/jobs/active every 5 seconds

### 5. Notification System
- **Channels:** Push notifications (browser desktop), Email, In-app toast
- **Triggers:**
  - Exception logged (severity Critical): PM receives push + email
  - Exception resolved: Operator receives push
  - Job completed: CSR / relevant user receives push (if subscribed)
  - Job overdue: PM receives push (if overdue for >30 min)
- **Implementation:** Firebase Cloud Messaging (FCM) or similar service

### 6. PDF Export Integration
- **Library:** jsPDF or similar
- **Data Source:** GET /api/jobs/{jobId}/detail (includes timeline, job specs)
- **Output:** Branded PDF with shop logo, customer info, timeline table, current status

---

END OF PRD 6: PRODUCTION TRACKING

---

## PRD 7: Station Views [CORE]

### Problem Statement
Shop floor operators lack a dedicated touch-friendly interface optimized for production floor use. Current system may display job details in desktop-oriented views unsuitable for:
- Gloved hands (need 44px+ touch targets)
- Poor network conditions (requires offline queuing)
- Quick scan-and-start workflows (barcode/QR scanning)
- Large production queues with touch-priority sorting (past due first)
- Accidental input correction (undo window)
- MIS + programmatic job unification at the station level

### Solution Overview
Build touch-optimized Station Views where each operator sees their station's queue (press, finishing, binding, etc.), can start/complete jobs with one tap, log exceptions with photos, scan barcodes, and work offline. Views auto-sync when network returns. Unified queue displays both MIS and programmatic jobs prioritized by due date.

> **Implementation Note:** GelatoConnect already has station view functionality for operators. The prototype demonstrates station-level displays. Extend the existing station view components to support MIS jobs alongside programmatic work, adding the touch-optimized features described here.

---

## User Stories with Acceptance Criteria

### US 7.1: Operator Selects Station and Views Queue
**As an** Operator
**I want to** tap my station name and see a list of jobs queued for my station
**So that** I know what to work on next

**Acceptance Criteria:**
- Station selection screen shows 6-8 station tiles (Press, Finishing, Binding, Spot UV, QA, etc.)
- Each tile is 120x120px, large tap target
- Tapping tile opens Station Queue View
- Station Queue shows job count badge (e.g., "3 jobs waiting")
- Jobs sorted by priority: Overdue first (red), then Due Today (orange), then Future (black)
- Within same priority, sorted by due time (earliest first)
- Each job row shows: Job ID, Customer (short), Quantity, Due time, Status indicator
- Row height: 56px minimum
- Load time: <2 seconds
- Works on tablets (iPad) and phones

### US 7.2: Operator Scans Barcode to Open Job Detail
**As an** Operator
**I want to** scan a printed job ticket barcode and have that job open directly
**So that** I don't have to manually search or scroll through the queue

**Acceptance Criteria:**
- Barcode scanner input field at top of Station Queue (or floating button)
- Field shows "Scan barcode or QR code" placeholder
- Supports Code128, QR codes, other 1D/2D formats
- Scanning a valid barcode:
  - Looks up job ID from barcode
  - Opens Job Detail View for that job (even if not in this station's queue)
  - If job not found, shows error "Job not found: [barcode]"
  - If job already completed, shows warning "This job is already complete"
- Scan field auto-clears after successful scan
- Field re-focuses for next scan
- Offline: barcodes cached, allows scanning but shows "Offline - will sync when connected"

### US 7.3: Operator Starts a Job
**As an** Operator
**I want to** tap "Start" on a job to begin work and log the start time
**So that** production tracking knows when I started

**Acceptance Criteria:**
- Job Detail (station context) shows "Start" button (green, 80px high, large text)
- Tapping "Start" button:
  - Button changes to "In Progress" (disabled state)
  - JobStep status changes to "in_progress", started_at = NOW()
  - Timer appears showing time elapsed (updates every 1 second): "0 min 15 sec"
  - "Complete" button becomes active (green)
  - Production Dashboard updates in real-time (PM sees this job moved from "not started" to "in progress")
- If job already started (by another operator), shows "Started by [Operator] at [time]" and disables "Start" button
- Offline: Start action queued locally; syncs when reconnected

### US 7.4: Operator Completes a Job
**As an** Operator
**I want to** tap "Complete" to finish my work on a job step
**So that** the job moves to the next station's queue

**Acceptance Criteria:**
- "Complete" button visible only after "Start" is clicked
- Tapping "Complete":
  - Shows confirmation modal: "Mark as complete? [Job ID] [Step Name]" with 30-second undo countdown
  - Modal has "Confirm" and "Cancel" buttons
  - Countdown timer shown: "Undo in 30 seconds..."
  - If user clicks "Confirm" or countdown expires:
    - JobStep status = "complete", completed_at = NOW()
    - Actual duration calculated (completed_at - started_at)
    - Job moves to next station's queue (if steps remain), or Job status = "complete" (if final step)
    - Station Queue auto-refreshes, completed job removed
    - Production Dashboard updates in real-time
  - If user clicks "Cancel" or taps "Undo" within 30s:
    - Modal closes, job remains in "in_progress" state
    - Timer/undo window resets
- Offline: Complete action queued locally; syncs when reconnected

### US 7.5: Operator Views Job Details (Station Context)
**As an** Operator
**I want to** see job specifications, artwork, materials, and special instructions
**So that** I can execute the job correctly

**Acceptance Criteria:**
- Job Detail (station context) shows:
  - Job ID (large, bold)
  - Customer name
  - Product type (e.g., "5000x Business Cards, Gloss")
  - Quantity (large number, e.g., "5000")
  - Material specs (paper type, finish, colors)
  - Current step name (e.g., "Printing")
  - Job-level special instructions (e.g., "Trim precisely - client is picky")
  - Step-level special instructions (e.g., "Use Color Profile: Verisign Gloss v2")
  - Artwork preview (if available) with pinch-to-zoom, rotate, pan
  - Due date/time (color-coded)
  - Time remaining until due (e.g., "2 hours 30 min remaining")
  - Start button (if step not started)
  - Complete button (if step in progress)
  - Timer (if step in progress)
- Back button: return to Station Queue
- Layout: full screen on tablet, optimized for portrait or landscape

### US 7.6: Operator Logs Exception with Photo
**As an** Operator
**I want to** quickly report a problem (machine down, material issue, etc.) and optionally upload a photo
**So that** the production manager knows to intervene

**Acceptance Criteria:**
- "Issue" button visible on Job Detail (large, red)
- Tapping "Issue" opens Exception Modal:
  - Reason code quick-select buttons (4-5 large buttons):
    - Machine Down (icon: tools/wrench)
    - Material Issue (icon: warning)
    - Quality Hold (icon: magnifier)
    - Manual Hold (icon: stop sign)
    - Other (icon: question mark)
  - Tapping a reason code:
    - Highlights selected button
    - Reveals next section: "Severity"
  - Severity quick-select buttons:
    - Critical (red)
    - High (orange)
    - Medium (yellow)
    - Low (gray)
  - Tapping severity:
    - Reveals next section: "Add Photo (optional)"
    - Photo input (large tap target):
      - Option 1: "Take Photo" → opens camera app
      - Option 2: "Choose from Gallery" → file picker
      - Option 3: "Skip" → no photo
  - If photo selected:
    - Shows thumbnail of photo
    - "Retake" and "Use This" buttons
  - After photo (or skip):
    - Text field for notes (optional): "Describe the issue..."
    - "Submit" button (large, green)
  - Submitting:
    - Exception created, job status = "blocked"
    - Modal closes, Job Detail shows "BLOCKED" status (red banner)
    - "Issue" button changes to "Exception: [Reason] - [Time]" (read-only)
    - PM receives push notification: "CRITICAL: Job #12345 blocked - Machine Down"
- Offline: Exception queued locally; photo stored in local cache; syncs when reconnected

### US 7.7: Operator Works Offline
**As an** Operator
**I want to** start/complete jobs even if network is temporarily unavailable
**So that** production doesn't stop due to connectivity issues

**Acceptance Criteria:**
- Offline detection: app monitors network status
- When offline:
  - Warning banner appears at top: "Offline - changes will sync when reconnected"
  - Warning color: yellow/orange
  - Banner is non-blocking (doesn't prevent operations)
- Operations while offline (queued locally):
  - Start job → LocalStorage record created with timestamp
  - Complete job → LocalStorage record created with timestamp
  - Log exception → LocalStorage record created with timestamp
  - Barcode scan → checks local cache first, then remote (fails gracefully if unavailable)
- When reconnected:
  - App detects connection restored
  - Warning banner changes to "Syncing..." (blue)
  - All queued actions sent to server in order (POST /api/sync with batch payload)
  - Each action receives response (success or conflict)
  - If conflict (e.g., job already completed by another operator), user notified: "Job was completed by [Operator] at [time]"
  - After sync complete, banner disappears
  - Queue refreshes from server

### US 7.8: Undo Recent Action (30-Second Window)
**As an** Operator
**I want to** undo an accidental "Complete" click within 30 seconds
**So that** I don't have to re-work the job if I tap the button by mistake

**Acceptance Criteria:**
- When operator taps "Complete", confirmation modal appears (see US 7.4)
- Modal shows countdown: "Undo in 30 seconds..."
- Countdown ticks down visually (progress bar or number)
- Clicking "Undo" or letting countdown expire:
  - If Undo clicked: job returns to "in_progress" state, undo window closes
  - If timeout: job completes as if "Confirm" was clicked
- After undo, start button re-activates (allowing restart)
- Undo action is logged for audit purposes

---

## Detailed User Journeys

### Journey 7A: Operator Starts and Completes a Job from Station Queue

1. **9:00 AM** Operator "John" clocks in, opens GelatoConnect on tablet at Binding station
2. **9:01 AM** Station selection screen loads showing 8 station tiles
3. **9:02 AM** John taps "Binding" tile (120x120px)
4. **9:03 AM** Station Queue loads showing 3 jobs:
   - Job #12440 (red): Customer ABC Corp, 5000 units, Due 8:00 AM (OVERDUE)
   - Job #12441 (orange): Customer XYZ Inc, 2500 units, Due 12:00 PM (4 hours)
   - Job #12442 (black): Customer LMN Corp, 1000 units, Due Tomorrow 10:00 AM
5. **9:04 AM** John taps first row (Job #12440)
6. **9:05 AM** Job Detail opens showing:
   - Job ID: 12440 (large)
   - Customer: ABC Corp
   - Product: 5000x Tri-fold Brochures, Gloss
   - Current step: Binding
   - Due: TODAY 8:00 AM (RED, "OVERDUE")
   - Special instructions: "Fold precisely to 8.5 x 11 when closed"
   - Artwork preview (thumbnail visible, can zoom)
   - "Start" button (green, 80px high)
   - Timer not yet visible
7. **9:06 AM** John taps "Start" button
8. **9:07 AM** Button changes to disabled "In Progress", timer appears showing "0 min 12 sec"
9. **9:08 AM** John works on the binding machine for ~20 minutes
10. **9:28 AM** John finishes the 5000 bindings, taps "Complete"
11. **9:29 AM** Confirmation modal appears:
    - "Mark as complete?"
    - "Binding step for Job #12440"
    - "Undo in 30 seconds..." (countdown timer visible)
    - "Confirm" button (green) | "Cancel" button (gray)
12. **9:30 AM** John taps "Confirm"
13. **9:31 AM** Modal closes, Job Detail refreshes
14. **9:32 AM** Station Queue refreshes, Job #12440 removed (now in next station queue or completed)
15. **9:33 AM** Job #12441 is now first in queue, John taps it
16. **9:34 AM** Job Detail for #12441 opens, John repeats start/complete cycle

### Journey 7B: Operator Scans Barcode to Access Job

1. **1:00 PM** Operator "Maria" is at the Finishing station
2. **1:01 PM** Station Queue displays 2 jobs, but Maria receives urgent call: "We need to rush Job #12566 - can you do Spot UV finishing?"
3. **1:02 PM** Maria taps barcode scanner button at top of screen
4. **1:03 PM** Input field activates, "Scan barcode or QR code" placeholder visible
5. **1:04 PM** Maria scans printed job ticket for Job #12566 (barcode = "GELATO-12566")
6. **1:05 AM** App looks up barcode, finds Job #12566 in system
7. **1:06 AM** Job Detail view opens directly for Job #12566 (even though not in Finishing queue)
8. **1:07 AM** Maria can see all details: current step, special instructions, artwork, due time
9. **1:08 AM** Maria taps "Start", completes the Spot UV job
10. **1:09 AM** Job moves to next station's queue

### Journey 7C: Operator Logs Exception Mid-Job

1. **2:30 PM** Operator "Carlos" is binding Job #12567
2. **2:35 PM** 15 minutes into the job (timer shows "15 min 45 sec")
3. **2:36 PM** Binding machine jamming light comes on
4. **2:37 PM** Carlos attempts to clear jam, but gets stuck
5. **2:38 PM** Carlos taps "Issue" button (red, large) on Job Detail
6. **2:39 PM** Exception Modal opens with quick-select reason codes
7. **2:40 PM** Carlos taps "Machine Down" button (highlighted)
8. **2:41 PM** Modal reveals severity quick-select
9. **2:42 PM** Carlos taps "Critical" (red)
10. **2:43 PM** Modal reveals photo options: "Take Photo" | "Choose from Gallery" | "Skip"
11. **2:44 PM** Carlos taps "Take Photo"
12. **2:45 PM** Device camera app opens
13. **2:46 PM** Carlos takes photo of jammed paper/machine error
14. **2:47 PM** Camera closes, modal shows photo thumbnail with "Use This" button
15. **2:48 PM** Carlos taps "Use This"
16. **2:49 PM** Modal shows notes field: "Describe the issue..."
17. **2:50 PM** Carlos types: "Paper jam in binding unit, can't clear manually"
18. **2:51 PM** Carlos taps "Submit"
19. **2:52 PM** Exception created, Job Detail shows red "BLOCKED" banner
20. **2:53 PM** PM receives push notification: "CRITICAL: Job #12567 blocked - Machine Down"
21. **2:54 PM** Carlos steps back, waits for PM to contact maintenance
22. **3:00 PM** PM calls and arranges maintenance; discusses with Carlos
23. **3:15 PM** Maintenance clears jam
24. **3:16 PM** PM updates exception as "Resolved"
25. **3:17 PM** Carlos receives push: "Job #12567 unblocked"
26. **3:18 PM** Carlos resumes job (time counter resets or continues based on design choice)

### Journey 7D: Operator Works Offline

1. **10:00 AM** Operator at Finishing station, network disconnects (WiFi drops)
2. **10:01 AM** Warning banner appears: "Offline - changes will sync when reconnected" (yellow)
3. **10:02 AM** Operator taps "Start" on Job #12510
4. **10:03 AM** Button becomes "In Progress", timer starts (all stored locally in LocalStorage)
5. **10:04 AM** Operator works on job for 18 minutes
6. **10:22 AM** Operator taps "Complete"
7. **10:23 AM** Confirmation modal appears with undo countdown
8. **10:24 AM** Operator confirms completion
9. **10:25 AM** Job locally marked as complete (LocalStorage updated)
10. **10:26 AM** WiFi reconnects (network monitoring detects)
11. **10:27 AM** Banner changes to "Syncing..." (blue)
12. **10:28 AM** App sends batch sync request: [Job #12510: status=complete, completed_at=10:24 AM]
13. **10:29 AM** Server processes sync, updates job
14. **10:30 AM** Sync completes successfully, banner disappears
15. **10:31 AM** Station Queue refreshes from server, Job #12510 removed

---

## Screen/View Descriptions

### Screen 7.1: Station Selection

**Layout:**
- Full screen, portrait orientation (or landscape on tablets)
- Top bar: "Select Your Station" title (large, centered), time (top-right), operator name (top-left)
- Main content area: Grid of station tiles (2 columns on phone, 3-4 columns on tablet)
- Each tile: 120x120px (minimum), rounded corners, large icon (60x60), station name below
- Stations included: Press | Finishing | Binding | Spot UV | Embossing | QA | Shipping | Outsource Hold

**Tile Styling:**
- Tap state: highlight on touch (visual feedback)
- Long-press: shows "Jump to History" or "View Past Jobs" option (optional, nice-to-have)
- Accessibility: large text (18px), high contrast

**Bottom:**
- Settings icon (gear): opens operator preferences (language, sound, auto-logout time, etc.)
- Logout button (red, small): clocks out operator

---

### Screen 7.2: Station Queue

**Layout:**
- Top bar: Back button (chevron left) | Station name (center, large) | Job count badge (e.g., "3 jobs") | Settings icon (right)
- Below top bar:
  - Barcode scanner field: "Scan barcode or QR code" placeholder, auto-focus, full width
  - Refresh button (circular icon, right-aligned)
- Main content: List of jobs in queue
- Each job row (56px height):
  - Priority indicator dot (red = overdue, orange = due today, black = future)
  - Job ID (bold, e.g., "#12440")
  - Customer name (abbreviated if long, e.g., "ABC Corp")
  - Quantity (large number, e.g., "5000") with unit (units/sheets)
  - Due time (e.g., "OVERDUE" or "in 3h 45m") color-coded
  - Status icon (if blocked, shows lock icon + "Blocked by [reason]")
  - Tap entire row to open Job Detail
- Bottom: pagination or "Load More" if >10 jobs

**Offline Indicator:**
- Warning banner at top: "Offline - changes will sync when reconnected" (yellow background, dark text)
- Non-dismissible until connection restored

---

### Screen 7.3: Job Detail (Station Context)

**Layout:**
- Top bar: Back button | Job ID (center, large, bold) | Menu (three dots, right)
- Scrollable content area:
  - **Job Header Section:**
    - Customer name (large)
    - Product type (e.g., "5000x Business Cards, Gloss")
    - Quantity (very large number, e.g., "5000")
    - Due date/time (color-coded: red if overdue, orange if <24h, black if far out)
    - Time remaining badge (e.g., "OVERDUE by 2h" or "Due in 4h 30m")

  - **Specs Section:**
    - Material: [Paper type] [Finish] (e.g., "Mohawk Via Gloss, 100 lb cover")
    - Colors: [color count] colors (e.g., "4-color CMYK")
    - Binding style (if applicable): [binding type] (e.g., "Wire-O spiral")
    - Trim size: [dimensions] (e.g., "3.5 x 8.5 inches")
    - Collapse/expand triangle to show more details

  - **Special Instructions Section:**
    - Job-level: "Job Instructions: Fold precisely to 8.5 x 11 when closed"
    - Step-level: "Binding Instructions: Use Color Profile: Verisign Gloss v2"
    - Large text (16px), left-aligned

  - **Artwork Preview:**
    - Thumbnail or small image of final product
    - Pinch-to-zoom enabled
    - Rotate button (if needed for landscape viewing)
    - Pan gesture supported
    - Tap to expand full screen (lightbox)

  - **Current Step Section:**
    - Step name (e.g., "Binding") in large, bold text
    - Status: "Not Started" | "In Progress" | "Complete" | "Blocked"
    - Timer (if in progress): "0 min 15 sec" or "1 hour 23 min" (updates every 1 sec)
    - Elapsed time indicator or progress bar

  - **Action Buttons:**
    - If status = Not Started:
      - "Start" button (green, 80px height, full width)
      - Text: "Start Binding" (includes step name)
    - If status = In Progress:
      - Timer display (prominent)
      - "Complete" button (green, 80px height, full width)
      - Text: "Mark Binding Complete"
      - Secondary: "Issue" button (red, smaller, right-aligned)
    - If status = Complete:
      - Checkmark icon + "Completed at [time] by [operator]"
      - Buttons disabled
    - If status = Blocked:
      - Red banner: "BLOCKED: [Reason] since [time]"
      - Exception detail visible
      - Buttons disabled until PM resolves

- Bottom: Safe zone (44px) for thumb-friendly scrolling

---

### Screen 7.4: Exception Modal (Station Context)

**Layout:**
- Full-screen modal, bottom sheet (slides up from bottom) or centered dialog
- Dimmed background (tap to cancel)

**Step 1: Reason Code Selection**
- Title: "What's the issue?"
- Large buttons (100px x 100px or stacked, each with icon + label):
  - Machine Down (wrench icon)
  - Material Issue (warning icon)
  - Quality Hold (magnifier icon)
  - Manual Hold (stop sign icon)
  - Other (question mark icon)
- Single-tap selects; selected button highlighted (border or background color)
- On selection, modal auto-advances to Step 2 (smooth transition)

**Step 2: Severity Selection**
- Title: "How urgent?"
- Large buttons (radio-style or stacked):
  - Critical (red, "Stop work immediately")
  - High (orange, "Notify PM soon")
  - Medium (yellow, "Notify PM within 30 min")
  - Low (gray, "Log for review")
- Single-tap selects; on selection, modal auto-advances to Step 3

**Step 3: Photo (Optional)**
- Title: "Add a photo (optional)"
- Two options:
  - "Take Photo" button (camera icon, large, full width)
  - "Choose from Gallery" button (image icon, large, full width)
  - "Skip" button (gray, smaller, center-aligned)
- If "Take Photo" selected:
  - Opens native camera app
  - User captures image
  - Returns to modal, showing thumbnail of captured photo
  - "Retake" button (left) and "Use This" button (right, green)
- If "Choose from Gallery" selected:
  - Opens file picker / photo gallery
  - User selects image
  - Returns to modal, showing thumbnail
  - "Change" button (left) and "Use This" button (right, green)
- On selection or skip, modal auto-advances to Step 4

**Step 4: Notes (Optional)**
- Title: "Describe the issue (optional)"
- Text input field (textarea, 3 rows)
- Placeholder: "What happened? Any error codes or symptoms?"
- Character counter: "0/500 characters"
- "Submit" button (green, large, full width) at bottom
- "Cancel" button (gray, smaller, right-aligned)

---

### Screen 7.5: Job Detail with Exception Visible

**Within Job Detail View, after exception is logged:**

**Exception Banner (Red, Alert Style):**
- Icon: warning triangle or "!" in circle
- Text: "BLOCKED: Machine Down since 2:52 PM"
- Exception details expandable (tap to see full info):
  - Reason: Machine Down
  - Severity: Critical
  - Notes: "Paper jam in binding unit, can't clear manually"
  - Photo: [thumbnail, tap to enlarge]
  - Logged by: Carlos at 2:52 PM
  - Status: "Awaiting PM resolution" (text, gray)

**Action Buttons:**
- All buttons disabled (grayed out, not clickable)
- Text over buttons: "Job blocked - awaiting resolution"
- Exception icon displayed in button area

**Refresh Message:**
- When PM resolves exception, page auto-refreshes
- Banner changes to green: "UNBLOCKED: Resolved by [PM name] at [time]"
- Action buttons re-enable
- User can resume work

---

## Functional Requirements Table

| # | Requirement | Input | Process | Output | Notes |
|---|-------------|-------|---------|--------|-------|
| FR 7.1 | Display Station Selection | User launches app | Fetch available stations for shop | Grid of station tiles | Load <1 second |
| FR 7.2 | Load Station Queue | Tap station tile | GET /api/stations/{stationId}/queue (active jobs for this station, sorted by priority) | Station Queue View with jobs sorted by due date | Real-time updates via WebSocket |
| FR 7.3 | Sort queue by priority | Queue loads | Sort by: overdue (red), due today (orange), future (black); within each, sort by due time | Queue re-ordered | Done on client-side after fetch |
| FR 7.4 | Barcode scan | Barcode input | Parse barcode, lookup job ID in DB or local cache | Open Job Detail View for that job | Supports Code128, QR codes |
| FR 7.5 | Open Job Detail | Tap job row | GET /api/jobs/{jobId}/detail (job specs, current step, artwork, instructions) | Job Detail View rendered | Include artwork preview, special instructions |
| FR 7.6 | Start job step | Tap "Start" button | PATCH /api/jobs/{jobId}/steps/{stepId} (status = in_progress, started_at = NOW()) | Button disabled, timer starts, Complete button active | Offline: action queued, syncs later |
| FR 7.7 | Timer display | Step in progress | Increment counter every 1 second (elapsed_time = NOW() - started_at) | Timer display updated (e.g., "5 min 23 sec") | Updates every 1 sec, not blocking |
| FR 7.8 | Complete job step | Tap "Complete" button | Show confirmation modal with 30-second undo countdown | Operator can confirm or undo | If timeout or confirm: PATCH step (status = complete, completed_at = NOW()) |
| FR 7.9 | Undo completion | Tap "Undo" within 30 sec | Mark undo action locally, revert step status to "in_progress", restart timer | Job resumes in-progress state | Logged for audit |
| FR 7.10 | Auto-advance to next station | Complete final step of multi-step job | Job status auto-updates; if next station exists, job added to next queue | Job appears in next station's queue | Real-time WebSocket event to next station |
| FR 7.11 | Mark final step complete | Operator completes final step | Check if job.steps count == completed_step.step_number; if yes, set job.status = complete | Job status = complete, removed from all queues | Notification sent to CSR/PM |
| FR 7.12 | Log exception | Exception Modal submission | POST /api/jobs/{jobId}/exceptions (reason_code, severity, notes, photo_url) | Exception created, job status = blocked, PM notified | Photo uploaded to S3; URL stored in DB |
| FR 7.13 | Notify PM of critical exception | Exception logged with severity = Critical | Send push notification + email to PM | PM receives notification with job details | Use FCM or Firebase |
| FR 7.14 | Update blocked job UI | Exception created | Job Detail View updates: banner shown (red), buttons disabled, exception details visible | UI reflects blocked state immediately | Real-time update via WebSocket |
| FR 7.15 | Detect offline status | App monitors network connectivity | setInterval check: navigator.onLine or XHR request to /health endpoint | Display offline banner if no connection | Check every 5 seconds |
| FR 7.16 | Queue offline actions | User performs action while offline | Store action in LocalStorage with timestamp: {action: start/complete/exception, jobId, stepId, data, timestamp} | Actions queued, displayed locally | Labeled "Queued for sync" |
| FR 7.17 | Sync offline actions | Network reconnects | Detect connection, POST /api/sync with batch of queued actions | Server processes actions, returns results | Retry failed actions with exponential backoff |
| FR 7.18 | Handle sync conflict | Sync action conflicts (e.g., job already completed by another operator) | Return conflict response from server; app notifies operator: "Job was completed by [Operator] at [time]" | Operator sees conflict message, can acknowledge | Logged for audit |
| FR 7.19 | Refresh queue after action | Job complete, or exception logged | Station Queue auto-refreshes from server (GET /api/stations/{stationId}/queue) | Queue updated with current jobs | Remove completed jobs, add newly arrived jobs |
| FR 7.20 | Zoom artwork preview | Operator pinches on image | Zoom in/out (min 1x, max 3x), pan gesture supported | Artwork displayed at desired zoom level | Touch-friendly, glove-compatible |
| FR 7.21 | Show special instructions | Load Job Detail | Render job-level and step-level instructions sections (fallback to "No special instructions" if empty) | Special instructions visible in readable font (16px+) | Large text for shop floor readability |

---

## Data Requirements & Entity Schemas

*Extends Job and JobStep from PRD 6 with additional fields for station operations.*

### Station (new)
```
{
  station_id: UUID (primary key),
  shop_id: UUID (foreign key),
  station_name: String (e.g., "Binding", "Spot UV", "Press"),
  station_type: String (enum: internal_production, quality_check, outsource_hold, shipping),

  -- Queue management
  current_queue: Array<UUID> (array of step_ids in queue order, for fast retrieval),

  -- Offline support
  queue_cached_at: DateTime (timestamp of last queue cache for offline access),

  -- Metadata
  is_active: Boolean (default true),
  capabilities: Array<String> (e.g., ["binding", "spiral", "saddle stitch"]),
  created_at: DateTime
}
```

### StationQueue (view/fast-access table)
```
{
  station_id: UUID,
  step_id: UUID,
  job_id: UUID,
  job_id_display: String (e.g., "#12440"),
  customer_name: String,
  product_type: String,
  quantity: Integer,
  due_date: DateTime,
  priority_score: Integer (calculated: 0 for overdue, 1 for due today, 2 for future; used for sorting),
  due_time_remaining_seconds: Integer (due_date - NOW()),
  is_blocked: Boolean (true if job status = blocked),
  block_reason: String (if is_blocked = true),

  -- For fast queue display
  created_at: DateTime,
  updated_at: DateTime
}
```

### JobDetail (MIS-specific fields)
```
{
  job_id: UUID,

  -- Material specs (from AI Estimator or manual input)
  material_name: String (e.g., "Mohawk Via Gloss"),
  material_weight: String (e.g., "100 lb cover"),
  material_finish: String (enum: gloss, matte, satin, uncoated),
  color_count: Integer (e.g., 4 for CMYK),
  binding_style: String (e.g., "Wire-O spiral", "Saddle stitch", "Perfect bind"),
  trim_size: String (e.g., "3.5 x 8.5 inches"),

  -- Artwork and instructions
  artwork_url: String (S3 URL to preview image or PDF),
  job_level_instructions: Text,

  -- Additional specs
  folds: Array<String> (e.g., ["Tri-fold", "Letter fold"]),
  special_handling: String (e.g., "Fragile - ship carefully"),
}
```

### JobStepDetail (extends JobStep with instructions)
```
{
  step_id: UUID,

  -- From JobStep
  job_id: UUID,
  step_number: Integer,
  step_name: String,
  estimated_duration_seconds: Integer,

  -- Step-level instructions
  step_level_instructions: Text (e.g., "Use Color Profile: Verisign Gloss v2"),
  special_notes: Text,

  -- Capabilities required
  required_capabilities: Array<String> (e.g., ["spot_uv", "high_speed"]),

  -- Expected material usage (for operator awareness)
  material_consumption_pct: Float (e.g., 0.05 = 5% material loss expected),
}
```

### LocalStorageSchema (for offline operations)
```
{
  // Each queued action stored as:
  queuedActions: [
    {
      id: UUID (local, for deduplication),
      action: String (enum: start_step, complete_step, log_exception),
      jobId: UUID,
      stepId: UUID (if applicable),
      data: Object ({
        started_at: DateTime (for start_step),
        completed_at: DateTime (for complete_step),
        exception_reason: String (for log_exception),
        exception_severity: String,
        exception_notes: String,
        exception_photo_blob: Blob (for log_exception, stored as base64 string)
      }),
      timestamp: DateTime (when action was queued),
      status: String (enum: queued, syncing, synced, error)
    }
  ],

  // Cached queue data
  cachedQueues: {
    [stationId]: {
      queue: Array<Job>,
      cachedAt: DateTime
    }
  },

  // Cached job details
  cachedJobs: {
    [jobId]: {
      job: Job,
      steps: Array<JobStep>,
      cachedAt: DateTime
    }
  },

  // Offline status
  isOnline: Boolean,
  lastSyncAt: DateTime
}
```

---

## Edge Cases Table

| # | Edge Case | Scenario | Handling |
|---|-----------|----------|----------|
| EC 7.1 | Operator starts job, then immediately taps "Start" again | Double-tap on "Start" button | Button disabled after first tap; second tap has no effect (or shows tooltip "Already started") |
| EC 7.2 | Operator taps "Complete", confirms, then taps "Undo" after countdown expires | Undo window closed (30 sec passed) | Undo button disabled; job remains complete; operator notified "Undo window closed" |
| EC 7.3 | Operator scans barcode for job already completed | Barcode lookup returns completed job | Job Detail opens but with status "Complete" displayed prominently; action buttons disabled; warning: "This job is already complete" |
| EC 7.4 | Barcode scanned, but job not found | Invalid or unrecognized barcode | Error message displayed: "Job not found for barcode [barcode]"; scanner input re-focuses for retry |
| EC 7.5 | Network drops mid-action (during "Complete" button press) | Network fails before server receives request | Locally queued, banner shows "Offline - changes will sync when reconnected"; action appears to succeed on client |
| EC 7.6 | Two operators work on same job simultaneously | Operator A starts job, Operator B starts same job within 1 second | First operator's "Start" succeeds; second operator receives error: "Job already started by [Operator A] at [time]"; second operator's Start is ignored |
| EC 7.7 | Operator logs exception, then PM resolves it, while operator still viewing detail | Exception resolved by PM; operator's detail view is stale | Page auto-refreshes (WebSocket event); red "BLOCKED" banner disappears, replaced with green "UNBLOCKED" message; buttons re-enable |
| EC 7.8 | Job has 0 estimated time for a step | AI Estimator returns 0 min step | Display "Estimated: <1 min"; timer starts at 0 seconds regardless; actual duration tracked normally |
| EC 7.9 | Photo upload fails during exception submission | Network error during photo upload to S3 | Exception created without photo; error toast shown: "Photo could not upload, but exception logged"; photo retried during next sync |
| EC 7.10 | Multiple jobs in queue have same due time | Jobs #12501, #12502, #12503 all due at 3:00 PM | Secondary sort by job_id (ascending); queue displays in order: #12501, #12502, #12503 |
| EC 7.11 | Operator zooms artwork to 3x, then closes Job Detail and reopens same job | Zoom state not persisted | Artwork resets to 1x zoom on re-open (expected behavior, no persistence) |
| EC 7.12 | Touch screen registers accidental tap during "Complete" countdown | User sees accidental "Complete" confirmation, then realizes mistake mid-countdown | User can tap "Undo" button before countdown expires (30-second grace period) |
| EC 7.13 | Station deleted or made inactive while operator viewing queue | Station #5 (Binding) is deactivated by admin | Operator's view remains functional; warning message displayed "This station is no longer active"; after next refresh, operator returned to station selection screen |
| EC 7.14 | Operator offline, logs exception, then reconnects | Exception with photo queued locally; network restores | Sync batches the exception action; if photo too large (>5MB), user notified "Photo is too large, please retake smaller image" |
| EC 7.15 | LocalStorage quota exceeded (offline queue becomes too large) | Operator queues 100+ actions offline (unlikely, but possible) | App warns operator: "Storage full - some recent actions may not be saved"; oldest queued actions purged to make room |
| EC 7.16 | Operator taps "Issue" but network is offline | Exception Modal opens, user fills in form | Submit button shows "Queued" instead of "Submitted"; action stored in LocalStorage; syncs when reconnected |
| EC 7.17 | Job moved to next station while operator still viewing detail | Operator viewing Job #12567 at Binding station; PM manually moves it to QA | Operator's detail view becomes stale; WebSocket event triggers, warning shown: "This job has moved to QA station"; back button returns to Binding queue (now without this job) |

---

## State Machine: Station Operations

### Station Queue State
```
no_jobs
  ├─> has_jobs (new job added to station queue)
  └─> has_jobs (queue populated on load)

has_jobs
  ├─> has_jobs (jobs reordered by priority)
  ├─> has_jobs (job removed: moved to next station or completed)
  └─> has_jobs (new job added)
```

### Job Progression Through Stations
```
station_1_queue (not_started)
  ├─> station_1_in_progress (operator taps Start)
  └─> station_1_in_progress

station_1_in_progress (in_progress)
  ├─> station_1_blocked (exception logged)
  ├─> station_2_queue (operator completes step, next step exists at different station)
  └─> station_1_in_progress (work continues)

station_1_blocked (blocked)
  └─> station_1_in_progress (PM resolves exception)

station_1_complete (complete)
  ├─> job_complete (if final step)
  └─> station_2_queue (if more steps exist)
```

### Offline Synchronization State
```
online
  ├─> offline (network drops)
  └─> online (actions immediate)

offline
  ├─> offline (queuing actions)
  ├─> syncing (network reconnects)
  └─> offline (remains offline)

syncing
  ├─> online (all actions synced successfully)
  ├─> syncing_with_errors (some actions failed, retrying)
  └─> syncing

syncing_with_errors
  ├─> online (retry succeeded)
  └─> syncing_with_errors (retry failed, user notified)
```

---

## Integration Points

### 1. Production Tracking (PRD 6) → Station Views (PRD 7)
- **Trigger:** Job step status changes on shop floor
- **Data Flow:**
  - Operator taps "Start" on Station View
  - PATCH /api/jobs/{jobId}/steps/{stepId} sent with `status = in_progress`, `started_at = NOW()`
  - Production Tracking receives update, updates JobStep record
  - WebSocket event emitted to all subscribed clients
  - Production Dashboard receives real-time update
  - Station Queue stays in sync (job no longer "not started" status)
- **Status:** Bi-directional: Station View sends updates, Production Tracking notifies of changes

### 2. Barcode Scanning Integration
- **Input:** Operator scans barcode from printed job ticket
- **Process:** App parses barcode (Code128 or QR), extracts job ID
- **Lookup:** Query jobs table: SELECT * FROM Job WHERE barcode = @scanned_barcode
- **Action:** Open Job Detail View for matched job
- **Offline Support:** Barcodes cached locally during last sync; scanning offline checks cache first
- **Failure:** If barcode not found, show error; if offline and barcode not cached, show offline message

### 3. Real-Time Updates (WebSocket)
- **Events:**
  - `step:started` → {jobId, stepId, operatorId, startedAt}
  - `step:completed` → {jobId, stepId, operatorId, completedAt}
  - `exception:logged` → {jobId, stepId, reason, severity, photoUrl}
  - `exception:resolved` → {jobId, exceptionId, resolvedAt, resolutionNotes}
  - `queue:refreshed` → {stationId, updatedQueue} (entire queue re-sent)
- **Clients:** Station Queue, Job Detail, Production Dashboard all subscribe to relevant events
- **Fallback:** If WebSocket unavailable, client polls GET /api/stations/{stationId}/queue every 5 seconds

### 4. Notification Service
- **Events:**
  - Exception logged (severity Critical): PM receives push + email
  - Step completed: Production Dashboard notified (real-time update)
  - Job completed: CSR notified (if subscribed)
  - Undo action logged: Audit trail updated
- **Implementation:** Firebase Cloud Messaging (FCM) or similar

### 5. Offline Synchronization
- **Trigger:** Network connection restored
- **Batch Endpoint:** POST /api/sync with payload:
  ```json
  {
    "queuedActions": [
      {
        "action": "start_step",
        "jobId": "UUID",
        "stepId": "UUID",
        "startedAt": "2026-03-19T14:30:00Z",
        "operatorId": "UUID"
      },
      {
        "action": "complete_step",
        "jobId": "UUID",
        "stepId": "UUID",
        "completedAt": "2026-03-19T14:52:00Z",
        "operatorId": "UUID"
      },
      {
        "action": "log_exception",
        "jobId": "UUID",
        "stepId": "UUID",
        "reasonCode": "machine_down",
        "severity": "critical",
        "notes": "Paper jam...",
        "photoUrl": "s3://...base64...",
        "operatorId": "UUID"
      }
    ]
  }
  ```
- **Response:** Server processes each action, returns success/error status for each
- **Conflict Handling:** If action conflicts (e.g., job already completed by another operator), return error with details; client notifies operator

---

END OF PRD 7: STATION VIEWS

---

## PRD 8: Outsourcing / Trade Work [CORE]

### Problem Statement
Production operations require the ability to send jobs (or individual steps) to external vendors for specialized finishing (Spot UV, die-cutting, embossing, etc.). Without a dedicated outsourcing workflow:
- No standardized way to generate POs for vendors
- Vendor pricing (rate cards) not integrated; manual cost tracking
- No visibility into outsourced job status; PM must ping vendors manually
- No variance analysis between estimated cost and actual vendor invoice
- Vendor performance metrics (delivery, quality, cost) not tracked
- "Outsource" decision point not integrated into production workflow (operators don't know when to outsource vs. finish in-house)

### Solution Overview
Create an Outsourcing / Trade Work module where:
1. Production managers select a job step to outsource
2. System shows approved vendors with capabilities and rate cards
3. PO auto-generates with pricing (from vendor rate card or manual entry)
4. PO sent to vendor (email + dashboard view)
5. Status tracked: Sent → In Progress → Shipped → Received
6. Actual costs recorded, variance calculated
7. Vendor performance metrics aggregated for future vendor selection

---

## User Stories with Acceptance Criteria

### US 8.1: Production Manager Initiates Outsource Workflow
**As a** Production Manager
**I want to** mark a job step as "outsource" and select a vendor
**So that** specialized work is sent to the right external partner

**Acceptance Criteria:**
- When viewing Job Detail, PM can click "Outsource" button on any step (not yet started or in progress)
- Clicking "Outsource" opens modal:
  - Title: "Outsource Step: [Step Name]"
  - Step-level summary: step name, estimated cost, due date (inherited from job)
  - Vendor selector: dropdown or list of approved vendors filtered by capability
  - Vendor filter: "Show vendors with [Spot UV / Die-cut / Emboss / etc.]" capability
  - Quick vendor view: vendor name, contact, capabilities, last used, average rating, typical turnaround
  - Rate card option: if selected vendor has rate card, show pricing: "Spot UV: $[rate] per [unit]"
  - Manual cost entry (fallback): text field to enter custom cost if no rate card
  - Special instructions field (optional): "Fold 2mm inward" or similar
  - Due date override (optional): if different from job due date
  - "Generate PO" button (blue, primary)
- Modal form validation: Vendor and Cost both required; submit disabled until both set
- Clicking "Generate PO" opens preview modal

### US 8.2: Preview and Send PO to Vendor
**As a** Production Manager
**I want to** preview the PO before sending it to the vendor
**So that** I can verify all details are correct

**Acceptance Criteria:**
- PO preview modal shows:
  - PO Number (auto-generated, e.g., "PO-20260319-001")
  - Date created (today)
  - Vendor info: name, contact email, address, phone
  - Job info: Job ID, customer name, product type
  - Item line: Step name, description, quantity, unit price, total price
  - Special instructions (if provided)
  - Total cost (bold, large)
  - Estimated completion date (vendor's standard turnaround + today)
  - Payment terms (from vendor profile, e.g., "Net 30")
  - Footer: Shop name and contact info
- "Back" button (gray): return to outsource modal to edit
- "Send PO" button (green): sends PO to vendor via email and saves to system
- "Print PO" button: prints PO to paper (optional, nice-to-have)

**Acceptance Criteria:**
- On "Send PO" click:
  - PO record created in DB
  - Email sent to vendor email address with PO as PDF attachment
  - Email body: "Your purchase order [PO-123] is ready. Please confirm receipt and expected completion date."
  - PO status set to "Sent"
  - Job step status changed to "blocked" (waiting for vendor)
  - Outsource record linked to job step
  - PM receives confirmation: "PO sent to [Vendor Name]"
  - PM can view PO history in Job Detail View

### US 8.3: View Vendor List and Manage Vendor Profiles
**As a** Production Manager
**I want to** manage a list of approved vendors and their capabilities
**So that** I can quickly select the right vendor for each outsource need

**Acceptance Criteria:**
- Dedicated "Vendors" page accessible from sidebar (or within Settings/Admin)
- Vendor list table with columns:
  - Vendor Name (linked, opens Vendor Profile)
  - Capabilities (list, e.g., "Spot UV, Die-cut")
  - Contact Email (clickable, opens email client)
  - Phone (clickable, opens phone if mobile)
  - Status (Active / Inactive)
  - Avg Rating (1-5 stars, calculated from recent jobs)
  - Avg Turnaround (in hours or days)
  - Total Jobs (count of outsourced jobs)
  - Actions: View Profile, Edit, Deactivate
- "Add Vendor" button: opens form to create new vendor
- Search/filter: by name, capability, status
- Pagination: 10-25 vendors per page

### US 8.4: Manage Vendor Profile and Rate Card
**As a** Production Manager
**I want to** view and update a vendor's profile, including their rate card
**So that** pricing is current and accurate

**Acceptance Criteria:**
- Vendor Profile page shows:
  - Basic Info Section:
    - Vendor name
    - Contact email (linked)
    - Contact phone (linked)
    - Address (linked to Google Maps)
    - Website URL (linked)
    - Status toggle: Active / Inactive
  - Capabilities Section:
    - List of services offered (multi-select, checked/unchecked)
    - Turnaround estimate (in hours, editable)
    - Special notes (e.g., "Minimum order: 500 units")
  - Rate Card Section:
    - Table with columns: Service | Unit | Price Per Unit | Minimum Qty | Notes
    - Example rows:
      - Spot UV | Sheet | $0.15 | 100 | Full coverage
      - Die-cut | Sheet | $0.25 | 200 | Custom die only
      - Emboss | Sheet | $0.20 | 100 | Foil available
    - "Edit Rate Card" button: inline editing or separate form
    - "Upload Rate Card (CSV)" button: import pricing from CSV file
    - Rate card effective date: "Last updated: March 15, 2026"
  - Performance Metrics Section:
    - Total jobs outsourced: [count]
    - Average rating: [1-5 stars]
    - On-time delivery %: [%]
    - Quality issues: [count]
    - Average turnaround: [hours/days]
    - Recent jobs: linked list of last 5 outsourced jobs to this vendor
  - Action Buttons:
    - "Edit Profile" (gray, secondary)
    - "Deactivate Vendor" (red, if currently active)
    - "Delete Vendor" (red, disabled if vendor has active outsource jobs)

### US 8.5: Track Outsource Status (Sent → Received)
**As a** Production Manager
**I want to** see the status of outsourced jobs and be notified of delays
**So that** I can follow up with vendors and keep production on track

**Acceptance Criteria:**
- Dedicated "Outsource Status Tracker" page or widget in Production Dashboard
- Table showing all outsourced jobs (active and recent):
  - Columns: Job ID | Vendor | Step Name | Status | Sent Date | Est. Return | Days Overdue | Actions
  - Status values: Sent | In Progress | Shipped | Received | Overdue
  - Status color-coded: gray (Sent), blue (In Progress), green (Shipped), checkmark (Received), red (Overdue)
- Clicking a row opens Outsource Detail View
- Filter options: By vendor, by status, by date range
- "Overdue" tab shows only overdue outsource jobs (red highlight)

**Acceptance Criteria:**
- Outsource Detail View shows:
  - PO info: PO number, date sent, vendor
  - Step info: Job ID, step name, due date
  - Status timeline:
    - Sent: [date/time] ✓
    - In Progress: [date/time if updated] (or pending if not yet)
    - Shipped: [date/time if updated] (or pending if not yet)
    - Received: [date/time if updated] (or pending if not yet)
  - Vendor communication: text field "Add note to vendor" + send button
  - Actual cost field (optional, filled when invoice received): "[Enter actual cost]"
  - Cost variance: shows estimated vs. actual, % variance
  - "Mark as Received" button: changes status to Received, unblocks job step
  - "Follow Up Email" button: sends reminder to vendor

### US 8.6: Operator/PM Marks Outsource Job as Received
**As a** Production Manager (or Receiving Operator)
**I want to** mark an outsourced job as received
**So that** the job unblocks and moves to the next production step

**Acceptance Criteria:**
- From Outsource Status Tracker, click "Mark as Received" button
- Opens confirmation modal:
  - "Confirm Receipt of [PO Number]?"
  - Vendor name shown
  - "Received date": pre-filled with today's date (editable)
  - Optional: "Quality issues?" checkbox + text field
  - "Confirm" button (green)
  - "Cancel" button (gray)
- On confirmation:
  - Outsource record status changed to "Received"
  - Job step status changes from "blocked" to "complete" (or "not_started" for next step if multi-step outsource)
  - Job automatically unblocks, moves to next station queue
  - Production Dashboard updates in real-time
  - PM notified: "[Vendor] - [Step] received, job #[ID] unblocked"

### US 8.7: Record Actual Cost and Variance Analysis
**As a** Production Manager
**I want to** record the actual vendor invoice cost and see variance from estimate
**So that** I can track vendor accuracy and adjust future estimates

**Acceptance Criteria:**
- Outsource Detail View has "Actual Cost" field (editable text input)
- When actual cost entered:
  - Variance calculated: actual_cost - estimated_cost
  - Variance_pct calculated: (variance / estimated_cost) * 100
  - Color-coded display:
    - Green if variance <= 0 (under budget)
    - Yellow if variance 0-10% (slightly over)
    - Red if variance > 10% (significantly over budget)
  - Display: "Estimated: $50.00 | Actual: $52.50 | Variance: +$2.50 (+5%)"
- Variance logged in job's financial record (links to PRD covering job P&L)
- Variance data aggregated by vendor: "XYZ Vendor - Average variance: +3.2%"

### US 8.8: Track Vendor Performance Metrics
**As a** Production Manager (or Operations Manager)
**I want to** see performance metrics for each vendor
**So that** I can make informed decisions about future vendor selection

**Acceptance Criteria:**
- Vendor Profile displays:
  - On-Time Delivery Rate (%): calculated from jobs where received_date <= promised_date
  - Average Cost Variance (%): average of (actual_cost - estimated_cost) / estimated_cost for all jobs
  - Quality Issues Count: count of jobs where quality_issues = true
  - Average Turnaround (hours): average of (received_date - sent_date) for completed jobs
  - Trend chart (optional, nice-to-have): line chart showing cost variance over last 10 jobs
- Performance metrics populated from historical outsource records
- Data refreshes daily (or on-demand)

### US 8.9: Add New Vendor Inline During Outsource Workflow
**As a** Production Manager
**I want to** add a new vendor without leaving the outsource modal
**So that** I can quickly handle unexpected outsource needs

**Acceptance Criteria:**
- In Outsource Modal vendor selector dropdown:
  - Last option: "+ Add New Vendor"
  - Clicking opens inline form (or slide-over panel)
  - Form fields: Vendor Name, Email, Phone, Address (optional)
  - "Add Vendor" button (small, green)
  - After adding, vendor appears in dropdown and is auto-selected
  - Continue with rate card entry or manual cost

### US 8.10: Upload Vendor Rate Card via CSV
**As a** Production Manager
**I want to** bulk upload vendor pricing from a CSV file
**So that** I don't have to manually enter each price

**Acceptance Criteria:**
- On Vendor Profile, "Upload Rate Card (CSV)" button
- File picker opens, accepts .csv files only
- Expected CSV format:
  ```
  Service,Unit,PricePerUnit,MinimumQty,Notes
  Spot UV,Sheet,0.15,100,Full coverage
  Die-cut,Sheet,0.25,200,Custom die only
  Emboss,Sheet,0.20,100,Foil available
  ```
- On upload:
  - Parse CSV, validate format
  - Show preview: "3 services found - Spot UV, Die-cut, Emboss. Import?"
  - "Confirm Import" button
  - Replace existing rate card with new data
  - Update "Last updated" timestamp

---

## Detailed User Journeys

### Journey 8A: PM Outsources Spot UV Step for Urgent Job

1. **10:00 AM** PM opens Job Detail for Order #12899 (ABC Corp, large poster order)
2. **10:01 AM** Job shows 4 steps: Printing, Spot UV, Laminating, QA
3. **10:02 AM** Current step: "Printing" (in progress, 30 min remaining est.)
4. **10:03 AM** PM notes that Spot UV machine has been down all week; decides to outsource
5. **10:04 AM** PM clicks "Spot UV" step in timeline
6. **10:05 AM** Step detail expands, showing "Outsource" button (red/urgent style)
7. **10:06 AM** PM clicks "Outsource"
8. **10:07 AM** Outsource Modal opens:
   - Title: "Outsource Step: Spot UV Finishing"
   - Job info: Job #12899, ABC Corp, Posters, Due: Today 3:00 PM
   - Estimated cost: "$300" (calculated from step estimate)
   - Vendor selector dropdown (currently empty, showing "Select a vendor...")
9. **10:08 AM** PM clicks vendor dropdown
10. **10:09 AM** Dropdown shows approved vendors with Spot UV capability:
    - "ColorFX Labs" (4.8 stars, 24h turnaround)
    - "SpotWorks Inc" (4.2 stars, 48h turnaround)
    - "Quick Finishes" (3.9 stars, 12h turnaround)
    - "+ Add New Vendor" (at bottom)
11. **10:10 AM** PM selects "ColorFX Labs"
12. **10:11 AM** Modal updates showing ColorFX Labs rate card:
    - "Spot UV: $0.30 per sheet"
    - Estimated qty: 5000 sheets
    - Calculated cost: $0.30 × 5000 = $1500 (shown, different from initial estimate)
13. **10:12 AM** PM adjusts in notes: "Due today by 2:00 PM for same-day delivery"
14. **10:13 AM** Modal shows "Special Instructions" field
15. **10:14 AM** PM types: "High-gloss varnish preferred; must match Pantone 293 blue"
16. **10:15 AM** PM clicks "Generate PO"
17. **10:16 AM** PO preview modal opens showing:
    - PO Number: PO-20260319-0042
    - Vendor: ColorFX Labs
    - Item: Spot UV Finishing, 5000 sheets, $0.30/sheet, Total $1500
    - Special instructions: "High-gloss varnish preferred..."
    - Est. completion: Today 2:00 PM (vendor's express turnaround)
    - Total cost: $1,500.00 (bold, large)
18. **10:17 AM** PM reviews PO, clicks "Send PO"
19. **10:18 AM** Backend processes:
    - PO record created in DB
    - Email sent to ColorFX Labs (contact@colorfxlabs.com)
    - Job step status changed to "blocked" (waiting for vendor)
    - Outsource record linked to Job #12899, Spot UV step
20. **10:19 AM** PM sees confirmation: "PO sent to ColorFX Labs"
21. **10:20 AM** Production Dashboard auto-updates, shows Job #12899 step "Spot UV" now has vendor indicator (locked icon + "ColorFX Labs")

### Journey 8B: PM Follows Up on Overdue Outsource Job

1. **2:15 PM** PM checks Outsource Status Tracker (noon update showed ColorFX Labs was still on track)
2. **2:16 PM** Current time is 2:15 PM; Spot UV was due back at 2:00 PM
3. **2:17 PM** PM sees red "OVERDUE" status for Job #12899 Spot UV step
4. **2:18 PM** PM clicks on the outsource record
5. **2:19 PM** Outsource Detail opens:
   - PO info: PO-20260319-0042, sent 10:18 AM
   - Status timeline:
     - Sent: 10:18 AM ✓
     - In Progress: (no update yet)
     - Shipped: (pending)
     - Received: (pending)
   - "Days Overdue: 15 minutes"
   - "Follow Up Email" button (red, suggests sending reminder)
6. **2:20 PM** PM clicks "Follow Up Email"
7. **2:21 AM** Modal opens: "Remind vendor about [PO-20260319-0042]?"
8. **2:22 PM** PM can type custom message: "Hi ColorFX Labs, we agreed on 2:00 PM delivery. Can you confirm ETA?"
9. **2:23 PM** PM sends follow-up email
10. **2:24 PM** Vendor notified, email logged in outsource record

### Journey 8C: PM Records Actual Cost and Analyzes Vendor Performance

1. **3:30 PM** PM receives call: "ColorFX Labs says the Spot UV is ready for pickup"
2. **3:31 PM** PM goes to Outsource Status Tracker
3. **3:32 PM** PM finds Job #12899, clicks "Mark as Received"
4. **3:33 PM** Confirmation modal:
   - "Confirm Receipt of PO-20260319-0042?"
   - Vendor: ColorFX Labs
   - Received date: [today, 3:30 PM] (editable)
5. **3:34 PM** PM confirms
6. **3:35 PM** Outsource status changed to "Received"
7. **3:36 PM** Job step unblocks, moves to next step (Laminating) in Production Dashboard
8. **3:37 PM** PM receives invoice from ColorFX Labs: $1,575 (instead of quoted $1,500)
9. **3:38 PM** PM returns to Outsource Detail, fills in "Actual Cost": $1,575
10. **3:39 PM** System calculates:
    - Variance: $1,575 - $1,500 = +$75
    - Variance %: ($75 / $1,500) × 100 = +5%
    - Display (yellow): "Estimated: $1,500 | Actual: $1,575 | Variance: +$75 (+5%)"
11. **3:40 PM** PM reviews ColorFX Labs vendor profile
12. **3:41 PM** Profile shows updated metrics:
    - Total jobs: 12
    - On-time delivery: 83% (was 85%, this one was 90 min late)
    - Average cost variance: +3.2% (updated to include this job)
    - Quality issues: 0

### Journey 8D: PM Manages Vendor Rate Card Upload

1. **11:00 AM** PM receives updated pricing from SpotWorks Inc vendor
2. **11:01 AM** File received: "spotworks_rates_2026-03-19.csv"
3. **11:02 AM** PM opens Vendors page, finds SpotWorks Inc
4. **11:03 AM** PM clicks "Upload Rate Card (CSV)"
5. **11:04 AM** File picker opens
6. **11:05 AM** PM selects spotworks_rates_2026-03-19.csv
7. **11:06 AM** File parsed, CSV preview shown:
   ```
   Service: Spot UV, Die-cut, Emboss (3 services)
   Spot UV: $0.28 per sheet (was $0.32)
   Die-cut: $0.22 per sheet (was $0.25)
   Emboss: $0.19 per sheet (was $0.20)
   ```
8. **11:07 AM** PM clicks "Confirm Import"
9. **11:08 AM** Rate card replaced, "Last updated: March 19, 2026 11:08 AM" shown
10. **11:09 AM** PM closes vendor profile
11. **11:10 AM** Next time PM outsources to SpotWorks Inc, new pricing is automatically used

---

## Screen/View Descriptions

### Screen 8.1: Outsource Modal

**Layout:**
- Modal dialog, 500px wide, centered on screen
- Title: "Outsource Step: [Step Name]"
- Scrollable content area:

**Job Context Section:**
- Job info: "Order #12899 | ABC Corp | Posters | Due: Today 3:00 PM"
- Step info: "Current: Printing (in progress, 30 min remaining)"

**Vendor Selection Section:**
- Label: "Select a Vendor"
- Dropdown / vendor selector:
  - Shows list of approved vendors filtered by step capability
  - Vendor tile layout (if multi-select view):
    - Vendor name (bold)
    - Capabilities: [icons/badges]
    - Contact: [email, phone]
    - Rating: [stars] [avg rating]
    - Turnaround: "[X hours]"
    - Last used: "[date]"
  - Clicking vendor highlights selection
  - Bottom option: "+ Add New Vendor" (opens inline form)

**Rate Card / Cost Section:**
- If vendor has rate card:
  - Label: "Pricing (from [Vendor] rate card)"
  - Rate card summary table:
    - Service | Unit | Price | Min Qty
    - Spot UV | Sheet | $0.30 | 100
  - Auto-calculated cost: "Estimated quantity: 5000 sheets × $0.30 = $1,500"
  - Cost display (large): "Estimated Cost: $1,500"
- If vendor has no rate card:
  - Label: "Pricing (manual entry)"
  - Input field: "Enter cost for this step: $____"

**Special Instructions Section:**
- Label: "Special Instructions (optional)"
- Textarea: placeholder "Any special requirements for this vendor?"

**Due Date Override Section:**
- Label: "Due Date (default: job due date)"
- Date/time picker: shows job due date, can override for expedited/delayed
- Typical turnaround shown as info: "(ColorFX typical: 24h)"

**Action Buttons:**
- "Back" button (gray, left-aligned, secondary)
- "Generate PO" button (blue, right-aligned, primary, disabled until vendor + cost selected)

---

### Screen 8.2: PO Preview Modal

**Layout:**
- Modal dialog, 600px wide, centered
- Title: "Preview Purchase Order"
- Printable layout (styled for PDF export)

**PO Content:**
```
                    PURCHASE ORDER

PO Number: PO-20260319-0042          Date: March 19, 2026
Vendor: ColorFX Labs                 Due: Today 3:00 PM

Vendor Contact:
ColorFX Labs
contact@colorfxlabs.com
(555) 123-4567
123 Finishing Ave, City, ST 12345

Item Details:
Job ID:           #12899
Customer:         ABC Corp
Product:          Posters (5000 units)
Step:             Spot UV Finishing
Description:      High-gloss varnish preferred; Pantone 293 blue

Pricing:
Service:          Spot UV Finishing
Quantity:         5000 sheets
Unit Price:       $0.30 per sheet
Total:            $1,500.00

Special Instructions:
High-gloss varnish preferred; must match Pantone 293 blue

Est. Completion:  Today 2:00 PM
Payment Terms:    Net 30

                                    TOTAL: $1,500.00

---

Your Shop Name
[Shop Address]
[Phone]
```

**Action Buttons:**
- "Back" (gray, secondary): return to outsource modal
- "Print PO" (gray, secondary): print to paper
- "Send PO" (blue, primary, large): sends to vendor

---

### Screen 8.3: Outsource Status Tracker

**Layout:**
- Page title: "Outsource Status Tracker"
- Top bar: filters and controls
  - Filter by vendor: dropdown
  - Filter by status: "All | Sent | In Progress | Shipped | Received | Overdue"
  - Date range: date pickers (optional)
  - "Overdue" tab (shows only overdue outsource jobs, red highlight)

**Main Table:**
- Columns (sortable headers):
  - **Job ID** (linked, e.g., "#12899")
  - **Vendor** (linked to vendor profile)
  - **Step Name** (e.g., "Spot UV Finishing")
  - **Status** (color-coded dot + text: "Sent", "In Progress", "Shipped", "Received", "Overdue")
  - **Sent Date** (date + time, e.g., "Mar 19, 10:18 AM")
  - **Est. Return** (date + time, e.g., "Mar 19, 2:00 PM", color-coded: red if overdue)
  - **Days Overdue** (if status = Overdue, shows red "[X] hours overdue")
  - **Actions** (buttons: View Details, Follow Up, Mark Received)

- Row height: 56px
- Hover state: light gray background, shows secondary actions
- Pagination: 10-25 per page

**Status Color Coding:**
- Gray dot: Sent (waiting for vendor to start)
- Blue dot: In Progress (vendor working)
- Green dot: Shipped (vendor shipped, in transit)
- Checkmark: Received (arrived, job unblocked)
- Red dot: Overdue (exceeded due date, not yet received)

---

### Screen 8.4: Outsource Detail View

**Layout:**
- Back button | Title: "Outsource Detail - [PO Number]"
- Scrollable content:

**PO Information Section:**
- PO Number: "PO-20260319-0042" (bold, large)
- Vendor: "ColorFX Labs" (linked to vendor profile)
- Job Info: "Order #12899 | ABC Corp | Posters"
- Date Sent: "Mar 19, 2026 10:18 AM"
- Special Instructions: "High-gloss varnish..."

**Status Timeline Section:**
- Visual timeline with 4 steps:
  - Sent: [date/time] ✓ (checkmark if completed)
  - In Progress: [date/time if updated] (or "pending" if not yet)
  - Shipped: [date/time if updated] (or "pending" if not yet)
  - Received: [date/time if updated] (or "pending" if not yet)
- Current step highlighted
- If overdue: red banner showing "OVERDUE by [X] hours" with warning icon

**Cost Information Section:**
- Estimated Cost: "$1,500.00"
- Actual Cost: [input field, editable] (if blank, shows placeholder "$____")
- On actual cost entry: Variance display
  - "Variance: $75 (+5%)" (color-coded: green if negative, yellow if 0-10%, red if >10%)

**Vendor Communication Section:**
- Label: "Notes to Vendor"
- Text field (textarea): placeholder "Add note to vendor (optional)"
- "Send Note" button (sends via email)
- Previous notes displayed below (read-only, chronological)

**Action Buttons:**
- "Mark as Received" button (green, large, primary, disabled if already received)
- "Follow Up Email" button (secondary)
- "View PO" button (secondary): shows full PO preview
- "Print PO" button (secondary)

**Quality Issues Section (Optional):**
- Checkbox: "Quality issues encountered?"
- Text field: "Describe issues..." (appears if checked)

---

### Screen 8.5: Vendor List

**Layout:**
- Page title: "Vendors"
- Top bar:
  - Search field: "Search vendors by name or capability"
  - "Add Vendor" button (blue, primary)
  - Filter: "All | Active | Inactive"

**Vendor Table:**
- Columns (sortable):
  - **Vendor Name** (linked to vendor profile)
  - **Capabilities** (badges/tags: "Spot UV", "Die-cut", "Emboss", etc.)
  - **Contact Email** (linked)
  - **Phone** (linked)
  - **Status** (Active / Inactive toggle)
  - **Avg Rating** (stars, e.g., 4.8 ⭐)
  - **Avg Turnaround** (e.g., "24h")
  - **Total Jobs** (count, e.g., "12")
  - **Actions** (buttons: View Profile, Edit, Deactivate)

- Row height: 56px
- Hover state: light gray, secondary actions visible
- Pagination: 10-25 vendors per page

---

### Screen 8.6: Vendor Profile

**Layout:**
- Back button | Vendor name (large, bold)
- Tabbed interface (or scrollable sections):

**Tab 1: Overview**
- **Basic Information Section:**
  - Vendor name (editable)
  - Contact email (linked, editable)
  - Contact phone (linked, editable)
  - Address (editable, linked to Google Maps)
  - Website URL (linked)
  - Status: Active / Inactive toggle

- **Capabilities Section:**
  - Checkboxes: Spot UV | Die-cut | Emboss | Lamination | Binding | Other
  - Standard turnaround (hours): [input field]
  - Special notes: [textarea] "Minimum order: 500 units"

- **Performance Metrics Section (Read-only):**
  - Total jobs outsourced: 12
  - Average rating: 4.8 ⭐ (out of 5)
  - On-time delivery: 83%
  - Quality issues: 0
  - Average turnaround: 24.5 hours
  - Trend chart (optional): line chart showing cost variance over 10 recent jobs

**Tab 2: Rate Card**
- **Rate Card Table:**
  - Columns: Service | Unit | Price Per Unit | Min Qty | Notes | Actions
  - Example rows:
    - Spot UV | Sheet | $0.30 | 100 | Full coverage | [Edit] [Delete]
    - Die-cut | Sheet | $0.25 | 200 | Custom die | [Edit] [Delete]
  - "Add Service" button: add new rate card line
  - "Upload Rate Card (CSV)" button: bulk import pricing

- **Rate Card Info:**
  - "Last updated: Mar 15, 2026"
  - Help text: "These prices are used for automatic PO cost calculation"

**Tab 3: Job History**
- **Recent Outsource Jobs:**
  - Linked list of last 10-20 outsourced jobs to this vendor
  - Columns: Job ID | Date | Status | Cost Variance | Quality
  - Clicking job linked to Job Detail View

**Action Buttons:**
- "Edit Profile" button (gray, secondary)
- "Deactivate Vendor" button (red, if active, disabled if vendor has active outsource jobs)
- "Delete Vendor" button (red, disabled if vendor has any job history)

---

## Functional Requirements Table

| # | Requirement | Input | Process | Output | Notes |
|---|-------------|-------|---------|--------|-------|
| FR 8.1 | Initiate outsource workflow | Click "Outsource" on job step | Open Outsource Modal with vendor selector | Outsource Modal rendered with vendor list filtered by capability | Modal shows estimated cost from step estimate |
| FR 8.2 | Select vendor from dropdown | Vendor dropdown interaction | Filter approved vendors by capability, sort by rating/turnaround | Dropdown list of vendors | Selected vendor highlighted |
| FR 8.3 | Auto-calculate cost from rate card | Vendor selected, rate card exists | Lookup vendor rate card, multiply rate × estimated quantity | Estimated cost displayed | If no rate card, show manual cost entry field |
| FR 8.4 | Generate PO | Outsource Modal submit | Create PO record: PO_Number, Vendor_ID, Job_ID, Step_ID, Cost, DueDate, Status=Sent | PO Preview Modal rendered | PO number auto-generated (e.g., PO-20260319-0042) |
| FR 8.5 | Send PO to vendor | PO Preview submit | Email PO as PDF attachment to vendor email; update PO status = "Sent"; block job step | PO sent confirmation; email logged | Create audit entry |
| FR 8.6 | Block job step when outsourced | PO sent | Update JobStep: step_type = outsourced, status = blocked, outsource_vendor_id, po_id | Step shows "blocked" status in Production Tracking | PM cannot re-start step without resolving outsource |
| FR 8.7 | Vendor list page | Navigate to Vendors | GET /api/vendors (approved vendors, active/inactive status) | Vendor list table with columns | Sortable, filterable, searchable |
| FR 8.8 | View vendor profile | Click vendor name | GET /api/vendors/{vendorId}/profile (basic info, capabilities, rate card, metrics) | Vendor Profile page rendered | Includes performance metrics calculated from job history |
| FR 8.9 | Edit vendor rate card | Click "Edit" on rate card | Inline editing or separate form; PATCH /api/vendors/{vendorId}/rate_card | Rate card updated | Last updated timestamp recorded |
| FR 8.10 | Upload vendor rate card CSV | Select CSV file | Parse CSV (Service, Unit, Price, Min Qty, Notes); validate format | Import preview shown with row count | User confirms import; replaces existing rate card |
| FR 8.11 | Track outsource status | Outsource Status Tracker page | GET /api/outsource/jobs (all outsource records with status) | Status Tracker table rendered | Shows Sent/In Progress/Shipped/Received/Overdue |
| FR 8.12 | Mark outsource as "Received" | Click "Mark as Received" | Update Outsource record: status = Received, received_at = NOW(); unblock job step; trigger next step to queue | Job step unblocked, job moves to next station | Real-time notification to PM |
| FR 8.13 | Record actual cost | Enter actual cost in Outsource Detail | Calculate variance: actual_cost - estimated_cost; variance_pct = (variance / estimated_cost) * 100 | Variance displayed, color-coded | Variance data stored for vendor performance analysis |
| FR 8.14 | Calculate vendor performance metrics | Historical outsource data | Query all outsource records for vendor; calculate: on-time %, cost variance avg, quality issues count, avg turnaround | Metrics displayed in Vendor Profile | Data refreshes daily or on-demand |
| FR 8.15 | Follow up with vendor | Click "Follow Up Email" button | Compose email to vendor with PO details, reminder of due date | Email sent, logged in outsource record | Optional custom message |
| FR 8.16 | Add vendor inline during outsource | Click "+ Add New Vendor" in dropdown | Open quick form (name, email, phone); POST /api/vendors (create new vendor) | New vendor created, auto-selected in dropdown | Form submits without closing Outsource Modal |
| FR 8.17 | Filter Outsource Status Tracker | Select filter criteria | GET /api/outsource/jobs?vendor={vendorId}&status={status}&dateRange={...} | Filtered table | Cumulative AND logic |
| FR 8.18 | Link PO to job step | PO generated | Create relationship: Outsource record with po_id, vendor_id, step_id, job_id | PO traceable from Job Detail and vice versa | Accessible in production workflow |
| FR 8.19 | Notify PM when outsource overdue | Cron job or polling check | Compare outsource.due_date with NOW(); if overdue, flag as "Overdue" | Outsource Status Tracker highlights overdue jobs (red) | Push notification sent to PM |
| FR 8.20 | Email PO as PDF to vendor | PO generation | Generate PDF using jsPDF; attach to email; send via email service (SendGrid, etc.) | Email sent with PDF attachment | Vendor receives formatted, printable PO |

---

## Data Requirements & Entity Schemas

### Vendor (new)
```
{
  vendor_id: UUID (primary key),
  shop_id: UUID (foreign key),
  vendor_name: String (required),
  contact_email: String (required, email format),
  contact_phone: String,
  address: String,
  website_url: String (optional),

  -- Status
  is_active: Boolean (default true),

  -- Capabilities
  capabilities: Array<String> (enum: spot_uv, die_cut, emboss, lamination, binding, other),
  standard_turnaround_hours: Integer (e.g., 24),
  special_notes: Text (e.g., "Minimum order: 500 units"),

  -- Metadata
  created_at: DateTime,
  updated_at: DateTime,
  last_used_date: DateTime (date of most recent outsource to this vendor)
}
```

### VendorRateCard (new)
```
{
  rate_card_id: UUID (primary key),
  vendor_id: UUID (foreign key),
  shop_id: UUID (foreign key),

  -- Rate card items (array of services with pricing)
  services: Array<{
    service_name: String (e.g., "Spot UV Finishing"),
    unit: String (enum: sheet, unit, piece, per_hour, etc.),
    price_per_unit: Float (e.g., 0.30),
    minimum_qty: Integer (e.g., 100),
    notes: String (e.g., "Full coverage"),
    effective_date: DateTime (when this rate became active)
  }>,

  -- Metadata
  last_updated_at: DateTime,
  last_updated_by: UUID (user_id),
  is_current: Boolean (default true, allows versioning)
}
```

### Outsource (new)
```
{
  outsource_id: UUID (primary key),
  shop_id: UUID (foreign key),

  -- Job / Step reference
  job_id: UUID (foreign key),
  step_id: UUID (foreign key),

  -- PO reference
  po_number: String (unique per shop, e.g., "PO-20260319-0042"),
  po_id: UUID (optional, if separate PO record exists),

  -- Vendor reference
  vendor_id: UUID (foreign key),

  -- Pricing
  estimated_cost: Float,
  actual_cost: Float (null until invoice received),
  cost_variance: Float (calculated: actual_cost - estimated_cost),
  cost_variance_pct: Float (calculated percentage),

  -- Timeline
  sent_at: DateTime,
  sent_by: UUID (user_id),
  in_progress_at: DateTime (optional, vendor marks job as started),
  shipped_at: DateTime (optional, vendor marks as shipped),
  received_at: DateTime (optional, PM marks as received),

  -- Status
  status: String (enum: sent, in_progress, shipped, received, overdue),
  due_date: DateTime (default: job.due_date, can be overridden for expedited/delayed)

  -- Special instructions
  special_instructions: Text,

  -- Quality
  quality_issues: Boolean (default false),
  quality_notes: Text,

  -- Metadata
  created_at: DateTime,
  updated_at: DateTime,
  notes: Text (vendor communication thread or notes)
}
```

### PurchaseOrder (new, if separate from Outsource)
```
{
  po_id: UUID (primary key),
  po_number: String (unique per shop),
  shop_id: UUID (foreign key),

  -- References
  vendor_id: UUID (foreign key),
  outsource_id: UUID (foreign key, if linked),
  job_id: UUID (foreign key),
  step_id: UUID (foreign key),

  -- PO content
  items: Array<{
    description: String,
    quantity: Integer,
    unit_price: Float,
    total_price: Float (quantity × unit_price)
  }>,

  -- Totals
  subtotal: Float,
  tax: Float (optional),
  total: Float,

  -- Dates
  created_at: DateTime,
  due_date: DateTime,
  created_by: UUID (user_id),

  -- Status
  status: String (enum: draft, sent, confirmed, received),

  -- Metadata
  notes: Text,
  pdf_url: String (S3 URL to generated PDF)
}
```

### OutsourcePerformanceMetrics (view/calculated table)
```
{
  vendor_id: UUID,
  shop_id: UUID,

  -- Counts
  total_jobs: Integer (count of all outsource records),
  completed_jobs: Integer (status = received),

  -- On-time delivery
  on_time_count: Integer (count where received_at <= due_date),
  on_time_pct: Float (on_time_count / completed_jobs * 100),

  -- Cost tracking
  total_estimated_cost: Float (sum of estimated_cost),
  total_actual_cost: Float (sum of actual_cost where not null),
  avg_cost_variance_pct: Float (average of cost_variance_pct),

  -- Quality
  quality_issues_count: Integer (count where quality_issues = true),

  -- Turnaround
  avg_turnaround_hours: Float (average of (received_at - sent_at)),
  avg_turnaround_days: Float (avg_turnaround_hours / 24),

  -- Rating
  overall_rating: Float (1-5 stars, weighted by recency),

  -- Recalculated
  last_calculated_at: DateTime (daily, or on-demand)
}
```

---

## Edge Cases Table

| # | Edge Case | Scenario | Handling |
|---|-----------|----------|----------|
| EC 8.1 | PM starts outsource for a step, then cancels before PO sent | Outsource modal opened, vendor selected, cost entered, but "Back" clicked | Modal closes without creating PO; no data saved |
| EC 8.2 | Vendor deleted while outsource job is in progress | Outsource status = "In Progress", vendor deactivated | Outsource record keeps historical vendor_id; vendor profile becomes inaccessible but PO remains valid |
| EC 8.3 | Rate card expires (vendor provides new updated pricing mid-job) | New rate card uploaded for vendor; existing outsource already created with old pricing | New rate card applies only to new POs; existing PO unchanged |
| EC 8.4 | Actual cost vastly exceeds estimate (vendor overcharge) | Estimated: $500, Actual: $2000 | Variance calculated (+$1500, +300%); displayed in red; PM notified; can flag for dispute/review |
| EC 8.5 | PM marks outsource as received, but vendor shipment damaged | Quality issues checkbox checked, notes added: "Delivered with torn packaging" | Outsource marked received (job unblocked), but quality_issues flag in record; vendor performance metrics reflect issue |
| EC 8.6 | Vendor email address invalid or missing | PO generated, "Send PO" clicked | Email fails, error shown: "Invalid vendor email - update vendor profile first"; PO marked "Draft" not "Sent" |
| EC 8.7 | CSV rate card upload has formatting errors | CSV missing required columns or malformed | Parse fails; error message shown: "CSV format error at row 3 - missing 'PricePerUnit'"; user prompted to fix and retry |
| EC 8.8 | Two PMs simultaneously mark same outsource as received | PM A and PM B both click "Mark as Received" within 1 second | First request succeeds (status = received); second request returns error: "Already marked received at [time]"; PM B sees notification |
| EC 8.9 | Job is outsourced, then customer cancels order | Outsource in "Sent" status, job cancelled by CSR | Outsource record remains (for audit/history); PM should follow up email to vendor: "Order cancelled, please disregard PO-123" |
| EC 8.10 | Vendor is added inline during outsource, but lacks email/phone | PM clicks "+ Add New Vendor", fills only name, creates vendor | Vendor created but incomplete; PO send fails; PM prompted to complete vendor profile before sending PO |
| EC 8.11 | Rate card has minimum qty = 1000, but job quantity = 500 | Outsource modal shows rate card pricing for 500 units (below minimum) | Warning displayed: "Quantity below vendor minimum (1000). Vendor may apply minimum qty charge." PM can proceed or select different vendor |
| EC 8.12 | Outsource due date is in the past | PM creates outsource with due date = yesterday | Warning: "Due date is in the past. Confirm expedited delivery with vendor." User must confirm before sending PO |
| EC 8.13 | Operator marks job step complete before outsource received | Job is mid-production, Spot UV outsourced but marked received; operator completes Binding early | Job can only complete final step if all prior steps (including outsourced ones) are complete; Binding step blocked until Spot UV received |
| EC 8.14 | Vendor performance metrics calculated while query is stale | Last calculation at 9:00 AM, new outsource completed at 10:30 AM | Metrics show last calculated time; "Refresh Metrics" button available; auto-refresh daily or on-demand |

---

## State Machine: Outsource Status

### Outsource Status Transitions
```
sent
  ├─> in_progress (vendor marks job started, optional status update)
  ├─> shipped (vendor marks as shipped)
  └─> overdue (if due_date < NOW() and status != received)

in_progress
  ├─> shipped (vendor marks as shipped)
  ├─> overdue (if due_date < NOW() and status != received)
  └─> in_progress (remains)

shipped
  ├─> received (PM marks as received)
  ├─> overdue (if due_date < NOW() and status != received)
  └─> shipped (remains)

received
  └─> [terminal state, no further transitions]

overdue [derived state, not a true status]
  └─> received (when PM marks received, status = received, overdue flag cleared)
```

### Job Step Status (when outsourced)
```
[step status before outsource]
  ├─> blocked (status set to "blocked" when outsource initiated)
  └─> blocked

blocked [outsource in progress]
  ├─> complete (when outsource marked "received")
  ├─> blocked (remains while outsource pending or overdue)
  └─> blocked

complete
  └─> [terminal state]
```

---

## Integration Points

### 1. Production Tracking (PRD 6) → Outsourcing (PRD 8)
- **Trigger:** PM clicks "Outsource" button on a job step in Job Detail
- **Data Flow:**
  - Opens Outsource Modal with job/step context
  - PM selects vendor, cost calculated from rate card
  - PO generated, sent to vendor
  - JobStep updated: `step_type = outsourced`, `status = blocked`, `outsource_vendor_id`, `po_id`
  - Outsource record created, linked to step
  - Production Dashboard updates: step shows outsource indicator (vendor name, PO number)
  - Step blocked until vendor delivery; PM cannot manually restart step
- **Status:** Unidirectional: Production Tracking initiates outsource; Outsourcing updates job step status

### 2. Outsourcing (PRD 8) → Station Views (PRD 7)
- **Trigger:** Operator attempts to start a blocked/outsourced step
- **Data Flow:**
  - Station View loads job detail
  - Step status = "blocked" (outsource in progress)
  - "Start" button disabled, replaced with message: "Waiting for vendor: ColorFX Labs (Est. return: Mar 19, 2:00 PM)"
  - Operator cannot proceed
  - When vendor completes (PM marks received in PRD 8):
    - Step status changes to "complete"
    - Next station's queue auto-updates with job
- **Status:** Integration point: Outsource blocks station operations; Production Tracking controls flow

### 3. Vendor Rate Card Integration
- **Data Source:** Vendor profile rate card (VendorRateCard table)
- **Usage:** When outsource modal opens with selected vendor:
  - Query vendor rate card: GET /api/vendors/{vendorId}/rate_card
  - Find matching service (e.g., "Spot UV Finishing")
  - If matched, retrieve price_per_unit
  - Calculate cost: price_per_unit × estimated_quantity
  - Display in Outsource Modal: "Estimated: $[cost]"
- **Fallback:** If vendor has no rate card, show manual cost entry field

### 4. PO Email Integration
- **Trigger:** PM clicks "Send PO" in preview modal
- **Process:**
  - Generate PDF from PO data using jsPDF library
  - Compose email body with PO details
  - Send email via email service (SendGrid, AWS SES, Gmail API, etc.)
  - Recipient: vendor.contact_email
  - Subject: "Purchase Order [PO-123] from [Shop Name]"
  - Attachment: PDF file named `[PO-Number].pdf`
- **Delivery:** Vendor receives email with PO; can print and reference
- **Logging:** Email delivery logged in Outsource record

### 5. Vendor Performance Metrics Aggregation
- **Trigger:** Cron job (daily) or on-demand refresh
- **Process:**
  - Query all Outsource records for each vendor
  - Calculate metrics:
    - on_time_pct: count(received_at <= due_date) / count(status = received) × 100
    - avg_cost_variance_pct: avg((actual_cost - estimated_cost) / estimated_cost) × 100
    - quality_issues_count: count(quality_issues = true)
    - avg_turnaround_hours: avg(received_at - sent_at) / 3600
  - Store in OutsourcePerformanceMetrics table
  - Update Vendor Profile display
- **Usage:** PM uses metrics to inform vendor selection in future outsources

### 6. Notification Service (PRD 6 integration)
- **Events:**
  - `outsource:created` → PO sent to vendor, PM may receive notification
  - `outsource:overdue` → PM receives push notification: "Outsource job overdue from [Vendor]"
  - `outsource:received` → Production team notified job unblocked and moving to next step

### 7. Outsource in Production Dashboard (PRD 6)
- **Display:** When job step is outsourced, Production Dashboard shows:
  - Step indicator: vendor name + "Outsource" label + PO number (linked)
  - Status: "Blocked" (red)
  - Due date: vendor's estimated completion date (if different from job due)
  - Time remaining: countdown to vendor due date
- **Actions:** PM can click on outsource indicator to open Outsource Detail View (PRD 8)

---

## Error Handling & Validation

### Outsource Modal Validation
- **Vendor required:** Error message "Please select a vendor"
- **Cost required:** Error message "Please enter or confirm cost"
- **Special instructions optional:** No validation
- **Due date optional:** Uses job due date by default

### PO Send Validation
- **Vendor email:** Must be valid email format
- **PO data completeness:** All required fields populated
- **On validation failure:** Error message shown, PO remains in "Draft" status

### Rate Card CSV Upload Validation
- **Format:** Required columns: Service, Unit, PricePerUnit, MinimumQty, Notes
- **Data types:** PricePerUnit must be numeric, MinimumQty must be integer
- **On parse error:** Show error at row level, allow user to fix and retry
- **On success:** Preview shown before final confirmation

---

END OF PRD 8: OUTSOURCING / TRADE WORK

---

## Summary: Phase 1 WS2 PRDs

**PRD 6: Production Tracking** provides real-time visibility into job progress (MIS + programmatic unified), exception logging with escalation, and actual vs. estimated time tracking for process optimization.

**PRD 7: Station Views** delivers a touch-optimized operator interface with large targets (44px+), offline support with local sync, barcode scanning, and quick start/complete workflows designed for shop floor tablets and gloves.

**PRD 8: Outsourcing / Trade Work** enables vendor management, PO generation with rate card pricing, status tracking, and performance metrics aggregation to inform future vendor selection and cost analysis.

All three PRDs integrate seamlessly:
- Production Tracking (PRD 6) is the source of truth for job status; Station Views (PRD 7) update it; Outsourcing (PRD 8) blocks steps and unblocks when vendor delivers
- Station Views (PRD 7) display jobs from Production Tracking (PRD 6) and update status in real-time
- Outsourcing (PRD 8) uses vendor rate cards for cost calculation and integrates PO email, status tracking, and performance metrics

Implementation should prioritize PRD 6 (dashboard + tracking) as foundational, then PRD 7 (station views) for shop floor operations, and finally PRD 8 (outsourcing) for specialty finishing workflows.



# GelatoConnect MIS Phase 1: WS3, WS4, and Cross-Cutting PRDs

---

## PRD 9: Pallet/Freight Shipping [CORE - WS3]

### Problem Statement

Currently, GelatoConnect handles only small package shipping (USPS, UPS Ground, FedEx Ground). Print shops often need to ship pallets, LTL, or full truckloads, especially for large commercial orders. Without freight support, shops must use external systems, creating fragmented order management and lost tracking visibility.

### Solution Overview

Add multi-carrier freight shipping support with manual carrier selection, rate lookup tables, and BOL (Bill of Lading) generation. Shipping clerks select shipment type (Small Package/Pallet/LTL/FTL), manually pick a carrier, enter weight/dimensions, and system calculates rates from admin-configured lookup tables. System auto-generates BOL PDFs and tracks shipments end-to-end.

> **Implementation Note:** GelatoConnect Logistics (GCL) already integrates with 80+ carriers for parcel shipping. This PRD extends GCL to support pallet, LTL, and FTL shipments. Check existing GCL shipping components, carrier integration infrastructure, and tracking systems in GelatoConnect. Reuse the carrier configuration, tracking notification, and shipment status patterns already in place.

### User Stories

**US 9.1: Shipping Clerk Selects Pallet Shipping on Order Completion**
- As a shipping clerk, I want to select a pallet shipment type on a completed order so that freight is shipped appropriately.
- Acceptance Criteria:
  - Order detail page has "Shipping" tab visible when order status = Completed
  - Shipping tab shows shipment type selector: Small Package, Pallet, LTL, FTL
  - Selecting "Pallet" shows carrier dropdown (pre-filtered to carriers supporting Pallet type)
  - Selecting a carrier reveals weight/dimensions fields (Weight lbs, Length, Width, Height)
  - System validates weight > 0 and dimensions > 0 before enabling rate calculation
  - Clicking "Calculate Rate" queries shipping rate lookup table
  - Rate displays with carrier name, service level, calculated cost
  - Clerk can override rate if necessary (with audit trail)

**US 9.2: System Calculates Freight Rate from Lookup Table**
- As the system, I want to calculate freight rates from admin-configured lookup tables so that rates are consistent and accurate.
- Acceptance Criteria:
  - Shipping rate lookup tables indexed by: Carrier + Shipment Type + Origin Zone + Destination Zone + Weight Range
  - Weight range examples: 1-100 lbs, 101-500 lbs, 501-1000 lbs, 1001-2000 lbs, 2001+ lbs
  - Zone system: Origin/Destination uses customer zip and fulfillment location zip to determine zone pair (Intra-Zone, Regional, National)
  - Rate = Base Rate + (Weight lbs × Per-lb Rate) + Fuel Surcharge %
  - System returns calculated rate and breakdown to display
  - If no matching rate found, system shows error and suggests contacting carrier for quote

**US 9.3: System Generates BOL PDF**
- As a shipping clerk, I want a BOL PDF auto-generated so that carriers have proper documentation.
- Acceptance Criteria:
  - After rate confirmation and tracking entry, "Generate BOL" button appears
  - BOL PDF includes: Order number, Customer name/address, Billing address, Shipment type, Carrier, Tracking number, Weight/Dimensions, Rate, Generated timestamp
  - BOL has space for carrier signature/proof of pickup
  - PDF is downloadable and emailed to shipping clerk
  - BOL is stored as attachment on order record

**US 9.4: Shipping Clerk Enters Tracking Number**
- As a shipping clerk, I want to enter a carrier-provided tracking number so that customer can track shipment.
- Acceptance Criteria:
  - Tracking number field accepts any alphanumeric string (varies by carrier format)
  - Field is labeled with carrier name in placeholder: "FedEx tracking #"
  - Upon entry, system validates format against carrier rules if available
  - Tracking number is saved to shipment record with timestamp
  - Tracking hyperlink generated if carrier has public tracking URL
  - Customer notification email triggered with tracking link and BOL attachment

**US 9.5: Admin Configures Shipping Rate Lookup Tables**
- As an admin/manager, I want to configure and maintain shipping rate lookup tables so that accurate rates are available.
- Acceptance Criteria:
  - Settings > Shipping > Rate Lookup Tables page
  - Table shows: Carrier, Shipment Type, Origin Zone, Dest Zone, Weight Range, Base Rate, Per-lb Rate, Fuel Surcharge %
  - Bulk import via CSV with validation
  - Add/Edit/Delete rate rows with confirmation
  - Version history: can revert to previous rate table versions
  - Effective date support: rates can be scheduled to take effect on future date
  - Audit log shows all changes with user and timestamp

### Detailed User Journeys

**Journey 1: Pallet Order Fulfillment (Shipping Clerk)**
1. Clerk logs into GelatoConnect MIS
2. Navigates to Orders list
3. Finds order with status = "Completed" (e.g., Order #ORD-2026-0142)
4. Clicks order to open detail page
5. Sees order summary: customer, items, total, dates
6. Clicks "Shipping" tab
7. System shows: "Shipment Type" dropdown (Small Package / Pallet / LTL / FTL)
8. Clerk selects "Pallet"
9. Form expands showing: Carrier dropdown, Weight field, Dimensions fields (L/W/H)
10. Clerk sees carriers for Pallet type: FedEx Freight, YRC, Old Dominion, XPO Logistics
11. Selects "FedEx Freight"
12. Enters Weight: 850 lbs, Length: 48", Width: 40", Height: 60"
13. Clicks "Calculate Rate"
14. System queries lookup table:
    - Carrier: FedEx Freight
    - Type: Pallet
    - Origin Zone: TX (fulfillment location)
    - Dest Zone: CA (customer location)
    - Weight: 850 → matches 501-1000 lbs range
    - Lookup returns: Base $125 + (850 × $0.35/lb) + 5% fuel = $322.25
15. Rate displays: "FedEx Freight Pallet: $322.25 (includes 5% fuel surcharge)"
16. Clerk accepts rate, form saves
17. Clerk enters Tracking number: "123456789012"
18. Clicks "Generate BOL"
19. System generates BOL PDF with all order/shipment details
20. PDF downloads to clerk's computer
21. Clerk prints BOL and attaches to pallet
22. System sends notification to customer with tracking link and BOL PDF
23. Shipment status updates to "Shipped" on order detail

**Journey 2: Admin Rate Table Maintenance (Manager)**
1. Manager logs in, navigates to Settings
2. Clicks "Shipping" section
3. Clicks "Rate Lookup Tables"
4. Sees existing rates in table format (20 rows per page)
5. Q2 fuel costs rising - needs to update fuel surcharge
6. Clicks "Bulk Edit" or opens CSV import
7. Uploads updated CSV with new fuel surcharges (all rates updated from 5% to 8%)
8. System validates all rows before import
9. Shows preview: "115 rate records to update, 0 new, 0 deleted"
10. Manager reviews sample rows, clicks "Confirm Import"
11. System applies changes with effective date "2026-03-20"
12. Audit log records: "Bulk import - fuel surcharge update, 115 records, User: Manager Name"
13. New estimates generated after 2026-03-20 use new rates

### Screen/View Descriptions

**Screen 9A: Order Detail - Shipping Tab (New)**

**Location:** /orders/[orderId] - Shipping Tab

**Layout:**
- Header: "Shipment Information" with breadcrumb
- Section 1: Order Summary (read-only, at top)
  - Order #, Customer, Status, Order Date, Completion Date
- Section 2: Shipment Details (form)
  - Shipment Type selector (dropdown): Small Package | Pallet | LTL | FTL
  - When Pallet/LTL/FTL selected, show:
    - Carrier dropdown (pre-filtered by type)
    - Weight (lbs) - text input
    - Dimensions section:
      - Length (inches)
      - Width (inches)
      - Height (inches)
    - "Calculate Rate" button (disabled until form complete)
  - Rate display area (shown after calculate):
    - Card with carrier name, service type, calculated cost
    - Breakdown: Base + Per-lb + Fuel Surcharge
    - "Override Rate" link (for manager override)
    - "Edit Dimensions/Carrier" link to recalculate
  - Tracking section:
    - Tracking # field (text input)
    - Carrier hyperlink if applicable
    - "Generate BOL" button (enabled after tracking entry)
    - "Download BOL" button (if already generated)
  - Shipment History (below):
    - Timeline: Created timestamp, Rate calculated timestamp, BOL generated timestamp, Tracking entered timestamp
    - Status: "Ready to Ship" → "BOL Generated" → "Tracking Entered" → "Shipped"

**Screen 9B: Shipping Rate Lookup Tables Admin (New)**

**Location:** /settings/shipping/rate-lookup

**Layout:**
- Header: "Shipping Rate Lookup Tables"
- Toolbar:
  - "Add New Rate" button
  - "Bulk Import (CSV)" button
  - "Download Template" link
  - Filter section: Carrier dropdown, Shipment Type checkbox group, Zone pair search
- Table (scrollable):
  - Columns: Carrier | Shipment Type | Origin Zone | Dest Zone | Weight Range | Base Rate | Per-lb Rate | Fuel Surcharge % | Effective Date | Actions
  - Rows sortable by any column
  - Edit/Delete icons on each row
  - Search bar above table
  - Pagination: 50 rows per page
- Version History section (expandable):
  - List of previous rate table versions with date and user
  - "Restore to this version" button per version

**Screen 9C: BOL PDF Preview (Modal/New Page)**

**Layout:**
- Typical BOL form:
  - Header: Carrier logo placeholder, "BILL OF LADING", BOL #
  - Shipper section: Company name, address, phone
  - Consignee section: Customer name, full address
  - Billing section: Billing address (may differ from consignee)
  - Shipment details table: Item description, weight, dimensions, class
  - Totals: Total weight, total pieces
  - Charges: Freight charge, fuel surcharge, total
  - Special instructions/notes section
  - Signature block for carrier pickup
  - Footer: Generated timestamp, GelatoConnect logo

### Functional Requirements

| Requirement | Details | Priority |
|---|---|---|
| Shipment Type Support | Small Package, Pallet, LTL, FTL selectable per order | Must Have |
| Carrier Selection | Dropdown filtered by shipment type; admin-configurable carrier list | Must Have |
| Rate Lookup Logic | Query table by: Carrier + Type + Origin Zone + Dest Zone + Weight Range | Must Have |
| Rate Calculation | Base + (Weight × Per-lb) + Fuel Surcharge % | Must Have |
| Rate Override | Manager can override calculated rate with audit trail | Should Have |
| BOL Generation | PDF auto-generated with order/shipment/carrier data | Must Have |
| BOL Storage | Saved as attachment on order record, email delivery | Must Have |
| Tracking Entry | Free-form text field, carrier-specific validation optional | Must Have |
| Tracking Hyperlink | Auto-generate carrier URL if carrier has standard tracking URL format | Nice to Have |
| Customer Notification | Email with tracking # and BOL PDF when tracking entered | Must Have |
| Rate Table Import | CSV bulk import with validation and preview | Should Have |
| Rate Table Versioning | Revert capability, effective date scheduling | Nice to Have |
| Audit Logging | All rate changes logged with user/timestamp | Must Have |
| Zone Definition | Admin-configurable zip-based origin/destination zones | Must Have |

### Data Requirements

**Table: ShippingRateLookup**
- id (UUID)
- carrier (string, foreign key to Carrier table)
- shipment_type (enum: SMALL_PACKAGE, PALLET, LTL, FTL)
- origin_zone (string, e.g., "TX", "CA", "ZONE_1")
- destination_zone (string)
- weight_range_min (integer, lbs)
- weight_range_max (integer, lbs)
- base_rate (decimal, $)
- per_lb_rate (decimal, $/lb)
- fuel_surcharge_percent (decimal, %)
- effective_date (date)
- is_active (boolean)
- created_at (timestamp)
- updated_by (UUID, user)
- updated_at (timestamp)
- version (integer)

**Table: Shipment (new)**
- id (UUID)
- order_id (UUID, foreign key)
- shipment_type (enum)
- carrier_id (UUID, foreign key)
- weight_lbs (decimal)
- dimensions_length_in (decimal)
- dimensions_width_in (decimal)
- dimensions_height_in (decimal)
- rate_lookup_id (UUID, foreign key to ShippingRateLookup)
- calculated_rate (decimal, $)
- override_rate (decimal, $ nullable)
- override_reason (text nullable)
- override_by_user_id (UUID nullable)
- tracking_number (string)
- bol_pdf_url (string nullable)
- bol_generated_at (timestamp nullable)
- status (enum: PENDING, BOL_GENERATED, TRACKING_ENTERED, SHIPPED)
- created_at (timestamp)
- updated_at (timestamp)

**Table: CarrierConfig**
- id (UUID)
- name (string, e.g., "FedEx Freight")
- supported_types (array of enum)
- tracking_url_pattern (string, e.g., "https://tracking.fedex.com?trackingnumber={tracking}")
- jdf_capable (boolean)
- is_active (boolean)

**Table: ShippingZone**
- id (UUID)
- zone_code (string, e.g., "TX", "ZONE_1")
- zip_codes (array of string ranges, e.g., ["75000-75999", "77000-77999"])
- region_name (string nullable)
- created_at (timestamp)

### Edge Cases

1. **No matching rate in lookup table:** System shows error message with suggestion to contact carrier for custom quote. Clerk can proceed by manually entering rate with override.
2. **Partial weight matches:** System matches to lowest applicable weight range that contains actual weight.
3. **Zone ambiguity (cross-zone):** If destination zip falls on zone boundary, use most restrictive (higher) zone.
4. **Rate changes mid-shipment:** Rate changes only affect new orders; existing shipments locked to rate at time of calculation.
5. **International shipping:** Not in scope for Phase 1. Mark as unsupported in UI.
6. **Oversized dimensions:** If dimensions exceed carrier max, system shows warning but allows override.
7. **Tracking number format validation:** If carrier config specifies format (e.g., regex), validate on entry; if invalid, warn but allow.
8. **Multiple shipments per order:** Support multi-address orders with separate shipments (see PRD 10).
9. **BOL PDF generation failure:** Show error to user, provide retry button. Save error log for support.
10. **Rate lookup timeout:** If database slow, show timeout message and allow manual entry.

### State Machine: Shipment Status

```
PENDING (order completed, no shipment type selected)
  ├─> RATE_CALCULATED (clerk selects carrier and gets rate)
  └─> [stays PENDING until clerk acts]

RATE_CALCULATED (rate confirmed)
  ├─> BOL_GENERATED (BOL PDF created)
  └─> RATE_CALCULATED (clerk recalculates with different carrier/dims)

BOL_GENERATED (BOL ready)
  ├─> TRACKING_ENTERED (tracking number added)
  └─> BOL_GENERATED (BOL regenerated)

TRACKING_ENTERED (tracking number confirmed)
  ├─> SHIPPED (shipment dispatched, customer notified)
  └─> TRACKING_ENTERED (tracking number updated)

SHIPPED (in transit)
  ├─> DELIVERED (carrier confirms delivery)
  └─> SHIPPED (remains until carrier update)

DELIVERED (terminal state)
  └─> [no transitions]
```

### Integration Points

- **Customer notification system:** Email triggered when tracking entered (uses existing email service)
- **PDF generation library:** BOL PDF created using same library as invoices (Puppeteer/wkhtmltopdf)
- **Order status system:** Shipment status updates trigger order status transitions
- **Multi-address orders (PRD 10):** Each address/shipment can have independent freight shipping
- **Inventory allocation (PRD 11):** No direct dependency, but shipping quantity should match allocated quantity
- **ERP integration (PRD 14):** Shipping cost synced to QuickBooks invoice

---

## PRD 10: Multi-address Orders [CORE - WS3]

### Problem Statement

Some orders need to be delivered to multiple locations (e.g., retail chain with 5 stores, packaging components to 3 different assembly facilities). Currently, GelatoConnect treats orders as single-destination, forcing shops to create multiple orders or manually track splits. This creates billing confusion (one invoice vs. multiple), tracking fragmentation, and extra operational overhead.

### Solution Overview

Allow single orders to have multiple delivery addresses. Each address is a line item on the order with independent quantity, shipping details, and tracking. System treats each address as a separate shipment but maintains unified invoice and order tracking. Billing reflects per-address shipping costs.

### User Stories

**US 10.1: Estimator Creates Multi-address Order**
- As an estimator, I want to add multiple delivery addresses to a single order so that a large customer with multiple locations can be served efficiently.
- Acceptance Criteria:
  - Estimate detail page has "Delivery Addresses" section
  - "Add Address" button allows adding unlimited addresses
  - Each address shows: Company/Attention name, Street, City, State, Zip, Phone, Delivery instructions
  - Quantity allocation field per address
  - Quantities must sum to order total (validation shows running total vs. order qty)
  - All addresses show in summary before estimate conversion
  - Convert to order button processes multi-address setup
  - Address list is editable until order ships

**US 10.2: Each Address Generates Separate Shipment Record**
- As the system, I want to create independent shipment records per address so that each delivery can be tracked separately.
- Acceptance Criteria:
  - Order conversion creates one Shipment record per address
  - Each shipment has independent: shipment_id, order_id, delivery_address, quantity, status
  - Shipment status independent: one address can be "Shipped" while another is "Pending"
  - Shipment detail view shows only that address's items, not other addresses
  - Tracking number per shipment, not per order

**US 10.3: Shipping Clerk Processes Shipments Independently**
- As a shipping clerk, I want to process each address shipment separately so that I can ship different addresses at different times.
- Acceptance Criteria:
  - Order detail page shows "Shipments" tab with list of addresses
  - Each shipment in list shows: Address, Qty, Status, Tracking, Action buttons
  - Clerk clicks shipment to open shipment detail view
  - Shipment detail has same shipping form as single-address (shipment type, carrier, rate, BOL, tracking)
  - Clerk can mark shipment as "Ready to Ship" independently of others
  - Partial order completion: some shipments shipped, others pending is valid state
  - Warehouse staff can see shipment pick list organized by address

**US 10.4: Customer Sees Per-address Tracking**
- As a customer, I want to track each delivery separately so that I know when each location receives its items.
- Acceptance Criteria:
  - Customer portal / order tracking page shows each address separately
  - Each address displays: delivery location, quantity, status, tracking # with carrier link
  - Status timeline per address: ordered → processing → shipped → delivered
  - Email notifications per address: "Part 1 of 3 shipped" with tracking link
  - Delivery confirmation per address with proof-of-delivery details

**US 10.5: Invoice Reflects Per-address Shipping Costs**
- As a bookkeeper, I want invoices to show per-address shipping costs so that billing is transparent.
- Acceptance Criteria:
  - Invoice line items section shows: Product description, qty, unit price, line total
  - Below line items, shipping section shows:
    - Address 1: Qty, Shipping method, Cost
    - Address 2: Qty, Shipping method, Cost
    - Address 3: Qty, Shipping method, Cost
    - Total Shipping: sum of all addresses
  - Invoice total = product subtotal + sum of all shipping + tax
  - If address cancelled, its shipping cost removed from invoice
  - Credit memo for partial return shows which address(es) affected

### Detailed User Journeys

**Journey 1: Multi-address Order Creation and Shipping (Estimator → Shipping Clerk)**

1. **Estimator receives request:** Customer XYZ Corp wants 10,000 units delivered to 3 locations: NYC store, Boston store, Hartford warehouse
2. Estimator creates estimate in GelatoConnect
3. Estimate detail page, Delivery section:
   - Default single address filled in (customer's primary address)
   - Clicks "Add Additional Address"
4. Form opens for Address #2:
   - Company: XYZ Corp - Boston Store
   - Address: 456 Boylston St, Boston, MA 02116
   - Instructions: Attention: Store Manager, Unload at loading dock
   - Qty: 3,500 units (out of 10,000)
   - Saves address
5. Clicks "Add Additional Address" again for Address #3:
   - Company: XYZ Corp - Hartford Warehouse
   - Address: 789 Oak Hill Blvd, Hartford, CT 06101
   - Instructions: Attention: Warehouse Supervisor, Bill of lading required
   - Qty: 3,000 units
   - Saves address
6. Estimate summary shows:
   - Address 1 (Primary): NYC location, 3,500 units
   - Address 2: Boston location, 3,500 units
   - Address 3: Hartford, 3,000 units
   - Total: 10,000 units ✓
7. Estimator reviews estimate, clicks "Convert to Order"
8. System creates Order with 3 Shipment records (one per address)
9. Order detail page shows "Shipments" tab with 3 rows:
   - Shipment 1: NYC, 3,500 units, Status: Pending Production
   - Shipment 2: Boston, 3,500 units, Status: Pending Production
   - Shipment 3: Hartford, 3,000 units, Status: Pending Production

**Journey 2: Warehouse/Shipping Clerk Processes Shipments**

1. Shipping clerk views Orders list, filters for "Ready to Ship"
2. Sees Order #ORD-2026-0200 (XYZ Corp, Multi-address)
3. Clicks order to open detail
4. Clicks "Shipments" tab, sees 3 rows with "Ready to Ship" status
5. **Ships Address 1 (NYC) first:**
   - Clicks shipment row for NYC
   - Shipment detail opens: 3,500 units, Address 1 only
   - Shipping section: Selects "Small Package" → carrier UPS → 5 boxes → calculates rate $250
   - Enters tracking #: 1Z999AA10123456784
   - Clicks "Generate BOL"
   - System creates BOL for NYC shipment only (not other addresses)
   - Marks shipment status "Shipped"
   - Customer receives email: "Part 1 of 3 shipped: XYZ Corp NYC, Tracking..."
6. **Ships Address 2 (Boston) 2 days later:**
   - Clerk navigates back to order
   - Shipment 2 (Boston) still shows "Ready to Ship"
   - Clicks Boston shipment
   - Selects "Small Package" → UPS → 5 boxes → $250
   - Enters tracking #: 1Z999AA10234567891
   - Marks "Shipped"
   - Customer email: "Part 2 of 3 shipped: XYZ Corp Boston..."
7. **Ships Address 3 (Hartford) 1 week later:**
   - Clerk clicks Hartford shipment
   - Selects "Pallet" (larger quantity) → FedEx Freight → 1 pallet → $325
   - Enters tracking #: 987654321012
   - Marks "Shipped"
   - Customer email: "Part 3 of 3 shipped: XYZ Corp Hartford..."
8. Order status cascades to "Shipped" when last shipment completes
9. Invoice auto-generated shows:
   - Product line: 10,000 units @ $X = $Y
   - Shipping section:
     - Address 1 (NYC): Small Package, $250
     - Address 2 (Boston): Small Package, $250
     - Address 3 (Hartford): Pallet, $325
     - Total Shipping: $825
   - Invoice Total: $Y + $825 + Tax

### Screen/View Descriptions

**Screen 10A: Estimate Detail - Delivery Addresses Section (Modified)**

**Location:** /estimates/[estimateId]

**Layout - Delivery Addresses Section:**
- Header: "Delivery Addresses" (if multi-address, shows count: "3 Addresses")
- For each address, display card with:
  - Address label: "Primary Location" or "Address 2", "Address 3", etc.
  - Company/Attention name
  - Full address (street, city, state, zip)
  - Phone number
  - Delivery instructions (if provided)
  - Quantity field: # of units for this address
  - Running total: "3,500 / 10,000 units" (shows allocation progress)
  - Edit/Delete buttons
  - "Add Another Address" button at bottom
- Below addresses: Quantity validation message:
  - ✓ "All 10,000 units allocated" (green, if sum = order qty)
  - ⚠ "Only 7,000 / 10,000 units allocated" (orange, if incomplete)
  - ✗ "12,000 units allocated - exceeds order quantity by 2,000" (red, if overage)

**Screen 10B: Order Detail - Shipments Tab (New)**

**Location:** /orders/[orderId]/shipments

**Layout:**
- Header: "Shipments (3)" or "Shipment"
- Filter/sort toolbar (optional): Status filter, sort by address
- Shipments list:
  - Table with columns: Address | Qty | Status | Carrier/Tracking | Actions
  - Rows:
    - **Address 1 (NYC)** | 3,500 | Shipped | UPS 1Z999AA10123456784 | [View/Edit]
    - **Address 2 (Boston)** | 3,500 | Shipped | UPS 1Z999AA10234567891 | [View/Edit]
    - **Address 3 (Hartford)** | 3,000 | Ready to Ship | — | [Process]
  - Each row clickable to open shipment detail
- Shipment status summary bar: "1 Pending | 1 Ready to Ship | 1 Shipped"

**Screen 10C: Shipment Detail (New Page)**

**Location:** /orders/[orderId]/shipments/[shipmentId]

**Layout:**
- Header: Breadcrumb: Orders > Order #ORD-2026-0200 > Shipments > Address 1
- Section 1: Shipment Summary (read-only)
  - Address heading: "XYZ Corp - NYC Store"
  - Full address, phone, delivery instructions
  - Quantity: 3,500 units of [product name]
  - Scheduled ship date
  - Current status: Shipped / Ready to Ship / Processing
- Section 2: Shipping Details (form, similar to Screen 9A)
  - Shipment type, carrier, weight/dimensions, rate calculation
  - BOL generation, tracking entry
  - Status indicator
- Section 3: Shipment History (timeline)
  - Status changes with timestamps and user
- Related items section: Links to other shipments in this order

**Screen 10D: Customer Portal - Order Tracking (Multi-address View) (Modified)**

**Location:** /customer-portal/orders/[orderId]

**Layout:**
- Order header: Order #, Customer, Order date
- Multi-address summary: "Delivering to 3 locations"
- Shipment cards (3 cards):
  - **Card 1: NYC Store**
    - Status: Delivered
    - Delivery date: March 15, 2026
    - Quantity: 3,500 units
    - Carrier/Tracking: UPS 1Z999AA10123456784 [Track with UPS]
    - Proof of delivery: Signed by John Smith, Photo of pallet
  - **Card 2: Boston Store**
    - Status: In Transit
    - Estimated delivery: March 17, 2026
    - Quantity: 3,500 units
    - Carrier/Tracking: UPS 1Z999AA10234567891 [Track with UPS]
  - **Card 3: Hartford Warehouse**
    - Status: Pending Shipment
    - Expected ship: March 18, 2026
    - Quantity: 3,000 units
    - Carrier/Tracking: [Will be assigned]
    - Special instructions: BOL required, Unload at dock

### Functional Requirements

| Requirement | Details | Priority |
|---|---|---|
| Multiple Delivery Addresses | Unlimited addresses per order | Must Have |
| Address Quantity Allocation | Per-address quantity with sum validation | Must Have |
| Address Validation | Name, address, phone required; delivery instructions optional | Must Have |
| Independent Shipments | Separate shipment record per address | Must Have |
| Independent Status | Each shipment tracks independently (one shipped ≠ all shipped) | Must Have |
| Per-address Tracking | Unique tracking # per shipment, customer sees all | Must Have |
| Per-address Notifications | Email per shipment: "Part X of Y shipped" | Must Have |
| Invoice Line Items | Per-address shipping costs itemized | Must Have |
| Partial Order Completion | Order can have some addresses shipped, others pending | Must Have |
| Address Editing Pre-ship | Can modify address until any shipment mark "Shipped" | Must Have |
| Pick List Generation | Warehouse pick list grouped by address | Nice to Have |
| Address Geocoding | Validate address validity (optional, depends on 3rd-party API) | Nice to Have |
| Delivery Confirmation | Per-address POD with signature/photo | Nice to Have |

### Data Requirements

**Table: OrderAddress (new)**
- id (UUID)
- order_id (UUID, foreign key)
- sequence (integer, 1, 2, 3...)
- is_primary (boolean, default false for primary address)
- company_name (string)
- attention_name (string nullable)
- street_address (string)
- city (string)
- state (string)
- zip_code (string)
- phone (string)
- delivery_instructions (text nullable)
- quantity (integer)
- created_at (timestamp)

**Table: Shipment (updated from PRD 9)**
- id (UUID)
- order_id (UUID, foreign key)
- order_address_id (UUID, foreign key)
- [all other fields from PRD 9]

**View: OrderSummary**
- Aggregates order totals: product_subtotal, total_shipping (sum of all shipments), tax, total
- Recalculates when any shipment shipping cost changes

### State Machine: Multi-Address Order Status

Each address-shipment within an order has independent status tracking:

```
ADDRESS_PENDING (address added, no production assignment)
  ├─> ADDRESS_IN_PRODUCTION (quantity allocated, production started)
  └─> ADDRESS_CANCELLED (address removed before production)

ADDRESS_IN_PRODUCTION (producing for this address)
  ├─> ADDRESS_READY_TO_SHIP (production complete for this address's quantity)
  └─> ADDRESS_IN_PRODUCTION (remains during production)

ADDRESS_READY_TO_SHIP (awaiting shipping)
  ├─> ADDRESS_SHIPPED (tracking entered, shipment dispatched)
  └─> ADDRESS_READY_TO_SHIP (remains until shipping clerk acts)

ADDRESS_SHIPPED (in transit)
  ├─> ADDRESS_DELIVERED (carrier confirms delivery)
  └─> ADDRESS_SHIPPED (remains in transit)
```

**Overall Order Status Derivation:**
- If ANY address is in production: Order status = "In Production"
- If ALL addresses are ready to ship: Order status = "Ready to Ship"
- If ANY address is shipped but not all: Order status = "Partially Shipped"
- If ALL addresses are delivered: Order status = "Delivered"
- Order status is always the least-advanced status among all addresses

### Edge Cases

1. **Address deletion after shipment:** If an address is marked shipped, prevent deletion; show warning "Cannot delete shipped address."
2. **Qty reallocation:** If user reduces qty at Address 1, system shows warning "This reduces Address 1 from 3,500 to 3,000 units. Unallocated: 500 units." Must reallocate before save.
3. **Qty exceeds order:** If sum exceeds order total, show error and prevent save.
4. **Same address multiple times:** Allow (e.g., 2 shipments to same store on different dates); system treats as distinct shipments.
5. **Order conversion with no addresses:** Prevent - at least primary address required.
6. **Partial order cancellation:** Cancel one shipment, others continue. Adjust invoice accordingly.
7. **Address update after shipping:** If address already shipped, prevent updates to avoid confusion.
8. **Multi-address with different carriers:** Each address can use different carrier/method; supported.
9. **Multi-address invoice totals:** Invoice must accurately sum all shipping costs; test thoroughly.
10. **Bulk operations:** If importing orders via API, support multi-address structure.

### Integration Points

- **Estimate to Order conversion (PRD 2):** Multi-address support required
- **Pallet/Freight shipping (PRD 9):** Each address can be independently Pallet, LTL, etc.
- **Inventory allocation (PRD 11):** Total allocation = sum of all address quantities
- **Invoicing (PRD 12):** Per-address shipping costs included in invoice line items
- **Customer CRM (PRD 13):** Primary address reflects customer's account address; secondary addresses stored on order
- **Production job tickets:** If product uses multi-address orders, job ticket may show all addresses or per-address jobs (depends on workflow)

---

## PRD 11: Inventory Allocation [CORE - WS3]

### Problem Statement

Print shops manage raw materials (substrates, inks, papers, components). Without allocation tracking, there's no visibility into what's reserved for pending orders vs. available for new orders. Shops frequently overbill or promise materials they don't have, leading to emergency supplier POs and customer delays. Allocation must be automatic on order conversion and released on cancellation.

### Solution Overview

Track inventory with three states per material: On-Hand (physical), Allocated (reserved for orders), Available (On-Hand minus Allocated). Auto-allocate on order conversion, release on cancellation. Dashboard shows low-stock alerts. Insufficient allocation shows warning (not blocking) and suggests GC Procurement PO creation.

> **Implementation Note:** GelatoConnect Procurement (GCP) already has inventory management with on-hand tracking and automated replenishment capabilities. This PRD extends GCP to support allocation-based inventory management tied to MIS order estimates. Check existing GCP inventory data structures, supplier PO workflows, and stock-level alerts in the GelatoConnect codebase. Integrate the allocation system to work seamlessly with GCP rather than duplicating inventory tables.

### User Stories

**US 11.1: System Auto-allocates Inventory on Order Conversion**
- As the system, I want to allocate materials when an estimate converts to an order so that materials are reserved.
- Acceptance Criteria:
  - Order conversion triggers inventory allocation check
  - For each order line item: quantity × BOM_requirement = required material quantity
  - Allocate required quantity from On-Hand inventory
  - Create allocation record: material_id, order_id, quantity_allocated, timestamp
  - Allocation recorded in audit log
  - Order shows allocation status in order detail view

**US 11.2: Insufficient Stock Shows Warning (Non-blocking)**
- As an estimator/order creator, I want to see a warning if there's insufficient stock so that I can take action without being blocked.
- Acceptance Criteria:
  - During order conversion, system calculates required materials
  - If Required > Available, show warning banner: "⚠ Insufficient Inventory: Substrate A (Need 500, Have 200 available)"
  - Warning lists all insufficient materials
  - "Create Supplier PO" button launches GC Procurement module with pre-filled material and qty
  - Despite warning, order conversion continues (non-blocking)
  - Order is marked with "Inventory Warning" flag
  - Procurement can immediately create PO to cover shortage

**US 11.3: Low Stock Alert Dashboard Widget**
- As a production manager, I want to see low-stock alerts on the dashboard so that I can trigger replenishment before stockouts occur.
- Acceptance Criteria:
  - Dashboard widget: "Low Stock Alerts"
  - Shows materials below reorder point (admin-configured threshold)
  - Card displays: Material name, Current inventory, Reorder point, Days until stockout (estimated)
  - Red if current < reorder point
  - Yellow if current < 1.5× reorder point
  - Link to GC Procurement to create PO
  - Email alert sent to inventory manager daily if any materials below threshold

**US 11.4: Inventory Allocation Released on Order Cancellation**
- As the system, I want to release allocated materials when an order is cancelled so that inventory becomes available again.
- Acceptance Criteria:
  - Order cancellation (status: Completed → Cancelled) triggers release
  - All allocation records for cancelled order deleted/marked released
  - On-Hand inventory unchanged; Allocated decreases; Available increases
  - Release recorded in audit log with reason "Order Cancelled"
  - Inventory detail view shows historical allocations (including released)

**US 11.5: Inventory Overview Dashboard**
- As an inventory manager, I want to see all materials with stock levels so that I can plan replenishment.
- Acceptance Criteria:
  - Inventory > Materials list view
  - Columns: Material name, On-Hand, Allocated, Available, Reorder Point, Status
  - Sort by: Name, On-Hand, Allocated, Available
  - Filter by: Status (In Stock, Low Stock, Critical, Out of Stock), Category
  - Search by material name or SKU
  - Click material to open detail page
  - Bulk actions: Update reorder points, export list

**US 11.6: Material Allocation History**
- As an inventory manager, I want to see which orders are holding allocated materials so that I can understand reservations.
- Acceptance Criteria:
  - Material detail page, "Allocation History" tab
  - Table: Order #, Customer, Qty Allocated, Order Date, Expected Ship, Status
  - Click order # to navigate to order detail
  - Filter by: Active (still allocated), Released (cancelled), Consumed (shipped)
  - Timeline view (optional): shows when allocation occurs relative to ship date

### Detailed User Journeys

**Journey 1: Order Conversion with Insufficient Inventory (Estimator)**

1. Estimator has estimate for 5,000 posters on Matte Paper
2. Current inventory: Matte Paper 3,000 sheets
3. Clicks "Convert to Order"
4. System calculates: 5,000 sheets required (1:1 requirement)
5. Available = 3,000 on-hand - 0 allocated = 3,000
6. Required = 5,000 > Available = 3,000
7. Warning banner appears:
   - "⚠ Insufficient Inventory"
   - "Material: Matte Paper (Standard 80lb)"
   - "Required: 5,000 | Available: 3,000 | Shortage: 2,000"
   - Buttons: [Create Supplier PO] [Continue Anyway]
8. Estimator clicks "Create Supplier PO"
9. System navigates to GC Procurement module (iframe or new tab)
10. Pre-filled PO form:
    - Material: Matte Paper (Standard 80lb)
    - Quantity: 2,000 (shortage amount, can edit)
    - Suggested supplier: [Most recent supplier for this material]
11. Procurement enters supplier contact, lead time, cost
12. Creates PO and returns to order creation
13. Estimator clicks "Convert to Order" again
14. Order created with flag "Pending Inventory"
15. Order detail shows:
    - Allocation status: Partial (3,000 / 5,000 allocated)
    - Pending PO: [Link to PO #PO-2026-0500]
    - Expected completion: [PO lead time]
    - Production can start with 3,000 units; pause when allocation reaches critical threshold
16. When PO arrives and receives, inventory updated to 5,000
17. Remaining allocation (2,000) automatically completed
18. Order allocation status: Complete

**Journey 2: Inventory Manager Reviews Low Stock and Allocations (Manager)**

1. Manager logs in, sees dashboard
2. "Low Stock Alerts" widget shows:
   - 🔴 Glossy Paper 8.5x11: 500 sheets (Reorder: 2,000) - CRITICAL
   - 🟡 Kraft Cardboard: 4,000 sheets (Reorder: 3,000) - LOW
3. Clicks "🔴 Glossy Paper 8.5x11" to open material detail
4. Material detail page:
   - Name: Glossy Paper 8.5x11
   - SKU: GP-8511-20LB
   - Category: Paper - Uncoated
   - On-Hand: 500 sheets
   - Allocated: 1,200 sheets (2 active orders)
   - Available: -700 sheets ⚠
   - Reorder Point: 2,000 sheets
   - Status: ⚠ INSUFFICIENT
5. "Allocation History" tab shows:
   - Order #ORD-2026-0298: 600 sheets, allocated March 10, expected ship March 15
   - Order #ORD-2026-0310: 600 sheets, allocated March 12, expected ship March 18
6. Manager clicks "Create Supplier PO"
7. Pre-filled: Material, Qty 2,000 (reorder point)
8. Selects supplier: "Premium Paper Co"
9. Quantity bumped to 3,000 for buffer
10. Lead time: 5 days
11. Creates PO
12. System sends low stock notification to procurement team: "PO created for Glossy Paper - arrives by March 24"
13. Daily email alerts continue until inventory ≥ Reorder Point

**Journey 3: Production Manager Views Low Stock on Dashboard (Manager)**

1. Production manager logs in
2. Dashboard, "Low Stock Alerts" widget:
   - Shows 3 alerts in red/yellow
   - "Substrate A: 200 / 1,000 (Est. 2 days supply)"
3. Clicks "See All Alerts" to go to Inventory list filtered to low-stock
4. Inventory list page shows materials sorted by criticality:
   - Substrate A, On-Hand: 200, Reorder: 1,000, Status: CRITICAL
   - Coating A, On-Hand: 3,000, Reorder: 2,500, Status: LOW
   - Paper B, On-Hand: 5,000, Reorder: 3,000, Status: OK
5. For Substrate A, production manager clicks "Create PO" button
6. Navigates to GC Procurement (or sees inline PO form)
7. Creates PO for 5,000 units of Substrate A
8. PO sent to supplier with note "URGENT - Low stock"
9. Production manager marks Substrate A as "On Order" to notify production scheduling

### Screen/View Descriptions

**Screen 11A: Inventory Materials List (New)**

**Location:** /inventory/materials

**Layout:**
- Header: "Inventory Materials"
- Toolbar:
  - Search bar: Search by name, SKU, category
  - Filter dropdown: Status (All, In Stock, Low Stock, Critical, Out of Stock)
  - Category filter: [Checkboxes or multi-select]
  - Sort dropdown: Name, On-Hand Qty, Allocated Qty, Available Qty, Status
  - "Import" button (CSV)
  - "Export" button (CSV)
- Table (sortable, filterable):
  - Columns:
    - Material Name | SKU | Category | On-Hand | Allocated | Available | Reorder Pt | Status | Actions
  - Sample rows:
    - Matte Paper 80lb | MP-80-LG | Paper | 5,000 | 3,000 | 2,000 | 2,000 | ✓ OK | [View] [Edit] [Create PO]
    - Glossy Paper 8.5x11 | GP-8511 | Paper | 500 | 1,200 | -700 | 2,000 | ⚠ INSUFFICIENT | [View] [Create PO]
    - Kraft Cardboard | KC-ROLL | Cardboard | 4,000 | 2,000 | 2,000 | 3,000 | 🟡 LOW | [View]
- Pagination: 50 items per page
- Bulk actions (select multiple): "Update Reorder Points", "Export"

**Screen 11B: Material Detail with Allocation History (New)**

**Location:** /inventory/materials/[materialId]

**Layout:**
- Header: Material name (e.g., "Matte Paper 80lb")
- Section 1: Material Summary (read-only)
  - SKU, UPC, Category
  - Description/notes
  - Supplier information (primary supplier)
  - Unit of measure (sheets, rolls, lbs, etc.)
  - Reorder point, lead time
- Section 2: Inventory Levels
  - Card layout (visual):
    - On-Hand: 5,000 sheets (green)
    - Allocated: 3,000 sheets (orange)
    - Available: 2,000 sheets (blue)
    - Reorder Point: 2,000 sheets (gray)
  - Status badge: ✓ OK
  - Chart: Inventory trend over last 30 days (line chart)
- Section 3: Tabs
  - **Allocation History Tab:**
    - Table: Order # | Customer | Qty Allocated | Order Date | Expected Ship | Status
    - Filter buttons: All | Active | Released | Consumed
    - Sample rows:
      - ORD-2026-0298 | Acme Corp | 600 | 2026-03-10 | 2026-03-15 | Allocated
      - ORD-2026-0310 | Acme Corp | 600 | 2026-03-12 | 2026-03-18 | Allocated
    - Click order # to navigate to order detail
  - **Stock Adjustments Tab:**
    - Table: Date | Type | Qty | Reason | Adjustment By | Notes
    - Types: Received, Damaged, Counted, Other
  - **Settings Tab:**
    - Edit reorder point, lead time, preferred supplier
    - "Update Reorder Point" button if low stock

**Screen 11C: Order Conversion - Insufficient Inventory Warning (Modal)**

**Location:** Appears during order conversion if inventory insufficient

**Layout:**
- Modal title: "⚠ Inventory Alert"
- Warning message: "Insufficient stock for one or more materials. Review below:"
- Table of insufficient materials:
  - Material | Required | On-Hand | Allocated | Available | Shortage
  - Matte Paper 80lb | 5,000 | 3,000 | 2,000 | 1,000 | 4,000 ⚠
- Buttons:
  - [Create Supplier PO] → Launches GC Procurement pre-filled
  - [Continue Anyway] → Proceeds with partial allocation
  - [Cancel] → Cancels order conversion

**Screen 11D: Dashboard Widget - Low Stock Alerts (New)**

**Location:** Dashboard (home page) - small card widget

**Layout:**
- Widget Title: "Low Stock Alerts"
- If no alerts: "✓ All inventory in stock"
- If alerts:
  - Alert count badge (red): "3 Alerts"
  - List (up to 3):
    - 🔴 Glossy Paper 8.5x11: 500 / 2,000 (Est. 1 day)
    - 🟡 Kraft Cardboard: 4,000 / 3,000
    - 🟡 Coating A: 5,000 / 4,000
  - [View All] link to inventory list filtered to low stock
  - [Create PO] button (for first alert or first critical alert)

### Functional Requirements

| Requirement | Details | Priority |
|---|---|---|
| Auto-allocation on Order Conversion | Calculate material requirements and allocate from on-hand | Must Have |
| Allocation Non-blocking | Warning shown if insufficient; order proceeds anyway | Must Have |
| Allocation Release | Release allocation when order cancelled | Must Have |
| Allocation Audit Log | Track all allocations with timestamp and user | Must Have |
| Inventory Levels | On-Hand, Allocated, Available columns on list | Must Have |
| Low Stock Alert Widget | Dashboard widget showing critical/low stock | Must Have |
| Reorder Point Config | Admin/manager can set reorder threshold per material | Must Have |
| Allocation History | View which orders holding material; release timeline | Must Have |
| GC Procurement Integration | "Create PO" button passes to GC Procurement with pre-filled data | Must Have |
| Email Alerts | Low stock email daily to inventory manager | Should Have |
| Inventory Trend Chart | Visual 30-day trend for material | Nice to Have |
| Bulk Operations | Import/export materials, bulk update reorder points | Nice to Have |
| Material Search | Search by name, SKU, category | Must Have |
| Safety Stock Calculation | Optional: auto-calculate reorder point based on lead time and usage | Nice to Have |

### Data Requirements

**Table: Material (new)**
- id (UUID)
- name (string, e.g., "Matte Paper 80lb")
- sku (string, unique)
- upc (string nullable)
- category_id (UUID, foreign key to MaterialCategory)
- unit_of_measure (enum: SHEETS, ROLLS, LBS, UNITS, etc.)
- description (text nullable)
- supplier_id (UUID, nullable, foreign key to Supplier)
- reorder_point (integer)
- lead_time_days (integer)
- is_active (boolean)
- created_at (timestamp)
- updated_at (timestamp)

**Table: Inventory (new)**
- id (UUID)
- material_id (UUID, foreign key, unique)
- on_hand_quantity (integer)
- allocated_quantity (integer, calculated)
- available_quantity (integer, calculated as on_hand - allocated)
- last_counted_at (timestamp nullable)
- updated_at (timestamp)

**Table: MaterialAllocation (new)**
- id (UUID)
- order_id (UUID, foreign key)
- material_id (UUID, foreign key)
- quantity_required (integer)
- quantity_allocated (integer)
- status (enum: ACTIVE, RELEASED, CONSUMED)
- created_at (timestamp)
- released_at (timestamp nullable)
- consumed_at (timestamp nullable)

**Table: InventoryAuditLog (new)**
- id (UUID)
- material_id (UUID, foreign key)
- event_type (enum: ALLOCATED, RELEASED, CONSUMED, RECEIVED, ADJUSTED, COUNTED)
- quantity_change (integer, can be negative)
- previous_quantity (integer)
- new_quantity (integer)
- related_order_id (UUID nullable)
- related_po_id (UUID nullable)
- reason (text nullable)
- user_id (UUID)
- created_at (timestamp)

**Table: MaterialCategory (new)**
- id (UUID)
- name (string, e.g., "Paper", "Ink", "Cardboard")
- description (text nullable)

### State Machine: Inventory Allocation Status

```
UNALLOCATED (estimate exists, not yet converted to order)
  ├─> ALLOCATED (estimate converted to order, inventory reserved)
  └─> UNALLOCATED (remains until conversion)

ALLOCATED (inventory reserved for this order)
  ├─> CONSUMED (production completed, materials used)
  ├─> PARTIALLY_CONSUMED (some materials used, some remaining)
  ├─> RELEASED (order cancelled, inventory returned to pool)
  └─> ALLOCATED (remains during production)

PARTIALLY_CONSUMED (production in progress)
  ├─> CONSUMED (all materials used)
  └─> PARTIALLY_CONSUMED (production continues)

CONSUMED (terminal state for successful orders)
  └─> [no transitions]

RELEASED (terminal state for cancelled orders)
  └─> [no transitions]
```

**Replenishment Trigger Logic:**
- When allocation reduces available stock below reorder_point: trigger replenishment alert
- When estimate is confirmed (before order conversion): system can optionally pre-reserve stock (configurable)
- When order is cancelled: allocated stock returned to available pool immediately

### Edge Cases

1. **Partial allocation:** Material only partially available; allocate what's possible, flag remaining as "Pending". Production scheduled after pending arrival.
2. **Material deleted with active allocation:** Prevent deletion. Show message "Cannot delete material with active allocations."
3. **Stock receiving during order processing:** If stock arrives while order is processing, available qty updates; no re-calculation needed unless order still pending production.
4. **Multiple estimates of same product:** If two estimates convert to orders for same material, allocation happens independently per order.
5. **BOM changes after allocation:** If estimate BOM modified and order not yet created, allocation recalculated. If after creation, order locks to original BOM.
6. **Inventory adjustment (physical count):** Discrepancy between system and physical count; manager creates adjustment record.
7. **Zero-inventory order:** If on-hand is 0 and order requires material, system shows critical warning and blocks production until stock arrives.
8. **Material merge/consolidation:** Two materials consolidated into one; allocations combined.
9. **Negative available inventory:** Possible if order created, then stock adjusted down. Flag in UI, prioritize PO.
10. **Inventory split/repack:** Material received in 1,000-unit rolls; split into 100-unit rolls. Inventory tracking doesn't split by default; requires manual handling in UI.

### Integration Points

- **Order creation (PRD 2):** Order conversion triggers allocation
- **Order cancellation:** Cancellation triggers allocation release
- **Multi-address orders (PRD 10):** Total allocation = sum of all address quantities
- **GC Procurement module:** "Create PO" button links to Procurement with pre-filled material/qty
- **Production job tickets:** Job ticket shows allocated status; production can start when status = "Ready"
- **BOM/Product configuration:** Material requirements defined in product/estimate BOM
- **Reporting (Phase 2):** Inventory dashboards, low-stock trend analysis

---

## PRD 12: Invoicing [CORE - WS4]

### Problem Statement

Currently, invoices are manually created or exported from estimates. There's no streamlined workflow for generating, reviewing, sending, and tracking invoice payments. Invoices can't be customized (branding, terms). Payment recording is manual. No visibility into outstanding/overdue invoices.

### Solution Overview

Auto-generate invoices from shipped orders with line items from estimate + custom costs + per-address shipping. Invoices editable in Draft status. Bookkeeper sends via email with PDF. Payment recording tracks partial payments and calculates balance. Invoice status lifecycle: Draft → Sent → Partially Paid → Paid / Overdue. Customizable PDF template.

> **Implementation Note:** The invoicing system should integrate with GelatoConnect's existing order and finance infrastructure. For PDF generation, reuse the same library used for job ticket PDFs and BOL generation (consistent approach across the system). Email delivery should use the same notification infrastructure described in PRD 5. If integrating with ERP systems (PRD 14), ensure invoice data is structured for export compatibility from the start.

### User Stories

**US 12.1: System Auto-generates Invoice from Shipped Order**
- As the system, I want to create an invoice when an order ships so that billing is automated.
- Acceptance Criteria:
  - Order status change to "Shipped" triggers invoice generation
  - Invoice created in "Draft" status
  - Invoice line items: All estimate line items (product, qty, unit price, line total)
  - Shipping section: Per-address shipping costs (see PRD 10)
  - Subtotal = product line items total
  - Tax calculated on subtotal (using customer's tax rate or tax rules)
  - Total Shipping = sum of address shipping costs
  - Invoice Total = Subtotal + Tax + Shipping
  - Invoice number auto-generated: INV-[YYYY][MM][sequential]
  - Invoice date = ship date
  - Due date calculated: Invoice date + Payment terms (default 30 days)
  - Invoice detail page accessible to bookkeeper

**US 12.2: Bookkeeper Reviews and Edits Draft Invoice**
- As a bookkeeper, I want to review and edit a draft invoice before sending so that billing is accurate.
- Acceptance Criteria:
  - Invoice detail page shows all line items editable
  - Can add custom line items (e.g., setup fee, rush charge, credit memo adjustment)
  - Can edit line item amount if discount/adjustment needed
  - Can add memo/notes (e.g., "Rush charge $100 for expedited production")
  - Can change payment terms (Net 30, Net 45, Net 60, etc.)
  - Can change due date
  - Can apply discount percentage (e.g., 5% early payment discount)
  - Changes recalculate totals automatically
  - "Recalculate" button if manual edits needed
  - "Mark as Ready" button to move to "Ready to Send" (not sent until explicitly sent)

**US 12.3: Bookkeeper Sends Invoice via Email with PDF**
- As a bookkeeper, I want to send an invoice via email with PDF attachment so that customer can pay.
- Acceptance Criteria:
  - "Send" button on invoice detail (only visible in Draft/Ready status)
  - Modal appears: Email preview
    - To: Customer's billing contact email
    - CC: Optional, allow bookkeeper to add
    - Subject: "Invoice INV-[number] from [Company] - Payment due [due date]"
    - Body template: "Dear [Customer name], Please find attached invoice... Payment due by [due date]..."
    - Can customize subject/body before sending
  - PDF preview: Shows how invoice PDF will look
  - Click "Send" → email dispatched, invoice status → "Sent", timestamp recorded
  - Delivery failure logged (bounced email address, etc.)
  - Invoice marked "Sent" with send timestamp, email address, and user who sent

**US 12.4: Bookkeeper Records Payments**
- As a bookkeeper, I want to record customer payments against invoices so that outstanding balance is tracked.
- Acceptance Criteria:
  - "Record Payment" button on invoice detail
  - Modal: Payment details
    - Amount (default: full remaining balance)
    - Payment date (default: today)
    - Payment method: Check, Bank Transfer, Credit Card, Cash, Other
    - Reference/Check #: Optional
    - Notes: Optional
  - System calculates new balance: Total - Payment
  - If payment = balance, invoice status → "Paid"
  - If payment < balance, invoice status → "Partially Paid", shows balance due
  - Payment recorded in audit trail with timestamp
  - Receipt generated (optional: email to customer)
  - Payment shows on invoice detail: "Payment: $X on [date]"

**US 12.5: Overdue Invoices Highlighted**
- As a bookkeeper, I want to see overdue invoices highlighted so that I can follow up on collections.
- Acceptance Criteria:
  - Invoice list shows Status: Sent, Partially Paid, Paid, Overdue, Cancelled
  - Overdue status = Current date > Due date AND status ≠ Paid
  - Overdue invoices highlighted red in list and detail
  - Detail shows: "OVERDUE: [X] days past due"
  - "Send Reminder" button on overdue invoice (pre-filled reminder email)
  - Filter: "Show Overdue Only" in invoice list

**US 12.6: Manual Invoice Creation (Non-order)**
- As a bookkeeper, I want to create a manual invoice for non-order charges (consultation, design work, etc.) so that all revenue is invoiced.
- Acceptance Criteria:
  - "Create Manual Invoice" button on invoice list page
  - Form: Customer, Invoice date, Due date, Line items
  - Line items: Description, quantity, unit price
  - Calculate totals automatically
  - Save as Draft, then Send as normal invoice flow
  - Manual invoices marked with flag "Manual" in list

**US 12.7: Credit Memo for Returns/Adjustments**
- As a bookkeeper, I want to create credit memos for returns or adjustments so that credits are tracked.
- Acceptance Criteria:
  - "Create Credit Memo" button on invoice detail (or invoice list for past invoices)
  - Modal: Related invoice (auto-filled if from detail), Credit amount, Reason
  - Credit memo created as negative invoice
  - Credit memo # generated: CM-[YYYY][MM][sequential]
  - Credit memo sent to customer, applied to next invoice or outstanding balance
  - Audit trail links credit memo to original invoice

**US 12.8: Customizable Invoice PDF Template**
- As a company owner, I want to customize the invoice PDF (logo, colors, footer) so that invoices match branding.
- Acceptance Criteria:
  - Settings > Invoicing > PDF Template page
  - Upload company logo (PNG/JPG)
  - Color picker: Primary color, secondary color, accent color
  - Footer text: e.g., "Thank you for your business!", legal text, contact info
  - Custom fields: Company phone, website, tax ID
  - Preview: Shows sample invoice with customizations
  - "Save Template" button applies to all future invoices
  - Multiple templates: Ability to have different templates per company (if multi-company future)

### Detailed User Journeys

**Journey 1: Order Shipped → Invoice Generated → Sent → Payment Recorded (Bookkeeper)**

1. Shipping clerk marks Order #ORD-2026-0142 as "Shipped" (all shipments completed)
2. System auto-creates Invoice #INV-202603-0847
3. Invoice line items auto-populated:
   - 10,000 posters @ $0.15 = $1,500
   - Setup fee (from estimate) = $150
4. Shipping costs added per address:
   - Address 1 (NYC): Small Package $50
   - Address 2 (Boston): Small Package $50
5. Subtotal: $1,700
6. Tax (8%): $136
7. Total Shipping: $100
8. Invoice Total: $1,936
9. Due date: 30 days (April 15, 2026)
10. Invoice saved as Draft, status shown in invoice list
11. Bookkeeper reviews invoice detail page
12. Notices estimate had 5% early-payment discount that should apply
13. Clicks "Edit" (Draft mode allowed)
14. Adds line item: "Early Payment Discount 5%" = -$85
15. Recalculates: New Total $1,851
16. Clicks "Mark as Ready to Send"
17. Status updated to "Ready"
18. Later, bookkeeper clicks "Send"
19. Modal appears with email preview:
    - To: acmecorp@company.com (customer's billing email)
    - Subject: "Invoice INV-202603-0847 from GelatoConnect - Payment due April 15, 2026"
    - Body: "Dear Acme Corp, Please find attached your invoice..."
20. Bookkeeper clicks "Send"
21. Email dispatched, invoice status → "Sent", timestamp recorded
22. Customer receives email with PDF invoice attached
23. Customer pays $1,851 (full amount) via bank transfer on April 10
24. Bookkeeper receives payment notification (if connected to bank, or manual entry)
25. Clicks "Record Payment" on invoice detail
26. Modal: Amount $1,851, Date April 10, Method "Bank Transfer", Ref "Wire 12345"
27. Clicks "Record Payment"
28. Invoice status → "Paid", shows "Paid in full on April 10, 2026"
29. Payment appears in accounting summary

**Journey 2: Overdue Invoice Follow-up (Bookkeeper)**

1. Bookkeeper logs in, sees dashboard
2. Widget shows: "3 Overdue Invoices, $8,500 outstanding"
3. Clicks widget to view invoice list
4. List filtered to Status = "Overdue"
5. Sees 3 invoices:
   - INV-202603-0801 | Customer ABC | $2,000 | Due: Feb 28 | OVERDUE: 47 days
   - INV-202603-0820 | Customer XYZ | $3,500 | Due: Mar 10 | OVERDUE: 21 days
   - INV-202603-0845 | Customer DEF | $3,000 | Due: Mar 15 | OVERDUE: 16 days
6. Clicks first invoice (47 days overdue)
7. Detail page shows: Red banner "OVERDUE: 47 days"
8. Clicks "Send Reminder" button
9. Modal: Pre-filled reminder email
    - Subject: "Payment Reminder: Invoice INV-202603-0801 (47 days overdue)"
    - Body: "Dear ABC Corp, Our records show invoice ... is now 47 days overdue. Please arrange payment by [date]. If already paid, please disregard."
10. Bookkeeper customizes message: "Please contact us if you have questions about this invoice."
11. Clicks "Send Reminder"
12. Email sent, reminder timestamp recorded on invoice
13. Repeats for other overdue invoices
14. Customer DEF replies with explanation: "Payment processing, check in mail"
15. Bookkeeper adds note to invoice: "Customer: Check in mail, expected by [date]"
16. On expected date, payment received, bookkeeper records payment
17. Invoice status updated to "Paid"

**Journey 3: Credit Memo for Return (Bookkeeper)**

1. Customer returns 500 posters due to damage
2. Bookkeeper opens original invoice INV-202603-0847 (Paid, $1,851)
3. Clicks "Create Credit Memo"
4. Modal: Related invoice INV-202603-0847 (auto-filled)
5. Credit amount: 500 × $0.15 = $75 (calculated based on original line item)
6. Reason: "Return - Damaged in shipping"
7. Clicks "Create Credit Memo"
8. Credit memo CM-202603-0021 created
9. Amount: -$75 (negative invoice)
10. Status: Draft
11. Bookkeeper clicks "Send"
12. Email sent to customer with credit memo PDF
13. Credit memo status: "Sent"
14. Customer's account now shows: Outstanding balance $75 credit
15. At next purchase, credit applied automatically to new invoice

### Screen/View Descriptions

**Screen 12A: Invoice List (New)**

**Location:** /invoices

**Layout:**
- Header: "Invoices"
- Toolbar:
  - Search bar: Search by invoice #, customer, amount
  - Filter: Status (All, Draft, Ready, Sent, Partially Paid, Paid, Overdue, Cancelled)
  - Date range: From/To
  - Customer filter: Typeahead
  - Sort: By invoice #, date, due date, amount, status
  - "Create Manual Invoice" button
  - "Export" button (CSV)
- Table (sortable, filterable):
  - Columns: Invoice # | Customer | Amount | Status | Due Date | Days Overdue | Actions
  - Sample rows:
    - INV-202603-0847 | Acme Corp | $1,851 | Paid | Apr 15 | — | [View]
    - INV-202603-0820 | XYZ Ltd | $3,500 | Overdue | Mar 10 | 21 days ⚠ | [View] [Send Reminder]
    - INV-202603-0805 | DEF Inc | $2,000 | Partially Paid | Apr 5 | — | [View]
  - Status badges: Green (Paid), Orange (Partially Paid), Yellow (Sent), Red (Overdue), Gray (Draft)
- Pagination: 50 invoices per page
- Summary cards at top: Total revenue, outstanding balance, overdue amount

**Screen 12B: Invoice Detail (New/Modified)**

**Location:** /invoices/[invoiceId]

**Layout:**
- Header: "Invoice INV-202603-0847" | Status badge
- Breadcrumb: Invoices > INV-202603-0847
- If overdue: Red banner "OVERDUE: 21 days past due"
- Section 1: Invoice Summary (read-only, at top)
  - Customer: Acme Corp
  - Invoice date: Mar 15, 2026
  - Due date: Apr 15, 2026
  - Order # (if order-based): ORD-2026-0142
  - Status: Paid
- Section 2: Line Items (editable in Draft status)
  - Table: Description | Qty | Unit Price | Line Total | Actions
  - Rows:
    - 10,000 posters @ $0.15 = $1,500 | [Edit/Delete]
    - Setup fee = $150 | [Edit/Delete]
  - Subtotal: $1,650
  - "Add Line Item" button (Draft only)
  - Tax (8%): $136
  - Shipping per address:
    - Address 1 (NYC): $50
    - Address 2 (Boston): $50
  - Total Shipping: $100
  - **Total: $1,886**
  - If Partially Paid: Balance Due: $500 (red)
  - If Paid: "Paid in full on Apr 10, 2026" (green)
- Section 3: Buttons (layout depends on status)
  - If Draft: [Edit] [Mark as Ready] [Delete] [Discard Draft]
  - If Ready: [Edit] [Send] [Delete]
  - If Sent: [Send Again] [Record Payment] [Download PDF]
  - If Partially Paid: [Record Payment] [Create Credit Memo] [Send Reminder] [Download PDF]
  - If Overdue: [Send Reminder] [Record Payment] [Download PDF]
  - If Paid: [Create Credit Memo] [Download PDF]
- Section 4: Payment History (if any payments)
  - Table: Date | Amount | Method | Reference | User
  - Rows:
    - Apr 10, 2026 | $1,851 | Bank Transfer | Wire 12345 | Bookkeeper Name
- Section 5: Audit Trail (collapsible)
  - Created: Mar 15, 2026 by [system]
  - Sent: Mar 15, 2026, 2:30 PM by Bookkeeper Name
  - Payment recorded: Apr 10, 2026 by Bookkeeper Name

**Screen 12C: Invoice Detail - Edit Mode (Draft Status)**

**Location:** /invoices/[invoiceId]/edit

**Layout:**
- Same as Screen 12B, but line items are editable:
  - Each line item row: Description [text field], Qty [number], Unit Price [currency], Line Total [calculated]
  - [Edit] and [Delete] buttons per row
  - "Add Line Item" button at bottom of items table
  - Form to add custom line item:
    - Description: [text field]
    - Qty: [number, default 1]
    - Unit Price: [currency]
    - [Add] button
  - Payment Terms dropdown: Net 30, Net 45, Net 60, Custom
  - Due date: [date picker, auto-calculated based on terms]
  - Apply Discount: Percentage [% field] or Fixed Amount [$ field]
  - Notes/Memo: [text area]
  - "Recalculate" button (auto-calculates totals)
  - [Save] and [Cancel] buttons at bottom

**Screen 12D: Send Invoice Modal**

**Location:** Appears when clicking "Send" button on invoice detail

**Layout:**
- Modal title: "Send Invoice"
- Section 1: Email details
  - To: [customer billing email, auto-filled, editable]
  - CC: [optional text field]
  - Subject: [pre-filled, editable] "Invoice INV-202603-0847 from GelatoConnect - Payment due Apr 15, 2026"
  - Body: [text area, pre-filled with template, editable]
    - Template includes: greeting, invoice reference, payment instructions, due date, company contact info
- Section 2: PDF Preview
  - Thumbnail or link: "Preview PDF" button to expand/show PDF preview
- Section 3: Buttons
  - [Send] (primary, blue)
  - [Cancel] (gray)

**Screen 12E: Record Payment Modal**

**Location:** Appears when clicking "Record Payment" button on invoice detail

**Layout:**
- Modal title: "Record Payment"
- Section 1: Payment amount
  - Amount: [currency field, default: remaining balance]
  - Remaining balance: $500 (shown below field)
- Section 2: Payment details
  - Date: [date picker, default: today]
  - Payment method: [dropdown] Check, Bank Transfer, Credit Card, Cash, Other
  - Reference / Check #: [text field, optional]
  - Notes: [text area, optional]
- Section 3: Buttons
  - [Record Payment] (primary, blue)
  - [Cancel] (gray)

**Screen 12F: Invoicing Settings - PDF Template Customization (New)**

**Location:** /settings/invoicing/pdf-template

**Layout:**
- Header: "Invoice PDF Template"
- Section 1: Branding
  - Logo upload: Drag & drop or file picker [company_logo.png]
  - Logo preview: Small thumbnail
  - Primary color: [color picker, default: brand blue]
  - Secondary color: [color picker, default: gray]
  - Accent color (for highlights): [color picker]
- Section 2: Company Information
  - Company name: [text field]
  - Address: [text field]
  - Phone: [text field]
  - Email: [text field]
  - Website: [text field]
  - Tax ID: [text field]
- Section 3: Invoice Footer
  - Footer text: [text area, e.g., "Thank you for your business!"]
  - Legal footer: [text area, optional, e.g., "All payments due within 30 days..."]
  - Enable bank account info: [checkbox]
    - Bank name, account number (masked), routing number: [fields if checked]
- Section 4: Preview
  - "Preview Invoice PDF" button
  - Shows sample invoice with all customizations applied
- Section 5: Buttons
  - [Save Template] (primary)
  - [Restore Defaults] (secondary)
  - [Cancel]

### Functional Requirements

| Requirement | Details | Priority |
|---|---|---|
| Auto-generate Invoice from Order | Order ship triggers invoice creation with line items | Must Have |
| Invoice Numbering | Auto-generated sequential numbering INV-[YYYY][MM][###] | Must Have |
| Line Items | Product items, custom items, discounts, taxes, shipping per address | Must Have |
| Tax Calculation | Automatic based on customer tax rate or configured rules | Must Have |
| Draft Editing | Modify line items, amounts, terms before sending | Must Have |
| Send via Email | Email with PDF attachment, customizable template | Must Have |
| Payment Recording | Record partial/full payments, track balance | Must Have |
| Payment Terms | Net 30/45/60, customizable, auto-calculated due date | Must Have |
| Overdue Tracking | Status flag, days past due calculation | Must Have |
| Manual Invoices | Create invoices not tied to orders | Should Have |
| Credit Memos | Create negative invoices for returns/adjustments | Should Have |
| Invoice PDF Template | Customizable branding, logo, colors, footer | Should Have |
| Email Reminders | Send payment reminder to overdue customers | Should Have |
| Invoice History | Audit trail of changes, sends, payments | Must Have |
| Export | Export invoice list to CSV for accounting | Nice to Have |
| Multi-currency | Support invoices in multiple currencies (Phase 2) | Future |

### Data Requirements

**Table: Invoice (new)**
- id (UUID)
- invoice_number (string, unique, e.g., "INV-202603-0847")
- order_id (UUID nullable, foreign key, if order-based)
- customer_id (UUID, foreign key)
- invoice_date (date)
- due_date (date)
- status (enum: DRAFT, READY, SENT, PARTIALLY_PAID, PAID, OVERDUE, CANCELLED)
- subtotal (decimal, $)
- tax_amount (decimal, $)
- tax_rate (decimal, %)
- total_shipping (decimal, $)
- discount_amount (decimal, $, nullable)
- total_amount (decimal, $)
- balance_due (decimal, $)
- notes (text nullable)
- is_manual (boolean, default false)
- is_credit_memo (boolean, default false)
- related_invoice_id (UUID nullable, foreign key, if credit memo)
- created_by_user_id (UUID)
- sent_at (timestamp nullable)
- sent_to_email (string nullable)
- first_sent_at (timestamp nullable)
- paid_at (timestamp nullable)
- created_at (timestamp)
- updated_at (timestamp)

**Table: InvoiceLineItem (new)**
- id (UUID)
- invoice_id (UUID, foreign key)
- description (string)
- quantity (decimal)
- unit_price (decimal, $)
- line_total (decimal, $, calculated)
- item_type (enum: PRODUCT, CUSTOM, DISCOUNT, TAX, SHIPPING)
- related_order_address_id (UUID nullable, foreign key, if shipping item)
- created_at (timestamp)

**Table: InvoicePayment (new)**
- id (UUID)
- invoice_id (UUID, foreign key)
- amount (decimal, $)
- payment_date (date)
- payment_method (enum: CHECK, BANK_TRANSFER, CREDIT_CARD, CASH, OTHER)
- reference (string nullable, e.g., check #, transaction id)
- notes (text nullable)
- recorded_by_user_id (UUID)
- created_at (timestamp)

**Table: InvoicePdfTemplate (new, singleton or per-company)**
- id (UUID)
- logo_url (string nullable)
- primary_color (string, hex)
- secondary_color (string, hex)
- accent_color (string, hex)
- company_name (string)
- company_address (string)
- company_phone (string nullable)
- company_email (string nullable)
- company_website (string nullable)
- company_tax_id (string nullable)
- footer_text (text nullable)
- legal_footer (text nullable)
- bank_name (string nullable)
- bank_account_masked (string nullable)
- bank_routing (string nullable)
- is_active (boolean)
- created_at (timestamp)
- updated_at (timestamp)

### State Machine: Invoice Lifecycle

```
DRAFT (auto-generated from shipped order, or manually created)
  ├─> READY (bookkeeper marks as ready to send)
  ├─> CANCELLED (bookkeeper cancels draft)
  └─> DRAFT (bookkeeper continues editing)

READY (reviewed, ready to send)
  ├─> SENT (bookkeeper clicks Send, email dispatched)
  ├─> DRAFT (bookkeeper returns to editing)
  └─> CANCELLED (bookkeeper cancels before sending)

SENT (email dispatched to customer)
  ├─> PARTIALLY_PAID (partial payment recorded)
  ├─> PAID (full payment recorded)
  ├─> OVERDUE (due date passed, no full payment)
  └─> SENT (remains until payment or overdue)

PARTIALLY_PAID (some payment received)
  ├─> PAID (remaining balance paid)
  ├─> OVERDUE (due date passed with balance remaining)
  └─> PARTIALLY_PAID (additional partial payment)

OVERDUE (past due date with balance remaining)
  ├─> PAID (full payment received)
  ├─> PARTIALLY_PAID (partial payment received while overdue)
  └─> OVERDUE (remains overdue, reminders sent)

PAID (terminal state - full payment received)
  └─> [no transitions; credit memos create separate records]

CANCELLED (terminal state)
  └─> [no transitions]
```

**Overdue Detection Logic:**
- Scheduled job runs daily at midnight
- Queries all invoices where status IN ('SENT', 'PARTIALLY_PAID') AND due_date < TODAY
- Updates status to OVERDUE
- Sends reminder email to customer (if reminder not sent in last 7 days)
- Escalation: if overdue > 30 days, notify PSP owner via email

### Edge Cases

1. **Invoice generated, then order item qty changed:** Invoice locked to qty at time of generation; new/changed items not automatically added to invoice.
2. **Partial invoice payment, then partial refund:** Record negative payment to adjust balance.
3. **Invoice sent, then customer sends email dispute:** Bookkeeper adds note to invoice, links to support ticket (if integrated).
4. **Duplicate invoice prevention:** System prevents accidental re-generation of invoice for already-shipped order.
5. **Tax calculation per item:** Advanced: different line items may have different tax rates (e.g., shipping often tax-exempt). Current design applies single rate; Phase 2 can refine.
6. **Invoice with no order:** Manual invoices require customer selection; all other fields fillable.
7. **Customer email invalid:** Send failure logged; bookkeeper notified.
8. **Credit memo exceeding original invoice:** Allow (could be for future credit), show warning.
9. **Overpayment:** If payment > balance due, show warning "Overpayment of $X", allow with note.
10. **Timezone handling:** Due date calculations respect company timezone (if multi-timezone future).

### Integration Points

- **Order completion (PRD 2):** Order ship triggers invoice creation
- **Estimate line items (PRD 2):** Invoice pulls from estimate line items
- **Multi-address orders (PRD 10):** Per-address shipping costs on invoice
- **Customer CRM (PRD 13):** Customer email, tax rate, payment terms pulled from customer profile
- **ERP integration (PRD 14):** Invoice synced to QuickBooks
- **Email system:** Existing email service used for sending invoices and reminders
- **PDF generation:** Same library as BOL (Puppeteer/wkhtmltopdf)
- **Payment tracking (Phase 2):** Bank feed integration for automatic payment matching

---

## PRD 13: Customer CRM [CORE - WS4]

### Problem Statement

Currently, customer information is scattered: company info in one place, contact emails in another, pricing in estimates, payment terms in invoices. CSRs can't quickly see full customer context (order history, payment status, last interaction). Sales teams manually look up pricing tiers. No centralized customer profile creates friction and missed upsell opportunities.

### Solution Overview

Create unified customer profile page showing: company info, primary contacts (with roles), pricing tier with applied discounts, payment terms, complete order history with status, outstanding balance, notes/preferences. Searchable customer list with typeahead. Ability to manage contacts (add/edit/delete) and designate primary/billing/shipping roles. Integrated with orders, invoices, and estimates.

> **Implementation Note:** GelatoConnect already stores customer records for integration and logistics purposes. This PRD extends those records with MIS-specific fields (billing terms, sales rep, job/estimation history, notification preferences). Check existing customer entities in GelatoConnect before creating new tables - extend rather than duplicate.

### User Stories

**US 13.1: CSR Searches for Customer and Opens Unified Profile**
- As a CSR, I want to quickly search for a customer and see their complete profile so that I can assist them efficiently.
- Acceptance Criteria:
  - Search bar on home/dashboard with typeahead auto-complete
  - Search by: Customer name, company name, email, phone, account ID
  - Results show customer name, company, last order date, outstanding balance
  - Click result to open customer profile page
  - Profile loads showing company info, contacts, pricing, order history in one place

**US 13.2: Customer Profile Shows Consolidated Information**
- As a CSR, I want to see all customer information on one page so that I don't have to navigate multiple sections.
- Acceptance Criteria:
  - Customer profile page shows tabs/sections:
    - Overview: Company name, account ID, primary contact, total revenue, last order date, outstanding balance, account status (Active/Inactive)
    - Company Info: Address, phone, email, website, billing address (if different), shipping address
    - Contacts: List of contacts with name, title, email, phone, role flags (Primary/Billing/Shipping/Technical)
    - Pricing: Pricing tier (Gold/Silver/Bronze/Standard), discount percentage, special pricing rules
    - Payment Terms: Net 30/45/60, etc.
    - Order History: List of all orders with status, date, amount (sortable, filterable)
    - Invoices: List of invoices with status, amount, due date (sortable, filterable)
    - Notes: Internal notes pinned for team visibility
    - Activity: Recent actions (order created, invoice sent, payment received, note added)

**US 13.3: Sales Manager Sets Customer Pricing Tier**
- As a sales manager, I want to set a customer's pricing tier so that they automatically get correct discounts on estimates.
- Acceptance Criteria:
  - Customer profile, Pricing section
  - Dropdown: Pricing tier (Standard, Silver, Gold, Platinum)
  - Each tier has associated discount %: Standard 0%, Silver 5%, Gold 15%, Platinum 20%
  - When tier selected, discount % auto-fills
  - Option to add custom discount % for one-off deals
  - "Apply to Active Quotes" option to backfill tier to pending estimates
  - All future estimates use this tier's pricing
  - Change history: Show when tier changed and by whom

**US 13.4: Bookkeeper Configures Customer Payment Terms**
- As a bookkeeper, I want to set payment terms for a customer so that invoices auto-apply correct terms.
- Acceptance Criteria:
  - Customer profile, Payment section
  - Payment Terms dropdown: Net 30, Net 45, Net 60, Custom
  - If Custom, allow entering custom days (e.g., "Net 15")
  - Primary payment method: Optional dropdown (Check, Bank Transfer, Credit Card, etc.)
  - Early payment discount: Optional % field (e.g., "2/10 Net 30" = 2% discount if paid within 10 days)
  - All future invoices use these terms
  - Can override on per-invoice basis if needed

**US 13.5: Contact Management - Add/Edit/Delete**
- As a CSR, I want to add and manage customer contacts so that we know who to contact for what.
- Acceptance Criteria:
  - Contacts section on customer profile
  - "Add Contact" button opens form:
    - First name, Last name, Title (e.g., "Procurement Manager")
    - Email, Phone, Mobile (optional)
    - Role checkboxes: Primary, Billing, Shipping, Technical
    - Notes: Optional field (e.g., "Prefers email, not phone")
  - Each contact has [Edit] and [Delete] buttons
  - Edit opens form with same fields
  - Delete shows confirmation
  - Requirement: At least one contact with "Primary" role
  - Billing contact required for invoicing (if not flagged, use Primary)

**US 13.6: CSR Adds Internal Notes and Pins Important Info**
- As a CSR, I want to add internal notes about a customer so that my team knows their preferences and history.
- Acceptance Criteria:
  - Notes section on customer profile
  - "Add Note" button opens text area
  - Note author and timestamp auto-recorded
  - "Pin" option to highlight important notes (e.g., "VIP customer - give priority support")
  - Pinned notes appear above unpinned
  - Search/filter notes by keyword
  - Notes visible to all team members

**US 13.7: View Customer's Order and Invoice History**
- As a sales rep, I want to see a customer's order history so that I can identify upsell opportunities and understand their buying patterns.
- Acceptance Criteria:
  - Order History tab: Table with columns Order #, Date, Status, Amount, Items, Actions
  - Sortable by: Order #, Date, Amount, Status
  - Filter by: Date range, Status (Pending, In Progress, Completed, Shipped, Cancelled)
  - Click order # to navigate to order detail
  - Invoices tab: Similar layout showing all invoices
  - Summary stats: Total revenue, avg order value, # of orders

### Detailed User Journeys

**Journey 1: CSR Assists Customer (Quick Profile Lookup)**

1. Phone rings: Customer "Acme Corp" calling with question about order
2. CSR clicks search box on dashboard
3. Types "Acme" - typeahead shows "Acme Corp [ID: C-002456], Last order: Mar 10, Outstanding: $500"
4. Clicks result to open customer profile
5. Profile page loads, Overview tab shows:
   - Company: Acme Corp (since 2023)
   - Primary contact: John Smith (john@acmecorp.com)
   - Total revenue (lifetime): $125,000
   - Last order: Mar 10, 2026 (Status: Shipped)
   - Outstanding balance: $500
   - Account status: Active, Gold tier (15% discount)
6. CSR scrolls to Order History tab
7. Sees latest order: ORD-2026-0142, Mar 10, $1,851, Shipped
8. Clicks order to open detail, checks shipment status
9. Sees both addresses shipped, tracking links visible
10. Returns to customer profile, notes in Notes section: "Customer called about tracking - provided tracking links for both addresses"
11. CSR notes that customer is Gold tier, high-value account - flags for VIP support

**Journey 2: Sales Manager Sets Pricing Tier (New Account Onboarding)**

1. New customer "XYZ Ltd" created in system
2. Sales manager receives notification
3. Opens customer profile for XYZ Ltd
4. Scrolls to Pricing section
5. Current tier: "Standard" (0% discount)
6. Manager evaluates: Large volume customer, good payment history with sister company
7. Changes tier to "Gold" (15% discount)
8. Discount % auto-fills: 15%
9. Manager notes: "Volume discount for new partnership"
10. Clicks "Save"
11. System records change in audit trail
12. Manager navigates to Estimates section, filters to "XYZ Ltd" with status "Draft"
13. Finds 1 pending estimate: EST-2026-0345
14. Option appears: "Apply Gold pricing to this estimate?"
15. Clicks "Apply"
16. Estimate recalculated with 15% discount
17. Subtotal $10,000 × 15% discount = $1,500 savings
18. New total: $8,500 (vs. $10,000)
19. Estimate sent to customer with updated pricing

**Journey 3: Bookkeeper Configures Payment Terms (Account Setup)**

1. Bookkeeper opening new customer account for "ABC Manufacturing"
2. Navigates to customer detail page
3. Scrolls to Payment section
4. Currently blank (no payment terms configured)
5. Clicks "Edit Payment Terms"
6. Form appears:
   - Payment Terms dropdown: Currently "Not Set"
   - Selects "Net 45" (standard for manufacturing)
   - Primary payment method: Selects "Bank Transfer"
   - Early payment discount: Enters "2%" (2/10 Net 45 = 2% if paid in 10 days)
7. Clicks "Save"
8. Payment terms now configured
9. Future invoices for ABC Manufacturing auto-default:
   - Due date: 45 days from invoice date
   - Payment method: Bank Transfer (in email)
   - Early payment discount noted: "2% discount if paid within 10 days"

**Journey 4: CSR Adds Contact and Manages Roles**

1. Bookkeeper says: "We need to invoice Sarah Chen now, not John Smith"
2. CSR opens customer profile for Acme Corp
3. Clicks Contacts section
4. Sees current contacts:
   - John Smith (john@acmecorp.com) - Primary, Billing
   - Mary Johnson (mary@acmecorp.com) - Shipping
5. Clicks "Add Contact"
6. Form opens:
   - First name: Sarah
   - Last name: Chen
   - Title: Finance Manager
   - Email: sarah.chen@acmecorp.com
   - Phone: (555) 234-5678
   - Role checkboxes: Check "Billing"
7. Clicks "Save"
8. Sarah added to contacts list
9. System notification: "Billing contact changed from John Smith to Sarah Chen"
10. Next invoice will default to sarah.chen@acmecorp.com instead of john@acmecorp.com

### Screen/View Descriptions

**Screen 13A: Customer List (New)**

**Location:** /customers

**Layout:**
- Header: "Customers"
- Toolbar:
  - Search bar: "Search by name, company, email..." (with typeahead)
  - Filter: Status (All, Active, Inactive), Pricing tier (All, Standard, Silver, Gold, Platinum)
  - Date range: Last order (Any time, This month, Last 3 months, Last year)
  - Sort: By name, by last order date, by outstanding balance
- Table (sortable, filterable):
  - Columns: Customer Name | Company | Primary Contact | Last Order | Total Revenue | Outstanding Balance | Status | Actions
  - Sample rows:
    - Acme Corp | Acme Corp | John Smith | Mar 10 | $125,000 | $500 | Active | [View] [Edit]
    - XYZ Ltd | XYZ Ltd | Sarah Johnson | Feb 28 | $45,000 | $0 | Active | [View] [Edit]
    - DEF Inc | DEF Inc | Mike Anderson | Jan 15 | $82,000 | $3,500 | Active | [View] [Edit]
  - Row colors: Green for paid accounts, yellow for outstanding balance, red for overdue
- Pagination: 50 customers per page
- Summary bar: Total customers, avg revenue per customer, total outstanding

**Screen 13B: Customer Profile Page (New)**

**Location:** /customers/[customerId]

**Layout:**
- Breadcrumb: Customers > [Customer Name]
- Header: Customer name (e.g., "Acme Corp"), Account ID, Status badge
- Tabs: Overview | Company Info | Contacts | Pricing | Payment Terms | Order History | Invoices | Notes | Activity

**Tab 1: Overview**
- Grid layout with cards:
  - Card 1: Company name, Account created date, Account status (Active/Inactive)
  - Card 2: Primary contact, email, phone
  - Card 3: Total revenue (lifetime), Avg order value, # of orders
  - Card 4: Last order date, status of last order
  - Card 5: Outstanding balance (red if overdue)
  - Card 6: Pricing tier (Gold, 15% discount)
  - Card 7: Payment terms (Net 45)
  - Card 8: Account actions: [Edit] [Send Email] [Create Estimate] [Create Order]

**Tab 2: Company Info**
- Form-like display (editable):
  - Company legal name, Doing business as (DBA)
  - Website, Industry (optional)
  - Address section: Street, City, State, Zip, Country
  - Billing address (if different): Checkbox "Same as shipping", then address
  - Shipping address: Address
  - Contact info: Phone, Email, Fax (optional)
  - Tax ID (optional)
  - Notes: Multi-line text
  - [Edit] and [Save] buttons (if edit mode)

**Tab 3: Contacts**
- Header: "Contacts (3)"
- "Add Contact" button
- Contact cards (or list):
  - Each contact card:
    - Name, Title
    - Email (clickable), Phone, Mobile
    - Role badges: Primary, Billing, Shipping, Technical (as applicable)
    - Notes (if any)
    - [Edit] and [Delete] buttons
  - Requirements indicator: "At least one Primary contact required"

**Tab 4: Pricing**
- Pricing tier section:
  - Current tier: Dropdown (Standard, Silver, Gold, Platinum)
  - Applied discount %: [Auto-filled]
  - Custom discount % (override): [Text field, optional]
  - Last changed: [Date, by User]
  - Change history: [Collapsible, shows previous tier changes]
  - [Edit] button to change tier

**Tab 5: Payment Terms**
- Payment terms section:
  - Terms: Dropdown (Net 30, Net 45, Net 60, Custom)
  - If custom: Days [Number field]
  - Primary payment method: Dropdown (Check, Bank Transfer, Credit Card, Cash, Other, Not set)
  - Early payment discount: % [Field, optional]
  - Example: "2% discount if paid within 10 days"
  - [Edit] button

**Tab 6: Order History**
- Table: Order # | Date | Status | Amount | Items | Actions
- Sortable by: Order #, Date, Amount, Status
- Filter: Date range, Status (Pending, In Progress, Completed, Shipped, Cancelled)
- Columns clickable to open order detail
- Summary: Total orders, total revenue from this customer

**Tab 7: Invoices**
- Table: Invoice # | Date | Due Date | Amount | Balance Due | Status | Actions
- Sortable by: Invoice #, Date, Due Date, Amount, Status
- Filter: Date range, Status (Draft, Sent, Partially Paid, Paid, Overdue, Cancelled)
- Columns clickable to open invoice detail
- Summary: Total invoiced, outstanding balance

**Tab 8: Notes**
- "Add Note" button opens text area
- Notes displayed reverse chronological (newest first)
- Each note: Author, timestamp, content, [Pin] [Delete] buttons
- Pinned notes highlighted at top
- Search field to filter notes by keyword

**Tab 9: Activity**
- Timeline view (or table) of recent customer events:
  - Order created
  - Estimate sent
  - Invoice sent
  - Payment received
  - Note added
  - Contact updated
  - Pricing tier changed
- Filter by: All, Orders, Invoices, Payments, Changes
- Shows who performed action and when

**Screen 13C: Customer Profile - Edit Contact Modal**

**Location:** Appears when clicking "Add Contact" or [Edit] on contact

**Layout:**
- Modal title: "Add Contact" or "Edit Contact"
- Form fields:
  - First Name: [Text field, required]
  - Last Name: [Text field, required]
  - Title: [Text field, optional, e.g., "Procurement Manager"]
  - Email: [Email field, required]
  - Phone: [Phone field, optional]
  - Mobile: [Phone field, optional]
  - Role checkboxes (with descriptions):
    - ☐ Primary (main contact for general inquiries)
    - ☐ Billing (receives invoices and payment notices)
    - ☐ Shipping (receives shipment notifications)
    - ☐ Technical (technical support contact)
  - Notes: [Text area, optional, e.g., "Prefers email, not phone"]
- Buttons: [Save] [Cancel]
- Validation: At least one role must be selected; email required

### Functional Requirements

| Requirement | Details | Priority |
|---|---|---|
| Customer Search | Typeahead by name, company, email, phone, account ID | Must Have |
| Unified Profile | Company info, contacts, pricing, orders, invoices in one place | Must Have |
| Company Information | Legal name, address, contact info, tax ID, editable | Must Have |
| Contact Management | Add/edit/delete contacts with role designations | Must Have |
| Pricing Tier | Customer-level tier (Standard/Silver/Gold/Platinum) with discount % | Must Have |
| Custom Discount | Override tier discount for one-off deals | Should Have |
| Payment Terms | Configurable per customer, auto-applied to invoices | Must Have |
| Order History | Complete order list, sortable/filterable, linked to orders | Must Have |
| Invoice History | Complete invoice list, sortable/filterable, linked to invoices | Must Have |
| Outstanding Balance | Calculated from unpaid invoices, shown on profile | Must Have |
| Internal Notes | Team can add/pin/delete notes on customer | Must Have |
| Activity Feed | Timeline of customer events (orders, invoices, payments, changes) | Should Have |
| Primary Contact | Required role for each customer | Must Have |
| Billing Contact | Separate from primary for invoice delivery | Must Have |
| Export | Export customer list to CSV | Nice to Have |
| Bulk Operations | Assign pricing tier to multiple customers | Nice to Have |
| Customer Status | Active/Inactive flag | Should Have |
| Account Creation Date | Track customer onboarding date | Should Have |

### Data Requirements

**Table: Customer (new/enhanced)**
- id (UUID)
- account_id (string, unique, e.g., "C-002456")
- company_legal_name (string)
- company_dba (string nullable)
- industry (string nullable)
- website (string nullable)
- phone (string)
- email (string)
- fax (string nullable)
- primary_address_id (UUID, foreign key to Address)
- billing_address_id (UUID nullable, foreign key to Address)
- shipping_address_id (UUID nullable, foreign key to Address)
- tax_id (string nullable)
- pricing_tier_id (UUID, foreign key to PricingTier, default: Standard)
- custom_discount_percent (decimal nullable)
- payment_terms_id (UUID, foreign key to PaymentTerms)
- account_status (enum: ACTIVE, INACTIVE)
- total_revenue (decimal, calculated)
- total_orders (integer, calculated)
- last_order_date (date nullable)
- outstanding_balance (decimal, calculated)
- created_at (timestamp)
- updated_at (timestamp)
- created_by_user_id (UUID)

**Table: CustomerContact (new)**
- id (UUID)
- customer_id (UUID, foreign key)
- first_name (string)
- last_name (string)
- title (string nullable)
- email (string)
- phone (string nullable)
- mobile (string nullable)
- notes (text nullable)
- is_primary (boolean, default false)
- is_billing (boolean, default false)
- is_shipping (boolean, default false)
- is_technical (boolean, default false)
- created_at (timestamp)

**Table: PricingTier (new)**
- id (UUID)
- name (string, e.g., "Gold")
- discount_percent (decimal)
- description (text nullable)

**Table: PaymentTerms (new)**
- id (UUID)
- name (string, e.g., "Net 45")
- days (integer)
- early_payment_discount_percent (decimal nullable)
- early_payment_days (integer nullable, e.g., 10 for "2/10 Net 45")

**Table: CustomerNote (new)**
- id (UUID)
- customer_id (UUID, foreign key)
- content (text)
- is_pinned (boolean, default false)
- created_by_user_id (UUID)
- created_at (timestamp)

**Table: CustomerActivity (new, or system-wide)**
- id (UUID)
- customer_id (UUID, foreign key)
- activity_type (enum: ORDER_CREATED, ESTIMATE_SENT, INVOICE_SENT, PAYMENT_RECEIVED, NOTE_ADDED, CONTACT_UPDATED, TIER_CHANGED, TERMS_CHANGED)
- related_id (UUID nullable, foreign key to related entity)
- description (string)
- user_id (UUID)
- created_at (timestamp)

### Edge Cases

1. **No primary contact:** Prevent if customer has no contacts. Show error "At least one Primary contact required."
2. **Delete primary contact:** If trying to delete only primary contact, show error "This is the only Primary contact. Designate another contact as Primary before deleting."
3. **Billing address = Shipping address:** Default, but allow different addresses per order.
4. **Inactive customer with pending orders:** Allow, but flag for attention.
5. **Pricing tier change mid-order:** New estimates use new tier; existing estimates/orders use tier at time of creation.
6. **Outstanding balance calculation:** Sums all unpaid invoices; updates daily or on payment/invoice change.
7. **Customer merge:** If two customer records need to merge, system should consolidate orders/invoices (Phase 2 feature).
8. **Contact deduplication:** If same email added as two contacts, warn user.
9. **Payment terms mismatch:** If invoice has different terms than customer default, show on invoice.
10. **Tax ID validation:** If provided, validate format (optional Phase 2).

### Integration Points

- **Order creation (PRD 2):** Customer profile opens from order
- **Estimate creation (PRD 2):** Pricing tier auto-applied to estimate
- **Invoicing (PRD 12):** Billing contact and payment terms pulled from customer profile
- **Multi-address orders (PRD 10):** Shipping address from customer profile can be overridden per order
- **ERP integration (PRD 14):** Customer synced to QuickBooks
- **Payment processing (Phase 2):** Customer payment history tracked
- **Email system:** Contact emails used for notifications

---

## PRD 14: ERP Integration [CORE - WS4]

### Problem Statement

GelatoConnect is a standalone MIS, but shops use QuickBooks Online (QBO) for accounting. Data is manually entered in both systems: invoices, customer info, payments. This creates duplicate data entry, reconciliation headaches, and accounting lag. No single source of truth.

### Solution Overview

Bi-directional sync with QuickBooks Online via OAuth. Invoices auto-pushed to QBO immediately after sending. Customers synced from GC to QBO (one-way, prevents QBO-only customers). Payments pulled daily from QBO and matched to invoices (marks invoice paid). Sync status visible on invoices, with retry capability. Field mapping configurable. Error handling with logging and user notifications.

> **Implementation Note:** ERP integration should follow an adapter pattern - build a common integration interface that can be implemented per ERP system (QuickBooks, Dynamics, Sage). Start with QuickBooks as the first adapter since it has the widest adoption among target PSPs. The integration layer should handle bidirectional sync: push invoices/payments from MIS to ERP, and pull account balances/payment confirmations from ERP to MIS.

### User Stories

**US 14.1: Owner Connects QuickBooks via OAuth**
- As a shop owner, I want to securely connect QuickBooks Online so that data syncs automatically.
- Acceptance Criteria:
  - Settings > ERP > QuickBooks section
  - "Connect QuickBooks" button launches OAuth flow
  - User logs into Intuit account, authorizes GelatoConnect
  - Connection verified and access token stored securely
  - Wizard guides through: 1) Authorization, 2) Field mapping, 3) Test sync
  - Test sync creates test invoice, verifies sync to QBO, then deletes test
  - Connection status shown: "Connected (Last sync: 2 hours ago)"
  - "Disconnect" button available if needed

**US 14.2: Field Mapping Configuration**
- As an admin, I want to configure how GC fields map to QBO fields so that data syncs correctly.
- Acceptance Criteria:
  - Field Mapping page under ERP settings
  - Pre-configured defaults for standard mappings (e.g., GC "Customer" → QBO "Customer Name")
  - Visible mappings:
    - Customer name → QBO Customer Name
    - Billing email → QBO Email
    - Shipping address → QBO Bill-To Address
    - Invoice # → QBO Invoice Number
    - Invoice amount → QBO Total Amount
    - Payment terms → QBO Terms
  - Ability to edit mapping if custom QBO fields used
  - Test mapping: See what sample data would look like after mapping
  - Save mapping configuration

**US 14.3: Invoice Auto-synced to QuickBooks**
- As the system, I want to push invoices to QuickBooks immediately after sending so that QBO is always current.
- Acceptance Criteria:
  - When invoice status changes to "Sent", sync job triggered asynchronously
  - Invoice data sent to QBO API: Customer, line items, amounts, due date, payment terms
  - QBO creates invoice, returns QBO invoice ID
  - Sync status recorded on invoice: "Synced to QBO" with timestamp and QBO invoice #
  - If sync fails: Status shows "Sync Failed" with error message
  - Error email sent to admin with details
  - "Retry Sync" button shown on failed invoice

**US 14.4: Payments Pulled Daily from QuickBooks**
- As the system, I want to pull payments daily from QuickBooks so that invoice payment status is auto-updated.
- Acceptance Criteria:
  - Scheduled job runs daily (configurable time, e.g., 11 PM)
  - Queries QBO for all payments received in last N days (configurable, default 7 days)
  - For each payment, attempts to match to GC invoice:
    - Match by: Customer + Amount + Date within tolerance
    - If match found: Invoice payment recorded in GC (auto-creates Payment record)
    - Invoice status updates: "Sent" → "Paid" or "Partially Paid"
  - If match not found: Payment logged as "Unmatched" for manual review
  - Daily sync report emailed to admin: # of payments pulled, # matched, # unmatched

**US 14.5: Sync Status Visible on Invoices**
- As a bookkeeper, I want to see sync status on invoices so that I know if data made it to QBO.
- Acceptance Criteria:
  - Invoice detail page shows "QuickBooks Status" section:
    - Status badge: "Synced", "Pending", "Failed", "Manual"
    - Timestamp of last sync attempt
    - QBO invoice # (if synced successfully)
    - Error message (if failed)
    - "Retry Sync" button if failed
    - Link to QBO invoice (if available)

**US 14.6: Sync Error Handling and Logging**
- As an admin, I want visibility into sync errors so that I can troubleshoot and resolve.
- Acceptance Criteria:
  - Sync Log page: All sync events (invoices, customers, payments)
  - Table: Entity | Type | Status | Result | Timestamp | Error Message | User | Actions
  - Status: Synced, Pending, Failed, Skipped
  - Filter by: Status, Date range, Entity type
  - Error messages show details: "Customer 'Acme Corp' not found in QBO", "API timeout", etc.
  - "Retry" button on failed syncs
  - Bulk retry: Select multiple failed syncs and retry all

**US 14.7: Test Connection and Initial Sync**
- As an owner, I want to test the QBO connection before going live so that I know it works.
- Acceptance Criteria:
  - ERP settings page has "Test Connection" button
  - Test queries QBO API, verifies credentials valid
  - Shows result: "✓ Connected successfully" or "✗ Connection failed - [error]"
  - If initial setup, can run test sync:
    - Creates test invoice in GC
    - Pushes to QBO
    - Verifies in QBO
    - Deletes test invoice from both systems
    - Shows: "✓ Test sync successful - Invoice created and synced"

### Detailed User Journeys

**Journey 1: Initial QuickBooks Connection Setup (Owner)**

1. Shop owner logs in, navigates to Settings > ERP
2. Sees: "QuickBooks Online" section with "Connect QuickBooks" button
3. Clicks "Connect QuickBooks"
4. Modal/page appears: "Connect to QuickBooks Online"
5. User clicks "Authorize with Intuit"
6. Redirected to Intuit login page
7. User logs in with Intuit account, sees: "GelatoConnect wants to access your QuickBooks"
8. Clicks "Authorize"
9. Redirected back to GelatoConnect
10. Success page: "✓ Authorization successful"
11. Wizard Step 2: Field Mapping
    - Shows default mapping: Customer Name, Email, Address, Invoice #, etc.
    - Owner reviews, sees defaults are standard
    - Clicks "Next"
12. Wizard Step 3: Test Sync
    - "Run Test Sync" button
    - System creates test invoice: "TEST INV-000001"
    - Syncs to QBO
    - Confirms created in QBO
    - Deletes test invoice from both systems
    - Shows: "✓ Test sync successful"
13. Wizard Step 4: Complete
    - Connection enabled
    - Shows: "QuickBooks Online connected (Last sync: now)"
    - "Disconnect" button shown (if needed to re-authorize)
14. Owner navigates back to Settings to see: "QuickBooks Status: Connected, Last sync: [timestamp]"

**Journey 2: Invoice Sends and Auto-syncs to QuickBooks (Bookkeeper)**

1. Bookkeeper reviews draft invoice (INV-202603-0847)
2. Clicks "Send"
3. Email sent to customer
4. Invoice status: "Sent"
5. System asynchronously triggers sync to QBO
6. Within seconds, sync job runs:
   - Retrieves invoice from GC: Customer, line items, total, due date, terms
   - Maps fields using configured mappings
   - Calls QBO API: "Create Invoice"
   - QBO returns success + QBO invoice #
   - Sync status updated: "Synced to QBO #INV-0847"
7. Bookkeeper refreshes invoice detail
8. "QuickBooks Status" section shows:
   - Badge: ✓ Synced
   - QBO Invoice #: INV-0847
   - Timestamp: Mar 15, 2:31 PM
9. Later, Bookkeeper opens invoice, clicks "View in QuickBooks" link (if available)
10. Opens QBO in new tab, sees matching invoice

**Journey 3: Payment Received in QBO, Auto-matched to Invoice**

1. Customer pays invoice via bank transfer on April 10
2. Bank feed in QBO receives payment, matches to invoice #INV-0847
3. QBO records payment, invoice status: "Paid" in QBO
4. Daily sync job runs (11 PM that night)
5. Pulls all payments from QBO from last 7 days
6. Finds payment: Customer "Acme Corp", Amount $1,851, Date April 10
7. Matches to GC invoice: INV-202603-0847 (same customer, amount within $1, date matches)
8. Creates Payment record in GC with details: Amount $1,851, Date April 10, Ref "Bank transfer"
9. Invoice status updates: "Sent" → "Paid"
10. Bookkeeper opens invoice detail next morning
11. Sees Payment section: "Paid $1,851 on April 10, 2026"
12. Invoice status shows "Paid" in both GC and QBO (synced)
13. Daily sync report emailed: "1 payment pulled, 1 matched"

**Journey 4: Sync Failure and Retry (Admin/Bookkeeper)**

1. Invoice INV-202603-0850 created and sent
2. Sync to QBO triggered
3. QBO API returns error: "Customer not found - ensure customer exists in QBO first"
4. Sync status on invoice: ✗ Failed
5. Error message shown: "Customer 'NewCorp LLC' not found in QBO"
6. Admin notified via email: "Invoice sync failed for INV-0850, see details..."
7. Admin navigates to Sync Log
8. Filters to "Failed" status
9. Sees row: "Invoice INV-0850 | Send to QBO | Failed | Customer 'NewCorp LLC' not found in QBO | 2026-03-15 3:20 PM"
10. Admin realizes: Customer wasn't synced first (customer sync runs weekly)
11. Manually creates customer in QBO (or waits for next sync job)
12. Returns to Sync Log, clicks "Retry" on failed invoice sync
13. Sync retries, succeeds
14. Status updates: "Synced to QBO" with new timestamp

**Journey 5: Weekly Payment Reconciliation (Bookkeeper)**

1. Bookkeeper logs in Monday morning
2. Checks dashboard: Sees notification "Sync Report: 47 payments pulled, 45 matched, 2 unmatched"
3. Clicks notification to view Sync Log
4. Filters to: Status = "Unmatched", Date = Last 24 hours
5. Sees 2 unmatched payments:
   - Payment $500 from "ABC Corp", April 14 (no matching invoice found)
   - Payment $1,200 from "XYZ Ltd", April 14 (could be partial, but no clear match)
6. For first: Bookkeeper manually investigates: ABC Corp doesn't have an active invoice. Notes: "Payment for future/deposit?" Marks as reviewed.
7. For second: Bookkeeper finds invoice for $2,400 from XYZ Ltd. Payment is partial. Manually records as partial payment ($1,200 of $2,400).
8. Both now reviewed and handled
9. No further action needed

### Screen/View Descriptions

**Screen 14A: ERP Settings - QuickBooks Connection (New)**

**Location:** /settings/erp/quickbooks

**Layout:**
- Header: "QuickBooks Online Integration"
- Section 1: Connection Status
  - Status indicator: "Connected" (green) or "Not Connected" (gray) or "Error" (red)
  - If connected:
    - "✓ Connected to QuickBooks"
    - Last sync: "April 15, 2026, 11:02 PM"
    - "Disconnect" button (secondary)
    - "Test Connection" button
  - If not connected:
    - "Connect QuickBooks" button (primary)
    - Instructions: "To enable automatic syncing with QuickBooks Online, click Connect and authorize..."
- Section 2: Sync Settings
  - Auto-sync invoices: Toggle [ON/OFF], default ON
  - Invoice sync timing: Immediate (default) or Batched (optional)
  - Auto-sync customers: Toggle [ON/OFF], default ON
  - Customer sync frequency: Weekly (default), options: Daily, Weekly, Monthly
  - Auto-pull payments: Toggle [ON/OFF], default ON
  - Payment sync frequency: Daily (default) at time [time picker] (e.g., 11:00 PM)
  - Payment match tolerance (days): [Number field, default 7 days]
- Section 3: Field Mapping
  - "Configure Field Mapping" button → Opens Screen 14B
- Section 4: Sync Log
  - "View Sync Log" button → Opens Screen 14D
  - Last 5 syncs displayed inline:
    - Timestamp | Type | Status | Entity | Action
    - April 15, 11:02 PM | Payment pull | Synced | 47 payments | [View]
- Section 5: Danger Zone
  - "Disconnect QuickBooks" button (red, with confirmation)

**Screen 14B: Field Mapping Configuration (New)**

**Location:** /settings/erp/quickbooks/field-mapping

**Layout:**
- Header: "QuickBooks Field Mapping"
- Info box: "Configure how GelatoConnect fields map to QuickBooks fields. Defaults shown below."
- Table of mappings:
  - Columns: GelatoConnect Field | QuickBooks Field | Type | Notes | Actions
  - Sample rows:
    - Customer Name | Customer Name | Auto | — | [Edit]
    - Billing Email | Email | Auto | — | [Edit]
    - Invoice # | Invoice Number | Auto | — | [Edit]
    - Invoice Amount | Total Amount | Auto | — | [Edit]
    - Due Date | Due Date | Auto | — | [Edit]
    - Payment Terms | Terms | Auto | — | [Edit]
  - "Add Custom Mapping" button (for advanced users)
- Section: Test Mapping
  - "Load Sample Data" button
  - Shows example: "Customer 'Acme Corp' → QBO Customer Name 'Acme Corp'"
  - Shows example: "Invoice Amount $1,851 → QBO Total Amount $1,851"
- Buttons: [Save Configuration] [Cancel]

**Screen 14C: Invoice Detail - QuickBooks Status Section (Modified)**

**Location:** /invoices/[invoiceId]

**New Section Added: "QuickBooks Status" (at top or bottom)**

**Layout:**
- Card with:
  - Status badge: ✓ "Synced to QBO" (green) or ⏱ "Pending Sync" (yellow) or ✗ "Sync Failed" (red)
  - Details:
    - If Synced: "Synced to QuickBooks | Invoice #: INV-0847 | Time: Mar 15, 2:31 PM | [View in QBO]"
    - If Pending: "Pending sync to QuickBooks... | Last attempt: [timestamp] | [Retry Sync]"
    - If Failed: "Sync Failed | Error: Customer 'NewCorp LLC' not found in QBO | [Retry Sync]"
  - Payment status (if synced): "Invoice marked as Paid in QBO on April 10, 2026"

**Screen 14D: Sync Log (New)**

**Location:** /settings/erp/quickbooks/sync-log

**Layout:**
- Header: "Sync Log"
- Filter toolbar:
  - Status filter: All, Synced, Pending, Failed, Skipped
  - Entity type: All, Invoices, Customers, Payments
  - Date range: From/To
  - Search: By invoice #, customer name, error message
- Table (sortable):
  - Columns: Timestamp | Entity | Type | Status | Details | Error Message | Retry
  - Sample rows:
    - April 15, 11:02 PM | Payment Pull | — | Synced | 47 payments pulled, 45 matched | — | —
    - April 15, 10:30 PM | INV-202603-0850 | Invoice Sync | Failed | — | Customer 'NewCorp LLC' not found in QBO | [Retry]
    - April 15, 10:25 PM | INV-202603-0847 | Invoice Sync | Synced | QBO #INV-0847 | — | —
    - April 14, 11:00 PM | Customer Sync | — | Synced | 3 customers synced | — | —
    - April 14, 11:00 PM | Payment Pull | — | Synced | 32 payments pulled, 30 matched, 2 unmatched | — | [Review Unmatched]
- Bulk actions: Select multiple failed syncs, "Retry All" button
- Pagination: 50 rows per page
- Export: "Download Log (CSV)" button

**Screen 14E: Unmatched Payments Review (Modal/Page)**

**Location:** Appears from Sync Log or daily email notification

**Layout:**
- Header: "Unmatched Payments Review"
- Info: "2 payments from last 7 days could not be automatically matched to invoices"
- Table of unmatched payments:
  - Columns: Date | Customer | Amount | Notes | Actions
  - Rows:
    - April 14 | ABC Corp | $500 | No invoice found | [Link to Customer] [Mark as Reviewed]
    - April 14 | XYZ Ltd | $1,200 | Multiple possible invoices | [Match to Invoice...] [Mark Reviewed]
- For each: Options to:
  - Link to customer for manual investigation
  - Match to specific invoice (dropdown)
  - Mark as "Reviewed" (removes from unmatched list)
  - Add note: "Deposit for future order" or other explanation
- [Mark All as Reviewed] button
- [Cancel] to dismiss

### Functional Requirements

| Requirement | Details | Priority |
|---|---|---|
| OAuth Authorization | Secure Intuit OAuth flow for QBO connection | Must Have |
| Invoice Sync to QBO | Auto-push invoices when marked Sent | Must Have |
| Customer Sync to QBO | Auto-sync customers (one-way, GC→QBO) | Must Have |
| Payment Pull from QBO | Daily pull, auto-match to invoices | Must Have |
| Field Mapping | Configurable GC → QBO field mappings | Must Have |
| Sync Status on Invoice | Show sync status, QBO #, timestamp on invoice detail | Must Have |
| Sync Error Handling | Detailed error logging, user notification, retry capability | Must Have |
| Sync Log | Searchable, filterable log of all sync events | Must Have |
| Test Connection | Verify QBO connection with test sync | Must Have |
| Test Sync | Create/delete test invoice to verify end-to-end sync | Should Have |
| Payment Matching | Match payments by customer + amount + date | Must Have |
| Unmatched Payment Review | Manual review interface for unmatched payments | Should Have |
| Sync Reporting | Daily/weekly email reports of sync status | Should Have |
| Connection Status Dashboard | Show QBO connection health on settings page | Must Have |
| Disconnect Option | Allow disconnecting QBO (revokes auth) | Should Have |
| Bi-directional Sync | Future: Sync some data back from QBO to GC (Phase 2) | Future |
| Multi-entity Support | Support if QBO has multiple entities (Phase 2) | Future |

### Data Requirements

**Table: ErpIntegration (new)**
- id (UUID)
- erp_type (enum: QUICKBOOKS_ONLINE, XERO, SAP, OTHER)
- is_enabled (boolean, default true)
- connection_status (enum: CONNECTED, DISCONNECTED, ERROR)
- oauth_token (encrypted string)
- oauth_refresh_token (encrypted string)
- oauth_expiry (timestamp)
- realm_id (string, QBO-specific)
- last_sync_timestamp (timestamp nullable)
- last_error_message (text nullable)
- created_at (timestamp)
- updated_at (timestamp)

**Table: ErpFieldMapping (new)**
- id (UUID)
- erp_integration_id (UUID, foreign key)
- gc_field_name (string, e.g., "customer_name")
- erp_field_name (string, e.g., "CustomerName")
- field_type (enum: TEXT, NUMBER, DATE, EMAIL, PHONE)
- is_custom (boolean, default false)
- created_at (timestamp)

**Table: SyncLog (new)**
- id (UUID)
- erp_integration_id (UUID, foreign key)
- sync_type (enum: INVOICE, CUSTOMER, PAYMENT, TEST)
- sync_direction (enum: PUSH, PULL)
- entity_type (enum: INVOICE, CUSTOMER, PAYMENT)
- entity_id (UUID nullable, foreign key to related entity)
- status (enum: SYNCED, PENDING, FAILED, SKIPPED)
- external_id (string nullable, e.g., QBO invoice #)
- error_message (text nullable)
- sync_data_json (JSON nullable, for debugging)
- synced_by_user (UUID nullable, if manual sync)
- created_at (timestamp)

**Table: PaymentMatch (new)**
- id (UUID)
- erp_integration_id (UUID, foreign key)
- external_payment_id (string, e.g., QBO payment ID)
- invoice_id (UUID, foreign key)
- matched_amount (decimal, $)
- match_confidence (decimal, 0-1, e.g., 0.95 for high confidence)
- match_method (enum: AUTOMATIC, MANUAL)
- matched_by_user_id (UUID nullable, if manual)
- external_payment_date (date)
- created_at (timestamp)

### Edge Cases

1. **Connection expired:** OAuth token expires; system shows error "QuickBooks connection expired. Please reconnect."
2. **QBO API rate limit:** If hit rate limit, queue sync and retry later with exponential backoff.
3. **Customer exists in QBO, different format:** Match by email or alternate fields.
4. **Invoice edited after sync:** Currently, edits not synced back (one-way push). Phase 2: Support updates.
5. **Deleted invoice:** If invoice deleted in GC post-sync, should delete/void in QBO (Phase 2 feature).
6. **Multi-currency invoices:** Current design assumes single currency per instance. Phase 2: Multi-currency.
7. **Partial payment in QBO:** Payment amount < invoice total. System records as partial and flags for review.
8. **Duplicate payment sync:** If payment appears twice in QBO pulls (data issue), deduplication logic prevents double-counting.
9. **Very old payments:** Daily pull looks back 7 days by default; older payments manually matched if needed.
10. **QBO customer with same name:** If multiple QBO customers have same name, system asks user to disambiguate (Phase 2).

### Integration Points

- **Invoice creation (PRD 12):** Invoice auto-syncs when marked Sent
- **Customer management (PRD 13):** Customers synced to QBO
- **Payment recording (PRD 12):** Payments pulled from QBO, auto-matched
- **Order completion:** Optional: sync order data to QBO (Phase 2)
- **Accounting reports (Phase 2):** Sync data enables P&L, trial balance, etc.

---

## PRD NEW-1: Operations Dashboard [CORE - Phase 1]

### Problem Statement

PSP owners/managers lack a simple home page that answers "how's my business doing right now?" Without basic operational visibility, they can't manage production bottlenecks, follow up on overdue jobs, or track financial health. A dashboard is a must-have for early adoption.

### Solution Overview

Create a simple, customizable operations dashboard showing: active jobs by status (visual count), overdue jobs (with click-through), jobs due today/this week (timeline), outstanding invoices, monthly revenue with trend, recent activity feed, and low-stock alerts. Dashboard loads on login for PSP roles. Cards are clickable for drill-down.

### User Stories

**US NEW-1.1: PSP Owner Sees Operations Dashboard on Login**
- As a PSP owner, I want to see a dashboard home page on login so that I immediately understand operations status.
- Acceptance Criteria:
  - Dashboard is default home page for Owner and Manager roles
  - Shows at a glance: # of active jobs, overdue jobs, outstanding invoices, monthly revenue
  - Loads in under 2 seconds with real-time data
  - All dashboard data refreshes every 5 minutes (auto-refresh)
  - Mobile responsive (looks good on tablet and desktop)

**US NEW-1.2: Dashboard Shows Active Jobs by Status**
- As a production manager, I want to see how many jobs are at each production step so that I can prioritize work.
- Acceptance Criteria:
  - Widget: "Active Jobs by Status"
  - Shows bar chart or status badge cards
  - Statuses: New → Pre-press → Printing → Post-press → QC → Packaging → Shipping
  - Count for each status (e.g., "5 in Pre-press, 12 in Printing, 3 in QC")
  - Total active jobs shown (e.g., "45 Active Jobs")
  - Click status to filter job list to that status
  - Color-coded by status (light → done, darker → current, brightest → bottleneck)

**US NEW-1.3: Dashboard Shows Overdue Jobs**
- As a production manager, I want to see jobs that are overdue so that I can expedite.
- Acceptance Criteria:
  - Widget: "Overdue Jobs"
  - Shows count: "3 Overdue" in red badge
  - List (or click-through): Job #, Customer, Due date, Days overdue, Current status
  - Click job to open job ticket detail
  - Sorted by days overdue (most overdue first)
  - Email alert sent daily if any overdue jobs

**US NEW-1.4: Dashboard Shows Jobs Due Today and This Week**
- As a production manager, I want to see upcoming jobs so that I can prioritize production.
- Acceptance Criteria:
  - Widget: "Due Today / This Week"
  - Two sections:
    - Due Today: List of jobs with today's due date
    - Due This Week: List of jobs due in next 7 days
  - Each job shows: Job #, Customer, Product, Current status, Hours until due
  - Sorted by due time (soonest first)
  - Color: Red if < 1 hour, orange if < 4 hours, yellow if < 24 hours
  - Click job to open ticket detail

**US NEW-1.5: Dashboard Shows Outstanding Invoices**
- As a bookkeeper, I want to see outstanding invoices at a glance so that I can manage collections.
- Acceptance Criteria:
  - Widget: "Outstanding Invoices"
  - Shows: Total $ amount outstanding, count of invoices, count overdue
  - Example: "$12,500 outstanding (8 invoices, 2 overdue)"
  - Click to filter invoice list to unpaid/partially paid
  - Color: Red if > $10K or > 10% of monthly revenue
  - Breakdown optional: Show oldest few invoices in widget

**US NEW-1.6: Dashboard Shows Revenue This Month**
- As an owner, I want to see monthly revenue so that I can track business health.
- Acceptance Criteria:
  - Widget: "Revenue This Month"
  - Shows: Gross revenue for calendar month-to-date
  - Comparison: Vs. last month (% change, up or down)
  - Example: "Revenue: $45,000 (↑ 12% vs. last month)"
  - Includes: Invoiced + paid
  - Chart (optional): Bar chart showing weekly revenue trend
  - Click to open detailed revenue report (Phase 2)

**US NEW-1.7: Dashboard Shows Recent Activity Feed**
- As an owner, I want to see recent actions so that I can stay aware of team activity.
- Acceptance Criteria:
  - Widget: "Recent Activity" (last 10 actions)
  - Shows: Timestamp, action type, entity, user
  - Actions: Order created, Estimate converted to order, Job completed, Invoice sent, Payment received, Note added
  - Example:
    - "2:15 PM - Order ORD-2026-0200 created for Acme Corp by Sarah"
    - "1:45 PM - Job #JOB-0456 completed by Mike (Printing dept)"
    - "1:30 PM - Invoice INV-202603-0847 sent by Bookkeeper"
    - "12:00 PM - Payment $1,851 received from XYZ Ltd"
  - Click entry to open related entity detail
  - Filter by: All, Orders, Jobs, Invoices, Payments

**US NEW-1.8: Dashboard Shows Low Stock Alerts**
- As an inventory manager, I want to see low-stock materials on the dashboard so that I can reorder.
- Acceptance Criteria:
  - Widget: "Low Stock Alerts" (if any)
  - Shows: Count of materials below reorder point
  - Example: "3 Materials Low Stock"
  - List: Material name, current qty, reorder point, days until estimated depletion
  - Color: Red if critical, yellow if low
  - "Create PO" button for each material
  - Click to open inventory detail page

### Detailed User Journeys

**Journey 1: Owner Logs In and Reviews Dashboard (Owner)**

1. Owner logs into GelatoConnect
2. Dashboard loads (default home page)
3. See overview:
   - "45 Active Jobs" card (center, prominent)
   - "3 Overdue Jobs" red badge (urgent)
   - "Outstanding: $12,500" card
   - "Revenue: $45,000" card
4. Notices "3 Overdue Jobs" - clicks badge
5. Dashboard updates/filters to show overdue job details:
   - Job #JOB-0456, Customer: ABC Corp, Due: March 14 (3 days overdue), Status: In QC
   - Job #JOB-0467, Customer: XYZ Ltd, Due: March 15 (2 days overdue), Status: In Printing
   - Job #JOB-0478, Customer: DEF Inc, Due: March 10 (5 days overdue), Status: In Post-press
6. Clicks Job #0456 to see QC status
7. Job ticket detail opens: Shows QC checklist, approver assignment
8. Owner notes issue and assigns rush priority
9. Returns to dashboard
10. Sees "Jobs Due Today/This Week":
    - Due Today: 5 jobs
    - Due This Week: 12 jobs
11. Scans and sees which departments are bottlenecks
12. Clicks "5 in Pre-press" (Active Jobs widget) to drill down
13. See all 5 pre-press jobs, identifies which needs expedited handling
14. Notes: Pre-press dept may need temporary support from another team

**Journey 2: Production Manager Starts Shift, Reviews Job Status (Manager)**

1. Manager logs in at 8 AM
2. Dashboard shows:
   - Active jobs by status: 5 Pre-press, 12 Printing, 3 QC, 6 Post-press, 8 Packaging, 11 Shipping
   - Overdue: 1 (new since yesterday)
   - Due Today: 5 jobs (must complete)
   - Lowest stock: Matte Paper (est. 1.5 days supply)
3. Sees email alert: "1 job overdue: JOB-0456 in QC"
4. Clicks overdue job to review and expedite
5. Checks "Due Today" widget:
   - 5 jobs all assigned to different departments
   - Three are in Post-press, two in QC
   - Two are critical path (due in < 2 hours)
6. Notifies Post-press and QC departments of timeline
7. Reviews low stock: Matte Paper below reorder point
8. Clicks "Create PO"
9. Navigates to GC Procurement module
10. Creates PO for 3,000 units Matte Paper
11. Returns to dashboard
12. Dashboard auto-refreshes every 5 min - no manual refresh needed

**Journey 3: Bookkeeper Starts Day, Reviews Collections (Bookkeeper)**

1. Bookkeeper logs in
2. Dashboard shows: Outstanding $12,500 (8 invoices, 2 overdue)
3. Clicks to see outstanding invoices:
   - Filter automatically applied in Invoice list
   - Sees all unpaid invoices
4. Prioritizes overdue invoices:
   - INV-202603-0801: 47 days overdue, $2,000
   - INV-202603-0820: 21 days overdue, $3,500
5. Clicks first invoice to send reminder
6. Sends payment reminder email
7. Returns to dashboard
8. Reviews "Recent Activity":
   - Sees "Payment received from Acme Corp: $1,851" (recorded earlier)
   - Sees "Invoice sent to XYZ Ltd: $3,500"
9. Dashboard revenue card shows updated balance
10. Prepares end-of-day deposit info for owner

### Screen/View Descriptions

**Screen NEW-1A: Operations Dashboard (New)**

**Location:** / (home page, default for Owner/Manager roles)

**Layout:**
- Header: "Operations Dashboard" | Last refresh: [time] | [Refresh Now] button | [Settings] (to customize)
- Grid layout (responsive, 2-3 columns on desktop, 1 column on mobile)

**Row 1: Key Metrics (4 cards)**
1. Active Jobs
   - Large number: 45
   - Label: "Active Jobs"
   - Mini chart or visual (optional bar chart showing trend)
   - Click to drill down

2. Overdue Jobs
   - Large red number: 3
   - Label: "Overdue Jobs"
   - Color: Red (urgent)
   - Click to see overdue job list

3. Outstanding Invoices
   - Large number: $12,500
   - Label: "Outstanding Invoices"
   - Subtext: "(8 invoices, 2 overdue)"
   - Color: Orange if > threshold
   - Click to filter invoice list

4. Revenue This Month
   - Large number: $45,000
   - Label: "Revenue This Month"
   - Subtext: "↑ 12% vs. last month"
   - Color: Green (positive)
   - Click to see detailed revenue report (Phase 2)

**Row 2: Job Status & Due Dates (2 wide widgets)**

1. Active Jobs by Status (left, full width or wider)
   - Title: "Active Jobs by Status"
   - Bar chart or status badge layout:
     - | New (1) | Pre-press (5) | Printing (12) | Post-press (6) | QC (3) | Packaging (8) | Shipping (11) |
   - Each status color-coded
   - Click any status to filter job list
   - Total at bottom: "45 Total Active"

2. Due Today / This Week (right, or below)
   - Title: "Due Today / This Week"
   - Two sections:
     - **Due Today (5 jobs):**
       - Job #JOB-0512, Customer: ABC Corp, Status: In Printing, Due: 2:00 PM (3.5 hrs)
       - Job #JOB-0515, Customer: XYZ Ltd, Status: In QC, Due: 5:00 PM (6 hrs)
       - ... (3 more)
     - **Due This Week (12 jobs):**
       - Job #JOB-0520, Customer: DEF Inc, Status: New, Due: Tomorrow, 8:00 AM
       - ... (11 more)
   - Color: Red < 1 hr, Orange < 4 hrs, Yellow < 24 hrs
   - Each row clickable to open job ticket

**Row 3: Financial & Inventory (2 wide widgets)**

1. Overdue Jobs List (left)
   - Title: "Overdue Jobs (3)"
   - Table:
     - Job # | Customer | Due Date | Days Overdue | Status | Actions
     - JOB-0456 | ABC Corp | Mar 14 | 3 days | In QC | [View] [Expedite]
     - JOB-0467 | XYZ Ltd | Mar 15 | 2 days | In Printing | [View]
     - JOB-0478 | DEF Inc | Mar 10 | 5 days | In Post-press | [View] [Expedite]
   - Click job to open ticket detail

2. Low Stock Alerts (right, or full width if no overdue jobs)
   - Title: "Low Stock Alerts (3)"
   - List:
     - 🔴 Matte Paper: 200 / 1,000 (Est. 1.5 days)
     - 🟡 Glossy Paper: 4,000 / 5,000 (Est. 4 days)
     - 🟡 Coating A: 5,000 / 4,000 (OK, but trending low)
   - [Create PO] button for each
   - Click to open material detail

**Row 4: Activity & Details (full width)**

1. Recent Activity Feed
   - Title: "Recent Activity (Last 10)"
   - Timeline view (or table):
     - 3:15 PM | Order ORD-2026-0200 created | Acme Corp | by Sarah E. | [View]
     - 2:45 PM | Job JOB-0512 completed | Printing Dept | by Mike | [View]
     - 2:30 PM | Invoice INV-202603-0850 sent | XYZ Ltd | by Bookkeeper | [View]
     - 1:00 PM | Payment $1,851 received | Acme Corp | Auto-recorded | [View]
     - 12:00 PM | Material Adjusted | Matte Paper | -500 units | [View]
     - ... (5 more)
   - Click any entry to drill down
   - Filter by type: All, Orders, Jobs, Invoices, Payments, Materials

### Functional Requirements

| Requirement | Details | Priority |
|---|---|---|
| Dashboard Home Page | Default for Owner/Manager roles on login | Must Have |
| Active Jobs by Status | Show count per status, visual bar chart | Must Have |
| Overdue Jobs Widget | Red badge, sortable list, click to drill-down | Must Have |
| Due Today/Week Widget | Timeline view, color-coded by urgency | Must Have |
| Outstanding Invoices | Total $, count, overdue count | Must Have |
| Monthly Revenue | Current month $ vs. last month % | Must Have |
| Recent Activity Feed | Last 10 actions, filterable | Must Have |
| Low Stock Alerts | Show materials below reorder point | Must Have |
| Auto-Refresh | Data refreshes every 5 minutes | Should Have |
| Mobile Responsive | Looks good on tablet and desktop | Must Have |
| Click-through Drill-down | Click widgets to open filtered lists | Must Have |
| Customizable Widgets | Future: Allow users to hide/rearrange widgets (Phase 2) | Future |
| Alerts & Notifications | Red badges for critical items (overdue, low stock) | Must Have |

### Data Requirements

**No new tables required.** Dashboard queries existing tables:
- Job (for active jobs, overdue, due dates)
- Invoice (for outstanding balance)
- Material & Inventory (for low stock)
- Activity/AuditLog (for recent activity feed)

### Edge Cases

1. **No active jobs:** Dashboard shows "0 Active Jobs" gracefully, no data for status breakdown.
2. **No overdue jobs:** Widget shows "0 Overdue" in green.
3. **No low stock alerts:** Widget hidden or shows "All inventory in stock" message.
4. **Slow database:** If data takes > 2 sec to load, show skeleton loaders while data fetches.
5. **Empty activity feed:** Show "No recent activity" message.
6. **Timezone handling:** Due times respect user/company timezone.
7. **Multi-location shops:** Dashboard shows aggregated data across all locations (Phase 2: per-location views).
8. **Mobile view:** Stack widgets vertically on small screens.

### Integration Points

- **Job management (existing):** Active jobs query pulls from Job table with current status
- **Order management (PRD 2):** Recent activity includes order creation events
- **Invoicing (PRD 12):** Outstanding invoices calculated from Invoice.balance_due
- **Inventory (PRD 11):** Low stock alerts from Material.available vs. reorder_point
- **Production workflow (new PRD NEW-2):** Job status widget depends on configurable workflow steps

---

## PRD NEW-2: Configurable Job Status Workflow [CORE - Phase 1]

### Problem Statement

Every print shop has different production steps. A digital print shop's workflow is: Pre-press → Printing → QC → Shipping. An offset shop has: Pre-press → Plate Making → Printing → Finishing → QC → Shipping. Label shops add Die Cutting and Rewinding. A fixed workflow built into the system doesn't fit the market diversity. PSPs need to define their own workflow based on their equipment, processes, and quality standards.

### Solution Overview

Create a workflow template system where admins define production steps, order them, set properties (manual/automatic, sequential/parallel, requires scan), and map to product categories. Default templates provided for common types (Digital, Offset, Packaging, Labels). PSPs customize by creating their own templates. Jobs created from orders auto-assigned the correct workflow. Job tickets display workflow steps and track progress.

### User Stories

**US NEW-2.1: Admin Defines Custom Workflow Template**
- As a shop admin, I want to create a custom production workflow so that jobs flow through our specific processes.
- Acceptance Criteria:
  - Settings > Production > Workflow Templates page
  - "Create New Workflow" button
  - Workflow template form:
    - Name: e.g., "Commercial Digital (Custom)"
    - Description: Optional, e.g., "Our standard digital order process"
    - Step list (ordered, drag to reorder):
      - Step 1: Pre-press | Type: Manual | Required: Yes | Requires Scan: No
      - Step 2: Printing | Type: Manual | Required: Yes | Requires Scan: Yes (start & end)
      - Step 3: Lamination (optional) | Type: Manual | Required: No | Requires Scan: No
      - Step 4: Quality Check | Type: Manual | Required: Yes | Requires Scan: Yes (end only)
      - Step 5: Packaging | Type: Manual | Required: Yes | Requires Scan: No
      - Step 6: Shipping | Type: Manual | Required: Yes | Requires Scan: Yes (end only)
    - For each step: Can set properties
  - "Save Template" button creates template
  - Template version controlled (can revert if needed)

**US NEW-2.2: Admin Maps Workflow to Product Categories**
- As a shop admin, I want to assign workflows to product categories so that orders auto-use the right workflow.
- Acceptance Criteria:
  - Product Category page (or Workflow Settings)
  - Each category has "Assigned Workflow" dropdown
  - Example assignments:
    - Category: "Commercial Digital" → Workflow: "Digital Standard"
    - Category: "Packaging" → Workflow: "Packaging with Lamination"
    - Category: "Labels" → Workflow: "Labels with Die-cut"
  - Multiple categories can map to same workflow
  - Can override workflow per order (if different spec needed)

**US NEW-2.3: Admin Uses Step Library and Creates Custom Steps**
- As a shop admin, I want to use pre-defined steps or create custom ones so that workflows reflect our exact process.
- Acceptance Criteria:
  - Step Library: Pre-built steps (Pre-press, Printing, Cutting, Folding, Binding, Lamination, Die Cutting, Rewinding, QC, Packaging, Shipping)
  - Each step in library has: Name, Type (Manual/Automatic), Default duration (hours)
  - "Create Custom Step" button for steps not in library
  - Custom step form: Name, Description, Type, Estimated duration, Equipment involved (optional)
  - Custom steps stored and available for future workflows

**US NEW-2.4: Workflow Has Parallel and Optional Steps**
- As a shop admin, I want some steps to run in parallel and some to be optional so that workflows match reality.
- Acceptance Criteria:
  - Step properties:
    - Sequence type: Sequential (must complete before next) | Parallel (can run simultaneously with others)
    - Required: Yes | No (optional steps can be skipped)
  - Example workflow:
    - Steps 1-2: Sequential (Pre-press → Printing)
    - Steps 3A & 3B: Parallel (Lamination & Quality Check can happen at same time)
    - Step 4: Sequential after 3A & 3B (Packaging)
  - Job ticket shows parallel steps grouped horizontally
  - Can mark parallel steps as "Complete" independently

**US NEW-2.5: Job Auto-assigned Correct Workflow**
- As the system, I want to assign the correct workflow to new jobs so that they follow the right process.
- Acceptance Criteria:
  - Order created with product category
  - Order converts to Job (or Job created from Order)
  - System looks up: Product Category → Assigned Workflow
  - Assigns workflow template to job
  - Job ticket shows workflow steps in order
  - If no mapping found, show admin warning + allow manual assignment
  - Workflow locked at job creation time (can't retroactively change)

**US NEW-2.6: Job Ticket Shows Workflow with Progress**
- As a production user, I want to see job progress through workflow steps so that I know what comes next.
- Acceptance Criteria:
  - Job ticket detail shows workflow as:
    - Linear progress bar: [ ✓ Pre-press ] → [ ✓ Printing ] → [ ▶ QC ] → [ ⦿ Packaging ] → [ ⦿ Shipping ]
    - Or card layout showing current step highlighted, others grayed out
  - Each step shows: Step name, status (Not Started / In Progress / Complete), assigned dept/person, duration
  - Click step to open detail or reassign
  - Mark steps complete with [Complete Step] button
  - Required steps must be completed before job considered "Done"

**US NEW-2.7: Rules Engine Auto-includes Steps Based on Conditions**
- As a shop admin, I want rules that auto-include optional steps based on order specs so that complex products have right workflow.
- Acceptance Criteria:
  - Workflow Rule Builder (optional, advanced):
    - Example: "If product category = Packaging AND has lamination = Yes, then include Lamination step"
    - Example: "If qty > 10,000, include QC step, else optional"
  - Rules evaluated when order converts to job
  - Step added if rule condition met
  - Bookkeeper can see which rules triggered in job ticket

### Detailed User Journeys

**Journey 1: Admin Sets Up Custom Workflow for Digital + Lamination (Admin)**

1. Admin navigates to Settings > Production > Workflow Templates
2. Sees default templates:
   - Digital Standard (5 steps)
   - Offset Standard (7 steps)
   - Packaging Standard (6 steps)
   - Labels Standard (8 steps)
3. Clicks "Create New Workflow"
4. Form opens:
   - Name: "Digital with Lamination"
   - Description: "Digital orders that include lamination process"
5. Step list (drag-and-drop UI):
   - Add Step 1: Pre-press (from library)
   - Add Step 2: Printing (from library)
   - Add Step 3: Lamination (from library, optional)
   - Add Step 4: Quality Check (from library, required)
   - Add Step 5: Packaging (from library)
   - Add Step 6: Shipping (from library)
6. For Step 3 (Lamination):
   - Toggle: Required: OFF (optional)
   - Set: Requires Scan: NO
7. For Step 4 (Quality Check):
   - Set: Requires Scan: YES (requires operator to scan start and end)
8. Saves template
9. Admin sees template created, version 1
10. Now admin navigates to Product Categories
11. Finds category: "Posters with Lamination"
12. Sets "Assigned Workflow" dropdown to: "Digital with Lamination"
13. Saves
14. All future orders in "Posters with Lamination" category will use this workflow

**Journey 2: New Order Created and Auto-assigned Workflow (Estimator → Production Manager)**

1. Estimator creates estimate for "100,000 Posters, 4-color digital, with gloss lamination"
2. Selects product category: "Posters with Lamination"
3. Estimate created and sent to customer
4. Customer accepts, order converted
5. System creates Job from Order
6. Job creation logic:
   - Looks up Product Category: "Posters with Lamination"
   - Finds Assigned Workflow: "Digital with Lamination"
   - Creates Job with workflow steps:
     - Pre-press (required, sequential)
     - Printing (required, sequential)
     - Lamination (optional, sequential)
     - Quality Check (required, sequential, requires scan)
     - Packaging (required, sequential)
     - Shipping (required, sequential)
7. Job ticket displays workflow progress bar:
   - [ ] Pre-press → [ ] Printing → [ ] Lamination → [ ] QC → [ ] Packaging → [ ] Shipping
   - Current step: Pre-press (highlighted)
8. Production manager opens job ticket
9. Assigns Pre-press to John (Pre-press dept)
10. John starts Pre-press, system shows step "In Progress"
11. John completes Pre-press, clicks "Complete Pre-press"
12. Progress bar updates: [ ✓ Pre-press ] → [ ] Printing → ...
13. Printing step now active and assigned to Press 1
14. Job automatically flows through workflow

**Journey 3: Admin Creates Custom Step for Rewinding (Admin)**

1. Admin setting up new workflow for "Labels"
2. Starts with Label template, but needs to add "Rewinding" step
3. Step library doesn't have a specific Rewinding step
4. Clicks "Create Custom Step"
5. Form opens:
   - Name: "Rewinding"
   - Description: "Rewind die-cut labels onto rolls"
   - Type: Manual
   - Estimated Duration: 2 hours
   - Equipment: Label Rewinder, Model XYZ
   - Station/Dept: Label Finishing
6. Saves custom step
7. Step now available in library for future workflows
8. Admin adds to Labels workflow:
   - ... Pre-press → Printing → Die Cutting → Rewinding → QC → Packaging → Shipping
9. Saves workflow
10. All future label orders use this workflow with Rewinding step

**Journey 4: Complex Order with Parallel Steps (Production Manager)**

1. Order for complex packaging job with multiple simultaneous processes
2. Workflow assigned: "Packaging Advanced"
3. Workflow has parallel steps:
   - Sequential: Pre-press → Printing
   - Parallel: Lamination & Embossing (can happen at same time)
   - Sequential after: QC → Packaging → Shipping
4. Job ticket shows:
   ```
   Pre-press → Printing → [Lamination & Embossing] → QC → Packaging → Shipping
   ```
5. Lamination and Embossing steps shown side-by-side on job ticket
6. Manager can mark each step complete independently
7. QC step only becomes available after BOTH Lamination AND Embossing are complete
8. Tracking shows: "Printing done, Lamination in progress, Embossing complete, waiting for Lamination..."

### Screen/View Descriptions

**Screen NEW-2A: Workflow Templates List (New)**

**Location:** /settings/production/workflows

**Layout:**
- Header: "Production Workflows"
- "Create New Workflow" button
- Toolbar: Filter (By type), Search by name
- Table of templates:
  - Columns: Name | Steps | Categories Using | Status | Actions
  - Rows:
    - Digital Standard | 5 steps | 3 categories | Active | [View] [Duplicate] [Delete]
    - Offset Standard | 7 steps | 2 categories | Active | [View] [Duplicate] [Delete]
    - Digital with Lamination | 6 steps | 1 category | Active | [View] [Edit] [Delete]
    - Packaging with Embossing | 8 steps | 0 categories | Active | [View] [Edit] [Delete]
  - Click name to view/edit workflow

**Screen NEW-2B: Workflow Template Editor (New)**

**Location:** /settings/production/workflows/[workflowId]/edit

**Layout:**
- Header: "Edit Workflow: Digital with Lamination"
- Section 1: Workflow Details
  - Name: "Digital with Lamination" [text field]
  - Description: "Digital orders with lamination coating" [text area]
  - Version: 1
  - Created: March 1, 2026
  - [Save Workflow] [Cancel] [Duplicate] buttons
- Section 2: Steps (drag-and-drop list)
  - Header: "Steps (6 total)"
  - Drag handles on left for each step
  - Step rows (reorderable by drag):
    - ⋮⋮ Pre-press | Manual | Required: Yes | Scan: No | Assigned To: Dept [dropdown] | Est. Duration: 1 hr | [Configure] [Remove]
    - ⋮⋮ Printing | Manual | Required: Yes | Scan: Yes | Assigned To: Press Dept | Est. Duration: 4 hrs | [Configure] [Remove]
    - ⋮⋮ Lamination | Manual | Required: No | Scan: No | Assigned To: Finishing | Est. Duration: 1 hr | [Configure] [Remove]
    - ⋮⋮ Quality Check | Manual | Required: Yes | Scan: Yes | Assigned To: QC Dept | Est. Duration: 1 hr | [Configure] [Remove]
    - ⋮⋮ Packaging | Manual | Required: Yes | Scan: No | Assigned To: Packaging | Est. Duration: 2 hrs | [Configure] [Remove]
    - ⋮⋮ Shipping | Manual | Required: Yes | Scan: Yes | Assigned To: Shipping | Est. Duration: 1 hr | [Configure] [Remove]
  - "Add Step" button (dropdown or modal to select from library or create custom)
- Section 3: Assigned Categories
  - Shows categories using this workflow: "Posters with Lamination", "Digital Print (Gloss)"
- [Save Workflow] [Cancel] buttons at bottom

**Screen NEW-2C: Configure Step Modal**

**Location:** Appears when clicking [Configure] on a step in editor

**Layout:**
- Modal title: "Configure Step: Lamination"
- Form fields:
  - Step name: "Lamination" [text field]
  - Type: [Dropdown] Manual | Automatic
  - Sequence: [Dropdown] Sequential | Parallel
  - Required: [Checkbox] Yes | No
  - Requires Scan: [Checkbox] No | Start only | End only | Both
  - Estimated Duration: [Number field] hours, minutes
  - Assigned Department/Station: [Dropdown]
  - Instructions Template: [Text area, optional] e.g., "Apply gloss coating, ensure even coverage"
  - Color: [Color picker, optional] for visual identification on job tickets
- [Save Configuration] [Cancel] buttons

**Screen NEW-2D: Job Ticket - Workflow Progress (Modified)**

**Location:** /jobs/[jobId]

**New Section: Workflow Progress**

**Layout:**
- Card titled: "Workflow Progress"
- Linear progress visualization:
  ```
  [✓ Pre-press] → [✓ Printing] → [▶ Lamination] → [ ] QC → [ ] Packaging → [ ] Shipping
   COMPLETE        COMPLETE        IN PROGRESS    PENDING   PENDING    PENDING
  ```
  - Color coding:
    - Green ✓: Completed steps
    - Blue ▶: Current/in-progress step
    - Gray: Not started/pending steps
  - Optional: % Progress bar (e.g., "50% Complete")

- Steps Table (below progress bar):
  - Columns: Step # | Name | Status | Assigned To | Duration | Scan Required | Start Time | End Time | Actions
  - Rows:
    - 1 | Pre-press | Complete | John (Pre-press Dept) | 1 hr | No | 8:00 AM | 9:15 AM | [View]
    - 2 | Printing | Complete | Press Dept 1 | 4 hrs | Yes | 9:15 AM | 1:30 PM | [View] [Rescan]
    - 3 | Lamination | In Progress | Mary (Finishing) | 1 hr | No | 1:30 PM | — | [Complete Step] [Pause] [Reassign]
    - 4 | QC | Pending | — | 1 hr | Yes | — | — | [Start] [Assign To...]
    - 5 | Packaging | Pending | — | 2 hrs | No | — | — | [Start] [Assign To...]
    - 6 | Shipping | Pending | — | 1 hr | Yes | — | — | [Start] [Assign To...]

  - Click step row to expand and see details
  - [Complete Step] button for in-progress step
  - [Start] button for pending step (marks as in-progress, assigns to current user)

### Functional Requirements

| Requirement | Details | Priority |
|---|---|---|
| Workflow Templates | Predefined and custom templates for different product types | Must Have |
| Workflow Customization | Admins can create/edit/delete custom workflows | Must Have |
| Default Templates | Digital, Offset, Packaging, Labels workflows provided | Must Have |
| Drag-to-Reorder Steps | UI for ordering workflow steps | Must Have |
| Step Properties | Manual/Automatic, Sequential/Parallel, Required/Optional, Scan required | Must Have |
| Step Library | Pre-built steps + ability to create custom steps | Must Have |
| Category-to-Workflow Mapping | Assign workflows to product categories | Must Have |
| Auto-assignment | Jobs auto-assigned correct workflow on creation | Must Have |
| Job Ticket Display | Shows workflow progress with current/pending steps | Must Have |
| Parallel Steps | Support steps that run simultaneously | Should Have |
| Optional Steps | Support steps that can be skipped | Should Have |
| Rules Engine | Auto-include steps based on conditions (Phase 2) | Future |
| Workflow Versioning | Track changes, ability to revert | Nice to Have |
| Estimated Durations | Track step durations for scheduling | Should Have |
| Department Assignment | Assign steps to specific depts/stations | Should Have |
| Scan Tracking | Require scans at step start/end for tracking | Nice to Have |

### Data Requirements

**Table: WorkflowTemplate (new)**
- id (UUID)
- name (string, e.g., "Digital Standard")
- description (text nullable)
- is_default (boolean)
- version (integer)
- is_active (boolean)
- created_by_user_id (UUID)
- created_at (timestamp)
- updated_at (timestamp)

**Table: WorkflowStep (new)**
- id (UUID)
- workflow_template_id (UUID, foreign key)
- step_order (integer)
- step_name (string, e.g., "Pre-press")
- step_type (enum: MANUAL, AUTOMATIC)
- sequence_type (enum: SEQUENTIAL, PARALLEL)
- is_required (boolean)
- scan_required (enum: NONE, START, END, BOTH)
- estimated_duration_minutes (integer nullable)
- assigned_department (string nullable)
- instructions_template (text nullable)
- color_hex (string nullable)
- created_at (timestamp)

**Table: ProductCategoryWorkflowMapping (new)**
- id (UUID)
- product_category_id (UUID, foreign key)
- workflow_template_id (UUID, foreign key)
- created_at (timestamp)

**Table: JobWorkflowInstance (new)**
- id (UUID)
- job_id (UUID, foreign key, unique)
- workflow_template_id (UUID, foreign key)
- is_complete (boolean)
- created_at (timestamp)

**Table: JobStepInstance (new)**
- id (UUID)
- job_workflow_instance_id (UUID, foreign key)
- workflow_step_id (UUID, foreign key)
- step_order (integer)
- status (enum: NOT_STARTED, IN_PROGRESS, PAUSED, COMPLETE, SKIPPED)
- assigned_to_user_id (UUID nullable)
- assigned_to_department (string nullable)
- start_time (timestamp nullable)
- end_time (timestamp nullable)
- duration_actual_minutes (integer nullable, calculated)
- scan_data (JSON nullable, for scan tracking)
- notes (text nullable)
- created_at (timestamp)
- updated_at (timestamp)

### Edge Cases

1. **Workflow changed after job created:** Job locked to workflow at creation time; changes don't affect in-progress jobs.
2. **All optional steps skipped:** Job can still be "Complete" if all required steps done.
3. **Parallel steps, one blocked:** Other parallel steps can proceed; blocked step holds up dependent sequential steps.
4. **No workflow assigned:** If order's category has no mapped workflow, show admin warning + allow manual assignment on job creation.
5. **Custom step with same name as library step:** Allow, but different IDs (library vs. custom).
6. **Delete workflow in use:** Prevent deletion if active jobs use it. Show warning "X jobs using this workflow."
7. **Revert to old workflow version:** Support undo/rollback of workflow changes (Phase 2).
8. **Estimated duration exceed available time:** If job due soon and workflow durations sum to > available hours, flag as "At Risk" on job ticket.

### Integration Points

- **Orders/Jobs (existing):** Job creation triggers workflow assignment
- **Product configuration (PRD 2):** Product categories mapped to workflows
- **Job tickets (new):** Workflow steps displayed on job detail
- **Production tracking:** Step completion timestamps tracked
- **Dashboard (PRD NEW-1):** Active jobs by status uses current workflow step counts
- **Inventory allocation (PRD 11):** Optional: track material consumption by workflow step

---

END OF COMPREHENSIVE PRDS

# Phase 2 PRDs: GelatoConnect MIS Advanced Features

**Version:** 1.0
**Date:** March 19, 2026
**Target Delivery:** Post-May 1, 2026

> **Implementation Note for Claude Code:** Phase 2 features are designed to be built on top of the Phase 1 foundation. When implementing Phase 2, check that Phase 1 APIs and data models already support the extension points needed. For example, the Customer Portal (PRD 15) reads from the same order, job ticket, and invoice data created in Phase 1. AI Scheduling (PRD 16) extends the production step configuration from PRD 3. Design Phase 1 data models with these Phase 2 extensions in mind - add nullable fields or JSON extension columns where future data will be needed.

---

## PRD 15: Customer Portal (WS1 Extension)

**Classification:** Advanced
**Target Users:** Print customers, order managers, production managers

### 1. Problem Statement

Currently, print customers have no visibility into their orders once submitted to the PSP. They cannot:
- Track order status in real-time
- View proofs and approve/reject them
- Access invoices and payment records
- Manage repeat orders efficiently
- Communicate with PSP about order issues

PSPs must handle all customer inquiries manually, creating support burden and poor customer experience.

### 2. Solution Overview

Build a self-service customer portal accessible via Gelato account or SSO that provides:
- Real-time order tracking and status visibility
- Proof approval workflow with built-in collaboration
- Invoice and payment management
- Order history with easy reorder capability
- Support ticket creation and tracking
- Downloadable job files and specifications

Portal integrates with core MIS order data (US-4.1 through US-4.7) and leverages existing Gelato customer authentication.

### 3. User Stories

**US-4.1: Customer Order Lookup and Tracking**

As a print customer
I want to see all my orders with current status
So that I know where my jobs are in production

Acceptance Criteria:
- Customer can access portal via Gelato account login or SSO
- Dashboard shows list of all customer orders (submitted within last 24 months)
- Each order displays: Order ID, order date, product type, quantity, expected delivery, current status
- Status updates in real-time as job moves through MIS workflow stages
- Customer can filter by date range, product type, status
- Search by order ID or reference number
- Pagination for customers with 100+ orders
- Mobile-responsive interface
- Portal available 24/7 with 99.9% uptime SLA

**US-4.2: Detailed Order View**

As a print customer
I want to see complete order details and specifications
So that I can confirm accuracy and track specifics

Acceptance Criteria:
- Clicking on order shows full details: customer name, delivery address, billing address, order date, specifications
- Display product specifications: substrate type, quantity, dimensions, finishing options, color specification
- Show order value broken down by item cost, setup fees, finishing charges, shipping
- Display all associated files: proof files, final production files, specifications document
- Show production timeline: expected start, expected completion, expected delivery
- View all notes and communication on order (internal PSP notes visible only if customer-facing flag set)
- Download capability for all files and specifications as PDF
- Order change history (what was modified and when)

**US-4.3: Proof Approval Workflow**

As a print customer
I want to review and approve proofs before production starts
So that I can ensure quality before manufacturing

Acceptance Criteria:
- When MIS generates proof, customer is notified via email with portal link
- Portal displays proof with annotation tools: highlight, comment, draw markup
- Customer can approve, request changes, or reject with reason
- Comments and markups sync in real-time if multiple stakeholders reviewing
- Approval deadline visible (e.g., "Please approve by 5pm Friday")
- Approval chain: if order has multiple approvers, show approval status from each
- Mobile markup capability for remote approvals
- Proof history: view all versions and which was approved
- PSP can see customer feedback immediately and respond with revised proofs
- Automatic notification when revised proof uploaded
- Documented approval record attached to order for compliance
- Integration with MIS proof status workflow (US-3.3)

**US-4.4: Invoice and Payment Management**

As a print customer
I want to view and manage invoices and payments
So that I can reconcile accounts and pay bills efficiently

Acceptance Criteria:
- Invoices tab shows all invoices for orders from this customer
- Display invoice number, date, amount, payment status, due date
- Filter by status: unpaid, partially paid, paid, overdue
- Download invoice as PDF (includes order details, itemization, payment terms)
- Payment link to pay via Stripe with saved payment methods
- Show payment history with transaction IDs and dates
- Email invoice automatically when order is invoiced (unless customer opts out)
- Bulk download capability (export multiple invoices as ZIP)
- Integration with GC Finance system for real-time invoice data
- Support for multiple currencies (follows customer account settings)
- Itemized view showing per-item cost and charges

**US-4.5: Order Reorder and Templates**

As a print customer
I want to quickly reorder similar products
So that I don't have to re-enter specifications

Acceptance Criteria:
- "Reorder" button on any completed order
- Clicking reorder pre-fills new order form with previous specifications
- Customer can modify any specification before submitting
- "Save as template" option to save favorite configurations
- Templates tab shows saved order templates with last-used date
- Can create new estimate from template
- Template versioning: if PSP updates substrate availability, customer sees notification
- Share templates with team members (if multi-user account)
- Bulk reorder: select multiple orders from same product type and submit as batch
- Integration with AI Estimator for pricing on reorders

**US-4.6: Support and Communication**

As a print customer
I want to communicate with my PSP about order issues
So that problems are resolved quickly

Acceptance Criteria:
- Support ticket creation from order view
- Ticket form includes: issue type (quality, late delivery, incorrect spec, other), description, attachments
- Ticket auto-linked to relevant order
- Customer receives ticket number and tracking link
- Real-time notification when PSP responds to ticket
- Chat-style communication thread visible in portal
- PSP can attach files to tickets (revised proof, status update, etc.)
- Ticket status: open, in-progress, resolved, closed
- Ability to reopen resolved tickets
- Satisfaction survey after ticket closure
- Integration with GC support system for metrics and SLA tracking

**US-4.7: Account Management**

As a print customer with multiple users
I want to manage team access to portal
So that my team can track orders without sharing my account

Acceptance Criteria:
- Account admin can invite team members with email
- Role-based access: viewer (read-only), approver (can approve proofs), admin (manage users)
- Invited users create their own password or use SSO
- Admin can revoke access immediately
- Audit log shows who accessed what and when
- User can set preferences: notification frequency, communication channels (email, SMS)
- Option to disable account notifications and use Slack integration instead
- Dark mode support for portal interface
- Multi-language support (English, Spanish, German, French, Italian)
- API access for integration with customer's own systems (premium feature)

### 4. Functional Requirements

**Portal Architecture:**
- Standalone web application (separate from MIS backend, but integrated data)
- Authentication: OAuth 2.0 with Gelato account system, optional SAML SSO for enterprise
- Database: PostgreSQL with real-time updates via WebSocket for status changes
- Frontend: React with TypeScript, responsive design
- API: GraphQL endpoint for portal to query order and customer data
- CDN distribution for global performance
- Rate limiting: 100 requests per minute per customer to prevent abuse

**Real-time Updates:**
- WebSocket connection updates order status, proof status, invoice status
- Push notifications via email and optional SMS for status changes
- Fallback to polling (every 30 seconds) if WebSocket unavailable
- Client-side caching to reduce API calls

**Proof Annotation:**
- Drawing tools: freehand, line, rectangle, circle, arrow, text box
- Color picker for drawing
- Undo/redo functionality
- Erase tool
- Save annotations as image or PDF
- Comment threads on specific areas of proof
- Version control: keep all annotation iterations

**Security:**
- All data encrypted in transit (TLS 1.3)
- Customer can only view orders belonging to their organization
- PSP can see all customer portal activity (for support and audit)
- Rate limiting on API endpoints
- GDPR compliance: data retention, right to deletion
- SOC 2 Type II compliance
- Regular security audits and penetration testing

**Mobile Experience:**
- Responsive design for all screen sizes
- Native iOS and Android apps (optional Phase 2.1) with offline viewing of downloaded documents
- Touch-optimized proof markup
- Mobile payments via Apple Pay and Google Pay
- PWA support for progressive web app functionality

**Integration Points:**
- MIS backend: real-time order status data
- GC Finance system: invoice and payment data
- GC Auth system: customer authentication
- Stripe: payment processing
- SendGrid: email notifications
- Optional: Slack integration, Zapier integration
- Optional: SSO providers (Okta, Microsoft Entra, Google Workspace)

**Performance Requirements:**
- Page load: < 2 seconds on 4G connection
- Search results: < 500ms
- Real-time status updates: < 3 seconds after MIS state change
- 99.9% uptime SLA with 24-hour maintenance window

### 5. Data Requirements

**Customer Portal User Table:**
```
portal_users:
  - user_id (UUID, PK)
  - gelato_customer_id (FK to GC Customers)
  - email
  - first_name
  - last_name
  - role (viewer, approver, admin)
  - created_at
  - last_login_at
  - active (boolean)
  - preferences (JSON: notification_frequency, language, darkmode, sms_enabled)
```

**Order Visibility Cache:**
```
customer_order_visibility:
  - customer_id (FK)
  - order_id (FK to MIS Orders)
  - visible (boolean)
  - can_approve_proof (boolean)
  - last_updated
```

**Proof Approval Records:**
```
proof_approvals:
  - approval_id (UUID, PK)
  - proof_id (FK to MIS Proofs)
  - customer_user_id (FK to portal_users)
  - status (approved, rejected, requested_changes)
  - approved_at
  - comment
  - annotations (JSON: array of markup objects)
  - revision_count
```

**Support Tickets:**
```
support_tickets:
  - ticket_id (UUID, PK)
  - order_id (FK)
  - customer_user_id (FK)
  - title
  - description
  - issue_type (quality, late_delivery, incorrect_spec, other)
  - status (open, in_progress, resolved, closed)
  - created_at
  - resolved_at
  - satisfaction_rating (1-5)
  - messages (array of chat objects with timestamp, user, message, attachments)
```

**Order Templates:**
```
order_templates:
  - template_id (UUID, PK)
  - customer_id (FK)
  - name
  - description
  - specifications (JSON: full order spec)
  - created_at
  - last_used_at
  - usage_count
  - shared_with (array of customer_ids)
```

**Portal Activity Audit:**
```
portal_audit_log:
  - log_id (UUID, PK)
  - user_id (FK)
  - action (viewed_order, approved_proof, downloaded_invoice, created_ticket)
  - resource_id (order_id, proof_id, etc.)
  - timestamp
  - ip_address
```

### 6. Edge Cases

- Customer submits order while logged in, then logs out and logs back in during production: portal should show updated status
- Multi-user approval: two approvers attempt to approve same proof simultaneously → timestamp order, show which approved first
- Customer requests revision after production starts: show warning that changes may delay delivery and incur charges
- Invoice generated before order completes: show provisional invoice with "final" flag set to false, update to final when order complete
- Proof not available (PSP doing manual production): portal should show "Proof approval not required" status
- Customer account has no orders: show empty state with helpful messaging
- Portal access during 2FA or account recovery: show secure challenge
- Proof file corrupted or unavailable: show placeholder with contact support option
- Large order with 500+ variations: paginate or group variations intelligently
- Customer deleted from Gelato account: revoke all portal access immediately
- Timezone handling: show all dates in customer's timezone preference
- Language preference changes mid-session: reflect immediately
- Customer browser doesn't support WebSocket: gracefully degrade to polling
- High-volume burst (100 customers viewing same order update): use caching to prevent thundering herd

### 7. Out of Scope

- Purchase order management (customers submit POs via email to PSP)
- Subscription or recurring billing (handled by GC Finance, not portal)
- Supplier visibility (suppliers have separate Gelato Procurement portal)
- Returns and warranty claims (handled by GC customer service)
- Customization of portal branding per customer (PSP branding only)
- Video training embedded in portal (available via separate knowledge base)
- Live chat with PSP support (support tickets only, async)
- Integration with customer's internal ERP systems (future API feature)
- Proof approval with legal signatures (basic approval only)

### 8. Integration Points

- **MIS Orders & Status:** Read real-time order status, product specs, file paths
- **MIS Proofs:** Read proof status, fetch proof files, write approval records
- **MIS Invoices:** Read invoice data, invoice status, line items
- **GC Finance:** Sync invoice and payment data
- **GC Auth:** OAuth 2.0 authentication, customer account lookup
- **Stripe:** Payment processing for invoices
- **SendGrid:** Email notifications for order status, proof uploads, invoice due dates
- **Slack:** Optional integration to post ticket updates to PSP Slack workspace
- **GC Support:** Ticket creation and tracking

---

## PRD 16: AI Scheduling (WS2 Extension)

**Classification:** Advanced
**Target Users:** Production managers, shift planners, technical integrators

### 1. Problem Statement

Current scheduling in MIS is manual:
- Production manager manually assigns jobs to machines
- No optimization for machine utilization or delivery dates
- No visibility into queue depth and bottlenecks
- PSPs miss on-time delivery targets because scheduling is reactive
- Complex jobs with multiple production steps require manual coordination

Advanced PSPs need automated scheduling that:
- Respects press constraints (substrate width, ink colors, finishing capability)
- Optimizes for delivery date or machine utilization
- Considers multi-step workflows (e.g., print → fold → cut)
- Allows manual override for rush jobs or special handling
- Provides visibility into Gantt timeline and resource utilization

### 2. Solution Overview

Build an AI-powered scheduling engine that:
1. **Press-First Optimization:** Prioritizes matching job specs to available press capacity
2. **Substrate-Based Scheduling:** Considers substrate availability and setup time
3. **Timeline Visualization:** Gantt-style view showing job queues and press utilization
4. **Multi-Step Workflows:** Handles jobs requiring multiple production stages (print → fold → finish)
5. **Manual Override:** Allow production manager to move jobs, lock schedules, or force priority
6. **Optimization Modes:** Minimize makespan, meet delivery dates, maximize machine utilization
7. **Constraint Handling:** Respect substrate availability, finishing queue, drying time between steps
8. **Integration with AI Estimator:** Use estimated production time from AI Estimator pricing model

Scheduling engine runs on production schedule (nightly or on-demand) and generates:
- Job assignment to specific press and time window
- Production start and end times
- Estimated delivery date based on post-production steps
- Alerts for deadline misses or resource conflicts

> **Implementation Note:** AI Scheduling extends the production step configuration from PRD 3 and the production tracking from PRD 6. The scheduling agent should read the configured production steps, machine capabilities, and current job queue to optimize scheduling. The prototype walkthrough describes an AI agent on the right side of the scheduling interface that surfaces ganging opportunities and schedule optimizations. This agent should use the same ConnectAI infrastructure used by the AI Estimator.

### 3. User Stories

**US-5.1: View Production Schedule (Gantt View)**

As a production manager
I want to see production schedule for all presses in a Gantt view
So that I can identify bottlenecks and coordinate workflow

Acceptance Criteria:
- Dashboard shows Gantt chart with horizontal axis = time, vertical axis = machines
- Each job displayed as horizontal bar showing: job ID, product type, duration, current status
- Color-coding by status: scheduled, running, complete, blocked
- Drag-and-drop to manually reschedule jobs (moves bar to different press or time slot)
- Click on job bar to see full job details in sidebar
- Filter by machine type, product type, status, date range
- Zoom capability: view by hour, day, week, month
- Current time indicator (vertical line) showing now
- Capacity utilization shown as percentage per machine (e.g., "85% utilized 10am-2pm")
- "Overdue" warning when job should have started but hasn't
- Sticky machine grouping: can fold/expand by machine type (digital, offset, etc.)
- Export view as PNG image for printing or sharing
- Real-time updates: new jobs appear within 30 seconds of MIS creation

**US-5.2: Auto-Schedule Jobs**

As a production manager
I want the system to automatically schedule incoming jobs
So that I don't have to manually assign jobs to presses

Acceptance Criteria:
- Manual trigger: "Auto-schedule" button on job list or schedule view
- Automatic trigger: configurable rule to auto-schedule jobs when they arrive (e.g., "all jobs under 100 units")
- Algorithm prioritizes: press capability match first (substrate size, color capability), then earliest available capacity
- Scheduling rule options: minimize delivery date miss, maximize press utilization, first-in-first-out
- Constraint handling: respect minimum setup time between different substrates (e.g., 15 min color change), drying time for white ink
- Multi-step jobs: detect if job requires finishing (fold, cut, etc.) and schedule finishing queue after press completion
- Scheduling respects business hours: jobs don't schedule for nights/weekends unless configured otherwise
- Alerts for scheduling failures: if job can't be scheduled within delivery window, show warning with reasons
- Scheduling can be run in "dry-run" mode to preview changes before committing
- Reschedule capability: can re-run scheduler on existing jobs to optimize if new jobs arrive
- Manual override: can lock a job's schedule to prevent rescheduling

**US-5.3: Manual Job Scheduling**

As a production manager
I want to manually override automatic schedule
So that I can prioritize rush jobs or handle special cases

Acceptance Criteria:
- Drag-and-drop job in Gantt view to move to different press or time slot
- Can drag job forward (later) or backward (earlier)
- Can drag job between different presses (if specifications compatible)
- Invalid moves show warning: "This press cannot handle substrate size" or "No capacity at that time"
- Right-click context menu on job offers: move, duplicate, lock, delete, change priority
- "Lock schedule" option prevents auto-scheduler from moving a job
- "Rush" flag increases job priority in automated scheduling
- "Pause" option temporarily removes job from production queue
- Clone job option (for reprints) copies to same press and time window
- Drag from unscheduled queue to scheduled timeline to assign job
- Can also schedule via inline dropdown: "Assign to Press → [press list]"
- Timeline shows time window in 15-minute increments
- Dragging shows capacity availability: green (has capacity), yellow (tight), red (overbooked)
- After manual move, system validates constraints and flags issues
- Manual edits create audit trail showing who moved what and when

**US-5.4: Scheduling Constraints and Rules**

As a production manager
I want to define scheduling rules and constraints
So that scheduler respects operational requirements

Acceptance Criteria:
- Configuration panel for scheduling rules (Admin section)
- Constraint types:
  - Substrate compatibility: map substrate to compatible presses
  - Press capability: define substrate widths, ink colors, speed, finishing options per press
  - Setup time: define changeover time for substrate, color, finishing
  - Drying time: define drying requirement between steps (e.g., white ink needs 30 min)
  - Business hours: define operating hours per press (can be 24/7 or 6am-10pm, etc.)
  - Maximum queue: max jobs queued before a press at any time
  - Minimum batch: don't schedule jobs smaller than minimum (e.g., >100 units only on digital)
- Substrate management:
  - Track current substrate inventory per press
  - Define changeover time when substrate depleted
  - Can manually load substrate and record in system
  - Scheduler prevents scheduling substrate not in inventory
- Priority rules:
  - Default priority: customer tier, order date, delivery date
  - Custom priority: can set by product type, order value, customer
- Optimization objective:
  - Minimize total duration (makespan)
  - Minimize delivery date misses
  - Maximize press utilization
  - Balance load across presses
- Machine groups: can group similar presses and let scheduler load-balance within group
- Blackout dates: can block machine from scheduling (maintenance, training)

**US-5.5: Scheduling Alerts and Conflicts**

As a production manager
I want to see scheduling alerts when there are conflicts
So that I can fix issues before production starts

Acceptance Criteria:
- Alerts panel shows scheduling issues in priority order: critical, warning, info
- Critical alerts (block production):
  - Job scheduled but required substrate not in inventory
  - Job scheduled for unavailable press
  - Job scheduled outside business hours when not allowed
  - Overlapping assignments (two jobs on same press at same time)
- Warning alerts (may miss deadline):
  - Job scheduled with <2 hours before deadline
  - Job scheduled but finishing queue is bottleneck
  - Substrate changeover will cause delay
  - Post-production steps will cause late delivery
- Info alerts:
  - Job scheduled >1 hour after arrival (slow scheduling)
  - Press at low utilization (<50% in next 8 hours)
- Clicking alert jumps to relevant job in Gantt view
- Alerts auto-clear when condition resolves
- Alert summary: "3 critical, 5 warnings" at top of view
- Can snooze alerts for 1/4/24 hours if aware of issue
- Integration with MIS job status: when job moves to "scheduled" status, auto-clear scheduling alert

**US-5.6: Finishing Queue Scheduling**

As a production manager
I want to automatically schedule finishing steps after press production
So that I don't have to manually coordinate multi-step jobs

Acceptance Criteria:
- Job spec includes finishing steps (fold, cut, band, pad, etc.)
- When job scheduled to press, automatically schedule finishing queue
- Finishing scheduled to start after press completion + drying time
- Finishing queue view shows jobs in queue, estimated duration, current process
- Can manually move jobs in finishing queue just like press queue
- Constraint handling: respect finishing equipment availability (only one folder, etc.)
- Setup time: configure changeover time between different finishing specs
- Alerts if finishing queue is bottleneck (more than 10 jobs backing up)
- Finishing stage can be assigned to specific equipment (e.g., "fold on folder #1")
- Can route to external vendor if internal capacity exhausted (flag job for outsource)
- Timeline visibility: Gantt view shows finishing stages as second set of bars

**US-5.7: Schedule Performance Analytics**

As a production manager
I want to see scheduling performance metrics
So that I can optimize future scheduling

Acceptance Criteria:
- Dashboard shows KPIs: on-time delivery %, average delay, press utilization %, throughput
- Charts: on-time delivery trend (last 30 days), press utilization by machine, jobs missed deadline
- Drill-down: click on "on-time delivery %" to see which jobs were late and why
- Filters: by date range, press, product type, customer
- Export: download report as CSV or PDF
- Weekly report: can send automated weekly summary to production team
- Comparison: can compare current week to previous weeks
- Metrics:
  - On-time delivery rate (%)
  - Average delay (hours)
  - Press utilization (%)
  - Average queue depth (jobs per press)
  - Setup time as % of total time
  - Average scheduling time (how long from order receipt to scheduled)
  - Forecast accuracy (estimated duration vs actual)
- Annotations: can add notes to date ranges to explain unusual metrics (e.g., "equipment down 3/15-3/17")

### 4. Functional Requirements

**Scheduling Engine:**
- Rule-based constraint satisfaction solver using optimization library (e.g., CPLEX, Google OR-Tools)
- Objective function: minimize weighted sum of (delivery date miss, makespan, setup time)
- Algorithm: MIP (mixed-integer program) solver with configurable timeout (30 seconds max)
- Fallback: if optimization doesn't converge, use greedy heuristic (first-fit)
- Incremental scheduling: can add single job to existing schedule without full recalculation
- Batch scheduling: can schedule multiple jobs at once
- Rescheduling: can reoptimize existing schedule when new jobs arrive
- Constraint propagation: check constraints before and after scheduling

**Gantt View Implementation:**
- Frontend: React-based interactive Gantt (using library like Gantt-React or custom D3.js)
- Drag-and-drop: use react-beautiful-dnd or similar for smooth interaction
- Zoom levels: hour view (30-minute grid), day view (15-minute grid), week view (1-hour grid), month view (1-day grid)
- Performance: virtualize rows (only render visible machines) and columns (only render visible time range)
- Real-time updates: WebSocket push of new jobs, status changes, reschedules
- Export: use html2canvas or similar to export as image; also CSV export of schedule

**Database Schema:**
```
scheduled_jobs:
  - job_id (FK to Orders)
  - press_id (FK to Equipment)
  - scheduled_start (timestamp)
  - scheduled_end (timestamp)
  - actual_start (timestamp, nullable)
  - actual_end (timestamp, nullable)
  - estimated_duration (minutes)
  - setup_time (minutes)
  - status (scheduled, running, completed, blocked)
  - locked (boolean)
  - rush (boolean)
  - created_at
  - created_by (user_id)
  - modified_at

scheduling_constraints:
  - constraint_id (PK)
  - constraint_type (substrate_compat, setup_time, drying_time, etc.)
  - subject_id (press_id or substrate_id)
  - configuration (JSON)
  - active (boolean)

press_inventory:
  - inventory_id (PK)
  - press_id (FK)
  - substrate_id (FK)
  - quantity (units)
  - last_updated
```

**API Endpoints:**
- POST /scheduling/auto-schedule (body: {job_ids?, optimization_objective})
- POST /scheduling/reschedule
- PATCH /scheduling/jobs/{job_id} (body: {press_id, scheduled_start})
- GET /scheduling/gantt (query: machine_type, start_date, end_date)
- GET /scheduling/alerts
- POST /scheduling/constraints (add/update constraints)
- GET /scheduling/analytics (query: metric, date_range)

**Integration with Production Control:**
- When job scheduled, write to MIS job status with "scheduled" stage and scheduled_start/end times
- When job actual start recorded (press operator starts job), update scheduled_jobs.actual_start
- When job actual end recorded, update scheduled_jobs.actual_end and trigger finishing queue scheduling
- Alerts integration: scheduling conflicts generate MIS alerts visible to production manager

### 5. Data Requirements

See database schema above. Key fields:
- `scheduled_jobs`: core scheduling table
- `scheduling_constraints`: rule configuration
- `press_inventory`: substrate tracking

### 6. Edge Cases

- Job arrives at 5:55pm, last schedule window is 6:00pm-9:00pm (3 hour press availability before close): scheduler schedules job even though tight fit
- Substrate depleted mid-production: alert sent, can pause remaining jobs waiting for that substrate
- Job requires substrate not in system: alert, scheduler cannot schedule, manual intervention needed
- Equipment failure during job: actual_end timestamp adjusted, job rescheduled from failure point
- Rush job added to full schedule: scheduler moves lower-priority jobs forward, may impact their delivery dates
- Optimizer times out: fallback to greedy algorithm, may not be optimal
- Time zone handling: if PSP has multiple facilities, each with different times
- Daylight saving time: schedule must handle DST transitions correctly
- Very large jobs (1000+ units): may require splitting across multiple presses, scheduler should handle
- Conflicting constraints: e.g., substrate only on press A, but press A is unavailable → alert
- Rounding: setup time might be 2.5 hours, but grid is 15 minutes, so rounds to 2h 45m
- Infinite loops: if constraint prevents any valid schedule, show error to user rather than hanging

### 7. Out of Scope

- Integration with IoT sensors on presses (future feature for real-time monitoring)
- ML-based duration prediction beyond AI Estimator estimates (use current estimates)
- Multi-facility scheduling (each facility has own schedule)
- Workload forecasting (predict job arrivals and pre-schedule capacity)
- Outsourcing integration (flag for outsource, but manual placement)
- Labor scheduling (who works which shift, not in scope)
- Machine maintenance scheduling (separate from job scheduling)
- Energy optimization (don't schedule to minimize energy cost)

### 8. Integration Points

- **MIS Jobs & Status:** Read job specs, write scheduled times and status updates
- **MIS Equipment:** Read press capabilities, availability, inventory levels
- **AI Estimator:** Read estimated production duration for each job
- **MIS Finishing Queue:** Coordinate finishing queue after press completion
- **Alerts:** Generate scheduling conflict alerts
- **Production Control:** Update actual start/end times when job runs

---

## PRD 17: Automated Imposition and Workflow Automation

**Classification:** Advanced
**Target Users:** Technical integrators, production managers, print engineers

### 1. Problem Statement

Current MIS requires manual file preparation:
- Production staff manually arrange job files on press sheets (imposition)
- No JDF workflow integration (Just In Time Workflow, standard for print industry)
- Multi-step jobs require manual hand-offs between systems
- No imposition method selection for different products
- File preparation is error-prone and time-consuming
- Integration with external production systems (Prinect, Harlequin, etc.) not possible

Advanced PSPs and integrators need:
- Automatic imposition calculation based on job specs
- JDF import/export for workflow automation
- Imposition method selection (auto vs manual)
- Integration with external preflight and file preparation tools

### 2. Solution Overview

Build a workflow automation system that:
1. **Imposition Calculation:** Auto-calculate sheet layout based on product specs
2. **JDF Export:** Export job specs as JDF for external workflow tools
3. **JDF Import:** Import JDF tickets created by other systems
4. **Imposition Method Selection:** Choose between auto-imposition or manual setup
5. **Constraint-Based Layout:** Respect press sheet size, gripper area, safety margins
6. **Integration Points:** Support common workflow tools (Prinect, Harlequin, etc.)
7. **Validation:** Preflight checks before exporting to ensure viability

System generates imposition specs and JDF tickets that can be imported into RIP and workflow tools downstream.

### 3. User Stories

**US-6.1: Auto-Imposition Calculation**

As a print engineer
I want the system to automatically calculate job imposition
So that I don't have to manually arrange files on press sheets

Acceptance Criteria:
- Job detail page shows "Imposition" section with auto-calculated layout
- Input parameters: job final size, quantity, press sheet size, safety margins
- System calculates: number of sheets needed, layout (N-up arrangement), trim marks location
- Display options: show imposition grid visualization, list of sheets needed, trim dimensions
- Constraint handling:
  - Respect press sheet limits (max width, max height)
  - Respect gripper area (usually 0.5" margin at top/bottom)
  - Respect bleed/safety margins (usually 0.125-0.25")
  - Consider optimal material yield (minimize waste)
- Output options:
  - Imposition grid layout as PDF showing cut and fold lines
  - BOM (bill of materials): number of sheets needed, waste calculation
  - Layout as CIP3/JDF for workflow integration
- Can toggle between different imposition methods (if multiple valid options)
- Imposition can be manual override: user provides custom N-up, system validates constraints

**US-6.2: JDF Job Export**

As a technical integrator
I want to export completed job spec as JDF
So that it can be imported into external workflow tools

Acceptance Criteria:
- "Export as JDF" button on job detail page
- JDF export includes:
  - Job identification (job ID, order ID, customer)
  - Product specifications (final size, quantity, substrate, colors, etc.)
  - Imposition details (N-up, sheet size, trim marks)
  - Finishing specifications (fold, cut, collate, etc.)
  - File references (URLs or embedded files)
  - Delivery requirements (due date, delivery address)
  - Contact information (customer, billing contact)
- JDF output validated against JDF specification (v1.4 or v1.5)
- File download as .jdf with job ID in filename
- Can also email JDF to external systems
- Integration with GC API: POST /jobs/{job_id}/export-jdf returns JDF content
- Metadata includes: export timestamp, exported by (user), MIS version
- Option to include or exclude sensitive data (customer PII, pricing)

**US-6.3: JDF Job Import**

As a technical integrator
I want to import JDF tickets from external systems
So that they become orders in the MIS

Acceptance Criteria:
- Upload page for JDF import
- Drag-and-drop or file picker for .jdf files
- Batch import: can import multiple JDF files at once
- JDF parsing: extract job specs from JDF structure
- Mapping: map JDF fields to MIS order fields
  - JDF JobID → MIS Order ID (can create new or match existing)
  - JDF ResourceSet → Product specs
  - JDF NodeInfo → Metadata
- Validation: preflight check JDF before import
  - Validate required fields present
  - Validate substrate against available materials
  - Validate requested delivery date is feasible
- Import preview: show parsed specs before confirming
- On import: create order in MIS with status "imported from JDF"
- Error handling: if validation fails, show which fields are missing/invalid and allow correction
- Import audit: log all imports with timestamp, source file, imported by (user)
- Duplicate prevention: if JDF JobID matches existing order, show warning and allow merge/overwrite

**US-6.4: Imposition Method Selection**

As a print engineer
I want to choose how to impose a job
So that I can optimize for different production scenarios

Acceptance Criteria:
- Product configuration includes imposition method options:
  - Auto (system calculates optimal layout)
  - Manual (user specifies N-up)
  - Template (use saved imposition template)
  - External (use imposition from JDF import)
- When job received, display available imposition methods
- Auto imposition: system calculates, shows in preview, user confirms or modifies
- Manual imposition: user provides N-up (e.g., "4-up on 18x24 sheet")
  - User provides: number of items per sheet, sheet size, trim marks
  - System validates against press capability
  - Shows preview visualization
- Template imposition: select from library of saved templates
  - Templates show: product type, sheet size, N-up, last used date
  - Can create new template from current job
  - Can update/delete existing templates
- External imposition: if job imported from JDF, imposition already specified
- Once method selected, imposition is locked until explicitly changed
- Imposition records include: method used, who selected (user), timestamp

**US-6.5: Workflow Integration (External Systems)**

As a technical integrator
I want to integrate MIS with external workflow tools
So that jobs flow automatically through the production pipeline

Acceptance Criteria:
- Integration framework supporting common workflow tools:
  - Prinect (Heidelberg workflow)
  - Harlequin (file preparation and preflight)
  - other JDF-compatible systems
- Two-way integration:
  - MIS exports job to external system via JDF
  - External system imports job and processes
  - External system exports updated specs back to MIS
  - MIS updates job with completed workflow info
- Webhook integration: external system can call MIS APIs to:
  - Create order from incoming file
  - Update order status with preflight results
  - Submit completed job to production queue
- API endpoints:
  - POST /integrations/webhooks/preflight (receive preflight results)
  - POST /integrations/webhooks/imposition (receive imposition updates)
  - GET /integrations/{tool_id}/config (get integration settings)
- Configuration panel (Admin section):
  - Connect external system via API key / credentials
  - Map JDF fields to MIS fields
  - Define workflow triggers (e.g., "export to Prinect when job status = ready_for_preflight")
  - Test connection button
- Audit trail: log all external system integrations and data exchanges
- Error handling: if external system fails, queue job and retry with exponential backoff

**US-6.6: Preflight Validation**

As a production manager
I want to validate files before sending to production
So that I catch errors before they become expensive mistakes

Acceptance Criteria:
- Preflight check page accessible from job detail view
- Automated checks:
  - File format validation (PDF, necessary fonts present)
  - Bleed area check (minimum 0.125" bleed)
  - Color space validation (CMYK for offset, RGB for digital)
  - Resolution check (minimum 300 DPI for offset, 200 for digital)
  - Substrate compatibility (material available)
  - Imposition validation (fits on sheet, no overlap)
  - Finish specification (folder/cutter available)
- Preflight report: pass/fail for each check, with detailed explanation of failures
- If checks fail: show specific error message and remediation steps
  - "File resolution is 150 DPI, minimum required is 300 DPI"
  - "Recommended: resupply file at 300 DPI or higher"
- Can export preflight report as PDF
- Option to override warnings with reason (audit trail)
- Integration with external preflight tools: can submit job to Harlequin for detailed analysis
- Pass/fail gate: job cannot move to production if critical checks fail

**US-6.7: Finishing Specifications (JDF)**

As a print engineer
I want to capture finishing specs in JDF
So that finishing equipment can automatically import job details

Acceptance Criteria:
- Finishing section includes JDF-compatible specs:
  - Fold type (half-fold, tri-fold, accordion, etc.)
  - Fold dimensions (location of fold lines)
  - Cut specifications (guillotine cut, kiss cut, die cut)
  - Collation sequence
  - Binding method (saddle-stitch, perfect-bind, spiral, etc.)
  - Hole punch locations and size
- Can save as JDF imposition file for export to finishing equipment
- Finishing equipment can parse and display job on their control panel
- QR code on job ticket links to imposition spec for visibility

### 4. Functional Requirements

**Imposition Calculation:**
- Algorithm: nest-based layout optimization (similar to industrial nesting problems)
- Inputs: item dimensions, sheet dimensions, safety margins, target N-up
- Outputs: sheet layout (x,y coordinates of each item), number of sheets, waste %
- Handle rotations: can rotate items to optimize fit (with user confirmation)
- Handle bleeds: include bleed area in calculations
- Respect gripper: don't place items in gripper area
- Performance: calculate within 1 second for typical jobs

**JDF Implementation:**
- JDF parser: use open-source JDF library (e.g., PrintTalk) or build custom parser
- JDF generator: build JDF from MIS data structures
- JDF validation: validate against JDF schema
- Namespace support: handle JDF v1.4 and v1.5
- File embedding: can embed PDF files directly in JDF or reference URLs
- Compression: JDF files can be compressed (use gzip)
- Signing: support digital signatures on JDF files (optional security feature)

**Database Schema:**
```
imposition_specs:
  - imposition_id (PK)
  - job_id (FK to Orders)
  - method (auto, manual, template, external)
  - n_up (number per sheet)
  - sheet_width_inches
  - sheet_height_inches
  - item_width_inches
  - item_height_inches
  - trim_marks (boolean)
  - bleed_inches
  - gripper_area_inches
  - waste_percent
  - visualization_json (layout grid as JSON)
  - created_at
  - created_by (user_id)
  - locked (boolean)

jdf_exports:
  - export_id (PK)
  - job_id (FK)
  - jdf_content (TEXT)
  - exported_at
  - exported_by (user_id)
  - destination (email, file download, webhook)
  - external_system_id (which system imported this)

preflight_results:
  - result_id (PK)
  - job_id (FK)
  - check_type (format, bleed, color, resolution, imposition, finish)
  - status (pass, fail, warning)
  - message
  - severity (critical, warning, info)
  - checked_at
  - checked_by (user_id or system)
```

**API Endpoints:**
- POST /jobs/{job_id}/imposition/calculate (auto-calculate)
- PUT /jobs/{job_id}/imposition (save imposition specs)
- POST /jobs/{job_id}/export-jdf
- POST /integrations/import-jdf (import JDF file)
- POST /jobs/{job_id}/preflight (run preflight checks)
- GET /jobs/{job_id}/preflight-report
- POST /integrations/webhooks/preflight (external system callback)

**Integration Points:**
- External workflow tools: JDF export/import
- File storage: read job files from GCS/S3
- Preflight tools: API calls to Harlequin, etc.

### 5. Data Requirements

See database schema above.

### 6. Edge Cases

- Job with custom size not matching standard sheet sizes: system finds best fit, highlights waste
- Job requires multiple imposition methods (some on template, some auto): handle per-batch
- JDF import missing required fields: show validation errors and allow manual entry
- Imposition visualization for very large N-up (64-up): use scrollable/zoomable preview
- Preflight fails but user must proceed (e.g., special custom job): allow override with documented reason
- External system integration fails: queue for retry, notify admin
- Finishing specifications conflict with imposition: alert user (e.g., fold location outside safe area)

### 7. Out of Scope

- Automatic file manipulation (cropping, rotating files). System calculates imposition but doesn't modify source files.
- RIP integration (system doesn't drive RIP directly, exports specs only)
- CIP3 support (older color integration protocol, JDF is successor)
- Personalization/variable data printing (separate capability)

### 8. Integration Points

- **MIS Jobs & Specs:** Read/write job specifications and imposition details
- **File Storage:** Read job files for preflight validation
- **External Workflow Tools:** JDF export/import, webhook callbacks
- **Preflight Services:** Call external preflight APIs
- **Alerts:** Generate alerts for failed preflight or imposition issues

---

## PRD 18: Automated Carrier Integration

**Classification:** Advanced
**Target Users:** Production managers, shipping coordinators, customer service

### 1. Problem Statement

Current shipping is manual:
- Production manager manually contacts carriers for quotes
- Shipping rates not integrated into order cost
- No carrier selection based on service level and cost
- Manual label generation for each shipment
- No tracking integration with customer delivery visibility
- PSPs overpay on shipping because rates are static or outdated

Advanced PSPs need:
- Real-time shipping rates from major carriers (UPS, DHL, FedEx, DPD)
- Automatic carrier selection based on cost/service
- Automated label generation and manifest
- Integration with tracking for customer portal visibility
- Bulk shipping operations

### 2. Solution Overview

Build carrier integration that:
1. **Real-Time Rates:** Query carrier APIs for actual shipping costs
2. **Service Selection:** Allow choice between service levels (standard, express, etc.)
3. **Auto-Select:** Automatically choose carrier/service based on cost or delivery requirement
4. **Label Generation:** Generate shipping labels directly from MIS
5. **Manifest Export:** Export manifests for carrier submission
6. **Tracking Integration:** Fetch tracking info and display in customer portal
7. **Multi-Carrier Support:** Integrate with UPS, DHL, FedEx, DPD (others via API)
8. **Weight/Dimensions Calculation:** Auto-calculate from job specs or manual entry

### 3. User Stories

**US-7.1: Get Real-Time Shipping Quotes**

As a shipping coordinator
I want to see real-time shipping costs for each carrier
So that I can choose the most economical option

Acceptance Criteria:
- When job is ready to ship, click "Get shipping quote"
- System fetches quotes from all integrated carriers in <5 seconds
- Quote includes: carrier name, service level (standard, express, overnight), estimated delivery, cost
- Quotes sorted by cost (default) or by delivery speed
- Selected quote locked for 30 minutes (carrier guarantee window)
- If lock expires, can refresh quotes
- Quote includes: carrier discount (based on PSP account volume), any surcharges (fuel, remote area)
- Can compare quotes side-by-side: show carrier, service, cost, delivery date
- Shipping address validation: system validates address and flags any issues (PO box, etc.)
- Zone calculation: system determines shipping zone (affects cost)
- Dimensional weight check: if DIM weight > actual weight, use DIM weight
- Residential surcharge: system checks if delivery address is residential and includes in quote
- Insurance option: show cost to add shipping insurance

**US-7.2: Select Carrier and Generate Label**

As a shipping coordinator
I want to select a carrier and automatically generate shipping label
So that I can quickly process shipments

Acceptance Criteria:
- Quote selection: click on quote to select carrier/service
- Automatic label generation: system generates label via carrier API
- Label download: label available as PDF within 10 seconds
- Label format: supports thermal printer (4x6) or standard printer (8.5x11)
- Label includes:
  - Barcode and tracking number
  - From address (PSP)
  - To address (customer)
  - Service level and delivery estimate
  - Package weight and dimensions
- Tracking number automatically written to order in MIS
- Label can be reprinted anytime
- Batch label generation: can select multiple shipments and print all labels at once
- Label preview: can preview before printing
- Printer selection: choose between integrated thermal printer or PDF download
- Multiple packages per order: if order splits into multiple shipments, each gets own label
- International shipping: supports international labels with customs forms (CN-23, CN-22) generation

**US-7.3: Auto-Select Best Carrier**

As a production manager
I want to automatically select the best carrier
So that shipping is optimized without manual decision-making

Acceptance Criteria:
- Auto-select rule configuration (Admin section):
  - Optimization objective: cost, delivery speed, service level
  - Preferred carriers: priority list (e.g., "use UPS unless DHL is >20% cheaper")
  - Delivery date constraints: must deliver by X date (from order)
  - Weight/value thresholds: different carriers for different package sizes
- When auto-select enabled, system automatically:
  1. Gets quotes from all carriers
  2. Filters by delivery date (must meet customer deadline)
  3. Selects based on optimization rule (cheapest, fastest, etc.)
  4. Generates label automatically
  5. Notifies shipping coordinator label is ready
- Override capability: shipping coordinator can override auto-selection if needed
- Reason for override recorded in audit trail
- Auto-select results logged: which carrier selected, cost, saving vs alternatives
- Analytics: can see auto-select savings over time

**US-7.4: Bulk Shipping Operations**

As a shipping coordinator
I want to process multiple shipments at once
So that I can be more efficient

Acceptance Criteria:
- Bulk shipping page: select multiple orders ready for shipment
- Batch operations:
  - Get quotes for all selected orders simultaneously
  - Compare total cost across carriers
  - Select best carrier across batch
  - Generate all labels at once
  - Print manifest showing all shipments
- Manifest includes:
  - List of all shipments (from, to, weight, value)
  - Barcode summary (all tracking numbers)
  - Total weight and value
  - Carrier instructions
- Bulk status update: all selected orders move to "shipped" status once labels generated
- Shipping report: PDF summary of day's shipments for record-keeping
- Can export manifest as CSV for carrier submission
- Batch filters:
  - Ready to ship (production complete)
  - By destination (consolidate regional shipments)
  - By customer (group orders from same customer)
  - By delivery date (urgent first)

**US-7.5: Shipping Cost Integration in Estimates**

As a sales user
I want shipping costs to be included in quote
So that customers see total cost upfront

Acceptance Criteria:
- When estimate created, include shipping cost line item
- Shipping cost calculation:
  - Use default rate table for estimation (carrier API too slow for estimates)
  - Or call carrier API if customer wants real-time quote (adds 5 seconds to quote)
  - Can be overridden by sales for special rates
- Shipping line item shows: carrier, service level, weight, cost
- If estimate converts to order, confirm shipping cost hasn't changed significantly
- If carrier rates changed >5%, alert sales to re-quote shipping
- Integration with pricing model: shipping cost can be marked-up (e.g., charge customer +10%)
- Customer can choose service level in estimate (adds/removes shipping cost)
- Free shipping option: can mark order as "free shipping" (cost tracked separately)

**US-7.6: Tracking Integration**

As a customer
I want to see tracking information for my shipment
So that I know when it will arrive

Acceptance Criteria:
- Customer portal shows tracking information once order ships
- Tracking section includes:
  - Carrier name and service level
  - Tracking number (clickable to carrier tracking page)
  - Current location (updated periodically)
  - Estimated delivery date
  - Delivery status (in transit, out for delivery, delivered, delayed, exception)
- Real-time updates: tracking status refreshed every 4 hours (or on-demand)
- Delivery notifications: email/SMS when order out for delivery and when delivered
- Exception handling: if shipment delayed, show reason (weather, logistics issue, etc.)
- Multiple packages: if order split into multiple shipments, show each separately
- Proof of delivery: link to photo/signature once delivered (if carrier provides)
- Historical tracking: archived for 6 months after delivery
- Integration with MIS: tracking status affects order status ("shipped" → "in-transit" → "delivered")

**US-7.7: Carrier Account Management**

As a PSP admin
I want to configure carrier accounts and settings
So that shipping is routed correctly for my business

Acceptance Criteria:
- Configuration page for carrier integration (Admin section)
- For each carrier (UPS, DHL, FedEx, DPD):
  - API credentials (account ID, API key)
  - Test connection button
  - Pickup location address (may differ from shipping address)
  - Account balance / usage tracking
  - Available services (which to include in quotes)
  - Preferred service (default selection if cost tie)
- Carrier prioritization: set order in which to query carriers
- Surcharge configuration: configure any custom surcharges (fuel, remote area handling fee)
- Residential delivery: configure surcharge for residential delivery
- Shipping address validation settings: validate via USPS/carrier API before shipping
- Return shipping setup: configure return labels and reverse logistics
- International shipping: configure customs handling preferences
- EDI/manifest submission: configure automatic manifest submission to carrier
- Cost reconciliation: download carrier invoices and compare to MIS costs

### 4. Functional Requirements

**Carrier Integration Architecture:**
- Modular design: each carrier has own adapter implementing common interface
- Rate engine: caches recent quotes (10-minute TTL) to avoid repeated API calls
- Failover: if one carrier unavailable, query others
- Queue: background job queues label generation if API temporarily slow
- Retry: automatic retry for transient failures
- Logging: all carrier API calls logged for audit and troubleshooting
- Rate limiting: respect carrier API rate limits, queue requests if needed

**Label Generation:**
- PDF generation: use ReportLab or similar for label layout
- Barcode generation: use barcode library for thermal printer format
- Print integration: support CUPS, Windows Print Spooler
- Label templates: support multiple carrier label formats
- Custom branding: option to add PSP logo to labels

**Tracking Updates:**
- Background job runs every 4 hours to fetch tracking updates
- Webhook integration: carriers can push updates to MIS (if available)
- Tracking cache: store tracking history per shipment
- Event triggers: on delivery, send customer notification

**Database Schema:**
```
carrier_accounts:
  - account_id (PK)
  - psp_id (FK)
  - carrier_name (UPS, DHL, FedEx, DPD)
  - api_key
  - account_number
  - pickup_address
  - active (boolean)
  - created_at

shipping_quotes:
  - quote_id (PK)
  - order_id (FK)
  - carrier_name
  - service_level
  - cost (cents)
  - delivery_estimate (date)
  - currency
  - quote_expires_at
  - locked (boolean)
  - locked_until
  - created_at

shipments:
  - shipment_id (PK)
  - order_id (FK)
  - tracking_number
  - carrier_name
  - service_level
  - from_address (JSON)
  - to_address (JSON)
  - weight_lbs
  - cost (cents)
  - label_pdf_url
  - shipped_at
  - delivered_at
  - status (pending, in_transit, out_for_delivery, delivered, exception)
  - tracking_last_updated

tracking_events:
  - event_id (PK)
  - shipment_id (FK)
  - event_time
  - event_description
  - location
  - status
  - fetched_at
```

**API Endpoints:**
- POST /shipping/quotes (body: {order_id, ?carrier_filter})
- POST /shipping/select-quote (body: {quote_id})
- GET /shipping/labels/{shipment_id}
- POST /shipping/bulk-quotes (body: {order_ids[]})
- POST /shipping/bulk-labels (body: {shipment_ids[]})
- GET /shipping/tracking/{shipment_id}
- PATCH /carrier-config/{carrier} (update carrier settings)
- POST /carrier-config/test-connection (test carrier credentials)

**Carrier Integrations:**
- UPS: OnSite API for rates and label generation
- DHL: DHL eCommerce APIs
- FedEx: Web Services APIs
- DPD: DPD API for European shipping
- Others via API or manual integration

### 5. Data Requirements

See database schema above.

### 6. Edge Cases

- Order ships to multiple addresses: generate separate labels per address
- Shipto address is PO box: some carriers don't allow PO boxes, alert user
- International shipment to restricted country: carrier API rejects, show error
- Weight/dimensions change after quote: need new quote, system alerts
- Carrier account suspended/invalid credentials: API error, alert admin
- Tracking not available for 24 hours after shipment: don't error, retry later
- Shipment marked as delivered but customer says not received: support ticket integration
- Multiple packages per order: each package gets own label, consolidated manifest
- Split orders (multiple shipments): coordinate shipping to ensure all parts arrive within reasonable timeframe

### 7. Out of Scope

- Custom carrier integration (only major carriers pre-integrated; others via API partner like EasyPost)
- Returns/reverse logistics (separate MIS feature)
- International customs clearance (just generate forms, doesn't clear customs)
- Parcel insurance claims (customer initiates with carrier directly)
- Custom shipping rate negotiation (customer manages direct with carrier)
- Regional carrier selection (e.g., choosing specific carrier for specific regions) - handled via rules

### 8. Integration Points

- **MIS Orders & Shipping:** Read delivery address, write tracking info and shipment status
- **Carrier APIs:** Call to get quotes, generate labels, fetch tracking
- **File Storage:** Store labels as PDFs
- **Email Service:** Send tracking notifications
- **Customer Portal:** Display tracking info
- **Alerts:** Generate alerts for shipping failures or delays

---

## PRD 19: Advanced Inventory Features

**Classification:** Advanced
**Target Users:** Inventory managers, purchasing managers, production managers

### 1. Problem Statement

Current inventory is basic:
- Single warehouse only
- Manual reorder tracking
- No visibility into stock levels across warehouse
- No automated reorder points
- No integration with supplier POs
- Stockouts cause production delays

Advanced PSPs need:
- Multi-warehouse inventory tracking
- Automated reorder when stock below threshold
- Visibility into stock across all locations
- Integration with supplier systems
- Inventory analytics and usage trends

### 2. Solution Overview

Build advanced inventory system that:
1. **Multi-Warehouse Support:** Track inventory across multiple locations/facilities
2. **Automated Reorder:** Trigger purchase orders when stock falls below threshold
3. **Stock Visibility:** Dashboard showing stock levels, usage trends, reorder status
4. **Supplier Integration:** Auto-submit POs to approved suppliers
5. **Usage Analytics:** Track substrate/material usage to forecast future needs
6. **Rotation Management:** Track age of materials, enforce FIFO

### 3. User Stories

**US-8.1: Multi-Warehouse Inventory Tracking**

As an inventory manager
I want to track inventory across multiple warehouses
So that I know total stock availability

Acceptance Criteria:
- Warehouse configuration: add/edit/delete warehouses (Admin)
- Warehouse profile includes: name, location, address, contact, capacity
- Inventory dashboard shows:
  - Total quantity per substrate across all warehouses
  - Breakdown by warehouse (e.g., "400 sheets Frankfurt, 200 sheets Berlin")
  - Quantity reserved for active orders vs available
  - Reorder point threshold per substrate per warehouse
- Stock transfers: ability to transfer inventory between warehouses
  - Transfer form: from warehouse, to warehouse, substrate, quantity, reason
  - Transfer recorded in audit log
  - Stock adjustment in both warehouses (deduct from source, add to destination)
- Warehouse selection for orders: MIS scheduler tries to allocate from nearest warehouse
- Stock-out alert: if order needs substrate not available, alert inventory manager
- Consolidation: can consolidate stock from multiple warehouses to meet larger order

**US-8.2: Automated Reorder**

As an inventory manager
I want the system to automatically create reorder POs
So that I don't run out of stock

Acceptance Criteria:
- Configuration per substrate per warehouse:
  - Reorder point (quantity): when to trigger reorder (e.g., 100 sheets)
  - Reorder quantity (quantity): how much to order (e.g., 500 sheets)
  - Supplier: preferred supplier for this material
  - Lead time (days): expected days to receive stock
- Automatic trigger:
  - Daily job checks all substrates
  - If quantity falls below reorder point, automatically create draft PO
  - PO includes: supplier, substrate, reorder quantity, estimated arrival, cost
  - Notification sent to inventory manager
- PO review:
  - Inventory manager reviews draft POs (not auto-submitted)
  - Can confirm, edit quantity/supplier, or cancel
  - Once confirmed, PO submitted to supplier (via email or API if supplier integrated)
  - PO tracked in MIS with expected delivery date
- Expected inventory forecast:
  - System calculates: current stock - active order usage + incoming PO = projected stock
  - Shows alert if projected stock will be negative before PO arrives
  - Can trigger expedited reorder if needed
- Bulk ordering: can trigger reorder for multiple substrates at once across multiple suppliers
- Seasonal adjustments: can set higher reorder points ahead of busy seasons

**US-8.3: Inventory Analytics**

As a purchasing manager
I want to see inventory usage trends
So that I can optimize stock levels and forecast needs

Acceptance Criteria:
- Analytics dashboard shows:
  - Top 10 most-used substrates (last 30/90/365 days)
  - Average usage per substrate (units per day/week/month)
  - Stock turnover ratio per substrate
  - Projected stock-out dates (if usage continues)
  - Reorder history: list of all POs with delivery dates and costs
- Charts:
  - Usage trend over time (line chart)
  - Stock level trend (inventory aging)
  - Supplier performance (on-time delivery %, cost per unit)
  - Cost analysis: total spend per substrate, per supplier
- Filters: by substrate type, supplier, warehouse, time period
- Export: download report as CSV or PDF
- Insights:
  - Alert if usage spiking (demand increasing)
  - Alert if slow-moving stock (may become obsolete)
  - Recommend reorder point adjustments based on usage patterns
  - Seasonal patterns identified and shown
- Comparisons: "This month used 2000 units substrate X, last year same month was 1500 units"

**US-8.4: Supplier Integration**

As a purchasing manager
I want to integrate supplier systems
So that POs can be submitted automatically

Acceptance Criteria:
- Supplier configuration (Admin section):
  - Supplier name, contact, address
  - Supported substrates/materials
  - API credentials (if available)
  - Email submission (if no API)
  - Lead time and minimum order quantities
  - Pricing (list price or negotiated rate)
  - Discount thresholds (e.g., 5% off at 1000 units)
- PO submission methods:
  - Email: generate PO as PDF/EDI, send to supplier email
  - API: if supplier has integrated API, submit electronically
  - Manual: print and fax (fallback option)
- PO tracking:
  - Supplier acknowledges order (manual input or email received)
  - Expected delivery date set
  - Delivery tracking (can paste tracking number)
  - Receipt confirmation: inventory manager receives stock and confirms in MIS
  - Deviations: alert if actual delivery differs from expected
- Integration with Gelato Procurement system:
  - Note: Supplier POs are managed by existing GC Procurement
  - MIS references PO from Procurement, tracks status
  - Can see which Gelato jobs are dependent on which supplier POs

**US-8.5: Stock Rotation (FIFO)**

As a production manager
I want to ensure old stock is used first
So that materials don't expire or become obsolete

Acceptance Criteria:
- Batch tracking: each stock receipt has batch number and receipt date
- Inventory queue: batches ordered by receipt date (FIFO)
- When job scheduled, allocate from oldest batch first
- Production team sees batch number on job ticket
- Exception handling: can allocate from newer batch if older batch has quality issue
- Aging report: show stock by batch age, alert if stock >6 months old
- Disposal: can mark batches for disposal (obsolete, damaged)

### 4. Functional Requirements

**Inventory System Architecture:**
- Real-time tracking: stock levels updated immediately when orders placed or received
- Forecasting: daily job forecasts stock levels based on pending orders
- Optimization: periodic analysis to suggest reorder point adjustments
- Integration with procurement: read-only access to GC Procurement PO data

**Database Schema:**
```
warehouses:
  - warehouse_id (PK)
  - psp_id (FK)
  - name
  - address
  - contact_email
  - capacity (units)

inventory:
  - inventory_id (PK)
  - warehouse_id (FK)
  - substrate_id (FK)
  - quantity (units)
  - reserved_quantity (allocated to active orders)
  - reorder_point (units)
  - reorder_quantity (units)
  - preferred_supplier_id (FK)
  - lead_time_days
  - last_updated

inventory_batches:
  - batch_id (PK)
  - warehouse_id (FK)
  - substrate_id (FK)
  - batch_number
  - quantity
  - received_date
  - expiration_date (nullable)

stock_transfers:
  - transfer_id (PK)
  - from_warehouse_id (FK)
  - to_warehouse_id (FK)
  - substrate_id (FK)
  - quantity
  - reason
  - created_at
  - transferred_by (user_id)

purchase_orders:
  - po_id (PK)
  - supplier_id (FK)
  - substrate_id (FK)
  - quantity
  - cost_per_unit
  - total_cost
  - order_date
  - expected_delivery_date
  - actual_delivery_date (nullable)
  - status (draft, submitted, acknowledged, in_transit, received, cancelled)
  - po_number (supplier's PO number)
  - tracking_url (nullable)
```

**API Endpoints:**
- GET /inventory (query: warehouse_id, substrate_id)
- PATCH /inventory/{inventory_id} (update stock)
- POST /inventory/transfers (create stock transfer)
- GET /inventory/analytics (query: metric, time_period)
- GET /suppliers/{supplier_id}
- POST /suppliers/{supplier_id}/po (create and submit PO)
- PATCH /purchase-orders/{po_id} (update PO status, delivery date)

### 5. Data Requirements

See database schema above.

### 6. Edge Cases

- Stock transfer in-flight when reorder triggered: system adjusts forecast to account for transfer
- Reorder quantity exceeds warehouse capacity: alert user, suggest multiple smaller orders
- Supplier doesn't have stock: system tries alternate suppliers or escalates
- Slow-moving stock approaches expiration: alert to clear or dispose
- Order arrives with damaged/incorrect material: receipt process allows rejection, re-triggers reorder

### 7. Out of Scope

- Supplier PO creation (managed by GC Procurement); MIS just tracks status
- Just-in-time supplier integration (future capability)
- Predictive demand forecasting using ML
- Serial number/RFID tracking (future capability)
- Environmental/sustainability tracking (carbon footprint of materials)

### 8. Integration Points

- **GC Procurement:** Reference supplier POs, track status
- **MIS Orders:** Read order substrate usage for forecasting
- **MIS Scheduling:** Allocate inventory when jobs scheduled
- **Supplier APIs:** Submit POs electronically
- **Alerts:** Generate alerts for stock levels, reorders, slow-moving stock

---

## PRD 20: Analytics / P&L (Finance & Reporting)

**Classification:** Advanced
**Target Users:** Finance managers, business owners, operations managers

### 1. Problem Statement

Current MIS has no financial analytics:
- No visibility into job profitability
- Can't compare actual costs vs estimated costs
- No customer profitability analysis
- Revenue reporting limited
- Cost breakdowns not visible

PSPs need:
- Job profitability dashboards
- Revenue reporting and trends
- Cost analysis (material, labor, overhead)
- Customer lifetime value analysis
- Estimate accuracy tracking

### 2. Solution Overview

Build analytics system that:
1. **Revenue Dashboard:** Track revenue by product type, customer, time period
2. **Job Profitability:** Show estimated vs actual cost/margin per job
3. **Customer P&L:** Show revenue and profitability per customer
4. **Cost Analysis:** Break down costs (materials, labor, shipping, overhead)
5. **Estimate Accuracy:** Track how accurate estimates are vs actual costs
6. **Benchmarking:** Compare performance to industry standards

### 3. User Stories

**US-9.1: Revenue Dashboard**

As a business owner
I want to see revenue by product type and customer
So that I can understand revenue drivers

Acceptance Criteria:
- Dashboard shows:
  - Total revenue (YTD and current month)
  - Revenue by product type (chart)
  - Revenue by customer (top 10 list)
  - Revenue trend (line chart, last 12 months)
  - Revenue by order status (invoiced, pending invoice, cancelled)
- Filters: date range, product type, customer, order status
- Drill-down: click on product type to see orders, click on order to see details
- Export: download report as CSV/PDF
- Segmentation:
  - By geography (if multi-location)
  - By sales channel (direct, marketplace, etc.)
  - By customer segment (small, medium, large)
- Comparison: "Revenue vs. last year same period"
- Growth rate: MoM and YoY growth percentages

**US-9.2: Job Profitability Analysis**

As a finance manager
I want to see estimated vs actual cost for each job
So that I can identify unprofitable jobs and improve pricing

Acceptance Criteria:
- Job detail view shows profitability section:
  - Estimated margin: (selling price - estimated cost) / selling price
  - Actual margin: (selling price - actual cost) / selling price (if order complete)
  - Estimated cost breakdown: materials, labor, shipping, overhead
  - Actual cost breakdown: actual materials used, labor hours × rate, actual shipping, allocated overhead
  - Variance: estimated vs actual, shown in dollars and percentage
- Job list view shows margin as column: sortable, color-coded (green >30%, yellow 15-30%, red <15%)
- Profitability report:
  - List of all jobs with estimated margin, actual margin, variance
  - Filters: date range, product type, customer, margin threshold
  - Find unprofitable jobs (negative margin)
  - Charts: margin distribution, margin vs order size (identify pricing issues)
  - Drill-down: why is this job unprofitable? (material overage, slow production, shipping cost, etc.)
- Trends: "Average margin by product type - last 12 months"
- Benchmarking: "Your average margin is 28%, industry average is 32%"

**US-9.3: Customer Profitability**

As a business owner
I want to see revenue and profitability by customer
So that I can identify my most valuable customers

Acceptance Criteria:
- Customer P&L view:
  - Customer name, total revenue (YTD), total margin ($), margin %
  - Order count, average order value
  - Top products ordered by this customer
  - Customer lifetime value (total revenue over all time)
  - Customer acquisition cost (if tracked)
- Top customers list: sorted by revenue, margin, or lifetime value
- Customer profitability trends: revenue and margin over last 12 months
- Customer segmentation: A/B/C by revenue or profitability
- Alerts: identify at-risk customers (declining revenue) or high-value customers
- Drill-down: click customer to see all orders and details
- Churn analysis: "These customers haven't ordered in 6 months"
- Export: download customer list with profitability metrics

**US-9.4: Cost Analysis Breakdown**

As a production manager
I want to see where costs are coming from
So that I can identify cost reduction opportunities

Acceptance Criteria:
- Cost breakdown view shows:
  - Material cost as % of revenue
  - Labor cost as % of revenue
  - Shipping cost as % of revenue
  - Overhead (allocation) as % of revenue
  - Other costs (setup, waste, etc.)
- Material cost detail:
  - Top materials by cost
  - Material cost per unit (to track waste/efficiency)
  - Material cost trends
  - Supplier comparison (same material from different suppliers)
- Labor cost detail:
  - Labor hours by operation (press, finishing, QC)
  - Labor cost per job or per hour
  - Labor productivity (units per labor hour)
  - Idle time (scheduled capacity vs actual usage)
- Shipping cost detail:
  - Shipping cost as % of order value (varies by customer location)
  - Carrier cost comparison (UPS vs DHL vs FedEx)
  - Shipping as % of revenue over time
  - Opportunity: identify where negotiated rates could help
- Overhead allocation:
  - Configure overhead allocation method (% of revenue, % of material cost, per order, etc.)
  - Overhead cost breakdown (rent, utilities, management, etc.)
  - Allocated overhead per order
- Variance analysis: actual vs budget by cost category
- Trends: cost as % of revenue over 12 months (identify if margins compressing due to cost inflation)

**US-9.5: Estimate Accuracy Tracking**

As a sales manager
I want to understand how accurate our estimates are
So that I can improve pricing models

Acceptance Criteria:
- Estimate accuracy dashboard shows:
  - Percent of jobs where actual cost within 10% of estimated
  - Percent of jobs where actual cost >20% more than estimated (losing money)
  - Percent of jobs where actual cost <20% less than estimated (pricing too high)
  - Average variance by product type
- Variance by category:
  - Material variance: actual usage vs estimated (qty, waste)
  - Labor variance: actual labor hours vs estimated
  - Other variance: shipping, setup, etc.
- Identify problem areas:
  - Which products have highest variance?
  - Which operations are hardest to estimate?
  - Are estimates biased (consistently high or low)?
- Trends: is estimate accuracy improving over time?
- AI Estimator integration:
  - Compare AI Estimator predictions to actual
  - Feedback loop: feed actual costs back to AI model for retraining
  - Show which customer product combinations are hardest to estimate accurately
- Pricing recommendations:
  - "You're underpricing custom folded products by 15% on average"
  - "You're overpricing digital 4-color orders by 8% on average"

**US-9.6: Monthly P&L Report**

As a business owner
I want a monthly P&L statement
So that I can manage the business financially

Acceptance Criteria:
- Monthly P&L report (automated, generated monthly):
  - Revenue (gross)
  - Cost of goods sold (COGS): materials, direct labor, shipping
  - Gross margin $
  - Gross margin %
  - Operating expenses: overhead allocation, management, admin
  - Operating income
  - Other income/expense (interest, etc.)
  - Net income
  - Net margin %
- Comparison: current month vs. previous month, same month last year
- Variance: actual vs budget (if budget defined)
- Drill-down: click on line item to see detail (e.g., click on "Cost of Materials" to see material breakdown)
- Distribution: can email P&L to management team monthly
- Consolidated view: if multi-location, can roll up to combined P&L
- Tax reporting: categorize expenses for tax purposes

**US-9.7: KPI Dashboard and Alerts**

As a business owner
I want to monitor key metrics
So that I can identify problems early

Acceptance Criteria:
- KPI dashboard shows:
  - Revenue (this month, YTD, trend)
  - Gross margin % (target, actual, trend)
  - Job count (current month)
  - Average order value
  - On-time delivery rate %
  - Customer satisfaction (if integrated with support)
  - Cash position / accounts receivable aging
- Traffic lights: red/yellow/green based on thresholds
  - Green: revenue growing >10% YoY, margin >25%
  - Yellow: revenue flat, margin 15-25%
  - Red: revenue declining, margin <15%
- Alerts:
  - Alert if gross margin drops below target
  - Alert if on-time delivery drops below 95%
  - Alert if aged receivables >30 days exceed threshold
  - Alert if revenue trending down for 3 consecutive months
- Threshold configuration: can set custom alert thresholds per KPI
- Historical comparison: "5 years ago same month we did $X revenue"

### 4. Functional Requirements

**Data Warehouse:**
- Separate reporting schema (read-only) fed from MIS transactional database
- Daily refresh (extract transform load process)
- Fact tables: Orders, OrderLineItems, Costs, Transactions
- Dimension tables: Customers, Products, Dates, Employees
- Aggregated tables for fast reporting: DailyRevenue, MonthlyP&L, CustomerMetrics

**Cost Calculation Engine:**
- For each job, calculate:
  - Material cost: (substrate cost per unit × quantity × (1 + waste factor))
  - Labor cost: sum of labor hours × labor rate for each operation
  - Shipping cost: from shipping module
  - Setup cost: (setup time × labor rate)
  - Overhead: (cost per order OR % of revenue, configurable)
  - Total cost = sum of above
- Estimated cost: calculated when estimate created, using AI Estimator data
- Actual cost: accumulated as job executes (material received, labor tracked, etc.)

**Database Schema:**
```
job_costs:
  - cost_id (PK)
  - job_id (FK)
  - material_cost (cents)
  - labor_cost (cents)
  - shipping_cost (cents)
  - setup_cost (cents)
  - overhead_allocation (cents)
  - total_cost (cents)
  - estimated_cost (cents)
  - cost_calculated_date
  - cost_category (COGS, overhead, other)

revenue_transactions:
  - transaction_id (PK)
  - order_id (FK)
  - customer_id (FK)
  - amount (cents)
  - transaction_date
  - transaction_type (invoice, payment, credit)

customer_metrics:
  - metric_id (PK)
  - customer_id (FK)
  - metric_date
  - revenue_ytd (cents)
  - margin_ytd_percent
  - order_count_ytd
  - lifetime_revenue (cents)
  - last_order_date

daily_kpis:
  - kpi_date (PK)
  - revenue_daily (cents)
  - orders_daily
  - gross_margin_percent_daily
  - on_time_delivery_percent
```

**API Endpoints:**
- GET /analytics/revenue (query: period, product_type, customer_id)
- GET /analytics/job-profitability (query: job_id)
- GET /analytics/customer/{customer_id}/profitability
- GET /analytics/costs (query: cost_type, time_period)
- GET /analytics/estimate-accuracy (query: product_type, time_period)
- GET /analytics/kpis (query: date_range)
- GET /analytics/monthly-p&l (query: month, year)

**Integrations:**
- GC Finance system: read invoice and payment data
- External accounting software: export P&L for reconciliation (QuickBooks, Xero integration)

### 5. Data Requirements

See database schema above. Key requirement: cost data must be accumulated as job progresses, not calculated retroactively.

### 6. Edge Cases

- Job cancelled mid-production: how to allocate sunk costs?
- Multi-revenue-stream order (some items shipped, some held): recognize revenue per shipped item, not order
- Overhead allocation varies by facility: each facility calculates own overhead
- Customer merged (consolidate P&L): use latest customer ID, archive old ID
- Cost data missing or incomplete: show "estimated" flag, allow manual override
- Negative margin (unprofitable job): highlight in red, generate alert

### 7. Out of Scope

- Inventory accounting (valuation, LIFO/FIFO for inventory value)
- Tax reporting beyond categorization (accountant handles actual returns)
- Budget vs actual variance analysis (budgeting system separate)
- Predictive financial forecasting (separate analytics engine)
- Custom report builder (templated reports only)

### 8. Integration Points

- **MIS Orders & Costs:** Read cost data, order data
- **GC Finance:** Read invoice and payment data for revenue recognition
- **MIS Shipping:** Read actual shipping costs
- **AI Estimator:** Read estimated costs
- **External Accounting:** Export P&L data
- **Alerts:** Generate financial performance alerts

---

## PRD NEW-3: Data Export

**Classification:** Advanced
**Target Users:** Finance managers, business analysts, integrators

### 1. Problem Statement

Users need to export MIS data for:
- Integration with external systems (accounting, business intelligence)
- Backup and archival
- Analysis in Excel/BI tools
- Compliance and auditing

Current system has no export capability. Users manually compile data from portal or request dumps.

### 2. Solution Overview

Build data export system that:
1. **Format Support:** CSV and Excel formats
2. **Entity Coverage:** Export all major entities (orders, jobs, customers, substrates, etc.)
3. **Filtering:** Export subset of data by date range, customer, status
4. **Scheduling:** Scheduled automated exports
5. **Integration:** REST API for programmatic access

### 3. User Stories

**US-10.1: Export Orders as CSV/Excel**

As a finance manager
I want to export orders with financial data
So that I can analyze in Excel

Acceptance Criteria:
- Export button on Orders list view
- Format options: CSV or Excel (.xlsx)
- Columns included:
  - Order ID, Customer, Order Date, Product Type, Quantity
  - Selling Price, Cost, Margin $, Margin %
  - Status, Expected Delivery, Actual Delivery
  - Assigned Account Manager
- Filter options: date range, customer, status, product type, margin threshold
- Download generated within 30 seconds
- File naming: "orders_2026-03-15.xlsx"
- Excel file includes: orders tab, summary tab with totals/averages
- Can export up to 10,000 records per export

**US-10.2: Export Customers with Metrics**

As a business owner
I want to export customer list with revenue and profitability
So that I can segment and target

Acceptance Criteria:
- Columns: Customer ID, Name, Email, Phone, Address
- Metrics: Total Revenue, YTD Revenue, Lifetime Value, Margin %
- Order count, Last Order Date, Status (active/inactive)
- Account Manager, Tier (A/B/C)
- Filter by segment, revenue range, status

**US-10.3: Scheduled Automated Exports**

As a finance manager
I want to automatically export data monthly
So that I have regular backups and reports

Acceptance Criteria:
- Create export schedule: entity type, format, filters, frequency
- Frequency options: daily, weekly, monthly
- Email export file to list of recipients
- Store exports in cloud storage (GCS) with retention policy
- Export history: can see all previous exports and download older versions

**US-10.4: Export Jobs with Cost Details**

As a production manager
I want to export job details with costs
So that I can analyze production efficiency

Acceptance Criteria:
- Columns: Job ID, Order ID, Status, Product Type, Quantity
- Estimated Cost, Actual Cost, Variance $, Variance %
- Material Cost, Labor Cost, Shipping Cost
- Start Date, End Date, Duration Hours
- Press/Equipment, Setup Time
- On-Time (Yes/No)

**US-10.5: API Export Endpoint**

As a technical integrator
I want to query and export data via API
So that I can integrate MIS with BI tools

Acceptance Criteria:
- REST endpoint: GET /export/{entity_type}
- Query parameters: filters, format, date_range
- Response: CSV content or file download URL
- Supports: orders, jobs, customers, products, costs, revenue
- Pagination: supports large result sets
- Rate limiting: 10 exports per hour per API key

### 4. Functional Requirements

- CSV generation: use csv library
- Excel generation: use openpyxl library
- File storage: upload to GCS with signed URLs
- Email: SendGrid integration for sending exports
- API: implement export endpoints

### 5. Data Requirements

Standard export formats per entity.

### 6. Edge Cases

- Export contains sensitive data (customer PII): sanitization options
- Large export (100K+ rows): streaming CSV generation, chunked output
- Export requested by non-owner: permission check required
- Data changes during export: point-in-time snapshot

### 7. Out of Scope

- Custom report builder
- BI tool direct connection (future)
- Real-time data sync (batch exports only)

### 8. Integration Points

- **All MIS data tables:** Read access for export
- **Cloud storage (GCS):** Store exported files
- **Email service:** Send export notifications
- **Auth:** User permissions on export

---

## PRD NEW-4: Machine Connectivity and JDF Integration

**Classification:** Advanced
**Target Users:** Technical integrators, print engineers, IT staff

### 1. Problem Statement

Currently jobs are assigned to presses but there's no two-way communication with press systems:
- No real-time job status from press (only manual status updates)
- RIPs and press systems can't pull jobs automatically
- No integration with press vendor systems (Heidelberg Prinect, KBA, etc.)
- Manual hand-off of job files and specifications

Advanced PSPs need:
- Real-time bidirectional communication with presses
- Job queue visible on press RIP
- Production metrics (duration, waste) captured automatically
- Integration with industry-standard systems (JDF, Prinect, etc.)

### 2. Solution Overview

Build machine connectivity system that:
1. **JDF Queue Publishing:** Publish scheduled jobs as JDF tickets that presses can pull
2. **Job Status Feedback:** Receive real-time updates from press (start, completion, exceptions)
3. **Production Metrics:** Capture production duration, waste, quality checks
4. **Press System Integration:** Integrate with Heidelberg Prinect, KBA Prinect, etc.
5. **File Management:** Serve final production files to RIP on demand
6. **Quality Feedback Loop:** Integrate quality checks/failures back to MIS

### 3. User Stories

**US-11.1: JDF Queue Publishing**

As a print engineer
I want presses to pull jobs from MIS as JDF
So that jobs flow automatically to presses

Acceptance Criteria:
- Configuration: define JDF queue endpoint and credentials
- For each scheduled job, generate JDF ticket with:
  - Job ID, order ID, product specs
  - Imposition details, substrate specifications
  - Finishing specifications, file references
  - Expected production time, quality requirements
- JDF published to queue when job status = "ready for production"
- Press/RIP can poll queue or subscribe to updates
- Job locked once picked up by press (can't reassign manually)
- Fallback: if JDF not supported, can generate PDF job ticket instead

**US-11.2: Real-Time Job Status from Press**

As a production manager
I want to see when presses start and complete jobs
So that I know actual production progress

Acceptance Criteria:
- Press RIP or press operator can update job status in MIS:
  - Started printing (timestamp)
  - Completed (timestamp, quantity printed, waste count)
  - Exceptions (damage, restart needed, etc.)
- Status updates flow back to MIS job timeline
- Delay alert: if job takes >20% longer than estimated, alert production manager
- Quality flags: operator can flag quality issues requiring inspection
- Automatic scheduling update: finishing queue starts when press confirms completion

**US-11.3: Press System Integration (Heidelberg Prinect, KBA, etc.)**

As a technical integrator
I want MIS to integrate with our press system
So that workflows are fully automated

Acceptance Criteria:
- Supported systems: Heidelberg Prinect, KBA Prinect (others via API partners)
- Integration methods:
  - JDF/CIP3 workflow (standard)
  - REST API calls (if system supports)
  - SFTP file transfer (fallback)
- Bidirectional sync:
  - MIS sends job specs to press system as JDF
  - Press system sends job completion and metrics back to MIS
- File delivery: MIS serves production files (PDF, TIFF, etc.) to press RIP
- Authentication: secure API key exchange with press system
- Testing: "Test Connection" to verify integration working

**US-11.4: Production Metrics Capture**

As a production manager
I want to automatically capture production duration and waste
So that I have accurate actual costs

Acceptance Criteria:
- Press operator (or automatic sensor) records:
  - Actual start time
  - Actual end time
  - Quantity printed (vs. quantity ordered)
  - Waste count
  - Reason for waste (if applicable)
- Metrics recorded on job and aggregated for:
  - Actual labor cost calculation
  - Material usage tracking
  - Efficiency analysis
  - Machine utilization reporting
- Can be entered manually via form or received automatically from press system

**US-11.5: File Management and Serving**

As a press operator
I want the RIP to automatically get the correct production file
So that I don't have to manually find and load files

Acceptance Criteria:
- MIS manages file repository:
  - Original job file uploaded and stored
  - Proofed and approved version stored
  - Final production file prepared (RIP-ready, color separated, etc.)
- When job assigned to press:
  - MIS publishes file URL/location to JDF ticket
  - Press RIP automatically pulls file
  - File delivered with correct specifications (resolution, color space, etc.)
- Fallback: if RIP can't pull automatically, operator can download from MIS web interface

**US-11.6: Quality Feedback and Integration**

As a quality inspector
I want to flag quality issues in MIS
So that they're tracked and root-caused

Acceptance Criteria:
- Quality inspection form on job:
  - Quality pass/fail
  - Issue type (color, registration, damage, substrate, etc.)
  - Issue description and photos
  - Corrective action taken (reprint, customer approval, etc.)
- Quality data flows to:
  - Job record (for history)
  - Machine record (track press defect rates)
  - Customer record (track quality issues by supplier/customer combo)
- Alerts: excessive quality issues on machine → escalate to maintenance
- Trends: quality by product type, by operator, by substrate lot
- Integration with pressure/color management: if press has spectrophotometer, feed color measurement data back

### 4. Functional Requirements

- JDF server: HTTP endpoint serving JDF tickets
- Job queue: database of jobs ready for production, sorted by priority
- Webhook receivers: endpoints to receive updates from press systems
- File serving: secure file delivery to RIP
- Authentication: API key and HTTPS for security
- Integration framework: adapter pattern for different press systems

### 5. Data Requirements

- Job queue with priority and status
- Production metrics (start, end, waste, quality)
- File repository with versioning
- Integration logs (all data exchanges)

### 6. Edge Cases

- Job pulled by one press, then manually reassigned: conflict resolution
- Press system offline when trying to publish JDF: queue for later delivery
- Production file not ready: hold job in queue, notify engineer
- Metrics received after job marked complete: allow updates within 24 hours

### 7. Out of Scope

- Color management / spectrophotometry integration (separate system)
- IoT sensor integration for real-time monitoring (future)
- Energy monitoring (future)

### 8. Integration Points

- **Press RIP systems:** JDF delivery, file serving
- **Press operator systems:** Status updates
- **External press vendors:** Prinect, KBA, etc.

---

