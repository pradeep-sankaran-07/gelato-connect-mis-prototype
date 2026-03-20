"use client"

import { useState, useCallback } from "react"
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Play,
  X,
  Clock,
  Layers,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigation } from "@/lib/navigation-context"

type StepType = "production" | "quality" | "finishing" | "packaging" | "shipping"

interface WorkflowStep {
  id: string
  name: string
  type: StepType
  duration: number
  parallel: boolean
  optional: boolean
  conditional: boolean
}

const stepTypeColors: Record<StepType, { bg: string; text: string; label: string }> = {
  production: { bg: "bg-[#FFF8DB]", text: "text-[#695F00]", label: "Production" },
  quality: { bg: "bg-[#D5EBFF]", text: "text-[#00527C]", label: "Quality" },
  finishing: { bg: "bg-[#EDE7F6]", text: "text-[#5A3D7A]", label: "Finishing" },
  packaging: { bg: "bg-[#CDFEE1]", text: "text-[#0C5132]", label: "Packaging" },
  shipping: { bg: "bg-[#FEE9E8]", text: "text-[#8E1F0B]", label: "Shipping" },
}

const stepTypeDotColors: Record<StepType, string> = {
  production: "#FFD966",
  quality: "#6BC4E8",
  finishing: "#B39DDB",
  packaging: "#2ed389",
  shipping: "#FF788F",
}

const stepLibrary = [
  { name: "Prepress", type: "production" as StepType, duration: 30 },
  { name: "Plate Making", type: "production" as StepType, duration: 45 },
  { name: "Printing", type: "production" as StepType, duration: 45 },
  { name: "Cutting", type: "finishing" as StepType, duration: 20 },
  { name: "Folding", type: "finishing" as StepType, duration: 25 },
  { name: "Binding", type: "finishing" as StepType, duration: 35 },
  { name: "Lamination", type: "finishing" as StepType, duration: 15 },
  { name: "UV Coating", type: "finishing" as StepType, duration: 20 },
  { name: "Quality Check", type: "quality" as StepType, duration: 10 },
  { name: "Packaging", type: "packaging" as StepType, duration: 15 },
  { name: "Shipping", type: "shipping" as StepType, duration: 20 },
]

const initialSteps: WorkflowStep[] = [
  { id: "s1", name: "Prepress", type: "production", duration: 30, parallel: false, optional: false, conditional: false },
  { id: "s2", name: "Printing", type: "production", duration: 45, parallel: false, optional: false, conditional: false },
  { id: "s3", name: "Cutting", type: "finishing", duration: 20, parallel: false, optional: false, conditional: false },
  { id: "s4", name: "Lamination", type: "finishing", duration: 15, parallel: false, optional: true, conditional: false },
  { id: "s5", name: "Quality Check", type: "quality", duration: 10, parallel: false, optional: false, conditional: false },
  { id: "s6", name: "Packaging", type: "packaging", duration: 15, parallel: false, optional: false, conditional: false },
]

