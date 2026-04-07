# Quote-to-Order Conversion Workspace — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing conversion modal with a full-page Conversion Workspace that includes order details, AI-generated job ticket summary, per-step annotations, and one-click conversion.

**Architecture:** New `convert-to-order` screen route. New `ConvertToOrder` component (~600-800 lines). Extends existing types with `aiSummary` and `StepAnnotation`. Modifies `estimate-details.tsx` to navigate to the new screen instead of opening a modal. Mock data for AI summaries pre-written per estimate.

**Tech Stack:** React 19, Tailwind CSS, shadcn/ui components, ConeUI design tokens, lucide-react icons. Same patterns as existing prototype.

**Design doc:** `docs/plans/2026-04-07-quote-to-order-conversion-design.md`

---

### Task 1: Add types for AI summary and step annotations

**Files:**
- Modify: `lib/types.ts`

**Step 1: Add new interfaces and extend existing ones**

Add after the `JobTicket` interface (around line 210):

```typescript
export interface StepAnnotation {
  id: string
  text: string
  author: string
  createdAt: string
  updatedAt?: string
}

export interface AiSummaryEditRecord {
  editedAt: string
  editedBy: string
  previousText: string
}
```

Extend `JobTicket` interface — add these fields inside the interface:

```typescript
  aiSummary: string
  aiSummaryEdited: boolean
  aiSummaryEditHistory: AiSummaryEditRecord[]
```

Extend `ProductionStep` interface — add after the `notes` field:

```typescript
  annotations: StepAnnotation[]
```

Extend `Estimate` interface — add these fields:

```typescript
  convertedAt?: string
  convertedBy?: string
```

**Step 2: Update existing mock data for type compatibility**

In `lib/mock-data/jobs.ts`, add `annotations: []` to every step in every job ticket, and add `aiSummary: ""`, `aiSummaryEdited: false`, `aiSummaryEditHistory: []` to every job ticket object.

**Step 3: Commit**

```bash
git add lib/types.ts lib/mock-data/jobs.ts
git commit -m "feat: add types for AI summary and step annotations"
```

---

### Task 2: Add navigation route for convert-to-order screen

**Files:**
- Modify: `lib/navigation-context.tsx`
- Modify: `components/app-shell.tsx`

**Step 1: Add screen type**

In `lib/navigation-context.tsx`, add to the `Screen` union type (after `"estimate-setup"`):

```typescript
  | "convert-to-order"
```

**Step 2: Add route in app-shell**

In `components/app-shell.tsx`:

Add import at the top:

```typescript
import ConvertToOrder from "@/components/convert-to-order"
```

Add case in the switch statement (after the `estimate-setup` case):

```typescript
      case "convert-to-order":
        return <ConvertToOrder estimateId={params.estimateId || ""} />
```

**Step 3: Commit**

```bash
git add lib/navigation-context.tsx components/app-shell.tsx
git commit -m "feat: add convert-to-order route"
```

---

### Task 3: Create AI summary mock data

**Files:**
- Create: `lib/mock-data/ai-summaries.ts`

**Step 1: Create the mock AI summaries file**

