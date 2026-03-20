"use client"

import { useState } from "react"
import { ArrowLeft, Check, Circle, ChevronDown, ExternalLink } from "lucide-react"
import { useNavigation } from "@/lib/navigation-context"

interface TimelineStep {
  label: string
  date: string | null
  status: "completed" | "current" | "pending"
}

const poData: Record<string, {
  id: string; vendor: string; vendorContact: string; vendorEmail: string
  orderId: string; jobId: string; customer: string; step: string; status: string
  specs: { label: string; value: string }[]
  pricing: { quantity: number; rate: string; tier: string; total: string }
  timeline: TimelineStep[]
  trackingNumber: string; bolReference: string
  actualCost: string; estimatedCost: string; variance: string; variancePercent: string
  notes: string
}> = {
  "PO-2026-001": {
    id: "PO-2026-001", vendor: "BindRight Ltd", vendorContact: "James Hartley",
    vendorEmail: "james@bindright.co.uk",
    orderId: "ORD-4521", jobId: "JOB-2026-0892", customer: "Athletix GmbH",
    step: "Perfect Binding", status: "In Progress",
    specs: [
      { label: "Paper Stock", value: "130gsm Silk Coated" },
      { label: "Quantity", value: "2,000 units" },
      { label: "Trim Size", value: "210 x 297mm (A4)" },
      { label: "Spine Width", value: "8mm" },
      { label: "Cover", value: "300gsm + Matt Lam" },
      { label: "Special Instructions", value: "PUR binding required. Score cover at 5mm from spine." },
    ],
    pricing: { quantity: 2000, rate: "€0.65/unit", tier: "501-2000 tier", total: "€1,300.00" },
    timeline: [
      { label: "Created", date: "Mar 09, 2026", status: "completed" },
      { label: "Sent", date: "Mar 10, 2026", status: "completed" },
      { label: "Acknowledged", date: "Mar 10, 2026", status: "completed" },
      { label: "In Progress", date: "Mar 14, 2026", status: "current" },
      { label: "Shipped", date: null, status: "pending" },
      { label: "Received", date: null, status: "pending" },
      { label: "Completed", date: null, status: "pending" },
    ],
    trackingNumber: "", bolReference: "",
    actualCost: "", estimatedCost: "€1,300.00", variance: "", variancePercent: "",
    notes: "Vendor confirmed PUR adhesive available. Production started on schedule.",
  },
  "PO-2026-002": {
    id: "PO-2026-002", vendor: "CoatMaster GmbH", vendorContact: "Klaus Weber",
    vendorEmail: "k.weber@coatmaster.de",
    orderId: "ORD-4498", jobId: "JOB-2026-0875", customer: "Nordic Print AB",
    step: "UV Coating", status: "Completed",
    specs: [
      { label: "Paper Stock", value: "170gsm Uncoated" },
      { label: "Quantity", value: "3,500 sheets" },
      { label: "Sheet Size", value: "450 x 640mm (SRA2)" },
      { label: "Coating Type", value: "Full flood UV gloss, one side" },
      { label: "Special Instructions", value: "Ensure grain direction is long edge. Allow 24hr cure before cutting." },
    ],
    pricing: { quantity: 3500, rate: "€0.22/unit", tier: "2001+ tier", total: "€770.00" },
    timeline: [
      { label: "Created", date: "Mar 04, 2026", status: "completed" },
      { label: "Sent", date: "Mar 05, 2026", status: "completed" },
      { label: "Acknowledged", date: "Mar 05, 2026", status: "completed" },
      { label: "In Progress", date: "Mar 07, 2026", status: "completed" },
      { label: "Shipped", date: "Mar 10, 2026", status: "completed" },
      { label: "Received", date: "Mar 12, 2026", status: "completed" },
      { label: "Completed", date: "Mar 12, 2026", status: "completed" },
    ],
    trackingNumber: "DHL-9482751036", bolReference: "BOL-2026-0342",
    actualCost: "€890.00", estimatedCost: "€770.00", variance: "+€120.00", variancePercent: "+15.6%",
    notes: "Slight overage due to additional sheets required for makeready. Vendor applied surcharge for rush delivery.",
  },
  "PO-2026-003": {
    id: "PO-2026-003", vendor: "DieCut Pro", vendorContact: "Sarah Mitchell",
    vendorEmail: "sarah@diecutpro.com",
    orderId: "ORD-4533", jobId: "JOB-2026-0901", customer: "Sandbox Creative",
    step: "Die Cutting", status: "Shipped",
    specs: [
      { label: "Paper Stock", value: "350gsm GC1 Board" },
      { label: "Quantity", value: "5,000 units" },
      { label: "Flat Size", value: "320 x 450mm" },
      { label: "Die", value: "Custom die #DC-1147 (on file)" },
      { label: "Special Instructions", value: "Crease lines at fold points. Strip and blank as per layout." },
    ],
    pricing: { quantity: 5000, rate: "€0.42/unit", tier: "Custom quote", total: "€2,100.00" },
    timeline: [
      { label: "Created", date: "Mar 11, 2026", status: "completed" },
      { label: "Sent", date: "Mar 12, 2026", status: "completed" },
      { label: "Acknowledged", date: "Mar 12, 2026", status: "completed" },
      { label: "In Progress", date: "Mar 15, 2026", status: "completed" },
      { label: "Shipped", date: "Mar 18, 2026", status: "current" },
      { label: "Received", date: null, status: "pending" },
      { label: "Completed", date: null, status: "pending" },
    ],
    trackingNumber: "UPS-1Z999AA10123456784", bolReference: "BOL-2026-0358",
    actualCost: "", estimatedCost: "€2,100.00", variance: "", variancePercent: "",
    notes: "Shipped via UPS. Expected arrival March 20th.",
  },
}

