"use client"

import { useState } from "react"
import {
  Plus,
  Edit,
  Eye,
  Search,
  Mail,
  RotateCcw,
  Filter,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  MailOpen,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useNavigation } from "@/lib/navigation-context"

// --- Types ---
interface EmailTrigger {
  id: string
  trigger: string
  templateName: string
  active: boolean
  recipients: string
  lastSent: string
}

interface TemplateCard {
  id: string
  name: string
  triggerType: string
  subject: string
  lastModified: string
}

interface DeliveryLogEntry {
  id: string
  sentAt: string
  trigger: string
  recipient: string
  subject: string
  orderNumber: string
  status: "Sent" | "Delivered" | "Failed" | "Opened"
}

// --- Data ---
const initialTriggers: EmailTrigger[] = [
  { id: "tpl-001", trigger: "Order Confirmed", templateName: "Order Confirmation Email", active: true, recipients: "Customer Primary Contact", lastSent: "Mar 15, 2026" },
  { id: "tpl-002", trigger: "File Received", templateName: "File Receipt Notification", active: true, recipients: "Customer Primary Contact", lastSent: "Mar 14, 2026" },
  { id: "tpl-003", trigger: "Proof Ready", templateName: "Proof Ready for Review", active: true, recipients: "Customer Primary + Approver", lastSent: "Mar 13, 2026" },
  { id: "tpl-004", trigger: "Proof Reminder", templateName: "Proof Approval Reminder (48h)", active: true, recipients: "Customer Approver", lastSent: "Mar 12, 2026" },
  { id: "tpl-005", trigger: "Production Started", templateName: "Production Update", active: true, recipients: "Customer Primary Contact", lastSent: "Mar 15, 2026" },
  { id: "tpl-006", trigger: "Shipped", templateName: "Shipping Notification", active: true, recipients: "Customer Primary + Shipping", lastSent: "Mar 14, 2026" },
  { id: "tpl-007", trigger: "Invoice Sent", templateName: "Invoice Notification", active: false, recipients: "Customer Billing", lastSent: "Never" },
  { id: "tpl-008", trigger: "Payment Received", templateName: "Payment Confirmation", active: true, recipients: "Customer Billing", lastSent: "Mar 10, 2026" },
]

const templateCards: TemplateCard[] = [
  { id: "tpl-001", name: "Order Confirmation Email", triggerType: "Order Confirmed", subject: "Your order {{order_number}} has been confirmed", lastModified: "Mar 15, 2026" },
  { id: "tpl-002", name: "File Receipt Notification", triggerType: "File Received", subject: "Files received for order {{order_number}}", lastModified: "Mar 14, 2026" },
  { id: "tpl-003", name: "Proof Ready for Review", triggerType: "Proof Ready", subject: "Proof ready: {{order_number}} — please review", lastModified: "Mar 13, 2026" },
  { id: "tpl-004", name: "Proof Approval Reminder (48h)", triggerType: "Proof Reminder", subject: "Reminder: Proof awaiting approval for {{order_number}}", lastModified: "Mar 12, 2026" },
  { id: "tpl-005", name: "Production Update", triggerType: "Production Started", subject: "Production started on order {{order_number}}", lastModified: "Mar 11, 2026" },
  { id: "tpl-006", name: "Shipping Notification", triggerType: "Shipped", subject: "Your order {{order_number}} has shipped!", lastModified: "Mar 10, 2026" },
  { id: "tpl-007", name: "Invoice Notification", triggerType: "Invoice Sent", subject: "Invoice {{invoice_number}} for order {{order_number}}", lastModified: "Mar 8, 2026" },
  { id: "tpl-008", name: "Payment Confirmation", triggerType: "Payment Received", subject: "Payment received — thank you!", lastModified: "Mar 6, 2026" },
]

