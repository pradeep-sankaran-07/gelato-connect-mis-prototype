"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, ArrowLeft, Search } from "lucide-react"
import { type PackagingMaterial, initialMaterials } from "./shipping-data"
import { ConfirmDeleteDialog } from "./confirm-delete-dialog"
import { toast } from "sonner"

// ─── Helpers ────────────────────────────────────────────────

function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Box:      { bg: "#f5f5f5", color: "#6b6b6b" },
    Pallet:   { bg: "#eff6ff", color: "#2563eb" },
    Tube:     { bg: "#f5f0ff", color: "#7c3aed" },
    Envelope: { bg: "#fef9ec", color: "#b45309" },
  }
  const s = styles[type] || styles.Box
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[11px] font-medium"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {type}
    </span>
  )
}

const emptyForm = { n: "", t: "Box", mc: "", lc: "", l: "", w: "", h: "", td: "", wt: "" }

// ─── Component ──────────────────────────────────────────────

export default function PackagingMaterials() {
  const [materials, setMaterials] = useState<PackagingMaterial[]>(initialMaterials)
  const [editing, setEditing] = useState<number | "new" | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<PackagingMaterial | null>(null)
  const [query, setQuery] = useState("")

  const filtered = useMemo(
    () =>
      materials.filter((m) =>
        m.n.toLowerCase().includes(query.toLowerCase())
      ),
    [materials, query]
  )

  // ── Actions ─────────────────────────────────────────────

  function openCreate() {
    setForm({ ...emptyForm })
    setEditing("new")
  }

  function openEdit(m: PackagingMaterial) {
    setForm({
      n: m.n,
      t: m.t,
      mc: String(m.mc),
      lc: String(m.lc),
      l: String(m.l),
      w: String(m.w),
      h: String(m.h),
      td: m.td,
      wt: String(m.wt),
    })
    setEditing(m.id)
  }

  function save() {
    const parsed: PackagingMaterial = {
      id: editing === "new" ? Date.now() : (editing as number),
      n: form.n.trim(),
      t: form.t,
      mc: parseFloat(form.mc) || 0,
      lc: parseFloat(form.lc) || 0,
      l: parseFloat(form.l) || 0,
      w: parseFloat(form.w) || 0,
      h: parseFloat(form.h) || 0,
      td: form.td,
      wt: parseFloat(form.wt) || 0,
    }

    if (editing === "new") {
      setMaterials((prev) => [...prev, parsed])
      toast("Material added")
    } else {
      setMaterials((prev) => prev.map((m) => (m.id === parsed.id ? parsed : m)))
      toast("Changes saved")
    }
    setEditing(null)
  }

  function doDelete() {
    if (!deleteTarget) return
    setMaterials((prev) => prev.filter((m) => m.id !== deleteTarget.id))
    toast("Material deleted")
    setDeleteTarget(null)
  }

  // ── Field helper ────────────────────────────────────────

  function setField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

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
            {editing === "new" ? "Add packaging material" : "Edit packaging material"}
          </h2>
        </div>

        {/* Form card */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4 max-w-[680px]">
          {/* Row 1: Name + Type */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[12px] font-medium text-[#999] mb-1">Name</label>
              <input
                className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                value={form.n}
                onChange={(e) => setField("n", e.target.value)}
                placeholder="e.g. Square Box"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#999] mb-1">Type</label>
              <select
                className="w-full h-[36px] px-3 rounded-lg text-sm outline-none appearance-none bg-white"
                style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                value={form.t}
                onChange={(e) => setField("t", e.target.value)}
              >
                <option>Box</option>
                <option>Pallet</option>
                <option>Tube</option>
                <option>Envelope</option>
              </select>
            </div>
          </div>

          {/* Row 2: Material Cost + Labour Cost */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[12px] font-medium text-[#999] mb-1">Material Cost (GBP)</label>
              <input
                type="number"
                className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                value={form.mc}
                onChange={(e) => setField("mc", e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#999] mb-1">Labour Cost (GBP)</label>
              <input
                type="number"
                className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                value={form.lc}
                onChange={(e) => setField("lc", e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Row 3: Length + Width + Height */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-[12px] font-medium text-[#999] mb-1">Length (mm)</label>
              <input
                type="number"
                className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                value={form.l}
                onChange={(e) => setField("l", e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#999] mb-1">Width (mm)</label>
              <input
                type="number"
                className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                value={form.w}
                onChange={(e) => setField("w", e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#999] mb-1">Height (mm)</label>
              <input
                type="number"
                className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                value={form.h}
                onChange={(e) => setField("h", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          {/* Row 4: Tube Diameter + Tare Weight */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-[12px] font-medium text-[#999] mb-1">Tube Diameter</label>
              <input
                className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                value={form.td}
                onChange={(e) => setField("td", e.target.value)}
                placeholder="e.g. 100mm"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#999] mb-1">Tare Weight (g)</label>
              <input
                type="number"
                className="w-full h-[36px] px-3 rounded-lg text-sm outline-none"
                style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                value={form.wt}
                onChange={(e) => setField("wt", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <Button
              onClick={save}
              disabled={!form.n.trim()}
              className="bg-[#212121] hover:opacity-90 text-white rounded-full text-sm"
            >
              {editing === "new" ? "Add Material" : "Save Changes"}
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
      </div>
    )
  }

  // ── List View ───────────────────────────────────────────

  const thCls =
    "px-2.5 py-2 text-left text-[11px] font-semibold text-[#999] bg-[#fafafa] border-b border-[#e5e5e5] tracking-wide"
  const tdCls = "px-2.5 py-2 text-[13px] text-[#333] border-b border-[#f5f5f5]"

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-[#212121]">Packaging Materials</h2>
            <Badge
              variant="secondary"
              className="text-xs"
              style={{ backgroundColor: "#F5F5F5", color: "#6b6b6b" }}
            >
              {materials.length} items
            </Badge>
          </div>
          <p className="text-sm text-[#999] mt-1">
            Boxes, pallets, and tubes with dimensions and costs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#999]" />
            <input
              className="h-[34px] pl-8 pr-3 rounded-lg text-sm outline-none w-[180px]"
              style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search materials..."
            />
          </div>
          <Button
            onClick={openCreate}
            className="bg-[#212121] hover:opacity-90 text-white rounded-full text-sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add New
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#e5e5e5] rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr>
                <th className={`${thCls} w-[40px]`}>#</th>
                <th className={`${thCls} w-[70px]`}>Actions</th>
                <th className={thCls}>Package</th>
                <th className={thCls}>Type</th>
                <th className={`${thCls} text-right`}>Material Cost</th>
                <th className={`${thCls} text-right`}>Labor Cost</th>
                <th className={`${thCls} text-right`}>Length</th>
                <th className={`${thCls} text-right`}>Width</th>
                <th className={`${thCls} text-right`}>Height</th>
                <th className={thCls}>Tube Dia.</th>
                <th className={`${thCls} text-right`}>Weight</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((mat, i) => (
                <tr
                  key={mat.id}
                  onClick={() => openEdit(mat)}
                  className="cursor-pointer hover:bg-[#f8f6ff] transition-colors"
                >
                  <td className={`${tdCls} text-[#999]`}>{i + 1}</td>
                  <td
                    className={tdCls}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(mat)}
                        className="p-1 rounded hover:bg-[#f0f0f0] text-[#999] hover:text-[#333]"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(mat)}
                        className="p-1 rounded hover:bg-red-50 text-[#999] hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className={`${tdCls} font-semibold`}>{mat.n}</td>
                  <td className={tdCls}>
                    <TypeBadge type={mat.t} />
                  </td>
                  <td className={`${tdCls} text-right text-green-600 font-medium`}>
                    GBP {mat.mc.toFixed(2)}
                  </td>
                  <td className={`${tdCls} text-right`}>
                    {mat.lc > 0 ? `GBP ${mat.lc.toFixed(2)}` : "-"}
                  </td>
                  <td className={`${tdCls} text-right`}>{mat.l}</td>
                  <td className={`${tdCls} text-right`}>{mat.w || "-"}</td>
                  <td className={`${tdCls} text-right`}>{mat.h || "-"}</td>
                  <td className={tdCls}>{mat.td || "-"}</td>
                  <td className={`${tdCls} text-right`}>{mat.wt.toLocaleString()}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty states */}
        {filtered.length === 0 && query && (
          <div className="py-12 text-center text-sm text-[#999]">
            No materials matching &ldquo;{query}&rdquo;
          </div>
        )}
        {filtered.length === 0 && !query && (
          <div className="py-12 text-center text-sm text-[#999]">
            No packaging materials yet. Click &ldquo;Add New&rdquo; to create one.
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        name={deleteTarget?.n || ""}
        body="This material will be removed from all packaging rules that reference it."
        onConfirm={doDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
