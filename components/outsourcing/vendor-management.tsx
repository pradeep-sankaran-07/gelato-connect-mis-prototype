"use client"

import { useState } from "react"
import { Plus, Star, Search, Package } from "lucide-react"
import { useNavigation } from "@/lib/navigation-context"

interface Vendor {
  id: string
  name: string
  contactName: string
  email: string
  phone: string
  capabilities: string[]
  onTimePercent: number
  qualityRating: number
  avgLeadTime: string
  activePOs: number
  status: "Active" | "Inactive"
}

const vendors: Vendor[] = [
  {
    id: "V-001",
    name: "BindRight Ltd",
    contactName: "James Hartley",
    email: "james@bindright.co.uk",
    phone: "+44 20 7946 0958",
    capabilities: ["Binding", "Perfect Binding", "Saddle Stitch"],
    onTimePercent: 94,
    qualityRating: 4.5,
    avgLeadTime: "5.2 days",
    activePOs: 4,
    status: "Active",
  },
  {
    id: "V-002",
    name: "CoatMaster GmbH",
    contactName: "Klaus Weber",
    email: "k.weber@coatmaster.de",
    phone: "+49 30 1234 5678",
    capabilities: ["UV Coating", "Lamination", "Spot UV"],
    onTimePercent: 97,
    qualityRating: 4.8,
    avgLeadTime: "3.8 days",
    activePOs: 3,
    status: "Active",
  },
  {
    id: "V-003",
    name: "DieCut Pro",
    contactName: "Sarah Mitchell",
    email: "sarah@diecutpro.com",
    phone: "+44 161 496 0123",
    capabilities: ["Die Cutting", "Creasing", "Scoring"],
    onTimePercent: 91,
    qualityRating: 4.2,
    avgLeadTime: "6.1 days",
    activePOs: 2,
    status: "Active",
  },
  {
    id: "V-004",
    name: "FoilPress UK",
    contactName: "David Chen",
    email: "d.chen@foilpress.co.uk",
    phone: "+44 121 234 5678",
    capabilities: ["Hot Foil Stamping", "Embossing"],
    onTimePercent: 88,
    qualityRating: 4.0,
    avgLeadTime: "7.5 days",
    activePOs: 1,
    status: "Active",
  },
  {
    id: "V-005",
    name: "PackWrap Solutions",
    contactName: "Anna Bergström",
    email: "anna@packwrap.se",
    phone: "+46 8 123 456 78",
    capabilities: ["Packaging", "Shrink Wrap"],
    onTimePercent: 96,
    qualityRating: 4.6,
    avgLeadTime: "4.0 days",
    activePOs: 2,
    status: "Active",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= Math.floor(rating)
              ? "fill-warning-50 text-warning-50"
              : star - 0.5 <= rating
              ? "fill-warning-50/50 text-warning-50"
              : "text-neutral-30"
          }`}
        />
      ))}
      <span className="ml-1 text-xs font-medium text-neutral-70">{rating.toFixed(1)}</span>
    </div>
  )
}

function getOnTimeColor(pct: number) {
  if (pct >= 95) return "text-success-70"
  if (pct >= 90) return "text-warning-90"
  return "text-critical-60"
}

export default function VendorManagement() {
  const { navigateTo } = useNavigation()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVendors = vendors.filter(
    (v) =>
      searchTerm === "" ||
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.capabilities.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-100">Vendor Management</h2>
          <p className="text-sm text-neutral-60 mt-1">Manage outsourcing partners, rate cards and performance</p>
        </div>
        <button className="flex items-center gap-2 h-10 px-5 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          Add Vendor
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-50" />
        <input
          type="text"
          placeholder="Search vendors or capabilities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-9 pl-9 pr-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
        />
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            onClick={() => navigateTo("vendor-detail", { vendorId: vendor.id })}
            className="border border-neutral-20 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow bg-white"
          >
            {/* Top row: name + status */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-semibold text-neutral-100">{vendor.name}</h3>
                <p className="text-sm text-neutral-60 mt-0.5">{vendor.contactName}</p>
                <p className="text-xs text-neutral-50 mt-0.5">{vendor.email}</p>
              </div>
              <div className="flex items-center gap-2">
                {vendor.activePOs > 0 && (
                  <span className="flex items-center gap-1 text-xs font-medium bg-info-10 text-info-90 px-2 py-0.5 rounded">
                    <Package className="h-3 w-3" />
                    {vendor.activePOs} POs
                  </span>
                )}
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    vendor.status === "Active"
                      ? "bg-success-10 text-success-90"
                      : "bg-neutral-10 text-neutral-60"
                  }`}
                >
                  {vendor.status}
                </span>
              </div>
            </div>

            {/* Capabilities */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {vendor.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="text-xs px-2 py-0.5 bg-neutral-10 text-neutral-70 rounded font-medium"
                >
                  {cap}
                </span>
              ))}
            </div>

            {/* Performance Metrics */}
            <div className="flex items-center gap-6 pt-3 border-t border-neutral-20">
              <div>
                <div className="text-xs text-neutral-50 mb-0.5">On-Time</div>
                <div className={`text-sm font-semibold ${getOnTimeColor(vendor.onTimePercent)}`}>
                  {vendor.onTimePercent}%
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-50 mb-0.5">Quality</div>
                <StarRating rating={vendor.qualityRating} />
              </div>
              <div>
                <div className="text-xs text-neutral-50 mb-0.5">Avg Lead Time</div>
                <div className="text-sm font-medium text-neutral-100">{vendor.avgLeadTime}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
