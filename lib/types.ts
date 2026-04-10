// ============================================================
// GelatoConnect MIS — Shared TypeScript Interfaces
// ============================================================

// --- Customers (PRD 13) ---
export type PricingTier = "Standard" | "Silver" | "Gold" | "Platinum"
export type PaymentTerms = "Net 15" | "Net 30" | "Net 45" | "Net 60" | "Due on Receipt" | "COD"
export type InvoiceTrigger = "automatic" | "days_after" | "consolidated"

export interface CustomerContact {
  id: string
  name: string
  email: string
  phone: string
  role: "primary" | "billing" | "production" | "shipping"
  isPrimary: boolean
}

export interface Customer {
  id: string
  name: string
  currency: string
  country: string
  countryFlag: string
  address: string
  pricingTier: PricingTier
  paymentTerms: PaymentTerms
  invoiceTrigger: InvoiceTrigger
  invoiceEmail: string
  contacts: CustomerContact[]
  salesRep: string
  estimationEnabled: boolean
  notificationPreferences: {
    orderConfirmation: boolean
    proofReady: boolean
    productionStarted: boolean
    shipped: boolean
    invoiceSent: boolean
  }
  notes: CustomerNote[]
  createdAt: string
}

export interface CustomerNote {
  id: string
  text: string
  author: string
  createdAt: string
}

// --- Estimates (PRD 1) ---
export type EstimateStatus = "Draft" | "Pending" | "Approved" | "Converted" | "Expired" | "Rejected"

export interface EstimateLineItem {
  id: string
  product: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Estimate {
  id: string
  title: string
  customerId: string
  customerName: string
  status: EstimateStatus
  createdAt: string
  expiresAt: string
  lineItems: EstimateLineItem[]
  subtotal: number
  tax: number
  total: number
  convertedOrderId?: string
  convertedAt?: string
  convertedBy?: string
  estimator: string
  notes: string
}

// --- Orders (PRD 1, 2, 2.1) ---
export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "In Production"
  | "Printed"
  | "Finishing"
  | "Ready to Ship"
  | "Shipped"
  | "Delivered"
  | "Completed"
  | "Cancelled"

export type OrderType = "job-based" | "manual" | "reprint"

export interface OrderAddress {
  id: string
  label: string
  name: string
  company: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  countryFlag: string
  quantity: number
}

export interface CustomCost {
  id: string
  description: string
  amount: number
  type: "rush" | "shipping" | "material" | "labor" | "other"
  addedBy: string
  addedAt: string
}

export interface OrderEditRecord {
  id: string
  field: string
  oldValue: string
  newValue: string
  editedBy: string
  editedAt: string
  reason: string
}

export interface Order {
  id: string
  customerOrderId: string
  customerId: string
  customerName: string
  estimateId?: string
  type: OrderType
  status: OrderStatus
  createdAt: string
  dueDate: string
  destination: string
  destinationFlag: string
  addresses: OrderAddress[]
  lineItems: OrderLineItem[]
  subtotal: number
  customCosts: CustomCost[]
  tax: number
  total: number
  specialInstructions: string
  editHistory: OrderEditRecord[]
  reprintOfOrderId?: string
  reprintReason?: string
  jobTicketId?: string
  proofStatus: "none" | "pending" | "sent" | "approved" | "rejected"
  fileStatus: "none" | "uploaded" | "preflight-pass" | "preflight-fail"
  notificationLog: NotificationEvent[]
}

export interface OrderLineItem {
  id: string
  product: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  specs: Record<string, string>
}

// --- Job Tickets (PRD 3) ---
export type JobTicketStatus = "Created" | "In Progress" | "Completed" | "On Hold" | "Cancelled"

export interface ProductionStep {
  id: string
  name: string
  sequence: number
  status: "pending" | "in-progress" | "completed" | "skipped" | "outsourced"
  assignedStation?: string
  estimatedDuration: number // minutes
  actualDuration?: number
  startedAt?: string
  completedAt?: string
  operatorName?: string
  notes: string
  annotations: StepAnnotation[]
  isParallel: boolean
  isOptional: boolean
  vendorId?: string
}

export interface JobTicketVersion {
  version: number
  changedAt: string
  changedBy: string
  changes: string
}

export interface JobTicket {
  id: string
  orderId: string
  orderNumber: string
  customerName: string
  product: string
  quantity: number
  status: JobTicketStatus
  workflowTemplateId: string
  steps: ProductionStep[]
  versions: JobTicketVersion[]
  currentVersion: number
  createdAt: string
  dueDate: string
  priority: "low" | "normal" | "high" | "urgent"
  specialInstructions: string
  aiSummary: string
  aiSummaryEdited: boolean
  aiSummaryEditHistory: AiSummaryEditRecord[]
  materials: MaterialRequirement[]
}

export interface StepAnnotation {
  id: string
  text: string
  author: string
  createdAt: string
  updatedAt?: string
}

export interface AiSummaryEditRecord {
  editedAt: string
  editedBy: string
  previousText: string
}

export interface MaterialRequirement {
  id: string
  materialId: string
  name: string
  specification: string
  quantityNeeded: number
  unit: string
  quantityAllocated: number
  status: "reserved" | "available" | "unavailable" | "ordered"
  supplier: string
  unitCost: number
  totalCost: number
}

// --- Workflow Templates (PRD NEW-2) ---
export interface WorkflowStep {
  id: string
  name: string
  type: "production" | "quality" | "finishing" | "packaging" | "shipping"
  estimatedDuration: number
  isParallel: boolean
  isOptional: boolean
  isConditional: boolean
  conditionField?: string
  conditionValue?: string
  color: string
}

export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: "Digital" | "Offset" | "Large Format" | "Packaging" | "Labels"
  steps: WorkflowStep[]
  productCategories: string[]
  isDefault: boolean
  createdAt: string
  updatedAt: string
  version: number
}

