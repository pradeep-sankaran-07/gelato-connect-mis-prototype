"use client"

import { useState } from "react"
import { ArrowLeft, Eye, CheckCircle, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LeftMenu from "@/components/left-menu"

interface InvoiceManagementProps {
  onBackClick: () => void
  onInvoiceClick: (invoiceId: string) => void
  onSchedulingClick: () => void
  onInventoryClick: () => void
  onControlPanelClick: () => void
  onPerformanceClick: () => void
  onCustomersClick: () => void
  onProductionTrackerClick: () => void
  onProductionStationsClick: () => void
  onLogisticsAnalyticsClick: () => void
  onShipmentsClick: () => void
  onTemplateSettingsClick: () => void
}

export default function InvoiceManagement({
  onBackClick,
  onInvoiceClick,
  onSchedulingClick,
  onInventoryClick,
  onControlPanelClick,
  onPerformanceClick,
  onCustomersClick,
  onProductionTrackerClick,
  onProductionStationsClick,
  onLogisticsAnalyticsClick,
  onShipmentsClick,
  onTemplateSettingsClick,
}: InvoiceManagementProps) {
  const [selectedCustomer, setSelectedCustomer] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Sample invoice data from external ERP (QuickBooks)
  const invoices = [
    {
      id: "INV-2025-001",
      orderNumber: "j-18-pc-5000",
      customer: "PrintCo Ltd",
      amount: "$2,450.00",
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
      date: "2025-05-21",
      dueDate: "2025-06-20",
      status: "unpaid",
      paymentDate: null,
    },
    {
      id: "INV-2025-003",
      orderNumber: "j-20-at-10000",
      customer: "Athletix",
      amount: "$5,200.00",
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
      date: "2025-05-20",
      dueDate: "2025-06-19",
      status: "unpaid",
      paymentDate: null,
    },
  ]

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesCustomer = selectedCustomer === "all" || invoice.customer === selectedCustomer
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCustomer && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-success-10 text-success-90 rounded-full">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "unpaid":
        return (
          <Badge className="bg-warning-10 text-warning-90 rounded-full">
            <Clock className="h-3 w-3 mr-1" />
            Unpaid
          </Badge>
        )
      default:
        return <Badge className="bg-neutral-5 text-neutral-90 rounded-full">{status}</Badge>
    }
  }

  const handleNavigate = (page: string) => {
    switch (page) {
      case "control-panel":
        onControlPanelClick()
        break
      case "performance":
        onPerformanceClick()
        break
      case "customers":
        onCustomersClick()
        break
      case "estimates":
        onBackClick()
        break
      case "orders":
        onBackClick()
        break
      case "scheduling":
        onSchedulingClick()
        break
      case "inventory":
        onInventoryClick()
        break
      case "production-tracker":
        onProductionTrackerClick()
        break
      case "production-stations":
        onProductionStationsClick()
        break
      case "logistics-analytics":
        onLogisticsAnalyticsClick()
        break
      case "shipments":
        onShipmentsClick()
        break
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white p-4 flex items-center justify-between border-b">
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
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Invoices</h1>
              <div className="text-sm text-neutral-50">Synced from QuickBooks • Last updated: 2 minutes ago</div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search invoices, order numbers, or customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
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

            <div className="border rounded-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-5 border-b">
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
                        <td className="p-4 font-mono text-sm">{invoice.id}</td>
                        <td className="p-4 font-mono text-sm">{invoice.orderNumber}</td>
                        <td className="p-4">{invoice.customer}</td>
                        <td className="p-4 font-semibold">{invoice.amount}</td>
                        <td className="p-4">{invoice.date}</td>
                        <td className="p-4">{invoice.dueDate}</td>
                        <td className="p-4">{getStatusBadge(invoice.status)}</td>
                        <td className="p-4">{invoice.paymentDate || "-"}</td>
                        <td className="p-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              console.log("[v0] Invoice clicked:", invoice.id)
                              console.log("[v0] onInvoiceClick function:", typeof onInvoiceClick)
                              onInvoiceClick(invoice.id)
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
                  {searchTerm || selectedCustomer !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Invoices will appear here once orders are completed and synced from QuickBooks."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
