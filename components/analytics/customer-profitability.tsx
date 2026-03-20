"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts"
import { ArrowUpDown, TrendingUp, TrendingDown, AlertTriangle, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnalyticsFilters from "./analytics-filters"

interface CustomerRow {
  id: string
  name: string
  totalRevenue: number
  totalCost: number
  profit: number
  margin: number
  orderCount: number
  avgOrderValue: number
  lastOrder: string
}

const customerData: CustomerRow[] = [
  { id: "c1", name: "Gelato Partners", totalRevenue: 28600, totalCost: 18100, profit: 10500, margin: 36.7, orderCount: 8, avgOrderValue: 3575, lastOrder: "2026-03-18" },
  { id: "c2", name: "Acme Corp", totalRevenue: 24800, totalCost: 13400, profit: 11400, margin: 46.0, orderCount: 12, avgOrderValue: 2067, lastOrder: "2026-03-19" },
  { id: "c3", name: "Metro Books", totalRevenue: 22400, totalCost: 15800, profit: 6600, margin: 29.5, orderCount: 5, avgOrderValue: 4480, lastOrder: "2026-03-17" },
  { id: "c4", name: "BrandHouse", totalRevenue: 18200, totalCost: 10200, profit: 8000, margin: 44.0, orderCount: 9, avgOrderValue: 2022, lastOrder: "2026-03-19" },
  { id: "c5", name: "EcoPackaging", totalRevenue: 15600, totalCost: 10920, profit: 4680, margin: 30.0, orderCount: 6, avgOrderValue: 2600, lastOrder: "2026-03-16" },
  { id: "c6", name: "PrintMax Ltd", totalRevenue: 12400, totalCost: 5900, profit: 6500, margin: 52.4, orderCount: 15, avgOrderValue: 827, lastOrder: "2026-03-19" },
  { id: "c7", name: "SignWorld", totalRevenue: 9800, totalCost: 5880, profit: 3920, margin: 40.0, orderCount: 4, avgOrderValue: 2450, lastOrder: "2026-03-15" },
  { id: "c8", name: "Nordic Design", totalRevenue: 8400, totalCost: 5460, profit: 2940, margin: 35.0, orderCount: 7, avgOrderValue: 1200, lastOrder: "2026-03-18" },
  { id: "c9", name: "EventPro", totalRevenue: 6200, totalCost: 4840, profit: 1360, margin: 21.9, orderCount: 3, avgOrderValue: 2067, lastOrder: "2026-03-14" },
  { id: "c10", name: "DigitalFirst", totalRevenue: 4800, totalCost: 3840, profit: 960, margin: 20.0, orderCount: 2, avgOrderValue: 2400, lastOrder: "2026-03-12" },
]

const formatCurrency = (value: number) => `\u20AC${value.toLocaleString("en-IE")}`

const getMarginColor = (margin: number) => {
  if (margin >= 40) return "text-success-70"
  if (margin >= 25) return "text-neutral-80"
  return "text-critical-60"
}

const getMarginBadge = (margin: number) => {
  if (margin >= 40) return "bg-success-10 text-success-90"
  if (margin >= 25) return "bg-neutral-10 text-neutral-80"
  return "bg-critical-10 text-critical-90"
}

// Sort by profit descending for chart
const chartData = [...customerData]
  .sort((a, b) => b.profit - a.profit)
  .map((c) => ({
    name: c.name.length > 14 ? c.name.slice(0, 12) + "..." : c.name,
    fullName: c.name,
    revenue: c.totalRevenue,
    cost: c.totalCost,
    profit: c.profit,
  }))

const top3 = [...customerData].sort((a, b) => b.profit - a.profit).slice(0, 3)
const lowestMargin = [...customerData].sort((a, b) => a.margin - b.margin)[0]

type SortField = "name" | "totalRevenue" | "totalCost" | "profit" | "margin" | "orderCount" | "avgOrderValue"
type SortDir = "asc" | "desc"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload
    return (
      <div className="bg-neutral-100 text-white rounded-lg shadow-lg px-3 py-2 text-xs">
        <p className="font-medium mb-1">{data?.fullName || label}</p>
        <p>Revenue: {formatCurrency(data?.revenue || 0)}</p>
        <p>Cost: {formatCurrency(data?.cost || 0)}</p>
        <p className="text-success-50 font-medium">Profit: {formatCurrency(data?.profit || 0)}</p>
      </div>
    )
  }
  return null
}

interface CustomerProfitabilityProps {
  onBack?: () => void
}

