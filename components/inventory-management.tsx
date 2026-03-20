"use client"

import { useState } from "react"
import { AlertCircle, Download, Upload, MoreHorizontal, Plus, ArrowUpDown, AlertTriangle, Package, Hash, CalendarClock, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useNavigation } from "@/lib/navigation-context"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from "recharts"

// --- Mock Data ---
interface LotEntry {
  lotNumber: string
  quantity: number
  receivedDate: string
  expirationDate: string | null
  supplier: string
}

interface SerialEntry {
  serialNumber: string
  status: "In Stock" | "Allocated" | "Shipped"
  location: string
}

interface InventoryItem {
  sku: string
  name: string
  type: string
  finish: string
  weight: string
  size: string
  pricePerTon: string
  inStock: number
  allocated: number
  stockPct: number
  status: "Low Stock" | "Normal" | "Allocated" | "Critical"
  reorderPoint: number
  supplier: string
  lots: LotEntry[]
  serials: SerialEntry[]
  isSerialized: boolean
}

const inventoryItems: InventoryItem[] = [
  {
    sku: "GC170-SRA3",
    name: "Gloss Coated Premium",
    type: "Coated",
    finish: "Gloss",
    weight: "170 gsm",
    size: "320 x 450",
    pricePerTon: "$1,250.00",
    inStock: 1200,
    allocated: 800,
    stockPct: 20,
    status: "Low Stock",
    reorderPoint: 5000,
    supplier: "Sappi",
    lots: [
      { lotNumber: "LOT-2025-0412", quantity: 800, receivedDate: "2025-04-12", expirationDate: "2026-04-12", supplier: "Sappi" },
      { lotNumber: "LOT-2025-0320", quantity: 400, receivedDate: "2025-03-20", expirationDate: "2025-06-20", supplier: "Sappi" },
    ],
    serials: [],
    isSerialized: false,
  },
  {
    sku: "UC120-A4",
    name: "Uncoated Offset",
    type: "Uncoated",
    finish: "Smooth",
    weight: "120 gsm",
    size: "210 x 297",
    pricePerTon: "$980.00",
    inStock: 25000,
    allocated: 5000,
    stockPct: 75,
    status: "Normal",
    reorderPoint: 8000,
    supplier: "Mondi",
    lots: [
      { lotNumber: "LOT-2025-0501", quantity: 15000, receivedDate: "2025-05-01", expirationDate: null, supplier: "Mondi" },
      { lotNumber: "LOT-2025-0415", quantity: 10000, receivedDate: "2025-04-15", expirationDate: null, supplier: "Mondi" },
    ],
    serials: [],
    isSerialized: false,
  },
  {
    sku: "SC250-A3",
    name: "Silk Coated",
    type: "Coated",
    finish: "Silk",
    weight: "250 gsm",
    size: "297 x 420",
    pricePerTon: "$1,350.00",
    inStock: 8500,
    allocated: 6000,
    stockPct: 60,
    status: "Allocated",
    reorderPoint: 4000,
    supplier: "Stora Enso",
    lots: [
      { lotNumber: "LOT-2025-0505", quantity: 5000, receivedDate: "2025-05-05", expirationDate: "2026-05-05", supplier: "Stora Enso" },
      { lotNumber: "LOT-2025-0228", quantity: 3500, receivedDate: "2025-02-28", expirationDate: "2025-05-28", supplier: "Stora Enso" },
    ],
    serials: [],
    isSerialized: false,
  },
  {
    sku: "RC100-A4",
    name: "Recycled Uncoated",
    type: "Recycled",
    finish: "Uncoated",
    weight: "100 gsm",
    size: "210 x 297",
    pricePerTon: "$1,050.00",
    inStock: 15000,
    allocated: 2000,
    stockPct: 90,
    status: "Normal",
    reorderPoint: 5000,
    supplier: "Mondi",
    lots: [
      { lotNumber: "LOT-2025-0510", quantity: 15000, receivedDate: "2025-05-10", expirationDate: null, supplier: "Mondi" },
    ],
    serials: [],
    isSerialized: false,
  },
  {
    sku: "MC350-SRA3",
    name: "Matte Coated Premium",
    type: "Coated",
    finish: "Matte",
    weight: "350 gsm",
    size: "320 x 450",
    pricePerTon: "$1,580.00",
    inStock: 5000,
    allocated: 1500,
    stockPct: 100,
    status: "Normal",
    reorderPoint: 3000,
    supplier: "Sappi",
    lots: [
      { lotNumber: "LOT-2025-0508", quantity: 3000, receivedDate: "2025-05-08", expirationDate: "2026-05-08", supplier: "Sappi" },
      { lotNumber: "LOT-2025-0401", quantity: 2000, receivedDate: "2025-04-01", expirationDate: "2025-07-01", supplier: "Sappi" },
    ],
    serials: [],
    isSerialized: false,
  },
  {
    sku: "PLATE-CTP-A3",
    name: "CTP Plate A3",
    type: "Plates",
    finish: "Thermal",
    weight: "N/A",
    size: "297 x 420",
    pricePerTon: "$45.00/ea",
    inStock: 12,
    allocated: 4,
    stockPct: 30,
    status: "Low Stock",
    reorderPoint: 20,
    supplier: "Fujifilm",
    lots: [],
    serials: [
      { serialNumber: "CTP-2025-00101", status: "In Stock", location: "Shelf A3" },
      { serialNumber: "CTP-2025-00102", status: "In Stock", location: "Shelf A3" },
      { serialNumber: "CTP-2025-00103", status: "Allocated", location: "Press 1" },
      { serialNumber: "CTP-2025-00104", status: "Allocated", location: "Press 2" },
      { serialNumber: "CTP-2025-00105", status: "In Stock", location: "Shelf A3" },
      { serialNumber: "CTP-2025-00106", status: "Shipped", location: "N/A" },
    ],
    isSerialized: true,
  },
]

