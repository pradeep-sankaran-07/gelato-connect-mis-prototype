"use client"

import type React from "react"
import { useState } from "react"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Send,
  Sparkles,
  FileText,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"

interface ChatMessage {
  id: number
  role: "ai" | "user"
  content: string
  timestamp: string
}

interface FormSection {
  id: string
  title: string
  isOpen: boolean
}

export default function CreateEstimate() {
  const { goBack, navigateTo } = useNavigation()

  const [chatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "ai",
      content: "Hi! I'm ConnectAI. I can help you create an estimate quickly. Describe the product you'd like to quote, or paste an email from your customer and I'll extract the details.",
      timestamp: "Just now",
    },
    {
      id: 2,
      role: "user",
      content: "Customer needs 5000 copies of an A4 brochure, 200gsm gloss, full color both sides with tri-fold finishing. Delivery to Munich by March 28.",
      timestamp: "Just now",
    },
    {
      id: 3,
      role: "ai",
      content: "I've extracted the following specifications from your message:\n\n- Quantity: 5,000 copies\n- Product: Brochure\n- Size: A4 Portrait\n- Paper: 200gsm Gloss\n- Color: Full color (4/4)\n- Finishing: Tri-fold\n- Delivery: Munich, March 28\n\nI've pre-filled the form on the right. Would you like me to calculate pricing based on your rate card?",
      timestamp: "Just now",
    },
  ])

  const [chatInput, setChatInput] = useState("")

  const [sections, setSections] = useState<FormSection[]>([
    { id: "basic", title: "Basic Details", isOpen: true },
    { id: "product", title: "Product Description", isOpen: true },
    { id: "inner", title: "Inner Specs", isOpen: true },
    { id: "finishing", title: "Finishing", isOpen: true },
    { id: "pricing", title: "Pricing", isOpen: true },
    { id: "delivery", title: "Delivery", isOpen: false },
    { id: "notes", title: "Notes", isOpen: false },
  ])

  const toggleSection = (id: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, isOpen: !s.isOpen } : s)))
  }

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    setChatInput("")
  }

  const handleBack = () => {
    goBack()
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#F7F7F7" }}>
      {/* Header Bar */}
      <div
        className="flex items-center justify-between px-6 shrink-0"
        style={{
          height: 56,
          background: "#FFFFFF",
          borderBottom: "1px solid #E6E6E6",
        }}
      >
        {/* Left: Back button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          style={{ color: "#383838", background: "transparent", border: "none", cursor: "pointer" }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Estimates</span>
        </button>

        {/* Center: Title */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-sm font-medium"
          style={{ color: "#212121" }}
        >
          New Estimate
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center px-4 text-sm font-medium transition-all"
            style={{
              height: 36,
              background: "#FFFFFF",
              color: "#383838",
              border: "2px solid #BDBDBD",
              borderRadius: 999,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F7F7")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
          >
            Save Draft
          </button>
          <button
            className="flex items-center justify-center px-4 text-sm font-medium transition-all"
            style={{
              height: 36,
              background: "#FFFFFF",
              color: "#383838",
              border: "2px solid #BDBDBD",
              borderRadius: 999,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F7F7")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
          >
            <FileText className="h-4 w-4 mr-2" />
            View PDF
          </button>
          <button
            className="flex items-center justify-center px-4 text-sm font-medium transition-all"
            style={{
              height: 36,
              background: "#212121",
              color: "#FFFFFF",
              border: "2px solid transparent",
              borderRadius: 999,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Convert to Order
          </button>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        {/* Left Panel: AI Agent Chat */}
        <div
          className="flex flex-col overflow-hidden shrink-0"
          style={{
            width: "33%",
            minWidth: 400,
            background: "#FFFFFF",
            borderRadius: 16,
            border: "1px solid #E6E6E6",
          }}
        >
          {/* ConnectAI branding header */}
          <div
            className="flex items-center gap-3 px-5 shrink-0"
            style={{
              height: 56,
              borderBottom: "1px solid #E6E6E6",
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                background: "#F4E8FA",
                borderRadius: 8,
              }}
            >
              <Sparkles className="h-4 w-4" style={{ color: "#9C77AC" }} />
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: "#212121" }}>
                ConnectAI
              </div>
              <div className="text-xs" style={{ color: "#8A8A8A" }}>
                Estimate Assistant
              </div>
            </div>
            <Badge
              className="ml-auto text-xs px-2 py-0.5"
              style={{
                background: "#CDFEE1",
                color: "#0C5132",
                border: "none",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              Online
            </Badge>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-2.5 max-w-[90%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.role === "ai" && (
                    <div
                      className="flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        width: 28,
                        height: 28,
                        background: "#F4E8FA",
                        borderRadius: 8,
                      }}
                    >
                      <Bot className="h-3.5 w-3.5" style={{ color: "#9C77AC" }} />
                    </div>
                  )}
                  <div
                    className="px-3.5 py-2.5 text-sm leading-relaxed"
                    style={{
                      borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      background: msg.role === "user" ? "#212121" : "#F7F7F7",
                      color: msg.role === "user" ? "#FFFFFF" : "#383838",
                      whiteSpace: "pre-line",
                      letterSpacing: "0.16px",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form
            onSubmit={handleSendChat}
            className="shrink-0 px-4 pb-4"
          >
            <div
              className="flex items-center gap-2 px-3"
              style={{
                height: 44,
                borderRadius: 12,
                border: "1px solid #E6E6E6",
                background: "#F7F7F7",
              }}
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask ConnectAI..."
                className="flex-1 bg-transparent border-none outline-none text-sm"
                style={{ color: "#212121", letterSpacing: "0.16px" }}
              />
              <button
                type="submit"
                className="flex items-center justify-center shrink-0 transition-opacity hover:opacity-70"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: chatInput.trim() ? "#212121" : "#D4D4D4",
                  border: "none",
                  cursor: chatInput.trim() ? "pointer" : "default",
                }}
                disabled={!chatInput.trim()}
              >
                <Send className="h-3.5 w-3.5" style={{ color: "#FFFFFF" }} />
              </button>
            </div>
          </form>
        </div>

        {/* Right Panel: Estimate Form */}
        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            border: "1px solid #E6E6E6",
          }}
        >
          {/* Scrollable form content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-3">
              {/* Basic Details Section */}
              <SectionAccordion
                title="Basic Details"
                isOpen={sections.find((s) => s.id === "basic")?.isOpen ?? true}
                onToggle={() => toggleSection("basic")}
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Estimate Name">
                    <Input
                      placeholder="e.g. Brochure print run Q1"
                      defaultValue="A4 Brochure — DesignWorks GmbH"
                      className="h-10"
                      style={{ borderRadius: 8 }}
                    />
                  </FormField>
                  <FormField label="Customer">
                    <Select defaultValue="designworks">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="designworks">DesignWorks GmbH</SelectItem>
                        <SelectItem value="printco">PrintCo Ltd</SelectItem>
                        <SelectItem value="sandbox">Sandbox</SelectItem>
                        <SelectItem value="athletix">Athletix</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Reference Number">
                    <Input
                      placeholder="Auto-generated"
                      defaultValue="EST-2026-0047"
                      className="h-10"
                      style={{ borderRadius: 8 }}
                      readOnly
                    />
                  </FormField>
                  <FormField label="Valid Until">
                    <Input
                      type="date"
                      defaultValue="2026-04-19"
                      className="h-10"
                      style={{ borderRadius: 8 }}
                    />
                  </FormField>
                </div>
              </SectionAccordion>

              {/* Product Description Section */}
              <SectionAccordion
                title="Product Description"
                isOpen={sections.find((s) => s.id === "product")?.isOpen ?? true}
                onToggle={() => toggleSection("product")}
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Product Category">
                    <Select defaultValue="brochure">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brochure">Brochure</SelectItem>
                        <SelectItem value="flyer">Flyer</SelectItem>
                        <SelectItem value="book">Book</SelectItem>
                        <SelectItem value="businesscard">Business Card</SelectItem>
                        <SelectItem value="poster">Poster</SelectItem>
                        <SelectItem value="booklet">Booklet</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Quantity">
                    <Input
                      type="number"
                      defaultValue={5000}
                      className="h-10"
                      style={{ borderRadius: 8 }}
                    />
                  </FormField>
                  <FormField label="Finished Size">
                    <Select defaultValue="a4">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4 (210 x 297 mm)</SelectItem>
                        <SelectItem value="a5">A5 (148 x 210 mm)</SelectItem>
                        <SelectItem value="a6">A6 (105 x 148 mm)</SelectItem>
                        <SelectItem value="dl">DL (99 x 210 mm)</SelectItem>
                        <SelectItem value="letter">Letter (216 x 279 mm)</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Orientation">
                    <Select defaultValue="portrait">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select orientation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <div className="col-span-2">
                    <FormField label="Description">
                      <Textarea
                        placeholder="Additional product details..."
                        defaultValue="A4 tri-fold brochure for spring marketing campaign. Full color both sides."
                        rows={2}
                        style={{ borderRadius: 8 }}
                      />
                    </FormField>
                  </div>
                </div>
              </SectionAccordion>

              {/* Inner Specs Section */}
              <SectionAccordion
                title="Inner Specs"
                isOpen={sections.find((s) => s.id === "inner")?.isOpen ?? true}
                onToggle={() => toggleSection("inner")}
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Paper Type">
                    <Select defaultValue="gloss">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select paper type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gloss">Gloss Coated</SelectItem>
                        <SelectItem value="silk">Silk Coated</SelectItem>
                        <SelectItem value="matte">Matte Coated</SelectItem>
                        <SelectItem value="uncoated">Uncoated</SelectItem>
                        <SelectItem value="recycled">Recycled</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Paper Weight">
                    <Select defaultValue="200">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select weight" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="80">80 gsm</SelectItem>
                        <SelectItem value="100">100 gsm</SelectItem>
                        <SelectItem value="120">120 gsm</SelectItem>
                        <SelectItem value="150">150 gsm</SelectItem>
                        <SelectItem value="170">170 gsm</SelectItem>
                        <SelectItem value="200">200 gsm</SelectItem>
                        <SelectItem value="250">250 gsm</SelectItem>
                        <SelectItem value="300">300 gsm</SelectItem>
                        <SelectItem value="350">350 gsm</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Sides">
                    <Select defaultValue="double">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select sides" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single-sided (1/0)</SelectItem>
                        <SelectItem value="double">Double-sided (4/4)</SelectItem>
                        <SelectItem value="mixed">Mixed (4/1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Color">
                    <Select defaultValue="full">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Color (CMYK)</SelectItem>
                        <SelectItem value="bw">Black & White</SelectItem>
                        <SelectItem value="spot">Spot Color (Pantone)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Number of Pages">
                    <Input
                      type="number"
                      defaultValue={6}
                      className="h-10"
                      style={{ borderRadius: 8 }}
                    />
                  </FormField>
                  <FormField label="Bleed">
                    <Select defaultValue="3">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select bleed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No bleed</SelectItem>
                        <SelectItem value="3">3 mm</SelectItem>
                        <SelectItem value="5">5 mm</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
              </SectionAccordion>

              {/* Finishing Section */}
              <SectionAccordion
                title="Finishing"
                isOpen={sections.find((s) => s.id === "finishing")?.isOpen ?? true}
                onToggle={() => toggleSection("finishing")}
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Folding">
                    <Select defaultValue="tri-fold">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select folding" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="half-fold">Half Fold</SelectItem>
                        <SelectItem value="tri-fold">Tri-Fold</SelectItem>
                        <SelectItem value="z-fold">Z-Fold</SelectItem>
                        <SelectItem value="gate-fold">Gate Fold</SelectItem>
                        <SelectItem value="accordion">Accordion Fold</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Binding">
                    <Select defaultValue="none">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select binding" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="saddle-stitch">Saddle Stitch</SelectItem>
                        <SelectItem value="perfect-bind">Perfect Binding</SelectItem>
                        <SelectItem value="spiral">Spiral / Wire-O</SelectItem>
                        <SelectItem value="hardcover">Hardcover / Case Bind</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Lamination">
                    <Select defaultValue="none">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select lamination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="gloss-lam">Gloss Lamination</SelectItem>
                        <SelectItem value="matte-lam">Matte Lamination</SelectItem>
                        <SelectItem value="soft-touch">Soft Touch</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Coating">
                    <Select defaultValue="none">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select coating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="uv-spot">UV Spot</SelectItem>
                        <SelectItem value="uv-flood">UV Flood</SelectItem>
                        <SelectItem value="aqueous">Aqueous Coating</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Die Cutting">
                    <Select defaultValue="none">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select die cutting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="standard">Standard Die Cut</SelectItem>
                        <SelectItem value="custom">Custom Die Cut</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Embossing / Foil">
                    <Select defaultValue="none">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="emboss">Embossing</SelectItem>
                        <SelectItem value="deboss">Debossing</SelectItem>
                        <SelectItem value="foil-gold">Gold Foil</SelectItem>
                        <SelectItem value="foil-silver">Silver Foil</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
              </SectionAccordion>

              {/* Pricing Section */}
              <SectionAccordion
                title="Pricing"
                isOpen={sections.find((s) => s.id === "pricing")?.isOpen ?? true}
                onToggle={() => toggleSection("pricing")}
              >
                <div className="space-y-4">
                  <div
                    className="overflow-hidden"
                    style={{ borderRadius: 8, border: "1px solid #E6E6E6" }}
                  >
                    <table className="w-full" style={{ borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "#F7F7F7" }}>
                          <th
                            className="text-left px-4 py-2.5"
                            style={{ fontSize: 12, fontWeight: 500, color: "#6B6B6B", borderBottom: "1px solid #E6E6E6", letterSpacing: "0.32px" }}
                          >
                            Item
                          </th>
                          <th
                            className="text-right px-4 py-2.5"
                            style={{ fontSize: 12, fontWeight: 500, color: "#6B6B6B", borderBottom: "1px solid #E6E6E6", letterSpacing: "0.32px" }}
                          >
                            Quantity
                          </th>
                          <th
                            className="text-right px-4 py-2.5"
                            style={{ fontSize: 12, fontWeight: 500, color: "#6B6B6B", borderBottom: "1px solid #E6E6E6", letterSpacing: "0.32px" }}
                          >
                            Unit Cost
                          </th>
                          <th
                            className="text-right px-4 py-2.5"
                            style={{ fontSize: 12, fontWeight: 500, color: "#6B6B6B", borderBottom: "1px solid #E6E6E6", letterSpacing: "0.32px" }}
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2.5 text-sm" style={{ borderBottom: "1px solid #E6E6E6", color: "#212121" }}>
                            Printing (4/4 CMYK)
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right" style={{ borderBottom: "1px solid #E6E6E6", color: "#525252" }}>
                            5,000
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right" style={{ borderBottom: "1px solid #E6E6E6", color: "#525252" }}>
                            EUR 0.12
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right font-medium" style={{ borderBottom: "1px solid #E6E6E6", color: "#212121" }}>
                            EUR 600.00
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 text-sm" style={{ borderBottom: "1px solid #E6E6E6", color: "#212121" }}>
                            Paper (200gsm Gloss)
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right" style={{ borderBottom: "1px solid #E6E6E6", color: "#525252" }}>
                            5,000
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right" style={{ borderBottom: "1px solid #E6E6E6", color: "#525252" }}>
                            EUR 0.08
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right font-medium" style={{ borderBottom: "1px solid #E6E6E6", color: "#212121" }}>
                            EUR 400.00
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 text-sm" style={{ borderBottom: "1px solid #E6E6E6", color: "#212121" }}>
                            Tri-Fold Finishing
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right" style={{ borderBottom: "1px solid #E6E6E6", color: "#525252" }}>
                            5,000
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right" style={{ borderBottom: "1px solid #E6E6E6", color: "#525252" }}>
                            EUR 0.03
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right font-medium" style={{ borderBottom: "1px solid #E6E6E6", color: "#212121" }}>
                            EUR 150.00
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 text-sm" style={{ color: "#212121" }}>
                            Make-ready & Setup
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right" style={{ color: "#525252" }}>
                            1
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right" style={{ color: "#525252" }}>
                            EUR 85.00
                          </td>
                          <td className="px-4 py-2.5 text-sm text-right font-medium" style={{ color: "#212121" }}>
                            EUR 85.00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Margin (%)">
                      <Input
                        type="number"
                        defaultValue={25}
                        className="h-10"
                        style={{ borderRadius: 8 }}
                      />
                    </FormField>
                    <FormField label="Discount (%)">
                      <Input
                        type="number"
                        defaultValue={0}
                        className="h-10"
                        style={{ borderRadius: 8 }}
                      />
                    </FormField>
                  </div>
                </div>
              </SectionAccordion>

              {/* Delivery Section */}
              <SectionAccordion
                title="Delivery"
                isOpen={sections.find((s) => s.id === "delivery")?.isOpen ?? false}
                onToggle={() => toggleSection("delivery")}
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Delivery Date">
                    <Input
                      type="date"
                      defaultValue="2026-03-28"
                      className="h-10"
                      style={{ borderRadius: 8 }}
                    />
                  </FormField>
                  <FormField label="Shipping Method">
                    <Select defaultValue="standard">
                      <SelectTrigger className="h-10" style={{ borderRadius: 8 }}>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Shipping</SelectItem>
                        <SelectItem value="express">Express Shipping</SelectItem>
                        <SelectItem value="overnight">Overnight</SelectItem>
                        <SelectItem value="pickup">Customer Pickup</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <div className="col-span-2">
                    <FormField label="Delivery Address">
                      <Textarea
                        placeholder="Enter delivery address..."
                        defaultValue="DesignWorks GmbH
Maximilianstrasse 42
80538 Munich, Germany"
                        rows={3}
                        style={{ borderRadius: 8 }}
                      />
                    </FormField>
                  </div>
                </div>
              </SectionAccordion>

              {/* Notes Section */}
              <SectionAccordion
                title="Notes"
                isOpen={sections.find((s) => s.id === "notes")?.isOpen ?? false}
                onToggle={() => toggleSection("notes")}
              >
                <div className="space-y-4">
                  <FormField label="Internal Notes">
                    <Textarea
                      placeholder="Notes visible only to your team..."
                      rows={3}
                      style={{ borderRadius: 8 }}
                    />
                  </FormField>
                  <FormField label="Customer Notes">
                    <Textarea
                      placeholder="Notes visible on the estimate PDF..."
                      rows={3}
                      style={{ borderRadius: 8 }}
                    />
                  </FormField>
                </div>
              </SectionAccordion>

              {/* Spacer at bottom to clear sticky pricing */}
              <div style={{ height: 100 }} />
            </div>
          </div>

          {/* Sticky pricing summary */}
          <div
            className="shrink-0 px-6 py-4 flex items-center justify-between"
            style={{
              borderTop: "1px solid #E6E6E6",
              background: "#FFFFFF",
            }}
          >
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs font-medium" style={{ color: "#8A8A8A", letterSpacing: "0.32px" }}>
                  Subtotal
                </div>
                <div className="text-sm font-medium" style={{ color: "#525252" }}>
                  EUR 1,235.00
                </div>
              </div>
              <div>
                <div className="text-xs font-medium" style={{ color: "#8A8A8A", letterSpacing: "0.32px" }}>
                  Margin (25%)
                </div>
                <div className="text-sm font-medium" style={{ color: "#29845A" }}>
                  + EUR 308.75
                </div>
              </div>
              <div>
                <div className="text-xs font-medium" style={{ color: "#8A8A8A", letterSpacing: "0.32px" }}>
                  VAT (19%)
                </div>
                <div className="text-sm font-medium" style={{ color: "#525252" }}>
                  EUR 293.31
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium" style={{ color: "#8A8A8A", letterSpacing: "0.32px" }}>
                Total (incl. VAT)
              </div>
              <div className="text-xl font-semibold" style={{ color: "#212121" }}>
                EUR 1,837.06
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   Sub-components
   ------------------------------------------------------------------------- */

function SectionAccordion({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        borderRadius: 8,
        border: "1px solid #E6E6E6",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-[#F7F7F7]"
        style={{
          background: isOpen ? "#F7F7F7" : "#FFFFFF",
          border: "none",
          cursor: "pointer",
          borderBottom: isOpen ? "1px solid #E6E6E6" : "none",
        }}
      >
        <span
          className="text-sm font-medium"
          style={{ color: "#212121", letterSpacing: "0.16px" }}
        >
          {title}
        </span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" style={{ color: "#6B6B6B" }} />
        ) : (
          <ChevronRight className="h-4 w-4" style={{ color: "#6B6B6B" }} />
        )}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  )
}

function FormField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-medium"
        style={{ color: "#383838", letterSpacing: "0.32px" }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}
