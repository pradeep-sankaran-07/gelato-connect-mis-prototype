"use client"

import React, { useState } from "react"
import { useNavigation } from "@/lib/navigation-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronDown, ChevronRight, ArrowLeft, Printer, Scissors, BookOpen,
  Layers, Tag, Package, FolderOpen, Wrench, Ruler, ClipboardList, Box,
  DollarSign, Settings, Grid3X3, Plus, Search, MoreHorizontal, Pencil,
  Trash2, Globe, ExternalLink, CheckCircle, XCircle, Clock, Copy,
  Sparkles, Mail, Link2, Eye, Code, Zap, Send, FileDown
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────

interface MenuChild {
  id: string
  label: string
  children?: MenuChild[]
}

interface MenuSection {
  id: string
  label: string
  icon: React.ElementType
  children?: MenuChild[]
}

interface Connection {
  id: string
  name: string
  type: "Gelato Connect MIS" | "External MIS" | "Both (Gelato Connect + External)"
  webhookUrl: string
  authMethod: "Bearer" | "Basic" | "API Key" | "None"
  triggers: string[]
  status: "active" | "inactive"
  lastSync: string
}

// ─── Menu Structure ──────────────────────────────────────────

const menuStructure: (MenuSection | "divider")[] = [
  {
    id: "print-machines",
    label: "Print Machines",
    icon: Printer,
    children: [
      {
        id: "commercial-print",
        label: "Commercial Print",
        children: [
          { id: "sheet-fed-digital", label: "Sheet Fed Digital" },
          { id: "sheet-fed-offset", label: "Sheet Fed Offset" },
          { id: "web-digital", label: "Web Digital" },
          { id: "web-offset", label: "Web Offset" },
        ],
      },
      {
        id: "large-format",
        label: "Large Format",
        children: [
          { id: "roll-fed", label: "Roll Fed" },
          { id: "sheet-fed-lf", label: "Sheet Fed" },
        ],
      },
    ],
  },
  {
    id: "finishing-machines",
    label: "Finishing Machines",
    icon: Scissors,
    children: [
      { id: "finishing-steps", label: "Finishing Steps" },
      { id: "cut", label: "Cut" },
      { id: "fold", label: "Fold" },
      { id: "crease", label: "Crease" },
      { id: "laminate", label: "Laminate" },
      { id: "spot-finish", label: "Spot Finish" },
      { id: "folder-gluer", label: "Folder Gluer" },
      { id: "custom-finishing", label: "Custom" },
    ],
  },
  {
    id: "binding-machines",
    label: "Binding Machines",
    icon: BookOpen,
    children: [
      { id: "saddle-stitch", label: "Saddle Stitch" },
      { id: "perfect-bind", label: "Perfect Bind" },
      { id: "wire-o", label: "Wire-O" },
      { id: "case-making", label: "Case Making" },
      { id: "pad-glue", label: "Pad Glue" },
      { id: "custom-price-model", label: "Custom Price Model" },
    ],
  },
  { id: "substrates", label: "Substrates", icon: Layers },
  { id: "tags", label: "Tags", icon: Tag },
  { id: "products", label: "Products", icon: Package },
  {
    id: "categories",
    label: "Categories",
    icon: FolderOpen,
    children: [
      { id: "category-parts", label: "Category Parts" },
      { id: "production-steps", label: "Production Steps" },
      { id: "category-rules", label: "Category Rules" },
    ],
  },
  { id: "field-rules", label: "Field Rules", icon: Wrench },
  {
    id: "reference-data",
    label: "Reference Data",
    icon: Ruler,
    children: [
      { id: "finish-sizes", label: "Finish Sizes" },
      { id: "page-limits", label: "Page Limits" },
      { id: "page-folds", label: "Page Folds" },
      { id: "page-colors", label: "Page Colors" },
      { id: "die-cut-templates", label: "Die Cut Templates" },
    ],
  },
  { id: "preconfigured-parts", label: "Preconfigured Parts", icon: ClipboardList },
  {
    id: "packaging-config",
    label: "Packaging Config",
    icon: Box,
    children: [
      { id: "shipping-packages", label: "Shipping Packages" },
      { id: "shipping-methods", label: "Shipping Methods" },
    ],
  },
  "divider" as const,
  { id: "pricing-rules", label: "Pricing Rules", icon: DollarSign },
  "divider" as const,
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      { id: "general-settings", label: "General Settings" },
      { id: "email-template", label: "Email Template" },
      { id: "ai-guidance", label: "AI Guidance" },
      { id: "connections", label: "Connections" },
    ],
  },
]

// ─── Mock Data ───────────────────────────────────────────────

const initialConnections: Connection[] = [
  {
    id: "conn-1",
    name: "Gelato Connect MIS",
    type: "Gelato Connect MIS",
    webhookUrl: "https://api.gelatoconnect.com/webhooks/estimates",
    authMethod: "Bearer",
    triggers: ["Estimate Created", "Estimate Accepted", "Estimate Converted"],
    status: "active",
    lastSync: "2 min ago",
  },
  {
    id: "conn-2",
    name: "PrintVis MIS",
    type: "External MIS",
    webhookUrl: "https://printvis.example.com/api/v2/webhooks",
    authMethod: "API Key",
    triggers: ["Estimate Accepted", "Estimate Converted"],
    status: "active",
    lastSync: "15 min ago",
  },
]

const emailTemplates: Record<string, { subject: string; body: string }> = {
  "estimate-sent": {
    subject: "Estimate {{estimate_number}} from {{company_name}}",
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hello {{customer_name}},</h2>
  <p>Thank you for your inquiry. Please find attached your estimate <strong>{{estimate_number}}</strong> for the requested print job(s).</p>
  <p><strong>Estimate Total:</strong> {{total_amount}}</p>
  <p><strong>Valid Until:</strong> {{valid_until}}</p>
  <h3>Items Summary</h3>
  <p>{{items_summary}}</p>
  <p>You can review and accept this estimate online:</p>
  <a href="{{portal_link}}" style="display:inline-block;padding:10px 24px;background:#212121;color:#fff;text-decoration:none;border-radius:6px;">View Estimate</a>
  <p style="margin-top:24px;">Best regards,<br/>{{sales_rep}}<br/>{{company_name}}</p>
</div>`,
  },
  "estimate-followup": {
    subject: "Following up on Estimate {{estimate_number}}",
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hello {{customer_name}},</h2>
  <p>I wanted to follow up on Estimate <strong>{{estimate_number}}</strong> that was sent on your requested print job(s).</p>
  <p>The estimate is valid until <strong>{{valid_until}}</strong>. Please let us know if you have any questions or would like to proceed.</p>
  <a href="{{portal_link}}" style="display:inline-block;padding:10px 24px;background:#212121;color:#fff;text-decoration:none;border-radius:6px;">View Estimate</a>
  <p style="margin-top:24px;">Best regards,<br/>{{sales_rep}}<br/>{{company_name}}</p>
</div>`,
  },
  "estimate-accepted": {
    subject: "Great news! Estimate {{estimate_number}} accepted",
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hello {{customer_name}},</h2>
  <p>Great news! Estimate <strong>{{estimate_number}}</strong> has been accepted.</p>
  <p><strong>Total:</strong> {{total_amount}}</p>
  <p>We will begin processing your order shortly. You will receive a confirmation once the order has been created.</p>
  <p style="margin-top:24px;">Best regards,<br/>{{sales_rep}}<br/>{{company_name}}</p>
</div>`,
  },
  "conversion-confirmation": {
    subject: "Order confirmed from Estimate {{estimate_number}}",
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hello {{customer_name}},</h2>
  <p>Your estimate <strong>{{estimate_number}}</strong> has been converted to an active order.</p>
  <p><strong>Order Total:</strong> {{total_amount}}</p>
  <p>{{items_summary}}</p>
  <p>You can track the progress of your order through our portal:</p>
  <a href="{{portal_link}}" style="display:inline-block;padding:10px 24px;background:#212121;color:#fff;text-decoration:none;border-radius:6px;">Track Order</a>
  <p style="margin-top:24px;">Best regards,<br/>{{sales_rep}}<br/>{{company_name}}</p>
</div>`,
  },
}