// Forecast chart data (next 30 days projected stock)
const forecastData = [
  { day: "May 20", projected: 45200, committed: 8000, deliveries: 0, reorderPoint: 25000 },
  { day: "May 23", projected: 42500, committed: 10700, deliveries: 0, reorderPoint: 25000 },
  { day: "May 26", projected: 39000, committed: 14200, deliveries: 0, reorderPoint: 25000 },
  { day: "May 29", projected: 35800, committed: 17400, deliveries: 0, reorderPoint: 25000 },
  { day: "Jun 1", projected: 31500, committed: 21700, deliveries: 5000, reorderPoint: 25000 },
  { day: "Jun 4", projected: 33200, committed: 20000, deliveries: 0, reorderPoint: 25000 },
  { day: "Jun 7", projected: 29800, committed: 23400, deliveries: 0, reorderPoint: 25000 },
  { day: "Jun 10", projected: 26500, committed: 26700, deliveries: 0, reorderPoint: 25000 },
  { day: "Jun 13", projected: 23100, committed: 30100, deliveries: 10000, reorderPoint: 25000 },
  { day: "Jun 16", projected: 30800, committed: 22400, deliveries: 0, reorderPoint: 25000 },
  { day: "Jun 19", projected: 28200, committed: 25000, deliveries: 0, reorderPoint: 25000 },
]

function getExpirationStatus(expirationDate: string | null): "ok" | "soon" | "expired" {
  if (!expirationDate) return "ok"
  const today = new Date()
  const exp = new Date(expirationDate)
  const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return "expired"
  if (diffDays <= 30) return "soon"
  return "ok"
}

