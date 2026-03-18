"use client"

import { ArrowLeft, Download, Printer, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface InvoiceDetailsProps {
  invoiceId: string
  onBackClick: () => void
}

export default function InvoiceDetails({ invoiceId, onBackClick }: InvoiceDetailsProps) {
  // Sample invoice data - in real app this would be fetched based on invoiceId
  const invoice = {
    id: "INV-2025-001",
    orderNumber: "j-18-pc-5000",
    customer: {
      name: "PrintCo Ltd",
      address: "123 Business Street\nLondon, UK SW1A 1AA",
      email: "billing@printco.com",
      phone: "+44 20 7123 4567",
    },
    company: {
      name: "GelatoConnect",
      address: "456 Print Avenue\nBerlin, Germany 10115",
      email: "billing@gelatoconnect.com",
      phone: "+49 30 1234 5678",
      taxId: "DE123456789",
    },
    date: "2025-05-21",
    dueDate: "2025-06-20",
    status: "paid",
    paymentDate: "2025-05-25",
    paymentMethod: "Bank Transfer",
    items: [
      {
        description: "PrintCo Tri-fold Brochures - A4 Marketing Brochure",
        quantity: 5000,
        unitPrice: 0.45,
        total: 2250.0,
      },
      {
        description: "Setup and Design Fee",
        quantity: 1,
        unitPrice: 150.0,
        total: 150.0,
      },
      {
        description: "Express Shipping",
        quantity: 1,
        unitPrice: 50.0,
        total: 50.0,
      },
    ],
    subtotal: 2450.0,
    tax: 0.0,
    total: 2450.0,
    notes: "Thank you for your business! Payment terms: Net 30 days.",
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-success-10 text-success-90">Paid</Badge>
      case "unpaid":
        return <Badge className="bg-warning-10 text-warning-90">Unpaid</Badge>
      default:
        return <Badge className="bg-neutral-5 text-neutral-90">{status}</Badge>
    }
  }

  return (
    <div className="h-screen flex flex-col bg-neutral-5">
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2819%29-170UxeV7cg8b7kNjFagZkz9quPldwr.png"
            alt="GelatoConnect Logo"
            className="h-6 w-6 mr-2"
          />
          <span className="font-bold text-lg">GelatoConnect</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBackClick}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Invoices
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
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border">
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-neutral-100 mb-2">INVOICE</h1>
                <p className="text-lg text-neutral-60">#{invoice.id}</p>
              </div>
              <div className="text-right">
                {getStatusBadge(invoice.status)}
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

            {/* Invoice Items */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-semibold text-neutral-100">Description</th>
                    <th className="text-right py-3 font-semibold text-neutral-100">Qty</th>
                    <th className="text-right py-3 font-semibold text-neutral-100">Unit Price</th>
                    <th className="text-right py-3 font-semibold text-neutral-100">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 text-neutral-60">{item.description}</td>
                      <td className="py-3 text-right text-neutral-60">{item.quantity.toLocaleString()}</td>
                      <td className="py-3 text-right text-neutral-60">${item.unitPrice.toFixed(2)}</td>
                      <td className="py-3 text-right font-medium">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="text-neutral-60">Subtotal:</span>
                  <span className="font-medium">${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-neutral-60">Tax:</span>
                  <span className="font-medium">${invoice.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between py-2">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold">${invoice.total.toFixed(2)}</span>
                </div>
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
      </div>
    </div>
  )
}
