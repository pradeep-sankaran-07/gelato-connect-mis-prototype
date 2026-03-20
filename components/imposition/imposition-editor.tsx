"use client"

import { useState, useMemo } from "react"
import {
  ArrowLeft,
  Save,
  FileOutput,
  FileInput,
  ZoomIn,
  ZoomOut,
  Pencil,
  ChevronDown,
  Check,
  X,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"

// ── Sheet Size Presets ──
const sheetPresets: Record<string, { w: number; h: number }> = {
  SRA3: { w: 320, h: 450 },
  SRA4: { w: 225, h: 320 },
  B1: { w: 707, h: 1000 },
  B2: { w: 500, h: 707 },
  Custom: { w: 320, h: 450 },
}

// ── Template seed data (keyed by templateId param) ──
const templateSeeds: Record<string, {
  name: string; rows: number; cols: number; bleed: number; gripper: number; hGutter: number; vGutter: number; sheetSize: string; orientation: "Portrait" | "Landscape"
}> = {
  "tpl-001": { name: "Business Card 12-Up", rows: 4, cols: 3, bleed: 3, gripper: 10, hGutter: 4, vGutter: 4, sheetSize: "SRA3", orientation: "Portrait" },
  "tpl-002": { name: "A5 Brochure 4-Up", rows: 2, cols: 2, bleed: 3, gripper: 10, hGutter: 6, vGutter: 6, sheetSize: "SRA3", orientation: "Landscape" },
  "tpl-003": { name: "A4 Poster 2-Up", rows: 2, cols: 1, bleed: 3, gripper: 10, hGutter: 0, vGutter: 6, sheetSize: "SRA3", orientation: "Portrait" },
  "tpl-004": { name: "DL Flyer 8-Up", rows: 4, cols: 2, bleed: 3, gripper: 10, hGutter: 4, vGutter: 4, sheetSize: "SRA3", orientation: "Portrait" },
  "tpl-005": { name: "A3 Magazine 1-Up", rows: 1, cols: 1, bleed: 5, gripper: 12, hGutter: 0, vGutter: 0, sheetSize: "SRA3", orientation: "Portrait" },
  new: { name: "Untitled Template", rows: 2, cols: 2, bleed: 3, gripper: 10, hGutter: 4, vGutter: 4, sheetSize: "SRA3", orientation: "Portrait" },
}

// ── Section wrapper ──
function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-neutral-20 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-neutral-5 text-sm font-medium text-neutral-100 hover:bg-neutral-10 transition-colors"
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-neutral-60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="p-4 space-y-3">{children}</div>}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-neutral-80 tracking-wide">{label}</label>
      {children}
    </div>
  )
}

