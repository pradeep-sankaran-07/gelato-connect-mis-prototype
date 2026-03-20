"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  Clock,
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Circle,
  Weight,
  Ruler,
  CircleDollarSign,
  Printer,
  Copy,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useNavigation } from "@/lib/navigation-context"

interface TrackingEvent {
  id: string
  status: string
  location: string
  timestamp: string
  description: string
  isCurrent: boolean
}

const shipmentData = {
  id: "SHP-001",
  orderNumber: "ORD-2026-0147",
  customer: "PrintCo Ltd",
  status: "in-transit",
  type: "Parcel" as const,
  carrier: "FedEx",
  service: "International Priority",
  trackingNumber: "7489 2735 0012 3456",
  estimatedDelivery: "Mar 18, 2026",
  weight: "4.8 kg",
  dimensions: "40 x 30 x 15 cm",
  pieces: 2,
  origin: {
    name: "GelatoConnect Warehouse",
    address: "456 Print Avenue",
    city: "Berlin",
    country: "Germany",
    postal: "10115",
  },
  destination: {
    name: "PrintCo Ltd",
    contact: "James Wilson",
    address: "123 Business Street",
    city: "London",
    country: "United Kingdom",
    postal: "SW1A 1AA",
    phone: "+44 20 7123 4567",
  },
  costs: {
    baseRate: 24.50,
    fuelSurcharge: 3.68,
    insurance: 1.20,
    total: 29.38,
  },
  bol: {
    number: "BOL-2026-03-15-001",
    issued: "Mar 15, 2026",
  },
  shippingLabel: {
    carrier: "FedEx",
    service: "International Priority",
    trackingBarcode: "7489273500123456",
    weight: "4.8 kg",
    fromZip: "10115",
    toZip: "SW1A 1AA",
  },
}

const trackingEvents: TrackingEvent[] = [
  {
    id: "evt-1",
    status: "Shipment Created",
    location: "Berlin, Germany",
    timestamp: "Mar 15, 2026 — 08:15",
    description: "Shipping label created and pickup scheduled",
    isCurrent: false,
  },
  {
    id: "evt-2",
    status: "Picked Up at Origin",
    location: "Berlin, Germany",
    timestamp: "Mar 15, 2026 — 10:30",
    description: "Package picked up by FedEx courier",
    isCurrent: false,
  },
  {
    id: "evt-3",
    status: "Departed Facility",
    location: "Berlin Sort Hub, Germany",
    timestamp: "Mar 15, 2026 — 14:45",
    description: "Package departed FedEx Berlin sorting facility",
    isCurrent: false,
  },
  {
    id: "evt-4",
    status: "In Transit",
    location: "Frankfurt Hub, Germany",
    timestamp: "Mar 15, 2026 — 18:00",
    description: "Package in transit through Frankfurt international hub",
    isCurrent: false,
  },
  {
    id: "evt-5",
    status: "Arrived at Destination Country",
    location: "London Stansted, UK",
    timestamp: "Mar 16, 2026 — 06:20",
    description: "Customs clearance completed — package released",
    isCurrent: false,
  },
  {
    id: "evt-6",
    status: "In Transit — Local Delivery",
    location: "London Depot, UK",
    timestamp: "Mar 16, 2026 — 11:45",
    description: "Package at local FedEx depot, out for delivery",
    isCurrent: true,
  },
]