```typescript
// Pre-written AI summaries for each estimate, simulating what the AI would generate
// from estimate data (product specs, materials, quantities, workflow steps)

export const mockAiSummaries: Record<string, string> = {
  "EST-2025-001":
    "64-page perfect-bound annual report. Interior: 170gsm silk, CMYK. Cover: 350gsm silk, CMYK + matt lamination. Trim: A4 (210x297mm). Qty: 2,000. FSC-certified stock. Split delivery: Munich + London.\n16-page saddle-stitched executive summary. 200gsm gloss throughout, CMYK. Trim: A5. Qty: 500.",
  "EST-2025-002":
    "96-page perfect-bound product catalogue. Interior: 150gsm silk, CMYK. Cover: 300gsm art, CMYK + Pantone 186C + spot UV. Trim: A4 (210x297mm). Qty: 5,000. Proofs required before production.",
  "EST-2025-003":
    "Business cards, 400gsm silk, CMYK both sides + matt lamination both sides. Trim: 85x55mm. Qty: 10,000.\nLetterheads A4, 120gsm uncoated, single-sided CMYK header + footer. Qty: 5,000.",
  "EST-2025-004":
    "DL trifold flyers, 170gsm silk, CMYK both sides. Flat size: 297x210mm, folded: 99x210mm. Qty: 20,000. Two parallel letter folds.",
  "EST-2025-005":
    "A1 exhibition posters, 200gsm silk, CMYK single-sided + matt lamination. Trim: 594x841mm. Qty: 200. Tube packaging for shipping.",
  "EST-2025-006":
    "NCR invoice pads (A5), 3-part carbonless (white/yellow/pink), black single-sided. Glue-padded in sets of 50. Qty: 100 pads.",
  "EST-2025-007":
    "A4 presentation folders, 350gsm silk, CMYK + spot UV logo + matt lamination. Die-cut with glued pocket and business card slits. Qty: 2,000.",
  "EST-2025-008":
    "256-page hardcover coffee-table book. Interior: 170gsm art, CMYK. Cover: printed case wrap, matt lamination. Trim: 300x300mm. Qty: 1,000. Section-sewn binding. Includes dust jacket.",
  "EST-2025-009":
    "Vinyl banners, 440gsm PVC, CMYK single-sided. Size: 3000x1000mm. Qty: 50. Hemmed edges with eyelets every 500mm.",
  "EST-2025-010":
    "Custom rigid gift boxes, 1500gsm greyboard + 150gsm art wrap, CMYK + gold foil logo. Size: 200x200x100mm. Magnetic closure. Qty: 500.",
}
```

**Step 2: Commit**

```bash
git add lib/mock-data/ai-summaries.ts
git commit -m "feat: add mock AI summaries for estimates"
```

---

### Task 4: Create production steps mock data for conversion preview

**Files:**
- Create: `lib/mock-data/conversion-steps.ts`

**Step 1: Create mock production steps that appear during conversion**

These are the workflow template steps that would be shown in the job ticket preview before conversion. Mapped by estimate ID to the workflow template steps.

