# Quote-to-Order Conversion Workspace Design

**Date:** 2026-04-07 | **Owner:** Styrbjorn (WS1a) | **Status:** Approved

## Context

WS1a owns Quote-to-Order conversion, Job Ticketing, Post-Conversion Order Editing, and Reprints. This design covers the full conversion experience: from clicking "Convert to Order" on an approved estimate through to a created order with a draft job ticket containing AI-generated summary and per-step annotations.

Key inputs:
- GelatoConnect MIS Development Plan v2.2 (PRD 1: Quote-to-Order, PRD 3: Job Ticketing)
- Pradeep/Styrbjorn meeting (Apr 7, 2026) - job ticket importance, AI summaries, per-step annotations
- Existing prototype in connect-mis-prototype (estimate-details.tsx, order-details.tsx)

## Problem

1. **Conversion is too shallow.** Current prototype uses a small modal for conversion. Downstream needs (delivery date for scheduling, per-step annotations for production) aren't captured.
2. **Job tickets are disconnected from conversion.** The moment when a CSE has full job context is at conversion time, but the current flow doesn't surface the job ticket until after.
3. **Legacy MIS job tickets are unreadable.** 6-page data dumps that a human CSE rewrites as shorthand. AI should replace this manual step.
4. **No per-step annotation capability.** Production operators need step-specific instructions (e.g., "cross-cut first, watch grain direction"), but the current prototype only has a single `specialInstructions` string.

## Design

### The Conversion Workspace

**Trigger:** User clicks "Convert to Order" on an approved estimate. Instead of a modal, they navigate to a **full-page Conversion Workspace**.

**Layout:** Single scrollable page with three sections. One "Convert to Order" button at the bottom. Designed for the 80% case (simple job, maybe one note) while supporting the 20% case (complex multi-part job with per-step annotations).

```
+---------------------------------------------------+
|  <- Back to Estimate EST-2025-047                  |
|  Convert to Order                                  |
|----------------------------------------------------|
|  SECTION 1: Order Details                          |
|                                                    |
|  [PO Number    ]  [Delivery Date *]  <- required   |
|  [Customer Ref ]  [Artwork: Upload / Prepress]     |
|                                                    |
|  Delivery Addresses  [+ Add Address]               |
|  +-- 123 Main St --- Qty: 2000 -----------------+  |
|  +----------------------------------------------+  |
|----------------------------------------------------|
|  SECTION 2: Job Ticket Preview                     |
|                                                    |
|  +--------------------------------------------+    |
|  | (sparkle) AI Summary (editable)             |    |
|  | "24-page saddle-stitched booklet,           |    |
|  |  130gsm silk cover, CMYK, 2500 qty,         |    |
|  |  trim 210x297mm, matt laminate cover"       |    |
|  |                                      [Edit] |    |
|  +--------------------------------------------+    |
|                                                    |
|  Production Steps         from workflow: WF-01     |
|  +- 1. Prepress ------------------- [Add note] -+  |
|  |  Machine: -- | Est: 45min                     |  |
|  +-----------------------------------------------+  |
|  +- 2. Printing ------------------- [Add note] -+  |
|  |  Machine: HP Indigo 12000 | Est: 2h 15m      |  |
|  +-----------------------------------------------+  |
|  +- 3. Lamination ----------------- [Add note] -+  |
|  |  Machine: Autobond 76 | Est: 1h 30m          |  |
|  +-----------------------------------------------+  |
|  +- 4. Cutting --------- (note added) ----------+  |
|  |  Machine: Polar 115 | Est: 45min              |  |
|  |  "Cross-cut first, then trim to               |  |
|  |   final size. Watch grain direction."          |  |
|  +-----------------------------------------------+  |
|  +- 5. Folding -------------------- [Add note] -+  |
|  +-----------------------------------------------+  |
|  +- 6. Binding -------------------- [Add note] -+  |
|  +-----------------------------------------------+  |
|  +- 7. QC & Packaging ------------- [Add note] -+  |
|  +-----------------------------------------------+  |
|----------------------------------------------------|
|  SECTION 3: Review & Convert                       |
|  Summary: 2,500 qty -> 1 address                   |
|  Total: EUR 4,250.00                               |
|                                                    |
|           [Cancel]          [Convert to Order]     |
+---------------------------------------------------+
```

### Section 1: Order Details

Compact section capturing what downstream systems need.

| Field | Required | Notes |
|-------|----------|-------|
| PO Number | No | Customer's purchase order reference |
| Delivery Date | **Yes** | Cannot schedule without it (per Pradeep) |
| Customer Reference | No | Free text |
| Artwork Source | Yes | "Customer uploads" (portal link sent) or "Pre-press uploads" |
| Delivery Addresses | Yes, at least one | Quantity per address, must sum to order total |

Multi-address allocation uses the same UX as the current prototype (quantity allocation bar, add/edit addresses).

### Section 2: Job Ticket Preview

The core of the workspace. Auto-generates from estimate data when the page loads.

#### AI Summary

