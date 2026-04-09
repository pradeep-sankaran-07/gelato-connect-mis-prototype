"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, ArrowLeft, ChevronDown, Lock, Info } from "lucide-react"
import {
  type ShippingMethod,
  initialMethods,
  allDests,
  carrierColors,
} from "./shipping-data"
import { toast } from "sonner"

// ─── Types ─────────────────────────────────────────────────

type Screen = "list" | "form" | "delete"

interface DestRow {
  dest: string
  transitTime: string
  cost: string
  consignment: string
}

interface FormState {
  name: string
  carrier: string
  type: "PSP" | "GCL"
  destRows: DestRow[]
}

// ─── Helpers ───────────────────────────────────────────────

function carrierTextColor(bg: string) {
  return bg === "#FFCC00" ? "#000" : "#fff"
}

function TypeBadge({ type }: { type: "PSP" | "GCL" }) {
  return type === "GCL" ? (
    <Badge variant="success" className="text-[10px] px-1.5 py-0">GCL Live</Badge>
  ) : (
    <Badge variant="info" className="text-[10px] px-1.5 py-0">PSP Offline</Badge>
  )
}

const emptyDestRow: DestRow = { dest: "", transitTime: "", cost: "", consignment: "" }

const emptyForm: FormState = {
  name: "",
  carrier: "",
  type: "PSP",
  destRows: [{ ...emptyDestRow }],
}

// ─── Component ─────────────────────────────────────────────

