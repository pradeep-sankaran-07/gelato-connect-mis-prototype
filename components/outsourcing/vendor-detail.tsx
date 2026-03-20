"use client"

import { useState } from "react"
import { ArrowLeft, Star, Mail, Phone, MapPin, Plus, Edit2, Package } from "lucide-react"
import { useNavigation } from "@/lib/navigation-context"

const vendorData: Record<string, {
  id: string; name: string; contactName: string; email: string; phone: string; address: string
  capabilities: string[]; status: "Active" | "Inactive"; onTimePercent: number; qualityRating: number
  avgLeadTime: string; costVarianceTrend: number[]; monthlyVolume: number[]
  rateCards: { service: string; tiers: { minQty: number; maxQty: number | null; rate: string }[] }[]
  purchaseOrders: { id: string; orderId: string; step: string; status: string; sentDate: string; amount: string }[]
}> = {
  "V-001": {
    id: "V-001", name: "BindRight Ltd", contactName: "James Hartley",
    email: "james@bindright.co.uk", phone: "+44 20 7946 0958",
    address: "14 Millbrook Road, London SE1 7QH, United Kingdom",
    capabilities: ["Binding", "Perfect Binding", "Saddle Stitch"],
    status: "Active", onTimePercent: 94, qualityRating: 4.5, avgLeadTime: "5.2 days",
    costVarianceTrend: [1.2, -0.5, 2.1, 3.4, 1.8, 2.3],
    monthlyVolume: [18, 22, 15, 24, 20, 26],
    rateCards: [
      { service: "Perfect Binding", tiers: [
        { minQty: 1, maxQty: 500, rate: "€0.80/unit" },
        { minQty: 501, maxQty: 2000, rate: "€0.65/unit" },
        { minQty: 2001, maxQty: null, rate: "€0.50/unit" },
      ]},
      { service: "Saddle Stitch", tiers: [
        { minQty: 1, maxQty: 1000, rate: "€0.35/unit" },
        { minQty: 1001, maxQty: 5000, rate: "€0.25/unit" },
        { minQty: 5001, maxQty: null, rate: "€0.18/unit" },
      ]},
    ],
    purchaseOrders: [
      { id: "PO-2026-001", orderId: "ORD-4521", step: "Perfect Binding", status: "In Progress", sentDate: "2026-03-10", amount: "€1,240.00" },
      { id: "PO-2026-006", orderId: "ORD-4541", step: "Saddle Stitch", status: "In Progress", sentDate: "2026-03-14", amount: "€780.00" },
      { id: "PO-2025-048", orderId: "ORD-4389", step: "Perfect Binding", status: "Completed", sentDate: "2026-02-18", amount: "€2,100.00" },
      { id: "PO-2025-041", orderId: "ORD-4350", step: "Saddle Stitch", status: "Completed", sentDate: "2026-02-05", amount: "€450.00" },
    ],
  },
  "V-002": {
    id: "V-002", name: "CoatMaster GmbH", contactName: "Klaus Weber",
    email: "k.weber@coatmaster.de", phone: "+49 30 1234 5678",
    address: "Berliner Str. 42, 10178 Berlin, Germany",
    capabilities: ["UV Coating", "Lamination", "Spot UV"],
    status: "Active", onTimePercent: 97, qualityRating: 4.8, avgLeadTime: "3.8 days",
    costVarianceTrend: [-0.3, 0.8, -0.1, 1.2, 0.5, 0.2],
    monthlyVolume: [14, 16, 12, 19, 17, 21],
    rateCards: [
      { service: "UV Coating", tiers: [
        { minQty: 1, maxQty: 500, rate: "€0.45/unit" },
        { minQty: 501, maxQty: 2000, rate: "€0.32/unit" },
        { minQty: 2001, maxQty: null, rate: "€0.22/unit" },
      ]},
      { service: "Lamination (Gloss)", tiers: [
        { minQty: 1, maxQty: 500, rate: "€0.28/unit" },
        { minQty: 501, maxQty: 2000, rate: "€0.20/unit" },
        { minQty: 2001, maxQty: null, rate: "€0.14/unit" },
      ]},
      { service: "Spot UV", tiers: [
        { minQty: 1, maxQty: 500, rate: "€0.60/unit" },
        { minQty: 501, maxQty: 2000, rate: "€0.48/unit" },
        { minQty: 2001, maxQty: null, rate: "€0.38/unit" },
      ]},
    ],
    purchaseOrders: [
      { id: "PO-2026-002", orderId: "ORD-4498", step: "UV Coating", status: "Completed", sentDate: "2026-03-05", amount: "€890.00" },
      { id: "PO-2026-007", orderId: "ORD-4462", step: "Lamination", status: "Completed", sentDate: "2026-02-25", amount: "€1,120.00" },
      { id: "PO-2025-039", orderId: "ORD-4321", step: "Spot UV", status: "Completed", sentDate: "2026-01-28", amount: "€1,560.00" },
    ],
  },
}