const defaultPO = poData["PO-2026-001"]

const statusOptions = ["Sent", "Acknowledged", "In Progress", "Shipped", "Received", "Completed"]

function getStatusStyle(status: string) {
  switch (status) {
    case "Sent": return "bg-info-10 text-info-90"
    case "In Progress": return "bg-warning-20 text-warning-90"
    case "Shipped": return "bg-primary-10 text-primary-90"
    case "Received": return "bg-caution-20 text-caution-90"
    case "Completed": return "bg-success-10 text-success-90"
    default: return "bg-neutral-10 text-neutral-60"
  }
}

export default function PurchaseOrderDetail() {
  const { params, goBack } = useNavigation()
  const po = poData[params.poId] || defaultPO
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState(po.trackingNumber)
  const [bolReference, setBolReference] = useState(po.bolReference)
  const [actualCostInput, setActualCostInput] = useState(po.actualCost)
  const [notesInput, setNotesInput] = useState(po.notes)

  const varianceAmount = actualCostInput ? po.variance || "—" : "—"
  const variancePercent = actualCostInput ? po.variancePercent || "" : ""
  const isOverBudget = po.variancePercent.startsWith("+")

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Back + Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={goBack} className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-neutral-5 transition-colors">
          <ArrowLeft className="h-4 w-4 text-neutral-70" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-neutral-100">{po.id}</h2>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getStatusStyle(po.status)}`}>
              {po.status}
            </span>
          </div>
          <p className="text-sm text-neutral-60 mt-0.5">{po.step} — {po.vendor}</p>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left Column — 60% (3/5) */}
        <div className="col-span-3 space-y-6">
          {/* Vendor Info */}
          <div className="border border-neutral-20 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-3">Vendor</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-neutral-50">Company</div>
                <div className="text-sm font-medium text-neutral-100 mt-0.5">{po.vendor}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-50">Contact</div>
                <div className="text-sm text-neutral-100 mt-0.5">{po.vendorContact}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-50">Email</div>
                <div className="text-sm text-neutral-100 mt-0.5">{po.vendorEmail}</div>
              </div>
            </div>
          </div>

          {/* Order Reference */}
          <div className="border border-neutral-20 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-3">Order Reference</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-neutral-50">Order #</div>
                <div className="text-sm font-medium text-neutral-100 mt-0.5 flex items-center gap-1">
                  {po.orderId}
                  <ExternalLink className="h-3 w-3 text-neutral-40" />
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-50">Job #</div>
                <div className="text-sm text-neutral-100 mt-0.5">{po.jobId}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-50">Customer</div>
                <div className="text-sm text-neutral-100 mt-0.5">{po.customer}</div>
              </div>
            </div>
          </div>

          {/* Step & Specifications */}
          <div className="border border-neutral-20 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-3">Specifications — {po.step}</h3>
            <div className="border border-neutral-20 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {po.specs.map((spec, i) => (
                    <tr key={i} className={`${i > 0 ? "border-t border-neutral-20" : ""}`}>
                      <td className="px-4 py-2.5 text-xs font-medium text-neutral-50 bg-neutral-5 w-40">{spec.label}</td>
                      <td className="px-4 py-2.5 text-sm text-neutral-100">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing */}
          <div className="border border-neutral-20 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-3">Pricing</h3>
            <div className="flex items-center gap-2 text-sm text-neutral-70 mb-2">
              <span className="font-medium text-neutral-100">{po.pricing.quantity.toLocaleString()}</span>
              <span>units</span>
              <span className="text-neutral-40">x</span>
              <span className="font-medium text-neutral-100">{po.pricing.rate}</span>
              <span className="text-xs text-neutral-50 bg-neutral-5 px-2 py-0.5 rounded">{po.pricing.tier}</span>
            </div>
            <div className="flex items-baseline gap-2 mt-3 pt-3 border-t border-neutral-20">
              <span className="text-xs text-neutral-50">Estimated Total</span>
              <span className="text-xl font-semibold text-neutral-100">{po.pricing.total}</span>
            </div>
          </div>
        </div>

        {/* Right Column — 40% (2/5) */}
        <div className="col-span-2 space-y-6">
          {/* Status Timeline */}
          <div className="border border-neutral-20 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-100">Status Tracking</h3>
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center gap-1.5 h-8 px-3 border-2 border-neutral-40 text-neutral-90 rounded-full text-xs font-medium hover:bg-neutral-5 transition-colors"
                >
                  Update Status
                  <ChevronDown className="h-3 w-3" />
                </button>
                {showStatusDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-neutral-20 rounded-lg shadow-lg z-10 min-w-[160px] py-1">
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setShowStatusDropdown(false)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-5 text-neutral-70"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="space-y-0">
              {po.timeline.map((step, i) => (
                <div key={step.label} className="flex gap-3">
                  {/* Line and dot */}
                  <div className="flex flex-col items-center">
                    {step.status === "completed" ? (
                      <div className="w-6 h-6 rounded-full bg-success-10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3.5 w-3.5 text-success-70" />
                      </div>
                    ) : step.status === "current" ? (
                      <div className="w-6 h-6 rounded-full bg-warning-20 border-2 border-warning-50 flex items-center justify-center flex-shrink-0">
                        <Circle className="h-2.5 w-2.5 fill-warning-50 text-warning-50" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-neutral-10 flex items-center justify-center flex-shrink-0">
                        <Circle className="h-2.5 w-2.5 text-neutral-30" />
                      </div>
                    )}
                    {i < po.timeline.length - 1 && (
                      <div className={`w-px flex-1 min-h-[20px] ${
                        step.status === "completed" ? "bg-success-70" : "bg-neutral-20"
                      }`} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-4">
                    <div className={`text-sm font-medium ${
                      step.status === "pending" ? "text-neutral-40" : "text-neutral-100"
                    }`}>
                      {step.label}
                    </div>
                    {step.date && (
                      <div className="text-xs text-neutral-50 mt-0.5">{step.date}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking & BOL */}
          <div className="border border-neutral-20 rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-100">Shipping Details</h3>
            <div>
              <label className="text-xs font-medium text-neutral-70 mb-1 block">Tracking Number</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number..."
                className="w-full h-9 px-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-70 mb-1 block">BOL Reference</label>
              <input
                type="text"
                value={bolReference}
                onChange={(e) => setBolReference(e.target.value)}
                placeholder="Enter BOL reference..."
                className="w-full h-9 px-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
              />
            </div>
          </div>

          {/* Cost Recording */}
          <div className="border border-neutral-20 rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-100">Cost Recording</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-70 mb-1 block">Estimated Cost</label>
                <div className="text-sm font-medium text-neutral-100 h-9 flex items-center">{po.estimatedCost}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-70 mb-1 block">Actual Cost</label>
                <input
                  type="text"
                  value={actualCostInput}
                  onChange={(e) => setActualCostInput(e.target.value)}
                  placeholder="€0.00"
                  className="w-full h-9 px-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
                />
              </div>
            </div>
            {po.actualCost && (
              <div className={`flex items-center justify-between p-3 rounded-lg ${
                isOverBudget ? "bg-critical-5 border border-critical-20" : "bg-success-10 border border-success-20"
              }`}>
                <span className="text-xs font-medium text-neutral-70">Cost Variance</span>
                <div className="text-right">
                  <span className={`text-sm font-semibold ${isOverBudget ? "text-critical-60" : "text-success-70"}`}>
                    {varianceAmount}
                  </span>
                  {variancePercent && (
                    <span className={`text-xs ml-1 ${isOverBudget ? "text-critical-60" : "text-success-70"}`}>
                      ({variancePercent})
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom: Notes */}
      <div className="mt-6 border border-neutral-20 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-neutral-100 mb-3">Notes</h3>
        <textarea
          value={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
          rows={3}
          placeholder="Add notes about this purchase order..."
          className="w-full px-3 py-2 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors resize-vertical"
        />
        <div className="flex justify-end mt-3">
          <button className="h-9 px-4 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
