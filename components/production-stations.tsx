"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import {
  Settings,
  ChevronDown,
  Play,
  Pause,
  Check,
  ScanBarcode,
  AlertTriangle,
  Camera,
  WifiOff,
  RefreshCw,
  ChevronUp,
  Undo2,
  X,
  Package,
  FileText,
  Layers,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
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
import StationSelector from "./production/station-selector"
import type { Job, ProductionStep, JobStatus, IssueReasonCode } from "./production/types"
import { useNavigation } from "@/lib/navigation-context"

// Extended sample data with specs/instructions/materials
const initialJobs: (Job & {
  specs: string
  stepInstructions: string
  materialsNeeded: string[]
  specialHandlingNotes: string
})[] = [
  {
    id: "7101205148",
    dispatchDate: "21.05.2025 16:00",
    productModel: "folded_product",
    part: "-",
    status: "Not Started",
    productionStep: "Printing",
    customer: "Acme Corp",
    specs: "A4, 4-color CMYK, 170gsm gloss art paper, double-sided",
    stepInstructions: "1. Load 170gsm gloss paper into tray 2.\n2. Run calibration test sheet.\n3. Print batch of 500 sheets.\n4. Verify color against proof.",
    materialsNeeded: ["170gsm Gloss Art Paper (A4)", "CMYK Ink Set C-2401", "Calibration Sheet"],
    specialHandlingNotes: "Customer requires exact Pantone 286 match. Use spectrophotometer for verification.",
  },
  {
    id: "7101205242",
    dispatchDate: "21.05.2025 16:00",
    productModel: "folded_product",
    part: "-",
    status: "Not Started",
    productionStep: "Printing",
    customer: "Beta Industries",
    specs: "A5, 2-color, 120gsm offset paper, single-sided",
    stepInstructions: "1. Load 120gsm offset paper.\n2. Set 2-color mode (Black + PMS 485).\n3. Print run of 1000.",
    materialsNeeded: ["120gsm Offset Paper (A5)", "Black Ink", "PMS 485 Red Ink"],
    specialHandlingNotes: "",
  },
  {
    id: "7101205149",
    dispatchDate: "21.05.2025 16:00",
    productModel: "folded_product",
    part: "-",
    status: "Not Started",
    productionStep: "Printing",
    customer: "Gamma LLC",
    specs: "DL, 4-color CMYK, 300gsm card, double-sided, matt lamination",
    stepInstructions: "1. Load 300gsm card stock.\n2. Print front side first.\n3. Allow 10min dry time.\n4. Print reverse side.\n5. Stack for lamination queue.",
    materialsNeeded: ["300gsm Card Stock (DL)", "CMYK Ink Set C-2401"],
    specialHandlingNotes: "Allow extra drying time between sides to prevent offsetting.",
  },
  {
    id: "7101205241",
    dispatchDate: "21.05.2025 16:00",
    productModel: "folded_product",
    part: "-",
    status: "Not Started",
    productionStep: "Printing",
    customer: "Delta Print Co",
    specs: "A3, full color, 200gsm silk coated, double-sided",
    stepInstructions: "1. Load A3 silk coated paper.\n2. Calibrate for silk finish.\n3. Print batch of 250.",
    materialsNeeded: ["200gsm Silk Coated Paper (A3)", "CMYK Ink Set C-2401"],
    specialHandlingNotes: "",
  },
  {
    id: "7101223035",
    dispatchDate: "22.05.2025 16:00",
    productModel: "photobook_inner_part",
    part: "photobook_inner_part_4-4_ver_custom_lt_100-lb-text-coated-gloss",
    status: "Not Started",
    productionStep: "Printing",
    customer: "Acme Corp",
    specs: "Custom size, 4/4 CMYK, 100lb text coated gloss",
    stepInstructions: "1. Load custom paper from shelf B-12.\n2. Run color calibration.\n3. Print inner pages sequence.\n4. Verify page order before stacking.",
    materialsNeeded: ["100lb Text Coated Gloss (Custom)", "CMYK Ink Set C-2401", "Proofing Sheet"],
    specialHandlingNotes: "Handle with cotton gloves. Pages must stay in exact order.",
  },
  {
    id: "7101228857",
    dispatchDate: "22.05.2025 16:00",
    productModel: "photobook_hard_cover_part",
    part: "photobook_hard_cover_part_matt-lamination_4-0_ver_custom_5x7_100-lb-text-coated-silk_1-0",
    status: "Not Started",
    productionStep: "Printing",
    customer: "Beta Industries",
    specs: "5x7, 4/0 CMYK, 100lb text coated silk, matt lamination finish",
    stepInstructions: "1. Load 100lb silk paper.\n2. Print cover front only (4/0).\n3. Route to lamination queue after drying.",
    materialsNeeded: ["100lb Text Coated Silk (5x7)", "CMYK Ink Set C-2401"],
    specialHandlingNotes: "Cover artwork is customer-supplied. Verify file version before printing.",
  },
  {
    id: "7101228856",
    dispatchDate: "22.05.2025 16:00",
    productModel: "photobook_end_sheet_part",
    part: "photobook_end_sheet_part_ver_5x7_100-lb-text-coated-silk",
    status: "Not Started",
    productionStep: "Printing",
    customer: "Gamma LLC",
    specs: "5x7, unprinted, 100lb text coated silk",
    stepInstructions: "1. Cut 100lb silk to 5x7 size.\n2. No printing required - pass to binding.",
    materialsNeeded: ["100lb Text Coated Silk (5x7)"],
    specialHandlingNotes: "",
  },
  {
    id: "7101223036",
    dispatchDate: "22.05.2025 16:00",
    productModel: "photobook_soft_cover_part",
    part: "photobook_soft_cover_part_glossy-lamination_4-4_ver_custom_lt_100-lb-cover-coated-gloss_1-0",
    status: "Not Started",
    productionStep: "Printing",
    customer: "Acme Corp",
    specs: "Custom LT, 4/4 CMYK, 100lb cover coated gloss, glossy lamination",
    stepInstructions: "1. Load 100lb cover gloss stock.\n2. Print front and back (4/4).\n3. Allow drying.\n4. Route to lamination (glossy).",
    materialsNeeded: ["100lb Cover Coated Gloss (Custom LT)", "CMYK Ink Set C-2401"],
    specialHandlingNotes: "Glossy lamination must be applied within 2 hours of printing.",
  },
]

