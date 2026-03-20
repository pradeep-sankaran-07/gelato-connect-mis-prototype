"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowUpDown, MoreHorizontal, Calendar, Zap, Clock, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"

// --- Mock Data ---
interface MaterialItem {
  sku: string
  description: string
  onHand: number
  allocated: number
  unit: string
  status: "Allocated" | "Pending" | "Insufficient"
  quantityRequired: number
}

interface AllocationHistoryEntry {
  order: string
  quantity: number
  date: string
  user: string
}

interface EstimateRow {
  id: string
  estimateNum: string
  jobName: string
  customer: string
  requiredDate: string
  itemCount: number
  tags: { label: string; bg: string; text: string }[]
  allocationStatus: string
  statusColor: string
  materials: MaterialItem[]
  allocationHistory: Record<string, AllocationHistoryEntry[]>
}

const estimateData: EstimateRow[] = [
  {
    id: "est-18",
    estimateNum: "Estimate #18",
    jobName: "PrintCo Tri-fold Brochures",
    customer: "PrintCo Ltd",
    requiredDate: "June 1, 2025",
    itemCount: 3,
    tags: [{ label: "Paper", bg: "bg-info-10", text: "text-info-90" }],
    allocationStatus: "Fully Allocated",
    statusColor: "bg-success-10 text-success-90 hover:bg-success-10",
    materials: [
      { sku: "GC200-SRA3", description: "Gloss Coated 200gsm SRA3", onHand: 12000, allocated: 5500, unit: "sheets", status: "Allocated", quantityRequired: 5500 },
      { sku: "CMYK-SET", description: "CMYK Ink Set", onHand: 5, allocated: 1, unit: "sets", status: "Allocated", quantityRequired: 1 },
      { sku: "FOLD-TRI", description: "Tri-fold Service", onHand: 99999, allocated: 5000, unit: "units", status: "Allocated", quantityRequired: 5000 },
    ],
    allocationHistory: {
      "GC200-SRA3": [
        { order: "Estimate #18", quantity: 5500, date: "2025-05-15 09:32", user: "System (Auto)" },
        { order: "Estimate #12", quantity: 3000, date: "2025-05-10 14:15", user: "Jane Smith" },
      ],
      "CMYK-SET": [
        { order: "Estimate #18", quantity: 1, date: "2025-05-15 09:32", user: "System (Auto)" },
      ],
      "FOLD-TRI": [
        { order: "Estimate #18", quantity: 5000, date: "2025-05-15 09:32", user: "System (Auto)" },
      ],
    },
  },
  {
    id: "est-17",
    estimateNum: "Estimate #17",
    jobName: "Paragon Q1 book launch",
    customer: "Sandbox",
    requiredDate: "May 25, 2025",
    itemCount: 4,
    tags: [
      { label: "Paper", bg: "bg-info-10", text: "text-info-90" },
      { label: "Binding", bg: "bg-primary-10", text: "text-primary-90" },
    ],
    allocationStatus: "Needs Replenishment",
    statusColor: "bg-amber-100 text-amber-800 hover:bg-amber-100",
    materials: [
      { sku: "SC170-A4", description: "Silk Coated 170gsm A4", onHand: 5000, allocated: 2500, unit: "sheets", status: "Allocated", quantityRequired: 2500 },
      { sku: "SC250-A4", description: "Silk Coated 250gsm A4", onHand: 8500, allocated: 500, unit: "sheets", status: "Allocated", quantityRequired: 500 },
      { sku: "CMYK-SET", description: "CMYK Ink Set", onHand: 5, allocated: 1, unit: "sets", status: "Allocated", quantityRequired: 1 },
      { sku: "BIND-PUR", description: "PUR Binding", onHand: 300, allocated: 300, unit: "units", status: "Insufficient", quantityRequired: 500 },
    ],
    allocationHistory: {
      "SC170-A4": [
        { order: "Estimate #17", quantity: 2500, date: "2025-05-12 11:20", user: "John Doe" },
      ],
      "BIND-PUR": [
        { order: "Estimate #17", quantity: 300, date: "2025-05-12 11:20", user: "John Doe" },
        { order: "Estimate #14", quantity: 200, date: "2025-05-08 16:45", user: "System (Auto)" },
      ],
    },
  },
  {
    id: "est-16",
    estimateNum: "Estimate #16",
    jobName: "Athletix Product Catalog",
    customer: "Athletix",
    requiredDate: "June 15, 2025",
    itemCount: 5,
    tags: [
      { label: "Paper", bg: "bg-info-10", text: "text-info-90" },
      { label: "Lamination", bg: "bg-success-10", text: "text-success-90" },
    ],
    allocationStatus: "Pending Allocation",
    statusColor: "bg-info-10 text-info-90 hover:bg-info-10",
    materials: [
      { sku: "GC170-A4", description: "Gloss Coated 170gsm A4", onHand: 15000, allocated: 0, unit: "sheets", status: "Pending", quantityRequired: 10000 },
      { sku: "GC250-A4", description: "Gloss Coated 250gsm A4", onHand: 3000, allocated: 0, unit: "sheets", status: "Pending", quantityRequired: 1000 },
      { sku: "CMYK-SET", description: "CMYK Ink Set", onHand: 5, allocated: 0, unit: "sets", status: "Pending", quantityRequired: 2 },
      { sku: "LAM-GLOSS", description: "Gloss Lamination", onHand: 5000, allocated: 0, unit: "sheets", status: "Pending", quantityRequired: 1000 },
      { sku: "BIND-PUR", description: "PUR Binding", onHand: 300, allocated: 300, unit: "units", status: "Insufficient", quantityRequired: 1000 },
    ],
    allocationHistory: {},
  },
]