// --- Inventory (PRD 11, 19) ---
export type MaterialType = "paper" | "ink" | "finishing" | "substrate" | "packaging"

export interface InventoryItem {
  id: string
  name: string
  type: MaterialType
  specification: string
  unit: string
  onHand: number
  allocated: number
  available: number // onHand - allocated
  reorderPoint: number
  reorderQuantity: number
  supplier: string
  unitCost: number
  lastRestocked: string
  location: string
  // Advanced (PRD 19)
  lotNumber?: string
  batchNumber?: string
  serialNumbers?: string[]
  expirationDate?: string
  forecastedDemand?: number
}

export interface AllocationRecord {
  id: string
  materialId: string
  orderId: string
  orderNumber: string
  quantity: number
  allocatedAt: string
  allocatedBy: string
  status: "active" | "released" | "consumed"
}

export interface SupplierPO {
  id: string
  supplierId: string
  supplierName: string
  items: Array<{ materialId: string; materialName: string; quantity: number; unitCost: number }>
  status: "Draft" | "Sent" | "Confirmed" | "Shipped" | "Received"
  createdAt: string
  expectedDelivery: string
  total: number
}

// --- Vendors (PRD 8) ---
export interface VendorCapability {
  service: string
  description: string
  leadTimeDays: number
  minOrderValue: number
}

export interface VendorRateCard {
  id: string
  service: string
  unit: string
  tiers: Array<{ minQty: number; maxQty: number; rate: number }>
}

export interface Vendor {
  id: string
  name: string
  contactName: string
  email: string
  phone: string
  address: string
  capabilities: VendorCapability[]
  rateCards: VendorRateCard[]
  onTimePercentage: number
  qualityRating: number
  avgLeadTimeDays: number
  totalOrders: number
  status: "Active" | "Inactive" | "Pending"
}

export interface PurchaseOrder {
  id: string
  vendorId: string
  vendorName: string
  orderId: string
  orderNumber: string
  jobTicketId: string
  stepName: string
  specs: Record<string, string>
  quantity: number
  unitPrice: number
  total: number
  status: "Draft" | "Sent" | "In Progress" | "Shipped" | "Received" | "Completed"
  createdAt: string
  expectedDelivery: string
  actualCost?: number
  trackingNumber?: string
  notes: string
}

// --- Invoices (PRD 12) ---
export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Partial" | "Overdue" | "Void"

export interface InvoiceLineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  taxRate: number
}

