"use client"

import { useNavigation, type Screen } from "@/lib/navigation-context"
import { LogOut, ChevronDown, ArrowLeft } from "lucide-react"
import { useState } from "react"

const navItems: { label: string; screen: Screen }[] = [
  { label: "Dashboard", screen: "customer-portal" },
  { label: "Orders", screen: "portal-order-detail" },
  { label: "Invoices", screen: "portal-invoice-list" },
  { label: "Support", screen: "portal-support" },
]

const mockCustomers = [
  { id: "acme", name: "Acme Corp", contact: "John Smith" },
  { id: "beta", name: "Beta Solutions", contact: "Sarah Chen" },
  { id: "gamma", name: "Gamma Industries", contact: "Marcus Lee" },
  { id: "nordic", name: "Nordic Media", contact: "Erik Lindqvist" },
  { id: "studio", name: "Studio Brava", contact: "Isabella Rossi" },
]

export type PortalCustomer = (typeof mockCustomers)[number]

export { mockCustomers }

export default function PortalHeader({
  activeScreen,
  selectedCustomer,
  onCustomerChange,
}: {
  activeScreen?: Screen
  selectedCustomer: PortalCustomer
  onCustomerChange: (customer: PortalCustomer) => void
}) {
  const { navigateTo, currentScreen } = useNavigation()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const active = activeScreen || currentScreen

  return (
    <header className="bg-white border-b border-neutral-20 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        {/* Left: Back + Logo + Title + Customer Selector */}
        <div className="flex items-center gap-3">
          {/* Back to MIS button */}
          <button
            onClick={() => navigateTo("dashboard")}
            className="flex items-center gap-1.5 text-sm text-neutral-60 hover:text-neutral-100 transition-colors mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to MIS</span>
          </button>

          <div className="w-px h-6 bg-neutral-20" />

          {/* Logo + Portal Title */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigateTo("customer-portal")}
          >
            <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-neutral-100 leading-tight">
                {selectedCustomer.name} Portal
              </span>
              <span className="text-[10px] text-neutral-50 leading-tight">
                Powered by Premium Print Co.
              </span>
            </div>
          </div>

          <div className="w-px h-6 bg-neutral-20 ml-1" />

          {/* Customer Selector */}
          <select
            value={selectedCustomer.id}
            onChange={(e) => {
              const customer = mockCustomers.find((c) => c.id === e.target.value)
              if (customer) onCustomerChange(customer)
            }}
            className="h-8 px-2 pr-7 text-xs font-medium text-neutral-70 bg-neutral-5 border border-neutral-20 rounded-md cursor-pointer hover:border-neutral-40 transition-colors focus:outline-none focus:ring-1 focus:ring-neutral-40 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_6px_center]"
          >
            {mockCustomers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = active === item.screen
            return (
              <button
                key={item.screen}
                onClick={() => navigateTo(item.screen)}
                className={`relative px-4 py-4 text-sm transition-colors ${
                  isActive
                    ? "text-neutral-100 font-medium"
                    : "text-neutral-60 hover:text-neutral-90"
                }`}
              >
                {item.label}
                {isActive && (
                  <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-neutral-100 rounded-t-sm" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Right: User */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 text-sm text-neutral-70 hover:text-neutral-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-10 flex items-center justify-center text-xs font-semibold text-primary-90">
              {selectedCustomer.contact
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="font-medium text-neutral-90">{selectedCustomer.contact}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-neutral-20 rounded-lg shadow-lg z-50 py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    navigateTo("portal-account")
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-70 hover:bg-neutral-5 transition-colors"
                >
                  Account Settings
                </button>
                <div className="border-t border-neutral-20 my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    navigateTo("dashboard")
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-70 hover:bg-neutral-5 transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Back to MIS
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
