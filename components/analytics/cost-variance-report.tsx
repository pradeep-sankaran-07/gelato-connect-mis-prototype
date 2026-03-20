"use client"

import { useState } from "react"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ZAxis,
} from "recharts"
import { ArrowUpDown, AlertTriangle, TrendingDown, TrendingUp, Target, ArrowLeft } from "lucide-react"
import AnalyticsFilters from "./analytics-filters"

interface VarianceRow {
  id: string
  jobNumber: string
  customer: string
  product: string
  estimated: number
  actual: number
  varianceAmount: number
  variancePercent: number
  reason: string
}

const varianceData: VarianceRow[] = [
  { id: "v1", jobNumber: "J-0985", customer: "Acme Corp", product: "A3 Brochures (8000)", estimated: 8200, actual: 8600, varianceAmount: 400, variancePercent: 4.9, reason: "Extra press run due to color correction" },
  { id: "v2", jobNumber: "J-0986", customer: "PrintMax Ltd", product: "Business Cards (20000)", estimated: 3800, actual: 3650, varianceAmount: -150, variancePercent: -3.9, reason: "Efficient gang run with other cards job" },
  { id: "v3", jobNumber: "J-0987", customer: "Nordic Design", product: "Art Prints A2 (500)", estimated: 4500, actual: 5100, varianceAmount: 600, variancePercent: 13.3, reason: "Premium paper stock price increase" },
  { id: "v4", jobNumber: "J-0988", customer: "Gelato Partners", product: "Catalogs 48pg (1500)", estimated: 18000, actual: 18900, varianceAmount: 900, variancePercent: 5.0, reason: "Binding complications, extra labor" },
  { id: "v5", jobNumber: "J-0989", customer: "BrandHouse", product: "Flyers DL (25000)", estimated: 5200, actual: 4800, varianceAmount: -400, variancePercent: -7.7, reason: "Under budget — bulk paper discount" },
  { id: "v6", jobNumber: "J-0990", customer: "EcoPackaging", product: "Labels 70x40mm (100000)", estimated: 9800, actual: 10200, varianceAmount: 400, variancePercent: 4.1, reason: "Die-cutting setup took longer" },
  { id: "v7", jobNumber: "J-0991", customer: "Metro Books", product: "Hardcover (300)", estimated: 12000, actual: 13200, varianceAmount: 1200, variancePercent: 10.0, reason: "Cover embossing rework" },
  { id: "v8", jobNumber: "J-0992", customer: "SignWorld", product: "Mesh Banners (30)", estimated: 3200, actual: 3400, varianceAmount: 200, variancePercent: 6.3, reason: "Material waste on oversized cuts" },
  { id: "v9", jobNumber: "J-0993", customer: "EventPro", product: "Pop-up Stands (15)", estimated: 4800, actual: 5200, varianceAmount: 400, variancePercent: 8.3, reason: "Rush setup fee from supplier" },
  { id: "v10", jobNumber: "J-0994", customer: "DigitalFirst", product: "Booklets A5 (5000)", estimated: 6400, actual: 6200, varianceAmount: -200, variancePercent: -3.1, reason: "Faster press run than estimated" },
  { id: "v11", jobNumber: "J-0995", customer: "Acme Corp", product: "Letterheads (10000)", estimated: 2800, actual: 2750, varianceAmount: -50, variancePercent: -1.8, reason: "Slightly under — standard job" },
  { id: "v12", jobNumber: "J-0996", customer: "PrintMax Ltd", product: "NCR Pads (2000)", estimated: 5600, actual: 6100, varianceAmount: 500, variancePercent: 8.9, reason: "Carbonless paper alignment issues" },
  { id: "v13", jobNumber: "J-0997", customer: "Gelato Partners", product: "Posters B1 (100)", estimated: 2400, actual: 2500, varianceAmount: 100, variancePercent: 4.2, reason: "Proofing iteration added cost" },
  { id: "v14", jobNumber: "J-0998", customer: "BrandHouse", product: "Stickers (50000)", estimated: 7200, actual: 7000, varianceAmount: -200, variancePercent: -2.8, reason: "Good run, minimal waste" },
  { id: "v15", jobNumber: "J-0999", customer: "Metro Books", product: "Softcover (800)", estimated: 9600, actual: 10100, varianceAmount: 500, variancePercent: 5.2, reason: "Additional spine reinforcement" },
]

