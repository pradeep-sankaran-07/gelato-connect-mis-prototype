"use client"
import { useState } from "react"
import { Settings, ChevronDown, Play, Pause, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ProductionLeftMenu from "./production-left-menu"
import StationSelector from "./production/station-selector"
import type { Job, ProductionStep, JobStatus } from "./production/types"
import Header from "@/components/header"

// Sample data with us_hud prefix removed
const initialJobs: Job[] = [
  {
    id: "7101205148",
    dispatchDate: "21.05.2025 16:00",
    productModel: "folded_product",
    part: "-",
    status: "Not Started",
    productionStep: "Printing",
  },
  {
    id: "7101205242",
    dispatchDate: "21.05.2025 16:00",
    productModel: "folded_product",
    part: "-",
    status: "Not Started",
    productionStep: "Printing",
  },
  {
    id: "7101205149",
    dispatchDate: "21.05.2025 16:00",
    productModel: "folded_product",
    part: "-",
    status: "Not Started",
    productionStep: "Printing",
  },
  {
    id: "7101205241",
    dispatchDate: "21.05.2025 16:00",
    productModel: "folded_product",
    part: "-",
    status: "Not Started",
    productionStep: "Printing",
  },
  {
    id: "7101223035",
    dispatchDate: "22.05.2025 16:00",
    productModel: "photobook_inner_part",
    part: "photobook_inner_part_4-4_ver_custom_lt_100-lb-text-coated-gloss",
    status: "Not Started",
    productionStep: "Printing",
  },
  {
    id: "7101228857",
    dispatchDate: "22.05.2025 16:00",
    productModel: "photobook_hard_cover_part",
    part: "photobook_hard_cover_part_matt-lamination_4-0_ver_custom_5x7_100-lb-text-coated-silk_1-0",
    status: "Not Started",
    productionStep: "Printing",
  },
  {
    id: "7101228856",
    dispatchDate: "22.05.2025 16:00",
    productModel: "photobook_end_sheet_part",
    part: "photobook_end_sheet_part_ver_5x7_100-lb-text-coated-silk",
    status: "Not Started",
    productionStep: "Printing",
  },
  {
    id: "7101223036",
    dispatchDate: "22.05.2025 16:00",
    productModel: "photobook_soft_cover_part",
    part: "photobook_soft_cover_part_glossy-lamination_4-4_ver_custom_lt_100-lb-cover-coated-gloss_1-0",
    status: "Not Started",
    productionStep: "Printing",
  },
]

interface ProductionStationsProps {
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

export default function ProductionStations({
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
}: ProductionStationsProps) {
  const [currentStation, setCurrentStation] = useState<ProductionStep>("Printing")
  const [showStationSelector, setShowStationSelector] = useState(false)
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [activeTab, setActiveTab] = useState("jobs")
  const [filterDays, setFilterDays] = useState("7 days ago")
  const [filterCustomers, setFilterCustomers] = useState("Customers")
  const [filterProductModel, setFilterProductModel] = useState("Product model")
  const [filterStatus, setFilterStatus] = useState("Status")
  const [filterCount, setFilterCount] = useState("10")

  // Calculate completion percentage
  const completedJobs = jobs.filter((job) => job.status === "Completed").length
  const completionPercentage = jobs.length > 0 ? Math.round((completedJobs / jobs.length) * 100) : 0
  const remainingSteps = jobs.length - completedJobs

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

  const updateJobStatus = (jobId: string, newStatus: JobStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          // Calculate time in station based on status changes
          let timeInStation = job.timeInStation
          let startTime = job.startTime
          let totalTime = job.totalTime || 0
          let pausedTime = job.pausedTime

          const now = Date.now()

          if (newStatus === "In Progress" && job.status !== "In Progress") {
            // Starting or resuming the job
            startTime = now
            pausedTime = undefined
            timeInStation = "Just started"
          } else if (newStatus === "Paused" && job.status === "In Progress") {
            // Pausing the job
            if (startTime) {
              totalTime += now - startTime
            }
            pausedTime = now
            timeInStation = formatTimeInStation(totalTime)
          } else if (newStatus === "Completed") {
            // Completing the job
            if (job.status === "In Progress" && startTime) {
              totalTime += now - startTime
            }
            timeInStation = formatTimeInStation(totalTime)
          }

          return { ...job, status: newStatus, timeInStation, startTime, totalTime, pausedTime }
        }
        return job
      }),
    )
  }

  const formatTimeInStation = (ms: number): string => {
    if (!ms) return "0m"

    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `${days}d ${hours % 24}h`
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    } else {
      return `${minutes}m`
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <ProductionLeftMenu activePage="production-stations" onNavigate={handleNavigate} />

        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-neutral-50">Home</div>
                <h1 className="text-2xl font-bold">{currentStation}</h1>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowStationSelector(true)}>
                  Change station
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="plates">Plates</TabsTrigger>
              </TabsList>

              <TabsContent value="jobs" className="space-y-4">
                <div className="bg-white rounded-lg overflow-hidden border">
                  <div className="p-4 bg-gradient-to-r from-success-100 to-green-600 text-white">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">Completed</div>
                      <div className="font-medium text-right">Production steps to complete</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold">{completionPercentage}%</div>
                      <div className="text-3xl font-bold text-right">{remainingSteps}</div>
                    </div>
                    <Progress value={completionPercentage} className="h-2 mt-2 bg-white/20" />
                  </div>

                  <div className="p-4 flex flex-wrap gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          {filterDays} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setFilterDays("3 days ago")}>3 days ago</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterDays("7 days ago")}>7 days ago</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterDays("14 days ago")}>14 days ago</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
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
                        <DropdownMenuItem onClick={() => setFilterProductModel("Brochures")}>
                          Brochures
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="relative">
                          {filterStatus}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setFilterStatus("All Status")}>All Status</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("Not Started")}>Not Started</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("In Progress")}>In Progress</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("Completed")}>Completed</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          {filterCount} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setFilterCount("10")}>10</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterCount("25")}>25</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterCount("50")}>50</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-neutral-5 text-neutral-70">
                        <tr>
                          <th className="px-4 py-3 text-left">Dispatch date</th>
                          <th className="px-4 py-3 text-left">Job ID</th>
                          <th className="px-4 py-3 text-left">Product model</th>
                          <th className="px-4 py-3 text-left">Part</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-left">Time in Station</th>
                          <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {jobs.map((job) => (
                          <tr key={job.id} className="hover:bg-neutral-5">
                            <td className="px-4 py-3">{job.dispatchDate}</td>
                            <td className="px-4 py-3 text-info-70">{job.id}</td>
                            <td className="px-4 py-3">{job.productModel}</td>
                            <td className="px-4 py-3 max-w-xs truncate">{job.part}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  job.status === "In Progress"
                                    ? "bg-info-10 text-info-90"
                                    : job.status === "Completed"
                                      ? "bg-success-10 text-success-90"
                                      : job.status === "Paused"
                                        ? "bg-caution-10 text-caution-90"
                                        : "bg-neutral-5 text-neutral-90"
                                }`}
                              >
                                {job.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">{job.timeInStation || "-"}</td>
                            <td className="px-4 py-3">
                              <div className="flex space-x-2">
                                {job.status === "Not Started" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-success-70 border-success-70 hover:bg-success-10"
                                    onClick={() => updateJobStatus(job.id, "In Progress")}
                                  >
                                    <Play className="h-4 w-4 mr-1" /> Start
                                  </Button>
                                )}
                                {job.status === "In Progress" && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-caution-70 border-caution-70 hover:bg-caution-10"
                                      onClick={() => updateJobStatus(job.id, "Paused")}
                                    >
                                      <Pause className="h-4 w-4 mr-1" /> Pause
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-success-70 border-success-70 hover:bg-success-10"
                                      onClick={() => updateJobStatus(job.id, "Completed")}
                                    >
                                      <Check className="h-4 w-4 mr-1" /> Complete
                                    </Button>
                                  </>
                                )}
                                {job.status === "Paused" && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-info-70 border-info-70 hover:bg-info-10"
                                      onClick={() => updateJobStatus(job.id, "In Progress")}
                                    >
                                      <Play className="h-4 w-4 mr-1" /> Resume
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-success-70 border-success-70 hover:bg-success-10"
                                      onClick={() => updateJobStatus(job.id, "Completed")}
                                    >
                                      <Check className="h-4 w-4 mr-1" /> Complete
                                    </Button>
                                  </>
                                )}
                                {job.status === "Completed" && (
                                  <span className="text-sm text-neutral-50 italic">Completed</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="plates">
                <div className="bg-white p-6 rounded-lg border">
                  <p className="text-neutral-50">Plates content for {currentStation} will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <StationSelector
        open={showStationSelector}
        onClose={() => setShowStationSelector(false)}
        onSelectStation={setCurrentStation}
      />
    </div>
  )
}
