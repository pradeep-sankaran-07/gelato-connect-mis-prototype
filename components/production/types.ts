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
