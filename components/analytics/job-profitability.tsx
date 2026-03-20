"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronDown, ChevronUp, TrendingUp, DollarSign, Percent, BarChart3, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnalyticsFilters from "./analytics-filters"

interface JobProfitabilityRow {
  id: string
  jobNumber: string
  customer: string
  product: string
  revenue: number
  materialCost: number
  laborCost: number
  outsourceCost: number
  overhead: number
  totalCost: number
  profit: number
  margin: number
}

const jobData: JobProfitabilityRow[] = [
  { id: "j1", jobNumber: "J-1001", customer: "Acme Corp", product: "A3 Brochures (5000)", revenue: 14200, materialCost: 3800, laborCost: 2100, outsourceCost: 0, overhead: 1420, totalCost: 7320, profit: 6880, margin: 48.5 },
  { id: "j2", jobNumber: "J-1002", customer: "PrintMax Ltd", product: "Business Cards (10000)", revenue: 4800, materialCost: 960, laborCost: 840, outsourceCost: 0, overhead: 480, totalCost: 2280, profit: 2520, margin: 52.5 },
  { id: "j3", jobNumber: "J-1003", customer: "Nordic Design", product: "Posters A1 (200)", revenue: 3600, materialCost: 1200, laborCost: 600, outsourceCost: 200, overhead: 360, totalCost: 2360, profit: 1240, margin: 34.4 },
  { id: "j4", jobNumber: "J-1004", customer: "Gelato Partners", product: "Catalogs 32pg (2000)", revenue: 22400, materialCost: 6720, laborCost: 4480, outsourceCost: 1500, overhead: 2240, totalCost: 14940, profit: 7460, margin: 33.3 },
  { id: "j5", jobNumber: "J-1005", customer: "BrandHouse", product: "Flyers A5 (15000)", revenue: 8400, materialCost: 2520, laborCost: 1260, outsourceCost: 0, overhead: 840, totalCost: 4620, profit: 3780, margin: 45.0 },
  { id: "j6", jobNumber: "J-1006", customer: "EcoPackaging", product: "Labels 50x30mm (50000)", revenue: 12600, materialCost: 5040, laborCost: 2520, outsourceCost: 0, overhead: 1260, totalCost: 8820, profit: 3780, margin: 30.0 },
  { id: "j7", jobNumber: "J-1007", customer: "Metro Books", product: "Hardcover Books (500)", revenue: 18500, materialCost: 6475, laborCost: 3700, outsourceCost: 2200, overhead: 1850, totalCost: 14225, profit: 4275, margin: 23.1 },
  { id: "j8", jobNumber: "J-1008", customer: "Metro Books", product: "Softcover Books (1000)", revenue: 15200, materialCost: 4560, laborCost: 3040, outsourceCost: 1200, overhead: 1520, totalCost: 10320, profit: 4880, margin: 32.1 },
  { id: "j9", jobNumber: "J-1009", customer: "SignWorld", product: "Vinyl Banners (50)", revenue: 7800, materialCost: 2340, laborCost: 1560, outsourceCost: 0, overhead: 780, totalCost: 4680, profit: 3120, margin: 40.0 },
  { id: "j10", jobNumber: "J-1010", customer: "EventPro", product: "Roll-up Displays (25)", revenue: 6200, materialCost: 2480, laborCost: 1240, outsourceCost: 500, overhead: 620, totalCost: 4840, profit: 1360, margin: 21.9 },
  { id: "j11", jobNumber: "J-1011", customer: "Acme Corp", product: "Letterheads (5000)", revenue: 5400, materialCost: 1080, laborCost: 810, outsourceCost: 0, overhead: 540, totalCost: 2430, profit: 2970, margin: 55.0 },
  { id: "j12", jobNumber: "J-1012", customer: "DigitalFirst", product: "Booklets A5 (3000)", revenue: 6300, materialCost: 2205, laborCost: 1260, outsourceCost: 0, overhead: 630, totalCost: 4095, profit: 2205, margin: 35.0 },
]

const totalRevenue = jobData.reduce((s, j) => s + j.revenue, 0)
const totalCost = jobData.reduce((s, j) => s + j.totalCost, 0)
const totalProfit = totalRevenue - totalCost
const avgMargin = jobData.reduce((s, j) => s + j.margin, 0) / jobData.length

const formatCurrency = (value: number) => `\u20AC${value.toLocaleString("en-IE")}`

type SortField = "jobNumber" | "customer" | "revenue" | "totalCost" | "profit" | "margin"
type SortDir = "asc" | "desc"

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

interface JobProfitabilityProps {
  onBack?: () => void
}

