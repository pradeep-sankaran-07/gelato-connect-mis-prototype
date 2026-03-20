"use client"

import { useState } from "react"
import { RefreshCw, X, Package, ChevronDown, Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"
import PortalHeader, { mockCustomers, type PortalCustomer } from "./portal-header"

const pastOrders = [
  { id: "ORD-2025-132", product: "Business Cards - Premium Matte", quantity: 5000, date: "Feb 28, 2025", total: "$780.00" },
  { id: "ORD-2025-118", product: "Brochure - Tri-fold Glossy A4", quantity: 2000, date: "Feb 10, 2025", total: "$3,200.00" },
  { id: "ORD-2025-110", product: "Poster - Large Format 24x36", quantity: 500, date: "Jan 28, 2025", total: "$1,150.00" },
  { id: "ORD-2025-098", product: "Letterhead - 100gsm Bond", quantity: 10000, date: "Jan 15, 2025", total: "$890.00" },
  { id: "ORD-2024-256", product: "Catalog - 32 Page Saddle Stitch", quantity: 1000, date: "Dec 12, 2024", total: "$4,500.00" },
  { id: "ORD-2024-240", product: "Business Cards - Premium Matte", quantity: 2500, date: "Nov 20, 2024", total: "$420.00" },
]

const savedTemplates = [
  { id: "TPL-001", name: "Monthly Brochure Run", product: "Brochure - Tri-fold Glossy A4", quantity: 2000, lastUsed: "Feb 10, 2025" },
  { id: "TPL-002", name: "Quarterly Catalog", product: "Catalog - 32 Page Saddle Stitch", quantity: 1000, lastUsed: "Dec 12, 2024" },
]

const addresses = [
  { id: "addr-1", label: "Head Office", address: "123 Business Park, Suite 400, London EC2A 4BX" },
  { id: "addr-2", label: "Warehouse", address: "Unit 5, Industrial Estate, Manchester M12 4WD" },
]

export default function PortalReorder() {
  const { navigateTo } = useNavigation()
  const [selectedCustomer, setSelectedCustomer] = useState<PortalCustomer>(mockCustomers[0])
  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<typeof pastOrders[0] | null>(null)
  const [reorderQty, setReorderQty] = useState("")
  const [selectedAddress, setSelectedAddress] = useState("addr-1")
  const [orderPlaced, setOrderPlaced] = useState(false)

  function handleReorder(order: typeof pastOrders[0]) {
    setSelectedOrder(order)
    setReorderQty(String(order.quantity))
    setShowModal(true)
    setOrderPlaced(false)
  }

  function handlePlaceOrder() {
    setOrderPlaced(true)
    setTimeout(() => {
      setShowModal(false)
      setOrderPlaced(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-neutral-5">
      <PortalHeader activeScreen="portal-order-detail" selectedCustomer={selectedCustomer} onCustomerChange={setSelectedCustomer} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-100">Reorder from Past Orders</h1>
          <p className="text-sm text-neutral-60 mt-1">Quickly reorder any previous job or use a saved template</p>
        </div>

        {/* Saved Templates */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-neutral-100 mb-4 flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-neutral-60" />
            Saved Templates
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {savedTemplates.map((tpl) => (
              <div key={tpl.id} className="bg-white border border-neutral-20 rounded-lg p-5 hover:border-neutral-40 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-100">{tpl.name}</h4>
                    <p className="text-xs text-neutral-60 mt-1">{tpl.product}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-neutral-50">
                      <span>Qty: {tpl.quantity.toLocaleString()}</span>
                      <span>Last used: {tpl.lastUsed}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const matchingOrder = pastOrders.find((o) => o.product === tpl.product)
                      if (matchingOrder) handleReorder({ ...matchingOrder, quantity: tpl.quantity })
                    }}
                    className="h-8 px-4 bg-neutral-100 text-white rounded-full text-xs font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Orders Grid */}
        <div>
          <h3 className="text-base font-semibold text-neutral-100 mb-4 flex items-center gap-2">
            <Package className="h-4 w-4 text-neutral-60" />
            Past Orders
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {pastOrders.map((order) => (
              <div key={order.id} className="bg-white border border-neutral-20 rounded-lg p-5 hover:border-neutral-40 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">{order.id}</Badge>
                  <span className="text-xs text-neutral-50">{order.date}</span>
                </div>
                {/* Thumbnail placeholder */}
                <div className="w-full h-24 bg-neutral-10 rounded-md flex items-center justify-center mb-3 border border-neutral-20">
                  <Package className="h-6 w-6 text-neutral-30" />
                </div>
                <h4 className="text-sm font-medium text-neutral-100 mb-1">{order.product}</h4>
                <div className="flex items-center justify-between text-xs text-neutral-60 mb-4">
                  <span>Qty: {order.quantity.toLocaleString()}</span>
                  <span className="font-medium text-neutral-90">{order.total}</span>
                </div>
                <button
                  onClick={() => handleReorder(order)}
                  className="w-full h-9 border border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Reorder Confirmation Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-neutral-50 hover:text-neutral-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {orderPlaced ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-success-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">Order Placed!</h3>
                <p className="text-sm text-neutral-60">Your reorder has been submitted successfully.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">Reorder Confirmation</h3>
                <p className="text-sm text-neutral-60 mb-6">{selectedOrder.product}</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-90 mb-1.5 block">Quantity</label>
                    <input
                      type="number"
                      value={reorderQty}
                      onChange={(e) => setReorderQty(e.target.value)}
                      className="w-full h-10 px-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-90 mb-1.5 block">Delivery Address</label>
                    <div className="relative">
                      <select
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="w-full h-10 pl-3 pr-8 border border-neutral-30 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:border-neutral-90"
                      >
                        {addresses.map((addr) => (
                          <option key={addr.id} value={addr.id}>{addr.label} - {addr.address}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-50 pointer-events-none" />
                    </div>
                  </div>

                  <div className="bg-neutral-5 rounded-lg p-3 text-sm">
                    <div className="flex justify-between text-neutral-60 mb-1">
                      <span>Original order</span>
                      <span>{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between text-neutral-60">
                      <span>Estimated total</span>
                      <span className="font-medium text-neutral-100">{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 h-10 border border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 h-10 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
