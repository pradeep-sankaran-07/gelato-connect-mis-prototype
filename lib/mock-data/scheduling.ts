// @ts-nocheck
import type { ScheduleBlock, ScheduleConflict } from "@/lib/types"

export const mockScheduleBlocks: ScheduleBlock[] = [
  // Monday
  { id: "sb-001", jobTicketId: "JOB-2025-002", jobNumber: "JOB-2025-002", customerName: "PrintCo Ltd", product: "Business Cards", machineId: "machine-indigo", machineName: "HP Indigo 12000", startTime: "2025-12-01T07:00:00Z", endTime: "2025-12-01T13:00:00Z", status: "scheduled", priority: "normal", setupMinutes: 15, productionMinutes: 345, dryingMinutes: 0, color: "#3b82f6" },
  { id: "sb-002", jobTicketId: "JOB-2025-003", jobNumber: "JOB-2025-003", customerName: "BrandEx GmbH", product: "Product Catalogue", machineId: "machine-heidelberg", machineName: "Heidelberg XL-106", startTime: "2025-12-01T07:00:00Z", endTime: "2025-12-01T15:00:00Z", status: "scheduled", priority: "high", setupMinutes: 45, productionMinutes: 435, dryingMinutes: 0, color: "#ef4444" },
  { id: "sb-003", jobTicketId: "JOB-2025-009", jobNumber: "JOB-2025-009", customerName: "Nova Graphics Srl", product: "Posters A1 & A2", machineId: "machine-arizona", machineName: "Canon Arizona 2380", startTime: "2025-12-01T07:00:00Z", endTime: "2025-12-01T10:00:00Z", status: "scheduled", priority: "normal", setupMinutes: 10, productionMinutes: 170, dryingMinutes: 0, color: "#8b5cf6" },
  { id: "sb-004", jobTicketId: "JOB-2025-008", jobNumber: "JOB-2025-008", customerName: "Summit Media Group", product: "Event Programme", machineId: "machine-polar", machineName: "Polar 115 XT", startTime: "2025-12-01T07:00:00Z", endTime: "2025-12-01T08:30:00Z", status: "scheduled", priority: "high", setupMinutes: 5, productionMinutes: 85, dryingMinutes: 0, color: "#f59e0b" },
  { id: "sb-005", jobTicketId: "JOB-2025-011", jobNumber: "JOB-2025-011", customerName: "Acme Corporation", product: "Corporate Brochure", machineId: "machine-laminator", machineName: "GMP Pioneer 5000", startTime: "2025-12-01T07:00:00Z", endTime: "2025-12-01T08:00:00Z", status: "completed", priority: "normal", setupMinutes: 10, productionMinutes: 45, dryingMinutes: 0, color: "#10b981" },

  // Tuesday
  { id: "sb-006", jobTicketId: "JOB-2025-014", jobNumber: "JOB-2025-014", customerName: "BrandEx GmbH", product: "Die-Cut Stickers", machineId: "machine-indigo", machineName: "HP Indigo 12000", startTime: "2025-12-02T07:00:00Z", endTime: "2025-12-02T08:15:00Z", status: "scheduled", priority: "normal", setupMinutes: 15, productionMinutes: 60, dryingMinutes: 0, color: "#3b82f6" },
  { id: "sb-007", jobTicketId: "JOB-2025-012", jobNumber: "JOB-2025-012", customerName: "Luxe Labels SA", product: "Wine Labels (Reprint)", machineId: "machine-heidelberg", machineName: "Heidelberg XL-106", startTime: "2025-12-02T07:00:00Z", endTime: "2025-12-02T10:00:00Z", status: "scheduled", priority: "normal", setupMinutes: 30, productionMinutes: 150, dryingMinutes: 0, color: "#d946ef" },
  { id: "sb-008", jobTicketId: "JOB-2025-011", jobNumber: "JOB-2025-011", customerName: "Acme Corporation", product: "Corporate Brochure", machineId: "machine-polar", machineName: "Polar 115 XT", startTime: "2025-12-02T07:00:00Z", endTime: "2025-12-02T07:30:00Z", status: "scheduled", priority: "normal", setupMinutes: 5, productionMinutes: 25, dryingMinutes: 0, color: "#10b981" },
  { id: "sb-009", jobTicketId: "JOB-2025-008", jobNumber: "JOB-2025-008", customerName: "Summit Media Group", product: "Event Programme", machineId: "machine-binder", machineName: "Muller Martini Alegro", startTime: "2025-12-02T07:00:00Z", endTime: "2025-12-02T10:00:00Z", status: "scheduled", priority: "high", setupMinutes: 30, productionMinutes: 150, dryingMinutes: 0, color: "#f59e0b" },

  // Wednesday
  { id: "sb-010", jobTicketId: "JOB-2025-003", jobNumber: "JOB-2025-003", customerName: "BrandEx GmbH", product: "Product Catalogue (Binding)", machineId: "machine-binder", machineName: "Muller Martini Alegro", startTime: "2025-12-03T07:00:00Z", endTime: "2025-12-03T13:00:00Z", status: "scheduled", priority: "high", setupMinutes: 30, productionMinutes: 330, dryingMinutes: 0, color: "#ef4444" },
  { id: "sb-011", jobTicketId: "JOB-2025-002", jobNumber: "JOB-2025-002", customerName: "PrintCo Ltd", product: "Business Cards (Lamination)", machineId: "machine-laminator", machineName: "GMP Pioneer 5000", startTime: "2025-12-03T07:00:00Z", endTime: "2025-12-03T09:00:00Z", status: "scheduled", priority: "normal", setupMinutes: 10, productionMinutes: 110, dryingMinutes: 0, color: "#3b82f6" },
  { id: "sb-012", jobTicketId: "JOB-2025-002", jobNumber: "JOB-2025-002", customerName: "PrintCo Ltd", product: "Business Cards (Cutting)", machineId: "machine-polar", machineName: "Polar 115 XT", startTime: "2025-12-03T10:00:00Z", endTime: "2025-12-03T13:00:00Z", status: "scheduled", priority: "normal", setupMinutes: 5, productionMinutes: 175, dryingMinutes: 0, color: "#3b82f6" },

  // Thursday
  { id: "sb-013", jobTicketId: "JOB-2025-011", jobNumber: "JOB-2025-011", customerName: "Acme Corporation", product: "Corporate Brochure (Binding)", machineId: "machine-binder", machineName: "Muller Martini Alegro", startTime: "2025-12-04T07:00:00Z", endTime: "2025-12-04T08:30:00Z", status: "scheduled", priority: "normal", setupMinutes: 20, productionMinutes: 70, dryingMinutes: 0, color: "#10b981" },
  { id: "sb-014", jobTicketId: "JOB-2025-012", jobNumber: "JOB-2025-012", customerName: "Luxe Labels SA", product: "Wine Labels (Cutting)", machineId: "machine-polar", machineName: "Polar 115 XT", startTime: "2025-12-04T07:00:00Z", endTime: "2025-12-04T08:00:00Z", status: "scheduled", priority: "normal", setupMinutes: 5, productionMinutes: 55, dryingMinutes: 0, color: "#d946ef" },
  { id: "sb-015", jobTicketId: "JOB-2025-016", jobNumber: "JOB-2025-016", customerName: "Creative Signs NV", product: "Exhibition Banners", machineId: "machine-arizona", machineName: "Canon Arizona 2380", startTime: "2025-12-04T07:00:00Z", endTime: "2025-12-04T09:00:00Z", status: "scheduled", priority: "normal", setupMinutes: 10, productionMinutes: 110, dryingMinutes: 0, color: "#0ea5e9" },

  // Friday
  { id: "sb-016", jobTicketId: "JOB-2025-003", jobNumber: "JOB-2025-003", customerName: "BrandEx GmbH", product: "Product Catalogue (QC + Packing)", machineId: "machine-polar", machineName: "Polar 115 XT", startTime: "2025-12-05T07:00:00Z", endTime: "2025-12-05T08:30:00Z", status: "scheduled", priority: "high", setupMinutes: 5, productionMinutes: 85, dryingMinutes: 0, color: "#ef4444" },
  { id: "sb-017", jobTicketId: "JOB-2025-003", jobNumber: "JOB-2025-003", customerName: "BrandEx GmbH", product: "Product Catalogue (Trim)", machineId: "machine-polar", machineName: "Polar 115 XT", startTime: "2025-12-05T09:00:00Z", endTime: "2025-12-05T10:30:00Z", status: "scheduled", priority: "high", setupMinutes: 5, productionMinutes: 85, dryingMinutes: 0, color: "#ef4444" },

  // Conflicts - overlapping blocks
  { id: "sb-018", jobTicketId: "JOB-2025-014", jobNumber: "JOB-2025-014", customerName: "BrandEx GmbH", product: "Stickers (Cutting)", machineId: "machine-polar", machineName: "Polar 115 XT", startTime: "2025-12-03T12:00:00Z", endTime: "2025-12-03T13:30:00Z", status: "conflict", priority: "normal", setupMinutes: 5, productionMinutes: 85, dryingMinutes: 0, color: "#ef4444" },
  { id: "sb-019", jobTicketId: "JOB-2025-012", jobNumber: "JOB-2025-012", customerName: "Luxe Labels SA", product: "Wine Labels (Print)", machineId: "machine-heidelberg", machineName: "Heidelberg XL-106", startTime: "2025-12-01T14:00:00Z", endTime: "2025-12-01T17:00:00Z", status: "conflict", priority: "normal", setupMinutes: 30, productionMinutes: 150, dryingMinutes: 0, color: "#d946ef" },
  { id: "sb-020", jobTicketId: "JOB-2025-017", jobNumber: "JOB-2025-017", customerName: "Apex Packaging AG", product: "Gift Box (Print)", machineId: "machine-heidelberg", machineName: "Heidelberg XL-106", startTime: "2025-12-02T09:00:00Z", endTime: "2025-12-02T13:00:00Z", status: "delayed", priority: "high", setupMinutes: 45, productionMinutes: 195, dryingMinutes: 0, color: "#f97316" },
]

