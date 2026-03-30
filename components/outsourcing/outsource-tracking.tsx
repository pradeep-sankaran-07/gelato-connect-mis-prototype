"use client"

import { useState } from "react"
import { Search, Plus, ChevronDown, TrendingUp, Truck, Clock, DollarSign, Link2, Send, CheckCircle, X } from "lucide-react"
import { useNavigation } from "@/lib/navigation-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const purchaseOrders = [
  {
    id: "PO-2026-001",
    orderId: "ORD-4521",
    vendor: "BindRight Ltd",
    step: "Perfect Binding",
    status: "In Progress",
    sentDate: "2026-03-10",
    expectedDate: "2026-03-19",
    actualCost: null,
    estimatedCost: "€1,240.00",
    variance: null,
    source: "estimate-setup" as const,
  },
  {
    id: "PO-2026-002",
    orderId: "ORD-4498",
    vendor: "CoatMaster GmbH",
    step: "UV Coating",
    status: "Completed",
    sentDate: "2026-03-05",
    expectedDate: "2026-03-12",
    actualCost: "€890.00",
    estimatedCost: "€850.00",
    variance: "+4.7%",
    source: "estimate-setup" as const,
  },
  {
    id: "PO-2026-003",
    orderId: "ORD-4533",
    vendor: "DieCut Pro",
    step: "Die Cutting",
    status: "Shipped",
    sentDate: "2026-03-12",
    expectedDate: "2026-03-20",
    actualCost: null,
    estimatedCost: "€2,100.00",
    variance: null,
    source: "estimate-setup" as const,
  },
  {
    id: "PO-2026-004",
    orderId: "ORD-4510",
    vendor: "FoilPress UK",
    step: "Hot Foil Stamping",
    status: "Sent",
    sentDate: "2026-03-17",
    expectedDate: "2026-03-25",
    actualCost: null,
    estimatedCost: "€3,450.00",
    variance: null,
    source: "estimate-setup" as const,
  },
  {
    id: "PO-2026-005",
    orderId: "ORD-4487",
    vendor: "PackWrap Solutions",
    step: "Shrink Wrap",
    status: "Received",
    sentDate: "2026-03-01",
    expectedDate: "2026-03-08",
    actualCost: "€560.00",
    estimatedCost: "€580.00",
    variance: "-3.4%",
    source: "manual" as const,
  },
  {
    id: "PO-2026-006",
    orderId: "ORD-4541",
    vendor: "BindRight Ltd",
    step: "Saddle Stitch",
    status: "In Progress",
    sentDate: "2026-03-14",
    expectedDate: "2026-03-21",
    actualCost: null,
    estimatedCost: "€780.00",
    variance: null,
    source: "manual" as const,
  },
  {
    id: "PO-2026-007",
    orderId: "ORD-4462",
    vendor: "CoatMaster GmbH",
    step: "Lamination",
    status: "Completed",
    sentDate: "2026-02-25",
    expectedDate: "2026-03-04",
    actualCost: "€1,120.00",
    estimatedCost: "€1,100.00",
    variance: "+1.8%",
    source: "manual" as const,
  },
  {
    id: "PO-2026-008",
    orderId: "ORD-4555",
    vendor: "DieCut Pro",
    step: "Creasing",
    status: "Sent",
    sentDate: "2026-03-18",
    expectedDate: "2026-03-26",
    actualCost: null,
    estimatedCost: "€420.00",
    variance: null,
    source: "manual" as const,
  },
]

const tabs = ["All", "Sent", "In Progress", "Shipped", "Received", "Completed"]

const vendors = ["All Vendors", "BindRight Ltd", "CoatMaster GmbH", "DieCut Pro", "FoilPress UK", "PackWrap Solutions"]

function getStatusStyle(status: string) {
  switch (status) {
    case "Sent":
      return "bg-info-10 text-info-90"
    case "In Progress":
      return "bg-warning-20 text-warning-90"
    case "Shipped":
      return "bg-primary-10 text-primary-90"
    case "Received":
      return "bg-caution-20 text-caution-90"
    case "Completed":
      return "bg-success-10 text-success-90"
    default:
      return "bg-neutral-10 text-neutral-90"
  }
}

function getVarianceStyle(variance: string | null) {
  if (!variance) return ""
  if (variance.startsWith("-")) return "text-success-70"
  if (variance.startsWith("+")) return "text-critical-60"
  return "text-neutral-60"
}

