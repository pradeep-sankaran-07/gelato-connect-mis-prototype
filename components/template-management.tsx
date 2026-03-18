"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface Template {
  id: string
  name: string
  type: "Digital" | "Litho" | "Large Format"
  description: string
  productTypes: string[]
  lastModified: string
  isDefault: boolean
}

interface TemplateManagementProps {
  onBackClick: () => void
  onEditTemplate: (templateId: string) => void
}

export default function TemplateManagement({ onBackClick, onEditTemplate }: TemplateManagementProps) {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "digital-1",
      name: "Digital Job Ticketing",
      type: "Digital",
      description: "Standard template for digital printing jobs",
      productTypes: ["Business Cards", "Flyers", "Brochures", "Postcards"],
      lastModified: "2025-01-15",
      isDefault: true,
    },
    {
      id: "litho-1",
      name: "Litho Job Ticketing",
      type: "Litho",
      description: "Template for lithographic printing processes",
      productTypes: ["Books", "Magazines", "Catalogs", "Large Runs"],
      lastModified: "2025-01-10",
      isDefault: true,
    },
    {
      id: "large-format-1",
      name: "Large Format Job Ticketing",
      type: "Large Format",
      description: "Template for large format printing jobs",
      productTypes: ["Banners", "Posters", "Signage", "Display Graphics"],
      lastModified: "2025-01-08",
      isDefault: true,
    },
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null)
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "Digital" as "Digital" | "Litho" | "Large Format",
    description: "",
    productTypes: "",
  })

  const handleCreateTemplate = () => {
    const template: Template = {
      id: `${newTemplate.type.toLowerCase().replace(" ", "-")}-${Date.now()}`,
      name: newTemplate.name,
      type: newTemplate.type,
      description: newTemplate.description,
      productTypes: newTemplate.productTypes
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p),
      lastModified: new Date().toISOString().split("T")[0],
      isDefault: false,
    }

    setTemplates([...templates, template])
    setNewTemplate({ name: "", type: "Digital", description: "", productTypes: "" })
    setShowCreateDialog(false)
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id))
    setShowDeleteDialog(null)
  }

  const handleCopyTemplate = (template: Template) => {
    const newTemplate: Template = {
      ...template,
      id: `${template.type.toLowerCase().replace(" ", "-")}-${Date.now()}`,
      name: `${template.name} (Copy)`,
      isDefault: false,
      lastModified: new Date().toISOString().split("T")[0],
    }
    setTemplates([...templates, newTemplate])
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Digital":
        return "bg-info-10 text-info-90"
      case "Litho":
        return "bg-success-10 text-success-90"
      case "Large Format":
        return "bg-primary-10 text-primary-90"
      default:
        return "bg-neutral-5 text-neutral-90"
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2819%29-170UxeV7cg8b7kNjFagZkz9quPldwr.png"
            alt="GelatoConnect Logo"
            className="h-6 w-6 mr-2"
          />
          <span className="font-bold text-lg">GelatoConnect</span>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBackClick} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Manage Orders
          </Button>
          <Input type="text" placeholder="Search" className="w-64 mr-4" />
          <Button variant="outline" size="sm" className="mr-2 bg-transparent">
            Support
          </Button>
          <div className="w-8 h-8 rounded-full bg-neutral-90 text-white flex items-center justify-center">PS</div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Template Settings</h1>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
                <DialogDescription>Create a new job ticket template for your printing processes.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Template Type</Label>
                  <Select
                    value={newTemplate.type}
                    onValueChange={(value: "Digital" | "Litho" | "Large Format") =>
                      setNewTemplate({ ...newTemplate, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Digital">Digital</SelectItem>
                      <SelectItem value="Litho">Litho</SelectItem>
                      <SelectItem value="Large Format">Large Format</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    placeholder="Enter template description"
                  />
                </div>
                <div>
                  <Label htmlFor="productTypes">Product Types (comma-separated)</Label>
                  <Input
                    id="productTypes"
                    value={newTemplate.productTypes}
                    onChange={(e) => setNewTemplate({ ...newTemplate, productTypes: e.target.value })}
                    placeholder="Business Cards, Flyers, Brochures"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTemplate} disabled={!newTemplate.name}>
                    Create Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getTypeColor(template.type)}>{template.type}</Badge>
                      {template.isDefault && <Badge variant="outline">Default</Badge>}
                    </div>
                  </div>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Product Types:</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.productTypes.map((type, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-neutral-50">Last modified: {template.lastModified}</Label>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => onEditTemplate(template.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCopyTemplate(template)}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                    {!template.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDeleteDialog(template.id)}
                        className="text-critical-70 hover:text-critical-90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Template</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this template? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDeleteDialog(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => showDeleteDialog && handleDeleteTemplate(showDeleteDialog)}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