- Appears in a highlighted card at the top of the job ticket section
- Generated from estimate data: product specs, materials, quantities, workflow steps
- Produces 2-4 lines of human-readable shorthand (replaces the CSE who manually writes this today)
- Editable: clicking "Edit" turns it into a textarea
- Once edited, an "Edited" badge appears
- Saved with the job ticket; appears on printed PDF and in station views

**Example outputs:**

Booklet job:
> "24-page saddle-stitched booklet. Cover: 130gsm silk, CMYK + matt lamination. Text: 100gsm uncoated, CMYK. Trim: 210x297mm. Qty: 2,500. Special: short grain on cover."

Business card job:
> "Business cards, 400gsm silk, CMYK both sides + spot UV front. Trim: 85x55mm. Qty: 5,000. Round corners 3mm."

**For the prototype:** Pre-written realistic summaries for each mock estimate. UX shows a brief loading state, then text appears as if generated.

**Future (not prototyped):** Customer-configurable summary style/terminology. AI learns from edits over time.

#### Production Steps

- Steps pulled from the workflow template linked to the product category
- Each step shows: name, assigned machine, estimated duration
- **Per-step annotations** use inline expand (starting hypothesis, needs user testing):
  - Each step has a subtle "Add note" affordance
  - Clicking expands a text input inline
  - Steps without notes stay compact (one line)
  - Steps with notes show them expanded
- Annotation UX direction to be validated through prototyping - alternatives include side panel or always-visible fields

### Section 3: Review & Convert

- Summary line: quantity, address count, total price
- "Cancel" returns to estimate detail
- "Convert to Order" creates the order and draft job ticket in one action

### Validation Before Conversion

| Rule | Behavior |
|------|----------|
| Delivery date required | Button disabled, field highlighted |
| At least one address with quantity | Button disabled |
| Address quantities must sum to order total | Warning message |
| Customer must exist in system | Shouldn't happen (coming from estimate) but validated |

### What Gets Created on Convert

**Order:**
- New Order ID generated
- Fields: PO#, delivery date, customer ref, addresses, line items from estimate
- Status: "Pending Files" (workflow starts, pauses at file upload)
- `estimateId` links back to source estimate

**Job Ticket (draft):**
- AI summary (possibly edited)
- Per-step annotations
- Linked workflow template
- Status: "Created"

**Estimate updated:**
- Status -> "Converted"
- `convertedOrderId` links to new order

**Not created at conversion:**
- Final PDF job ticket (post-proof-approval via WB HTML-to-PDF)
- Inventory reservations (WB-11 during workflow execution)
- Shipping labels

### Post-Conversion: Job Ticket as Living Document

After conversion, user lands on the Order Detail page. The job ticket is accessible as a tab and remains editable until production starts.

**Editing permissions by order status:**

| Order Status | Job Ticket Editable? | Who |
|-------------|---------------------|-----|
| Pending / Confirmed | Yes | CSE, Production Manager |
| In Production | Read-only | Operators view at stations |
| Completed | Read-only | Archive |

**Edit versioning:** Every edit tracked (who, what, when). Shown via a discreet history link, not cluttering the main view.

**The job ticket on the order page shows:**
1. AI summary (editable, with edit history)
2. Production steps with annotations (same inline UX as conversion workspace)
3. Materials list
4. QR code / barcode for scanning
5. "Download PDF" and "Print" actions

### Data Model Changes

**New/modified on Order:**

```
source_estimate_id: string
po_number: string
required_delivery_date: string (required)
customer_reference: string
artwork_source: "customer_upload" | "prepress_upload"
addresses: OrderAddress[] (with quantity per address)
```

**New/modified on JobTicket:**

```
ai_summary: string
ai_summary_edited: boolean
ai_summary_edit_history: EditRecord[]
steps[].annotations: StepAnnotation[]

interface StepAnnotation {
  id: string
  text: string
  author: string
  created_at: string
  updated_at: string
}
```

**New/modified on Estimate:**

```
converted_to_order_id: string
converted_at: string
converted_by: string
```

## Scope Boundaries

**In scope for this design:**
- Full-page conversion workspace (replaces modal)
- AI-generated job ticket summary (mocked in prototype)
- Per-step annotation UX
- Post-conversion job ticket editing on order detail page
- Data model for annotations and AI summary

**Out of scope (future):**
- Job ticket PDF template customization per customer
- AI summary style configuration
- Common component for quote letters / job tickets / invoices (Pradeep's "design editor" concept)
- Station tablet view consuming annotations
- Post-proof-approval final PDF generation (WB HTML-to-PDF - separate from this UX)

## Open Questions

1. **Annotation UX pattern:** Inline expand is the starting hypothesis. Needs prototyping and testing with users. Alternatives: side panel, always-visible fields.
2. **Multi-part products:** One job ticket per job covering all parts, or one per part? Likely one per job - confirm with Pradeep (also listed as open question in dev plan).
3. **AI summary generation:** What model/prompt produces the best shorthand? Needs real job ticket examples from customers (Pradeep will share).
4. **Job ticket template library:** Customers want tickets that look like their existing ones. How many starting templates do we need? Deferred but important.
