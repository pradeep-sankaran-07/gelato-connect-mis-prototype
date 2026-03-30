"use client"

import { useState } from "react"
import {
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  ChevronRight,
  FileText,
  ShoppingBag,
  FileIcon as FileInvoice,
  Settings,
  ExternalLink,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  TrendingUp,
  DollarSign,
  Percent,
  Clock,
  Users,
  Star,
  Receipt,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigation } from "@/lib/navigation-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

// Sub-components
import dynamic from "next/dynamic"
import JobProfitability from "@/components/analytics/job-profitability"
import CustomerProfitability from "@/components/analytics/customer-profitability"
const CostVarianceReport = dynamic(() => import("@/components/analytics/cost-variance-report"), { ssr: false })
import AnalyticsFilters from "@/components/analytics/analytics-filters"

// --- Mock data ---

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 45000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 51000 },
  { month: "May", revenue: 53000 },
  { month: "Jun", revenue: 56000 },
  { month: "Jul", revenue: 58000 },
  { month: "Aug", revenue: 61000 },
  { month: "Sep", revenue: 64000 },
  { month: "Oct", revenue: 67000 },
  { month: "Nov", revenue: 70000 },
  { month: "Dec", revenue: 73000 },
]

// Revenue trend line chart data (monthly with trend)
const revenueTrendData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 45000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 51000 },
  { month: "May", revenue: 53000 },
  { month: "Jun", revenue: 56000 },
  { month: "Jul", revenue: 58000 },
  { month: "Aug", revenue: 61000 },
  { month: "Sep", revenue: 64000 },
  { month: "Oct", revenue: 67000 },
  { month: "Nov", revenue: 70000 },
  { month: "Dec", revenue: 73000 },
]

// Top 5 customers by revenue
const top5Customers = [
  { rank: 1, name: "Gelato Partners", revenue: 28600, orders: 8, margin: 36.7 },
  { rank: 2, name: "Acme Corp", revenue: 24800, orders: 12, margin: 46.0 },
  { rank: 3, name: "Metro Books", revenue: 22400, orders: 5, margin: 29.5 },
  { rank: 4, name: "BrandHouse", revenue: 18200, orders: 9, margin: 44.0 },
  { rank: 5, name: "EcoPackaging", revenue: 15600, orders: 6, margin: 30.0 },
]

// Revenue tab: monthly/quarterly revenue with YoY
const monthlyRevenueYoY = [
  { month: "Jan", current: 42000, previous: 36000 },
  { month: "Feb", current: 45000, previous: 38000 },
  { month: "Mar", current: 48000, previous: 41000 },
  { month: "Apr", current: 51000, previous: 43000 },
  { month: "May", current: 53000, previous: 45000 },
  { month: "Jun", current: 56000, previous: 48000 },
  { month: "Jul", current: 58000, previous: 50000 },
  { month: "Aug", current: 61000, previous: 52000 },
  { month: "Sep", current: 64000, previous: 55000 },
  { month: "Oct", current: 67000, previous: 57000 },
  { month: "Nov", current: 70000, previous: 60000 },
  { month: "Dec", current: 73000, previous: 62000 },
]

// Revenue by product category for donut chart
const revenueByCategory = [
  { name: "Business Cards", value: 18400, color: "#007cb4" },
  { name: "Brochures", value: 16200, color: "#29845a" },
  { name: "Catalogs", value: 14800, color: "#9c77ac" },
  { name: "Books", value: 12600, color: "#cba543" },
  { name: "Flyers", value: 8400, color: "#c5548a" },
  { name: "Labels", value: 6800, color: "#ef4d2f" },
  { name: "Banners", value: 5200, color: "#6b6b6b" },
  { name: "Other", value: 4100, color: "#bdbdbd" },
]

const conversionData = {
  estimates: 120000,
  orders: 75000,
}

const erpSystems = [
  { name: "QuickBooks", logo: "QB", color: "bg-info-70" },
  { name: "Zoho Books", logo: "ZB", color: "bg-critical-60" },
  { name: "Microsoft Dynamics 365", logo: "MD", color: "bg-primary-70" },
  { name: "Sage", logo: "SG", color: "bg-success-70" },
  { name: "Xero", logo: "XR", color: "bg-info-90" },
  { name: "Oracle NetSuite", logo: "NS", color: "bg-warning-70" },
]

const formatCurrency = (value: number) => `$${value.toLocaleString()}`

// Tab types
type AnalyticsTab = "overview" | "job-profitability" | "customer-analysis" | "cost-variance" | "revenue"