const exportLogs = [
  { id: "EXP-001", time: "Mar 20, 2026 09:15", connection: "Gelato Connect MIS", estimateId: "EST-2025-047", type: "Estimate Converted", status: "success" as const },
  { id: "EXP-002", time: "Mar 19, 2026 14:30", connection: "PrintVis MIS", estimateId: "EST-2025-046", type: "Estimate Accepted", status: "failed" as const },
  { id: "EXP-003", time: "Mar 19, 2026 10:00", connection: "Gelato Connect MIS", estimateId: "EST-2025-045", type: "Estimate Created", status: "success" as const },
  { id: "EXP-004", time: "Mar 18, 2026 16:45", connection: "PrintVis MIS", estimateId: "EST-2025-044", type: "Estimate Sent", status: "success" as const },
  { id: "EXP-005", time: "Mar 18, 2026 09:20", connection: "Gelato Connect MIS", estimateId: "EST-2025-043", type: "Estimate Created", status: "pending" as const },
  { id: "EXP-006", time: "Mar 17, 2026 11:00", connection: "PrintVis MIS", estimateId: "EST-2025-042", type: "Estimate Converted", status: "failed" as const },
]

const availableVariables = [
  "{{customer_name}}",
  "{{company_name}}",
  "{{estimate_number}}",
  "{{total_amount}}",
  "{{valid_until}}",
  "{{items_summary}}",
  "{{sales_rep}}",
  "{{portal_link}}",
]

const allTriggers = ["Estimate Created", "Estimate Sent", "Estimate Accepted", "Estimate Rejected", "Estimate Converted"]

// Mock data counts per section
const sectionCounts: Record<string, number> = {
  "print-machines": 8,
  "commercial-print": 4,
  "sheet-fed-digital": 3,
  "sheet-fed-offset": 2,
  "web-digital": 1,
  "web-offset": 2,
  "large-format": 3,
  "roll-fed": 2,
  "sheet-fed-lf": 1,
  "finishing-machines": 12,
  "finishing-steps": 6,
  "cut": 3,
  "fold": 4,
  "crease": 2,
  "laminate": 3,
  "spot-finish": 2,
  "folder-gluer": 1,
  "custom-finishing": 2,
  "binding-machines": 7,
  "saddle-stitch": 2,
  "perfect-bind": 3,
  "wire-o": 1,
  "case-making": 1,
  "pad-glue": 1,
  "custom-price-model": 2,
  "substrates": 24,
  "tags": 8,
  "products": 16,
  "categories": 6,
  "category-parts": 12,
  "production-steps": 8,
  "category-rules": 5,
  "field-rules": 10,
  "reference-data": 18,
  "finish-sizes": 14,
  "page-limits": 6,
  "page-folds": 5,
  "page-colors": 8,
  "die-cut-templates": 3,
  "preconfigured-parts": 9,
  "packaging-config": 5,
  "shipping-packages": 6,
  "shipping-methods": 4,
  "pricing-rules": 5,
}

// Determine which column set to use for each data section
function getColumnsForSection(id: string): { header: string; key: string }[] {
  if (
    id.includes("digital") || id.includes("offset") || id.includes("web-") ||
    id.includes("roll-fed") || id.includes("sheet-fed-lf") ||
    id === "commercial-print" || id === "large-format" ||
    id === "print-machines" || id === "finishing-machines" ||
    id === "binding-machines" || id.includes("finishing") || id.includes("cut") ||
    id.includes("fold") || id.includes("crease") || id.includes("laminate") ||
    id.includes("spot-finish") || id.includes("folder-gluer") || id.includes("custom-finishing") ||
    id.includes("saddle") || id.includes("perfect") || id.includes("wire") ||
    id.includes("case-making") || id.includes("pad-glue") || id.includes("custom-price")
  ) {
    return [
      { header: "Name", key: "name" },
      { header: "Type", key: "type" },
      { header: "Status", key: "status" },
      { header: "Speed", key: "speed" },
      { header: "Last Modified", key: "modified" },
    ]
  }
  if (id === "substrates") {
    return [
      { header: "Name", key: "name" },
      { header: "GSM", key: "gsm" },
      { header: "Size", key: "size" },
      { header: "Color", key: "color" },
      { header: "Stock", key: "stock" },
    ]
  }
  if (id === "products") {
    return [
      { header: "Name", key: "name" },
      { header: "Category", key: "category" },
      { header: "Size Range", key: "sizeRange" },
      { header: "Active", key: "active" },
    ]
  }
  if (id === "tags") {
    return [
      { header: "Name", key: "name" },
      { header: "Color", key: "color" },
      { header: "Items Tagged", key: "count" },
    ]
  }
  if (id === "categories" || id.includes("category")) {
    return [
      { header: "Name", key: "name" },
      { header: "Type", key: "type" },
      { header: "Parts Count", key: "parts" },
      { header: "Active", key: "active" },
    ]
  }
  if (id === "field-rules") {
    return [
      { header: "Name", key: "name" },
      { header: "Trigger", key: "trigger" },
      { header: "Condition", key: "condition" },
      { header: "Action", key: "action" },
    ]
  }
  if (id.includes("reference") || id.includes("finish-sizes") || id.includes("page-") || id.includes("die-cut")) {
    return [
      { header: "Name", key: "name" },
      { header: "Value", key: "value" },
      { header: "Unit", key: "unit" },
    ]
  }
  if (id.includes("shipping") || id.includes("packaging")) {
    return [
      { header: "Name", key: "name" },
      { header: "Dimensions", key: "dimensions" },
      { header: "Max Weight", key: "weight" },
    ]
  }
  if (id === "preconfigured-parts") {
    return [
      { header: "Name", key: "name" },
      { header: "Category", key: "category" },
      { header: "Size Range", key: "sizeRange" },
      { header: "Active", key: "active" },
    ]
  }
  if (id === "production-steps") {
    return [
      { header: "Name", key: "name" },
      { header: "Type", key: "type" },
      { header: "Status", key: "status" },
      { header: "Speed", key: "speed" },
      { header: "Last Modified", key: "modified" },
    ]
  }
  return [
    { header: "Name", key: "name" },
    { header: "Type", key: "type" },
    { header: "Status", key: "status" },
  ]
}

