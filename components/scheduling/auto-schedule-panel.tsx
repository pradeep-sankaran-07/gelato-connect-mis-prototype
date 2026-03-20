"use client"

import { useState } from "react"
import { Bot, Zap, BarChart3, Layers, Loader2, CheckCircle2, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type OptimizationMode = "fastest" | "balanced" | "changeovers"

interface ScheduleChange {
  id: string
  jobNumber: string
  fromMachine: string
  toMachine: string
  fromTime: string
  toTime: string
  reason: string
}

const mockChanges: ScheduleChange[] = [
  { id: "c1", jobNumber: "J-1003", fromMachine: "HP Indigo 7900", toMachine: "HP Indigo 5900", fromTime: "14:00", toTime: "15:00", reason: "Reduce load on overutilized press" },
  { id: "c2", jobNumber: "J-1005", fromMachine: "HP Indigo 5900", toMachine: "KBA Rapida 105", fromTime: "12:00", toTime: "10:00", reason: "Better substrate match" },
  { id: "c3", jobNumber: "J-1010", fromMachine: "HP Latex 800", toMachine: "HP Latex 800", fromTime: "13:00", toTime: "12:00", reason: "Close gap after J-1009" },
  { id: "c4", jobNumber: "J-1014", fromMachine: "Muller Martini Presto", toMachine: "Muller Martini Presto", fromTime: "13:00", toTime: "14:00", reason: "Wait for upstream job completion" },
  { id: "c5", jobNumber: "J-1011", fromMachine: "Polar N115 Cutter", toMachine: "Polar N115 Cutter", fromTime: "11:00", toTime: "10:30", reason: "Earlier start to meet deadline" },
  { id: "c6", jobNumber: "J-1006", fromMachine: "HP Indigo 5900", toMachine: "HP Indigo 7900", fromTime: "15:00", toTime: "16:30", reason: "Group label jobs together" },
  { id: "c7", jobNumber: "J-1015", fromMachine: "Komfi Delta 52", toMachine: "Komfi Delta 52", fromTime: "10:00", toTime: "09:00", reason: "Fill idle morning slot" },
  { id: "c8", jobNumber: "J-1002", fromMachine: "HP Indigo 7900", toMachine: "HP Indigo 5900", fromTime: "11:00", toTime: "11:30", reason: "Reduce changeover on 7900" },
  { id: "c9", jobNumber: "J-1012", fromMachine: "Polar N115 Cutter", toMachine: "Polar N115 Cutter", fromTime: "13:00", toTime: "12:30", reason: "Close scheduling gap" },
  { id: "c10", jobNumber: "J-1008", fromMachine: "KBA Rapida 105", toMachine: "KBA Rapida 105", fromTime: "09:30", toTime: "09:00", reason: "Earlier start after setup" },
  { id: "c11", jobNumber: "J-1013", fromMachine: "MBO K800 Folder", toMachine: "MBO K800 Folder", fromTime: "09:00", toTime: "08:30", reason: "Align with upstream completion" },
  { id: "c12", jobNumber: "J-1009", fromMachine: "HP Latex 800", toMachine: "HP Latex 800", fromTime: "08:00", toTime: "08:00", reason: "No change needed" },
]

const optimizationModes: { id: OptimizationMode; icon: React.ElementType; title: string; description: string }[] = [
  { id: "fastest", icon: Zap, title: "Fastest Delivery", description: "Prioritize due dates, minimize late jobs" },
  { id: "balanced", icon: BarChart3, title: "Balanced Utilization", description: "Spread load evenly across machines" },
  { id: "changeovers", icon: Layers, title: "Minimize Changeovers", description: "Group similar substrates/products" },
]

interface AutoSchedulePanelProps {
  open: boolean
  onClose: () => void
  onApply?: () => void
}

export default function AutoSchedulePanel({ open, onClose, onApply }: AutoSchedulePanelProps) {
  const [selectedMode, setSelectedMode] = useState<OptimizationMode>("balanced")
  const [phase, setPhase] = useState<"configure" | "running" | "preview">("configure")
  const [appliedMessage, setAppliedMessage] = useState<string | null>(null)

  const handleRunSchedule = () => {
    setPhase("running")
    setTimeout(() => {
      setPhase("preview")
    }, 2000)
  }

  const handleApply = () => {
    setAppliedMessage("12 jobs rescheduled successfully")
    onApply?.()
    setTimeout(() => {
      setAppliedMessage(null)
      setPhase("configure")
      onClose()
    }, 2500)
  }

  const handleCancel = () => {
    setPhase("configure")
  }

  if (!open) return null

  const changesShown = mockChanges.filter((c) => c.fromMachine !== c.toMachine || c.fromTime !== c.toTime).slice(0, 8)

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] bg-white border-l border-neutral-20 shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-5 flex items-center justify-center">
            <Bot className="h-4.5 w-4.5 text-primary-90" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-neutral-100">AI Auto-Schedule</h3>
            <p className="text-xs text-neutral-50">Optimize production schedule</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-neutral-5 text-neutral-50 hover:text-neutral-90 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Toast notification */}
      {appliedMessage && (
        <div className="mx-5 mt-3 px-3 py-2.5 bg-success-10 border border-success-70 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-success-70 flex-shrink-0" />
          <span className="text-sm font-medium text-success-90">{appliedMessage}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {phase === "configure" && (
          <div className="space-y-5">
            {/* Optimization mode selector */}
            <div>
              <label className="text-xs font-medium text-neutral-70 uppercase tracking-wide">Optimization Mode</label>
              <div className="mt-3 space-y-2">
                {optimizationModes.map((mode) => {
                  const Icon = mode.icon
                  const isSelected = selectedMode === mode.id
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? "border-neutral-100 bg-neutral-5"
                          : "border-neutral-20 bg-white hover:border-neutral-40"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-neutral-100 text-white" : "bg-neutral-10 text-neutral-60"}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-neutral-100">{mode.title}</div>
                          <div className="text-xs text-neutral-50 mt-0.5">{mode.description}</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Constraints */}
            <div>
              <label className="text-xs font-medium text-neutral-70 uppercase tracking-wide">Constraints</label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2 text-sm text-neutral-80">
                  <input type="checkbox" defaultChecked className="rounded border-neutral-40 text-neutral-100" />
                  Respect machine maintenance windows
                </label>
                <label className="flex items-center gap-2 text-sm text-neutral-80">
                  <input type="checkbox" defaultChecked className="rounded border-neutral-40 text-neutral-100" />
                  Keep urgent jobs on current machines
                </label>
                <label className="flex items-center gap-2 text-sm text-neutral-80">
                  <input type="checkbox" className="rounded border-neutral-40 text-neutral-100" />
                  Allow overtime scheduling (after 18:00)
                </label>
              </div>
            </div>

            <Button
              onClick={handleRunSchedule}
              className="w-full bg-neutral-100 hover:bg-neutral-90 text-white rounded-full h-10 text-sm font-medium"
            >
              <Bot className="h-4 w-4 mr-2" />
              Run Auto-Schedule
            </Button>
          </div>
        )}

        {phase === "running" && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary-5 flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-primary-70 animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-100">Optimizing schedule...</p>
              <p className="text-xs text-neutral-50 mt-1">Analyzing 15 jobs across 8 machines</p>
            </div>
            <div className="w-48 h-1.5 bg-neutral-10 rounded-full overflow-hidden">
              <div className="h-full bg-neutral-100 rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        )}

        {phase === "preview" && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="p-3 bg-success-10 border border-success-70 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-success-70" />
                <span className="text-sm font-semibold text-success-90">Optimization Complete</span>
              </div>
              <p className="text-xs text-success-90 ml-6">12 jobs rescheduled. Estimated 2h overtime saved, 15% better utilization balance.</p>
            </div>

            {/* Changes list */}
            <div>
              <label className="text-xs font-medium text-neutral-70 uppercase tracking-wide">Proposed Changes</label>
              <div className="mt-2 space-y-2">
                {changesShown.map((change) => (
                  <div key={change.id} className="p-2.5 border border-neutral-20 rounded-lg bg-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-neutral-100">{change.jobNumber}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-60">
                      <span>{change.fromMachine}</span>
                      {change.fromMachine !== change.toMachine && (
                        <>
                          <ArrowRight className="h-3 w-3 text-neutral-40" />
                          <span className="text-info-70 font-medium">{change.toMachine}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-50 mt-0.5">
                      <span>{change.fromTime}</span>
                      <ArrowRight className="h-3 w-3 text-neutral-40" />
                      <span className="text-info-70 font-medium">{change.toTime}</span>
                    </div>
                    <p className="text-[11px] text-neutral-50 mt-1">{change.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      {phase === "preview" && !appliedMessage && (
        <div className="border-t border-neutral-20 px-5 py-3 flex gap-2">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 rounded-full border-neutral-40 text-neutral-90 hover:bg-neutral-5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-neutral-100 hover:bg-neutral-90 text-white rounded-full"
          >
            Apply Changes
          </Button>
        </div>
      )}
    </div>
  )
}
