"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Info, Search, Plus, Building2, Mail, Phone, User, Clock, FileText, MessageSquare, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigation } from "@/lib/navigation-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Sample customer data
const customers = [
  { id: "acme-corp", name: "Acme Corp", status: "Active", totalOrders: 142, totalRevenue: 284500 },
  { id: "beta-solutions", name: "Beta Solutions", status: "Active", totalOrders: 87, totalRevenue: 156200 },
  { id: "gamma-industries", name: "Gamma Industries", status: "Active", totalOrders: 215, totalRevenue: 523800 },
  { id: "delta-enterprises", name: "Delta Enterprises", status: "Inactive", totalOrders: 23, totalRevenue: 34100 },
  { id: "epsilon-tech", name: "Epsilon Tech", status: "Active", totalOrders: 98, totalRevenue: 198700 },
  { id: "zeta-systems", name: "Zeta Systems", status: "Active", totalOrders: 64, totalRevenue: 112400 },
  { id: "theta-innovations", name: "Theta Innovations", status: "Active", totalOrders: 41, totalRevenue: 67300 },
  { id: "omega-designs", name: "Omega Designs", status: "Active", totalOrders: 178, totalRevenue: 412600 },
]

// Sample customer details
const customerDetails: Record<string, {
  name: string
  currency: string
  estimationEnabled: string
  contacts: Array<{ name: string; email: string; phone: string; primary: boolean; role: string }>
  salesRep: string
  cse: string
  estimator: string
  invoicingTerms: string
  invoiceEmail: string
  invoiceTrigger: string
  daysAfterShipment?: number
  consolidationType?: string
  creditLimit: number
  paymentTerms: string
  accountId: string
  address: string
  website: string
}> = {
  "acme-corp": {
    name: "Acme Corp",
    currency: "British Poundsterling",
    estimationEnabled: "Yes",
    contacts: [
      { name: "Jane Smith", email: "jane@acmecorp.com", phone: "+44111111111", primary: true, role: "Procurement Manager" },
      { name: "John Doe", email: "john@acmecorp.com", phone: "+44112345212", primary: false, role: "Creative Director" },
      { name: "Sarah Johnson", email: "sarah@acmecorp.com", phone: "+44112345213", primary: false, role: "Finance Director" },
    ],
    salesRep: "Mary Purwanegara",
    cse: "Josh Callahan",
    estimator: "Amy Farah Fowler",
    invoicingTerms: "Net 30",
    invoiceEmail: "accounts@acmecorp.com",
    invoiceTrigger: "automatic",
    creditLimit: 50000,
    paymentTerms: "Net 30",
    accountId: "ACME-2024-001",
    address: "123 Business Park, London, UK EC1A 1BB",
    website: "www.acmecorp.com",
  },
  "beta-solutions": {
    name: "Beta Solutions",
    currency: "US Dollar",
    estimationEnabled: "Yes",
    contacts: [
      { name: "Michael Brown", email: "michael@betasolutions.com", phone: "+1555123456", primary: true, role: "Operations Manager" },
      { name: "Emily Clark", email: "emily@betasolutions.com", phone: "+1555789012", primary: false, role: "Buyer" },
    ],
    salesRep: "David Wilson",
    cse: "Rebecca Moore",
    estimator: "James Taylor",
    invoicingTerms: "Net 15",
    invoiceEmail: "finance@betasolutions.com",
    invoiceTrigger: "days_after",
    daysAfterShipment: 7,
    creditLimit: 25000,
    paymentTerms: "Net 15",
    accountId: "BETA-2024-002",
    address: "456 Commerce Ave, New York, NY 10001",
    website: "www.betasolutions.com",
  },
  "gamma-industries": {
    name: "Gamma Industries",
    currency: "Euro",
    estimationEnabled: "Yes",
    contacts: [
      { name: "Robert Martin", email: "robert@gammaindustries.eu", phone: "+33123456789", primary: true, role: "CEO" },
      { name: "Sophie Dubois", email: "sophie@gammaindustries.eu", phone: "+33987654321", primary: false, role: "Print Buyer" },
    ],
    salesRep: "Pierre Leclerc",
    cse: "Marie Dupont",
    estimator: "Jean Rousseau",
    invoicingTerms: "Net 45",
    invoiceEmail: "accounting@gammaindustries.eu",
    invoiceTrigger: "consolidated",
    consolidationType: "monthly",
    creditLimit: 100000,
    paymentTerms: "Net 45",
    accountId: "GAMMA-2024-003",
    address: "78 Rue de l'Industrie, Paris, France 75008",
    website: "www.gammaindustries.eu",
  },
  "delta-enterprises": {
    name: "Delta Enterprises",
    currency: "Japanese Yen",
    estimationEnabled: "No",
    contacts: [{ name: "Takashi Yamamoto", email: "takashi@deltaent.jp", phone: "+81312345678", primary: true, role: "General Manager" }],
    salesRep: "Kenji Nakamura",
    cse: "Yuki Tanaka",
    estimator: "Hiroshi Suzuki",
    invoicingTerms: "Net 60",
    invoiceEmail: "finance@deltaent.jp",
    invoiceTrigger: "manual",
    creditLimit: 10000,
    paymentTerms: "Net 60",
    accountId: "DELTA-2024-004",
    address: "1-2-3 Shibuya, Tokyo, Japan 150-0002",
    website: "www.deltaent.jp",
  },
  "epsilon-tech": {
    name: "Epsilon Tech",
    currency: "British Poundsterling",
    estimationEnabled: "Yes",
    contacts: [
      { name: "William Harris", email: "william@epsilontech.co.uk", phone: "+44123456789", primary: true, role: "Technical Director" },
      { name: "Elizabeth Taylor", email: "elizabeth@epsilontech.co.uk", phone: "+44987654321", primary: false, role: "Marketing Manager" },
    ],
    salesRep: "George Davies",
    cse: "Victoria Wilson",
    estimator: "Edward Thompson",
    invoicingTerms: "Net 30",
    invoiceEmail: "accounts@epsilontech.co.uk",
    invoiceTrigger: "automatic",
    creditLimit: 40000,
    paymentTerms: "Net 30",
    accountId: "EPSILON-2024-005",
    address: "45 Tech Drive, Manchester, UK M1 1AA",
    website: "www.epsilontech.co.uk",
  },
  "zeta-systems": {
    name: "Zeta Systems",
    currency: "Australian Dollar",
    estimationEnabled: "Yes",
    contacts: [{ name: "James Wilson", email: "james@zetasystems.com.au", phone: "+61234567890", primary: true, role: "Owner" }],
    salesRep: "Sarah Johnson",
    cse: "Michael Brown",
    estimator: "Emma Davis",
    invoicingTerms: "Net 15",
    invoiceEmail: "billing@zetasystems.com.au",
    invoiceTrigger: "consolidated",
    consolidationType: "weekly",
    creditLimit: 20000,
    paymentTerms: "Net 15",
    accountId: "ZETA-2024-006",
    address: "12 Harbour Road, Sydney, NSW 2000",
    website: "www.zetasystems.com.au",
  },
  "theta-innovations": {
    name: "Theta Innovations",
    currency: "Canadian Dollar",
    estimationEnabled: "Yes",
    contacts: [
      { name: "David Miller", email: "david@thetainnovations.ca", phone: "+1416123456", primary: true, role: "VP Operations" },
      { name: "Jennifer Wilson", email: "jennifer@thetainnovations.ca", phone: "+1416789012", primary: false, role: "Procurement" },
    ],
    salesRep: "Robert Clark",
    cse: "Patricia Moore",
    estimator: "Thomas Anderson",
    invoicingTerms: "Net 30",
    invoiceEmail: "accounts@thetainnovations.ca",
    invoiceTrigger: "days_after",
    daysAfterShipment: 14,
    creditLimit: 15000,
    paymentTerms: "Net 30",
    accountId: "THETA-2024-007",
    address: "800 Bay St, Toronto, ON M5S 1Z4",
    website: "www.thetainnovations.ca",
  },
  "omega-designs": {
    name: "Omega Designs",
    currency: "Singapore Dollar",
    estimationEnabled: "Yes",
    contacts: [
      { name: "Li Wei", email: "liwei@omegadesigns.sg", phone: "+6561234567", primary: true, role: "Managing Director" },
      { name: "Chen Mei", email: "chenmei@omegadesigns.sg", phone: "+6567890123", primary: false, role: "Art Director" },
    ],
    salesRep: "Tan Hui Ling",
    cse: "Wong Jian Hao",
    estimator: "Lim Siew Mei",
    invoicingTerms: "Net 45",
    invoiceEmail: "finance@omegadesigns.sg",
    invoiceTrigger: "manual",
    creditLimit: 80000,
    paymentTerms: "Net 45",
    accountId: "OMEGA-2024-008",
    address: "50 Raffles Place, Singapore 048623",
    website: "www.omegadesigns.sg",
  },
}

