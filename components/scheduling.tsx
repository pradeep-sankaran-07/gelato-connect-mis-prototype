"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
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
  X,
  BarChart3,
  AlertTriangle,
  GanttChartSquare,
  Activity,
  Target,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Zap,
  SlidersHorizontal,
  MoveHorizontal,
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
import { useNavigation } from "@/lib/navigation-context"
import GanttView from "@/components/scheduling/gantt-view"
import AutoSchedulePanel from "@/components/scheduling/auto-schedule-panel"
import UtilizationDashboard from "@/components/scheduling/utilization-dashboard"
import AIAssistantPanel from "@/components/scheduling/ai-assistant-panel"
import ScheduleConflicts from "@/components/scheduling/schedule-conflicts"

type MainView = "gantt" | "timeline" | "list"
type RightPanelMode = "auto-schedule" | "ai-assistant" | "conflicts" | null
type BottomTab = "schedule" | "utilization" | "analytics" | "constraints"

export default function Scheduling() {
  const { navigateTo, goBack } = useNavigation()
  const [mainView, setMainView] = useState<MainView>("gantt")
  const [rightPanel, setRightPanel] = useState<RightPanelMode>(null)
  const [bottomTab, setBottomTab] = useState<BottomTab>("schedule")
  const [showRulesDialog, setShowRulesDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null)
  const [selectedProcessType, setSelectedProcessType] = useState<string | null>(null)
  const [draggedJob, setDraggedJob] = useState<string | null>(null)
  const [moveJobId, setMoveJobId] = useState<string | null>(null)
  const [showGangingRecommendations, setShowGangingRecommendations] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState("day")

  // Sample data for machines
  const machines = [
    { id: "m1", name: "XL105 4 Colour", type: "printing", status: "active", capabilities: ["offset", "4-colour"], substrates: ["coated", "uncoated", "board"] },
    { id: "m2", name: "XL106 5 Colour", type: "printing", status: "active", capabilities: ["offset", "5-colour", "uv-coating"], substrates: ["coated", "uncoated", "board", "metallic"] },
    { id: "m3", name: "Laminator", type: "finishing", status: "active", capabilities: ["matt-lamination", "gloss-lamination"], substrates: ["coated", "board"] },
    { id: "m4", name: "Cylinder", type: "cutting", status: "maintenance", maintenanceUntil: "2025-05-23 14:00", capabilities: ["die-cutting", "creasing"], substrates: ["board", "corrugated"] },
    { id: "m5", name: "Guillotine 115", type: "cutting", status: "active", capabilities: ["straight-cut", "trim"], substrates: ["coated", "uncoated", "board", "self-adhesive"] },
    { id: "m6", name: "Platen", type: "cutting", status: "active", capabilities: ["die-cutting", "embossing"], substrates: ["board", "coated"] },
    { id: "m7", name: "KH82", type: "binding", status: "active", capabilities: ["perfect-binding", "label-application"], substrates: ["coated", "uncoated"] },
    { id: "m8", name: "ST450", type: "binding", status: "active", capabilities: ["saddle-stitch", "foil-stamping", "envelope-making"], substrates: ["coated", "uncoated", "board"] },
    { id: "m9", name: "New82", type: "finishing", status: "active", capabilities: ["embossing", "folding", "packing"], substrates: ["coated", "uncoated", "board"] },
    { id: "m10", name: "CldB2", type: "finishing", status: "active", capabilities: ["varnishing", "folding", "gluing"], substrates: ["coated", "board"] },
    { id: "m11", name: "Acora", type: "finishing", status: "active", capabilities: ["wire-binding", "hand-finishing"], substrates: ["coated", "uncoated", "board"] },
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
        { machine: "m1", startTime: "2025-05-22 08:00", endTime: "2025-05-22 09:30", duration: 90, type: "printing", status: "scheduled", operation: "4/0 Sheet Work" },
        { machine: "m5", startTime: "2025-05-22 10:00", endTime: "2025-05-22 11:00", duration: 60, type: "cutting", status: "scheduled", operation: "Cutting" },
        { machine: "m7", startTime: "2025-05-22 12:00", endTime: "2025-05-22 13:30", duration: 90, type: "binding", status: "scheduled", operation: "Perfect Binding" },
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
        { machine: "m2", startTime: "2025-05-22 08:00", endTime: "2025-05-22 09:30", duration: 90, type: "printing", status: "scheduled", operation: "5/0 Sheet Work" },
        { machine: "m6", startTime: "2025-05-22 10:30", endTime: "2025-05-22 11:30", duration: 60, type: "cutting", status: "scheduled", operation: "Cutting" },
        { machine: "m3", startTime: "2025-05-22 12:30", endTime: "2025-05-22 13:30", duration: 60, type: "finishing", status: "scheduled", operation: "Laminating" },
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
        { machine: "m1", startTime: "2025-05-22 09:45", endTime: "2025-05-22 10:45", duration: 60, type: "printing", status: "scheduled", operation: "4/4 Sheet Work" },
        { machine: "m5", startTime: "2025-05-22 11:15", endTime: "2025-05-22 11:45", duration: 30, type: "cutting", status: "scheduled", operation: "Cutting" },
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
        { machine: "m2", startTime: "2025-05-22 09:45", endTime: "2025-05-22 10:45", duration: 60, type: "printing", status: "scheduled", operation: "5/0 Sheet Work" },
        { machine: "m6", startTime: "2025-05-22 11:45", endTime: "2025-05-22 12:15", duration: 30, type: "cutting", status: "scheduled", operation: "Cutting" },
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
        { machine: "m1", startTime: "2025-05-22 11:00", endTime: "2025-05-22 12:30", duration: 90, type: "printing", status: "scheduled", operation: "4/0 Sheet Work" },
        { machine: "m5", startTime: "2025-05-22 13:00", endTime: "2025-05-22 13:30", duration: 30, type: "cutting", status: "scheduled", operation: "Cutting" },
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
        { machine: "m1", startTime: "2025-05-22 12:45", endTime: "2025-05-22 14:45", duration: 120, type: "printing", status: "scheduled", operation: "4/4 Sheet Work" },
        { machine: "m5", startTime: "2025-05-22 15:00", endTime: "2025-05-22 16:00", duration: 60, type: "cutting", status: "scheduled", operation: "Cutting" },
        { machine: "m7", startTime: "2025-05-22 16:30", endTime: "2025-05-22 18:30", duration: 120, type: "binding", status: "scheduled", operation: "Perfect Binding" },
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
        { machine: "m2", startTime: "2025-05-22 11:00", endTime: "2025-05-22 13:30", duration: 150, type: "printing", status: "scheduled", operation: "5/0 Sheet Work" },
        { machine: "m4", startTime: "2025-05-23 09:00", endTime: "2025-05-23 11:00", duration: 120, type: "cutting", status: "scheduled", operation: "Die Cutting" },
        { machine: "m10", startTime: "2025-05-23 12:00", endTime: "2025-05-23 14:00", duration: 120, type: "finishing", status: "scheduled", operation: "Folding & Gluing" },
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
        { machine: "m1", startTime: "2025-05-22 15:00", endTime: "2025-05-22 18:00", duration: 180, type: "printing", status: "scheduled", operation: "4/4 Sheet Work" },
        { machine: "m6", startTime: "2025-05-23 08:00", endTime: "2025-05-23 09:30", duration: 90, type: "cutting", status: "scheduled", operation: "Cutting" },
        { machine: "m8", startTime: "2025-05-23 10:30", endTime: "2025-05-23 12:30", duration: 120, type: "binding", status: "scheduled", operation: "Saddle Stitching" },
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
        { machine: "m2", startTime: "2025-05-22 13:45", endTime: "2025-05-22 15:15", duration: 90, type: "printing", status: "scheduled", operation: "5/0 Sheet Work" },
        { machine: "m5", startTime: "2025-05-22 16:15", endTime: "2025-05-22 17:15", duration: 60, type: "cutting", status: "scheduled", operation: "Cutting" },
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
        { machine: "m2", startTime: "2025-05-22 15:30", endTime: "2025-05-22 18:00", duration: 150, type: "printing", status: "scheduled", operation: "4/4 Sheet Work" },
        { machine: "m6", startTime: "2025-05-23 09:45", endTime: "2025-05-23 10:45", duration: 60, type: "cutting", status: "scheduled", operation: "Cutting" },
        { machine: "m11", startTime: "2025-05-23 12:00", endTime: "2025-05-23 14:00", duration: 120, type: "finishing", status: "scheduled", operation: "Wire Binding" },
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
        { machine: "m3", startTime: "2025-05-22 08:00", endTime: "2025-05-22 10:00", duration: 120, type: "finishing", status: "scheduled", operation: "Laminating" },
        { machine: "m4", startTime: "2025-05-22 11:30", endTime: "2025-05-22 13:00", duration: 90, type: "cutting", status: "scheduled", operation: "Die Cutting" },
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
        { machine: "m3", startTime: "2025-05-22 10:30", endTime: "2025-05-22 12:00", duration: 90, type: "finishing", status: "scheduled", operation: "Laminating" },
        { machine: "m4", startTime: "2025-05-23 13:30", endTime: "2025-05-23 15:00", duration: 90, type: "cutting", status: "scheduled", operation: "Die Cutting" },
        { machine: "m9", startTime: "2025-05-23 16:00", endTime: "2025-05-23 17:30", duration: 90, type: "finishing", status: "scheduled", operation: "Folding & Gluing" },
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
        { machine: "m7", startTime: "2025-05-22 08:00", endTime: "2025-05-22 11:30", duration: 210, type: "binding", status: "scheduled", operation: "Label Application" },
        { machine: "m10", startTime: "2025-05-22 13:00", endTime: "2025-05-22 15:00", duration: 120, type: "finishing", status: "scheduled", operation: "Varnishing" },
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
        { machine: "m8", startTime: "2025-05-22 08:00", endTime: "2025-05-22 10:00", duration: 120, type: "binding", status: "scheduled", operation: "Foil Stamping" },
        { machine: "m9", startTime: "2025-05-22 11:00", endTime: "2025-05-22 13:00", duration: 120, type: "finishing", status: "scheduled", operation: "Embossing" },
        { machine: "m11", startTime: "2025-05-22 14:00", endTime: "2025-05-22 16:00", duration: 120, type: "finishing", status: "scheduled", operation: "Hand Finishing" },
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
        { machine: "m8", startTime: "2025-05-22 10:30", endTime: "2025-05-22 12:30", duration: 120, type: "binding", status: "scheduled", operation: "Envelope Making" },
        { machine: "m9", startTime: "2025-05-22 13:30", endTime: "2025-05-22 15:30", duration: 120, type: "finishing", status: "scheduled", operation: "Packing" },
      ],
      color: "bg-yellow-300",
    },
  ]

  // Ganging suggestions
  const gangingSuggestions = [
    { id: "gang-1", jobs: ["36144", "36146"], savings: "32%", reason: "Same paper type (150gsm Gloss), compatible sizes" },
    { id: "gang-2", jobs: ["36142", "36143"], savings: "18%", reason: "Similar color requirements, compatible finishing" },
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

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

  const handleDragStart = (e: React.DragEvent, jobId: string, stepIndex: number) => {
    e.dataTransfer.setData("jobId", jobId)
    e.dataTransfer.setData("stepIndex", stepIndex.toString())
    setDraggedJob(jobId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, machineId: string, timeSlot: string) => {
    e.preventDefault()
    const jobId = e.dataTransfer.getData("jobId")
    const stepIndex = Number.parseInt(e.dataTransfer.getData("stepIndex"))
    console.log(`Moved job ${jobId} step ${stepIndex} to machine ${machineId} at time ${timeSlot}`)
    setDraggedJob(null)
  }

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

  const calculateStepPosition = (startTime: string, endTime: string) => {
    const startHour = Number.parseInt(startTime.split(" ")[1].split(":")[0])
    const endHour = Number.parseInt(endTime.split(" ")[1].split(":")[0])
    const startMinutes = Number.parseInt(startTime.split(" ")[1].split(":")[1])
    const endMinutes = Number.parseInt(endTime.split(" ")[1].split(":")[1])
    const startPosition = ((startHour - 8 + startMinutes / 60) / (18 - 8)) * 100
    const endPosition = ((endHour - 8 + endMinutes / 60) / (18 - 8)) * 100
    const width = endPosition - startPosition
    return { startPosition, width }
  }

  useEffect(() => {
    generateTimeSlots()
  }, [viewMode])

  const filteredMachines = selectedProcessType ? machines.filter((m) => m.type === selectedProcessType) : machines

  // Toggle right panel
  const toggleRightPanel = (mode: RightPanelMode) => {
    setRightPanel(rightPanel === mode ? null : mode)
  }

  // Schedule analytics data
  const analyticsData = {
    onTimeRate: 87,
    onTimeRateDelta: 3.2,
    avgThroughput: 142,
    avgThroughputDelta: -5,
    plannedVsActual: [
      { job: "J-36142", planned: 90, actual: 95, variance: "+5 min" },
      { job: "J-36143", planned: 90, actual: 82, variance: "-8 min" },
      { job: "J-36144", planned: 60, actual: 65, variance: "+5 min" },
      { job: "J-36145", planned: 60, actual: 58, variance: "-2 min" },
      { job: "J-36146", planned: 90, actual: 110, variance: "+20 min" },
      { job: "J-36147", planned: 120, actual: 125, variance: "+5 min" },
    ],
    weeklyThroughput: [
      { day: "Mon", planned: 28, actual: 26 },
      { day: "Tue", planned: 30, actual: 31 },
      { day: "Wed", planned: 32, actual: 29 },
      { day: "Thu", planned: 27, actual: 27 },
      { day: "Fri", planned: 25, actual: 22 },
    ],
    utilizationTrend: [
      { week: "W10", value: 72 },
      { week: "W11", value: 76 },
      { week: "W12", value: 69 },
      { week: "W13", value: 82 },
      { week: "W14", value: 78 },
    ],
  }

  // Constraint configuration data
  const pressCapabilities = [
    { id: "offset", label: "Offset Printing", enabled: true },
    { id: "digital", label: "Digital Printing", enabled: true },
    { id: "uv-coating", label: "UV Coating", enabled: true },
    { id: "foil-stamping", label: "Foil Stamping", enabled: false },
    { id: "embossing", label: "Embossing", enabled: true },
    { id: "die-cutting", label: "Die Cutting", enabled: true },
  ]

  const substrateTypes = [
    { id: "coated", label: "Coated Paper", compatible: true },
    { id: "uncoated", label: "Uncoated Paper", compatible: true },
    { id: "board", label: "Board (>250gsm)", compatible: true },
    { id: "self-adhesive", label: "Self-Adhesive", compatible: false },
    { id: "metallic", label: "Metallic/Specialty", compatible: false },
    { id: "corrugated", label: "Corrugated", compatible: false },
  ]

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-6 flex-1 overflow-auto">
        {/* Header Row */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-neutral-100">Production Scheduling</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowRulesDialog(true)} className="border-neutral-30 text-neutral-80">
              <Settings className="h-4 w-4 mr-2" />
              Configure Rules
            </Button>
            <div className="flex items-center border border-neutral-20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleRightPanel("auto-schedule")}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                  rightPanel === "auto-schedule" ? "bg-neutral-100 text-white" : "bg-white text-neutral-70 hover:bg-neutral-5"
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                Auto-Schedule
              </button>
              <button
                onClick={() => toggleRightPanel("ai-assistant")}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors border-l border-neutral-20 ${
                  rightPanel === "ai-assistant" ? "bg-neutral-100 text-white" : "bg-white text-neutral-70 hover:bg-neutral-5"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI Assistant
              </button>
              <button
                onClick={() => toggleRightPanel("conflicts")}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors border-l border-neutral-20 ${
                  rightPanel === "conflicts" ? "bg-neutral-100 text-white" : "bg-white text-neutral-70 hover:bg-neutral-5"
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                Conflicts
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-critical-60 text-white text-[10px] font-bold">3</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Toggle + Filters Row */}
        <div className="flex items-center gap-4 mb-4">
          {/* Main View Toggle: Gantt | Timeline | List */}
          <div className="flex items-center border border-neutral-30 rounded-lg overflow-hidden">
            <button
              onClick={() => setMainView("gantt")}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                mainView === "gantt" ? "bg-neutral-100 text-white" : "bg-white text-neutral-70 hover:bg-neutral-5"
              }`}
            >
              <GanttChartSquare className="h-4 w-4" />
              Gantt View
            </button>
            <button
              onClick={() => { setMainView("timeline"); setViewMode("day") }}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors border-l border-neutral-30 ${
                mainView === "timeline" ? "bg-neutral-100 text-white" : "bg-white text-neutral-70 hover:bg-neutral-5"
              }`}
            >
              <Clock className="h-4 w-4" />
              Timeline
            </button>
            <button
              onClick={() => setMainView("list")}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors border-l border-neutral-30 ${
                mainView === "list" ? "bg-neutral-100 text-white" : "bg-white text-neutral-70 hover:bg-neutral-5"
              }`}
            >
              <List className="h-4 w-4" />
              List
            </button>
          </div>

          {mainView === "timeline" && (
            <Tabs defaultValue={viewMode} onValueChange={setViewMode}>
              <TabsList>
                <TabsTrigger value="week">
                  <Calendar className="h-4 w-4 mr-1" />
                  Week
                </TabsTrigger>
                <TabsTrigger value="day">
                  <Clock className="h-4 w-4 mr-1" />
                  Day
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          {mainView === "timeline" && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-medium text-sm text-neutral-90">
                {viewMode === "day"
                  ? formatDate(selectedDate)
                  : `${formatDate(weekDays[0])} - ${formatDate(weekDays[4])}`}
              </div>
              <Button variant="outline" size="sm" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="relative ml-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-50" />
            <Input type="search" placeholder="Search jobs..." className="pl-8 w-[220px]" />
          </div>

          <Button variant="outline" className="border-neutral-30 text-neutral-70">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button variant="outline" className="border-neutral-30 text-neutral-70">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Bottom Tabs: Schedule | Utilization | Analytics | Constraints */}
        <div className="flex items-center gap-1 mb-4 border-b border-neutral-20">
          {[
            { id: "schedule" as BottomTab, label: "Schedule", icon: Calendar },
            { id: "utilization" as BottomTab, label: "Utilization", icon: Activity },
            { id: "analytics" as BottomTab, label: "Schedule Analytics", icon: BarChart3 },
            { id: "constraints" as BottomTab, label: "Constraints", icon: SlidersHorizontal },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setBottomTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-[4px] transition-colors -mb-[1px] ${
                  bottomTab === tab.id
                    ? "border-black text-neutral-100 font-semibold"
                    : "border-transparent text-neutral-50 hover:text-neutral-80"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ConnectAI Recommendation Banner */}
        {bottomTab === "schedule" && (
          <div className="mb-4 bg-info-10 border border-info-30 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-info-70" />
              <span className="text-sm text-neutral-80">
                <span className="font-medium text-neutral-100">ConnectAI:</span> Ganging opportunities found that could save up to 32% on materials.
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowGangingRecommendations(true)} className="border-neutral-30 text-neutral-80">
              View Recommendations
            </Button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex gap-4">
          {/* Left / Main Panel */}
          <div className={`flex-1 min-w-0 ${rightPanel ? "max-w-[calc(100%-420px)]" : ""}`}>

            {/* SCHEDULE TAB */}
            {bottomTab === "schedule" && (
              <>
                {/* Gantt View */}
                {mainView === "gantt" && (
                  <GanttView onJobClick={(jobId) => setSelectedJob(jobId)} />
                )}

                {/* Timeline View */}
                {mainView === "timeline" && (
                  <div className="border border-neutral-20 rounded-lg overflow-hidden bg-white">
                    {/* Filter row */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-20 bg-neutral-5">
                      <Select value={selectedJob || "all-jobs"} onValueChange={(value) => setSelectedJob(value === "all-jobs" ? null : value)}>
                        <SelectTrigger className="w-[170px] h-8 text-sm">
                          <SelectValue placeholder="Filter by Job" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-jobs">All Jobs</SelectItem>
                          {jobs.map((job) => (
                            <SelectItem key={job.id} value={job.id}>#{job.id} - {job.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedMachine || "all-machines"} onValueChange={(value) => setSelectedMachine(value === "all-machines" ? null : value)}>
                        <SelectTrigger className="w-[170px] h-8 text-sm">
                          <SelectValue placeholder="Machine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-machines">All Machines</SelectItem>
                          {machines.map((machine) => (
                            <SelectItem key={machine.id} value={machine.id}>{machine.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedProcessType || "all-types"} onValueChange={(value) => setSelectedProcessType(value === "all-types" ? null : value)}>
                        <SelectTrigger className="w-[160px] h-8 text-sm">
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
                    </div>

                    {viewMode === "day" ? (
                      <div className="p-4">
                        <div className="flex mb-2">
                          <div className="w-48"></div>
                          {timeSlots.map((slot) => (
                            <div key={slot} className="flex-1 text-center text-xs font-medium text-neutral-60">{slot}</div>
                          ))}
                        </div>
                        <div className="overflow-auto" ref={timelineRef}>
                          {filteredMachines
                            .filter((m) =>
                              !selectedMachine || m.id === selectedMachine ||
                              !selectedJob || jobs.some((j) => j.id === selectedJob && j.steps.some((s) => s.machine === m.id))
                            )
                            .map((machine) => (
                              <div key={machine.id} className="flex mb-3">
                                <div className="w-48 pr-4 flex items-center">
                                  <div>
                                    <div className="font-medium text-sm text-neutral-90">{machine.name}</div>
                                    <div className="text-xs text-neutral-50 capitalize">{machine.type}</div>
                                    {machine.status === "maintenance" ? (
                                      <Badge className="bg-warning-10 text-warning-90 text-[10px] mt-0.5">Maintenance</Badge>
                                    ) : (
                                      <Badge className="bg-success-10 text-success-90 text-[10px] mt-0.5">Available</Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1 relative border border-neutral-20 bg-neutral-5 rounded-md h-14">
                                  {timeSlots.map((slot, index) => (
                                    <div
                                      key={slot}
                                      className="absolute top-0 bottom-0 border-l border-neutral-15"
                                      style={{ left: `${(index / timeSlots.length) * 100}%`, width: `${(1 / timeSlots.length) * 100}%` }}
                                      onDragOver={handleDragOver}
                                      onDrop={(e) => handleDrop(e, machine.id, slot)}
                                    />
                                  ))}
                                  {getJobStepsForMachine(machine.id)
                                    .filter((step) => !selectedJob || step.jobId === selectedJob)
                                    .map((step) => {
                                      const { startPosition, width } = calculateStepPosition(step.startTime, step.endTime)
                                      const isMoving = moveJobId === step.jobId
                                      return (
                                        <div key={`${step.jobId}-${step.stepIndex}`} className="relative">
                                          <div
                                            className={`absolute top-1 bottom-1 rounded-md ${step.color} text-white p-1 cursor-move text-xs flex items-center overflow-hidden ${draggedJob === step.jobId ? "opacity-50" : ""} ${isMoving ? "ring-2 ring-neutral-100" : ""}`}
                                            style={{ left: `${startPosition}%`, width: `${width}%`, height: "calc(100% - 8px)", top: "4px" }}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, step.jobId, step.stepIndex)}
                                            onClick={() => setMoveJobId(isMoving ? null : step.jobId)}
                                            title={`#${step.jobId} - ${step.jobName} - ${step.operation} (${step.startTime} - ${step.endTime})`}
                                          >
                                            <div className="truncate">#{step.jobId} - {step.operation}</div>
                                          </div>
                                          {/* Move to machine dropdown */}
                                          {isMoving && (
                                            <div
                                              className="absolute z-30 bg-white border border-neutral-20 rounded-lg shadow-lg p-2 min-w-[200px]"
                                              style={{ left: `${startPosition}%`, top: "52px" }}
                                            >
                                              <div className="text-xs font-medium text-neutral-70 px-2 py-1 mb-1 flex items-center gap-1.5">
                                                <MoveHorizontal className="h-3 w-3" />
                                                Move #{step.jobId} to machine:
                                              </div>
                                              {machines
                                                .filter((m) => m.id !== step.machine && m.type === step.type && m.status === "active")
                                                .map((m) => (
                                                  <button
                                                    key={m.id}
                                                    className="w-full text-left px-2 py-1.5 text-sm text-neutral-80 hover:bg-neutral-5 rounded transition-colors"
                                                    onClick={(e) => {
                                                      e.stopPropagation()
                                                      console.log(`Move job ${step.jobId} from ${machine.name} to ${m.name}`)
                                                      setMoveJobId(null)
                                                    }}
                                                  >
                                                    {m.name} <span className="text-neutral-50 text-xs capitalize">({m.type})</span>
                                                  </button>
                                                ))}
                                              {machines.filter((m) => m.id !== step.machine && m.type === step.type && m.status === "active").length === 0 && (
                                                <div className="text-xs text-neutral-50 px-2 py-1.5">No compatible machines available</div>
                                              )}
                                              <div className="border-t border-neutral-10 mt-1 pt-1">
                                                <button
                                                  className="w-full text-left px-2 py-1.5 text-xs text-neutral-50 hover:bg-neutral-5 rounded transition-colors"
                                                  onClick={(e) => { e.stopPropagation(); setMoveJobId(null) }}
                                                >
                                                  Cancel
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )
                                    })}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4">
                        <div className="grid grid-cols-5 gap-2 mb-4">
                          {weekDays.map((day, index) => (
                            <div key={index} className="text-center font-medium text-sm text-neutral-80">{formatDate(day)}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-5 gap-2 h-[500px]">
                          {weekDays.map((day, dayIndex) => (
                            <div key={dayIndex} className="border border-neutral-20 rounded-lg overflow-auto">
                              {filteredMachines
                                .filter((m) =>
                                  !selectedMachine || m.id === selectedMachine ||
                                  !selectedJob || jobs.some((j) => j.id === selectedJob && j.steps.some((s) => s.machine === m.id))
                                )
                                .map((machine) => (
                                  <div key={machine.id} className="p-2 border-b border-neutral-10">
                                    <div className="font-medium text-xs text-neutral-90">{machine.name}</div>
                                    <div className="text-[10px] text-neutral-50 capitalize">{machine.type}</div>
                                    <div className="mt-1 relative h-10 bg-neutral-5 rounded">
                                      {getJobStepsForMachine(machine.id)
                                        .filter((step) => !selectedJob || step.jobId === selectedJob)
                                        .filter(() => dayIndex === 0)
                                        .map((step) => {
                                          const { startPosition, width } = calculateStepPosition(step.startTime, step.endTime)
                                          return (
                                            <div
                                              key={`${step.jobId}-${step.stepIndex}`}
                                              className={`absolute top-1 bottom-1 rounded-md ${step.color} text-white p-1 cursor-move text-[10px] flex items-center overflow-hidden`}
                                              style={{ left: `${startPosition}%`, width: `${width}%` }}
                                              title={`#${step.jobId} - ${step.jobName}`}
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
                )}

                {/* List View */}
                {mainView === "list" && (
                  <div className="border border-neutral-20 rounded-lg overflow-hidden bg-white">
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-20 bg-neutral-5">
                      <Select value={selectedJob || "all-jobs"} onValueChange={(value) => setSelectedJob(value === "all-jobs" ? null : value)}>
                        <SelectTrigger className="w-[180px] h-8 text-sm">
                          <SelectValue placeholder="Filter by Job" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-jobs">All Jobs</SelectItem>
                          {jobs.map((job) => (
                            <SelectItem key={job.id} value={job.id}>#{job.id} - {job.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedProcessType || "all-types"} onValueChange={(value) => setSelectedProcessType(value === "all-types" ? null : value)}>
                        <SelectTrigger className="w-[160px] h-8 text-sm">
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
                    </div>
                    <div className="p-4">
                      {selectedJob ? (
                        <div>
                          <h3 className="font-medium mb-4 text-neutral-100">
                            Job Workflow: #{selectedJob} - {jobs.find((j) => j.id === selectedJob)?.name}
                          </h3>
                          <table className="w-full">
                            <thead>
                              <tr className="bg-neutral-5 border-b border-neutral-20">
                                <th className="p-3 text-left text-xs font-medium text-neutral-60">Step</th>
                                <th className="p-3 text-left text-xs font-medium text-neutral-60">Machine</th>
                                <th className="p-3 text-left text-xs font-medium text-neutral-60">Operation</th>
                                <th className="p-3 text-left text-xs font-medium text-neutral-60">Start Time</th>
                                <th className="p-3 text-left text-xs font-medium text-neutral-60">End Time</th>
                                <th className="p-3 text-left text-xs font-medium text-neutral-60">Duration</th>
                                <th className="p-3 text-left text-xs font-medium text-neutral-60">Status</th>
                                <th className="p-3 text-left text-xs font-medium text-neutral-60">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getSelectedJobSteps().map((step, index) => (
                                <tr key={index} className="border-b border-neutral-10 hover:bg-neutral-5">
                                  <td className="p-3 text-sm">{index + 1}</td>
                                  <td className="p-3 text-sm">{step.machineName}</td>
                                  <td className="p-3 text-sm">{step.operation}</td>
                                  <td className="p-3 text-sm text-neutral-70">{step.startTime}</td>
                                  <td className="p-3 text-sm text-neutral-70">{step.endTime}</td>
                                  <td className="p-3 text-sm">{step.duration} min</td>
                                  <td className="p-3">
                                    <Badge className="bg-info-10 text-info-90 capitalize text-xs">{step.status}</Badge>
                                  </td>
                                  <td className="p-3">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-neutral-60 hover:text-neutral-100"
                                      onClick={() => setMoveJobId(moveJobId === step.jobId ? null : step.jobId)}
                                    >
                                      <MoveHorizontal className="h-3 w-3 mr-1" />
                                      Move
                                    </Button>
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
                                <h3 className="font-medium mb-2 flex items-center text-neutral-100">
                                  {machine.name}
                                  <span className="text-sm text-neutral-50 ml-2 capitalize">({machine.type})</span>
                                </h3>
                                <table className="w-full">
                                  <thead>
                                    <tr className="bg-neutral-5 border-b border-neutral-20">
                                      <th className="p-2 text-left text-xs font-medium text-neutral-60">Order ID</th>
                                      <th className="p-2 text-left text-xs font-medium text-neutral-60">Job Name</th>
                                      <th className="p-2 text-left text-xs font-medium text-neutral-60">Category</th>
                                      <th className="p-2 text-left text-xs font-medium text-neutral-60">Paper</th>
                                      <th className="p-2 text-left text-xs font-medium text-neutral-60">Operation</th>
                                      <th className="p-2 text-left text-xs font-medium text-neutral-60">Start Time</th>
                                      <th className="p-2 text-left text-xs font-medium text-neutral-60">Duration</th>
                                      <th className="p-2 text-left text-xs font-medium text-neutral-60">Status</th>
                                      <th className="p-2 text-left text-xs font-medium text-neutral-60">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {machineSteps.map((step) => (
                                      <tr
                                        key={`${step.jobId}-${step.stepIndex}`}
                                        className="border-b border-neutral-10 hover:bg-neutral-5 cursor-pointer"
                                        onClick={() => setSelectedJob(step.jobId)}
                                      >
                                        <td className="p-2 font-mono text-sm">{step.jobId}</td>
                                        <td className="p-2 text-sm">{step.jobName}</td>
                                        <td className="p-2 text-sm text-neutral-70">{step.category}</td>
                                        <td className="p-2 text-sm text-neutral-70">{step.paper}</td>
                                        <td className="p-2 text-sm">{step.operation}</td>
                                        <td className="p-2 text-sm text-neutral-70">{step.startTime}</td>
                                        <td className="p-2 text-sm">{step.duration} min</td>
                                        <td className="p-2">
                                          <Badge className="bg-info-10 text-info-90 capitalize text-xs">{step.status}</Badge>
                                        </td>
                                        <td className="p-2">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 text-[11px] text-neutral-60"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              setMoveJobId(moveJobId === step.jobId ? null : step.jobId)
                                            }}
                                          >
                                            <MoveHorizontal className="h-3 w-3 mr-1" />
                                            Move
                                          </Button>
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
                  </div>
                )}
              </>
            )}

            {/* UTILIZATION TAB */}
            {bottomTab === "utilization" && (
              <UtilizationDashboard />
            )}

            {/* ANALYTICS TAB */}
            {bottomTab === "analytics" && (
              <div className="space-y-5">
                {/* KPI Summary Cards */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="border border-neutral-20 rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-success-10 flex items-center justify-center">
                        <Target className="h-4 w-4 text-success-70" />
                      </div>
                      <span className="text-xs text-neutral-50">On-Time Delivery</span>
                    </div>
                    <div className="text-2xl font-bold text-neutral-100">{analyticsData.onTimeRate}%</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3.5 w-3.5 text-success-70" />
                      <span className="text-xs font-medium text-success-70">+{analyticsData.onTimeRateDelta}% vs last week</span>
                    </div>
                  </div>

                  <div className="border border-neutral-20 rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-info-10 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-info-70" />
                      </div>
                      <span className="text-xs text-neutral-50">Avg Throughput</span>
                    </div>
                    <div className="text-2xl font-bold text-neutral-100">{analyticsData.avgThroughput}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowDownRight className="h-3.5 w-3.5 text-critical-60" />
                      <span className="text-xs font-medium text-critical-60">{analyticsData.avgThroughputDelta} jobs/wk vs last week</span>
                    </div>
                  </div>

                  <div className="border border-neutral-20 rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-warning-10 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-warning-70" />
                      </div>
                      <span className="text-xs text-neutral-50">Avg Schedule Variance</span>
                    </div>
                    <div className="text-2xl font-bold text-neutral-100">+4.2 min</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-neutral-50">Per job step average</span>
                    </div>
                  </div>

                  <div className="border border-neutral-20 rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-5 flex items-center justify-center">
                        <Layers className="h-4 w-4 text-primary-70" />
                      </div>
                      <span className="text-xs text-neutral-50">Jobs Completed Today</span>
                    </div>
                    <div className="text-2xl font-bold text-neutral-100">8 / 15</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-neutral-50">53% complete</span>
                    </div>
                  </div>
                </div>

                {/* Planned vs Actual Comparison */}
                <div className="border border-neutral-20 rounded-lg bg-white">
                  <div className="px-4 py-3 border-b border-neutral-20">
                    <h4 className="text-sm font-semibold text-neutral-100">Planned vs Actual Duration</h4>
                    <p className="text-xs text-neutral-50 mt-0.5">Comparison of scheduled vs actual production times</p>
                  </div>
                  <div className="p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-neutral-5">
                          <th className="text-left text-xs font-medium text-neutral-60 px-3 py-2">Job</th>
                          <th className="text-center text-xs font-medium text-neutral-60 px-3 py-2">Planned (min)</th>
                          <th className="text-center text-xs font-medium text-neutral-60 px-3 py-2">Actual (min)</th>
                          <th className="text-center text-xs font-medium text-neutral-60 px-3 py-2">Variance</th>
                          <th className="text-left text-xs font-medium text-neutral-60 px-3 py-2">Visual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsData.plannedVsActual.map((row) => {
                          const isOver = row.actual > row.planned
                          const pct = Math.min((row.actual / row.planned) * 100, 130)
                          return (
                            <tr key={row.job} className="border-b border-neutral-10 hover:bg-neutral-5/50">
                              <td className="px-3 py-2.5 text-sm font-medium text-neutral-100">{row.job}</td>
                              <td className="px-3 py-2.5 text-sm text-neutral-70 text-center">{row.planned}</td>
                              <td className="px-3 py-2.5 text-sm text-neutral-70 text-center">{row.actual}</td>
                              <td className="px-3 py-2.5 text-center">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  isOver ? "bg-critical-10 text-critical-80" : "bg-success-10 text-success-80"
                                }`}>
                                  {row.variance}
                                </span>
                              </td>
                              <td className="px-3 py-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-32 h-2 bg-neutral-10 rounded-full overflow-hidden relative">
                                    <div className="absolute top-0 left-0 h-full bg-info-40 rounded-full" style={{ width: "100%" }} />
                                    <div
                                      className={`absolute top-0 left-0 h-full rounded-full ${isOver ? "bg-critical-50" : "bg-success-60"}`}
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Throughput Trends */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-neutral-20 rounded-lg bg-white">
                    <div className="px-4 py-3 border-b border-neutral-20">
                      <h4 className="text-sm font-semibold text-neutral-100">Weekly Throughput</h4>
                      <p className="text-xs text-neutral-50 mt-0.5">Planned vs actual jobs completed per day</p>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {analyticsData.weeklyThroughput.map((d) => {
                          const maxVal = 35
                          return (
                            <div key={d.day} className="flex items-center gap-3">
                              <span className="w-8 text-xs font-medium text-neutral-70">{d.day}</span>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 bg-info-40 rounded-full" style={{ width: `${(d.planned / maxVal) * 100}%` }} />
                                  <span className="text-[10px] text-neutral-50 w-6">{d.planned}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className={`h-2 rounded-full ${d.actual >= d.planned ? "bg-success-60" : "bg-warning-50"}`} style={{ width: `${(d.actual / maxVal) * 100}%` }} />
                                  <span className="text-[10px] text-neutral-50 w-6">{d.actual}</span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-neutral-50 justify-center">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-info-40 inline-block" /> Planned</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-success-60 inline-block" /> Actual (on/above)</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-warning-50 inline-block" /> Actual (below)</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-neutral-20 rounded-lg bg-white">
                    <div className="px-4 py-3 border-b border-neutral-20">
                      <h4 className="text-sm font-semibold text-neutral-100">Utilization Trend (5 Weeks)</h4>
                      <p className="text-xs text-neutral-50 mt-0.5">Average machine utilization over time</p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-end gap-4 h-[160px]">
                        {analyticsData.utilizationTrend.map((d) => (
                          <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-xs font-semibold text-neutral-100">{d.value}%</span>
                            <div className="w-full bg-neutral-10 rounded-t-md relative" style={{ height: "120px" }}>
                              <div
                                className={`absolute bottom-0 left-0 right-0 rounded-t-md transition-all ${
                                  d.value >= 75 ? "bg-success-60" : d.value >= 60 ? "bg-info-50" : "bg-warning-50"
                                }`}
                                style={{ height: `${(d.value / 100) * 120}px` }}
                              />
                            </div>
                            <span className="text-xs text-neutral-50">{d.week}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONSTRAINTS TAB */}
            {bottomTab === "constraints" && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  {/* Press Capabilities */}
                  <div className="border border-neutral-20 rounded-lg bg-white">
                    <div className="px-4 py-3 border-b border-neutral-20">
                      <h4 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-info-70" />
                        Press Capabilities
                      </h4>
                      <p className="text-xs text-neutral-50 mt-0.5">Toggle capabilities considered during scheduling</p>
                    </div>
                    <div className="p-4 space-y-3">
                      {pressCapabilities.map((cap) => (
                        <div key={cap.id} className="flex items-center justify-between py-1.5">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${cap.enabled ? "bg-success-60" : "bg-neutral-30"}`} />
                            <span className="text-sm text-neutral-80">{cap.label}</span>
                          </div>
                          <Switch defaultChecked={cap.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Substrate Compatibility */}
                  <div className="border border-neutral-20 rounded-lg bg-white">
                    <div className="px-4 py-3 border-b border-neutral-20">
                      <h4 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                        <Layers className="h-4 w-4 text-warning-70" />
                        Substrate Compatibility
                      </h4>
                      <p className="text-xs text-neutral-50 mt-0.5">Define which substrates are eligible for scheduling</p>
                    </div>
                    <div className="p-4 space-y-3">
                      {substrateTypes.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between py-1.5">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${sub.compatible ? "bg-success-60" : "bg-neutral-30"}`} />
                            <span className="text-sm text-neutral-80">{sub.label}</span>
                          </div>
                          <Switch defaultChecked={sub.compatible} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Machine-Capability Matrix */}
                <div className="border border-neutral-20 rounded-lg bg-white">
                  <div className="px-4 py-3 border-b border-neutral-20">
                    <h4 className="text-sm font-semibold text-neutral-100">Machine-Capability Matrix</h4>
                    <p className="text-xs text-neutral-50 mt-0.5">View which machines support which capabilities and substrates</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-neutral-5">
                          <th className="text-left text-xs font-medium text-neutral-60 px-3 py-2.5 border-b border-neutral-20 min-w-[160px]">Machine</th>
                          <th className="text-left text-xs font-medium text-neutral-60 px-3 py-2.5 border-b border-neutral-20">Type</th>
                          <th className="text-left text-xs font-medium text-neutral-60 px-3 py-2.5 border-b border-neutral-20">Capabilities</th>
                          <th className="text-left text-xs font-medium text-neutral-60 px-3 py-2.5 border-b border-neutral-20">Compatible Substrates</th>
                          <th className="text-center text-xs font-medium text-neutral-60 px-3 py-2.5 border-b border-neutral-20">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {machines.map((machine) => (
                          <tr key={machine.id} className="border-b border-neutral-10 hover:bg-neutral-5/50">
                            <td className="px-3 py-2.5 text-sm font-medium text-neutral-100">{machine.name}</td>
                            <td className="px-3 py-2.5">
                              <span className="text-xs capitalize text-neutral-70 bg-neutral-10 px-2 py-0.5 rounded">{machine.type}</span>
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="flex flex-wrap gap-1">
                                {machine.capabilities.map((cap) => (
                                  <span key={cap} className="text-[10px] px-1.5 py-0.5 bg-info-10 text-info-80 rounded font-medium">{cap}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="flex flex-wrap gap-1">
                                {machine.substrates.map((sub) => (
                                  <span key={sub} className="text-[10px] px-1.5 py-0.5 bg-warning-10 text-warning-80 rounded font-medium">{sub}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-center">
                              {machine.status === "active" ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-success-10 text-success-90">Active</span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-warning-10 text-warning-90">Maintenance</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Panel (inline, not fixed overlay for conflicts) */}
          {rightPanel === "conflicts" && (
            <div className="w-[400px] flex-shrink-0 border border-neutral-20 rounded-lg bg-white overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-20 bg-neutral-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-critical-10 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-critical-70" />
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-100">Schedule Conflicts</h3>
                </div>
                <button onClick={() => setRightPanel(null)} className="p-1.5 rounded-md hover:bg-neutral-10 text-neutral-50 hover:text-neutral-90 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <ScheduleConflicts />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar overlay panels: Auto-Schedule and AI Assistant */}
      <AutoSchedulePanel
        open={rightPanel === "auto-schedule"}
        onClose={() => setRightPanel(null)}
      />
      <AIAssistantPanel
        open={rightPanel === "ai-assistant"}
        onClose={() => setRightPanel(null)}
      />

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
                      <p className="text-sm text-neutral-50">When enabled, the system will automatically optimize the schedule at 6:00 AM each day.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-approve-savings">Auto-approve if Savings {">"} 20%</Label>
                        <Switch id="auto-approve-savings" />
                      </div>
                      <p className="text-sm text-neutral-50">Automatically approve ganging suggestions that result in savings greater than 20%.</p>
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
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>If Paper Type</Label>
                            <Select defaultValue="all">
                              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
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
                              <SelectTrigger><SelectValue placeholder="Select machine" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Machines</SelectItem>
                                {machines.map((machine) => (
                                  <SelectItem key={machine.id} value={machine.id}>{machine.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Priority</Label>
                            <Select defaultValue="high">
                              <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
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
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>If Machine</Label>
                            <Select defaultValue="m1">
                              <SelectTrigger><SelectValue placeholder="Select machine" /></SelectTrigger>
                              <SelectContent>
                                {machines.map((machine) => (
                                  <SelectItem key={machine.id} value={machine.id}>{machine.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>And Job Type</Label>
                            <Select defaultValue="all">
                              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
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
                              <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
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
                    <div className="flex items-center space-x-2">
                      <Checkbox id="enable-ganging" defaultChecked />
                      <Label htmlFor="enable-ganging">Enable Ganging</Label>
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
                                <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
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
                                <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
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
                                <Label htmlFor="same-delivery">Must have same delivery date (+/-1 day)</Label>
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
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Minimum Material Savings</Label>
                            <Select defaultValue="10">
                              <SelectTrigger><SelectValue placeholder="Select percentage" /></SelectTrigger>
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
                              <SelectTrigger><SelectValue placeholder="Select percentage" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5">5%</SelectItem>
                                <SelectItem value="10">10%</SelectItem>
                                <SelectItem value="15">15%</SelectItem>
                              </SelectContent>
                            </Select>
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
                                  <SelectTrigger><SelectValue placeholder="Select hours" /></SelectTrigger>
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
                                  <SelectTrigger><SelectValue placeholder="Select maximum" /></SelectTrigger>
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
                                <Switch id={`${machine.id}-maintenance`} defaultChecked={machine.status === "maintenance"} />
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
            <Button variant="outline" onClick={() => setShowRulesDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowRulesDialog(false)}>Save Rules</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