// Undo toast state
interface UndoAction {
  jobId: string
  previousStatus: JobStatus
  newStatus: JobStatus
  timestamp: number
}

export default function ProductionStations() {
  const { navigateTo } = useNavigation()
  const [currentStation, setCurrentStation] = useState<ProductionStep>("Printing")
  const [showStationSelector, setShowStationSelector] = useState(false)
  const [jobs, setJobs] = useState<typeof initialJobs>(initialJobs)
  const [activeTab, setActiveTab] = useState("jobs")
  const [filterDays, setFilterDays] = useState("7 days ago")
  const [filterCustomers, setFilterCustomers] = useState("Customers")
  const [filterProductModel, setFilterProductModel] = useState("Product model")
  const [filterStatus, setFilterStatus] = useState("Status")
  const [filterCount, setFilterCount] = useState("10")

  // PRD 7: Barcode scanner input
  const [barcodeInput, setBarcodeInput] = useState("")
  const [scanHighlight, setScanHighlight] = useState<string | null>(null)
  const barcodeRef = useRef<HTMLInputElement>(null)

  // PRD 7: Expanded job detail
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null)

  // PRD 7: Undo toast
  const [undoAction, setUndoAction] = useState<UndoAction | null>(null)
  const [undoTimeLeft, setUndoTimeLeft] = useState(30)
  const undoTimerRef = useRef<NodeJS.Timeout | null>(null)

  // PRD 7: Offline indicator
  const [isOffline, setIsOffline] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState<string>("Just now")

  // PRD 7: Report Issue modal
  const [issueModalOpen, setIssueModalOpen] = useState(false)
  const [issueJobId, setIssueJobId] = useState("")
  const [issueReasonCode, setIssueReasonCode] = useState<IssueReasonCode | "">("")
  const [issueDescription, setIssueDescription] = useState("")
  const [issueBlocking, setIssueBlocking] = useState(false)
  const [issueResolutionNotes, setIssueResolutionNotes] = useState("")
  const [issuePhotoAttached, setIssuePhotoAttached] = useState(false)
  const [issueSubmitted, setIssueSubmitted] = useState(false)

  // Calculate completion percentage
  const completedJobs = jobs.filter((job) => job.status === "Completed").length
  const completionPercentage = jobs.length > 0 ? Math.round((completedJobs / jobs.length) * 100) : 0
  const remainingSteps = jobs.length - completedJobs

  // PRD 7: Simulated offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      setLastSyncTime("Just now")
    }
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // PRD 7: Undo timer
  useEffect(() => {
    if (undoAction) {
      setUndoTimeLeft(30)
      if (undoTimerRef.current) clearInterval(undoTimerRef.current)

      undoTimerRef.current = setInterval(() => {
        setUndoTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(undoTimerRef.current!)
            setUndoAction(null)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => {
        if (undoTimerRef.current) clearInterval(undoTimerRef.current)
      }
    }
  }, [undoAction])

  const performUndo = useCallback(() => {
    if (!undoAction) return
    setJobs((prev) =>
      prev.map((job) =>
        job.id === undoAction.jobId ? { ...job, status: undoAction.previousStatus } : job
      )
    )
    if (undoTimerRef.current) clearInterval(undoTimerRef.current)
    setUndoAction(null)
  }, [undoAction])

  const updateJobStatus = (jobId: string, newStatus: JobStatus) => {
    const currentJob = jobs.find((j) => j.id === jobId)
    if (!currentJob) return

    // Store undo action for Start/Complete actions
    if (newStatus === "In Progress" || newStatus === "Completed") {
      setUndoAction({
        jobId,
        previousStatus: currentJob.status,
        newStatus,
        timestamp: Date.now(),
      })
    }

    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          let timeInStation = job.timeInStation
          let startTime = job.startTime
          let totalTime = job.totalTime || 0
          let pausedTime = job.pausedTime

          const now = Date.now()

          if (newStatus === "In Progress" && job.status !== "In Progress") {
            startTime = now
            pausedTime = undefined
            timeInStation = "Just started"
          } else if (newStatus === "Paused" && job.status === "In Progress") {
            if (startTime) {
              totalTime += now - startTime
            }
            pausedTime = now
            timeInStation = formatTimeInStation(totalTime)
          } else if (newStatus === "Completed") {
            if (job.status === "In Progress" && startTime) {
              totalTime += now - startTime
            }
            timeInStation = formatTimeInStation(totalTime)
          }

          return { ...job, status: newStatus, timeInStation, startTime, totalTime, pausedTime }
        }
        return job
      })
    )
  }

  const formatTimeInStation = (ms: number): string => {
    if (!ms) return "0m"
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ${hours % 24}h`
    if (hours > 0) return `${hours}h ${minutes % 60}m`
    return `${minutes}m`
  }

  // PRD 7: Barcode scan handler
  const handleBarcodeScan = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && barcodeInput.trim()) {
      const scannedId = barcodeInput.trim()
      const job = jobs.find((j) => j.id === scannedId)
      if (job) {
        setScanHighlight(scannedId)
        setExpandedJobId(scannedId)
        setTimeout(() => setScanHighlight(null), 3000)
      } else {
        setScanHighlight("NOT_FOUND")
        setTimeout(() => setScanHighlight(null), 3000)
      }
      setBarcodeInput("")
    }
  }

  // PRD 7: Issue modal handlers
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
    setTimeout(() => setIssueModalOpen(false), 1500)
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* PRD 7: Offline indicator banner */}
      {isOffline && (
        <div className="bg-caution-100 text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="h-5 w-5" />
            <span className="text-sm font-medium">You are offline. Changes will sync when connection is restored.</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <RefreshCw className="h-4 w-4" />
            <span>Last sync: {lastSyncTime}</span>
          </div>
        </div>
      )}

      {/* Simulated offline toggle for demo */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white border rounded-lg px-3 py-1.5 shadow-sm">
        <WifiOff className="h-3.5 w-3.5 text-neutral-50" />
        <span className="text-xs text-neutral-50">Offline mode</span>
        <Switch checked={isOffline} onCheckedChange={setIsOffline} />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-neutral-50">Home</div>
            <h1 className="text-2xl font-bold">{currentStation}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowStationSelector(true)} className="min-h-[44px] text-base">
              Change station
            </Button>
            <Button variant="outline" size="icon" className="min-h-[44px] min-w-[44px]">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* PRD 7: Barcode scanner input */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <ScanBarcode className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-40" />
            <Input
              ref={barcodeRef}
              placeholder="Scan barcode or enter Job ID..."
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyDown={handleBarcodeScan}
              className="pl-10 h-12 text-base"
            />
          </div>
          {scanHighlight === "NOT_FOUND" && (
            <p className="text-sm text-critical-70 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> Job not found. Check ID and try again.
            </p>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="jobs" className="min-h-[44px] text-base px-6">Jobs</TabsTrigger>
            <TabsTrigger value="plates" className="min-h-[44px] text-base px-6">Plates</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden border">
              <div className="p-4 bg-gradient-to-r from-success-100 to-green-600 text-white">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-base">Completed</div>
                  <div className="font-medium text-right text-base">Production steps to complete</div>
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
                    <Button variant="outline" className="min-h-[44px] text-base">
                      {filterDays} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterDays("3 days ago")} className="min-h-[44px] text-base">3 days ago</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterDays("7 days ago")} className="min-h-[44px] text-base">7 days ago</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterDays("14 days ago")} className="min-h-[44px] text-base">14 days ago</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="min-h-[44px] text-base">
                      {filterCustomers} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterCustomers("All Customers")} className="min-h-[44px] text-base">All Customers</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterCustomers("Customer A")} className="min-h-[44px] text-base">Customer A</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterCustomers("Customer B")} className="min-h-[44px] text-base">Customer B</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="min-h-[44px] text-base">
                      {filterProductModel} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterProductModel("All Products")} className="min-h-[44px] text-base">All Products</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterProductModel("Photobooks")} className="min-h-[44px] text-base">Photobooks</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterProductModel("Brochures")} className="min-h-[44px] text-base">Brochures</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="min-h-[44px] text-base relative">
                      {filterStatus}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterStatus("All Status")} className="min-h-[44px] text-base">All Status</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("Not Started")} className="min-h-[44px] text-base">Not Started</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("In Progress")} className="min-h-[44px] text-base">In Progress</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("Completed")} className="min-h-[44px] text-base">Completed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="min-h-[44px] text-base">
                      {filterCount} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterCount("10")} className="min-h-[44px] text-base">10</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterCount("25")} className="min-h-[44px] text-base">25</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterCount("50")} className="min-h-[44px] text-base">50</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* PRD 7: Touch-optimized job list */}
              <div className="divide-y">
                {jobs.map((job) => {
                  const isExpanded = expandedJobId === job.id
                  const isHighlighted = scanHighlight === job.id

                  return (
                    <div
                      key={job.id}
                      className={`transition-colors ${
                        isHighlighted ? "bg-info-10 ring-2 ring-info-70 ring-inset" : ""
                      }`}
                    >
                      {/* Main job row - touch optimized */}
                      <div
                        className="px-4 py-3 hover:bg-neutral-5 cursor-pointer"
                        onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-base font-semibold text-info-70">{job.id}</span>
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
                              {job.timeInStation && (
                                <span className="text-xs text-neutral-50">{job.timeInStation}</span>
                              )}
                            </div>
                            <div className="text-sm text-neutral-70 truncate">
                              {job.productModel} {job.customer && <span className="text-neutral-40">| {job.customer}</span>}
                            </div>
                            <div className="text-xs text-neutral-50 mt-0.5">
                              Due: {job.dispatchDate}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* PRD 7: Start/Complete action buttons - 44px+ touch targets */}
                            {job.status === "Not Started" && (
                              <Button
                                className="min-h-[44px] min-w-[44px] bg-success-100 hover:bg-success-70 text-white text-base font-medium px-4"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  updateJobStatus(job.id, "In Progress")
                                }}
                              >
                                <Play className="h-5 w-5 mr-1.5" /> Start
                              </Button>
                            )}
                            {job.status === "In Progress" && (
                              <>
                                <Button
                                  variant="outline"
                                  className="min-h-[44px] min-w-[44px] text-caution-70 border-caution-70 hover:bg-caution-10 text-base px-4"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateJobStatus(job.id, "Paused")
                                  }}
                                >
                                  <Pause className="h-5 w-5 mr-1.5" /> Pause
                                </Button>
                                <Button
                                  className="min-h-[44px] min-w-[44px] bg-success-100 hover:bg-success-70 text-white text-base font-medium px-4"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateJobStatus(job.id, "Completed")
                                  }}
                                >
                                  <Check className="h-5 w-5 mr-1.5" /> Complete
                                </Button>
                              </>
                            )}
                            {job.status === "Paused" && (
                              <>
                                <Button
                                  className="min-h-[44px] min-w-[44px] bg-info-70 hover:bg-info-90 text-white text-base px-4"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateJobStatus(job.id, "In Progress")
                                  }}
                                >
                                  <Play className="h-5 w-5 mr-1.5" /> Resume
                                </Button>
                                <Button
                                  className="min-h-[44px] min-w-[44px] bg-success-100 hover:bg-success-70 text-white text-base font-medium px-4"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateJobStatus(job.id, "Completed")
                                  }}
                                >
                                  <Check className="h-5 w-5 mr-1.5" /> Complete
                                </Button>
                              </>
                            )}
                            {job.status === "Completed" && (
                              <span className="text-sm text-success-70 font-medium flex items-center gap-1">
                                <CheckCircle2 className="h-5 w-5" /> Done
                              </span>
                            )}

                            {/* PRD 7: Report Issue button */}
                            <Button
                              variant="outline"
                              className="min-h-[44px] min-w-[44px] text-caution-70 border-caution-70 hover:bg-caution-10"
                              onClick={(e) => {
                                e.stopPropagation()
                                openIssueModal(job.id)
                              }}
                            >
                              <AlertTriangle className="h-5 w-5" />
                            </Button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setExpandedJobId(isExpanded ? null : job.id)
                              }}
                              className="min-h-[44px] min-w-[44px] flex items-center justify-center"
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-neutral-50" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-neutral-50" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* PRD 7: Expanded job detail view */}
                      {isExpanded && (
                        <div className="px-4 pb-4 bg-neutral-5 border-t border-neutral-10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {/* Specs */}
                            <div className="bg-white rounded-lg p-4 border">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4 text-info-70" />
                                <h4 className="text-sm font-semibold text-neutral-90">Specifications</h4>
                              </div>
                              <p className="text-sm text-neutral-70 leading-relaxed">{job.specs}</p>
                              {job.part !== "-" && (
                                <div className="mt-2 text-xs text-neutral-50 bg-neutral-5 rounded px-2 py-1 font-mono break-all">
                                  {job.part}
                                </div>
                              )}
                            </div>

                            {/* Step Instructions */}
                            <div className="bg-white rounded-lg p-4 border">
                              <div className="flex items-center gap-2 mb-2">
                                <Layers className="h-4 w-4 text-info-70" />
                                <h4 className="text-sm font-semibold text-neutral-90">Step Instructions</h4>
                              </div>
                              <div className="text-sm text-neutral-70 whitespace-pre-line leading-relaxed">
                                {job.stepInstructions}
                              </div>
                            </div>

                            {/* Materials Needed */}
                            <div className="bg-white rounded-lg p-4 border">
                              <div className="flex items-center gap-2 mb-2">
                                <Package className="h-4 w-4 text-info-70" />
                                <h4 className="text-sm font-semibold text-neutral-90">Materials Needed</h4>
                              </div>
                              <ul className="space-y-1.5">
                                {job.materialsNeeded.map((mat, i) => (
                                  <li key={i} className="text-sm text-neutral-70 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-40 shrink-0" />
                                    {mat}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Special Handling Notes */}
                            {job.specialHandlingNotes && (
                              <div className="bg-caution-10 rounded-lg p-4 border border-caution-30">
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertTriangle className="h-4 w-4 text-caution-70" />
                                  <h4 className="text-sm font-semibold text-caution-90">Special Handling</h4>
                                </div>
                                <p className="text-sm text-caution-90 leading-relaxed">
                                  {job.specialHandlingNotes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plates">
            <div className="bg-white p-6 rounded-lg border">
              <p className="text-neutral-50 text-base">Plates content for {currentStation} will be displayed here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* PRD 7: Undo toast notification */}
      {undoAction && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-90 text-white rounded-lg shadow-xl px-5 py-3 flex items-center gap-4 min-w-[360px] animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex-1">
            <p className="text-sm font-medium">
              Job {undoAction.jobId} marked as {undoAction.newStatus}
            </p>
            <p className="text-xs text-neutral-30 mt-0.5">
              Undo available for {undoTimeLeft}s
            </p>
          </div>
          <div className="w-8 h-8 relative">
            <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray={`${(undoTimeLeft / 30) * 100} 100`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">
              {undoTimeLeft}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="min-h-[44px] bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white text-base"
            onClick={performUndo}
          >
            <Undo2 className="h-4 w-4 mr-1.5" /> Undo
          </Button>
          <button
            onClick={() => {
              if (undoTimerRef.current) clearInterval(undoTimerRef.current)
              setUndoAction(null)
            }}
            className="text-white/60 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* PRD 7: Report Issue Modal */}
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
                  <SelectTrigger className="min-h-[44px] text-base">
                    <SelectValue placeholder="Select reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Machine Error" className="min-h-[44px] text-base">Machine Error</SelectItem>
                    <SelectItem value="Material Defect" className="min-h-[44px] text-base">Material Defect</SelectItem>
                    <SelectItem value="Quality Issue" className="min-h-[44px] text-base">Quality Issue</SelectItem>
                    <SelectItem value="Operator Error" className="min-h-[44px] text-base">Operator Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Description</label>
                <textarea
                  className="w-full h-20 rounded-md border-0 ring-1 ring-inset ring-neutral-50 bg-white px-3 py-2 text-base placeholder:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-90 resize-none"
                  placeholder="Describe the issue..."
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Photo Upload</label>
                <button
                  onClick={() => setIssuePhotoAttached(!issuePhotoAttached)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-md border border-dashed text-base transition-colors min-h-[44px] ${
                    issuePhotoAttached
                      ? "border-success-70 bg-success-10 text-success-70"
                      : "border-neutral-30 text-neutral-50 hover:border-neutral-50"
                  }`}
                >
                  <Camera className="h-5 w-5" />
                  {issuePhotoAttached ? "Photo attached (simulated)" : "Tap to attach photo"}
                </button>
              </div>

              <div className="flex items-center justify-between min-h-[44px]">
                <label className="text-base font-medium text-neutral-70">Blocking Issue</label>
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
                  className="w-full h-16 rounded-md border-0 ring-1 ring-inset ring-neutral-50 bg-white px-3 py-2 text-base placeholder:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-90 resize-none"
                  placeholder="How was/will this be resolved?"
                  value={issueResolutionNotes}
                  onChange={(e) => setIssueResolutionNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          {!issueSubmitted && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIssueModalOpen(false)} className="min-h-[44px] text-base">
                Cancel
              </Button>
              <Button
                onClick={submitIssue}
                disabled={!issueReasonCode}
                className="bg-neutral-100 text-white hover:bg-neutral-90 min-h-[44px] text-base"
              >
                Submit Report
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <StationSelector
        open={showStationSelector}
        onClose={() => setShowStationSelector(false)}
        onSelectStation={setCurrentStation}
      />
    </div>
  )
}