export default function JobProfitability({ onBack }: JobProfitabilityProps) {
  const [sortField, setSortField] = useState<SortField>("revenue")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("desc")
    }
  }

  const sorted = [...jobData].sort((a, b) => {
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
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-1.5 rounded-md hover:bg-neutral-5 text-neutral-50 hover:text-neutral-90 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <div>
            <h2 className="text-lg font-semibold text-neutral-100">Job Profitability Analysis</h2>
            <p className="text-xs text-neutral-50 mt-0.5">Revenue, cost breakdown, and margin analysis per job</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnalyticsFilters showEstimator />

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-3.5 w-3.5 text-info-70" />
            <span className="text-xs text-neutral-50">Total Revenue</span>
          </div>
          <div className="text-xl font-bold text-neutral-100">{formatCurrency(totalRevenue)}</div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="h-3.5 w-3.5 text-neutral-60" />
            <span className="text-xs text-neutral-50">Total Cost</span>
          </div>
          <div className="text-xl font-bold text-neutral-100">{formatCurrency(totalCost)}</div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-success-70" />
            <span className="text-xs text-neutral-50">Total Profit</span>
          </div>
          <div className="text-xl font-bold text-success-70">{formatCurrency(totalProfit)}</div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <Percent className="h-3.5 w-3.5 text-primary-70" />
            <span className="text-xs text-neutral-50">Avg Margin</span>
          </div>
          <div className="text-xl font-bold text-neutral-100">{avgMargin.toFixed(1)}%</div>
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
                <SortHeader field="revenue" label="Revenue" align="right" />
                <th className="px-3 py-2.5 border-b border-neutral-20 bg-neutral-5 text-right text-xs font-medium text-neutral-70">Material</th>
                <th className="px-3 py-2.5 border-b border-neutral-20 bg-neutral-5 text-right text-xs font-medium text-neutral-70">Labor</th>
                <th className="px-3 py-2.5 border-b border-neutral-20 bg-neutral-5 text-right text-xs font-medium text-neutral-70">Outsource</th>
                <th className="px-3 py-2.5 border-b border-neutral-20 bg-neutral-5 text-right text-xs font-medium text-neutral-70">Overhead</th>
                <SortHeader field="totalCost" label="Total Cost" align="right" />
                <SortHeader field="profit" label="Profit" align="right" />
                <SortHeader field="margin" label="Margin" align="right" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((job) => {
                const isExpanded = expandedRow === job.id
                return (
                  <>
                    <tr
                      key={job.id}
                      className="hover:bg-neutral-5/50 cursor-pointer transition-colors"
                      onClick={() => setExpandedRow(isExpanded ? null : job.id)}
                    >
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm font-semibold text-neutral-100">{job.jobNumber}</td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-80">{job.customer}</td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-70 max-w-[160px] truncate">{job.product}</td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-90 text-right font-medium">{formatCurrency(job.revenue)}</td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-60 text-right">{formatCurrency(job.materialCost)}</td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-60 text-right">{formatCurrency(job.laborCost)}</td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-60 text-right">{job.outsourceCost > 0 ? formatCurrency(job.outsourceCost) : "-"}</td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-60 text-right">{formatCurrency(job.overhead)}</td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-90 text-right font-medium">{formatCurrency(job.totalCost)}</td>
                      <td className={`px-3 py-2 border-b border-neutral-10 text-sm text-right font-semibold ${getMarginColor(job.margin)}`}>{formatCurrency(job.profit)}</td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getMarginBadge(job.margin)}`}>
                          {job.margin.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${job.id}-detail`} className="bg-neutral-5">
                        <td colSpan={11} className="px-6 py-3 border-b border-neutral-10">
                          <div className="text-xs text-neutral-70 space-y-2">
                            <p className="font-medium text-neutral-90 text-sm">Cost Breakdown — {job.jobNumber}</p>
                            <div className="grid grid-cols-5 gap-3">
                              <div>
                                <span className="text-neutral-50">Material</span>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <div className="flex-1 h-1.5 bg-neutral-20 rounded-full overflow-hidden">
                                    <div className="h-full bg-info-70 rounded-full" style={{ width: `${(job.materialCost / job.totalCost) * 100}%` }} />
                                  </div>
                                  <span className="font-medium text-neutral-80">{((job.materialCost / job.totalCost) * 100).toFixed(0)}%</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-neutral-50">Labor</span>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <div className="flex-1 h-1.5 bg-neutral-20 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-70 rounded-full" style={{ width: `${(job.laborCost / job.totalCost) * 100}%` }} />
                                  </div>
                                  <span className="font-medium text-neutral-80">{((job.laborCost / job.totalCost) * 100).toFixed(0)}%</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-neutral-50">Outsource</span>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <div className="flex-1 h-1.5 bg-neutral-20 rounded-full overflow-hidden">
                                    <div className="h-full bg-warning-70 rounded-full" style={{ width: `${(job.outsourceCost / job.totalCost) * 100}%` }} />
                                  </div>
                                  <span className="font-medium text-neutral-80">{((job.outsourceCost / job.totalCost) * 100).toFixed(0)}%</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-neutral-50">Overhead</span>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <div className="flex-1 h-1.5 bg-neutral-20 rounded-full overflow-hidden">
                                    <div className="h-full bg-neutral-50 rounded-full" style={{ width: `${(job.overhead / job.totalCost) * 100}%` }} />
                                  </div>
                                  <span className="font-medium text-neutral-80">{((job.overhead / job.totalCost) * 100).toFixed(0)}%</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-neutral-50">Profit Margin</span>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <div className="flex-1 h-1.5 bg-neutral-20 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${job.margin >= 40 ? "bg-success-70" : job.margin >= 25 ? "bg-info-70" : "bg-critical-60"}`} style={{ width: `${job.margin}%` }} />
                                  </div>
                                  <span className={`font-medium ${getMarginColor(job.margin)}`}>{job.margin.toFixed(1)}%</span>
                                </div>
                              </div>
                            </div>
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
    </div>
  )
}