```typescript
import type { ProductionStep } from "@/lib/types"

// Production steps generated from workflow templates for each estimate
// These appear in the conversion workspace as the job ticket preview
export const mockConversionSteps: Record<string, ProductionStep[]> = {
  "EST-2025-003": [
    { id: "cs-003-1", name: "Prepress", sequence: 1, status: "pending", assignedStation: "Prepress Desk 2", estimatedDuration: 30, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-003-2", name: "Digital Printing", sequence: 2, status: "pending", assignedStation: "HP Indigo 12000", estimatedDuration: 180, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-003-3", name: "Lamination", sequence: 3, status: "pending", assignedStation: "Autobond 76 TH", estimatedDuration: 90, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-003-4", name: "Cutting", sequence: 4, status: "pending", assignedStation: "Polar 115 XT", estimatedDuration: 120, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-003-5", name: "QC & Packaging", sequence: 5, status: "pending", assignedStation: "QC Station", estimatedDuration: 60, notes: "", annotations: [], isParallel: false, isOptional: false },
  ],
  "EST-2025-004": [
    { id: "cs-004-1", name: "Prepress", sequence: 1, status: "pending", estimatedDuration: 20, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-004-2", name: "Offset Printing", sequence: 2, status: "pending", assignedStation: "Heidelberg XL-106", estimatedDuration: 240, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-004-3", name: "Cutting", sequence: 3, status: "pending", assignedStation: "Polar 115 XT", estimatedDuration: 60, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-004-4", name: "Folding", sequence: 4, status: "pending", assignedStation: "Stahlfolder TH-82", estimatedDuration: 180, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-004-5", name: "QC & Packaging", sequence: 5, status: "pending", estimatedDuration: 45, notes: "", annotations: [], isParallel: false, isOptional: false },
  ],
  "EST-2025-008": [
    { id: "cs-008-1", name: "Prepress & CTP", sequence: 1, status: "pending", assignedStation: "Prepress Desk 1", estimatedDuration: 240, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-2", name: "Offset Printing — Interior", sequence: 2, status: "pending", assignedStation: "Heidelberg XL-106", estimatedDuration: 960, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-3", name: "Offset Printing — Cover + Jacket", sequence: 3, status: "pending", assignedStation: "Heidelberg XL-106", estimatedDuration: 120, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-4", name: "Lamination — Cover", sequence: 4, status: "pending", assignedStation: "Autobond 76 TH", estimatedDuration: 60, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-5", name: "Folding & Gathering", sequence: 5, status: "pending", estimatedDuration: 480, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-6", name: "Section Sewing", sequence: 6, status: "pending", estimatedDuration: 360, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-7", name: "Case Making", sequence: 7, status: "pending", estimatedDuration: 180, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-8", name: "Casing-In", sequence: 8, status: "pending", estimatedDuration: 240, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-9", name: "QC & Packaging", sequence: 9, status: "pending", estimatedDuration: 120, notes: "", annotations: [], isParallel: false, isOptional: false },
  ],
}

// Fallback generic steps for estimates without specific steps
export const genericDigitalSteps: ProductionStep[] = [
  { id: "gen-1", name: "Prepress", sequence: 1, status: "pending", estimatedDuration: 30, notes: "", annotations: [], isParallel: false, isOptional: false },
  { id: "gen-2", name: "Printing", sequence: 2, status: "pending", estimatedDuration: 120, notes: "", annotations: [], isParallel: false, isOptional: false },
  { id: "gen-3", name: "Finishing", sequence: 3, status: "pending", estimatedDuration: 60, notes: "", annotations: [], isParallel: false, isOptional: true },
  { id: "gen-4", name: "Cutting", sequence: 4, status: "pending", estimatedDuration: 45, notes: "", annotations: [], isParallel: false, isOptional: false },
  { id: "gen-5", name: "QC & Packaging", sequence: 5, status: "pending", estimatedDuration: 30, notes: "", annotations: [], isParallel: false, isOptional: false },
]
```

**Step 2: Commit**

```bash
git add lib/mock-data/conversion-steps.ts
git commit -m "feat: add mock production steps for conversion preview"
```

---

### Task 5: Build the ConvertToOrder component — Section 1 (Order Details)

**Files:**
- Create: `components/convert-to-order.tsx`

**Step 1: Create the component with the order details section**

Create `components/convert-to-order.tsx`. This is a large component so we build it in stages. Start with the page shell and Section 1 (Order Details).

