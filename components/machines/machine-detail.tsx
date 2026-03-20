"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Pencil,
  Activity,
  Pause,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  CalendarDays,
  Hash,
  Cpu,
  Send,
  FolderOpen,
  FolderOutput,
  ToggleLeft,
  RefreshCw,
  Plus,
  Bell,
  X,
  AlertCircle,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useNavigation } from "@/lib/navigation-context"
import { toast } from "sonner"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// ── Machine profiles ───────────────────────────────────────────────────

interface MachineProfile {
  id: string
  name: string
  type: string
  model: string
  serial: string
  location: string
  installDate: string
  status: "running" | "idle" | "maintenance" | "error"
  capabilities: string[]
  substrates: string[]
  maxSheet: string
  setupTime: string
}

const machineProfiles: Record<string, MachineProfile> = {
  "machine-001": {
    id: "machine-001",
    name: "HP Indigo 7900",
    type: "Digital Press",
    model: "Indigo 7900",
    serial: "SN-IND7900-2024-0142",
    location: "Production Hall A — Bay 1",
    installDate: "2024-06-15",
    status: "running",
    capabilities: ["CMYK", "Spot Color", "White Ink", "Variable Data", "HP SmartStream"],
    substrates: ["Coated 100–350gsm", "Uncoated 80–300gsm", "Synthetic up to 400 micron"],
    maxSheet: "320 x 450mm (SRA3)",
    setupTime: "12 minutes",
  },
  "machine-002": {
    id: "machine-002",
    name: "HP Indigo 5900",
    type: "Digital Press",
    model: "Indigo 5900",
    serial: "SN-IND5900-2023-0087",
    location: "Production Hall A — Bay 2",
    installDate: "2023-11-20",
    status: "running",
    capabilities: ["CMYK", "Spot Color", "Duplex", "ElectroInk"],
    substrates: ["Coated 100–350gsm", "Uncoated 80–300gsm"],
    maxSheet: "320 x 450mm (SRA3)",
    setupTime: "10 minutes",
  },
  "machine-003": {
    id: "machine-003",
    name: "KBA Rapida 105",
    type: "Offset Press",
    model: "Rapida 105-5+L",
    serial: "SN-KBA105-2022-0031",
    location: "Production Hall B — Bay 1",
    installDate: "2022-03-10",
    status: "idle",
    capabilities: ["CMYK", "Pantone", "UV Coating", "Large Format", "5-Color"],
    substrates: ["Coated 90–400gsm", "Uncoated 80–350gsm", "Board up to 0.8mm"],
    maxSheet: "720 x 1050mm",
    setupTime: "25 minutes",
  },
  "machine-004": {
    id: "machine-004",
    name: "HP Latex 800",
    type: "Wide Format",
    model: "Latex 800W",
    serial: "SN-LAT800-2024-0015",
    location: "Wide Format Room — Bay 1",
    installDate: "2024-01-08",
    status: "running",
    capabilities: ["CMYK", "Wide Format", "Vinyl", "Canvas", "Textile", "White Ink"],
    substrates: ["Vinyl up to 3.2m", "Canvas", "Textile", "Self-adhesive", "Backlit film"],
    maxSheet: "3200mm roll width",
    setupTime: "8 minutes",
  },
  "machine-005": {
    id: "machine-005",
    name: "Polar N115",
    type: "Cutter",
    model: "N115 Plus",
    serial: "SN-POL115-2023-0056",
    location: "Finishing Area — Station 1",
    installDate: "2023-07-22",
    status: "running",
    capabilities: ["Precision Cut", "Programmable", "Stack Cut", "PACE Automation"],
    substrates: ["Paper up to 115cm", "Board up to 80mm stack"],
    maxSheet: "1150mm cutting width",
    setupTime: "5 minutes",
  },
  "machine-006": {
    id: "machine-006",
    name: "MBO K800",
    type: "Folder",
    model: "K800.2 S-KTL/4",
    serial: "SN-MBO800-2024-0008",
    location: "Finishing Area — Station 2",
    installDate: "2024-04-30",
    status: "idle",
    capabilities: ["Gate Fold", "Z-Fold", "Tri-Fold", "Cross Fold", "Map Fold"],
    substrates: ["Paper 60–200gsm", "Up to 800mm width"],
    maxSheet: "800mm width",
    setupTime: "15 minutes",
  },
  "machine-007": {
    id: "machine-007",
    name: "Muller Martini Presto",
    type: "Binder",
    model: "Presto II",
    serial: "SN-MMR-2022-0019",
    location: "Finishing Area — Station 3",
    installDate: "2022-09-05",
    status: "maintenance",
    capabilities: ["Perfect Bind", "Saddle Stitch", "Wire-O", "PUR Binding"],
    substrates: ["Covers up to 350gsm", "Text blocks 60–170gsm"],
    maxSheet: "320 x 450mm",
    setupTime: "20 minutes",
  },
  "machine-008": {
    id: "machine-008",
    name: "Komfi Delta 52",
    type: "Laminator",
    model: "Delta 52",
    serial: "SN-KOM52-2023-0034",
    location: "Finishing Area — Station 4",
    installDate: "2023-05-18",
    status: "error",
    capabilities: ["Gloss Lamination", "Matte Lamination", "Soft Touch", "Anti-scuff"],
    substrates: ["Paper/Board 100–400gsm", "Max width 520mm"],
    maxSheet: "520mm width",
    setupTime: "7 minutes",
  },
}

