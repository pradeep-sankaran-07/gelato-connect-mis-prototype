"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Screen =
  // Top-level
  | "dashboard"
  | "performance"
  // Customers
  | "customers"
  | "customer-detail"
  | "customer-portal"
  | "portal-order-detail"
  | "portal-proof-review"
  | "portal-invoice-list"
  | "portal-reorder"
  | "portal-support"
  | "portal-account"
  // Estimates
  | "estimates"
  | "estimate-detail"
  | "create-estimate"
  | "estimate-setup"
  // Orders
  | "orders"
  | "order-detail"
  | "scheduling"
  // Production
  | "production-tracker"
  | "production-stations"
  | "outsourcing"
  | "outsource-tracking"
  | "vendor-detail"
  | "purchase-order-detail"
  | "imposition"
  | "imposition-editor"
  // Logistics
  | "logistics-analytics"
  | "shipments"
  | "shipment-detail"
  // Inventory
  | "inventory"
  | "inventory-allocation"
  // Finance
  | "invoices"
  | "invoice-detail"
  | "erp-integration"
  | "data-export"
  // Settings
  | "workflow-config"
  | "workflow-editor"
  | "job-ticket-templates"
  | "template-editor"
  | "communication-templates"
  | "communication-template-editor"
  | "shipping-rate-tables"
  | "carrier-accounts"
  | "vendor-management"
  | "machine-park"
  | "machine-detail"
  // Sub-screens
  | "job-ticket-detail"
  | "manual-job-ticket"
  | "reprint"

interface NavigationState {
  currentScreen: Screen
  params: Record<string, string>
  history: Array<{ screen: Screen; params: Record<string, string> }>
}

interface NavigationContextType {
  currentScreen: Screen
  params: Record<string, string>
  navigateTo: (screen: Screen, params?: Record<string, string>) => void
  goBack: () => void
  canGoBack: boolean
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavigationState>({
    currentScreen: "dashboard",
    params: {},
    history: [],
  })

  const navigateTo = useCallback((screen: Screen, params: Record<string, string> = {}) => {
    setState((prev) => ({
      currentScreen: screen,
      params,
      history: [...prev.history, { screen: prev.currentScreen, params: prev.params }],
    }))
  }, [])

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.history.length === 0) return prev
      const last = prev.history[prev.history.length - 1]
      return {
        currentScreen: last.screen,
        params: last.params,
        history: prev.history.slice(0, -1),
      }
    })
  }, [])

  return (
    <NavigationContext.Provider
      value={{
        currentScreen: state.currentScreen,
        params: state.params,
        navigateTo,
        goBack,
        canGoBack: state.history.length > 0,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error("useNavigation must be used within NavigationProvider")
  return ctx
}
