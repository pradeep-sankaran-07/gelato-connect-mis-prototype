"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Code,
  ChevronDown,
  Plus,
  Copy,
  Mail,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useNavigation } from "@/lib/navigation-context"

// --- Types ---
type ViewMode = "visual" | "html"

interface Variable {
  name: string
  label: string
  example: string
}

// --- Data ---
const triggerOptions = [
  "Order Confirmed",
  "File Received",
  "Proof Ready",
  "Proof Reminder",
  "Production Started",
  "Shipped",
  "Invoice Sent",
  "Payment Received",
]

const availableVariables: Variable[] = [
  { name: "{{customer_name}}", label: "Customer Name", example: "Alice Johnson" },
  { name: "{{company_name}}", label: "Company Name", example: "PrintCo Ltd" },
  { name: "{{order_number}}", label: "Order Number", example: "ORD-2026-0147" },
  { name: "{{order_date}}", label: "Order Date", example: "March 15, 2026" },
  { name: "{{order_total}}", label: "Order Total", example: "$2,450.00" },
  { name: "{{delivery_date}}", label: "Delivery Date", example: "March 22, 2026" },
  { name: "{{tracking_number}}", label: "Tracking Number", example: "1Z999AA10123456784" },
  { name: "{{proof_url}}", label: "Proof URL", example: "https://proofs.gelato.com/abc123" },
  { name: "{{invoice_number}}", label: "Invoice Number", example: "INV-2026-0089" },
  { name: "{{invoice_amount}}", label: "Invoice Amount", example: "$2,450.00" },
  { name: "{{payment_link}}", label: "Payment Link", example: "https://pay.gelato.com/inv-0089" },
]

const defaultSubject = "Your order {{order_number}} has been confirmed"

const defaultHtmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#f7f7f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f7f7; padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color:#212121; padding:24px 32px; text-align:center;">
              <h1 style="color:#ffffff; font-size:20px; margin:0; font-weight:600; letter-spacing:0.5px;">Gelato Connect</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="font-size:16px; color:#212121; margin:0 0 16px;">Dear {{customer_name}},</p>
              <p style="font-size:14px; color:#525252; line-height:1.6; margin:0 0 24px;">
                Thank you for your order! We're pleased to confirm that your order
                <strong style="color:#212121;">{{order_number}}</strong> has been received
                and is being processed.
              </p>
              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px; border:1px solid #e6e6e6; border-radius:8px; overflow:hidden;">
                <tr style="background-color:#f7f7f7;">
                  <td style="padding:12px 16px; font-size:13px; font-weight:600; color:#6b6b6b; border-bottom:1px solid #e6e6e6;">Order Details</td>
                  <td style="padding:12px 16px; font-size:13px; font-weight:600; color:#6b6b6b; border-bottom:1px solid #e6e6e6; text-align:right;">Value</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px; font-size:14px; color:#525252; border-bottom:1px solid #e6e6e6;">Order Number</td>
                  <td style="padding:10px 16px; font-size:14px; color:#212121; font-weight:500; text-align:right; border-bottom:1px solid #e6e6e6;">{{order_number}}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px; font-size:14px; color:#525252; border-bottom:1px solid #e6e6e6;">Order Date</td>
                  <td style="padding:10px 16px; font-size:14px; color:#212121; font-weight:500; text-align:right; border-bottom:1px solid #e6e6e6;">{{order_date}}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px; font-size:14px; color:#525252; border-bottom:1px solid #e6e6e6;">Estimated Delivery</td>
                  <td style="padding:10px 16px; font-size:14px; color:#212121; font-weight:500; text-align:right; border-bottom:1px solid #e6e6e6;">{{delivery_date}}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px; font-size:14px; color:#525252;">Total Amount</td>
                  <td style="padding:10px 16px; font-size:14px; color:#212121; font-weight:600; text-align:right;">{{order_total}}</td>
                </tr>
              </table>
              <p style="font-size:14px; color:#525252; line-height:1.6; margin:0 0 24px;">
                You can track the progress of your order at any time through your customer portal.
                If you have questions, reply to this email or contact our support team.
              </p>
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="#" style="display:inline-block; background-color:#212121; color:#ffffff; padding:12px 32px; border-radius:999px; text-decoration:none; font-size:14px; font-weight:500;">
                      View Order Status
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f7f7f7; padding:24px 32px; border-top:1px solid #e6e6e6;">
              <p style="font-size:12px; color:#8a8a8a; margin:0 0 4px; text-align:center;">
                {{company_name}} — Powered by Gelato Connect
              </p>
              <p style="font-size:11px; color:#bdbdbd; margin:0; text-align:center;">
                You are receiving this email because an order was placed on your behalf.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

