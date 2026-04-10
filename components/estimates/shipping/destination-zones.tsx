"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, ArrowLeft, Search } from "lucide-react"
import {
  type DestinationZone,
  initialZones,
  eu27,
  continentGroups,
  allCountriesFlat,
  getFlag,
  getCountryName,
  coverageBreakdown,
} from "./shipping-data"
import { CountryPicker } from "./country-picker"
import { ConfirmDeleteDialog } from "./confirm-delete-dialog"
import { toast } from "sonner"

// ─── Presets ────────────────────────────────────────────────

const presets = [
  { label: "\u{1F1EC}\u{1F1E7} UK Domestic", codes: ["GB"] },
  { label: "\u{1F1EA}\u{1F1FA} European Union", codes: eu27 },
  { label: "\ud83c\udf0e North America", codes: ["US", "CA", "MX"] },
  { label: "\ud83c\udf0f Asia Pacific", codes: continentGroups["Asia Pacific"] },
  { label: "\ud83c\udf0d Rest of World", codes: allCountriesFlat },
]

// ─── Form type ──────────────────────────────────────────────

interface ZoneForm {
  name: string
  type: "geographic" | "pickup"
  countries: string[]
  postcodes: string
  desc: string
}

const emptyForm: ZoneForm = {
  name: "",
  type: "geographic",
  countries: [],
  postcodes: "",
  desc: "",
}

// ─── Component ──────────────────────────────────────────────

