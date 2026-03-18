"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowUpDown, MoreHorizontal, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import LeftMenu from "./left-menu"

export default function InventoryAllocation({
  onBackClick,
  onInventoryClick,
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
  onInventoryClick: () => void
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
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

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
          <Input type="text" placeholder="Search" className="w-64 mr-4" />
          <Button variant="outline" size="sm" className="mr-2">
            Support
          </Button>
          <div className="w-8 h-8 rounded-full bg-neutral-90 text-white flex items-center justify-center">PS</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Menu */}
        <LeftMenu
          activePage="allocation"
          onNavigate={(page) => {
            if (page === "estimates") onBackClick()
            if (page === "inventory") onInventoryClick()
            if (page === "allocation") {
              /* Already on this page */
            }
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
                  <tr className={`border-t hover:bg-neutral-5 ${expandedRows["est-18"] ? "bg-neutral-5" : ""}`}>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="p-0 h-6 w-6" onClick={() => toggleRow("est-18")}>
                        {expandedRows["est-18"] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">Estimate #18</div>
                      <div className="text-xs text-neutral-50">PrintCo Tri-fold Brochures</div>
                    </td>
                    <td className="px-4 py-3">PrintCo Ltd</td>
                    <td className="px-4 py-3">June 1, 2025</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span>3 items</span>
                        <Badge className="ml-2 bg-info-10 text-info-90 hover:bg-info-10 text-xs">Paper</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Fully Allocated</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  {expandedRows["est-18"] && (
                    <tr className="bg-neutral-5 border-t">
                      <td colSpan={7} className="px-4 py-3">
                        <div className="pl-6">
                          <h4 className="font-medium mb-2">Material Requirements</h4>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left text-xs text-neutral-50">
                                <th className="pb-2">SKU</th>
                                <th className="pb-2">Description</th>
                                <th className="pb-2">Quantity Required</th>
                                <th className="pb-2">Available</th>
                                <th className="pb-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-1 pr-4">GC200-SRA3</td>
                                <td className="py-1 pr-4">Gloss Coated 200gsm SRA3</td>
                                <td className="py-1 pr-4">5,500 sheets</td>
                                <td className="py-1 pr-4">12,000 sheets</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Allocated</Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4">CMYK-SET</td>
                                <td className="py-1 pr-4">CMYK Ink Set</td>
                                <td className="py-1 pr-4">1 set</td>
                                <td className="py-1 pr-4">5 sets</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Allocated</Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4">FOLD-TRI</td>
                                <td className="py-1 pr-4">Tri-fold Service</td>
                                <td className="py-1 pr-4">5,000 units</td>
                                <td className="py-1 pr-4">Unlimited</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Allocated</Badge>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}

                  <tr className={`border-t hover:bg-neutral-5 ${expandedRows["est-17"] ? "bg-neutral-5" : ""}`}>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="p-0 h-6 w-6" onClick={() => toggleRow("est-17")}>
                        {expandedRows["est-17"] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">Estimate #17</div>
                      <div className="text-xs text-neutral-50">Paragon Q1 book launch</div>
                    </td>
                    <td className="px-4 py-3">Sandbox</td>
                    <td className="px-4 py-3">May 25, 2025</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span>4 items</span>
                        <Badge className="ml-2 bg-info-10 text-info-90 hover:bg-info-10 text-xs">Paper</Badge>
                        <Badge className="ml-2 bg-primary-10 text-primary-90 hover:bg-primary-10 text-xs">
                          Binding
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Needs Replenishment</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  {expandedRows["est-17"] && (
                    <tr className="bg-neutral-5 border-t">
                      <td colSpan={7} className="px-4 py-3">
                        <div className="pl-6">
                          <h4 className="font-medium mb-2">Material Requirements</h4>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left text-xs text-neutral-50">
                                <th className="pb-2">SKU</th>
                                <th className="pb-2">Description</th>
                                <th className="pb-2">Quantity Required</th>
                                <th className="pb-2">Available</th>
                                <th className="pb-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-1 pr-4">SC170-A4</td>
                                <td className="py-1 pr-4">Silk Coated 170gsm A4</td>
                                <td className="py-1 pr-4">2,500 sheets</td>
                                <td className="py-1 pr-4">5,000 sheets</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Allocated</Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4">SC250-A4</td>
                                <td className="py-1 pr-4">Silk Coated 250gsm A4</td>
                                <td className="py-1 pr-4">500 sheets</td>
                                <td className="py-1 pr-4">8,500 sheets</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Allocated</Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4">CMYK-SET</td>
                                <td className="py-1 pr-4">CMYK Ink Set</td>
                                <td className="py-1 pr-4">1 set</td>
                                <td className="py-1 pr-4">5 sets</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-success-10 text-success-90 hover:bg-success-10">Allocated</Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4">BIND-PUR</td>
                                <td className="py-1 pr-4">PUR Binding</td>
                                <td className="py-1 pr-4">500 units</td>
                                <td className="py-1 pr-4">300 units</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-critical-10 text-critical-90 hover:bg-critical-10">Insufficient</Badge>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm">
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
                        </div>
                      </td>
                    </tr>
                  )}

                  <tr className={`border-t hover:bg-neutral-5 ${expandedRows["est-16"] ? "bg-neutral-5" : ""}`}>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="p-0 h-6 w-6" onClick={() => toggleRow("est-16")}>
                        {expandedRows["est-16"] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">Estimate #16</div>
                      <div className="text-xs text-neutral-50">Athletix Product Catalog</div>
                    </td>
                    <td className="px-4 py-3">Athletix</td>
                    <td className="px-4 py-3">June 15, 2025</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span>5 items</span>
                        <Badge className="ml-2 bg-info-10 text-info-90 hover:bg-info-10 text-xs">Paper</Badge>
                        <Badge className="ml-2 bg-success-10 text-success-90 hover:bg-success-10 text-xs">
                          Lamination
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-info-10 text-info-90 hover:bg-info-10">Pending Allocation</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  {expandedRows["est-16"] && (
                    <tr className="bg-neutral-5 border-t">
                      <td colSpan={7} className="px-4 py-3">
                        <div className="pl-6">
                          <h4 className="font-medium mb-2">Material Requirements</h4>
                          <div className="mb-3 p-2 bg-info-10 border border-info-20 rounded text-sm">
                            This estimate is pending allocation. Click "Allocate Materials" to automatically assign
                            inventory.
                            <Button size="sm" className="ml-3">
                              Allocate Materials
                            </Button>
                          </div>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left text-xs text-neutral-50">
                                <th className="pb-2">SKU</th>
                                <th className="pb-2">Description</th>
                                <th className="pb-2">Quantity Required</th>
                                <th className="pb-2">Available</th>
                                <th className="pb-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-1 pr-4">GC170-A4</td>
                                <td className="py-1 pr-4">Gloss Coated 170gsm A4</td>
                                <td className="py-1 pr-4">10,000 sheets</td>
                                <td className="py-1 pr-4">15,000 sheets</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-info-10 text-info-90 hover:bg-info-10">Pending</Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4">GC250-A4</td>
                                <td className="py-1 pr-4">Gloss Coated 250gsm A4</td>
                                <td className="py-1 pr-4">1,000 sheets</td>
                                <td className="py-1 pr-4">3,000 sheets</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-info-10 text-info-90 hover:bg-info-10">Pending</Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4">CMYK-SET</td>
                                <td className="py-1 pr-4">CMYK Ink Set</td>
                                <td className="py-1 pr-4">2 sets</td>
                                <td className="py-1 pr-4">5 sets</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-info-10 text-info-90 hover:bg-info-10">Pending</Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4">LAM-GLOSS</td>
                                <td className="py-1 pr-4">Gloss Lamination</td>
                                <td className="py-1 pr-4">1,000 sheets</td>
                                <td className="py-1 pr-4">5,000 sheets</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-info-10 text-info-90 hover:bg-info-10">Pending</Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4">BIND-PUR</td>
                                <td className="py-1 pr-4">PUR Binding</td>
                                <td className="py-1 pr-4">1,000 units</td>
                                <td className="py-1 pr-4">300 units</td>
                                <td className="py-1 pr-4">
                                  <Badge className="bg-critical-10 text-critical-90 hover:bg-critical-10">Insufficient</Badge>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
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
      </div>
    </div>
  )
}
