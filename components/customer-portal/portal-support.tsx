"use client"

import { useState } from "react"
import {
  Plus, X, ChevronDown, ChevronRight, Clock, MessageSquare,
  CheckCircle, AlertCircle, Loader2, User
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"
import PortalHeader, { mockCustomers, type PortalCustomer } from "./portal-header"

interface Ticket {
  id: string
  subject: string
  status: "Open" | "In Progress" | "Resolved"
  priority: "Low" | "Medium" | "High"
  created: string
  lastUpdated: string
  relatedOrder: string
  messages: { author: string; role: "customer" | "support"; time: string; message: string }[]
}

const tickets: Ticket[] = [
  {
    id: "TKT-2025-014",
    subject: "Color mismatch on brochure print",
    status: "Open",
    priority: "High",
    created: "Mar 14, 2025",
    lastUpdated: "Mar 15, 2025",
    relatedOrder: "ORD-2025-139",
    messages: [
      { author: "John Smith", role: "customer", time: "Mar 14, 2025 2:30 PM", message: "The colors on the brochure proof look different from our brand guidelines. The blue appears much darker than our Pantone 2935 C specification." },
      { author: "Sarah (Support)", role: "support", time: "Mar 14, 2025 4:15 PM", message: "Thank you for flagging this, John. I've notified our prepress team and they will review the color profile settings. We'll have an updated proof for you within 24 hours." },
      { author: "John Smith", role: "customer", time: "Mar 15, 2025 9:00 AM", message: "Thanks Sarah. Please also check the gradient on the back panel - it seems to have banding artifacts." },
    ],
  },
  {
    id: "TKT-2025-011",
    subject: "Request expedited shipping for business cards",
    status: "In Progress",
    priority: "Medium",
    created: "Mar 10, 2025",
    lastUpdated: "Mar 12, 2025",
    relatedOrder: "ORD-2025-142",
    messages: [
      { author: "John Smith", role: "customer", time: "Mar 10, 2025 11:00 AM", message: "We have a trade show on March 20th and need the business cards delivered by March 18th. Is it possible to expedite the shipping?" },
      { author: "Mike (Support)", role: "support", time: "Mar 12, 2025 10:30 AM", message: "Hi John, I've checked with our production team. We can expedite to next-day delivery for an additional fee of $45. Shall I proceed?" },
    ],
  },
  {
    id: "TKT-2025-008",
    subject: "Invoice query - duplicate charge",
    status: "Resolved",
    priority: "Low",
    created: "Mar 2, 2025",
    lastUpdated: "Mar 5, 2025",
    relatedOrder: "ORD-2025-118",
    messages: [
      { author: "John Smith", role: "customer", time: "Mar 2, 2025 3:45 PM", message: "I noticed a duplicate line item on invoice INV-2025-078 for the lamination service. Can you please look into this?" },
      { author: "Sarah (Support)", role: "support", time: "Mar 3, 2025 9:00 AM", message: "You're right, John. I can see the duplicate charge. I'll issue a credit note for the overcharged amount of $320. It should reflect in your next statement." },
      { author: "Sarah (Support)", role: "support", time: "Mar 5, 2025 2:00 PM", message: "Credit note CN-2025-008 has been issued and applied to your account. Please let us know if you have any other questions." },
    ],
  },
]

export default function PortalSupport() {
  const { navigateTo } = useNavigation()
  const [selectedCustomer, setSelectedCustomer] = useState<PortalCustomer>(mockCustomers[0])
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null)
  const [showNewTicketModal, setShowNewTicketModal] = useState(false)
  const [newSubject, setNewSubject] = useState("")
  const [newOrder, setNewOrder] = useState("")
  const [newPriority, setNewPriority] = useState("Medium")
  const [newDescription, setNewDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function getStatusBadge(status: string) {
    switch (status) {
      case "Open":
        return <Badge className="bg-info-10 text-info-90 text-xs"><AlertCircle className="h-3 w-3 mr-1" />Open</Badge>
      case "In Progress":
        return <Badge className="bg-warning-20 text-warning-90 text-xs"><Loader2 className="h-3 w-3 mr-1" />In Progress</Badge>
      case "Resolved":
        return <Badge className="bg-success-10 text-success-90 text-xs"><CheckCircle className="h-3 w-3 mr-1" />Resolved</Badge>
      default:
        return null
    }
  }

  function getPriorityBadge(priority: string) {
    switch (priority) {
      case "High":
        return <Badge className="bg-critical-20 text-critical-90 text-xs">High</Badge>
      case "Medium":
        return <Badge className="bg-warning-20 text-warning-90 text-xs">Medium</Badge>
      case "Low":
        return <Badge variant="secondary" className="text-xs">Low</Badge>
      default:
        return null
    }
  }

  function handleSubmitTicket() {
    if (!newSubject.trim() || !newDescription.trim()) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        setShowNewTicketModal(false)
        setSubmitted(false)
        setNewSubject("")
        setNewOrder("")
        setNewPriority("Medium")
        setNewDescription("")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-neutral-5">
      <PortalHeader activeScreen="portal-support" selectedCustomer={selectedCustomer} onCustomerChange={setSelectedCustomer} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-100">Support</h1>
            <p className="text-sm text-neutral-60 mt-1">Get help with your orders and account</p>
          </div>
          <button
            onClick={() => setShowNewTicketModal(true)}
            className="flex items-center gap-2 h-10 px-5 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            New Ticket
          </button>
        </div>

        {/* Ticket List */}
        <div className="space-y-3">
          {tickets.map((ticket) => {
            const isExpanded = expandedTicket === ticket.id
            return (
              <div key={ticket.id} className="bg-white border border-neutral-20 rounded-lg overflow-hidden">
                {/* Ticket Header Row */}
                <button
                  onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-neutral-5/50 transition-colors"
                >
                  <ChevronRight className={`h-4 w-4 text-neutral-50 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-neutral-50">{ticket.id}</span>
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                    </div>
                    <h4 className="text-sm font-medium text-neutral-100 truncate">{ticket.subject}</h4>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-neutral-50">Created {ticket.created}</div>
                    <div className="text-xs text-neutral-50">Updated {ticket.lastUpdated}</div>
                  </div>
                </button>

                {/* Expanded Message Thread */}
                {isExpanded && (
                  <div className="border-t border-neutral-20 px-5 py-4 bg-neutral-5/30">
                    <div className="text-xs text-neutral-50 mb-3">Related Order: {ticket.relatedOrder}</div>
                    <div className="space-y-4">
                      {ticket.messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 ${msg.role === "customer" ? "" : ""}`}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.role === "customer" ? "bg-primary-10" : "bg-info-10"
                          }`}>
                            <User className={`h-3.5 w-3.5 ${msg.role === "customer" ? "text-primary-90" : "text-info-90"}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-neutral-90">{msg.author}</span>
                              <span className="text-xs text-neutral-50">{msg.time}</span>
                            </div>
                            <p className="text-sm text-neutral-70 leading-relaxed">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reply box */}
                    {ticket.status !== "Resolved" && (
                      <div className="mt-4 pt-4 border-t border-neutral-20">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type a reply..."
                            className="flex-1 h-9 px-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
                          />
                          <button className="h-9 px-4 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                            Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </main>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowNewTicketModal(false)}
              className="absolute top-4 right-4 text-neutral-50 hover:text-neutral-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-success-70" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">Ticket Submitted</h3>
                <p className="text-sm text-neutral-60">Our team will respond within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">New Support Ticket</h3>
                <p className="text-sm text-neutral-60 mb-6">Describe your issue and we'll get back to you.</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-90 mb-1.5 block">Subject</label>
                    <input
                      type="text"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      placeholder="Brief description of your issue"
                      className="w-full h-10 px-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-neutral-90 mb-1.5 block">Related Order</label>
                      <div className="relative">
                        <select
                          value={newOrder}
                          onChange={(e) => setNewOrder(e.target.value)}
                          className="w-full h-10 pl-3 pr-8 border border-neutral-30 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:border-neutral-90"
                        >
                          <option value="">Select order (optional)</option>
                          <option value="ORD-2025-142">ORD-2025-142</option>
                          <option value="ORD-2025-139">ORD-2025-139</option>
                          <option value="ORD-2025-136">ORD-2025-136</option>
                          <option value="ORD-2025-132">ORD-2025-132</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-50 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-neutral-90 mb-1.5 block">Priority</label>
                      <div className="relative">
                        <select
                          value={newPriority}
                          onChange={(e) => setNewPriority(e.target.value)}
                          className="w-full h-10 pl-3 pr-8 border border-neutral-30 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:border-neutral-90"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-50 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-90 mb-1.5 block">Description</label>
                    <textarea
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Describe your issue in detail..."
                      rows={5}
                      className="w-full p-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 resize-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowNewTicketModal(false)}
                    className="flex-1 h-10 border border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitTicket}
                    disabled={submitting || !newSubject.trim() || !newDescription.trim()}
                    className="flex-1 h-10 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Ticket"
                    )}
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
