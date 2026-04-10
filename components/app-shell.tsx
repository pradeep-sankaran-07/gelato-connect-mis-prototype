"use client"

import { NavigationProvider, useNavigation } from "@/lib/navigation-context"
import LeftMenu from "@/components/left-menu"
import Header from "@/components/header"

import ManageEstimates from "@/components/manage-estimates"
import EstimateDetails from "@/components/estimate-details"
import CreateEstimate from "@/components/create-estimate"
import EstimateSetup from "@/components/estimates/estimate-setup"
import InventoryManagement from "@/components/inventory-management"
import InventoryAllocation from "@/components/inventory-allocation"
import ManageOrders from "@/components/manage-orders"
import OrderDetails from "@/components/order-details"
import Scheduling from "@/components/scheduling"
import ProductionTracker from "@/components/production-tracker"
import ProductionStations from "@/components/production-stations"
import LogisticsAnalytics from "@/components/logistics-analytics"
import Shipments from "@/components/shipments"
import Performance from "@/components/performance"
import CustomerManagement from "@/components/customer-management"
import TemplateManagement from "@/components/template-management"
import TemplateEditor from "@/components/template-editor"
import InvoiceManagement from "@/components/invoice-management"
import InvoiceDetails from "@/components/invoice-details"
import OperationsDashboard from "@/components/operations-dashboard"
import WorkflowTemplateList from "@/components/workflow/workflow-template-list"
import WorkflowTemplateEditor from "@/components/workflow/workflow-template-editor"
import ImpositionTemplates from "@/components/imposition/imposition-templates"
import ImpositionEditor from "@/components/imposition/imposition-editor"
import OutsourceTracking from "@/components/outsourcing/outsource-tracking"
import VendorManagement from "@/components/outsourcing/vendor-management"
import VendorDetail from "@/components/outsourcing/vendor-detail"
import PurchaseOrderDetail from "@/components/outsourcing/purchase-order-detail"
import ShipmentDetailView from "@/components/shipping/shipment-detail-view"
import CarrierAccounts from "@/components/settings/carrier-accounts"
import ShippingRateTables from "@/components/settings/shipping-rate-tables"
import ERPIntegrationSettings from "@/components/erp/erp-integration-settings"
import CustomerPortalDashboard from "@/components/customer-portal/portal-dashboard"
import PortalOrderDetail from "@/components/customer-portal/portal-order-detail"
import PortalProofReview from "@/components/customer-portal/portal-proof-review"
import PortalInvoiceList from "@/components/customer-portal/portal-invoice-list"
import PortalReorder from "@/components/customer-portal/portal-reorder"
import PortalSupport from "@/components/customer-portal/portal-support"
import PortalAccountSettings from "@/components/customer-portal/portal-account-settings"
import DataExport from "@/components/export/data-export"
import MachinePark from "@/components/machines/machine-park"
import MachineDetail from "@/components/machines/machine-detail"
import CommunicationSettings from "@/components/communication/communication-settings"
import NotificationTemplateEditor from "@/components/communication/notification-template-editor"
import ConvertToOrder from "@/components/convert-to-order"

function AppContent() {
  const { currentScreen, params } = useNavigation()

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <OperationsDashboard />
      case "performance":
        return <Performance />
      case "customers":
      case "customer-detail":
        return <CustomerManagement />
      case "customer-portal":
        return <CustomerPortalDashboard />
      case "portal-order-detail":
        return <PortalOrderDetail />
      case "portal-proof-review":
        return <PortalProofReview />
      case "portal-invoice-list":
        return <PortalInvoiceList />
      case "portal-reorder":
        return <PortalReorder />
      case "portal-support":
        return <PortalSupport />
      case "portal-account":
        return <PortalAccountSettings />
      case "estimates":
        return <ManageEstimates />
      case "estimate-detail":
        return <EstimateDetails />
      case "create-estimate":
        return <CreateEstimate />
      case "estimate-setup":
        return <EstimateSetup />
      case "convert-to-order":
        return <ConvertToOrder estimateId={params.estimateId || ""} />
      case "orders":
        return <ManageOrders />
      case "order-detail":
        return <OrderDetails orderId={params.orderId || "j-18-pc-5000"} />
      case "scheduling":
        return <Scheduling />
      case "production-tracker":
        return <ProductionTracker />
      case "production-stations":
        return <ProductionStations />
      case "outsourcing":
      case "outsource-tracking":
        return <OutsourceTracking />
      case "vendor-detail":
        return <VendorDetail />
      case "purchase-order-detail":
        return <PurchaseOrderDetail />
      case "imposition":
        return <ImpositionTemplates />
      case "imposition-editor":
        return <ImpositionEditor />
      case "logistics-analytics":
        return <LogisticsAnalytics />
      case "shipments":
        return <Shipments />
      case "shipment-detail":
        return <ShipmentDetailView />
      case "inventory":
        return <InventoryManagement />
      case "inventory-allocation":
        return <InventoryAllocation />
      case "invoices":
        return <InvoiceManagement />
      case "invoice-detail":
        return <InvoiceDetails invoiceId={params.invoiceId || ""} />
      case "erp-integration":
        return <ERPIntegrationSettings />
      case "data-export":
        return <DataExport />
      case "workflow-config":
        return <WorkflowTemplateList />
      case "workflow-editor":
        return <WorkflowTemplateEditor />
      case "job-ticket-templates":
        return <TemplateManagement />
      case "template-editor":
        return <TemplateEditor templateId={params.templateId || ""} />
      case "communication-templates":
        return <CommunicationSettings />
      case "communication-template-editor":
        return <NotificationTemplateEditor />
      case "shipping-rate-tables":
        return <ShippingRateTables />
      case "carrier-accounts":
        return <CarrierAccounts />
      case "vendor-management":
        return <VendorManagement />
      case "machine-park":
        return <MachinePark />
      case "machine-detail":
        return <MachineDetail />
      case "job-ticket-detail":
      case "manual-job-ticket":
      case "reprint":
        return <OrderDetails orderId={params.orderId || ""} />
      default:
        return <OperationsDashboard />
    }
  }

  const isPortalScreen = currentScreen.startsWith("portal-") || currentScreen === "customer-portal"

  // Portal screens get isolated rendering (no sidebar/header)
  if (isPortalScreen) {
    return (
      <div className="min-h-screen bg-neutral-5">
        {renderScreen()}
      </div>
    )
  }

  // Create-estimate and estimate-setup get full-screen isolated rendering (they have their own sidebars)
  if (currentScreen === "create-estimate" || currentScreen === "estimate-setup") {
    return (
      <div className="h-screen w-screen bg-neutral-5">
        {renderScreen()}
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <LeftMenu />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-4">
          {renderScreen()}
        </div>
      </div>
    </div>
  )
}

export default function AppShell() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  )
}
