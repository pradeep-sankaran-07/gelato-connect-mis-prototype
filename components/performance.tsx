"use client"

import { useState } from "react"
import {
  Calendar,
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Header from "@/components/header"
import LeftMenu from "@/components/left-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

// Mock data for the charts
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

interface PerformanceProps {
  onBackClick: () => void
  onInventoryClick: () => void
  onInventoryAllocationClick: () => void
  onOrderClick: () => void
  onSchedulingClick: () => void
  onControlPanelClick: () => void
  onPerformanceClick: () => void
  onCustomersClick: () => void
  onProductionTrackerClick: () => void
  onProductionStationsClick: () => void
  onLogisticsAnalyticsClick: () => void
  onShipmentsClick: () => void
}

export default function Performance({
  onBackClick,
  onInventoryClick,
  onInventoryAllocationClick,
  onOrderClick,
  onSchedulingClick,
  onControlPanelClick,
  onPerformanceClick,
  onCustomersClick,
  onProductionTrackerClick,
  onProductionStationsClick,
  onLogisticsAnalyticsClick,
  onShipmentsClick,
}: PerformanceProps) {
  const [dateRange, setDateRange] = useState("last30")
  const [showSettings, setShowSettings] = useState(false)

  // Calculate the max value for the revenue chart
  const maxRevenue = Math.max(...revenueData.map((item) => item.revenue))

  // Calculate the conversion rate
  const conversionRate = ((conversionData.orders / conversionData.estimates) * 100).toFixed(1)

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <LeftMenu
          activePage="performance"
          onNavigate={(page) => {
            switch (page) {
              case "control-panel":
                onControlPanelClick()
                break
              case "performance":
                onPerformanceClick()
                break
              case "customers":
                onCustomersClick()
                break
              case "estimates":
                onBackClick()
                break
              case "orders":
                onOrderClick()
                break
              case "scheduling":
                onSchedulingClick()
                break
              case "production-tracker":
                onProductionTrackerClick()
                break
              case "production-stations":
                onProductionStationsClick()
                break
              case "logistics-analytics":
                onLogisticsAnalyticsClick()
                break
              case "shipments":
                onShipmentsClick()
                break
              case "inventory":
                onInventoryClick()
                break
              case "allocation":
                onInventoryAllocationClick()
                break
            }
          }}
        />
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Performance Dashboard</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-50">Date Range:</span>
                <Select defaultValue={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last30">Last 30 Days</SelectItem>
                    <SelectItem value="mtd">Month to Date</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="ml-2">
                  <Calendar className="h-4 w-4" />
                </Button>
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

            {/* Top Section: KPI Scorecards and Summary Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-neutral-50">Total Revenue</p>
                      <h3 className="text-2xl font-bold mt-1">$73,250</h3>
                    </div>
                    <div className="flex items-center text-success-70 text-sm font-medium">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>12.5%</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-50 mt-2">vs. previous period</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-neutral-50">Total Orders</p>
                      <h3 className="text-2xl font-bold mt-1">128</h3>
                    </div>
                    <div className="flex items-center text-success-70 text-sm font-medium">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>8.2%</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-50 mt-2">vs. previous period</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-neutral-50">Conversion Rate</p>
                      <h3 className="text-2xl font-bold mt-1">{conversionRate}%</h3>
                    </div>
                    <div className="flex items-center text-critical-60 text-sm font-medium">
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                      <span>2.1%</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-50 mt-2">vs. previous period</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-neutral-50">Avg. Order Value</p>
                      <h3 className="text-2xl font-bold mt-1">$572</h3>
                    </div>
                    <div className="flex items-center text-success-70 text-sm font-medium">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>4.3%</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-50 mt-2">vs. previous period</p>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Revenue Trend</CardTitle>
                      <CardDescription>Monthly revenue for the past year</CardDescription>
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
                        <DropdownMenuItem>View by Product Category</DropdownMenuItem>
                        <DropdownMenuItem>View by Customer Segment</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <div className="flex items-end h-[250px] w-full">
                      {revenueData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-[80%] bg-info-70 rounded-t-sm relative group"
                            style={{
                              height: `${(item.revenue / maxRevenue) * 220}px`,
                              minHeight: "4px",
                            }}
                          >
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-90 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap">
                              ${(item.revenue / 1000).toFixed(1)}k
                            </div>
                          </div>
                          <span className="text-xs mt-2 text-neutral-50">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="ml-auto">
                    View Full Report
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Estimate to Order Conversion</CardTitle>
                      <CardDescription>Value of estimates vs. orders</CardDescription>
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
                        <DropdownMenuItem>Analyze by Product Type</DropdownMenuItem>
                        <DropdownMenuItem>Analyze by Sales Rep</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <div className="flex items-center mb-6">
                        <div className="w-full h-8 bg-info-20 rounded-sm">
                          <div
                            className="h-full bg-info-70 rounded-sm flex items-center justify-end px-2 text-white text-sm font-medium"
                            style={{ width: "100%" }}
                          >
                            ${(conversionData.estimates / 1000).toFixed(0)}k
                          </div>
                        </div>
                        <div className="ml-2 min-w-[100px]">
                          <p className="text-sm font-medium">Estimates</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="w-full h-8 bg-success-20 rounded-sm">
                          <div
                            className="h-full bg-success-70 rounded-sm flex items-center justify-end px-2 text-white text-sm font-medium"
                            style={{ width: `${(conversionData.orders / conversionData.estimates) * 100}%` }}
                          >
                            ${(conversionData.orders / 1000).toFixed(0)}k
                          </div>
                        </div>
                        <div className="ml-2 min-w-[100px]">
                          <p className="text-sm font-medium">Orders</p>
                        </div>
                      </div>

                      <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-50">
                          Conversion Rate: <span className="font-medium">{conversionRate}%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="ml-auto">
                    View Full Report
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* AI Suggested Actions */}
            <Card className="mb-6 border-l-4 border-l-caution-50">
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
                        <h4 className="font-medium text-sm">Low estimate conversion rate for 'Brochures' this month</h4>
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
                        <h4 className="font-medium text-sm">Sales of 'Business Cards' have increased by 20% WoW</h4>
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
        </div>
      </div>
    </div>
  )
}
