"use client"

import { useState, useEffect } from "react"
import OutlookInterface from "@/components/outlook-interface"
import ManageEstimates from "@/components/manage-estimates"
import EstimateDetails from "@/components/estimate-details"
import CreateEstimate from "@/components/create-estimate"
import InventoryManagement from "@/components/inventory-management"
import InventoryAllocation from "@/components/inventory-allocation"
import ManageOrders from "@/components/manage-orders"
import OrderDetails from "@/components/order-details"
import Scheduling from "@/components/scheduling"
import ProductionTracker from "@/components/production-tracker"
import ProductionStations from "@/components/production-stations"
// Add imports for the new components
import LogisticsAnalytics from "@/components/logistics-analytics"
import Shipments from "@/components/shipments"
import Performance from "@/components/performance"
import CustomerManagement from "@/components/customer-management"
import TemplateManagement from "@/components/template-management"
import TemplateEditor from "@/components/template-editor"
import InvoiceManagement from "@/components/invoice-management"
import InvoiceDetails from "@/components/invoice-details"

// Add state variables for the new pages
export default function WorkflowDemo() {
  // Change initial state from 0 to 1 to start on Manage Estimates
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOrderId, setSelectedOrderId] = useState("j-18-pc-5000")
  const [isAutomatedExample, setIsAutomatedExample] = useState(true)
  const [selectedTemplateId, setSelectedTemplateId] = useState("")
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("")

  // Listen for the custom event to navigate to Order Details
  useEffect(() => {
    const handleNavigateToOrderDetails = (event: CustomEvent) => {
      if (event.detail && event.detail.orderId) {
        setSelectedOrderId(event.detail.orderId)
      }
      setCurrentStep(7) // Navigate to Order Details
    }

    window.addEventListener("navigateToOrderDetails", handleNavigateToOrderDetails as EventListener)

    // Check if the URL has a hash for order-details
    if (window.location.hash === "#order-details") {
      setCurrentStep(7)
    }

    // Check if the URL has a hash for scheduling
    if (window.location.hash === "#scheduling") {
      setCurrentStep(8)
    }

    return () => {
      window.removeEventListener("navigateToOrderDetails", handleNavigateToOrderDetails as EventListener)
    }
  }, [])

  const goToManageEstimates = () => {
    console.log("Going to Manage Estimates")
    setCurrentStep(1)
  }

  const goToEstimateDetails = () => {
    console.log("Going to Estimate Details")
    setCurrentStep(2)
  }

  const goToCreateEstimate = () => {
    console.log("Creating new estimate")
    setCurrentStep(3)
  }

  const goToInventory = () => {
    console.log("Going to Inventory Management")
    setCurrentStep(4)
  }

  const goToInventoryAllocation = () => {
    console.log("Going to Inventory Allocation")
    setCurrentStep(5)
  }

  const goToOutlook = () => {
    console.log("Going to Outlook")
    setCurrentStep(0)
  }

  const goToOrderManagement = () => {
    console.log("Going to Order Management")
    setCurrentStep(6)
  }

  const goToOrderDetails = (orderId: string) => {
    console.log("Going to Order Details for order:", orderId)
    setSelectedOrderId(orderId)
    setCurrentStep(7)
  }

  const goToScheduling = () => {
    console.log("Going to Scheduling")
    setCurrentStep(8)
  }

  const goToProductionTracker = () => {
    console.log("Going to Production Tracker")
    setCurrentStep(9)
  }

  const goToProductionStations = () => {
    console.log("Going to Production Stations")
    setCurrentStep(10)
  }

  const toggleOrderExample = () => {
    // Toggle between automated and manual examples
    setIsAutomatedExample(!isAutomatedExample)
    // Set the appropriate order ID based on the example type
    setSelectedOrderId(isAutomatedExample ? "j-19-sb-2500" : "j-18-pc-5000")
  }

  // Add navigation functions for all menu items
  const goToControlPanel = () => {
    console.log("Going to Control Panel")
    setCurrentStep(1) // For now, redirect to Manage Estimates as a placeholder
  }

  const goToPerformance = () => {
    console.log("Going to Performance")
    setCurrentStep(13) // Navigate to Performance Dashboard
  }

  const goToCustomers = () => {
    console.log("Going to Customers")
    setCurrentStep(14) // Navigate to Customer Management
  }

  // Add navigation functions for the new pages
  const goToLogisticsAnalytics = () => {
    console.log("Going to Logistics Analytics")
    setCurrentStep(11)
  }

  const goToShipments = () => {
    console.log("Going to Shipments")
    setCurrentStep(12)
  }

  const goToTemplateSettings = () => {
    console.log("Going to Template Settings")
    setCurrentStep(15)
  }

  const goToTemplateEditor = (templateId: string) => {
    console.log("Going to Template Editor for template:", templateId)
    setSelectedTemplateId(templateId)
    setCurrentStep(16)
  }

  const goToInvoices = () => {
    console.log("Going to Invoices")
    setCurrentStep(17)
  }

  const goToInvoiceDetails = (invoiceId: string) => {
    console.log("[v0] goToInvoiceDetails called with invoiceId:", invoiceId)
    console.log("[v0] Setting selectedInvoiceId to:", invoiceId)
    console.log("[v0] Setting currentStep to: 18")
    setSelectedInvoiceId(invoiceId)
    setCurrentStep(18)
  }

  // Add the new components to the return statement
  return (
    <div className="min-h-screen bg-white">
      {currentStep === 0 && <OutlookInterface onEstimateClick={goToEstimateDetails} />}
      {currentStep === 1 && (
        <ManageEstimates
          onEstimateClick={goToEstimateDetails}
          onBackClick={goToOutlook}
          onCreateClick={goToCreateEstimate}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 2 && (
        <EstimateDetails
          onBackClick={goToManageEstimates}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 3 && (
        <CreateEstimate
          onBackClick={goToManageEstimates}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 4 && (
        <InventoryManagement
          onBackClick={goToManageEstimates}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 5 && (
        <InventoryAllocation
          onBackClick={goToManageEstimates}
          onInventoryClick={goToInventory}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 6 && (
        <ManageOrders
          onBackClick={goToManageEstimates}
          onOrderClick={goToOrderDetails}
          onSchedulingClick={goToScheduling}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
          onInvoicesClick={goToInvoices}
        />
      )}
      {currentStep === 7 && (
        <OrderDetails
          orderId={selectedOrderId}
          onBackClick={() => goToOrderManagement()}
          isAutomatedExample={isAutomatedExample}
          onToggleExample={toggleOrderExample}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 8 && (
        <Scheduling
          onBackClick={goToOrderManagement}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 9 && (
        <ProductionTracker
          onBackClick={goToManageEstimates}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 10 && (
        <ProductionStations
          onBackClick={goToManageEstimates}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 11 && (
        <LogisticsAnalytics
          onBackClick={goToManageEstimates}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 12 && (
        <Shipments
          onBackClick={goToManageEstimates}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 13 && (
        <Performance
          onBackClick={goToManageEstimates}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 14 && (
        <CustomerManagement
          onBackClick={goToManageEstimates}
          onInventoryClick={goToInventory}
          onInventoryAllocationClick={goToInventoryAllocation}
          onOrderClick={goToOrderManagement}
          onSchedulingClick={goToScheduling}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 15 && (
        <TemplateManagement onBackClick={goToOrderManagement} onEditTemplate={goToTemplateEditor} />
      )}
      {currentStep === 16 && <TemplateEditor templateId={selectedTemplateId} onBackClick={goToTemplateSettings} />}
      {currentStep === 17 && (
        <InvoiceManagement
          onBackClick={goToOrderManagement}
          onInvoiceClick={(invoiceId) => {
            console.log("[v0] Main page onInvoiceClick called with:", invoiceId)
            goToInvoiceDetails(invoiceId)
          }}
          onSchedulingClick={goToScheduling}
          onInventoryClick={goToInventory}
          onControlPanelClick={goToControlPanel}
          onPerformanceClick={goToPerformance}
          onCustomersClick={goToCustomers}
          onProductionTrackerClick={goToProductionTracker}
          onProductionStationsClick={goToProductionStations}
          onLogisticsAnalyticsClick={goToLogisticsAnalytics}
          onShipmentsClick={goToShipments}
          onTemplateSettingsClick={goToTemplateSettings}
        />
      )}
      {currentStep === 18 && (
        <InvoiceDetails
          invoiceId={selectedInvoiceId}
          onBackClick={() => {
            console.log("[v0] InvoiceDetails back button clicked")
            goToInvoices()
          }}
        />
      )}
    </div>
  )
}