export interface InvoicePayment {
  id: string
  amount: number
  method: "Check" | "ACH" | "Wire" | "Credit Card" | "Cash"
  reference: string
  date: string
  recordedBy: string
}

export interface CreditMemo {
  id: string
  invoiceId: string
  amount: number
  reason: string
  createdAt: string
  createdBy: string
}

export interface Invoice {
  id: string
  orderId: string
  orderNumber: string
  customerId: string
  customerName: string
  status: InvoiceStatus
  lineItems: InvoiceLineItem[]
  subtotal: number
  taxTotal: number
  total: number
  amountPaid: number
  amountDue: number
  createdAt: string
  dueDate: string
  sentAt?: string
  payments: InvoicePayment[]
  creditMemos: CreditMemo[]
  shippingCosts: Array<{ address: string; carrier: string; cost: number }>
}

// --- Shipments (PRD 9, 10, 18) ---
export type ShipmentType = "parcel" | "pallet" | "freight-ltl" | "freight-ftl"
export type ShipmentStatus = "Pending" | "Label Created" | "Picked Up" | "In Transit" | "Delivered" | "Exception"

export interface ShippingRate {
  carrier: string
  service: string
  rate: number
  transitDays: number
  guaranteed: boolean
}

export interface TrackingEvent {
  timestamp: string
  status: string
  location: string
  description: string
}

export interface Shipment {
  id: string
  orderId: string
  orderNumber: string
  addressId: string
  addressLabel: string
  destinationAddress: string
  type: ShipmentType
  status: ShipmentStatus
  carrier: string
  service: string
  trackingNumber: string
  weight: number
  dimensions: { length: number; width: number; height: number }
  shippingCost: number
  labelUrl?: string
  bolNumber?: string
  trackingEvents: TrackingEvent[]
  createdAt: string
  estimatedDelivery: string
  deliveredAt?: string
}

export interface ShippingRateTable {
  id: string
  carrier: string
  type: ShipmentType
  zones: Array<{
    origin: string
    destination: string
    zone: string
    rates: Array<{ minWeight: number; maxWeight: number; rate: number }>
    fuelSurcharge: number
  }>
}

export interface CarrierAccount {
  id: string
  carrier: string
  accountNumber: string
  isDefault: boolean
  status: "Active" | "Inactive"
  apiConnected: boolean
}

// --- Scheduling (PRD 16) ---
export interface Machine {
  id: string
  name: string
  type: "digital-press" | "offset-press" | "wide-format" | "cutter" | "folder" | "binder" | "laminator"
  status: "running" | "idle" | "maintenance" | "error" | "offline"
  capabilities: string[]
  substrates: string[]
  maxSheetSize: string
  setupTimeMinutes: number
  currentJobId?: string
  utilizationPercent: number
  location: string
}

export interface ScheduleBlock {
  id: string
  jobTicketId: string
  jobNumber: string
  customerName: string
  product: string
  machineId: string
  machineName: string
  startTime: string
  endTime: string
  status: "scheduled" | "in-progress" | "completed" | "delayed" | "conflict"
  priority: "low" | "normal" | "high" | "urgent"
  setupMinutes: number
  productionMinutes: number
  dryingMinutes: number
  color: string
}

export interface ScheduleConflict {
  id: string
  type: "overlap" | "substrate-mismatch" | "capacity-exceeded" | "deadline-risk"
  description: string
  affectedBlocks: string[]
  suggestion: string
  severity: "warning" | "critical"
}

// --- Imposition (PRD 17) ---
export interface ImpositionTemplate {
  id: string
  name: string
  description: string
  sheetSize: { width: number; height: number; unit: string }
  nUp: number
  rows: number
  cols: number
  bleed: number
  gripper: number
  gutterH: number
  gutterV: number
  method: "auto" | "manual" | "template"
  orientation: "portrait" | "landscape"
  createdAt: string
  updatedAt: string
}

export interface ImpositionResult {
  templateId: string
  sheetsRequired: number
  wastePercent: number
  totalSheetArea: number
  usedArea: number
  costPerSheet: number
  totalCost: number
  bom: Array<{ material: string; quantity: number; unit: string; unitCost: number; totalCost: number }>
}