export default function ImpositionEditor() {
  const { goBack, params } = useNavigation()
  const seed = templateSeeds[params.templateId] || templateSeeds["new"]

  // ── State ──
  const [templateName, setTemplateName] = useState(seed.name)
  const [editingName, setEditingName] = useState(false)

  const [sheetSize, setSheetSize] = useState(seed.sheetSize)
  const [customW, setCustomW] = useState(320)
  const [customH, setCustomH] = useState(450)
  const [orientation, setOrientation] = useState<"Portrait" | "Landscape">(seed.orientation)

  const [rows, setRows] = useState(seed.rows)
  const [cols, setCols] = useState(seed.cols)
  const [bleed, setBleed] = useState(seed.bleed)
  const [gripper, setGripper] = useState(seed.gripper)
  const [hGutter, setHGutter] = useState(seed.hGutter)
  const [vGutter, setVGutter] = useState(seed.vGutter)
  const [method, setMethod] = useState("Auto")

  const [zoom, setZoom] = useState(1)

  // Variables panel
  const [paperGSM, setPaperGSM] = useState(170)
  const [inkCoverage, setInkCoverage] = useState(35)
  const [scoringEnabled, setScoringEnabled] = useState(false)

  // JDF
  const [jdfVersion, setJdfVersion] = useState("1.7")
  const [showExportToast, setShowExportToast] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)

  // ── Derived values ──
  const sheetDims = useMemo(() => {
    const base = sheetSize === "Custom" ? { w: customW, h: customH } : sheetPresets[sheetSize]
    return orientation === "Landscape" ? { w: base.h, h: base.w } : base
  }, [sheetSize, customW, customH, orientation])

  const nUp = rows * cols
  const jobQuantity = 5000
  const sheetsRequired = Math.ceil(jobQuantity / nUp)
  const sheetCost = 0.12
  const paperCostTotal = sheetsRequired * sheetCost

  const usableW = sheetDims.w - 2 * bleed
  const usableH = sheetDims.h - gripper - bleed
  const cellContentW = (usableW - (cols - 1) * hGutter) / cols
  const cellContentH = (usableH - (rows - 1) * vGutter) / rows
  const usedArea = nUp * cellContentW * cellContentH
  const totalArea = sheetDims.w * sheetDims.h
  const wastePercent = ((1 - usedArea / totalArea) * 100).toFixed(1)

  // BOM
  const wasteSheetsAllowance = Math.ceil(sheetsRequired * 0.05)
  const totalSheets = sheetsRequired + wasteSheetsAllowance
  const inkCostPerSheet = 0.03 * (inkCoverage / 100)
  const totalInkCost = totalSheets * inkCostPerSheet
  const totalMaterialCost = totalSheets * sheetCost + totalInkCost

  // ── Plate SVG ──
  const containerW = 580
  const scale = containerW / sheetDims.w
  const containerH = sheetDims.h * scale

  function renderPlate() {
    const sW = sheetDims.w * scale
    const sH = sheetDims.h * scale
    const sBleed = bleed * scale
    const sGripper = gripper * scale
    const sHGutter = hGutter * scale
    const sVGutter = vGutter * scale

    const contentAreaX = sBleed
    const contentAreaY = sGripper
    const contentAreaW = sW - 2 * sBleed
    const contentAreaH = sH - sGripper - sBleed

    const cellW = (contentAreaW - (cols - 1) * sHGutter) / cols
    const cellH = (contentAreaH - (rows - 1) * sVGutter) / rows

    return (
      <svg
        width={sW * zoom}
        height={sH * zoom}
        viewBox={`0 0 ${sW} ${sH}`}
        className="border border-neutral-20 rounded bg-white"
      >
        {/* Sheet background */}
        <rect x={0} y={0} width={sW} height={sH} fill="white" stroke="#bdbdbd" strokeWidth={1} />

        {/* Gripper area */}
        <rect x={0} y={0} width={sW} height={sGripper} fill="#f2f2f2" />
        <text x={sW / 2} y={sGripper / 2 + 4} textAnchor="middle" fontSize={10 * Math.min(scale, 1.2)} fill="#999">
          GRIPPER ({gripper}mm)
        </text>

        {/* Margin / bleed indicators */}
        <rect
          x={sBleed}
          y={sGripper}
          width={contentAreaW}
          height={contentAreaH}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={1}
          strokeDasharray="4 2"
        />

        {/* Cells */}
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const cx = contentAreaX + c * (cellW + sHGutter)
            const cy = contentAreaY + r * (cellH + sVGutter)
            const pageNum = r * cols + c + 1
            return (
              <g key={`${r}-${c}`}>
                {/* Bleed indicator (dashed red) */}
                <rect
                  x={cx - sBleed * 0.3}
                  y={cy - sBleed * 0.3}
                  width={cellW + sBleed * 0.6}
                  height={cellH + sBleed * 0.6}
                  fill="none"
                  stroke="#ef4d2f"
                  strokeWidth={0.5}
                  strokeDasharray="3 2"
                  opacity={0.5}
                />
                {/* Cell rectangle */}
                <rect
                  x={cx}
                  y={cy}
                  width={cellW}
                  height={cellH}
                  fill="#f7f7f7"
                  stroke="#212121"
                  strokeWidth={1}
                  rx={2}
                />
                {/* Page label */}
                <text
                  x={cx + cellW / 2}
                  y={cy + cellH / 2 + 4}
                  textAnchor="middle"
                  fontSize={Math.min(cellW, cellH) > 40 ? 12 : 9}
                  fill="#525252"
                  fontWeight={500}
                >
                  Page {pageNum}
                </text>
              </g>
            )
          })
        )}

        {/* Gutter lines (blue dashed) between columns */}
        {Array.from({ length: cols - 1 }).map((_, c) => {
          const gx = contentAreaX + (c + 1) * cellW + c * sHGutter + sHGutter / 2
          return (
            <line
              key={`vg-${c}`}
              x1={gx}
              y1={sGripper}
              x2={gx}
              y2={sH - sBleed}
              stroke="#007cb4"
              strokeWidth={0.75}
              strokeDasharray="4 3"
              opacity={0.6}
            />
          )
        })}

        {/* Gutter lines between rows */}
        {Array.from({ length: rows - 1 }).map((_, r) => {
          const gy = contentAreaY + (r + 1) * cellH + r * sVGutter + sVGutter / 2
          return (
            <line
              key={`hg-${r}`}
              x1={sBleed}
              y1={gy}
              x2={sW - sBleed}
              y2={gy}
              stroke="#007cb4"
              strokeWidth={0.75}
              strokeDasharray="4 3"
              opacity={0.6}
            />
          )
        })}
      </svg>
    )
  }

  // ── Toast handler ──
  function handleExportJDF() {
    setShowExportToast(true)
    setTimeout(() => setShowExportToast(false), 3000)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-20 bg-white">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="p-1.5 rounded-md hover:bg-neutral-5 text-neutral-60">
            <ArrowLeft className="w-5 h-5" />
          </button>

          {editingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="h-8 text-lg font-semibold w-64 border-neutral-20 rounded-lg"
                autoFocus
                onKeyDown={(e) => { if (e.key === "Enter") setEditingName(false) }}
              />
              <button onClick={() => setEditingName(false)} className="p-1 rounded hover:bg-neutral-5 text-neutral-60">
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="flex items-center gap-2 group"
            >
              <h2 className="text-lg font-semibold text-neutral-100">{templateName}</h2>
              <Pencil className="w-3.5 h-3.5 text-neutral-40 group-hover:text-neutral-60 transition-colors" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full border-neutral-40 text-neutral-90 text-sm">
            <Save className="w-4 h-4 mr-1.5" />
            Save
          </Button>
          <Button
            onClick={handleExportJDF}
            className="bg-neutral-100 hover:bg-neutral-90 text-white rounded-full text-sm"
          >
            <FileOutput className="w-4 h-4 mr-1.5" />
            Export JDF
          </Button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT — Plate layout (70%) */}
        <div className="flex-[7] flex flex-col overflow-y-auto bg-neutral-5 p-6">
          {/* Zoom controls */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              className="p-1.5 rounded-md border border-neutral-20 bg-white hover:bg-neutral-5 text-neutral-70"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-60 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
              className="p-1.5 rounded-md border border-neutral-20 bg-white hover:bg-neutral-5 text-neutral-70"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Plate SVG */}
          <div className="flex-1 flex items-start justify-center overflow-auto">
            {renderPlate()}
          </div>

          {/* Stats bar */}
          <div className="mt-4 flex flex-wrap items-center gap-4 px-4 py-3 bg-white rounded-lg border border-neutral-20 text-sm">
            <span className="text-neutral-60">
              Sheet: <span className="text-neutral-100 font-medium">{sheetSize} ({sheetDims.w}×{sheetDims.h}mm)</span>
            </span>
            <span className="w-px h-4 bg-neutral-20" />
            <span className="text-neutral-60">
              N-Up: <span className="text-neutral-100 font-medium">{nUp}</span>
            </span>
            <span className="w-px h-4 bg-neutral-20" />
            <span className="text-neutral-60">
              Waste: <span className="text-neutral-100 font-medium">{wastePercent}%</span>
            </span>
            <span className="w-px h-4 bg-neutral-20" />
            <span className="text-neutral-60">
              Sheets Required: <span className="text-neutral-100 font-medium">{sheetsRequired.toLocaleString()}</span>
            </span>
          </div>
        </div>

        {/* RIGHT — Configuration (30%) */}
        <div className="flex-[3] border-l border-neutral-20 bg-white overflow-y-auto">
          <div className="p-4 space-y-4">

            {/* Sheet Settings */}
            <Section title="Sheet Settings">
              <Field label="Sheet Size">
                <select
                  value={sheetSize}
                  onChange={(e) => setSheetSize(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg text-sm border border-neutral-20 bg-white text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-90"
                >
                  {Object.keys(sheetPresets).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
              {sheetSize === "Custom" && (
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Width (mm)">
                    <Input
                      type="number"
                      value={customW}
                      onChange={(e) => setCustomW(Number(e.target.value))}
                      className="h-9 text-sm rounded-lg border-neutral-20"
                    />
                  </Field>
                  <Field label="Height (mm)">
                    <Input
                      type="number"
                      value={customH}
                      onChange={(e) => setCustomH(Number(e.target.value))}
                      className="h-9 text-sm rounded-lg border-neutral-20"
                    />
                  </Field>
                </div>
              )}
              <Field label="Orientation">
                <div className="flex rounded-lg border border-neutral-20 overflow-hidden">
                  {(["Portrait", "Landscape"] as const).map((o) => (
                    <button
                      key={o}
                      onClick={() => setOrientation(o)}
                      className={`flex-1 py-1.5 text-sm font-medium transition-colors ${
                        orientation === o
                          ? "bg-neutral-100 text-white"
                          : "bg-white text-neutral-70 hover:bg-neutral-5"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </Field>
            </Section>

            {/* Layout Settings */}
            <Section title="Layout Settings">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-info-10 text-info-90 text-xs border-neutral-20">{nUp}-Up</Badge>
                <span className="text-xs text-neutral-50">(auto-calculated from rows × cols)</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Rows">
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    value={rows}
                    onChange={(e) => setRows(Math.max(1, Number(e.target.value)))}
                    className="h-9 text-sm rounded-lg border-neutral-20"
                  />
                </Field>
                <Field label="Columns">
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    value={cols}
                    onChange={(e) => setCols(Math.max(1, Number(e.target.value)))}
                    className="h-9 text-sm rounded-lg border-neutral-20"
                  />
                </Field>
              </div>
              <Field label="Bleed (mm)">
                <Input
                  type="number"
                  min={0}
                  value={bleed}
                  onChange={(e) => setBleed(Number(e.target.value))}
                  className="h-9 text-sm rounded-lg border-neutral-20"
                />
              </Field>
              <Field label="Gripper (mm)">
                <Input
                  type="number"
                  min={0}
                  value={gripper}
                  onChange={(e) => setGripper(Number(e.target.value))}
                  className="h-9 text-sm rounded-lg border-neutral-20"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="H. Gutter (mm)">
                  <Input
                    type="number"
                    min={0}
                    value={hGutter}
                    onChange={(e) => setHGutter(Number(e.target.value))}
                    className="h-9 text-sm rounded-lg border-neutral-20"
                  />
                </Field>
                <Field label="V. Gutter (mm)">
                  <Input
                    type="number"
                    min={0}
                    value={vGutter}
                    onChange={(e) => setVGutter(Number(e.target.value))}
                    className="h-9 text-sm rounded-lg border-neutral-20"
                  />
                </Field>
              </div>
              <Field label="Method">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg text-sm border border-neutral-20 bg-white text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-90"
                >
                  <option value="Auto">Auto</option>
                  <option value="Manual">Manual</option>
                  <option value="Template">Template</option>
                </select>
              </Field>
            </Section>

            {/* Variables Panel */}
            <Section title="Variables Panel">
              <div className="space-y-2">
                {[
                  { label: "Sheet Size", value: `${sheetSize} (${sheetDims.w}×${sheetDims.h}mm)` },
                  { label: "N-Up Count", value: String(nUp) },
                  { label: "Bleed", value: `${bleed}mm` },
                  { label: "Gripper", value: `${gripper}mm` },
                ].map((v) => (
                  <div key={v.label} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-neutral-5">
                    <span className="text-xs text-neutral-60">{v.label}</span>
                    <span className="text-xs font-medium text-neutral-100">{v.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-neutral-5">
                  <span className="text-xs text-neutral-60">Paper GSM</span>
                  <Input
                    type="number"
                    value={paperGSM}
                    onChange={(e) => {
                      const v = Number(e.target.value)
                      setPaperGSM(v)
                      if (v > 300) setScoringEnabled(true)
                    }}
                    className="h-7 w-20 text-xs text-right rounded border-neutral-20"
                  />
                </div>
                <div className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-neutral-5">
                  <span className="text-xs text-neutral-60">Ink Coverage</span>
                  <Input
                    type="number"
                    value={inkCoverage}
                    onChange={(e) => setInkCoverage(Number(e.target.value))}
                    className="h-7 w-20 text-xs text-right rounded border-neutral-20"
                    min={0}
                    max={100}
                  />
                </div>
              </div>

              {/* Conditional rule */}
              <div className="mt-3 p-3 rounded-lg border border-neutral-20 bg-neutral-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-neutral-100">Add scoring step</p>
                    <p className="text-[11px] text-neutral-50 mt-0.5">If Paper GSM &gt; 300</p>
                  </div>
                  <button
                    onClick={() => setScoringEnabled(!scoringEnabled)}
                    className={`w-10 h-6 rounded-full relative transition-colors ${scoringEnabled ? "bg-neutral-90" : "bg-neutral-30"}`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${scoringEnabled ? "translate-x-4" : ""}`}
                    />
                  </button>
                </div>
                {paperGSM > 300 && !scoringEnabled && (
                  <p className="text-[11px] text-warning-70 mt-2">Paper GSM exceeds 300 — consider enabling scoring</p>
                )}
              </div>
            </Section>

            {/* JDF Export */}
            <Section title="JDF Export">
              <Field label="JDF Version">
                <select
                  value={jdfVersion}
                  onChange={(e) => setJdfVersion(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg text-sm border border-neutral-20 bg-white text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-90"
                >
                  <option value="1.4">JDF 1.4</option>
                  <option value="1.5">JDF 1.5</option>
                  <option value="1.7">JDF 1.7</option>
                </select>
              </Field>
              <div className="flex gap-2">
                <Button
                  onClick={handleExportJDF}
                  className="flex-1 bg-neutral-100 hover:bg-neutral-90 text-white rounded-full text-sm h-9"
                >
                  <FileOutput className="w-4 h-4 mr-1.5" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowImportModal(true)}
                  className="flex-1 rounded-full border-neutral-40 text-neutral-90 text-sm h-9"
                >
                  <FileInput className="w-4 h-4 mr-1.5" />
                  Import
                </Button>
              </div>
            </Section>

            {/* BOM Calculator */}
            <Section title="BOM Calculator">
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-60">Job quantity</span>
                  <span className="text-neutral-100 font-medium">{jobQuantity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-60">Sheets required</span>
                  <span className="text-neutral-100 font-medium">{sheetsRequired.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-60">Waste allowance (5%)</span>
                  <span className="text-neutral-100 font-medium">+{wasteSheetsAllowance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-60">Ink coverage estimate</span>
                  <span className="text-neutral-100 font-medium">{inkCoverage}%</span>
                </div>
              </div>

              <div className="border border-neutral-20 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-neutral-5">
                      <th className="text-left px-3 py-2 font-medium text-neutral-70">Material</th>
                      <th className="text-right px-3 py-2 font-medium text-neutral-70">Qty</th>
                      <th className="text-right px-3 py-2 font-medium text-neutral-70">Unit</th>
                      <th className="text-right px-3 py-2 font-medium text-neutral-70">Unit Cost</th>
                      <th className="text-right px-3 py-2 font-medium text-neutral-70">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-neutral-20">
                      <td className="px-3 py-2 text-neutral-100">{sheetSize} Paper {paperGSM}gsm</td>
                      <td className="px-3 py-2 text-right text-neutral-100">{totalSheets.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right text-neutral-60">sheets</td>
                      <td className="px-3 py-2 text-right text-neutral-60">&euro;{sheetCost.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right text-neutral-100 font-medium">&euro;{(totalSheets * sheetCost).toFixed(2)}</td>
                    </tr>
                    <tr className="border-t border-neutral-20">
                      <td className="px-3 py-2 text-neutral-100">Ink (CMYK)</td>
                      <td className="px-3 py-2 text-right text-neutral-100">{totalSheets.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right text-neutral-60">sheets</td>
                      <td className="px-3 py-2 text-right text-neutral-60">&euro;{inkCostPerSheet.toFixed(4)}</td>
                      <td className="px-3 py-2 text-right text-neutral-100 font-medium">&euro;{totalInkCost.toFixed(2)}</td>
                    </tr>
                    {scoringEnabled && (
                      <tr className="border-t border-neutral-20">
                        <td className="px-3 py-2 text-neutral-100">Scoring</td>
                        <td className="px-3 py-2 text-right text-neutral-100">{totalSheets.toLocaleString()}</td>
                        <td className="px-3 py-2 text-right text-neutral-60">sheets</td>
                        <td className="px-3 py-2 text-right text-neutral-60">&euro;0.02</td>
                        <td className="px-3 py-2 text-right text-neutral-100 font-medium">&euro;{(totalSheets * 0.02).toFixed(2)}</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-neutral-20 bg-neutral-5">
                      <td colSpan={4} className="px-3 py-2 font-medium text-neutral-100">Total Material Cost</td>
                      <td className="px-3 py-2 text-right font-semibold text-neutral-100">
                        &euro;{(totalMaterialCost + (scoringEnabled ? totalSheets * 0.02 : 0)).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Section>

          </div>
        </div>
      </div>

      {/* ── Export Success Toast ── */}
      {showExportToast && (
        <div className="fixed bottom-6 right-6 z-[30000] flex items-center gap-3 px-4 py-3 rounded-lg border border-success-80 bg-success-10 text-success-90 shadow-lg animate-in slide-in-from-bottom-4">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">JDF {jdfVersion} exported successfully</span>
          <button onClick={() => setShowExportToast(false)} className="p-0.5 rounded hover:bg-success-20">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Import Modal ── */}
      {showImportModal && (
        <div className="fixed inset-0 z-[20001] flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-neutral-100">Import JDF File</h3>
              <button onClick={() => setShowImportModal(false)} className="p-1 rounded hover:bg-neutral-5 text-neutral-60">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="border-2 border-dashed border-neutral-30 rounded-lg p-8 text-center hover:border-neutral-50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-neutral-40 mx-auto mb-3" />
              <p className="text-sm text-neutral-100 font-medium">Drop a JDF file here or click to browse</p>
              <p className="text-xs text-neutral-50 mt-1">Supports JDF 1.4, 1.5, and 1.7 formats</p>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <Button
                variant="outline"
                onClick={() => setShowImportModal(false)}
                className="rounded-full border-neutral-40 text-neutral-90 text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowImportModal(false)}
                className="bg-neutral-100 hover:bg-neutral-90 text-white rounded-full text-sm"
              >
                Import
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