const tabs: { id: AnalyticsTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "job-profitability", label: "Job Profitability" },
  { id: "customer-analysis", label: "Customer Analysis" },
  { id: "cost-variance", label: "Cost Variance" },
  { id: "revenue", label: "Revenue" },
]

// Custom tooltip for charts
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-100 text-white rounded-lg shadow-lg px-3 py-2 text-xs">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color === "#212121" ? "#ffffff" : entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const DonutTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    const total = revenueByCategory.reduce((s, c) => s + c.value, 0)
    return (
      <div className="bg-neutral-100 text-white rounded-lg shadow-lg px-3 py-2 text-xs">
        <p className="font-medium">{data.name}</p>
        <p>{formatCurrency(data.value)}</p>
        <p className="text-neutral-40">{((data.value / total) * 100).toFixed(1)}% of total</p>
      </div>
    )
  }
  return null
}

export default function Performance() {
  const { navigateTo } = useNavigation()
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("overview")
  const [showSettings, setShowSettings] = useState(false)
  const [showExportToast, setShowExportToast] = useState(false)

  const conversionRate = ((conversionData.orders / conversionData.estimates) * 100).toFixed(1)

  const handleExport = (tab: string) => {
    setShowExportToast(true)
    setTimeout(() => setShowExportToast(false), 3000)
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-100">Analytics & Performance</h1>
            <p className="text-sm text-neutral-50 mt-1">Comprehensive business analytics and profitability insights</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="ml-2">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Performance Dashboard Settings</DialogTitle>
                  <DialogDescription>Configure your dashboard settings and integrations</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <h3 className="text-lg font-medium mb-4">ERP Integration</h3>
                  <p className="text-sm text-neutral-50 mb-4">
                    Connect your Print MIS with your accounting system to sync financial data
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {erpSystems.map((erp, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 flex flex-col items-center hover:border-info-70 cursor-pointer transition-colors"
                      >
                        <div
                          className={`${erp.color} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2`}
                        >
                          {erp.logo}
                        </div>
                        <span className="text-sm font-medium">{erp.name}</span>
                        <Button variant="ghost" size="sm" className="mt-2 text-xs">
                          Connect <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Dashboard Preferences</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Default Date Range</label>
                        <Select defaultValue="last30">
                          <SelectTrigger>
                            <SelectValue placeholder="Select default date range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="last30">Last 30 Days</SelectItem>
                            <SelectItem value="mtd">Month to Date</SelectItem>
                            <SelectItem value="ytd">Year to Date</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Refresh Interval</label>
                        <Select defaultValue="15">
                          <SelectTrigger>
                            <SelectValue placeholder="Select refresh interval" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">Every 5 minutes</SelectItem>
                            <SelectItem value="15">Every 15 minutes</SelectItem>
                            <SelectItem value="30">Every 30 minutes</SelectItem>
                            <SelectItem value="60">Every hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Shared Filters */}
        <div className="mb-5">
          <AnalyticsFilters
            onExport={() => handleExport(activeTab)}
          />
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-neutral-20 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 text-sm transition-colors ${
                activeTab === tab.id
                  ? "text-neutral-100 font-semibold"
                  : "text-neutral-50 hover:text-neutral-80"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-black rounded-t-sm" />
              )}
            </button>
          ))}

          {/* Export Report button — right-aligned */}
          <div className="ml-auto flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs rounded-full border-neutral-40 text-neutral-70 px-3"
              onClick={() => handleExport(activeTab)}
            >
              <Download className="h-3 w-3 mr-1.5" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab navigateTo={navigateTo} conversionRate={conversionRate} />}
        {activeTab === "job-profitability" && <JobProfitability />}
        {activeTab === "customer-analysis" && <CustomerProfitability />}
        {activeTab === "cost-variance" && <CostVarianceReport />}
        {activeTab === "revenue" && <RevenueTab />}
      </div>

      {/* Export toast notification */}
      {showExportToast && (
        <div className="fixed bottom-6 right-6 z-[30000] bg-neutral-100 text-white rounded-lg shadow-xl px-4 py-3 flex items-center gap-3 text-sm animate-in slide-in-from-bottom-2">
          <Download className="h-4 w-4 text-success-50" />
          <span>Report export started. You will receive a download link shortly.</span>
        </div>
      )}
    </div>
  )
}