const formatCurrency = (value: number) => `\u20AC${Math.abs(value).toLocaleString("en-IE")}`

const overBudgetJobs = varianceData.filter((v) => v.varianceAmount > 0)
const avgVariance = varianceData.reduce((s, v) => s + v.variancePercent, 0) / varianceData.length
const largestOverrun = varianceData.reduce((max, v) => (v.varianceAmount > max.varianceAmount ? v : max), varianceData[0])

const scatterData = varianceData.map((v) => ({
  x: v.estimated,
  y: v.actual,
  jobNumber: v.jobNumber,
  customer: v.customer,
  variance: v.varianceAmount,
}))

// Reference line: y = x (perfect estimate)
const maxVal = Math.max(...varianceData.map((v) => Math.max(v.estimated, v.actual))) + 2000
const minVal = Math.min(...varianceData.map((v) => Math.min(v.estimated, v.actual))) - 1000

const CustomScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-neutral-100 text-white rounded-lg shadow-lg px-3 py-2 text-xs">
        <p className="font-medium">{data.jobNumber} — {data.customer}</p>
        <p className="mt-1">Estimated: {formatCurrency(data.x)}</p>
        <p>Actual: {formatCurrency(data.y)}</p>
        <p className={data.variance > 0 ? "text-critical-50" : "text-success-50"}>
          Variance: {data.variance > 0 ? "+" : "-"}{formatCurrency(data.variance)}
        </p>
      </div>
    )
  }
  return null
}

type SortField = "jobNumber" | "customer" | "estimated" | "actual" | "varianceAmount" | "variancePercent"
type SortDir = "asc" | "desc"

interface CostVarianceReportProps {
  onBack?: () => void
}