// Sample order data per customer
const customerOrders: Record<string, Array<{ id: string; date: string; items: string; status: string; amount: number }>> = {
  "acme-corp": [
    { id: "ORD-2024-001", date: "2024-03-15", items: "Business Cards (5000)", status: "Delivered", amount: 1250 },
    { id: "ORD-2024-012", date: "2024-03-10", items: "Brochures A4 Tri-fold (2000)", status: "In Production", amount: 3400 },
    { id: "ORD-2024-023", date: "2024-03-05", items: "Letterheads (10000)", status: "Shipped", amount: 2100 },
    { id: "ORD-2024-034", date: "2024-02-28", items: "Posters A1 (500)", status: "Delivered", amount: 4500 },
    { id: "ORD-2024-045", date: "2024-02-20", items: "Presentation Folders (1000)", status: "Delivered", amount: 5600 },
    { id: "ORD-2024-056", date: "2024-02-15", items: "Stickers (20000)", status: "Delivered", amount: 1800 },
    { id: "ORD-2024-067", date: "2024-01-30", items: "Annual Report (500)", status: "Delivered", amount: 12500 },
  ],
  "beta-solutions": [
    { id: "ORD-2024-002", date: "2024-03-14", items: "Postcards (3000)", status: "Awaiting Approval", amount: 890 },
    { id: "ORD-2024-015", date: "2024-03-08", items: "Banners (10)", status: "Delivered", amount: 2200 },
    { id: "ORD-2024-028", date: "2024-02-25", items: "Flyers A5 (5000)", status: "Delivered", amount: 1100 },
  ],
  "gamma-industries": [
    { id: "ORD-2024-003", date: "2024-03-13", items: "Catalogues (1000)", status: "In Production", amount: 8900 },
    { id: "ORD-2024-016", date: "2024-03-07", items: "Business Cards (10000)", status: "Delivered", amount: 2400 },
    { id: "ORD-2024-029", date: "2024-02-22", items: "Packaging Boxes (5000)", status: "Delivered", amount: 15600 },
    { id: "ORD-2024-040", date: "2024-02-10", items: "Labels (50000)", status: "Delivered", amount: 4200 },
    { id: "ORD-2024-051", date: "2024-01-28", items: "Product Manuals (2000)", status: "Delivered", amount: 6800 },
  ],
  "delta-enterprises": [
    { id: "ORD-2024-004", date: "2024-02-01", items: "Business Cards (1000)", status: "Delivered", amount: 320 },
    { id: "ORD-2024-017", date: "2024-01-15", items: "Envelopes (2000)", status: "Delivered", amount: 680 },
  ],
  "epsilon-tech": [
    { id: "ORD-2024-005", date: "2024-03-12", items: "Tech Spec Sheets (3000)", status: "Shipped", amount: 2700 },
    { id: "ORD-2024-018", date: "2024-03-01", items: "Event Banners (8)", status: "Delivered", amount: 3200 },
    { id: "ORD-2024-031", date: "2024-02-18", items: "Notebooks Branded (500)", status: "Delivered", amount: 4100 },
  ],
  "zeta-systems": [
    { id: "ORD-2024-006", date: "2024-03-11", items: "Flyers DL (10000)", status: "In Production", amount: 1400 },
    { id: "ORD-2024-019", date: "2024-02-28", items: "Calendars (500)", status: "Delivered", amount: 3800 },
  ],
  "theta-innovations": [
    { id: "ORD-2024-007", date: "2024-03-10", items: "Brochures (1500)", status: "Awaiting Approval", amount: 2100 },
    { id: "ORD-2024-020", date: "2024-02-20", items: "Posters A2 (200)", status: "Delivered", amount: 1600 },
  ],
  "omega-designs": [
    { id: "ORD-2024-008", date: "2024-03-14", items: "Art Prints (100)", status: "In Production", amount: 5400 },
    { id: "ORD-2024-021", date: "2024-03-06", items: "Lookbook (500)", status: "Shipped", amount: 9200 },
    { id: "ORD-2024-033", date: "2024-02-20", items: "Packaging Sleeves (3000)", status: "Delivered", amount: 7100 },
    { id: "ORD-2024-044", date: "2024-02-05", items: "Stationery Set (1000)", status: "Delivered", amount: 6300 },
  ],
}

