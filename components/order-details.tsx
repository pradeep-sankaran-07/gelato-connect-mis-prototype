"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Upload,
  Download,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Send,
  Printer,
  FileText,
  Truck,
  Package,
  X,
  Settings,
  FileWarning,
  Info,
  Edit,
  ShoppingCart,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import LeftMenu from "./left-menu"

export default function OrderDetails({
  orderId,
  onBackClick,
  isAutomatedExample,
  onToggleExample,
  customer = "PrintCo Ltd",
  jobDate = "May 16, 2025",
}: {
  orderId: string
  onBackClick: (orderId?: string) => void
  isAutomatedExample: boolean
  onToggleExample: () => void
  customer?: string
  jobDate?: string
}) {
  const [orderStatus, setOrderStatus] = useState("awaiting-artwork")
  const [showPreflightResults, setShowPreflightResults] = useState(false)
  const [artworkUploaded, setArtworkUploaded] = useState(false)
  const [preflightPassed, setPreflightPassed] = useState(false)
  const [proofSent, setProofSent] = useState(false)
  const [proofApproved, setProofApproved] = useState(false)
  const [productionSystem, setProductionSystem] = useState("gelato")
  const [impositionStatus, setImpositionStatus] = useState<"auto" | "manual" | "pending">("pending")
  const [workflowStatus, setWorkflowStatus] = useState<"auto" | "manual" | "pending">("pending")
  const [showImpositionTemplate, setShowImpositionTemplate] = useState(false)
  const [showWorkflowTemplate, setShowWorkflowTemplate] = useState(false)
  const [isEditingProductionSystem, setIsEditingProductionSystem] = useState(false)
  const [showJobTicket, setShowJobTicket] = useState(false)
  const [showCreatePO, setShowCreatePO] = useState(false)
  const [isInventoryExpanded, setIsInventoryExpanded] = useState(false)

  const materialsRequired = [
    {
      id: "paper-200gsm-gloss",
      name: "200gsm Gloss Paper",
      specification: "A4, 210x297mm",
      quantityNeeded: "25 sheets",
      quantityInStock: "150 sheets",
      status: "reserved",
      supplier: "Paper Plus Ltd",
      unitCost: "€0.12",
      totalCost: "€3.00",
    },
    {
      id: "cmyk-ink-set",
      name: "CMYK Ink Set",
      specification: "Digital printing ink",
      quantityNeeded: "2 cartridges",
      quantityInStock: "5 cartridges",
      status: "reserved",
      supplier: "Ink Solutions",
      unitCost: "€45.00",
      totalCost: "€90.00",
    },
    {
      id: "finishing-adhesive",
      name: "Tri-fold Adhesive",
      specification: "Cold adhesive for folding",
      quantityNeeded: "1 bottle",
      quantityInStock: "0 bottles",
      status: "unavailable",
      supplier: "Finishing Supplies Co",
      unitCost: "€25.00",
      totalCost: "€25.00",
    },
    {
      id: "packaging-material",
      name: "Protective Packaging",
      specification: "Bubble wrap & cardboard",
      quantityNeeded: "2 rolls",
      quantityInStock: "0 rolls",
      status: "unavailable",
      supplier: "Pack & Ship Ltd",
      unitCost: "€15.00",
      totalCost: "€30.00",
    },
  ]

  const handleCreatePO = () => {
    const unavailableItems = materialsRequired.filter((item) => item.status === "unavailable")
    if (unavailableItems.length > 0) {
      setShowCreatePO(true)
    }
  }

  const getMaterialStatusBadge = (status: string) => {
    switch (status) {
      case "reserved":
        return <Badge className="bg-success-10 text-success-90">Reserved</Badge>
      case "unavailable":
        return <Badge className="bg-critical-10 text-critical-90">Unavailable</Badge>
      default:
        return <Badge className="bg-neutral-5 text-neutral-90">{status}</Badge>
    }
  }

  // Reset state when orderId changes
  useEffect(() => {
    setOrderStatus("awaiting-artwork")
    setShowPreflightResults(false)
    setArtworkUploaded(false)
    setPreflightPassed(false)
    setProofSent(false)
    setProofApproved(false)
    setImpositionStatus(isAutomatedExample ? "auto" : "manual")
    setWorkflowStatus(isAutomatedExample ? "auto" : "manual")
    setProductionSystem(isAutomatedExample ? "gelato" : "manual")
  }, [orderId, isAutomatedExample])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setArtworkUploaded(true)
      setTimeout(() => {
        setShowPreflightResults(true)
        setPreflightPassed(true)
      }, 1500)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const sendProof = () => {
    setProofSent(true)
    setOrderStatus("proof-sent")
  }

  const approveProof = () => {
    setProofApproved(true)
    setOrderStatus("proof-approved")

    setTimeout(() => {
      if (isAutomatedExample) {
        setImpositionStatus("auto")
        setWorkflowStatus("auto")
        setProductionSystem("gelato")
      } else {
        setImpositionStatus("manual")
        setWorkflowStatus("manual")
        setProductionSystem("manual")
      }
    }, 1000)
  }

  const sendToProduction = () => {
    setOrderStatus("in-production")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-info-10 text-info-90">Confirmed</Badge>
      case "awaiting-artwork":
        return <Badge className="bg-amber-100 text-amber-800">Awaiting Artwork</Badge>
      case "proof-sent":
        return <Badge className="bg-primary-10 text-primary-90">Proof Sent</Badge>
      case "proof-approved":
        return <Badge className="bg-success-10 text-success-90">Proof Approved</Badge>
      case "prepress":
        return <Badge className="bg-info-10 text-info-90">In Prepress</Badge>
      case "in-production":
        return <Badge className="bg-pink-100 text-pink-800">In Production</Badge>
      case "in-finishing":
        return <Badge className="bg-warning-10 text-warning-90">In Finishing</Badge>
      case "in-shipping":
        return <Badge className="bg-cyan-100 text-cyan-800">In Shipping</Badge>
      case "shipped":
        return <Badge className="bg-success-10 text-success-90">Shipped</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const handleNavigate = (page: string) => {
    onBackClick()
  }

  const getProductionSystemLabel = (system: string) => {
    switch (system) {
      case "gelato":
        return "GelatoConnect Internal"
      case "external":
        return "External System (API)"
      case "manual":
        return "Manual (Paper Job Ticket)"
      default:
        return system
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="bg-white p-4 h-20 flex items-center justify-between border-b">
        <div className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2819%29-170UxeV7cg8b7kNjFagZkz9quPldwr.png"
            alt="GelatoConnect Logo"
            className="h-6 w-6 mr-2"
          />
          <span className="font-bold text-lg">GelatoConnect</span>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBackClick} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Manage Orders
          </Button>
          <Input type="text" placeholder="Search" className="w-64 mr-4" />
          <Button variant="outline" size="sm" className="mr-2 bg-transparent">
            Support
          </Button>
          <div className="w-8 h-8 rounded-full bg-neutral-90 text-white flex items-center justify-center">PS</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <LeftMenu activePage="orders" onNavigate={handleNavigate} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white p-4 border-b">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={onBackClick}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Manage Orders
                </Button>
                <div className="text-sm text-neutral-50">
                  Order #{orderId} • {customer} • {jobDate}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onToggleExample}>
                  <Package className="h-4 w-4 mr-1" />
                  {isAutomatedExample ? "Show Manual Example" : "Show Automated Example"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowJobTicket(true)}>
                  <FileText className="h-4 w-4 mr-1" />
                  Open Job Ticket
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              {/* Next Action Section */}
              <div className="bg-white border rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Next Action</h2>
                  <Badge className="px-3 py-1 text-sm">{getStatusBadge(orderStatus)}</Badge>
                </div>

                {orderStatus === "awaiting-artwork" && !artworkUploaded && (
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-info-10 p-4 rounded-lg border border-neutral-10">
                    <div className="flex-1">
                      <h3 className="font-medium text-info-90 mb-1">Upload Artwork Files</h3>
                      <p className="text-sm text-info-90">
                        The order is waiting for artwork files to be uploaded. Once uploaded, we'll run preflight
                        checks.
                      </p>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.ai,.eps,.psd,.jpg,.tif"
                    />
                    <Button onClick={triggerFileUpload} className="whitespace-nowrap bg-info-70 hover:bg-info-90">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Artwork
                    </Button>
                  </div>
                )}

                {orderStatus === "awaiting-artwork" && artworkUploaded && preflightPassed && (
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-success-10 p-4 rounded-lg border border-neutral-10">
                    <div className="flex-1">
                      <h3 className="font-medium text-success-90 mb-1">Artwork Ready</h3>
                      <p className="text-sm text-success-90">
                        Artwork has been uploaded and passed preflight checks. You can now send the proof to the client.
                      </p>
                    </div>
                    <Button onClick={sendProof} className="whitespace-nowrap bg-success-70 hover:bg-success-90">
                      <Send className="h-4 w-4 mr-1" />
                      Send Proof to Client
                    </Button>
                  </div>
                )}

                {orderStatus === "proof-sent" && (
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-primary-5 p-4 rounded-lg border border-neutral-10">
                    <div className="flex-1">
                      <h3 className="font-medium text-primary-90 mb-1">Waiting for Client Approval</h3>
                      <p className="text-sm text-primary-90">
                        Digital proof has been sent to the client. Waiting for their approval before proceeding to
                        production.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
                        <Send className="h-4 w-4 mr-1" />
                        Resend Proof
                      </Button>
                      <Button onClick={approveProof} className="whitespace-nowrap bg-primary-70 hover:bg-primary-90">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve Proof
                      </Button>
                    </div>
                  </div>
                )}

                {orderStatus === "proof-approved" && impositionStatus === "pending" && (
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-info-10 p-4 rounded-lg border border-neutral-10">
                    <div className="flex-1">
                      <h3 className="font-medium text-info-90 mb-1">Checking Production Requirements</h3>
                      <p className="text-sm text-info-90">
                        Proof has been approved. We're checking for compatible imposition templates and workflow
                        configurations.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-info-70"></div>
                    </div>
                  </div>
                )}

                {orderStatus === "proof-approved" && impositionStatus === "manual" && (
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-amber-50 p-4 rounded-lg border border-neutral-10">
                    <div className="flex-1">
                      <h3 className="font-medium text-amber-800 mb-1">Manual Prepress Required</h3>
                      <p className="text-sm text-amber-700">
                        No matching imposition template found for this job. Manual prepress work is required before
                        production.
                      </p>
                    </div>
                    <Button
                      onClick={() => setOrderStatus("prepress")}
                      className="whitespace-nowrap bg-amber-600 hover:bg-caution-90"
                    >
                      <FileWarning className="h-4 w-4 mr-1" />
                      Send to Prepress
                    </Button>
                  </div>
                )}

                {orderStatus === "proof-approved" && impositionStatus === "auto" && workflowStatus === "manual" && (
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-amber-50 p-4 rounded-lg border border-neutral-10">
                    <div className="flex-1">
                      <h3 className="font-medium text-amber-800 mb-1">Manual Production Required</h3>
                      <p className="text-sm text-amber-700">
                        Imposition template found, but no matching workflow configuration. This job will require manual
                        production tracking.
                      </p>
                    </div>
                    <Button onClick={sendToProduction} className="whitespace-nowrap bg-amber-600 hover:bg-caution-90">
                      <Printer className="h-4 w-4 mr-1" />
                      Send to Production
                    </Button>
                  </div>
                )}

                {orderStatus === "proof-approved" && impositionStatus === "auto" && workflowStatus === "auto" && (
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-success-10 p-4 rounded-lg border border-neutral-10">
                    <div className="flex-1">
                      <h3 className="font-medium text-success-90 mb-1">Ready for Automated Production</h3>
                      <p className="text-sm text-success-90">
                        The job is ready for automated production via GelatoConnect with JDF to machine.
                      </p>
                    </div>
                    <Button onClick={sendToProduction} className="whitespace-nowrap bg-success-70 hover:bg-success-90">
                      <Printer className="h-4 w-4 mr-1" />
                      Send to Production
                    </Button>
                  </div>
                )}

                {orderStatus === "prepress" && (
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-info-10 p-4 rounded-lg border border-neutral-10">
                    <div className="flex-1">
                      <h3 className="font-medium text-info-90 mb-1">In Prepress</h3>
                      <p className="text-sm text-info-90">
                        The job is currently in prepress for manual imposition. Once completed, it will move to
                        production.
                      </p>
                    </div>
                    <Button onClick={sendToProduction} className="whitespace-nowrap bg-info-70 hover:bg-info-90">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Complete Prepress
                    </Button>
                  </div>
                )}

                {orderStatus === "in-production" && (
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-pink-50 p-4 rounded-lg border border-pink-100">
                    <div className="flex-1">
                      <h3 className="font-medium text-pink-800 mb-1">In Production</h3>
                      <p className="text-sm text-pink-700">
                        Order is currently in production. Estimated completion: May 28, 2025.
                      </p>
                    </div>
                    <Button variant="outline" className="whitespace-nowrap bg-transparent">
                      <FileText className="h-4 w-4 mr-1" />
                      View Production Details
                    </Button>
                  </div>
                )}

                {/* Order Progress Timeline */}
                <div className="mt-6">
                  <h3 className="font-medium text-neutral-70 mb-4">Order Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-success-10 flex items-center justify-center mb-2">
                        <CheckCircle className="h-6 w-6 text-success-70" />
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Order Confirmed</div>
                        <div className="text-xs text-neutral-50">May 16, 2025</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${artworkUploaded ? "bg-success-10" : orderStatus === "awaiting-artwork" ? "bg-info-10 ring-2 ring-info-70" : "bg-neutral-5"} flex items-center justify-center mb-2`}
                      >
                        {artworkUploaded ? (
                          <CheckCircle className="h-6 w-6 text-success-70" />
                        ) : (
                          <Upload
                            className={`h-6 w-6 ${orderStatus === "awaiting-artwork" ? "text-info-70" : "text-neutral-40"}`}
                          />
                        )}
                      </div>
                      <div className="text-center">
                        <div
                          className={`font-medium ${orderStatus === "awaiting-artwork" && !artworkUploaded ? "text-info-70" : ""}`}
                        >
                          Artwork Upload
                        </div>
                        <div className="text-xs text-neutral-50">{artworkUploaded ? "May 18, 2025" : "Pending"}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${proofApproved ? "bg-success-10" : orderStatus === "proof-sent" ? "bg-primary-10 ring-2 ring-primary-50" : "bg-neutral-5"} flex items-center justify-center mb-2`}
                      >
                        {proofApproved ? (
                          <CheckCircle className="h-6 w-6 text-success-70" />
                        ) : (
                          <FileCheck
                            className={`h-6 w-6 ${orderStatus === "proof-sent" ? "text-primary-70" : "text-neutral-40"}`}
                          />
                        )}
                      </div>
                      <div className="text-center">
                        <div
                          className={`font-medium ${orderStatus === "proof-sent" && !proofApproved ? "text-primary-70" : ""}`}
                        >
                          Proof Approval
                        </div>
                        <div className="text-xs text-neutral-50">{proofApproved ? "May 20, 2025" : "Pending"}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${
                          proofApproved && impositionStatus === "auto" && workflowStatus === "auto"
                            ? "bg-success-10"
                            : orderStatus === "prepress"
                              ? "bg-info-10 ring-2 ring-info-70"
                              : (impositionStatus === "manual" || workflowStatus === "manual") && proofApproved
                                ? "bg-amber-100 ring-2 ring-amber-400"
                                : "bg-neutral-5"
                        } flex items-center justify-center mb-2`}
                      >
                        {proofApproved && impositionStatus === "auto" && workflowStatus === "auto" ? (
                          <CheckCircle className="h-6 w-6 text-success-70" />
                        ) : orderStatus === "prepress" ? (
                          <FileWarning className="h-6 w-6 text-info-70" />
                        ) : (
                          <Settings
                            className={`h-6 w-6 ${
                              (impositionStatus === "manual" || workflowStatus === "manual") && proofApproved
                                ? "text-amber-600"
                                : "text-neutral-40"
                            }`}
                          />
                        )}
                      </div>
                      <div className="text-center">
                        <div
                          className={`font-medium ${
                            orderStatus === "prepress"
                              ? "text-info-70"
                              : (impositionStatus === "manual" || workflowStatus === "manual") && proofApproved
                                ? "text-amber-600"
                                : ""
                          }`}
                        >
                          Prepress
                        </div>
                        <div className="text-xs text-neutral-50">
                          {orderStatus === "prepress"
                            ? "In Progress"
                            : (impositionStatus === "manual" || workflowStatus === "manual") && proofApproved
                              ? "Required"
                              : proofApproved && impositionStatus === "auto" && workflowStatus === "auto"
                                ? "Completed"
                                : "Auto"}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${orderStatus === "in-production" ? "bg-pink-100 ring-2 ring-pink-400" : orderStatus === "in-shipping" || orderStatus === "shipped" ? "bg-success-10" : "bg-neutral-5"} flex items-center justify-center mb-2`}
                      >
                        {orderStatus === "in-shipping" || orderStatus === "shipped" ? (
                          <CheckCircle className="h-6 w-6 text-success-70" />
                        ) : (
                          <Printer
                            className={`h-6 w-6 ${orderStatus === "in-production" ? "text-pink-600" : "text-neutral-40"}`}
                          />
                        )}
                      </div>
                      <div className="text-center">
                        <div className={`font-medium ${orderStatus === "in-production" ? "text-pink-600" : ""}`}>
                          Production
                        </div>
                        <div className="text-xs text-neutral-50">
                          {orderStatus === "in-production" || orderStatus === "in-shipping" || orderStatus === "shipped"
                            ? "May 22, 2025"
                            : "Pending"}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${orderStatus === "in-shipping" ? "bg-cyan-100 ring-2 ring-cyan-400" : orderStatus === "shipped" ? "bg-success-10" : "bg-neutral-5"} flex items-center justify-center mb-2`}
                      >
                        {orderStatus === "shipped" ? (
                          <CheckCircle className="h-6 w-6 text-success-70" />
                        ) : (
                          <Truck
                            className={`h-6 w-6 ${orderStatus === "in-shipping" ? "text-cyan-600" : "text-neutral-40"}`}
                          />
                        )}
                      </div>
                      <div className="text-center">
                        <div className={`font-medium ${orderStatus === "in-shipping" ? "text-cyan-600" : ""}`}>
                          Shipping
                        </div>
                        <div className="text-xs text-neutral-50">
                          {orderStatus === "shipped" ? "May 30, 2025" : "Est. May 30, 2025"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Production Configuration Section - Compact Single Line */}
              <div className="bg-white border rounded-lg p-4 flex items-center gap-3">
                <Info className="h-5 w-5 text-info-70 flex-shrink-0" />
                <div className="flex-grow text-sm">
                  {isAutomatedExample ? (
                    <span>
                      <span className="font-medium">Production:</span> GelatoConnect (automated).
                      <span className="font-medium"> Imposition template:</span>{" "}
                      <button
                        onClick={() => setShowImpositionTemplate(true)}
                        className="text-info-70 underline hover:text-info-90 font-medium"
                      >
                        Gelato_FlatProduct_4-4_Cut&Stack
                      </button>
                      , <span className="font-medium">Workflow config:</span>{" "}
                      <button
                        onClick={() => setShowWorkflowTemplate(true)}
                        className="text-info-70 underline hover:text-info-90 font-medium"
                      >
                        Flat Product Single Page Workflow
                      </button>
                    </span>
                  ) : (
                    <span>
                      <span className="font-medium">Production:</span> Requires manual Imposition and workflow tracking
                      using paper job ticket, as templates don't exist
                    </span>
                  )}
                  {isEditingProductionSystem ? (
                    <span className="inline-flex items-center gap-2 ml-3">
                      <select
                        value={productionSystem}
                        onChange={(e) => setProductionSystem(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="gelato">GelatoConnect Internal</option>
                        <option value="external">External System (API)</option>
                        <option value="manual">Manual (Paper Job Ticket)</option>
                      </select>
                      <Button size="sm" onClick={() => setIsEditingProductionSystem(false)} className="px-2 py-1 h-7">
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingProductionSystem(false)}
                        className="px-2 py-1 h-7"
                      >
                        Cancel
                      </Button>
                    </span>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingProductionSystem(true)}
                      className="ml-3 h-7 px-2 py-1"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Order Details Section */}
              <div className="space-y-6">
                {/* Customer and Product Info Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border rounded-md h-fit">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Customer Information</div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Company</label>
                          <div>PrintCo Ltd</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Contact</label>
                          <div>Alex Chen</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Email</label>
                          <div>alex.chen@printco.com</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Phone</label>
                          <div>+44 20 1234 5678</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md h-fit">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Product Specifications</div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Product</label>
                          <div>Tri-fold Brochures</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Quantity</label>
                          <div>5,000</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Size</label>
                          <div>A4 (210 x 297 mm)</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Orientation</label>
                          <div>Portrait</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Paper</label>
                          <div>200gsm Gloss</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Printing</label>
                          <div>Full color, double-sided (4/4)</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Finishing</label>
                          <div>Tri-fold</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Production Method</label>
                          <div>Digital</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md">
                  <div
                    className="bg-neutral-5 p-4 font-medium border-b flex justify-between items-center cursor-pointer hover:bg-neutral-5 transition-colors"
                    onClick={() => setIsInventoryExpanded(!isInventoryExpanded)}
                  >
                    <div className="flex items-center gap-2">
                      <span>Inventory</span>
                      {isInventoryExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-success-10 text-success-90">
                        {materialsRequired.filter((item) => item.status === "reserved").length} Reserved
                      </Badge>
                      <Badge className="bg-critical-10 text-critical-90">
                        {materialsRequired.filter((item) => item.status === "unavailable").length} Unavailable
                      </Badge>
                    </div>
                  </div>

                  {!isInventoryExpanded && materialsRequired.some((item) => item.status === "unavailable") && (
                    <div className="p-4 bg-amber-50 border-b border-neutral-20">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                        <div className="text-sm text-amber-800">
                          <span className="font-medium">Action Required:</span> Some materials are unavailable and need
                          to be ordered.
                        </div>
                      </div>
                    </div>
                  )}

                  {isInventoryExpanded && (
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-neutral-60">Materials required for production:</span>
                        {materialsRequired.some((item) => item.status === "unavailable") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCreatePO}
                            disabled={!materialsRequired.some((item) => item.status === "unavailable")}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Create PO
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        {materialsRequired.map((material) => (
                          <div
                            key={material.id}
                            className="flex items-center justify-between p-3 border rounded-md bg-neutral-5"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div className="font-medium">{material.name}</div>
                                {getMaterialStatusBadge(material.status)}
                              </div>
                              <div className="text-sm text-neutral-60 mt-1">
                                {material.specification} • Need: {material.quantityNeeded} • In Stock:{" "}
                                {material.quantityInStock}
                              </div>
                              <div className="text-sm text-neutral-50 mt-1">
                                Supplier: {material.supplier} • Unit Cost: {material.unitCost} • Total:{" "}
                                {material.totalCost}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {materialsRequired.some((item) => item.status === "unavailable") && (
                        <div className="mt-4 p-3 bg-amber-50 border border-neutral-20 rounded-md">
                          <div className="flex items-center">
                            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                            <div className="text-sm text-amber-800">
                              <span className="font-medium">Action Required:</span> Some materials are unavailable and
                              need to be ordered. Click "Create PO" to generate a purchase order for missing items.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Shipping and Order Summary Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border rounded-md h-fit">
                    <div className="bg-neutral-5 p-4 font-medium border-b flex justify-between items-center">
                      <span>Shipping Information</span>
                      <Badge className="bg-info-10 text-info-90">2 Shipments</Badge>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="border-b pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">Shipment #1</div>
                            <Badge variant="outline" className="text-xs">
                              3 Pallets
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-neutral-50 font-medium">Address:</span> PrintCo Ltd, 123 Print Street,
                              London, EC1A 1BB, UK
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-neutral-50 font-medium">Method:</span> Standard Freight
                              </div>
                              <div>
                                <span className="text-neutral-50 font-medium">Quantity:</span> 3,000 units (60%)
                              </div>
                            </div>
                            <div>
                              <span className="text-neutral-50 font-medium">Tracking:</span> FT-2025-3344-01
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">Shipment #2</div>
                            <Badge variant="outline" className="text-xs">
                              2 Pallets
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-neutral-50 font-medium">Address:</span> PrintCo Distribution, 45
                              Logistics Way, Manchester, M1 5WP, UK
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-neutral-50 font-medium">Method:</span> Express Freight
                              </div>
                              <div>
                                <span className="text-neutral-50 font-medium">Quantity:</span> 2,000 units (40%)
                              </div>
                            </div>
                            <div>
                              <span className="text-neutral-50 font-medium">Tracking:</span> FT-2025-3344-02
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md h-fit">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Order Summary</div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Production Cost:</span>
                          <span>EUR 950.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Finishing Cost:</span>
                          <span>EUR 150.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>EUR 50.00</span>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex justify-between font-medium text-lg">
                          <span>Total:</span>
                          <span>EUR 1,250.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artwork & Preflight Section */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-neutral-5 p-4 font-semibold border-b flex justify-between items-center">
                  <span>Artwork & Preflight</span>
                  {!artworkUploaded && (
                    <Button onClick={triggerFileUpload} size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Artwork
                    </Button>
                  )}
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    <div className="xl:col-span-3 space-y-6">
                      {!artworkUploaded ? (
                        <div className="text-center py-8 border-2 border-dashed rounded-md">
                          <Upload className="h-12 w-12 mx-auto text-neutral-40 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No artwork uploaded yet</h3>
                          <p className="text-neutral-50 mb-4 max-w-md mx-auto">
                            Upload your print-ready artwork files. We accept PDF, AI, EPS, PSD, JPG, and TIF formats.
                          </p>
                          <Button onClick={triggerFileUpload}>
                            <Upload className="h-4 w-4 mr-1" />
                            Upload Artwork
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 border rounded-md bg-neutral-5">
                            <div className="flex items-center">
                              <FileText className="h-8 w-8 text-info-70 mr-3" />
                              <div>
                                <div className="font-medium">PrintCo_Brochure_Final.pdf</div>
                                <div className="text-sm text-neutral-50">5.2 MB • Uploaded May 18, 2025 2:30 PM</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-critical-70 hover:text-critical-90 bg-transparent"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="border rounded-md">
                            <div className="bg-neutral-5 p-4 font-medium border-b">Preflight Results</div>
                            <div className="p-4">
                              {showPreflightResults ? (
                                <div className="space-y-4">
                                  {preflightPassed ? (
                                    <div className="flex items-start p-3 bg-success-10 border border-neutral-20 rounded-md">
                                      <CheckCircle className="h-5 w-5 text-success-70 mr-3 mt-0.5" />
                                      <div>
                                        <div className="font-medium text-success-90">Preflight check passed</div>
                                        <p className="text-sm text-success-90 mt-1">
                                          Your artwork meets all the requirements for printing. You can proceed with
                                          sending the proof.
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-start p-3 bg-amber-50 border border-neutral-20 rounded-md">
                                      <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                                      <div>
                                        <div className="font-medium text-amber-800">Preflight check found issues</div>
                                        <p className="text-sm text-amber-700 mt-1">
                                          There are some issues with your artwork that need to be addressed before
                                          printing.
                                        </p>
                                        <ul className="text-sm text-amber-700 mt-2 list-disc pl-5 space-y-1">
                                          <li>Image resolution below 300 DPI on page 2</li>
                                          <li>Missing bleed (3mm required)</li>
                                          <li>Text too close to trim edge (minimum 5mm safe area required)</li>
                                        </ul>
                                      </div>
                                    </div>
                                  )}

                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Document Size</span>
                                      <span className="text-success-70 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" /> Correct (210 x 297 mm)
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Color Mode</span>
                                      <span className="text-success-70 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" /> CMYK
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Resolution</span>
                                      <span className="text-success-70 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" /> 300 DPI
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Fonts</span>
                                      <span className="text-success-70 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" /> Embedded
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Bleed</span>
                                      <span className="text-success-70 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" /> 3mm
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-8">
                                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-info-70 mx-auto mb-4"></div>
                                  <p className="text-neutral-50">Running preflight checks...</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="border rounded-md">
                        <div className="bg-neutral-5 p-4 font-medium border-b">Digital Proof</div>
                        <div className="p-4">
                          {!artworkUploaded ? (
                            <div className="text-neutral-50 text-center py-6">
                              Upload artwork to generate a digital proof
                            </div>
                          ) : !proofSent ? (
                            <div className="space-y-4">
                              <div className="aspect-video bg-neutral-5 rounded-md flex items-center justify-center">
                                <img
                                  src="/brochure-preview.png"
                                  alt="Brochure Preview"
                                  className="max-h-full rounded-md"
                                />
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium">Digital Proof</h3>
                                  <p className="text-sm text-neutral-50">
                                    Review the digital proof and send it to the client for approval
                                  </p>
                                </div>
                                <Button onClick={sendProof} disabled={!preflightPassed}>
                                  <Send className="h-4 w-4 mr-1" />
                                  Send to Client
                                </Button>
                              </div>
                            </div>
                          ) : !proofApproved ? (
                            <div className="space-y-4">
                              <div className="aspect-video bg-neutral-5 rounded-md flex items-center justify-center">
                                <img
                                  src="/brochure-preview.png"
                                  alt="Brochure Preview"
                                  className="max-h-full rounded-md"
                                />
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium">Digital Proof Sent</h3>
                                  <p className="text-sm text-neutral-50">Waiting for client approval</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Send className="h-4 w-4 mr-1" />
                                    Resend
                                  </Button>
                                  <Button onClick={approveProof}>
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve Proof
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="aspect-video bg-neutral-5 rounded-md flex items-center justify-center">
                                <img
                                  src="/brochure-preview.png"
                                  alt="Brochure Preview"
                                  className="max-h-full rounded-md"
                                />
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium">Digital Proof Approved</h3>
                                  <p className="text-sm text-neutral-50">
                                    Approved by Alex Chen on May 20, 2025 11:45 AM
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="xl:col-span-1 space-y-6">
                      <div className="border rounded-md h-fit">
                        <div className="bg-neutral-5 p-4 font-medium border-b">Notes</div>
                        <div className="p-4">
                          <Textarea placeholder="Add production notes here..." className="min-h-[100px] text-sm" />
                          <Button className="mt-3 w-full" size="sm">
                            Save Notes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Imposition Template Modal */}
              {showImpositionTemplate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h3 className="text-lg font-bold">Imposition Template - Gelato_FlatProduct_4-4_Cut&Stack</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowImpositionTemplate(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <iframe
                        className="w-full h-full border-0"
                        title="Imposition Template"
                        srcDoc={`
                            <html>
                              <head>
                                <style>
                                  body {
                                    margin: 0;
                                    padding: 20px;
                                    background-color: #f8f9fa;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    min-height: 100vh;
                                    font-family: system-ui, -apple-system, sans-serif;
                                  }
                                  .container {
                                    max-width: 100%;
                                    max-height: 100%;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    gap: 20px;
                                  }
                                  .image-container {
                                    max-width: 100%;
                                    max-height: calc(100vh - 120px);
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    background: white;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                    padding: 20px;
                                  }
                                  .template-image {
                                    max-width: 100%;
                                    max-height: 100%;
                                    width: auto;
                                    height: auto;
                                    object-fit: contain;
                                    border-radius: 4px;
                                  }
                                  .template-info {
                                    text-align: center;
                                    color: #6b7280;
                                    background: white;
                                    padding: 15px 25px;
                                    border-radius: 8px;
                                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                  }
                                  .template-title {
                                    font-size: 18px;
                                    font-weight: 600;
                                    color: #374151;
                                    margin-bottom: 8px;
                                  }
                                  .template-description {
                                    font-size: 14px;
                                    line-height: 1.5;
                                  }
                                </style>
                              </head>
                              <body>
                                <div class="container">
                                  <div class="template-info">
                                    <div class="template-title">Imposition Layout Template</div>
                                    <div class="template-description">
                                      This template shows how multiple copies of the brochure are arranged on the print sheet for efficient production. 
                                      The layout optimizes material usage and ensures proper cutting and finishing.
                                    </div>
                                  </div>
                                  <div class="image-container">
                                    <img 
                                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imposition%20template-27V2OwXBw3LnIg9tA8itbHzUgRrqVG.png" 
                                      alt="Imposition Template Layout" 
                                      class="template-image"
                                      onload="this.style.opacity=1"
                                      style="opacity:0; transition: opacity 0.3s ease-in-out;"
                                    />
                                  </div>
                                </div>
                              </body>
                            </html>
                          `}
                      />
                    </div>
                    <div className="p-4 border-t flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowImpositionTemplate(false)}>
                        Close
                      </Button>
                      <Button>
                        <Download className="h-4 w-4 mr-1" />
                        Download Template
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Workflow Template Modal */}
              {showWorkflowTemplate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h3 className="text-lg font-bold">Workflow Configuration - Flat Product Single Page Workflow</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowWorkflowTemplate(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <iframe
                        className="w-full h-full border-0"
                        title="Workflow Template"
                        srcDoc={`
                            <html>
                              <head>
                                <style>
                                  body {
                                    margin: 0;
                                    padding: 20px;
                                    background-color: #f8f9fa;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    min-height: 100vh;
                                    font-family: system-ui, -apple-system, sans-serif;
                                  }
                                  .container {
                                    max-width: 100%;
                                    max-height: 100%;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    gap: 20px;
                                  }
                                  .image-container {
                                    max-width: 100%;
                                    max-height: calc(100vh - 120px);
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    background: white;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                    padding: 20px;
                                  }
                                  .template-image {
                                    max-width: 100%;
                                    max-height: 100%;
                                    width: auto;
                                    height: auto;
                                    object-fit: contain;
                                    border-radius: 4px;
                                  }
                                  .template-info {
                                    text-align: center;
                                    color: #6b7280;
                                    background: white;
                                    padding: 15px 25px;
                                    border-radius: 8px;
                                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                  }
                                  .template-title {
                                    font-size: 18px;
                                    font-weight: 600;
                                    color: #374151;
                                    margin-bottom: 8px;
                                  }
                                  .template-description {
                                    font-size: 14px;
                                    line-height: 1.5;
                                  }
                                </style>
                              </head>
                              <body>
                                <div class="container">
                                  <div class="template-info">
                                    <div class="template-title">Automated Workflow Configuration</div>
                                    <div class="template-description">
                                      This workflow automates the production process from file processing to machine output. 
                                      It includes steps for SFTP transfer, batch processing, and automated quality checks.
                                    </div>
                                  </div>
                                  <div class="image-container">
                                    <img 
                                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Workflow%20template-hwJtDJDsIc6wijhQGZZgZJArKgGTNQ.png" 
                                      alt="Workflow Configuration Diagram" 
                                      class="template-image"
                                      onload="this.style.opacity=1"
                                      style="opacity:0; transition: opacity 0.3s ease-in-out;"
                                    />
                                  </div>
                                </div>
                              </body>
                            </html>
                          `}
                      />
                    </div>
                    <div className="p-4 border-t flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowWorkflowTemplate(false)}>
                        Close
                      </Button>
                      <Button>
                        <Download className="h-4 w-4 mr-1" />
                        Download Configuration
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Job Ticket Modal */}
              {showJobTicket && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-[95vw] h-[95vh] flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h3 className="text-lg font-bold">GelatoConnect Job Ticket - Order #{orderId}</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowJobTicket(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="max-w-4xl mx-auto space-y-6">
                        {/* Header Information */}
                        <div className="flex justify-between items-start border-b pb-4">
                          <div className="space-y-1">
                            <div className="text-sm text-neutral-60">
                              <span className="font-medium">Job:</span> GC{orderId} |{" "}
                              <span className="font-medium">Order:</span> {orderId} |{" "}
                              <span className="font-medium">Jobs in order:</span> 1
                            </div>
                            <div className="text-sm text-neutral-60">
                              <span className="font-medium">Customer:</span> PrintCo Ltd (C000246-PrintCo)
                            </div>
                            <div className="text-sm text-neutral-60">
                              <span className="font-medium">Job date:</span> May 16, 2025 |{" "}
                              <span className="font-medium">Delivery date:</span> June 1, 2025
                            </div>
                          </div>
                          <div className="bg-info-70 text-white px-4 py-2 rounded-lg">
                            <div className="text-center">
                              <div className="font-bold text-lg">GelatoConnect</div>
                              <div className="text-xs">Production</div>
                            </div>
                          </div>
                        </div>

                        {/* General Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-neutral-90">General Information</h3>
                          <div className="bg-neutral-5 p-4 rounded-lg space-y-2">
                            <div className="text-sm">
                              <span className="font-medium">Job Name:</span> PrintCo Tri-fold Brochures |
                              <span className="font-medium"> Type:</span> Marketing Brochure |
                              <span className="font-medium"> Quantity:</span> 5,000 |
                              <span className="font-medium"> Size:</span> A4 |
                              <span className="font-medium"> Width:</span> 21 cm |
                              <span className="font-medium"> Length:</span> 29.7 cm
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Finishing:</span> Tri-fold |
                              <span className="font-medium"> Paper Type:</span> 200gsm Gloss |
                              <span className="font-medium"> Binding Type:</span> None
                            </div>

                            <div className="bg-neutral-5 p-4 rounded-lg space-y-2">
                              <h4 className="font-medium">Printing Specifications:</h4>
                              <div className="text-sm">
                                <span className="font-medium">Printing sides:</span> Two Sides |
                                <span className="font-medium"> Printing colors:</span> Full Color |
                                <span className="font-medium"> 4 Colors CMYK:</span> Yes |
                                <span className="font-medium"> Sheet category:</span> Coated Gloss |
                                <span className="font-medium"> Sheet weight:</span> 200g |
                                <span className="font-medium"> Sheet color:</span> White
                              </div>
                            </div>
                          </div>

                          {/* Production Steps */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-neutral-90">Production Workflow</h3>

                            {/* Digital Printing */}
                            <div className="border rounded-lg overflow-hidden">
                              <div className="bg-info-70 text-white p-3">
                                <h4 className="font-medium">Digital Printing | HP Indigo 12000 HD</h4>
                              </div>
                              <div className="p-4 bg-neutral-5">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <div>
                                      <span className="font-medium">Setup Time:</span> 15 min
                                    </div>
                                    <div>
                                      <span className="font-medium">Sheet Size:</span> 32 x 45 cm
                                    </div>
                                    <div>
                                      <span className="font-medium">Running Time:</span> 2.5 hr
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span className="font-medium">Impressions per Sheet:</span> 2
                                    </div>
                                    <div>
                                      <span className="font-medium">Total Sheets:</span> 2,500
                                    </div>
                                    <div>
                                      <span className="font-medium">Print Speed:</span> 1,000 sph
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span className="font-medium">Color Mode:</span> 4/4 CMYK
                                    </div>
                                    <div>
                                      <span className="font-medium">Min. personnel:</span> 1
                                    </div>
                                    <div>
                                      <span className="font-medium">Quality Check:</span> Automated
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Cutting */}
                            <div className="border rounded-lg overflow-hidden">
                              <div className="bg-info-70 text-white p-3">
                                <h4 className="font-medium">Cutting | POLAR 92 PLUS Guillotine</h4>
                              </div>
                              <div className="p-4 bg-neutral-5">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <div>
                                      <span className="font-medium">Setup Time:</span> 10 min
                                    </div>
                                    <div>
                                      <span className="font-medium">Sets for Cutting Length:</span> 1
                                    </div>
                                    <div>
                                      <span className="font-medium">Min. personnel:</span> 1
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span className="font-medium">Max Cutting Height:</span> 8 cm
                                    </div>
                                    <div>
                                      <span className="font-medium">Amount of Sets:</span> 25
                                    </div>
                                    <div>
                                      <span className="font-medium">Speed:</span> 120 cuts/hr
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span className="font-medium">Sets for Cutting Width:</span> 2
                                    </div>
                                    <div>
                                      <span className="font-medium">Running Time:</span> 20 min
                                    </div>
                                    <div>
                                      <span className="font-medium">Final Size:</span> A4 (210x297mm)
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Folding */}
                            <div className="border rounded-lg overflow-hidden">
                              <div className="bg-info-70 text-white p-3">
                                <h4 className="font-medium">Folding | Heidelberg Stahlfolder TH82</h4>
                              </div>
                              <div className="p-4 bg-neutral-5">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <div>
                                      <span className="font-medium">Setup Time:</span> 20 min
                                    </div>
                                    <div>
                                      <span className="font-medium">Fold Type:</span> Tri-fold (Z-fold)
                                    </div>
                                    <div>
                                      <span className="font-medium">Running Time:</span> 1.2 hr
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span className="font-medium">Folding Speed:</span> 4,200 sheets/hr
                                    </div>
                                    <div>
                                      <span className="font-medium">Fold Accuracy:</span> ±0.5mm
                                    </div>
                                    <div>
                                      <span className="font-medium">Paper Thickness:</span> 200gsm
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span className="font-medium">Final Dimensions:</span> 99x210mm
                                    </div>
                                    <div>
                                      <span className="font-medium">Min. personnel:</span> 1
                                    </div>
                                    <div>
                                      <span className="font-medium">Quality Control:</span> Sample check
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Packing */}
                            <div className="border rounded-lg overflow-hidden">
                              <div className="bg-info-70 text-white p-3">
                                <h4 className="font-medium">Packing | Automated Counting & Boxing</h4>
                              </div>
                              <div className="p-4 bg-neutral-5">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <div>
                                      <span className="font-medium">Setup Time:</span> 5 min
                                    </div>
                                    <div>
                                      <span className="font-medium">Counting Speed:</span> 2,000 units/hr
                                    </div>
                                    <div>
                                      <span className="font-medium">Unit Thickness:</span> 0.6 mm
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span className="font-medium">Running Time:</span> 2.5 hr
                                    </div>
                                    <div>
                                      <span className="font-medium">Package Weight:</span> 15.2 kg
                                    </div>
                                    <div>
                                      <span className="font-medium">Unit Weight:</span> 3.04 g
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span className="font-medium">Packages Amount:</span> 10
                                    </div>
                                    <div>
                                      <span className="font-medium">Units per Package:</span> 500
                                    </div>
                                    <div>
                                      <span className="font-medium">Min. personnel:</span> 1
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Production Summary */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-neutral-90">Production Summary</h3>
                            <div className="bg-info-10 p-4 rounded-lg">
                              <div className="grid grid-cols-2 gap-6 text-sm">
                                <div className="space-y-2">
                                  <div>
                                    <span className="font-medium">Total Production Time:</span> 6.5 hours
                                  </div>
                                  <div>
                                    <span className="font-medium">Total Setup Time:</span> 50 minutes
                                  </div>
                                  <div>
                                    <span className="font-medium">Estimated Completion:</span> May 28, 2025
                                  </div>
                                  <div>
                                    <span className="font-medium">Production Method:</span>{" "}
                                    {isAutomatedExample ? "Automated (GelatoConnect)" : "Manual Tracking"}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <span className="font-medium">Quality Checks:</span> 3 checkpoints
                                  </div>
                                  <div>
                                    <span className="font-medium">Material Waste:</span> &lt; 3%
                                  </div>
                                  <div>
                                    <span className="font-medium">Energy Consumption:</span> 45 kWh
                                  </div>
                                  <div>
                                    <span className="font-medium">Carbon Footprint:</span> 12.3 kg CO₂
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Special Instructions */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-neutral-90">Special Instructions</h3>
                            <div className="bg-amber-50 p-4 rounded-lg">
                              <div className="text-sm space-y-1">
                                <div>• Ensure color consistency across all 5,000 units</div>
                                <div>• Tri-fold must be precise for proper alignment</div>
                                <div>• Quality check every 500 units during folding process</div>
                                <div>• Package in groups of 500 for easy distribution</div>
                                <div>• Handle with care due to gloss coating</div>
                                {isAutomatedExample && (
                                  <div>• Automated JDF workflow enabled for machine communication</div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Templates Used */}
                          {isAutomatedExample && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-neutral-90">Templates & Configuration</h3>
                              <div className="bg-success-10 p-4 rounded-lg">
                                <div className="text-sm space-y-1">
                                  <div>
                                    <span className="font-medium">Imposition Template:</span>{" "}
                                    Gelato_FlatProduct_4-4_Cut&Stack
                                  </div>
                                  <div>
                                    <span className="font-medium">Workflow Configuration:</span> Flat Product Single
                                    Page Workflow
                                  </div>
                                  <div>
                                    <span className="font-medium">JDF Integration:</span> Enabled
                                  </div>
                                  <div>
                                    <span className="font-medium">Automated Tracking:</span> Real-time production
                                    monitoring
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowJobTicket(false)}>
                        Close
                      </Button>
                      <Button>
                        <Download className="h-4 w-4 mr-1" />
                        Download Job Ticket
                      </Button>
                      <Button>
                        <Printer className="h-4 w-4 mr-1" />
                        Print Job Ticket
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCreatePO && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-bold">Create Purchase Order - Job #{orderId}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowCreatePO(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="text-sm text-neutral-60 mb-4">
                  The following unavailable materials will be included in the purchase order:
                </div>

                {materialsRequired
                  .filter((item) => item.status === "unavailable")
                  .map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">{material.name}</div>
                        <div className="text-sm text-neutral-60">
                          {material.specification} • Quantity: {material.quantityNeeded}
                        </div>
                        <div className="text-sm text-neutral-50">Supplier: {material.supplier}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{material.totalCost}</div>
                        <div className="text-sm text-neutral-50">{material.unitCost} each</div>
                      </div>
                    </div>
                  ))}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total PO Amount:</span>
                    <span>
                      €
                      {materialsRequired
                        .filter((item) => item.status === "unavailable")
                        .reduce((total, item) => total + Number.parseFloat(item.totalCost.replace("€", "")), 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreatePO(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Here you would typically call an API to create the PO
                  alert(
                    `Purchase Order created for Job #${orderId} with ${materialsRequired.filter((item) => item.status === "unavailable").length} items`,
                  )
                  setShowCreatePO(false)
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Create Purchase Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
