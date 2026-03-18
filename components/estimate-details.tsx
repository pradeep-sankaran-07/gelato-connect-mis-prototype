"use client"

import { ArrowLeft, X, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function EstimateDetails({ onBackClick }: { onBackClick: () => void }) {
  const [showConvertConfirm, setShowConvertConfirm] = useState(false)

  const handleConvertToOrder = () => {
    setShowConvertConfirm(true)
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white p-4 flex items-center border-b">
        <Button variant="ghost" size="sm" className="mr-2" onClick={onBackClick}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Go back to Manage Estimates
        </Button>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            ConnectAI
          </Button>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button variant="outline" size="sm">
            Save
          </Button>
          <Button variant="outline" size="sm">
            View PDF
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-success-70 hover:bg-success-90"
            onClick={handleConvertToOrder}
          >
            <FileCheck className="h-4 w-4 mr-1" />
            Convert to Order
          </Button>
        </div>
      </div>

      {showConvertConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Convert Estimate to Order</h3>
            <p className="mb-4">
              Are you sure you want to convert this estimate to an order? This will create a new order and move the
              workflow to production.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowConvertConfirm(false)}>
                Cancel
              </Button>
              <Button
                className="bg-success-70 hover:bg-success-90"
                onClick={() => {
                  // Close the modal
                  setShowConvertConfirm(false)

                  // Create a new order ID (in a real app, this would come from the backend)
                  const newOrderId = "j-18-pc-5000"

                  // Navigate directly to the order details page
                  window.location.href = "#order-details"

                  // Dispatch custom event to navigate to order details
                  const event = new CustomEvent("navigateToOrderDetails", {
                    detail: { orderId: newOrderId },
                  })
                  window.dispatchEvent(event)
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6">Edit estimate</h2>

          <div className="border rounded-md mb-6">
            <div className="flex items-center justify-between p-4 border-b bg-neutral-5">
              <h3 className="font-medium">Basic details</h3>
              <Button variant="ghost" size="sm">
                <ChevronIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job name</label>
                <Input defaultValue="PrintCo Tri-fold Brochures" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Customer</label>
                <Select defaultValue="printco">
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="printco">PrintCo Ltd</SelectItem>
                    <SelectItem value="sandbox">Sandbox</SelectItem>
                    <SelectItem value="athletix">Athletix</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border rounded-md mb-6">
            <div className="flex items-center justify-between p-4 border-b bg-neutral-5">
              <h3 className="font-medium">Product description</h3>
              <Button variant="ghost" size="sm">
                <ChevronIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product category</label>
                <Select defaultValue="brochure">
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brochure">Brochure</SelectItem>
                    <SelectItem value="flyer">Flyer</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <Input type="number" defaultValue="5000" />
              </div>
            </div>
          </div>

          <div className="border rounded-md mb-6">
            <div className="flex items-center justify-between p-4 border-b bg-neutral-5">
              <h3 className="font-medium">Inner</h3>
              <Button variant="ghost" size="sm">
                <ChevronIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Finished Size</label>
                <Select defaultValue="a4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="a5">A5</SelectItem>
                    <SelectItem value="a6">A6</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Orientation</label>
                <Select defaultValue="portrait">
                  <SelectTrigger>
                    <SelectValue placeholder="Select orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Printed Sides</label>
                <Select defaultValue="double">
                  <SelectTrigger>
                    <SelectValue placeholder="Select sides" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Sided</SelectItem>
                    <SelectItem value="double">Double Sided</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Paper Weight</label>
                <Select defaultValue="200">
                  <SelectTrigger>
                    <SelectValue placeholder="Select paper weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="130">130 gsm</SelectItem>
                    <SelectItem value="170">170 gsm</SelectItem>
                    <SelectItem value="200">200 gsm</SelectItem>
                    <SelectItem value="250">250 gsm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Paper Coating</label>
                <Select defaultValue="gloss">
                  <SelectTrigger>
                    <SelectValue placeholder="Select coating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gloss">Gloss</SelectItem>
                    <SelectItem value="matte">Matte</SelectItem>
                    <SelectItem value="silk">Silk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <Select defaultValue="full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full colour / both sides</SelectItem>
                    <SelectItem value="fullone">Full colour / one side</SelectItem>
                    <SelectItem value="bw">Black & White</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border rounded-md mb-6">
            <div className="flex items-center justify-between p-4 border-b bg-neutral-5">
              <h3 className="font-medium">Finishing</h3>
              <Button variant="ghost" size="sm">
                <ChevronIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="trifold" className="mr-2" defaultChecked />
                <label htmlFor="trifold" className="text-sm">
                  Tri-fold
                </label>
              </div>
            </div>
          </div>

          <div className="border rounded-md mb-6">
            <div className="flex items-center justify-between p-4 border-b bg-neutral-5">
              <h3 className="font-medium">Pricing</h3>
              <Button variant="ghost" size="sm">
                <ChevronIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Production Method</label>
                  <Select defaultValue="digital">
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="offset">Offset</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <Select defaultValue="eur">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Production Cost:</span>
                  <span className="text-sm">EUR 950.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Finishing Cost:</span>
                  <span className="text-sm">EUR 150.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Shipping:</span>
                  <span className="text-sm">EUR 50.00</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total:</span>
                  <span>EUR 1,250.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button variant="outline">Save Draft</Button>
            <Button>Generate PDF & Send</Button>
          </div>
        </div>

        <div className="w-1/3 border-l bg-neutral-5">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2819%29-170UxeV7cg8b7kNjFagZkz9quPldwr.png"
                alt="GelatoConnect Logo"
                className="h-5 w-5 mr-2"
              />
              <span className="font-medium">ConnectAI</span>
            </div>
            <Button variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4">
            <div className="bg-white rounded-lg p-4 border mb-4">
              <p className="text-sm mb-3">Hi, I can help you estimate tri-fold brochures for customer PrintCo Ltd.</p>
              <p className="text-sm mb-1">Job details extracted from email:</p>
              <ul className="text-sm list-disc pl-5 mb-3 space-y-1">
                <li>5000 copies</li>
                <li>Size A4 Portrait</li>
                <li>Cover: 200gsm gloss</li>
                <li>Full color both sides</li>
                <li>Tri-fold finishing</li>
              </ul>
              <p className="text-sm">
                I've prepared the estimate for PrintCo Tri-fold Brochures with all specifications.
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Ask a follow-up question</label>
              <Textarea placeholder="Type your question here..." className="bg-white" />
            </div>

            <Button variant="outline" className="w-full flex items-center justify-center">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
              </svg>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
