"use client"

import { useState } from "react"
import { Plus, Copy, Trash2, Pencil, Search, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"

interface ImpositionTemplate {
  id: string
  name: string
  description: string
  sheetSize: string
  sheetDimensions: string
  nUp: number
  orientation: "Portrait" | "Landscape"
  rows: number
  cols: number
  lastUpdated: string
}

const templates: ImpositionTemplate[] = [
  {
    id: "tpl-001",
    name: "Business Card 12-Up",
    description: "Standard business card imposition for high-volume runs on SRA3 sheets",
    sheetSize: "SRA3",
    sheetDimensions: "320×450mm",
    nUp: 12,
    orientation: "Portrait",
    rows: 4,
    cols: 3,
    lastUpdated: "2026-03-15",
  },
  {
    id: "tpl-002",
    name: "A5 Brochure 4-Up",
    description: "A5 brochure layout optimised for duplex printing with crop marks",
    sheetSize: "SRA3",
    sheetDimensions: "320×450mm",
    nUp: 4,
    orientation: "Landscape",
    rows: 2,
    cols: 2,
    lastUpdated: "2026-03-12",
  },
  {
    id: "tpl-003",
    name: "A4 Poster 2-Up",
    description: "Two-up A4 poster layout with centre trim and bleed allowance",
    sheetSize: "SRA3",
    sheetDimensions: "320×450mm",
    nUp: 2,
    orientation: "Portrait",
    rows: 2,
    cols: 1,
    lastUpdated: "2026-03-10",
  },
  {
    id: "tpl-004",
    name: "DL Flyer 8-Up",
    description: "DL flyer gang-run layout for cost-effective short to medium runs",
    sheetSize: "SRA3",
    sheetDimensions: "320×450mm",
    nUp: 8,
    orientation: "Portrait",
    rows: 4,
    cols: 2,
    lastUpdated: "2026-03-08",
  },
  {
    id: "tpl-005",
    name: "A3 Magazine 1-Up",
    description: "Single-up A3 magazine cover or insert on SRA3 with full bleed",
    sheetSize: "SRA3",
    sheetDimensions: "320×450mm",
    nUp: 1,
    orientation: "Portrait",
    rows: 1,
    cols: 1,
    lastUpdated: "2026-03-05",
  },
]

function LayoutThumbnail({ rows, cols, orientation }: { rows: number; cols: number; orientation: string }) {
  const isLandscape = orientation === "Landscape"
  const svgW = isLandscape ? 120 : 90
  const svgH = isLandscape ? 80 : 120
  const pad = 6
  const cellW = (svgW - pad * 2 - (cols - 1) * 3) / cols
  const cellH = (svgH - pad * 2 - (rows - 1) * 3) / rows

  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="flex-shrink-0">
      <rect x={0} y={0} width={svgW} height={svgH} rx={4} fill="#f7f7f7" stroke="#e6e6e6" strokeWidth={1} />
      {/* Gripper area */}
      <rect x={0} y={0} width={svgW} height={4} rx={2} fill="#d4d4d4" />
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={pad + c * (cellW + 3)}
            y={pad + 2 + r * (cellH + 3)}
            width={cellW}
            height={cellH}
            rx={2}
            fill="white"
            stroke="#bdbdbd"
            strokeWidth={0.75}
          />
        ))
      )}
    </svg>
  )
}

export default function ImpositionTemplates() {
  const { navigateTo } = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-100">Imposition Templates</h2>
          <p className="text-sm text-neutral-60 mt-1">
            Manage reusable imposition layouts for production sheets
          </p>
        </div>
        <Button
          onClick={() => navigateTo("imposition-editor", { templateId: "new" })}
          className="bg-neutral-100 hover:bg-neutral-90 text-white rounded-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-50" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-lg border-neutral-20"
          />
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((template) => (
          <div
            key={template.id}
            onClick={() => navigateTo("imposition-editor", { templateId: template.id })}
            className="group border border-neutral-20 rounded-lg bg-white p-5 cursor-pointer transition-all hover:shadow-lg hover:border-neutral-30 active:scale-[0.98]"
          >
            {/* Top row: thumbnail + badges */}
            <div className="flex items-start gap-4 mb-3">
              <LayoutThumbnail rows={template.rows} cols={template.cols} orientation={template.orientation} />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-neutral-100 truncate">{template.name}</h3>
                <p className="text-xs text-neutral-60 mt-1 line-clamp-2">{template.description}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="bg-neutral-5 text-neutral-80 text-xs border-neutral-20">
                {template.sheetSize} ({template.sheetDimensions})
              </Badge>
              <Badge className="bg-info-10 text-info-90 text-xs border-neutral-20">
                {template.nUp}-Up
              </Badge>
              <Badge variant="outline" className="bg-neutral-5 text-neutral-70 text-xs border-neutral-20">
                {template.orientation}
              </Badge>
            </div>

            {/* Footer: date + actions */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-20">
              <span className="text-xs text-neutral-50">Updated {template.lastUpdated}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateTo("imposition-editor", { templateId: template.id })
                  }}
                  className="p-1.5 rounded-md hover:bg-neutral-5 text-neutral-60 hover:text-neutral-100"
                  title="Edit"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="p-1.5 rounded-md hover:bg-neutral-5 text-neutral-60 hover:text-neutral-100"
                  title="Duplicate"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="p-1.5 rounded-md hover:bg-critical-5 text-neutral-60 hover:text-critical-70"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <LayoutGrid className="w-12 h-12 text-neutral-30 mb-4" />
          <h3 className="text-base font-medium text-neutral-100 mb-1">No templates found</h3>
          <p className="text-sm text-neutral-60">Try adjusting your search query</p>
        </div>
      )}
    </div>
  )
}
