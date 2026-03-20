"use client"

import { useState } from "react"
import { ArrowLeft, Package, Truck, CheckCircle, ClipboardCheck, MapPin, Calendar, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"
import PortalHeader, { mockCustomers, type PortalCustomer } from "./portal-header"

const steps = [
  { label: "Order Received", date: "Mar 12, 2025", completed: true },
  { label: "In Production", date: "Mar 14, 2025", completed: false, current: true },
  { label: "Quality Check", date: "Est. Mar 19", completed: false },
  { label: "Shipping", date: "Est. Mar 20", completed: false },
  { label: "Delivered", date: "Est. Mar 22", completed: false },
]

const lineItems = [
  { description: "Business Cards - Premium Matte 350gsm", quantity: 5000, unitPrice: "$0.08", total: "$400.00" },
  { description: "Spot UV Coating - Full Front", quantity: 5000, unitPrice: "$0.03", total: "$150.00" },
  { description: "Round Corner Die Cut", quantity: 5000, unitPrice: "$0.02", total: "$100.00" },
]

export default function PortalOrderDetail() {
  const { goBack, navigateTo, params } = useNavigation()
  const orderId = params.orderId || "ORD-2025-142"
  const [selectedCustomer, setSelectedCustomer] = useState<PortalCustomer>(mockCustomers[0])

  return (
    <div className="min-h-screen bg-neutral-5">
      <PortalHeader activeScreen="portal-order-detail" selectedCustomer={selectedCustomer} onCustomerChange={setSelectedCustomer} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-sm text-neutral-60 hover:text-neutral-100 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </button>

        {/* Order Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-neutral-100">{orderId}</h1>
              <Badge className="bg-info-10 text-info-90">In Production</Badge>
            </div>
            <p className="text-sm text-neutral-60 mt-1">Placed on March 12, 2025 &middot; Business Cards - Premium Matte</p>
          </div>
          <div className="flex items-center gap-3 bg-white border border-neutral-20 rounded-lg px-4 py-3">
            <Calendar className="h-5 w-5 text-info-70" />
            <div>
              <div className="text-xs text-neutral-60">Expected Delivery</div>
              <div className="text-base font-semibold text-neutral-100">March 22, 2025</div>
            </div>
          </div>
        </div>

        {/* Production Progress */}
        <div className="bg-white border border-neutral-20 rounded-lg p-6 mb-6">
          <h3 className="text-base font-semibold text-neutral-100 mb-6">Production Progress</h3>
          <div className="relative">
            {/* Background line */}
            <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-neutral-20" />
            {/* Filled progress line */}
            <div
              className="absolute top-5 left-[10%] h-0.5 bg-info-70 transition-all"
              style={{ width: "20%" }}
            />

            <div className="relative flex justify-between">
              {steps.map((step, idx) => (
                <div key={step.label} className="flex flex-col items-center" style={{ width: "20%" }}>
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      step.completed
                        ? "bg-success-70 border-success-70 text-white"
                        : step.current
                        ? "bg-info-70 border-info-70 text-white"
                        : "bg-white border-neutral-30 text-neutral-50"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : step.current ? (
                      <Package className="h-5 w-5" />
                    ) : idx === 2 ? (
                      <ClipboardCheck className="h-5 w-5" />
                    ) : idx === 3 ? (
                      <Truck className="h-5 w-5" />
                    ) : (
                      <MapPin className="h-5 w-5" />
                    )}
                  </div>
                  {/* Pulse ring for current step */}
                  {step.current && (
                    <div className="absolute top-0 w-10 h-10 rounded-full border-2 border-info-70 animate-ping opacity-20" />
                  )}
                  <div className="mt-3 text-center">
                    <div className={`text-sm font-medium ${step.current ? "text-info-70" : step.completed ? "text-neutral-100" : "text-neutral-50"}`}>
                      {step.label}
                    </div>
                    <div className="text-xs text-neutral-50 mt-0.5">{step.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Order Details - 2 columns */}
          <div className="col-span-2 bg-white border border-neutral-20 rounded-lg p-6">
            <h3 className="text-base font-semibold text-neutral-100 mb-4">Order Details</h3>
            <div className="border border-neutral-20 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-5">
                    <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Description</th>
                    <th className="text-right text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Qty</th>
                    <th className="text-right text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Unit Price</th>
                    <th className="text-right text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-neutral-5/50">
                      <td className="px-4 py-3 text-sm text-neutral-90 border-b border-neutral-20">{item.description}</td>
                      <td className="px-4 py-3 text-sm text-neutral-70 text-right border-b border-neutral-20">{item.quantity.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-neutral-70 text-right border-b border-neutral-20">{item.unitPrice}</td>
                      <td className="px-4 py-3 text-sm font-medium text-neutral-100 text-right border-b border-neutral-20">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-neutral-5">
                    <td colSpan={3} className="px-4 py-3 text-sm font-medium text-neutral-100 text-right">Subtotal</td>
                    <td className="px-4 py-3 text-sm font-medium text-neutral-100 text-right">$650.00</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-sm text-neutral-60 text-right border-b border-neutral-20">Tax (20%)</td>
                    <td className="px-4 py-2 text-sm text-neutral-60 text-right border-b border-neutral-20">$130.00</td>
                  </tr>
                  <tr className="bg-neutral-5">
                    <td colSpan={3} className="px-4 py-3 text-base font-semibold text-neutral-100 text-right">Total</td>
                    <td className="px-4 py-3 text-base font-semibold text-neutral-100 text-right">$780.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Artwork Upload Action Card */}
            <div className="bg-white border-2 border-info-70 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="h-5 w-5 text-info-70" />
                <h4 className="text-sm font-semibold text-neutral-100">Artwork Required</h4>
              </div>
              <p className="text-sm text-neutral-60 mb-4">
                Please upload your print-ready artwork to proceed with production.
              </p>
              <button
                onClick={() => navigateTo("portal-proof-review", { orderId, artworkPending: "true" })}
                className="w-full h-9 bg-info-70 text-white rounded-full text-sm font-medium hover:opacity-90 flex items-center justify-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Artwork
              </button>
            </div>

            <div className="bg-white border border-neutral-20 rounded-lg p-5">
              <h4 className="text-sm font-semibold text-neutral-100 mb-3">Order Summary</h4>
              <div className="space-y-2.5">
                {[
                  ["Order #", orderId],
                  ["Product", "Business Cards"],
                  ["Quantity", "5,000"],
                  ["Paper", "350gsm Premium Matte"],
                  ["Finish", "Spot UV + Die Cut"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-neutral-60">{label}</span>
                    <span className="text-neutral-100 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-neutral-20 rounded-lg p-5">
              <h4 className="text-sm font-semibold text-neutral-100 mb-3">Shipping Address</h4>
              <div className="text-sm text-neutral-70 space-y-0.5">
                <p className="font-medium text-neutral-100">Acme Corp</p>
                <p>123 Business Park, Suite 400</p>
                <p>London EC2A 4BX</p>
                <p>United Kingdom</p>
              </div>
            </div>

            <div className="bg-white border border-neutral-20 rounded-lg p-5">
              <h4 className="text-sm font-semibold text-neutral-100 mb-3">Special Instructions</h4>
              <p className="text-sm text-neutral-70">Please ensure cards are individually wrapped in packs of 250. Include company brand guidelines slip in the packaging.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
