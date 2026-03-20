export type JobStatus = "Not Started" | "In Progress" | "Paused" | "Completed"

export type ProductionStep =
  | "Production Stations"
  | "Cutting"
  | "Printing"
  | "Binding"
  | "Mounting"
  | "Folding"
  | "Shrink Wrapping"
  | "UV Coating"
  | "Laminating"

export type IssueReasonCode = "Machine Error" | "Material Defect" | "Quality Issue" | "Operator Error"

export interface IssueReport {
  id: string
  jobId: string
  reasonCode: IssueReasonCode
  description: string
  isBlocking: boolean
  resolutionNotes: string
  photoAttached: boolean
  timestamp: number
}

export interface ProductionStepTiming {
  step: string
  estimatedMinutes: number
  actualMinutes: number | null
  status: "completed" | "in-progress" | "pending"
}

export interface Job {
  id: string
  dispatchDate: string
  productModel: string
  part: string
  status: JobStatus
  productionStep: string
  timeInStation?: string
  startTime?: number
  pausedTime?: number
  totalTime?: number
  customer?: string
  productType?: string
  estimatedMinutes?: number
  actualMinutes?: number
  stepTimeline?: ProductionStepTiming[]
  issues?: IssueReport[]
  specs?: string
  stepInstructions?: string
  materialsNeeded?: string[]
  specialHandlingNotes?: string
}

export interface ProgressData {
  completed: number
  total: number
}

export interface ProductionStepProgress {
  step: string
  delayed: ProgressData
  today: ProgressData
  upcoming: ProgressData
}
