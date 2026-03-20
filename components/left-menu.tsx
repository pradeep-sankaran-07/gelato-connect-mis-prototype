"use client"

import { useState, useMemo } from "react"
import {
  BarChart2, Users, FileText, Package, Calendar, Activity,
  Settings, Truck, Warehouse, ClipboardList,
  Monitor, LayoutGrid, Printer, HardDrive,
  Mail, Database, FileDown, Globe, Send, UserCircle,
  ChevronDown, ChevronRight, Search, DollarSign, Layers
} from "lucide-react"
import { useNavigation, type Screen } from "@/lib/navigation-context"

interface MenuItem {
  id: Screen
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface MenuSection {
  section: string
  accentColor?: string
  items: MenuItem[]
}

const menuSections: MenuSection[] = [
  {
    section: "Menu",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
      { id: "performance", label: "Performance", icon: BarChart2 },
      { id: "orders", label: "Manage Orders", icon: Package },
      { id: "scheduling", label: "Scheduling", icon: Calendar },
      { id: "customer-portal", label: "Customer Portal", icon: Globe },
    ],
  },
  {
    section: "Estimates",
    accentColor: "#B39DDB",
    items: [
      { id: "estimates", label: "Manage Estimates", icon: FileText },
      { id: "estimate-setup", label: "Estimate Setup", icon: Settings },
    ],
  },
  {
    section: "Procurement",
    accentColor: "#FF788F",
    items: [
      { id: "inventory", label: "Inventory Management", icon: Warehouse },
      { id: "inventory-allocation", label: "Inventory Allocation", icon: ClipboardList },
      { id: "outsourcing", label: "Outsourcing", icon: Send },
      { id: "vendor-management", label: "Vendor Management", icon: UserCircle },
    ],
  },
  {
    section: "Workflow",
    accentColor: "#FFD966",
    items: [
      { id: "production-tracker", label: "Production Tracker", icon: Activity },
      { id: "production-stations", label: "Production Stations", icon: Monitor },
      { id: "imposition", label: "Imposition", icon: Layers },
      { id: "workflow-config", label: "Workflow Config", icon: Settings },
      { id: "job-ticket-templates", label: "Job Ticket Templates", icon: Printer },
      { id: "machine-park", label: "Machine Park", icon: HardDrive },
    ],
  },
  {
    section: "Logistics",
    accentColor: "#6BC4E8",
    items: [
      { id: "logistics-analytics", label: "Analytics", icon: BarChart2 },
      { id: "shipments", label: "Shipments", icon: Truck },
      { id: "carrier-accounts", label: "Carrier Accounts", icon: Globe },
      { id: "shipping-rate-tables", label: "Shipping Rates", icon: Truck },
    ],
  },
  {
    section: "System Settings",
    items: [
      { id: "customers", label: "Customer List", icon: Users },
      { id: "communication-templates", label: "Communication", icon: Mail },
      { id: "invoices", label: "Invoices", icon: DollarSign },
      { id: "erp-integration", label: "ERP Integration", icon: Database },
      { id: "data-export", label: "Data Export", icon: FileDown },
    ],
  },
]

// Map sub-screens to their parent menu item for active highlighting
const parentMap: Partial<Record<Screen, Screen>> = {
  "estimate-detail": "estimates",
  "order-detail": "orders",
  "vendor-detail": "outsourcing",
  "shipment-detail": "shipments",
  "invoice-detail": "invoices",
  "machine-detail": "machine-park",
  "imposition-editor": "imposition",
  "workflow-editor": "workflow-config",
  "template-editor": "job-ticket-templates",
  "communication-template-editor": "communication-templates",
  "purchase-order-detail": "outsourcing",
  "customer-detail": "customers",
  "job-ticket-detail": "orders",
  "manual-job-ticket": "orders",
  "reprint": "orders",
  "portal-order-detail": "customer-portal",
  "portal-proof-review": "customer-portal",
  "portal-invoice-list": "customer-portal",
  "portal-reorder": "customer-portal",
  "portal-support": "customer-portal",
  "portal-account": "customer-portal",
  "outsource-tracking": "outsourcing",
}

export default function LeftMenu() {
  const { currentScreen, navigateTo } = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})

  const activeId = parentMap[currentScreen] || currentScreen

  const toggleSection = (sectionName: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }))
  }

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return menuSections

    const query = searchQuery.toLowerCase()
    return menuSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.label.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.items.length > 0)
  }, [searchQuery])

  return (
    <div className="w-[280px] min-w-[280px] bg-[#212121] flex flex-col overflow-hidden">
      {/* Logo area */}
      <div className="px-3 pt-4 pb-3">
        <img
          src="/gelato-connect-logo.svg"
          alt="GelatoConnect"
          className="h-[22px] w-auto"
        />
      </div>

      {/* Search bar */}
      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[14px] w-[14px] text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-full text-sm text-gray-900 pl-8 pr-3 py-1.5 placeholder:text-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 pb-2">
        {filteredSections.map((section) => {
          const isCollapsed = collapsedSections[section.section]
          const hasAccent = !!section.accentColor

          return (
            <div key={section.section} className="mt-3 first:mt-0">
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.section)}
                className="w-full flex items-center gap-1.5 mb-1 group cursor-pointer bg-transparent border-none outline-none"
                style={{
                  paddingLeft: hasAccent ? "0" : "0",
                }}
              >
                {hasAccent && (
                  <div
                    className="w-[4px] self-stretch rounded-full flex-shrink-0"
                    style={{ backgroundColor: section.accentColor }}
                  />
                )}
                <div className="flex items-center flex-1 px-1">
                  <span className="uppercase font-bold text-xs tracking-wider text-[#999999] select-none">
                    {section.section}
                  </span>
                  <span className="ml-auto text-[#999999] transition-transform duration-150">
                    {isCollapsed ? (
                      <ChevronRight className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </span>
                </div>
              </button>

              {/* Section items */}
              {!isCollapsed && (
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = activeId === item.id
                    return (
                      <div
                        key={item.id}
                        className={`py-2 px-3 rounded-md text-sm transition-colors duration-150 cursor-pointer flex items-center gap-3 ${
                          isActive
                            ? "bg-white text-[#212121] font-medium"
                            : "text-[#F7F7F7] hover:bg-[#525252]"
                        }`}
                        onClick={() => navigateTo(item.id)}
                      >
                        <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-white/10 flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-[#9c77ac] text-white flex items-center justify-center text-[11px] font-medium flex-shrink-0">
          PS
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-[12px] font-medium truncate">Premium Print Co.</div>
          <div className="text-[#999999] text-[11px]">&#127468;&#127463; United Kingdom</div>
        </div>
      </div>
    </div>
  )
}