// Sample invoice data per customer
const customerInvoices: Record<string, Array<{ id: string; date: string; dueDate: string; amount: number; status: string; orderId: string }>> = {
  "acme-corp": [
    { id: "INV-2024-001", date: "2024-03-15", dueDate: "2024-04-14", amount: 1250, status: "Paid", orderId: "ORD-2024-001" },
    { id: "INV-2024-012", date: "2024-03-05", dueDate: "2024-04-04", amount: 2100, status: "Sent", orderId: "ORD-2024-023" },
    { id: "INV-2024-023", date: "2024-02-28", dueDate: "2024-03-29", amount: 4500, status: "Paid", orderId: "ORD-2024-034" },
    { id: "INV-2024-034", date: "2024-02-20", dueDate: "2024-03-21", amount: 5600, status: "Paid", orderId: "ORD-2024-045" },
    { id: "INV-2024-045", date: "2024-02-15", dueDate: "2024-03-16", amount: 1800, status: "Overdue", orderId: "ORD-2024-056" },
    { id: "INV-2024-056", date: "2024-01-30", dueDate: "2024-03-01", amount: 12500, status: "Paid", orderId: "ORD-2024-067" },
  ],
  "beta-solutions": [
    { id: "INV-2024-002", date: "2024-03-08", dueDate: "2024-03-23", amount: 2200, status: "Paid", orderId: "ORD-2024-015" },
    { id: "INV-2024-015", date: "2024-02-25", dueDate: "2024-03-12", amount: 1100, status: "Paid", orderId: "ORD-2024-028" },
  ],
  "gamma-industries": [
    { id: "INV-2024-003", date: "2024-03-07", dueDate: "2024-04-21", amount: 2400, status: "Sent", orderId: "ORD-2024-016" },
    { id: "INV-2024-016", date: "2024-02-22", dueDate: "2024-04-07", amount: 15600, status: "Paid", orderId: "ORD-2024-029" },
    { id: "INV-2024-027", date: "2024-02-10", dueDate: "2024-03-26", amount: 4200, status: "Paid", orderId: "ORD-2024-040" },
    { id: "INV-2024-038", date: "2024-01-28", dueDate: "2024-03-13", amount: 6800, status: "Paid", orderId: "ORD-2024-051" },
  ],
  "delta-enterprises": [
    { id: "INV-2024-004", date: "2024-02-01", dueDate: "2024-04-01", amount: 320, status: "Paid", orderId: "ORD-2024-004" },
    { id: "INV-2024-017", date: "2024-01-15", dueDate: "2024-03-15", amount: 680, status: "Overdue", orderId: "ORD-2024-017" },
  ],
  "epsilon-tech": [
    { id: "INV-2024-005", date: "2024-03-01", dueDate: "2024-03-31", amount: 3200, status: "Sent", orderId: "ORD-2024-018" },
    { id: "INV-2024-018", date: "2024-02-18", dueDate: "2024-03-19", amount: 4100, status: "Paid", orderId: "ORD-2024-031" },
  ],
  "zeta-systems": [
    { id: "INV-2024-006", date: "2024-02-28", dueDate: "2024-03-14", amount: 3800, status: "Paid", orderId: "ORD-2024-019" },
  ],
  "theta-innovations": [
    { id: "INV-2024-007", date: "2024-02-20", dueDate: "2024-03-21", amount: 1600, status: "Paid", orderId: "ORD-2024-020" },
  ],
  "omega-designs": [
    { id: "INV-2024-008", date: "2024-03-06", dueDate: "2024-04-20", amount: 9200, status: "Sent", orderId: "ORD-2024-021" },
    { id: "INV-2024-021", date: "2024-02-20", dueDate: "2024-04-05", amount: 7100, status: "Paid", orderId: "ORD-2024-033" },
    { id: "INV-2024-032", date: "2024-02-05", dueDate: "2024-03-21", amount: 6300, status: "Paid", orderId: "ORD-2024-044" },
  ],
}

// Sample activity data per customer
const customerActivities: Record<string, Array<{ date: string; time: string; type: string; description: string; user: string }>> = {
  "acme-corp": [
    { date: "2024-03-15", time: "14:32", type: "order", description: "Order ORD-2024-001 delivered", user: "System" },
    { date: "2024-03-15", time: "09:15", type: "invoice", description: "Invoice INV-2024-001 payment received", user: "System" },
    { date: "2024-03-12", time: "16:45", type: "proof", description: "Proof approved for ORD-2024-012", user: "Jane Smith" },
    { date: "2024-03-10", time: "11:20", type: "order", description: "Order ORD-2024-012 placed - Brochures A4 Tri-fold", user: "Jane Smith" },
    { date: "2024-03-08", time: "10:00", type: "support", description: "Support ticket #1234 resolved - Delivery query", user: "Josh Callahan" },
    { date: "2024-03-05", time: "13:30", type: "invoice", description: "Invoice INV-2024-012 sent", user: "System" },
    { date: "2024-03-05", time: "09:45", type: "order", description: "Order ORD-2024-023 shipped", user: "System" },
    { date: "2024-02-28", time: "15:10", type: "order", description: "Order ORD-2024-034 delivered", user: "System" },
    { date: "2024-02-25", time: "11:00", type: "note", description: "Updated pricing tier from Silver to Gold", user: "Mary Purwanegara" },
    { date: "2024-02-20", time: "14:20", type: "order", description: "Order ORD-2024-045 delivered", user: "System" },
  ],
  "beta-solutions": [
    { date: "2024-03-14", time: "10:00", type: "order", description: "Order ORD-2024-002 placed - Postcards", user: "Michael Brown" },
    { date: "2024-03-08", time: "16:00", type: "order", description: "Order ORD-2024-015 delivered", user: "System" },
    { date: "2024-03-08", time: "09:30", type: "invoice", description: "Invoice INV-2024-002 payment received", user: "System" },
    { date: "2024-02-25", time: "14:15", type: "order", description: "Order ORD-2024-028 delivered", user: "System" },
  ],
  "gamma-industries": [
    { date: "2024-03-13", time: "11:30", type: "order", description: "Order ORD-2024-003 placed - Catalogues", user: "Robert Martin" },
    { date: "2024-03-07", time: "15:45", type: "invoice", description: "Invoice INV-2024-003 sent", user: "System" },
    { date: "2024-03-07", time: "10:00", type: "order", description: "Order ORD-2024-016 delivered", user: "System" },
    { date: "2024-02-22", time: "13:20", type: "order", description: "Order ORD-2024-029 delivered", user: "System" },
    { date: "2024-02-22", time: "09:00", type: "invoice", description: "Invoice INV-2024-016 payment received", user: "System" },
  ],
  "delta-enterprises": [
    { date: "2024-02-01", time: "10:30", type: "order", description: "Order ORD-2024-004 delivered", user: "System" },
    { date: "2024-01-15", time: "14:00", type: "order", description: "Order ORD-2024-017 delivered", user: "System" },
    { date: "2024-01-10", time: "09:00", type: "note", description: "Customer marked as inactive - low order volume", user: "Kenji Nakamura" },
  ],
  "epsilon-tech": [
    { date: "2024-03-12", time: "11:00", type: "order", description: "Order ORD-2024-005 shipped", user: "System" },
    { date: "2024-03-01", time: "15:30", type: "order", description: "Order ORD-2024-018 delivered", user: "System" },
    { date: "2024-02-18", time: "10:45", type: "order", description: "Order ORD-2024-031 delivered", user: "System" },
  ],
  "zeta-systems": [
    { date: "2024-03-11", time: "09:15", type: "order", description: "Order ORD-2024-006 placed - Flyers DL", user: "James Wilson" },
    { date: "2024-02-28", time: "14:30", type: "order", description: "Order ORD-2024-019 delivered", user: "System" },
  ],
  "theta-innovations": [
    { date: "2024-03-10", time: "10:00", type: "order", description: "Order ORD-2024-007 placed - Brochures", user: "David Miller" },
    { date: "2024-02-20", time: "16:00", type: "order", description: "Order ORD-2024-020 delivered", user: "System" },
  ],
  "omega-designs": [
    { date: "2024-03-14", time: "13:00", type: "order", description: "Order ORD-2024-008 placed - Art Prints", user: "Li Wei" },
    { date: "2024-03-06", time: "11:30", type: "order", description: "Order ORD-2024-021 shipped", user: "System" },
    { date: "2024-02-20", time: "15:00", type: "order", description: "Order ORD-2024-033 delivered", user: "System" },
    { date: "2024-02-05", time: "10:00", type: "order", description: "Order ORD-2024-044 delivered", user: "System" },
  ],
}