// --- Analytics (PRD 20) ---
export interface JobProfitability {
  jobId: string
  jobNumber: string
  customerName: string
  product: string
  revenue: number
  materialCost: number
  laborCost: number
  outsourceCost: number
  overheadCost: number
  totalCost: number
  profit: number
  margin: number
  completedAt: string
}

export interface CustomerProfitability {
  customerId: string
  customerName: string
  totalRevenue: number
  totalCost: number
  profit: number
  margin: number
  orderCount: number
  avgOrderValue: number
  lastOrderDate: string
}

// --- Communications (PRD 5) ---
export type NotificationTrigger =
  | "order_confirmed"
  | "file_received"
  | "proof_ready"
  | "proof_reminder"
  | "production_started"
  | "shipped"
  | "invoice_sent"
  | "payment_received"

export interface NotificationTemplate {
  id: string
  trigger: NotificationTrigger
  name: string
  subject: string
  bodyHtml: string
  isActive: boolean
  variables: string[]
}

export interface NotificationEvent {
  id: string
  trigger: NotificationTrigger
  sentAt: string
  recipientEmail: string
  recipientName: string
  subject: string
  status: "sent" | "delivered" | "failed" | "opened"
}

// --- ERP Integration (PRD 14) ---
export type ERPProvider = "quickbooks" | "xero" | "sage"
export type SyncStatus = "success" | "error" | "pending" | "skipped"

export interface ERPConnection {
  provider: ERPProvider
  status: "connected" | "disconnected" | "error"
  companyName: string
  lastSyncAt: string
  connectedAt: string
}

export interface ERPFieldMapping {
  id: string
  misField: string
  erpField: string
  direction: "mis-to-erp" | "erp-to-mis" | "bidirectional"
  isRequired: boolean
}

export interface ERPSyncLog {
  id: string
  entity: "invoice" | "payment" | "customer"
  entityId: string
  direction: "push" | "pull"
  status: SyncStatus
  message: string
  timestamp: string
  retryCount: number
}

// --- Data Export (PRD NEW-3) ---
export interface ExportConfig {
  id: string
  name: string
  entity: "orders" | "jobs" | "invoices" | "inventory" | "customers"
  format: "csv" | "xlsx" | "pdf"
  filters: Record<string, string>
  columns: string[]
  schedule?: "daily" | "weekly" | "monthly"
  lastExportAt?: string
}

export interface ExportRecord {
  id: string
  configId?: string
  entity: string
  format: string
  recordCount: number
  fileSize: string
  createdAt: string
  downloadUrl: string
  status: "completed" | "in-progress" | "failed"
}

// --- Machine Connectivity (PRD NEW-4) ---
export interface MachineAlert {
  id: string
  machineId: string
  machineName: string
  type: "maintenance" | "error" | "warning" | "info"
  message: string
  createdAt: string
  acknowledged: boolean
}

export interface MachineProductionLog {
  id: string
  machineId: string
  jobTicketId: string
  jobNumber: string
  impressions: number
  sheets: number
  startedAt: string
  completedAt: string
  wasteSheets: number
}

export interface JDFConfig {
  machineId: string
  jdfVersion: "1.4" | "1.5" | "1.7"
  inputFolder: string
  outputFolder: string
  autoSend: boolean
  lastSyncAt: string
}

// --- Activity Feed ---
export interface ActivityEvent {
  id: string
  type: "order" | "production" | "shipping" | "invoice" | "inventory" | "customer" | "system"
  action: string
  description: string
  entityId: string
  entityType: string
  userId: string
  userName: string
  timestamp: string
}

// --- Customer Portal (PRD 15) ---
export interface SupportTicket {
  id: string
  customerId: string
  orderId?: string
  subject: string
  description: string
  status: "Open" | "In Progress" | "Resolved" | "Closed"
  priority: "Low" | "Medium" | "High"
  createdAt: string
  updatedAt: string
  messages: Array<{ sender: string; text: string; timestamp: string }>
}

export interface PortalUser {
  id: string
  customerId: string
  name: string
  email: string
  role: "viewer" | "approver" | "admin"
  lastLogin: string
}
