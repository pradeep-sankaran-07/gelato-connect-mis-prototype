"use client"

import { useState } from "react"
import { ArrowLeft, Eye, FileText, ImageIcon, Save, Code, Sparkles, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TemplateEditorProps {
  templateId: string
  onBackClick: () => void
}

export default function TemplateEditor({ templateId, onBackClick }: TemplateEditorProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "fields" | "assets">("preview")
  const [rightPanelView, setRightPanelView] = useState<"connectai" | "html">("connectai")
  const [paperSize, setPaperSize] = useState("A4")

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

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBackClick}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Template Settings
          </Button>

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
            <div className="flex space-x-1">
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
                Show available fields
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