export default function ShipmentDetailView() {
  const { goBack } = useNavigation()
  const [showBOLPreview, setShowBOLPreview] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-success-10 text-success-90 border-0">Delivered</Badge>
      case "in-transit":
        return <Badge className="bg-info-10 text-info-90 border-0">In Transit</Badge>
      case "pending":
        return <Badge className="bg-warning-10 text-warning-90 border-0">Pending</Badge>
      case "exception":
        return <Badge className="bg-critical-10 text-critical-90 border-0">Exception</Badge>
      default:
        return <Badge className="bg-neutral-10 text-neutral-90 border-0">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Parcel":
        return <Badge className="bg-info-20 text-info-90 border-0">Parcel</Badge>
      case "Pallet":
        return <Badge className="bg-warning-20 text-warning-90 border-0">Pallet</Badge>
      case "Freight":
        return <Badge className="bg-neutral-20 text-neutral-90 border-0">Freight</Badge>
      default:
        return <Badge className="bg-neutral-10 text-neutral-90 border-0">{type}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-neutral-100">
              Shipment {shipmentData.id}
            </h1>
            {getStatusBadge(shipmentData.status)}
            {getTypeBadge(shipmentData.type)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full border-neutral-40">
            <Printer className="h-4 w-4 mr-1" />
            Print Label
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-neutral-40">
            <ExternalLink className="h-4 w-4 mr-1" />
            Track on Carrier Site
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column — Shipment Details */}
        <div className="col-span-2 space-y-6">
          {/* Shipment Info */}
          <div className="bg-white rounded-lg border border-neutral-20 p-5">
            <h2 className="text-base font-semibold text-neutral-100 mb-4 flex items-center gap-2">
              <Truck className="h-4 w-4 text-neutral-60" />
              Shipment Information
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium text-neutral-50 mb-1">Order Number</p>
                <p className="text-sm font-medium text-neutral-100">{shipmentData.orderNumber}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-50 mb-1">Customer</p>
                <p className="text-sm font-medium text-neutral-100">{shipmentData.customer}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-50 mb-1">Shipment Type</p>
                <div>{getTypeBadge(shipmentData.type)}</div>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-50 mb-1">Carrier</p>
                <p className="text-sm font-medium text-neutral-100">{shipmentData.carrier}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-50 mb-1">Service</p>
                <p className="text-sm font-medium text-neutral-100">{shipmentData.service}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-50 mb-1">Est. Delivery</p>
                <p className="text-sm font-medium text-neutral-100">{shipmentData.estimatedDelivery}</p>
              </div>
              <div className="col-span-3">
                <p className="text-xs font-medium text-neutral-50 mb-1">Tracking Number</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono font-medium text-neutral-100">{shipmentData.trackingNumber}</p>
                  <button
                    className="text-neutral-50 hover:text-neutral-100 transition-colors"
                    onClick={() => navigator.clipboard?.writeText(shipmentData.trackingNumber)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="bg-white rounded-lg border border-neutral-20 p-5">
            <h2 className="text-base font-semibold text-neutral-100 mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-neutral-60" />
              Package Details
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-neutral-5 rounded-lg">
                <Weight className="h-5 w-5 text-neutral-50" />
                <div>
                  <p className="text-xs text-neutral-50">Weight</p>
                  <p className="text-sm font-semibold text-neutral-100">{shipmentData.weight}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-neutral-5 rounded-lg">
                <Ruler className="h-5 w-5 text-neutral-50" />
                <div>
                  <p className="text-xs text-neutral-50">Dimensions</p>
                  <p className="text-sm font-semibold text-neutral-100">{shipmentData.dimensions}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-neutral-5 rounded-lg">
                <Package className="h-5 w-5 text-neutral-50" />
                <div>
                  <p className="text-xs text-neutral-50">Pieces</p>
                  <p className="text-sm font-semibold text-neutral-100">{shipmentData.pieces}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-neutral-20 p-5">
              <h3 className="text-sm font-semibold text-neutral-100 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-neutral-50" />
                Ship From
              </h3>
              <div className="text-sm text-neutral-70 space-y-1">
                <p className="font-medium text-neutral-100">{shipmentData.origin.name}</p>
                <p>{shipmentData.origin.address}</p>
                <p>{shipmentData.origin.city}, {shipmentData.origin.postal}</p>
                <p>{shipmentData.origin.country}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-20 p-5">
              <h3 className="text-sm font-semibold text-neutral-100 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-info-70" />
                Ship To
              </h3>
              <div className="text-sm text-neutral-70 space-y-1">
                <p className="font-medium text-neutral-100">{shipmentData.destination.name}</p>
                <p className="text-xs text-neutral-50">Attn: {shipmentData.destination.contact}</p>
                <p>{shipmentData.destination.address}</p>
                <p>{shipmentData.destination.city}, {shipmentData.destination.postal}</p>
                <p>{shipmentData.destination.country}</p>
                <p className="text-xs text-neutral-50 pt-1">{shipmentData.destination.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Cost Breakdown */}
          <div className="bg-white rounded-lg border border-neutral-20 p-5">
            <h2 className="text-base font-semibold text-neutral-100 mb-4 flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-neutral-60" />
              Shipping Cost Breakdown
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-60">Base Rate ({shipmentData.carrier} {shipmentData.service})</span>
                <span className="text-neutral-100">&euro;{shipmentData.costs.baseRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-60">Fuel Surcharge (15%)</span>
                <span className="text-neutral-100">&euro;{shipmentData.costs.fuelSurcharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-60">Insurance</span>
                <span className="text-neutral-100">&euro;{shipmentData.costs.insurance.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-neutral-100">Total Shipping Cost</span>
                <span className="text-neutral-100">&euro;{shipmentData.costs.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* BOL Section */}
          <div className="bg-white rounded-lg border border-neutral-20 p-5">
            <h2 className="text-base font-semibold text-neutral-100 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-neutral-60" />
              Bill of Lading (BOL)
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-60">BOL Number</p>
                <p className="text-sm font-mono font-medium text-neutral-100">{shipmentData.bol.number}</p>
                <p className="text-xs text-neutral-50 mt-1">Issued: {shipmentData.bol.issued}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-neutral-40"
                  onClick={() => setShowBOLPreview(!showBOLPreview)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {showBOLPreview ? "Hide BOL" : "View BOL"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-neutral-40"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download BOL PDF
                </Button>
              </div>
            </div>

            {showBOLPreview && (
              <div className="mt-4 border border-neutral-20 rounded-lg p-6 bg-neutral-5">
                <div className="max-w-[600px] mx-auto bg-white border border-neutral-30 rounded p-6 shadow-sm">
                  <div className="text-center border-b border-neutral-20 pb-4 mb-4">
                    <h3 className="text-lg font-bold text-neutral-100">BILL OF LADING</h3>
                    <p className="text-xs text-neutral-50 mt-1">Straight Bill of Lading — Non-Negotiable</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-neutral-70 mb-1">BOL Number</p>
                      <p className="text-neutral-100">{shipmentData.bol.number}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-70 mb-1">Date</p>
                      <p className="text-neutral-100">{shipmentData.bol.issued}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-70 mb-1">Shipper</p>
                      <p className="text-neutral-100">{shipmentData.origin.name}</p>
                      <p className="text-neutral-60">{shipmentData.origin.address}, {shipmentData.origin.city}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-70 mb-1">Consignee</p>
                      <p className="text-neutral-100">{shipmentData.destination.name}</p>
                      <p className="text-neutral-60">{shipmentData.destination.address}, {shipmentData.destination.city}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-70 mb-1">Carrier</p>
                      <p className="text-neutral-100">{shipmentData.carrier} — {shipmentData.service}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-70 mb-1">Tracking</p>
                      <p className="text-neutral-100 font-mono">{shipmentData.trackingNumber}</p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-neutral-20 pt-4">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-neutral-20">
                          <th className="text-left py-1 font-semibold text-neutral-70">Description</th>
                          <th className="text-right py-1 font-semibold text-neutral-70">Pieces</th>
                          <th className="text-right py-1 font-semibold text-neutral-70">Weight</th>
                          <th className="text-right py-1 font-semibold text-neutral-70">Dimensions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 text-neutral-100">Printed materials — Brochures</td>
                          <td className="py-2 text-right text-neutral-100">{shipmentData.pieces}</td>
                          <td className="py-2 text-right text-neutral-100">{shipmentData.weight}</td>
                          <td className="py-2 text-right text-neutral-100">{shipmentData.dimensions}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-20 text-[10px] text-neutral-50 text-center">
                    This is a non-negotiable bill of lading. Received the goods described above in apparent good order.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Shipping Label Preview */}
          <div className="bg-white rounded-lg border border-neutral-20 p-5">
            <h2 className="text-base font-semibold text-neutral-100 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-neutral-60" />
              Shipping Label
            </h2>
            <div className="border border-neutral-20 rounded-lg p-5 bg-neutral-5">
              <div className="max-w-[400px] mx-auto bg-white border-2 border-neutral-100 rounded p-4">
                {/* Carrier header */}
                <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-neutral-100 rounded flex items-center justify-center">
                      <Truck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-100">{shipmentData.shippingLabel.carrier}</p>
                      <p className="text-[10px] text-neutral-60">{shipmentData.shippingLabel.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-neutral-50">TRACKING</p>
                    <p className="text-xs font-mono font-bold text-neutral-100">{shipmentData.trackingNumber}</p>
                  </div>
                </div>

                {/* From / To */}
                <div className="grid grid-cols-2 gap-3 text-[10px] mb-3">
                  <div>
                    <p className="font-bold text-neutral-70 uppercase mb-0.5">From</p>
                    <p className="text-neutral-100 font-medium">{shipmentData.origin.name}</p>
                    <p className="text-neutral-60">{shipmentData.origin.address}</p>
                    <p className="text-neutral-60">{shipmentData.origin.city}, {shipmentData.origin.postal}</p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-70 uppercase mb-0.5">To</p>
                    <p className="text-neutral-100 font-medium">{shipmentData.destination.name}</p>
                    <p className="text-neutral-60">{shipmentData.destination.address}</p>
                    <p className="text-neutral-60">{shipmentData.destination.city}, {shipmentData.destination.postal}</p>
                  </div>
                </div>

                {/* Barcode placeholder */}
                <div className="border-t-2 border-neutral-100 pt-2">
                  <div className="flex flex-col items-center">
                    <div className="w-full h-12 bg-gradient-to-r from-neutral-100 via-white to-neutral-100 bg-[length:4px_100%] bg-repeat-x flex items-center justify-center">
                      <div className="flex gap-[2px]">
                        {Array.from({ length: 40 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-neutral-100"
                            style={{
                              width: Math.random() > 0.5 ? "2px" : "1px",
                              height: `${32 + Math.random() * 16}px`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-mono mt-1 text-neutral-100">{shipmentData.shippingLabel.trackingBarcode}</p>
                  </div>
                </div>

                {/* Weight / Route */}
                <div className="flex justify-between mt-2 text-[10px] text-neutral-60">
                  <span>WT: {shipmentData.shippingLabel.weight}</span>
                  <span>{shipmentData.shippingLabel.fromZip} &rarr; {shipmentData.shippingLabel.toZip}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Tracking Timeline */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-neutral-20 p-5 sticky top-6">
            <h2 className="text-base font-semibold text-neutral-100 mb-1 flex items-center gap-2">
              <Clock className="h-4 w-4 text-neutral-60" />
              Tracking Timeline
            </h2>
            <p className="text-xs text-neutral-50 mb-5">
              Est. delivery: {shipmentData.estimatedDelivery}
            </p>

            <div className="relative">
              {trackingEvents.slice().reverse().map((event, index) => {
                const isFirst = index === 0
                const isLast = index === trackingEvents.length - 1

                return (
                  <div key={event.id} className="relative flex gap-3 pb-6 last:pb-0">
                    {/* Timeline line */}
                    {!isLast && (
                      <div className="absolute left-[11px] top-[24px] bottom-0 w-[2px] bg-neutral-20" />
                    )}

                    {/* Timeline dot */}
                    <div className="relative z-10 mt-0.5 flex-shrink-0">
                      {event.isCurrent ? (
                        <div className="w-6 h-6 rounded-full bg-info-60 flex items-center justify-center">
                          <Truck className="h-3 w-3 text-white" />
                        </div>
                      ) : isFirst && !event.isCurrent ? (
                        <div className="w-6 h-6 rounded-full bg-info-20 flex items-center justify-center">
                          <Circle className="h-3 w-3 text-info-70" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-success-10 flex items-center justify-center">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success-70" />
                        </div>
                      )}
                    </div>

                    {/* Event content */}
                    <div className={`flex-1 ${event.isCurrent ? "bg-info-10 rounded-lg p-3 -mt-1 -mr-1" : ""}`}>
                      <p className={`text-sm font-medium ${event.isCurrent ? "text-info-90" : "text-neutral-100"}`}>
                        {event.status}
                      </p>
                      <p className="text-xs text-neutral-50 mt-0.5">{event.location}</p>
                      <p className="text-xs text-neutral-50">{event.timestamp}</p>
                      <p className="text-xs text-neutral-60 mt-1">{event.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
