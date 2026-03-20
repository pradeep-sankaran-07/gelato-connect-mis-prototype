"use client"

import { useState } from "react"
import {
  RefreshCw, Settings, Unplug, CheckCircle, XCircle, Clock,
  ArrowRight, ArrowLeft, ArrowLeftRight, AlertTriangle, Search,
  Filter, ChevronDown, Loader2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"

// ---------- Types ----------
interface SyncLogEntry {
  id: string
  time: string
  entity: "Invoice" | "Payment" | "Customer" | "Credit Note"
  entityId: string
  direction: "to-qbo" | "from-qbo"
  status: "success" | "error" | "pending"
  message: string
}

interface FieldMapping {
  id: string
  misField: string
  qboField: string
  direction: "to-qbo" | "from-qbo" | "bidirectional"
  required: boolean
  options: string[]
}

// ---------- Mock Data ----------
const syncLogs: SyncLogEntry[] = [
  { id: "SL-001", time: "Mar 15, 2025 14:32", entity: "Invoice", entityId: "INV-2025-142", direction: "to-qbo", status: "success", message: "Invoice synced successfully" },
  { id: "SL-002", time: "Mar 15, 2025 14:32", entity: "Payment", entityId: "PAY-2025-089", direction: "from-qbo", status: "success", message: "Payment received and recorded" },
  { id: "SL-003", time: "Mar 15, 2025 14:30", entity: "Customer", entityId: "CUST-045", direction: "to-qbo", status: "error", message: "Duplicate customer name in QBO" },
  { id: "SL-004", time: "Mar 15, 2025 14:28", entity: "Invoice", entityId: "INV-2025-141", direction: "to-qbo", status: "success", message: "Invoice synced successfully" },
  { id: "SL-005", time: "Mar 15, 2025 14:15", entity: "Payment", entityId: "PAY-2025-088", direction: "from-qbo", status: "success", message: "Payment matched to INV-2025-138" },
  { id: "SL-006", time: "Mar 15, 2025 14:10", entity: "Invoice", entityId: "INV-2025-140", direction: "to-qbo", status: "pending", message: "Awaiting rate limit reset" },
  { id: "SL-007", time: "Mar 15, 2025 14:05", entity: "Customer", entityId: "CUST-044", direction: "to-qbo", status: "success", message: "New customer created in QBO" },
  { id: "SL-008", time: "Mar 15, 2025 13:58", entity: "Invoice", entityId: "INV-2025-139", direction: "to-qbo", status: "success", message: "Invoice synced successfully" },
  { id: "SL-009", time: "Mar 15, 2025 13:45", entity: "Payment", entityId: "PAY-2025-087", direction: "from-qbo", status: "error", message: "Invoice not found for payment reference" },
  { id: "SL-010", time: "Mar 15, 2025 13:30", entity: "Invoice", entityId: "INV-2025-138", direction: "to-qbo", status: "success", message: "Invoice synced successfully" },
  { id: "SL-011", time: "Mar 15, 2025 13:15", entity: "Customer", entityId: "CUST-043", direction: "to-qbo", status: "success", message: "Customer details updated" },
  { id: "SL-012", time: "Mar 15, 2025 13:00", entity: "Invoice", entityId: "INV-2025-137", direction: "to-qbo", status: "success", message: "Invoice synced successfully" },
  { id: "SL-013", time: "Mar 15, 2025 12:45", entity: "Payment", entityId: "PAY-2025-086", direction: "from-qbo", status: "success", message: "Payment applied to INV-2025-135" },
  { id: "SL-014", time: "Mar 15, 2025 12:30", entity: "Credit Note", entityId: "CN-2025-008", direction: "to-qbo", status: "error", message: "Tax code mapping missing" },
  { id: "SL-015", time: "Mar 15, 2025 12:15", entity: "Invoice", entityId: "INV-2025-136", direction: "to-qbo", status: "success", message: "Invoice synced successfully" },
]

const fieldMappings: FieldMapping[] = [
  { id: "FM-1", misField: "Customer Name", qboField: "Customer Display Name", direction: "to-qbo", required: true, options: ["Customer Display Name", "Company Name", "Full Name"] },
  { id: "FM-2", misField: "Invoice Total", qboField: "Total Amount", direction: "to-qbo", required: true, options: ["Total Amount", "Balance Due", "Sub Total"] },
  { id: "FM-3", misField: "Invoice Date", qboField: "Transaction Date", direction: "to-qbo", required: true, options: ["Transaction Date", "Due Date", "Ship Date"] },
  { id: "FM-4", misField: "Due Date", qboField: "Due Date", direction: "to-qbo", required: true, options: ["Due Date", "Transaction Date"] },
  { id: "FM-5", misField: "Line Item Description", qboField: "Item Description", direction: "to-qbo", required: true, options: ["Item Description", "Item Name", "Memo"] },
  { id: "FM-6", misField: "Tax Amount", qboField: "Tax Amount", direction: "to-qbo", required: false, options: ["Tax Amount", "Tax Rate", "Tax Code"] },
  { id: "FM-7", misField: "Payment Amount", qboField: "Payment Amount", direction: "from-qbo", required: true, options: ["Payment Amount", "Applied Amount"] },
  { id: "FM-8", misField: "Payment Method", qboField: "Payment Method", direction: "from-qbo", required: false, options: ["Payment Method", "Payment Type", "Deposit To"] },
  { id: "FM-9", misField: "Customer Email", qboField: "Primary Email", direction: "bidirectional", required: false, options: ["Primary Email", "CC Email"] },
  { id: "FM-10", misField: "Customer Phone", qboField: "Primary Phone", direction: "bidirectional", required: false, options: ["Primary Phone", "Mobile", "Alt Phone"] },
]

export default function ERPIntegrationSettings() {
  const { navigateTo } = useNavigation()
  const [activeTab, setActiveTab] = useState<"sync-log" | "field-mapping" | "settings">("sync-log")
  const [entityFilter, setEntityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isSyncing, setIsSyncing] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null)

  // Settings state
  const [autoSyncInvoices, setAutoSyncInvoices] = useState(true)
  const [autoSyncPayments, setAutoSyncPayments] = useState(true)
  const [autoSyncCustomers, setAutoSyncCustomers] = useState(false)
  const [syncFrequency, setSyncFrequency] = useState("15min")
  const [syncDirection, setSyncDirection] = useState("bidirectional")

  // Field mapping editable state
  const [mappings, setMappings] = useState(fieldMappings)

  const tabs = [
    { id: "sync-log" as const, label: "Sync Log" },
    { id: "field-mapping" as const, label: "Field Mapping" },
    { id: "settings" as const, label: "Settings" },
  ]

  const filteredLogs = syncLogs.filter((log) => {
    const matchesEntity = entityFilter === "all" || log.entity === entityFilter
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    return matchesEntity && matchesStatus
  })

  const errorCount = syncLogs.filter((l) => l.status === "error").length

  function handleSyncNow() {
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 2000)
  }

  function handleTestConnection() {
    setIsTesting(true)
    setTestResult(null)
    setTimeout(() => {
      setIsTesting(false)
      setTestResult("success")
      setTimeout(() => setTestResult(null), 4000)
    }, 2000)
  }

  function handleRetryFailed() {
    // Simulate retry - in real app would retry
  }

  function updateMapping(id: string, newQboField: string) {
    setMappings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, qboField: newQboField } : m))
    )
  }

  const directionIcon = (dir: string) => {
    switch (dir) {
      case "to-qbo": return <ArrowRight className="h-3.5 w-3.5 text-neutral-60" />
      case "from-qbo": return <ArrowLeft className="h-3.5 w-3.5 text-neutral-60" />
      case "bidirectional": return <ArrowLeftRight className="h-3.5 w-3.5 text-neutral-60" />
    }
  }

  const directionLabel = (dir: string) => {
    switch (dir) {
      case "to-qbo": return <span className="inline-flex items-center gap-1 text-xs text-neutral-70"><ArrowRight className="h-3 w-3" /> QBO</span>
      case "from-qbo": return <span className="inline-flex items-center gap-1 text-xs text-neutral-70"><ArrowLeft className="h-3 w-3" /> QBO</span>
      default: return null
    }
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-neutral-100">ERP Integration</h2>
        <p className="text-sm text-neutral-60 mt-1">Sync invoices, payments, and customers with QuickBooks Online</p>
      </div>

      {/* Connection Card */}
      <div className="border border-neutral-20 rounded-lg p-5 bg-white mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* QuickBooks Logo Placeholder */}
            <div className="w-12 h-12 rounded-lg bg-[#2CA01C] flex items-center justify-center text-white font-bold text-lg">
              QB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-neutral-100">QuickBooks Online</h3>
                <Badge className="bg-success-10 text-success-90 rounded-full">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-neutral-60">
                <span>Company: <span className="text-neutral-90 font-medium">Premium Print Co.</span></span>
                <span className="text-neutral-30">|</span>
                <span>Last Sync: <span className="text-neutral-90 font-medium">5 minutes ago</span></span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="flex items-center gap-2 h-9 px-4 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              {isSyncing ? "Syncing..." : "Sync Now"}
            </button>
            <button className="flex items-center gap-2 h-9 px-4 border border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors">
              <Unplug className="h-3.5 w-3.5" />
              Disconnect
            </button>
            <button className="flex items-center gap-2 h-9 px-4 border border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors">
              <Settings className="h-3.5 w-3.5" />
              Configure
            </button>
          </div>
        </div>
      </div>

      {/* Sync Status Dashboard */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-neutral-20 rounded-lg p-4 bg-white">
          <div className="text-sm text-neutral-60 mb-1">Invoices Synced</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-neutral-100">142</span>
            <span className="text-sm text-neutral-50">/ 145</span>
          </div>
          <div className="mt-2 h-1.5 bg-neutral-10 rounded-full overflow-hidden">
            <div className="h-full bg-success-70 rounded-full" style={{ width: "97.9%" }} />
          </div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-4 bg-white">
          <div className="text-sm text-neutral-60 mb-1">Payments Synced</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-neutral-100">89</span>
            <span className="text-sm text-neutral-50">/ 89</span>
          </div>
          <div className="mt-2 h-1.5 bg-neutral-10 rounded-full overflow-hidden">
            <div className="h-full bg-success-70 rounded-full" style={{ width: "100%" }} />
          </div>
        </div>
        <div className="border border-neutral-20 rounded-lg p-4 bg-white">
          <div className="text-sm text-neutral-60 mb-1">Sync Errors</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-critical-60">{errorCount}</span>
            <span className="text-sm text-neutral-50">require attention</span>
          </div>
          <div className="mt-2 text-xs text-neutral-60">Last successful sync: Mar 15, 2025 14:32</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-20 mb-6">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2.5 text-sm transition-colors ${
                activeTab === tab.id
                  ? "text-neutral-100 font-medium"
                  : "text-neutral-60 hover:text-neutral-90"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-100 rounded-t-sm" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Toast for test result */}
      {testResult === "success" && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-success-10 border border-success-70 text-success-90 rounded-lg px-4 py-3 shadow-lg animate-in slide-in-from-top">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Connection test successful! QuickBooks Online is reachable.</span>
        </div>
      )}

      {/* Sync Log Tab */}
      {activeTab === "sync-log" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={entityFilter}
                  onChange={(e) => setEntityFilter(e.target.value)}
                  className="h-9 pl-3 pr-8 border border-neutral-30 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:border-neutral-90"
                >
                  <option value="all">All Entities</option>
                  <option value="Invoice">Invoice</option>
                  <option value="Payment">Payment</option>
                  <option value="Customer">Customer</option>
                  <option value="Credit Note">Credit Note</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-50 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-9 pl-3 pr-8 border border-neutral-30 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:border-neutral-90"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                  <option value="pending">Pending</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-50 pointer-events-none" />
              </div>
            </div>
            <button
              onClick={handleRetryFailed}
              className="flex items-center gap-2 h-9 px-4 border border-critical-60 text-critical-60 rounded-full text-sm font-medium hover:bg-critical-5 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry Failed ({errorCount})
            </button>
          </div>

          <div className="border border-neutral-20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-5">
                  <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Time</th>
                  <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Entity</th>
                  <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Entity ID</th>
                  <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Direction</th>
                  <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Status</th>
                  <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Message</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-5/50 transition-colors">
                    <td className="px-4 py-2.5 text-sm text-neutral-70 border-b border-neutral-20">{log.time}</td>
                    <td className="px-4 py-2.5 border-b border-neutral-20">
                      <Badge variant="secondary" className="text-xs">{log.entity}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-sm font-mono text-neutral-90 border-b border-neutral-20">{log.entityId}</td>
                    <td className="px-4 py-2.5 border-b border-neutral-20">
                      <span className="inline-flex items-center gap-1.5 text-xs text-neutral-70">
                        {log.direction === "to-qbo" ? (
                          <><ArrowRight className="h-3 w-3" /> QBO</>
                        ) : (
                          <><ArrowLeft className="h-3 w-3" /> QBO</>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 border-b border-neutral-20">
                      {log.status === "success" && (
                        <Badge className="bg-success-10 text-success-90 rounded-full text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" /> Success
                        </Badge>
                      )}
                      {log.status === "error" && (
                        <Badge className="bg-critical-20 text-critical-90 rounded-full text-xs">
                          <XCircle className="h-3 w-3 mr-1" /> Error
                        </Badge>
                      )}
                      {log.status === "pending" && (
                        <Badge className="bg-warning-20 text-warning-90 rounded-full text-xs">
                          <Clock className="h-3 w-3 mr-1" /> Pending
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-neutral-70 border-b border-neutral-20">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Field Mapping Tab */}
      {activeTab === "field-mapping" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-neutral-60">Map MIS fields to their corresponding QuickBooks Online fields.</p>
            <button className="h-9 px-4 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              Save Mappings
            </button>
          </div>

          <div className="border border-neutral-20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-5">
                  <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">MIS Field</th>
                  <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20 w-10">Direction</th>
                  <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">QBO Field</th>
                  <th className="text-center text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20 w-20">Required</th>
                </tr>
              </thead>
              <tbody>
                {mappings.map((mapping) => (
                  <tr key={mapping.id} className="hover:bg-neutral-5/50 transition-colors">
                    <td className="px-4 py-2.5 text-sm font-medium text-neutral-90 border-b border-neutral-20">{mapping.misField}</td>
                    <td className="px-4 py-2.5 border-b border-neutral-20 text-center">
                      {directionIcon(mapping.direction)}
                    </td>
                    <td className="px-4 py-2.5 border-b border-neutral-20">
                      <div className="relative max-w-xs">
                        <select
                          value={mapping.qboField}
                          onChange={(e) => updateMapping(mapping.id, e.target.value)}
                          className="h-8 pl-3 pr-8 border border-neutral-30 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:border-neutral-90 w-full"
                        >
                          {mapping.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-neutral-50 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-4 py-2.5 border-b border-neutral-20 text-center">
                      {mapping.required ? (
                        <CheckCircle className="h-4 w-4 text-success-70 inline" />
                      ) : (
                        <span className="text-neutral-40">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="max-w-2xl space-y-8">
          {/* Auto-sync Toggles */}
          <div>
            <h3 className="text-base font-semibold text-neutral-100 mb-4">Auto-Sync Entities</h3>
            <div className="space-y-4">
              <ToggleRow label="Invoices" description="Automatically sync invoices to QuickBooks" checked={autoSyncInvoices} onChange={setAutoSyncInvoices} />
              <ToggleRow label="Payments" description="Automatically sync payments from QuickBooks" checked={autoSyncPayments} onChange={setAutoSyncPayments} />
              <ToggleRow label="Customers" description="Automatically sync customer records" checked={autoSyncCustomers} onChange={setAutoSyncCustomers} />
            </div>
          </div>

          {/* Sync Frequency */}
          <div>
            <h3 className="text-base font-semibold text-neutral-100 mb-4">Sync Frequency</h3>
            <div className="relative max-w-xs">
              <select
                value={syncFrequency}
                onChange={(e) => setSyncFrequency(e.target.value)}
                className="h-10 pl-3 pr-8 border border-neutral-30 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:border-neutral-90 w-full"
              >
                <option value="15min">Every 15 minutes</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-50 pointer-events-none" />
            </div>
          </div>

          {/* Sync Direction */}
          <div>
            <h3 className="text-base font-semibold text-neutral-100 mb-4">Sync Direction</h3>
            <div className="space-y-3">
              {[
                { value: "bidirectional", label: "Bidirectional", desc: "Sync data both ways between MIS and QBO" },
                { value: "to-qbo", label: "MIS to QBO only", desc: "Only push data from MIS to QuickBooks" },
                { value: "from-qbo", label: "QBO to MIS only", desc: "Only pull data from QuickBooks to MIS" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    syncDirection === opt.value
                      ? "border-neutral-100 bg-neutral-5"
                      : "border-neutral-20 hover:border-neutral-40"
                  }`}
                >
                  <input
                    type="radio"
                    name="syncDirection"
                    value={opt.value}
                    checked={syncDirection === opt.value}
                    onChange={(e) => setSyncDirection(e.target.value)}
                    className="mt-0.5 accent-neutral-100"
                  />
                  <div>
                    <div className="text-sm font-medium text-neutral-100">{opt.label}</div>
                    <div className="text-xs text-neutral-60 mt-0.5">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Test Connection */}
          <div className="border-t border-neutral-20 pt-6">
            <h3 className="text-base font-semibold text-neutral-100 mb-2">Connection Test</h3>
            <p className="text-sm text-neutral-60 mb-4">Verify that your QuickBooks Online connection is working properly.</p>
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="flex items-center gap-2 h-10 px-5 border border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors disabled:opacity-50"
            >
              {isTesting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Test Connection
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between p-3 border border-neutral-20 rounded-lg">
      <div>
        <div className="text-sm font-medium text-neutral-100">{label}</div>
        <div className="text-xs text-neutral-60 mt-0.5">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-neutral-90" : "bg-neutral-30"
        }`}
      >
        <div
          className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  )
}
