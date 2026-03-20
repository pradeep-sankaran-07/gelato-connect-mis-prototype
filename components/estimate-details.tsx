"use client"

import { ArrowLeft, X, FileCheck, AlertTriangle, ExternalLink, Calendar, Copy, Plus, MapPin, Trash2, CheckCircle, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useNavigation } from "@/lib/navigation-context"

export default function EstimateDetails() {
  const { navigateTo, goBack } = useNavigation()
  const [showConvertModal, setShowConvertModal] = useState(false)
  const [isConverted, setIsConverted] = useState(false)
  const [convertedOrderId, setConvertedOrderId] = useState<string | null>(null)
  const [showAIPanel, setShowAIPanel] = useState(false)

  // Convert to Order modal state
  const [poNumber, setPoNumber] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [customerRef, setCustomerRef] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")

  // New modal state
  const [sendEmail, setSendEmail] = useState(true)
  const [emailAddress, setEmailAddress] = useState("orders@printco.co.uk")
  const [customerNotes, setCustomerNotes] = useState("")
  const [artworkSource, setArtworkSource] = useState<"customer" | "prepress">("customer")

  // PRD 10: Multi-address delivery
  const estimateQuantity = 5000
  interface EstimateAddress { id: string; label: string; company: string; street: string; city: string; postalCode: string; country: string; quantity: number }
  const [deliveryAddresses, setDeliveryAddresses] = useState<EstimateAddress[]>([
    { id: "ea-1", label: "Primary Address", company: "PrintCo Ltd", street: "123 Print Street", city: "London", postalCode: "EC1A 1BB", country: "United Kingdom", quantity: 5000 },
  ])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState({ label: "", company: "", street: "", city: "", postalCode: "", country: "", quantity: "" })

  // Simulated warnings
  const inventoryWarnings = [
    { item: "Tri-fold Adhesive", status: "Out of stock", severity: "critical" as const },
    { item: "Protective Packaging", status: "Low stock (2 remaining)", severity: "warning" as const },
  ]
  const duplicateWarning = {
    detected: true,
    existingOrder: "j-18-pc-4500",
    customer: "PrintCo Ltd",
    product: "Tri-fold Brochures",
    date: "May 10, 2025",
  }

  const handleConvertToOrder = () => {
    setShowConvertModal(true)
  }

  const handleConfirmConvert = () => {
    const newOrderId = "j-18-pc-5000"
    setConvertedOrderId(newOrderId)
    setIsConverted(true)
    setShowConvertModal(false)
    navigateTo("order-detail", { orderId: newOrderId })
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header Bar */}
      <div className="bg-white p-4 flex items-center border-b">
        <Button variant="ghost" size="sm" className="mr-2" onClick={goBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Go back to Manage Estimates
        </Button>

        <div className="ml-auto flex items-center gap-2">
          {isConverted && convertedOrderId && (
            <Badge className="bg-success-10 text-success-90 border border-success-70 mr-2 flex items-center gap-1.5 px-3 py-1">
              <FileCheck className="h-3.5 w-3.5" />
              Converted
              <button
                onClick={() => navigateTo("order-detail", { orderId: convertedOrderId })}
                className="ml-1 underline hover:text-success-70 flex items-center gap-0.5"
              >
                Order #{convertedOrderId}
                <ExternalLink className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button
            variant={showAIPanel ? "default" : "outline"}
            size="sm"
            onClick={() => setShowAIPanel(!showAIPanel)}
            className={showAIPanel ? "bg-[#212121] text-white hover:opacity-90" : ""}
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            ConnectAI
          </Button>
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="outline" size="sm">
            View PDF
          </Button>
          {!isConverted && (
            <Button
              variant="default"
              size="sm"
              className="bg-[#212121] hover:opacity-90 text-white"
              style={{ borderRadius: "999px" }}
              onClick={handleConvertToOrder}
            >
              <FileCheck className="h-4 w-4 mr-1" />
              Convert to Order
            </Button>
          )}
        </div>
      </div>

      {/* Status/Metadata Header */}
      <div className="bg-white px-6 py-4 border-b" style={{ borderColor: "#e6e6e6" }}>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-lg font-semibold" style={{ color: "#212121" }}>Estimate #EST-2025-047</h1>
          <span style={{ color: "#8a8a8a" }}>&mdash;</span>
          <span className="text-lg" style={{ color: "#383838" }}>PrintCo Tri-fold Brochures</span>
        </div>
        <div className="flex items-center gap-3 text-sm flex-wrap">
          <span className="flex items-center gap-1.5">
            <span style={{ color: "#8a8a8a" }}>Status:</span>
            <Badge className="text-xs px-2 py-0.5" style={{ background: "#e0f2fe", color: "#00527c", border: "1px solid #7dd3fc" }}>Sent</Badge>
          </span>
          <span style={{ color: "#d4d4d4" }}>|</span>
          <span>
            <span style={{ color: "#8a8a8a" }}>Customer: </span>
            <span style={{ color: "#212121" }} className="font-medium">PrintCo Ltd</span>
          </span>
          <span style={{ color: "#d4d4d4" }}>|</span>
          <span>
            <span style={{ color: "#8a8a8a" }}>Created: </span>
            <span style={{ color: "#212121" }}>May 18, 2025</span>
          </span>
          <span style={{ color: "#d4d4d4" }}>|</span>
          <span>
            <span style={{ color: "#8a8a8a" }}>Valid Until: </span>
            <span style={{ color: "#212121" }}>Jun 18, 2025</span>
          </span>
          <span style={{ color: "#d4d4d4" }}>|</span>
          <span>
            <span style={{ color: "#8a8a8a" }}>Total: </span>
            <span style={{ color: "#212121" }} className="font-semibold">EUR 1,250.00</span>
          </span>
        </div>
      </div>

      {/* Convert to Order Modal */}
      {showConvertModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[20001]" style={{ background: "rgba(33, 33, 33, 0.8)" }}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[640px] max-h-[90vh] flex flex-col" style={{ borderRadius: "12px" }}>
            <div className="p-5 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#212121]">Convert Estimate to Order</h3>
                <p className="text-sm text-[#8a8a8a] mt-1">PrintCo Tri-fold Brochures — 5,000 copies</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowConvertModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Duplicate Detection Warning */}
              {duplicateWarning.detected && (
                <div className="p-3 rounded-lg border" style={{ borderColor: "#956f00", background: "#ffe4c6" }}>
                  <div className="flex items-start gap-2">
                    <Copy className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "#5e4200" }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#5e4200" }}>Possible Duplicate Detected</p>
                      <p className="text-sm mt-1" style={{ color: "#5e4200" }}>
                        A similar order exists: <span className="font-medium">#{duplicateWarning.existingOrder}</span> for {duplicateWarning.customer} — {duplicateWarning.product} ({duplicateWarning.date})
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Inventory Availability Warnings */}
              {inventoryWarnings.length > 0 && (
                <div className="p-3 rounded-lg border" style={{ borderColor: inventoryWarnings.some(w => w.severity === "critical") ? "#b5260b" : "#956f00", background: inventoryWarnings.some(w => w.severity === "critical") ? "#fedad9" : "#ffe4c6" }}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: inventoryWarnings.some(w => w.severity === "critical") ? "#8e1f0b" : "#5e4200" }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: inventoryWarnings.some(w => w.severity === "critical") ? "#8e1f0b" : "#5e4200" }}>Inventory Availability</p>
                      <ul className="text-sm mt-1 space-y-1">
                        {inventoryWarnings.map((warning, i) => (
                          <li key={i} style={{ color: warning.severity === "critical" ? "#8e1f0b" : "#5e4200" }}>
                            <span className="font-medium">{warning.item}:</span> {warning.status}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>
                    PO Number <span className="text-[#8a8a8a] font-normal">(optional)</span>
                  </label>
                  <Input
                    placeholder="Enter purchase order number"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    className="rounded-lg"
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>
                    Requested Delivery Date
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="rounded-lg"
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>
                    Customer Reference <span className="text-[#8a8a8a] font-normal">(optional)</span>
                  </label>
                  <Input
                    placeholder="Customer's internal reference number"
                    value={customerRef}
                    onChange={(e) => setCustomerRef(e.target.value)}
                    className="rounded-lg"
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>
                    Special Instructions <span className="text-[#8a8a8a] font-normal">(optional)</span>
                  </label>
                  <Textarea
                    placeholder="Any special handling, delivery, or production instructions..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="min-h-[80px] rounded-lg"
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>

              {/* Email Notification */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium" style={{ color: "#383838", letterSpacing: "0.32px" }}>
                    Send confirmation email to customer?
                  </label>
                  <Switch checked={sendEmail} onCheckedChange={setSendEmail} />
                </div>
                {sendEmail && (
                  <div className="space-y-3">
                    <Input
                      placeholder="customer@email.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      style={{ borderRadius: "8px" }}
                    />
                    <Textarea
                      placeholder="Optional notes to include in the confirmation email..."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      style={{ borderRadius: "8px" }}
                      className="min-h-[60px]"
                    />
                  </div>
                )}
              </div>

              {/* Required Fields for Export */}
              <div className="space-y-3">
                <label className="block text-xs font-medium" style={{ color: "#383838", letterSpacing: "0.32px" }}>Required Fields for Export</label>
                <div className="border rounded-lg p-3 space-y-2" style={{ borderRadius: "8px" }}>
                  {[
                    { label: "Job Number", value: "J-2025-0472" },
                    { label: "Cost Center", value: "" },
                    { label: "GL Code", value: "" },
                    { label: "Tax Code", value: "UK-VAT-20" },
                  ].map(field => (
                    <div key={field.label} className="flex items-center justify-between text-sm">
                      <span style={{ color: "#8a8a8a" }}>{field.label}</span>
                      {field.value ? (
                        <span className="flex items-center gap-1" style={{ color: "#0d8a3f" }}>
                          <CheckCircle className="h-3.5 w-3.5" />{field.value}
                        </span>
                      ) : (
                        <Input placeholder={`Enter ${field.label.toLowerCase()}`} className="w-48 h-7 text-sm" style={{ borderRadius: "8px" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Artwork Source */}
              <div className="space-y-3">
                <label className="block text-xs font-medium" style={{ color: "#383838", letterSpacing: "0.32px" }}>Artwork Source</label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setArtworkSource("customer")}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${artworkSource === "customer" ? "border-[#007cb4] bg-[#f0f8ff]" : "hover:border-neutral-40"}`}
                    style={{ borderRadius: "8px" }}
                  >
                    <div className="font-medium text-sm mb-1" style={{ color: "#212121" }}>Customer uploads artwork</div>
                    <p className="text-xs" style={{ color: "#8a8a8a" }}>A portal link will be sent to the customer to upload their artwork. Basic preflight runs automatically.</p>
                  </div>
                  <div
                    onClick={() => setArtworkSource("prepress")}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${artworkSource === "prepress" ? "border-[#007cb4] bg-[#f0f8ff]" : "hover:border-neutral-40"}`}
                    style={{ borderRadius: "8px" }}
                  >
                    <div className="font-medium text-sm mb-1" style={{ color: "#212121" }}>Pre-press uploads artwork</div>
                    <p className="text-xs" style={{ color: "#8a8a8a" }}>The operator will upload artwork directly in the order's proofing tab.</p>
                  </div>
                </div>
              </div>

              {/* PRD 10: Delivery Addresses Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium" style={{ color: "#383838", letterSpacing: "0.32px" }}>
                    Delivery Addresses
                    <span className="text-[#8a8a8a] font-normal ml-1">({deliveryAddresses.length} {deliveryAddresses.length === 1 ? "address" : "addresses"})</span>
                  </label>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-full hover:bg-neutral-10 transition-colors"
                    style={{ color: "#007cb4" }}
                  >
                    <Plus className="h-3 w-3" />Add Address
                  </button>
                </div>

                {/* Quantity allocation bar */}
                {(() => {
                  const allocated = deliveryAddresses.reduce((s, a) => s + a.quantity, 0)
                  const pct = Math.min(100, Math.round(allocated / estimateQuantity * 100))
                  const isOver = allocated > estimateQuantity
                  const isExact = allocated === estimateQuantity
                  return (
                    <div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#e6e6e6" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, background: isOver ? "#b5260b" : isExact ? "#0d8a3f" : "#956f00" }} />
                      </div>
                      <div className="text-xs mt-1" style={{ color: isOver ? "#8e1f0b" : isExact ? "#065523" : "#5e4200" }}>
                        {allocated.toLocaleString()} / {estimateQuantity.toLocaleString()} units allocated
                        {isOver && " (exceeds order quantity)"}
                        {!isOver && !isExact && ` (${(estimateQuantity - allocated).toLocaleString()} remaining)`}
                      </div>
                    </div>
                  )
                })()}

                {/* Address cards */}
                {deliveryAddresses.map((addr) => (
                  <div key={addr.id} className="border rounded-lg p-3 text-sm" style={{ borderRadius: "8px" }}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-neutral-50 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{addr.label}</div>
                          <div className="text-neutral-60 text-xs">{addr.company}, {addr.street}, {addr.city} {addr.postalCode}, {addr.country}</div>
                          <div className="text-xs mt-1 font-medium" style={{ color: "#00527c" }}>{addr.quantity.toLocaleString()} units</div>
                        </div>
                      </div>
                      {deliveryAddresses.length > 1 && (
                        <button onClick={() => setDeliveryAddresses(prev => prev.filter(a => a.id !== addr.id))} className="text-neutral-40 hover:text-critical-70 p-1">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Inline add address form */}
                {showAddressForm && (
                  <div className="border rounded-lg p-4 space-y-3" style={{ borderRadius: "8px", borderColor: "#007cb4", background: "#f8fbff" }}>
                    <div className="text-xs font-medium" style={{ color: "#383838" }}>New Delivery Address</div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Address label" value={newAddress.label} onChange={(e) => setNewAddress(f => ({ ...f, label: e.target.value }))} className="h-8 text-sm" style={{ borderRadius: "8px" }} />
                      <Input placeholder="Company" value={newAddress.company} onChange={(e) => setNewAddress(f => ({ ...f, company: e.target.value }))} className="h-8 text-sm" style={{ borderRadius: "8px" }} />
                    </div>
                    <Input placeholder="Street address" value={newAddress.street} onChange={(e) => setNewAddress(f => ({ ...f, street: e.target.value }))} className="h-8 text-sm" style={{ borderRadius: "8px" }} />
                    <div className="grid grid-cols-3 gap-3">
                      <Input placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress(f => ({ ...f, city: e.target.value }))} className="h-8 text-sm" style={{ borderRadius: "8px" }} />
                      <Input placeholder="Postal code" value={newAddress.postalCode} onChange={(e) => setNewAddress(f => ({ ...f, postalCode: e.target.value }))} className="h-8 text-sm" style={{ borderRadius: "8px" }} />
                      <Input placeholder="Country" value={newAddress.country} onChange={(e) => setNewAddress(f => ({ ...f, country: e.target.value }))} className="h-8 text-sm" style={{ borderRadius: "8px" }} />
                    </div>
                    <div>
                      <Input type="number" placeholder={`Quantity (${(estimateQuantity - deliveryAddresses.reduce((s, a) => s + a.quantity, 0)).toLocaleString()} remaining)`} value={newAddress.quantity} onChange={(e) => setNewAddress(f => ({ ...f, quantity: e.target.value }))} className="h-8 text-sm" style={{ borderRadius: "8px" }} />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => { setShowAddressForm(false); setNewAddress({ label: "", company: "", street: "", city: "", postalCode: "", country: "", quantity: "" }) }} style={{ borderRadius: "999px" }}>Cancel</Button>
                      <Button
                        size="sm"
                        className="bg-[#212121] hover:opacity-90 text-white"
                        style={{ borderRadius: "999px" }}
                        onClick={() => {
                          const qty = parseInt(newAddress.quantity) || 0
                          if (newAddress.label && qty > 0) {
                            setDeliveryAddresses(prev => [...prev, { id: `ea-${Date.now()}`, label: newAddress.label, company: newAddress.company, street: newAddress.street, city: newAddress.city, postalCode: newAddress.postalCode, country: newAddress.country, quantity: qty }])
                            setNewAddress({ label: "", company: "", street: "", city: "", postalCode: "", country: "", quantity: "" })
                            setShowAddressForm(false)
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-[#f7f7f7] rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-medium" style={{ color: "#212121" }}>Order Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "#8a8a8a" }}>Production Cost</span>
                    <span>EUR 950.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#8a8a8a" }}>Finishing Cost</span>
                    <span>EUR 150.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#8a8a8a" }}>Shipping</span>
                    <span>EUR 50.00</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t" style={{ borderColor: "#e6e6e6" }}>
                    <span>Total</span>
                    <span>EUR 1,250.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowConvertModal(false)}
                style={{ borderRadius: "999px", border: "2px solid #bdbdbd" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmConvert}
                className="bg-[#212121] hover:opacity-90 text-white"
                style={{ borderRadius: "999px" }}
              >
                <FileCheck className="h-4 w-4 mr-1" />
                Convert to Order
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className={`${showAIPanel ? "w-2/3" : "w-full"} p-6 overflow-y-auto transition-all`} style={{ background: "#f7f7f7" }}>
          {/* Basic Details Card */}
          <div className="bg-white border rounded-lg overflow-hidden mb-4" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
            <div className="bg-neutral-5 px-4 py-3 border-b font-medium text-sm" style={{ color: "#212121", borderColor: "#e6e6e6" }}>
              Basic Details
            </div>
            <div className="p-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Job Name</span>
                <span className="font-medium" style={{ color: "#212121" }}>PrintCo Tri-fold Brochures</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Customer</span>
                <span className="font-medium" style={{ color: "#212121" }}>PrintCo Ltd</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span style={{ color: "#8a8a8a" }}>Status</span>
                <Badge className="text-xs px-2 py-0.5" style={{ background: "#e0f2fe", color: "#00527c", border: "1px solid #7dd3fc" }}>Sent</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Reference</span>
                <span className="font-medium" style={{ color: "#212121" }}>EST-2025-047</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Created By</span>
                <span className="font-medium" style={{ color: "#212121" }}>Alex Chen</span>
              </div>
            </div>
          </div>

          {/* Product Specs Card */}
          <div className="bg-white border rounded-lg overflow-hidden mb-4" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
            <div className="bg-neutral-5 px-4 py-3 border-b font-medium text-sm" style={{ color: "#212121", borderColor: "#e6e6e6" }}>
              Product Specs
            </div>
            <div className="p-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Product Category</span>
                <span className="font-medium" style={{ color: "#212121" }}>Brochure</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Quantity</span>
                <span className="font-medium" style={{ color: "#212121" }}>5,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Finished Size</span>
                <span className="font-medium" style={{ color: "#212121" }}>A4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Orientation</span>
                <span className="font-medium" style={{ color: "#212121" }}>Portrait</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Printed Sides</span>
                <span className="font-medium" style={{ color: "#212121" }}>Double Sided</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Paper Weight</span>
                <span className="font-medium" style={{ color: "#212121" }}>200 gsm</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Paper Coating</span>
                <span className="font-medium" style={{ color: "#212121" }}>Gloss</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Color</span>
                <span className="font-medium" style={{ color: "#212121" }}>Full colour / both sides</span>
              </div>
            </div>
          </div>

          {/* Finishing Card */}
          <div className="bg-white border rounded-lg overflow-hidden mb-4" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
            <div className="bg-neutral-5 px-4 py-3 border-b font-medium text-sm" style={{ color: "#212121", borderColor: "#e6e6e6" }}>
              Finishing
            </div>
            <div className="p-4 space-y-2.5">
              <div className="flex justify-between text-sm items-center">
                <span style={{ color: "#8a8a8a" }}>Finishing</span>
                <span className="font-medium flex items-center gap-1.5" style={{ color: "#212121" }}>
                  <Check className="h-4 w-4" style={{ color: "#0d8a3f" }} />
                  Tri-fold
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="bg-white border rounded-lg overflow-hidden mb-4" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
            <div className="bg-neutral-5 px-4 py-3 border-b font-medium text-sm" style={{ color: "#212121", borderColor: "#e6e6e6" }}>
              Pricing Breakdown
            </div>
            <div className="p-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Production Cost</span>
                <span className="font-medium" style={{ color: "#212121" }}>EUR 950.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Finishing Cost</span>
                <span className="font-medium" style={{ color: "#212121" }}>EUR 150.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Shipping</span>
                <span className="font-medium" style={{ color: "#212121" }}>EUR 50.00</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2.5 mt-2.5 border-t" style={{ borderColor: "#e6e6e6" }}>
                <span style={{ color: "#212121" }}>Total</span>
                <span style={{ color: "#212121" }}>EUR 1,250.00</span>
              </div>
              <div className="flex justify-between text-sm pt-2.5 mt-1 border-t" style={{ borderColor: "#e6e6e6" }}>
                <span style={{ color: "#8a8a8a" }}>Production Method</span>
                <span className="font-medium" style={{ color: "#212121" }}>Digital</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#8a8a8a" }}>Currency</span>
                <span className="font-medium" style={{ color: "#212121" }}>EUR</span>
              </div>
            </div>
          </div>
        </div>

        {/* ConnectAI Sidebar */}
        {showAIPanel && (
          <div className="w-1/3 border-l bg-neutral-5">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2819%29-170UxeV7cg8b7kNjFagZkz9quPldwr.png"
                  alt="GelatoConnect Logo"
                  className="h-5 w-5 mr-2"
                />
                <span className="font-medium">ConnectAI</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAIPanel(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4">
              <div className="bg-white rounded-lg p-4 border mb-4">
                <p className="text-sm mb-3">Hi, I can help you estimate tri-fold brochures for customer PrintCo Ltd.</p>
                <p className="text-sm mb-1">Job details extracted from email:</p>
                <ul className="text-sm list-disc pl-5 mb-3 space-y-1">
                  <li>5000 copies</li>
                  <li>Size A4 Portrait</li>
                  <li>Cover: 200gsm gloss</li>
                  <li>Full color both sides</li>
                  <li>Tri-fold finishing</li>
                </ul>
                <p className="text-sm">
                  I've prepared the estimate for PrintCo Tri-fold Brochures with all specifications.
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Ask a follow-up question</label>
                <Textarea placeholder="Type your question here..." className="bg-white" />
              </div>

              <Button variant="outline" className="w-full flex items-center justify-center">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
                Send
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
