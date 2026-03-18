"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Filter,
  List,
  Sparkles,
  Settings,
  ChevronsUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Send,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import LeftMenu from "./left-menu"

interface SchedulingProps {
  onBackClick: () => void
  onInventoryClick: () => void
  onInventoryAllocationClick: () => void
  onOrderClick: () => void
  onControlPanelClick: () => void
  onPerformanceClick: () => void
  onCustomersClick: () => void
  onProductionTrackerClick: () => void
  onProductionStationsClick: () => void
}

export default function Scheduling({
  onBackClick,
  onInventoryClick,
  onInventoryAllocationClick,
  onOrderClick,
  onControlPanelClick,
  onPerformanceClick,
  onCustomersClick,
  onProductionTrackerClick,
  onProductionStationsClick,
}: SchedulingProps) {
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [viewMode, setViewMode] = useState("day")
  const [showRulesDialog, setShowRulesDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null)
  const [selectedProcessType, setSelectedProcessType] = useState<string | null>(null)
  const [draggedJob, setDraggedJob] = useState<string | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [showGangingRecommendations, setShowGangingRecommendations] = useState(false)

  // Sample data for machines
  const machines = [
    { id: "m1", name: "XL105 4 Colour", type: "printing", status: "active" },
    { id: "m2", name: "XL106 5 Colour", type: "printing", status: "active" },
    { id: "m3", name: "Laminator", type: "finishing", status: "active" },
    { id: "m4", name: "Cylinder", type: "cutting", status: "maintenance", maintenanceUntil: "2025-05-23 14:00" },
    { id: "m5", name: "Guillotine 115", type: "cutting", status: "active" },
    { id: "m6", name: "Platen", type: "cutting", status: "active" },
    { id: "m7", name: "KH82", type: "binding", status: "active" },
    { id: "m8", name: "ST450", type: "binding", status: "active" },
    { id: "m9", name: "New82", type: "finishing", status: "active" },
    { id: "m10", name: "CldB2", type: "finishing", status: "active" },
    { id: "m11", name: "Acora", type: "finishing", status: "active" },
  ]

  // Sample data for jobs with workflow steps and more details
  const jobs = [
    {
      id: "36142",
      name: "Product Catalog",
      customer: "PrintCo Ltd",
      quantity: 5000,
      dueDate: "2025-05-24",
      status: "scheduled",
      category: "Catalog",
      paper: "150gsm Gloss",
      steps: [
        {
          machine: "m1",
          startTime: "2025-05-22 08:00",
          endTime: "2025-05-22 09:30",
          duration: 90, // minutes
          type: "printing",
          status: "scheduled",
          operation: "4/0 Sheet Work",
        },
        {
          machine: "m5",
          startTime: "2025-05-22 10:00",
          endTime: "2025-05-22 11:00",
          duration: 60, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Cutting",
        },
        {
          machine: "m7",
          startTime: "2025-05-22 12:00",
          endTime: "2025-05-22 13:30",
          duration: 90, // minutes
          type: "binding",
          status: "scheduled",
          operation: "Perfect Binding",
        },
      ],
      color: "bg-blue-300",
    },
    {
      id: "36143",
      name: "Sales Brochure",
      customer: "TechStart Inc",
      quantity: 2500,
      dueDate: "2025-05-25",
      status: "scheduled",
      category: "Brochure",
      paper: "170gsm Silk",
      steps: [
        {
          machine: "m2",
          startTime: "2025-05-22 08:00",
          endTime: "2025-05-22 09:30",
          duration: 90, // minutes
          type: "printing",
          status: "scheduled",
          operation: "5/0 Sheet Work",
        },
        {
          machine: "m6",
          startTime: "2025-05-22 10:30",
          endTime: "2025-05-22 11:30",
          duration: 60, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Cutting",
        },
        {
          machine: "m3",
          startTime: "2025-05-22 12:30",
          endTime: "2025-05-22 13:30",
          duration: 60, // minutes
          type: "finishing",
          status: "scheduled",
          operation: "Laminating",
        },
      ],
      color: "bg-emerald-300",
    },
    {
      id: "36144",
      name: "Business Cards",
      customer: "Global Retail",
      quantity: 1000,
      dueDate: "2025-05-23",
      status: "scheduled",
      category: "Business Cards",
      paper: "350gsm Silk",
      steps: [
        {
          machine: "m1",
          startTime: "2025-05-22 09:45",
          endTime: "2025-05-22 10:45",
          duration: 60, // minutes
          type: "printing",
          status: "scheduled",
          operation: "4/4 Sheet Work",
        },
        {
          machine: "m5",
          startTime: "2025-05-22 11:15",
          endTime: "2025-05-22 11:45",
          duration: 30, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Cutting",
        },
      ],
      color: "bg-violet-300",
    },
    {
      id: "36145",
      name: "Flyers",
      customer: "Local Restaurant",
      quantity: 500,
      dueDate: "2025-05-23",
      status: "scheduled",
      category: "Flyers",
      paper: "130gsm Gloss",
      steps: [
        {
          machine: "m2",
          startTime: "2025-05-22 09:45",
          endTime: "2025-05-22 10:45",
          duration: 60, // minutes
          type: "printing",
          status: "scheduled",
          operation: "5/0 Sheet Work",
        },
        {
          machine: "m6",
          startTime: "2025-05-22 11:45",
          endTime: "2025-05-22 12:15",
          duration: 30, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Cutting",
        },
      ],
      color: "bg-amber-300",
    },
    {
      id: "36146",
      name: "Posters",
      customer: "Marketing Agency",
      quantity: 250,
      dueDate: "2025-05-24",
      status: "scheduled",
      category: "Posters",
      paper: "200gsm Gloss",
      steps: [
        {
          machine: "m1",
          startTime: "2025-05-22 11:00",
          endTime: "2025-05-22 12:30",
          duration: 90, // minutes
          type: "printing",
          status: "scheduled",
          operation: "4/0 Sheet Work",
        },
        {
          machine: "m5",
          startTime: "2025-05-22 13:00",
          endTime: "2025-05-22 13:30",
          duration: 30, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Cutting",
        },
      ],
      color: "bg-rose-300",
    },
    {
      id: "36147",
      name: "Annual Report",
      customer: "Finance Corp",
      quantity: 1000,
      dueDate: "2025-05-26",
      status: "scheduled",
      category: "Report",
      paper: "120gsm Uncoated",
      steps: [
        {
          machine: "m1",
          startTime: "2025-05-22 12:45",
          endTime: "2025-05-22 14:45",
          duration: 120, // minutes
          type: "printing",
          status: "scheduled",
          operation: "4/4 Sheet Work",
        },
        {
          machine: "m5",
          startTime: "2025-05-22 15:00",
          endTime: "2025-05-22 16:00",
          duration: 60, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Cutting",
        },
        {
          machine: "m7",
          startTime: "2025-05-22 16:30",
          endTime: "2025-05-22 18:30",
          duration: 120, // minutes
          type: "binding",
          status: "scheduled",
          operation: "Perfect Binding",
        },
      ],
      color: "bg-orange-300",
    },
    {
      id: "36148",
      name: "Packaging Boxes",
      customer: "Retail Solutions",
      quantity: 2000,
      dueDate: "2025-05-25",
      status: "scheduled",
      category: "Packaging",
      paper: "350gsm Board",
      steps: [
        {
          machine: "m2",
          startTime: "2025-05-22 11:00",
          endTime: "2025-05-22 13:30",
          duration: 150, // minutes
          type: "printing",
          status: "scheduled",
          operation: "5/0 Sheet Work",
        },
        {
          machine: "m4",
          startTime: "2025-05-23 09:00",
          endTime: "2025-05-23 11:00",
          duration: 120, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Die Cutting",
        },
        {
          machine: "m10",
          startTime: "2025-05-23 12:00",
          endTime: "2025-05-23 14:00",
          duration: 120, // minutes
          type: "finishing",
          status: "scheduled",
          operation: "Folding & Gluing",
        },
      ],
      color: "bg-teal-300",
    },
    {
      id: "36149",
      name: "Magazine",
      customer: "Publishing House",
      quantity: 3000,
      dueDate: "2025-05-27",
      status: "scheduled",
      category: "Magazine",
      paper: "115gsm Gloss",
      steps: [
        {
          machine: "m1",
          startTime: "2025-05-22 15:00",
          endTime: "2025-05-22 18:00",
          duration: 180, // minutes
          type: "printing",
          status: "scheduled",
          operation: "4/4 Sheet Work",
        },
        {
          machine: "m6",
          startTime: "2025-05-23 08:00",
          endTime: "2025-05-23 09:30",
          duration: 90, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Cutting",
        },
        {
          machine: "m8",
          startTime: "2025-05-23 10:30",
          endTime: "2025-05-23 12:30",
          duration: 120, // minutes
          type: "binding",
          status: "scheduled",
          operation: "Saddle Stitching",
        },
      ],
      color: "bg-pink-300",
    },
    {
      id: "36150",
      name: "Letterheads",
      customer: "Corporate Services",
      quantity: 5000,
      dueDate: "2025-05-24",
      status: "scheduled",
      category: "Stationery",
      paper: "100gsm Bond",
      steps: [
        {
          machine: "m2",
          startTime: "2025-05-22 13:45",
          endTime: "2025-05-22 15:15",
          duration: 90, // minutes
          type: "printing",
          status: "scheduled",
          operation: "5/0 Sheet Work",
        },
        {
          machine: "m5",
          startTime: "2025-05-22 16:15",
          endTime: "2025-05-22 17:15",
          duration: 60, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Cutting",
        },
      ],
      color: "bg-indigo-300",
    },
    {
      id: "36151",
      name: "Calendars",
      customer: "Marketing Solutions",
      quantity: 1500,
      dueDate: "2025-05-28",
      status: "scheduled",
      category: "Calendar",
      paper: "170gsm Silk",
      steps: [
        {
          machine: "m2",
          startTime: "2025-05-22 15:30",
          endTime: "2025-05-22 18:00",
          duration: 150, // minutes
          type: "printing",
          status: "scheduled",
          operation: "4/4 Sheet Work",
        },
        {
          machine: "m6",
          startTime: "2025-05-23 09:45",
          endTime: "2025-05-23 10:45",
          duration: 60, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Cutting",
        },
        {
          machine: "m11",
          startTime: "2025-05-23 12:00",
          endTime: "2025-05-23 14:00",
          duration: 120, // minutes
          type: "finishing",
          status: "scheduled",
          operation: "Wire Binding",
        },
      ],
      color: "bg-cyan-300",
    },
    {
      id: "36152",
      name: "Menus",
      customer: "Restaurant Chain",
      quantity: 800,
      dueDate: "2025-05-25",
      status: "scheduled",
      category: "Menu",
      paper: "300gsm Silk",
      steps: [
        {
          machine: "m3",
          startTime: "2025-05-22 08:00",
          endTime: "2025-05-22 10:00",
          duration: 120, // minutes
          type: "finishing",
          status: "scheduled",
          operation: "Laminating",
        },
        {
          machine: "m4",
          startTime: "2025-05-22 11:30",
          endTime: "2025-05-22 13:00",
          duration: 90, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Die Cutting",
        },
      ],
      color: "bg-lime-300",
    },
    {
      id: "36153",
      name: "Presentation Folders",
      customer: "Corporate Branding",
      quantity: 1200,
      dueDate: "2025-05-26",
      status: "scheduled",
      category: "Folders",
      paper: "350gsm Silk",
      steps: [
        {
          machine: "m3",
          startTime: "2025-05-22 10:30",
          endTime: "2025-05-22 12:00",
          duration: 90, // minutes
          type: "finishing",
          status: "scheduled",
          operation: "Laminating",
        },
        {
          machine: "m4",
          startTime: "2025-05-23 13:30",
          endTime: "2025-05-23 15:00",
          duration: 90, // minutes
          type: "cutting",
          status: "scheduled",
          operation: "Die Cutting",
        },
        {
          machine: "m9",
          startTime: "2025-05-23 16:00",
          endTime: "2025-05-23 17:30",
          duration: 90, // minutes
          type: "finishing",
          status: "scheduled",
          operation: "Folding & Gluing",
        },
      ],
      color: "bg-slate-300",
    },
    {
      id: "36154",
      name: "Product Labels",
      customer: "Food Company",
      quantity: 10000,
      dueDate: "2025-05-23",
      status: "scheduled",
      category: "Labels",
      paper: "Self-adhesive",
      steps: [
        {
          machine: "m7",
          startTime: "2025-05-22 08:00",
          endTime: "2025-05-22 11:30",
          duration: 210, // minutes
          type: "binding",
          status: "scheduled",
          operation: "Label Application",
        },
        {
          machine: "m10",
          startTime: "2025-05-22 13:00",
          endTime: "2025-05-22 15:00",
          duration: 120, // minutes
          type: "finishing",
          status: "scheduled",
          operation: "Varnishing",
        },
      ],
      color: "bg-purple-300",
    },
    {
      id: "36155",
      name: "Wedding Invitations",
      customer: "Wedding Planner",
      quantity: 200,
      dueDate: "2025-05-24",
      status: "scheduled",
      category: "Invitations",
      paper: "300gsm Uncoated",
      steps: [
        {
          machine: "m8",
          startTime: "2025-05-22 08:00",
          endTime: "2025-05-22 10:00",
          duration: 120, // minutes
          type: "binding",
          status: "scheduled",
          operation: "Foil Stamping",
        },
        {
          machine: "m9",
          startTime: "2025-05-22 11:00",
          endTime: "2025-05-22 13:00",
          duration: 120, // minutes
          type: "finishing",
          status: "scheduled",
          operation: "Embossing",
        },
        {
          machine: "m11",
          startTime: "2025-05-22 14:00",
          endTime: "2025-05-22 16:00",
          duration: 120, // minutes
          type: "finishing",
          status: "scheduled",
          operation: "Hand Finishing",
        },
      ],
      color: "bg-fuchsia-300",
    },
    {
      id: "36156",
      name: "Corporate Envelopes",
      customer: "Legal Firm",
      quantity: 3000,
      dueDate: "2025-05-25",
      status: "scheduled",
      category: "Stationery",
      paper: "120gsm Uncoated",
      steps: [
        {
          machine: "m8",
          startTime: "2025-05-22 10:30",
          endTime: "2025-05-22 12:30",
          duration: 120, // minutes
          type: "binding",
          status: "scheduled",
          operation: "Envelope Making",
        },
        {
          machine: "m9",
          startTime: "2025-05-22 13:30",
          endTime: "2025-05-22 15:30",
          duration: 120, // minutes
          type: "finishing",
          status: "scheduled",
          operation: "Packing",
        },
      ],
      color: "bg-yellow-300",
    },
  ]

  // Sample data for ganging suggestions
  const gangingSuggestions = [
    {
      id: "gang-1",
      jobs: ["36144", "36146"],
      savings: "32%",
      reason: "Same paper type (150gsm Gloss), compatible sizes",
    },
    {
      id: "gang-2",
      jobs: ["36142", "36143"],
      savings: "18%",
      reason: "Similar color requirements, compatible finishing",
    },
  ]

  // Generate time slots for the timeline
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour}:00`)
      if (viewMode === "day") {
        slots.push(`${hour}:30`)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  // Generate days for week view
  const generateWeekDays = () => {
    const days = []
    const currentDate = new Date(selectedDate)
    // Set to Monday of the current week
    const day = currentDate.getDay()
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1)
    currentDate.setDate(diff)

    for (let i = 0; i < 5; i++) {
      const date = new Date(currentDate)
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    return days
  }

  const weekDays = generateWeekDays()

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  // Navigate to previous/next day or week
  const navigatePrevious = () => {
    const newDate = new Date(selectedDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() - 1)
    } else {
      newDate.setDate(newDate.getDate() - 7)
    }
    setSelectedDate(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(selectedDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + 1)
    } else {
      newDate.setDate(newDate.getDate() + 7)
    }
    setSelectedDate(newDate)
  }

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, jobId: string, stepIndex: number) => {
    e.dataTransfer.setData("jobId", jobId)
    e.dataTransfer.setData("stepIndex", stepIndex.toString())
    setDraggedJob(jobId)
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent, machineId: string, timeSlot: string) => {
    e.preventDefault()
    const jobId = e.dataTransfer.getData("jobId")
    const stepIndex = Number.parseInt(e.dataTransfer.getData("stepIndex"))

    // In a real application, you would update the job's machine and time here
    console.log(`Moved job ${jobId} step ${stepIndex} to machine ${machineId} at time ${timeSlot}`)

    // Reset dragged job
    setDraggedJob(null)
  }

  // Filter jobs by machine and get steps
  const getJobStepsForMachine = (machineId: string) => {
    const steps = []
    for (const job of jobs) {
      for (let i = 0; i < job.steps.length; i++) {
        const step = job.steps[i]
        if (step.machine === machineId) {
          steps.push({
            ...step,
            jobId: job.id,
            jobName: job.name,
            color: job.color,
            stepIndex: i,
            category: job.category,
            paper: job.paper,
          })
        }
      }
    }
    return steps
  }

  // Filter jobs by selected job
  const getSelectedJobSteps = () => {
    if (!selectedJob) return []

    const job = jobs.find((j) => j.id === selectedJob)
    if (!job) return []

    return job.steps.map((step, index) => {
      const machine = machines.find((m) => m.id === step.machine)
      return {
        ...step,
        jobId: job.id,
        jobName: job.name,
        color: job.color,
        stepIndex: index,
        machineName: machine?.name || "",
        category: job.category,
        paper: job.paper,
      }
    })
  }

  // Calculate position for a job step in the timeline
  const calculateStepPosition = (startTime: string, endTime: string) => {
    const startHour = Number.parseInt(startTime.split(" ")[1].split(":")[0])
    const endHour = Number.parseInt(endTime.split(" ")[1].split(":")[0])
    const startMinutes = Number.parseInt(startTime.split(" ")[1].split(":")[1])
    const endMinutes = Number.parseInt(endTime.split(" ")[1].split(":")[1])

    const startPosition = ((startHour - 8 + startMinutes / 60) / (18 - 8 + (viewMode === "day" ? 0 : 0))) * 100
    const endPosition = ((endHour - 8 + endMinutes / 60) / (18 - 8 + (viewMode === "day" ? 0 : 0))) * 100
    const width = endPosition - startPosition

    return { startPosition, width }
  }

  // Handle navigation from left menu
  const handleMenuNavigation = (page: string) => {
    if (page === "orders") {
      onBackClick()
    }
    if (page === "inventory") {
      onInventoryClick()
    }
    if (page === "allocation") {
      onInventoryAllocationClick()
    }
    if (page === "control-panel") {
      onControlPanelClick()
    }
    if (page === "performance") {
      onPerformanceClick()
    }
    if (page === "customers") {
      onCustomersClick()
    }
    if (page === "estimates") {
      onBackClick()
    }
    if (page === "production-tracker") {
      onProductionTrackerClick()
    }
    if (page === "production-stations") {
      onProductionStationsClick()
    }
  }

  // Update time slots when view mode changes
  useEffect(() => {
    generateTimeSlots()
  }, [viewMode])

  // Filter machines based on selected process type
  const filteredMachines = selectedProcessType ? machines.filter((m) => m.type === selectedProcessType) : machines

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
            Back to Manage Orders
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
        <LeftMenu activePage="scheduling" onNavigate={handleMenuNavigation} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Production Scheduling</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setShowRulesDialog(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Scheduling Rules
                </Button>
                <Button
                  variant={showAIPanel ? "default" : "outline"}
                  onClick={() => setShowAIPanel(!showAIPanel)}
                  className={showAIPanel ? "bg-info-70 hover:bg-info-90" : ""}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  ConnectAI
                </Button>
              </div>
            </div>

            {/* Filters - Row 1 */}
            <div className="flex items-center gap-4 mb-4">
              <Tabs defaultValue={viewMode} onValueChange={setViewMode}>
                <TabsList>
                  <TabsTrigger value="week">
                    <Calendar className="h-4 w-4 mr-2" />
                    Week
                  </TabsTrigger>
                  <TabsTrigger value="day">
                    <Clock className="h-4 w-4 mr-2" />
                    Day
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="h-4 w-4 mr-2" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={navigatePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="font-medium">
                  {viewMode === "day"
                    ? formatDate(selectedDate)
                    : `${formatDate(weekDays[0])} - ${formatDate(weekDays[4])}`}
                </div>
                <Button variant="outline" size="sm" onClick={navigateNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative ml-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-50" />
                <Input type="search" placeholder="Search jobs..." className="pl-8 w-[250px]" />
              </div>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Filters - Row 2 */}
            <div className="flex items-center gap-4 mb-4">
              <Select
                value={selectedJob || "all-jobs"}
                onValueChange={(value) => setSelectedJob(value === "all-jobs" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-jobs">All Jobs</SelectItem>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      #{job.id} - {job.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedMachine || "all-machines"}
                onValueChange={(value) => setSelectedMachine(value === "all-machines" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Machine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-machines">All Machines</SelectItem>
                  {machines.map((machine) => (
                    <SelectItem key={machine.id} value={machine.id}>
                      {machine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedProcessType || "all-types"}
                onValueChange={(value) => setSelectedProcessType(value === "all-types" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Process Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="printing">Printing</SelectItem>
                  <SelectItem value="cutting">Cutting</SelectItem>
                  <SelectItem value="binding">Binding</SelectItem>
                  <SelectItem value="finishing">Finishing</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-customers">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-customers">All Customers</SelectItem>
                  {Array.from(new Set(jobs.map((job) => job.customer))).map((customer) => (
                    <SelectItem key={customer} value={customer.toLowerCase().replace(/\s+/g, "-")}>
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue="all-categories">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Product Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {Array.from(new Set(jobs.map((job) => job.category))).map((category) => (
                    <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue="all-papers">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Paper Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-papers">All Paper Types</SelectItem>
                  {Array.from(new Set(jobs.map((job) => job.paper))).map((paper) => (
                    <SelectItem key={paper} value={paper.toLowerCase().replace(/\s+/g, "-")}>
                      {paper}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ConnectAI Recommendation */}
            <div className="mb-4 bg-info-10 border border-info-10 rounded-md p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-info-70" />
                <span className="text-sm">
                  <span className="font-medium">ConnectAI:</span> Ganging opportunities found that could save up to 32%
                  on materials.
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowGangingRecommendations(true)}>
                View Recommendations
              </Button>
            </div>

            <div className="flex gap-6 h-full">
              {/* Main Schedule View */}
              <div className={`border rounded-md flex-1 overflow-hidden ${showAIPanel ? "w-2/3" : "w-full"}`}>
                {viewMode === "list" ? (
                  <div className="p-4">
                    {selectedJob ? (
                      <div>
                        <h3 className="font-medium mb-4">
                          Job Workflow: #{selectedJob} - {jobs.find((j) => j.id === selectedJob)?.name}
                        </h3>
                        <table className="w-full">
                          <thead>
                            <tr className="bg-neutral-5 border-b">
                              <th className="p-3 text-left font-medium text-neutral-60">Step</th>
                              <th className="p-3 text-left font-medium text-neutral-60">Machine</th>
                              <th className="p-3 text-left font-medium text-neutral-60">Operation</th>
                              <th className="p-3 text-left font-medium text-neutral-60">Start Time</th>
                              <th className="p-3 text-left font-medium text-neutral-60">End Time</th>
                              <th className="p-3 text-left font-medium text-neutral-60">Duration</th>
                              <th className="p-3 text-left font-medium text-neutral-60">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getSelectedJobSteps().map((step, index) => (
                              <tr key={index} className="border-b hover:bg-neutral-5">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{step.machineName}</td>
                                <td className="p-3">{step.operation}</td>
                                <td className="p-3">{step.startTime}</td>
                                <td className="p-3">{step.endTime}</td>
                                <td className="p-3">{step.duration} min</td>
                                <td className="p-3">
                                  <Badge className="bg-info-10 text-info-90 capitalize">{step.status}</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div>
                        {filteredMachines.map((machine) => {
                          const machineSteps = getJobStepsForMachine(machine.id)
                          if (machineSteps.length === 0) return null

                          return (
                            <div key={machine.id} className="mb-6">
                              <h3 className="font-medium mb-2 flex items-center">
                                {machine.name}
                                <span className="text-sm text-neutral-50 ml-2 capitalize">({machine.type})</span>
                              </h3>
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-neutral-5 border-b">
                                    <th className="p-2 text-left font-medium text-neutral-60">Order ID</th>
                                    <th className="p-2 text-left font-medium text-neutral-60">Job Name</th>
                                    <th className="p-2 text-left font-medium text-neutral-60">Category</th>
                                    <th className="p-2 text-left font-medium text-neutral-60">Paper</th>
                                    <th className="p-2 text-left font-medium text-neutral-60">Operation</th>
                                    <th className="p-2 text-left font-medium text-neutral-60">Start Time</th>
                                    <th className="p-2 text-left font-medium text-neutral-60">Duration</th>
                                    <th className="p-2 text-left font-medium text-neutral-60">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {machineSteps.map((step, index) => (
                                    <tr
                                      key={`${step.jobId}-${step.stepIndex}`}
                                      className="border-b hover:bg-neutral-5 cursor-pointer"
                                      onClick={() => setSelectedJob(step.jobId)}
                                    >
                                      <td className="p-2 font-mono text-sm">{step.jobId}</td>
                                      <td className="p-2">{step.jobName}</td>
                                      <td className="p-2">{step.category}</td>
                                      <td className="p-2">{step.paper}</td>
                                      <td className="p-2">{step.operation}</td>
                                      <td className="p-2">{step.startTime}</td>
                                      <td className="p-2">{step.duration} min</td>
                                      <td className="p-2">
                                        <Badge className="bg-info-10 text-info-90 capitalize">{step.status}</Badge>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ) : viewMode === "day" ? (
                  <div className="p-4 h-full">
                    <div className="flex mb-2">
                      <div className="w-48"></div>
                      {timeSlots.map((slot) => (
                        <div key={slot} className="flex-1 text-center text-xs font-medium">
                          {slot}
                        </div>
                      ))}
                    </div>
                    <div className="overflow-auto h-full" ref={timelineRef}>
                      {filteredMachines
                        .filter(
                          (m) =>
                            !selectedMachine ||
                            m.id === selectedMachine ||
                            !selectedJob ||
                            jobs.some((j) => j.id === selectedJob && j.steps.some((s) => s.machine === m.id)),
                        )
                        .map((machine) => (
                          <div key={machine.id} className="flex mb-4">
                            <div className="w-48 pr-4 flex items-center">
                              <div>
                                <div className="font-medium">{machine.name}</div>
                                <div className="text-xs text-neutral-50 capitalize">{machine.type}</div>
                                {machine.status === "maintenance" ? (
                                  <Badge className="bg-warning-10 text-warning-90">
                                    Maintenance until {machine.maintenanceUntil}
                                  </Badge>
                                ) : (
                                  <Badge className="bg-success-10 text-success-90">Available</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 relative border bg-neutral-5 rounded-md h-16">
                              {timeSlots.map((slot, index) => (
                                <div
                                  key={slot}
                                  className="absolute top-0 bottom-0 border-l border-neutral-20"
                                  style={{
                                    left: `${(index / timeSlots.length) * 100}%`,
                                    width: `${(1 / timeSlots.length) * 100}%`,
                                  }}
                                  onDragOver={handleDragOver}
                                  onDrop={(e) => handleDrop(e, machine.id, slot)}
                                ></div>
                              ))}

                              {getJobStepsForMachine(machine.id)
                                .filter((step) => !selectedJob || step.jobId === selectedJob)
                                .map((step) => {
                                  const { startPosition, width } = calculateStepPosition(step.startTime, step.endTime)

                                  return (
                                    <div
                                      key={`${step.jobId}-${step.stepIndex}`}
                                      className={`absolute top-1 bottom-1 rounded-md ${step.color} text-white p-1 cursor-move text-xs flex items-center overflow-hidden ${draggedJob === step.jobId ? "opacity-50" : ""}`}
                                      style={{
                                        left: `${startPosition}%`,
                                        width: `${width}%`,
                                      }}
                                      draggable
                                      onDragStart={(e) => handleDragStart(e, step.jobId, step.stepIndex)}
                                      title={`#${step.jobId} - ${step.jobName} - ${step.operation} (${step.startTime} - ${step.endTime})`}
                                    >
                                      <div className="truncate">
                                        #{step.jobId} - {step.operation}
                                      </div>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  // Week view
                  <div className="p-4 h-full">
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {weekDays.map((day, index) => (
                        <div key={index} className="text-center font-medium">
                          {formatDate(day)}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-5 gap-2 h-[calc(100%-2rem)]">
                      {weekDays.map((day, dayIndex) => (
                        <div key={dayIndex} className="border rounded-md overflow-auto h-full">
                          {filteredMachines
                            .filter(
                              (m) =>
                                !selectedMachine ||
                                m.id === selectedMachine ||
                                !selectedJob ||
                                jobs.some((j) => j.id === selectedJob && j.steps.some((s) => s.machine === m.id)),
                            )
                            .map((machine) => (
                              <div key={machine.id} className="p-2 border-b">
                                <div className="font-medium text-sm">{machine.name}</div>
                                <div className="text-xs text-neutral-50 capitalize">{machine.type}</div>
                                <div className="mt-1 relative h-12 bg-neutral-5 rounded">
                                  {getJobStepsForMachine(machine.id)
                                    .filter((step) => !selectedJob || step.jobId === selectedJob)
                                    .filter((step) => {
                                      // Simple filter for demo - in real app would check date properly
                                      return dayIndex === 0 // Only show on first day for demo
                                    })
                                    .map((step) => {
                                      const { startPosition, width } = calculateStepPosition(
                                        step.startTime,
                                        step.endTime,
                                      )

                                      return (
                                        <div
                                          key={`${step.jobId}-${step.stepIndex}`}
                                          className={`absolute top-1 bottom-1 rounded-md ${step.color} text-white p-1 cursor-move text-xs flex items-center overflow-hidden`}
                                          style={{
                                            left: `${startPosition}%`,
                                            width: `${width}%`,
                                          }}
                                          title={`#${step.jobId} - ${step.jobName} - ${step.operation}`}
                                        >
                                          <div className="truncate">#{step.jobId}</div>
                                        </div>
                                      )
                                    })}
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* AI Panel */}
              {showAIPanel && (
                <div className="w-1/3 border rounded-md overflow-hidden flex flex-col">
                  <div className="bg-white p-4 border-b flex items-center justify-between">
                    <h3 className="font-semibold flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-info-70" />
                      ConnectAI
                    </h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowAIPanel(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 flex items-center justify-center p-6">
                      <div className="text-center max-w-md">
                        <h3 className="text-lg font-medium mb-2">What would you like to optimize?</h3>
                        <p className="text-sm text-neutral-50 mb-6">
                          Describe your scheduling needs or ask how I can help optimize your production workflow
                        </p>
                        <Textarea
                          placeholder="Describe the scheduling help you need..."
                          className="min-h-[120px] mb-4"
                        />
                        <div className="flex justify-between items-center">
                          <button className="text-sm text-info-70 hover:underline">Show me an example</button>
                          <Button>
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scheduling Rules Configuration Dialog */}
      <Dialog open={showRulesDialog} onOpenChange={setShowRulesDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Scheduling Rules Configuration</DialogTitle>
            <DialogDescription>
              Configure rules that determine how jobs are automatically scheduled and optimized.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="general" className="flex-1 overflow-hidden">
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="sequencing">Sequencing</TabsTrigger>
              <TabsTrigger value="ganging">Ganging</TabsTrigger>
              <TabsTrigger value="machine">Machine Constraints</TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 h-[60vh]">
              <TabsContent value="general" className="p-1">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Priority Settings</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="due-date-weight">Due Date Weight</Label>
                        <Select defaultValue="high">
                          <SelectTrigger id="due-date-weight">
                            <SelectValue placeholder="Select weight" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customer-priority-weight">Customer Priority Weight</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="customer-priority-weight">
                            <SelectValue placeholder="Select weight" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Optimization Settings</h3>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-optimize">Auto-optimize Schedule Daily</Label>
                        <Switch id="auto-optimize" defaultChecked />
                      </div>
                      <p className="text-sm text-neutral-50">
                        When enabled, the system will automatically optimize the schedule at 6:00 AM each day.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-approve-savings">Auto-approve if Savings {">"} 20%</Label>
                        <Switch id="auto-approve-savings" />
                      </div>
                      <p className="text-sm text-neutral-50">
                        Automatically approve ganging suggestions that result in savings greater than 20%.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="optimization-goal">Primary Optimization Goal</Label>
                      <Select defaultValue="balance">
                        <SelectTrigger id="optimization-goal">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimize-makespan">Minimize Makespan</SelectItem>
                          <SelectItem value="maximize-utilization">Maximize Machine Utilization</SelectItem>
                          <SelectItem value="minimize-tardiness">Minimize Tardiness</SelectItem>
                          <SelectItem value="balance">Balance All Factors</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sequencing" className="p-1">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Sequencing Rules</h3>
                    <Button variant="outline" size="sm">
                      <ChevronsUpDown className="h-4 w-4 mr-2" />
                      Reorder Rules
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Paper Weight Sequencing</CardTitle>
                          <Switch defaultChecked />
                        </div>
                        <CardDescription>Sequence jobs from lightest to heaviest paper weight</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>If Paper Type</Label>
                              <Select defaultValue="all">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Types</SelectItem>
                                  <SelectItem value="coated">Coated</SelectItem>
                                  <SelectItem value="uncoated">Uncoated</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Machine</Label>
                              <Select defaultValue="all">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select machine" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Machines</SelectItem>
                                  {machines.map((machine) => (
                                    <SelectItem key={machine.id} value={machine.id}>
                                      {machine.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Priority</Label>
                              <Select defaultValue="high">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Color Sequence</CardTitle>
                          <Switch defaultChecked />
                        </div>
                        <CardDescription>Sequence jobs from light to dark colors</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>If Machine</Label>
                              <Select defaultValue="m1">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select machine" />
                                </SelectTrigger>
                                <SelectContent>
                                  {machines.map((machine) => (
                                    <SelectItem key={machine.id} value={machine.id}>
                                      {machine.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>And Job Type</Label>
                              <Select defaultValue="all">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Types</SelectItem>
                                  <SelectItem value="brochure">Brochure</SelectItem>
                                  <SelectItem value="catalog">Catalog</SelectItem>
                                  <SelectItem value="flyer">Flyer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Priority</Label>
                              <Select defaultValue="medium">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Button className="w-full">+ Add Sequencing Rule</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ganging" className="p-1">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Ganging Rules</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="enable-ganging" defaultChecked />
                        <Label htmlFor="enable-ganging">Enable Ganging</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Compatible Products</CardTitle>
                          <Switch defaultChecked />
                        </div>
                        <CardDescription>Define which product types can be ganged together</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Product Type 1</Label>
                              <Select defaultValue="business-cards">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="business-cards">Business Cards</SelectItem>
                                  <SelectItem value="flyers">Flyers</SelectItem>
                                  <SelectItem value="postcards">Postcards</SelectItem>
                                  <SelectItem value="brochures">Brochures</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Product Type 2</Label>
                              <Select defaultValue="postcards">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="business-cards">Business Cards</SelectItem>
                                  <SelectItem value="flyers">Flyers</SelectItem>
                                  <SelectItem value="postcards">Postcards</SelectItem>
                                  <SelectItem value="brochures">Brochures</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Compatibility Conditions</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="same-paper" defaultChecked />
                                <Label htmlFor="same-paper">Must use same paper type</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="same-finish" defaultChecked />
                                <Label htmlFor="same-finish">Must have same finishing requirements</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="same-delivery" />
                                <Label htmlFor="same-delivery">Must have same delivery date (±1 day)</Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Minimum Savings Threshold</CardTitle>
                          <Switch defaultChecked />
                        </div>
                        <CardDescription>Only suggest ganging if it meets minimum savings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Minimum Material Savings</Label>
                              <Select defaultValue="10">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select percentage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5">5%</SelectItem>
                                  <SelectItem value="10">10%</SelectItem>
                                  <SelectItem value="15">15%</SelectItem>
                                  <SelectItem value="20">20%</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Minimum Time Savings</Label>
                              <Select defaultValue="5">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select percentage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5">5%</SelectItem>
                                  <SelectItem value="10">10%</SelectItem>
                                  <SelectItem value="15">15%</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Button className="w-full">+ Add Ganging Rule</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="machine" className="p-1">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Machine Constraints</h3>

                  <div className="space-y-4">
                    {machines.map((machine) => (
                      <Card key={machine.id}>
                        <CardHeader className="py-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{machine.name}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Operating Hours</Label>
                                <Select defaultValue="standard">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select hours" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="standard">Standard (8:00 - 17:00)</SelectItem>
                                    <SelectItem value="extended">Extended (6:00 - 22:00)</SelectItem>
                                    <SelectItem value="24h">24 Hours</SelectItem>
                                    <SelectItem value="custom">Custom</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label>Maximum Jobs Per Day</Label>
                                <Select defaultValue="10">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select maximum" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="15">15</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="unlimited">Unlimited</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Compatible Product Types</Label>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id={`${machine.id}-brochures`} defaultChecked />
                                  <Label htmlFor={`${machine.id}-brochures`}>Brochures</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id={`${machine.id}-catalogs`} defaultChecked />
                                  <Label htmlFor={`${machine.id}-catalogs`}>Catalogs</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id={`${machine.id}-flyers`} defaultChecked />
                                  <Label htmlFor={`${machine.id}-flyers`}>Flyers</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id={`${machine.id}-business-cards`} defaultChecked />
                                  <Label htmlFor={`${machine.id}-business-cards`}>Business Cards</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id={`${machine.id}-posters`} defaultChecked />
                                  <Label htmlFor={`${machine.id}-posters`}>Posters</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id={`${machine.id}-other`} />
                                  <Label htmlFor={`${machine.id}-other`}>Other</Label>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor={`${machine.id}-maintenance`}>Scheduled Maintenance</Label>
                                <Switch
                                  id={`${machine.id}-maintenance`}
                                  defaultChecked={machine.status === "maintenance"}
                                />
                              </div>
                              {machine.status === "maintenance" && (
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                  <Input placeholder="Start Date/Time" defaultValue="2025-05-22 08:00" />
                                  <Input placeholder="End Date/Time" defaultValue="2025-05-23 14:00" />
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowRulesDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowRulesDialog(false)}>Save Rules</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