// Fallback for unmatched vendor IDs
const defaultVendor = vendorData["V-001"]

const tabs = ["Overview", "Rate Cards", "Purchase Orders", "Performance"]
const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.floor(rating)
              ? "fill-warning-50 text-warning-50"
              : star - 0.5 <= rating
              ? "fill-warning-50/50 text-warning-50"
              : "text-neutral-30"
          }`}
        />
      ))}
      <span className="ml-1.5 text-sm font-medium text-neutral-70">{rating.toFixed(1)}</span>
    </div>
  )
}

function getPoStatusStyle(status: string) {
  switch (status) {
    case "In Progress": return "bg-warning-20 text-warning-90"
    case "Completed": return "bg-success-10 text-success-90"
    case "Sent": return "bg-info-10 text-info-90"
    case "Shipped": return "bg-primary-10 text-primary-90"
    default: return "bg-neutral-10 text-neutral-60"
  }
}

export default function VendorDetail() {
  const { params, goBack, navigateTo } = useNavigation()
  const [activeTab, setActiveTab] = useState("Overview")
  const vendor = vendorData[params.vendorId] || defaultVendor

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Back + Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={goBack} className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-neutral-5 transition-colors">
          <ArrowLeft className="h-4 w-4 text-neutral-70" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-neutral-100">{vendor.name}</h2>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
              vendor.status === "Active" ? "bg-success-10 text-success-90" : "bg-neutral-10 text-neutral-60"
            }`}>
              {vendor.status}
            </span>
          </div>
          <p className="text-sm text-neutral-60 mt-0.5">{vendor.id}</p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center gap-0 border-b border-neutral-20 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm relative transition-colors ${
              activeTab === tab
                ? "text-neutral-100 font-medium"
                : "text-neutral-60 hover:text-neutral-100"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-100 rounded-t-sm" />
            )}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="border border-neutral-20 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-5 flex items-center justify-center">
                  <Mail className="h-3.5 w-3.5 text-neutral-60" />
                </div>
                <div>
                  <div className="text-xs text-neutral-50">Email</div>
                  <div className="text-sm text-neutral-100">{vendor.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-5 flex items-center justify-center">
                  <Phone className="h-3.5 w-3.5 text-neutral-60" />
                </div>
                <div>
                  <div className="text-xs text-neutral-50">Phone</div>
                  <div className="text-sm text-neutral-100">{vendor.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-5 flex items-center justify-center">
                  <MapPin className="h-3.5 w-3.5 text-neutral-60" />
                </div>
                <div>
                  <div className="text-xs text-neutral-50">Address</div>
                  <div className="text-sm text-neutral-100">{vendor.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="border border-neutral-20 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Capabilities</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {vendor.capabilities.map((cap) => (
                <span key={cap} className="text-sm px-3 py-1 bg-neutral-10 text-neutral-70 rounded-lg font-medium">
                  {cap}
                </span>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-neutral-100 mb-3 mt-5">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-neutral-50">On-Time</div>
                <div className="text-lg font-semibold text-neutral-100">{vendor.onTimePercent}%</div>
              </div>
              <div>
                <div className="text-xs text-neutral-50">Avg Lead Time</div>
                <div className="text-lg font-semibold text-neutral-100">{vendor.avgLeadTime}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-50">Active POs</div>
                <div className="text-lg font-semibold text-neutral-100">
                  {vendor.purchaseOrders.filter((p) => p.status !== "Completed").length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rate Cards Tab */}
      {activeTab === "Rate Cards" && (
        <div className="space-y-6">
          {vendor.rateCards.map((card) => (
            <div key={card.service} className="border border-neutral-20 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between bg-neutral-5 px-4 py-3 border-b border-neutral-20">
                <h3 className="text-sm font-semibold text-neutral-100">{card.service}</h3>
                <button className="flex items-center gap-1.5 text-xs text-neutral-60 hover:text-neutral-100 transition-colors">
                  <Edit2 className="h-3 w-3" />
                  Edit
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2.5 text-xs font-medium text-neutral-70">Service</th>
                    <th className="px-4 py-2.5 text-xs font-medium text-neutral-70">Min Qty</th>
                    <th className="px-4 py-2.5 text-xs font-medium text-neutral-70">Max Qty</th>
                    <th className="px-4 py-2.5 text-xs font-medium text-neutral-70 text-right">Rate / Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {card.tiers.map((tier, i) => (
                    <tr key={i} className="border-t border-neutral-20 hover:bg-neutral-5 transition-colors">
                      <td className="px-4 py-2.5 text-sm text-neutral-100">{card.service}</td>
                      <td className="px-4 py-2.5 text-sm text-neutral-70">{tier.minQty.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-sm text-neutral-70">{tier.maxQty ? tier.maxQty.toLocaleString() : "No limit"}</td>
                      <td className="px-4 py-2.5 text-sm font-medium text-neutral-100 text-right">{tier.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <button className="flex items-center gap-2 h-9 px-4 border-2 border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Add Rate Card
          </button>
        </div>
      )}

      {/* Purchase Orders Tab */}
      {activeTab === "Purchase Orders" && (
        <div className="border border-neutral-20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-5 text-left">
                <th className="px-4 py-3 text-xs font-medium text-neutral-70">PO #</th>
                <th className="px-4 py-3 text-xs font-medium text-neutral-70">Order #</th>
                <th className="px-4 py-3 text-xs font-medium text-neutral-70">Step</th>
                <th className="px-4 py-3 text-xs font-medium text-neutral-70">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-neutral-70">Sent Date</th>
                <th className="px-4 py-3 text-xs font-medium text-neutral-70 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {vendor.purchaseOrders.map((po) => (
                <tr
                  key={po.id}
                  onClick={() => navigateTo("purchase-order-detail", { poId: po.id })}
                  className="border-t border-neutral-20 hover:bg-neutral-5 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-neutral-100">{po.id}</td>
                  <td className="px-4 py-3 text-sm text-neutral-70">{po.orderId}</td>
                  <td className="px-4 py-3 text-sm text-neutral-70">{po.step}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPoStatusStyle(po.status)}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-70">{po.sentDate}</td>
                  <td className="px-4 py-3 text-sm font-medium text-neutral-100 text-right">{po.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "Performance" && (
        <div className="space-y-6">
          {/* Big KPIs */}
          <div className="grid grid-cols-4 gap-4">
            <div className="border border-neutral-20 rounded-lg p-5 text-center">
              <div className="text-xs text-neutral-50 mb-1">On-Time Delivery</div>
              <div className="text-3xl font-bold text-neutral-100">{vendor.onTimePercent}%</div>
              <div className="h-2 bg-neutral-10 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-success-70"
                  style={{ width: `${vendor.onTimePercent}%` }}
                />
              </div>
            </div>
            <div className="border border-neutral-20 rounded-lg p-5 text-center">
              <div className="text-xs text-neutral-50 mb-1">Quality Rating</div>
              <div className="flex justify-center mt-2">
                <StarRating rating={vendor.qualityRating} />
              </div>
              <div className="text-2xl font-bold text-neutral-100 mt-1">{vendor.qualityRating.toFixed(1)} / 5.0</div>
            </div>
            <div className="border border-neutral-20 rounded-lg p-5 text-center">
              <div className="text-xs text-neutral-50 mb-1">Avg Lead Time</div>
              <div className="text-3xl font-bold text-neutral-100">{vendor.avgLeadTime}</div>
              <div className="text-xs text-success-70 mt-1">-0.3 days vs prev quarter</div>
            </div>
            <div className="border border-neutral-20 rounded-lg p-5 text-center">
              <div className="text-xs text-neutral-50 mb-1">Total POs (6 mo)</div>
              <div className="text-3xl font-bold text-neutral-100">
                {vendor.monthlyVolume.reduce((a, b) => a + b, 0)}
              </div>
              <div className="text-xs text-neutral-50 mt-1">
                {vendor.purchaseOrders.filter((p) => p.status === "Completed").length} completed
              </div>
            </div>
          </div>

          {/* Cost Variance Trend */}
          <div className="border border-neutral-20 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Cost Variance Trend (last 6 months)</h3>
            <div className="flex items-end gap-3 h-32">
              {vendor.costVarianceTrend.map((val, i) => {
                const maxVal = Math.max(...vendor.costVarianceTrend.map(Math.abs))
                const barHeight = Math.max((Math.abs(val) / (maxVal || 1)) * 100, 8)
                const isPositive = val >= 0
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-xs font-medium text-neutral-70">
                      {isPositive ? "+" : ""}{val.toFixed(1)}%
                    </div>
                    <div
                      className={`w-full rounded-t ${isPositive ? "bg-critical-20" : "bg-success-10"}`}
                      style={{ height: `${barHeight}%` }}
                    />
                    <div className="text-xs text-neutral-50">{months[i]}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Monthly Order Volume */}
          <div className="border border-neutral-20 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Monthly Order Volume</h3>
            <div className="flex items-end gap-3 h-32">
              {vendor.monthlyVolume.map((val, i) => {
                const maxVal = Math.max(...vendor.monthlyVolume)
                const barHeight = Math.max((val / (maxVal || 1)) * 100, 8)
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-xs font-medium text-neutral-70">{val}</div>
                    <div
                      className="w-full rounded-t bg-info-20"
                      style={{ height: `${barHeight}%` }}
                    />
                    <div className="text-xs text-neutral-50">{months[i]}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
