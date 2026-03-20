"use client"

import { useState } from "react"
import {
  Download,
  Printer,
  Mail,
  Send,
  CreditCard,
  Pencil,
  Check,
  X,
  Plus,
  FileText,
  ReceiptText,
  DollarSign,
  Calendar,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useNavigation } from "@/lib/navigation-context"
import { useToast } from "@/hooks/use-toast"

interface InvoiceDetailsProps {
  invoiceId: string
}

interface LineItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface PaymentRecord {
  date: string
  amount: number
  method: string
  reference: string
}

export default function InvoiceDetails({ invoiceId }: InvoiceDetailsProps) {
  const { goBack } = useNavigation()
  const { toast } = useToast()

  // Determine which invoice data to show based on invoiceId
  const isDraft = invoiceId === "INV-2025-005"
  const isOverdue = invoiceId === "INV-2025-004" || invoiceId === "INV-2025-007"
  const isPartial = invoiceId === "INV-2025-006"

  const initialStatus = isDraft ? "draft" : isOverdue ? "overdue" : isPartial ? "partial" : invoiceId === "INV-2025-002" ? "sent" : "paid"

  const [status, setStatus] = useState(initialStatus)
  const [taxRate, setTaxRate] = useState(isDraft ? "0" : "0")

  // Editable line items for draft
  const [items, setItems] = useState<LineItem[]>([
    {
      description: isDraft
        ? "Sandbox Premium Business Cards - 350gsm"
        : "PrintCo Tri-fold Brochures - A4 Marketing Brochure",
      quantity: isDraft ? 3000 : 5000,
      unitPrice: isDraft ? 0.85 : 0.45,
      total: isDraft ? 2550.0 : 2250.0,
    },
    {
      description: "Setup and Design Fee",
      quantity: 1,
      unitPrice: isDraft ? 200.0 : 150.0,
      total: isDraft ? 200.0 : 150.0,
    },
    {
      description: isDraft ? "Standard Shipping" : "Express Shipping",
      quantity: 1,
      unitPrice: isDraft ? 40.0 : 50.0,
      total: isDraft ? 40.0 : 50.0,
    },
  ])

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<LineItem>({ description: "", quantity: 0, unitPrice: 0, total: 0 })

  // Payment history
  const [paymentHistory] = useState<PaymentRecord[]>(
    initialStatus === "paid"
      ? [
          { date: "2025-05-25", amount: 2450.0, method: "Bank Transfer", reference: "BT-2025-88431" },
        ]
      : isPartial
        ? [
            { date: "2025-05-10", amount: 2400.0, method: "Credit Card", reference: "CC-2025-41922" },
          ]
        : [],
  )

  // Record payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "bank-transfer",
    reference: "",
    date: new Date().toISOString().split("T")[0],
  })

  // Credit memo modal
  const [showCreditMemoModal, setShowCreditMemoModal] = useState(false)
  const [creditMemoReason, setCreditMemoReason] = useState("defective")

  // Calculated values
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const taxRateNum = parseFloat(taxRate) / 100
  const taxAmount = subtotal * taxRateNum
  const total = subtotal + taxAmount
  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0)
  const balanceDue = total - totalPaid

  const invoice = {
    id: invoiceId || "INV-2025-001",
    orderNumber: isDraft ? "j-22-sb-3000" : isOverdue ? "j-21-pc-1000" : isPartial ? "j-23-at-7500" : "j-18-pc-5000",
    customer: {
      name: isDraft ? "Sandbox" : isOverdue ? "PrintCo Ltd" : isPartial ? "Athletix" : "PrintCo Ltd",
      address: isDraft
        ? "789 Innovation Way\nSan Francisco, CA 94105"
        : "123 Business Street\nLondon, UK SW1A 1AA",
      email: isDraft ? "billing@sandbox.io" : isPartial ? "accounts@athletix.com" : "billing@printco.com",
      phone: isDraft ? "+1 415 555 0123" : "+44 20 7123 4567",
    },
    company: {
      name: "GelatoConnect",
      address: "456 Print Avenue\nBerlin, Germany 10115",
      email: "billing@gelatoconnect.com",
      phone: "+49 30 1234 5678",
      taxId: "DE123456789",
    },
    date: isDraft ? "2025-05-22" : isOverdue ? "2025-05-01" : "2025-05-21",
    dueDate: isDraft ? "2025-06-22" : isOverdue ? "2025-05-15" : "2025-06-20",
    paymentDate: initialStatus === "paid" ? "2025-05-25" : null,
    paymentMethod: initialStatus === "paid" ? "Bank Transfer" : null,
    notes: "Thank you for your business! Payment terms: Net 30 days.",
  }

  const getStatusBadge = (s: string) => {
    switch (s) {
      case "paid":
        return <Badge className="bg-success-10 text-success-90">Paid</Badge>
      case "sent":
        return <Badge className="bg-primary-10 text-primary-90">Sent</Badge>
      case "draft":
        return <Badge className="bg-neutral-10 text-neutral-70">Draft</Badge>
      case "overdue":
        return <Badge className="bg-danger-10 text-danger-90">Overdue</Badge>
      case "partial":
        return <Badge className="bg-warning-10 text-warning-90">Partial Payment</Badge>
      default:
        return <Badge className="bg-neutral-5 text-neutral-90">{s}</Badge>
    }
  }

  const startEditing = (index: number) => {
    if (status !== "draft") return
    setEditingIndex(index)
    setEditItem({ ...items[index] })
  }

  const saveEdit = () => {
    if (editingIndex === null) return
    const updated = [...items]
    updated[editingIndex] = { ...editItem, total: editItem.quantity * editItem.unitPrice }
    setItems(updated)
    setEditingIndex(null)
  }

  const cancelEdit = () => {
    setEditingIndex(null)
  }

  const handleSendToCustomer = () => {
    setStatus("sent")
    toast({
      title: "Invoice Sent",
      description: `Invoice ${invoice.id} has been sent to ${invoice.customer.name}.`,
    })
  }

  const handleRecordPayment = () => {
    const amount = parseFloat(paymentForm.amount)
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid payment amount." })
      return
    }
    toast({
      title: "Payment Recorded",
      description: `Payment of $${amount.toFixed(2)} recorded for invoice ${invoice.id}.`,
    })
    setShowPaymentModal(false)
    setPaymentForm({ amount: "", method: "bank-transfer", reference: "", date: new Date().toISOString().split("T")[0] })
  }

  const handleIssueCreditMemo = () => {
    toast({
      title: "Credit Memo Issued",
      description: `Credit memo CM-${invoice.id.replace("INV-", "")} issued for invoice ${invoice.id}.`,
    })
    setShowCreditMemoModal(false)
  }

  return (
    <div className="flex-1 flex flex-col bg-neutral-5">
      {/* Top Action Bar */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => goBack()}>
            Back to Invoices
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {status === "draft" && (
            <Button size="sm" onClick={handleSendToCustomer} className="bg-primary-50 text-white hover:bg-primary-60">
              <Send className="h-4 w-4 mr-1" />
              Send to Customer
            </Button>
          )}
          {(status === "sent" || status === "overdue" || status === "partial") && (
            <Button size="sm" variant="outline" onClick={() => setShowPaymentModal(true)}>
              <DollarSign className="h-4 w-4 mr-1" />
              Record Payment
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => setShowCreditMemoModal(true)}>
            <ReceiptText className="h-4 w-4 mr-1" />
            Issue Credit Memo
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-1" />
            Email
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Main Invoice Card */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-100 mb-2">INVOICE</h1>
                  <p className="text-lg text-neutral-60">#{invoice.id}</p>
                </div>
                <div className="text-right">
                  {getStatusBadge(status)}
                  <p className="text-sm text-neutral-50 mt-2">Order: {invoice.orderNumber}</p>
                </div>
              </div>

              {/* Company and Customer Info */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-neutral-100 mb-2">From:</h3>
                  <div className="text-neutral-60">
                    <p className="font-medium">{invoice.company.name}</p>
                    <p className="whitespace-pre-line">{invoice.company.address}</p>
                    <p>{invoice.company.email}</p>
                    <p>{invoice.company.phone}</p>
                    <p>Tax ID: {invoice.company.taxId}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-100 mb-2">Bill To:</h3>
                  <div className="text-neutral-60">
                    <p className="font-medium">{invoice.customer.name}</p>
                    <p className="whitespace-pre-line">{invoice.customer.address}</p>
                    <p>{invoice.customer.email}</p>
                    <p>{invoice.customer.phone}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-neutral-100 mb-1">Invoice Date:</h3>
                  <p className="text-neutral-60">{invoice.date}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-100 mb-1">Due Date:</h3>
                  <p className="text-neutral-60">{invoice.dueDate}</p>
                </div>
                {invoice.paymentDate && (
                  <div>
                    <h3 className="font-semibold text-neutral-100 mb-1">Payment Date:</h3>
                    <p className="text-neutral-60">{invoice.paymentDate}</p>
                    <p className="text-sm text-neutral-50">{invoice.paymentMethod}</p>
                  </div>
                )}
              </div>

              <Separator className="mb-6" />

              {/* Invoice Items - Editable for Draft */}
              <div className="mb-8">
                {status === "draft" && (
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-neutral-100">Line Items</h3>
                    <span className="text-xs text-neutral-50">Click a row to edit</span>
                  </div>
                )}
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-semibold text-neutral-100">Description</th>
                      <th className="text-right py-3 font-semibold text-neutral-100 w-24">Qty</th>
                      <th className="text-right py-3 font-semibold text-neutral-100 w-32">Unit Price</th>
                      <th className="text-right py-3 font-semibold text-neutral-100 w-32">Total</th>
                      {status === "draft" && <th className="w-20"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className={`border-b ${status === "draft" ? "cursor-pointer hover:bg-neutral-5" : ""}`}>
                        {editingIndex === index ? (
                          <>
                            <td className="py-2">
                              <Input
                                value={editItem.description}
                                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                                className="text-sm"
                              />
                            </td>
                            <td className="py-2 text-right">
                              <Input
                                type="number"
                                value={editItem.quantity}
                                onChange={(e) => setEditItem({ ...editItem, quantity: Number(e.target.value) })}
                                className="text-sm text-right w-24 ml-auto"
                              />
                            </td>
                            <td className="py-2 text-right">
                              <Input
                                type="number"
                                step="0.01"
                                value={editItem.unitPrice}
                                onChange={(e) => setEditItem({ ...editItem, unitPrice: Number(e.target.value) })}
                                className="text-sm text-right w-28 ml-auto"
                              />
                            </td>
                            <td className="py-2 text-right font-medium">
                              ${(editItem.quantity * editItem.unitPrice).toFixed(2)}
                            </td>
                            <td className="py-2 text-right">
                              <div className="flex gap-1 justify-end">
                                <Button variant="ghost" size="sm" onClick={saveEdit} className="h-7 w-7 p-0">
                                  <Check className="h-4 w-4 text-success-50" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={cancelEdit} className="h-7 w-7 p-0">
                                  <X className="h-4 w-4 text-danger-50" />
                                </Button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 text-neutral-60" onClick={() => startEditing(index)}>
                              {item.description}
                            </td>
                            <td className="py-3 text-right text-neutral-60" onClick={() => startEditing(index)}>
                              {item.quantity.toLocaleString()}
                            </td>
                            <td className="py-3 text-right text-neutral-60" onClick={() => startEditing(index)}>
                              ${item.unitPrice.toFixed(2)}
                            </td>
                            <td className="py-3 text-right font-medium" onClick={() => startEditing(index)}>
                              ${item.total.toFixed(2)}
                            </td>
                            {status === "draft" && (
                              <td className="py-3 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => startEditing(index)}
                                  className="h-7 w-7 p-0 opacity-40 hover:opacity-100"
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                              </td>
                            )}
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tax Calculation Section + Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-80">
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-60">Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-60">Tax Rate:</span>
                      <Select value={taxRate} onValueChange={setTaxRate}>
                        <SelectTrigger className="w-24 h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="20">20%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="font-medium">${taxAmount.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-bold">${total.toFixed(2)}</span>
                  </div>
                  {totalPaid > 0 && (
                    <>
                      <div className="flex justify-between py-1">
                        <span className="text-neutral-60">Paid:</span>
                        <span className="text-success-70 font-medium">-${totalPaid.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-semibold">Balance Due:</span>
                        <span className="font-bold text-danger-70">${balanceDue.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div>
                  <h3 className="font-semibold text-neutral-100 mb-2">Notes:</h3>
                  <p className="text-neutral-60">{invoice.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment History Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-neutral-50" />
                  Payment History
                </h2>
                {(status === "sent" || status === "overdue" || status === "partial") && (
                  <Button size="sm" variant="outline" onClick={() => setShowPaymentModal(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Record Payment
                  </Button>
                )}
              </div>
              {paymentHistory.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-medium text-neutral-60">Date</th>
                      <th className="text-left py-3 font-medium text-neutral-60">Method</th>
                      <th className="text-left py-3 font-medium text-neutral-60">Reference</th>
                      <th className="text-right py-3 font-medium text-neutral-60">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 text-neutral-60">{payment.date}</td>
                        <td className="py-3">
                          <Badge variant="outline" className="font-normal">
                            {payment.method}
                          </Badge>
                        </td>
                        <td className="py-3 font-mono text-sm text-neutral-60">{payment.reference}</td>
                        <td className="py-3 text-right font-semibold text-success-70">${payment.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 text-neutral-50">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-neutral-30" />
                  <p>No payments recorded yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* PDF Preview Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-neutral-50" />
                PDF Preview
              </h2>
              <div className="border-2 border-dashed border-neutral-20 rounded-lg p-8">
                <div className="max-w-md mx-auto text-center">
                  {/* Simulated PDF preview */}
                  <div className="bg-neutral-5 rounded-lg p-6 mb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-left">
                        <div className="w-32 h-8 bg-primary-50 rounded flex items-center justify-center text-white text-sm font-bold">
                          GelatoConnect
                        </div>
                        <p className="text-xs text-neutral-50 mt-1">{invoice.company.address.replace("\n", ", ")}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">INVOICE</p>
                        <p className="text-xs text-neutral-50">#{invoice.id}</p>
                      </div>
                    </div>
                    <Separator className="mb-3" />
                    <div className="space-y-1">
                      {items.map((item, i) => (
                        <div key={i} className="flex justify-between text-xs text-neutral-60">
                          <span className="truncate mr-4">{item.description}</span>
                          <span className="font-medium">${item.total.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between text-sm font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-50 mb-3">
                    Preview of the branded PDF invoice with company logo and details.
                  </p>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download Full PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record a full or partial payment for invoice {invoice.id}. Balance due: ${balanceDue.toFixed(2)}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-40" />
                <Input
                  type="number"
                  step="0.01"
                  placeholder={balanceDue.toFixed(2)}
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setPaymentForm({ ...paymentForm, amount: balanceDue.toFixed(2) })}
                >
                  Full Amount (${balanceDue.toFixed(2)})
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Payment Method</label>
              <Select value={paymentForm.method} onValueChange={(v) => setPaymentForm({ ...paymentForm, method: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Reference Number</label>
              <Input
                placeholder="e.g. BT-2025-12345"
                value={paymentForm.reference}
                onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Payment Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-40" />
                <Input
                  type="date"
                  value={paymentForm.date}
                  onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleRecordPayment} className="bg-primary-50 text-white hover:bg-primary-60">
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Credit Memo Modal */}
      <Dialog open={showCreditMemoModal} onOpenChange={setShowCreditMemoModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Issue Credit Memo</DialogTitle>
            <DialogDescription>
              Create a credit memo linked to invoice {invoice.id}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-neutral-5 rounded-md p-3 text-sm">
              <p className="text-neutral-60">
                <span className="font-medium text-neutral-80">Original Invoice:</span> {invoice.id}
              </p>
              <p className="text-neutral-60">
                <span className="font-medium text-neutral-80">Customer:</span> {invoice.customer.name}
              </p>
              <p className="text-neutral-60">
                <span className="font-medium text-neutral-80">Invoice Total:</span> ${total.toFixed(2)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-70 mb-1.5 block">Reason</label>
              <Select value={creditMemoReason} onValueChange={setCreditMemoReason}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defective">Defective Product</SelectItem>
                  <SelectItem value="overcharge">Overcharge / Billing Error</SelectItem>
                  <SelectItem value="return">Product Return</SelectItem>
                  <SelectItem value="discount">Post-Sale Discount</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreditMemoModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleIssueCreditMemo} className="bg-primary-50 text-white hover:bg-primary-60">
              <ReceiptText className="h-4 w-4 mr-1" />
              Issue Credit Memo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
