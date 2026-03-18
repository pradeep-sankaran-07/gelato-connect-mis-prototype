"use client"

import { useState } from "react"
import { TrendingDown, TrendingUp, Calendar, Filter, ArrowLeft, ChevronDown, Package, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LeftMenu from "./left-menu"

interface LogisticsAnalyticsProps {
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

export default function LogisticsAnalytics({
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
}: LogisticsAnalyticsProps) {
  const [activeTab, setActiveTab] = useState("parcel")

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
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Input type="text" placeholder="Search" className="w-64 mr-4" />
          <Button variant="outline" size="sm" className="mr-2">
            Support
          </Button>
          <div className="w-8 h-8 rounded-full bg-neutral-90 text-white flex items-center justify-center">PS</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <LeftMenu
          activePage="logistics-analytics"
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
              case "inventory":
                onInventoryClick()
                break
              case "allocation":
                onInventoryAllocationClick()
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
            }
          }}
        />
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Button variant="outline" size="sm">
                  Last 4 weeks
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="relative">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Add filter
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                Clear
              </Button>
            </div>
          </div>

          <div className="text-sm text-neutral-50 mb-6 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            21 Apr 2025 - 18 May 2025 in comparison to 24 Mar 2025 - 20 Apr 2025
          </div>

          <Tabs defaultValue="parcel" className="mb-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="parcel">
                <Package className="h-4 w-4 mr-2" />
                Parcel Shipping
              </TabsTrigger>
              <TabsTrigger value="pallet">
                <Palette className="h-4 w-4 mr-2" />
                Pallet Shipping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="parcel" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-neutral-50 mb-2">Shipments</div>
                  <div className="flex items-baseline">
                    <div className="text-3xl font-bold">1,976</div>
                    <div className="ml-2 text-critical-60 text-sm flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -20.8% (-878)
                    </div>
                  </div>
                  <div className="text-xs text-neutral-50 mt-1">Total number of shipments (packages).</div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-neutral-50 mb-2">Exceptions</div>
                  <div className="flex items-baseline">
                    <div className="text-3xl font-bold">20</div>
                    <div className="ml-2 text-critical-60 text-sm flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -4.8% (-1)
                    </div>
                  </div>
                  <div className="text-xs text-neutral-50 mt-1">
                    Number of post-label creation shipments experiencing issues, such as return-to-sender requests.
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-neutral-50 mb-2">Delayed delivery</div>
                  <div className="flex items-baseline">
                    <div className="text-3xl font-bold">3</div>
                  </div>
                  <div className="text-xs text-neutral-50 mt-1">
                    Number of shipments exceeding the agreed time in transit (SLA) vs delivered on time.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-neutral-50 mb-2">Label cost</div>
                  <div className="flex items-baseline">
                    <div className="text-3xl font-bold">€3.28 / €6,471.77</div>
                  </div>
                  <div className="text-xs text-neutral-50 mt-1">
                    Average cost of label / total cost of labels generated with Gelato accounts.
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-neutral-50">Shipping label errors</div>
                    <Button size="sm" variant="outline">
                      Solve
                    </Button>
                  </div>
                  <div className="flex items-baseline">
                    <div className="text-3xl font-bold">15</div>
                  </div>
                  <div className="text-xs text-neutral-50 mt-1">
                    Number of pre-label creation shipments experiencing issues, such as incorrect delivery addresses.
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium">Shipments</h3>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="bg-neutral-100 text-white">
                      Days
                    </Button>
                    <Button variant="outline" size="sm">
                      Weeks
                    </Button>
                  </div>
                </div>
                <div className="flex items-center text-xs text-neutral-50 mb-2 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-neutral-100 rounded-full mr-1"></div>
                    <span>Total: 1,976</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-neutral-20 rounded-full mr-1"></div>
                    <span>Label created: 26</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-info-100 rounded-full mr-1"></div>
                    <span>In transit: 69</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-success-100 rounded-full mr-1"></div>
                    <span>Delivered: 1,861</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-critical-100 rounded-full mr-1"></div>
                    <span>Exception: 20</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-caution-100 rounded-full mr-1"></div>
                    <span>Lost</span>
                  </div>
                </div>
                <div className="h-64 w-full bg-neutral-5 flex items-center justify-center">
                  <div className="w-full h-full flex items-end justify-between px-4">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-neutral-100"
                        style={{
                          width: "10px",
                          height: `${Math.max(20, Math.random() * 100)}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-neutral-50">
                  <div>21 Apr</div>
                  <div>18 May</div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Carrier Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-neutral-20">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Carrier
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Shipping Method
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Share
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Shipments
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Delivery on time (%)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Total label cost
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Average label cost
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-20">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap" rowSpan={2}>
                          UPS Us
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">UPS Standard Tariff</td>
                        <td className="px-4 py-3 whitespace-nowrap">13.3%</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          262
                          <div className="text-xs text-critical-60">-101 (-27.8%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          100.0%
                          <div className="text-xs text-critical-60">-119 (-32.7%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €864.90
                          <div className="text-xs text-success-70">+287.27 (+24.9%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €3.30
                          <div className="text-xs text-critical-60">-0.13 (-4.1%)</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">UPS Express Saver</td>
                        <td className="px-4 py-3 whitespace-nowrap">12.9%</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          255
                          <div className="text-xs text-critical-60">-121 (-32.2%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          100.0%
                          <div className="text-xs text-critical-60">-134 (-36.6%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €819.45
                          <div className="text-xs text-critical-60">-402.51 (-32.9%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €3.21
                          <div className="text-xs text-critical-60">-0.04 (-1.2%)</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap" rowSpan={2}>
                          DHL
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">DHL Parcel</td>
                        <td className="px-4 py-3 whitespace-nowrap">13.3%</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          262
                          <div className="text-xs text-critical-60">-99 (-27.4%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          100.0%
                          <div className="text-xs text-critical-60">-111 (-31.0%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €864.83
                          <div className="text-xs text-critical-60">-314.71 (-26.7%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €3.30
                          <div className="text-xs text-success-70">+0.03 (+0.9%)</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">DHL Global Parcel</td>
                        <td className="px-4 py-3 whitespace-nowrap">12.2%</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          242
                          <div className="text-xs text-critical-60">-124 (-33.9%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          99.6%
                          <div className="text-xs text-critical-60">-140 (-36.8%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €802.63
                          <div className="text-xs text-critical-60">-355.96 (-30.7%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €3.32
                          <div className="text-xs text-critical-60">-0.15 (-4.7%)</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pallet" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-neutral-50 mb-2">Pallet Shipments</div>
                  <div className="flex items-baseline">
                    <div className="text-3xl font-bold">186</div>
                    <div className="ml-2 text-success-70 text-sm flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +22.4% (+34)
                    </div>
                  </div>
                  <div className="text-xs text-neutral-50 mt-1">Total number of pallet shipments.</div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-neutral-50 mb-2">Exceptions</div>
                  <div className="flex items-baseline">
                    <div className="text-3xl font-bold">4</div>
                    <div className="ml-2 text-success-70 text-sm flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      -20.0% (-1)
                    </div>
                  </div>
                  <div className="text-xs text-neutral-50 mt-1">
                    Number of pallet shipments experiencing issues, such as delivery exceptions.
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-neutral-50 mb-2">Delayed delivery</div>
                  <div className="flex items-baseline">
                    <div className="text-3xl font-bold">2</div>
                    <div className="ml-2 text-success-70 text-sm flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      -33.3% (-1)
                    </div>
                  </div>
                  <div className="text-xs text-neutral-50 mt-1">
                    Number of pallet shipments exceeding the agreed delivery window.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-neutral-50 mb-2">Average Pallet Cost</div>
                  <div className="flex items-baseline">
                    <div className="text-3xl font-bold">€285.42 / €53,088.12</div>
                  </div>
                  <div className="text-xs text-neutral-50 mt-1">
                    Average cost per pallet shipment / total cost of all pallet shipments.
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-neutral-50">Pallet Utilization</div>
                  </div>
                  <div className="flex items-baseline">
                    <div className="text-3xl font-bold">92.4%</div>
                    <div className="ml-2 text-success-70 text-sm flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +3.2%
                    </div>
                  </div>
                  <div className="text-xs text-neutral-50 mt-1">
                    Average pallet space utilization across all shipments.
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium mb-4">Pallet Carrier Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-neutral-20">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Carrier
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Shipping Method
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Share
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Shipments
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Delivery on time (%)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Total cost
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                          Average cost
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-20">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap" rowSpan={2}>
                          DB Schenker
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">Standard Pallet</td>
                        <td className="px-4 py-3 whitespace-nowrap">32.8%</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          61
                          <div className="text-xs text-success-70">+12 (+24.5%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          98.4%
                          <div className="text-xs text-success-70">+1.2%</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €15,860.00
                          <div className="text-xs text-success-70">+3,120.00 (+24.5%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €260.00
                          <div className="text-xs text-success-70">+0.00 (+0.0%)</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">Express Pallet</td>
                        <td className="px-4 py-3 whitespace-nowrap">16.1%</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          30
                          <div className="text-xs text-success-70">+6 (+25.0%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          100.0%
                          <div className="text-xs text-success-70">+0.0%</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €9,900.00
                          <div className="text-xs text-success-70">+1,980.00 (+25.0%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €330.00
                          <div className="text-xs text-success-70">+0.00 (+0.0%)</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap" rowSpan={2}>
                          DSV
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">DSV Road Pallet</td>
                        <td className="px-4 py-3 whitespace-nowrap">25.3%</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          47
                          <div className="text-xs text-success-70">+8 (+20.5%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          97.9%
                          <div className="text-xs text-critical-60">-0.8%</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €12,690.00
                          <div className="text-xs text-success-70">+2,160.00 (+20.5%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €270.00
                          <div className="text-xs text-success-70">+0.00 (+0.0%)</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">DSV Express Pallet</td>
                        <td className="px-4 py-3 whitespace-nowrap">14.0%</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          26
                          <div className="text-xs text-success-70">+4 (+18.2%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          96.2%
                          <div className="text-xs text-critical-60">-1.5%</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €9,100.00
                          <div className="text-xs text-success-70">+1,400.00 (+18.2%)</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          €350.00
                          <div className="text-xs text-success-70">+0.00 (+0.0%)</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