export default function OutsourceTracking() {
  const { navigateTo } = useNavigation()
  const [activeTab, setActiveTab] = useState("All")
  const [vendorFilter, setVendorFilter] = useState("All Vendors")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showVendorDropdown, setShowVendorDropdown] = useState(false)
  const [showSourceDropdown, setShowSourceDropdown] = useState(false)
  const [showCreatePO, setShowCreatePO] = useState(false)
  const [createPOVendor, setCreatePOVendor] = useState("")
  const [createPOStep, setCreatePOStep] = useState("")
  const [createPOQty, setCreatePOQty] = useState("")
  const [createPORate, setCreatePORate] = useState("")
  const [createPOOrder, setCreatePOOrder] = useState("")
  const [createPOConfirmed, setCreatePOConfirmed] = useState(false)

  const filteredPOs = purchaseOrders.filter((po) => {
    const matchesTab = activeTab === "All" || po.status === activeTab
    const matchesVendor = vendorFilter === "All Vendors" || po.vendor === vendorFilter
    const matchesSource = sourceFilter === "all" || po.source === sourceFilter
    const matchesSearch =
      searchTerm === "" ||
      po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesVendor && matchesSource && matchesSearch
  })

  const linkedSteps = [
    { step: "Perfect Binding", vendor: "Bindwell Buchbinderei AG" },
    { step: "Spot UV Coating", vendor: "FinishPro Veredlung GmbH" },
    { step: "Die Cutting", vendor: "Scandia Die-Cutting ApS" },
    { step: "Hot Foil Stamping", vendor: "FinishPro Veredlung GmbH" },
    { step: "Wire-O Binding", vendor: "Bindwell Buchbinderei AG" },
  ]

  const vendorServices: Record<string, string[]> = {
    "BindRight Ltd": ["Perfect Binding", "Saddle Stitch", "Wire-O Binding"],
    "CoatMaster GmbH": ["UV Coating", "Lamination", "Spot UV"],
    "DieCut Pro": ["Die Cutting", "Creasing", "Scoring"],
    "FoilPress UK": ["Hot Foil Stamping", "Embossing", "Debossing"],
    "PackWrap Solutions": ["Shrink Wrap", "Box Assembly", "Foam Insert"],
  }

  const isLinkedToEstimateSetup = (vendor: string, step: string) => {
    return linkedSteps.some(ls => vendor.includes(ls.vendor.split(" ")[0]) || ls.step === step)
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-100">Outsourcing</h2>
          <p className="text-sm text-neutral-60 mt-1">Track and manage outsourced production steps</p>
        </div>
        <button onClick={() => { setShowCreatePO(true); setCreatePOConfirmed(false); setCreatePOVendor(""); setCreatePOStep(""); setCreatePOQty(""); setCreatePORate(""); setCreatePOOrder("") }} className="flex items-center gap-2 h-10 px-5 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          Create PO
        </button>
      </div>

      {/* Outwork Info Banner */}
      <div className="mb-4 p-3 rounded-lg flex items-center justify-between" style={{ background: "#eaf4ff", border: "1px solid #007cb4" }}>
        <div className="flex items-center gap-2">
          <Link2 className="h-4 w-4" style={{ color: "#007cb4" }} />
          <span className="text-sm" style={{ color: "#00527c" }}>
            <strong>5 outwork steps</strong> linked from Estimate Setup — {linkedSteps.map(l => l.step).join(", ")}
          </span>
        </div>
        <button onClick={() => navigateTo("estimate-setup")} className="text-xs font-medium hover:underline" style={{ color: "#007cb4" }}>
          View in Estimate Setup &rarr;
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="border border-neutral-20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-neutral-60 text-xs font-medium mb-1">
            <TrendingUp className="h-3.5 w-3.5" />
            Active POs
          </div>
          <div className="text-2xl font-semibold text-neutral-100">12</div>
          <div className="text-xs text-neutral-50 mt-0.5">across 4 vendors</div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-neutral-60 text-xs font-medium mb-1">
            <Truck className="h-3.5 w-3.5" />
            In Transit
          </div>
          <div className="text-2xl font-semibold text-neutral-100">3</div>
          <div className="text-xs text-neutral-50 mt-0.5">expected this week</div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-neutral-60 text-xs font-medium mb-1">
            <Clock className="h-3.5 w-3.5" />
            Avg Lead Time
          </div>
          <div className="text-2xl font-semibold text-neutral-100">4.2 <span className="text-sm font-normal text-neutral-60">days</span></div>
          <div className="text-xs text-success-70 mt-0.5">-0.5 vs last month</div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-neutral-60 text-xs font-medium mb-1">
            <DollarSign className="h-3.5 w-3.5" />
            Cost Variance
          </div>
          <div className="text-2xl font-semibold text-warning-90">+2.3%</div>
          <div className="text-xs text-neutral-50 mt-0.5">over estimated costs</div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center gap-0 border-b border-neutral-20 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm relative transition-colors ${
              activeTab === tab
                ? "text-neutral-100 font-medium"
                : "text-neutral-60 hover:text-neutral-100"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-100 rounded-t-sm" />
            )}
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <button
            onClick={() => setShowVendorDropdown(!showVendorDropdown)}
            className="flex items-center gap-2 h-9 px-3 border border-neutral-30 rounded-lg text-sm text-neutral-90 hover:border-neutral-50 transition-colors"
          >
            {vendorFilter}
            <ChevronDown className="h-3.5 w-3.5 text-neutral-50" />
          </button>
          {showVendorDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-20 rounded-lg shadow-lg z-10 min-w-[200px] py-1">
              {vendors.map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setVendorFilter(v)
                    setShowVendorDropdown(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-5 ${
                    vendorFilter === v ? "font-medium text-neutral-100" : "text-neutral-70"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Source Filter */}
        <div className="relative">
          <button
            onClick={() => setShowSourceDropdown(!showSourceDropdown)}
            className="flex items-center gap-2 h-9 px-3 border border-neutral-30 rounded-lg text-sm text-neutral-90 hover:border-neutral-50 transition-colors"
          >
            {sourceFilter === "all" ? "All Sources" : sourceFilter === "estimate-setup" ? "From Estimate Setup" : "Manual"}
            <ChevronDown className="h-3.5 w-3.5 text-neutral-50" />
          </button>
          {showSourceDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-20 rounded-lg shadow-lg z-10 min-w-[200px] py-1">
              {[
                { value: "all", label: "All Sources" },
                { value: "estimate-setup", label: "From Estimate Setup" },
                { value: "manual", label: "Manual" },
              ].map((s) => (
                <button key={s.value} onClick={() => { setSourceFilter(s.value); setShowSourceDropdown(false) }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-5 ${sourceFilter === s.value ? "font-medium text-neutral-100" : "text-neutral-70"}`}>
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-50" />
          <input
            type="text"
            placeholder="Search PO#, Order# or vendor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-neutral-20 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-5 text-left">
              <th className="px-4 py-3 text-xs font-medium text-neutral-70">PO #</th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-70">Order #</th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-70">Vendor</th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-70">Step</th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-70">Status</th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-70">Source</th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-70">Sent Date</th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-70">Expected</th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-70 text-right">Est. Cost</th>
              <th className="px-4 py-3 text-xs font-medium text-neutral-70 text-right">Variance</th>
            </tr>
          </thead>
          <tbody>
            {filteredPOs.map((po) => (
              <tr
                key={po.id}
                onClick={() => navigateTo("purchase-order-detail", { poId: po.id })}
                className="border-t border-neutral-20 hover:bg-neutral-5 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-neutral-100">{po.id}</td>
                <td className="px-4 py-3 text-sm text-neutral-70">{po.orderId}</td>
                <td className="px-4 py-3 text-sm text-neutral-100">{po.vendor}</td>
                <td className="px-4 py-3 text-sm text-neutral-70">{po.step}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusStyle(po.status)}`}>
                    {po.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${po.source === "estimate-setup" ? "bg-info-10 text-info-90" : "bg-neutral-10 text-neutral-70"}`}
                    onClick={(e) => { if (po.source === "estimate-setup") { e.stopPropagation(); navigateTo("estimate-setup") } }}
                    style={po.source === "estimate-setup" ? { cursor: "pointer" } : {}}>
                    {po.source === "estimate-setup" ? "Estimate Setup" : "Manual"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-neutral-70">{po.sentDate}</td>
                <td className="px-4 py-3 text-sm text-neutral-70">{po.expectedDate}</td>
                <td className="px-4 py-3 text-sm text-neutral-100 text-right">{po.actualCost || po.estimatedCost}</td>
                <td className={`px-4 py-3 text-sm text-right font-medium ${getVarianceStyle(po.variance)}`}>
                  {po.variance || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 text-xs text-neutral-50">
        <span>Showing {filteredPOs.length} of {purchaseOrders.length} purchase orders</span>
        <span>Last updated: Mar 19, 2026 09:42 AM</span>
      </div>

      {/* Create PO Modal */}
      {showCreatePO && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: "rgba(33,33,33,0.8)", zIndex: 20001 }} onClick={() => setShowCreatePO(false)}>
          <div className="bg-white w-full max-w-[540px]" style={{ borderRadius: "12px" }} onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold" style={{ color: "#212121" }}>Create Purchase Order</h3>
                <p className="text-sm mt-0.5" style={{ color: "#8a8a8a" }}>Send an outsourced step to a vendor for production</p>
              </div>
              <button onClick={() => setShowCreatePO(false)} style={{ color: "#8a8a8a" }}><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6b6b6b" }}>Vendor</label>
                  <Select value={createPOVendor} onValueChange={(v) => { setCreatePOVendor(v); setCreatePOStep(""); setCreatePORate("") }}>
                    <SelectTrigger style={{ borderRadius: "8px" }}><SelectValue placeholder="Select vendor..." /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(vendorServices).map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6b6b6b" }}>Service / Step</label>
                  <Select value={createPOStep} onValueChange={(v) => { setCreatePOStep(v); setCreatePORate(v === "Perfect Binding" ? "0.85" : v === "UV Coating" ? "0.25" : v === "Die Cutting" ? "0.12" : "0.50") }}>
                    <SelectTrigger style={{ borderRadius: "8px" }}><SelectValue placeholder="Select step..." /></SelectTrigger>
                    <SelectContent>
                      {(vendorServices[createPOVendor] || []).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6b6b6b" }}>Quantity</label>
                  <Input type="number" value={createPOQty} onChange={e => setCreatePOQty(e.target.value)} placeholder="1000" style={{ borderRadius: "8px" }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6b6b6b" }}>Rate (€/unit)</label>
                  <Input value={createPORate} onChange={e => setCreatePORate(e.target.value)} placeholder="0.00" style={{ borderRadius: "8px" }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6b6b6b" }}>Total</label>
                  <div className="h-10 flex items-center px-3 border rounded-lg text-sm font-medium" style={{ borderColor: "#e6e6e6", borderRadius: "8px", background: "#f7f7f7", color: "#212121" }}>
                    €{((Number(createPOQty) || 0) * (Number(createPORate) || 0)).toFixed(2)}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6b6b6b" }}>Order ID</label>
                <Input value={createPOOrder} onChange={e => setCreatePOOrder(e.target.value)} placeholder="ORD-XXXX" style={{ borderRadius: "8px" }} />
              </div>
              {/* Linked indicator */}
              {createPOVendor && createPOStep && isLinkedToEstimateSetup(createPOVendor, createPOStep) && (
                <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "#eaf4ff", border: "1px solid #007cb4" }}>
                  <Link2 className="h-4 w-4" style={{ color: "#007cb4" }} />
                  <span className="text-sm" style={{ color: "#00527c" }}>This step is configured as outwork in Estimate Setup — rate auto-filled from vendor rate card</span>
                </div>
              )}
              {createPOConfirmed && (
                <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "#dcfce7", border: "1px solid #16a34a" }}>
                  <CheckCircle className="h-4 w-4" style={{ color: "#16a34a" }} />
                  <span className="text-sm font-medium" style={{ color: "#065f46" }}>Purchase order created successfully</span>
                </div>
              )}
            </div>
            <div className="p-5 border-t flex justify-between">
              <Button variant="outline" onClick={() => setShowCreatePO(false)} style={{ borderRadius: "999px" }}>
                {createPOConfirmed ? "Close" : "Cancel"}
              </Button>
              {!createPOConfirmed && (
                <Button onClick={() => setCreatePOConfirmed(true)} disabled={!createPOVendor || !createPOStep || !createPOQty} className="bg-[#212121] text-white hover:opacity-90" style={{ borderRadius: "999px" }}>
                  <Send className="h-4 w-4 mr-2" />Create Purchase Order
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
