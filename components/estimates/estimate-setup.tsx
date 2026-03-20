"use client"

import { useState } from "react"
import { Settings, Link2, Mail, FileDown, Plus, Pencil, Trash2, CheckCircle, XCircle, Clock, ChevronDown, Search, Globe, Key, Zap, Eye, Copy, Send, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// --- Types ---

type SetupTab = "general" | "connections" | "email-templates" | "export-log"

interface Connection {
  id: string
  name: string
  type: "Gelato Connect MIS" | "External MIS" | "Both"
  webhookUrl: string
  authMethod: "Bearer" | "Basic" | "API Key" | "None"
  triggers: string[]
  status: "active" | "inactive"
  lastSync: string
}

// --- Mock Data ---

const initialConnections: Connection[] = [
  {
    id: "conn-1",
    name: "Gelato Connect MIS (Internal)",
    type: "Gelato Connect MIS",
    webhookUrl: "https://api.gelatoconnect.com/webhooks/estimates",
    authMethod: "Bearer",
    triggers: ["Estimate Created", "Estimate Accepted", "Estimate Converted"],
    status: "active",
    lastSync: "Mar 20, 2026 — 09:15",
  },
  {
    id: "conn-2",
    name: "PrintVis MIS",
    type: "External MIS",
    webhookUrl: "https://printvis.example.com/api/v2/webhooks",
    authMethod: "API Key",
    triggers: ["Estimate Accepted", "Estimate Converted"],
    status: "active",
    lastSync: "Mar 19, 2026 — 14:30",
  },
]

const emailTemplates: Record<string, { subject: string; body: string }> = {
  "estimate-sent": {
    subject: "Estimate {{estimate_number}} from {{company_name}}",
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hello {{customer_name}},</h2>
  <p>Thank you for your inquiry. Please find attached your estimate <strong>{{estimate_number}}</strong> for the requested print job(s).</p>
  <p><strong>Estimate Total:</strong> {{total_amount}}</p>
  <p><strong>Valid Until:</strong> {{valid_until}}</p>
  <h3>Items Summary</h3>
  <p>{{items_summary}}</p>
  <p>You can review and accept this estimate online:</p>
  <a href="{{portal_link}}" style="display:inline-block;padding:10px 24px;background:#212121;color:#fff;text-decoration:none;border-radius:6px;">View Estimate</a>
  <p style="margin-top:24px;">Best regards,<br/>{{sales_rep}}<br/>{{company_name}}</p>
</div>`,
  },
  "estimate-followup": {
    subject: "Following up on Estimate {{estimate_number}}",
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hello {{customer_name}},</h2>
  <p>I wanted to follow up on Estimate <strong>{{estimate_number}}</strong> that was sent on your requested print job(s).</p>
  <p>The estimate is valid until <strong>{{valid_until}}</strong>. Please let us know if you have any questions or would like to proceed.</p>
  <a href="{{portal_link}}" style="display:inline-block;padding:10px 24px;background:#212121;color:#fff;text-decoration:none;border-radius:6px;">View Estimate</a>
  <p style="margin-top:24px;">Best regards,<br/>{{sales_rep}}<br/>{{company_name}}</p>
</div>`,
  },
  "estimate-accepted": {
    subject: "Great news! Estimate {{estimate_number}} accepted",
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hello {{customer_name}},</h2>
  <p>Great news! Estimate <strong>{{estimate_number}}</strong> has been accepted.</p>
  <p><strong>Total:</strong> {{total_amount}}</p>
  <p>We will begin processing your order shortly. You will receive a confirmation once the order has been created.</p>
  <p style="margin-top:24px;">Best regards,<br/>{{sales_rep}}<br/>{{company_name}}</p>
</div>`,
  },
  "conversion-confirmation": {
    subject: "Order confirmed from Estimate {{estimate_number}}",
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hello {{customer_name}},</h2>
  <p>Your estimate <strong>{{estimate_number}}</strong> has been converted to an active order.</p>
  <p><strong>Order Total:</strong> {{total_amount}}</p>
  <p>{{items_summary}}</p>
  <p>You can track the progress of your order through our portal:</p>
  <a href="{{portal_link}}" style="display:inline-block;padding:10px 24px;background:#212121;color:#fff;text-decoration:none;border-radius:6px;">Track Order</a>
  <p style="margin-top:24px;">Best regards,<br/>{{sales_rep}}<br/>{{company_name}}</p>
</div>`,
  },
}

const exportLogs = [
  { id: "EXP-001", time: "Mar 20, 2026 09:15", connection: "Gelato Connect MIS", estimateId: "EST-2025-047", type: "Estimate Converted", status: "success" as const },
  { id: "EXP-002", time: "Mar 19, 2026 14:30", connection: "PrintVis MIS", estimateId: "EST-2025-046", type: "Estimate Accepted", status: "failed" as const },
  { id: "EXP-003", time: "Mar 19, 2026 10:00", connection: "Gelato Connect MIS", estimateId: "EST-2025-045", type: "Estimate Created", status: "success" as const },
  { id: "EXP-004", time: "Mar 18, 2026 16:45", connection: "PrintVis MIS", estimateId: "EST-2025-044", type: "Estimate Sent", status: "success" as const },
  { id: "EXP-005", time: "Mar 18, 2026 09:20", connection: "Gelato Connect MIS", estimateId: "EST-2025-043", type: "Estimate Created", status: "pending" as const },
  { id: "EXP-006", time: "Mar 17, 2026 11:00", connection: "PrintVis MIS", estimateId: "EST-2025-042", type: "Estimate Converted", status: "failed" as const },
]

const availableVariables = [
  "{{customer_name}}",
  "{{company_name}}",
  "{{estimate_number}}",
  "{{total_amount}}",
  "{{valid_until}}",
  "{{items_summary}}",
  "{{sales_rep}}",
  "{{portal_link}}",
]

const allTriggers = ["Estimate Created", "Estimate Sent", "Estimate Accepted", "Estimate Rejected", "Estimate Converted"]

// --- Tabs ---

const tabs = [
  { id: "general" as SetupTab, label: "General Settings", icon: Settings },
  { id: "connections" as SetupTab, label: "Connections", icon: Link2 },
  { id: "email-templates" as SetupTab, label: "Email Templates", icon: Mail },
  { id: "export-log" as SetupTab, label: "Export Log", icon: FileDown },
]

// --- Component ---

export default function EstimateSetup() {
  const { toast } = useToast()

  // Tab state
  const [activeTab, setActiveTab] = useState<SetupTab>("general")

  // General settings state
  const [units, setUnits] = useState<"metric" | "imperial">("metric")
  const [priceModel, setPriceModel] = useState("markup")
  const [defaultMargin, setDefaultMargin] = useState("35")
  const [defaultCurrency, setDefaultCurrency] = useState("EUR")
  const [mixedProduction, setMixedProduction] = useState(false)
  const [deliveryExcluded, setDeliveryExcluded] = useState(false)
  const [autoWaste, setAutoWaste] = useState(true)
  const [widgetColor, setWidgetColor] = useState("#212121")
  const [widgetName, setWidgetName] = useState("Premium Print Co.")
  const [widgetLogoUrl, setWidgetLogoUrl] = useState("")

  // Connections state
  const [connections, setConnections] = useState(initialConnections)
  const [editingConnection, setEditingConnection] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formName, setFormName] = useState("")
  const [formType, setFormType] = useState<Connection["type"]>("External MIS")
  const [formWebhookUrl, setFormWebhookUrl] = useState("")
  const [formAuthMethod, setFormAuthMethod] = useState<Connection["authMethod"]>("Bearer")
  const [formAuthToken, setFormAuthToken] = useState("")
  const [formTriggers, setFormTriggers] = useState<string[]>([])

  // Email templates state
  const [selectedTemplate, setSelectedTemplate] = useState("estimate-sent")
  const [emailViewMode, setEmailViewMode] = useState<"visual" | "html">("visual")

  // Export log state
  const [expandedLog, setExpandedLog] = useState<string | null>(null)
  const [logFilter, setLogFilter] = useState("all")
  const [logConnectionFilter, setLogConnectionFilter] = useState("all")
  const [logSearch, setLogSearch] = useState("")

  // --- Connection helpers ---

  const resetForm = () => {
    setFormName("")
    setFormType("External MIS")
    setFormWebhookUrl("")
    setFormAuthMethod("Bearer")
    setFormAuthToken("")
    setFormTriggers([])
  }

  const openAddForm = () => {
    resetForm()
    setEditingConnection(null)
    setShowAddForm(true)
  }

  const openEditForm = (conn: Connection) => {
    setFormName(conn.name)
    setFormType(conn.type)
    setFormWebhookUrl(conn.webhookUrl)
    setFormAuthMethod(conn.authMethod)
    setFormAuthToken("")
    setFormTriggers([...conn.triggers])
    setEditingConnection(conn.id)
    setShowAddForm(true)
  }

  const saveConnection = () => {
    if (editingConnection) {
      setConnections(prev =>
        prev.map(c =>
          c.id === editingConnection
            ? { ...c, name: formName, type: formType, webhookUrl: formWebhookUrl, authMethod: formAuthMethod, triggers: formTriggers }
            : c
        )
      )
      toast({ title: "Connection updated", description: `${formName} has been updated.` })
    } else {
      const newConn: Connection = {
        id: `conn-${Date.now()}`,
        name: formName,
        type: formType,
        webhookUrl: formWebhookUrl,
        authMethod: formAuthMethod,
        triggers: formTriggers,
        status: "inactive",
        lastSync: "Never",
      }
      setConnections(prev => [...prev, newConn])
      toast({ title: "Connection added", description: `${formName} has been created.` })
    }
    setShowAddForm(false)
    setEditingConnection(null)
    resetForm()
  }

  const deleteConnection = (id: string) => {
    setConnections(prev => prev.filter(c => c.id !== id))
    toast({ title: "Connection deleted", description: "The connection has been removed." })
  }

  const toggleConnectionStatus = (id: string) => {
    setConnections(prev =>
      prev.map(c => (c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c))
    )
  }

  const toggleTrigger = (trigger: string) => {
    setFormTriggers(prev => (prev.includes(trigger) ? prev.filter(t => t !== trigger) : [...prev, trigger]))
  }

  const testConnection = () => {
    toast({ title: "Connection test successful", description: "Webhook responded with 200 OK in 142ms." })
  }

  // --- Export log helpers ---

  const filteredLogs = exportLogs.filter(log => {
    if (logFilter !== "all" && log.status !== logFilter) return false
    if (logConnectionFilter !== "all" && log.connection !== logConnectionFilter) return false
    if (logSearch && !log.estimateId.toLowerCase().includes(logSearch.toLowerCase()) && !log.type.toLowerCase().includes(logSearch.toLowerCase())) return false
    return true
  })

  const successCount = exportLogs.filter(l => l.status === "success").length
  const failedCount = exportLogs.filter(l => l.status === "failed").length
  const successRate = Math.round((successCount / exportLogs.length) * 100)

  // --- Render ---

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: "#212121" }}>
          Estimate Setup
        </h1>
        <p className="text-sm mt-1" style={{ color: "#8a8a8a" }}>
          Configure estimate module settings, connections, and export options
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-neutral-20 mb-6">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-[4px] transition-colors -mb-[1px] ${
                activeTab === tab.id
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

      {/* Tab content */}
      {activeTab === "general" && <GeneralSettingsTab />}
      {activeTab === "connections" && <ConnectionsTab />}
      {activeTab === "email-templates" && <EmailTemplatesTab />}
      {activeTab === "export-log" && <ExportLogTab />}
    </div>
  )

  // ==================== GENERAL SETTINGS ====================
  function GeneralSettingsTab() {
    return (
      <div className="max-w-3xl space-y-6">
        {/* Measurement Units */}
        <div className="rounded-lg border p-5" style={{ borderColor: "#e5e5e5" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#212121" }}>
            Measurement Units
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => setUnits("metric")}
              className="flex-1 rounded-lg border-2 p-4 text-center transition-colors"
              style={{
                borderColor: units === "metric" ? "#2563eb" : "#e5e5e5",
                backgroundColor: units === "metric" ? "#eff6ff" : "transparent",
              }}
            >
              <div className="text-sm font-semibold" style={{ color: "#212121" }}>
                Metric (mm)
              </div>
              <div className="text-xs mt-1" style={{ color: "#8a8a8a" }}>
                Millimeters, grams per square meter
              </div>
            </button>
            <button
              onClick={() => setUnits("imperial")}
              className="flex-1 rounded-lg border-2 p-4 text-center transition-colors"
              style={{
                borderColor: units === "imperial" ? "#2563eb" : "#e5e5e5",
                backgroundColor: units === "imperial" ? "#eff6ff" : "transparent",
              }}
            >
              <div className="text-sm font-semibold" style={{ color: "#212121" }}>
                Imperial (inches)
              </div>
              <div className="text-xs mt-1" style={{ color: "#8a8a8a" }}>
                Inches, pounds per ream
              </div>
            </button>
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-lg border p-5" style={{ borderColor: "#e5e5e5" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#212121" }}>
            Pricing
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                Price Adjustment Model
              </label>
              <Select value={priceModel} onValueChange={setPriceModel}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="markup">Markup Percentage</SelectItem>
                  <SelectItem value="va-press-hour">VA per Press Hour</SelectItem>
                  <SelectItem value="cost-plus">Cost Plus Fixed</SelectItem>
                  <SelectItem value="tiered">Tiered Pricing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                  Default Margin (%)
                </label>
                <Input value={defaultMargin} onChange={e => setDefaultMargin(e.target.value)} type="number" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                  Default Currency
                </label>
                <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="NOK">NOK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Production Options */}
        <div className="rounded-lg border p-5" style={{ borderColor: "#e5e5e5" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#212121" }}>
            Production Options
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium" style={{ color: "#212121" }}>
                  Mixed Production
                </div>
                <div className="text-xs" style={{ color: "#8a8a8a" }}>
                  Allow combining multiple jobs on a single press sheet
                </div>
              </div>
              <Switch checked={mixedProduction} onCheckedChange={setMixedProduction} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium" style={{ color: "#212121" }}>
                  Delivery Excluded
                </div>
                <div className="text-xs" style={{ color: "#8a8a8a" }}>
                  Exclude delivery costs from estimate totals by default
                </div>
              </div>
              <Switch checked={deliveryExcluded} onCheckedChange={setDeliveryExcluded} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium" style={{ color: "#212121" }}>
                  Auto-calculate Paper Waste
                </div>
                <div className="text-xs" style={{ color: "#8a8a8a" }}>
                  Automatically factor in paper waste based on job specs
                </div>
              </div>
              <Switch checked={autoWaste} onCheckedChange={setAutoWaste} />
            </div>
          </div>
        </div>

        {/* Self-Quote Widget */}
        <div className="rounded-lg border p-5" style={{ borderColor: "#e5e5e5" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#212121" }}>
            Self-Quote Widget
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                  Primary Color
                </label>
                <input
                  type="color"
                  value={widgetColor}
                  onChange={e => setWidgetColor(e.target.value)}
                  className="h-10 w-16 rounded border cursor-pointer"
                  style={{ borderColor: "#e5e5e5" }}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                  Website Name
                </label>
                <Input value={widgetName} onChange={e => setWidgetName(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                Logo URL
              </label>
              <Input
                value={widgetLogoUrl}
                onChange={e => setWidgetLogoUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            {/* Preview */}
            <div className="rounded-lg border p-4 flex items-center gap-3" style={{ borderColor: "#e5e5e5" }}>
              <div className="h-8 w-8 rounded" style={{ backgroundColor: widgetColor }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: "#212121" }}>
                  {widgetName}
                </div>
                <div className="text-xs" style={{ color: "#8a8a8a" }}>
                  Widget preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ==================== CONNECTIONS ====================
  function ConnectionsTab() {
    if (showAddForm) {
      return (
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold" style={{ color: "#212121" }}>
              {editingConnection ? "Edit Connection" : "Add Connection"}
            </h3>
          </div>
          <div className="rounded-lg border p-5 space-y-4" style={{ borderColor: "#e5e5e5" }}>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                Name
              </label>
              <Input value={formName} onChange={e => setFormName(e.target.value)} placeholder="Connection name" />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                Type
              </label>
              <Select value={formType} onValueChange={v => setFormType(v as Connection["type"])}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gelato Connect MIS">Gelato Connect MIS</SelectItem>
                  <SelectItem value="External MIS">External MIS</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                Webhook URL
              </label>
              <Input
                value={formWebhookUrl}
                onChange={e => setFormWebhookUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                  Auth Method
                </label>
                <Select value={formAuthMethod} onValueChange={v => setFormAuthMethod(v as Connection["authMethod"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bearer">Bearer</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="API Key">API Key</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                  Auth Token / Key
                </label>
                <Input
                  type="password"
                  value={formAuthToken}
                  onChange={e => setFormAuthToken(e.target.value)}
                  placeholder="Enter token or key"
                />
              </div>
            </div>

            {/* Triggers */}
            <div>
              <label className="text-xs font-medium mb-2 block" style={{ color: "#6b6b6b" }}>
                Triggers
              </label>
              <div className="flex flex-wrap gap-2">
                {allTriggers.map(trigger => (
                  <button
                    key={trigger}
                    onClick={() => toggleTrigger(trigger)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors"
                    style={{
                      borderColor: formTriggers.includes(trigger) ? "#2563eb" : "#e5e5e5",
                      backgroundColor: formTriggers.includes(trigger) ? "#eff6ff" : "transparent",
                      color: formTriggers.includes(trigger) ? "#2563eb" : "#6b6b6b",
                    }}
                  >
                    {formTriggers.includes(trigger) && <CheckCircle className="h-3 w-3" />}
                    {trigger}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "#e5e5e5" }}>
              <Button variant="outline" size="sm" onClick={testConnection} className="gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                Test Connection
              </Button>
              <div className="flex-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingConnection(null)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={saveConnection}
                disabled={!formName || !formWebhookUrl}
                className="rounded-full"
                style={{ backgroundColor: "#212121", color: "#fff" }}
              >
                {editingConnection ? "Update Connection" : "Save Connection"}
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold" style={{ color: "#212121" }}>
            Configured Connections
          </h3>
          <Button size="sm" onClick={openAddForm} className="rounded-full gap-1.5" style={{ backgroundColor: "#212121", color: "#fff" }}>
            <Plus className="h-3.5 w-3.5" />
            Add Connection
          </Button>
        </div>
        <div className="space-y-3">
          {connections.map(conn => (
            <div
              key={conn.id}
              className="rounded-lg border p-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
              style={{ borderColor: "#e5e5e5" }}
            >
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#f5f5f5" }}
              >
                {conn.type === "Gelato Connect MIS" ? (
                  <Globe className="h-5 w-5" style={{ color: "#6b6b6b" }} />
                ) : (
                  <ExternalLink className="h-5 w-5" style={{ color: "#6b6b6b" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold truncate" style={{ color: "#212121" }}>
                    {conn.name}
                  </span>
                  <Badge
                    variant={conn.status === "active" ? "default" : "secondary"}
                    className="text-[10px] px-1.5 py-0"
                    style={{
                      backgroundColor: conn.status === "active" ? "#dcfce7" : "#f5f5f5",
                      color: conn.status === "active" ? "#16a34a" : "#8a8a8a",
                    }}
                  >
                    {conn.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#8a8a8a" }}>
                  {conn.type} &middot; {conn.authMethod} &middot; Last synced: {conn.lastSync}
                </div>
                <div className="flex gap-1 mt-1.5">
                  {conn.triggers.map(t => (
                    <span
                      key={t}
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: "#f5f5f5", color: "#6b6b6b" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Switch
                  checked={conn.status === "active"}
                  onCheckedChange={() => toggleConnectionStatus(conn.id)}
                />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditForm(conn)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteConnection(conn.id)}>
                  <Trash2 className="h-3.5 w-3.5" style={{ color: "#ef4444" }} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ==================== EMAIL TEMPLATES ====================
  function EmailTemplatesTab() {
    const currentTemplate = emailTemplates[selectedTemplate]

    return (
      <div className="max-w-4xl">
        {/* Controls */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estimate-sent">Estimate Sent</SelectItem>
                <SelectItem value="estimate-followup">Estimate Follow-up</SelectItem>
                <SelectItem value="estimate-accepted">Estimate Accepted</SelectItem>
                <SelectItem value="conversion-confirmation">Conversion Confirmation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex rounded-lg border overflow-hidden" style={{ borderColor: "#e5e5e5" }}>
            <button
              onClick={() => setEmailViewMode("visual")}
              className="px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors"
              style={{
                backgroundColor: emailViewMode === "visual" ? "#212121" : "transparent",
                color: emailViewMode === "visual" ? "#fff" : "#6b6b6b",
              }}
            >
              <Eye className="h-3.5 w-3.5" />
              Visual
            </button>
            <button
              onClick={() => setEmailViewMode("html")}
              className="px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors"
              style={{
                backgroundColor: emailViewMode === "html" ? "#212121" : "transparent",
                color: emailViewMode === "html" ? "#fff" : "#6b6b6b",
              }}
            >
              {"</>"}
              HTML
            </button>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Main editor area */}
          <div className="flex-1 space-y-3">
            {/* Subject */}
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                Subject Line
              </label>
              <Input value={currentTemplate.subject} readOnly />
            </div>

            {/* Body */}
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6b6b6b" }}>
                Email Body
              </label>
              {emailViewMode === "visual" ? (
                <div
                  className="rounded-lg border p-5 min-h-[320px] bg-white"
                  style={{ borderColor: "#e5e5e5" }}
                  dangerouslySetInnerHTML={{ __html: currentTemplate.body }}
                />
              ) : (
                <Textarea
                  value={currentTemplate.body}
                  readOnly
                  className="min-h-[320px] font-mono text-xs"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Copy className="h-3.5 w-3.5" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Send className="h-3.5 w-3.5" />
                Send Test
              </Button>
            </div>
          </div>

          {/* Variables sidebar */}
          <div className="w-56 flex-shrink-0">
            <div className="rounded-lg border p-4" style={{ borderColor: "#e5e5e5" }}>
              <h4 className="text-xs font-semibold mb-3" style={{ color: "#212121" }}>
                Available Variables
              </h4>
              <div className="space-y-1.5">
                {availableVariables.map(v => (
                  <button
                    key={v}
                    onClick={() => {
                      navigator.clipboard.writeText(v)
                      toast({ title: "Copied", description: `${v} copied to clipboard` })
                    }}
                    className="w-full text-left px-2 py-1.5 rounded text-xs font-mono hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                    style={{ color: "#2563eb" }}
                  >
                    <span>{v}</span>
                    <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#8a8a8a" }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ==================== EXPORT LOG ====================
  function ExportLogTab() {
    return (
      <div className="max-w-5xl">
        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#8a8a8a" }} />
            <Input
              placeholder="Search estimate ID or event..."
              value={logSearch}
              onChange={e => setLogSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={logConnectionFilter} onValueChange={setLogConnectionFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Connections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Connections</SelectItem>
              <SelectItem value="Gelato Connect MIS">Gelato Connect MIS</SelectItem>
              <SelectItem value="PrintVis MIS">PrintVis MIS</SelectItem>
            </SelectContent>
          </Select>
          <Select value={logFilter} onValueChange={setLogFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats bar */}
        <div className="flex gap-4 mb-4">
          <div className="rounded-lg border px-4 py-2.5 flex items-center gap-2" style={{ borderColor: "#e5e5e5" }}>
            <FileDown className="h-4 w-4" style={{ color: "#8a8a8a" }} />
            <span className="text-xs" style={{ color: "#8a8a8a" }}>
              Total Exports
            </span>
            <span className="text-sm font-semibold" style={{ color: "#212121" }}>
              {exportLogs.length}
            </span>
          </div>
          <div className="rounded-lg border px-4 py-2.5 flex items-center gap-2" style={{ borderColor: "#e5e5e5" }}>
            <CheckCircle className="h-4 w-4" style={{ color: "#16a34a" }} />
            <span className="text-xs" style={{ color: "#8a8a8a" }}>
              Success Rate
            </span>
            <span className="text-sm font-semibold" style={{ color: "#16a34a" }}>
              {successRate}%
            </span>
          </div>
          <div className="rounded-lg border px-4 py-2.5 flex items-center gap-2" style={{ borderColor: "#e5e5e5" }}>
            <XCircle className="h-4 w-4" style={{ color: "#ef4444" }} />
            <span className="text-xs" style={{ color: "#8a8a8a" }}>
              Failed
            </span>
            <span className="text-sm font-semibold" style={{ color: "#ef4444" }}>
              {failedCount}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: "#e5e5e5" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#fafafa" }}>
                <th className="text-left text-xs font-medium px-4 py-2.5" style={{ color: "#8a8a8a" }}>
                  Timestamp
                </th>
                <th className="text-left text-xs font-medium px-4 py-2.5" style={{ color: "#8a8a8a" }}>
                  Connection
                </th>
                <th className="text-left text-xs font-medium px-4 py-2.5" style={{ color: "#8a8a8a" }}>
                  Estimate ID
                </th>
                <th className="text-left text-xs font-medium px-4 py-2.5" style={{ color: "#8a8a8a" }}>
                  Event Type
                </th>
                <th className="text-left text-xs font-medium px-4 py-2.5" style={{ color: "#8a8a8a" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <>
                  <tr
                    key={log.id}
                    className="border-t cursor-pointer hover:bg-neutral-50 transition-colors"
                    style={{ borderColor: "#f0f0f0" }}
                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                  >
                    <td className="px-4 py-3 text-xs" style={{ color: "#6b6b6b" }}>
                      {log.time}
                    </td>
                    <td className="px-4 py-3 text-xs font-medium" style={{ color: "#212121" }}>
                      {log.connection}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "#2563eb" }}>
                      {log.estimateId}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#6b6b6b" }}>
                      {log.type}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0"
                        style={{
                          backgroundColor:
                            log.status === "success"
                              ? "#dcfce7"
                              : log.status === "failed"
                              ? "#fef2f2"
                              : "#fef9c3",
                          color:
                            log.status === "success"
                              ? "#16a34a"
                              : log.status === "failed"
                              ? "#ef4444"
                              : "#ca8a04",
                        }}
                      >
                        {log.status === "success" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {log.status === "failed" && <XCircle className="h-3 w-3 mr-1" />}
                        {log.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                  {expandedLog === log.id && (
                    <tr key={`${log.id}-detail`} style={{ backgroundColor: "#fafafa" }}>
                      <td colSpan={5} className="px-4 py-3">
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <div className="text-[10px] font-medium mb-1" style={{ color: "#8a8a8a" }}>
                              REQUEST PAYLOAD
                            </div>
                            <pre
                              className="text-[11px] p-3 rounded-lg overflow-x-auto font-mono"
                              style={{ backgroundColor: "#fff", color: "#212121", border: "1px solid #e5e5e5" }}
                            >
                              {JSON.stringify(
                                {
                                  event: log.type.toLowerCase().replace(/ /g, "_"),
                                  estimate_id: log.estimateId,
                                  timestamp: log.time,
                                  data: { connection: log.connection, status: log.status },
                                },
                                null,
                                2
                              )}
                            </pre>
                          </div>
                          <div className="flex-1">
                            <div className="text-[10px] font-medium mb-1" style={{ color: "#8a8a8a" }}>
                              RESPONSE
                            </div>
                            <pre
                              className="text-[11px] p-3 rounded-lg overflow-x-auto font-mono"
                              style={{ backgroundColor: "#fff", color: "#212121", border: "1px solid #e5e5e5" }}
                            >
                              {log.status === "success"
                                ? JSON.stringify({ status: 200, message: "OK", received: true }, null, 2)
                                : log.status === "failed"
                                ? JSON.stringify(
                                    { status: 502, error: "Bad Gateway", message: "Upstream server unavailable" },
                                    null,
                                    2
                                  )
                                : JSON.stringify({ status: 202, message: "Accepted, processing" }, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-sm" style={{ color: "#8a8a8a" }}>
                    No export logs match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