const deliveryLog: DeliveryLogEntry[] = [
  { id: "log-01", sentAt: "Mar 15, 2026 14:32", trigger: "Order Confirmed", recipient: "alice@printco.com", subject: "Your order ORD-2026-0147 has been confirmed", orderNumber: "ORD-2026-0147", status: "Delivered" },
  { id: "log-02", sentAt: "Mar 15, 2026 14:30", trigger: "Production Started", recipient: "alice@printco.com", subject: "Production started on order ORD-2026-0142", orderNumber: "ORD-2026-0142", status: "Opened" },
  { id: "log-03", sentAt: "Mar 15, 2026 11:15", trigger: "Order Confirmed", recipient: "bob@athletix.com", subject: "Your order ORD-2026-0146 has been confirmed", orderNumber: "ORD-2026-0146", status: "Delivered" },
  { id: "log-04", sentAt: "Mar 15, 2026 10:45", trigger: "Shipped", recipient: "carol@sandbox.io", subject: "Your order ORD-2026-0139 has shipped!", orderNumber: "ORD-2026-0139", status: "Opened" },
  { id: "log-05", sentAt: "Mar 14, 2026 16:20", trigger: "File Received", recipient: "dave@designhaus.co", subject: "Files received for order ORD-2026-0145", orderNumber: "ORD-2026-0145", status: "Delivered" },
  { id: "log-06", sentAt: "Mar 14, 2026 15:10", trigger: "Shipped", recipient: "alice@printco.com", subject: "Your order ORD-2026-0138 has shipped!", orderNumber: "ORD-2026-0138", status: "Delivered" },
  { id: "log-07", sentAt: "Mar 14, 2026 12:45", trigger: "Proof Ready", recipient: "emma@greenleaf.org", subject: "Proof ready: ORD-2026-0144 — please review", orderNumber: "ORD-2026-0144", status: "Delivered" },
  { id: "log-08", sentAt: "Mar 14, 2026 12:44", trigger: "Proof Ready", recipient: "approver@greenleaf.org", subject: "Proof ready: ORD-2026-0144 — please review", orderNumber: "ORD-2026-0144", status: "Opened" },
  { id: "log-09", sentAt: "Mar 13, 2026 17:30", trigger: "Proof Ready", recipient: "frank@luxprint.com", subject: "Proof ready: ORD-2026-0143 — please review", orderNumber: "ORD-2026-0143", status: "Delivered" },
  { id: "log-10", sentAt: "Mar 13, 2026 14:00", trigger: "Order Confirmed", recipient: "grace@acmecorp.com", subject: "Your order ORD-2026-0143 has been confirmed", orderNumber: "ORD-2026-0143", status: "Delivered" },
  { id: "log-11", sentAt: "Mar 12, 2026 16:00", trigger: "Proof Reminder", recipient: "approver@sandbox.io", subject: "Reminder: Proof awaiting approval for ORD-2026-0137", orderNumber: "ORD-2026-0137", status: "Delivered" },
  { id: "log-12", sentAt: "Mar 12, 2026 10:30", trigger: "Production Started", recipient: "bob@athletix.com", subject: "Production started on order ORD-2026-0140", orderNumber: "ORD-2026-0140", status: "Opened" },
  { id: "log-13", sentAt: "Mar 11, 2026 15:22", trigger: "Shipped", recipient: "frank@luxprint.com", subject: "Your order ORD-2026-0135 has shipped!", orderNumber: "ORD-2026-0135", status: "Failed" },
  { id: "log-14", sentAt: "Mar 11, 2026 14:10", trigger: "Order Confirmed", recipient: "helen@studiomark.de", subject: "Your order ORD-2026-0141 has been confirmed", orderNumber: "ORD-2026-0141", status: "Delivered" },
  { id: "log-15", sentAt: "Mar 11, 2026 09:15", trigger: "File Received", recipient: "ivan@printco.com", subject: "Files received for order ORD-2026-0140", orderNumber: "ORD-2026-0140", status: "Delivered" },
  { id: "log-16", sentAt: "Mar 10, 2026 17:45", trigger: "Payment Received", recipient: "billing@athletix.com", subject: "Payment received — thank you!", orderNumber: "ORD-2026-0134", status: "Delivered" },
  { id: "log-17", sentAt: "Mar 10, 2026 14:20", trigger: "Shipped", recipient: "grace@acmecorp.com", subject: "Your order ORD-2026-0133 has shipped!", orderNumber: "ORD-2026-0133", status: "Opened" },
  { id: "log-18", sentAt: "Mar 10, 2026 11:00", trigger: "Order Confirmed", recipient: "julia@vividprint.co", subject: "Your order ORD-2026-0139 has been confirmed", orderNumber: "ORD-2026-0139", status: "Delivered" },
  { id: "log-19", sentAt: "Mar 9, 2026 16:30", trigger: "Proof Ready", recipient: "karl@brandworks.eu", subject: "Proof ready: ORD-2026-0138 — please review", orderNumber: "ORD-2026-0138", status: "Delivered" },
  { id: "log-20", sentAt: "Mar 9, 2026 09:00", trigger: "Production Started", recipient: "helen@studiomark.de", subject: "Production started on order ORD-2026-0136", orderNumber: "ORD-2026-0136", status: "Delivered" },
]

const triggerTypes = ["All", "Order Confirmed", "File Received", "Proof Ready", "Proof Reminder", "Production Started", "Shipped", "Invoice Sent", "Payment Received"]
const statusTypes = ["All", "Sent", "Delivered", "Failed", "Opened"]