const sampleData: Record<string, string> = {
  "{{customer_name}}": "Alice Johnson",
  "{{company_name}}": "PrintCo Ltd",
  "{{order_number}}": "ORD-2026-0147",
  "{{order_date}}": "March 15, 2026",
  "{{order_total}}": "$2,450.00",
  "{{delivery_date}}": "March 22, 2026",
  "{{tracking_number}}": "1Z999AA10123456784",
  "{{proof_url}}": "https://proofs.gelato.com/abc123",
  "{{invoice_number}}": "INV-2026-0089",
  "{{invoice_amount}}": "$2,450.00",
  "{{payment_link}}": "https://pay.gelato.com/inv-0089",
}

export default function NotificationTemplateEditor() {
  const { goBack } = useNavigation()
  const [templateName] = useState("Order Confirmation Email")
  const [subject, setSubject] = useState(defaultSubject)
  const [htmlContent, setHtmlContent] = useState(defaultHtmlTemplate)
  const [viewMode, setViewMode] = useState<ViewMode>("visual")
  const [selectedTrigger, setSelectedTrigger] = useState("Order Confirmed")
  const [showTriggerDropdown, setShowTriggerDropdown] = useState(false)
  const [recipients, setRecipients] = useState({
    primary: true,
    billing: false,
    approver: false,
    custom: false,
  })
  const [customEmail, setCustomEmail] = useState("")
  const [testEmail, setTestEmail] = useState("")
  const [showPreviewData, setShowPreviewData] = useState(false)
  const [copiedVar, setCopiedVar] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const getRenderedHtml = () => {
    let rendered = htmlContent
    Object.entries(sampleData).forEach(([key, value]) => {
      rendered = rendered.replace(new RegExp(key.replace(/[{}]/g, "\\$&"), "g"), value)
    })
    return rendered
  }

  const highlightVariables = (text: string) => {
    const parts = text.split(/({{[^}]+}})/g)
    return parts.map((part, i) => {
      if (part.match(/^{{[^}]+}}$/)) {
        return (
          <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded bg-primary-10 text-primary-90 font-mono text-xs font-medium">
            {part}
          </span>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  const handleInsertVariable = (varName: string) => {
    setSubject((prev) => prev + " " + varName)
    setCopiedVar(varName)
    setTimeout(() => setCopiedVar(null), 1500)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-20 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-1.5 rounded-md hover:bg-neutral-10 text-neutral-60 hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-neutral-100">{templateName}</h2>
            <p className="text-xs text-neutral-50 mt-0.5">Email template editor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-success-70 font-medium animate-pulse">
              <CheckCircle className="h-4 w-4" />
              Saved
            </span>
          )}
          <Button
            onClick={handleSave}
            className="bg-neutral-100 hover:bg-neutral-90 text-white rounded-full px-5"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Main Content — Two Column */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel — Template Editor (60%) */}
        <div className="w-[60%] border-r border-neutral-20 flex flex-col overflow-hidden">
          {/* Subject Line */}
          <div className="px-6 py-4 border-b border-neutral-20 bg-white">
            <label className="block text-xs font-medium text-neutral-70 uppercase tracking-wider mb-2">Subject Line</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded-lg border-neutral-20 text-sm"
              placeholder="Enter email subject..."
            />
            <div className="mt-2 text-xs text-neutral-50 flex flex-wrap gap-1">
              Preview: {highlightVariables(subject)}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="px-6 py-3 border-b border-neutral-20 bg-neutral-5 flex items-center justify-between shrink-0">
            <span className="text-xs font-medium text-neutral-70 uppercase tracking-wider">Email Body</span>
            <div className="flex items-center border border-neutral-20 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setViewMode("visual")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewMode === "visual"
                    ? "bg-neutral-100 text-white"
                    : "text-neutral-70 hover:bg-neutral-5"
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                Visual Preview
              </button>
              <button
                onClick={() => setViewMode("html")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewMode === "html"
                    ? "bg-neutral-100 text-white"
                    : "text-neutral-70 hover:bg-neutral-5"
                }`}
              >
                <Code className="h-3.5 w-3.5" />
                Edit HTML
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-y-auto bg-neutral-5">
            {viewMode === "visual" ? (
              <div className="p-6">
                <div className="mx-auto max-w-[640px]">
                  {showPreviewData ? (
                    <div
                      className="bg-white rounded-lg shadow-sm border border-neutral-20 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: getRenderedHtml() }}
                    />
                  ) : (
                    /* Visual representation with variable highlights */
                    <div className="bg-white rounded-lg shadow-sm border border-neutral-20 overflow-hidden">
                      {/* Email Header */}
                      <div className="bg-neutral-100 px-8 py-6 text-center">
                        <h1 className="text-white text-xl font-semibold tracking-wide">Gelato Connect</h1>
                      </div>
                      {/* Email Body */}
                      <div className="px-8 py-8">
                        <p className="text-base text-neutral-100 mb-4">
                          Dear {highlightVariables("{{customer_name}}")},
                        </p>
                        <p className="text-sm text-neutral-70 leading-relaxed mb-6">
                          Thank you for your order! We&apos;re pleased to confirm that your order{" "}
                          <span className="font-semibold text-neutral-100">{highlightVariables("{{order_number}}")}</span>{" "}
                          has been received and is being processed.
                        </p>
                        {/* Order Details Table */}
                        <div className="border border-neutral-20 rounded-lg overflow-hidden mb-6">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-neutral-5">
                                <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-70 border-b border-neutral-20">Order Details</th>
                                <th className="text-right px-4 py-2.5 text-xs font-semibold text-neutral-70 border-b border-neutral-20">Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-neutral-20">
                                <td className="px-4 py-2.5 text-sm text-neutral-70">Order Number</td>
                                <td className="px-4 py-2.5 text-sm text-right font-medium">{highlightVariables("{{order_number}}")}</td>
                              </tr>
                              <tr className="border-b border-neutral-20">
                                <td className="px-4 py-2.5 text-sm text-neutral-70">Order Date</td>
                                <td className="px-4 py-2.5 text-sm text-right font-medium">{highlightVariables("{{order_date}}")}</td>
                              </tr>
                              <tr className="border-b border-neutral-20">
                                <td className="px-4 py-2.5 text-sm text-neutral-70">Estimated Delivery</td>
                                <td className="px-4 py-2.5 text-sm text-right font-medium">{highlightVariables("{{delivery_date}}")}</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2.5 text-sm text-neutral-70">Total Amount</td>
                                <td className="px-4 py-2.5 text-sm text-right font-semibold">{highlightVariables("{{order_total}}")}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-sm text-neutral-70 leading-relaxed mb-6">
                          You can track the progress of your order at any time through your customer portal.
                          If you have questions, reply to this email or contact our support team.
                        </p>
                        {/* CTA */}
                        <div className="text-center">
                          <span className="inline-block bg-neutral-100 text-white px-8 py-3 rounded-full text-sm font-medium">
                            View Order Status
                          </span>
                        </div>
                      </div>
                      {/* Email Footer */}
                      <div className="bg-neutral-5 border-t border-neutral-20 px-8 py-6 text-center">
                        <p className="text-xs text-neutral-60 mb-1">
                          {highlightVariables("{{company_name}}")} — Powered by Gelato Connect
                        </p>
                        <p className="text-[11px] text-neutral-40">
                          You are receiving this email because an order was placed on your behalf.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6">
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="w-full h-[600px] font-mono text-xs leading-relaxed p-4 rounded-lg border border-neutral-20 bg-white resize-none focus:outline-none focus:ring-1 focus:ring-neutral-90"
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Panel — Configuration (40%) */}
        <div className="w-[40%] overflow-y-auto bg-white">
          <div className="p-6 space-y-6">
            {/* Trigger */}
            <div>
              <label className="block text-xs font-medium text-neutral-70 uppercase tracking-wider mb-2">Trigger Event</label>
              <div className="relative">
                <button
                  onClick={() => setShowTriggerDropdown(!showTriggerDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm border border-neutral-20 rounded-lg hover:border-neutral-40 transition-colors bg-white text-left"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-neutral-50" />
                    <span className="text-neutral-100 font-medium">{selectedTrigger}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-neutral-50" />
                </button>
                {showTriggerDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-20 rounded-lg shadow-lg z-10 py-1">
                    {triggerOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => { setSelectedTrigger(option); setShowTriggerDropdown(false) }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-5 transition-colors ${
                          selectedTrigger === option ? "text-neutral-100 font-medium bg-neutral-5" : "text-neutral-70"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="mt-1.5 text-xs text-neutral-50">This email will be sent automatically when this event occurs</p>
            </div>

            <hr className="border-neutral-20" />

            {/* Recipients */}
            <div>
              <label className="block text-xs font-medium text-neutral-70 uppercase tracking-wider mb-3">Recipients</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setRecipients(prev => ({ ...prev, primary: !prev.primary }))}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      recipients.primary
                        ? "bg-neutral-90 border-neutral-90"
                        : "border-neutral-40 hover:border-neutral-60"
                    }`}
                  >
                    {recipients.primary && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-neutral-80 group-hover:text-neutral-100">Primary Contact</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setRecipients(prev => ({ ...prev, billing: !prev.billing }))}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      recipients.billing
                        ? "bg-neutral-90 border-neutral-90"
                        : "border-neutral-40 hover:border-neutral-60"
                    }`}
                  >
                    {recipients.billing && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-neutral-80 group-hover:text-neutral-100">Billing Contact</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setRecipients(prev => ({ ...prev, approver: !prev.approver }))}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      recipients.approver
                        ? "bg-neutral-90 border-neutral-90"
                        : "border-neutral-40 hover:border-neutral-60"
                    }`}
                  >
                    {recipients.approver && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-neutral-80 group-hover:text-neutral-100">Approver</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setRecipients(prev => ({ ...prev, custom: !prev.custom }))}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      recipients.custom
                        ? "bg-neutral-90 border-neutral-90"
                        : "border-neutral-40 hover:border-neutral-60"
                    }`}
                  >
                    {recipients.custom && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-neutral-80 group-hover:text-neutral-100">Custom Email</span>
                </label>
                {recipients.custom && (
                  <div className="ml-8">
                    <Input
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="rounded-lg border-neutral-20 text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            <hr className="border-neutral-20" />

            {/* Available Variables */}
            <div>
              <label className="block text-xs font-medium text-neutral-70 uppercase tracking-wider mb-3">Available Variables</label>
              <div className="border border-neutral-20 rounded-lg overflow-hidden max-h-[320px] overflow-y-auto">
                {availableVariables.map((variable, index) => (
                  <div
                    key={variable.name}
                    className={`flex items-center justify-between px-3 py-2.5 hover:bg-neutral-5 transition-colors ${
                      index < availableVariables.length - 1 ? "border-b border-neutral-10" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-primary-10 text-primary-90 font-mono text-xs font-medium">
                        {variable.name}
                      </span>
                      <p className="text-[11px] text-neutral-50 mt-0.5 truncate">
                        e.g. {variable.example}
                      </p>
                    </div>
                    <button
                      onClick={() => handleInsertVariable(variable.name)}
                      className={`shrink-0 ml-2 flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-all ${
                        copiedVar === variable.name
                          ? "bg-success-10 text-success-70"
                          : "border border-neutral-20 text-neutral-70 hover:bg-neutral-5 hover:text-neutral-100"
                      }`}
                    >
                      {copiedVar === variable.name ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Inserted
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" />
                          Insert
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-neutral-20" />

            {/* Preview & Test */}
            <div>
              <label className="block text-xs font-medium text-neutral-70 uppercase tracking-wider mb-3">Preview & Test</label>
              <div className="space-y-3">
                <button
                  onClick={() => setShowPreviewData(!showPreviewData)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full transition-colors border-2 ${
                    showPreviewData
                      ? "bg-neutral-100 text-white border-neutral-100"
                      : "border-neutral-40 text-neutral-80 hover:bg-neutral-5"
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  {showPreviewData ? "Showing Sample Data" : "Preview with Sample Data"}
                </button>

                <div className="flex gap-2">
                  <Input
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                    className="rounded-lg border-neutral-20 text-sm flex-1"
                  />
                  <Button
                    className="border-2 border-neutral-40 text-neutral-80 hover:bg-neutral-5 bg-white rounded-full px-4 shrink-0"
                  >
                    <Send className="h-4 w-4 mr-1.5" />
                    Send Test
                  </Button>
                </div>
                <p className="text-xs text-neutral-50">
                  Send a test email with sample data to verify the template renders correctly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
