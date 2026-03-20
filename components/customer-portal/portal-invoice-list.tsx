"use client"

import { useState } from "react"
import { Download, Eye, CreditCard, X, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"
import PortalHeader, { mockCustomers, type PortalCustomer } from "./portal-header"

const invoices = [
  { id: "INV-2025-089", date: "Mar 10, 2025", amount: "$2,450.00", status: "Paid" as const, dueDate: "Mar 10, 2025", order: "ORD-2025-132" },
  { id: "INV-2025-086", date: "Mar 5, 2025", amount: "$1,875.50", status: "Due" as const, dueDate: "Mar 25, 2025", order: "ORD-2025-128" },
  { id: "INV-2025-082", date: "Feb 28, 2025", amount: "$890.00", status: "Overdue" as const, dueDate: "Mar 5, 2025", order: "ORD-2025-124" },
  { id: "INV-2025-078", date: "Feb 20, 2025", amount: "$3,200.00", status: "Paid" as const, dueDate: "Feb 20, 2025", order: "ORD-2025-118" },
  { id: "INV-2025-071", date: "Feb 12, 2025", amount: "$1,150.00", status: "Paid" as const, dueDate: "Feb 12, 2025", order: "ORD-2025-110" },
]

type FilterType = "All" | "Unpaid" | "Paid" | "Overdue"

export default function PortalInvoiceList() {
  const { navigateTo } = useNavigation()
  const [selectedCustomer, setSelectedCustomer] = useState<PortalCustomer>(mockCustomers[0])
  const [filter, setFilter] = useState<FilterType>("All")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [payingInvoice, setPayingInvoice] = useState<typeof invoices[0] | null>(null)
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [processing, setProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const filters: FilterType[] = ["All", "Unpaid", "Paid", "Overdue"]

  const filteredInvoices = invoices.filter((inv) => {
    if (filter === "All") return true
    if (filter === "Unpaid") return inv.status === "Due" || inv.status === "Overdue"
    return inv.status === filter
  })

  function handlePayNow(inv: typeof invoices[0]) {
    setPayingInvoice(inv)
    setShowPaymentModal(true)
    setPaymentSuccess(false)
    setCardNumber("")
    setExpiry("")
    setCvc("")
  }

  function handleProcessPayment() {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setPaymentSuccess(true)
      setTimeout(() => setShowPaymentModal(false), 2000)
    }, 2000)
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "Paid":
        return <Badge className="bg-success-10 text-success-90 text-xs">Paid</Badge>
      case "Due":
        return <Badge className="bg-info-10 text-info-90 text-xs">Due</Badge>
      case "Overdue":
        return <Badge className="bg-critical-20 text-critical-90 text-xs">Overdue</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-neutral-5">
      <PortalHeader activeScreen="portal-invoice-list" selectedCustomer={selectedCustomer} onCustomerChange={setSelectedCustomer} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-100">Invoices</h1>
            <p className="text-sm text-neutral-60 mt-1">View and pay your invoices</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`h-8 px-4 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-neutral-100 text-white"
                  : "text-neutral-60 hover:bg-neutral-10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Invoice Table */}
        <div className="bg-white border border-neutral-20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-5">
                <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Invoice #</th>
                <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Date</th>
                <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Order</th>
                <th className="text-right text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Amount</th>
                <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Due Date</th>
                <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Status</th>
                <th className="text-right text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className={`transition-colors ${
                    inv.status === "Overdue" ? "bg-critical-5/50" : "hover:bg-neutral-5/50"
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-neutral-100 border-b border-neutral-20">{inv.id}</td>
                  <td className="px-4 py-3 text-sm text-neutral-70 border-b border-neutral-20">{inv.date}</td>
                  <td className="px-4 py-3 text-sm text-neutral-70 border-b border-neutral-20">{inv.order}</td>
                  <td className="px-4 py-3 text-sm font-medium text-neutral-100 text-right border-b border-neutral-20">{inv.amount}</td>
                  <td className="px-4 py-3 text-sm text-neutral-70 border-b border-neutral-20">{inv.dueDate}</td>
                  <td className="px-4 py-3 border-b border-neutral-20">{getStatusBadge(inv.status)}</td>
                  <td className="px-4 py-3 border-b border-neutral-20">
                    <div className="flex items-center justify-end gap-1">
                      <button className="h-7 w-7 flex items-center justify-center rounded-md text-neutral-50 hover:text-neutral-100 hover:bg-neutral-5 transition-colors" title="View">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="h-7 w-7 flex items-center justify-center rounded-md text-neutral-50 hover:text-neutral-100 hover:bg-neutral-5 transition-colors" title="Download PDF">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      {(inv.status === "Due" || inv.status === "Overdue") && (
                        <button
                          onClick={() => handlePayNow(inv)}
                          className="h-7 px-3 bg-neutral-100 text-white rounded-full text-xs font-medium hover:opacity-90 transition-opacity ml-1"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && payingInvoice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-neutral-50 hover:text-neutral-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {paymentSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-success-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">Payment Successful</h3>
                <p className="text-sm text-neutral-60">Your payment of {payingInvoice.amount} has been processed.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">Pay Invoice</h3>
                <p className="text-sm text-neutral-60 mb-6">
                  {payingInvoice.id} &middot; {payingInvoice.amount}
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-90 mb-1.5 block">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        className="w-full h-10 pl-3 pr-10 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-40" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-neutral-90 mb-1.5 block">Expiry</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM / YY"
                        maxLength={7}
                        className="w-full h-10 px-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-neutral-90 mb-1.5 block">CVC</label>
                      <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full h-10 px-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProcessPayment}
                  disabled={processing}
                  className="w-full h-11 mt-6 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Pay {payingInvoice.amount}</>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-neutral-50">
                  <Lock className="h-3 w-3" />
                  Secure payment powered by Stripe
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
