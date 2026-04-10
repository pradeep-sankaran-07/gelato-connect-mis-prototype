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
  Sparkles, Mail, Link2, Eye, Code, Zap, Send, FileDown, RefreshCw,
  Warehouse, HardDrive, Truck, Check
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import PackagingMaterials from "@/components/estimates/shipping/packaging-materials"
import PackagingRulesSetup from "@/components/estimates/shipping/packaging-rules"
import DestinationZones from "@/components/estimates/shipping/destination-zones"
import ShippingMethodsConfig from "@/components/estimates/shipping/shipping-methods"
import ShippingRulesSetup from "@/components/estimates/shipping/shipping-rules"

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
      { id: "cut", label: "Cut" },
      { id: "fold", label: "Fold" },
      { id: "crease", label: "Crease" },
      { id: "laminate", label: "Laminate" },
      { id: "spot-finish", label: "Spot Finishing" },
      {
        id: "custom-finishing",
        label: "Custom",
        children: [
          { id: "custom-finish-setup-per-unit", label: "Setup Per Unit" },
          { id: "custom-finish-machine-labor", label: "Machine Labor Time" },
          { id: "custom-finish-time-materials", label: "Time and Materials" },
          { id: "custom-finish-tiered-rate", label: "Tiered Rate" },
          { id: "custom-finish-perimeter-unit", label: "Perimeter Unit" },
          { id: "custom-finish-length-speed", label: "Length Speed" },
        ],
      },
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
      { id: "folder-gluer", label: "Folder Gluer" },
      {
        id: "custom-price-model",
        label: "Custom",
        children: [
          { id: "custom-bind-setup-per-unit", label: "Setup Per Unit" },
          { id: "custom-bind-machine-labor", label: "Machine Labor Time" },
          { id: "custom-bind-time-materials", label: "Time and Materials" },
          { id: "custom-bind-tiered-rate", label: "Tiered Rate" },
          { id: "custom-bind-perimeter-unit", label: "Perimeter Unit" },
          { id: "custom-bind-length-speed", label: "Length Speed" },
        ],
      },
    ],
  },
  {
    id: "substrates",
    label: "Substrates",
    icon: Layers,
    children: [
      { id: "substrates-commercial", label: "Commercial Print" },
      { id: "substrates-large-format", label: "Large Format" },
    ],
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    children: [
      { id: "categories", label: "Categories" },
      { id: "category-parts", label: "Category Parts" },
      { id: "field-rules", label: "Field Rules" },
      { id: "finishing-steps-addon", label: "Finishing Steps Add-On" },
    ],
  },
  "divider" as const,
  {
    id: "shipping",
    label: "Shipping",
    icon: Truck,
    children: [
      { id: "packaging-materials-setup", label: "Packaging Materials" },
      { id: "packaging-rules-setup", label: "Packaging Rules" },
      { id: "destination-zones", label: "Destination Zones" },
      { id: "shipping-methods-setup", label: "Shipping Methods" },
      { id: "shipping-rules-setup", label: "Shipping Rules" },
    ],
  },
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
      { id: "packaging-config", label: "Packaging Configuration" },
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
  "substrates-commercial": 18,
  "substrates-large-format": 6,
  "products": 16,
  "categories": 6,
  "category-parts": 12,
  "field-rules": 10,
  "finishing-steps-addon": 8,
  "reference-data": 18,
  "finish-sizes": 14,
  "page-limits": 6,
  "page-folds": 5,
  "page-colors": 8,
  "die-cut-templates": 3,
  "packaging-config": 5,
  "packaging-materials-setup": 11,
  "packaging-rules-setup": 5,
  "destination-zones": 6,
  "shipping-methods-setup": 12,
  "shipping-rules-setup": 5,
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
  if (id === "finishing-machines" || id === "cut" || id === "fold" || id === "crease" || id === "laminate" || id === "spot-finish" || id === "custom-finishing" || id.startsWith("custom-finish-")) {
    return [
      { name: "Polar N 185", type: "Guillotine Cutter", status: "Active", speed: "40 cuts/min", modified: "Mar 19, 2026", priceModel: "Setup + Per Unit", vaBucket: "Machine Cost", vendor: "", rate: "" },
      { name: "Stahlfolder TH 82", type: "Buckle Folder", status: "Active", speed: "30,000 sph", modified: "Mar 17, 2026", priceModel: "Machine Labor Time", vaBucket: "Labour Cost", vendor: "", rate: "" },
      { name: "Steinemann dmax 106", type: "Laminator", status: "Active", speed: "10,000 sph", modified: "Mar 14, 2026", priceModel: "Time & Materials", vaBucket: "Machine Cost", vendor: "", rate: "" },
      { name: "Spot UV Coating", type: "Spot Finish", status: "Active", speed: "—", modified: "Mar 12, 2026", priceModel: "Tiered Rate", vaBucket: "Outwork Cost", vendor: "FinishPro Veredlung GmbH", rate: "€0.25/sheet" },
      { name: "Die Cutting", type: "Die Cut", status: "Active", speed: "—", modified: "Mar 10, 2026", priceModel: "Perimeter + Unit", vaBucket: "Outwork Cost", vendor: "Scandia Die-Cutting ApS", rate: "€0.12/sheet" },
      { name: "Hot Foil Stamping", type: "Foil Press", status: "Active", speed: "—", modified: "Mar 8, 2026", priceModel: "Tiered Rate", vaBucket: "Outwork Cost", vendor: "FinishPro Veredlung GmbH", rate: "€0.08/imp" },
    ]
  }
  if (id === "binding-machines" || id === "saddle-stitch" || id === "perfect-bind" || id === "wire-o" || id === "case-making" || id === "pad-glue" || id === "folder-gluer" || id === "custom-price-model" || id.startsWith("custom-bind-")) {
    return [
      { name: "Muller Martini Presto II", type: "Saddle Stitcher", status: "Active", speed: "14,000 cycles/hr", modified: "Mar 16, 2026", priceModel: "Length & Speed", vaBucket: "Machine Cost", vendor: "", rate: "" },
      { name: "Horizon BQ-480", type: "Perfect Binder", status: "Active", speed: "1,300 books/hr", modified: "Mar 13, 2026", priceModel: "Tiered Rate", vaBucket: "Outwork Cost", vendor: "Bindwell Buchbinderei AG", rate: "€0.85/book" },
      { name: "Rilecart WR-5", type: "Wire-O Binder", status: "Idle", speed: "400 books/hr", modified: "Mar 11, 2026", priceModel: "Tiered Rate", vaBucket: "Outwork Cost", vendor: "Bindwell Buchbinderei AG", rate: "€1.40/book" },
    ]
  }
  if (id === "substrates" || id === "substrates-commercial") {
    return [
      { name: "Premium Matte 350gsm", gsm: "350", size: "700x1000mm", color: "White", stock: "12,400 sheets" },
      { name: "Silk Coated 170gsm", gsm: "170", size: "640x900mm", color: "White", stock: "28,000 sheets" },
      { name: "Uncoated Bond 120gsm", gsm: "120", size: "A3", color: "Ivory", stock: "8,500 sheets" },
      { name: "Recycled Kraft 300gsm", gsm: "300", size: "SRA3", color: "Brown", stock: "4,200 sheets" },
    ]
  }
  if (id === "substrates-large-format") {
    return [
      { name: "Canvas Matte 260gsm", gsm: "260", size: "Roll 1520mm", color: "White", stock: "3 rolls" },
      { name: "Vinyl Self-Adhesive", gsm: "150", size: "Roll 1370mm", color: "White", stock: "8 rolls" },
      { name: "Backlit Film 200gsm", gsm: "200", size: "Roll 1270mm", color: "Translucent", stock: "2 rolls" },
    ]
  }
  if (id === "finishing-steps-addon") {
    return [
      { name: "Spot UV Coating", category: "Finishing", condition: "Stock > 200gsm", active: "Yes" },
      { name: "Lamination (Gloss)", category: "Finishing", condition: "Always available", active: "Yes" },
      { name: "Lamination (Matte)", category: "Finishing", condition: "Always available", active: "Yes" },
      { name: "Die Cutting", category: "Finishing", condition: "Custom shape selected", active: "Yes" },
    ]
  }
  if (id === "products" || id === "categories") {
    return [
      { name: "Business Cards", category: "Commercial Print", sizeRange: "85x55mm - 90x55mm", active: "Yes" },
      { name: "Brochures", category: "Commercial Print", sizeRange: "A5 - A3", active: "Yes" },
      { name: "Posters", category: "Large Format", sizeRange: "A2 - A0", active: "Yes" },
      { name: "Booklets", category: "Binding", sizeRange: "A6 - A4", active: "Yes" },
    ]
  }
  if (id === "category-parts") {
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

  // Sync state
  const [substrateSyncEnabled, setSubstrateSyncEnabled] = useState(false)
  const [machineSyncEnabled, setMachineSyncEnabled] = useState(false)
  const [substrateSyncCompleted, setSubstrateSyncCompleted] = useState(false)
  const [machineSyncCompleted, setMachineSyncCompleted] = useState(false)
  const [showSubstrateSyncWizard, setShowSubstrateSyncWizard] = useState(false)
  const [showMachineSyncWizard, setShowMachineSyncWizard] = useState(false)
  const [syncWizardStep, setSyncWizardStep] = useState(1)
  const [liveShippingRatesEnabled, setLiveShippingRatesEnabled] = useState(false)

  // Substrate sync wizard data
  const syncSubstrates = [
    { name: "Premium Matte 350gsm", gsm: "350", size: "700x1000mm", color: "White", selected: true, supplier: "Sappi", action: "create" as const },
    { name: "Silk Coated 170gsm", gsm: "170", size: "640x900mm", color: "White", selected: true, supplier: "Mondi", action: "create" as const },
    { name: "Uncoated Bond 120gsm", gsm: "120", size: "A3", color: "Ivory", selected: true, supplier: "Stora Enso", action: "create" as const },
    { name: "Recycled Kraft 300gsm", gsm: "300", size: "SRA3", color: "Brown", selected: true, supplier: "Mondi", action: "create" as const },
    { name: "Gloss Art 250gsm", gsm: "250", size: "SRA2", color: "White", selected: true, supplier: "Sappi", action: "create" as const },
    { name: "Offset Uncoated 100gsm", gsm: "100", size: "B1", color: "White", selected: true, supplier: "Stora Enso", action: "create" as const },
    { name: "Board 400gsm", gsm: "400", size: "700x1000mm", color: "White", selected: true, supplier: "Sappi", action: "map" as const },
    { name: "Canvas Matte 260gsm", gsm: "260", size: "Roll 1520mm", color: "White", selected: true, supplier: "Mondi", action: "create" as const },
  ]
  const [substrateWizardData, setSubstrateWizardData] = useState(syncSubstrates)

  // Machine sync wizard data
  const syncMachines = [
    { name: "HP Indigo 12000 HD", type: "Sheet Fed Digital", speed: "4,600 sph", selected: true, brand: "HP", model: "Indigo 12000 HD", action: "create" as const },
    { name: "Heidelberg Speedmaster XL 106", type: "Sheet Fed Offset", speed: "18,000 sph", selected: true, brand: "Heidelberg", model: "Speedmaster XL 106", action: "create" as const },
    { name: "HP PageWide T1190", type: "Web Digital", speed: "305 m/min", selected: true, brand: "HP", model: "PageWide T1190", action: "create" as const },
    { name: "Polar N 185", type: "Guillotine Cutter", speed: "40 cuts/min", selected: true, brand: "Polar", model: "N 185", action: "map" as const },
    { name: "Stahlfolder TH 82", type: "Buckle Folder", speed: "35,000 sph", selected: true, brand: "Stahlfolder", model: "TH 82", action: "create" as const },
    { name: "Muller Martini Presto II", type: "Saddle Stitcher", speed: "14,000 cycles/hr", selected: true, brand: "Muller Martini", model: "Presto II", action: "create" as const },
  ]
  const [machineWizardData, setMachineWizardData] = useState(syncMachines)

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
      <>
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

          {/* ─── Gelato Connect Sync ─── */}
          <div className="border-t border-[#E5E5E5] my-8" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <RefreshCw className="h-5 w-5 text-[#007cb4]" />
              <h3 className="text-base font-semibold text-[#212121]">Gelato Connect Sync</h3>
            </div>
            <p className="text-sm text-[#8a8a8a] mb-5">Keep your AI Estimator configuration in sync with Gelato Connect MIS. When sync is enabled, items created in Estimate Setup are automatically pushed to the MIS.</p>

            <div className="space-y-4">
              {/* Substrate Sync */}
              <div className="border rounded-lg p-5" style={{ borderColor: "#e6e6e6", borderRadius: "8px", background: "#FAFAFA" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#eaf4ff" }}>
                      <Warehouse className="h-4 w-4 text-[#007cb4]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#212121]">Sync substrates with Inventory</p>
                      <p className="text-xs text-[#8a8a8a]">Push substrates to Procurement &gt; Inventory Management</p>
                    </div>
                  </div>
                  <Switch checked={substrateSyncEnabled} onCheckedChange={(v) => { setSubstrateSyncEnabled(v); if (!v) return; if (!substrateSyncCompleted) { /* show banner */ } }} />
                </div>
                {substrateSyncEnabled && !substrateSyncCompleted && (
                  <div className="mt-4 p-3 rounded-lg flex items-center justify-between" style={{ background: "#E8F4FD", border: "1px solid #007cb4" }}>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-[#007cb4]" />
                      <span className="text-sm text-[#00527c]">Initial setup required. Map substrates to suppliers and inventory items.</span>
                    </div>
                    <Button size="sm" className="bg-[#007cb4] hover:bg-[#005a87] text-white rounded-full text-xs h-7 px-3" onClick={() => { setShowSubstrateSyncWizard(true); setSyncWizardStep(1); setSubstrateWizardData(syncSubstrates) }}>
                      Configure Mapping
                    </Button>
                  </div>
                )}
                {substrateSyncEnabled && substrateSyncCompleted && (
                  <div className="mt-4 p-3 rounded-lg" style={{ background: "#dcfce7", border: "1px solid #16a34a" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#16a34a]" />
                        <div>
                          <span className="text-sm font-medium text-[#065f46]">Synced — {substrateWizardData.filter(s => s.selected).length} substrates</span>
                          <p className="text-xs text-[#047857]">Last synced: Mar 30, 2026 09:15 AM</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full text-xs h-7 px-3 border-[#16a34a] text-[#065f46] hover:bg-[#bbf7d0]" onClick={() => { setShowSubstrateSyncWizard(true); setSyncWizardStep(1) }}>
                          View Mapping
                        </Button>
                        <Button size="sm" className="bg-[#065f46] hover:bg-[#064e3b] text-white rounded-full text-xs h-7 px-3">
                          <RefreshCw className="h-3 w-3 mr-1" />Re-sync
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Machine Sync */}
              <div className="border rounded-lg p-5" style={{ borderColor: "#e6e6e6", borderRadius: "8px", background: "#FAFAFA" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#f3e8ff" }}>
                      <HardDrive className="h-4 w-4 text-[#7c3aed]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#212121]">Sync machines with Machine Park</p>
                      <p className="text-xs text-[#8a8a8a]">Push machines to Workflow &gt; Machine Park</p>
                    </div>
                  </div>
                  <Switch checked={machineSyncEnabled} onCheckedChange={(v) => { setMachineSyncEnabled(v) }} />
                </div>
                {machineSyncEnabled && !machineSyncCompleted && (
                  <div className="mt-4 p-3 rounded-lg flex items-center justify-between" style={{ background: "#E8F4FD", border: "1px solid #007cb4" }}>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-[#007cb4]" />
                      <span className="text-sm text-[#00527c]">Initial setup required. Map machines to Machine Park and assign brand/model details.</span>
                    </div>
                    <Button size="sm" className="bg-[#007cb4] hover:bg-[#005a87] text-white rounded-full text-xs h-7 px-3" onClick={() => { setShowMachineSyncWizard(true); setSyncWizardStep(1); setMachineWizardData(syncMachines) }}>
                      Configure Mapping
                    </Button>
                  </div>
                )}
                {machineSyncEnabled && machineSyncCompleted && (
                  <div className="mt-4 p-3 rounded-lg" style={{ background: "#dcfce7", border: "1px solid #16a34a" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#16a34a]" />
                        <div>
                          <span className="text-sm font-medium text-[#065f46]">Synced — {machineWizardData.filter(m => m.selected).length} machines</span>
                          <p className="text-xs text-[#047857]">Last synced: Mar 30, 2026 09:15 AM</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full text-xs h-7 px-3 border-[#16a34a] text-[#065f46] hover:bg-[#bbf7d0]" onClick={() => { setShowMachineSyncWizard(true); setSyncWizardStep(1) }}>
                          View Mapping
                        </Button>
                        <Button size="sm" className="bg-[#065f46] hover:bg-[#064e3b] text-white rounded-full text-xs h-7 px-3">
                          <RefreshCw className="h-3 w-3 mr-1" />Re-sync
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Substrate Sync Wizard ─── */}
      {showSubstrateSyncWizard && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: "rgba(33,33,33,0.8)", zIndex: 20001 }} onClick={() => setShowSubstrateSyncWizard(false)}>
          <div className="bg-white w-full max-w-[720px] max-h-[85vh] flex flex-col" style={{ borderRadius: "12px" }} onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#212121]">Sync Substrates to Inventory</h3>
                <p className="text-sm text-[#8a8a8a] mt-0.5">Step {syncWizardStep} of 3 — {syncWizardStep === 1 ? "Select Substrates" : syncWizardStep === 2 ? "Assign Suppliers" : "Confirm"}</p>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3].map(s => (
                  <div key={s} className="h-1.5 rounded-full transition-all" style={{ width: s <= syncWizardStep ? "32px" : "16px", background: s <= syncWizardStep ? "#007cb4" : "#e6e6e6" }} />
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {syncWizardStep === 1 && (
                <div>
                  <p className="text-sm text-[#525252] mb-4">Select which substrates to sync with Inventory Management. All substrates are selected by default.</p>
                  <div className="border rounded-lg overflow-hidden" style={{ borderColor: "#e6e6e6" }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: "#f7f7f7", borderBottom: "1px solid #e6e6e6" }}>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b] w-10"></th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Substrate</th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">GSM</th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Size</th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Color</th>
                        </tr>
                      </thead>
                      <tbody>
                        {substrateWizardData.map((s, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #e6e6e6" }}>
                            <td className="p-3"><Checkbox checked={s.selected} onCheckedChange={v => { const d = [...substrateWizardData]; d[i] = {...d[i], selected: !!v}; setSubstrateWizardData(d) }} /></td>
                            <td className="p-3 font-medium text-[#212121]">{s.name}</td>
                            <td className="p-3 text-[#525252]">{s.gsm}</td>
                            <td className="p-3 text-[#525252]">{s.size}</td>
                            <td className="p-3 text-[#525252]">{s.color}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-[#8a8a8a] mt-3">{substrateWizardData.filter(s => s.selected).length} of {substrateWizardData.length} selected</p>
                </div>
              )}
              {syncWizardStep === 2 && (
                <div>
                  <p className="text-sm text-[#525252] mb-4">Assign a supplier for each substrate and choose whether to create a new inventory item or map to an existing one.</p>
                  <div className="space-y-3">
                    {substrateWizardData.filter(s => s.selected).map((s, i) => (
                      <div key={i} className="border rounded-lg p-4" style={{ borderColor: "#e6e6e6" }}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-[#212121]">{s.name}</span>
                          <span className="text-xs text-[#8a8a8a]">{s.gsm} gsm &bull; {s.size}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Supplier</label>
                            <Select value={s.supplier} onValueChange={v => { const d = [...substrateWizardData]; const idx = d.findIndex(x => x.name === s.name); d[idx] = {...d[idx], supplier: v}; setSubstrateWizardData(d) }}>
                              <SelectTrigger className="h-8 text-sm" style={{ borderRadius: "6px" }}><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Sappi">Sappi</SelectItem>
                                <SelectItem value="Mondi">Mondi</SelectItem>
                                <SelectItem value="Stora Enso">Stora Enso</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Action</label>
                            <Select value={s.action} onValueChange={v => { const d = [...substrateWizardData]; const idx = d.findIndex(x => x.name === s.name); d[idx] = {...d[idx], action: v as "create" | "map"}; setSubstrateWizardData(d) }}>
                              <SelectTrigger className="h-8 text-sm" style={{ borderRadius: "6px" }}><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="create">Create new in Inventory</SelectItem>
                                <SelectItem value="map">Map to existing item</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {syncWizardStep === 3 && (
                <div>
                  <p className="text-sm text-[#525252] mb-4">Review the sync configuration before confirming.</p>
                  <div className="border rounded-lg overflow-hidden" style={{ borderColor: "#e6e6e6" }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: "#f7f7f7", borderBottom: "1px solid #e6e6e6" }}>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Substrate</th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Supplier</th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {substrateWizardData.filter(s => s.selected).map((s, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #e6e6e6" }}>
                            <td className="p-3 font-medium text-[#212121]">{s.name}</td>
                            <td className="p-3 text-[#525252]">{s.supplier}</td>
                            <td className="p-3"><Badge className={s.action === "create" ? "bg-[#eaf4ff] text-[#00527c]" : "bg-[#f3e8ff] text-[#7c3aed]"}>{s.action === "create" ? "Create new" : "Map existing"}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-3 rounded-lg" style={{ background: "#f7f7f7", border: "1px solid #e6e6e6" }}>
                    <p className="text-sm text-[#525252]">
                      This will <strong>{substrateWizardData.filter(s => s.selected && s.action === "create").length} create new</strong> and <strong>{substrateWizardData.filter(s => s.selected && s.action === "map").length} map existing</strong> items in Inventory Management.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-5 border-t flex justify-between">
              <Button variant="outline" className="rounded-full" onClick={() => { if (syncWizardStep === 1) setShowSubstrateSyncWizard(false); else setSyncWizardStep(syncWizardStep - 1) }}>
                {syncWizardStep === 1 ? "Cancel" : "Back"}
              </Button>
              <Button className="bg-[#212121] text-white rounded-full hover:opacity-90" onClick={() => { if (syncWizardStep < 3) setSyncWizardStep(syncWizardStep + 1); else { setSubstrateSyncCompleted(true); setShowSubstrateSyncWizard(false); setSyncWizardStep(1) } }}>
                {syncWizardStep === 3 ? "Confirm Sync" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Machine Sync Wizard ─── */}
      {showMachineSyncWizard && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: "rgba(33,33,33,0.8)", zIndex: 20001 }} onClick={() => setShowMachineSyncWizard(false)}>
          <div className="bg-white w-full max-w-[720px] max-h-[85vh] flex flex-col" style={{ borderRadius: "12px" }} onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#212121]">Sync Machines to Machine Park</h3>
                <p className="text-sm text-[#8a8a8a] mt-0.5">Step {syncWizardStep} of 3 — {syncWizardStep === 1 ? "Select Machines" : syncWizardStep === 2 ? "Assign Brand & Model" : "Confirm"}</p>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3].map(s => (
                  <div key={s} className="h-1.5 rounded-full transition-all" style={{ width: s <= syncWizardStep ? "32px" : "16px", background: s <= syncWizardStep ? "#7c3aed" : "#e6e6e6" }} />
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {syncWizardStep === 1 && (
                <div>
                  <p className="text-sm text-[#525252] mb-4">Select which machines to sync with Machine Park.</p>
                  <div className="border rounded-lg overflow-hidden" style={{ borderColor: "#e6e6e6" }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: "#f7f7f7", borderBottom: "1px solid #e6e6e6" }}>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b] w-10"></th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Machine</th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Type</th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Speed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {machineWizardData.map((m, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #e6e6e6" }}>
                            <td className="p-3"><Checkbox checked={m.selected} onCheckedChange={v => { const d = [...machineWizardData]; d[i] = {...d[i], selected: !!v}; setMachineWizardData(d) }} /></td>
                            <td className="p-3 font-medium text-[#212121]">{m.name}</td>
                            <td className="p-3 text-[#525252]">{m.type}</td>
                            <td className="p-3 text-[#525252]">{m.speed}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-[#8a8a8a] mt-3">{machineWizardData.filter(m => m.selected).length} of {machineWizardData.length} selected</p>
                </div>
              )}
              {syncWizardStep === 2 && (
                <div>
                  <p className="text-sm text-[#525252] mb-4">Provide brand and model details for each machine. These are required for Machine Park.</p>
                  <div className="space-y-3">
                    {machineWizardData.filter(m => m.selected).map((m, i) => (
                      <div key={i} className="border rounded-lg p-4" style={{ borderColor: "#e6e6e6" }}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-[#212121]">{m.name}</span>
                          <Badge className="bg-[#f3e8ff] text-[#7c3aed] text-xs">{m.type}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Brand</label>
                            <Input value={m.brand} className="h-8 text-sm" style={{ borderRadius: "6px" }} onChange={e => { const d = [...machineWizardData]; const idx = d.findIndex(x => x.name === m.name); d[idx] = {...d[idx], brand: e.target.value}; setMachineWizardData(d) }} />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Model</label>
                            <Input value={m.model} className="h-8 text-sm" style={{ borderRadius: "6px" }} onChange={e => { const d = [...machineWizardData]; const idx = d.findIndex(x => x.name === m.name); d[idx] = {...d[idx], model: e.target.value}; setMachineWizardData(d) }} />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Action</label>
                            <Select value={m.action} onValueChange={v => { const d = [...machineWizardData]; const idx = d.findIndex(x => x.name === m.name); d[idx] = {...d[idx], action: v as "create" | "map"}; setMachineWizardData(d) }}>
                              <SelectTrigger className="h-8 text-sm" style={{ borderRadius: "6px" }}><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="create">Create new in Machine Park</SelectItem>
                                <SelectItem value="map">Map to existing machine</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {syncWizardStep === 3 && (
                <div>
                  <p className="text-sm text-[#525252] mb-4">Review the sync configuration before confirming.</p>
                  <div className="border rounded-lg overflow-hidden" style={{ borderColor: "#e6e6e6" }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: "#f7f7f7", borderBottom: "1px solid #e6e6e6" }}>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Machine</th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Brand</th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Model</th>
                          <th className="text-left p-3 font-medium text-xs text-[#6b6b6b]">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {machineWizardData.filter(m => m.selected).map((m, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #e6e6e6" }}>
                            <td className="p-3 font-medium text-[#212121]">{m.name}</td>
                            <td className="p-3 text-[#525252]">{m.brand}</td>
                            <td className="p-3 text-[#525252]">{m.model}</td>
                            <td className="p-3"><Badge className={m.action === "create" ? "bg-[#eaf4ff] text-[#00527c]" : "bg-[#f3e8ff] text-[#7c3aed]"}>{m.action === "create" ? "Create new" : "Map existing"}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-3 rounded-lg" style={{ background: "#f7f7f7", border: "1px solid #e6e6e6" }}>
                    <p className="text-sm text-[#525252]">
                      This will <strong>{machineWizardData.filter(m => m.selected && m.action === "create").length} create new</strong> and <strong>{machineWizardData.filter(m => m.selected && m.action === "map").length} map existing</strong> machines in Machine Park.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-5 border-t flex justify-between">
              <Button variant="outline" className="rounded-full" onClick={() => { if (syncWizardStep === 1) setShowMachineSyncWizard(false); else setSyncWizardStep(syncWizardStep - 1) }}>
                {syncWizardStep === 1 ? "Cancel" : "Back"}
              </Button>
              <Button className="bg-[#212121] text-white rounded-full hover:opacity-90" onClick={() => { if (syncWizardStep < 3) setSyncWizardStep(syncWizardStep + 1); else { setMachineSyncCompleted(true); setShowMachineSyncWizard(false); setSyncWizardStep(1) } }}>
                {syncWizardStep === 3 ? "Confirm Sync" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
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

  function renderMachineTableWithOutwork(sectionId: string, sectionLabel: string) {
    const rows = getMockRows(sectionId)
    const count = sectionCounts[sectionId] || rows.length

    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[#212121]">{sectionLabel}</h2>
            <Badge variant="secondary" className="text-xs" style={{ backgroundColor: "#F5F5F5", color: "#6b6b6b" }}>{count} items</Badge>
          </div>
          <Button className="bg-[#212121] hover:opacity-90 text-white rounded-full text-sm"><Plus className="h-4 w-4 mr-1" />Add New</Button>
        </div>
        <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "#E5E5E5", borderRadius: "8px" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #E5E5E5" }}>
                <th className="text-left p-3 text-xs font-medium" style={{ background: "#FAFAFA", color: "#8a8a8a" }}>Name</th>
                <th className="text-left p-3 text-xs font-medium" style={{ background: "#FAFAFA", color: "#8a8a8a" }}>Type</th>
                <th className="text-left p-3 text-xs font-medium" style={{ background: "#FAFAFA", color: "#8a8a8a" }}>Price Model</th>
                <th className="text-left p-3 text-xs font-medium" style={{ background: "#FAFAFA", color: "#8a8a8a" }}>VA Bucket</th>
                <th className="text-left p-3 text-xs font-medium" style={{ background: "#FAFAFA", color: "#8a8a8a" }}>Vendor</th>
                <th className="text-left p-3 text-xs font-medium" style={{ background: "#FAFAFA", color: "#8a8a8a" }}>Rate</th>
                <th className="text-left p-3 text-xs font-medium" style={{ background: "#FAFAFA", color: "#8a8a8a" }}>Speed</th>
                <th className="w-10" style={{ background: "#FAFAFA" }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => {
                const isOutwork = row.vaBucket === "Outwork Cost"
                return (
                  <tr key={ri} className="hover:bg-[#FAFAFA] transition-colors" style={{ borderBottom: ri < rows.length - 1 ? "1px solid #E5E5E5" : "none" }}>
                    <td className="p-3 text-sm font-medium text-[#212121]">{row.name}</td>
                    <td className="p-3 text-sm text-[#6b6b6b]">{row.type}</td>
                    <td className="p-3 text-sm text-[#6b6b6b]">{row.priceModel}</td>
                    <td className="p-3">
                      <Badge className={isOutwork ? "bg-[#eaf4ff] text-[#007cb4] hover:bg-[#eaf4ff]" : "bg-[#f5f5f5] text-[#6b6b6b] hover:bg-[#f5f5f5]"} style={{ fontSize: "11px" }}>
                        {row.vaBucket}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm">
                      {isOutwork && row.vendor ? (
                        <button className="text-[#007cb4] hover:underline text-left" onClick={() => navigateTo("vendor-detail", { vendorId: "V-001" })}>{row.vendor}</button>
                      ) : (
                        <span className="text-[#bdbdbd]">—</span>
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {isOutwork && row.rate ? (
                        <span className="font-medium text-[#212121]">{row.rate}</span>
                      ) : (
                        <span className="text-[#bdbdbd]">—</span>
                      )}
                    </td>
                    <td className="p-3 text-sm text-[#6b6b6b]">{row.speed}</td>
                    <td className="p-3"><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4 text-[#bdbdbd]" /></Button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  function renderShippingMethods() {
    const columns = getColumnsForSection("shipping-methods")
    const rows = getMockRows("shipping-methods")
    const count = sectionCounts["shipping-methods"] || rows.length

    return (
      <div className="p-8">
        {/* Shipping Methods Table Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[#212121]">Shipping Methods</h2>
            <Badge variant="secondary" className="text-xs" style={{ backgroundColor: "#F5F5F5", color: "#6b6b6b" }}>{count} items</Badge>
          </div>
          <Button className="bg-[#212121] hover:opacity-90 text-white rounded-full text-sm"><Plus className="h-4 w-4 mr-1" />Add New</Button>
        </div>
        <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "#E5E5E5", borderRadius: "8px" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #E5E5E5" }}>
                {columns.map(col => <th key={col.key} className="text-left p-3 text-xs font-medium" style={{ background: "#FAFAFA", color: "#8a8a8a" }}>{col.header}</th>)}
                <th className="w-10" style={{ background: "#FAFAFA" }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-[#FAFAFA] transition-colors" style={{ borderBottom: ri < rows.length - 1 ? "1px solid #E5E5E5" : "none" }}>
                  {columns.map((col, ci) => <td key={col.key} className={`p-3 text-sm ${ci === 0 ? "font-medium text-[#212121]" : "text-[#6b6b6b]"}`}>{row[col.key]}</td>)}
                  <td className="p-3"><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4 text-[#bdbdbd]" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Advanced Shipping Settings */}
        <div className="max-w-4xl mt-8">
          <div className="border-t border-[#E5E5E5] mb-6" />
          <h3 className="text-base font-semibold text-[#212121] mb-1 flex items-center gap-2">
            Advanced Shipping Settings
            <Badge className="text-[10px] px-2 py-0" style={{ background: "#E8F4FD", color: "#007cb4", border: "1px solid #007cb4" }}>
              <Sparkles className="h-3 w-3 mr-1 inline" />MIS Only
            </Badge>
          </h3>
          <p className="text-sm text-[#8a8a8a] mb-4">These settings are available to Gelato Connect MIS customers.</p>

          <div className="border rounded-lg p-5" style={{ borderColor: "#e6e6e6", borderRadius: "8px", background: "#FAFAFA" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#fff4d7" }}>
                  <Zap className="h-4 w-4 text-[#956f00]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#212121]">Enable Live Shipping Rates</p>
                  <p className="text-xs text-[#8a8a8a]">Get real-time shipping rates from configured carrier accounts in Logistics</p>
                </div>
              </div>
              <Switch checked={liveShippingRatesEnabled} onCheckedChange={setLiveShippingRatesEnabled} />
            </div>
            {liveShippingRatesEnabled && (
              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-lg" style={{ background: "white", border: "1px solid #e6e6e6" }}>
                  <p className="text-xs font-medium text-[#6b6b6b] mb-2">Connected Carriers</p>
                  <div className="space-y-2">
                    {[
                      { name: "FedEx", color: "#4D148C" },
                      { name: "UPS", color: "#351C15" },
                      { name: "DHL", color: "#D40511" },
                    ].map(c => (
                      <div key={c.name} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[#16a34a]" />
                        <span className="text-sm text-[#212121]">{c.name}</span>
                        <Badge className="text-[9px] px-1.5 py-0 bg-[#dcfce7] text-[#065f46]">Connected</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#8a8a8a]">
                  Rates are fetched from <span className="text-[#007cb4] cursor-pointer hover:underline" onClick={() => navigateTo("shipping-rate-tables")}>Logistics &gt; Shipping Rates</span>. Manage carriers in <span className="text-[#007cb4] cursor-pointer hover:underline" onClick={() => navigateTo("carrier-accounts")}>Carrier Accounts</span>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  function renderContent() {
    if (!selectedItem) return renderHomeContent()

    // Settings sub-sections
    if (selectedItem === "general-settings") return renderGeneralSettings()
    if (selectedItem === "email-template") return renderEmailTemplate()
    if (selectedItem === "ai-guidance") return renderAiGuidance()
    if (selectedItem === "connections") return renderConnections()
    if (selectedItem === "pending-changes") return renderPendingChanges()
    if (selectedItem === "pricing-rules") return renderPricingRules()
    // Shipping section
    if (selectedItem === "packaging-materials-setup") return <PackagingMaterials />
    if (selectedItem === "packaging-rules-setup") return <PackagingRulesSetup />
    if (selectedItem === "destination-zones") return <DestinationZones />
    if (selectedItem === "shipping-methods-setup") return <ShippingMethodsConfig />
    if (selectedItem === "shipping-rules-setup") return <ShippingRulesSetup />

    // Finishing and binding sections use the outwork-aware table
    const finishingIds = ["finishing-machines", "cut", "fold", "crease", "laminate", "spot-finish", "custom-finishing"]
    const bindingIds = ["binding-machines", "saddle-stitch", "perfect-bind", "wire-o", "case-making", "pad-glue", "folder-gluer", "custom-price-model"]
    const isFinishingOrBinding = finishingIds.includes(selectedItem) || bindingIds.includes(selectedItem) || selectedItem.startsWith("custom-finish-") || selectedItem.startsWith("custom-bind-")
    if (isFinishingOrBinding) {
      const label = findLabel(selectedItem)
      return renderMachineTableWithOutwork(selectedItem, label)
    }

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