// Fallback for any machine not matched
const defaultProfile: MachineProfile = machineProfiles["machine-001"]

// ── Production Log data ────────────────────────────────────────────────

const productionLog = [
  { date: "2026-03-19", job: "J-18", product: "Business Cards 350gsm", impressions: 2500, sheets: 1250, waste: 38, wastePct: 3.0, duration: "1h 15m" },
  { date: "2026-03-19", job: "J-20", product: "A5 Flyer 170gsm", impressions: 1800, sheets: 900, waste: 32, wastePct: 3.6, duration: "48m" },
  { date: "2026-03-18", job: "J-17", product: "DL Leaflet 150gsm", impressions: 3200, sheets: 1600, waste: 45, wastePct: 2.8, duration: "2h 05m" },
  { date: "2026-03-18", job: "J-16", product: "Postcard 300gsm", impressions: 1200, sheets: 600, waste: 22, wastePct: 3.7, duration: "35m" },
  { date: "2026-03-17", job: "J-15", product: "A4 Brochure 200gsm", impressions: 800, sheets: 400, waste: 10, wastePct: 2.5, duration: "28m" },
  { date: "2026-03-17", job: "J-14", product: "Business Cards 350gsm", impressions: 5000, sheets: 2500, waste: 85, wastePct: 3.4, duration: "2h 30m" },
  { date: "2026-03-16", job: "J-13", product: "Invitation Card 250gsm", impressions: 600, sheets: 300, waste: 8, wastePct: 2.7, duration: "18m" },
  { date: "2026-03-16", job: "J-12", product: "A2 Poster 200gsm", impressions: 400, sheets: 400, waste: 15, wastePct: 3.8, duration: "22m" },
  { date: "2026-03-15", job: "J-11", product: "DL Flyer 170gsm", impressions: 4500, sheets: 2250, waste: 68, wastePct: 3.0, duration: "2h 10m" },
  { date: "2026-03-15", job: "J-10", product: "A6 Notepad Cover 300gsm", impressions: 1500, sheets: 750, waste: 25, wastePct: 3.3, duration: "42m" },
]

const dailyImpressions = [
  { day: "Mar 13", impressions: 1850 },
  { day: "Mar 14", impressions: 2100 },
  { day: "Mar 15", impressions: 2450 },
  { day: "Mar 16", impressions: 1680 },
  { day: "Mar 17", impressions: 1920 },
  { day: "Mar 18", impressions: 2340 },
  { day: "Mar 19", impressions: 2190 },
]

// ── Alerts data ────────────────────────────────────────────────────────

