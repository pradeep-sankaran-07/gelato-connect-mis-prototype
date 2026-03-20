"use client"

import { useNavigation } from "@/lib/navigation-context"
import {
  CalendarDays,
  Clock,
  AlertTriangle,
  FileText,
  TrendingUp,
  Package,
  ArrowRight,
  CheckCircle2,
  Truck,
  DollarSign,
  Activity,
  ShoppingCart,
  RefreshCw,
  Mail,
  CreditCard,
  AlertCircle,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

// ── Data ──────────────────────────────────────────────────────────────

const jobStatusData = [
  { name: "In Production", value: 8, color: "#007cb4" },
  { name: "Printed", value: 5, color: "#29845a" },
  { name: "Finishing", value: 3, color: "#cfa3e1" },
  { name: "Ready to Ship", value: 4, color: "#fdd877" },
  { name: "On Hold", value: 2, color: "#ef4d2f" },
]

const overdueJobs = [
  { id: "J-12", customer: "PrintCo Berlin", daysOverdue: 3, product: "A2 Poster (250gsm)" },
  { id: "J-09", customer: "Acme Corp", daysOverdue: 2, product: "DL Flyer (170gsm)" },
  { id: "J-06", customer: "Nordic Media", daysOverdue: 1, product: "Business Cards (350gsm)" },
]

const dueTodayJobs = [
  { id: "J-18", customer: "Studio Brava", step: "Finishing", priority: "High" },
  { id: "J-17", customer: "QuickPrint AG", step: "Printing", priority: "Normal" },
  { id: "J-15", customer: "Acme Corp", step: "Ready to Ship", priority: "Normal" },
  { id: "J-14", customer: "Nordic Media", step: "Quality Check", priority: "Rush" },
]

const revenueData = [
  { month: "Jan", revenue: 45000, lastYear: 38000 },
  { month: "Feb", revenue: 52000, lastYear: 42000 },
  { month: "Mar", revenue: 48000, lastYear: 45000 },
  { month: "Apr", revenue: 61000, lastYear: 50000 },
  { month: "May", revenue: 55000, lastYear: 53000 },
  { month: "Jun", revenue: 67000, lastYear: 56000 },
]

const activityFeed = [
  { id: 1, icon: "convert", text: "Order J-18 converted from estimate", entity: "J-18", screen: "order-detail" as const, time: "10 min ago" },
  { id: 2, icon: "paid", text: "Invoice INV-005 paid by Acme Corp", entity: "INV-005", screen: "invoices" as const, time: "25 min ago" },
  { id: 3, icon: "production", text: "Production completed for J-15", entity: "J-15", screen: "order-detail" as const, time: "42 min ago" },
  { id: 4, icon: "shipped", text: "Shipment dispatched for J-11", entity: "J-11", screen: "shipments" as const, time: "1 hr ago" },
  { id: 5, icon: "estimate", text: "New estimate EST-024 created", entity: "EST-024", screen: "estimates" as const, time: "1.5 hrs ago" },
  { id: 6, icon: "stock", text: "Paper 250gsm Silk below reorder point", entity: "Inventory", screen: "inventory" as const, time: "2 hrs ago" },
  { id: 7, icon: "email", text: "Proof approved by Studio Brava for J-18", entity: "J-18", screen: "order-detail" as const, time: "2.5 hrs ago" },
  { id: 8, icon: "order", text: "New order J-19 received from QuickPrint AG", entity: "J-19", screen: "order-detail" as const, time: "3 hrs ago" },
]

const lowStockItems = [
  { name: "250gsm Silk Coated", current: 120, reorder: 500, unit: "sheets", status: "critical" },
  { name: "170gsm Gloss", current: 340, reorder: 600, unit: "sheets", status: "warning" },
  { name: "Cyan Ink (HP Indigo)", current: 0.8, reorder: 2, unit: "L", status: "critical" },
  { name: "350gsm Uncoated", current: 450, reorder: 500, unit: "sheets", status: "warning" },
]

// ── Helpers ───────────────────────────────────────────────────────────

function formatCurrency(val: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(val)
}

function formatShortCurrency(val: number) {
  if (val >= 1000) return `€${(val / 1000).toFixed(0)}K`
  return `€${val}`
}

function getActivityIcon(type: string) {
  switch (type) {
    case "convert": return <RefreshCw className="h-3.5 w-3.5" />
    case "paid": return <CreditCard className="h-3.5 w-3.5" />
    case "production": return <CheckCircle2 className="h-3.5 w-3.5" />
    case "shipped": return <Truck className="h-3.5 w-3.5" />
    case "estimate": return <FileText className="h-3.5 w-3.5" />
    case "stock": return <AlertTriangle className="h-3.5 w-3.5" />
    case "email": return <Mail className="h-3.5 w-3.5" />
    case "order": return <ShoppingCart className="h-3.5 w-3.5" />
    default: return <Activity className="h-3.5 w-3.5" />
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "Rush":
      return <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-critical-10 text-critical-90">Rush</span>
    case "High":
      return <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-warning-20 text-warning-90">High</span>
    default:
      return <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-neutral-10 text-neutral-70">Normal</span>
  }
}

// ── Custom Tooltip for Revenue Chart ──────────────────────────────────

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-neutral-20 bg-white p-3 shadow-lg text-sm">
      <p className="font-medium text-neutral-100 mb-1">{label} 2025</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-neutral-70" style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────

export default function OperationsDashboard() {
  const { navigateTo } = useNavigation()

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const totalJobs = jobStatusData.reduce((s, d) => s + d.value, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100">Dashboard</h1>
          <p className="text-sm text-neutral-60 mt-1">Welcome back, Pradeep</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-60">
          <CalendarDays className="h-4 w-4" />
          {today}
        </div>
      </div>

      {/* Row 1: Active Jobs | Overdue Jobs | Due Today */}
      <div className="grid grid-cols-3 gap-4">
        {/* ── 1. Active Jobs by Status ── */}
        <div
          className="rounded-lg border border-neutral-20 bg-white p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigateTo("production-tracker")}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-neutral-100">Active Jobs by Status</h2>
            <ArrowRight className="h-4 w-4 text-neutral-40" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[140px] h-[140px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {jobStatusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold text-neutral-100">{totalJobs}</span>
                <span className="text-[11px] text-neutral-60">Jobs</span>
              </div>
            </div>
            <div className="flex-1 space-y-1.5">
              {jobStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-neutral-70">{item.name}</span>
                  </div>
                  <span className="font-medium text-neutral-100">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2. Overdue Jobs ── */}
        <div className="rounded-lg border border-neutral-20 bg-white shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between border-b border-neutral-20" style={{ borderTopColor: "#e51c00", borderTopWidth: 3 }}>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-critical-70" />
              <h2 className="text-sm font-medium text-neutral-100">Overdue Jobs</h2>
            </div>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-critical-10 text-critical-90">{overdueJobs.length}</span>
          </div>
          <div className="divide-y divide-neutral-20">
            {overdueJobs.map((job) => (
              <div
                key={job.id}
                className="px-4 py-3 hover:bg-neutral-5 cursor-pointer transition-colors"
                onClick={() => navigateTo("order-detail", { orderId: job.id })}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-neutral-100">{job.id}</span>
                  <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-critical-10 text-critical-90">
                    {job.daysOverdue}d overdue
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-60">
                  <span>{job.customer}</span>
                  <span>{job.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Due Today ── */}
        <div className="rounded-lg border border-neutral-20 bg-white shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between border-b border-neutral-20">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-info-70" />
              <h2 className="text-sm font-medium text-neutral-100">Due Today</h2>
            </div>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-info-10 text-info-90">{dueTodayJobs.length}</span>
          </div>
          <div className="divide-y divide-neutral-20">
            {dueTodayJobs.map((job) => (
              <div
                key={job.id}
                className="px-4 py-3 hover:bg-neutral-5 cursor-pointer transition-colors"
                onClick={() => navigateTo("order-detail", { orderId: job.id })}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-100">{job.id}</span>
                    <span className="text-xs text-neutral-60">{job.customer}</span>
                  </div>
                  {getPriorityBadge(job.priority)}
                </div>
                <p className="text-xs text-neutral-60">Current step: <span className="text-neutral-80">{job.step}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Outstanding Invoices | Revenue Trend (2 cols) */}
      <div className="grid grid-cols-3 gap-4">
        {/* ── 4. Outstanding Invoices ── */}
        <div
          className="rounded-lg border border-neutral-20 bg-white p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigateTo("invoices")}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-neutral-60" />
              <h2 className="text-sm font-medium text-neutral-100">Outstanding Invoices</h2>
            </div>
            <ArrowRight className="h-4 w-4 text-neutral-40" />
          </div>
          <div className="mb-4">
            <p className="text-2xl font-semibold text-neutral-100">€24,500</p>
            <p className="text-xs text-neutral-60 mt-0.5">7 invoices outstanding</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-md bg-critical-10/40">
              <div>
                <p className="text-xs font-medium text-critical-90">Overdue</p>
                <p className="text-sm font-semibold text-critical-90">€12,300</p>
              </div>
              <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-critical-10 text-critical-90">3</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-md bg-warning-20/40">
              <div>
                <p className="text-xs font-medium text-warning-90">Pending</p>
                <p className="text-sm font-semibold text-warning-90">€12,200</p>
              </div>
              <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-warning-20 text-warning-90">4</span>
            </div>
          </div>
        </div>

        {/* ── 5. Revenue Trend ── */}
        <div className="col-span-2 rounded-lg border border-neutral-20 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-neutral-60" />
              <h2 className="text-sm font-medium text-neutral-100">Revenue Trend</h2>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-60">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#542c65" }} />
                2025
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#d7bce2" }} />
                2024
              </div>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d7bce2" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d7bce2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8a8a8a" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#8a8a8a" }} axisLine={false} tickLine={false} tickFormatter={formatShortCurrency} />
                <Tooltip content={<RevenueTooltip />} />
                <Area
                  type="monotone"
                  dataKey="lastYear"
                  name="2024"
                  stroke="#d7bce2"
                  strokeWidth={2}
                  fill="none"
                  strokeDasharray="5 3"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="2025"
                  stroke="#542c65"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  dot={{ r: 3, fill: "#542c65", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#542c65", strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Activity Feed | Low Stock Alerts */}
      <div className="grid grid-cols-3 gap-4">
        {/* ── 6. Activity Feed ── */}
        <div className="rounded-lg border border-neutral-20 bg-white shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between border-b border-neutral-20">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-neutral-60" />
              <h2 className="text-sm font-medium text-neutral-100">Activity Feed</h2>
            </div>
          </div>
          <div className="divide-y divide-neutral-20 max-h-[320px] overflow-y-auto">
            {activityFeed.map((event) => (
              <div
                key={event.id}
                className="px-4 py-2.5 hover:bg-neutral-5 cursor-pointer transition-colors flex items-start gap-3"
                onClick={() => {
                  if (event.screen === "order-detail") {
                    navigateTo("order-detail", { orderId: event.entity })
                  } else {
                    navigateTo(event.screen)
                  }
                }}
              >
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-10 text-neutral-70">
                  {getActivityIcon(event.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-neutral-80 leading-relaxed">{event.text}</p>
                  <p className="text-[11px] text-neutral-50 mt-0.5">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 7. Low Stock Alerts ── */}
        <div
          className="col-span-2 rounded-lg border border-neutral-20 bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigateTo("inventory")}
        >
          <div className="px-4 pt-4 pb-2 flex items-center justify-between border-b border-neutral-20">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-warning-70" />
              <h2 className="text-sm font-medium text-neutral-100">Low Stock Alerts</h2>
            </div>
            <ArrowRight className="h-4 w-4 text-neutral-40" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-5">
                  <th className="px-4 py-2 text-left text-xs font-medium text-neutral-70">Material</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-neutral-70">Current Qty</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-neutral-70">Reorder Point</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-neutral-70">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-20">
                {lowStockItems.map((item) => (
                  <tr key={item.name} className="hover:bg-neutral-5 transition-colors">
                    <td className="px-4 py-3 text-sm text-neutral-100 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-neutral-80 text-right">
                      {item.current} {item.unit}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-60 text-right">
                      {item.reorder} {item.unit}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.status === "critical" ? (
                        <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-critical-10 text-critical-90">
                          Critical
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-warning-20 text-warning-90">
                          Low
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