type Tab = "active-triggers" | "all-templates" | "delivery-log"

const triggerBadgeColors: Record<string, string> = {
  "Order Confirmed": "bg-success-10 text-success-90",
  "File Received": "bg-info-20 text-info-90",
  "Proof Ready": "bg-primary-10 text-primary-90",
  "Proof Reminder": "bg-warning-20 text-warning-90",
  "Production Started": "bg-info-20 text-info-90",
  "Shipped": "bg-success-10 text-success-90",
  "Invoice Sent": "bg-neutral-10 text-neutral-80",
  "Payment Received": "bg-success-10 text-success-90",
}

export default function CommunicationSettings() {
  const { navigateTo } = useNavigation()
  const [activeTab, setActiveTab] = useState<Tab>("active-triggers")
  const [triggers, setTriggers] = useState<EmailTrigger[]>(initialTriggers)
  const [logFilterTrigger, setLogFilterTrigger] = useState("All")
  const [logFilterStatus, setLogFilterStatus] = useState("All")
  const [showTriggerDropdown, setShowTriggerDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)

  const tabs: { key: Tab; label: string }[] = [
    { key: "active-triggers", label: "Active Triggers" },
    { key: "all-templates", label: "All Templates" },
    { key: "delivery-log", label: "Delivery Log" },
  ]

  const handleToggle = (id: string) => {
    setTriggers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    )
  }

  const filteredLog = deliveryLog.filter((entry) => {
    const matchesTrigger = logFilterTrigger === "All" || entry.trigger === logFilterTrigger
    const matchesStatus = logFilterStatus === "All" || entry.status === logFilterStatus
    return matchesTrigger && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge className="bg-success-10 text-success-90 border-0 text-xs font-medium gap-1">
            <CheckCircle className="h-3 w-3" />
            Delivered
          </Badge>
        )
      case "Opened":
        return (
          <Badge className="bg-info-20 text-info-90 border-0 text-xs font-medium gap-1">
            <MailOpen className="h-3 w-3" />
            Opened
          </Badge>
        )
      case "Failed":
        return (
          <Badge className="bg-critical-10 text-critical-90 border-0 text-xs font-medium gap-1">
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        )
      case "Sent":
        return (
          <Badge className="bg-neutral-10 text-neutral-80 border-0 text-xs font-medium gap-1">
            <Clock className="h-3 w-3" />
            Sent
          </Badge>
        )
      default:
        return <Badge className="bg-neutral-10 text-neutral-70 border-0 text-xs">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-100">Communication Templates</h2>
          <p className="text-sm text-neutral-60 mt-1">
            Configure automated email notifications and manage delivery templates
          </p>
        </div>
        <Button
          onClick={() => navigateTo("communication-template-editor", { templateId: "new" })}
          className="bg-neutral-100 hover:bg-neutral-90 text-white rounded-full px-5"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-neutral-20 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium relative transition-colors ${
              activeTab === tab.key
                ? "text-neutral-100"
                : "text-neutral-60 hover:text-neutral-80"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-sm" />
            )}
          </button>
        ))}
      </div>

      {/* Active Triggers Tab */}
      {activeTab === "active-triggers" && (
        <div className="border border-neutral-20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-5 border-b border-neutral-20">
                <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Trigger</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Template Name</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Active</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Recipients</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Last Sent</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {triggers.map((trigger) => (
                <tr
                  key={trigger.id}
                  className="border-b border-neutral-20 last:border-b-0 hover:bg-neutral-5 transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-neutral-50" />
                      <Badge className={`${triggerBadgeColors[trigger.trigger] || "bg-neutral-10 text-neutral-80"} border-0 text-xs font-medium`}>
                        {trigger.trigger}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-medium text-neutral-100">{trigger.templateName}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center">
                      <Switch
                        checked={trigger.active}
                        onCheckedChange={() => handleToggle(trigger.id)}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-neutral-70">{trigger.recipients}</td>
                  <td className="px-4 py-3.5 text-sm text-neutral-60">{trigger.lastSent}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigateTo("communication-template-editor", { templateId: trigger.id })}
                        className="p-1.5 rounded-md hover:bg-neutral-10 text-neutral-60 hover:text-neutral-100 transition-colors"
                        title="Edit Template"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => navigateTo("communication-template-editor", { templateId: trigger.id, preview: "true" })}
                        className="p-1.5 rounded-md hover:bg-neutral-10 text-neutral-60 hover:text-neutral-100 transition-colors"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* All Templates Tab */}
      {activeTab === "all-templates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {templateCards.map((template) => (
            <div
              key={template.id}
              onClick={() => navigateTo("communication-template-editor", { templateId: template.id })}
              className="border border-neutral-20 rounded-lg p-4 hover:shadow-md cursor-pointer transition-all hover:border-neutral-40 bg-white group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-5 flex items-center justify-center group-hover:bg-neutral-10 transition-colors">
                  <Mail className="h-5 w-5 text-neutral-60" />
                </div>
                <Badge className={`${triggerBadgeColors[template.triggerType] || "bg-neutral-10 text-neutral-80"} border-0 text-xs font-medium`}>
                  {template.triggerType}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-neutral-100 mb-1.5">{template.name}</h3>
              <p className="text-xs text-neutral-60 mb-3 line-clamp-2">{template.subject}</p>
              <div className="flex items-center justify-between pt-3 border-t border-neutral-10">
                <span className="text-xs text-neutral-50">Modified {template.lastModified}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateTo("communication-template-editor", { templateId: template.id })
                  }}
                  className="text-xs text-neutral-70 hover:text-neutral-100 font-medium transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delivery Log Tab */}
      {activeTab === "delivery-log" && (
        <div>
          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-neutral-60">
              <Filter className="h-4 w-4" />
              <span>Filter:</span>
            </div>

            {/* Trigger Type Filter */}
            <div className="relative">
              <button
                onClick={() => { setShowTriggerDropdown(!showTriggerDropdown); setShowStatusDropdown(false) }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-neutral-20 rounded-lg hover:border-neutral-40 transition-colors bg-white"
              >
                <span className="text-neutral-70">Trigger:</span>
                <span className="text-neutral-100 font-medium">{logFilterTrigger}</span>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-50" />
              </button>
              {showTriggerDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-20 rounded-lg shadow-lg z-10 min-w-[200px] py-1">
                  {triggerTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => { setLogFilterTrigger(type); setShowTriggerDropdown(false) }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-5 transition-colors ${
                        logFilterTrigger === type ? "text-neutral-100 font-medium bg-neutral-5" : "text-neutral-70"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => { setShowStatusDropdown(!showStatusDropdown); setShowTriggerDropdown(false) }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-neutral-20 rounded-lg hover:border-neutral-40 transition-colors bg-white"
              >
                <span className="text-neutral-70">Status:</span>
                <span className="text-neutral-100 font-medium">{logFilterStatus}</span>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-50" />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-20 rounded-lg shadow-lg z-10 min-w-[160px] py-1">
                  {statusTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => { setLogFilterStatus(type); setShowStatusDropdown(false) }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-5 transition-colors ${
                        logFilterStatus === type ? "text-neutral-100 font-medium bg-neutral-5" : "text-neutral-70"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {(logFilterTrigger !== "All" || logFilterStatus !== "All") && (
              <button
                onClick={() => { setLogFilterTrigger("All"); setLogFilterStatus("All") }}
                className="text-xs text-neutral-60 hover:text-neutral-100 transition-colors underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Log Table */}
          <div className="border border-neutral-20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-5 border-b border-neutral-20">
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Sent At</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Trigger</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Recipient</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Subject</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Order #</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLog.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-neutral-20 last:border-b-0 hover:bg-neutral-5 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-neutral-70 whitespace-nowrap">{entry.sentAt}</td>
                    <td className="px-4 py-3">
                      <Badge className={`${triggerBadgeColors[entry.trigger] || "bg-neutral-10 text-neutral-80"} border-0 text-xs font-medium`}>
                        {entry.trigger}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-80 font-mono">{entry.recipient}</td>
                    <td className="px-4 py-3 text-sm text-neutral-100 max-w-[280px] truncate">{entry.subject}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-neutral-80">{entry.orderNumber}</span>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(entry.status)}</td>
                    <td className="px-4 py-3 text-right">
                      {entry.status === "Failed" && (
                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-critical-70 bg-critical-5 hover:bg-critical-10 rounded-full transition-colors border border-critical-20"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Resend
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredLog.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-neutral-50 text-sm">
                      No delivery log entries match the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-4 flex items-center justify-between text-xs text-neutral-50">
            <span>Showing {filteredLog.length} of {deliveryLog.length} entries</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success-70 inline-block"></span> {deliveryLog.filter(e => e.status === "Delivered").length} Delivered</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-info-70 inline-block"></span> {deliveryLog.filter(e => e.status === "Opened").length} Opened</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-critical-70 inline-block"></span> {deliveryLog.filter(e => e.status === "Failed").length} Failed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