export default function ShippingMethodsConfig() {
  const [methods, setMethods] = useState<ShippingMethod[]>(
    () => initialMethods.map((m) => ({ ...m }))
  )
  const [screen, setScreen] = useState<Screen>("list")
  const [current, setCurrent] = useState<ShippingMethod | null>(null)
  const [showLive, setShowLive] = useState(true)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [tab, setTab] = useState<"default" | "overrides">("default")
  const [form, setForm] = useState<FormState>({ ...emptyForm, destRows: [{ ...emptyDestRow }] })

  // ── Derived ────────────────────────────────────────────

  const visibleMethods = useMemo(
    () => (showLive ? methods : methods.filter((m) => m.type !== "GCL")),
    [methods, showLive]
  )

  const byCarrier = useMemo(() => {
    const map: Record<string, ShippingMethod[]> = {}
    visibleMethods.forEach((m) => {
      const c = m.carrier || "Other"
      if (!map[c]) map[c] = []
      map[c].push(m)
    })
    return map
  }, [visibleMethods])

  const activeCount = useMemo(
    () => visibleMethods.filter((m) => m.on).length,
    [visibleMethods]
  )

  // ── Actions ────────────────────────────────────────────

  function goCreate() {
    setForm({ ...emptyForm, destRows: [{ ...emptyDestRow }] })
    setCurrent(null)
    setScreen("form")
  }

  function goEdit(m: ShippingMethod) {
    setForm({
      name: m.name,
      carrier: m.carrier,
      type: m.type,
      destRows: m.dests.length
        ? m.dests.map((d) => ({
            dest: d,
            transitTime: m.transit || "",
            cost: m.cost || "",
            consignment: m.consignment || "",
          }))
        : [{ ...emptyDestRow }],
    })
    setCurrent(m)
    setScreen("form")
  }

  function goDelete(m: ShippingMethod) {
    setCurrent(m)
    setScreen("delete")
  }

  function save() {
    const dests = form.destRows.filter((r) => r.dest).map((r) => r.dest)
    if (current) {
      setMethods((prev) =>
        prev.map((m) =>
          m.id === current.id
            ? {
                ...m,
                name: form.name,
                carrier: form.carrier,
                dests,
                transit: form.destRows[0]?.transitTime || "",
                cost: form.destRows[0]?.cost || "",
                consignment: form.destRows[0]?.consignment || "",
              }
            : m
        )
      )
    } else {
      setMethods((prev) => [
        ...prev,
        {
          id: Date.now(),
          on: true,
          name: form.name,
          carrier: form.carrier,
          type: "PSP" as const,
          dests,
          transit: form.destRows[0]?.transitTime || "",
          cost: form.destRows[0]?.cost || "",
          consignment: form.destRows[0]?.consignment || "",
        },
      ])
    }
    toast.success(current ? "Changes saved" : "Method added")
    setScreen("list")
  }

  function confirmDelete() {
    if (!current) return
    setMethods((prev) => prev.filter((m) => m.id !== current.id))
    toast.success("Method deleted")
    setCurrent(null)
    setScreen("list")
  }

  function toggleMethod(id: number) {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, on: !m.on } : m))
    )
  }

  function toggleCarrier(carrier: string) {
    setCollapsed((prev) => ({ ...prev, [carrier]: !prev[carrier] }))
  }

  function updateRow(idx: number, field: keyof DestRow, value: string) {
    setForm((prev) => {
      const rows = [...prev.destRows]
      rows[idx] = { ...rows[idx], [field]: value }
      return { ...prev, destRows: rows }
    })
  }

  function addRow() {
    setForm((prev) => ({
      ...prev,
      destRows: [...prev.destRows, { ...emptyDestRow }],
    }))
  }

  function removeRow(idx: number) {
    setForm((prev) => ({
      ...prev,
      destRows: prev.destRows.filter((_, j) => j !== idx),
    }))
  }

  // ── Delete screen ──────────────────────────────────────

  if (screen === "delete" && current) {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <button
            className="flex items-center p-1 rounded-md text-neutral-50 hover:bg-neutral-10 hover:text-neutral-90 transition-colors"
            onClick={() => setScreen("list")}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[22px] font-bold text-neutral-100 tracking-tight">
            Delete shipping method
          </h1>
        </div>

        <div className="max-w-[520px]">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-3">
            <h3 className="text-[14px] font-bold text-red-700 mb-2">Are you sure?</h3>
            <p className="text-[13px] text-neutral-90 leading-relaxed">
              Delete <strong>{current.name}</strong> ({current.carrier})?
              <br />
              This cannot be undone.
            </p>
          </div>

          <div className="flex gap-2 mt-3">
            <Button variant="destructive" size="sm" onClick={confirmDelete}>
              Yes, delete
            </Button>
            <Button variant="outline" size="sm" onClick={() => setScreen("list")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ── Form screen ────────────────────────────────────────

  if (screen === "form") {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <button
            className="flex items-center p-1 rounded-md text-neutral-50 hover:bg-neutral-10 hover:text-neutral-90 transition-colors"
            onClick={() => setScreen("list")}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[22px] font-bold text-neutral-100 tracking-tight">
            {current ? "Edit shipping method" : "Add new shipping method"}
          </h1>
        </div>

        <div className="max-w-[900px]">
          {/* Method details card */}
          <div className="bg-white border border-neutral-20 rounded-xl p-4 mb-3">
            <h3 className="text-[13px] font-bold text-neutral-100 mb-3">Method details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center text-[11px] font-semibold text-neutral-60 mb-1.5 tracking-wide">
                  Method name
                </label>
                <input
                  className="w-full h-9 px-3 rounded-lg border border-neutral-20 text-[13px] bg-white outline-none focus:border-neutral-60 transition-colors"
                  placeholder="e.g. Pallet delivery"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="flex items-center text-[11px] font-semibold text-neutral-60 mb-1.5 tracking-wide">
                  Carrier
                </label>
                <input
                  className="w-full h-9 px-3 rounded-lg border border-neutral-20 text-[13px] bg-white outline-none focus:border-neutral-60 transition-colors"
                  placeholder="e.g. DX, Pallet Express"
                  value={form.carrier}
                  onChange={(e) => setForm((f) => ({ ...f, carrier: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Pricing by destination card */}
          <div className="bg-white border border-neutral-20 rounded-xl p-4 mb-3">
            <h3 className="text-[13px] font-bold text-neutral-100 mb-1 flex items-center gap-1">
              Pricing by destination
            </h3>
            <p className="text-[12px] text-neutral-50 mb-3">
              {current?.type === "GCL"
                ? "Pricing managed by GCL rate card."
                : "Add a row per destination zone."}
            </p>

            {current?.type === "GCL" ? (
              <div className="flex items-center gap-2 p-3 bg-neutral-5 border border-neutral-20 rounded-lg text-[13px] text-neutral-50">
                <Lock size={14} className="text-neutral-50 shrink-0" />
                Managed by GCL rate card
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-[11px] font-semibold text-neutral-60 bg-neutral-5 border-b border-neutral-20">
                        Zone
                      </th>
                      <th className="p-2 text-left text-[11px] font-semibold text-neutral-60 bg-neutral-5 border-b border-neutral-20">
                        Transit
                      </th>
                      <th className="p-2 text-right text-[11px] font-semibold text-neutral-60 bg-neutral-5 border-b border-neutral-20">
                        Cost
                      </th>
                      <th className="p-2 text-right text-[11px] font-semibold text-neutral-60 bg-neutral-5 border-b border-neutral-20">
                        Consignment
                      </th>
                      <th className="p-2 bg-neutral-5 border-b border-neutral-20 w-9" />
                    </tr>
                  </thead>
                  <tbody>
                    {form.destRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-1.5 border-b border-neutral-10">
                          <select
                            className="w-full h-[34px] px-2 rounded-md text-[13px] bg-white outline-none border-none shadow-[inset_0_0_0_1px_var(--neutral-30)] focus:shadow-[inset_0_0_0_1.5px_var(--neutral-70)]"
                            value={row.dest}
                            onChange={(e) => updateRow(idx, "dest", e.target.value)}
                          >
                            <option value="">Select zone...</option>
                            {allDests.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-1.5 border-b border-neutral-10">
                          <input
                            className="w-full h-[34px] px-2 rounded-md text-[13px] bg-white outline-none border-none shadow-[inset_0_0_0_1px_var(--neutral-30)] focus:shadow-[inset_0_0_0_1.5px_var(--neutral-70)]"
                            placeholder="1-3 days"
                            value={row.transitTime}
                            onChange={(e) => updateRow(idx, "transitTime", e.target.value)}
                          />
                        </td>
                        <td className="p-1.5 border-b border-neutral-10">
                          <div className="relative">
                            <input
                              className="w-full h-[34px] px-2 pr-12 rounded-md text-[13px] bg-white outline-none border-none shadow-[inset_0_0_0_1px_var(--neutral-30)] focus:shadow-[inset_0_0_0_1.5px_var(--neutral-70)]"
                              placeholder="0.00"
                              value={row.cost}
                              onChange={(e) => updateRow(idx, "cost", e.target.value)}
                            />
                            <span className="absolute right-px top-px bottom-px flex items-center px-2 bg-neutral-5 border-l border-neutral-20 rounded-r-md text-[11px] text-neutral-60 font-medium">
                              GBP
                            </span>
                          </div>
                        </td>
                        <td className="p-1.5 border-b border-neutral-10">
                          <div className="relative">
                            <input
                              className="w-full h-[34px] px-2 pr-12 rounded-md text-[13px] bg-white outline-none border-none shadow-[inset_0_0_0_1px_var(--neutral-30)] focus:shadow-[inset_0_0_0_1.5px_var(--neutral-70)]"
                              placeholder="0.00"
                              value={row.consignment}
                              onChange={(e) => updateRow(idx, "consignment", e.target.value)}
                            />
                            <span className="absolute right-px top-px bottom-px flex items-center px-2 bg-neutral-5 border-l border-neutral-20 rounded-r-md text-[11px] text-neutral-60 font-medium">
                              GBP
                            </span>
                          </div>
                        </td>
                        <td className="p-1.5 border-b border-neutral-10 text-center">
                          {form.destRows.length > 1 && (
                            <button
                              className="inline-flex items-center p-1 rounded text-neutral-50 hover:bg-red-50 hover:text-red-600 transition-colors"
                              onClick={() => removeRow(idx)}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-2">
                  <Button variant="outline" size="sm" onClick={addRow}>
                    <Plus size={14} className="mr-1" />
                    Add destination row
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Form actions */}
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={save} disabled={!form.name}>
              {current ? "Save changes" : "Add method"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setScreen("list")}>
              Cancel
            </Button>
            {current && (
              <div className="ml-auto">
                <Button variant="destructive" size="sm" onClick={() => goDelete(current)}>
                  Delete method
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── List screen ────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-100 tracking-tight mb-1">
            Shipping methods
          </h1>
          <p className="text-[13px] text-neutral-50">
            Manage carriers and methods for quoting and label creation.
          </p>
        </div>
        <Button size="sm" onClick={goCreate}>
          <Plus size={14} className="mr-1" />
          Add new shipping method
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-20 mb-4">
        {(
          [
            ["default", "Default Configuration"],
            ["overrides", "Customer Overrides"],
          ] as const
        ).map(([k, l]) => (
          <button
            key={k}
            className={`px-4 py-2 text-[13px] border-b-2 -mb-px transition-colors ${
              tab === k
                ? "text-neutral-100 font-semibold border-neutral-100"
                : "text-neutral-50 font-normal border-transparent hover:text-neutral-90"
            }`}
            onClick={() => setTab(k)}
          >
            {l}
          </button>
        ))}
      </div>

      {/* GCL toggle card */}
      <div className="flex justify-between items-center p-3 px-4 bg-white border border-neutral-20 rounded-xl mb-3">
        <div>
          <div className="text-[13px] font-semibold text-neutral-100 mb-0.5 flex items-center gap-1">
            Include GCL live carrier rates (MIS only)
          </div>
          <div className="text-[12px] text-neutral-50">
            Off = PSP offline only (Estimator view).{" "}
            <span className="text-info-70 font-medium">Upgrade to MIS for live rates.</span>
          </div>
        </div>
        <button
          className={`relative w-11 h-6 rounded-full shrink-0 transition-colors cursor-pointer border-none ${
            showLive ? "bg-info-70" : "bg-neutral-30"
          }`}
          onClick={() => setShowLive((v) => !v)}
        >
          <div
            className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${
              showLive ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Info banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-info-5 border border-info-20 rounded-xl mb-3 text-[12px] text-neutral-70">
        <Info size={14} className="text-info-70 shrink-0" />
        <span>
          <Badge variant="success" className="text-[10px] px-1.5 py-0 mr-1">GCL Live</Badge>
          = real-time rates + labels.{" "}
          <Badge variant="info" className="text-[10px] px-1.5 py-0 mr-1">PSP Offline</Badge>
          = your own flat pricing.
        </span>
      </div>

      {/* Summary */}
      <p className="text-[12px] text-neutral-50 mb-4">
        {activeCount} of {visibleMethods.length} methods active across{" "}
        {Object.keys(byCarrier).length} carriers
      </p>

      {/* Empty state */}
      {visibleMethods.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-[15px] font-semibold text-neutral-100 mb-1">No shipping methods</div>
          <div className="text-[13px] text-neutral-50">
            Add your first carrier method to get started.
          </div>
        </div>
      )}

      {/* Carrier groups */}
      {Object.entries(byCarrier).map(([carrier, meths]) => {
        const activeInGroup = meths.filter((m) => m.on).length
        const isCollapsed = collapsed[carrier]
        const hasGCL = meths.some((m) => m.type === "GCL")
        const carrierBg = carrierColors[carrier] || "#e5e7eb"

        return (
          <div key={carrier} className="mb-4">
            {/* Carrier header */}
            <button
              className="flex items-center gap-2.5 mb-1.5 text-left cursor-pointer bg-transparent border-none p-0"
              onClick={() => toggleCarrier(carrier)}
            >
              <span
                className={`flex text-neutral-50 transition-transform ${
                  isCollapsed ? "-rotate-90" : ""
                }`}
              >
                <ChevronDown size={16} />
              </span>
              <span
                className="flex items-center justify-center w-[42px] h-7 rounded-md text-[8px] font-extrabold shrink-0"
                style={{ background: carrierBg, color: carrierTextColor(carrierBg) }}
              >
                {carrier.slice(0, 4).toUpperCase()}
              </span>
              <span className="text-[15px] font-bold text-neutral-100">{carrier}</span>
              <Badge variant={hasGCL ? "success" : "info"} className="text-[10px] px-1.5 py-0">
                {hasGCL ? "GCL Live" : "PSP Offline"}
              </Badge>
              <span className="text-[12px] text-neutral-50">
                {activeInGroup} active method{activeInGroup !== 1 ? "s" : ""}
              </span>
            </button>

            {/* Method list */}
            {!isCollapsed && (
              <div className="border-l-2 border-neutral-20 ml-[26px] pl-5">
                {meths.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between py-2.5 border-b border-neutral-10 last:border-b-0"
                  >
                    <div className="min-w-0">
                      <button
                        className="text-[13px] font-medium text-neutral-100 bg-transparent border-none cursor-pointer p-0 text-left hover:text-info-70 transition-colors"
                        onClick={() => goEdit(m)}
                      >
                        {m.name}
                      </button>
                      <div className="flex flex-wrap gap-2.5 mt-0.5 text-[12px] text-neutral-50">
                        {m.transit && m.transit !== "-" && <span>{m.transit}</span>}
                        {m.dests.length > 0 && <span>{m.dests.join(", ")}</span>}
                        {m.type !== "GCL" && m.cost && (
                          <span className="text-success-70 font-medium">GBP {m.cost}</span>
                        )}
                        {m.type !== "GCL" && m.consignment && (
                          <span>+{m.consignment}/pkg</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        className="flex items-center p-1 rounded text-neutral-50 hover:bg-neutral-10 hover:text-neutral-80 transition-colors"
                        aria-label="Edit"
                        onClick={() => goEdit(m)}
                      >
                        <Pencil size={14} />
                      </button>
                      <Switch
                        checked={m.on}
                        onCheckedChange={() => toggleMethod(m.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