export const mockScheduleConflicts: ScheduleConflict[] = [
  {
    id: "sc-001",
    type: "overlap",
    description: "Polar 115 XT: Business Cards cutting (sb-012) overlaps with Stickers cutting (sb-018) on Wed 3 Dec, 12:00-13:30",
    affectedBlocks: ["sb-012", "sb-018"],
    suggestion: "Move Stickers cutting to Thursday morning (07:00-08:30) after Wine Labels cutting completes",
    severity: "warning",
  },
  {
    id: "sc-002",
    type: "overlap",
    description: "Heidelberg XL-106: Catalogue printing (sb-002) overlaps with Wine Labels reprint (sb-019) on Mon 1 Dec, 14:00-15:00",
    affectedBlocks: ["sb-002", "sb-019"],
    suggestion: "Reschedule Wine Labels reprint to Tuesday morning as already planned in sb-007",
    severity: "critical",
  },
  {
    id: "sc-003",
    type: "deadline-risk",
    description: "Gift Box printing for Apex Packaging (JOB-2025-017) is on hold pending client approval but scheduled for Tue 2 Dec. If approval is delayed, the 15 Jan deadline may be at risk.",
    affectedBlocks: ["sb-020"],
    suggestion: "Contact client for sample approval status. Consider moving to next week if not approved by Friday.",
    severity: "warning",
  },
]
