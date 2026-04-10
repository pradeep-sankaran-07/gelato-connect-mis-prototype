"use client"

import { useState, useEffect } from "react"
import { useNavigation } from "@/lib/navigation-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  FileCheck,
  Plus,
  Trash2,
  Calendar,
  Upload,
  Monitor,
  MapPin,
  Sparkles,
  Pencil,
  Check,
  X,
  MessageSquarePlus,
  Printer,
  Download,
  Clock,
  Wrench,
} from "lucide-react"
import { mockEstimates } from "@/lib/mock-data/estimates"
import { mockAiSummaries } from "@/lib/mock-data/ai-summaries"
import { mockConversionSteps, genericDigitalSteps } from "@/lib/mock-data/conversion-steps"
import type { Estimate, ProductionStep, StepAnnotation } from "@/lib/types"

interface EstimateAddress {
  id: string
  label: string
  name: string
  company: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  quantity: number
}

export default function ConvertToOrder({ estimateId }: { estimateId: string }) {
  const { navigateTo, goBack } = useNavigation()

  // Find the estimate
  const estimate = mockEstimates.find((e) => e.id === estimateId) as Estimate | undefined

  // --- Section 1: Order Details state ---
  const [poNumber, setPoNumber] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [customerRef, setCustomerRef] = useState("")
  const [artworkSource, setArtworkSource] = useState<"customer" | "prepress">("customer")
  const [deliveryAddresses, setDeliveryAddresses] = useState<EstimateAddress[]>([
    {
      id: "addr-1",
      label: "Primary",
      name: "",
      company: estimate?.customerName || "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      quantity: estimate?.lineItems.reduce((sum, li) => sum + li.quantity, 0) || 0,
    },
  ])
  const [showAddressForm, setShowAddressForm] = useState(false)

  // --- Section 2: Job Ticket Preview state ---
  const aiSummaryInitial = mockAiSummaries[estimateId] || "Generating summary..."
  const [aiSummary, setAiSummary] = useState("")
  const [aiSummaryEdited, setAiSummaryEdited] = useState(false)
  const [isEditingSummary, setIsEditingSummary] = useState(false)
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [productionSteps, setProductionSteps] = useState<ProductionStep[]>(
    mockConversionSteps[estimateId] || genericDigitalSteps
  )
  const [expandedAnnotation, setExpandedAnnotation] = useState<string | null>(null)
  const [annotationDraft, setAnnotationDraft] = useState("")

  // --- Converting state ---
  const [isConverting, setIsConverting] = useState(false)

  // Simulate AI summary loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setAiSummary(aiSummaryInitial)
      setSummaryLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [aiSummaryInitial])

  const totalQuantity = estimate?.lineItems.reduce((sum, li) => sum + li.quantity, 0) || 0
  const allocatedQuantity = deliveryAddresses.reduce((sum, a) => sum + a.quantity, 0)

  // Validation
  const canConvert = deliveryDate !== "" && deliveryAddresses.length > 0 && deliveryAddresses.every((a) => a.quantity > 0)

  const handleConvert = () => {
    setIsConverting(true)
    setTimeout(() => {
      const newOrderId = `j-${Date.now().toString(36)}`
      navigateTo("order-detail", { orderId: newOrderId })
    }, 800)
  }

  const handleAddAnnotation = (stepId: string) => {
    if (!annotationDraft.trim()) return
    setProductionSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? {
              ...step,
              annotations: [
                ...step.annotations,
                {
                  id: `ann-${Date.now()}`,
                  text: annotationDraft.trim(),
                  author: "You",
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : step
      )
    )
    setAnnotationDraft("")
    setExpandedAnnotation(null)
  }

  const handleRemoveAnnotation = (stepId: string, annotationId: string) => {
    setProductionSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? { ...step, annotations: step.annotations.filter((a) => a.id !== annotationId) }
          : step
      )
    )
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return m > 0 ? `${h}h ${m}min` : `${h}h`
  }

  if (!estimate) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-neutral-60">Estimate not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-6">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-sm text-neutral-60 hover:text-neutral-90 mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Estimate {estimate.id}
        </button>
        <h1 className="text-2xl font-semibold text-[#212121]">Convert to Order</h1>
        <p className="text-sm text-neutral-60 mt-1">
          {estimate.title} &middot; {estimate.customerName}
        </p>
      </div>

      {/* ========== SECTION 1: Order Details ========== */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-[#212121] mb-4">Order Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-[#383838] mb-1">
              PO Number <span className="text-neutral-50">(optional)</span>
            </label>
            <Input
              value={poNumber}
              onChange={(e) => setPoNumber(e.target.value)}
              placeholder="Enter purchase order number"
              className="rounded-lg"
              style={{ borderRadius: "8px" }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#383838] mb-1">
              Requested Delivery Date <span className="text-[#b5260b]">*</span>
            </label>
            <Input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="rounded-lg"
              style={{ borderRadius: "8px" }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#383838] mb-1">
              Customer Reference <span className="text-neutral-50">(optional)</span>
            </label>
            <Input
              value={customerRef}
              onChange={(e) => setCustomerRef(e.target.value)}
              placeholder="Customer's internal reference"
              className="rounded-lg"
              style={{ borderRadius: "8px" }}
            />
          </div>
        </div>

        {/* Artwork Source */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#383838] mb-2">Artwork Source</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setArtworkSource("customer")}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors text-left ${
                artworkSource === "customer"
                  ? "border-[#007cb4] bg-[#f0f8ff]"
                  : "border-neutral-20 hover:border-neutral-40"
              }`}
            >
              <Upload className="h-5 w-5 text-neutral-60 shrink-0" />
              <div>
                <div className="text-sm font-medium text-[#212121]">Customer uploads artwork</div>
                <div className="text-xs text-neutral-50">Portal link sent to customer</div>
              </div>
            </button>
            <button
              onClick={() => setArtworkSource("prepress")}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors text-left ${
                artworkSource === "prepress"
                  ? "border-[#007cb4] bg-[#f0f8ff]"
                  : "border-neutral-20 hover:border-neutral-40"
              }`}
            >
              <Monitor className="h-5 w-5 text-neutral-60 shrink-0" />
              <div>
                <div className="text-sm font-medium text-[#212121]">Pre-press uploads artwork</div>
                <div className="text-xs text-neutral-50">Operator uploads in order</div>
              </div>
            </button>
          </div>
        </div>

        {/* Delivery Addresses */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-[#383838]">
              Delivery Addresses <span className="text-neutral-50">({deliveryAddresses.length})</span>
            </label>
            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="text-xs text-[#007cb4] hover:underline flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              Add address
            </button>
          </div>

          {/* Allocation bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-neutral-50 mb-1">
              <span>Quantity allocation</span>
              <span className={allocatedQuantity !== totalQuantity ? "text-[#b5260b]" : "text-[#0d8a3f]"}>
                {allocatedQuantity.toLocaleString()} / {totalQuantity.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-neutral-10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  allocatedQuantity === totalQuantity ? "bg-[#0d8a3f]" : "bg-[#007cb4]"
                }`}
                style={{ width: `${Math.min((allocatedQuantity / totalQuantity) * 100, 100)}%` }}
              />
            </div>
          </div>

          {deliveryAddresses.map((addr, idx) => (
            <div key={addr.id} className="flex items-center gap-3 p-3 border rounded-lg mb-2">
              <MapPin className="h-4 w-4 text-neutral-40 shrink-0" />
              <div className="flex-1 min-w-0">
                <Input
                  value={addr.street || addr.company}
                  onChange={(e) => {
                    const updated = [...deliveryAddresses]
                    updated[idx] = { ...updated[idx], street: e.target.value }
                    setDeliveryAddresses(updated)
                  }}
                  placeholder="Enter delivery address"
                  className="rounded-lg text-sm"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div className="w-32">
                <Input
                  type="number"
                  value={addr.quantity}
                  onChange={(e) => {
                    const updated = [...deliveryAddresses]
                    updated[idx] = { ...updated[idx], quantity: parseInt(e.target.value) || 0 }
                    setDeliveryAddresses(updated)
                  }}
                  className="rounded-lg text-sm text-right"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <span className="text-xs text-neutral-50 w-6">qty</span>
              {deliveryAddresses.length > 1 && (
                <button
                  onClick={() => setDeliveryAddresses(deliveryAddresses.filter((_, i) => i !== idx))}
                  className="text-neutral-40 hover:text-[#b5260b]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========== SECTION 2: Job Ticket Preview ========== */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#212121]">Job Ticket Preview</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" style={{ borderRadius: "999px" }}>
              <Download className="h-3.5 w-3.5 mr-1" />
              PDF
            </Button>
            <Button variant="outline" size="sm" style={{ borderRadius: "999px" }}>
              <Printer className="h-3.5 w-3.5 mr-1" />
              Print
            </Button>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-[#f8f7ff] border border-[#e0dff5] rounded-lg p-4 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-[#6c5ce7]" />
            <span className="text-xs font-semibold text-[#6c5ce7] uppercase tracking-wide">
              AI Summary
            </span>
            {aiSummaryEdited && (
              <span className="text-[10px] bg-[#e0dff5] text-[#6c5ce7] px-1.5 py-0.5 rounded-full">
                Edited
              </span>
            )}
          </div>

          {summaryLoading ? (
            <div className="flex items-center gap-2 text-sm text-neutral-50 py-2">
              <div className="h-4 w-4 border-2 border-[#6c5ce7] border-t-transparent rounded-full animate-spin" />
              Generating summary from estimate data...
            </div>
          ) : isEditingSummary ? (
            <div>
              <Textarea
                value={aiSummary}
                onChange={(e) => setAiSummary(e.target.value)}
                className="text-sm min-h-[80px] rounded-lg border-[#e0dff5]"
                style={{ borderRadius: "8px" }}
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setIsEditingSummary(false)
                    setAiSummaryEdited(true)
                  }}
                  className="bg-[#212121] hover:opacity-90 text-white"
                  style={{ borderRadius: "999px" }}
                >
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAiSummary(aiSummaryInitial)
                    setIsEditingSummary(false)
                  }}
                  style={{ borderRadius: "999px" }}
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-[#212121] whitespace-pre-line leading-relaxed">
                {aiSummary}
              </p>
              <button
                onClick={() => setIsEditingSummary(true)}
                className="text-[#6c5ce7] hover:bg-[#e0dff5] p-1.5 rounded-md shrink-0"
                title="Edit summary"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Production Steps */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[#212121]">Production Steps</h3>
            <span className="text-xs text-neutral-50">
              {productionSteps.length} steps &middot; Est.{" "}
              {formatDuration(productionSteps.reduce((sum, s) => sum + s.estimatedDuration, 0))}
            </span>
          </div>

          <div className="space-y-2">
            {productionSteps.map((step, idx) => (
              <div key={step.id} className="border rounded-lg overflow-hidden">
                {/* Step header */}
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-5">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#212121] text-white flex items-center justify-center text-xs font-semibold">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-medium text-[#212121]">{step.name}</span>
                    {step.assignedStation && (
                      <span className="text-xs text-neutral-50 flex items-center gap-1">
                        <Wrench className="h-3 w-3" />
                        {step.assignedStation}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-50 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(step.estimatedDuration)}
                    </span>
                    {step.annotations.length === 0 && expandedAnnotation !== step.id && (
                      <button
                        onClick={() => {
                          setExpandedAnnotation(step.id)
                          setAnnotationDraft("")
                        }}
                        className="text-xs text-[#007cb4] hover:underline flex items-center gap-1"
                      >
                        <MessageSquarePlus className="h-3 w-3" />
                        Add note
                      </button>
                    )}
                  </div>
                </div>

                {/* Annotations */}
                {step.annotations.length > 0 && (
                  <div className="px-4 py-2 border-t bg-amber-50/50">
                    {step.annotations.map((ann) => (
                      <div key={ann.id} className="flex items-start gap-2 py-1">
                        <MessageSquarePlus className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-[#212121] flex-1">{ann.text}</p>
                        <button
                          onClick={() => handleRemoveAnnotation(step.id, ann.id)}
                          className="text-neutral-40 hover:text-[#b5260b] shrink-0"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    {expandedAnnotation !== step.id && (
                      <button
                        onClick={() => {
                          setExpandedAnnotation(step.id)
                          setAnnotationDraft("")
                        }}
                        className="text-xs text-[#007cb4] hover:underline mt-1 flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        Add another note
                      </button>
                    )}
                  </div>
                )}

                {/* Expanded annotation input */}
                {expandedAnnotation === step.id && (
                  <div className="px-4 py-3 border-t bg-neutral-5/50">
                    <div className="flex gap-2">
                      <Input
                        value={annotationDraft}
                        onChange={(e) => setAnnotationDraft(e.target.value)}
                        placeholder={`Add note for ${step.name}...`}
                        className="text-sm rounded-lg flex-1"
                        style={{ borderRadius: "8px" }}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && annotationDraft.trim()) handleAddAnnotation(step.id)
                          if (e.key === "Escape") setExpandedAnnotation(null)
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddAnnotation(step.id)}
                        disabled={!annotationDraft.trim()}
                        className="bg-[#212121] hover:opacity-90 text-white"
                        style={{ borderRadius: "999px" }}
                      >
                        Add
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedAnnotation(null)}
                        style={{ borderRadius: "999px" }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== SECTION 3: Review & Convert ========== */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-60">
              {totalQuantity.toLocaleString()} qty &rarr; {deliveryAddresses.length}{" "}
              {deliveryAddresses.length === 1 ? "address" : "addresses"}
            </div>
            <div className="text-lg font-semibold text-[#212121]">
              &euro;{estimate.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={goBack}
              style={{ borderRadius: "999px", border: "2px solid #bdbdbd" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConvert}
              disabled={!canConvert || isConverting}
              className="bg-[#212121] hover:opacity-90 text-white disabled:opacity-40"
              style={{ borderRadius: "999px" }}
            >
              {isConverting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Converting...
                </>
              ) : (
                <>
                  <FileCheck className="h-4 w-4 mr-1" />
                  Convert to Order
                </>
              )}
            </Button>
          </div>
        </div>
        {!deliveryDate && (
          <p className="text-xs text-[#b5260b] mt-2">
            Delivery date is required to schedule production.
          </p>
        )}
      </div>
    </div>
  )
}
