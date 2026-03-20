"use client"
import { useState } from "react"
import {
  ChevronDown,
  Search,
  AlertTriangle,
  Camera,
  FileDown,
  Clock,
  CheckCircle2,
  Circle,
  X,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { ProductionStepProgress, IssueReasonCode, ProductionStepTiming } from "./production/types"
import { useNavigation } from "@/lib/navigation-context"

// Extended job data for the tracker view
interface TrackerJob {
  id: string
  orderId: string
  customer: string
  productType: string
  status: "Not Started" | "In Progress" | "Paused" | "Completed" | "On Hold"
  currentStep: string
  estimatedMinutes: number
  actualMinutes: number | null
  dueDate: string
  stepTimeline: ProductionStepTiming[]
}

// Sample tracker jobs
const sampleTrackerJobs: TrackerJob[] = [
  {
    id: "JOB-10234",
    orderId: "ORD-8821",
    customer: "Acme Corp",
    productType: "Photobooks",
    status: "In Progress",
    currentStep: "Printing",
    estimatedMinutes: 120,
    actualMinutes: 110,
    dueDate: "2025-05-22",
    stepTimeline: [
      { step: "Prepress", estimatedMinutes: 30, actualMinutes: 28, status: "completed" },
      { step: "Printing", estimatedMinutes: 60, actualMinutes: 55, status: "completed" },
      { step: "Cutting", estimatedMinutes: 20, actualMinutes: null, status: "in-progress" },
      { step: "Binding", estimatedMinutes: 25, actualMinutes: null, status: "pending" },
      { step: "QC", estimatedMinutes: 15, actualMinutes: null, status: "pending" },
    ],
  },
  {
    id: "JOB-10235",
    orderId: "ORD-8822",
    customer: "Beta Industries",
    productType: "Brochures",
    status: "In Progress",
    currentStep: "Cutting",
    estimatedMinutes: 90,
    actualMinutes: 105,
    dueDate: "2025-05-22",
    stepTimeline: [
      { step: "Prepress", estimatedMinutes: 20, actualMinutes: 22, status: "completed" },
      { step: "Printing", estimatedMinutes: 45, actualMinutes: 52, status: "completed" },
      { step: "Cutting", estimatedMinutes: 15, actualMinutes: 18, status: "in-progress" },
      { step: "Folding", estimatedMinutes: 10, actualMinutes: null, status: "pending" },
    ],
  },
  {
    id: "JOB-10236",
    orderId: "ORD-8823",
    customer: "Gamma LLC",
    productType: "Posters",
    status: "Completed",
    currentStep: "QC",
    estimatedMinutes: 60,
    actualMinutes: 58,
    dueDate: "2025-05-21",
    stepTimeline: [
      { step: "Prepress", estimatedMinutes: 15, actualMinutes: 14, status: "completed" },
      { step: "Printing", estimatedMinutes: 30, actualMinutes: 30, status: "completed" },
      { step: "Cutting", estimatedMinutes: 10, actualMinutes: 9, status: "completed" },
      { step: "QC", estimatedMinutes: 5, actualMinutes: 5, status: "completed" },
    ],
  },
  {
    id: "JOB-10237",
    orderId: "ORD-8824",
    customer: "Acme Corp",
    productType: "Business Cards",
    status: "On Hold",
    currentStep: "Printing",
    estimatedMinutes: 45,
    actualMinutes: 55,
    dueDate: "2025-05-23",
    stepTimeline: [
      { step: "Prepress", estimatedMinutes: 10, actualMinutes: 12, status: "completed" },
      { step: "Printing", estimatedMinutes: 20, actualMinutes: 28, status: "in-progress" },
      { step: "Cutting", estimatedMinutes: 10, actualMinutes: null, status: "pending" },
      { step: "QC", estimatedMinutes: 5, actualMinutes: null, status: "pending" },
    ],
  },
  {
    id: "JOB-10238",
    orderId: "ORD-8825",
    customer: "Delta Print Co",
    productType: "Photobooks",
    status: "Not Started",
    currentStep: "Prepress",
    estimatedMinutes: 150,
    actualMinutes: null,
    dueDate: "2025-05-24",
    stepTimeline: [
      { step: "Prepress", estimatedMinutes: 35, actualMinutes: null, status: "pending" },
      { step: "Printing", estimatedMinutes: 60, actualMinutes: null, status: "pending" },
      { step: "Cutting", estimatedMinutes: 20, actualMinutes: null, status: "pending" },
      { step: "Binding", estimatedMinutes: 25, actualMinutes: null, status: "pending" },
      { step: "QC", estimatedMinutes: 10, actualMinutes: null, status: "pending" },
    ],
  },
  {
    id: "JOB-10239",
    orderId: "ORD-8826",
    customer: "Beta Industries",
    productType: "Flyers",
    status: "In Progress",
    currentStep: "Printing",
    estimatedMinutes: 40,
    actualMinutes: 48,
    dueDate: "2025-05-22",
    stepTimeline: [
      { step: "Prepress", estimatedMinutes: 10, actualMinutes: 12, status: "completed" },
      { step: "Printing", estimatedMinutes: 20, actualMinutes: 24, status: "in-progress" },
      { step: "Cutting", estimatedMinutes: 10, actualMinutes: null, status: "pending" },
    ],
  },
]

// Sample data for production steps overview
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

export default function ProductionTracker() {
  const { navigateTo } = useNavigation()
  const [activeTab, setActiveTab] = useState("jobs")
  const [filterSteps, setFilterSteps] = useState("Steps")
  const [filterMachineTypes, setFilterMachineTypes] = useState("Machine types")
  const [filterMachineName, setFilterMachineName] = useState("Machine name")
  const [filterCustomers, setFilterCustomers] = useState("Customers")
  const [filterProductModel, setFilterProductModel] = useState("Product model")
  const [filterWorkflow, setFilterWorkflow] = useState("Workflow")

  // PRD 6: New filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [filterProductType, setFilterProductType] = useState("all")
  const [statusFilters, setStatusFilters] = useState<Record<string, boolean>>({
    "Not Started": true,
    "In Progress": true,
    "Paused": true,
    "Completed": true,
    "On Hold": true,
  })
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  // PRD 6: Exception logging modal
  const [issueModalOpen, setIssueModalOpen] = useState(false)
  const [issueJobId, setIssueJobId] = useState("")
  const [issueReasonCode, setIssueReasonCode] = useState<IssueReasonCode | "">("")
  const [issueDescription, setIssueDescription] = useState("")
  const [issueBlocking, setIssueBlocking] = useState(false)
  const [issueResolutionNotes, setIssueResolutionNotes] = useState("")
  const [issuePhotoAttached, setIssuePhotoAttached] = useState(false)
  const [issueSubmitted, setIssueSubmitted] = useState(false)

  // PRD 6: Expanded timeline row
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null)

  // PRD 6: PDF export simulated
  const [exportingPdf, setExportingPdf] = useState(false)

  // Filter jobs
  const filteredJobs = sampleTrackerJobs.filter((job) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (!job.id.toLowerCase().includes(q) && !job.orderId.toLowerCase().includes(q)) {
        return false
      }
    }
    if (filterProductType !== "all" && job.productType !== filterProductType) return false
    if (!statusFilters[job.status]) return false
    if (filterCustomers !== "Customers" && filterCustomers !== "All Customers" && job.customer !== filterCustomers) return false
    return true
  })

  const toggleStatus = (status: string) => {
    setStatusFilters((prev) => ({ ...prev, [status]: !prev[status] }))
  }

  // Variance helpers
  const getVariancePercent = (estimated: number, actual: number | null): number | null => {
    if (actual === null) return null
    return ((actual - estimated) / estimated) * 100
  }

  const getVarianceColor = (variance: number | null): string => {
    if (variance === null) return "text-neutral-50"
    if (variance <= 0) return "text-success-70"
    if (variance <= 10) return "text-caution-70"
    return "text-critical-70"
  }

  const getVarianceBg = (variance: number | null): string => {
    if (variance === null) return "bg-neutral-5"
    if (variance <= 0) return "bg-success-10"
    if (variance <= 10) return "bg-caution-10"
    return "bg-critical-10"
  }

  const getVarianceLabel = (variance: number | null): string => {
    if (variance === null) return "N/A"
    if (variance <= 0) return "On time"
    if (variance <= 10) return `+${variance.toFixed(1)}% delay`
    return `+${variance.toFixed(1)}% delay`
  }

  // Issue modal handlers
  const openIssueModal = (jobId: string) => {
    setIssueJobId(jobId)
    setIssueReasonCode("")
    setIssueDescription("")
    setIssueBlocking(false)
    setIssueResolutionNotes("")
    setIssuePhotoAttached(false)
    setIssueSubmitted(false)
    setIssueModalOpen(true)
  }

  const submitIssue = () => {
    setIssueSubmitted(true)
    setTimeout(() => {
      setIssueModalOpen(false)
    }, 1500)
  }

  // PDF export simulation
  const handleExportPdf = () => {
    setExportingPdf(true)
    setTimeout(() => {
      setExportingPdf(false)
      alert("PDF exported successfully (simulated)")
    }, 1500)
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

  // Step timeline component
  const renderStepTimeline = (steps: ProductionStepTiming[]) => {
    return (
      <div className="flex items-center gap-1 w-full overflow-x-auto py-3 px-4">
        {steps.map((step, i) => {
          const variance = getVariancePercent(step.estimatedMinutes, step.actualMinutes)
          const stepColor =
            step.status === "completed"
              ? variance !== null && variance > 10
                ? "border-critical-70 bg-critical-10"
                : variance !== null && variance > 0
                  ? "border-caution-70 bg-caution-10"
                  : "border-success-70 bg-success-10"
              : step.status === "in-progress"
                ? "border-info-70 bg-info-10"
                : "border-neutral-30 bg-neutral-5"

          const iconColor =
            step.status === "completed"
              ? variance !== null && variance > 10
                ? "text-critical-70"
                : variance !== null && variance > 0
                  ? "text-caution-70"
                  : "text-success-70"
              : step.status === "in-progress"
                ? "text-info-70"
                : "text-neutral-40"

          return (
            <div key={i} className="flex items-center">
              <div className={`flex flex-col items-center min-w-[100px]`}>
                <div className={`rounded-full border-2 p-1.5 ${stepColor}`}>
                  {step.status === "completed" ? (
                    <CheckCircle2 className={`h-4 w-4 ${iconColor}`} />
                  ) : step.status === "in-progress" ? (
                    <Clock className={`h-4 w-4 ${iconColor}`} />
                  ) : (
                    <Circle className={`h-4 w-4 ${iconColor}`} />
                  )}
                </div>
                <span className="text-xs font-medium mt-1 text-neutral-90">{step.step}</span>
                <span className="text-[10px] text-neutral-50">Est: {step.estimatedMinutes}m</span>
                {step.actualMinutes !== null && (
                  <span className={`text-[10px] font-medium ${getVarianceColor(getVariancePercent(step.estimatedMinutes, step.actualMinutes))}`}>
                    Act: {step.actualMinutes}m
                  </span>
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 w-6 mt-[-20px] ${
                    step.status === "completed" ? "bg-success-70" : "bg-neutral-20"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Production Tracker</h1>
          <Button
            variant="outline"
            onClick={handleExportPdf}
            disabled={exportingPdf}
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            {exportingPdf ? "Exporting..." : "Export PDF"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="overview">Step Overview</TabsTrigger>
            <TabsTrigger value="plates">Plates</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            {/* PRD 6: Comprehensive filter bar */}
            <div className="bg-white rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-40" />
                  <Input
                    placeholder="Search by Job ID or Order ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={filterCustomers === "Customers" ? "all" : filterCustomers} onValueChange={(v) => setFilterCustomers(v === "all" ? "Customers" : v)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                    <SelectItem value="Beta Industries">Beta Industries</SelectItem>
                    <SelectItem value="Gamma LLC">Gamma LLC</SelectItem>
                    <SelectItem value="Delta Print Co">Delta Print Co</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterProductType} onValueChange={setFilterProductType}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Product Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="Photobooks">Photobooks</SelectItem>
                    <SelectItem value="Brochures">Brochures</SelectItem>
                    <SelectItem value="Posters">Posters</SelectItem>
                    <SelectItem value="Business Cards">Business Cards</SelectItem>
                    <SelectItem value="Flyers">Flyers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-medium text-neutral-70">Status:</span>
                {["Not Started", "In Progress", "Paused", "Completed", "On Hold"].map((status) => (
                  <label key={status} className="flex items-center gap-1.5 cursor-pointer">
                    <Checkbox
                      checked={statusFilters[status]}
                      onCheckedChange={() => toggleStatus(status)}
                    />
                    <span className="text-sm text-neutral-70">{status}</span>
                  </label>
                ))}

                <div className="ml-auto flex items-center gap-2">
                  <span className="text-sm text-neutral-50">From:</span>
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-[140px] h-9 text-sm"
                  />
                  <span className="text-sm text-neutral-50">To:</span>
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-[140px] h-9 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* PRD 6: Enhanced job table with variance and timeline */}
            <div className="bg-white rounded-lg overflow-hidden border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-5 text-neutral-70">
                    <tr>
                      <th className="px-4 py-3 text-left w-8"></th>
                      <th className="px-4 py-3 text-left">Job ID</th>
                      <th className="px-4 py-3 text-left">Order ID</th>
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left">Product</th>
                      <th className="px-4 py-3 text-left">Current Step</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Time Variance</th>
                      <th className="px-4 py-3 text-left">Due Date</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredJobs.map((job) => {
                      const variance = getVariancePercent(job.estimatedMinutes, job.actualMinutes)
                      const isExpanded = expandedJobId === job.id

                      return (
                        <>
                          <tr key={job.id} className="hover:bg-neutral-5">
                            <td className="px-4 py-3">
                              <button
                                onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                                className="p-1 hover:bg-neutral-10 rounded transition-transform"
                              >
                                <ChevronRight
                                  className={`h-4 w-4 text-neutral-50 transition-transform ${
                                    isExpanded ? "rotate-90" : ""
                                  }`}
                                />
                              </button>
                            </td>
                            <td className="px-4 py-3 font-medium text-info-70">{job.id}</td>
                            <td className="px-4 py-3 text-neutral-70">{job.orderId}</td>
                            <td className="px-4 py-3">{job.customer}</td>
                            <td className="px-4 py-3">{job.productType}</td>
                            <td className="px-4 py-3">{job.currentStep}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  job.status === "In Progress"
                                    ? "bg-info-10 text-info-90"
                                    : job.status === "Completed"
                                      ? "bg-success-10 text-success-90"
                                      : job.status === "Paused"
                                        ? "bg-caution-10 text-caution-90"
                                        : job.status === "On Hold"
                                          ? "bg-critical-10 text-critical-90"
                                          : "bg-neutral-5 text-neutral-90"
                                }`}
                              >
                                {job.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${getVarianceBg(variance)} ${getVarianceColor(variance)}`}>
                                {variance !== null && variance <= 0 && <CheckCircle2 className="h-3 w-3" />}
                                {variance !== null && variance > 0 && variance <= 10 && <Clock className="h-3 w-3" />}
                                {variance !== null && variance > 10 && <AlertTriangle className="h-3 w-3" />}
                                {getVarianceLabel(variance)}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-neutral-70">{job.dueDate}</td>
                            <td className="px-4 py-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-caution-70 border-caution-70 hover:bg-caution-10"
                                onClick={() => openIssueModal(job.id)}
                              >
                                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                                Report Issue
                              </Button>
                            </td>
                          </tr>

                          {/* PRD 6: Expanded step timeline */}
                          {isExpanded && (
                            <tr key={`${job.id}-timeline`}>
                              <td colSpan={10} className="bg-neutral-5 border-t border-neutral-10">
                                <div className="px-6 py-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-semibold text-neutral-70 uppercase tracking-wider">
                                      Step Timeline
                                    </span>
                                    <span className="text-xs text-neutral-50">
                                      Est: {job.estimatedMinutes}m | Act: {job.actualMinutes ?? "N/A"}m
                                    </span>
                                  </div>
                                  {renderStepTimeline(job.stepTimeline)}
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

              {filteredJobs.length === 0 && (
                <div className="p-8 text-center text-neutral-50">
                  No jobs match the current filters.
                </div>
              )}
            </div>

            {/* Existing Cost Analysis section */}
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

          {/* Step Overview tab - relocated from old Jobs tab grid view */}
          <TabsContent value="overview" className="space-y-4">
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
                  <DropdownMenuItem onClick={() => setFilterMachineName("All Machines")}>All Machines</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterMachineName("Machine 1")}>Machine 1</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterMachineName("Machine 2")}>Machine 2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {filterProductModel} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterProductModel("All Products")}>All Products</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterProductModel("Photobooks")}>Photobooks</DropdownMenuItem>
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
                  <DropdownMenuItem onClick={() => setFilterWorkflow("All Workflows")}>All Workflows</DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="plates">
            <div className="bg-white p-6 rounded-lg border">
              <p className="text-neutral-50">Plates content will be displayed here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* PRD 6: Report Issue Modal */}
      <Dialog open={issueModalOpen} onOpenChange={setIssueModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Report Issue</DialogTitle>
            <DialogDescription>
              Log an exception for job {issueJobId}
            </DialogDescription>
          </DialogHeader>

          {issueSubmitted ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-success-70 mx-auto mb-3" />
              <p className="text-lg font-medium text-neutral-90">Issue Reported</p>
              <p className="text-sm text-neutral-50 mt-1">The issue has been logged successfully.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Reason Code</label>
                <Select value={issueReasonCode} onValueChange={(v) => setIssueReasonCode(v as IssueReasonCode)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Machine Error">Machine Error</SelectItem>
                    <SelectItem value="Material Defect">Material Defect</SelectItem>
                    <SelectItem value="Quality Issue">Quality Issue</SelectItem>
                    <SelectItem value="Operator Error">Operator Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Description</label>
                <textarea
                  className="w-full h-20 rounded-md border-0 ring-1 ring-inset ring-neutral-50 bg-white px-3 py-2 text-sm placeholder:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-90 resize-none"
                  placeholder="Describe the issue..."
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Photo Upload</label>
                <button
                  onClick={() => setIssuePhotoAttached(!issuePhotoAttached)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-md border border-dashed text-sm transition-colors ${
                    issuePhotoAttached
                      ? "border-success-70 bg-success-10 text-success-70"
                      : "border-neutral-30 text-neutral-50 hover:border-neutral-50"
                  }`}
                >
                  <Camera className="h-4 w-4" />
                  {issuePhotoAttached ? "Photo attached (simulated)" : "Click to attach photo"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-neutral-70">Blocking Issue</label>
                <Switch checked={issueBlocking} onCheckedChange={setIssueBlocking} />
              </div>
              {issueBlocking && (
                <p className="text-xs text-critical-70 -mt-2">
                  This will flag the job as blocked until resolved.
                </p>
              )}

              <div>
                <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Resolution Notes</label>
                <textarea
                  className="w-full h-16 rounded-md border-0 ring-1 ring-inset ring-neutral-50 bg-white px-3 py-2 text-sm placeholder:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-90 resize-none"
                  placeholder="How was/will this be resolved?"
                  value={issueResolutionNotes}
                  onChange={(e) => setIssueResolutionNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          {!issueSubmitted && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIssueModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={submitIssue}
                disabled={!issueReasonCode}
                className="bg-neutral-100 text-white hover:bg-neutral-90"
              >
                Submit Report
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
