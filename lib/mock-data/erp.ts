// @ts-nocheck
import type { ERPConnection, ERPFieldMapping, ERPSyncLog } from "@/lib/types"

export const mockERPConnection: ERPConnection = {
  provider: "xero",
  status: "connected",
  companyName: "GelatoConnect Production GmbH",
  lastSyncAt: "2025-11-28T14:00:00Z",
  connectedAt: "2025-03-15T10:00:00Z",
}

export const mockERPFieldMappings: ERPFieldMapping[] = [
  { id: "efm-001", misField: "invoice.number", erpField: "InvoiceNumber", direction: "mis-to-erp", isRequired: true },
  { id: "efm-002", misField: "invoice.total", erpField: "Total", direction: "mis-to-erp", isRequired: true },
  { id: "efm-003", misField: "invoice.taxTotal", erpField: "TotalTax", direction: "mis-to-erp", isRequired: true },
  { id: "efm-004", misField: "invoice.dueDate", erpField: "DueDate", direction: "mis-to-erp", isRequired: true },
  { id: "efm-005", misField: "invoice.status", erpField: "Status", direction: "bidirectional", isRequired: true },
  { id: "efm-006", misField: "customer.name", erpField: "ContactName", direction: "bidirectional", isRequired: true },
  { id: "efm-007", misField: "customer.address", erpField: "Addresses[0].AddressLine1", direction: "mis-to-erp", isRequired: false },
  { id: "efm-008", misField: "payment.amount", erpField: "Payments[].Amount", direction: "erp-to-mis", isRequired: true },
  { id: "efm-009", misField: "payment.date", erpField: "Payments[].Date", direction: "erp-to-mis", isRequired: true },
  { id: "efm-010", misField: "payment.reference", erpField: "Payments[].Reference", direction: "erp-to-mis", isRequired: false },
]

export const mockERPSyncLogs: ERPSyncLog[] = [
  { id: "esl-001", entity: "invoice", entityId: "INV-2025-001", direction: "push", status: "success", message: "Invoice INV-2025-001 synced to Xero successfully", timestamp: "2025-09-22T10:35:00Z", retryCount: 0 },
  { id: "esl-002", entity: "payment", entityId: "pay-001-1", direction: "pull", status: "success", message: "Payment of EUR 12,715.15 for INV-2025-001 synced from Xero", timestamp: "2025-10-05T10:00:00Z", retryCount: 0 },
  { id: "esl-003", entity: "invoice", entityId: "INV-2025-002", direction: "push", status: "success", message: "Invoice INV-2025-002 synced to Xero successfully", timestamp: "2025-09-26T10:20:00Z", retryCount: 0 },
  { id: "esl-004", entity: "payment", entityId: "pay-002-1", direction: "pull", status: "success", message: "Payment of EUR 8,604 for INV-2025-002 synced from Xero", timestamp: "2025-10-28T10:00:00Z", retryCount: 0 },
  { id: "esl-005", entity: "customer", entityId: "acme-corp", direction: "push", status: "success", message: "Customer Acme Corporation synced to Xero", timestamp: "2025-11-28T14:00:00Z", retryCount: 0 },
  { id: "esl-006", entity: "invoice", entityId: "INV-2025-003", direction: "push", status: "success", message: "Invoice INV-2025-003 synced to Xero successfully", timestamp: "2025-10-20T10:10:00Z", retryCount: 0 },
  { id: "esl-007", entity: "invoice", entityId: "INV-2025-004", direction: "push", status: "success", message: "Invoice INV-2025-004 synced to Xero successfully", timestamp: "2025-11-01T10:15:00Z", retryCount: 0 },
  { id: "esl-008", entity: "invoice", entityId: "INV-2025-005", direction: "push", status: "error", message: "Failed to sync INV-2025-005 — Xero contact not found for Metro Print Services", timestamp: "2025-11-01T10:08:00Z", retryCount: 3 },
  { id: "esl-009", entity: "customer", entityId: "metro-print", direction: "push", status: "success", message: "Customer Metro Print Services created in Xero", timestamp: "2025-11-01T10:10:00Z", retryCount: 0 },
  { id: "esl-010", entity: "invoice", entityId: "INV-2025-005", direction: "push", status: "success", message: "Invoice INV-2025-005 synced to Xero successfully (after customer creation)", timestamp: "2025-11-01T10:12:00Z", retryCount: 0 },
  { id: "esl-011", entity: "invoice", entityId: "INV-2025-007", direction: "push", status: "success", message: "Invoice INV-2025-007 synced to Xero successfully", timestamp: "2025-11-25T10:25:00Z", retryCount: 0 },
  { id: "esl-012", entity: "payment", entityId: "pay-003-1", direction: "pull", status: "success", message: "Payment of GBP 840 for INV-2025-003 synced from Xero", timestamp: "2025-11-10T10:00:00Z", retryCount: 0 },
  { id: "esl-013", entity: "invoice", entityId: "INV-2025-008", direction: "push", status: "success", message: "Invoice INV-2025-008 synced to Xero successfully", timestamp: "2025-11-28T14:15:00Z", retryCount: 0 },
  { id: "esl-014", entity: "payment", entityId: "pay-010-1", direction: "pull", status: "success", message: "Partial payment of GBP 1,650 for INV-2025-010 synced from Xero", timestamp: "2025-11-25T10:00:00Z", retryCount: 0 },
  { id: "esl-015", entity: "invoice", entityId: "INV-2025-010", direction: "push", status: "success", message: "Invoice INV-2025-010 synced to Xero successfully", timestamp: "2025-11-15T10:15:00Z", retryCount: 0 },
  { id: "esl-016", entity: "invoice", entityId: "INV-2025-012", direction: "push", status: "success", message: "Voided invoice INV-2025-012 synced to Xero", timestamp: "2025-10-29T10:05:00Z", retryCount: 0 },
  { id: "esl-017", entity: "customer", entityId: "brandex", direction: "push", status: "error", message: "Failed to update BrandEx GmbH — address format mismatch", timestamp: "2025-11-28T14:02:00Z", retryCount: 1 },
  { id: "esl-018", entity: "customer", entityId: "brandex", direction: "push", status: "success", message: "Customer BrandEx GmbH synced to Xero (retry successful)", timestamp: "2025-11-28T14:05:00Z", retryCount: 0 },
  { id: "esl-019", entity: "customer", entityId: "luxe-labels", direction: "push", status: "success", message: "Customer Luxe Labels SA synced to Xero", timestamp: "2025-11-28T14:01:00Z", retryCount: 0 },
  { id: "esl-020", entity: "invoice", entityId: "INV-2025-006", direction: "push", status: "pending", message: "Invoice INV-2025-006 queued for sync (draft status — will sync when sent)", timestamp: "2025-11-28T10:05:00Z", retryCount: 0 },
]
