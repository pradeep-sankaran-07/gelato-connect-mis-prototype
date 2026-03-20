// @ts-nocheck
import type { ExportConfig, ExportRecord } from "@/lib/types"

export const mockExportConfigs: ExportConfig[] = [
  {
    id: "exc-001",
    name: "Monthly Orders Report",
    entity: "orders",
    format: "xlsx",
    filters: { status: "Completed,Delivered,Shipped", dateRange: "last-30-days" },
    columns: ["orderNumber", "customerName", "product", "quantity", "total", "status", "createdAt", "dueDate"],
    schedule: "monthly",
    lastExportAt: "2025-11-01T06:00:00Z",
  },
  {
    id: "exc-002",
    name: "Active Jobs Overview",
    entity: "jobs",
    format: "csv",
    filters: { status: "In Progress,Created" },
    columns: ["jobNumber", "customerName", "product", "quantity", "status", "priority", "dueDate", "currentStep"],
    lastExportAt: "2025-11-28T08:00:00Z",
  },
  {
    id: "exc-003",
    name: "Outstanding Invoices",
    entity: "invoices",
    format: "pdf",
    filters: { status: "Sent,Partial,Overdue" },
    columns: ["invoiceNumber", "customerName", "total", "amountPaid", "amountDue", "dueDate", "status"],
    schedule: "weekly",
    lastExportAt: "2025-11-25T06:00:00Z",
  },
  {
    id: "exc-004",
    name: "Inventory Stock Levels",
    entity: "inventory",
    format: "xlsx",
    filters: {},
    columns: ["name", "type", "specification", "onHand", "allocated", "available", "reorderPoint", "supplier", "unitCost"],
    schedule: "daily",
    lastExportAt: "2025-11-28T06:00:00Z",
  },
  {
    id: "exc-005",
    name: "Customer Directory",
    entity: "customers",
    format: "csv",
    filters: {},
    columns: ["name", "country", "pricingTier", "paymentTerms", "salesRep", "createdAt"],
    lastExportAt: "2025-10-15T10:00:00Z",
  },
]

export const mockExportRecords: ExportRecord[] = [
  { id: "exr-001", configId: "exc-001", entity: "orders", format: "xlsx", recordCount: 42, fileSize: "128 KB", createdAt: "2025-11-01T06:00:00Z", downloadUrl: "/exports/orders-monthly-2025-11.xlsx", status: "completed" },
  { id: "exr-002", configId: "exc-003", entity: "invoices", format: "pdf", recordCount: 5, fileSize: "85 KB", createdAt: "2025-11-25T06:00:00Z", downloadUrl: "/exports/invoices-outstanding-2025-11-25.pdf", status: "completed" },
  { id: "exr-003", configId: "exc-004", entity: "inventory", format: "xlsx", recordCount: 20, fileSize: "45 KB", createdAt: "2025-11-28T06:00:00Z", downloadUrl: "/exports/inventory-stock-2025-11-28.xlsx", status: "completed" },
  { id: "exr-004", configId: "exc-002", entity: "jobs", format: "csv", recordCount: 8, fileSize: "12 KB", createdAt: "2025-11-28T08:00:00Z", downloadUrl: "/exports/jobs-active-2025-11-28.csv", status: "completed" },
  { id: "exr-005", configId: "exc-005", entity: "customers", format: "csv", recordCount: 10, fileSize: "8 KB", createdAt: "2025-10-15T10:00:00Z", downloadUrl: "/exports/customers-directory-2025-10-15.csv", status: "completed" },
  { id: "exr-006", configId: "exc-001", entity: "orders", format: "xlsx", recordCount: 38, fileSize: "115 KB", createdAt: "2025-10-01T06:00:00Z", downloadUrl: "/exports/orders-monthly-2025-10.xlsx", status: "completed" },
  { id: "exr-007", configId: "exc-003", entity: "invoices", format: "pdf", recordCount: 3, fileSize: "62 KB", createdAt: "2025-11-18T06:00:00Z", downloadUrl: "/exports/invoices-outstanding-2025-11-18.pdf", status: "completed" },
  { id: "exr-008", configId: "exc-004", entity: "inventory", format: "xlsx", recordCount: 20, fileSize: "44 KB", createdAt: "2025-11-27T06:00:00Z", downloadUrl: "/exports/inventory-stock-2025-11-27.xlsx", status: "completed" },
  { id: "exr-009", entity: "orders", format: "csv", recordCount: 0, fileSize: "0 KB", createdAt: "2025-11-28T15:00:00Z", downloadUrl: "", status: "in-progress" },
  { id: "exr-010", entity: "invoices", format: "xlsx", recordCount: 0, fileSize: "0 KB", createdAt: "2025-11-28T12:00:00Z", downloadUrl: "", status: "failed" },
]