```typescript
"use client"

import { useState, useEffect } from "react"
import { useNavigation } from "@/lib/navigation-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  FileCheck,
  Plus,
  Trash2,
  Calendar,
  Upload,
  Monitor,
  MapPin,
  Sparkles,
  Pencil,
  Check,
  X,
  MessageSquarePlus,
  Printer,
  Download,
  Clock,
  Wrench,
} from "lucide-react"
import { mockEstimates } from "@/lib/mock-data/estimates"
import { mockAiSummaries } from "@/lib/mock-data/ai-summaries"
import { mockConversionSteps, genericDigitalSteps } from "@/lib/mock-data/conversion-steps"
import type { Estimate, ProductionStep, StepAnnotation } from "@/lib/types"

interface EstimateAddress {
  id: string
  label: string
  name: string
  company: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  quantity: number
}

export default function ConvertToOrder({ estimateId }: { estimateId: string }) {
  const { navigateTo, goBack } = useNavigation()

  // Find the estimate
  const estimate = mockEstimates.find((e) => e.id === estimateId) as Estimate | undefined

  // --- Section 1: Order Details state ---
  const [poNumber, setPoNumber] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [customerRef, setCustomerRef] = useState("")
  const [artworkSource, setArtworkSource] = useState<"customer" | "prepress">("customer")
  const [deliveryAddresses, setDeliveryAddresses] = useState<EstimateAddress[]>([
    {
      id: "addr-1",
      label: "Primary",
      name: "",
      company: estimate?.customerName || "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      quantity: estimate?.lineItems.reduce((sum, li) => sum + li.quantity, 0) || 0,
    },
  ])
  const [showAddressForm, setShowAddressForm] = useState(false)

  // --- Section 2: Job Ticket Preview state ---
  const aiSummaryInitial = mockAiSummaries[estimateId] || "Generating summary..."
  const [aiSummary, setAiSummary] = useState("")
  const [aiSummaryEdited, setAiSummaryEdited] = useState(false)
  const [isEditingSummary, setIsEditingSummary] = useState(false)
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [productionSteps, setProductionSteps] = useState<ProductionStep[]>(
    mockConversionSteps[estimateId] || genericDigitalSteps
  )
  const [expandedAnnotation, setExpandedAnnotation] = useState<string | null>(null)
  const [annotationDraft, setAnnotationDraft] = useState("")

  // --- Converting state ---
  const [isConverting, setIsConverting] = useState(false)

  // Simulate AI summary loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setAiSummary(aiSummaryInitial)
      setSummaryLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [aiSummaryInitial])

  const totalQuantity = estimate?.lineItems.reduce((sum, li) => sum + li.quantity, 0) || 0
  const allocatedQuantity = deliveryAddresses.reduce((sum, a) => sum + a.quantity, 0)

  // Validation
  const canConvert = deliveryDate !== "" && deliveryAddresses.length > 0 && deliveryAddresses.every((a) => a.quantity > 0)

  const handleConvert = () => {
    setIsConverting(true)
    setTimeout(() => {
      const newOrderId = `j-${Date.now().toString(36)}`
      navigateTo("order-detail", { orderId: newOrderId })
    }, 800)
  }

  const handleAddAnnotation = (stepId: string) => {
    if (!annotationDraft.trim()) return
    setProductionSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? {
              ...step,
              annotations: [
                ...step.annotations,
                {
                  id: `ann-${Date.now()}`,
                  text: annotationDraft.trim(),
                  author: "You",
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : step
      )
    )
    setAnnotationDraft("")
    setExpandedAnnotation(null)
  }

  const handleRemoveAnnotation = (stepId: string, annotationId: string) => {
    setProductionSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? { ...step, annotations: step.annotations.filter((a) => a.id !== annotationId) }
          : step
      )
    )
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return m > 0 ? `${h}h ${m}min` : `${h}h`
  }

  if (!estimate) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-neutral-60">Estimate not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-6">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-sm text-neutral-60 hover:text-neutral-90 mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Estimate {estimate.id}
        </button>
        <h1 className="text-2xl font-semibold text-[#212121]">Convert to Order</h1>
        <p className="text-sm text-neutral-60 mt-1">
          {estimate.title} &middot; {estimate.customerName}
        </p>
      </div>

      {/* ========== SECTION 1: Order Details ========== */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-[#212121] mb-4">Order Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-[#383838] mb-1">
              PO Number <span className="text-neutral-50">(optional)</span>
            </label>
            <Input
              value={poNumber}
              onChange={(e) => setPoNumber(e.target.value)}
              placeholder="Enter purchase order number"
              className="rounded-lg"
              style={{ borderRadius: "8px" }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#383838] mb-1">
              Requested Delivery Date <span className="text-[#b5260b]">*</span>
            </label>
            <Input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="rounded-lg"
              style={{ borderRadius: "8px" }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#383838] mb-1">
              Customer Reference <span className="text-neutral-50">(optional)</span>
            </label>
            <Input
              value={customerRef}
              onChange={(e) => setCustomerRef(e.target.value)}
              placeholder="Customer's internal reference"
              className="rounded-lg"
              style={{ borderRadius: "8px" }}
            />
          </div>
        </div>

        {/* Artwork Source */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#383838] mb-2">Artwork Source</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setArtworkSource("customer")}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors text-left ${
                artworkSource === "customer"
                  ? "border-[#007cb4] bg-[#f0f8ff]"
                  : "border-neutral-20 hover:border-neutral-40"
              }`}
            >
              <Upload className="h-5 w-5 text-neutral-60 shrink-0" />
              <div>
                <div className="text-sm font-medium text-[#212121]">Customer uploads artwork</div>
                <div className="text-xs text-neutral-50">Portal link sent to customer</div>
              </div>
            </button>
            <button
              onClick={() => setArtworkSource("prepress")}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors text-left ${
                artworkSource === "prepress"
                  ? "border-[#007cb4] bg-[#f0f8ff]"
                  : "border-neutral-20 hover:border-neutral-40"
              }`}
            >
              <Monitor className="h-5 w-5 text-neutral-60 shrink-0" />
              <div>
                <div className="text-sm font-medium text-[#212121]">Pre-press uploads artwork</div>
                <div className="text-xs text-neutral-50">Operator uploads in order</div>
              </div>
            </button>
          </div>
        </div>

        {/* Delivery Addresses */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-[#383838]">
              Delivery Addresses <span className="text-neutral-50">({deliveryAddresses.length})</span>
            </label>
            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="text-xs text-[#007cb4] hover:underline flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              Add address
            </button>
          </div>

          {/* Allocation bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-neutral-50 mb-1">
              <span>Quantity allocation</span>
              <span className={allocatedQuantity !== totalQuantity ? "text-[#b5260b]" : "text-[#0d8a3f]"}>
                {allocatedQuantity.toLocaleString()} / {totalQuantity.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-neutral-10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  allocatedQuantity === totalQuantity ? "bg-[#0d8a3f]" : "bg-[#007cb4]"
                }`}
                style={{ width: `${Math.min((allocatedQuantity / totalQuantity) * 100, 100)}%` }}
              />
            </div>
          </div>

          {deliveryAddresses.map((addr, idx) => (
            <div key={addr.id} className="flex items-center gap-3 p-3 border rounded-lg mb-2">
              <MapPin className="h-4 w-4 text-neutral-40 shrink-0" />
              <div className="flex-1 min-w-0">
                <Input
                  value={addr.street || addr.company}
                  onChange={(e) => {
                    const updated = [...deliveryAddresses]
                    updated[idx] = { ...updated[idx], street: e.target.value }
                    setDeliveryAddresses(updated)
                  }}
                  placeholder="Enter delivery address"
                  className="rounded-lg text-sm"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div className="w-32">
                <Input
                  type="number"
                  value={addr.quantity}
                  onChange={(e) => {
                    const updated = [...deliveryAddresses]
                    updated[idx] = { ...updated[idx], quantity: parseInt(e.target.value) || 0 }
                    setDeliveryAddresses(updated)
                  }}
                  className="rounded-lg text-sm text-right"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <span className="text-xs text-neutral-50 w-6">qty</span>
              {deliveryAddresses.length > 1 && (
                <button
                  onClick={() => setDeliveryAddresses(deliveryAddresses.filter((_, i) => i !== idx))}
                  className="text-neutral-40 hover:text-[#b5260b]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========== SECTION 2: Job Ticket Preview ========== */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#212121]">Job Ticket Preview</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" style={{ borderRadius: "999px" }}>
              <Download className="h-3.5 w-3.5 mr-1" />
              PDF
            </Button>
            <Button variant="outline" size="sm" style={{ borderRadius: "999px" }}>
              <Printer className="h-3.5 w-3.5 mr-1" />
              Print
            </Button>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-[#f8f7ff] border border-[#e0dff5] rounded-lg p-4 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-[#6c5ce7]" />
            <span className="text-xs font-semibold text-[#6c5ce7] uppercase tracking-wide">
              AI Summary
            </span>
            {aiSummaryEdited && (
              <span className="text-[10px] bg-[#e0dff5] text-[#6c5ce7] px-1.5 py-0.5 rounded-full">
                Edited
              </span>
            )}
          </div>

          {summaryLoading ? (
            <div className="flex items-center gap-2 text-sm text-neutral-50 py-2">
              <div className="h-4 w-4 border-2 border-[#6c5ce7] border-t-transparent rounded-full animate-spin" />
              Generating summary from estimate data...
            </div>
          ) : isEditingSummary ? (
            <div>
              <Textarea
                value={aiSummary}
                onChange={(e) => setAiSummary(e.target.value)}
                className="text-sm min-h-[80px] rounded-lg border-[#e0dff5]"
                style={{ borderRadius: "8px" }}
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setIsEditingSummary(false)
                    setAiSummaryEdited(true)
                  }}
                  className="bg-[#212121] hover:opacity-90 text-white"
                  style={{ borderRadius: "999px" }}
                >
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAiSummary(aiSummaryInitial)
                    setIsEditingSummary(false)
                  }}
                  style={{ borderRadius: "999px" }}
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-[#212121] whitespace-pre-line leading-relaxed">
                {aiSummary}
              </p>
              <button
                onClick={() => setIsEditingSummary(true)}
                className="text-[#6c5ce7] hover:bg-[#e0dff5] p-1.5 rounded-md shrink-0"
                title="Edit summary"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Production Steps */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[#212121]">Production Steps</h3>
            <span className="text-xs text-neutral-50">
              {productionSteps.length} steps &middot; Est.{" "}
              {formatDuration(productionSteps.reduce((sum, s) => sum + s.estimatedDuration, 0))}
            </span>
          </div>

          <div className="space-y-2">
            {productionSteps.map((step, idx) => (
              <div key={step.id} className="border rounded-lg overflow-hidden">
                {/* Step header */}
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-5">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#212121] text-white flex items-center justify-center text-xs font-semibold">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-medium text-[#212121]">{step.name}</span>
                    {step.assignedStation && (
                      <span className="text-xs text-neutral-50 flex items-center gap-1">
                        <Wrench className="h-3 w-3" />
                        {step.assignedStation}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-50 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(step.estimatedDuration)}
                    </span>
                    {step.annotations.length === 0 && expandedAnnotation !== step.id && (
                      <button
                        onClick={() => {
                          setExpandedAnnotation(step.id)
                          setAnnotationDraft("")
                        }}
                        className="text-xs text-[#007cb4] hover:underline flex items-center gap-1"
                      >
                        <MessageSquarePlus className="h-3 w-3" />
                        Add note
                      </button>
                    )}
                  </div>
                </div>

                {/* Annotations */}
                {step.annotations.length > 0 && (
                  <div className="px-4 py-2 border-t bg-amber-50/50">
                    {step.annotations.map((ann) => (
                      <div key={ann.id} className="flex items-start gap-2 py-1">
                        <MessageSquarePlus className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-[#212121] flex-1">{ann.text}</p>
                        <button
                          onClick={() => handleRemoveAnnotation(step.id, ann.id)}
                          className="text-neutral-40 hover:text-[#b5260b] shrink-0"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    {expandedAnnotation !== step.id && (
                      <button
                        onClick={() => {
                          setExpandedAnnotation(step.id)
                          setAnnotationDraft("")
                        }}
                        className="text-xs text-[#007cb4] hover:underline mt-1 flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        Add another note
                      </button>
                    )}
                  </div>
                )}

                {/* Expanded annotation input */}
                {expandedAnnotation === step.id && (
                  <div className="px-4 py-3 border-t bg-neutral-5/50">
                    <div className="flex gap-2">
                      <Input
                        value={annotationDraft}
                        onChange={(e) => setAnnotationDraft(e.target.value)}
                        placeholder={`Add note for ${step.name}...`}
                        className="text-sm rounded-lg flex-1"
                        style={{ borderRadius: "8px" }}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && annotationDraft.trim()) handleAddAnnotation(step.id)
                          if (e.key === "Escape") setExpandedAnnotation(null)
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddAnnotation(step.id)}
                        disabled={!annotationDraft.trim()}
                        className="bg-[#212121] hover:opacity-90 text-white"
                        style={{ borderRadius: "999px" }}
                      >
                        Add
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedAnnotation(null)}
                        style={{ borderRadius: "999px" }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== SECTION 3: Review & Convert ========== */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-60">
              {totalQuantity.toLocaleString()} qty &rarr; {deliveryAddresses.length}{" "}
              {deliveryAddresses.length === 1 ? "address" : "addresses"}
            </div>
            <div className="text-lg font-semibold text-[#212121]">
              &euro;{estimate.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={goBack}
              style={{ borderRadius: "999px", border: "2px solid #bdbdbd" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConvert}
              disabled={!canConvert || isConverting}
              className="bg-[#212121] hover:opacity-90 text-white disabled:opacity-40"
              style={{ borderRadius: "999px" }}
            >
              {isConverting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Converting...
                </>
              ) : (
                <>
                  <FileCheck className="h-4 w-4 mr-1" />
                  Convert to Order
                </>
              )}
            </Button>
          </div>
        </div>
        {!deliveryDate && (
          <p className="text-xs text-[#b5260b] mt-2">
            Delivery date is required to schedule production.
          </p>
        )}
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/convert-to-order.tsx
git commit -m "feat: add ConvertToOrder conversion workspace component"
```

---

### Task 6: Update estimate-details to navigate to conversion workspace

**Files:**
- Modify: `components/estimate-details.tsx`

**Step 1: Change the Convert to Order button handler**

Find the `handleConvertToOrder` function (or the handler that sets `showConvertModal(true)`). Replace it so it navigates to the new screen instead of opening the modal:

```typescript
const handleConvertToOrder = () => {
  navigateTo("convert-to-order", { estimateId: estimate.id })
}
```

The existing modal code can remain in the file for now (dead code) — or remove it if you prefer. The button that triggers conversion should call this new handler instead of `setShowConvertModal(true)`.

**Step 2: Commit**

```bash
git add components/estimate-details.tsx
git commit -m "feat: wire estimate Convert to Order button to new workspace"
```

---

### Task 7: Smoke test the full flow

**Step 1: Start the dev server**

```bash
cd /Users/styrbjornholmberg/Coding/projects/mis_repos/connect-mis-prototype
npm run dev
```

**Step 2: Verify the flow**

1. Navigate to Manage Estimates
2. Click on an estimate with status "Approved" (e.g., EST-2025-003)
3. Click "Convert to Order"
4. Verify: full-page Conversion Workspace loads (not a modal)
5. Verify: Section 1 shows PO#, Delivery Date (required), Customer Ref, Artwork Source, Addresses
6. Verify: Section 2 shows AI summary loading animation, then text appears
7. Verify: Production steps listed with "Add note" affordance
8. Verify: Click "Add note" on a step, type text, press Enter — annotation appears
9. Verify: Edit AI summary — click pencil, modify text, save — "Edited" badge appears
10. Verify: Set delivery date, click "Convert to Order" — navigates to order detail page

**Step 3: Fix any issues found during smoke test**

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: address issues found during conversion workspace smoke test"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Type definitions | `lib/types.ts`, `lib/mock-data/jobs.ts` |
| 2 | Navigation route | `lib/navigation-context.tsx`, `components/app-shell.tsx` |
| 3 | AI summary mock data | `lib/mock-data/ai-summaries.ts` |
| 4 | Production steps mock data | `lib/mock-data/conversion-steps.ts` |
| 5 | ConvertToOrder component | `components/convert-to-order.tsx` |
| 6 | Wire up estimate details | `components/estimate-details.tsx` |
| 7 | Smoke test | — |