function getMockRows(id: string): Record<string, string>[] {
  if (
    id.includes("digital") || id.includes("offset") || id.includes("web-") ||
    id.includes("roll-fed") || id.includes("sheet-fed-lf") ||
    id === "commercial-print" || id === "large-format" ||
    id === "print-machines"
  ) {
    return [
      { name: "HP Indigo 12000 HD", type: "Sheet Fed Digital", status: "Active", speed: "4,600 sph", modified: "Mar 18, 2026" },
      { name: "Heidelberg XL 106", type: "Sheet Fed Offset", status: "Active", speed: "18,000 sph", modified: "Mar 15, 2026" },
      { name: "Canon varioPRINT iX3200", type: "Web Digital", status: "Active", speed: "294 ppm", modified: "Mar 12, 2026" },
      { name: "Komori GL840", type: "Sheet Fed Offset", status: "Maintenance", speed: "16,500 sph", modified: "Mar 10, 2026" },
    ]
  }
  if (id === "finishing-machines" || id === "finishing-steps" || id === "cut" || id === "fold" || id === "crease" || id === "laminate" || id === "spot-finish" || id === "folder-gluer" || id === "custom-finishing") {
    return [
      { name: "Polar N 185", type: "Guillotine Cutter", status: "Active", speed: "40 cuts/min", modified: "Mar 19, 2026" },
      { name: "Stahlfolder TH 82", type: "Buckle Folder", status: "Active", speed: "30,000 sph", modified: "Mar 17, 2026" },
      { name: "Steinemann dmax 106", type: "Laminator", status: "Active", speed: "10,000 sph", modified: "Mar 14, 2026" },
    ]
  }
  if (id === "binding-machines" || id === "saddle-stitch" || id === "perfect-bind" || id === "wire-o" || id === "case-making" || id === "pad-glue" || id === "custom-price-model") {
    return [
      { name: "Muller Martini Presto II", type: "Saddle Stitcher", status: "Active", speed: "14,000 cycles/hr", modified: "Mar 16, 2026" },
      { name: "Horizon BQ-480", type: "Perfect Binder", status: "Active", speed: "1,300 books/hr", modified: "Mar 13, 2026" },
      { name: "Rilecart WR-5", type: "Wire-O Binder", status: "Idle", speed: "400 books/hr", modified: "Mar 11, 2026" },
    ]
  }
  if (id === "substrates") {
    return [
      { name: "Premium Matte 350gsm", gsm: "350", size: "700x1000mm", color: "White", stock: "12,400 sheets" },
      { name: "Silk Coated 170gsm", gsm: "170", size: "640x900mm", color: "White", stock: "28,000 sheets" },
      { name: "Uncoated Bond 120gsm", gsm: "120", size: "A3", color: "Ivory", stock: "8,500 sheets" },
      { name: "Recycled Kraft 300gsm", gsm: "300", size: "SRA3", color: "Brown", stock: "4,200 sheets" },
    ]
  }
  if (id === "products") {
    return [
      { name: "Business Cards", category: "Commercial Print", sizeRange: "85x55mm - 90x55mm", active: "Yes" },
      { name: "Brochures", category: "Commercial Print", sizeRange: "A5 - A3", active: "Yes" },
      { name: "Posters", category: "Large Format", sizeRange: "A2 - A0", active: "Yes" },
      { name: "Booklets", category: "Binding", sizeRange: "A6 - A4", active: "Yes" },
    ]
  }
  if (id === "tags") {
    return [
      { name: "Rush", color: "#ef4444", count: "23" },
      { name: "VIP Client", color: "#8b5cf6", count: "15" },
      { name: "Eco-Friendly", color: "#16a34a", count: "31" },
      { name: "Sample", color: "#2563eb", count: "8" },
    ]
  }
  if (id === "categories" || id === "category-parts" || id === "category-rules") {
    return [
      { name: "Commercial Print", type: "Print", parts: "12", active: "Yes" },
      { name: "Large Format", type: "Print", parts: "6", active: "Yes" },
      { name: "Binding & Finishing", type: "Post-Press", parts: "8", active: "Yes" },
      { name: "Packaging", type: "Specialty", parts: "4", active: "No" },
    ]
  }
  if (id === "field-rules") {
    return [
      { name: "Bleed Auto-Add", trigger: "Product Selected", condition: "Has bleed = false", action: "Set bleed to 3mm" },
      { name: "Min Quantity Check", trigger: "Quantity Changed", condition: "Qty < 50", action: "Show warning" },
      { name: "Paper Weight Lock", trigger: "Category = Cards", condition: "GSM < 250", action: "Block submission" },
      { name: "Coating Default", trigger: "Substrate Selected", condition: "Coated stock", action: "Enable gloss laminate" },
    ]
  }
  if (id.includes("reference") || id.includes("finish-sizes") || id.includes("page-") || id.includes("die-cut")) {
    return [
      { name: "A4 Portrait", value: "210 x 297", unit: "mm" },
      { name: "A3 Landscape", value: "420 x 297", unit: "mm" },
      { name: "US Letter", value: "8.5 x 11", unit: "inches" },
      { name: "Business Card", value: "85 x 55", unit: "mm" },
    ]
  }
  if (id.includes("shipping") || id.includes("packaging")) {
    return [
      { name: "Small Box", dimensions: "300 x 200 x 100mm", weight: "5 kg" },
      { name: "Medium Box", dimensions: "500 x 350 x 200mm", weight: "15 kg" },
      { name: "Large Box", dimensions: "800 x 600 x 400mm", weight: "30 kg" },
      { name: "Tube", dimensions: "700 x 100mm dia", weight: "3 kg" },
    ]
  }
  if (id === "preconfigured-parts") {
    return [
      { name: "Standard Business Card", category: "Commercial Print", sizeRange: "85x55mm", active: "Yes" },
      { name: "A4 Brochure 8pp", category: "Commercial Print", sizeRange: "A4", active: "Yes" },
      { name: "A5 Booklet 16pp", category: "Binding", sizeRange: "A5", active: "Yes" },
    ]
  }
  if (id === "production-steps") {
    return [
      { name: "Prepress Check", type: "Pre-Press", status: "Active", speed: "—", modified: "Mar 18, 2026" },
      { name: "Plate Making", type: "Pre-Press", status: "Active", speed: "12 plates/hr", modified: "Mar 15, 2026" },
      { name: "Printing", type: "Press", status: "Active", speed: "Varies", modified: "Mar 14, 2026" },
    ]
  }
  return [
    { name: "Item 1", type: "Default", status: "Active" },
    { name: "Item 2", type: "Default", status: "Active" },
    { name: "Item 3", type: "Default", status: "Inactive" },
  ]
}

// ─── Component ───────────────────────────────────────────────

