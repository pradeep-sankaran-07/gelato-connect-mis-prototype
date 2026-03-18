"use client"
import { BarChart2, Layers, Users, FileText, Package, Box, Calendar, Activity, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LeftMenuProps {
  activePage: string
  onNavigate: (page: string) => void
}

const sectionAccents: Record<string, string> = {
  Orders: "border-l-sidebar-accent-orders",
  Production: "border-l-sidebar-accent-production",
  Logistics: "border-l-sidebar-accent-logistics",
  Inventory: "border-l-sidebar-accent-inventory",
}

export default function ProductionLeftMenu({ activePage, onNavigate }: LeftMenuProps) {
  const menuItems = [
    {
      section: null,
      items: [
        { id: "control-panel", label: "Control Panel", icon: BarChart2 },
        { id: "performance", label: "Performance", icon: Layers },
        { id: "customers", label: "Customers", icon: Users },
        { id: "estimates", label: "Estimates", icon: FileText },
      ],
    },
    {
      section: "Orders",
      items: [
        { id: "orders", label: "Manage Orders", icon: Package },
        { id: "scheduling", label: "Scheduling", icon: Calendar },
      ],
    },
    {
      section: "Production",
      items: [
        { id: "production-tracker", label: "Production Tracker", icon: Activity },
        { id: "production-stations", label: "Production Stations", icon: Settings },
      ],
    },
    {
      section: "Logistics",
      items: [
        { id: "logistics-analytics", label: "Analytics", icon: BarChart2 },
        { id: "shipments", label: "Shipments", icon: Package, badge: 5 },
      ],
    },
    {
      section: "Inventory",
      items: [
        { id: "inventory", label: "Inventory Management", icon: Package, badge: 3 },
        { id: "allocation", label: "Inventory Allocation", icon: Box },
      ],
    },
  ]

  return (
    <div className="w-[280px] min-w-[280px] bg-neutral-100 p-4 overflow-y-auto flex flex-col">
      <div className="space-y-1">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className={section.section ? `border-l-2 ${sectionAccents[section.section] || "border-l-neutral-70"} ml-2 pl-1` : ""}>
            {section.section && (
              <div className="mt-4 mb-2 px-3 text-[11px] font-semibold text-neutral-50 uppercase tracking-wider">{section.section}</div>
            )}
            {section.items.map((item) => {
              const isActive = activePage === item.id
              return (
                <div
                  key={item.id}
                  className={`px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                    isActive
                      ? "bg-white text-neutral-100 font-medium"
                      : "text-neutral-30 hover:bg-white/10 hover:text-white"
                  } cursor-pointer flex items-center`}
                  onClick={() => onNavigate(item.id)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                  {item.badge && <Badge className="ml-auto bg-critical-60 text-white">{item.badge}</Badge>}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