const initialAlerts = [
  { id: 1, date: "2026-03-19 14:30", type: "error" as const, message: "Fuser unit temperature exceeded threshold", acknowledged: false },
  { id: 2, date: "2026-03-19 08:00", type: "maintenance" as const, message: "Scheduled head alignment due", acknowledged: false },
  { id: 3, date: "2026-03-18 16:45", type: "warning" as const, message: "Ink level low — Cyan (12% remaining)", acknowledged: false },
  { id: 4, date: "2026-03-17 11:20", type: "warning" as const, message: "Paper tray 2 misalignment detected", acknowledged: true },
  { id: 5, date: "2026-03-16 09:15", type: "maintenance" as const, message: "Belt tension check recommended", acknowledged: true },
  { id: 6, date: "2026-03-15 14:00", type: "error" as const, message: "Print head nozzle blockage cleared automatically", acknowledged: true },
]

// ── Maintenance data ───────────────────────────────────────────────────

const maintenanceSchedule = [
  { task: "Print Head Cleaning", frequency: "Weekly", lastPerformed: "2026-03-14", nextDue: "2026-03-21", status: "on-track" },
  { task: "Fuser Replacement", frequency: "Every 100K impressions", lastPerformed: "2026-02-28", nextDue: "~2026-04-15", status: "on-track" },
  { task: "Belt Inspection", frequency: "Monthly", lastPerformed: "2026-03-01", nextDue: "2026-04-01", status: "on-track" },
  { task: "Ink System Purge", frequency: "Bi-weekly", lastPerformed: "2026-03-08", nextDue: "2026-03-22", status: "on-track" },
  { task: "Calibration", frequency: "Monthly", lastPerformed: "2026-03-05", nextDue: "2026-04-05", status: "on-track" },
]

const maintenanceHistory = [
  { date: "2026-03-14", task: "Print Head Cleaning", tech: "Lars M.", duration: "25 min", notes: "All heads nominal" },
  { date: "2026-03-08", task: "Ink System Purge", tech: "Anna K.", duration: "40 min", notes: "Replaced magenta line filter" },
  { date: "2026-03-05", task: "Calibration", tech: "Lars M.", duration: "35 min", notes: "Color profile updated" },
  { date: "2026-03-01", task: "Belt Inspection", tech: "Thomas R.", duration: "20 min", notes: "Belt tension within spec" },
  { date: "2026-02-28", task: "Fuser Replacement", tech: "Anna K.", duration: "1h 30m", notes: "Replaced fuser unit #3" },
  { date: "2026-02-22", task: "Ink System Purge", tech: "Lars M.", duration: "35 min", notes: "Routine — no issues" },
  { date: "2026-02-20", task: "Print Head Cleaning", tech: "Lars M.", duration: "25 min", notes: "Cyan nozzle blockage cleared" },
  { date: "2026-02-15", task: "Calibration", tech: "Thomas R.", duration: "30 min", notes: "Density targets met" },
  { date: "2026-02-08", task: "Ink System Purge", tech: "Anna K.", duration: "40 min", notes: "Routine" },
  { date: "2026-02-05", task: "Belt Inspection", tech: "Thomas R.", duration: "20 min", notes: "Minor wear noted — monitor" },
]

// ── JDF sample XML ─────────────────────────────────────────────────────

const sampleJDF = `<?xml version="1.0" encoding="UTF-8"?>
<JDF xmlns="http://www.CIP4.org/JDFSchema_1_7"
     Type="Combined" Version="1.7"
     JobID="J-18" JobPartID="P001"
     Status="Waiting" Types="DigitalPrinting">
  <ResourcePool>
    <Media ID="M001" Class="Consumable"
           MediaType="Paper" Weight="350"
           Dimension="918 1296" />
    <RunList ID="RL001" Class="Parameter">
      <LayoutElement>
        <FileSpec URL="file:///jobs/J-18/artwork.pdf" />
      </LayoutElement>
    </RunList>
    <DigitalPrintingParams ID="DP001"
          Class="Parameter" Sides="TwoSidedFlipY" />
    <ColorantOrder>
      <SeparationSpec Name="Cyan"/>
      <SeparationSpec Name="Magenta"/>
      <SeparationSpec Name="Yellow"/>
      <SeparationSpec Name="Black"/>
    </ColorantOrder>
  </ResourcePool>
  <ResourceLinkPool>
    <MediaLink rRef="M001" Usage="Input"/>
    <RunListLink rRef="RL001" Usage="Input"/>
    <DigitalPrintingParamsLink rRef="DP001"
          Usage="Input"/>
  </ResourceLinkPool>
</JDF>`

