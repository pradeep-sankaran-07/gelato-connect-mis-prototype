"use client"

import { useState } from "react"
import {
  FileText,
  ShoppingCart,
  Briefcase,
  Receipt,
  Package,
  Users,
  Download,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  Play,
  Pencil,
  Trash2,
  Eye,
  X,
  Search,
  FileSpreadsheet,
  File,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"

// ── Entity definitions ─────────────────────────────────────────────────
const entities = [
  { id: "orders", label: "Orders", icon: ShoppingCart, count: 1284, color: "bg-info-10 text-info-90" },
  { id: "jobs", label: "Jobs", icon: Briefcase, count: 3672, color: "bg-primary-5 text-primary-90" },
  { id: "invoices", label: "Invoices", icon: Receipt, count: 956, color: "bg-success-10 text-success-90" },
  { id: "inventory", label: "Inventory", icon: Package, count: 428, color: "bg-warning-10 text-warning-90" },
  { id: "customers", label: "Customers", icon: Users, count: 312, color: "bg-neutral-10 text-neutral-90" },
]

const entityColumns: Record<string, { id: string; label: string; default: boolean }[]> = {
  orders: [
    { id: "order_id", label: "Order ID", default: true },
    { id: "date", label: "Order Date", default: true },
    { id: "customer", label: "Customer", default: true },
    { id: "product", label: "Product", default: true },
    { id: "quantity", label: "Quantity", default: true },
    { id: "total", label: "Total Amount", default: true },
    { id: "status", label: "Status", default: true },
    { id: "due_date", label: "Due Date", default: false },
    { id: "sales_rep", label: "Sales Rep", default: false },
    { id: "notes", label: "Notes", default: false },
  ],
  jobs: [
    { id: "job_id", label: "Job ID", default: true },
    { id: "order_id", label: "Order ID", default: true },
    { id: "product", label: "Product", default: true },
    { id: "machine", label: "Machine", default: true },
    { id: "status", label: "Status", default: true },
    { id: "start_date", label: "Start Date", default: true },
    { id: "impressions", label: "Impressions", default: false },
    { id: "waste", label: "Waste %", default: false },
    { id: "operator", label: "Operator", default: false },
  ],
  invoices: [
    { id: "invoice_id", label: "Invoice ID", default: true },
    { id: "date", label: "Invoice Date", default: true },
    { id: "customer", label: "Customer", default: true },
    { id: "amount", label: "Amount", default: true },
    { id: "status", label: "Status", default: true },
    { id: "due_date", label: "Due Date", default: true },
    { id: "payment_date", label: "Payment Date", default: false },
    { id: "method", label: "Payment Method", default: false },
  ],
  inventory: [
    { id: "sku", label: "SKU", default: true },
    { id: "name", label: "Item Name", default: true },
    { id: "category", label: "Category", default: true },
    { id: "quantity", label: "Quantity", default: true },
    { id: "unit", label: "Unit", default: true },
    { id: "location", label: "Location", default: false },
    { id: "reorder_level", label: "Reorder Level", default: false },
    { id: "last_updated", label: "Last Updated", default: false },
  ],
  customers: [
    { id: "customer_id", label: "Customer ID", default: true },
    { id: "name", label: "Name", default: true },
    { id: "email", label: "Email", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "company", label: "Company", default: true },
    { id: "total_orders", label: "Total Orders", default: false },
    { id: "lifetime_value", label: "Lifetime Value", default: false },
    { id: "created_date", label: "Created Date", default: false },
  ],
}

// ── Export History data ────────────────────────────────────────────────
const exportHistory = [
  { id: 1, date: "2026-03-19 09:15", entity: "Orders", format: "CSV", records: 245, size: "1.2 MB", status: "completed" },
  { id: 2, date: "2026-03-18 16:42", entity: "Invoices", format: "Excel", records: 128, size: "856 KB", status: "completed" },
  { id: 3, date: "2026-03-18 11:30", entity: "Inventory", format: "CSV", records: 428, size: "2.1 MB", status: "completed" },
  { id: 4, date: "2026-03-17 14:22", entity: "Customers", format: "PDF", records: 312, size: "4.8 MB", status: "completed" },
  { id: 5, date: "2026-03-17 09:00", entity: "Orders", format: "Excel", records: 89, size: "512 KB", status: "completed" },
  { id: 6, date: "2026-03-16 17:15", entity: "Jobs", format: "CSV", records: 567, size: "3.4 MB", status: "completed" },
  { id: 7, date: "2026-03-15 10:45", entity: "Invoices", format: "Excel", records: 64, size: "384 KB", status: "completed" },
  { id: 8, date: "2026-03-14 13:30", entity: "Orders", format: "CSV", records: 312, size: "1.8 MB", status: "failed" },
  { id: 9, date: "2026-03-14 08:00", entity: "Inventory", format: "PDF", records: 428, size: "6.2 MB", status: "completed" },
  { id: 10, date: "2026-03-13 15:20", entity: "Customers", format: "Excel", records: 312, size: "1.1 MB", status: "completed" },
]

// ── Scheduled Exports data ─────────────────────────────────────────────
const initialScheduledExports = [
  {
    id: 1,
    name: "Daily Order Summary",
    entity: "Orders",
    format: "CSV",
    schedule: "Daily",
    time: "6:00 AM",
    lastRun: "2026-03-19 06:00",
    nextRun: "2026-03-20 06:00",
    status: "active",
  },
  {
    id: 2,
    name: "Weekly Invoice Report",
    entity: "Invoices",
    format: "Excel",
    schedule: "Weekly (Monday)",
    time: "8:00 AM",
    lastRun: "2026-03-17 08:00",
    nextRun: "2026-03-24 08:00",
    status: "active",
  },
  {
    id: 3,
    name: "Monthly Inventory Snapshot",
    entity: "Inventory",
    format: "Excel",
    schedule: "Monthly (1st)",
    time: "7:00 AM",
    lastRun: "2026-03-01 07:00",
    nextRun: "2026-04-01 07:00",
    status: "active",
  },
]

// ── Preview data ───────────────────────────────────────────────────────
const previewData: Record<string, Record<string, string>[]> = {
  orders: [
    { order_id: "ORD-2026-0891", date: "2026-03-19", customer: "Acme Corp", product: "Business Cards 350gsm", quantity: "5,000", total: "$1,250.00", status: "In Production" },
    { order_id: "ORD-2026-0890", date: "2026-03-18", customer: "PrintCo Berlin", product: "A2 Poster Matte", quantity: "500", total: "$875.00", status: "Completed" },
    { order_id: "ORD-2026-0889", date: "2026-03-18", customer: "Nordic Media", product: "DL Flyer 170gsm", quantity: "10,000", total: "$2,100.00", status: "Shipped" },
    { order_id: "ORD-2026-0888", date: "2026-03-17", customer: "Sandbox Inc", product: "A4 Brochure Tri-fold", quantity: "2,500", total: "$1,680.00", status: "Pending" },
    { order_id: "ORD-2026-0887", date: "2026-03-17", customer: "Athletix GmbH", product: "Roll-up Banner 85cm", quantity: "12", total: "$960.00", status: "In Production" },
  ],
  jobs: [
    { job_id: "J-18", order_id: "ORD-2026-0891", product: "Business Cards 350gsm", machine: "HP Indigo 7900", status: "Running", start_date: "2026-03-19" },
    { job_id: "J-17", order_id: "ORD-2026-0890", product: "A2 Poster Matte", machine: "HP Latex 800", status: "Completed", start_date: "2026-03-18" },
    { job_id: "J-16", order_id: "ORD-2026-0889", product: "DL Flyer 170gsm", machine: "HP Indigo 5900", status: "Completed", start_date: "2026-03-17" },
    { job_id: "J-15", order_id: "ORD-2026-0888", product: "A4 Brochure Tri-fold", machine: "KBA Rapida 105", status: "Queued", start_date: "2026-03-20" },
    { job_id: "J-14", order_id: "ORD-2026-0887", product: "Roll-up Banner 85cm", machine: "HP Latex 800", status: "Running", start_date: "2026-03-19" },
  ],
  invoices: [
    { invoice_id: "INV-2026-0412", date: "2026-03-19", customer: "Acme Corp", amount: "$1,250.00", status: "Unpaid", due_date: "2026-04-18" },
    { invoice_id: "INV-2026-0411", date: "2026-03-18", customer: "PrintCo Berlin", amount: "$875.00", status: "Paid", due_date: "2026-04-17" },
    { invoice_id: "INV-2026-0410", date: "2026-03-17", customer: "Nordic Media", amount: "$2,100.00", status: "Paid", due_date: "2026-04-16" },
    { invoice_id: "INV-2026-0409", date: "2026-03-16", customer: "Sandbox Inc", amount: "$1,680.00", status: "Overdue", due_date: "2026-03-16" },
    { invoice_id: "INV-2026-0408", date: "2026-03-15", customer: "Athletix GmbH", amount: "$960.00", status: "Paid", due_date: "2026-04-14" },
  ],
  inventory: [
    { sku: "PAP-C350-A4", name: "Coated 350gsm A4", category: "Paper", quantity: "12,500", unit: "Sheets" },
    { sku: "PAP-U170-A3", name: "Uncoated 170gsm A3", category: "Paper", quantity: "8,200", unit: "Sheets" },
    { sku: "INK-CMYK-HP7", name: "HP Indigo CMYK Set", category: "Ink", quantity: "24", unit: "Cartridges" },
    { sku: "FIN-LAM-GLO", name: "Gloss Lamination Roll", category: "Finishing", quantity: "18", unit: "Rolls" },
    { sku: "PAP-SYN-A3", name: "Synthetic 200gsm A3", category: "Paper", quantity: "3,400", unit: "Sheets" },
  ],
  customers: [
    { customer_id: "CUST-001", name: "Acme Corp", email: "orders@acme.com", phone: "+49 30 1234567", company: "Acme Corporation" },
    { customer_id: "CUST-002", name: "PrintCo Berlin", email: "info@printco.de", phone: "+49 30 9876543", company: "PrintCo GmbH" },
    { customer_id: "CUST-003", name: "Nordic Media", email: "print@nordic.se", phone: "+46 8 5551234", company: "Nordic Media AB" },
    { customer_id: "CUST-004", name: "Sandbox Inc", email: "hello@sandbox.io", phone: "+1 415 5559876", company: "Sandbox Inc" },
    { customer_id: "CUST-005", name: "Athletix GmbH", email: "orders@athletix.de", phone: "+49 89 4445678", company: "Athletix GmbH" },
  ],
}

// ── Component ──────────────────────────────────────────────────────────

export default function DataExport() {
  const [activeTab, setActiveTab] = useState("builder")

  // Builder state
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null)
  const [dateFrom, setDateFrom] = useState("2026-03-01")
  const [dateTo, setDateTo] = useState("2026-03-19")
  const [statusFilter, setStatusFilter] = useState("all")
  const [customerFilter, setCustomerFilter] = useState("all")
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState("csv")
  const [showPreview, setShowPreview] = useState(false)

  // Schedule modal
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [scheduleName, setScheduleName] = useState("")
  const [scheduleEntity, setScheduleEntity] = useState("orders")
  const [scheduleFormat, setScheduleFormat] = useState("csv")
  const [scheduleFrequency, setScheduleFrequency] = useState("daily")
  const [scheduleTime, setScheduleTime] = useState("06:00")
  const [scheduleDay, setScheduleDay] = useState("monday")

  const [scheduledExports, setScheduledExports] = useState(initialScheduledExports)

  // When entity is selected, set default columns
  const handleEntitySelect = (entityId: string) => {
    setSelectedEntity(entityId)
    setShowPreview(false)
    const cols = entityColumns[entityId] || []
    setSelectedColumns(cols.filter((c) => c.default).map((c) => c.id))
  }

  const toggleColumn = (colId: string) => {
    setSelectedColumns((prev) =>
      prev.includes(colId) ? prev.filter((c) => c !== colId) : [...prev, colId]
    )
  }

  const selectAllColumns = () => {
    if (!selectedEntity) return
    setSelectedColumns(entityColumns[selectedEntity].map((c) => c.id))
  }

  const deselectAllColumns = () => {
    setSelectedColumns([])
  }

  const handleExport = () => {
    if (!selectedEntity) return
    const entity = entities.find((e) => e.id === selectedEntity)
    const formatLabel = exportFormat === "csv" ? "CSV" : exportFormat === "xlsx" ? "Excel (.xlsx)" : "PDF"
    const sizeMap: Record<string, string> = { csv: "1.4 MB", xlsx: "892 KB", pdf: "3.2 MB" }
    toast.success(`Export completed successfully`, {
      description: `${entity?.label} exported as ${formatLabel} — ${entity?.count} records, ${sizeMap[exportFormat]}`,
    })
  }

  const handleRunNow = (name: string) => {
    toast.success(`Export started`, { description: `"${name}" is running now.` })
  }

  const handleDeleteSchedule = (id: number) => {
    setScheduledExports((prev) => prev.filter((s) => s.id !== id))
    toast.success("Scheduled export deleted")
  }

  const handleCreateSchedule = () => {
    if (!scheduleName.trim()) {
      toast.error("Please enter a schedule name")
      return
    }
    const freqLabel =
      scheduleFrequency === "daily"
        ? "Daily"
        : scheduleFrequency === "weekly"
          ? `Weekly (${scheduleDay.charAt(0).toUpperCase() + scheduleDay.slice(1)})`
          : "Monthly (1st)"
    const newSchedule = {
      id: Date.now(),
      name: scheduleName,
      entity: entities.find((e) => e.id === scheduleEntity)?.label || scheduleEntity,
      format: scheduleFormat === "csv" ? "CSV" : scheduleFormat === "xlsx" ? "Excel" : "PDF",
      schedule: freqLabel,
      time: scheduleTime,
      lastRun: "—",
      nextRun: "2026-03-20 " + scheduleTime,
      status: "active" as const,
    }
    setScheduledExports((prev) => [...prev, newSchedule])
    setShowScheduleModal(false)
    setScheduleName("")
    toast.success("Scheduled export created", { description: `"${scheduleName}" has been scheduled.` })
  }

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "csv":
        return <FileText className="h-4 w-4 text-info-70" />
      case "excel":
      case "xlsx":
        return <FileSpreadsheet className="h-4 w-4 text-success-70" />
      case "pdf":
        return <File className="h-4 w-4 text-critical-60" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // ── Render ──────────────────────────────────────────────────────────

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-neutral-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-100">Data Export</h1>
            <p className="text-sm text-neutral-60 mt-1">Export your data in CSV, Excel, or PDF format</p>
          </div>
          <Button
            className="bg-neutral-100 text-white rounded-full hover:opacity-90"
            onClick={() => {
              setActiveTab("builder")
              setSelectedEntity(null)
              setShowPreview(false)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="builder">Export Builder</TabsTrigger>
              <TabsTrigger value="history">Export History</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
            </TabsList>

            {/* ─── Export Builder Tab ─────────────────────────────────── */}
            <TabsContent value="builder">
              <div className="space-y-8">
                {/* Step 1: Select Entity */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-100 mb-1">Step 1: Select Entity</h3>
                  <p className="text-xs text-neutral-60 mb-4">Choose the data type you want to export</p>
                  <div className="grid grid-cols-5 gap-3">
                    {entities.map((entity) => {
                      const Icon = entity.icon
                      const isSelected = selectedEntity === entity.id
                      return (
                        <button
                          key={entity.id}
                          onClick={() => handleEntitySelect(entity.id)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-neutral-100 bg-neutral-5"
                              : "border-neutral-20 hover:border-neutral-40"
                          }`}
                        >
                          <div className={`p-2.5 rounded-lg ${entity.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-neutral-100">{entity.label}</span>
                          <span className="text-xs text-neutral-60">{entity.count.toLocaleString()} records</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 2: Filters */}
                {selectedEntity && (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-100 mb-1">Step 2: Filters</h3>
                    <p className="text-xs text-neutral-60 mb-4">Narrow down the data to export</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-90">Date From</label>
                        <Input
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          className="w-[180px]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-90">Date To</label>
                        <Input
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                          className="w-[180px]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-90">Status</label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Statuses" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            {selectedEntity === "orders" && (
                              <>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_production">In Production</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                              </>
                            )}
                            {selectedEntity === "invoices" && (
                              <>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="unpaid">Unpaid</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                              </>
                            )}
                            {selectedEntity === "jobs" && (
                              <>
                                <SelectItem value="queued">Queued</SelectItem>
                                <SelectItem value="running">Running</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </>
                            )}
                            {selectedEntity === "inventory" && (
                              <>
                                <SelectItem value="in_stock">In Stock</SelectItem>
                                <SelectItem value="low_stock">Low Stock</SelectItem>
                                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                              </>
                            )}
                            {selectedEntity === "customers" && (
                              <>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      {(selectedEntity === "orders" || selectedEntity === "invoices" || selectedEntity === "jobs") && (
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-medium text-neutral-90">Customer</label>
                          <Select value={customerFilter} onValueChange={setCustomerFilter}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="All Customers" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Customers</SelectItem>
                              <SelectItem value="acme">Acme Corp</SelectItem>
                              <SelectItem value="printco">PrintCo Berlin</SelectItem>
                              <SelectItem value="nordic">Nordic Media</SelectItem>
                              <SelectItem value="sandbox">Sandbox Inc</SelectItem>
                              <SelectItem value="athletix">Athletix GmbH</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Select Columns */}
                {selectedEntity && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-100">Step 3: Select Columns</h3>
                        <p className="text-xs text-neutral-60 mt-0.5">Choose which fields to include in the export</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={selectAllColumns}
                          className="text-xs text-info-70 hover:underline font-medium"
                        >
                          Select All
                        </button>
                        <span className="text-neutral-30">|</span>
                        <button
                          onClick={deselectAllColumns}
                          className="text-xs text-info-70 hover:underline font-medium"
                        >
                          Deselect All
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-3">
                      {entityColumns[selectedEntity]?.map((col) => (
                        <label
                          key={col.id}
                          className="flex items-center gap-2 p-2.5 rounded-lg border border-neutral-20 hover:bg-neutral-5 cursor-pointer transition-colors"
                        >
                          <Checkbox
                            checked={selectedColumns.includes(col.id)}
                            onCheckedChange={() => toggleColumn(col.id)}
                          />
                          <span className="text-sm text-neutral-90">{col.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Format */}
                {selectedEntity && (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-100 mb-1">Step 4: Export Format</h3>
                    <p className="text-xs text-neutral-60 mb-3">Choose the file format for your export</p>
                    <RadioGroup
                      value={exportFormat}
                      onValueChange={setExportFormat}
                      className="flex gap-4"
                    >
                      <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${exportFormat === "csv" ? "border-neutral-100 bg-neutral-5" : "border-neutral-20 hover:border-neutral-40"}`}>
                        <RadioGroupItem value="csv" id="fmt-csv" />
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-info-70" />
                          <div>
                            <div className="text-sm font-medium">CSV</div>
                            <div className="text-xs text-neutral-60">Comma-separated values</div>
                          </div>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${exportFormat === "xlsx" ? "border-neutral-100 bg-neutral-5" : "border-neutral-20 hover:border-neutral-40"}`}>
                        <RadioGroupItem value="xlsx" id="fmt-xlsx" />
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-success-70" />
                          <div>
                            <div className="text-sm font-medium">Excel (.xlsx)</div>
                            <div className="text-xs text-neutral-60">Microsoft Excel format</div>
                          </div>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${exportFormat === "pdf" ? "border-neutral-100 bg-neutral-5" : "border-neutral-20 hover:border-neutral-40"}`}>
                        <RadioGroupItem value="pdf" id="fmt-pdf" />
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-critical-60" />
                          <div>
                            <div className="text-sm font-medium">PDF</div>
                            <div className="text-xs text-neutral-60">Portable Document Format</div>
                          </div>
                        </div>
                      </label>
                    </RadioGroup>
                  </div>
                )}

                {/* Actions */}
                {selectedEntity && (
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="rounded-full border-neutral-40"
                      onClick={() => setShowPreview(true)}
                      disabled={selectedColumns.length === 0}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      className="bg-neutral-100 text-white rounded-full hover:opacity-90"
                      onClick={handleExport}
                      disabled={selectedColumns.length === 0}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                )}

                {/* Preview Table */}
                {showPreview && selectedEntity && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-neutral-100">Preview (first 5 rows)</h3>
                      <button onClick={() => setShowPreview(false)} className="text-neutral-60 hover:text-neutral-100">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="border border-neutral-20 rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-neutral-5">
                              {selectedColumns.map((colId) => {
                                const col = entityColumns[selectedEntity]?.find((c) => c.id === colId)
                                return (
                                  <th
                                    key={colId}
                                    className="px-3 py-2 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20 whitespace-nowrap"
                                  >
                                    {col?.label || colId}
                                  </th>
                                )
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {previewData[selectedEntity]?.map((row, i) => (
                              <tr key={i} className="hover:bg-neutral-5/50">
                                {selectedColumns.map((colId) => (
                                  <td
                                    key={colId}
                                    className="px-3 py-2 text-sm text-neutral-90 border-b border-neutral-20 whitespace-nowrap"
                                  >
                                    {row[colId] || "—"}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* ─── Export History Tab ─────────────────────────────────── */}
            <TabsContent value="history">
              <div className="border border-neutral-20 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-5">
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Export Date</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Entity</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Format</th>
                      <th className="px-4 py-2.5 text-right text-xs font-medium text-neutral-70 border-b border-neutral-20">Records</th>
                      <th className="px-4 py-2.5 text-right text-xs font-medium text-neutral-70 border-b border-neutral-20">File Size</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Status</th>
                      <th className="px-4 py-2.5 text-right text-xs font-medium text-neutral-70 border-b border-neutral-20">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exportHistory.map((exp) => (
                      <tr key={exp.id} className="hover:bg-neutral-5/50">
                        <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-neutral-50" />
                            {exp.date}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20">{exp.entity}</td>
                        <td className="px-4 py-3 text-sm border-b border-neutral-20">
                          <div className="flex items-center gap-1.5">
                            {getFormatIcon(exp.format)}
                            <span className="text-neutral-90">{exp.format}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20 text-right">
                          {exp.records.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20 text-right">{exp.size}</td>
                        <td className="px-4 py-3 border-b border-neutral-20">
                          {exp.status === "completed" ? (
                            <Badge className="bg-success-10 text-success-90 rounded-full text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          ) : (
                            <Badge className="bg-critical-20 text-critical-90 rounded-full text-xs">Failed</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 border-b border-neutral-20 text-right">
                          {exp.status === "completed" ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-info-70 hover:text-info-90 h-8"
                              onClick={() => toast.success("Download started", { description: `${exp.entity}_${exp.date.replace(/[\s:]/g, "_")}.${exp.format.toLowerCase()}` })}
                            >
                              <Download className="h-3.5 w-3.5 mr-1" />
                              Download
                            </Button>
                          ) : (
                            <span className="text-xs text-neutral-50">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* ─── Scheduled Exports Tab ──────────────────────────────── */}
            <TabsContent value="scheduled">
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  className="rounded-full border-neutral-40"
                  onClick={() => setShowScheduleModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Schedule
                </Button>
              </div>

              <div className="border border-neutral-20 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-5">
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Name</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Entity</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Format</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Schedule</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Last Run</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Next Run</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Status</th>
                      <th className="px-4 py-2.5 text-right text-xs font-medium text-neutral-70 border-b border-neutral-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledExports.map((sched) => (
                      <tr key={sched.id} className="hover:bg-neutral-5/50">
                        <td className="px-4 py-3 text-sm font-medium text-neutral-100 border-b border-neutral-20">{sched.name}</td>
                        <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20">{sched.entity}</td>
                        <td className="px-4 py-3 text-sm border-b border-neutral-20">
                          <div className="flex items-center gap-1.5">
                            {getFormatIcon(sched.format)}
                            <span className="text-neutral-90">{sched.format}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-neutral-50" />
                            {sched.schedule} at {sched.time}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-60 border-b border-neutral-20">{sched.lastRun}</td>
                        <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20">{sched.nextRun}</td>
                        <td className="px-4 py-3 border-b border-neutral-20">
                          <Badge className="bg-success-10 text-success-90 rounded-full text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        </td>
                        <td className="px-4 py-3 border-b border-neutral-20 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-neutral-60 hover:text-neutral-100"
                              onClick={() => toast.info("Edit schedule", { description: "Edit modal coming soon" })}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-neutral-60 hover:text-critical-60"
                              onClick={() => handleDeleteSchedule(sched.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-info-70 hover:text-info-90"
                              onClick={() => handleRunNow(sched.name)}
                            >
                              <Play className="h-3.5 w-3.5 mr-1" />
                              Run Now
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* ─── Create Schedule Modal ──────────────────────────────────── */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Create Scheduled Export</DialogTitle>
            <DialogDescription>Set up a recurring export that runs automatically.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-90">Schedule Name</Label>
              <Input
                placeholder="e.g., Daily Order Summary"
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-90">Entity</Label>
              <Select value={scheduleEntity} onValueChange={setScheduleEntity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {entities.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-90">Format</Label>
              <Select value={scheduleFormat} onValueChange={setScheduleFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-neutral-90">Frequency</Label>
                <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {scheduleFrequency === "weekly" && (
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-neutral-90">Day</Label>
                  <Select value={scheduleDay} onValueChange={setScheduleDay}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-neutral-90">Time</Label>
                <Input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-full border-neutral-40"
              onClick={() => setShowScheduleModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-neutral-100 text-white rounded-full hover:opacity-90"
              onClick={handleCreateSchedule}
            >
              Create Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
