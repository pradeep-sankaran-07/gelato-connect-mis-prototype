"use client"

import { useState } from "react"
import { Plus, Edit, Copy, Trash2, Search, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useNavigation } from "@/lib/navigation-context"

type Category = "All" | "Digital" | "Offset" | "Large Format" | "Packaging"

interface WorkflowTemplate {
  id: string
  name: string
  category: "Digital" | "Offset" | "Large Format" | "Packaging"
  steps: number
  products: string[]
  isDefault: boolean
  lastUpdated: string
}

const initialTemplates: WorkflowTemplate[] = [
  {
    id: "wf-001",
    name: "Digital Print Standard",
    category: "Digital",
    steps: 6,
    products: ["Business Cards", "Brochures", "Flyers"],
    isDefault: true,
    lastUpdated: "2026-03-15",
  },
  {
    id: "wf-002",
    name: "Offset Print Standard",
    category: "Offset",
    steps: 8,
    products: ["Catalogs", "Books", "Magazines"],
    isDefault: false,
    lastUpdated: "2026-03-10",
  },
  {
    id: "wf-003",
    name: "Large Format Standard",
    category: "Large Format",
    steps: 5,
    products: ["Posters", "Banners", "Signs"],
    isDefault: false,
    lastUpdated: "2026-03-08",
  },
  {
    id: "wf-004",
    name: "Packaging Workflow",
    category: "Packaging",
    steps: 7,
    products: ["Boxes", "Labels", "Sleeves"],
    isDefault: false,
    lastUpdated: "2026-02-28",
  },
]

const tabs: Category[] = ["All", "Digital", "Offset", "Large Format", "Packaging"]

const categoryColors: Record<string, string> = {
  Digital: "bg-info-20 text-info-90",
  Offset: "bg-primary-10 text-primary-90",
  "Large Format": "bg-warning-20 text-warning-90",
  Packaging: "bg-success-10 text-success-90",
}

export default function WorkflowTemplateList() {
  const { navigateTo } = useNavigation()
  const [templates, setTemplates] = useState<WorkflowTemplate[]>(initialTemplates)
  const [activeTab, setActiveTab] = useState<Category>("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTemplates = templates.filter((t) => {
    const matchesTab = activeTab === "All" || t.category === activeTab
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const handleToggleDefault = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDefault: !t.isDefault } : t))
    )
  }

  const handleDuplicate = (e: React.MouseEvent, template: WorkflowTemplate) => {
    e.stopPropagation()
    const duplicate: WorkflowTemplate = {
      ...template,
      id: `wf-${Date.now()}`,
      name: `${template.name} (Copy)`,
      isDefault: false,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setTemplates((prev) => [...prev, duplicate])
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setTemplates((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-100">Workflow Templates</h2>
          <p className="text-sm text-neutral-60 mt-1">
            Configure production workflow templates for different print categories
          </p>
        </div>
        <Button
          onClick={() => navigateTo("workflow-editor", { workflowId: "new" })}
          className="bg-neutral-100 hover:bg-neutral-90 text-white rounded-full px-5"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-50" />
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 rounded-lg border-neutral-20"
        />
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-neutral-20 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium relative transition-colors ${
              activeTab === tab
                ? "text-neutral-100"
                : "text-neutral-60 hover:text-neutral-80"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-sm" />
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-neutral-20 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-5 border-b border-neutral-20">
              <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">
                Steps
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">
                Products
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">
                Default
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-neutral-70 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.map((template) => (
              <tr
                key={template.id}
                onClick={() =>
                  navigateTo("workflow-editor", { workflowId: template.id })
                }
                className="border-b border-neutral-20 last:border-b-0 hover:bg-neutral-5 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-neutral-50" />
                    <span className="font-medium text-sm text-neutral-100">
                      {template.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <Badge
                    className={`${categoryColors[template.category]} border-0 text-xs font-medium`}
                  >
                    {template.category}
                  </Badge>
                </td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center justify-center bg-neutral-10 text-neutral-80 rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {template.steps} steps
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {template.products.map((product) => (
                      <span
                        key={product}
                        className="inline-block bg-neutral-10 text-neutral-70 rounded px-2 py-0.5 text-xs"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                  <Switch
                    checked={template.isDefault}
                    onCheckedChange={() => handleToggleDefault(template.id)}
                  />
                </td>
                <td className="px-4 py-3.5 text-sm text-neutral-60">
                  {template.lastUpdated}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigateTo("workflow-editor", { workflowId: template.id })
                      }}
                      className="p-1.5 rounded-md hover:bg-neutral-10 text-neutral-60 hover:text-neutral-100 transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => handleDuplicate(e, template)}
                      className="p-1.5 rounded-md hover:bg-neutral-10 text-neutral-60 hover:text-neutral-100 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, template.id)}
                      className="p-1.5 rounded-md hover:bg-critical-10 text-neutral-60 hover:text-critical-70 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTemplates.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-neutral-50 text-sm">
                  No workflow templates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 text-xs text-neutral-50">
        Showing {filteredTemplates.length} of {templates.length} templates
      </div>
    </div>
  )
}
