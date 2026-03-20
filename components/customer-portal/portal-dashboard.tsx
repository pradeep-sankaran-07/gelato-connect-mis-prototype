"use client"

import { useState } from "react"
import {
  Package, FileCheck, FileText, RefreshCw, LifeBuoy, Clock,
  CheckCircle, AlertCircle, ArrowRight, Eye
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"
import PortalHeader, { mockCustomers, type PortalCustomer } from "./portal-header"

const activeOrders = [
  { id: "ORD-2025-142", product: "Business Cards - Premium Matte", progress: 60, status: "In Production", dueDate: "Mar 22, 2025" },
  { id: "ORD-2025-139", product: "Brochure - Tri-fold Glossy A4", progress: 85, status: "Quality Check", dueDate: "Mar 20, 2025" },
  { id: "ORD-2025-136", product: "Poster - Large Format 24x36", progress: 30, status: "Prepress", dueDate: "Mar 25, 2025" },
]

const proofsAwaiting = [
  { orderId: "ORD-2025-142", product: "Business Cards - Premium Matte", version: 2, uploadedDate: "Mar 15, 2025" },
]

const recentInvoices = [
  { id: "INV-2025-089", amount: "$2,450.00", status: "Paid", dueDate: "Mar 10, 2025" },
  { id: "INV-2025-086", amount: "$1,875.50", status: "Due", dueDate: "Mar 25, 2025" },
  { id: "INV-2025-082", amount: "$890.00", status: "Overdue", dueDate: "Mar 5, 2025" },
]

const recentActivity = [
  { id: 1, icon: CheckCircle, color: "text-success-70", message: "Payment received for INV-2025-089", time: "2 hours ago" },
  { id: 2, icon: FileCheck, color: "text-info-70", message: "Proof v2 uploaded for ORD-2025-142", time: "5 hours ago" },
  { id: 3, icon: Package, color: "text-primary-70", message: "ORD-2025-139 moved to Quality Check", time: "1 day ago" },
  { id: 4, icon: FileText, color: "text-warning-70", message: "Invoice INV-2025-086 generated", time: "2 days ago" },
  { id: 5, icon: AlertCircle, color: "text-critical-60", message: "ORD-2025-136 deadline updated to Mar 25", time: "3 days ago" },
]

export default function CustomerPortalDashboard() {
  const { navigateTo } = useNavigation()
  const [selectedCustomer, setSelectedCustomer] = useState<PortalCustomer>(mockCustomers[0])

  return (
    <div className="min-h-screen bg-neutral-5">
      <PortalHeader
        activeScreen="customer-portal"
        selectedCustomer={selectedCustomer}
        onCustomerChange={setSelectedCustomer}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-100">Welcome, {selectedCustomer.contact}</h1>
          <p className="text-sm text-neutral-60 mt-1">{selectedCustomer.name} &middot; Last login: Mar 15, 2025 at 9:30 AM</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {/* Active Orders */}
          <div className="bg-white border border-neutral-20 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-neutral-100 flex items-center gap-2">
                <Package className="h-4 w-4 text-neutral-60" />
                Active Orders
              </h3>
              <span className="text-xs text-neutral-50">{activeOrders.length} orders</span>
            </div>
            <div className="space-y-3">
              {activeOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => navigateTo("portal-order-detail", { orderId: order.id })}
                  className="p-3 border border-neutral-20 rounded-lg cursor-pointer hover:border-neutral-40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-neutral-100">{order.id}</span>
                    <Badge className="bg-info-10 text-info-90 text-xs">{order.status}</Badge>
                  </div>
                  <p className="text-xs text-neutral-60 mb-2">{order.product}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="h-1.5 bg-neutral-10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-info-70 rounded-full transition-all"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-neutral-50 whitespace-nowrap">Due: {order.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proofs Awaiting Review */}
          <div className="bg-white border border-neutral-20 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-neutral-100 flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-neutral-60" />
                Proofs Awaiting Review
              </h3>
              <Badge className="bg-warning-20 text-warning-90 text-xs">{proofsAwaiting.length} pending</Badge>
            </div>
            {proofsAwaiting.length > 0 ? (
              <div className="space-y-3">
                {proofsAwaiting.map((proof) => (
                  <div
                    key={proof.orderId}
                    onClick={() => navigateTo("portal-proof-review", { orderId: proof.orderId })}
                    className="p-3 border border-warning-30 bg-warning-10/30 rounded-lg cursor-pointer hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-neutral-10 rounded border border-neutral-20 flex items-center justify-center text-neutral-40 flex-shrink-0">
                        <Eye className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-neutral-100">{proof.orderId}</div>
                        <p className="text-xs text-neutral-60 mt-0.5">{proof.product}</p>
                        <p className="text-xs text-neutral-50 mt-1">Version {proof.version} &middot; Uploaded {proof.uploadedDate}</p>
                      </div>
                      <button className="h-8 px-3 bg-neutral-100 text-white rounded-full text-xs font-medium hover:opacity-90 transition-opacity">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-neutral-50">No proofs awaiting review</div>
            )}

            {/* Quick Actions below proofs */}
            <div className="mt-6 pt-4 border-t border-neutral-20">
              <h4 className="text-sm font-semibold text-neutral-100 mb-3 flex items-center gap-2">
                Quick Actions
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => navigateTo("portal-reorder")}
                  className="flex items-center gap-2 h-9 px-4 border border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reorder from Past Order
                </button>
                <button
                  onClick={() => navigateTo("portal-support")}
                  className="flex items-center gap-2 h-9 px-4 border border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors"
                >
                  <LifeBuoy className="h-3.5 w-3.5" />
                  Create Support Ticket
                </button>
              </div>
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="bg-white border border-neutral-20 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-neutral-100 flex items-center gap-2">
                <FileText className="h-4 w-4 text-neutral-60" />
                Recent Invoices
              </h3>
              <button
                onClick={() => navigateTo("portal-invoice-list")}
                className="text-xs text-neutral-60 hover:text-neutral-100 flex items-center gap-1 transition-colors"
              >
                View All <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-2">
              {recentInvoices.map((inv) => (
                <div
                  key={inv.id}
                  onClick={() => navigateTo("portal-invoice-list")}
                  className="flex items-center justify-between p-3 border border-neutral-20 rounded-lg cursor-pointer hover:border-neutral-40 transition-colors"
                >
                  <div>
                    <span className="text-sm font-medium text-neutral-100">{inv.id}</span>
                    <span className="text-sm text-neutral-60 ml-3">{inv.amount}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-50">Due: {inv.dueDate}</span>
                    {inv.status === "Paid" && <Badge className="bg-success-10 text-success-90 text-xs">Paid</Badge>}
                    {inv.status === "Due" && <Badge className="bg-info-10 text-info-90 text-xs">Due</Badge>}
                    {inv.status === "Overdue" && <Badge className="bg-critical-20 text-critical-90 text-xs">Overdue</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-neutral-20 rounded-lg p-5">
            <h3 className="text-base font-semibold text-neutral-100 flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-neutral-60" />
              Recent Activity
            </h3>
            <div className="space-y-0">
              {recentActivity.map((event, idx) => (
                <div key={event.id} className="flex items-start gap-3 py-2.5 relative">
                  {idx < recentActivity.length - 1 && (
                    <div className="absolute left-[9px] top-[28px] bottom-0 w-px bg-neutral-20" />
                  )}
                  <event.icon className={`h-[18px] w-[18px] ${event.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-90">{event.message}</p>
                    <p className="text-xs text-neutral-50 mt-0.5">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