// Sample notes data per customer
const initialCustomerNotes: Record<string, Array<{ id: string; date: string; author: string; content: string }>> = {
  "acme-corp": [
    { id: "n1", date: "2024-03-10T14:30:00", author: "Mary Purwanegara", content: "Client interested in exploring packaging options for Q2 campaign. Schedule follow-up meeting for next week." },
    { id: "n2", date: "2024-02-25T11:00:00", author: "Mary Purwanegara", content: "Upgraded pricing tier from Silver to Gold based on order volume. Customer approved the new discount structure." },
    { id: "n3", date: "2024-02-15T09:45:00", author: "Josh Callahan", content: "Resolved delivery delay issue on ORD-2024-056. Customer satisfied with resolution - offered 5% discount on next order as goodwill." },
    { id: "n4", date: "2024-01-20T16:00:00", author: "Amy Farah Fowler", content: "Annual report estimate approved. Customer wants premium paper stock (300gsm) with spot UV on cover." },
  ],
  "beta-solutions": [
    { id: "n5", date: "2024-03-12T10:00:00", author: "David Wilson", content: "Exploring larger format printing. May upgrade tier next quarter." },
  ],
  "gamma-industries": [
    { id: "n6", date: "2024-03-01T14:00:00", author: "Pierre Leclerc", content: "Key account - ensure priority handling on all orders. CEO personally reviews proofs." },
    { id: "n7", date: "2024-02-15T11:30:00", author: "Marie Dupont", content: "Consolidation invoicing working well. Customer prefers monthly invoicing cycle." },
  ],
  "delta-enterprises": [
    { id: "n8", date: "2024-01-10T09:00:00", author: "Kenji Nakamura", content: "Customer marked as inactive due to low order volume. Re-engage in Q2 with promotional offer." },
  ],
  "epsilon-tech": [
    { id: "n9", date: "2024-03-05T15:00:00", author: "George Davies", content: "Planning large event in May - expect bulk order for banners, brochures, and branded merchandise." },
  ],
  "zeta-systems": [
    { id: "n10", date: "2024-03-01T10:00:00", author: "Sarah Johnson", content: "New marketing campaign launching in April. Expect increased order volume." },
  ],
  "theta-innovations": [],
  "omega-designs": [
    { id: "n11", date: "2024-03-10T13:00:00", author: "Tan Hui Ling", content: "Premium client - always requires highest quality print output. Prefers Pantone matching." },
    { id: "n12", date: "2024-02-28T10:30:00", author: "Wong Jian Hao", content: "Art director Chen Mei is the key decision-maker for all design approvals." },
  ],
}

type DetailTab = "overview" | "orders" | "invoices" | "activity" | "notes"

