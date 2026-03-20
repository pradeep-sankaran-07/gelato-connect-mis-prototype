"use client"

import { useState } from "react"
import { Filter, Download, RotateCcw, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterState {
  dateFrom: string
  dateTo: string
  customers: string[]
  categories: string[]
  estimator: string
}

const customerOptions = [
  "Acme Corp",
  "PrintMax Ltd",
  "Nordic Design",
  "Gelato Partners",
  "BrandHouse",
  "EcoPackaging",
  "Metro Books",
  "SignWorld",
  "EventPro",
  "DigitalFirst",
]

const categoryOptions = [
  "Brochures",
  "Business Cards",
  "Posters",
  "Catalogs",
  "Flyers",
  "Labels",
  "Books",
  "Banners",
  "Stationery",
  "Packaging",
]

const estimatorOptions = ["All Estimators", "Maria Hansen", "Erik Lindberg", "Sofia Nilsson", "Lars Johansson"]

interface AnalyticsFiltersProps {
  onApply?: (filters: FilterState) => void
  onReset?: () => void
  onExport?: (format: "csv" | "excel" | "pdf") => void
  showEstimator?: boolean
  className?: string
}

export default function AnalyticsFilters({
  onApply,
  onReset,
  onExport,
  showEstimator = false,
  className = "",
}: AnalyticsFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateFrom: "2026-03-01",
    dateTo: "2026-03-19",
    customers: [],
    categories: [],
    estimator: "All Estimators",
  })
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  const handleApply = () => {
    onApply?.(filters)
  }

  const handleReset = () => {
    setFilters({
      dateFrom: "2026-03-01",
      dateTo: "2026-03-19",
      customers: [],
      categories: [],
      estimator: "All Estimators",
    })
    onReset?.()
  }

  const toggleCustomer = (customer: string) => {
    setFilters((prev) => ({
      ...prev,
      customers: prev.customers.includes(customer)
        ? prev.customers.filter((c) => c !== customer)
        : [...prev.customers, customer],
    }))
  }

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Date range */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-medium text-neutral-60">From</label>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))}
          className="h-8 px-2 text-xs rounded-lg border border-neutral-30 focus:border-neutral-90 focus:outline-none text-neutral-90"
        />
        <label className="text-xs font-medium text-neutral-60">To</label>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))}
          className="h-8 px-2 text-xs rounded-lg border border-neutral-30 focus:border-neutral-90 focus:outline-none text-neutral-90"
        />
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-neutral-20" />

      {/* Customer multi-select */}
      <div className="relative">
        <button
          onClick={() => { setShowCustomerDropdown(!showCustomerDropdown); setShowCategoryDropdown(false); setShowExportMenu(false) }}
          className="flex items-center gap-1.5 h-8 px-3 text-xs rounded-lg border border-neutral-30 hover:border-neutral-50 transition-colors text-neutral-80"
        >
          <Filter className="h-3 w-3 text-neutral-50" />
          {filters.customers.length > 0 ? `${filters.customers.length} Customer${filters.customers.length > 1 ? "s" : ""}` : "All Customers"}
          <ChevronDown className="h-3 w-3 text-neutral-40" />
        </button>
        {showCustomerDropdown && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-neutral-20 rounded-lg shadow-lg z-50 py-1 max-h-60 overflow-y-auto">
            {customerOptions.map((customer) => (
              <label key={customer} className="flex items-center gap-2 px-3 py-1.5 hover:bg-neutral-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.customers.includes(customer)}
                  onChange={() => toggleCustomer(customer)}
                  className="rounded border-neutral-40"
                />
                <span className="text-xs text-neutral-80">{customer}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category multi-select */}
      <div className="relative">
        <button
          onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCustomerDropdown(false); setShowExportMenu(false) }}
          className="flex items-center gap-1.5 h-8 px-3 text-xs rounded-lg border border-neutral-30 hover:border-neutral-50 transition-colors text-neutral-80"
        >
          {filters.categories.length > 0 ? `${filters.categories.length} Categor${filters.categories.length > 1 ? "ies" : "y"}` : "All Categories"}
          <ChevronDown className="h-3 w-3 text-neutral-40" />
        </button>
        {showCategoryDropdown && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-20 rounded-lg shadow-lg z-50 py-1 max-h-60 overflow-y-auto">
            {categoryOptions.map((cat) => (
              <label key={cat} className="flex items-center gap-2 px-3 py-1.5 hover:bg-neutral-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="rounded border-neutral-40"
                />
                <span className="text-xs text-neutral-80">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Estimator dropdown */}
      {showEstimator && (
        <select
          value={filters.estimator}
          onChange={(e) => setFilters((f) => ({ ...f, estimator: e.target.value }))}
          className="h-8 px-2 text-xs rounded-lg border border-neutral-30 focus:border-neutral-90 focus:outline-none text-neutral-80 bg-white"
        >
          {estimatorOptions.map((est) => (
            <option key={est} value={est}>
              {est}
            </option>
          ))}
        </select>
      )}

      {/* Separator */}
      <div className="w-px h-6 bg-neutral-20" />

      {/* Action buttons */}
      <Button
        onClick={handleApply}
        size="sm"
        className="h-8 text-xs bg-neutral-100 hover:bg-neutral-90 text-white rounded-full px-4"
      >
        Apply
      </Button>
      <Button
        onClick={handleReset}
        variant="outline"
        size="sm"
        className="h-8 text-xs rounded-full border-neutral-40 text-neutral-70 px-3"
      >
        <RotateCcw className="h-3 w-3 mr-1" />
        Reset
      </Button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Export */}
      <div className="relative">
        <Button
          onClick={() => { setShowExportMenu(!showExportMenu); setShowCustomerDropdown(false); setShowCategoryDropdown(false) }}
          variant="outline"
          size="sm"
          className="h-8 text-xs rounded-full border-neutral-40 text-neutral-70 px-3"
        >
          <Download className="h-3 w-3 mr-1" />
          Export
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
        {showExportMenu && (
          <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-neutral-20 rounded-lg shadow-lg z-50 py-1">
            {(["csv", "excel", "pdf"] as const).map((format) => (
              <button
                key={format}
                onClick={() => { onExport?.(format); setShowExportMenu(false) }}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-80 hover:bg-neutral-5"
              >
                Export as {format.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active filter tags */}
      {(filters.customers.length > 0 || filters.categories.length > 0) && (
        <div className="w-full flex flex-wrap gap-1.5 mt-1">
          {filters.customers.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-10 text-neutral-80 rounded text-[11px]">
              {c}
              <button onClick={() => toggleCustomer(c)} className="text-neutral-40 hover:text-neutral-70">
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
          {filters.categories.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 px-2 py-0.5 bg-info-10 text-info-90 rounded text-[11px]">
              {c}
              <button onClick={() => toggleCategory(c)} className="text-info-70 hover:text-info-90">
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