// ── Status config ──────────────────────────────────────────────────────

const statusConfig = {
  running: { label: "Running", dotColor: "bg-success-70", badgeClass: "bg-success-10 text-success-90", icon: Activity },
  idle: { label: "Idle", dotColor: "bg-neutral-50", badgeClass: "bg-neutral-10 text-neutral-90", icon: Pause },
  maintenance: { label: "Maintenance", dotColor: "bg-warning-50", badgeClass: "bg-warning-20 text-warning-90", icon: Wrench },
  error: { label: "Error", dotColor: "bg-critical-60", badgeClass: "bg-critical-20 text-critical-90", icon: AlertTriangle },
}

// ── Component ──────────────────────────────────────────────────────────

export default function MachineDetail() {
  const { params, goBack } = useNavigation()
  const machineId = params.machineId || "machine-001"
  const machine = machineProfiles[machineId] || defaultProfile

  const [activeTab, setActiveTab] = useState("overview")
  const [alerts, setAlerts] = useState(initialAlerts)

  // JDF state
  const [jdfVersion, setJdfVersion] = useState("1.7")
  const [inputFolder, setInputFolder] = useState("/var/spool/jdf/input/")
  const [outputFolder, setOutputFolder] = useState("/var/spool/jdf/output/")
  const [autoSend, setAutoSend] = useState(true)

  // Maintenance modal
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
  const [maintTask, setMaintTask] = useState("")
  const [maintDate, setMaintDate] = useState("2026-03-25")
  const [maintNotes, setMaintNotes] = useState("")

  const cfg = statusConfig[machine.status]
  const StatusIcon = cfg.icon

  const acknowledgeAlert = (id: number) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)))
    toast.success("Alert acknowledged")
  }

  const handleTestJob = () => {
    toast.success("Test JDF job sent successfully", { description: "Response received in 1.2s — device ready." })
  }

  const handleScheduleMaintenance = () => {
    if (!maintTask.trim()) {
      toast.error("Please enter a task name")
      return
    }
    setShowMaintenanceModal(false)
    toast.success("Maintenance scheduled", { description: `"${maintTask}" scheduled for ${maintDate}` })
    setMaintTask("")
    setMaintNotes("")
  }

  // Production summary stats
  const todayLogs = productionLog.filter((l) => l.date === "2026-03-19")
  const totalImpressionsToday = todayLogs.reduce((sum, l) => sum + l.impressions, 0)
  const avgWaste = (productionLog.reduce((sum, l) => sum + l.wastePct, 0) / productionLog.length).toFixed(1)
  const jobsCompletedToday = todayLogs.length

  const alertTypeConfig = {
    error: { icon: AlertCircle, badgeClass: "bg-critical-20 text-critical-90", label: "ERROR" },
    maintenance: { icon: Wrench, badgeClass: "bg-warning-20 text-warning-90", label: "MAINTENANCE" },
    warning: { icon: AlertTriangle, badgeClass: "bg-caution-20 text-caution-90", label: "WARNING" },
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-neutral-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="text-neutral-60 hover:text-neutral-100"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="h-6 w-px bg-neutral-20" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-neutral-100">{machine.name}</h1>
                <Badge className={`${cfg.badgeClass} rounded-md`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${cfg.dotColor} mr-1.5`} />
                  {cfg.label}
                </Badge>
              </div>
              <p className="text-sm text-neutral-60 mt-0.5">{machine.type} — {machine.model}</p>
            </div>
          </div>
          <Button variant="outline" className="rounded-full border-neutral-40">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="production">Production Log</TabsTrigger>
            <TabsTrigger value="jdf">JDF Integration</TabsTrigger>
            <TabsTrigger value="alerts">
              Alerts
              {alerts.filter((a) => !a.acknowledged).length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-critical-60 text-white rounded-full">
                  {alerts.filter((a) => !a.acknowledged).length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          {/* ─── Overview Tab ─────────────────────────────────────── */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 gap-6">
              {/* Machine Info */}
              <div className="rounded-lg border border-neutral-20 p-5">
                <h3 className="text-sm font-semibold text-neutral-100 mb-4">Machine Information</h3>
                <dl className="space-y-3">
                  {[
                    { icon: Cpu, label: "Type", value: machine.type },
                    { icon: Hash, label: "Model", value: machine.model },
                    { icon: Hash, label: "Serial Number", value: machine.serial },
                    { icon: MapPin, label: "Location", value: machine.location },
                    { icon: CalendarDays, label: "Installation Date", value: machine.installDate },
                    { icon: Clock, label: "Setup Time", value: machine.setupTime },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <item.icon className="h-4 w-4 text-neutral-50 mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-xs text-neutral-60">{item.label}</dt>
                        <dd className="text-sm text-neutral-100">{item.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Current Status */}
                <div className="rounded-lg border border-neutral-20 p-5">
                  <h3 className="text-sm font-semibold text-neutral-100 mb-4">Current Status</h3>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${cfg.badgeClass}`}>
                      <StatusIcon className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-neutral-100">{cfg.label}</div>
                      <div className="text-sm text-neutral-60">
                        {machine.status === "running" && "Machine is actively processing a job"}
                        {machine.status === "idle" && "Machine is online and ready for jobs"}
                        {machine.status === "maintenance" && "Scheduled maintenance in progress"}
                        {machine.status === "error" && "Machine requires attention — check alerts"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="rounded-lg border border-neutral-20 p-5">
                  <h3 className="text-sm font-semibold text-neutral-100 mb-3">Capabilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {machine.capabilities.map((cap) => (
                      <Badge key={cap} className="bg-primary-5 text-primary-90 rounded-md text-xs">{cap}</Badge>
                    ))}
                  </div>
                </div>

                {/* Substrates */}
                <div className="rounded-lg border border-neutral-20 p-5">
                  <h3 className="text-sm font-semibold text-neutral-100 mb-3">Supported Substrates</h3>
                  <ul className="space-y-1.5">
                    {machine.substrates.map((sub) => (
                      <li key={sub} className="flex items-center gap-2 text-sm text-neutral-90">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-40" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-neutral-20">
                    <span className="text-xs text-neutral-60">Max sheet size: </span>
                    <span className="text-xs font-medium text-neutral-100">{machine.maxSheet}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ─── Production Log Tab ───────────────────────────────── */}
          <TabsContent value="production">
            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg border border-neutral-20 p-4">
                <div className="text-xs text-neutral-60 mb-1">Total Impressions Today</div>
                <div className="text-2xl font-semibold text-neutral-100">{totalImpressionsToday.toLocaleString()}</div>
              </div>
              <div className="rounded-lg border border-neutral-20 p-4">
                <div className="text-xs text-neutral-60 mb-1">Avg Waste Rate</div>
                <div className="text-2xl font-semibold text-neutral-100">{avgWaste}%</div>
              </div>
              <div className="rounded-lg border border-neutral-20 p-4">
                <div className="text-xs text-neutral-60 mb-1">Jobs Completed Today</div>
                <div className="text-2xl font-semibold text-neutral-100">{jobsCompletedToday}</div>
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-lg border border-neutral-20 p-5 mb-6">
              <h3 className="text-sm font-semibold text-neutral-100 mb-4">Daily Impressions — Last 7 Days</h3>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyImpressions} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#8a8a8a" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#8a8a8a" }} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e6e6e6",
                        fontSize: "13px",
                      }}
                    />
                    <Bar dataKey="impressions" fill="#212121" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Log table */}
            <div className="border border-neutral-20 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-5">
                    {["Date", "Job #", "Product", "Impressions", "Sheets", "Waste Sheets", "Waste %", "Duration"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productionLog.map((row, i) => (
                    <tr key={i} className="hover:bg-neutral-5/50">
                      <td className="px-4 py-2.5 text-sm text-neutral-90 border-b border-neutral-20">{row.date}</td>
                      <td className="px-4 py-2.5 text-sm font-medium text-neutral-100 border-b border-neutral-20">{row.job}</td>
                      <td className="px-4 py-2.5 text-sm text-neutral-90 border-b border-neutral-20">{row.product}</td>
                      <td className="px-4 py-2.5 text-sm text-neutral-90 border-b border-neutral-20 text-right">{row.impressions.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-sm text-neutral-90 border-b border-neutral-20 text-right">{row.sheets.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-sm text-neutral-90 border-b border-neutral-20 text-right">{row.waste}</td>
                      <td className="px-4 py-2.5 text-sm border-b border-neutral-20 text-right">
                        <span className={row.wastePct > 3.5 ? "text-warning-70 font-medium" : "text-neutral-90"}>{row.wastePct}%</span>
                      </td>
                      <td className="px-4 py-2.5 text-sm text-neutral-60 border-b border-neutral-20">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ─── JDF Integration Tab ──────────────────────────────── */}
          <TabsContent value="jdf">
            <div className="grid grid-cols-2 gap-6">
              {/* Settings */}
              <div className="space-y-6">
                <div className="rounded-lg border border-neutral-20 p-5">
                  <h3 className="text-sm font-semibold text-neutral-100 mb-4">JDF Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-neutral-90">JDF Version</Label>
                      <Select value={jdfVersion} onValueChange={setJdfVersion}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.4">JDF 1.4</SelectItem>
                          <SelectItem value="1.5">JDF 1.5</SelectItem>
                          <SelectItem value="1.7">JDF 1.7</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-neutral-90">Input Folder</Label>
                      <div className="flex gap-2">
                        <Input value={inputFolder} onChange={(e) => setInputFolder(e.target.value)} className="flex-1" />
                        <Button variant="outline" size="sm" className="rounded-full border-neutral-40 shrink-0">
                          <FolderOpen className="h-4 w-4 mr-1" />
                          Browse
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-neutral-90">Output Folder</Label>
                      <div className="flex gap-2">
                        <Input value={outputFolder} onChange={(e) => setOutputFolder(e.target.value)} className="flex-1" />
                        <Button variant="outline" size="sm" className="rounded-full border-neutral-40 shrink-0">
                          <FolderOpen className="h-4 w-4 mr-1" />
                          Browse
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-neutral-90">Auto-send Jobs</Label>
                        <p className="text-xs text-neutral-60">Automatically send JDF to machine when job is queued</p>
                      </div>
                      <Switch checked={autoSend} onCheckedChange={setAutoSend} />
                    </div>

                    <div className="pt-2 border-t border-neutral-20">
                      <div className="flex items-center gap-2 text-xs text-neutral-60 mb-3">
                        <RefreshCw className="h-3.5 w-3.5" />
                        Last JDF sync: 2026-03-19 14:22:08
                      </div>
                      <Button
                        className="bg-neutral-100 text-white rounded-full hover:opacity-90"
                        onClick={handleTestJob}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Test Job
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* JDF Preview */}
              <div className="rounded-lg border border-neutral-20 p-5">
                <h3 className="text-sm font-semibold text-neutral-100 mb-3">JDF Preview — Sample Job</h3>
                <p className="text-xs text-neutral-60 mb-3">Example JDF output for Job J-18 (Business Cards)</p>
                <div className="bg-neutral-5 rounded-lg p-4 overflow-auto max-h-[500px]">
                  <pre className="text-xs text-neutral-80 font-mono whitespace-pre leading-relaxed">{sampleJDF}</pre>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ─── Alerts Tab ───────────────────────────────────────── */}
          <TabsContent value="alerts">
            <div className="border border-neutral-20 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-5">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Date</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Type</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Message</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">Status</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-neutral-70 border-b border-neutral-20">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => {
                    const atCfg = alertTypeConfig[alert.type]
                    const AtIcon = atCfg.icon
                    return (
                      <tr key={alert.id} className="hover:bg-neutral-5/50">
                        <td className="px-4 py-3 text-sm text-neutral-60 border-b border-neutral-20 whitespace-nowrap">{alert.date}</td>
                        <td className="px-4 py-3 border-b border-neutral-20">
                          <Badge className={`${atCfg.badgeClass} rounded-md text-xs`}>
                            <AtIcon className="h-3 w-3 mr-1" />
                            {atCfg.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20">{alert.message}</td>
                        <td className="px-4 py-3 border-b border-neutral-20">
                          {alert.acknowledged ? (
                            <Badge className="bg-neutral-10 text-neutral-60 rounded-full text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Acknowledged
                            </Badge>
                          ) : (
                            <Badge className="bg-warning-20 text-warning-90 rounded-full text-xs">
                              <Bell className="h-3 w-3 mr-1" />
                              Unacknowledged
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 border-b border-neutral-20 text-right">
                          {!alert.acknowledged && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-neutral-40 h-8 text-xs"
                              onClick={() => acknowledgeAlert(alert.id)}
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Acknowledge
                            </Button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ─── Maintenance Tab ───────────────────────────────────── */}
          <TabsContent value="maintenance">
            {/* Schedule */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-100">Maintenance Schedule</h3>
              <Button
                variant="outline"
                className="rounded-full border-neutral-40"
                onClick={() => setShowMaintenanceModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
            </div>
            <div className="border border-neutral-20 rounded-lg overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-5">
                    {["Task", "Frequency", "Last Performed", "Next Due", "Status"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {maintenanceSchedule.map((row, i) => (
                    <tr key={i} className="hover:bg-neutral-5/50">
                      <td className="px-4 py-3 text-sm font-medium text-neutral-100 border-b border-neutral-20">{row.task}</td>
                      <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20">{row.frequency}</td>
                      <td className="px-4 py-3 text-sm text-neutral-60 border-b border-neutral-20">{row.lastPerformed}</td>
                      <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20">{row.nextDue}</td>
                      <td className="px-4 py-3 border-b border-neutral-20">
                        <Badge className="bg-success-10 text-success-90 rounded-full text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          On Track
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* History */}
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Maintenance History</h3>
            <div className="border border-neutral-20 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-5">
                    {["Date", "Task", "Technician", "Duration", "Notes"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-neutral-70 border-b border-neutral-20">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {maintenanceHistory.map((row, i) => (
                    <tr key={i} className="hover:bg-neutral-5/50">
                      <td className="px-4 py-3 text-sm text-neutral-60 border-b border-neutral-20">{row.date}</td>
                      <td className="px-4 py-3 text-sm font-medium text-neutral-100 border-b border-neutral-20">{row.task}</td>
                      <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20">{row.tech}</td>
                      <td className="px-4 py-3 text-sm text-neutral-60 border-b border-neutral-20">{row.duration}</td>
                      <td className="px-4 py-3 text-sm text-neutral-60 border-b border-neutral-20">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ─── Schedule Maintenance Modal ─────────────────────────────── */}
      <Dialog open={showMaintenanceModal} onOpenChange={setShowMaintenanceModal}>
        <DialogContent className="max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Schedule Maintenance</DialogTitle>
            <DialogDescription>Schedule a maintenance task for {machine.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-90">Task Name</Label>
              <Input
                placeholder="e.g., Print Head Cleaning"
                value={maintTask}
                onChange={(e) => setMaintTask(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-90">Scheduled Date</Label>
              <Input
                type="date"
                value={maintDate}
                onChange={(e) => setMaintDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-90">Notes</Label>
              <textarea
                className="w-full px-3 py-2 rounded-lg text-sm border-none shadow-[inset_0_0_0_1px_#999999] focus:shadow-[inset_0_0_0_1px_#383838] focus:outline-none hover:shadow-[inset_0_0_0_1px_#6b6b6b] transition-shadow min-h-[80px] resize-vertical"
                placeholder="Additional notes or instructions..."
                value={maintNotes}
                onChange={(e) => setMaintNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-full border-neutral-40"
              onClick={() => setShowMaintenanceModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-neutral-100 text-white rounded-full hover:opacity-90"
              onClick={handleScheduleMaintenance}
            >
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
