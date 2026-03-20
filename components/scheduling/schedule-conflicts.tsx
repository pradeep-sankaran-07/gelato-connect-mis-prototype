"use client"

import { useState } from "react"
import { AlertTriangle, AlertOctagon, Clock, Wrench, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Conflict {
  id: string
  severity: "critical" | "warning"
  title: string
  description: string
  affectedJobs: string[]
  suggestedResolution: string
  resolved: boolean
}

const initialConflicts: Conflict[] = [
  {
    id: "cf1",
    severity: "critical",
    title: "Job overlap on HP Indigo 7900",
    description:
      "J-1002 and J-1003 overlap on HP Indigo 7900 between 14:00-15:00. J-1002 is scheduled to finish at 14:30 but J-1003 starts at 14:00 with no setup buffer.",
    affectedJobs: ["J-1002", "J-1003"],
    suggestedResolution: "Move J-1003 start time to 15:00, adding a 30-minute setup buffer after J-1002 completes.",
    resolved: false,
  },
  {
    id: "cf2",
    severity: "warning",
    title: "Substrate mismatch on KBA Rapida 105",
    description:
      "J-1008 requires 350gsm coated stock but KBA Rapida 105 is currently loaded with 200gsm uncoated. A full substrate changeover requires approximately 45 minutes.",
    affectedJobs: ["J-1008"],
    suggestedResolution:
      "Schedule a 45-minute changeover before J-1008, or move J-1008 to HP Indigo 5900 which supports auto-feed adjustment for different weights.",
    resolved: false,
  },
  {
    id: "cf3",
    severity: "warning",
    title: "Deadline risk for J-1014",
    description:
      "J-1014 (Metro Books binding) is scheduled on Muller Martini Presto at 13:00. With estimated 3-hour production time, completion at 16:00 leaves zero buffer before the 17:00 due date. Any upstream delay will cause a miss.",
    affectedJobs: ["J-1014", "J-1008"],
    suggestedResolution:
      "Assign J-1014 to second shift (starting 16:00) to guarantee completion, or prioritize its upstream printing job J-1008 to start earlier.",
    resolved: false,
  },
]

interface ScheduleConflictsProps {
  className?: string
  onResolve?: (conflictId: string) => void
}

export default function ScheduleConflicts({ className = "", onResolve }: ScheduleConflictsProps) {
  const [conflicts, setConflicts] = useState<Conflict[]>(initialConflicts)
  const [expandedId, setExpandedId] = useState<string | null>("cf1")

  const handleResolve = (conflictId: string) => {
    setConflicts((prev) =>
      prev.map((c) => (c.id === conflictId ? { ...c, resolved: true } : c))
    )
    onResolve?.(conflictId)
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const unresolvedCount = conflicts.filter((c) => !c.resolved).length
  const criticalCount = conflicts.filter((c) => c.severity === "critical" && !c.resolved).length

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Summary bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="text-sm font-semibold text-neutral-100">Schedule Conflicts</h4>
          {unresolvedCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-critical-20 text-critical-90">
              {unresolvedCount} unresolved
            </span>
          )}
          {criticalCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-critical-70 text-white">
              {criticalCount} critical
            </span>
          )}
        </div>
      </div>

      {/* Conflict list */}
      <div className="space-y-2">
        {conflicts.map((conflict) => {
          const isExpanded = expandedId === conflict.id
          const SeverityIcon = conflict.severity === "critical" ? AlertOctagon : AlertTriangle
          const severityStyles =
            conflict.severity === "critical"
              ? {
                  border: conflict.resolved ? "border-neutral-20" : "border-critical-60",
                  bg: conflict.resolved ? "bg-white" : "bg-critical-5",
                  iconBg: "bg-critical-20",
                  iconColor: "text-critical-70",
                  badge: "bg-critical-70 text-white",
                }
              : {
                  border: conflict.resolved ? "border-neutral-20" : "border-warning-70",
                  bg: conflict.resolved ? "bg-white" : "bg-warning-10",
                  iconBg: "bg-warning-20",
                  iconColor: "text-warning-70",
                  badge: "bg-warning-70 text-white",
                }

          return (
            <div
              key={conflict.id}
              className={`border rounded-lg transition-all ${severityStyles.border} ${severityStyles.bg} ${conflict.resolved ? "opacity-60" : ""}`}
            >
              {/* Conflict header */}
              <button
                onClick={() => toggleExpand(conflict.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
              >
                <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${severityStyles.iconBg}`}>
                  {conflict.resolved ? (
                    <CheckCircle2 className="h-4 w-4 text-success-70" />
                  ) : (
                    <SeverityIcon className={`h-4 w-4 ${severityStyles.iconColor}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${conflict.resolved ? "text-neutral-50 line-through" : "text-neutral-100"}`}>
                      {conflict.title}
                    </span>
                    {!conflict.resolved && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${severityStyles.badge}`}>
                        {conflict.severity}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {conflict.affectedJobs.map((job) => (
                      <span key={job} className="text-[11px] px-1.5 py-0.5 bg-neutral-10 text-neutral-70 rounded font-medium">
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-neutral-40 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-neutral-40 flex-shrink-0" />
                )}
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-0 ml-10 space-y-2.5">
                  <p className="text-xs text-neutral-70 leading-relaxed">{conflict.description}</p>
                  <div className="p-2.5 bg-white border border-neutral-20 rounded-md">
                    <div className="flex items-start gap-2">
                      <Wrench className="h-3.5 w-3.5 text-info-70 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[11px] font-medium text-neutral-70 uppercase tracking-wide">Suggested Resolution</span>
                        <p className="text-xs text-neutral-80 mt-0.5 leading-relaxed">{conflict.suggestedResolution}</p>
                      </div>
                    </div>
                  </div>
                  {!conflict.resolved && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleResolve(conflict.id)}
                        size="sm"
                        className="h-7 text-xs bg-neutral-100 hover:bg-neutral-90 text-white rounded-full px-3"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs rounded-full border-neutral-40 text-neutral-70 px-3"
                      >
                        Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