export default function CustomerProfitability({ onBack }: CustomerProfitabilityProps) {
  const [sortField, setSortField] = useState<SortField>("totalRevenue")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("desc")
    }
  }

  const sorted = [...customerData].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }
    return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
  })

  const SortHeader = ({ field, label, align = "left" }: { field: SortField; label: string; align?: string }) => (
    <th
      className={`px-3 py-2.5 border-b border-neutral-20 bg-neutral-5 cursor-pointer hover:bg-neutral-10 transition-colors ${align === "right" ? "text-right" : "text-left"}`}
      onClick={() => handleSort(field)}
    >
      <div className={`flex items-center gap-1 text-xs font-medium text-neutral-70 ${align === "right" ? "justify-end" : ""}`}>
        {label}
        <ArrowUpDown className="h-3 w-3 text-neutral-40" />
      </div>
    </th>
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-1.5 rounded-md hover:bg-neutral-5 text-neutral-50 hover:text-neutral-90 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <div>
            <h2 className="text-lg font-semibold text-neutral-100">Customer Profitability</h2>
            <p className="text-xs text-neutral-50 mt-0.5">Revenue, cost, and margin analysis by customer</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnalyticsFilters />

      {/* Top performers & alert */}
      <div className="grid grid-cols-4 gap-3">
        {top3.map((c, i) => (
          <div key={c.id} className="border border-neutral-20 rounded-lg p-3 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                i === 0 ? "bg-success-10 text-success-90" : i === 1 ? "bg-info-10 text-info-90" : "bg-neutral-10 text-neutral-70"
              }`}>
                {i + 1}
              </div>
              <span className="text-xs text-neutral-50">Top #{i + 1} by Profit</span>
            </div>
            <div className="text-sm font-semibold text-neutral-100">{c.name}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold text-success-70">{formatCurrency(c.profit)}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${getMarginBadge(c.margin)}`}>{c.margin.toFixed(1)}%</span>
            </div>
          </div>
        ))}
        <div className="border border-warning-70 rounded-lg p-3 bg-warning-10">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-3.5 w-3.5 text-warning-70" />
            <span className="text-xs text-warning-90 font-medium">Lowest Margin</span>
          </div>
          <div className="text-sm font-semibold text-neutral-100">{lowestMargin.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-critical-60">{lowestMargin.margin.toFixed(1)}%</span>
            <span className="text-xs text-warning-90">margin on {formatCurrency(lowestMargin.totalRevenue)} revenue</span>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="border border-neutral-20 rounded-lg p-4 bg-white">
        <h4 className="text-sm font-semibold text-neutral-100 mb-3">Revenue vs Cost by Customer</h4>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#8a8a8a" }} axisLine={{ stroke: "#e6e6e6" }} tickLine={false} tickFormatter={(v) => `\u20AC${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#383838" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="square"
                iconSize={10}
                wrapperStyle={{ fontSize: 11, color: "#6b6b6b" }}
              />
              <Bar dataKey="revenue" fill="#007cb4" name="Revenue" radius={[0, 4, 4, 0]} barSize={12} />
              <Bar dataKey="cost" fill="#bdbdbd" name="Cost" radius={[0, 4, 4, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="border border-neutral-20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <SortHeader field="name" label="Customer" />
                <SortHeader field="totalRevenue" label="Total Revenue" align="right" />
                <SortHeader field="totalCost" label="Total Cost" align="right" />
                <SortHeader field="profit" label="Profit" align="right" />
                <SortHeader field="margin" label="Margin" align="right" />
                <SortHeader field="orderCount" label="Orders" align="right" />
                <SortHeader field="avgOrderValue" label="Avg Order" align="right" />
                <th className="px-3 py-2.5 border-b border-neutral-20 bg-neutral-5 text-left text-xs font-medium text-neutral-70">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((customer) => (
                <tr key={customer.id} className="hover:bg-neutral-5/50 transition-colors">
                  <td className="px-3 py-2.5 border-b border-neutral-10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-neutral-10 flex items-center justify-center text-[10px] font-bold text-neutral-70">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-neutral-100">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 border-b border-neutral-10 text-sm text-neutral-90 text-right font-medium">{formatCurrency(customer.totalRevenue)}</td>
                  <td className="px-3 py-2.5 border-b border-neutral-10 text-sm text-neutral-60 text-right">{formatCurrency(customer.totalCost)}</td>
                  <td className={`px-3 py-2.5 border-b border-neutral-10 text-sm text-right font-semibold ${getMarginColor(customer.margin)}`}>{formatCurrency(customer.profit)}</td>
                  <td className="px-3 py-2.5 border-b border-neutral-10 text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getMarginBadge(customer.margin)}`}>
                      {customer.margin.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-3 py-2.5 border-b border-neutral-10 text-sm text-neutral-80 text-right">{customer.orderCount}</td>
                  <td className="px-3 py-2.5 border-b border-neutral-10 text-sm text-neutral-70 text-right">{formatCurrency(customer.avgOrderValue)}</td>
                  <td className="px-3 py-2.5 border-b border-neutral-10 text-sm text-neutral-60">{customer.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