// ============================================================
// Overview Tab
// ============================================================
function OverviewTab({
  navigateTo,
  conversionRate,
}: {
  navigateTo: (screen: any, params?: Record<string, string>) => void
  conversionRate: string
}) {
  const maxRevenue = Math.max(...revenueData.map((item) => item.revenue))

  return (
    <div className="space-y-6">
      {/* KPI Tiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-info-10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-info-70" />
              </div>
            </div>
            <p className="text-xs font-medium text-neutral-50">Total Revenue</p>
            <h3 className="text-xl font-bold mt-0.5">$73,250</h3>
            <div className="flex items-center text-success-70 text-xs font-medium mt-1">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              <span>12.5% vs prev</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-success-10 flex items-center justify-center">
                <Percent className="h-4 w-4 text-success-70" />
              </div>
            </div>
            <p className="text-xs font-medium text-neutral-50">Avg Job Margin</p>
            <h3 className="text-xl font-bold mt-0.5">37.2%</h3>
            <div className="flex items-center text-success-70 text-xs font-medium mt-1">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              <span>2.1pp vs prev</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary-5 flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary-70" />
              </div>
            </div>
            <p className="text-xs font-medium text-neutral-50">On-Time Delivery</p>
            <h3 className="text-xl font-bold mt-0.5">94.2%</h3>
            <div className="flex items-center text-success-70 text-xs font-medium mt-1">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              <span>1.8% vs prev</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-caution-10 flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-caution-70" />
              </div>
            </div>
            <p className="text-xs font-medium text-neutral-50">Active Jobs</p>
            <h3 className="text-xl font-bold mt-0.5">42</h3>
            <div className="flex items-center text-success-70 text-xs font-medium mt-1">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              <span>8.2% vs prev</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-warning-10 flex items-center justify-center">
                <Receipt className="h-4 w-4 text-warning-70" />
              </div>
            </div>
            <p className="text-xs font-medium text-neutral-50">Outstanding Invoices</p>
            <h3 className="text-xl font-bold mt-0.5">$22,750</h3>
            <div className="flex items-center text-critical-60 text-xs font-medium mt-1">
              <ArrowDownRight className="h-3 w-3 mr-0.5" />
              <span>$12,300 overdue</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary-5 flex items-center justify-center">
                <Star className="h-4 w-4 text-primary-50" />
              </div>
            </div>
            <p className="text-xs font-medium text-neutral-50">Customer Satisfaction</p>
            <h3 className="text-xl font-bold mt-0.5">4.7/5</h3>
            <div className="flex items-center text-success-70 text-xs font-medium mt-1">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              <span>0.2 vs prev</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend Line Chart + Top 5 Customers Table */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Revenue Trend — spans 3 cols */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue for the past 12 months</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>View Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View by Product Category</DropdownMenuItem>
                  <DropdownMenuItem>View by Customer Segment</DropdownMenuItem>
                  <DropdownMenuItem>Compare with Previous Year</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={revenueTrendData} margin={{ left: 10, right: 20, top: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#8a8a8a" }}
                    axisLine={{ stroke: "#e6e6e6" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#8a8a8a" }}
                    axisLine={{ stroke: "#e6e6e6" }}
                    tickLine={false}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#007cb4"
                    strokeWidth={2.5}
                    dot={{ fill: "#007cb4", r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#007cb4", stroke: "#ffffff", strokeWidth: 2 }}
                    name="Revenue"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top 5 Customers — spans 2 cols */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>By revenue this period</CardDescription>
              </div>
              <Users className="h-4 w-4 text-neutral-40" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="border border-neutral-20 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-3 py-2 border-b border-neutral-20 bg-neutral-5 text-left text-xs font-medium text-neutral-70">#</th>
                    <th className="px-3 py-2 border-b border-neutral-20 bg-neutral-5 text-left text-xs font-medium text-neutral-70">Customer</th>
                    <th className="px-3 py-2 border-b border-neutral-20 bg-neutral-5 text-right text-xs font-medium text-neutral-70">Revenue</th>
                    <th className="px-3 py-2 border-b border-neutral-20 bg-neutral-5 text-right text-xs font-medium text-neutral-70">Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {top5Customers.map((customer) => (
                    <tr key={customer.rank} className="hover:bg-neutral-5/50 transition-colors">
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-50 font-medium">{customer.rank}</td>
                      <td className="px-3 py-2 border-b border-neutral-10">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-neutral-10 flex items-center justify-center text-[10px] font-bold text-neutral-70">
                            {customer.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-neutral-100">{customer.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-90 text-right font-medium">
                        {formatCurrency(customer.revenue)}
                      </td>
                      <td className="px-3 py-2 border-b border-neutral-10 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          customer.margin >= 40 ? "bg-success-10 text-success-90" :
                          customer.margin >= 25 ? "bg-neutral-10 text-neutral-80" :
                          "bg-critical-10 text-critical-90"
                        }`}>
                          {customer.margin.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Sections (preserved from original) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-info-70 mr-2" />
                <CardTitle className="text-lg">Estimates Summary</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Drill Down Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View Detailed Report</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                  <DropdownMenuItem>Analyze by Product</DropdownMenuItem>
                  <DropdownMenuItem>Analyze by Customer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-50">Total Estimates</span>
                <span className="text-sm font-medium">215</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-50">Total Value</span>
                <span className="text-sm font-medium">$120,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-50">Avg. Estimate Value</span>
                <span className="text-sm font-medium">$558</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4 text-info-70">
              View All Estimates
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 text-success-70 mr-2" />
                <CardTitle className="text-lg">Orders Summary</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <PieChart className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Drill Down Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View Detailed Report</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                  <DropdownMenuItem>Analyze by Product</DropdownMenuItem>
                  <DropdownMenuItem>Analyze by Customer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-50">Total Orders</span>
                <span className="text-sm font-medium">128</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-50">Total Value</span>
                <span className="text-sm font-medium">$73,250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-50">Top Product</span>
                <span className="text-sm font-medium">Business Cards</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4 text-info-70">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileInvoice className="h-5 w-5 text-primary-50 mr-2" />
                <CardTitle className="text-lg">Invoices Summary</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <LineChart className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Drill Down Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View Detailed Report</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                  <DropdownMenuItem>Analyze Aging</DropdownMenuItem>
                  <DropdownMenuItem>Analyze by Customer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-50">Total Invoiced</span>
                <span className="text-sm font-medium">$68,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-50">Outstanding</span>
                <span className="text-sm font-medium">$22,750</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-50">Overdue</span>
                <span className="text-sm font-medium text-critical-60">$12,300</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4 text-info-70">
              View All Invoices
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Estimate to Order Conversion */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Estimate to Order Conversion</CardTitle>
              <CardDescription>Value of estimates vs. orders</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[120px] w-full flex items-center justify-center">
            <div className="w-full max-w-lg">
              <div className="flex items-center mb-4">
                <div className="w-full h-7 bg-info-20 rounded-sm">
                  <div
                    className="h-full bg-info-70 rounded-sm flex items-center justify-end px-2 text-white text-sm font-medium"
                    style={{ width: "100%" }}
                  >
                    ${(conversionData.estimates / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="ml-3 min-w-[80px]">
                  <p className="text-sm font-medium">Estimates</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full h-7 bg-success-20 rounded-sm">
                  <div
                    className="h-full bg-success-70 rounded-sm flex items-center justify-end px-2 text-white text-sm font-medium"
                    style={{ width: `${(conversionData.orders / conversionData.estimates) * 100}%` }}
                  >
                    ${(conversionData.orders / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="ml-3 min-w-[80px]">
                  <p className="text-sm font-medium">Orders</p>
                </div>
              </div>
              <p className="text-sm text-neutral-50 mt-3 text-center">
                Conversion Rate: <span className="font-medium">{conversionRate}%</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggested Actions */}
      <Card className="border-l-4 border-l-caution-50">
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 text-caution-70 mr-2" />
            <CardTitle>Suggested Actions</CardTitle>
          </div>
          <CardDescription>AI-powered insights to help improve your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-caution-10 rounded-md">
              <div className="flex items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Low estimate conversion rate for &apos;Brochures&apos; this month</h4>
                  <p className="text-sm text-neutral-60 mt-1">
                    Consider reviewing pricing rules or following up with customers Acme Corp, Beta Solutions, and
                    Gamma Industries.
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-info-70">
                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            <div className="p-3 bg-caution-10 rounded-md">
              <div className="flex items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Invoice payments are averaging 15 days overdue</h4>
                  <p className="text-sm text-neutral-60 mt-1">
                    Suggest sending automated reminders for invoices older than 7 days.
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-info-70">
                  Take Action <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            <div className="p-3 bg-caution-10 rounded-md">
              <div className="flex items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Sales of &apos;Business Cards&apos; have increased by 20% WoW</h4>
                  <p className="text-sm text-neutral-60 mt-1">
                    Explore promoting related products like letterheads and envelopes to these customers.
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-info-70">
                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// Revenue Tab
// ============================================================
function RevenueTab() {
  const [revenueView, setRevenueView] = useState<"monthly" | "quarterly">("monthly")

  const totalCategoryRevenue = revenueByCategory.reduce((s, c) => s + c.value, 0)

  // Generate quarterly data from monthly
  const quarterlyRevenueYoY = [
    { month: "Q1", current: 135000, previous: 115000 },
    { month: "Q2", current: 160000, previous: 136000 },
    { month: "Q3", current: 183000, previous: 157000 },
    { month: "Q4", current: 210000, previous: 179000 },
  ]

  const chartData = revenueView === "monthly" ? monthlyRevenueYoY : quarterlyRevenueYoY

  // YoY growth calculations
  const totalCurrentYear = monthlyRevenueYoY.reduce((s, m) => s + m.current, 0)
  const totalPreviousYear = monthlyRevenueYoY.reduce((s, m) => s + m.previous, 0)
  const yoyGrowth = ((totalCurrentYear - totalPreviousYear) / totalPreviousYear * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Revenue Summary KPIs */}
      <div className="grid grid-cols-4 gap-3">
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-3.5 w-3.5 text-info-70" />
            <span className="text-xs text-neutral-50">Total Revenue (YTD)</span>
          </div>
          <div className="text-xl font-bold text-neutral-100">{formatCurrency(totalCurrentYear)}</div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-success-70" />
            <span className="text-xs text-neutral-50">YoY Growth</span>
          </div>
          <div className="text-xl font-bold text-success-70">+{yoyGrowth}%</div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="h-3.5 w-3.5 text-primary-70" />
            <span className="text-xs text-neutral-50">Avg Monthly Revenue</span>
          </div>
          <div className="text-xl font-bold text-neutral-100">{formatCurrency(Math.round(totalCurrentYear / 12))}</div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-caution-70" />
            <span className="text-xs text-neutral-50">Best Month</span>
          </div>
          <div className="text-xl font-bold text-neutral-100">December</div>
          <p className="text-[11px] text-neutral-50 mt-0.5">{formatCurrency(73000)}</p>
        </div>
      </div>

      {/* Monthly/Quarterly Revenue with YoY Comparison */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Revenue Comparison — Year over Year</CardTitle>
              <CardDescription>Current year vs previous year performance</CardDescription>
            </div>
            <div className="flex items-center gap-1 border border-neutral-30 rounded-lg overflow-hidden">
              <button
                onClick={() => setRevenueView("monthly")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  revenueView === "monthly"
                    ? "bg-neutral-100 text-white"
                    : "text-neutral-70 hover:bg-neutral-5"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setRevenueView("quarterly")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  revenueView === "quarterly"
                    ? "bg-neutral-100 text-white"
                    : "text-neutral-70 hover:bg-neutral-5"
                }`}
              >
                Quarterly
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: 10, right: 20, top: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#8a8a8a" }}
                  axisLine={{ stroke: "#e6e6e6" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#8a8a8a" }}
                  axisLine={{ stroke: "#e6e6e6" }}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="square"
                  iconSize={10}
                  wrapperStyle={{ fontSize: 11, color: "#6b6b6b" }}
                />
                <Bar dataKey="current" fill="#007cb4" name="2026" radius={[4, 4, 0, 0]} barSize={revenueView === "monthly" ? 16 : 32} />
                <Bar dataKey="previous" fill="#bdbdbd" name="2025" radius={[4, 4, 0, 0]} barSize={revenueView === "monthly" ? 16 : 32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Product Category Donut */}
      <Card>
        <CardHeader className="pb-2">
          <div>
            <CardTitle>Revenue by Product Category</CardTitle>
            <CardDescription>Distribution of revenue across product lines</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            {/* Donut chart */}
            <div className="h-[280px] w-[280px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={revenueByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {revenueByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend / breakdown table */}
            <div className="flex-1">
              <div className="border border-neutral-20 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 border-b border-neutral-20 bg-neutral-5 text-left text-xs font-medium text-neutral-70">Category</th>
                      <th className="px-3 py-2 border-b border-neutral-20 bg-neutral-5 text-right text-xs font-medium text-neutral-70">Revenue</th>
                      <th className="px-3 py-2 border-b border-neutral-20 bg-neutral-5 text-right text-xs font-medium text-neutral-70">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueByCategory.map((cat) => (
                      <tr key={cat.name} className="hover:bg-neutral-5/50 transition-colors">
                        <td className="px-3 py-2 border-b border-neutral-10">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm inline-block flex-shrink-0" style={{ backgroundColor: cat.color }} />
                            <span className="text-sm text-neutral-90">{cat.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-90 text-right font-medium">
                          {formatCurrency(cat.value)}
                        </td>
                        <td className="px-3 py-2 border-b border-neutral-10 text-sm text-neutral-60 text-right">
                          {((cat.value / totalCategoryRevenue) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="px-3 py-2 text-sm font-semibold text-neutral-100">Total</td>
                      <td className="px-3 py-2 text-sm font-semibold text-neutral-100 text-right">{formatCurrency(totalCategoryRevenue)}</td>
                      <td className="px-3 py-2 text-sm font-semibold text-neutral-100 text-right">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
