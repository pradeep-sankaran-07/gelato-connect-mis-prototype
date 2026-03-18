"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ProductionLeftMenu from "./production-left-menu"
import type { ProductionStepProgress } from "./production/types"
import Header from "@/components/header"

// Sample data
const productionStepsData: ProductionStepProgress[] = [
  {
    step: "Binding",
    delayed: { completed: 5, total: 7 },
    today: { completed: 0, total: 2 },
    upcoming: { completed: 0, total: 2 },
  },
  {
    step: "UV Coating",
    delayed: { completed: 8, total: 8 },
    today: { completed: 0, total: 0 },
    upcoming: { completed: 0, total: 0 },
  },
  {
    step: "Cutting",
    delayed: { completed: 28, total: 34 },
    today: { completed: 5, total: 5 },
    upcoming: { completed: 0, total: 2 },
  },
  {
    step: "Laminating",
    delayed: { completed: 3, total: 4 },
    today: { completed: 1, total: 1 },
    upcoming: { completed: 0, total: 1 },
  },
  {
    step: "Mounting",
    delayed: { completed: 9, total: 12 },
    today: { completed: 0, total: 3 },
    upcoming: { completed: 0, total: 0 },
  },
  {
    step: "Printing",
    delayed: { completed: 28, total: 34 },
    today: { completed: 5, total: 5 },
    upcoming: { completed: 0, total: 2 },
  },
]

interface ProductionTrackerProps {
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

export default function ProductionTracker({
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
}: ProductionTrackerProps) {
  const [activeTab, setActiveTab] = useState("jobs")
  const [filterSteps, setFilterSteps] = useState("Steps")
  const [filterMachineTypes, setFilterMachineTypes] = useState("Machine types")
  const [filterMachineName, setFilterMachineName] = useState("Machine name")
  const [filterCustomers, setFilterCustomers] = useState("Customers")
  const [filterProductModel, setFilterProductModel] = useState("Product model")
  const [filterWorkflow, setFilterWorkflow] = useState("Workflow")

  const handleNavigate = (page: string) => {
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
      case "inventory":
        onInventoryClick()
        break
      case "allocation":
        onInventoryAllocationClick()
        break
      case "logistics-analytics":
        onLogisticsAnalyticsClick()
        break
      case "shipments":
        onShipmentsClick()
        break
    }
  }