export default function DestinationZones() {
  const [zones, setZones] = useState<DestinationZone[]>(initialZones)
  const [editing, setEditing] = useState<number | "new" | null>(null)
  const [form, setForm] = useState<ZoneForm>({ ...emptyForm })
  const [deleteTarget, setDeleteTarget] = useState<DestinationZone | null>(null)
  const [query, setQuery] = useState("")

  const filtered = useMemo(
    () =>
      query.trim()
        ? zones.filter((z) => z.name.toLowerCase().includes(query.toLowerCase()))
        : zones,
    [zones, query],
  )

  const coverage = useMemo(() => coverageBreakdown(form.countries), [form.countries])

  // ── Actions ─────────────────────────────────────────────

  function openCreate() {
    setForm({ ...emptyForm })
    setEditing("new")
  }

  function openEdit(z: DestinationZone) {
    setForm({
      name: z.name,
      type: z.type || (z.countries?.length ? "geographic" : "pickup"),
      countries: [...(z.countries || [])],
      postcodes: z.postcodes || "",
      desc: z.desc || "",
    })
    setEditing(z.id)
  }

  function save() {
    const zoneData = {
      name: form.name,
      type: form.type,
      countries: form.type === "pickup" ? [] : form.countries,
      postcodes: form.type === "pickup" ? "" : form.postcodes,
      desc: form.desc,
    }
    if (editing === "new") {
      setZones((prev) => [...prev, { id: Date.now(), ...zoneData }])
      toast("Zone created")
    } else {
      setZones((prev) => prev.map((z) => (z.id === editing ? { ...z, ...zoneData } : z)))
      toast("Changes saved")
    }
    setEditing(null)
  }

  function doDelete() {
    if (!deleteTarget) return
    setZones((prev) => prev.filter((z) => z.id !== deleteTarget.id))
    toast("Zone deleted")
    setDeleteTarget(null)
  }

  function applyPreset(codes: string[]) {
    const allActive = codes.every((c) => form.countries.includes(c))
    if (allActive) {
      setForm((f) => ({ ...f, countries: f.countries.filter((c) => !codes.includes(c)) }))
    } else {
      setForm((f) => ({ ...f, countries: [...new Set([...f.countries, ...codes])] }))
    }
  }

  function isPresetActive(codes: string[]) {
    return codes.length > 0 && codes.every((c) => form.countries.includes(c))
  }

  // ── Table styles ────────────────────────────────────────

  const thCls =
    "px-2.5 py-2 text-left text-[11px] font-semibold text-[#999] bg-[#fafafa] border-b border-[#e5e5e5] tracking-wide whitespace-nowrap"
  const tdCls = "px-2.5 py-2 text-[13px] text-[#333] border-b border-[#f5f5f5] align-middle"

  // ── Edit / Create View ──────────────────────────────────

  if (editing !== null) {
    return (
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setEditing(null)}
            className="flex items-center text-[#999] hover:text-[#333] p-1 rounded"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-xl font-semibold text-[#212121]">
            {editing === "new" ? "New destination zone" : "Edit destination zone"}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, alignItems: "start" }}>
          {/* Left column */}
          <div style={{ minWidth: 0 }}>
            {/* Zone details card */}
            <div
              className="bg-white border border-[#e5e5e5] rounded-xl p-4"
              style={{ marginBottom: 12 }}
            >
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wide mb-3">
                Zone details
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#666] mb-1 tracking-wide">
                    Zone name
                  </label>
                  <input
                    className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                    style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Continental US"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#666] mb-1 tracking-wide">
                    Description <span className="font-normal text-[#999]">(optional)</span>
                  </label>
                  <input
                    className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                    style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                    value={form.desc}
                    onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                    placeholder="e.g. All US states"
                  />
                </div>
              </div>
            </div>

            {/* Zone type card */}
            <div
              className="bg-white border border-[#e5e5e5] rounded-xl p-4"
              style={{ marginBottom: 12 }}
            >
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wide mb-3">
                Zone type
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {/* Geographic */}
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, type: "geographic" }))}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: 14,
                    borderRadius: 10,
                    border: `1.5px solid ${form.type === "geographic" ? "#212121" : "#e5e5e5"}`,
                    background: form.type === "geographic" ? "#fafafa" : "white",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 3,
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                >
                  <span style={{ fontSize: 22, marginBottom: 4 }}>{"\ud83c\udf0d"}</span>
                  <strong style={{ fontSize: 13, fontWeight: 600, color: "#212121" }}>
                    Geographic Zone
                  </strong>
                  <span style={{ fontSize: 11, color: "#999", lineHeight: 1.4 }}>
                    Ships to specific countries or postcodes
                  </span>
                  {form.type === "geographic" && (
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#212121",
                      }}
                    >
                      {"\u2713"}
                    </span>
                  )}
                </button>

                {/* Pickup */}
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, type: "pickup" }))}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: 14,
                    borderRadius: 10,
                    border: `1.5px solid ${form.type === "pickup" ? "#212121" : "#e5e5e5"}`,
                    background: form.type === "pickup" ? "#fafafa" : "white",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 3,
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                >
                  <span style={{ fontSize: 22, marginBottom: 4 }}>{"\ud83d\udce6"}</span>
                  <strong style={{ fontSize: 13, fontWeight: 600, color: "#212121" }}>
                    Customer Pickup
                  </strong>
                  <span style={{ fontSize: 11, color: "#999", lineHeight: 1.4 }}>
                    No shipping required — customer collects
                  </span>
                  {form.type === "pickup" && (
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#212121",
                      }}
                    >
                      {"\u2713"}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Countries card (geographic only) */}
            {form.type === "geographic" && (
              <div
                className="bg-white border border-[#e5e5e5] rounded-xl p-4"
                style={{ marginBottom: 12 }}
              >
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wide mb-3">
                  Countries
                </p>

                {/* Preset chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                  {presets.map((preset) => {
                    const active = isPresetActive(preset.codes)
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => applyPreset(preset.codes)}
                        style={{
                          padding: "4px 11px",
                          borderRadius: 999,
                          border: `1px solid ${active ? "#212121" : "#d4d4d4"}`,
                          background: active ? "#212121" : "white",
                          color: active ? "white" : "#666",
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "background 0.1s, border-color 0.1s",
                        }}
                      >
                        {preset.label}
                      </button>
                    )
                  })}
                </div>

                {/* Country picker */}
                <CountryPicker
                  selected={form.countries}
                  onAdd={(code) => setForm((f) => ({ ...f, countries: [...f.countries, code] }))}
                  onRemove={(code) =>
                    setForm((f) => ({ ...f, countries: f.countries.filter((c) => c !== code) }))
                  }
                />

                {/* Postcodes */}
                <div style={{ marginTop: 14 }}>
                  <label className="block text-[11px] font-semibold text-[#666] mb-1 tracking-wide">
                    Postcodes <span className="font-normal text-[#999]">(optional)</span>
                  </label>
                  <input
                    className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                    style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                    value={form.postcodes}
                    onChange={(e) => setForm((f) => ({ ...f, postcodes: e.target.value }))}
                    placeholder="e.g. SN1, SN2, SN3 or SN1-SN6"
                  />
                  <p className="text-[11px] text-[#999] mt-1">
                    Leave blank to include all postcodes within the selected countries.
                  </p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-1">
              <Button
                onClick={save}
                disabled={!form.name.trim()}
                className="bg-[#212121] hover:opacity-90 text-white rounded-full text-sm"
              >
                {editing === "new" ? "Create zone" : "Save changes"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setEditing(null)}
                className="text-sm text-[#999] rounded-full"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Right column: Coverage summary */}
          <div style={{ position: "sticky", top: 0 }}>
            <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
              {form.type === "pickup" ? (
                <div style={{ textAlign: "center", padding: "12px 0" }}>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 8 }}>
                    {"\ud83d\udce6"}
                  </span>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#212121", marginBottom: 6 }}>
                    Customer Pickup
                  </p>
                  <p style={{ fontSize: 12, color: "#999", lineHeight: 1.5 }}>
                    No shipping costs — customer will collect the order directly.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wide mb-3">
                    Coverage
                  </p>
                  {form.countries.length === 0 ? (
                    <p style={{ fontSize: 13, color: "#999", lineHeight: 1.5 }}>
                      No countries selected yet. Use the presets or search above to add countries.
                    </p>
                  ) : (
                    <>
                      <div style={{ marginBottom: 12 }}>
                        <span
                          style={{
                            fontSize: 28,
                            fontWeight: 700,
                            color: "#212121",
                            lineHeight: 1,
                          }}
                        >
                          {form.countries.length}
                        </span>
                        <span style={{ fontSize: 13, color: "#999" }}>
                          {" "}
                          {form.countries.length === 1 ? "country" : "countries"} selected
                        </span>
                      </div>

                      {/* Region breakdown */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          marginBottom: 12,
                        }}
                      >
                        {coverage.map(([region, count]) => (
                          <div
                            key={region}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "4px 0",
                              borderBottom: "1px solid #f5f5f5",
                              fontSize: 13,
                            }}
                          >
                            <span style={{ color: "#666" }}>{region}</span>
                            <span style={{ fontWeight: 600, color: "#212121", fontSize: 13 }}>
                              {count}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Postcode note */}
                      {form.postcodes && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 5,
                            fontSize: 12,
                            color: "#999",
                            background: "#fafafa",
                            borderRadius: 6,
                            padding: 8,
                            lineHeight: 1.4,
                          }}
                        >
                          <span style={{ flexShrink: 0 }}>{"\ud83d\udccd"}</span>
                          <span>
                            Narrowed to postcodes: <strong>{form.postcodes}</strong>
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── List View ───────────────────────────────────────────

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-[#212121]">Destination zones</h2>
            <Badge
              variant="secondary"
              className="text-xs"
              style={{ backgroundColor: "#F5F5F5", color: "#6b6b6b" }}
            >
              {zones.length}
            </Badge>
          </div>
          <p className="text-sm text-[#999] mt-1">
            Define the geographic zones used in shipping rules and rate cards.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#999]" />
            <input
              className="h-[34px] pl-8 pr-3 rounded-lg text-sm outline-none w-[200px]"
              style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search zones..."
            />
          </div>
          <Button
            onClick={openCreate}
            className="bg-[#212121] hover:opacity-90 text-white rounded-full text-sm"
          >
            <Plus className="h-4 w-4 mr-1" /> New zone
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#e5e5e5] rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr>
                <th className={`${thCls} w-[32px]`}>#</th>
                <th className={`${thCls} w-[52px]`}></th>
                <th className={thCls}>Zone name</th>
                <th className={thCls}>Type</th>
                <th className={thCls}>Countries</th>
                <th className={thCls}>Postcodes</th>
                <th className={thCls}>Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((zone, i) => (
                <tr
                  key={zone.id}
                  onClick={() => openEdit(zone)}
                  className="cursor-pointer hover:bg-[#f8f6ff] transition-colors"
                >
                  <td className={`${tdCls} text-[#999]`}>{i + 1}</td>
                  <td className={tdCls} onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(zone)}
                        className="p-1 rounded hover:bg-[#f0f0f0] text-[#999] hover:text-[#333]"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(zone)}
                        className="p-1 rounded hover:bg-red-50 text-[#999] hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className={`${tdCls} font-semibold text-[#212121]`}>{zone.name}</td>
                  <td className={tdCls}>
                    {(zone.type || "geographic") === "pickup" ? (
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium"
                        style={{ background: "#f5f5f5", color: "#666", border: "1px solid #e5e5e5" }}
                      >
                        Pickup
                      </span>
                    ) : (
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium"
                        style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #dbeafe" }}
                      >
                        Geographic
                      </span>
                    )}
                  </td>
                  <td className={tdCls}>
                    {(zone.type || "geographic") === "pickup" ? (
                      <span className="text-[#999] text-[12px]">{"\u2014"}</span>
                    ) : (zone.countries || []).length > 0 ? (
                      <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", gap: 1 }}>
                        {(zone.countries || []).slice(0, 8).map((c) => (
                          <span key={c} style={{ fontSize: 16, lineHeight: 1, cursor: "default" }} title={getCountryName(c)}>
                            {getFlag(c)}
                          </span>
                        ))}
                        {(zone.countries || []).length > 8 && (
                          <span style={{ fontSize: 11, color: "#999", marginLeft: 3, whiteSpace: "nowrap" }}>
                            +{zone.countries.length - 8}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[#999] text-[12px]">None</span>
                    )}
                  </td>
                  <td className={tdCls}>
                    {zone.postcodes ? (
                      <span
                        style={{
                          fontSize: 11,
                          fontFamily: "ui-monospace, 'Courier New', monospace",
                          color: "#666",
                        }}
                      >
                        {zone.postcodes.length > 22
                          ? zone.postcodes.slice(0, 22) + "\u2026"
                          : zone.postcodes}
                      </span>
                    ) : (
                      <span className="text-[#999]">{"\u2014"}</span>
                    )}
                  </td>
                  <td className={`${tdCls} text-[#999]`}>{zone.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty states */}
        {zones.length === 0 && (
          <div className="py-12 text-center text-sm text-[#999]">
            No destination zones. Create a zone to define where you ship.
          </div>
        )}
        {zones.length > 0 && filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#999]">
            No zones match &ldquo;{query}&rdquo;
          </div>
        )}
      </div>

      {/* Results count */}
      {query && filtered.length > 0 && (
        <p className="mt-2 text-[12px] text-[#999] text-right">
          {filtered.length} of {zones.length} zones
        </p>
      )}

      {/* Delete confirmation */}
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        name={deleteTarget?.name || ""}
        body="This zone will be removed from all shipping rules that reference it."
        onConfirm={doDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
