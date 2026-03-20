"use client"

import { useState } from "react"
import { Eye, CheckCircle, Clock, FileText, AlertTriangle, Send, Download, Search, Zap, ChevronDown, FileEdit, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigation } from "@/lib/navigation-context"
import { useToast } from "@/hooks/use-toast"

type InvoiceStatus = "paid" | "sent" | "draft" | "overdue" | "partial"

interface Invoice {
  id: string
  orderNumber: string
  customer: string
  amount: string
  amountNum: number
  paidAmount: number
  date: string
  dueDate: string
  status: InvoiceStatus
  paymentDate: string | null
  daysOverdue?: number
}

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "partial", label: "Partial Payment" },
] as const

export default function InvoiceManagement() {
  const { navigateTo } = useNavigation()
  const { toast } = useToast()
  const [selectedCustomer, setSelectedCustomer] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(new Set())

  // Sample invoice data with expanded statuses
  const invoices: Invoice[] = [
    {
      id: "INV-2025-001",
      orderNumber: "j-18-pc-5000",
      customer: "PrintCo Ltd",
      amount: "$2,450.00",
      amountNum: 2450.0,
      paidAmount: 2450.0,
      date: "2025-05-21",
      dueDate: "2025-06-20",
      status: "paid",
      paymentDate: "2025-05-25",
    },
    {
      id: "INV-2025-002",
      orderNumber: "j-19-sb-2500",
      customer: "Sandbox",
      amount: "$1,875.50",
      amountNum: 1875.5,
      paidAmount: 0,
      date: "2025-05-21",
      dueDate: "2025-06-20",
      status: "sent",
      paymentDate: null,
    },
    {
      id: "INV-2025-003",
      orderNumber: "j-20-at-10000",
      customer: "Athletix",
      amount: "$5,200.00",
      amountNum: 5200.0,
      paidAmount: 5200.0,
      date: "2025-05-21",
      dueDate: "2025-06-20",
      status: "paid",
      paymentDate: "2025-05-23",
    },
    {
      id: "INV-2025-004",
      orderNumber: "j-21-pc-1000",
      customer: "PrintCo Ltd",
      amount: "$890.25",
      amountNum: 890.25,
      paidAmount: 0,
      date: "2025-05-01",
      dueDate: "2025-05-15",
      status: "overdue",
      paymentDate: null,
      daysOverdue: 15,
    },
    {
      id: "INV-2025-005",
      orderNumber: "j-22-sb-3000",
      customer: "Sandbox",
      amount: "$3,150.00",
      amountNum: 3150.0,
      paidAmount: 0,
      date: "2025-05-22",
      dueDate: "2025-06-22",
      status: "draft",
      paymentDate: null,
    },
    {
      id: "INV-2025-006",
      orderNumber: "j-23-at-7500",
      customer: "Athletix",
      amount: "$4,800.00",
      amountNum: 4800.0,
      paidAmount: 2400.0,
      date: "2025-04-28",
      dueDate: "2025-05-28",
      status: "partial",
      paymentDate: null,
    },
    {
      id: "INV-2025-007",
      orderNumber: "j-24-pc-2000",
      customer: "PrintCo Ltd",
      amount: "$1,200.00",
      amountNum: 1200.0,
      paidAmount: 0,
      date: "2025-04-15",
      dueDate: "2025-05-01",
      status: "overdue",
      paymentDate: null,
      daysOverdue: 29,
    },
  ]

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesCustomer = selectedCustomer === "all" || invoice.customer === selectedCustomer
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || invoice.status === activeTab
    return matchesCustomer && matchesSearch && matchesTab
  })

  const statusCounts = invoices.reduce(
    (acc, inv) => {
      acc[inv.status] = (acc[inv.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const toggleSelect = (id: string) => {
    setSelectedInvoices((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedInvoices.size === filteredInvoices.length) {
      setSelectedInvoices(new Set())
    } else {
      setSelectedInvoices(new Set(filteredInvoices.map((i) => i.id)))
    }
  }

  const handleBulkSend = () => {
    toast({
      title: "Invoices Sent",
      description: `${selectedInvoices.size} invoice(s) have been sent to customers.`,
    })
    setSelectedInvoices(new Set())
  }

  const handleBulkDownload = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${selectedInvoices.size} invoice(s) as PDF.`,
    })
    setSelectedInvoices(new Set())
  }

  const handleAutoGenerate = () => {
    toast({
      title: "Invoice Generated",
      description: "Invoice INV-2025-008 has been auto-generated from order j-25-pc-4000.",
    })
  }

  const getStatusBadge = (invoice: Invoice) => {
    switch (invoice.status) {
      case "paid":
        return (
          <Badge className="bg-success-10 text-success-90 rounded-full">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "sent":
        return (
          <Badge className="bg-primary-10 text-primary-90 rounded-full">
            <Send className="h-3 w-3 mr-1" />
            Sent
          </Badge>
        )
      case "draft":
        return (
          <Badge className="bg-neutral-10 text-neutral-70 rounded-full">
            <FileEdit className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        )
      case "overdue":
        return (
          <div className="flex flex-col gap-1">
            <Badge className="bg-danger-10 text-danger-90 rounded-full">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Overdue
            </Badge>
            {invoice.daysOverdue && (
              <span className="text-xs text-danger-90 font-medium">{invoice.daysOverdue} days overdue</span>
            )}
          </div>
        )
      case "partial":
        return (
          <div className="flex flex-col gap-1">
            <Badge className="bg-warning-10 text-warning-90 rounded-full">
              <CreditCard className="h-3 w-3 mr-1" />
              Partial
            </Badge>
            <span className="text-xs text-warning-90 font-medium">
              ${invoice.paidAmount.toLocaleString()} / {invoice.amount}
            </span>
          </div>
        )
      default:
        return <Badge className="bg-neutral-5 text-neutral-90 rounded-full">{invoice.status}</Badge>
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleAutoGenerate}>
              <Zap className="h-4 w-4 mr-1" />
              Auto-generate Invoice
            </Button>
            <div className="text-sm text-neutral-50">Synced from QuickBooks &bull; Last updated: 2 minutes ago</div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-1 mb-4 border-b">
          {STATUS_TABS.map((tab) => {
            const count = tab.value === "all" ? invoices.length : statusCounts[tab.value] || 0
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.value
                    ? "border-black text-neutral-100 font-semibold"
                    : "border-transparent text-neutral-50 hover:text-neutral-80"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                    activeTab === tab.value ? "bg-primary-10 text-primary-50" : "bg-neutral-10 text-neutral-50"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-40" />
            <Input
              placeholder="Search by invoice number or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10"
            />
          </div>
          <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="PrintCo Ltd">PrintCo Ltd</SelectItem>
              <SelectItem value="Athletix">Athletix</SelectItem>
              <SelectItem value="Sandbox">Sandbox</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions Bar */}
        {selectedInvoices.size > 0 && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-primary-5 border border-primary-20 rounded-md">
            <span className="text-sm font-medium text-primary-70">{selectedInvoices.size} invoice(s) selected</span>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm" onClick={handleBulkSend}>
                <Send className="h-4 w-4 mr-1" />
                Bulk Send
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkDownload}>
                <Download className="h-4 w-4 mr-1" />
                Bulk Download
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedInvoices(new Set())}>
                Clear Selection
              </Button>
            </div>
          </div>
        )}

        <div className="border rounded-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-5 border-b">
                  <th className="p-4 text-left w-10">
                    <Checkbox
                      checked={filteredInvoices.length > 0 && selectedInvoices.size === filteredInvoices.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-4 text-left font-medium text-neutral-60">Invoice ID</th>
                  <th className="p-4 text-left font-medium text-neutral-60">Order Number</th>
                  <th className="p-4 text-left font-medium text-neutral-60">Customer</th>
                  <th className="p-4 text-left font-medium text-neutral-60">Amount</th>
                  <th className="p-4 text-left font-medium text-neutral-60">Invoice Date</th>
                  <th className="p-4 text-left font-medium text-neutral-60">Due Date</th>
                  <th className="p-4 text-left font-medium text-neutral-60">Status</th>
                  <th className="p-4 text-left font-medium text-neutral-60">Payment Date</th>
                  <th className="p-4 text-left font-medium text-neutral-60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-neutral-5">
                    <td className="p-4">
                      <Checkbox
                        checked={selectedInvoices.has(invoice.id)}
                        onCheckedChange={() => toggleSelect(invoice.id)}
                      />
                    </td>
                    <td className="p-4 font-mono text-sm">{invoice.id}</td>
                    <td className="p-4 font-mono text-sm">{invoice.orderNumber}</td>
                    <td className="p-4">{invoice.customer}</td>
                    <td className="p-4 font-semibold">{invoice.amount}</td>
                    <td className="p-4">{invoice.date}</td>
                    <td className="p-4">{invoice.dueDate}</td>
                    <td className="p-4">{getStatusBadge(invoice)}</td>
                    <td className="p-4">{invoice.paymentDate || "-"}</td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigateTo("invoice-detail", { invoiceId: invoice.id })
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-neutral-40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-100 mb-2">No invoices found</h3>
            <p className="text-neutral-50">
              {searchTerm || selectedCustomer !== "all" || activeTab !== "all"
                ? "Try adjusting your search, filter, or status tab."
                : "Invoices will appear here once orders are completed and synced from QuickBooks."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