function formatNum(n: number): string {
  if (n >= 99999) return "Unlimited"
  return n.toLocaleString()
}

function AllocationProgressBar({ onHand, allocated }: { onHand: number; allocated: number }) {
  if (onHand >= 99999) return <span className="text-xs text-neutral-50">N/A</span>
  const pct = onHand > 0 ? Math.min((allocated / onHand) * 100, 100) : 0
  const available = onHand - allocated
  const isOverAllocated = available < 0
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-neutral-50 mb-1">
        <span>Allocated: {formatNum(allocated)}</span>
        <span className={isOverAllocated ? "text-critical-90 font-medium" : ""}>
          Avail: {formatNum(Math.max(available, 0))}
        </span>
      </div>
      <div className="w-full h-2 bg-neutral-10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${isOverAllocated ? "bg-critical-100" : pct > 80 ? "bg-amber-500" : "bg-primary-100"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function InventoryAllocation() {
  const { navigateTo } = useNavigation()
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [historyOpen, setHistoryOpen] = useState<Record<string, boolean>>({})
  const [autoAllocateResult, setAutoAllocateResult] = useState<Record<string, boolean>>({})
  const [allocatedEstimates, setAllocatedEstimates] = useState<Record<string, MaterialItem[]>>({})

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleHistory = (key: string) => {
    setHistoryOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAutoAllocate = (estId: string, materials: MaterialItem[]) => {
    // Simulate auto-allocation: mark materials as allocated where stock permits
    const result = materials.map((m) => {
      const available = m.onHand - m.allocated
      if (m.status === "Pending" && available >= m.quantityRequired) {
        return { ...m, allocated: m.allocated + m.quantityRequired, status: "Allocated" as const }
      }
      if (m.status === "Pending" && available > 0 && available < m.quantityRequired) {
        return { ...m, allocated: m.onHand, status: "Insufficient" as const }
      }
      return m
    })
    setAllocatedEstimates((prev) => ({ ...prev, [estId]: result }))
    setAutoAllocateResult((prev) => ({ ...prev, [estId]: true }))
  }

  const getMaterials = (est: EstimateRow): MaterialItem[] => {
    return allocatedEstimates[est.id] || est.materials
  }

  const getStatusBadgeForMaterial = (status: string) => {
    switch (status) {
      case "Allocated":
        return <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Allocated</Badge>
      case "Insufficient":
        return <Badge className="bg-critical-10 text-critical-90 hover:bg-critical-10">Insufficient</Badge>
      default:
        return <Badge className="bg-info-10 text-info-90 hover:bg-info-10">Pending</Badge>
    }
  }

  return (
    <div className="flex-1 flex flex-col">
          <div className="p-4 bg-neutral-5 border-b">
            <h1 className="text-2xl font-bold mb-4">Inventory Allocation</h1>
            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-1" /> Schedule
              </Button>
              <Button>Generate Report</Button>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Material Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Materials</SelectItem>
                  <SelectItem value="paper">Paper</SelectItem>
                  <SelectItem value="ink">Ink & Toner</SelectItem>
                  <SelectItem value="finishing">Finishing Materials</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="allocated">Allocated</SelectItem>
                  <SelectItem value="pending">Pending Allocation</SelectItem>
                  <SelectItem value="insufficient">Insufficient Stock</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Next 7 Days</SelectItem>
                  <SelectItem value="month">Next 30 Days</SelectItem>
                  <SelectItem value="quarter">Next Quarter</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1">
                <Input type="text" placeholder="Search by estimate #, job name, or SKU..." className="w-full" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="border rounded-md m-4 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-5 text-left">
                    <th className="px-4 py-3 text-sm font-medium text-neutral-50 w-10"></th>
                    <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                      <div className="flex items-center">
                        Estimate / Job
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                      <div className="flex items-center">
                        Customer
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                      <div className="flex items-center">
                        Required Date
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                      <div className="flex items-center">
                        Materials Required
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                      <div className="flex items-center">
                        Allocation Status
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-neutral-50 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {estimateData.map((est) => {
                    const materials = getMaterials(est)
                    const isAutoAllocated = autoAllocateResult[est.id]
                    const isPending = est.allocationStatus === "Pending Allocation" && !isAutoAllocated

                    return (
                      <>
                        <tr key={est.id} className={`border-t hover:bg-neutral-5 ${expandedRows[est.id] ? "bg-neutral-5" : ""}`}>
                          <td className="px-4 py-3">
                            <Button variant="ghost" size="sm" className="p-0 h-6 w-6" onClick={() => toggleRow(est.id)}>
                              {expandedRows[est.id] ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{est.estimateNum}</div>
                            <div className="text-xs text-neutral-50">{est.jobName}</div>
                          </td>
                          <td className="px-4 py-3">{est.customer}</td>
                          <td className="px-4 py-3">{est.requiredDate}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <span>{est.itemCount} items</span>
                              {est.tags.map((tag) => (
                                <Badge key={tag.label} className={`ml-2 ${tag.bg} ${tag.text} hover:${tag.bg} text-xs`}>
                                  {tag.label}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {isAutoAllocated ? (
                              <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Auto-Allocated</Badge>
                            ) : (
                              <Badge className={est.statusColor}>{est.allocationStatus}</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        {expandedRows[est.id] && (
                          <tr key={`${est.id}-detail`} className="bg-neutral-5 border-t">
                            <td colSpan={7} className="px-4 py-3">
                              <div className="pl-6">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-medium">Material Requirements</h4>
                                  {isPending && (
                                    <Button
                                      size="sm"
                                      className="flex items-center gap-1"
                                      onClick={() => handleAutoAllocate(est.id, est.materials)}
                                    >
                                      <Zap className="h-4 w-4" />
                                      Auto-allocate
                                    </Button>
                                  )}
                                </div>

                                {isAutoAllocated && (
                                  <div className="mb-3 p-3 bg-success-10 border border-success-20 rounded text-sm">
                                    <div className="flex items-center gap-2">
                                      <Zap className="h-4 w-4 text-success-90" />
                                      <span className="font-medium text-success-90">Auto-allocation complete.</span>
                                    </div>
                                    <p className="mt-1 ml-6 text-success-90">
                                      {materials.filter((m) => m.status === "Allocated").length} of {materials.length} materials successfully allocated.
                                      {materials.some((m) => m.status === "Insufficient") && (
                                        <span className="text-critical-90 ml-1">
                                          {materials.filter((m) => m.status === "Insufficient").length} item(s) have insufficient stock.
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                )}

                                {isPending && !isAutoAllocated && (
                                  <div className="mb-3 p-2 bg-info-10 border border-info-20 rounded text-sm">
                                    This estimate is pending allocation. Click &quot;Auto-allocate&quot; to automatically assign
                                    inventory, or manually allocate materials below.
                                  </div>
                                )}

                                {est.id === "est-17" && !isAutoAllocated && (
                                  <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                                    <div className="flex items-center">
                                      <svg className="h-5 w-5 text-amber-600 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21.9999 13.1299C21.9999 17.5399 18.4199 21.1199 13.9999 21.1199C9.57991 21.1199 5.99991 17.5399 5.99991 13.1299C5.99991 8.71994 9.57991 5.13994 13.9999 5.13994C18.4199 5.13994 21.9999 8.71994 21.9999 13.1299Z" />
                                        <path d="M7.5 3.5L10.5 2L9.5 5L10.5 8L7.5 6.5" />
                                        <path d="M4.5 8.5L3 5.5L6 6.5L9 5.5L7.5 8.5" />
                                      </svg>
                                      <span className="font-medium">ConnectAI recommends:</span>
                                    </div>
                                    <p className="mt-1 ml-7">
                                      Order 300 additional PUR Binding units to fulfill this estimate.
                                    </p>
                                    <Button size="sm" className="mt-2 ml-7">
                                      Create Purchase Order
                                    </Button>
                                  </div>
                                )}

                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="text-left text-xs text-neutral-50">
                                      <th className="pb-2">SKU</th>
                                      <th className="pb-2">Description</th>
                                      <th className="pb-2">On-Hand</th>
                                      <th className="pb-2">Allocated</th>
                                      <th className="pb-2">Available</th>
                                      <th className="pb-2 w-48">Allocation %</th>
                                      <th className="pb-2">Qty Required</th>
                                      <th className="pb-2">Status</th>
                                      <th className="pb-2 w-8"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {materials.map((mat) => {
                                      const available = mat.onHand >= 99999 ? "Unlimited" : formatNum(Math.max(mat.onHand - mat.allocated, 0))
                                      const historyKey = `${est.id}-${mat.sku}`
                                      const matHistory = est.allocationHistory[mat.sku] || []
                                      return (
                                        <>
                                          <tr key={mat.sku}>
                                            <td className="py-2 pr-4 font-medium">{mat.sku}</td>
                                            <td className="py-2 pr-4">{mat.description}</td>
                                            <td className="py-2 pr-4">{formatNum(mat.onHand)} {mat.unit}</td>
                                            <td className="py-2 pr-4">{formatNum(mat.allocated)} {mat.unit}</td>
                                            <td className="py-2 pr-4">
                                              <span className={mat.onHand - mat.allocated < mat.quantityRequired && mat.onHand < 99999 ? "text-critical-90 font-medium" : "text-success-90 font-medium"}>
                                                {available} {mat.onHand < 99999 ? mat.unit : ""}
                                              </span>
                                            </td>
                                            <td className="py-2 pr-4">
                                              <AllocationProgressBar onHand={mat.onHand} allocated={mat.allocated} />
                                            </td>
                                            <td className="py-2 pr-4">{formatNum(mat.quantityRequired)} {mat.unit}</td>
                                            <td className="py-2 pr-4">
                                              {getStatusBadgeForMaterial(mat.status)}
                                            </td>
                                            <td className="py-2">
                                              {matHistory.length > 0 && (
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  className="p-0 h-6 w-6"
                                                  onClick={() => toggleHistory(historyKey)}
                                                  title="Allocation history"
                                                >
                                                  <History className="h-3.5 w-3.5" />
                                                </Button>
                                              )}
                                            </td>
                                          </tr>
                                          {historyOpen[historyKey] && matHistory.length > 0 && (
                                            <tr key={`${mat.sku}-history`}>
                                              <td colSpan={9} className="py-1 pb-3">
                                                <div className="ml-4 p-2 bg-white border border-neutral-10 rounded text-xs">
                                                  <div className="flex items-center gap-1 mb-2 font-medium text-neutral-70">
                                                    <Clock className="h-3 w-3" />
                                                    Allocation History for {mat.sku}
                                                  </div>
                                                  <table className="w-full">
                                                    <thead>
                                                      <tr className="text-left text-neutral-50">
                                                        <th className="pb-1 pr-4">Order</th>
                                                        <th className="pb-1 pr-4">Quantity</th>
                                                        <th className="pb-1 pr-4">Date / Time</th>
                                                        <th className="pb-1">Allocated By</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {matHistory.map((h, i) => (
                                                        <tr key={i} className="border-t border-neutral-10">
                                                          <td className="py-1 pr-4">{h.order}</td>
                                                          <td className="py-1 pr-4">{formatNum(h.quantity)} {mat.unit}</td>
                                                          <td className="py-1 pr-4">{h.date}</td>
                                                          <td className="py-1">{h.user}</td>
                                                        </tr>
                                                      ))}
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </td>
                                            </tr>
                                          )}
                                        </>
                                      )
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 border-t bg-white flex items-center justify-between">
            <div className="text-sm text-neutral-50">Showing 3 of 12 estimates with material requirements</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
    </div>
  )
}
