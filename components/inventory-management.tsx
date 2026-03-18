"use client"

import { useState } from "react"
import { AlertCircle, Download, Upload, MoreHorizontal, Plus, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import LeftMenu from "./left-menu"

export default function InventoryManagement({
  onBackClick,
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
}: {
  onBackClick: () => void
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
}) {
  const [activeTab, setActiveTab] = useState("paper")
  const [showAIInsights, setShowAIInsights] = useState(true)

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2819%29-170UxeV7cg8b7kNjFagZkz9quPldwr.png"
            alt="GelatoConnect Logo"
            className="h-6 w-6 mr-2"
          />
          <span className="font-bold text-lg">GelatoConnect</span>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBackClick} className="mr-4">
            Back to Manage Estimates
          </Button>
          <Input
            type="text"
            placeholder="Search"
            className="w-64 mr-4"
            prefix={<AlertCircle className="h-4 w-4 text-neutral-50" />}
          />
          <Button variant="outline" size="sm" className="mr-2">
            Support
          </Button>
          <div className="w-8 h-8 rounded-full bg-neutral-90 text-white flex items-center justify-center">PS</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Menu */}
        <LeftMenu
          activePage="inventory"
          onNavigate={(page) => {
            if (page === "estimates") onBackClick()
            if (page === "inventory") {
              /* Already on this page */
            }
            if (page === "allocation") onInventoryAllocationClick()
            if (page === "orders") onOrderClick()
            if (page === "scheduling") onSchedulingClick()
            if (page === "control-panel") onControlPanelClick()
            if (page === "performance") onPerformanceClick()
            if (page === "customers") onCustomersClick()
            if (page === "production-tracker") onProductionTrackerClick()
            if (page === "production-stations") onProductionStationsClick()
            if (page === "logistics-analytics") onLogisticsAnalyticsClick()
            if (page === "shipments") onShipmentsClick()
          }}
        />

        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-neutral-5 border-b">
            <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span>Alerts</span>
                <Badge className="ml-1 bg-critical-100">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-1" /> Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Export
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
                  <SelectItem value="a4">A4 (210×297mm)</SelectItem>
                  <SelectItem value="a3">A3 (297×420mm)</SelectItem>
                  <SelectItem value="sra3">SRA3 (320×450mm)</SelectItem>
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
                        minimum threshold and needs immediate restock.
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowAIInsights(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
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
                        Status
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-neutral-50 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t hover:bg-neutral-5">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">GC170-SRA3</div>
                      <div className="text-xs text-neutral-50">Gloss Coated Premium</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>Coated</div>
                      <div className="text-xs text-neutral-50">Gloss</div>
                    </td>
                    <td className="px-4 py-3">170 gsm</td>
                    <td className="px-4 py-3">320 × 450</td>
                    <td className="px-4 py-3">€1,250.00</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="mr-2">1,200</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-24">
                                <Progress value={20} className="h-2" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>20% of minimum stock level</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="px-4 py-3">800</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Low Stock</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-t hover:bg-neutral-5">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">UC120-A4</div>
                      <div className="text-xs text-neutral-50">Uncoated Offset</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>Uncoated</div>
                      <div className="text-xs text-neutral-50">Smooth</div>
                    </td>
                    <td className="px-4 py-3">120 gsm</td>
                    <td className="px-4 py-3">210 × 297</td>
                    <td className="px-4 py-3">€980.00</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="mr-2">25,000</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-24">
                                <Progress value={75} className="h-2" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>75% of minimum stock level</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="px-4 py-3">5,000</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Normal</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-t hover:bg-neutral-5">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">SC250-A3</div>
                      <div className="text-xs text-neutral-50">Silk Coated</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>Coated</div>
                      <div className="text-xs text-neutral-50">Silk</div>
                    </td>
                    <td className="px-4 py-3">250 gsm</td>
                    <td className="px-4 py-3">297 × 420</td>
                    <td className="px-4 py-3">€1,350.00</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="mr-2">8,500</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-24">
                                <Progress value={60} className="h-2" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>60% of minimum stock level</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span>6,000</span>
                        <Badge className="ml-2 bg-info-10 text-info-90 hover:bg-info-10 text-xs">Upcoming</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-info-10 text-info-90 hover:bg-info-10">Allocated</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-t hover:bg-neutral-5">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">RC100-A4</div>
                      <div className="text-xs text-neutral-50">Recycled Uncoated</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>Recycled</div>
                      <div className="text-xs text-neutral-50">Uncoated</div>
                    </td>
                    <td className="px-4 py-3">100 gsm</td>
                    <td className="px-4 py-3">210 × 297</td>
                    <td className="px-4 py-3">€1,050.00</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="mr-2">15,000</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-24">
                                <Progress value={90} className="h-2" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>90% of minimum stock level</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="px-4 py-3">2,000</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Normal</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-t hover:bg-neutral-5">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">MC350-SRA3</div>
                      <div className="text-xs text-neutral-50">Matte Coated Premium</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>Coated</div>
                      <div className="text-xs text-neutral-50">Matte</div>
                    </td>
                    <td className="px-4 py-3">350 gsm</td>
                    <td className="px-4 py-3">320 × 450</td>
                    <td className="px-4 py-3">€1,580.00</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="mr-2">5,000</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-24">
                                <Progress value={100} className="h-2" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>100% of minimum stock level</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="px-4 py-3">1,500</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Normal</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 border-t bg-white flex items-center justify-between">
            <div className="text-sm text-neutral-50">Showing 5 of 42 items</div>
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
      </div>
    </div>
  )
}

function X({ className }: { className?: string }) {
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
