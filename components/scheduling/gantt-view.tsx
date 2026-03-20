"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ViewMode = "day" | "week"

interface JobBlock {
  id: string
  jobNumber: string
  customer: string
  product: string
  priority: "urgent" | "high" | "normal" | "low"
  status: "in-progress" | "queued" | "completed" | "setup"
  machineId: string
  startHour: number
  duration: number // in hours
  startDay?: number // 0-4 for week view (Mon-Fri)
}

interface Machine {
  id: string
  name: string
}

const machines: Machine[] = [
  { id: "m1", name: "HP Indigo 7900" },
  { id: "m2", name: "HP Indigo 5900" },
  { id: "m3", name: "KBA Rapida 105" },
  { id: "m4", name: "HP Latex 800" },
  { id: "m5", name: "Polar N115 Cutter" },
  { id: "m6", name: "MBO K800 Folder" },
  { id: "m7", name: "Muller Martini Presto" },
  { id: "m8", name: "Komfi Delta 52" },
]

const jobBlocks: JobBlock[] = [
  { id: "j1", jobNumber: "J-1001", customer: "Acme Corp", product: "A3 Brochures (5000)", priority: "urgent", status: "in-progress", machineId: "m1", startHour: 8, duration: 2.5 },
  { id: "j2", jobNumber: "J-1002", customer: "PrintMax Ltd", product: "Business Cards (10000)", priority: "high", status: "in-progress", machineId: "m1", startHour: 11, duration: 1.5 },
  { id: "j3", jobNumber: "J-1003", customer: "Nordic Design", product: "Posters A1 (200)", priority: "normal", status: "queued", machineId: "m1", startHour: 14, duration: 2 },
  { id: "j4", jobNumber: "J-1004", customer: "Gelato Partners", product: "Catalogs 32pg (2000)", priority: "normal", status: "in-progress", machineId: "m2", startHour: 8, duration: 3 },
  { id: "j5", jobNumber: "J-1005", customer: "BrandHouse", product: "Flyers A5 (15000)", priority: "high", status: "queued", machineId: "m2", startHour: 12, duration: 2 },
  { id: "j6", jobNumber: "J-1006", customer: "EcoPackaging", product: "Labels 50x30mm (50000)", priority: "low", status: "queued", machineId: "m2", startHour: 15, duration: 2 },
  { id: "j7", jobNumber: "J-1007", customer: "Metro Books", product: "Hardcover Books (500)", priority: "urgent", status: "setup", machineId: "m3", startHour: 8, duration: 1 },
  { id: "j8", jobNumber: "J-1008", customer: "Metro Books", product: "Softcover Books (1000)", priority: "high", status: "in-progress", machineId: "m3", startHour: 9.5, duration: 3.5 },
  { id: "j9", jobNumber: "J-1009", customer: "SignWorld", product: "Vinyl Banners (50)", priority: "normal", status: "in-progress", machineId: "m4", startHour: 8, duration: 4 },
  { id: "j10", jobNumber: "J-1010", customer: "EventPro", product: "Roll-up Displays (25)", priority: "high", status: "queued", machineId: "m4", startHour: 13, duration: 3 },
  { id: "j11", jobNumber: "J-1011", customer: "Acme Corp", product: "A3 Brochures trim", priority: "urgent", status: "queued", machineId: "m5", startHour: 11, duration: 1.5 },
  { id: "j12", jobNumber: "J-1012", customer: "PrintMax Ltd", product: "Cards die-cut", priority: "normal", status: "queued", machineId: "m5", startHour: 13, duration: 2 },
  { id: "j13", jobNumber: "J-1013", customer: "Nordic Design", product: "Brochure fold", priority: "normal", status: "in-progress", machineId: "m6", startHour: 9, duration: 2.5 },
  { id: "j14", jobNumber: "J-1014", customer: "Metro Books", product: "Book binding", priority: "high", status: "queued", machineId: "m7", startHour: 13, duration: 3 },
  { id: "j15", jobNumber: "J-1015", customer: "BrandHouse", product: "Lamination run", priority: "low", status: "queued", machineId: "m8", startHour: 10, duration: 2 },
]

const priorityColors: Record<JobBlock["priority"], string> = {
  urgent: "bg-critical-60 border-critical-70",
  high: "bg-warning-50 border-warning-70",
  normal: "bg-info-50 border-info-70",
  low: "bg-neutral-30 border-neutral-40",
}

const priorityTextColors: Record<JobBlock["priority"], string> = {
  urgent: "text-white",
  high: "text-neutral-100",
  normal: "text-neutral-100",
  low: "text-neutral-80",
}

const priorityBadge: Record<JobBlock["priority"], string> = {
  urgent: "bg-critical-70 text-white",
  high: "bg-warning-70 text-white",
  normal: "bg-info-70 text-white",
  low: "bg-neutral-70 text-white",
}

const statusLabels: Record<JobBlock["status"], string> = {
  "in-progress": "In Progress",
  queued: "Queued",
  completed: "Completed",
  setup: "Setup",
}

interface GanttViewProps {
  viewMode?: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
  onJobClick?: (jobId: string) => void
}

