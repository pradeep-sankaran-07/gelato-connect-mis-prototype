export interface Order {
  id: string
  customerName: string
  productType: string
  size: string
  quantity: number
  shippingAddress: string
  status:
    | "pending_approval"
    | "approved"
    | "artwork_uploaded"
    | "proof_generated"
    | "proof_approved"
    | "in_production"
    | "production_complete"
    | "shipped"
    | "delivered"
    | "imposition_ready"
    | "imposition_manual"
    | "workflow_ready"
    | "workflow_manual"
    | "production_ready"
  trackingNumber?: string
  productionMethod: "digital" | "offset"
}