export default function CostVarianceReport({ onBack }: CostVarianceReportProps) {
  const [sortField, setSortField] = useState<SortField>("variancePercent")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("desc")
    }
  }

  const sorted = [...varianceData].sort((a, b) => {
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
            <h2 className="text-lg font-semibold text-neutral-100">Cost Variance Report</h2>
            <p className="text-xs text-neutral-50 mt-0.5">Estimated vs actual cost analysis across jobs</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnalyticsFilters showEstimator />

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-3.5 w-3.5 text-info-70" />
            <span className="text-xs text-neutral-50">Avg Variance</span>
          </div>
          <div className={`text-xl font-bold ${avgVariance > 0 ? "text-warning-70" : "text-success-70"}`}>
            +{avgVariance.toFixed(1)}%
          </div>
          <p className="text-[11px] text-neutral-50 mt-0.5">across {varianceData.length} jobs</p>
        </div>
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-critical-60" />
            <span className="text-xs text-neutral-50">Jobs Over Budget</span>
          </div>
          <div className="text-xl font-bold text-neutral-100">
            {overBudgetJobs.length}<span className="text-sm font-normal text-neutral-50">/{varianceData.length}</span>
          </div>
          <p className="text-[11px] text-neutral-50 mt-0.5">{((overBudgetJobs.length / varianceData.length) * 100).toFixed(0)}% of jobs</p>
        </div>
        <div className="border border-critical-60 rounded-lg p-3 bg-critical-5">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-3.5 w-3.5 text-critical-70" />
            <span className="text-xs text-critical-90">Largest Overrun</span>
          </div>
          <div className="text-xl font-bold text-critical-70">{formatCurrency(largestOverrun.varianceAmount)}</div>
          <p className="text-[11px] text-critical-90 mt-0.5">{largestOverrun.jobNumber} — {largestOverrun.customer}</p>
        </div>
      </div>

      {/* Scatter plot */}
      <div className="border border-neutral-20 rounded-lg p-4 bg-white">
        <h4 className="text-sm font-semibold text-neutral-100 mb-1">Estimated vs Actual Cost</h4>
        <p className="text-xs text-neutral-50 mb-3">Points above the reference line represent cost overruns</p>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
              <XAxis
                type="number"
                dataKey="x"
                name="Estimated"
                domain={[minVal, maxVal]}
                tick={{ fontSize: 11, fill: "#8a8a8a" }}
                axisLine={{ stroke: "#e6e6e6" }}
                tickLine={false}
                tickFormatter={(v) => `\u20AC${(v / 1000).toFixed(0)}k`}
                label={{ value: "Estimated Cost", position: "insideBottom", offset: -5, fontSize: 11, fill: "#6b6b6b" }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Actual"
                domain={[minVal, maxVal]}
                tick={{ fontSize: 11, fill: "#8a8a8a" }}
                axisLine={{ stroke: "#e6e6e6" }}
                tickLine={false}
                tickFormatter={(v) => `\u20AC${(v / 1000).toFixed(0)}k`}
                label={{ value: "Actual Cost", angle: -90, position: "insideLeft", offset: 10, fontSize: 11, fill: "#6b6b6b" }}
              />
              <ZAxis range={[50, 50]} />
              <Tooltip content={<CustomScatterTooltip />} />
              {/* 45-degree reference line: y = x */}
              <ReferenceLine
                segment={[
                  { x: minVal, y: minVal },
                  { x: maxVal, y: maxVal },
                ]}
                stroke="#bdbdbd"
                strokeDasharray="6 3"
                strokeWidth={1.5}
              />
              <Scatter data={scatterData} fill="#007cb4">
                {scatterData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.variance > 0 ? "#e51c00" : "#29845a"}
                    stroke={entry.variance > 0 ? "#8e1f0b" : "#0c5132"}
                    strokeWidth={1}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-neutral-50 justify-center">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "#e51c00" }} /> Over budget</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "#29845a" }} /> Under budget</span>
          <span className="flex items-center gap-1"><span className="w-6 border-t border-dashed border-neutral-40 inline-block" /> Perfect estimate</span>
        </div>
      </div>

      {/* Table */}
      <div className="border border-neutral-20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <SortHeader field="jobNumber" label="Job #" />
                <SortHeader field="customer" label="Customer" />
                <th className="px-3 py-2.5 border-b border-neutral-20 bg-neutral-5 text-left text-xs font-medium text-neutral-70">Product</th>
                <SortHeader field="estimated" label="Estimated" align="right" />
                <SortHeader field="actual" label="Actual" align="right" />
                <SortHeader field="varianceAmount" label="Variance" align="right" />
                <SortHeader field="variancePercent" label="Var %" align="right" />
                <th className="px-3 py-2.5 border-b border-neutral-20 bg-neutral-5 text-left text-xs font-medium text-neutral-70">Reason</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => {
                const isOverrun = row.varianceAmount > 0
                return (
                  <tr key={row.id} className="hover:bg-neutral-5/50 transition-colors">
                    <td className="px-3 py-2 border-b border-neutral-10 text-sm font-semibold text-neutral-100">{row.jobNumber}</td>
                    <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-80">{row.customer}</td>
                    <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-70 max-w-[150px] truncate">{row.product}</td>
                    <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-70 text-right">{formatCurrency(row.estimated)}</td>
                    <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-90 text-right font-medium">{formatCurrency(row.actual)}</td>
                    <td className={`px-3 py-2 border-b border-neutral-10 text-sm text-right font-semibold ${isOverrun ? "text-critical-60" : "text-success-70"}`}>
                      {isOverrun ? "+" : "-"}{formatCurrency(row.varianceAmount)}
                    </td>
                    <td className="px-3 py-2 border-b border-neutral-10 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        isOverrun ? "bg-critical-10 text-critical-90" : "bg-success-10 text-success-90"
                      }`}>
                        {isOverrun ? "+" : ""}{row.variancePercent.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-3 py-2 border-b border-neutral-10 text-xs text-neutral-60 max-w-[200px] truncate">{row.reason}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
