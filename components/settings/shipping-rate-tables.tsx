"use client"

import { useState } from "react"
import {
  Plus,
  Upload,
  Download,
  Pencil,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"

type CarrierTab = "fedex" | "ups" | "dhl" | "custom"
type RateType = "parcel" | "freight"

interface RateRow {
  id: string
  zone: string
  zoneCode: string
  weightRange: string
  baseRate: number
  fuelSurcharge: number
  total: number
  overridden: boolean
}

interface FreightRateRow {
  id: string
  zone: string
  zoneCode: string
  palletRange: string
  ratePerPallet: number
  fuelSurcharge: number
  total: number
  overridden: boolean
}

const carrierTabs: { key: CarrierTab; label: string }[] = [
  { key: "fedex", label: "FedEx" },
  { key: "ups", label: "UPS" },
  { key: "dhl", label: "DHL" },
  { key: "custom", label: "Custom / Freight" },
]

const generateParcelRates = (carrier: CarrierTab): RateRow[] => {
  const zones = [
    { zone: "UK Domestic", code: "UK-UK" },
    { zone: "UK \u2192 EU", code: "UK-EU" },
    { zone: "UK \u2192 US", code: "UK-US" },
    { zone: "UK \u2192 ROW", code: "UK-ROW" },
  ]
  const weightTiers = ["0\u20131 kg", "1\u20135 kg", "5\u201310 kg", "10\u201325 kg", "25\u201350 kg"]

  const baseMultiplier = carrier === "fedex" ? 1.0 : carrier === "ups" ? 1.05 : carrier === "dhl" ? 0.95 : 0.85
  const fuelPct = carrier === "fedex" ? 15 : carrier === "ups" ? 14.5 : carrier === "dhl" ? 13 : 10

  const rows: RateRow[] = []
  let id = 0
  zones.forEach((z, zi) => {
    weightTiers.forEach((w, wi) => {
      const base = Math.round((3.5 + zi * 4.5 + wi * 3.2) * baseMultiplier * 100) / 100
      const fuel = Math.round(base * (fuelPct / 100) * 100) / 100
      rows.push({
        id: `${carrier}-p-${id++}`,
        zone: z.zone,
        zoneCode: z.code,
        weightRange: w,
        baseRate: base,
        fuelSurcharge: fuel,
        total: Math.round((base + fuel) * 100) / 100,
        overridden: (zi === 1 && wi === 2) || (zi === 3 && wi === 0),
      })
    })
  })
  return rows
}

const generateFreightRates = (carrier: CarrierTab): FreightRateRow[] => {
  const zones = [
    { zone: "UK Domestic", code: "UK-UK" },
    { zone: "UK \u2192 EU", code: "UK-EU" },
    { zone: "UK \u2192 US", code: "UK-US" },
    { zone: "UK \u2192 ROW", code: "UK-ROW" },
  ]
  const palletTiers = ["1\u20134 pallets", "5\u201310 pallets", "11+ pallets"]

  const baseMultiplier = carrier === "custom" ? 0.9 : carrier === "fedex" ? 1.1 : carrier === "ups" ? 1.15 : 1.0
  const fuelPct = carrier === "custom" ? 8 : 12

  const rows: FreightRateRow[] = []
  let id = 0
  zones.forEach((z, zi) => {
    palletTiers.forEach((p, pi) => {
      const base = Math.round((45 + zi * 35 - pi * 8) * baseMultiplier * 100) / 100
      const fuel = Math.round(base * (fuelPct / 100) * 100) / 100
      rows.push({
        id: `${carrier}-f-${id++}`,
        zone: z.zone,
        zoneCode: z.code,
        palletRange: p,
        ratePerPallet: base,
        fuelSurcharge: fuel,
        total: Math.round((base + fuel) * 100) / 100,
        overridden: zi === 2 && pi === 0,
      })
    })
  })
  return rows
}

export default function ShippingRateTables() {
  const { goBack } = useNavigation()
  const [activeCarrier, setActiveCarrier] = useState<CarrierTab>("fedex")
  const [activeRateType, setActiveRateType] = useState<RateType>("parcel")
  const [editingCell, setEditingCell] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const parcelRates = generateParcelRates(activeCarrier)
  const freightRates = generateFreightRates(activeCarrier)

  const handleEditStart = (cellId: string, currentValue: number) => {
    setEditingCell(cellId)
    setEditValue(currentValue.toFixed(2))
  }

  const handleEditCancel = () => {
    setEditingCell(null)
    setEditValue("")
  }

  const handleEditConfirm = () => {
    // In real app, this would update the rate
    setEditingCell(null)
    setEditValue("")
  }

  const renderEditableCell = (cellId: string, value: number, overridden: boolean) => {
    if (editingCell === cellId) {
      return (
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-20 h-7 px-2 text-sm border border-neutral-90 rounded bg-white focus:outline-none"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditConfirm()
              if (e.key === "Escape") handleEditCancel()
            }}
          />
          <button onClick={handleEditConfirm} className="text-success-70 hover:text-success-90">
            <Check className="h-3.5 w-3.5" />
          </button>
          <button onClick={handleEditCancel} className="text-neutral-50 hover:text-neutral-90">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )
    }

    return (
      <button
        onClick={() => handleEditStart(cellId, value)}
        className="group flex items-center gap-1.5 hover:text-neutral-100 transition-colors"
      >
        <span className="relative">
          {overridden && (
            <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-warning-50" />
          )}
          &euro;{value.toFixed(2)}
        </span>
        <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-100 text-neutral-50 transition-opacity" />
      </button>
    )
  }

  // Group rates by zone for display
  const groupedParcelRates: Record<string, RateRow[]> = {}
  parcelRates.forEach((r) => {
    if (!groupedParcelRates[r.zone]) groupedParcelRates[r.zone] = []
    groupedParcelRates[r.zone].push(r)
  })

  const groupedFreightRates: Record<string, FreightRateRow[]> = {}
  freightRates.forEach((r) => {
    if (!groupedFreightRates[r.zone]) groupedFreightRates[r.zone] = []
    groupedFreightRates[r.zone].push(r)
  })

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100">Shipping Rate Tables</h1>
          <p className="text-sm text-neutral-60 mt-1">Configure shipping rates by carrier, zone, and weight</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full border-neutral-40">
            <Upload className="h-4 w-4 mr-1" />
            Import CSV
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-neutral-40">
            <Download className="h-4 w-4 mr-1" />
            Export CSV
          </Button>
          <Button size="sm" className="rounded-full bg-neutral-100 text-white hover:bg-neutral-90">
            <Plus className="h-4 w-4 mr-1" />
            Add Rate Table
          </Button>
        </div>
      </div>

      {/* Carrier Tabs */}
      <div className="border-b border-neutral-20">
        <div className="flex gap-0">
          {carrierTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveCarrier(tab.key); setActiveRateType("parcel") }}
              className={`px-4 py-2.5 text-sm font-medium relative transition-colors ${
                activeCarrier === tab.key
                  ? "text-neutral-100"
                  : "text-neutral-50 hover:text-neutral-70"
              }`}
            >
              {tab.label}
              {activeCarrier === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-100 rounded-t" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Rate Type Sub-tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveRateType("parcel")}
          className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-colors ${
            activeRateType === "parcel"
              ? "bg-neutral-100 text-white border-neutral-100"
              : "bg-white text-neutral-70 border-neutral-30 hover:border-neutral-50"
          }`}
        >
          Parcel Rates
        </button>
        <button
          onClick={() => setActiveRateType("freight")}
          className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-colors ${
            activeRateType === "freight"
              ? "bg-neutral-100 text-white border-neutral-100"
              : "bg-white text-neutral-70 border-neutral-30 hover:border-neutral-50"
          }`}
        >
          Pallet / Freight Rates
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-neutral-50">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-warning-50" />
          Manually overridden rate
        </span>
        <span>Click any rate to edit</span>
      </div>

      {/* Parcel Rates Table */}
      {activeRateType === "parcel" && (
        <div className="border border-neutral-20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-5">
                <th className="text-left text-xs font-medium text-neutral-70 px-4 py-3 border-b border-neutral-20 w-[180px]">
                  Zone
                </th>
                <th className="text-left text-xs font-medium text-neutral-70 px-4 py-3 border-b border-neutral-20 w-[100px]">
                  Weight Range
                </th>
                <th className="text-right text-xs font-medium text-neutral-70 px-4 py-3 border-b border-neutral-20">
                  Base Rate
                </th>
                <th className="text-right text-xs font-medium text-neutral-70 px-4 py-3 border-b border-neutral-20">
                  Fuel Surcharge %
                </th>
                <th className="text-right text-xs font-medium text-neutral-70 px-4 py-3 border-b border-neutral-20">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedParcelRates).map(([zone, rates], zoneIndex) => (
                rates.map((rate, rateIndex) => (
                  <tr
                    key={rate.id}
                    className={`hover:bg-neutral-5 transition-colors ${
                      zoneIndex > 0 && rateIndex === 0 ? "border-t-2 border-neutral-20" : ""
                    }`}
                  >
                    {rateIndex === 0 && (
                      <td
                        className="px-4 py-2.5 text-sm font-medium text-neutral-100 border-b border-neutral-20 align-top"
                        rowSpan={rates.length}
                      >
                        <div>{rate.zone}</div>
                        <div className="text-xs font-normal text-neutral-50 mt-0.5">{rate.zoneCode}</div>
                      </td>
                    )}
                    <td className="px-4 py-2.5 text-sm text-neutral-70 border-b border-neutral-20">
                      {rate.weightRange}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-neutral-100 text-right border-b border-neutral-20">
                      {renderEditableCell(`${rate.id}-base`, rate.baseRate, rate.overridden)}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-neutral-60 text-right border-b border-neutral-20">
                      &euro;{rate.fuelSurcharge.toFixed(2)}
                    </td>
                    <td className="px-4 py-2.5 text-sm font-medium text-neutral-100 text-right border-b border-neutral-20">
                      &euro;{rate.total.toFixed(2)}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Freight Rates Table */}
      {activeRateType === "freight" && (
        <div className="border border-neutral-20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-5">
                <th className="text-left text-xs font-medium text-neutral-70 px-4 py-3 border-b border-neutral-20 w-[180px]">
                  Zone
                </th>
                <th className="text-left text-xs font-medium text-neutral-70 px-4 py-3 border-b border-neutral-20 w-[140px]">
                  Pallet Count
                </th>
                <th className="text-right text-xs font-medium text-neutral-70 px-4 py-3 border-b border-neutral-20">
                  Rate / Pallet
                </th>
                <th className="text-right text-xs font-medium text-neutral-70 px-4 py-3 border-b border-neutral-20">
                  Fuel Surcharge
                </th>
                <th className="text-right text-xs font-medium text-neutral-70 px-4 py-3 border-b border-neutral-20">
                  Total / Pallet
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedFreightRates).map(([zone, rates], zoneIndex) => (
                rates.map((rate, rateIndex) => (
                  <tr
                    key={rate.id}
                    className={`hover:bg-neutral-5 transition-colors ${
                      zoneIndex > 0 && rateIndex === 0 ? "border-t-2 border-neutral-20" : ""
                    }`}
                  >
                    {rateIndex === 0 && (
                      <td
                        className="px-4 py-2.5 text-sm font-medium text-neutral-100 border-b border-neutral-20 align-top"
                        rowSpan={rates.length}
                      >
                        <div>{rate.zone}</div>
                        <div className="text-xs font-normal text-neutral-50 mt-0.5">{rate.zoneCode}</div>
                      </td>
                    )}
                    <td className="px-4 py-2.5 text-sm text-neutral-70 border-b border-neutral-20">
                      {rate.palletRange}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-neutral-100 text-right border-b border-neutral-20">
                      {renderEditableCell(`${rate.id}-base`, rate.ratePerPallet, rate.overridden)}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-neutral-60 text-right border-b border-neutral-20">
                      &euro;{rate.fuelSurcharge.toFixed(2)}
                    </td>
                    <td className="px-4 py-2.5 text-sm font-medium text-neutral-100 text-right border-b border-neutral-20">
                      &euro;{rate.total.toFixed(2)}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary */}
      <div className="flex items-center justify-between text-xs text-neutral-50 pt-2">
        <span>
          {activeRateType === "parcel"
            ? `${parcelRates.length} parcel rates configured`
            : `${freightRates.length} freight rates configured`}
          {" \u2022 "}
          Last updated: Mar 10, 2026
        </span>
        <span>
          Fuel surcharge rates are reviewed monthly
        </span>
      </div>
    </div>
  )
}
