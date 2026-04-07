import type { ProductionStep } from "@/lib/types"

// Production steps generated from workflow templates for each estimate
// These appear in the conversion workspace as the job ticket preview
export const mockConversionSteps: Record<string, ProductionStep[]> = {
  "EST-2025-003": [
    { id: "cs-003-1", name: "Prepress", sequence: 1, status: "pending", assignedStation: "Prepress Desk 2", estimatedDuration: 30, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-003-2", name: "Digital Printing", sequence: 2, status: "pending", assignedStation: "HP Indigo 12000", estimatedDuration: 180, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-003-3", name: "Lamination", sequence: 3, status: "pending", assignedStation: "Autobond 76 TH", estimatedDuration: 90, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-003-4", name: "Cutting", sequence: 4, status: "pending", assignedStation: "Polar 115 XT", estimatedDuration: 120, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-003-5", name: "QC & Packaging", sequence: 5, status: "pending", assignedStation: "QC Station", estimatedDuration: 60, notes: "", annotations: [], isParallel: false, isOptional: false },
  ],
  "EST-2025-004": [
    { id: "cs-004-1", name: "Prepress", sequence: 1, status: "pending", estimatedDuration: 20, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-004-2", name: "Offset Printing", sequence: 2, status: "pending", assignedStation: "Heidelberg XL-106", estimatedDuration: 240, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-004-3", name: "Cutting", sequence: 3, status: "pending", assignedStation: "Polar 115 XT", estimatedDuration: 60, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-004-4", name: "Folding", sequence: 4, status: "pending", assignedStation: "Stahlfolder TH-82", estimatedDuration: 180, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-004-5", name: "QC & Packaging", sequence: 5, status: "pending", estimatedDuration: 45, notes: "", annotations: [], isParallel: false, isOptional: false },
  ],
  "EST-2025-008": [
    { id: "cs-008-1", name: "Prepress & CTP", sequence: 1, status: "pending", assignedStation: "Prepress Desk 1", estimatedDuration: 240, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-2", name: "Offset Printing — Interior", sequence: 2, status: "pending", assignedStation: "Heidelberg XL-106", estimatedDuration: 960, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-3", name: "Offset Printing — Cover + Jacket", sequence: 3, status: "pending", assignedStation: "Heidelberg XL-106", estimatedDuration: 120, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-4", name: "Lamination — Cover", sequence: 4, status: "pending", assignedStation: "Autobond 76 TH", estimatedDuration: 60, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-5", name: "Folding & Gathering", sequence: 5, status: "pending", estimatedDuration: 480, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-6", name: "Section Sewing", sequence: 6, status: "pending", estimatedDuration: 360, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-7", name: "Case Making", sequence: 7, status: "pending", estimatedDuration: 180, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-8", name: "Casing-In", sequence: 8, status: "pending", estimatedDuration: 240, notes: "", annotations: [], isParallel: false, isOptional: false },
    { id: "cs-008-9", name: "QC & Packaging", sequence: 9, status: "pending", estimatedDuration: 120, notes: "", annotations: [], isParallel: false, isOptional: false },
  ],
}

// Fallback generic steps for estimates without specific steps
export const genericDigitalSteps: ProductionStep[] = [
  { id: "gen-1", name: "Prepress", sequence: 1, status: "pending", estimatedDuration: 30, notes: "", annotations: [], isParallel: false, isOptional: false },
  { id: "gen-2", name: "Printing", sequence: 2, status: "pending", estimatedDuration: 120, notes: "", annotations: [], isParallel: false, isOptional: false },
  { id: "gen-3", name: "Finishing", sequence: 3, status: "pending", estimatedDuration: 60, notes: "", annotations: [], isParallel: false, isOptional: true },
  { id: "gen-4", name: "Cutting", sequence: 4, status: "pending", estimatedDuration: 45, notes: "", annotations: [], isParallel: false, isOptional: false },
  { id: "gen-5", name: "QC & Packaging", sequence: 5, status: "pending", estimatedDuration: 30, notes: "", annotations: [], isParallel: false, isOptional: false },
]
