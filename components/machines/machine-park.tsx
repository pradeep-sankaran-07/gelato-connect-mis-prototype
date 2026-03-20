"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Activity,
  Pause,
  Wrench,
  AlertTriangle,
  Zap,
  Clock,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"

// ── Machine data ───────────────────────────────────────────────────────

interface Machine {
  id: string
  name: string
  type: string
  status: "running" | "idle" | "maintenance" | "error"
  utilization: number
  currentJob: string | null
  capabilities: string[]
  lastMaintenance: string
}

const machines: Machine[] = [
  {
    id: "machine-001",
    name: "HP Indigo 7900",
    type: "Digital Press",
    status: "running",
    utilization: 87,
    currentJob: "J-18 Business Cards for Acme Corp",
    capabilities: ["CMYK", "Spot Color", "White Ink", "Variable Data"],
    lastMaintenance: "2026-03-14",
  },
  {
    id: "machine-002",
    name: "HP Indigo 5900",
    type: "Digital Press",
    status: "running",
    utilization: 72,
    currentJob: "J-22 DL Flyers for Nordic Media",
    capabilities: ["CMYK", "Spot Color", "Duplex"],
    lastMaintenance: "2026-03-10",
  },
  {
    id: "machine-003",
    name: "KBA Rapida 105",
    type: "Offset Press",
    status: "idle",
    utilization: 45,
    currentJob: null,
    capabilities: ["CMYK", "Pantone", "UV Coating", "Large Format"],
    lastMaintenance: "2026-03-08",
  },
  {
    id: "machine-004",
    name: "HP Latex 800",
    type: "Wide Format",
    status: "running",
    utilization: 91,
    currentJob: "J-25 Roll-up Banners for Athletix",
    capabilities: ["CMYK", "Wide Format", "Vinyl", "Canvas", "Textile"],
    lastMaintenance: "2026-03-12",
  },
  {
    id: "machine-005",
    name: "Polar N115",
    type: "Cutter",
    status: "running",
    utilization: 68,
    currentJob: "J-19 A4 Brochures for Sandbox Inc",
    capabilities: ["Precision Cut", "Programmable", "Stack Cut"],
    lastMaintenance: "2026-03-15",
  },
  {
    id: "machine-006",
    name: "MBO K800",
    type: "Folder",
    status: "idle",
    utilization: 35,
    currentJob: null,
    capabilities: ["Gate Fold", "Z-Fold", "Tri-Fold", "Cross Fold"],
    lastMaintenance: "2026-03-11",
  },
  {
    id: "machine-007",
    name: "Muller Martini Presto",
    type: "Binder",
    status: "maintenance",
    utilization: 0,
    currentJob: null,
    capabilities: ["Perfect Bind", "Saddle Stitch", "Wire-O"],
    lastMaintenance: "2026-03-19",
  },
  {
    id: "machine-008",
    name: "Komfi Delta 52",
    type: "Laminator",
    status: "error",
    utilization: 0,
    currentJob: null,
    capabilities: ["Gloss Lamination", "Matte Lamination", "Soft Touch"],
    lastMaintenance: "2026-03-06",
  },
]

// ── Status helpers ─────────────────────────────────────────────────────

const statusConfig = {
  running: {
    label: "Running",
    dotColor: "bg-success-70",
    badgeClass: "bg-success-10 text-success-90",
    icon: Activity,
  },
  idle: {
    label: "Idle",
    dotColor: "bg-neutral-50",
    badgeClass: "bg-neutral-10 text-neutral-90",
    icon: Pause,
  },
  maintenance: {
    label: "Maintenance",
    dotColor: "bg-warning-50",
    badgeClass: "bg-warning-20 text-warning-90",
    icon: Wrench,
  },
  error: {
    label: "Error",
    dotColor: "bg-critical-60",
    badgeClass: "bg-critical-20 text-critical-90",
    icon: AlertTriangle,
  },
}

const statusCounts = {
  running: machines.filter((m) => m.status === "running").length,
  idle: machines.filter((m) => m.status === "idle").length,
  maintenance: machines.filter((m) => m.status === "maintenance").length,
  error: machines.filter((m) => m.status === "error").length,
}

// ── Component ──────────────────────────────────────────────────────────

export default function MachinePark() {
  const { navigateTo } = useNavigation()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMachines = machines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getUtilColor = (util: number) => {
    if (util >= 80) return "bg-success-70"
    if (util >= 50) return "bg-info-70"
    if (util > 0) return "bg-warning-50"
    return "bg-neutral-30"
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-neutral-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-100">Machine Park</h1>
            <p className="text-sm text-neutral-60 mt-1">Monitor and manage your production equipment</p>
          </div>
          <Button className="bg-neutral-100 text-white rounded-full hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Add Machine
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Status Overview Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {(["running", "idle", "maintenance", "error"] as const).map((status) => {
            const cfg = statusConfig[status]
            const Icon = cfg.icon
            return (
              <div
                key={status}
                className="flex items-center gap-3 p-4 rounded-lg border border-neutral-20 bg-white"
              >
                <div className={`p-2 rounded-lg ${cfg.badgeClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-neutral-100">{statusCounts[status]}</div>
                  <div className="text-xs text-neutral-60">{cfg.label}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-50" />
            <Input
              placeholder="Search machines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Machine Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredMachines.map((machine) => {
            const cfg = statusConfig[machine.status]
            return (
              <button
                key={machine.id}
                onClick={() => navigateTo("machine-detail", { machineId: machine.id })}
                className="text-left p-5 rounded-lg border border-neutral-20 bg-white hover:shadow-lg transition-all cursor-pointer group"
              >
                {/* Top row: name + status */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-neutral-100">{machine.name}</h3>
                      <Badge className={`${cfg.badgeClass} rounded-md text-xs`}>
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${cfg.dotColor} mr-1.5`} />
                        {cfg.label}
                      </Badge>
                    </div>
                    <Badge className="bg-neutral-10 text-neutral-70 rounded-md text-xs mt-1.5">{machine.type}</Badge>
                  </div>
                  <ChevronRight className="h-4 w-4 text-neutral-40 group-hover:text-neutral-70 transition-colors mt-1" />
                </div>

                {/* Current job */}
                {machine.currentJob ? (
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-info-10 rounded-md">
                    <Zap className="h-3.5 w-3.5 text-info-70 shrink-0" />
                    <span className="text-xs text-info-90 truncate">{machine.currentJob}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-neutral-5 rounded-md">
                    <Pause className="h-3.5 w-3.5 text-neutral-50 shrink-0" />
                    <span className="text-xs text-neutral-60">No active job</span>
                  </div>
                )}

                {/* Utilization bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-neutral-60">Utilization today</span>
                    <span className="text-xs font-medium text-neutral-90">{machine.utilization}%</span>
                  </div>
                  <div className="h-2 bg-neutral-10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${getUtilColor(machine.utilization)}`}
                      style={{ width: `${machine.utilization}%` }}
                    />
                  </div>
                </div>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {machine.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="px-2 py-0.5 bg-neutral-5 text-neutral-70 text-[11px] rounded font-medium"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                {/* Last maintenance */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-50">
                  <Clock className="h-3 w-3" />
                  Last maintenance: {machine.lastMaintenance}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