export default function CustomerManagement() {
  const { navigateTo } = useNavigation()
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<DetailTab>("overview")
  const [isEditingInvoice, setIsEditingInvoice] = useState(false)
  const [invoiceTerms, setInvoiceTerms] = useState("")
  const [invoiceTrigger, setInvoiceTrigger] = useState("")
  const [daysAfterShipment, setDaysAfterShipment] = useState(7)
  const [consolidationType, setConsolidationType] = useState("monthly")
  const [customTerms, setCustomTerms] = useState("")
  const [showCustomTerms, setShowCustomTerms] = useState(false)
  const [invoiceEmail, setInvoiceEmail] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isEditingPayment, setIsEditingPayment] = useState(false)
  const [editPaymentTerms, setEditPaymentTerms] = useState("")
  const [editCreditLimit, setEditCreditLimit] = useState("")
  const [editAccountId, setEditAccountId] = useState("")
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false)
  const [customerNotes, setCustomerNotes] = useState(initialCustomerNotes)
  const [newNoteText, setNewNoteText] = useState("")

  const handleCustomerClick = (customerId: string) => {
    setSelectedCustomerId(customerId)
    setActiveTab("overview")
    setIsEditingInvoice(false)
    setIsEditingPayment(false)
    if (customerId) {
      const customer = customerDetails[customerId]
      if (customer) {
        setInvoiceTerms(customer.invoicingTerms)
        setInvoiceTrigger(customer.invoiceTrigger || "automatic")
        setDaysAfterShipment(customer.daysAfterShipment || 7)
        setConsolidationType(customer.consolidationType || "monthly")
        setShowCustomTerms(customer.invoicingTerms.startsWith("Custom:"))
        setInvoiceEmail(customer.invoiceEmail || "")
        setEditPaymentTerms(customer.paymentTerms)
        setEditCreditLimit(String(customer.creditLimit))
        setEditAccountId(customer.accountId)
        if (customer.invoicingTerms.startsWith("Custom:")) {
          setCustomTerms(customer.invoicingTerms.replace("Custom: ", ""))
        }
      }
    }
  }

  const handleBackToList = () => {
    setSelectedCustomerId(null)
    setIsEditingInvoice(false)
    setActiveTab("overview")
  }

  const handleInvoiceTermsChange = (value: string) => {
    setInvoiceTerms(value)
    setShowCustomTerms(value === "custom")
  }

  const handleSaveInvoiceSettings = () => {
    setIsEditingInvoice(false)
  }

  const handleAddNote = () => {
    if (!newNoteText.trim() || !selectedCustomerId) return
    const newNote = {
      id: `n-${Date.now()}`,
      date: new Date().toISOString(),
      author: "Current User",
      content: newNoteText.trim(),
    }
    setCustomerNotes((prev) => ({
      ...prev,
      [selectedCustomerId]: [newNote, ...(prev[selectedCustomerId] || [])],
    }))
    setNewNoteText("")
  }

  // Filter customers
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || c.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const renderInvoiceTriggerOptions = () => {
    switch (invoiceTrigger) {
      case "days_after":
        return (
          <div className="mt-4 ml-6">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={daysAfterShipment}
                onChange={(e) => setDaysAfterShipment(Number(e.target.value))}
                className="w-20"
                min={1}
              />
              <span>days after shipment</span>
            </div>
          </div>
        )
      case "consolidated":
        return (
          <div className="mt-4 ml-6">
            <RadioGroup value={consolidationType} onValueChange={setConsolidationType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly consolidation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Weekly consolidation</Label>
              </div>
            </RadioGroup>
          </div>
        )
      default:
        return null
    }
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-[#cdfee1] text-[#0c5132] hover:bg-[#cdfee1]">{status}</Badge>
      case "Shipped":
        return <Badge className="bg-[#eaf4ff] text-[#00527c] hover:bg-[#eaf4ff]">{status}</Badge>
      case "In Production":
        return <Badge className="bg-[#ffe4c6] text-[#5e4200] hover:bg-[#ffe4c6]">{status}</Badge>
      case "Awaiting Approval":
        return <Badge className="bg-[#fff4d7] text-[#463710] hover:bg-[#fff4d7]">{status}</Badge>
      default:
        return <Badge className="bg-[#e6e6e6] text-[#383838] hover:bg-[#e6e6e6]">{status}</Badge>
    }
  }

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-[#cdfee1] text-[#0c5132] hover:bg-[#cdfee1]">{status}</Badge>
      case "Sent":
        return <Badge className="bg-[#eaf4ff] text-[#00527c] hover:bg-[#eaf4ff]">{status}</Badge>
      case "Overdue":
        return <Badge className="bg-[#fedad9] text-[#8e1f0b] hover:bg-[#fedad9]">{status}</Badge>
      case "Draft":
        return <Badge className="bg-[#e6e6e6] text-[#383838] hover:bg-[#e6e6e6]">{status}</Badge>
      default:
        return <Badge className="bg-[#e6e6e6] text-[#383838] hover:bg-[#e6e6e6]">{status}</Badge>
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return <div className="w-8 h-8 rounded-full bg-[#eaf4ff] flex items-center justify-center"><FileText className="h-4 w-4 text-[#007cb4]" /></div>
      case "invoice":
        return <div className="w-8 h-8 rounded-full bg-[#cdfee1] flex items-center justify-center"><FileText className="h-4 w-4 text-[#29845a]" /></div>
      case "proof":
        return <div className="w-8 h-8 rounded-full bg-[#f4e8fa] flex items-center justify-center"><FileText className="h-4 w-4 text-[#9c77ac]" /></div>
      case "support":
        return <div className="w-8 h-8 rounded-full bg-[#ffe4c6] flex items-center justify-center"><MessageSquare className="h-4 w-4 text-[#956f00]" /></div>
      case "note":
        return <div className="w-8 h-8 rounded-full bg-[#e6e6e6] flex items-center justify-center"><FileText className="h-4 w-4 text-[#525252]" /></div>
      default:
        return <div className="w-8 h-8 rounded-full bg-[#e6e6e6] flex items-center justify-center"><Clock className="h-4 w-4 text-[#525252]" /></div>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }

  // Detail view tabs
  const tabs: { id: DetailTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "orders", label: "Orders" },
    { id: "invoices", label: "Invoices" },
    { id: "activity", label: "Activity" },
    { id: "notes", label: "Notes" },
  ]

  const customer = selectedCustomerId ? customerDetails[selectedCustomerId] : null
  const customerRecord = selectedCustomerId ? customers.find((c) => c.id === selectedCustomerId) : null

  return (
    <>
      {!selectedCustomerId ? (
        // Customer List View
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold" style={{ color: "#212121", letterSpacing: "0.32px" }}>Customers</h1>
            <Button
              className="bg-[#212121] hover:opacity-90 text-white rounded-full border-2 border-transparent"
              onClick={() => setShowAddCustomerModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#999999" }} />
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{ borderRadius: "8px" }}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]" style={{ borderRadius: "8px" }}>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customer Table */}
          <div className="bg-white rounded-lg border" style={{ borderColor: "#e6e6e6", borderRadius: "8px", overflow: "hidden" }}>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #e6e6e6" }}>
                  <th className="text-left p-3 font-medium text-sm" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Company Name</th>
                  <th className="text-left p-3 font-medium text-sm" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Orders</th>
                  <th className="text-left p-3 font-medium text-sm" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Revenue</th>
                  <th className="text-right p-3 font-medium text-sm" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="cursor-pointer transition-colors"
                    style={{ borderBottom: "1px solid #e6e6e6" }}
                    onClick={() => handleCustomerClick(cust.id)}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f7f7f7")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td className="p-3 text-sm font-medium" style={{ color: "#212121" }}>{cust.name}</td>
                    <td className="p-3 text-sm" style={{ color: "#525252" }}>{cust.totalOrders}</td>
                    <td className="p-3 text-sm" style={{ color: "#525252" }}>{formatCurrency(cust.totalRevenue)}</td>
                    <td className="p-3 text-right">
                      <Badge
                        className={`${
                          cust.status === "Active" ? "bg-[#cdfee1] text-[#0c5132]" : "bg-[#f7f7f7] text-[#383838]"
                        } hover:opacity-90`}
                      >
                        {cust.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-sm" style={{ color: "#999999" }}>
                      No customers match your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : customer ? (
        // Customer Detail View with Tabs
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Breadcrumb */}
            <div className="flex items-center mb-2">
              <button onClick={handleBackToList} className="flex items-center mr-2 text-sm transition-colors" style={{ color: "#999999" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6b6b6b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#999999")}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Customers
              </button>
              <span className="text-sm" style={{ color: "#999999" }}>/ {customer.name}</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "#f2f2f2" }}>
                  <Building2 className="h-6 w-6" style={{ color: "#525252" }} />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold" style={{ color: "#212121", letterSpacing: "0.32px" }}>{customer.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`${customerRecord?.status === "Active" ? "bg-[#cdfee1] text-[#0c5132]" : "bg-[#f7f7f7] text-[#383838]"} hover:opacity-90`}>
                      {customerRecord?.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button className="bg-white text-[#383838] border-2 border-[#bdbdbd] hover:bg-[#f7f7f7] rounded-full">Edit Customer</Button>
            </div>

            {/* GNX-style Tabs */}
            <div className="flex" style={{ borderBottom: "1px solid #e6e6e6", gap: 0 }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-4 py-2 text-sm transition-colors"
                  style={{
                    color: activeTab === tab.id ? "#212121" : "#8a8a8a",
                    fontWeight: activeTab === tab.id ? 500 : 400,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span
                      className="absolute bottom-0 left-0 right-0"
                      style={{ height: "4px", background: "#000", borderRadius: "2px 2px 0 0" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {/* ===== OVERVIEW TAB ===== */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Company Info */}
                  <div className="border rounded-lg p-5" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
                    <h3 className="text-base font-medium mb-4" style={{ color: "#212121" }}>Company Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium mb-1" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Address</p>
                        <p className="text-sm" style={{ color: "#212121" }}>{customer.address}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Website</p>
                        <p className="text-sm" style={{ color: "#007cb4" }}>{customer.website}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Preferred Currency</p>
                        <p className="text-sm" style={{ color: "#212121" }}>{customer.currency}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Estimation Enabled</p>
                        <p className="text-sm" style={{ color: "#212121" }}>{customer.estimationEnabled}</p>
                      </div>
                    </div>
                  </div>

                  {/* Point of Contact — v0 style 3-column grid */}
                  <div className="border rounded-lg p-5" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
                    <h3 className="text-base font-medium mb-2" style={{ color: "#212121" }}>Point of Contact</h3>
                    <p className="text-sm mb-4" style={{ color: "#8a8a8a" }}>
                      Members of your team responsible for this client&apos;s success
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-medium mb-2" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Sales Rep</p>
                        <div className="border rounded-lg p-3" style={{ borderColor: "#e6e6e6", background: "white" }}>
                          <span className="text-sm" style={{ color: "#212121" }}>{customer.salesRep}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-2" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Customer Success Executive (CSE)</p>
                        <div className="border rounded-lg p-3" style={{ borderColor: "#e6e6e6", background: "white" }}>
                          <span className="text-sm" style={{ color: "#212121" }}>{customer.cse}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-2" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Estimator</p>
                        <div className="border rounded-lg p-3" style={{ borderColor: "#e6e6e6", background: "white" }}>
                          <span className="text-sm" style={{ color: "#212121" }}>{customer.estimator}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invoicing Information — v0 style with edit toggle */}
                  <div className="border rounded-lg p-5" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-medium" style={{ color: "#212121" }}>Invoicing Information</h3>
                      {!isEditingInvoice ? (
                        <Button
                          variant="outline"
                          className="text-[#007cb4] border-[#007cb4] hover:bg-[#eaf4ff] rounded-full text-sm h-8 px-3"
                          onClick={() => setIsEditingInvoice(true)}
                        >
                          Edit invoicing settings
                        </Button>
                      ) : (
                        <Button
                          className="bg-[#212121] hover:opacity-90 text-white rounded-full text-sm h-8 px-4"
                          onClick={handleSaveInvoiceSettings}
                        >
                          Save changes
                        </Button>
                      )}
                    </div>

                    {!isEditingInvoice ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium mb-2" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Invoicing Terms</p>
                          <div className="border rounded-lg p-3" style={{ borderColor: "#e6e6e6", background: "white" }}>
                            <span className="text-sm" style={{ color: "#212121" }}>{customer.invoicingTerms}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-2" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Invoice Email</p>
                          <div className="border rounded-lg p-3" style={{ borderColor: "#e6e6e6", background: "white" }}>
                            <span className="text-sm" style={{ color: "#212121" }}>{customer.invoiceEmail}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-2" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Invoice Trigger</p>
                          <div className="border rounded-lg p-3" style={{ borderColor: "#e6e6e6", background: "white" }}>
                            <span className="text-sm" style={{ color: "#212121" }}>
                              {(() => {
                                switch (customer.invoiceTrigger) {
                                  case "automatic": return "Automatic upon shipment"
                                  case "days_after": return `${customer.daysAfterShipment} days after shipment`
                                  case "consolidated": return `Consolidated (${customer.consolidationType === "monthly" ? "Monthly" : "Weekly"})`
                                  case "manual": return "Manual invoicing"
                                  default: return "Automatic upon shipment"
                                }
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg border p-5" style={{ borderColor: "#e6e6e6" }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <p className="text-xs font-medium" style={{ color: "#383838", letterSpacing: "0.32px" }}>Invoicing Terms</p>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-3.5 w-3.5" style={{ color: "#bdbdbd" }} />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-60 text-xs">Select the payment terms for this customer&apos;s invoices. This determines when payment is due after the invoice date.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <Select value={invoiceTerms} onValueChange={handleInvoiceTermsChange}>
                              <SelectTrigger style={{ borderRadius: "8px" }}>
                                <SelectValue placeholder="Select invoice terms" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Net 15">Net 15</SelectItem>
                                <SelectItem value="Net 30">Net 30</SelectItem>
                                <SelectItem value="Net 45">Net 45</SelectItem>
                                <SelectItem value="Net 60">Net 60</SelectItem>
                                <SelectItem value="Due Upon Receipt">Due Upon Receipt</SelectItem>
                                <SelectItem value="custom">Custom Terms</SelectItem>
                              </SelectContent>
                            </Select>
                            {showCustomTerms && (
                              <div className="mt-2">
                                <Input
                                  placeholder="Enter custom terms"
                                  value={customTerms}
                                  onChange={(e) => setCustomTerms(e.target.value)}
                                  style={{ borderRadius: "8px" }}
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>Invoice Email</p>
                            <Input
                              value={invoiceEmail}
                              onChange={(e) => setInvoiceEmail(e.target.value)}
                              placeholder="Enter invoice email"
                              style={{ borderRadius: "8px" }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <p className="text-xs font-medium" style={{ color: "#383838", letterSpacing: "0.32px" }}>Invoice Trigger Criteria</p>
                          </div>
                          <div className="space-y-3">
                            <RadioGroup value={invoiceTrigger} onValueChange={setInvoiceTrigger}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="automatic" id="inv-automatic" />
                                <Label htmlFor="inv-automatic" className="flex items-center text-sm">
                                  Automatic upon shipment
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Info className="h-3.5 w-3.5 ml-1" style={{ color: "#bdbdbd" }} />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="w-60 text-xs">Invoices are automatically created when an order is marked as shipped.</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="days_after" id="inv-days_after" />
                                <Label htmlFor="inv-days_after" className="flex items-center text-sm">
                                  X days after shipment
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Info className="h-3.5 w-3.5 ml-1" style={{ color: "#bdbdbd" }} />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="w-60 text-xs">Invoices are generated a specified number of days after the order is shipped.</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="consolidated" id="inv-consolidated" />
                                <Label htmlFor="inv-consolidated" className="flex items-center text-sm">
                                  Consolidated invoicing
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Info className="h-3.5 w-3.5 ml-1" style={{ color: "#bdbdbd" }} />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="w-60 text-xs">Multiple orders are consolidated into a single invoice on a weekly or monthly basis.</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="manual" id="inv-manual" />
                                <Label htmlFor="inv-manual" className="flex items-center text-sm">
                                  Manual invoicing
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Info className="h-3.5 w-3.5 ml-1" style={{ color: "#bdbdbd" }} />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="w-60 text-xs">Invoices are created and triggered by a user action.</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </Label>
                              </div>
                            </RadioGroup>

                            {renderInvoiceTriggerOptions()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment & Credit — editable with Account ID */}
                  <div className="border rounded-lg p-5" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-medium" style={{ color: "#212121" }}>Payment &amp; Credit</h3>
                      {!isEditingPayment ? (
                        <Button
                          variant="outline"
                          className="text-[#007cb4] border-[#007cb4] hover:bg-[#eaf4ff] rounded-full text-sm h-8 px-3"
                          onClick={() => setIsEditingPayment(true)}
                        >
                          Edit payment settings
                        </Button>
                      ) : (
                        <Button
                          className="bg-[#212121] hover:opacity-90 text-white rounded-full text-sm h-8 px-4"
                          onClick={() => setIsEditingPayment(false)}
                        >
                          Save changes
                        </Button>
                      )}
                    </div>

                    {!isEditingPayment ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs font-medium mb-2" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Account ID</p>
                          <div className="border rounded-lg p-3" style={{ borderColor: "#e6e6e6", background: "white" }}>
                            <span className="text-sm font-mono" style={{ color: "#212121" }}>{customer.accountId}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-2" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Payment Terms</p>
                          <div className="border rounded-lg p-3" style={{ borderColor: "#e6e6e6", background: "white" }}>
                            <span className="text-sm" style={{ color: "#212121" }}>{customer.paymentTerms}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-2" style={{ color: "#8a8a8a", letterSpacing: "0.32px" }}>Credit Limit</p>
                          <div className="border rounded-lg p-3" style={{ borderColor: "#e6e6e6", background: "white" }}>
                            <span className="text-sm" style={{ color: "#212121" }}>{formatCurrency(customer.creditLimit)}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>Account ID</p>
                          <Input
                            value={editAccountId}
                            onChange={(e) => setEditAccountId(e.target.value)}
                            style={{ borderRadius: "8px" }}
                          />
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>Payment Terms</p>
                          <Select value={editPaymentTerms} onValueChange={setEditPaymentTerms}>
                            <SelectTrigger style={{ borderRadius: "8px" }}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Net 15">Net 15</SelectItem>
                              <SelectItem value="Net 30">Net 30</SelectItem>
                              <SelectItem value="Net 45">Net 45</SelectItem>
                              <SelectItem value="Net 60">Net 60</SelectItem>
                              <SelectItem value="Due Upon Receipt">Due Upon Receipt</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-2" style={{ color: "#383838", letterSpacing: "0.32px" }}>Credit Limit</p>
                          <Input
                            type="number"
                            value={editCreditLimit}
                            onChange={(e) => setEditCreditLimit(e.target.value)}
                            style={{ borderRadius: "8px" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contacts */}
                  <div className="border rounded-lg p-5" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-medium" style={{ color: "#212121" }}>Contact List</h3>
                      <Button variant="outline" className="text-[#007cb4] border-[#007cb4] hover:bg-[#eaf4ff] rounded-full text-sm h-8 px-3">
                        + Add Contact
                      </Button>
                    </div>
                    <div className="border rounded-lg overflow-hidden" style={{ borderColor: "#e6e6e6" }}>
                      <div className="grid grid-cols-3 p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b", borderBottom: "1px solid #e6e6e6" }}>
                        <div>Name</div>
                        <div>Email</div>
                        <div>Phone</div>
                      </div>
                      {customer.contacts.map((contact, idx) => (
                        <div key={idx} className="grid grid-cols-3 p-3 text-sm" style={{ borderBottom: idx < customer.contacts.length - 1 ? "1px solid #e6e6e6" : "none" }}>
                          <div className="flex items-center gap-2">
                            <span style={{ color: "#212121" }}>{contact.name}</span>
                            {contact.primary && (
                              <Badge className="bg-[#eaf4ff] text-[#00527c] hover:bg-[#eaf4ff] text-[10px] px-1.5 py-0">Primary</Badge>
                            )}
                            <span className="text-xs" style={{ color: "#8a8a8a" }}>({contact.role})</span>
                          </div>
                          <div style={{ color: "#525252" }}>{contact.email}</div>
                          <div className="flex justify-between">
                            <span style={{ color: "#525252" }}>{contact.phone}</span>
                            {!contact.primary && (
                              <button className="text-xs" style={{ color: "#007cb4" }}>Mark as primary</button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ===== ORDERS TAB ===== */}
              {activeTab === "orders" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm" style={{ color: "#8a8a8a" }}>
                      {(customerOrders[selectedCustomerId] || []).length} orders total
                    </p>
                  </div>
                  <div className="border rounded-lg overflow-hidden" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e6e6e6" }}>
                          <th className="text-left p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Order ID</th>
                          <th className="text-left p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Date</th>
                          <th className="text-left p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Items</th>
                          <th className="text-left p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Status</th>
                          <th className="text-right p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(customerOrders[selectedCustomerId] || []).map((order) => (
                          <tr
                            key={order.id}
                            className="cursor-pointer transition-colors"
                            style={{ borderBottom: "1px solid #e6e6e6" }}
                            onClick={() => navigateTo("order-detail", { orderId: order.id })}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f7f7f7")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <td className="p-3 text-sm font-medium" style={{ color: "#007cb4" }}>{order.id}</td>
                            <td className="p-3 text-sm" style={{ color: "#525252" }}>{order.date}</td>
                            <td className="p-3 text-sm" style={{ color: "#212121" }}>{order.items}</td>
                            <td className="p-3">{getOrderStatusBadge(order.status)}</td>
                            <td className="p-3 text-sm text-right" style={{ color: "#212121" }}>{formatCurrency(order.amount)}</td>
                          </tr>
                        ))}
                        {(customerOrders[selectedCustomerId] || []).length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-sm" style={{ color: "#999999" }}>
                              No orders found for this customer.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ===== INVOICES TAB ===== */}
              {activeTab === "invoices" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm" style={{ color: "#8a8a8a" }}>
                      {(customerInvoices[selectedCustomerId] || []).length} invoices total
                    </p>
                  </div>
                  <div className="border rounded-lg overflow-hidden" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e6e6e6" }}>
                          <th className="text-left p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Invoice ID</th>
                          <th className="text-left p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Date</th>
                          <th className="text-left p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Due Date</th>
                          <th className="text-left p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Order</th>
                          <th className="text-left p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Status</th>
                          <th className="text-right p-3 font-medium text-xs" style={{ background: "#f7f7f7", color: "#6b6b6b" }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(customerInvoices[selectedCustomerId] || []).map((inv) => (
                          <tr
                            key={inv.id}
                            className="cursor-pointer transition-colors"
                            style={{ borderBottom: "1px solid #e6e6e6" }}
                            onClick={() => navigateTo("invoice-detail", { invoiceId: inv.id })}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f7f7f7")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <td className="p-3 text-sm font-medium" style={{ color: "#007cb4" }}>{inv.id}</td>
                            <td className="p-3 text-sm" style={{ color: "#525252" }}>{inv.date}</td>
                            <td className="p-3 text-sm" style={{ color: "#525252" }}>{inv.dueDate}</td>
                            <td className="p-3 text-sm" style={{ color: "#007cb4" }}>{inv.orderId}</td>
                            <td className="p-3">{getInvoiceStatusBadge(inv.status)}</td>
                            <td className="p-3 text-sm text-right" style={{ color: "#212121" }}>{formatCurrency(inv.amount)}</td>
                          </tr>
                        ))}
                        {(customerInvoices[selectedCustomerId] || []).length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-sm" style={{ color: "#999999" }}>
                              No invoices found for this customer.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ===== ACTIVITY TAB ===== */}
              {activeTab === "activity" && (
                <div>
                  <p className="text-sm mb-4" style={{ color: "#8a8a8a" }}>
                    Recent activity and interactions
                  </p>
                  <div className="space-y-0">
                    {(customerActivities[selectedCustomerId] || []).map((activity, idx) => {
                      const activities = customerActivities[selectedCustomerId] || []
                      const isLast = idx === activities.length - 1
                      return (
                        <div key={idx} className="flex gap-3">
                          {/* Timeline line + icon */}
                          <div className="flex flex-col items-center">
                            {getActivityIcon(activity.type)}
                            {!isLast && (
                              <div className="w-px flex-1 min-h-[24px]" style={{ background: "#e6e6e6" }} />
                            )}
                          </div>
                          {/* Content */}
                          <div className="pb-5 flex-1">
                            <p className="text-sm" style={{ color: "#212121" }}>{activity.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs" style={{ color: "#8a8a8a" }}>{activity.date} at {activity.time}</span>
                              <span className="text-xs" style={{ color: "#bdbdbd" }}>|</span>
                              <span className="text-xs" style={{ color: "#8a8a8a" }}>{activity.user}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    {(customerActivities[selectedCustomerId] || []).length === 0 && (
                      <p className="text-sm text-center py-8" style={{ color: "#999999" }}>No activity recorded yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* ===== NOTES TAB ===== */}
              {activeTab === "notes" && (
                <div>
                  {/* Add Note Form */}
                  <div className="border rounded-lg p-4 mb-6" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
                    <h3 className="text-sm font-medium mb-2" style={{ color: "#212121" }}>Add a note</h3>
                    <textarea
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Write an internal note about this customer..."
                      rows={3}
                      className="w-full p-3 text-sm resize-vertical transition-shadow"
                      style={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "inset 0 0 0 1px #999999",
                        outline: "none",
                        fontFamily: "inherit",
                        minHeight: "80px",
                      }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 1px #383838")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 1px #999999")}
                    />
                    <div className="flex justify-end mt-3">
                      <Button
                        onClick={handleAddNote}
                        disabled={!newNoteText.trim()}
                        className="bg-[#212121] hover:opacity-90 text-white rounded-full border-2 border-transparent disabled:opacity-40"
                      >
                        Save Note
                      </Button>
                    </div>
                  </div>

                  {/* Existing Notes */}
                  <div className="space-y-3">
                    {(customerNotes[selectedCustomerId] || []).map((note) => (
                      <div key={note.id} className="border rounded-lg p-4" style={{ borderColor: "#e6e6e6", borderRadius: "8px" }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#e6e6e6" }}>
                              <User className="h-3 w-3" style={{ color: "#525252" }} />
                            </div>
                            <span className="text-sm font-medium" style={{ color: "#212121" }}>{note.author}</span>
                          </div>
                          <span className="text-xs" style={{ color: "#8a8a8a" }}>
                            {new Date(note.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: "#525252" }}>{note.content}</p>
                      </div>
                    ))}
                    {(customerNotes[selectedCustomerId] || []).length === 0 && (
                      <p className="text-sm text-center py-8" style={{ color: "#999999" }}>No notes yet. Add the first note above.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ background: "rgba(33, 33, 33, 0.8)", zIndex: 20001 }}
          onClick={() => setShowAddCustomerModal(false)}
        >
          <div
            className="bg-white w-full max-w-lg"
            style={{ borderRadius: "12px", padding: "20px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold" style={{ color: "#212121" }}>Add New Customer</h2>
              <button onClick={() => setShowAddCustomerModal(false)} style={{ color: "#8a8a8a" }} className="hover:opacity-70">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "#383838", letterSpacing: "0.32px" }}>Company Name *</label>
                <Input placeholder="Enter company name" style={{ borderRadius: "8px" }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "#383838", letterSpacing: "0.32px" }}>Contact Name *</label>
                  <Input placeholder="Primary contact name" style={{ borderRadius: "8px" }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "#383838", letterSpacing: "0.32px" }}>Contact Email *</label>
                  <Input placeholder="email@company.com" type="email" style={{ borderRadius: "8px" }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "#383838", letterSpacing: "0.32px" }}>Phone Number</label>
                  <Input placeholder="+1 555 000 0000" style={{ borderRadius: "8px" }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "#383838", letterSpacing: "0.32px" }}>Currency</label>
                  <Select defaultValue="GBP">
                    <SelectTrigger style={{ borderRadius: "8px" }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GBP">British Poundsterling</SelectItem>
                      <SelectItem value="USD">US Dollar</SelectItem>
                      <SelectItem value="EUR">Euro</SelectItem>
                      <SelectItem value="AUD">Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "#383838", letterSpacing: "0.32px" }}>Address</label>
                <Input placeholder="Company address" style={{ borderRadius: "8px" }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "#383838", letterSpacing: "0.32px" }}>Payment Terms</label>
                  <Select defaultValue="Net 30">
                    <SelectTrigger style={{ borderRadius: "8px" }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 45">Net 45</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                      <SelectItem value="Due Upon Receipt">Due Upon Receipt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "#383838", letterSpacing: "0.32px" }}>Credit Limit</label>
                  <Input placeholder="$0.00" type="number" style={{ borderRadius: "8px" }} />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-5 mt-5" style={{ borderTop: "1px solid #e6e6e6" }}>
              <Button
                variant="outline"
                className="rounded-full border-2 border-[#bdbdbd] text-[#383838] hover:bg-[#f7f7f7]"
                onClick={() => setShowAddCustomerModal(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#212121] hover:opacity-90 text-white rounded-full border-2 border-transparent">
                Create Customer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
