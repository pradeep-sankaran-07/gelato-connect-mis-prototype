"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, ArrowLeft, Search } from "lucide-react"
import { type PackagingRule, initialPkgRules, allProds, allMats, allCustomers } from "./shipping-data"
import { TagInput } from "./tag-input"
import { ConfirmDeleteDialog } from "./confirm-delete-dialog"
import { toast } from "sonner"

// ─── Types ─────────────────────────────────────────────────

interface RuleForm {
  name: string
  p: string
  customer: string
  products: string[]
  materials: string[]
  minW: string
  maxW: string
}

const emptyForm: RuleForm = {
  name: "",
  p: "",
  customer: "All",
  products: [],
  materials: [],
  minW: "",
  maxW: "",
}

// ─── Component ─────────────────────────────────────────────

export default function PackagingRulesSetup() {
  const [rules, setRules] = useState<PackagingRule[]>([...initialPkgRules])
  const [editing, setEditing] = useState<number | "new" | null>(null)
  const [form, setForm] = useState<RuleForm>({ ...emptyForm })
  const [deleteTarget, setDeleteTarget] = useState<PackagingRule | null>(null)
  const [query, setQuery] = useState("")

  // ── Derived data ─────────────────────────────────────────

  const sorted = useMemo(
    () => [...rules].sort((a, b) => b.p - a.p),
    [rules],
  )

  const filtered = useMemo(
    () =>
      query.trim()
        ? sorted.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
        : sorted,
    [sorted, query],
  )

  // ── Actions ──────────────────────────────────────────────

  function openCreate() {
    setForm({
      ...emptyForm,
      p: String(Math.max(0, ...rules.map((r) => r.p)) + 10),
    })
    setEditing("new")
  }

  function openEdit(r: PackagingRule) {
    setForm({
      name: r.name,
      p: String(r.p),
      customer: r.customer,
      products: [...r.products],
      materials: [...r.materials],
      minW: r.minW || "",
      maxW: r.maxW || "",
    })
    setEditing(r.id)
  }

  function save() {
    const parsed: PackagingRule = {
      id: editing === "new" ? Date.now() : (editing as number),
      name: form.name.trim(),
      p: parseInt(form.p, 10) || 0,
      customer: form.customer,
      products: [...form.products],
      materials: [...form.materials],
      minW: form.minW,
      maxW: form.maxW,
    }

    if (editing === "new") {
      setRules((prev) => [...prev, parsed])
      toast("Rule created")
    } else {
      setRules((prev) => prev.map((r) => (r.id === parsed.id ? parsed : r)))
      toast("Changes saved")
    }
    setEditing(null)
  }

  function doDelete() {
    if (!deleteTarget) return
    setRules((prev) => prev.filter((r) => r.id !== deleteTarget.id))
    toast("Rule deleted")
    setDeleteTarget(null)
  }

  // ── Field helper ─────────────────────────────────────────

  function setField<K extends keyof RuleForm>(key: K, value: RuleForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const canSave = form.name.trim() && form.products.length > 0 && form.materials.length > 0

  // ── Edit / Create View ───────────────────────────────────

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
            {editing === "new" ? "Create" : "Edit"} packaging rule
          </h2>
        </div>

        <div className="flex gap-4 items-start">
          {/* Left: form cards */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Rule identity */}
            <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
              <h3 className="text-[13px] font-bold text-[#212121] mb-3">Rule identity</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#999] tracking-wide mb-1">
                    Name
                  </label>
                  <Input
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="e.g. Softcover Book"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#999] tracking-wide mb-1">
                    Priority
                  </label>
                  <Input
                    type="number"
                    value={form.p}
                    onChange={(e) => setField("p", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#999] tracking-wide mb-1">
                  Customer
                </label>
                <select
                  className="w-full h-[36px] px-3 rounded-lg text-sm outline-none appearance-none bg-white"
                  style={{ boxShadow: "inset 0 0 0 1px #d4d4d4" }}
                  value={form.customer}
                  onChange={(e) => setField("customer", e.target.value)}
                >
                  {allCustomers.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
              <h3 className="text-[13px] font-bold text-[#212121] mb-1">Products</h3>
              <p className="text-[11px] text-[#999] mb-2.5">Which product categories?</p>
              <TagInput
                tags={form.products}
                options={allProds}
                onAdd={(t) => setField("products", [...form.products, t])}
                onRemove={(t) => setField("products", form.products.filter((x) => x !== t))}
                placeholder="Select categories..."
              />
            </div>

            {/* Materials */}
            <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
              <h3 className="text-[13px] font-bold text-[#212121] mb-1">Packaging materials</h3>
              <p className="text-[11px] text-[#999] mb-2.5">
                System selects the best fit automatically.
              </p>
              <TagInput
                tags={form.materials}
                options={allMats}
                onAdd={(t) => setField("materials", [...form.materials, t])}
                onRemove={(t) => setField("materials", form.materials.filter((x) => x !== t))}
                placeholder="Select materials..."
              />
            </div>

            {/* Weight constraints */}
            <div className="bg-white border border-[#e5e5e5] rounded-xl p-4">
              <h3 className="text-[13px] font-bold text-[#212121] mb-3">Weight constraints</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#999] tracking-wide mb-1">
                    Min weight (g)
                  </label>
                  <Input
                    type="number"
                    value={form.minW}
                    onChange={(e) => setField("minW", e.target.value)}
                    placeholder="No min"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#999] tracking-wide mb-1">
                    Max weight (g)
                  </label>
                  <Input
                    type="number"
                    value={form.maxW}
                    onChange={(e) => setField("maxW", e.target.value)}
                    placeholder="No max"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <Button
                onClick={save}
                disabled={!canSave}
                className="bg-[#212121] hover:opacity-90 text-white rounded-full text-sm"
              >
                {editing === "new" ? "Create rule" : "Save changes"}
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

          {/* Right: summary sidebar */}
          <div className="w-[220px] flex-shrink-0 sticky top-4">
            <div className="bg-[#fafafa] border border-[#e5e5e5] rounded-xl p-3.5">
              <h4 className="text-[11px] font-bold text-[#999] uppercase tracking-wider mb-2.5">
                Summary
              </h4>
              <div className="flex justify-between text-[12px] py-1 border-b border-[#e5e5e5]">
                <span className="text-[#999]">Name</span>
                <strong className="text-[#333]">{form.name || "\u2014"}</strong>
              </div>
              <div className="flex justify-between text-[12px] py-1 border-b border-[#e5e5e5]">
                <span className="text-[#999]">Priority</span>
                <strong className="text-[#333]">{form.p || "\u2014"}</strong>
              </div>
              <div className="flex justify-between text-[12px] py-1 border-b border-[#e5e5e5]">
                <span className="text-[#999]">Customer</span>
                <strong className="text-[#333]">{form.customer}</strong>
              </div>
              <div className="flex justify-between text-[12px] py-1 border-b border-[#e5e5e5]">
                <span className="text-[#999]">Products</span>
                <strong className="text-[#333]">{form.products.length}</strong>
              </div>
              <div className="flex justify-between text-[12px] py-1">
                <span className="text-[#999]">Materials</span>
                <strong className="text-[#333]">{form.materials.length}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── List View ────────────────────────────────────────────

  const thCls =
    "px-2.5 py-2 text-left text-[11px] font-semibold text-[#999] bg-[#fafafa] border-b border-[#e5e5e5] tracking-wide"
  const tdCls = "px-2.5 py-2 text-[13px] text-[#333] border-b border-[#f5f5f5] align-middle"

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-[#212121]">Packaging Rules</h2>
            <Badge
              variant="secondary"
              className="text-xs"
              style={{ backgroundColor: "#F5F5F5", color: "#6b6b6b" }}
            >
              {rules.length} rules
            </Badge>
          </div>
          <p className="text-sm text-[#999] mt-1">
            Assign products to packaging materials. Rules checked by priority (highest first).
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
              placeholder="Search rules..."
            />
          </div>
          <Button
            onClick={openCreate}
            className="bg-[#212121] hover:opacity-90 text-white rounded-full text-sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add New Rule
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#e5e5e5] rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr>
                <th className={`${thCls} w-[40px]`}>#</th>
                <th className={`${thCls} w-[70px]`}></th>
                <th className={thCls}>Rule</th>
                <th className={thCls}>Priority</th>
                <th className={thCls}>Customer</th>
                <th className={thCls}>Products</th>
                <th className={thCls}>Materials</th>
                <th className={`${thCls} text-right`}>Min wt</th>
                <th className={`${thCls} text-right`}>Max wt</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rule, i) => (
                <tr
                  key={rule.id}
                  onClick={() => openEdit(rule)}
                  className="cursor-pointer hover:bg-[#f8f6ff] transition-colors"
                >
                  <td className={`${tdCls} text-[#999]`}>{i + 1}</td>
                  <td className={tdCls} onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(rule)}
                        className="p-1 rounded hover:bg-[#f0f0f0] text-[#999] hover:text-[#333]"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(rule)}
                        className="p-1 rounded hover:bg-red-50 text-[#999] hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className={`${tdCls} font-semibold text-[#212121]`}>{rule.name}</td>
                  <td className={tdCls}>
                    <Badge
                      variant="secondary"
                      className="text-[11px] font-medium"
                      style={{ backgroundColor: "#ecfdf5", color: "#059669" }}
                    >
                      {rule.p}
                    </Badge>
                  </td>
                  <td className={tdCls}>
                    {rule.customer === "All" ? (
                      <span className="text-[#999]">All</span>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="text-[11px] font-medium"
                        style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}
                      >
                        {rule.customer}
                      </Badge>
                    )}
                  </td>
                  <td className={tdCls}>
                    <div className="flex flex-wrap gap-1 items-center">
                      {rule.products.slice(0, 2).map((p) => (
                        <span
                          key={p}
                          className="inline-block px-1.5 py-0.5 rounded text-[11px] bg-[#f5f5f5] text-[#666] whitespace-nowrap"
                        >
                          {p}
                        </span>
                      ))}
                      {rule.products.length > 2 && (
                        <span className="text-[11px] text-[#999]">
                          +{rule.products.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={tdCls}>
                    <div className="flex flex-wrap gap-1 items-center">
                      {rule.materials.slice(0, 2).map((m) => (
                        <span
                          key={m}
                          className="inline-block px-1.5 py-0.5 rounded text-[11px] whitespace-nowrap"
                          style={{ backgroundColor: "#eff6ff", color: "#3b82f6" }}
                        >
                          {m}
                        </span>
                      ))}
                      {rule.materials.length > 2 && (
                        <span className="text-[11px] text-[#999]">
                          +{rule.materials.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={`${tdCls} text-right text-[#999]`}>
                    {rule.minW ? `${(+rule.minW / 1000).toFixed(1)}kg` : "\u2014"}
                  </td>
                  <td className={`${tdCls} text-right text-[#999]`}>
                    {rule.maxW ? `${(+rule.maxW / 1000).toFixed(1)}kg` : "\u2014"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty states */}
        {rules.length === 0 && (
          <div className="py-12 text-center text-sm text-[#999]">
            No packaging rules yet. Click &ldquo;Add New Rule&rdquo; to create one.
          </div>
        )}
        {rules.length > 0 && filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#999]">
            No rules matching &ldquo;{query}&rdquo;
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        name={deleteTarget?.name || ""}
        body="This rule will stop applying to new orders."
        onConfirm={doDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