export default function InventoryManagement() {
  const { navigateTo } = useNavigation()
  const [activeTab, setActiveTab] = useState("paper")
  const [showAIInsights, setShowAIInsights] = useState(true)
  const [showForecast, setShowForecast] = useState(false)
  const [showSupplierPO, setShowSupplierPO] = useState(false)
  const [expandedSku, setExpandedSku] = useState<string | null>(null)
  const [reorderPoints, setReorderPoints] = useState<Record<string, number>>(() => {
    const pts: Record<string, number> = {}
    inventoryItems.forEach((item) => { pts[item.sku] = item.reorderPoint })
    return pts
  })
  const [editingReorder, setEditingReorder] = useState<string | null>(null)
  const [editReorderValue, setEditReorderValue] = useState("")

  // Supplier PO modal state
  const [poSku, setPoSku] = useState("")
  const [poQty, setPoQty] = useState("")
  const [poSupplier, setPoSupplier] = useState("")
  const [poSubmitted, setPoSubmitted] = useState(false)

  const isLowStock = (item: InventoryItem) => {
    const rp = reorderPoints[item.sku] ?? item.reorderPoint
    return item.inStock <= rp
  }

  const handleReorderEdit = (sku: string, currentValue: number) => {
    setEditingReorder(sku)
    setEditReorderValue(String(currentValue))
  }

  const handleReorderSave = (sku: string) => {
    const val = parseInt(editReorderValue)
    if (!isNaN(val) && val >= 0) {
      setReorderPoints((prev) => ({ ...prev, [sku]: val }))
    }
    setEditingReorder(null)
  }

  const openSupplierPO = (sku?: string, supplier?: string) => {
    setPoSku(sku || "")
    setPoSupplier(supplier || "")
    setPoQty("")
    setPoSubmitted(false)
    setShowSupplierPO(true)
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 bg-neutral-5 border-b">
        <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span>Alerts</span>
            <Badge className="ml-1 bg-critical-100">{inventoryItems.filter(isLowStock).length}</Badge>
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-1" /> Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowForecast(!showForecast)}>
            <CalendarClock className="h-4 w-4 mr-1" /> {showForecast ? "Hide Forecast" : "Stock Forecast"}
          </Button>
          <Button onClick={() => openSupplierPO()}>
            <ShoppingCart className="h-4 w-4 mr-1" /> Create Supplier PO
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-1" /> Add SKU
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="paper">Paper Stock</TabsTrigger>
              <TabsTrigger value="ink">Ink & Toner</TabsTrigger>
              <TabsTrigger value="finishing">Finishing Materials</TabsTrigger>
              <TabsTrigger value="packaging">Packaging</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div className="flex flex-wrap gap-3 mb-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Paper Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="coated">Coated</SelectItem>
              <SelectItem value="uncoated">Uncoated</SelectItem>
              <SelectItem value="recycled">Recycled</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Weight (GSM)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Weights</SelectItem>
              <SelectItem value="80-120">80-120 gsm</SelectItem>
              <SelectItem value="121-170">121-170 gsm</SelectItem>
              <SelectItem value="171-250">171-250 gsm</SelectItem>
              <SelectItem value="251+">251+ gsm</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="a4">A4 (210x297mm)</SelectItem>
              <SelectItem value="a3">A3 (297x420mm)</SelectItem>
              <SelectItem value="sra3">SRA3 (320x450mm)</SelectItem>
              <SelectItem value="custom">Custom Sizes</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suppliers</SelectItem>
              <SelectItem value="sappi">Sappi</SelectItem>
              <SelectItem value="mondi">Mondi</SelectItem>
              <SelectItem value="stora">Stora Enso</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Stock Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="high">High Stock</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1">
            <Input type="text" placeholder="Search SKUs, names, or attributes..." className="w-full" />
          </div>
        </div>

        {showAIInsights && (
          <div className="bg-info-10 border border-info-20 rounded-md p-4 mb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="bg-info-10 p-2 rounded-full mr-3">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2819%29-170UxeV7cg8b7kNjFagZkz9quPldwr.png"
                    alt="GelatoConnect Logo"
                    className="h-5 w-5 mr-2"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-info-90">ConnectAI Inventory Alert</h3>
                  <p className="mt-2 text-sm">
                    <strong>Low stock alert:</strong> 170gsm SRA3 Gloss Coated paper (SKU: GC170-SRA3) is below
                    minimum threshold and needs immediate restock. Lot LOT-2025-0320 expires within 30 days -- use FIFO.
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAIInsights(false)}>
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Inventory Forecast Chart */}
        {showForecast && (
          <div className="bg-white border border-neutral-10 rounded-md p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-base">Inventory Forecast -- Next 30 Days</h3>
                <p className="text-xs text-neutral-50 mt-0.5">Projected stock levels based on committed orders and expected deliveries</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-primary-100" />
                  <span>Projected Stock</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-amber-400" />
                  <span>Committed Orders</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-critical-100" style={{ borderTop: "2px dashed" }} />
                  <span>Reorder Point</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={forecastData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <RechartsTooltip
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid #e5e5e5" }}
                  formatter={(value: number, name: string) => [value.toLocaleString(), name === "projected" ? "Projected Stock" : "Committed Orders"]}
                />
                <ReferenceLine y={25000} stroke="#d94040" strokeDasharray="6 3" label={{ value: "Reorder Point", position: "right", fontSize: 10, fill: "#d94040" }} />
                <Area type="monotone" dataKey="projected" stroke="#4361ee" fill="#4361ee" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="committed" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        <div className="border rounded-md m-4 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-5 text-left">
                <th className="px-4 py-3 text-sm font-medium text-neutral-50 w-10">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                  <div className="flex items-center">
                    SKU / Name
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                  <div className="flex items-center">
                    Type / Finish
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                  <div className="flex items-center">
                    Weight
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                  <div className="flex items-center">
                    Size (mm)
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                  <div className="flex items-center">
                    Price/Ton
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                  <div className="flex items-center">
                    In Stock
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                  <div className="flex items-center">
                    Allocated
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                  <div className="flex items-center">
                    Reorder Pt
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                  <div className="flex items-center">
                    Expiration
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50">
                  <div className="flex items-center">
                    Status
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-neutral-50 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => {
                const lowStock = isLowStock(item)
                const rp = reorderPoints[item.sku] ?? item.reorderPoint
                // Find earliest expiration across lots
                const expiringLots = item.lots.filter((l) => l.expirationDate)
                const earliestExp = expiringLots.length > 0
                  ? expiringLots.reduce((min, l) => (!min || (l.expirationDate && l.expirationDate < min) ? l.expirationDate : min), expiringLots[0]?.expirationDate || null)
                  : null
                const expStatus = getExpirationStatus(earliestExp)
                const isExpanded = expandedSku === item.sku

                return (
                  <>
                    <tr key={item.sku} className={`border-t hover:bg-neutral-5 ${isExpanded ? "bg-neutral-5" : ""}`}>
                      <td className="px-4 py-3">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium flex items-center gap-1.5">
                              {item.sku}
                              {lowStock && (
                                <Badge className="bg-critical-100 text-white hover:bg-critical-100 text-[10px] px-1.5 py-0 leading-4 flex items-center gap-0.5">
                                  <AlertTriangle className="h-3 w-3" />
                                  Low
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-neutral-50">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>{item.type}</div>
                        <div className="text-xs text-neutral-50">{item.finish}</div>
                      </td>
                      <td className="px-4 py-3">{item.weight}</td>
                      <td className="px-4 py-3">{item.size}</td>
                      <td className="px-4 py-3">{item.pricePerTon}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className="mr-2">{item.inStock.toLocaleString()}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="w-24">
                                  <Progress value={item.stockPct} className="h-2" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{item.stockPct}% of reorder point ({rp.toLocaleString()})</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {item.status === "Allocated" ? (
                          <div className="flex items-center">
                            <span>{item.allocated.toLocaleString()}</span>
                            <Badge className="ml-2 bg-info-10 text-info-90 hover:bg-info-10 text-xs">Upcoming</Badge>
                          </div>
                        ) : (
                          item.allocated.toLocaleString()
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editingReorder === item.sku ? (
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={editReorderValue}
                              onChange={(e) => setEditReorderValue(e.target.value)}
                              className="w-20 h-7 text-xs"
                              onKeyDown={(e) => { if (e.key === "Enter") handleReorderSave(item.sku); if (e.key === "Escape") setEditingReorder(null) }}
                              autoFocus
                            />
                            <Button variant="ghost" size="sm" className="h-7 px-1 text-xs" onClick={() => handleReorderSave(item.sku)}>OK</Button>
                          </div>
                        ) : (
                          <button
                            className="text-left hover:underline cursor-pointer text-sm"
                            onClick={() => handleReorderEdit(item.sku, rp)}
                            title="Click to edit reorder point"
                          >
                            {rp.toLocaleString()}
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {earliestExp ? (
                          <span
                            className={
                              expStatus === "expired"
                                ? "text-critical-90 font-medium bg-critical-10 px-2 py-0.5 rounded text-xs"
                                : expStatus === "soon"
                                ? "text-amber-800 font-medium bg-amber-100 px-2 py-0.5 rounded text-xs"
                                : "text-xs"
                            }
                          >
                            {expStatus === "expired" ? "EXPIRED " : expStatus === "soon" ? "FIFO " : ""}
                            {earliestExp}
                          </span>
                        ) : (
                          <span className="text-xs text-neutral-40">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {lowStock ? (
                          <Badge className="bg-critical-10 text-critical-90 hover:bg-critical-10">Low Stock</Badge>
                        ) : item.status === "Allocated" ? (
                          <Badge className="bg-info-10 text-info-90 hover:bg-info-10">Allocated</Badge>
                        ) : (
                          <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Normal</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="p-0 h-6 w-6" onClick={() => setExpandedSku(isExpanded ? null : item.sku)} title="View lots/serials">
                            <Package className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {/* Expanded detail: Lot/Batch tracking and Serial numbers */}
                    {isExpanded && (
                      <tr key={`${item.sku}-detail`} className="bg-neutral-5 border-t">
                        <td colSpan={12} className="px-4 py-3">
                          <div className="pl-6 space-y-4">
                            {/* Lot/Batch Tracking */}
                            {item.lots.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-1.5">
                                  <Hash className="h-4 w-4" />
                                  Lot / Batch Tracking
                                </h4>
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="text-left text-xs text-neutral-50">
                                      <th className="pb-2 pr-4">Lot Number</th>
                                      <th className="pb-2 pr-4">Quantity</th>
                                      <th className="pb-2 pr-4">Received</th>
                                      <th className="pb-2 pr-4">Expiration</th>
                                      <th className="pb-2 pr-4">Supplier</th>
                                      <th className="pb-2">FIFO Priority</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.lots
                                      .sort((a, b) => {
                                        // Sort by expiration date (FIFO) -- nulls last
                                        if (!a.expirationDate && !b.expirationDate) return 0
                                        if (!a.expirationDate) return 1
                                        if (!b.expirationDate) return -1
                                        return a.expirationDate.localeCompare(b.expirationDate)
                                      })
                                      .map((lot, idx) => {
                                        const lotExpStatus = getExpirationStatus(lot.expirationDate)
                                        return (
                                          <tr key={lot.lotNumber} className="border-t border-neutral-10">
                                            <td className="py-1.5 pr-4 font-mono text-xs">{lot.lotNumber}</td>
                                            <td className="py-1.5 pr-4">{lot.quantity.toLocaleString()}</td>
                                            <td className="py-1.5 pr-4">{lot.receivedDate}</td>
                                            <td className="py-1.5 pr-4">
                                              {lot.expirationDate ? (
                                                <span
                                                  className={
                                                    lotExpStatus === "expired"
                                                      ? "text-critical-90 font-medium bg-critical-10 px-1.5 py-0.5 rounded"
                                                      : lotExpStatus === "soon"
                                                      ? "text-amber-800 font-medium bg-amber-100 px-1.5 py-0.5 rounded"
                                                      : ""
                                                  }
                                                >
                                                  {lotExpStatus === "expired" && "EXPIRED "}
                                                  {lotExpStatus === "soon" && "EXPIRING SOON "}
                                                  {lot.expirationDate}
                                                </span>
                                              ) : (
                                                <span className="text-neutral-40">N/A</span>
                                              )}
                                            </td>
                                            <td className="py-1.5 pr-4">{lot.supplier}</td>
                                            <td className="py-1.5">
                                              <Badge className={idx === 0 ? "bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs" : "bg-neutral-10 text-neutral-50 hover:bg-neutral-10 text-xs"}>
                                                {idx === 0 ? "Use First" : `Priority ${idx + 1}`}
                                              </Badge>
                                            </td>
                                          </tr>
                                        )
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {/* Serial Number Tracking */}
                            {item.isSerialized && item.serials.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-1.5">
                                  <Hash className="h-4 w-4" />
                                  Serial Number Tracking
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.serials.map((s) => (
                                    <div
                                      key={s.serialNumber}
                                      className={`border rounded px-3 py-1.5 text-xs font-mono ${
                                        s.status === "In Stock"
                                          ? "bg-success-10 border-success-20 text-success-90"
                                          : s.status === "Allocated"
                                          ? "bg-info-10 border-info-20 text-info-90"
                                          : "bg-neutral-10 border-neutral-20 text-neutral-50"
                                      }`}
                                    >
                                      <div className="font-medium">{s.serialNumber}</div>
                                      <div className="flex items-center justify-between gap-3 mt-0.5">
                                        <span>{s.status}</span>
                                        <span className="text-neutral-50">{s.location}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Quick reorder action for low-stock items */}
                            {lowStock && (
                              <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded">
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                                <span className="text-sm">Stock is below reorder point ({rp.toLocaleString()}). Current: {item.inStock.toLocaleString()}.</span>
                                <Button size="sm" variant="outline" onClick={() => openSupplierPO(item.sku, item.supplier)}>
                                  <ShoppingCart className="h-3.5 w-3.5 mr-1" /> Reorder from {item.supplier}
                                </Button>
                              </div>
                            )}
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
        <div className="text-sm text-neutral-50">Showing {inventoryItems.length} of 42 items</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* Supplier PO Modal */}
      {showSupplierPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Create Supplier Purchase Order</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowSupplierPO(false)}>
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              {poSubmitted ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-12 h-12 bg-success-10 rounded-full flex items-center justify-center mb-3">
                    <svg className="h-6 w-6 text-success-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg">Purchase Order Created</h3>
                  <p className="text-sm text-neutral-50 mt-1">
                    PO-2025-0087 has been sent to {poSupplier || "supplier"} for {parseInt(poQty || "0").toLocaleString()} units of {poSku || "selected item"}.
                  </p>
                  <Button className="mt-4" onClick={() => setShowSupplierPO(false)}>Close</Button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium mb-1 block">SKU</label>
                    <Select value={poSku} onValueChange={setPoSku}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material..." />
                      </SelectTrigger>
                      <SelectContent>
                        {inventoryItems.map((item) => (
                          <SelectItem key={item.sku} value={item.sku}>
                            {item.sku} -- {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Supplier</label>
                    <Select value={poSupplier} onValueChange={setPoSupplier}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sappi">Sappi</SelectItem>
                        <SelectItem value="Mondi">Mondi</SelectItem>
                        <SelectItem value="Stora Enso">Stora Enso</SelectItem>
                        <SelectItem value="Fujifilm">Fujifilm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Quantity</label>
                    <Input
                      type="number"
                      placeholder="Enter quantity..."
                      value={poQty}
                      onChange={(e) => setPoQty(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Requested Delivery Date</label>
                    <Input type="date" defaultValue="2025-06-01" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Notes</label>
                    <Input type="text" placeholder="Optional notes for supplier..." />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setShowSupplierPO(false)}>Cancel</Button>
                    <Button
                      onClick={() => setPoSubmitted(true)}
                      disabled={!poSku || !poSupplier || !poQty}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" /> Submit Purchase Order
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