export default function WorkflowTemplateEditor() {
  const { goBack, params } = useNavigation()
  const isNew = params.workflowId === "new"

  const [templateName, setTemplateName] = useState(isNew ? "" : "Digital Print Standard")
  const [templateDescription, setTemplateDescription] = useState(
    isNew ? "" : "Standard workflow for digital print production including prepress, printing, finishing, and quality control."
  )
  const [steps, setSteps] = useState<WorkflowStep[]>(isNew ? [] : initialSteps)
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null)
  const [categories, setCategories] = useState({
    Digital: !isNew,
    Offset: false,
    "Large Format": false,
    Packaging: false,
  })
  const [showDryRun, setShowDryRun] = useState(false)
  const [dryRunProgress, setDryRunProgress] = useState(-1)
  const [editingName, setEditingName] = useState(false)

  const selectedStep = steps.find((s) => s.id === selectedStepId) || null

  const addStep = useCallback(
    (libraryStep: { name: string; type: StepType; duration: number }) => {
      const newStep: WorkflowStep = {
        id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: libraryStep.name,
        type: libraryStep.type,
        duration: libraryStep.duration,
        parallel: false,
        optional: false,
        conditional: false,
      }
      setSteps((prev) => [...prev, newStep])
      setSelectedStepId(newStep.id)
    },
    []
  )

  const removeStep = useCallback(
    (id: string) => {
      setSteps((prev) => prev.filter((s) => s.id !== id))
      if (selectedStepId === id) setSelectedStepId(null)
    },
    [selectedStepId]
  )

  const moveStep = useCallback((id: string, direction: "up" | "down") => {
    setSteps((prev) => {
      const idx = prev.findIndex((s) => s.id === id)
      if (idx === -1) return prev
      if (direction === "up" && idx === 0) return prev
      if (direction === "down" && idx === prev.length - 1) return prev
      const next = [...prev]
      const swapIdx = direction === "up" ? idx - 1 : idx + 1
      ;[next[idx], next[swapIdx]] = [next[swapIdx], next[idx]]
      return next
    })
  }, [])

  const updateStep = useCallback((id: string, updates: Partial<WorkflowStep>) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }, [])

  const totalDuration = steps.reduce((sum, s) => {
    if (s.optional) return sum
    return sum + s.duration
  }, 0)

  const parallelSavings = steps
    .filter((s) => s.parallel && !s.optional)
    .reduce((sum, s) => sum + s.duration, 0)

  const effectiveDuration = totalDuration - parallelSavings

  const runDryRun = () => {
    setShowDryRun(true)
    setDryRunProgress(0)
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step > steps.length) {
        clearInterval(interval)
        return
      }
      setDryRunProgress(step)
    }, 800)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-20 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-1.5 rounded-md hover:bg-neutral-10 text-neutral-60 hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          {editingName ? (
            <Input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
              autoFocus
              className="text-xl font-semibold border-neutral-20 w-72"
            />
          ) : (
            <h2
              className="text-xl font-semibold text-neutral-100 cursor-pointer hover:text-neutral-80 transition-colors"
              onClick={() => setEditingName(true)}
              title="Click to edit name"
            >
              {templateName || "Untitled Workflow"}
            </h2>
          )}
          <Badge className="bg-neutral-10 text-neutral-70 border-0 text-xs">v1.0</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={runDryRun}
            className="rounded-full border-neutral-40 text-neutral-90"
            disabled={steps.length === 0}
          >
            <Play className="h-4 w-4 mr-2" />
            Dry Run
          </Button>
          <Button className="bg-neutral-100 hover:bg-neutral-90 text-white rounded-full px-5">
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Visual Workflow Canvas (70%) */}
        <div className="w-[70%] overflow-y-auto p-6 bg-neutral-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-neutral-60" />
              <span className="text-sm font-medium text-neutral-70">
                {steps.length} Steps
              </span>
              <span className="text-neutral-30 mx-1">|</span>
              <Clock className="h-4 w-4 text-neutral-60" />
              <span className="text-sm text-neutral-70">
                Est. {effectiveDuration} min
              </span>
              {parallelSavings > 0 && (
                <span className="text-xs text-success-70 ml-1">
                  (-{parallelSavings} min parallel)
                </span>
              )}
            </div>
          </div>

          {/* Step Cards */}
          <div className="max-w-2xl mx-auto">
            {steps.map((step, idx) => (
              <div key={step.id}>
                {/* Connector line */}
                {idx > 0 && (
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-neutral-30 relative">
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-neutral-30" />
                    </div>
                  </div>
                )}

                {/* Step Card */}
                <div
                  onClick={() => setSelectedStepId(step.id)}
                  className={`relative border rounded-lg bg-white shadow-sm p-4 cursor-pointer transition-all ${
                    selectedStepId === step.id
                      ? "border-neutral-100 ring-1 ring-neutral-100"
                      : "border-neutral-20 hover:border-neutral-40"
                  } ${step.optional ? "opacity-75" : ""}`}
                >
                  {/* Type color indicator */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                    style={{ backgroundColor: stepTypeDotColors[step.type] }}
                  />

                  <div className="flex items-center gap-3 pl-2">
                    {/* Drag handle / Reorder */}
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          moveStep(step.id, "up")
                        }}
                        disabled={idx === 0}
                        className="p-0.5 rounded hover:bg-neutral-10 text-neutral-40 hover:text-neutral-70 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                      <GripVertical className="h-4 w-4 text-neutral-30" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          moveStep(step.id, "down")
                        }}
                        disabled={idx === steps.length - 1}
                        className="p-0.5 rounded hover:bg-neutral-10 text-neutral-40 hover:text-neutral-70 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-neutral-100">
                          {step.name}
                        </span>
                        <Badge
                          className={`${stepTypeColors[step.type].bg} ${stepTypeColors[step.type].text} border-0 text-[11px] px-2 py-0`}
                        >
                          {stepTypeColors[step.type].label}
                        </Badge>
                        {step.optional && (
                          <Badge className="bg-warning-20 text-warning-90 border-0 text-[11px] px-2 py-0">
                            Optional
                          </Badge>
                        )}
                        {step.parallel && (
                          <Badge className="bg-info-20 text-info-90 border-0 text-[11px] px-2 py-0">
                            Parallel
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-neutral-50">
                        Est. {step.duration} min
                      </span>
                    </div>

                    {/* Step Number */}
                    <span className="text-xs font-medium text-neutral-40 mr-1">
                      #{idx + 1}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeStep(step.id)
                      }}
                      className="p-1.5 rounded-md hover:bg-critical-10 text-neutral-40 hover:text-critical-70 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Drop zone */}
            <div className="mt-4">
              {steps.length > 0 && (
                <div className="flex justify-center mb-2">
                  <div className="w-0.5 h-4 bg-neutral-20" />
                </div>
              )}
              <div className="border-2 border-dashed border-neutral-20 rounded-lg p-6 text-center text-neutral-50 hover:border-neutral-40 hover:text-neutral-60 transition-colors">
                <Plus className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">Add a step from the library</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel — Configuration Sidebar (30%) */}
        <div className="w-[30%] border-l border-neutral-20 bg-white overflow-y-auto">
          <div className="p-5 space-y-6">
            {/* Step Properties (when selected) */}
            {selectedStep ? (
              <div>
                <h3 className="text-sm font-semibold text-neutral-100 mb-4">Step Properties</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-neutral-70 mb-1.5">
                      Step Name
                    </Label>
                    <Input
                      value={selectedStep.name}
                      onChange={(e) =>
                        updateStep(selectedStep.id, { name: e.target.value })
                      }
                      className="border-neutral-20 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-neutral-70 mb-1.5">Type</Label>
                    <Select
                      value={selectedStep.type}
                      onValueChange={(val: StepType) =>
                        updateStep(selectedStep.id, { type: val })
                      }
                    >
                      <SelectTrigger className="border-neutral-20 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="production">Production</SelectItem>
                        <SelectItem value="quality">Quality</SelectItem>
                        <SelectItem value="finishing">Finishing</SelectItem>
                        <SelectItem value="packaging">Packaging</SelectItem>
                        <SelectItem value="shipping">Shipping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-neutral-70 mb-1.5">
                      Estimated Duration (minutes)
                    </Label>
                    <Input
                      type="number"
                      min={1}
                      value={selectedStep.duration}
                      onChange={(e) =>
                        updateStep(selectedStep.id, {
                          duration: parseInt(e.target.value) || 1,
                        })
                      }
                      className="border-neutral-20 rounded-lg"
                    />
                  </div>
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-neutral-70">
                        Run in Parallel
                      </Label>
                      <Switch
                        checked={selectedStep.parallel}
                        onCheckedChange={(val) =>
                          updateStep(selectedStep.id, { parallel: val })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-neutral-70">Optional</Label>
                      <Switch
                        checked={selectedStep.optional}
                        onCheckedChange={(val) =>
                          updateStep(selectedStep.id, { optional: val })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-neutral-70">
                        Conditional
                      </Label>
                      <Switch
                        checked={selectedStep.conditional}
                        onCheckedChange={(val) =>
                          updateStep(selectedStep.id, { conditional: val })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-20">
                  <button
                    onClick={() => setSelectedStepId(null)}
                    className="text-xs text-neutral-50 hover:text-neutral-70"
                  >
                    Close properties
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Step Library */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-100 mb-3">Step Library</h3>
                  <div className="space-y-1">
                    {stepLibrary.map((lib) => (
                      <div
                        key={lib.name}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-5 group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: stepTypeDotColors[lib.type] }}
                          />
                          <span className="text-sm text-neutral-80">{lib.name}</span>
                          <span className="text-[11px] text-neutral-50">{lib.duration}m</span>
                        </div>
                        <button
                          onClick={() => addStep(lib)}
                          className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-neutral-10 text-neutral-50 hover:text-neutral-100 transition-all"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Divider */}
            <div className="h-px bg-neutral-20" />

            {/* Product Categories */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-100 mb-3">
                Product Categories
              </h3>
              <div className="space-y-2.5">
                {(Object.keys(categories) as Array<keyof typeof categories>).map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer">
                    <Checkbox
                      checked={categories[cat]}
                      onCheckedChange={(checked) =>
                        setCategories((prev) => ({ ...prev, [cat]: !!checked }))
                      }
                    />
                    <span className="text-sm text-neutral-80">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-20" />

            {/* Template Settings */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-100 mb-3">
                Template Settings
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-medium text-neutral-70 mb-1.5">Name</Label>
                  <Input
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Template name"
                    className="border-neutral-20 rounded-lg"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-neutral-70 mb-1.5">
                    Description
                  </Label>
                  <Textarea
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription(e.target.value)}
                    placeholder="Describe this workflow..."
                    className="border-neutral-20 rounded-lg min-h-[80px] resize-none"
                  />
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-neutral-50">Version</span>
                  <span className="text-xs font-medium text-neutral-70">1.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dry Run Modal */}
      {showDryRun && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-20">
              <div>
                <h3 className="text-base font-semibold text-neutral-100">Dry Run Simulation</h3>
                <p className="text-xs text-neutral-50 mt-0.5">
                  Simulating workflow execution for &quot;{templateName || "Untitled"}&quot;
                </p>
              </div>
              <button
                onClick={() => {
                  setShowDryRun(false)
                  setDryRunProgress(-1)
                }}
                className="p-1.5 rounded-md hover:bg-neutral-10 text-neutral-50 hover:text-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Timeline */}
            <div className="px-5 py-4 max-h-[400px] overflow-y-auto">
              <div className="space-y-0">
                {steps.map((step, idx) => {
                  const isComplete = dryRunProgress > idx
                  const isActive = dryRunProgress === idx
                  const isSkipped = step.optional
                  const isParallel = step.parallel

                  return (
                    <div key={step.id} className="flex gap-3">
                      {/* Timeline indicator */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-all duration-500 ${
                            isComplete
                              ? "bg-success-10 border-success-70 text-success-90"
                              : isActive
                                ? "bg-info-10 border-info-70 text-info-90 animate-pulse"
                                : "bg-neutral-5 border-neutral-20 text-neutral-50"
                          } ${isSkipped ? "opacity-50" : ""}`}
                        >
                          {isComplete ? "\u2713" : idx + 1}
                        </div>
                        {idx < steps.length - 1 && (
                          <div
                            className={`w-0.5 h-8 transition-colors duration-500 ${
                              isComplete ? "bg-success-70" : "bg-neutral-20"
                            }`}
                          />
                        )}
                      </div>

                      {/* Step detail */}
                      <div className={`flex-1 pb-4 ${isSkipped ? "opacity-50" : ""}`}>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${
                              isComplete
                                ? "text-success-90"
                                : isActive
                                  ? "text-info-90"
                                  : "text-neutral-60"
                            }`}
                          >
                            {step.name}
                          </span>
                          <Badge
                            className={`${stepTypeColors[step.type].bg} ${stepTypeColors[step.type].text} border-0 text-[10px] px-1.5 py-0`}
                          >
                            {stepTypeColors[step.type].label}
                          </Badge>
                          {isSkipped && (
                            <span className="text-[10px] text-warning-70 font-medium">
                              OPTIONAL
                            </span>
                          )}
                          {isParallel && (
                            <span className="text-[10px] text-info-70 font-medium">
                              PARALLEL
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-neutral-50">{step.duration} min</span>
                        {isActive && (
                          <div className="mt-1.5 h-1.5 bg-neutral-10 rounded-full overflow-hidden w-32">
                            <div className="h-full bg-info-60 rounded-full animate-pulse w-2/3" />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Summary Footer */}
            <div className="px-5 py-4 border-t border-neutral-20 bg-neutral-5 rounded-b-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-50 mb-0.5">Total Estimated Time</div>
                  <div className="text-lg font-semibold text-neutral-100">
                    {effectiveDuration} min
                    <span className="text-xs font-normal text-neutral-50 ml-2">
                      ({Math.floor(effectiveDuration / 60)}h {effectiveDuration % 60}m)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-50 mb-0.5">Steps</div>
                  <div className="text-sm font-medium text-neutral-80">
                    {steps.filter((s) => !s.optional).length} required, {steps.filter((s) => s.optional).length} optional
                  </div>
                </div>
              </div>
              {parallelSavings > 0 && (
                <div className="mt-2 text-xs text-success-70">
                  Parallel execution saves ~{parallelSavings} min
                </div>
              )}
              <div className="mt-3 flex justify-end">
                <Button
                  onClick={() => {
                    setShowDryRun(false)
                    setDryRunProgress(-1)
                  }}
                  variant="outline"
                  className="rounded-full border-neutral-40 text-sm"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
