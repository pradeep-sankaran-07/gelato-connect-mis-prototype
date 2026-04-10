"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, ArrowLeft, ChevronDown, GripVertical } from "lucide-react"
import {
  type ShipRule,
  type ShipRuleMethod,
  initialShipRules,
  allDests,
  allMats,
  allCustomers,
  initialMethods,
} from "./shipping-data"
import { ConfirmDeleteDialog } from "./confirm-delete-dialog"
import { toast } from "sonner"

interface RuleForm {
  name: string
  customer: string
  pkg: string
  dest: string
  methods: ShipRuleMethod[]
}

type SimResult = null | { matched: true; rule: ShipRule } | { matched: false }

const allMethodNames = initialMethods.map((m) => m.name)

export default function ShippingRulesSetup() {
  const [rules, setRules] = useState<ShipRule[]>(() =>
    initialShipRules.map((r) => ({ ...r, methods: [...r.methods] }))
  )
  const [editing, setEditing] = useState<null | "new" | number>(null)
  const [expanded, setExpanded] = useState<number>(0)
  const [form, setForm] = useState<RuleForm>({
    name: "",
    customer: "All",
    pkg: "",
    dest: "",
    methods: [],
  })
  const [deleteTarget, setDeleteTarget] = useState<ShipRule | null>(null)

  // Simulator state
  const [simOpen, setSimOpen] = useState(false)
  const [simCustomer, setSimCustomer] = useState("All")
  const [simPkg, setSimPkg] = useState("")
  const [simDest, setSimDest] = useState("")
  const [simResult, setSimResult] = useState<SimResult>(null)

  const activeCount = useMemo(() => rules.filter((r) => r.active).length, [rules])

  // ── Helpers ──────────────────────────────────────────────

  function runSimulator() {
    const match = rules.find((r) => {
      if (!r.active) return false
      const custOk = r.customer === "All" || r.customer === simCustomer
      const pkgOk = r.pkg === simPkg
      const destOk = r.dest === simDest
      return custOk && pkgOk && destOk
    })
    setSimResult(match ? { matched: true, rule: match } : { matched: false })
  }

  function doDelete() {
    if (!deleteTarget) return
    setRules((prev) => prev.filter((r) => r.id !== deleteTarget.id))
    toast("Rule deleted")
    setDeleteTarget(null)
  }

  function openCreate() {
    setForm({ name: "", customer: "All", pkg: "", dest: "", methods: [] })
    setEditing("new")
  }

  function openEdit(r: ShipRule) {
    setForm({
      name: r.name,
      customer: r.customer,
      pkg: r.pkg,
      dest: r.dest,
      methods: [...r.methods],
    })
    setEditing(r.id)
  }

  function save() {
    if (editing === "new") {
      setRules((prev) => [
        ...prev,
        { id: Date.now(), active: true, ...form },
      ])
    } else {
      setRules((prev) =>
        prev.map((r) => (r.id === editing ? { ...r, ...form } : r))
      )
    }
    toast(editing === "new" ? "Rule created" : "Changes saved")
    setEditing(null)
  }

  function removeMethod(idx: number) {
    setForm((prev) => ({
      ...prev,
      methods: prev.methods.filter((_, j) => j !== idx),
    }))
  }

  function addMethod(name: string) {
    if (!name) return
    setForm((prev) => ({
      ...prev,
      methods: [...prev.methods, { n: name, c: "" }],
    }))
  }

  function toggleRuleActive(id: number) {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    )
  }

  const formValid = form.name && form.pkg && form.dest && form.methods.length > 0

  // ── Condition badges (shared between collapsed & expanded) ──

  function ConditionLine({ rule, color }: { rule: ShipRule; color: "blue" | "gray" }) {
    const badgeVariant = color === "blue" ? "default" : "secondary"
    return (
      <>
        {rule.customer !== "All" ? (
          <>
            <span className="text-[11px] font-bold text-blue-500">IF</span>{" "}
            customer is{" "}
            <Badge variant={badgeVariant} className="text-[11px] font-medium">
              {rule.customer}
            </Badge>{" "}
            <span className="text-[11px] font-bold text-blue-500">AND</span>{" "}
          </>
        ) : (
          <span className="text-[11px] font-bold text-blue-500">IF</span>
        )}
        {" "}package is{" "}
        <Badge variant={color === "blue" ? "default" : "secondary"} className="text-[11px] font-medium">
          {rule.pkg}
        </Badge>{" "}
        <span className="text-[11px] font-bold text-blue-500">AND</span>{" "}
        destination is{" "}
        <Badge variant={color === "blue" ? "default" : "secondary"} className="text-[11px] font-medium">
          {rule.dest}
        </Badge>
      </>
    )
  }

  // ── Edit / Create form ──────────────────────────────────

  if (editing !== null) {
    return (
      <div>
        {/* Back + title */}
        <div className="flex items-center gap-2.5 mb-4">
          <button
            className="flex items-center bg-transparent border-none cursor-pointer text-[#999] p-1 rounded-md hover:bg-[#f5f5f5] hover:text-[#333]"
            onClick={() => setEditing(null)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] tracking-[0.32px]">
            {editing === "new" ? "Create" : "Edit"} shipping rule
          </h1>
        </div>

        <div className="max-w-[680px]">
          {/* Rule name */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-4 mb-3">
            <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-3">Rule name</h3>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. UK Small Packages"
            />
          </div>

          {/* Conditions */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-4 mb-3">
            <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-3">Conditions</h3>
            <p className="text-[12px] text-[#999] -mt-1 mb-3">
              When all match, use the methods below in priority order.
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="flex items-center text-[11px] font-semibold text-[#666] mb-1.5 tracking-[0.32px]">
                  IF customer is
                </label>
                <select
                  className="h-9 w-full px-2.5 border-none rounded-lg shadow-[inset_0_0_0_1px_#ccc] text-[13px] bg-white cursor-pointer outline-none text-[#333]"
                  value={form.customer}
                  onChange={(e) => setForm({ ...form, customer: e.target.value })}
                >
                  {allCustomers.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center text-[11px] font-semibold text-[#666] mb-1.5 tracking-[0.32px]">
                  AND package is
                </label>
                <select
                  className="h-9 w-full px-2.5 border-none rounded-lg shadow-[inset_0_0_0_1px_#ccc] text-[13px] bg-white cursor-pointer outline-none text-[#333]"
                  value={form.pkg}
                  onChange={(e) => setForm({ ...form, pkg: e.target.value })}
                >
                  <option value="">Select...</option>
                  {allMats.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center text-[11px] font-semibold text-[#666] mb-1.5 tracking-[0.32px]">
                  AND destination is
                </label>
                <select
                  className="h-9 w-full px-2.5 border-none rounded-lg shadow-[inset_0_0_0_1px_#ccc] text-[13px] bg-white cursor-pointer outline-none text-[#333]"
                  value={form.dest}
                  onChange={(e) => setForm({ ...form, dest: e.target.value })}
                >
                  <option value="">Select...</option>
                  {allDests.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Priority order */}
          <div className="bg-blue-50 border border-blue-300 rounded-xl p-4 mb-3">
            <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-3">Priority order</h3>
            <p className="text-[12px] text-[#999] -mt-1 mb-3">
              Cost pulled from Shipping Methods.
            </p>

            {form.methods.map((m, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 py-2 px-2.5 rounded-md mb-0.5 ${
                  i % 2 === 0 ? "bg-[#f5f5f5]" : ""
                }`}
              >
                <span className="text-[13px] font-bold text-blue-500 min-w-[20px]">
                  {i + 1}
                </span>
                <GripVertical className="w-4 h-4 text-[#d4d4d4] cursor-grab" />
                <span className="text-[13px] font-medium text-[#1a1a1a] flex-1">
                  {m.n}
                </span>
                <span className="text-[12px] text-[#999]">{m.c}</span>
                <button
                  className="flex items-center bg-transparent border-none cursor-pointer p-0.5 rounded text-[#999] hover:bg-red-100 hover:text-red-600"
                  onClick={() => removeMethod(i)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="mt-2.5">
              <select
                className="h-9 px-2.5 border-none rounded-lg shadow-[inset_0_0_0_1px_#ccc] text-[13px] bg-white cursor-pointer outline-none text-[#333]"
                value=""
                onChange={(e) => {
                  addMethod(e.target.value)
                  e.target.value = ""
                }}
              >
                <option value="">+ Add method...</option>
                {allMethodNames
                  .filter((name) => !form.methods.find((x) => x.n === name))
                  .map((name) => (
                    <option key={name}>{name}</option>
                  ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={save} disabled={!formValid}>
              {editing === "new" ? "Create rule" : "Save changes"}
            </Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ── List view ───────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] tracking-[0.32px] mb-1">
            Shipping rules
          </h1>
          <p className="text-[13px] text-[#999]">
            Customer + Package + Destination &rarr; Delivery Method priority list.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4 mr-1.5" />
          Create rule
        </Button>
      </div>

      {/* Active rules label */}
      <div className="text-[10px] font-bold text-[#999] tracking-[1px] mb-2">
        ACTIVE RULES ({activeCount})
      </div>

      {/* Empty state */}
      {rules.length === 0 && (
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-8 text-center">
          <p className="text-[14px] font-semibold text-[#666] mb-1">No shipping rules</p>
          <p className="text-[12px] text-[#999]">
            Create a rule to map packages and destinations to delivery methods.
          </p>
        </div>
      )}

      {/* Rule cards */}
      {rules.map((rule, i) => {
        const isExp = expanded === i
        return (
          <div
            key={rule.id}
            className={`bg-white border border-[#e5e5e5] rounded-xl mb-2 overflow-hidden shadow-sm ${
              !rule.active ? "opacity-[0.55]" : ""
            }`}
          >
            {/* Header row */}
            <div className="flex items-center justify-between p-3 px-4">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-[#d4d4d4] cursor-grab" />
                <span className="text-[12px] text-[#999]">#{i + 1}</span>
                <button
                  className="flex bg-transparent border-none cursor-pointer p-0.5 rounded text-[#999]"
                  onClick={() => setExpanded(isExp ? -1 : i)}
                >
                  <ChevronDown
                    className="w-4 h-4 transition-transform duration-150"
                    style={{ transform: isExp ? "rotate(0deg)" : "rotate(-90deg)" }}
                  />
                </button>
                <span className="text-[14px] font-bold text-[#1a1a1a]">{rule.name}</span>
                {rule.active ? (
                  <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 text-[11px]">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[11px]">Disabled</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center bg-transparent border-none cursor-pointer p-0.5 rounded text-[#999] hover:bg-[#f5f5f5] hover:text-[#555]"
                  aria-label="Edit"
                  onClick={() => openEdit(rule)}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  className="flex items-center bg-transparent border-none cursor-pointer p-0.5 rounded text-[#999] hover:bg-red-100 hover:text-red-600"
                  aria-label="Delete"
                  onClick={() => setDeleteTarget(rule)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <Switch
                  checked={rule.active}
                  onCheckedChange={() => toggleRuleActive(rule.id)}
                />
              </div>
            </div>

            {/* Collapsed summary */}
            {!isExp && (
              <div className="flex items-center flex-wrap gap-[5px] px-4 pb-3 pl-[52px] text-[12px] text-[#666]">
                <ConditionLine rule={rule} color="gray" />
                <span className="ml-1.5 text-[11px] text-[#999]">
                  {rule.methods.length} method{rule.methods.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {/* Expanded detail */}
            {isExp && (
              <div className="border-t border-[#f5f5f5] p-3.5 pl-[52px]">
                <div className="text-[10px] font-bold text-[#999] tracking-widest mb-2">
                  CONDITIONS
                </div>
                <div className="flex items-center flex-wrap gap-[5px] text-[13px] text-[#666] mb-1">
                  <ConditionLine rule={rule} color="blue" />
                </div>

                <div className="text-[10px] font-bold text-[#999] tracking-[0.8px] mt-3.5 mb-2">
                  PRIORITY ORDER &mdash; CHECKED TOP TO BOTTOM
                </div>
                {rule.methods.map((m, j) => (
                  <div
                    key={j}
                    className={`flex items-center justify-between py-2 px-3 rounded-md mb-0.5 ${
                      j % 2 === 0 ? "bg-[#fafafa]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-bold text-blue-500 min-w-[20px]">
                        {j + 1}
                      </span>
                      <span className="text-[13px] font-medium text-[#1a1a1a]">{m.n}</span>
                    </div>
                    <span className="text-[12px] text-[#999]">{m.c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* ── Rule Simulator ──────────────────────────────────── */}
      <div className="mt-4 bg-white border border-[#e5e5e5] rounded-xl overflow-hidden">
        <button
          className="flex items-center gap-2 w-full p-3.5 px-4 bg-transparent border-none cursor-pointer text-[14px] font-semibold text-[#333] text-left transition-colors hover:bg-[#fafafa]"
          onClick={() => {
            setSimOpen((v) => !v)
            setSimResult(null)
          }}
        >
          <span className="text-[12px] text-[#999] w-3">{simOpen ? "\u25BE" : "\u25B8"}</span>
          Test this ruleset
          <span className="text-[12px] font-normal text-[#999] ml-1">
            Simulate which rule fires for a given order
          </span>
        </button>

        {simOpen && (
          <div className="px-4 pb-4 border-t border-[#f5f5f5]">
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2.5 items-end pt-3.5 mb-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#777] mb-1.5 tracking-[0.32px]">
                  Customer
                </label>
                <select
                  className="h-9 w-full px-2.5 border-none rounded-lg shadow-[inset_0_0_0_1px_#ccc] text-[13px] bg-white cursor-pointer outline-none text-[#333]"
                  value={simCustomer}
                  onChange={(e) => setSimCustomer(e.target.value)}
                >
                  {allCustomers.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#777] mb-1.5 tracking-[0.32px]">
                  Package
                </label>
                <select
                  className="h-9 w-full px-2.5 border-none rounded-lg shadow-[inset_0_0_0_1px_#ccc] text-[13px] bg-white cursor-pointer outline-none text-[#333]"
                  value={simPkg}
                  onChange={(e) => setSimPkg(e.target.value)}
                >
                  <option value="">Select...</option>
                  {allMats.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#777] mb-1.5 tracking-[0.32px]">
                  Destination
                </label>
                <select
                  className="h-9 w-full px-2.5 border-none rounded-lg shadow-[inset_0_0_0_1px_#ccc] text-[13px] bg-white cursor-pointer outline-none text-[#333]"
                  value={simDest}
                  onChange={(e) => setSimDest(e.target.value)}
                >
                  <option value="">Select...</option>
                  {allDests.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button onClick={runSimulator} disabled={!simPkg || !simDest}>
                  Run
                </Button>
              </div>
            </div>

            {/* Simulator result */}
            {simResult && (
              <>
                {simResult.matched ? (
                  <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 text-[13px] text-green-800 mb-2.5">
                      <span className="font-bold">&check;</span>
                      Rule matched: <strong>{simResult.rule.name}</strong>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {simResult.rule.methods.map((m, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-md bg-white"
                        >
                          <span className="text-[13px] font-bold text-blue-500 min-w-[18px]">
                            {j + 1}
                          </span>
                          <span className="text-[13px] font-medium text-[#1a1a1a] flex-1">
                            {m.n}
                          </span>
                          <span className="text-[12px] text-[#999]">{m.c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-300 rounded-lg p-3 text-[13px] font-medium text-red-700">
                    <span className="font-bold">&times;</span>
                    No rule matches &mdash; this order would fail to quote.
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        name={deleteTarget?.name ?? ""}
        body="This shipping rule will no longer apply to new orders."
        onConfirm={doDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
