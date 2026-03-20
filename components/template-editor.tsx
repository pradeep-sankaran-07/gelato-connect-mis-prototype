"use client"

import { useState } from "react"
import { Eye, FileText, ImageIcon, Save, Code, Sparkles, Send, QrCode, Barcode, ListOrdered, Variable, ChevronDown, ChevronUp, Plus, Trash2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useNavigation } from "@/lib/navigation-context"

interface TemplateEditorProps {
  templateId: string
}

export default function TemplateEditor({ templateId }: TemplateEditorProps) {
  const { goBack } = useNavigation()
  const [activeTab, setActiveTab] = useState<"preview" | "fields" | "assets" | "barcode" | "steps" | "variables">("preview")
  const [rightPanelView, setRightPanelView] = useState<"connectai" | "html">("connectai")
  const [paperSize, setPaperSize] = useState("A4")
  const [barcodeType, setBarcodeType] = useState("qr")
  const [barcodeContent, setBarcodeContent] = useState("{{orderNumber}}")
  const [expandedStep, setExpandedStep] = useState<number | null>(0)

  const [productionSteps, setProductionSteps] = useState([
    {
      id: 1,
      name: "Digital Printing",
      machine: "{{printingMachine}}",
      instructions: "Load paper stock as specified. Calibrate color profile before run. Run test sheet and verify against proof. Monitor inline quality sensor.",
      setupNote: "Verify paper weight and coating match job ticket specifications",
      qualityCheck: "Check color density every 500 sheets",
    },
    {
      id: 2,
      name: "Cutting",
      machine: "{{cuttingMachine}}",
      instructions: "Stack max sheets per cut as per machine spec. Verify first cut against trim marks. Ensure coating is dry before stacking.",
      setupNote: "Program cutting dimensions from job ticket",
      qualityCheck: "Measure first 5 cuts against template",
    },
    {
      id: 3,
      name: "Folding",
      machine: "{{foldingMachine}}",
      instructions: "Pre-score fold lines for heavy stock. Run test batch and verify fold alignment. Pull sample every 500 sheets for inspection.",
      setupNote: "Set fold type and dimensions per job ticket",
      qualityCheck: "Check fold accuracy +/-0.5mm tolerance",
    },
    {
      id: 4,
      name: "Packing",
      machine: "{{packingProcess}}",
      instructions: "Count units per box as specified. Place divider sheets between groups. Label each box with order number and destination.",
      setupNote: "Verify packaging materials are ready",
      qualityCheck: "Verify count per package before sealing",
    },
  ])

  const variableSubstitutions: Record<string, string> = {
    "{{orderNumber}}": "j-18-pc-5000",
    "{{jobId}}": "GCj-18-pc-5000",
    "{{jobCount}}": "1",
    "{{customerName}}": "PrintCo Ltd",
    "{{customerCode}}": "C000246-PrintCo",
    "{{jobDate}}": "May 16, 2025",
    "{{deliveryDate}}": "June 1, 2025",
    "{{jobName}}": "PrintCo Tri-fold Brochures",
    "{{jobType}}": "Marketing Brochure",
    "{{quantity}}": "5,000",
    "{{size}}": "A4",
    "{{finishing}}": "Tri-fold",
    "{{paperType}}": "200gsm Gloss",
    "{{bindingType}}": "None",
    "{{printingMachine}}": "HP Indigo 12000 HD",
    "{{cuttingMachine}}": "POLAR 92 PLUS Guillotine",
    "{{foldingMachine}}": "Heidelberg Stahlfolder TH82",
    "{{packingProcess}}": "Automated Counting & Boxing",
    "{{totalProductionTime}}": "6.5 hours",
    "{{totalSetupTime}}": "50 minutes",
  }

  const updateStepField = (stepId: number, field: string, value: string) => {
    setProductionSteps(prev =>
      prev.map(step => step.id === stepId ? { ...step, [field]: value } : step)
    )
  }

  const addProductionStep = () => {
    const newId = Math.max(...productionSteps.map(s => s.id)) + 1
    setProductionSteps(prev => [
      ...prev,
      { id: newId, name: "New Step", machine: "", instructions: "", setupNote: "", qualityCheck: "" },
    ])
    setExpandedStep(productionSteps.length)
  }

  const removeProductionStep = (stepId: number) => {
    setProductionSteps(prev => prev.filter(s => s.id !== stepId))
  }

  // Sample template content
  const [templateContent, setTemplateContent] = useState(`<!DOCTYPE html>
<html>
<head>
    <title>Job Ticket - {{orderNumber}}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { border-bottom: 2px solid #333; padding-bottom: 10px; }
        .section { margin: 20px 0; }
        .workflow-step { background: #f0f8ff; padding: 10px; margin: 5px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>GelatoConnect Job Ticket - Order #{{orderNumber}}</h1>
        <p>Job: {{jobId}} | Order: {{orderNumber}} | Jobs in order: {{jobCount}}</p>
        <p>Customer: {{customerName}} ({{customerCode}})</p>
        <p>Job date: {{jobDate}} | Delivery date: {{deliveryDate}}</p>
    </div>

    <div class="section">
        <h2>General Information</h2>
        <p><strong>Job Name:</strong> {{jobName}} | <strong>Type:</strong> {{jobType}} | <strong>Quantity:</strong> {{quantity}} | <strong>Size:</strong> {{size}}</p>
        <p><strong>Finishing:</strong> {{finishing}} | <strong>Paper Type:</strong> {{paperType}} | <strong>Binding Type:</strong> {{bindingType}}</p>
        
        <h3>Printing Specifications:</h3>
        <p><strong>Printing sides:</strong> {{printingSides}} | <strong>Printing colors:</strong> {{printingColors}} | <strong>Sheet category:</strong> {{sheetCategory}} | <strong>Sheet weight:</strong> {{sheetWeight}} | <strong>Sheet color:</strong> {{sheetColor}}</p>
    </div>

    <div class="section">
        <h2>Production Workflow</h2>
        <div class="workflow-step">
            <h3>Digital Printing | {{printingMachine}}</h3>
            <p><strong>Setup Time:</strong> {{setupTime}} | <strong>Impressions per Sheet:</strong> {{impressionsPerSheet}} | <strong>Color Mode:</strong> {{colorMode}}</p>
            <p><strong>Sheet Size:</strong> {{sheetSize}} | <strong>Total Sheets:</strong> {{totalSheets}} | <strong>Min. personnel:</strong> {{minPersonnel}}</p>
            <p><strong>Running Time:</strong> {{runningTime}} | <strong>Print Speed:</strong> {{printSpeed}} | <strong>Quality Check:</strong> {{qualityCheck}}</p>
        </div>
        
        <div class="workflow-step">
            <h3>Cutting | {{cuttingMachine}}</h3>
            <p><strong>Setup Time:</strong> {{cuttingSetupTime}} | <strong>Max Cutting Height:</strong> {{maxCuttingHeight}} | <strong>Sets for Cutting Width:</strong> {{cuttingSets}}</p>
            <p><strong>Sets for Cutting Length:</strong> {{cuttingLength}} | <strong>Amount of Sets:</strong> {{amountOfSets}} | <strong>Running Time:</strong> {{cuttingRunningTime}}</p>
            <p><strong>Min. personnel:</strong> {{cuttingPersonnel}} | <strong>Speed:</strong> {{cuttingSpeed}} | <strong>Final Size:</strong> {{finalSize}}</p>
        </div>
        
        <div class="workflow-step">
            <h3>Folding | {{foldingMachine}}</h3>
            <p><strong>Setup Time:</strong> {{foldingSetupTime}} | <strong>Folding Speed:</strong> {{foldingSpeed}} | <strong>Final Dimensions:</strong> {{finalDimensions}}</p>
            <p><strong>Fold Type:</strong> {{foldType}} | <strong>Fold Accuracy:</strong> {{foldAccuracy}} | <strong>Min. personnel:</strong> {{foldingPersonnel}}</p>
            <p><strong>Running Time:</strong> {{foldingRunningTime}} | <strong>Paper Thickness:</strong> {{paperThickness}} | <strong>Quality Control:</strong> {{foldingQualityControl}}</p>
        </div>
        
        <div class="workflow-step">
            <h3>Packing | {{packingProcess}}</h3>
            <p><strong>Setup Time:</strong> {{packingSetupTime}} | <strong>Running Time:</strong> {{packingRunningTime}} | <strong>Packages Amount:</strong> {{packagesAmount}}</p>
            <p><strong>Counting Speed:</strong> {{countingSpeed}} | <strong>Package Weight:</strong> {{packageWeight}} | <strong>Units per Package:</strong> {{unitsPerPackage}}</p>
            <p><strong>Unit Thickness:</strong> {{unitThickness}} | <strong>Unit Weight:</strong> {{unitWeight}} | <strong>Min. personnel:</strong> {{packingPersonnel}}</p>
        </div>
    </div>

    <div class="section">
        <h2>Production Summary</h2>
        <p><strong>Total Production Time:</strong> {{totalProductionTime}} | <strong>Quality Checks:</strong> {{qualityChecks}}</p>
        <p><strong>Total Setup Time:</strong> {{totalSetupTime}} | <strong>Material Waste:</strong> {{materialWaste}}</p>
        <p><strong>Estimated Completion:</strong> {{estimatedCompletion}} | <strong>Energy Consumption:</strong> {{energyConsumption}}</p>
        <p><strong>Production Method:</strong> {{productionMethod}} | <strong>Carbon Footprint:</strong> {{carbonFootprint}}</p>
    </div>

    <div class="section">
        <h2>Special Instructions</h2>
        <ul>
            <li>{{specialInstruction1}}</li>
            <li>{{specialInstruction2}}</li>
            <li>{{specialInstruction3}}</li>
            <li>{{specialInstruction4}}</li>
            <li>{{specialInstruction5}}</li>
            <li>{{specialInstruction6}}</li>
        </ul>
    </div>

    <div class="section">
        <h2>Templates &amp; Configuration</h2>
        <p>Template configuration and settings information will be displayed here.</p>
    </div>
</body>
</html>`)

  const availableFields = [
    {
      category: "Order Information",
      fields: ["orderNumber", "jobId", "jobCount", "customerName", "customerCode", "jobDate", "deliveryDate"],
    },
    {
      category: "Job Details",
      fields: ["jobName", "jobType", "quantity", "size", "finishing", "paperType", "bindingType"],
    },
    {
      category: "Printing Specs",
      fields: ["printingSides", "printingColors", "sheetCategory", "sheetWeight", "sheetColor"],
    },
    {
      category: "Production",
      fields: [
        "printingMachine",
        "setupTime",
        "impressionsPerSheet",
        "colorMode",
        "sheetSize",
        "totalSheets",
        "minPersonnel",
        "runningTime",
        "printSpeed",
        "qualityCheck",
      ],
    },
    {
      category: "Cutting",
      fields: [
        "cuttingMachine",
        "cuttingSetupTime",
        "maxCuttingHeight",
        "cuttingSets",
        "cuttingLength",
        "amountOfSets",
        "cuttingRunningTime",
        "cuttingPersonnel",
        "cuttingSpeed",
        "finalSize",
      ],
    },
    {
      category: "Folding",
      fields: [
        "foldingMachine",
        "foldingSetupTime",
        "foldingSpeed",
        "finalDimensions",
        "foldType",
        "foldAccuracy",
        "foldingPersonnel",
        "foldingRunningTime",
        "paperThickness",
        "foldingQualityControl",
      ],
    },
    {
      category: "Packing",
      fields: [
        "packingProcess",
        "packingSetupTime",
        "packingRunningTime",
        "packagesAmount",
        "countingSpeed",
        "packageWeight",
        "unitsPerPackage",
        "unitThickness",
        "unitWeight",
        "packingPersonnel",
      ],
    },
    {
      category: "Summary",
      fields: [
        "totalProductionTime",
        "qualityChecks",
        "totalSetupTime",
        "materialWaste",
        "estimatedCompletion",
        "energyConsumption",
        "productionMethod",
        "carbonFootprint",
      ],
    },
    {
      category: "Instructions",
      fields: [
        "specialInstruction1",
        "specialInstruction2",
        "specialInstruction3",
        "specialInstruction4",
        "specialInstruction5",
        "specialInstruction6",
      ],
    },
  ]

  const renderPreview = () => (
    <div className="bg-white p-6 border rounded-lg shadow-sm">
      <div className="border-b-2 border-neutral-90 pb-4 mb-6">
        <h1 className="text-2xl font-bold">GelatoConnect Job Ticket - Order #j-18-pc-5000</h1>
        <p className="text-sm text-neutral-60 mt-2">Job: GCj-18-pc-5000 | Order: j-18-pc-5000 | Jobs in order: 1</p>
        <p className="text-sm text-neutral-60">Customer: PrintCo Ltd (C000246-PrintCo)</p>
        <p className="text-sm text-neutral-60">Job date: May 16, 2025 | Delivery date: June 1, 2025</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">General Information</h2>
        <p className="mb-2">
          <strong>Job Name:</strong> PrintCo Tri-fold Brochures | <strong>Type:</strong> Marketing Brochure |{" "}
          <strong>Quantity:</strong> 5,000 | <strong>Size:</strong> A4
        </p>
        <p className="mb-4">
          <strong>Finishing:</strong> Tri-fold | <strong>Paper Type:</strong> 200gsm Gloss |{" "}
          <strong>Binding Type:</strong> None
        </p>

        <h3 className="text-lg font-medium mb-2">Printing Specifications:</h3>
        <p>
          <strong>Printing sides:</strong> Two Sides | <strong>Printing colors:</strong> Full Color | 4 Colors CMYK: Yes
          | <strong>Sheet category:</strong> Coated Gloss | <strong>Sheet weight:</strong> 200g |{" "}
          <strong>Sheet color:</strong> White
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Production Workflow</h2>

        <div className="bg-info-10 p-4 mb-3 rounded-lg">
          <h3 className="text-lg font-medium text-info-90 mb-2">Digital Printing | HP Indigo 12000 HD</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Setup Time:</strong> 15 min
            </div>
            <div>
              <strong>Impressions per Sheet:</strong> 2
            </div>
            <div>
              <strong>Color Mode:</strong> 4/4 CMYK
            </div>
            <div>
              <strong>Sheet Size:</strong> 32 x 45 cm
            </div>
            <div>
              <strong>Total Sheets:</strong> 2,500
            </div>
            <div>
              <strong>Min. personnel:</strong> 1
            </div>
            <div>
              <strong>Running Time:</strong> 2.5 hr
            </div>
            <div>
              <strong>Print Speed:</strong> 1,000 sph
            </div>
            <div>
              <strong>Quality Check:</strong> Automated
            </div>
          </div>
        </div>

        <div className="bg-info-10 p-4 mb-3 rounded-lg">
          <h3 className="text-lg font-medium text-info-90 mb-2">Cutting | POLAR 92 PLUS Guillotine</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Setup Time:</strong> 10 min
            </div>
            <div>
              <strong>Max Cutting Height:</strong> 8 cm
            </div>
            <div>
              <strong>Sets for Cutting Width:</strong> 2
            </div>
            <div>
              <strong>Sets for Cutting Length:</strong> 1
            </div>
            <div>
              <strong>Amount of Sets:</strong> 25
            </div>
            <div>
              <strong>Running Time:</strong> 20 min
            </div>
            <div>
              <strong>Min. personnel:</strong> 1
            </div>
            <div>
              <strong>Speed:</strong> 120 cuts/hr
            </div>
            <div>
              <strong>Final Size:</strong> A4 (210x297mm)
            </div>
          </div>
        </div>

        <div className="bg-info-10 p-4 mb-3 rounded-lg">
          <h3 className="text-lg font-medium text-info-90 mb-2">Folding | Heidelberg Stahlfolder TH82</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Setup Time:</strong> 20 min
            </div>
            <div>
              <strong>Folding Speed:</strong> 4,200 sheets/hr
            </div>
            <div>
              <strong>Final Dimensions:</strong> 99x210mm
            </div>
            <div>
              <strong>Fold Type:</strong> Tri-fold (Z-fold)
            </div>
            <div>
              <strong>Fold Accuracy:</strong> ±0.5mm
            </div>
            <div>
              <strong>Min. personnel:</strong> 1
            </div>
            <div>
              <strong>Running Time:</strong> 1.2 hr
            </div>
            <div>
              <strong>Paper Thickness:</strong> 200gsm
            </div>
            <div>
              <strong>Quality Control:</strong> Sample check
            </div>
          </div>
        </div>

        <div className="bg-info-10 p-4 mb-3 rounded-lg">
          <h3 className="text-lg font-medium text-info-90 mb-2">Packing | Automated Counting &amp; Boxing</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Setup Time:</strong> 5 min
            </div>
            <div>
              <strong>Running Time:</strong> 2.5 hr
            </div>
            <div>
              <strong>Packages Amount:</strong> 10
            </div>
            <div>
              <strong>Counting Speed:</strong> 2,000 units/hr
            </div>
            <div>
              <strong>Package Weight:</strong> 15.2 kg
            </div>
            <div>
              <strong>Units per Package:</strong> 500
            </div>
            <div>
              <strong>Unit Thickness:</strong> 0.6 mm
            </div>
            <div>
              <strong>Unit Weight:</strong> 3.04 g
            </div>
            <div>
              <strong>Min. personnel:</strong> 1
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Production Summary</h2>
        <div className="bg-neutral-5 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Total Production Time:</strong> 6.5 hours
            </div>
            <div>
              <strong>Quality Checks:</strong> 3 checkpoints
            </div>
            <div>
              <strong>Total Setup Time:</strong> 50 minutes
            </div>
            <div>
              <strong>Material Waste:</strong> &lt; 3%
            </div>
            <div>
              <strong>Estimated Completion:</strong> May 28, 2025
            </div>
            <div>
              <strong>Energy Consumption:</strong> 45 kWh
            </div>
            <div>
              <strong>Production Method:</strong> Automated (GelatoConnect)
            </div>
            <div>
              <strong>Carbon Footprint:</strong> 12.3 kg CO₂
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Special Instructions</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Ensure color consistency across all 5,000 units</li>
          <li>Tri-fold must be precise for proper alignment</li>
          <li>Quality check every 500 units during folding process</li>
          <li>Package in groups of 500 for easy distribution</li>
          <li>Handle with care due to gloss coating</li>
          <li>Automated JDF workflow enabled for machine communication</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Templates &amp; Configuration</h2>
        <p className="text-sm text-neutral-60">Template configuration and settings information will be displayed here.</p>
      </div>
    </div>
  )

  const renderFields = () => (
    <div className="space-y-4">
      {availableFields.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle className="text-lg">{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {category.fields.map((field) => (
                <div
                  key={field}
                  className="p-2 bg-neutral-5 rounded cursor-pointer hover:bg-neutral-5 transition-colors"
                  onClick={() => {
                    // Add field to template content
                    const fieldTag = `{{${field}}}`
                    setTemplateContent((prev) => prev + fieldTag)
                  }}
                >
                  <code className="text-sm">{"{{" + field + "}}"}</code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderAssets = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border-2 border-dashed border-neutral-30 rounded-lg text-center">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 text-neutral-40" />
              <p className="text-sm text-neutral-60">Company Logo</p>
            </div>
            <div className="p-4 border-2 border-dashed border-neutral-30 rounded-lg text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-neutral-40" />
              <p className="text-sm text-neutral-60">Header Template</p>
            </div>
          </div>
          <Button className="w-full mt-4 bg-transparent" variant="outline">
            Upload New Asset
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderBarcodePreview = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <QrCode className="h-5 w-5 text-info-70" />
            Barcode / QR Code Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-1 block">Code Type</Label>
            <div className="flex gap-2">
              <Button
                variant={barcodeType === "qr" ? "default" : "outline"}
                size="sm"
                onClick={() => setBarcodeType("qr")}
              >
                <QrCode className="h-4 w-4 mr-1" />
                QR Code
              </Button>
              <Button
                variant={barcodeType === "barcode" ? "default" : "outline"}
                size="sm"
                onClick={() => setBarcodeType("barcode")}
              >
                <Barcode className="h-4 w-4 mr-1" />
                Barcode 128
              </Button>
              <Button
                variant={barcodeType === "datamatrix" ? "default" : "outline"}
                size="sm"
                onClick={() => setBarcodeType("datamatrix")}
              >
                <QrCode className="h-4 w-4 mr-1" />
                Data Matrix
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Content (use variables)</Label>
            <Input
              value={barcodeContent}
              onChange={(e) => setBarcodeContent(e.target.value)}
              placeholder="e.g. {{orderNumber}}"
              className="font-mono text-sm"
            />
            <p className="text-xs text-neutral-50 mt-1">
              Resolves to: <span className="font-mono bg-neutral-5 px-1 rounded">{variableSubstitutions[barcodeContent] || barcodeContent.replace(/\{\{(\w+)\}\}/g, (_, key) => variableSubstitutions[`{{${key}}}`] || `{{${key}}}`)}</span>
            </p>
          </div>

          {/* Preview */}
          <div className="border-2 border-dashed border-neutral-20 rounded-lg p-6 flex flex-col items-center gap-3 bg-white">
            {barcodeType === "qr" ? (
              <div className="w-32 h-32 border border-neutral-30 rounded flex items-center justify-center bg-neutral-5">
                <QrCode className="h-20 w-20 text-neutral-90" />
              </div>
            ) : barcodeType === "barcode" ? (
              <div className="w-48 h-24 border border-neutral-30 rounded flex items-center justify-center bg-neutral-5">
                <Barcode className="h-16 w-40 text-neutral-90" />
              </div>
            ) : (
              <div className="w-24 h-24 border border-neutral-30 rounded flex items-center justify-center bg-neutral-5">
                <QrCode className="h-16 w-16 text-neutral-90" />
              </div>
            )}
            <span className="text-xs font-mono text-neutral-50">
              {variableSubstitutions[barcodeContent] || barcodeContent}
            </span>
            <Badge className="bg-info-10 text-info-90 text-xs">
              {barcodeType === "qr" ? "QR Code" : barcodeType === "barcode" ? "Code 128" : "Data Matrix"}
            </Badge>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Placement</Label>
            <div className="grid grid-cols-3 gap-2">
              {["Top Left", "Top Right", "Header Center", "Bottom Left", "Bottom Right", "Footer Center"].map((pos) => (
                <button
                  key={pos}
                  className="p-2 text-xs border rounded hover:bg-neutral-5 transition-colors text-center"
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Size</Label>
            <div className="flex items-center gap-3">
              <Input type="number" defaultValue={25} className="w-20 text-sm" />
              <span className="text-sm text-neutral-50">x</span>
              <Input type="number" defaultValue={25} className="w-20 text-sm" />
              <span className="text-sm text-neutral-50">mm</span>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={() => {
              const tag = barcodeType === "qr"
                ? `<div class="qr-code" data-content="${barcodeContent}"></div>`
                : `<div class="barcode" data-content="${barcodeContent}" data-type="${barcodeType}"></div>`
              setTemplateContent((prev) => prev + "\n" + tag)
            }}
          >
            Insert into Template
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderStepInstructions = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ListOrdered className="h-5 w-5 text-info-70" />
              Production Step Instructions
            </span>
            <Button size="sm" variant="outline" onClick={addProductionStep}>
              <Plus className="h-4 w-4 mr-1" />
              Add Step
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-neutral-50 mb-2">
            Define step-by-step instructions that appear on the printed job ticket for each production stage.
          </p>
          {productionSteps.map((step, idx) => (
            <div key={step.id} className="border rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-3 bg-neutral-5 hover:bg-neutral-5/80 transition-colors text-left"
                onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-neutral-40" />
                  <div className="w-6 h-6 rounded-full bg-info-70 text-white flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <span className="font-medium text-sm">{step.name}</span>
                  <span className="text-xs text-neutral-50">{step.machine}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-critical-70 hover:text-critical-90"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeProductionStep(step.id)
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                  {expandedStep === idx ? (
                    <ChevronUp className="h-4 w-4 text-neutral-40" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-40" />
                  )}
                </div>
              </button>

              {expandedStep === idx && (
                <div className="p-4 space-y-3 border-t">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-medium mb-1 block">Step Name</Label>
                      <Input
                        value={step.name}
                        onChange={(e) => updateStepField(step.id, "name", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium mb-1 block">Machine Variable</Label>
                      <Input
                        value={step.machine}
                        onChange={(e) => updateStepField(step.id, "machine", e.target.value)}
                        className="text-sm font-mono"
                        placeholder="e.g. {{printingMachine}}"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1 block">Production Instructions</Label>
                    <Textarea
                      value={step.instructions}
                      onChange={(e) => updateStepField(step.id, "instructions", e.target.value)}
                      className="text-sm min-h-[60px]"
                      placeholder="Step-by-step instructions for operators..."
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1 block">Setup Notes</Label>
                    <Input
                      value={step.setupNote}
                      onChange={(e) => updateStepField(step.id, "setupNote", e.target.value)}
                      className="text-sm"
                      placeholder="Pre-production setup requirements..."
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1 block">Quality Check</Label>
                    <Input
                      value={step.qualityCheck}
                      onChange={(e) => updateStepField(step.id, "qualityCheck", e.target.value)}
                      className="text-sm"
                      placeholder="Quality control criteria..."
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderVariablePreview = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Variable className="h-5 w-5 text-info-70" />
            Variable Substitution Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-neutral-50">
            Preview how template variables will resolve with sample data. Click any variable to insert it into the template.
          </p>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-5">
                <tr>
                  <th className="text-left p-2 font-medium text-neutral-60">Variable</th>
                  <th className="text-left p-2 font-medium text-neutral-60">Sample Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(variableSubstitutions).map(([variable, value]) => (
                  <tr
                    key={variable}
                    className="border-t hover:bg-info-10/30 cursor-pointer transition-colors"
                    onClick={() => setTemplateContent((prev) => prev + variable)}
                  >
                    <td className="p-2">
                      <code className="text-xs bg-neutral-5 px-1.5 py-0.5 rounded font-mono">{variable}</code>
                    </td>
                    <td className="p-2 text-neutral-70">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t pt-4">
            <Label className="text-sm font-medium mb-2 block">Live Preview (first 500 chars)</Label>
            <div className="bg-neutral-5 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap break-all max-h-[200px] overflow-y-auto">
              {templateContent
                .replace(/\{\{(\w+)\}\}/g, (match) => variableSubstitutions[match] || match)
                .replace(/<[^>]*>/g, "")
                .trim()
                .slice(0, 500)}
              {templateContent.replace(/<[^>]*>/g, "").length > 500 && "..."}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => goBack()}>
            Back to Template Settings
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select value={paperSize} onValueChange={setPaperSize}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A4">A4</SelectItem>
              <SelectItem value="A3">A3</SelectItem>
              <SelectItem value="Letter">Letter</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">Test print</Button>

          <Button variant="outline">Cancel changes</Button>

          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save changes
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="flex space-x-1 flex-wrap gap-y-1">
              <Button
                variant={activeTab === "preview" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("preview")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                variant={activeTab === "fields" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("fields")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Fields
              </Button>
              <Button
                variant={activeTab === "barcode" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("barcode")}
              >
                <QrCode className="h-4 w-4 mr-2" />
                Barcode/QR
              </Button>
              <Button
                variant={activeTab === "steps" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("steps")}
              >
                <ListOrdered className="h-4 w-4 mr-2" />
                Steps
              </Button>
              <Button
                variant={activeTab === "variables" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("variables")}
              >
                <Variable className="h-4 w-4 mr-2" />
                Variables
              </Button>
              <Button
                variant={activeTab === "assets" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("assets")}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Assets
              </Button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {activeTab === "preview" && renderPreview()}
            {activeTab === "fields" && renderFields()}
            {activeTab === "barcode" && renderBarcodePreview()}
            {activeTab === "steps" && renderStepInstructions()}
            {activeTab === "variables" && renderVariablePreview()}
            {activeTab === "assets" && renderAssets()}
          </div>
        </div>

        {/* Right Panel - Switcher between ConnectAI and HTML */}
        <div className="w-1/2 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                <Button
                  variant={rightPanelView === "connectai" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setRightPanelView("connectai")}
                  className={rightPanelView === "connectai" ? "bg-info-70 hover:bg-info-90" : ""}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  ConnectAI
                </Button>
                <Button
                  variant={rightPanelView === "html" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setRightPanelView("html")}
                >
                  <Code className="h-4 w-4 mr-2" />
                  HTML
                </Button>
              </div>
              {rightPanelView === "html" && (
                <Button variant="outline" size="sm">
                  Upload assets
                </Button>
              )}
            </div>
          </div>

          {rightPanelView === "connectai" ? (
            // ConnectAI Assistant View
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <h3 className="text-lg font-medium mb-2">How can I help with your job ticket template?</h3>
                  <p className="text-sm text-neutral-50 mb-6">
                    Describe your template needs or ask how I can help optimize your job ticket design and workflow
                  </p>
                  <Textarea placeholder="Describe the template help you need..." className="min-h-[120px] mb-4" />
                  <div className="flex justify-between items-center">
                    <button className="text-sm text-info-70 hover:underline">Show me an example</button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // HTML Editor View
            <div className="flex-1 flex flex-col">
              <div className="p-2 border-b">
                <Label className="font-medium text-sm">JobTicketTemplate.html</Label>
              </div>
              <div className="flex-1 p-4">
                <Textarea
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  className="w-full h-full font-mono text-sm resize-none"
                  placeholder="Enter your HTML template here..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
