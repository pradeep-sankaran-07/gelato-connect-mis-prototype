"use client"

import React from "react"

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
  QrCode,
  ClipboardList,
  Clock,
  MessageSquare,
  XCircle,
  Eye,
  History,
  Wrench,
  Box,
  Layers,
  ShieldCheck,
  Pencil,
  RotateCcw,
  Plus,
  DollarSign,
  MapPin,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useNavigation } from "@/lib/navigation-context"

export default function OrderDetails({
  orderId,
  customer = "PrintCo Ltd",
  jobDate = "May 16, 2025",
}: {
  orderId: string
  customer?: string
  jobDate?: string
}) {
  const { navigateTo, goBack } = useNavigation()
  const [isAutomatedExample, setIsAutomatedExample] = useState(false)
  const onToggleExample = () => setIsAutomatedExample(!isAutomatedExample)
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
  const [activeOrderTab, setActiveOrderTab] = useState<"details" | "job-ticket" | "proofing" | "shipments">("details")
  const [rejectionReason, setRejectionReason] = useState("")
  const [showSendProofModal, setShowSendProofModal] = useState(false)
  const [proofRequiresApproval, setProofRequiresApproval] = useState(true)
  const portalProofLink = "https://portal.gelatoconnect.com/proof/abc123"
  const [rejectionComment, setRejectionComment] = useState("")
  const [showRejectionForm, setShowRejectionForm] = useState(false)

  // PRD 2: Edit Mode state
  const [isEditMode, setIsEditMode] = useState(false)
  const [editQuantity, setEditQuantity] = useState("5,000")
  const [editSpecialInstructions, setEditSpecialInstructions] = useState("Handle printed sheets with cotton gloves. Strict brand color matching required.")
  const [editShipment1Address, setEditShipment1Address] = useState("PrintCo Ltd, 123 Print Street, London, EC1A 1BB, UK")
  const [editShipment2Address, setEditShipment2Address] = useState("PrintCo Distribution, 45 Logistics Way, Manchester, M1 5WP, UK")
  const [showCustomCostModal, setShowCustomCostModal] = useState(false)
  const [customCosts, setCustomCosts] = useState<Array<{type: string; description: string; amount: number}>>([])
  const [customCostType, setCustomCostType] = useState("rush-fee")
  const [customCostDescription, setCustomCostDescription] = useState("")
  const [customCostAmount, setCustomCostAmount] = useState("")
  const [editHistoryTab, setEditHistoryTab] = useState<"details" | "history">("details")
  const [editHistory] = useState([
    { date: "May 18, 2025 3:45 PM", user: "Sarah M.", field: "Quantity", oldValue: "3,000", newValue: "5,000", reason: "Customer requested increase" },
    { date: "May 17, 2025 10:20 AM", user: "John D.", field: "Shipping Address (Shipment #2)", oldValue: "PrintCo Warehouse, 10 Industrial Park, Birmingham, B1 1AA", newValue: "PrintCo Distribution, 45 Logistics Way, Manchester, M1 5WP, UK", reason: "Address correction per customer" },
  ])

  // PRD 10: Multi-address Orders state
  interface DeliveryAddress {
    id: string
    label: string
    name: string
    company: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
    countryFlag: string
    quantity: number
    shipmentStatus: "Pending" | "Ready to Ship" | "Shipped" | "Delivered"
    carrier?: string
    trackingNumber?: string
    shippingMethod?: string
  }
  const [deliveryAddresses, setDeliveryAddresses] = useState<DeliveryAddress[]>([
    { id: "addr-1", label: "London Warehouse", name: "James Clarke", company: "PrintCo Ltd", street: "123 Print Street", city: "London", state: "", postalCode: "EC1A 1BB", country: "United Kingdom", countryFlag: "\uD83C\uDDEC\uD83C\uDDE7", quantity: 3000, shipmentStatus: "Shipped", carrier: "DHL Freight", trackingNumber: "FT-2025-3344-01", shippingMethod: "Standard Freight" },
    { id: "addr-2", label: "Manchester Distribution", name: "Sarah Mitchell", company: "PrintCo Distribution", street: "45 Logistics Way", city: "Manchester", state: "", postalCode: "M1 5WP", country: "United Kingdom", countryFlag: "\uD83C\uDDEC\uD83C\uDDE7", quantity: 2000, shipmentStatus: "Ready to Ship", carrier: "", trackingNumber: "", shippingMethod: "Express Freight" },
  ])
  const [showAddAddressModal, setShowAddAddressModal] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [addressForm, setAddressForm] = useState({ label: "", name: "", company: "", street: "", city: "", state: "", postalCode: "", country: "", quantity: "" })
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null)
  const totalOrderQuantity = 5000

  // PRD 2.1: Reprint state
  const [showReprintModal, setShowReprintModal] = useState(false)
  const [reprintReason, setReprintReason] = useState("production-error")
  const [reprintQuantity, setReprintQuantity] = useState("500")
  const [reprintCostAttribution, setReprintCostAttribution] = useState<"internal" | "customer" | "shared">("internal")

  // Computed: is order completed/shipped
  const isOrderCompleted = orderStatus === "shipped" || orderStatus === "in-shipping"

  // Price recalculation based on quantity
  const calculatePrices = () => {
    const qty = Number.parseInt(editQuantity.replace(/,/g, "")) || 0
    const production = qty * 0.19
    const finishing = qty * 0.03
    const shipping = 50
    const customTotal = customCosts.reduce((sum, c) => sum + c.amount, 0)
    return { production, finishing, shipping, customTotal, total: production + finishing + shipping + customTotal }
  }

  const proofVersions = [
    { version: "v3", uploadDate: "May 20, 2025 2:15 PM", status: "approved", reviewer: "Alex Chen", comment: "Looks great, approved for production.", file: "PrintCo_Brochure_v3_Final.pdf" },
    { version: "v2", uploadDate: "May 19, 2025 10:30 AM", status: "rejected", reviewer: "Alex Chen", comment: "Logo on back panel needs to be larger. Phone number in contact section is incorrect.", file: "PrintCo_Brochure_v2.pdf" },
    { version: "v1", uploadDate: "May 18, 2025 3:00 PM", status: "rejected", reviewer: "Alex Chen", comment: "Colors do not match brand guidelines. Please use PMS 286 for the header.", file: "PrintCo_Brochure_v1.pdf" },
  ]

  const preflightChecks = [
    { name: "Resolution Check", description: "All images at least 300 DPI", status: "pass", detail: "Min 300 DPI detected across all pages" },
    { name: "Color Space", description: "CMYK color mode verified", status: "pass", detail: "All elements in CMYK, no RGB detected" },
    { name: "Bleed Verification", description: "3mm bleed on all sides", status: "pass", detail: "3mm bleed present on all 6 panels" },
    { name: "Font Embedding", description: "All fonts embedded", status: "pass", detail: "4 fonts embedded: Helvetica Neue, Arial, Gelato Sans, Open Sans" },
    { name: "Image Quality", description: "No upscaled or compressed images", status: "warning", detail: "1 image on page 2 at exactly 300 DPI threshold" },
    { name: "Trim and Safe Zone", description: "Text within safe margins", status: "pass", detail: "5mm safe zone maintained on all panels" },
    { name: "Transparency", description: "No unflattened transparency", status: "pass", detail: "All transparency flattened" },
    { name: "Overprint Settings", description: "Black overprint verified", status: "pass", detail: "Black text set to overprint correctly" },
  ]

  const getPreflightIcon = (status: string) => {
    if (status === "pass") return (<CheckCircle className="h-4 w-4 text-success-70" />)
    if (status === "fail") return (<XCircle className="h-4 w-4 text-critical-70" />)
    return (<AlertTriangle className="h-4 w-4 text-amber-500" />)
  }

  const materialsRequired = [
    {
      id: "paper-200gsm-gloss",
      name: "200gsm Gloss Paper",
      specification: "A4, 210x297mm",
      quantityNeeded: "25 sheets",
      quantityInStock: "150 sheets",
      status: "reserved",
      supplier: "Paper Plus Ltd",
      unitCost: "\u20AC0.12",
      totalCost: "\u20AC3.00",
    },
    {
      id: "cmyk-ink-set",
      name: "CMYK Ink Set",
      specification: "Digital printing ink",
      quantityNeeded: "2 cartridges",
      quantityInStock: "5 cartridges",
      status: "reserved",
      supplier: "Ink Solutions",
      unitCost: "\u20AC45.00",
      totalCost: "\u20AC90.00",
    },
    {
      id: "finishing-adhesive",
      name: "Tri-fold Adhesive",
      specification: "Cold adhesive for folding",
      quantityNeeded: "1 bottle",
      quantityInStock: "0 bottles",
      status: "unavailable",
      supplier: "Finishing Supplies Co",
      unitCost: "\u20AC25.00",
      totalCost: "\u20AC25.00",
    },
    {
      id: "packaging-material",
      name: "Protective Packaging",
      specification: "Bubble wrap and cardboard",
      quantityNeeded: "2 rolls",
      quantityInStock: "0 rolls",
      status: "unavailable",
      supplier: "Pack and Ship Ltd",
      unitCost: "\u20AC15.00",
      totalCost: "\u20AC30.00",
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
      case "completed":
        return <Badge className="bg-success-10 text-success-90">Completed</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
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

  /* ---------- JOB TICKET TAB CONTENT ---------- */
  const renderJobTicketTab = () => {
    const productionSteps = [
      { step: 1, title: "Digital Printing", machine: "HP Indigo 12000 HD", specs: [["Setup Time", "15 min"], ["Impressions/Sheet", "2"], ["Color Mode", "4/4 CMYK"], ["Sheet Size", "32 x 45 cm"], ["Total Sheets", "2,500"], ["Personnel", "1"], ["Run Time", "2.5 hr"], ["Speed", "1,000 sph"], ["Quality", "Automated inline"]], instruction: "Load 200gsm gloss stock. Calibrate color profile before run. Run test sheet and verify CMYK density levels match proof. Monitor inline quality sensor for registration drift." },
      { step: 2, title: "Cutting", machine: "POLAR 92 PLUS Guillotine", specs: [["Setup Time", "10 min"], ["Max Height", "8 cm"], ["Width Sets", "2"], ["Length Sets", "1"], ["Total Sets", "25"], ["Personnel", "1"], ["Run Time", "20 min"], ["Speed", "120 cuts/hr"], ["Final Size", "A4 (210x297mm)"]], instruction: "Stack max 100 sheets per cut. Verify first cut against trim marks. Ensure gloss coating is fully dry before stacking to prevent marking." },
      { step: 3, title: "Folding", machine: "Heidelberg Stahlfolder TH82", specs: [["Setup Time", "20 min"], ["Speed", "4,200 sheets/hr"], ["Final Size", "99x210mm"], ["Fold Type", "Tri-fold (Z-fold)"], ["Accuracy", "+/-0.5mm"], ["Personnel", "1"], ["Run Time", "1.2 hr"], ["Paper", "200gsm"], ["QC", "Sample check every 500"]], instruction: "Pre-score fold lines for 200gsm stock. Run 10-sheet test batch and verify fold alignment against approved proof. Pull sample every 500 sheets for visual inspection." },
      { step: 4, title: "Packing", machine: "Automated Counting and Boxing", specs: [["Setup Time", "5 min"], ["Run Time", "2.5 hr"], ["Packages", "10"], ["Count Speed", "2,000/hr"], ["Pkg Weight", "15.2 kg"], ["Units/Pkg", "500"], ["Unit Thickness", "0.6 mm"], ["Unit Weight", "3.04 g"], ["Personnel", "1"]], instruction: "Count 500 units per box. Place divider sheets between every 100 units. Label each box with order number and destination. Split shipment: 6 boxes to London, 4 boxes to Manchester." },
    ]
    return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Job Ticket</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Download PDF</Button>
          <Button size="sm"><Printer className="h-4 w-4 mr-1" />Print Job Ticket</Button>
        </div>
      </div>
      <div className="bg-white border rounded-lg shadow-sm">
        {/* Header with QR */}
        <div className="p-6 border-b flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-neutral-90">GelatoConnect Job Ticket</h1>
            <div className="text-sm text-neutral-60 space-y-1">
              <div><span className="font-medium">Order:</span> #{orderId} | <span className="font-medium">Job Ref:</span> GC{orderId}</div>
              <div><span className="font-medium">Customer:</span> {customer} (C000246-PrintCo)</div>
              <div><span className="font-medium">Job Date:</span> {jobDate} | <span className="font-medium">Delivery:</span> June 1, 2025</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 border-2 border-neutral-30 rounded-lg flex items-center justify-center bg-neutral-5">
              <QrCode className="h-16 w-16 text-neutral-40" />
            </div>
            <span className="text-xs text-neutral-50 font-mono">GC{orderId}</span>
          </div>
        </div>
        {/* Customer Specifications */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-info-70" />Customer Specifications
          </h3>
          <div className="bg-neutral-5 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span className="font-medium text-neutral-50 block">Product</span>Tri-fold Brochures</div>
              <div><span className="font-medium text-neutral-50 block">Quantity</span>5,000</div>
              <div><span className="font-medium text-neutral-50 block">Size</span>A4 (210 x 297 mm)</div>
              <div><span className="font-medium text-neutral-50 block">Paper</span>200gsm Gloss</div>
              <div><span className="font-medium text-neutral-50 block">Printing</span>Full color, 4/4 CMYK</div>
              <div><span className="font-medium text-neutral-50 block">Finishing</span>Tri-fold (Z-fold)</div>
              <div><span className="font-medium text-neutral-50 block">Binding</span>None</div>
              <div><span className="font-medium text-neutral-50 block">Delivery</span>Split: 2 locations</div>
            </div>
          </div>
        </div>
        {/* Materials List */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Box className="h-5 w-5 text-info-70" />Materials Required
          </h3>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-neutral-5">
                <tr>
                  <th className="text-left p-3 font-medium text-neutral-60">Material</th>
                  <th className="text-left p-3 font-medium text-neutral-60">Specification</th>
                  <th className="text-left p-3 font-medium text-neutral-60">Qty Needed</th>
                  <th className="text-left p-3 font-medium text-neutral-60">Status</th>
                </tr>
              </thead>
              <tbody>
                {materialsRequired.map((m) => (
                  <tr key={m.id} className="border-t">
                    <td className="p-3 font-medium">{m.name}</td>
                    <td className="p-3 text-neutral-60">{m.specification}</td>
                    <td className="p-3">{m.quantityNeeded}</td>
                    <td className="p-3">{getMaterialStatusBadge(m.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Production Instructions */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-info-70" />Production Instructions
          </h3>
          <div className="space-y-4">
            {productionSteps.map((s) => (
              <div key={s.step} className="border rounded-lg overflow-hidden">
                <div className="bg-info-70 text-white px-4 py-2 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">{s.step}</div>
                  <h4 className="font-medium">{s.title} | {s.machine}</h4>
                </div>
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    {s.specs.map((sp) => (<div key={sp[0]}><span className="font-medium">{sp[0]}:</span> {sp[1]}</div>))}
                  </div>
                  <div className="bg-info-10 rounded p-3 text-sm">
                    <span className="font-medium text-info-90">Instructions: </span>
                    <span className="text-info-90">{s.instruction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Special Handling Notes */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />Special Handling Notes
          </h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-amber-600 font-bold mt-0.5">!</span><span>Handle printed sheets with cotton gloves to prevent fingerprints on gloss coating</span></li>
              <li className="flex items-start gap-2"><span className="text-amber-600 font-bold mt-0.5">!</span><span>Ensure color consistency across all 5,000 units - customer has strict brand guidelines</span></li>
              <li className="flex items-start gap-2"><span className="text-amber-600 font-bold mt-0.5">!</span><span>Tri-fold alignment is critical - reject tolerance: +/-0.5mm maximum</span></li>
              <li className="flex items-start gap-2"><span className="text-amber-600 font-bold mt-0.5">!</span><span>Allow 24hr drying time after printing before cutting/folding</span></li>
              <li className="flex items-start gap-2"><span className="text-amber-600 font-bold mt-0.5">!</span><span>Split delivery: 3,000 to London warehouse, 2,000 to Manchester distribution center</span></li>
            </ul>
          </div>
        </div>
        {/* Production Summary */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Layers className="h-5 w-5 text-info-70" />Production Summary
          </h3>
          <div className="bg-info-10 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span className="font-medium text-neutral-50 block">Total Production</span>6.5 hours</div>
              <div><span className="font-medium text-neutral-50 block">Total Setup</span>50 minutes</div>
              <div><span className="font-medium text-neutral-50 block">Quality Checks</span>3 checkpoints</div>
              <div><span className="font-medium text-neutral-50 block">Material Waste</span>&lt; 3%</div>
              <div><span className="font-medium text-neutral-50 block">Est. Completion</span>May 28, 2025</div>
              <div><span className="font-medium text-neutral-50 block">Energy</span>45 kWh</div>
              <div><span className="font-medium text-neutral-50 block">Method</span>{isAutomatedExample ? "Automated" : "Manual"}</div>
              <div><span className="font-medium text-neutral-50 block">CO2 Footprint</span>12.3 kg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }

  /* ---------- PROOFING TAB CONTENT ---------- */
  const renderProofingTab = () => {
    return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Proofing Workflow Steps */}
      <div className="bg-white border rounded-lg p-5">
        <h3 className="text-sm font-semibold text-neutral-100 mb-4">Proofing Workflow</h3>
        <div className="flex items-center justify-between">
          {[
            { label: "Upload", active: true, completed: artworkUploaded },
            { label: "Preflight", active: artworkUploaded, completed: showPreflightResults && preflightPassed },
            { label: "Send Proof", active: showPreflightResults && preflightPassed, completed: proofSent },
            { label: "Customer Review", active: proofSent, completed: proofApproved },
            { label: proofApproved ? "Approved" : "Pending", active: proofApproved, completed: proofApproved },
          ].map((step, idx, arr) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  step.completed ? "bg-success-70 text-white" : step.active ? "bg-info-70 text-white" : "bg-neutral-20 text-neutral-50"
                }`}>
                  {step.completed ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                </div>
                <span className={`text-xs mt-1.5 ${step.completed ? "text-success-70 font-medium" : step.active ? "text-info-70 font-medium" : "text-neutral-50"}`}>
                  {step.label}
                </span>
              </div>
              {idx < arr.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${step.completed ? "bg-success-70" : "bg-neutral-20"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Customer Approval Status */}
      {proofSent && (
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${proofApproved ? "bg-success-70" : "bg-amber-500 animate-pulse"}`} />
              <div>
                <span className="text-sm font-medium">{proofApproved ? "Proof approved by Alex Chen" : "Awaiting customer review"}</span>
                <p className="text-xs text-neutral-50 mt-0.5">{proofApproved ? "May 20, 2025 at 11:45 AM" : "Sent May 19, 2025 — customer has not yet responded"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-50">
              <span>Portal link:</span>
              <a className="text-info-70 hover:underline" href="#">{portalProofLink}</a>
            </div>
          </div>
        </div>
      )}

      {/* Proof Status Header */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">File Receipt &amp; Proofing</h2>
          <div className="flex items-center gap-3">
            {proofApproved ? (
              <Badge className="bg-success-10 text-success-90 px-3 py-1 text-sm">Proof Approved</Badge>
            ) : proofSent ? (
              <Badge className="bg-amber-100 text-amber-800 px-3 py-1 text-sm">Proof Pending Review</Badge>
            ) : artworkUploaded ? (
              <Badge className="bg-info-10 text-info-90 px-3 py-1 text-sm">Proof Ready</Badge>
            ) : (
              <Badge className="bg-neutral-5 text-neutral-60 px-3 py-1 text-sm">Awaiting Artwork</Badge>
            )}
          </div>
        </div>
        {!artworkUploaded ? (
          <div className="text-center py-8 border-2 border-dashed rounded-md">
            <Upload className="h-12 w-12 mx-auto text-neutral-40 mb-4" />
            <h3 className="text-lg font-medium mb-2">No artwork uploaded yet</h3>
            <p className="text-neutral-50 mb-4 max-w-md mx-auto">Upload print-ready artwork. We accept PDF, AI, EPS, PSD, JPG, and TIF.</p>
            <Button onClick={triggerFileUpload}><Upload className="h-4 w-4 mr-1" />Upload Artwork</Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 border rounded-md bg-neutral-5">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-info-70 mr-3" />
              <div>
                <div className="font-medium">PrintCo_Brochure_Final.pdf</div>
                <div className="text-sm text-neutral-50">5.2 MB - Uploaded May 18, 2025 2:30 PM</div>
              </div>
            </div>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
          </div>
        )}
      </div>

      {/* Detailed Preflight Report */}
      {artworkUploaded && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-neutral-5 p-4 font-semibold border-b flex items-center justify-between">
            <span className="flex items-center gap-2"><FileCheck className="h-5 w-5 text-info-70" />Preflight Report</span>
            {showPreflightResults && (
              <div className="flex items-center gap-3 text-sm font-normal">
                <span className="flex items-center gap-1 text-success-70"><CheckCircle className="h-4 w-4" />{preflightChecks.filter(c => c.status === "pass").length} Passed</span>
                <span className="flex items-center gap-1 text-amber-500"><AlertTriangle className="h-4 w-4" />{preflightChecks.filter(c => c.status === "warning").length} Warnings</span>
                <span className="flex items-center gap-1 text-critical-70"><XCircle className="h-4 w-4" />{preflightChecks.filter(c => c.status === "fail").length} Failed</span>
              </div>
            )}
          </div>
          <div className="p-4">
            {showPreflightResults ? (
              <div className="space-y-2">
                {preflightChecks.map((check, idx) => (
                  <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg border ${check.status === "pass" ? "bg-success-10/30 border-success-10" : check.status === "warning" ? "bg-amber-50 border-amber-200" : "bg-critical-10/30 border-critical-10"}`}>
                    <div className="mt-0.5">{getPreflightIcon(check.status)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{check.name}</span>
                        <Badge className={`text-xs ${check.status === "pass" ? "bg-success-10 text-success-90" : check.status === "warning" ? "bg-amber-100 text-amber-800" : "bg-critical-10 text-critical-90"}`}>
                          {check.status === "pass" ? "Pass" : check.status === "warning" ? "Warning" : "Fail"}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-60 mt-0.5">{check.description}</p>
                      <p className="text-xs text-neutral-50 mt-1">{check.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-info-70 mx-auto mb-4"></div>
                <p className="text-neutral-50">Running preflight checks...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Proof Preview + Version History */}
      {artworkUploaded && showPreflightResults && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border rounded-lg overflow-hidden">
            <div className="bg-neutral-5 p-4 font-semibold border-b">Digital Proof</div>
            <div className="p-4 space-y-4">
              <div className="aspect-video bg-neutral-5 rounded-md flex items-center justify-center">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brochure-preview.png`} alt="Brochure Preview" className="max-h-full rounded-md" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{proofApproved ? "Proof Approved" : proofSent ? "Proof Sent - Awaiting Approval" : "Proof Ready to Send"}</h3>
                  <p className="text-sm text-neutral-50">{proofApproved ? "Approved by Alex Chen on May 20, 2025 11:45 AM" : proofSent ? "Sent to client for review" : "Review and send to client"}</p>
                </div>
                <div className="flex gap-2">
                  {!proofSent && (
                    <Button onClick={() => setShowSendProofModal(true)} disabled={!preflightPassed}><Send className="h-4 w-4 mr-1" />Send to Client</Button>
                  )}
                  {proofSent && !proofApproved && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Send className="h-4 w-4 mr-1" />Resend</Button>
                      <Button variant="outline" size="sm" className="text-critical-70 hover:text-critical-90 bg-transparent" onClick={() => setShowRejectionForm(true)}><XCircle className="h-4 w-4 mr-1" />Reject</Button>
                      <Button onClick={approveProof}><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
                    </div>
                  )}
                  {proofApproved && (
                    <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Download</Button>
                  )}
                </div>
              </div>
              {/* Rejection Form */}
              {showRejectionForm && (
                <div className="border border-critical-10 rounded-lg p-4 bg-critical-10/20">
                  <h4 className="font-medium text-critical-90 mb-3 flex items-center gap-2"><XCircle className="h-4 w-4" />Reject Proof</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-60 mb-1">Rejection Reason</label>
                      <select value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm">
                        <option value="">Select a reason...</option>
                        <option value="color">Color mismatch</option>
                        <option value="layout">Layout issues</option>
                        <option value="text">Text/content errors</option>
                        <option value="image">Image quality</option>
                        <option value="branding">Branding inconsistency</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-60 mb-1">Comments</label>
                      <Textarea value={rejectionComment} onChange={(e) => setRejectionComment(e.target.value)} placeholder="Describe what needs to be changed..." className="min-h-[80px] text-sm" />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowRejectionForm(false)}>Cancel</Button>
                      <Button size="sm" className="bg-critical-70 hover:bg-critical-90" onClick={() => { setShowRejectionForm(false); setRejectionReason(""); setRejectionComment(""); }}>Confirm Rejection</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Version History */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="bg-neutral-5 p-4 font-semibold border-b flex items-center gap-2"><History className="h-5 w-5 text-info-70" />Version History</div>
            <div className="p-4">
              <div className="relative">
                <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-neutral-20"></div>
                <div className="space-y-6">
                  {proofVersions.map((version) => (
                    <div key={version.version} className="relative flex gap-4">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${version.status === "approved" ? "bg-success-10" : version.status === "rejected" ? "bg-critical-10" : "bg-amber-100"}`}>
                        {version.status === "approved" ? (<CheckCircle className="h-4 w-4 text-success-70" />) : version.status === "rejected" ? (<XCircle className="h-4 w-4 text-critical-70" />) : (<Clock className="h-4 w-4 text-amber-600" />)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{version.version}</span>
                          <Badge className={`text-xs ${version.status === "approved" ? "bg-success-10 text-success-90" : version.status === "rejected" ? "bg-critical-10 text-critical-90" : "bg-amber-100 text-amber-800"}`}>
                            {version.status === "approved" ? "Approved" : version.status === "rejected" ? "Rejected" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-xs text-neutral-50 mb-1">{version.uploadDate}</p>
                        <p className="text-xs text-neutral-50 mb-1.5">Reviewed by: {version.reviewer}</p>
                        <div className="bg-neutral-5 rounded p-2">
                          <p className="text-xs text-neutral-60 flex items-start gap-1"><MessageSquare className="h-3 w-3 mt-0.5 flex-shrink-0" />{version.comment}</p>
                        </div>
                        <button className="text-xs text-info-70 hover:underline mt-1.5 flex items-center gap-1"><Eye className="h-3 w-3" />View {version.file}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Send Proof to Customer Modal */}
      {showSendProofModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[20001]" style={{ background: "rgba(33,33,33,0.8)" }}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[520px]" style={{ borderRadius: "12px" }}>
            <div className="p-5 border-b">
              <h3 className="text-lg font-semibold" style={{ color: "#212121" }}>Send Proof to Customer</h3>
              <p className="text-sm mt-1" style={{ color: "#8a8a8a" }}>An email will be sent with a link to review the proof</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="border rounded-lg p-4 bg-neutral-5" style={{ borderRadius: "8px" }}>
                <div className="text-xs mb-1" style={{ color: "#8a8a8a" }}>To:</div>
                <div className="text-sm font-medium mb-3">orders@printco.co.uk</div>
                <div className="text-xs mb-1" style={{ color: "#8a8a8a" }}>Subject:</div>
                <div className="text-sm font-medium mb-3">Proof ready for review — Order #{orderId}</div>
                <div className="text-xs mb-1" style={{ color: "#8a8a8a" }}>Portal Link:</div>
                <div className="text-sm flex items-center gap-1" style={{ color: "#007cb4" }}>
                  {portalProofLink}
                  <button className="p-0.5 hover:bg-neutral-10 rounded" onClick={() => { navigator.clipboard?.writeText(portalProofLink) }}>
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#212121" }}>Proof requires customer approval</div>
                  <div className="text-xs" style={{ color: "#8a8a8a" }}>Customer must explicitly approve before production starts</div>
                </div>
                <Switch checked={proofRequiresApproval} onCheckedChange={setProofRequiresApproval} />
              </div>
            </div>
            <div className="p-5 border-t flex justify-between">
              <Button variant="outline" onClick={() => setShowSendProofModal(false)} style={{ borderRadius: "999px" }}>Cancel</Button>
              <Button onClick={() => { sendProof(); setShowSendProofModal(false) }} className="bg-[#212121] text-white" style={{ borderRadius: "999px" }}>
                <Send className="h-4 w-4 mr-1" />Send Proof
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white p-4 border-b">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={goBack}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Manage Orders
                </Button>
                <div className="text-sm text-neutral-50">
                  Order #{orderId} &bull; {customer} &bull; {jobDate}
                </div>
              </div>
              <div className="flex gap-2">
                {isOrderCompleted && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReprintModal(true)}
                    className="text-info-70 border-info-70 hover:bg-info-10"
                    style={{ borderRadius: "999px" }}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reprint
                  </Button>
                )}
                <Button
                  variant={isEditMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsEditMode(!isEditMode)}
                  style={{ borderRadius: "999px" }}
                  className={isEditMode ? "bg-[#212121] text-white hover:bg-neutral-80" : ""}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  {isEditMode ? "Editing" : "Edit Order"}
                </Button>
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

          {/* Tab Navigation */}
          <div className="bg-white border-b px-6">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveOrderTab("details")}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeOrderTab === "details" ? "border-info-70 text-info-70" : "border-transparent text-neutral-50 hover:text-neutral-90 hover:border-neutral-30"}`}
              >
                <ClipboardList className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />Order Details
              </button>
              <button
                onClick={() => setActiveOrderTab("job-ticket")}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeOrderTab === "job-ticket" ? "border-info-70 text-info-70" : "border-transparent text-neutral-50 hover:text-neutral-90 hover:border-neutral-30"}`}
              >
                <QrCode className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />Job Ticket
              </button>
              <button
                onClick={() => setActiveOrderTab("proofing")}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeOrderTab === "proofing" ? "border-info-70 text-info-70" : "border-transparent text-neutral-50 hover:text-neutral-90 hover:border-neutral-30"}`}
              >
                <Eye className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />File Receipt &amp; Proofing
                {proofApproved && <Badge className="ml-2 bg-success-10 text-success-90 text-xs py-0">Approved</Badge>}
                {proofSent && !proofApproved && <Badge className="ml-2 bg-amber-100 text-amber-800 text-xs py-0">Pending</Badge>}
              </button>
              <button
                onClick={() => setActiveOrderTab("shipments")}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeOrderTab === "shipments" ? "border-info-70 text-info-70" : "border-transparent text-neutral-50 hover:text-neutral-90 hover:border-neutral-30"}`}
              >
                <Truck className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />Shipments
                {deliveryAddresses.length > 0 && <Badge className="ml-2 bg-info-10 text-info-90 text-xs py-0">{deliveryAddresses.length}</Badge>}
              </button>
              <button
                onClick={() => setEditHistoryTab("history")}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${editHistoryTab === "history" && activeOrderTab === "details" ? "border-[#212121] text-[#212121]" : "border-transparent text-neutral-50 hover:text-neutral-90 hover:border-neutral-30"}`}
              >
                <History className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />Edit History
                {editHistory.length > 0 && <Badge className="ml-2 bg-neutral-20 text-neutral-90 text-xs py-0">{editHistory.length}</Badge>}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeOrderTab === "job-ticket" && renderJobTicketTab()}
            {activeOrderTab === "proofing" && renderProofingTab()}

            {/* PRD 10: Shipments / Delivery Addresses Tab */}
            {activeOrderTab === "shipments" && (
              <div className="space-y-6">
                {/* Header with summary */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Delivery Addresses &amp; Shipments</h2>
                    <p className="text-sm text-neutral-50 mt-1">
                      {deliveryAddresses.length} {deliveryAddresses.length === 1 ? "address" : "addresses"} &middot; {deliveryAddresses.reduce((sum, a) => sum + a.quantity, 0).toLocaleString()} / {totalOrderQuantity.toLocaleString()} units allocated
                    </p>
                  </div>
                  <Button
                    size="sm"
                    style={{ borderRadius: "999px", background: "#212121" }}
                    className="text-white hover:opacity-90"
                    onClick={() => { setEditingAddressId(null); setAddressForm({ label: "", name: "", company: "", street: "", city: "", state: "", postalCode: "", country: "", quantity: "" }); setShowAddAddressModal(true) }}
                  >
                    <Plus className="h-4 w-4 mr-1" />Add Address
                  </Button>
                </div>

                {/* Quantity Allocation Validation */}
                {(() => {
                  const allocated = deliveryAddresses.reduce((sum, a) => sum + a.quantity, 0)
                  const diff = allocated - totalOrderQuantity
                  if (diff === 0) return (
                    <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "#cdfee1", border: "1px solid #0d8a3f" }}>
                      <CheckCircle className="h-4 w-4" style={{ color: "#0d8a3f" }} />
                      <span className="text-sm font-medium" style={{ color: "#065523" }}>All {totalOrderQuantity.toLocaleString()} units allocated across {deliveryAddresses.length} addresses</span>
                    </div>
                  )
                  if (diff < 0) return (
                    <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "#ffe4c6", border: "1px solid #956f00" }}>
                      <AlertTriangle className="h-4 w-4" style={{ color: "#5e4200" }} />
                      <span className="text-sm font-medium" style={{ color: "#5e4200" }}>{allocated.toLocaleString()} / {totalOrderQuantity.toLocaleString()} units allocated — {Math.abs(diff).toLocaleString()} unallocated</span>
                    </div>
                  )
                  return (
                    <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "#fedad9", border: "1px solid #b5260b" }}>
                      <AlertTriangle className="h-4 w-4" style={{ color: "#8e1f0b" }} />
                      <span className="text-sm font-medium" style={{ color: "#8e1f0b" }}>{allocated.toLocaleString()} units allocated — exceeds order quantity by {diff.toLocaleString()}</span>
                    </div>
                  )
                })()}

                {/* Shipment Status Summary Bar */}
                <div className="flex gap-3">
                  {["Pending", "Ready to Ship", "Shipped", "Delivered"].map(status => {
                    const count = deliveryAddresses.filter(a => a.shipmentStatus === status).length
                    if (count === 0) return null
                    const colors: Record<string, { bg: string; text: string }> = {
                      "Pending": { bg: "#f7f7f7", text: "#5c5c5c" },
                      "Ready to Ship": { bg: "#eaf4ff", text: "#00527c" },
                      "Shipped": { bg: "#e0f5e8", text: "#065523" },
                      "Delivered": { bg: "#cdfee1", text: "#0d8a3f" },
                    }
                    return (
                      <div key={status} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: colors[status].bg, color: colors[status].text }}>
                        <span className="font-bold">{count}</span> {status}
                      </div>
                    )
                  })}
                </div>

                {/* Address / Shipment Cards */}
                <div className="space-y-4">
                  {deliveryAddresses.map((addr, idx) => (
                    <div key={addr.id} className="border rounded-lg overflow-hidden" style={{ borderRadius: "8px" }}>
                      <div className="bg-neutral-5 px-4 py-3 flex items-center justify-between border-b">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "#eaf4ff", color: "#00527c" }}>{idx + 1}</div>
                          <div>
                            <span className="font-medium text-sm">{addr.label}</span>
                            <span className="text-neutral-50 text-xs ml-2">{addr.countryFlag} {addr.country}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {addr.shipmentStatus === "Pending" && <Badge className="bg-neutral-10 text-neutral-70">Pending</Badge>}
                          {addr.shipmentStatus === "Ready to Ship" && <Badge className="bg-info-10 text-info-90">Ready to Ship</Badge>}
                          {addr.shipmentStatus === "Shipped" && <Badge className="bg-success-10 text-success-90">Shipped</Badge>}
                          {addr.shipmentStatus === "Delivered" && <Badge className="bg-success-10 text-success-90">Delivered</Badge>}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          {/* Address Details */}
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-neutral-50 uppercase tracking-wide mb-2">Delivery Address</div>
                            <div className="text-sm font-medium">{addr.name}</div>
                            <div className="text-sm text-neutral-70">{addr.company}</div>
                            <div className="text-sm text-neutral-70">{addr.street}</div>
                            <div className="text-sm text-neutral-70">{addr.city}{addr.state ? `, ${addr.state}` : ""} {addr.postalCode}</div>
                            <div className="text-sm text-neutral-70">{addr.country}</div>
                          </div>
                          {/* Quantity & Shipping */}
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-neutral-50 uppercase tracking-wide mb-2">Shipment Details</div>
                            <div className="text-sm"><span className="text-neutral-50 font-medium">Quantity:</span> {addr.quantity.toLocaleString()} units ({Math.round(addr.quantity / totalOrderQuantity * 100)}%)</div>
                            <div className="text-sm"><span className="text-neutral-50 font-medium">Method:</span> {addr.shippingMethod || "Not assigned"}</div>
                            {addr.carrier && <div className="text-sm"><span className="text-neutral-50 font-medium">Carrier:</span> {addr.carrier}</div>}
                            {addr.trackingNumber && (
                              <div className="text-sm"><span className="text-neutral-50 font-medium">Tracking:</span> <span className="font-mono text-info-70">{addr.trackingNumber}</span></div>
                            )}
                          </div>
                          {/* Actions */}
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                style={{ borderRadius: "999px" }}
                                onClick={() => {
                                  setEditingAddressId(addr.id)
                                  setAddressForm({
                                    label: addr.label, name: addr.name, company: addr.company,
                                    street: addr.street, city: addr.city, state: addr.state,
                                    postalCode: addr.postalCode, country: addr.country,
                                    quantity: String(addr.quantity),
                                  })
                                  setShowAddAddressModal(true)
                                }}
                              >
                                <Pencil className="h-3 w-3 mr-1" />Edit
                              </Button>
                              {deliveryAddresses.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  style={{ borderRadius: "999px" }}
                                  className="text-critical-70 border-critical-70 hover:bg-critical-10"
                                  onClick={() => setDeliveryAddresses(prev => prev.filter(a => a.id !== addr.id))}
                                >
                                  <X className="h-3 w-3 mr-1" />Remove
                                </Button>
                              )}
                            </div>
                            {addr.shipmentStatus === "Ready to Ship" && (
                              <Button
                                size="sm"
                                style={{ borderRadius: "999px", background: "#212121" }}
                                className="text-white hover:opacity-90 mt-2"
                                onClick={() => setDeliveryAddresses(prev => prev.map(a => a.id === addr.id ? { ...a, shipmentStatus: "Shipped", trackingNumber: `SHP-${Date.now().toString(36).toUpperCase()}` } : a))}
                              >
                                <Truck className="h-3 w-3 mr-1" />Mark Shipped
                              </Button>
                            )}
                            {addr.shipmentStatus === "Pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                style={{ borderRadius: "999px" }}
                                className="mt-2"
                                onClick={() => setDeliveryAddresses(prev => prev.map(a => a.id === addr.id ? { ...a, shipmentStatus: "Ready to Ship" } : a))}
                              >
                                <Package className="h-3 w-3 mr-1" />Mark Ready
                              </Button>
                            )}
                            {addr.shipmentStatus === "Shipped" && (
                              <Button
                                size="sm"
                                variant="outline"
                                style={{ borderRadius: "999px" }}
                                className="mt-2 border-success-70 text-success-70"
                                onClick={() => setDeliveryAddresses(prev => prev.map(a => a.id === addr.id ? { ...a, shipmentStatus: "Delivered" } : a))}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />Mark Delivered
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add/Edit Address Modal */}
            {showAddAddressModal && (
              <div className="fixed inset-0 flex items-center justify-center z-[20001]" style={{ background: "rgba(33, 33, 33, 0.8)" }}>
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-[560px] max-h-[90vh] flex flex-col" style={{ borderRadius: "12px" }}>
                  <div className="p-5 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#212121]">{editingAddressId ? "Edit Delivery Address" : "Add Delivery Address"}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowAddAddressModal(false)}><X className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>Address Label</label>
                      <Input placeholder="e.g. London Warehouse, Head Office" value={addressForm.label} onChange={(e) => setAddressForm(f => ({ ...f, label: e.target.value }))} style={{ borderRadius: "8px" }} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>Contact Name</label>
                        <Input placeholder="Full name" value={addressForm.name} onChange={(e) => setAddressForm(f => ({ ...f, name: e.target.value }))} style={{ borderRadius: "8px" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>Company</label>
                        <Input placeholder="Company name" value={addressForm.company} onChange={(e) => setAddressForm(f => ({ ...f, company: e.target.value }))} style={{ borderRadius: "8px" }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>Street Address</label>
                      <Input placeholder="Street address" value={addressForm.street} onChange={(e) => setAddressForm(f => ({ ...f, street: e.target.value }))} style={{ borderRadius: "8px" }} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>City</label>
                        <Input placeholder="City" value={addressForm.city} onChange={(e) => setAddressForm(f => ({ ...f, city: e.target.value }))} style={{ borderRadius: "8px" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>State / Region</label>
                        <Input placeholder="State" value={addressForm.state} onChange={(e) => setAddressForm(f => ({ ...f, state: e.target.value }))} style={{ borderRadius: "8px" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>Postal Code</label>
                        <Input placeholder="Postal code" value={addressForm.postalCode} onChange={(e) => setAddressForm(f => ({ ...f, postalCode: e.target.value }))} style={{ borderRadius: "8px" }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>Country</label>
                      <Input placeholder="Country" value={addressForm.country} onChange={(e) => setAddressForm(f => ({ ...f, country: e.target.value }))} style={{ borderRadius: "8px" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>
                        Quantity (units)
                        <span className="text-neutral-50 font-normal ml-2">
                          {(() => {
                            const otherAllocated = deliveryAddresses.filter(a => a.id !== editingAddressId).reduce((s, a) => s + a.quantity, 0)
                            const remaining = totalOrderQuantity - otherAllocated
                            return `${remaining.toLocaleString()} remaining of ${totalOrderQuantity.toLocaleString()}`
                          })()}
                        </span>
                      </label>
                      <Input type="number" placeholder="Number of units for this address" value={addressForm.quantity} onChange={(e) => setAddressForm(f => ({ ...f, quantity: e.target.value }))} style={{ borderRadius: "8px" }} />
                    </div>
                  </div>
                  <div className="p-5 border-t flex justify-between">
                    <Button variant="outline" onClick={() => setShowAddAddressModal(false)} style={{ borderRadius: "999px", border: "2px solid #bdbdbd" }}>Cancel</Button>
                    <Button
                      className="bg-[#212121] hover:opacity-90 text-white"
                      style={{ borderRadius: "999px" }}
                      onClick={() => {
                        const qty = parseInt(addressForm.quantity) || 0
                        if (editingAddressId) {
                          setDeliveryAddresses(prev => prev.map(a => a.id === editingAddressId ? { ...a, label: addressForm.label, name: addressForm.name, company: addressForm.company, street: addressForm.street, city: addressForm.city, state: addressForm.state, postalCode: addressForm.postalCode, country: addressForm.country, quantity: qty } : a))
                        } else {
                          setDeliveryAddresses(prev => [...prev, { id: `addr-${Date.now()}`, label: addressForm.label, name: addressForm.name, company: addressForm.company, street: addressForm.street, city: addressForm.city, state: addressForm.state, postalCode: addressForm.postalCode, country: addressForm.country, countryFlag: "", quantity: qty, shipmentStatus: "Pending", shippingMethod: "" }])
                        }
                        setShowAddAddressModal(false)
                      }}
                    >
                      {editingAddressId ? "Save Changes" : "Add Address"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit History Tab Content */}
            {editHistoryTab === "history" && activeOrderTab === "details" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Edit History</h2>
                  <Button variant="outline" size="sm" onClick={() => setEditHistoryTab("details")}>
                    <ArrowLeft className="h-4 w-4 mr-1" />Back to Details
                  </Button>
                </div>
                {editHistory.length === 0 ? (
                  <div className="text-center py-12 text-neutral-50">No edits have been made to this order yet.</div>
                ) : (
                  <div className="space-y-4">
                    {editHistory.map((entry, idx) => (
                      <div key={idx} className="border rounded-lg overflow-hidden" style={{ borderRadius: "8px" }}>
                        <div className="bg-neutral-5 px-4 py-3 flex items-center justify-between border-b">
                          <div className="flex items-center gap-3">
                            <History className="h-4 w-4 text-neutral-60" />
                            <span className="font-medium text-sm">{entry.field}</span>
                          </div>
                          <div className="text-xs text-neutral-50">{entry.date} by {entry.user}</div>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-xs font-medium text-neutral-50 mb-1">Before</div>
                              <div className="p-3 rounded text-sm" style={{ background: "#fedad9", border: "1px solid #fec3c1" }}>{entry.oldValue}</div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-neutral-50 mb-1">After</div>
                              <div className="p-3 rounded text-sm" style={{ background: "#cdfee1", border: "1px solid #b4fed2" }}>{entry.newValue}</div>
                            </div>
                          </div>
                          {entry.reason && (
                            <div className="text-xs text-neutral-60"><span className="font-medium">Reason:</span> {entry.reason}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeOrderTab === "details" && editHistoryTab !== "history" && (
            <div className="space-y-8">

              {/* Edit Mode Info Banner */}
              {isEditMode && (
                <div className="p-4 rounded-lg border flex items-center justify-between" style={{ background: "#eaf4ff", borderColor: "#00527c" }}>
                  <div className="flex items-center gap-3">
                    <Info className="h-5 w-5" style={{ color: "#007cb4" }} />
                    <div>
                      <div className="font-medium text-sm" style={{ color: "#00527c" }}>Edit Mode Active</div>
                      <div className="text-xs" style={{ color: "#00527c" }}>Changes will be logged in Edit History. Price will recalculate automatically.</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowCustomCostModal(true)} style={{ borderRadius: "999px" }}>
                      <Plus className="h-4 w-4 mr-1" />Add Custom Cost
                    </Button>
                    <Button size="sm" style={{ borderRadius: "999px", background: "#212121" }} className="text-white hover:opacity-90" onClick={() => setIsEditMode(false)}>
                      <CheckCircle className="h-4 w-4 mr-1" />Save Changes
                    </Button>
                  </div>
                </div>
              )}

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
                        Gelato_FlatProduct_4-4_Cut&amp;Stack
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
                      using paper job ticket, as templates don&apos;t exist
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
                          {isEditMode ? (
                            <Input
                              value={editQuantity}
                              onChange={(e) => setEditQuantity(e.target.value)}
                              className="h-8 text-sm"
                              style={{ borderRadius: "8px" }}
                            />
                          ) : (
                            <div>{editQuantity}</div>
                          )}
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
                                {material.specification} &bull; Need: {material.quantityNeeded} &bull; In Stock:{" "}
                                {material.quantityInStock}
                              </div>
                              <div className="text-sm text-neutral-50 mt-1">
                                Supplier: {material.supplier} &bull; Unit Cost: {material.unitCost} &bull; Total:{" "}
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
                              need to be ordered. Click &quot;Create PO&quot; to generate a purchase order for missing items.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Special Instructions - Editable */}
                <div className="border rounded-md" style={{ borderRadius: "8px" }}>
                  <div className="bg-neutral-5 p-4 font-medium border-b">Special Instructions</div>
                  <div className="p-4">
                    {isEditMode ? (
                      <Textarea
                        value={editSpecialInstructions}
                        onChange={(e) => setEditSpecialInstructions(e.target.value)}
                        className="min-h-[80px] text-sm w-full"
                        style={{ borderRadius: "8px" }}
                      />
                    ) : (
                      <p className="text-sm text-neutral-70">{editSpecialInstructions || <span className="text-neutral-40 italic">No special instructions</span>}</p>
                    )}
                  </div>
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
                            <Badge variant="outline" className="text-xs">3 Pallets</Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div><span className="text-neutral-50 font-medium">Address:</span>{" "}{isEditMode ? (<Input value={editShipment1Address} onChange={(e) => setEditShipment1Address(e.target.value)} className="mt-1 h-8 text-sm inline-block w-[80%]" style={{ borderRadius: "8px" }} />) : (<>{editShipment1Address}{(editShipment1Address.includes("TBD") || !editShipment1Address.trim()) && <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium" style={{ background: "#ffe4c6", color: "#5e4200" }}><MapPin className="h-3 w-3" />Pending</span>}</>)}</div>
                            <div className="grid grid-cols-2 gap-2">
                              <div><span className="text-neutral-50 font-medium">Method:</span> Standard Freight</div>
                              <div><span className="text-neutral-50 font-medium">Quantity:</span> 3,000 units (60%)</div>
                            </div>
                            <div><span className="text-neutral-50 font-medium">Tracking:</span> FT-2025-3344-01</div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">Shipment #2</div>
                            <Badge variant="outline" className="text-xs">2 Pallets</Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div><span className="text-neutral-50 font-medium">Address:</span>{" "}{isEditMode ? (<Input value={editShipment2Address} onChange={(e) => setEditShipment2Address(e.target.value)} className="mt-1 h-8 text-sm inline-block w-[80%]" style={{ borderRadius: "8px" }} />) : (<>{editShipment2Address}{(editShipment2Address.includes("TBD") || !editShipment2Address.trim()) && <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium" style={{ background: "#ffe4c6", color: "#5e4200" }}><MapPin className="h-3 w-3" />Pending</span>}</>)}</div>
                            <div className="grid grid-cols-2 gap-2">
                              <div><span className="text-neutral-50 font-medium">Method:</span> Express Freight</div>
                              <div><span className="text-neutral-50 font-medium">Quantity:</span> 2,000 units (40%)</div>
                            </div>
                            <div><span className="text-neutral-50 font-medium">Tracking:</span> FT-2025-3344-02</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md h-fit">
                    <div className="bg-neutral-5 p-4 font-medium border-b flex items-center justify-between">
                      <span>Order Summary</span>
                      {isEditMode && <span className="text-xs font-normal px-2 py-0.5 rounded" style={{ background: "#eaf4ff", color: "#00527c" }}>Auto-recalculating</span>}
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between"><span>Production Cost:</span><span>EUR {isEditMode ? calculatePrices().production.toFixed(2) : "950.00"}</span></div>
                        <div className="flex justify-between"><span>Finishing Cost:</span><span>EUR {isEditMode ? calculatePrices().finishing.toFixed(2) : "150.00"}</span></div>
                        <div className="flex justify-between"><span>Shipping:</span><span>EUR {isEditMode ? calculatePrices().shipping.toFixed(2) : "50.00"}</span></div>
                        {customCosts.map((cost, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{cost.type}: {cost.description}</span>
                            <span>EUR {cost.amount.toFixed(2)}</span>
                          </div>
                        ))}
                        <Separator className="my-3" />
                        <div className="flex justify-between font-medium text-lg"><span>Total:</span><span>EUR {isEditMode ? calculatePrices().total.toFixed(2) : "1,250.00"}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artwork & Preflight Section */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-neutral-5 p-4 font-semibold border-b flex justify-between items-center">
                  <span>Artwork &amp; Preflight</span>
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
                                <div className="text-sm text-neutral-50">5.2 MB &bull; Uploaded May 18, 2025 2:30 PM</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
                              <Button variant="outline" size="sm" className="text-critical-70 hover:text-critical-90 bg-transparent"><X className="h-4 w-4" /></Button>
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
                                        <p className="text-sm text-success-90 mt-1">Your artwork meets all the requirements for printing.</p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-start p-3 bg-amber-50 border border-neutral-20 rounded-md">
                                      <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                                      <div>
                                        <div className="font-medium text-amber-800">Preflight check found issues</div>
                                        <p className="text-sm text-amber-700 mt-1">There are some issues with your artwork.</p>
                                      </div>
                                    </div>
                                  )}

                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center"><span className="font-medium">Document Size</span><span className="text-success-70 flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> Correct (210 x 297 mm)</span></div>
                                    <div className="flex justify-between items-center"><span className="font-medium">Color Mode</span><span className="text-success-70 flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> CMYK</span></div>
                                    <div className="flex justify-between items-center"><span className="font-medium">Resolution</span><span className="text-success-70 flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> 300 DPI</span></div>
                                    <div className="flex justify-between items-center"><span className="font-medium">Fonts</span><span className="text-success-70 flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> Embedded</span></div>
                                    <div className="flex justify-between items-center"><span className="font-medium">Bleed</span><span className="text-success-70 flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> 3mm</span></div>
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
                            <div className="text-neutral-50 text-center py-6">Upload artwork to generate a digital proof</div>
                          ) : !proofSent ? (
                            <div className="space-y-4">
                              <div className="aspect-video bg-neutral-5 rounded-md flex items-center justify-center">
                                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brochure-preview.png`} alt="Brochure Preview" className="max-h-full rounded-md" />
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium">Digital Proof</h3>
                                  <p className="text-sm text-neutral-50">Review the digital proof and send it to the client for approval</p>
                                </div>
                                <Button onClick={sendProof} disabled={!preflightPassed}><Send className="h-4 w-4 mr-1" />Send to Client</Button>
                              </div>
                            </div>
                          ) : !proofApproved ? (
                            <div className="space-y-4">
                              <div className="aspect-video bg-neutral-5 rounded-md flex items-center justify-center">
                                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brochure-preview.png`} alt="Brochure Preview" className="max-h-full rounded-md" />
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium">Digital Proof Sent</h3>
                                  <p className="text-sm text-neutral-50">Waiting for client approval</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm"><Send className="h-4 w-4 mr-1" />Resend</Button>
                                  <Button onClick={approveProof}><CheckCircle className="h-4 w-4 mr-1" />Approve Proof</Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="aspect-video bg-neutral-5 rounded-md flex items-center justify-center">
                                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brochure-preview.png`} alt="Brochure Preview" className="max-h-full rounded-md" />
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium">Digital Proof Approved</h3>
                                  <p className="text-sm text-neutral-50">Approved by Alex Chen on May 20, 2025 11:45 AM</p>
                                </div>
                                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Download</Button>
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
                          <Button className="mt-3 w-full" size="sm">Save Notes</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            )}

              {/* Imposition Template Modal */}
              {showImpositionTemplate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h3 className="text-lg font-bold">Imposition Template</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowImpositionTemplate(false)}><X className="h-4 w-4" /></Button>
                    </div>
                    <div className="flex-1 overflow-hidden flex items-center justify-center p-8">
                      <p className="text-neutral-50">Imposition template preview</p>
                    </div>
                    <div className="p-4 border-t flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowImpositionTemplate(false)}>Close</Button>
                      <Button><Download className="h-4 w-4 mr-1" />Download Template</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Workflow Template Modal */}
              {showWorkflowTemplate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h3 className="text-lg font-bold">Workflow Configuration</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowWorkflowTemplate(false)}><X className="h-4 w-4" /></Button>
                    </div>
                    <div className="flex-1 overflow-hidden flex items-center justify-center p-8">
                      <p className="text-neutral-50">Workflow configuration preview</p>
                    </div>
                    <div className="p-4 border-t flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowWorkflowTemplate(false)}>Close</Button>
                      <Button><Download className="h-4 w-4 mr-1" />Download Configuration</Button>
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
                      <Button variant="ghost" size="sm" onClick={() => setShowJobTicket(false)}><X className="h-4 w-4" /></Button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="max-w-4xl mx-auto">
                        <p className="text-neutral-50">Use the Job Ticket tab for the full printable view.</p>
                      </div>
                    </div>
                    <div className="p-4 border-t flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowJobTicket(false)}>Close</Button>
                      <Button onClick={() => { setShowJobTicket(false); setActiveOrderTab("job-ticket"); }}>
                        <FileText className="h-4 w-4 mr-1" />Open Job Ticket Tab
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Create PO Modal */}
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
                          {material.specification} &bull; Quantity: {material.quantityNeeded}
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
                      {"\u20AC"}
                      {materialsRequired
                        .filter((item) => item.status === "unavailable")
                        .reduce((total, item) => total + Number.parseFloat(item.totalCost.replace("\u20AC", "")), 0)
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
    </div>
  )
}