export default function GanttView({ viewMode = "day", onViewModeChange, onJobClick }: GanttViewProps) {
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>(viewMode)
  const [selectedJob, setSelectedJob] = useState<JobBlock | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  const mode = onViewModeChange ? viewMode : currentViewMode
  const setMode = onViewModeChange || setCurrentViewMode

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const dayHours = Array.from({ length: 11 }, (_, i) => i + 8) // 8:00 - 18:00
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"]

  const timeSlots = mode === "day" ? dayHours : weekDays
  const slotWidth = mode === "day" ? 120 : 180
  const machineColWidth = 170
  const rowHeight = 56

  // Current time position (for day view)
  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60
  const currentTimeOffset = mode === "day" ? (currentHour - 8) * slotWidth : -1

  const handleJobClick = (job: JobBlock, e: React.MouseEvent) => {
    e.stopPropagation()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (containerRect) {
      setTooltipPos({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 8,
      })
    }
    setSelectedJob(job)
    onJobClick?.(job.id)
  }

  const closeTooltip = () => setSelectedJob(null)

  return (
    <div ref={containerRef} className="relative border border-neutral-20 rounded-lg overflow-hidden bg-white">
      {/* Header controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-20 bg-neutral-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-neutral-30 rounded-lg overflow-hidden">
            <button
              onClick={() => setMode("day")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === "day" ? "bg-neutral-100 text-white" : "bg-white text-neutral-70 hover:bg-neutral-5"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setMode("week")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === "week" ? "bg-neutral-100 text-white" : "bg-white text-neutral-70 hover:bg-neutral-5"
              }`}
            >
              Week
            </button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-neutral-90 min-w-[120px] text-center">
              {mode === "day" ? "Today, 19 Mar 2026" : "17 - 21 Mar 2026"}
            </span>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 text-xs text-neutral-60">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-critical-60 inline-block" /> Urgent</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-warning-50 inline-block" /> High</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-info-50 inline-block" /> Normal</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-neutral-30 inline-block" /> Low</span>
          </div>
        </div>
      </div>

      {/* Gantt chart */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: machineColWidth + slotWidth * timeSlots.length }}>
          {/* Time header */}
          <div className="flex border-b border-neutral-20 bg-neutral-5">
            <div
              className="flex-shrink-0 px-3 py-2 text-xs font-medium text-neutral-70 border-r border-neutral-20"
              style={{ width: machineColWidth }}
            >
              Machine
            </div>
            <div className="flex relative">
              {timeSlots.map((slot, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-2 py-2 text-xs font-medium text-neutral-60 border-r border-neutral-10 text-center"
                  style={{ width: slotWidth }}
                >
                  {mode === "day" ? `${slot}:00` : slot}
                </div>
              ))}
            </div>
          </div>

          {/* Machine rows */}
          {machines.map((machine) => {
            const machineJobs = jobBlocks.filter((j) => j.machineId === machine.id)
            return (
              <div key={machine.id} className="flex border-b border-neutral-10 hover:bg-neutral-5/50 transition-colors">
                <div
                  className="flex-shrink-0 px-3 flex items-center text-sm font-medium text-neutral-90 border-r border-neutral-20 bg-white"
                  style={{ width: machineColWidth, height: rowHeight }}
                >
                  <span className="truncate">{machine.name}</span>
                </div>
                <div className="relative flex-1" style={{ height: rowHeight }}>
                  {/* Grid lines */}
                  {timeSlots.map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 border-r border-neutral-10"
                      style={{ left: i * slotWidth }}
                    />
                  ))}

                  {/* Job blocks */}
                  {machineJobs.map((job) => {
                    const left = (job.startHour - 8) * slotWidth
                    const width = job.duration * slotWidth - 4
                    return (
                      <div
                        key={job.id}
                        className={`absolute top-2 rounded-md border cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md ${priorityColors[job.priority]} ${priorityTextColors[job.priority]}`}
                        style={{
                          left: left + 2,
                          width: Math.max(width, 60),
                          height: rowHeight - 16,
                        }}
                        onClick={(e) => handleJobClick(job, e)}
                      >
                        <div className="flex items-center h-full px-2 gap-1.5 overflow-hidden">
                          <div className="w-1 h-4 rounded-full bg-black/20 flex-shrink-0 cursor-grab" />
                          <div className="flex flex-col min-w-0 leading-tight">
                            <span className="text-xs font-semibold truncate">{job.jobNumber}</span>
                            <span className="text-[10px] truncate opacity-80">{job.customer}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Current time indicator */}
                  {mode === "day" && currentTimeOffset >= 0 && currentTimeOffset <= slotWidth * timeSlots.length && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-critical-70 z-10"
                      style={{ left: currentTimeOffset }}
                    >
                      <div className="absolute -top-1 -left-1.5 w-3.5 h-3.5 bg-critical-70 rounded-full border-2 border-white" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Job tooltip */}
      {selectedJob && (
        <div
          className="absolute z-50 bg-neutral-100 text-white rounded-lg shadow-xl p-3 min-w-[240px]"
          style={{
            left: Math.min(tooltipPos.x - 120, (containerRef.current?.offsetWidth ?? 500) - 260),
            top: tooltipPos.y - 170,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm">{selectedJob.jobNumber}</span>
            <button onClick={closeTooltip} className="text-neutral-40 hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-40">Customer</span>
              <span>{selectedJob.customer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-40">Product</span>
              <span className="text-right max-w-[140px] truncate">{selectedJob.product}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-40">Time</span>
              <span>
                {Math.floor(selectedJob.startHour)}:{(selectedJob.startHour % 1) * 60 === 0 ? "00" : "30"} -{" "}
                {Math.floor(selectedJob.startHour + selectedJob.duration)}:
                {((selectedJob.startHour + selectedJob.duration) % 1) * 60 === 0 ? "00" : "30"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-40">Priority</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${priorityBadge[selectedJob.priority]}`}>
                {selectedJob.priority.charAt(0).toUpperCase() + selectedJob.priority.slice(1)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-40">Status</span>
              <span className="text-info-50">{statusLabels[selectedJob.status]}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
