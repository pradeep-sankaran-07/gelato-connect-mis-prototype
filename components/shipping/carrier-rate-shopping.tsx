"use client"

import { useState, useMemo } from "react"
import {
  ArrowUpDown,
  Check,
  Truck,
  Package,
  Clock,
  DollarSign,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ShipmentType = "parcel" | "pallet"
type SortBy = "price" | "transit" | "carrier"

interface RateResult {
  id: string
  carrier: string
  service: string
  transitDays: number
  rate: number
  guaranteed: boolean
  carrierColor: string
}

interface CarrierRateShoppingProps {
  onClose?: () => void
  onConfirm?: (rate: RateResult) => void
  defaultOrigin?: string
  defaultDestination?: string
  defaultWeight?: string
  defaultDimensions?: string
}

const parcelResults: RateResult[] = [
  {
    id: "rate-1",
    carrier: "FedEx",
    service: "International Priority",
    transitDays: 2,
    rate: 28.5,
    guaranteed: true,
    carrierColor: "#4D148C",
  },
  {
    id: "rate-2",
    carrier: "FedEx",
    service: "International Economy",
    transitDays: 4,
    rate: 18.9,
    guaranteed: false,
    carrierColor: "#4D148C",
  },
  {
    id: "rate-3",
    carrier: "UPS",
    service: "Express",
    transitDays: 2,
    rate: 31.2,
    guaranteed: true,
    carrierColor: "#351C15",
  },
  {
    id: "rate-4",
    carrier: "UPS",
    service: "Standard",
    transitDays: 3,
    rate: 22.4,
    guaranteed: false,
    carrierColor: "#351C15",
  },
  {
    id: "rate-5",
    carrier: "DHL",
    service: "Express",
    transitDays: 1,
    rate: 35.0,
    guaranteed: true,
    carrierColor: "#D40511",
  },
  {
    id: "rate-6",
    carrier: "DHL",
    service: "Economy",
    transitDays: 5,
    rate: 15.6,
    guaranteed: false,
    carrierColor: "#D40511",
  },
]

const palletResults: RateResult[] = [
  {
    id: "prate-1",
    carrier: "FedEx",
    service: "Freight Priority",
    transitDays: 3,
    rate: 185.0,
    guaranteed: true,
    carrierColor: "#4D148C",
  },
  {
    id: "prate-2",
    carrier: "FedEx",
    service: "Freight Economy",
    transitDays: 5,
    rate: 125.0,
    guaranteed: false,
    carrierColor: "#4D148C",
  },
  {
    id: "prate-3",
    carrier: "UPS",
    service: "Freight",
    transitDays: 4,
    rate: 165.0,
    guaranteed: false,
    carrierColor: "#351C15",
  },
  {
    id: "prate-4",
    carrier: "DHL",
    service: "Freight Express",
    transitDays: 2,
    rate: 220.0,
    guaranteed: true,
    carrierColor: "#D40511",
  },
  {
    id: "prate-5",
    carrier: "Local Freight Co.",
    service: "Pallet Delivery",
    transitDays: 5,
    rate: 95.0,
    guaranteed: false,
    carrierColor: "#6b6b6b",
  },
]

export default function CarrierRateShopping({
  onClose,
  onConfirm,
  defaultOrigin = "Berlin, Germany (10115)",
  defaultDestination = "London, UK (SW1A 1AA)",
  defaultWeight = "5.0",
  defaultDimensions = "40 x 30 x 15",
}: CarrierRateShoppingProps) {
  const [origin, setOrigin] = useState(defaultOrigin)
  const [destination, setDestination] = useState(defaultDestination)
  const [weight, setWeight] = useState(defaultWeight)
  const [dimensions, setDimensions] = useState(defaultDimensions)
  const [shipmentType, setShipmentType] = useState<ShipmentType>("parcel")
  const [sortBy, setSortBy] = useState<SortBy>("price")
  const [selectedRate, setSelectedRate] = useState<string | null>(null)

  const results = shipmentType === "parcel" ? parcelResults : palletResults

  const sortedResults = useMemo(() => {
    const sorted = [...results]
    switch (sortBy) {
      case "price":
        sorted.sort((a, b) => a.rate - b.rate)
        break
      case "transit":
        sorted.sort((a, b) => a.transitDays - b.transitDays)
        break
      case "carrier":
        sorted.sort((a, b) => a.carrier.localeCompare(b.carrier))
        break
    }
    return sorted
  }, [results, sortBy])

  const selectedRateData = results.find((r) => r.id === selectedRate)

  return (
    <div className="bg-white rounded-xl border border-neutral-20 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-neutral-20 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-100">Carrier Rate Shopping</h2>
          <p className="text-xs text-neutral-50 mt-0.5">Compare rates across carriers and services</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-neutral-50 hover:text-neutral-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className="px-5 py-4 bg-neutral-5 border-b border-neutral-20">
        <div className="grid grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-neutral-70 mb-1">Origin</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full h-9 px-3 rounded-lg text-sm border border-neutral-30 bg-white focus:outline-none focus:border-neutral-90 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-neutral-70 mb-1">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full h-9 px-3 rounded-lg text-sm border border-neutral-30 bg-white focus:outline-none focus:border-neutral-90 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-neutral-70 mb-1">Weight (kg)</label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full h-9 px-3 rounded-lg text-sm border border-neutral-30 bg-white focus:outline-none focus:border-neutral-90 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-neutral-70 mb-1">Dimensions (cm)</label>
            <input
              type="text"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              className="w-full h-9 px-3 rounded-lg text-sm border border-neutral-30 bg-white focus:outline-none focus:border-neutral-90 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-neutral-70 mb-1">Type</label>
            <div className="flex h-9 rounded-lg border border-neutral-30 overflow-hidden">
              <button
                onClick={() => { setShipmentType("parcel"); setSelectedRate(null) }}
                className={`flex-1 text-xs font-medium transition-colors ${
                  shipmentType === "parcel"
                    ? "bg-neutral-100 text-white"
                    : "bg-white text-neutral-60 hover:bg-neutral-5"
                }`}
              >
                Parcel
              </button>
              <button
                onClick={() => { setShipmentType("pallet"); setSelectedRate(null) }}
                className={`flex-1 text-xs font-medium border-l border-neutral-30 transition-colors ${
                  shipmentType === "pallet"
                    ? "bg-neutral-100 text-white"
                    : "bg-white text-neutral-60 hover:bg-neutral-5"
                }`}
              >
                Pallet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sort controls */}
      <div className="px-5 py-3 flex items-center justify-between border-b border-neutral-20">
        <div className="flex items-center gap-1 text-xs text-neutral-50">
          <ArrowUpDown className="h-3.5 w-3.5" />
          <span>Sort by:</span>
          {(["price", "transit", "carrier"] as SortBy[]).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                sortBy === s
                  ? "bg-neutral-100 text-white"
                  : "text-neutral-60 hover:bg-neutral-5"
              }`}
            >
              {s === "price" ? "Price" : s === "transit" ? "Transit Time" : "Carrier"}
            </button>
          ))}
        </div>
        <span className="text-xs text-neutral-50">
          {sortedResults.length} options found
        </span>
      </div>

      {/* Results Table */}
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-neutral-5">
              <th className="text-left text-[11px] font-medium text-neutral-70 px-5 py-2.5 border-b border-neutral-20">
                Carrier
              </th>
              <th className="text-left text-[11px] font-medium text-neutral-70 px-3 py-2.5 border-b border-neutral-20">
                Service
              </th>
              <th className="text-center text-[11px] font-medium text-neutral-70 px-3 py-2.5 border-b border-neutral-20">
                Transit
              </th>
              <th className="text-right text-[11px] font-medium text-neutral-70 px-3 py-2.5 border-b border-neutral-20">
                Rate
              </th>
              <th className="text-center text-[11px] font-medium text-neutral-70 px-3 py-2.5 border-b border-neutral-20">
                Guaranteed
              </th>
              <th className="text-right text-[11px] font-medium text-neutral-70 px-5 py-2.5 border-b border-neutral-20">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((rate, index) => {
              const isSelected = selectedRate === rate.id
              const isCheapest = index === 0 && sortBy === "price"
              const isFastest = index === 0 && sortBy === "transit"

              return (
                <tr
                  key={rate.id}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-info-10 border-l-2 border-l-info-60"
                      : "hover:bg-neutral-5 border-l-2 border-l-transparent"
                  }`}
                  onClick={() => setSelectedRate(rate.id)}
                >
                  <td className="px-5 py-3 border-b border-neutral-20">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: rate.carrierColor }}
                      >
                        <Truck className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-neutral-100">{rate.carrier}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 border-b border-neutral-20">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-70">{rate.service}</span>
                      {isCheapest && (
                        <Badge className="bg-success-10 text-success-90 border-0 text-[10px] px-1.5 py-0">
                          Best Price
                        </Badge>
                      )}
                      {isFastest && (
                        <Badge className="bg-info-10 text-info-90 border-0 text-[10px] px-1.5 py-0">
                          Fastest
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3 border-b border-neutral-20 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-neutral-50" />
                      <span className="text-sm text-neutral-100 font-medium">
                        {rate.transitDays} {rate.transitDays === 1 ? "day" : "days"}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 border-b border-neutral-20 text-right">
                    <span className="text-sm font-semibold text-neutral-100">
                      &euro;{rate.rate.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-3 py-3 border-b border-neutral-20 text-center">
                    {rate.guaranteed ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-success-10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-success-70" />
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-40">\u2014</span>
                    )}
                  </td>
                  <td className="px-5 py-3 border-b border-neutral-20 text-right">
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className={`rounded-full text-xs h-7 px-3 ${
                        isSelected
                          ? "bg-neutral-100 text-white hover:bg-neutral-90"
                          : "border-neutral-40"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedRate(rate.id)
                      }}
                    >
                      {isSelected ? "Selected" : "Select"}
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-neutral-20 bg-neutral-5 flex items-center justify-between">
        <div className="text-xs text-neutral-50">
          {selectedRateData ? (
            <span>
              Selected: <span className="font-medium text-neutral-100">{selectedRateData.carrier} {selectedRateData.service}</span>
              {" \u2014 "}
              <span className="font-semibold text-neutral-100">&euro;{selectedRateData.rate.toFixed(2)}</span>
              {" \u2014 "}
              {selectedRateData.transitDays} {selectedRateData.transitDays === 1 ? "day" : "days"} transit
            </span>
          ) : (
            "Select a rate to continue"
          )}
        </div>
        <div className="flex items-center gap-2">
          {onClose && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-neutral-40"
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
          <Button
            size="sm"
            className="rounded-full bg-neutral-100 text-white hover:bg-neutral-90"
            disabled={!selectedRate}
            onClick={() => selectedRateData && onConfirm?.(selectedRateData)}
          >
            Confirm Selection
          </Button>
        </div>
      </div>
    </div>
  )
}