export default function EstimateSetup() {
  const { navigateTo } = useNavigation()

  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "settings": true,
  })
  const [selectedItem, setSelectedItem] = useState<string>("")

  // General Settings state
  const [units, setUnits] = useState("metric")
  const [priceModel, setPriceModel] = useState("markup")
  const [mixedProduction, setMixedProduction] = useState(false)
  const [deliveryExcluded, setDeliveryExcluded] = useState(false)
  const [primaryColor, setPrimaryColor] = useState("#212121")
  const [primaryColorHex, setPrimaryColorHex] = useState("#212121")
  const [websiteName, setWebsiteName] = useState("Premium Print Co.")
  const [translationLang, setTranslationLang] = useState("en")
  const [graphicUrl, setGraphicUrl] = useState("")
  const [bgColor, setBgColor] = useState("#FFFFFF")
  const [bgColorHex, setBgColorHex] = useState("#FFFFFF")

  // Email template state
  const [selectedTemplate, setSelectedTemplate] = useState("estimate-sent")
  const [emailViewMode, setEmailViewMode] = useState<"visual" | "html">("visual")

  // AI Guidance state
  const [aiTab, setAiTab] = useState<"internal" | "self-quote">("internal")
  const [aiGuidance, setAiGuidance] = useState({
    internal: {
      category: "When categorizing incoming print requests, consider the product type (business cards, brochures, books, posters), the substrate requirements, and finishing needs. Default to Commercial Print for standard items. Use Large Format only for items exceeding A2 size.",
      recommendation: "Recommend products based on the customer's order history, budget constraints, and turnaround requirements. Always suggest the most cost-effective substrate that meets quality expectations.",
      suggestions: "Offer relevant upsell suggestions such as premium finishes (spot UV, foil stamping), upgraded substrates, or quantity discounts. Focus on value-add options that improve the final product.",
      faq: "Common questions include turnaround times (standard 5-7 days, rush 2-3 days), file format requirements (PDF/X-1a preferred), bleed specifications (3mm standard), and color accuracy (Pantone matching available).",
      style: "Use a professional, helpful tone. Be concise but thorough. Explain technical terms when they appear. Address the customer by name and reference their specific project details.",
    },
    selfQuote: {
      category: "Help customers identify the right product category for their needs. Use simple language — avoid industry jargon. If the customer describes a 'flyer', map it to the Brochures category.",
      recommendation: "Suggest the most popular options first, with clear pricing. Highlight any volume discounts. If the customer's specification seems unusual, gently suggest a standard alternative.",
      suggestions: "Offer finishing upgrades with clear before/after descriptions and pricing impact. Focus on options that are most popular with similar customers.",
      faq: "Answer questions about ordering process, payment methods, delivery options, and reorder workflows. Keep responses friendly and jargon-free.",
      style: "Use a warm, approachable tone. Keep sentences short. Use bullet points for lists. Always end with a clear call-to-action or next step.",
    },
  })

  // Connections state
  const [connections, setConnections] = useState(initialConnections)
  const [editingConnection, setEditingConnection] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showExportLog, setShowExportLog] = useState(false)
  const [formName, setFormName] = useState("")
  const [formType, setFormType] = useState<Connection["type"]>("External MIS")
  const [formWebhookUrl, setFormWebhookUrl] = useState("")
  const [formAuthMethod, setFormAuthMethod] = useState<Connection["authMethod"]>("Bearer")
  const [formAuthToken, setFormAuthToken] = useState("")
  const [formTriggers, setFormTriggers] = useState<string[]>([])

  // Export log state
  const [logFilter, setLogFilter] = useState("all")
  const [logConnectionFilter, setLogConnectionFilter] = useState("all")
  const [logSearch, setLogSearch] = useState("")

  // ─── Sidebar helpers ───────────────────────────────────────

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleItemClick = (item: MenuChild | MenuSection, hasChildren: boolean) => {
    if (hasChildren) {
      toggleSection(item.id)
    } else {
      setSelectedItem(item.id)
      setShowExportLog(false)
      setShowAddForm(false)
    }
  }

  // ─── Connection helpers ────────────────────────────────────

  const resetForm = () => {
    setFormName("")
    setFormType("External MIS")
    setFormWebhookUrl("")
    setFormAuthMethod("Bearer")
    setFormAuthToken("")
    setFormTriggers([])
  }

  const openAddForm = () => {
    resetForm()
    setEditingConnection(null)
    setShowAddForm(true)
  }

  const openEditForm = (conn: Connection) => {
    setFormName(conn.name)
    setFormType(conn.type)
    setFormWebhookUrl(conn.webhookUrl)
    setFormAuthMethod(conn.authMethod)
    setFormAuthToken("")
    setFormTriggers([...conn.triggers])
    setEditingConnection(conn.id)
    setShowAddForm(true)
  }

  const saveConnection = () => {
    if (editingConnection) {
      setConnections(prev =>
        prev.map(c =>
          c.id === editingConnection
            ? { ...c, name: formName, type: formType, webhookUrl: formWebhookUrl, authMethod: formAuthMethod, triggers: formTriggers }
            : c
        )
      )
    } else {
      const newConn: Connection = {
        id: `conn-${Date.now()}`,
        name: formName,
        type: formType,
        webhookUrl: formWebhookUrl,
        authMethod: formAuthMethod,
        triggers: formTriggers,
        status: "inactive",
        lastSync: "Never",
      }
      setConnections(prev => [...prev, newConn])
    }
    setShowAddForm(false)
    setEditingConnection(null)
    resetForm()
  }

  const deleteConnection = (id: string) => {
    setConnections(prev => prev.filter(c => c.id !== id))
  }

  const toggleConnectionStatus = (id: string) => {
    setConnections(prev =>
      prev.map(c => (c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c))
    )
  }

  const toggleTrigger = (trigger: string) => {
    setFormTriggers(prev => (prev.includes(trigger) ? prev.filter(t => t !== trigger) : [...prev, trigger]))
  }

  // Export log helpers
  const filteredLogs = exportLogs.filter(log => {
    if (logFilter !== "all" && log.status !== logFilter) return false
    if (logConnectionFilter !== "all" && log.connection !== logConnectionFilter) return false
    if (logSearch && !log.estimateId.toLowerCase().includes(logSearch.toLowerCase()) && !log.type.toLowerCase().includes(logSearch.toLowerCase())) return false
    return true
  })

  const successCount = exportLogs.filter(l => l.status === "success").length
  const failedCount = exportLogs.filter(l => l.status === "failed").length
  const successRate = Math.round((successCount / exportLogs.length) * 100)

  // ─── Render sidebar menu items ────────────────────────────

  function renderMenuChild(child: MenuChild, depth: number = 1) {
    const hasChildren = !!child.children && child.children.length > 0
    const isExpanded = expandedSections[child.id]
    const isActive = selectedItem === child.id

    return (
      <div key={child.id}>
        <button
          onClick={() => handleItemClick(child, hasChildren)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
            isActive
              ? "bg-white text-[#212121] font-medium"
              : "text-[#F7F7F7] hover:bg-[#525252]"
          }`}
          style={{ paddingLeft: `${depth * 24 + 12}px` }}
        >
          {hasChildren ? (
            isExpanded ? <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          ) : (
            <span className="w-3.5 flex-shrink-0" />
          )}
          <span className="truncate">{child.label}</span>
          {!hasChildren && sectionCounts[child.id] && (
            <span className="ml-auto text-[10px] opacity-60">{sectionCounts[child.id]}</span>
          )}
        </button>
        {hasChildren && isExpanded && (
          <div>
            {child.children!.map(grandChild => renderMenuChild(grandChild, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  function renderSidebar() {
    return (
      <div className="w-[280px] bg-[#2B2B2B] flex flex-col h-screen overflow-hidden flex-shrink-0">
        {/* Back button */}
        <div className="px-4 pt-4 pb-2">
          <button
            onClick={() => navigateTo("estimates")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-[#F7F7F7] hover:bg-[#525252] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Manage Estimates
          </button>
        </div>

        {/* Title */}
        <div className="px-4 py-3 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-[#525252] flex items-center justify-center">
            <Grid3X3 className="h-4 w-4 text-[#F7F7F7]" />
          </div>
          <span className="text-sm font-semibold text-[#F7F7F7]">Estimate Setup</span>
        </div>

        {/* Pending Changes */}
        <div className="px-3 mb-1">
          <button
            onClick={() => { setSelectedItem("pending-changes"); setShowExportLog(false); setShowAddForm(false) }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors ${
              selectedItem === "pending-changes"
                ? "bg-white text-[#212121] font-medium"
                : "text-[#F7F7F7] hover:bg-[#525252]"
            }`}
          >
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>Pending Changes</span>
            <Badge className="ml-auto text-[10px] px-1.5 py-0 bg-[#ef4444] text-white border-0">3</Badge>
          </button>
        </div>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-[#525252]" />

        {/* Scrollable nav list */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
          {menuStructure.map((item, idx) => {
            if (item === "divider") {
              return <div key={`divider-${idx}`} className="mx-1 my-2 border-t border-[#525252]" />
            }

            const section = item as MenuSection
            const Icon = section.icon
            const hasChildren = !!section.children && section.children.length > 0
            const isExpanded = expandedSections[section.id]
            const isActive = selectedItem === section.id

            return (
              <div key={section.id}>
                <button
                  onClick={() => handleItemClick(section, hasChildren)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors ${
                    isActive
                      ? "bg-white text-[#212121] font-medium"
                      : "text-[#F7F7F7] hover:bg-[#525252]"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{section.label}</span>
                  {hasChildren ? (
                    isExpanded ? <ChevronDown className="h-3.5 w-3.5 ml-auto flex-shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 ml-auto flex-shrink-0" />
                  ) : (
                    sectionCounts[section.id] ? (
                      <span className="ml-auto text-[10px] opacity-60">{sectionCounts[section.id]}</span>
                    ) : null
                  )}
                </button>
                {hasChildren && isExpanded && (
                  <div className="mt-0.5 space-y-0.5">
                    {section.children!.map(child => renderMenuChild(child, 1))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ─── Content renderers ─────────────────────────────────────

  function renderHomeContent() {
    const topLevelSections = menuStructure.filter(s => s !== "divider") as MenuSection[]
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold text-[#212121] mb-1">Estimate Setup</h2>
        <p className="text-sm text-[#8a8a8a] mb-6">Configure estimate module settings, machines, substrates, and pricing rules</p>
        <div className="grid grid-cols-3 gap-4">
          {topLevelSections.map(section => {
            const Icon = section.icon
            const count = sectionCounts[section.id] || 0
            return (
              <button
                key={section.id}
                onClick={() => {
                  if (section.children && section.children.length > 0) {
                    setExpandedSections(prev => ({ ...prev, [section.id]: true }))
                    setSelectedItem(section.children[0].children ? section.children[0].children[0].id : section.children[0].id)
                  } else {
                    setSelectedItem(section.id)
                  }
                }}
                className="bg-white rounded-lg border border-[#E5E5E5] p-5 text-left hover:shadow-md transition-shadow group"
              >
                <div className="h-10 w-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center mb-3 group-hover:bg-[#212121] transition-colors">
                  <Icon className="h-5 w-5 text-[#6b6b6b] group-hover:text-white transition-colors" />
                </div>
                <div className="text-sm font-semibold text-[#212121]">{section.label}</div>
                <div className="text-xs text-[#8a8a8a] mt-0.5">{count} items</div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  function renderDataTable(sectionId: string, sectionLabel: string) {
    const columns = getColumnsForSection(sectionId)
    const rows = getMockRows(sectionId)
    const count = sectionCounts[sectionId] || rows.length

    return (
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[#212121]">{sectionLabel}</h2>
            <Badge variant="secondary" className="text-xs" style={{ backgroundColor: "#F5F5F5", color: "#6b6b6b" }}>
              {count} items
            </Badge>
          </div>
          <Button size="sm" className="rounded-full gap-1.5" style={{ backgroundColor: "#212121", color: "#fff" }}>
            <Plus className="h-3.5 w-3.5" />
            Add New
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-xs mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
          <Input placeholder={`Search ${sectionLabel.toLowerCase()}...`} className="pl-9" />
        </div>

        {/* Table */}
        <div className="rounded-lg border border-[#E5E5E5] overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#FAFAFA" }}>
                {columns.map(col => (
                  <th key={col.key} className="text-left text-xs font-medium px-4 py-3 text-[#8a8a8a]">
                    {col.header}
                  </th>
                ))}
                <th className="w-12" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3">
                      {col.key === "status" ? (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0"
                          style={{
                            backgroundColor: row[col.key] === "Active" ? "#dcfce7" : row[col.key] === "Maintenance" ? "#fef9c3" : "#F5F5F5",
                            color: row[col.key] === "Active" ? "#16a34a" : row[col.key] === "Maintenance" ? "#ca8a04" : "#8a8a8a",
                          }}
                        >
                          {row[col.key]}
                        </Badge>
                      ) : col.key === "active" ? (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0"
                          style={{
                            backgroundColor: row[col.key] === "Yes" ? "#dcfce7" : "#F5F5F5",
                            color: row[col.key] === "Yes" ? "#16a34a" : "#8a8a8a",
                          }}
                        >
                          {row[col.key]}
                        </Badge>
                      ) : col.key === "color" && sectionId === "tags" ? (
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: row[col.key] }} />
                          <span className="text-xs text-[#6b6b6b]">{row[col.key]}</span>
                        </div>
                      ) : col.key === "name" ? (
                        <span className="font-medium text-[#212121]">{row[col.key]}</span>
                      ) : (
                        <span className="text-[#6b6b6b]">{row[col.key]}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-2 py-3">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreHorizontal className="h-4 w-4 text-[#8a8a8a]" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  function renderPricingRules() {
    const rules = [
      {
        name: "Volume Discount Tiers",
        status: true,
        description: "Apply automatic quantity-based discounts for orders above threshold quantities.",
        conditions: "Quantity > 500 units",
        adjustment: "5-15% discount based on tier",
      },
      {
        name: "Rush Job Surcharge",
        status: true,
        description: "Add surcharge for jobs requiring faster than standard turnaround times.",
        conditions: "Turnaround < 3 business days",
        adjustment: "+25% surcharge",
      },
      {
        name: "Repeat Order Discount",
        status: false,
        description: "Offer reduced pricing for customers reordering the same product within 90 days.",
        conditions: "Same product within 90 days",
        adjustment: "10% discount",
      },
    ]

    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#212121]">Pricing Rules</h2>
            <p className="text-sm text-[#8a8a8a] mt-1">Configure automatic pricing adjustments based on conditions</p>
          </div>
          <Button size="sm" className="rounded-full gap-1.5" style={{ backgroundColor: "#212121", color: "#fff" }}>
            <Plus className="h-3.5 w-3.5" />
            Add Pricing Rule
          </Button>
        </div>

        <div className="space-y-4">
          {rules.map((rule, i) => (
            <div key={i} className="bg-white rounded-lg border border-[#E5E5E5] p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-[#212121]">{rule.name}</h3>
                  <Switch checked={rule.status} />
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-4 w-4 text-[#8a8a8a]" />
                </Button>
              </div>
              <p className="text-xs text-[#8a8a8a] mb-3">{rule.description}</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-[#F5F5F5] text-[#6b6b6b] font-medium">{rule.conditions}</span>
                <span className="text-[#8a8a8a]">&rarr;</span>
                <span className="px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#2563eb] font-medium">{rule.adjustment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderGeneralSettings() {
    return (
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#212121]">General Settings</h2>
            <p className="text-sm text-[#8a8a8a] mt-1">Configure global estimate module settings</p>
          </div>
          <Button size="sm" className="rounded-full" style={{ backgroundColor: "#212121", color: "#fff" }}>
            Save Changes
          </Button>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Measurement Unit */}
          <div>
            <label className="text-xs font-medium mb-1.5 block text-[#6b6b6b]">Measurement Unit</label>
            <Select value={units} onValueChange={setUnits}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric</SelectItem>
                <SelectItem value="imperial">Imperial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Adjustment Model */}
          <div>
            <label className="text-xs font-medium mb-1.5 block text-[#6b6b6b]">Price Adjustment Model</label>
            <Select value={priceModel} onValueChange={setPriceModel}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="va-press-hour">VA per Press Hour</SelectItem>
                <SelectItem value="markup">Markup Percentage</SelectItem>
                <SelectItem value="cost-plus">Cost Plus Fixed</SelectItem>
                <SelectItem value="tiered">Tiered Pricing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Checkbox group */}
          <div className="border rounded-lg p-5 bg-[#FAFAFA] space-y-4" style={{ borderColor: "#E5E5E5" }}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={mixedProduction}
                onChange={e => setMixedProduction(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#d4d4d4] accent-[#212121]"
              />
              <div>
                <div className="text-sm font-medium text-[#212121]">Mixed Production Enabled</div>
                <div className="text-xs text-[#8a8a8a] mt-0.5">Allow combining multiple jobs on a single press sheet for cost efficiency</div>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={deliveryExcluded}
                onChange={e => setDeliveryExcluded(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#d4d4d4] accent-[#212121]"
              />
              <div>
                <div className="text-sm font-medium text-[#212121]">Delivery Excluded</div>
                <div className="text-xs text-[#8a8a8a] mt-0.5">Exclude delivery costs from estimate totals by default</div>
              </div>
            </label>
          </div>

          {/* Primary Color */}
          <div>
            <label className="text-xs font-medium mb-1.5 block text-[#6b6b6b]">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={e => { setPrimaryColor(e.target.value); setPrimaryColorHex(e.target.value) }}
                className="w-16 h-12 rounded border border-[#E5E5E5] cursor-pointer"
              />
              <Input
                value={primaryColorHex}
                onChange={e => { setPrimaryColorHex(e.target.value); setPrimaryColor(e.target.value) }}
                className="w-32"
                placeholder="#212121"
              />
            </div>
          </div>

          {/* Website Name */}
          <div>
            <label className="text-xs font-medium mb-1.5 block text-[#6b6b6b]">Website Name</label>
            <Input value={websiteName} onChange={e => setWebsiteName(e.target.value)} placeholder="Enter website name" />
          </div>

          {/* Divider */}
          <div className="border-t border-[#E5E5E5] my-8" />

          {/* Translations */}
          <div>
            <h3 className="text-base font-semibold text-[#212121] mb-4">Translations</h3>
            <div className="mb-4">
              <label className="text-xs font-medium mb-1.5 block text-[#6b6b6b]">Language</label>
              <Select value={translationLang} onValueChange={setTranslationLang}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="no">Norwegian</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border border-[#E5E5E5] overflow-hidden bg-white mb-3">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#FAFAFA" }}>
                    <th className="text-left text-xs font-medium px-4 py-2.5 text-[#8a8a8a]">Key</th>
                    <th className="text-left text-xs font-medium px-4 py-2.5 text-[#8a8a8a]">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: "estimate", value: "Estimate" },
                    { key: "quantity", value: "Quantity" },
                    { key: "subtotal", value: "Subtotal" },
                    { key: "add_to_cart", value: "Add to Cart" },
                  ].map(row => (
                    <tr key={row.key} className="border-t border-[#F0F0F0]">
                      <td className="px-4 py-2.5 font-mono text-xs text-[#6b6b6b]">{row.key}</td>
                      <td className="px-4 py-2.5 text-xs text-[#212121]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Add Translation
            </Button>
          </div>

          {/* Divider */}
          <div className="border-t border-[#E5E5E5] my-8" />

          {/* Self-Quote Graphic Settings */}
          <div>
            <h3 className="text-base font-semibold text-[#212121] mb-4">Self-Quote Widget Graphics</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium mb-1.5 block text-[#6b6b6b]">Graphic URL</label>
                <Input value={graphicUrl} onChange={e => setGraphicUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block text-[#6b6b6b]">Background Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={e => { setBgColor(e.target.value); setBgColorHex(e.target.value) }}
                    className="w-16 h-12 rounded border border-[#E5E5E5] cursor-pointer"
                  />
                  <Input
                    value={bgColorHex}
                    onChange={e => { setBgColorHex(e.target.value); setBgColor(e.target.value) }}
                    className="w-32"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderEmailTemplate() {
    const currentTemplate = emailTemplates[selectedTemplate]

    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#212121]">Email Template</h2>
            <p className="text-sm text-[#8a8a8a] mt-1">Configure email templates for estimate notifications</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estimate-sent">Estimate Sent</SelectItem>
                <SelectItem value="estimate-followup">Estimate Follow-up</SelectItem>
                <SelectItem value="estimate-accepted">Estimate Accepted</SelectItem>
                <SelectItem value="conversion-confirmation">Conversion Confirmation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex rounded-lg border overflow-hidden border-[#E5E5E5]">
            <button
              onClick={() => setEmailViewMode("visual")}
              className="px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors"
              style={{
                backgroundColor: emailViewMode === "visual" ? "#212121" : "transparent",
                color: emailViewMode === "visual" ? "#fff" : "#6b6b6b",
              }}
            >
              <Eye className="h-3.5 w-3.5" />
              Visual
            </button>
            <button
              onClick={() => setEmailViewMode("html")}
              className="px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors"
              style={{
                backgroundColor: emailViewMode === "html" ? "#212121" : "transparent",
                color: emailViewMode === "html" ? "#fff" : "#6b6b6b",
              }}
            >
              <Code className="h-3.5 w-3.5" />
              HTML
            </button>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Main editor area */}
          <div className="flex-1 space-y-3">
            <div>
              <label className="text-xs font-medium mb-1 block text-[#6b6b6b]">Subject Line</label>
              <Input value={currentTemplate.subject} readOnly />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block text-[#6b6b6b]">Email Body</label>
              {emailViewMode === "visual" ? (
                <div
                  className="rounded-lg border border-[#E5E5E5] p-5 min-h-[320px] bg-white"
                  dangerouslySetInnerHTML={{ __html: currentTemplate.body }}
                />
              ) : (
                <Textarea
                  value={currentTemplate.body}
                  readOnly
                  className="min-h-[320px] font-mono text-xs"
                />
              )}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Copy className="h-3.5 w-3.5" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Send className="h-3.5 w-3.5" />
                Send Test
              </Button>
            </div>
          </div>

          {/* Variables sidebar */}
          <div className="w-56 flex-shrink-0">
            <div className="rounded-lg border border-[#E5E5E5] p-4">
              <h4 className="text-xs font-semibold mb-3 text-[#212121]">Available Variables</h4>
              <div className="space-y-1.5">
                {availableVariables.map(v => (
                  <button
                    key={v}
                    onClick={() => navigator.clipboard.writeText(v)}
                    className="w-full text-left px-2 py-1.5 rounded text-xs font-mono hover:bg-[#F5F5F5] transition-colors flex items-center justify-between group text-[#2563eb]"
                  >
                    <span>{v}</span>
                    <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#8a8a8a]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderAiGuidance() {
    const currentGuidance = aiTab === "internal" ? aiGuidance.internal : aiGuidance.selfQuote
    const guidanceKey = aiTab === "internal" ? "internal" : "selfQuote"

    const updateGuidance = (field: string, value: string) => {
      setAiGuidance(prev => ({
        ...prev,
        [guidanceKey]: {
          ...prev[guidanceKey],
          [field]: value,
        },
      }))
    }

    const sections = [
      { key: "category", label: "Category Guidance" },
      { key: "recommendation", label: "Product Recommendation Guidance" },
      { key: "suggestions", label: "Suggestions Guidance" },
      { key: "faq", label: "FAQ Knowledge Guidance" },
      { key: "style", label: "Communication Style" },
    ]

    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#212121]">AI Guidance</h2>
            <p className="text-sm text-[#8a8a8a] mt-1">Configure AI behavior for estimates</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex border-b border-[#E5E5E5] mb-6">
          <button
            onClick={() => setAiTab("internal")}
            className={`px-4 py-3 text-sm font-medium border-b-[4px] -mb-[1px] transition-colors ${
              aiTab === "internal"
                ? "border-black text-[#212121] font-semibold"
                : "border-transparent text-[#8a8a8a] hover:text-[#6b6b6b]"
            }`}
          >
            Internal Team
          </button>
          <button
            onClick={() => setAiTab("self-quote")}
            className={`px-4 py-3 text-sm font-medium border-b-[4px] -mb-[1px] transition-colors ${
              aiTab === "self-quote"
                ? "border-black text-[#212121] font-semibold"
                : "border-transparent text-[#8a8a8a] hover:text-[#6b6b6b]"
            }`}
          >
            Self-Quote
          </button>
        </div>

        <div className="max-w-2xl space-y-6">
          {sections.map(section => (
            <div key={section.key}>
              <label className="text-xs font-medium mb-1.5 block text-[#6b6b6b]">{section.label}</label>
              <Textarea
                value={currentGuidance[section.key as keyof typeof currentGuidance]}
                onChange={e => updateGuidance(section.key, e.target.value)}
                className="min-h-[100px] text-sm"
              />
            </div>
          ))}

          <Button size="sm" className="rounded-full" style={{ backgroundColor: "#212121", color: "#fff" }}>
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Save Guidance
          </Button>
        </div>
      </div>
    )
  }

  function renderConnections() {
    if (showExportLog) {
      return renderExportLog()
    }

    if (showAddForm) {
      return (
        <div className="p-8">
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#212121]">
                {editingConnection ? "Edit Connection" : "Add Connection"}
              </h2>
            </div>
            <div className="rounded-lg border border-[#E5E5E5] p-5 space-y-4 bg-white">
              <div>
                <label className="text-xs font-medium mb-1 block text-[#6b6b6b]">Name</label>
                <Input value={formName} onChange={e => setFormName(e.target.value)} placeholder="Connection name" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block text-[#6b6b6b]">Type</label>
                <Select value={formType} onValueChange={v => setFormType(v as Connection["type"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gelato Connect MIS">Gelato Connect MIS</SelectItem>
                    <SelectItem value="External MIS">External MIS</SelectItem>
                    <SelectItem value="Both (Gelato Connect + External)">Both (Gelato Connect + External)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block text-[#6b6b6b]">Webhook URL</label>
                <Input value={formWebhookUrl} onChange={e => setFormWebhookUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-medium mb-1 block text-[#6b6b6b]">Auth Method</label>
                  <Select value={formAuthMethod} onValueChange={v => setFormAuthMethod(v as Connection["authMethod"])}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bearer">Bearer</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="API Key">API Key</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium mb-1 block text-[#6b6b6b]">Auth Token / Key</label>
                  <Input type="password" value={formAuthToken} onChange={e => setFormAuthToken(e.target.value)} placeholder="Enter token or key" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-2 block text-[#6b6b6b]">Triggers</label>
                <div className="flex flex-wrap gap-2">
                  {allTriggers.map(trigger => (
                    <button
                      key={trigger}
                      onClick={() => toggleTrigger(trigger)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors"
                      style={{
                        borderColor: formTriggers.includes(trigger) ? "#2563eb" : "#E5E5E5",
                        backgroundColor: formTriggers.includes(trigger) ? "#EFF6FF" : "transparent",
                        color: formTriggers.includes(trigger) ? "#2563eb" : "#6b6b6b",
                      }}
                    >
                      {formTriggers.includes(trigger) && <CheckCircle className="h-3 w-3" />}
                      {trigger}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-[#E5E5E5]">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  Test Connection
                </Button>
                <div className="flex-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setShowAddForm(false); setEditingConnection(null); resetForm() }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={saveConnection}
                  disabled={!formName || !formWebhookUrl}
                  className="rounded-full"
                  style={{ backgroundColor: "#212121", color: "#fff" }}
                >
                  {editingConnection ? "Update Connection" : "Save Connection"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="p-8">
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#212121]">Connections</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowExportLog(true)}>
                <FileDown className="h-3.5 w-3.5" />
                View Export Log
              </Button>
              <Button size="sm" onClick={openAddForm} className="rounded-full gap-1.5" style={{ backgroundColor: "#212121", color: "#fff" }}>
                <Plus className="h-3.5 w-3.5" />
                Add Connection
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            {connections.map(conn => (
              <div
                key={conn.id}
                className="rounded-lg border border-[#E5E5E5] p-4 flex items-center gap-4 hover:shadow-sm transition-shadow bg-white"
              >
                <div className="h-10 w-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  {conn.type === "Gelato Connect MIS" ? (
                    <Globe className="h-5 w-5 text-[#6b6b6b]" />
                  ) : (
                    <ExternalLink className="h-5 w-5 text-[#6b6b6b]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold truncate text-[#212121]">{conn.name}</span>
                    <Badge
                      variant={conn.status === "active" ? "default" : "secondary"}
                      className="text-[10px] px-1.5 py-0"
                      style={{
                        backgroundColor: conn.status === "active" ? "#dcfce7" : "#F5F5F5",
                        color: conn.status === "active" ? "#16a34a" : "#8a8a8a",
                      }}
                    >
                      {conn.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="text-xs mt-0.5 text-[#8a8a8a]">
                    {conn.type} &middot; {conn.authMethod} &middot; Last synced: {conn.lastSync}
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    {conn.triggers.map(t => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#F5F5F5] text-[#6b6b6b]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Switch checked={conn.status === "active"} onCheckedChange={() => toggleConnectionStatus(conn.id)} />
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditForm(conn)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteConnection(conn.id)}>
                    <Trash2 className="h-3.5 w-3.5 text-[#ef4444]" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  function renderExportLog() {
    return (
      <div className="p-8">
        <div className="max-w-5xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#212121]">Export Log</h2>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowExportLog(false)}>
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Connections
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
              <Input placeholder="Search estimate ID or event..." value={logSearch} onChange={e => setLogSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={logConnectionFilter} onValueChange={setLogConnectionFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Connections" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Connections</SelectItem>
                <SelectItem value="Gelato Connect MIS">Gelato Connect MIS</SelectItem>
                <SelectItem value="PrintVis MIS">PrintVis MIS</SelectItem>
              </SelectContent>
            </Select>
            <Select value={logFilter} onValueChange={setLogFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats bar */}
          <div className="flex gap-4 mb-4">
            <div className="rounded-lg border border-[#E5E5E5] px-4 py-2.5 flex items-center gap-2">
              <FileDown className="h-4 w-4 text-[#8a8a8a]" />
              <span className="text-xs text-[#8a8a8a]">Total Exports</span>
              <span className="text-sm font-semibold text-[#212121]">{exportLogs.length}</span>
            </div>
            <div className="rounded-lg border border-[#E5E5E5] px-4 py-2.5 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#16a34a]" />
              <span className="text-xs text-[#8a8a8a]">Success Rate</span>
              <span className="text-sm font-semibold text-[#16a34a]">{successRate}%</span>
            </div>
            <div className="rounded-lg border border-[#E5E5E5] px-4 py-2.5 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-[#ef4444]" />
              <span className="text-xs text-[#8a8a8a]">Failed</span>
              <span className="text-sm font-semibold text-[#ef4444]">{failedCount}</span>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-[#E5E5E5] overflow-hidden bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#FAFAFA" }}>
                  <th className="text-left text-xs font-medium px-4 py-2.5 text-[#8a8a8a]">Timestamp</th>
                  <th className="text-left text-xs font-medium px-4 py-2.5 text-[#8a8a8a]">Connection</th>
                  <th className="text-left text-xs font-medium px-4 py-2.5 text-[#8a8a8a]">Estimate ID</th>
                  <th className="text-left text-xs font-medium px-4 py-2.5 text-[#8a8a8a]">Event Type</th>
                  <th className="text-left text-xs font-medium px-4 py-2.5 text-[#8a8a8a]">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id} className="border-t border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-4 py-3 text-xs text-[#6b6b6b]">{log.time}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#212121]">{log.connection}</td>
                    <td className="px-4 py-3 text-xs font-mono text-[#2563eb]">{log.estimateId}</td>
                    <td className="px-4 py-3 text-xs text-[#6b6b6b]">{log.type}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0"
                        style={{
                          backgroundColor: log.status === "success" ? "#dcfce7" : log.status === "failed" ? "#fef2f2" : "#fef9c3",
                          color: log.status === "success" ? "#16a34a" : log.status === "failed" ? "#ef4444" : "#ca8a04",
                        }}
                      >
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  function renderPendingChanges() {
    const changes = [
      {
        id: 1,
        entity: "Updated Substrate: Premium Matte 350gsm",
        operation: "Updated" as const,
        timestamp: "Mar 20, 2026 — 08:45",
        fields: [
          { field: "GSM", from: "300", to: "350" },
          { field: "Price per Sheet", from: "0.42", to: "0.48" },
        ],
      },
      {
        id: 2,
        entity: "Added Machine: HP Indigo 12000",
        operation: "Added" as const,
        timestamp: "Mar 20, 2026 — 08:30",
        fields: [],
      },
      {
        id: 3,
        entity: "Deleted Tag: Promotional",
        operation: "Deleted" as const,
        timestamp: "Mar 19, 2026 — 17:15",
        fields: [],
      },
    ]

    const opColors = {
      Updated: { bg: "#EFF6FF", text: "#2563eb" },
      Added: { bg: "#dcfce7", text: "#16a34a" },
      Deleted: { bg: "#fef2f2", text: "#ef4444" },
    }

    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#212121]">Pending Changes</h2>
            <p className="text-sm text-[#8a8a8a] mt-1">Review and apply configuration changes before they go live</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Discard All</Button>
            <Button size="sm" className="rounded-full" style={{ backgroundColor: "#212121", color: "#fff" }}>
              Apply All Changes
            </Button>
          </div>
        </div>

        <div className="max-w-3xl space-y-4">
          {changes.map(change => (
            <div key={change.id} className="bg-white rounded-lg border border-[#E5E5E5] p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#212121]">{change.entity}</span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0"
                    style={{ backgroundColor: opColors[change.operation].bg, color: opColors[change.operation].text }}
                  >
                    {change.operation}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">Revert</Button>
              </div>
              <div className="text-xs text-[#8a8a8a] mb-3">
                <Clock className="h-3 w-3 inline mr-1" />
                {change.timestamp}
              </div>
              {change.fields.length > 0 && (
                <div className="rounded-lg border border-[#E5E5E5] overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ backgroundColor: "#FAFAFA" }}>
                        <th className="text-left px-3 py-2 font-medium text-[#8a8a8a]">Field</th>
                        <th className="text-left px-3 py-2 font-medium text-[#8a8a8a]">Previous</th>
                        <th className="text-left px-3 py-2 font-medium text-[#8a8a8a]">New</th>
                      </tr>
                    </thead>
                    <tbody>
                      {change.fields.map(f => (
                        <tr key={f.field} className="border-t border-[#F0F0F0]">
                          <td className="px-3 py-2 font-medium text-[#212121]">{f.field}</td>
                          <td className="px-3 py-2 text-[#ef4444] line-through">{f.from}</td>
                          <td className="px-3 py-2 text-[#16a34a]">{f.to}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {change.operation === "Added" && (
                <div className="text-xs text-[#16a34a] bg-[#dcfce7] px-3 py-2 rounded-md">New entity added to configuration</div>
              )}
              {change.operation === "Deleted" && (
                <div className="text-xs text-[#ef4444] bg-[#fef2f2] px-3 py-2 rounded-md">Entity will be permanently removed</div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ─── Resolve selected item to label ────────────────────────

  function findLabel(id: string): string {
    for (const item of menuStructure) {
      if (item === "divider") continue
      const section = item as MenuSection
      if (section.id === id) return section.label
      if (section.children) {
        for (const child of section.children) {
          if (child.id === id) return child.label
          if (child.children) {
            for (const gc of child.children) {
              if (gc.id === id) return gc.label
            }
          }
        }
      }
    }
    return id
  }

  // ─── Route content based on selectedItem ───────────────────

  function renderContent() {
    if (!selectedItem) return renderHomeContent()

    // Settings sub-sections
    if (selectedItem === "general-settings") return renderGeneralSettings()
    if (selectedItem === "email-template") return renderEmailTemplate()
    if (selectedItem === "ai-guidance") return renderAiGuidance()
    if (selectedItem === "connections") return renderConnections()
    if (selectedItem === "pending-changes") return renderPendingChanges()
    if (selectedItem === "pricing-rules") return renderPricingRules()

    // Everything else is a data table
    const label = findLabel(selectedItem)
    return renderDataTable(selectedItem, label)
  }

  // ─── Main render ───────────────────────────────────────────

  return (
    <div className="flex h-screen overflow-hidden">
      {renderSidebar()}
      <div className="flex-1 bg-[#F7F7F7] overflow-y-auto h-screen">
        {renderContent()}
      </div>
    </div>
  )
}