  // Helper function to render progress bars
  const renderProgressBar = (completed: number, total: number, color: string) => {
    if (total === 0) return null

    const percentage = (completed / total) * 100

    return (
      <div className="w-full bg-neutral-10 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <ProductionLeftMenu activePage="production-tracker" onNavigate={handleNavigate} />

        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Production Tracker</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="plates">Plates</TabsTrigger>
              </TabsList>

              <TabsContent value="jobs" className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {filterSteps} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setFilterSteps("All Steps")}>All Steps</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterSteps("Printing")}>Printing</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterSteps("Cutting")}>Cutting</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {filterMachineTypes} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setFilterMachineTypes("All Types")}>All Types</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterMachineTypes("Digital")}>Digital</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterMachineTypes("Offset")}>Offset</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {filterMachineName} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setFilterMachineName("All Machines")}>
                        All Machines
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterMachineName("Machine 1")}>Machine 1</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterMachineName("Machine 2")}>Machine 2</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {filterCustomers} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setFilterCustomers("All Customers")}>
                        All Customers
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterCustomers("Customer A")}>Customer A</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterCustomers("Customer B")}>Customer B</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {filterProductModel} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setFilterProductModel("All Products")}>
                        All Products
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterProductModel("Photobooks")}>
                        Photobooks
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterProductModel("Brochures")}>Brochures</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {filterWorkflow} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setFilterWorkflow("All Workflows")}>
                        All Workflows
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterWorkflow("Standard")}>Standard</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterWorkflow("Rush")}>Rush</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="bg-white rounded-lg overflow-hidden border">
                  <div className="grid grid-cols-7 border-b">
                    <div className="p-4 font-medium">Steps</div>
                    <div className="col-span-2 p-4 text-center font-medium bg-critical-10 text-critical-90">
                      <div>Delayed</div>
                      <div className="text-sm font-normal">Apr 22 - May 21</div>
                      <div className="text-xs text-neutral-50">Last 30 days</div>
                    </div>
                    <div className="col-span-2 p-4 text-center font-medium bg-info-10 text-info-90">
                      <div>Today</div>
                      <div className="text-sm font-normal">May 22</div>
                      <div className="text-xs text-neutral-50">Thursday</div>
                    </div>
                    <div className="col-span-2 p-4 text-center font-medium bg-neutral-5 text-neutral-90">
                      <div>Upcoming</div>
                      <div className="text-sm font-normal">May 23</div>
                      <div className="text-xs text-neutral-50">Friday</div>
                    </div>
                  </div>

                  {productionStepsData.map((step, index) => (
                    <div key={index} className="grid grid-cols-7 border-b hover:bg-neutral-5">
                      <div className="p-4 font-medium flex items-center">{step.step}</div>

                      <div className="col-span-2 p-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            {step.delayed.completed} / {step.delayed.total}
                          </span>
                        </div>
                        {renderProgressBar(step.delayed.completed, step.delayed.total, "bg-success-100")}
                      </div>

                      <div className="col-span-2 p-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            {step.today.completed} / {step.today.total}
                          </span>
                        </div>
                        {renderProgressBar(step.today.completed, step.today.total, "bg-info-100")}
                      </div>

                      <div className="col-span-2 p-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            {step.upcoming.completed} / {step.upcoming.total}
                          </span>
                        </div>
                        {renderProgressBar(step.upcoming.completed, step.upcoming.total, "bg-neutral-50")}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Cost Analysis</h2>
                  <div className="bg-white rounded-lg overflow-hidden border p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Time Tracking Summary</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Estimated vs. Actual Time</span>
                              <span className="text-sm font-medium">75%</span>
                            </div>
                            <div className="w-full bg-neutral-10 rounded-full h-2.5">
                              <div className="h-2.5 rounded-full bg-info-70 w-3/4"></div>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-neutral-50">
                              <span>Estimated: 120 hours</span>
                              <span>Actual: 90 hours</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Labor Efficiency</span>
                              <span className="text-sm font-medium">82%</span>
                            </div>
                            <div className="w-full bg-neutral-10 rounded-full h-2.5">
                              <div className="h-2.5 rounded-full bg-success-100 w-4/5"></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Machine Utilization</span>
                              <span className="text-sm font-medium">68%</span>
                            </div>
                            <div className="w-full bg-neutral-10 rounded-full h-2.5">
                              <div className="h-2.5 rounded-full bg-caution-100 w-2/3"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Cost Breakdown</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Labor Costs</span>
                            <div className="flex items-center">
                              <span className="font-medium">$3,245.00</span>
                              <span className="ml-2 text-sm text-success-70">-8%</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>Material Costs</span>
                            <div className="flex items-center">
                              <span className="font-medium">$5,120.00</span>
                              <span className="ml-2 text-sm text-critical-70">+3%</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>Machine Costs</span>
                            <div className="flex items-center">
                              <span className="font-medium">$2,780.00</span>
                              <span className="ml-2 text-sm text-success-70">-5%</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t">
                            <div className="flex justify-between items-center font-medium">
                              <span>Total Actual Costs</span>
                              <div className="flex items-center">
                                <span className="font-bold">$11,145.00</span>
                                <span className="ml-2 text-sm text-success-70">-2.8%</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-sm text-neutral-50 mt-1">
                              <span>vs. Estimated Costs</span>
                              <span>$11,470.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="plates">
                <div className="bg-white p-6 rounded-lg border">
                  <p className="text-neutral-50">Plates content will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
