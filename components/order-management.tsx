"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  ArrowLeft,
  Upload,
  Download,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Send,
  Printer,
  ExternalLink,
  FileText,
  Clock,
  Truck,
  Package,
  Scissors,
  Layers,
  BarChart2,
  Users,
  Box,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function OrderManagement({ onBackClick }: { onBackClick: () => void }) {
  const [activeTab, setActiveTab] = useState("details")
  const [orderStatus, setOrderStatus] = useState("awaiting-artwork")
  const [showJobTicket, setShowJobTicket] = useState(false)
  const [showPreflightResults, setShowPreflightResults] = useState(false)
  const [artworkUploaded, setArtworkUploaded] = useState(false)
  const [preflightPassed, setPreflightPassed] = useState(false)
  const [proofSent, setProofSent] = useState(false)
  const [proofApproved, setProofApproved] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setArtworkUploaded(true)
      // Simulate preflight check
      setTimeout(() => {
        setShowPreflightResults(true)
        // For demo purposes, let's say the preflight check passes
        setPreflightPassed(true)
      }, 1500)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const sendProof = () => {
    setProofSent(true)
    // Update order status
    setOrderStatus("proof-sent")
  }

  const approveProof = () => {
    setProofApproved(true)
    // Update order status
    setOrderStatus("proof-approved")
  }

  const sendToProduction = () => {
    // Update order status
    setOrderStatus("in-production")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-info-10 text-info-90">Confirmed</Badge>
      case "awaiting-artwork":
        return <Badge className="bg-amber-100 text-amber-800">Awaiting Artwork</Badge>
      case "proof-sent":
        return <Badge className="bg-primary-10 text-primary-90">Proof Sent</Badge>
      case "proof-approved":
        return <Badge className="bg-success-10 text-success-90">Proof Approved</Badge>
      case "in-prepress":
        return <Badge className="bg-info-10 text-info-90">In Prepress</Badge>
      case "in-production":
        return <Badge className="bg-pink-100 text-pink-800">In Production</Badge>
      case "in-finishing":
        return <Badge className="bg-warning-10 text-warning-90">In Finishing</Badge>
      case "in-shipping":
        return <Badge className="bg-cyan-100 text-cyan-800">In Shipping</Badge>
      case "shipped":
        return <Badge className="bg-success-10 text-success-90">Shipped</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <span className="font-bold text-lg">GelatoConnect</span>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBackClick} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Manage Estimates
          </Button>
          <Input type="text" placeholder="Search" className="w-64 mr-4" />
          <Button variant="outline" size="sm" className="mr-2">
            Support
          </Button>
          <div className="w-8 h-8 rounded-full bg-neutral-90 text-white flex items-center justify-center">PS</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Menu */}
        <div className="w-64 bg-neutral-5 p-4 border-r overflow-y-auto">
          <div className="space-y-1">
            <div className="px-3 py-2 rounded hover:bg-neutral-10 cursor-pointer flex items-center">
              <BarChart2 className="h-5 w-5 mr-2" />
              Control Panel
            </div>
            <div className="px-3 py-2 rounded hover:bg-neutral-10 cursor-pointer flex items-center">
              <Layers className="h-5 w-5 mr-2" />
              Performance
            </div>
            <div className="px-3 py-2 rounded hover:bg-neutral-10 cursor-pointer flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Customers
            </div>
            <div className="px-3 py-2 rounded hover:bg-neutral-10 cursor-pointer flex items-center" onClick={onBackClick}>
              <FileText className="h-5 w-5 mr-2" />
              Estimates
            </div>

            {/* Orders Section */}
            <div className="mt-4 mb-2 px-3 text-xs font-semibold text-neutral-50 uppercase">Orders</div>

            <div className="px-3 py-2 rounded bg-neutral-10 cursor-pointer flex items-center font-medium">
              <Package className="h-5 w-5 mr-2" />
              Order Management
            </div>

            {/* Inventory Section */}
            <div className="mt-4 mb-2 px-3 text-xs font-semibold text-neutral-50 uppercase">Inventory</div>

            <div className="px-3 py-2 rounded hover:bg-neutral-10 cursor-pointer flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Inventory Management
              <Badge className="ml-auto bg-critical-60 text-white">3</Badge>
            </div>

            <div className="px-3 py-2 rounded hover:bg-neutral-10 cursor-pointer flex items-center">
              <Box className="h-5 w-5 mr-2" />
              Inventory Allocation
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white p-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Order #18 - PrintCo Tri-fold Brochures</h1>
                <div className="flex items-center mt-1 text-sm text-neutral-50">
                  <span className="mr-4">Customer: PrintCo Ltd</span>
                  <span className="mr-4">Created: May 16, 2025</span>
                  <span className="mr-4">Due: June 1, 2025</span>
                  <span>Status: {getStatusBadge(orderStatus)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowJobTicket(true)}>
                  <FileText className="h-4 w-4 mr-1" />
                  View Job Ticket
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList>
                <TabsTrigger value="details">Order Details</TabsTrigger>
                <TabsTrigger value="artwork">Artwork & Preflight</TabsTrigger>
                <TabsTrigger value="production">Production</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <TabsContent value="details" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Customer Information</div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Company</label>
                          <div>PrintCo Ltd</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Contact</label>
                          <div>Alex Chen</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Email</label>
                          <div>alex.chen@printco.com</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Phone</label>
                          <div>+44 20 1234 5678</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Shipping Information</div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Shipping Address</label>
                          <div>PrintCo Ltd</div>
                          <div>123 Print Street</div>
                          <div>London, EC1A 1BB</div>
                          <div>United Kingdom</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Shipping Method</label>
                          <div>Standard Shipping</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-50 mb-1">Tracking Number</label>
                          <div className="text-neutral-50 italic">Not yet assigned</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Product Specifications</div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm font-medium text-neutral-50 mb-1">Product</label>
                            <div>Tri-fold Brochures</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-50 mb-1">Quantity</label>
                            <div>5,000</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-50 mb-1">Size</label>
                            <div>A4 (210 x 297 mm)</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-50 mb-1">Orientation</label>
                            <div>Portrait</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-50 mb-1">Paper</label>
                            <div>200gsm Gloss</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-50 mb-1">Printing</label>
                            <div>Full color, double-sided (4/4)</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-50 mb-1">Finishing</label>
                            <div>Tri-fold</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-50 mb-1">Production Method</label>
                            <div>Digital</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Order Summary</div>
                    <div className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Production Cost:</span>
                          <span>EUR 950.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Finishing Cost:</span>
                          <span>EUR 150.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>EUR 50.00</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>EUR 1,250.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Order Timeline</div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-success-10 flex items-center justify-center mr-3">
                            <CheckCircle className="h-5 w-5 text-success-70" />
                          </div>
                          <div>
                            <div className="font-medium">Order Confirmed</div>
                            <div className="text-sm text-neutral-50">May 16, 2025 10:15 AM</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full ${artworkUploaded ? "bg-success-10" : "bg-neutral-5"} flex items-center justify-center mr-3`}
                          >
                            {artworkUploaded ? (
                              <CheckCircle className="h-5 w-5 text-success-70" />
                            ) : (
                              <Clock className="h-5 w-5 text-neutral-40" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">Artwork Upload</div>
                            <div className="text-sm text-neutral-50">
                              {artworkUploaded ? "May 18, 2025 2:30 PM" : "Pending"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full ${proofApproved ? "bg-success-10" : "bg-neutral-5"} flex items-center justify-center mr-3`}
                          >
                            {proofApproved ? (
                              <CheckCircle className="h-5 w-5 text-success-70" />
                            ) : (
                              <Clock className="h-5 w-5 text-neutral-40" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">Proof Approval</div>
                            <div className="text-sm text-neutral-50">
                              {proofApproved ? "May 20, 2025 11:45 AM" : "Pending"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full ${orderStatus === "in-production" ? "bg-success-10" : "bg-neutral-5"} flex items-center justify-center mr-3`}
                          >
                            {orderStatus === "in-production" ? (
                              <CheckCircle className="h-5 w-5 text-success-70" />
                            ) : (
                              <Clock className="h-5 w-5 text-neutral-40" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">Production</div>
                            <div className="text-sm text-neutral-50">
                              {orderStatus === "in-production" ? "May 22, 2025" : "Pending"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-neutral-5 flex items-center justify-center mr-3">
                            <Clock className="h-5 w-5 text-neutral-40" />
                          </div>
                          <div>
                            <div className="font-medium">Shipping</div>
                            <div className="text-sm text-neutral-50">Estimated: May 30, 2025</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="artwork" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b flex justify-between items-center">
                      <span>Artwork Files</span>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.ai,.eps,.psd,.jpg,.tif"
                      />
                      <Button onClick={triggerFileUpload} disabled={artworkUploaded}>
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Artwork
                      </Button>
                    </div>
                    <div className="p-4">
                      {!artworkUploaded ? (
                        <div className="text-center py-12 border-2 border-dashed rounded-md">
                          <Upload className="h-12 w-12 mx-auto text-neutral-40 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No artwork uploaded yet</h3>
                          <p className="text-neutral-50 mb-4 max-w-md mx-auto">
                            Upload your print-ready artwork files. We accept PDF, AI, EPS, PSD, JPG, and TIF formats.
                          </p>
                          <Button onClick={triggerFileUpload}>
                            <Upload className="h-4 w-4 mr-1" />
                            Upload Artwork
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 border rounded-md bg-neutral-5">
                            <div className="flex items-center">
                              <FileText className="h-8 w-8 text-info-70 mr-3" />
                              <div>
                                <div className="font-medium">PrintCo_Brochure_Final.pdf</div>
                                <div className="text-sm text-neutral-50">5.2 MB • Uploaded May 18, 2025 2:30 PM</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-critical-70 hover:text-critical-90">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="border rounded-md">
                            <div className="bg-neutral-5 p-4 font-medium border-b">Preflight Results</div>
                            <div className="p-4">
                              {showPreflightResults ? (
                                <div className="space-y-4">
                                  {preflightPassed ? (
                                    <div className="flex items-start p-3 bg-success-10 border border-neutral-20 rounded-md">
                                      <CheckCircle className="h-5 w-5 text-success-70 mr-3 mt-0.5" />
                                      <div>
                                        <div className="font-medium text-success-90">Preflight check passed</div>
                                        <p className="text-sm text-success-90 mt-1">
                                          Your artwork meets all the requirements for printing. You can proceed with
                                          sending the proof.
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-start p-3 bg-amber-50 border border-neutral-20 rounded-md">
                                      <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                                      <div>
                                        <div className="font-medium text-amber-800">Preflight check found issues</div>
                                        <p className="text-sm text-amber-700 mt-1">
                                          There are some issues with your artwork that need to be addressed before
                                          printing.
                                        </p>
                                        <ul className="text-sm text-amber-700 mt-2 list-disc pl-5 space-y-1">
                                          <li>Image resolution below 300 DPI on page 2</li>
                                          <li>Missing bleed (3mm required)</li>
                                          <li>Text too close to trim edge (minimum 5mm safe area required)</li>
                                        </ul>
                                      </div>
                                    </div>
                                  )}

                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Document Size</span>
                                      <span className="text-success-70 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" /> Correct (210 x 297 mm)
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Color Mode</span>
                                      <span className="text-success-70 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" /> CMYK
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Resolution</span>
                                      <span className="text-success-70 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" /> 300 DPI
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Fonts</span>
                                      <span className="text-success-70 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" /> Embedded
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Bleed</span>
                                      <span className="text-success-70 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-1" /> 3mm
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-8">
                                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-info-70 mx-auto mb-4"></div>
                                  <p className="text-neutral-50">Running preflight checks...</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Digital Proof</div>
                    <div className="p-4">
                      {!artworkUploaded ? (
                        <div className="text-neutral-50 text-center py-6">Upload artwork to generate a digital proof</div>
                      ) : !proofSent ? (
                        <div className="space-y-4">
                          <div className="aspect-video bg-neutral-5 rounded-md flex items-center justify-center">
                            <img
                              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brochure-preview.png`}
                              alt="Brochure Preview"
                              className="max-h-full rounded-md"
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Digital Proof</h3>
                              <p className="text-sm text-neutral-50">
                                Review the digital proof and send it to the client for approval
                              </p>
                            </div>
                            <Button onClick={sendProof} disabled={!preflightPassed}>
                              <Send className="h-4 w-4 mr-1" />
                              Send to Client
                            </Button>
                          </div>
                        </div>
                      ) : !proofApproved ? (
                        <div className="space-y-4">
                          <div className="aspect-video bg-neutral-5 rounded-md flex items-center justify-center">
                            <img
                              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brochure-preview.png`}
                              alt="Brochure Preview"
                              className="max-h-full rounded-md"
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Digital Proof Sent</h3>
                              <p className="text-sm text-neutral-50">Waiting for client approval</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Send className="h-4 w-4 mr-1" />
                                Resend
                              </Button>
                              <Button onClick={approveProof}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve Proof
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="aspect-video bg-neutral-5 rounded-md flex items-center justify-center">
                            <img
                              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brochure-preview.png`}
                              alt="Brochure Preview"
                              className="max-h-full rounded-md"
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Digital Proof Approved</h3>
                              <p className="text-sm text-neutral-50">Approved by Alex Chen on May 20, 2025 11:45 AM</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Artwork Requirements</div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">File Format</h3>
                          <p className="text-sm text-neutral-60">
                            Please provide print-ready PDF files. We also accept AI, EPS, PSD, JPG, and TIF formats.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Color Mode</h3>
                          <p className="text-sm text-neutral-60">
                            All files should be in CMYK color mode. RGB files will be converted to CMYK which may cause
                            color shifts.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Resolution</h3>
                          <p className="text-sm text-neutral-60">
                            All images should be at least 300 DPI at final print size.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Bleed</h3>
                          <p className="text-sm text-neutral-60">
                            Include 3mm bleed on all sides. Extend background images or colors to the bleed area.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Safe Area</h3>
                          <p className="text-sm text-neutral-60">
                            Keep important text and elements at least 5mm from the trim edge.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Fonts</h3>
                          <p className="text-sm text-neutral-60">
                            All fonts must be embedded or converted to outlines/paths.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Production Actions</div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <Button className="w-full" disabled={!proofApproved} onClick={sendToProduction}>
                          <Printer className="h-4 w-4 mr-1" />
                          Send to Production
                        </Button>

                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Production System</h3>
                          <Select defaultValue="gelato">
                            <SelectTrigger>
                              <SelectValue placeholder="Select production system" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gelato">GelatoConnect Internal</SelectItem>
                              <SelectItem value="external">External System (API)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Generate Job Ticket</h3>
                            <Button variant="outline" size="sm" onClick={() => setShowJobTicket(true)}>
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                          <p className="text-sm text-neutral-60">
                            Generate a detailed job ticket for production with all specifications.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Notes</div>
                    <div className="p-4">
                      <Textarea placeholder="Add production notes here..." className="min-h-[120px]" />
                      <Button className="mt-3 w-full">Save Notes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="production" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Production Status</div>
                    <div className="p-4">
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">Overall Progress</h3>
                            <span className="text-sm font-medium">
                              {orderStatus === "awaiting-artwork"
                                ? "10%"
                                : orderStatus === "proof-sent"
                                  ? "30%"
                                  : orderStatus === "proof-approved"
                                    ? "50%"
                                    : orderStatus === "in-production"
                                      ? "70%"
                                      : orderStatus === "in-shipping"
                                        ? "90%"
                                        : orderStatus === "shipped"
                                          ? "100%"
                                          : "0%"}
                            </span>
                          </div>
                          <Progress
                            value={
                              orderStatus === "awaiting-artwork"
                                ? 10
                                : orderStatus === "proof-sent"
                                  ? 30
                                  : orderStatus === "proof-approved"
                                    ? 50
                                    : orderStatus === "in-production"
                                      ? 70
                                      : orderStatus === "in-shipping"
                                        ? 90
                                        : orderStatus === "shipped"
                                          ? 100
                                          : 0
                            }
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full ${orderStatus === "in-production" || orderStatus === "in-shipping" || orderStatus === "shipped" ? "bg-success-10" : "bg-neutral-5"} flex items-center justify-center mr-3`}
                            >
                              {orderStatus === "in-production" ||
                              orderStatus === "in-shipping" ||
                              orderStatus === "shipped" ? (
                                <CheckCircle className="h-5 w-5 text-success-70" />
                              ) : (
                                <Printer className="h-5 w-5 text-neutral-40" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div className="font-medium">Printing</div>
                                <div className="text-sm">
                                  {orderStatus === "in-production" ||
                                  orderStatus === "in-shipping" ||
                                  orderStatus === "shipped" ? (
                                    <Badge className="bg-success-10 text-success-90">Completed</Badge>
                                  ) : (
                                    <Badge className="bg-neutral-5 text-neutral-90">Pending</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-sm text-neutral-50 mt-1">
                                {orderStatus === "in-production" ||
                                orderStatus === "in-shipping" ||
                                orderStatus === "shipped"
                                  ? "Completed on May 24, 2025"
                                  : "Scheduled to start after proof approval"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full ${orderStatus === "in-shipping" || orderStatus === "shipped" ? "bg-success-10" : "bg-neutral-5"} flex items-center justify-center mr-3`}
                            >
                              {orderStatus === "in-shipping" || orderStatus === "shipped" ? (
                                <CheckCircle className="h-5 w-5 text-success-70" />
                              ) : (
                                <Scissors className="h-5 w-5 text-neutral-40" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div className="font-medium">Finishing (Tri-fold)</div>
                                <div className="text-sm">
                                  {orderStatus === "in-shipping" || orderStatus === "shipped" ? (
                                    <Badge className="bg-success-10 text-success-90">Completed</Badge>
                                  ) : (
                                    <Badge className="bg-neutral-5 text-neutral-90">Pending</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-sm text-neutral-50 mt-1">
                                {orderStatus === "in-shipping" || orderStatus === "shipped"
                                  ? "Completed on May 26, 2025"
                                  : "Scheduled after printing"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full ${orderStatus === "shipped" ? "bg-success-10" : "bg-neutral-5"} flex items-center justify-center mr-3`}
                            >
                              {orderStatus === "shipped" ? (
                                <CheckCircle className="h-5 w-5 text-success-70" />
                              ) : (
                                <Package className="h-5 w-5 text-neutral-40" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div className="font-medium">Packaging</div>
                                <div className="text-sm">
                                  {orderStatus === "shipped" ? (
                                    <Badge className="bg-success-10 text-success-90">Completed</Badge>
                                  ) : (
                                    <Badge className="bg-neutral-5 text-neutral-90">Pending</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-sm text-neutral-50 mt-1">
                                {orderStatus === "shipped" ? "Completed on May 28, 2025" : "Scheduled after finishing"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full ${orderStatus === "shipped" ? "bg-success-10" : "bg-neutral-5"} flex items-center justify-center mr-3`}
                            >
                              {orderStatus === "shipped" ? (
                                <CheckCircle className="h-5 w-5 text-success-70" />
                              ) : (
                                <Truck className="h-5 w-5 text-neutral-40" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div className="font-medium">Shipping</div>
                                <div className="text-sm">
                                  {orderStatus === "shipped" ? (
                                    <Badge className="bg-success-10 text-success-90">Completed</Badge>
                                  ) : (
                                    <Badge className="bg-neutral-5 text-neutral-90">Pending</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-sm text-neutral-50 mt-1">
                                {orderStatus === "shipped" ? "Shipped on May 30, 2025" : "Scheduled after packaging"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Quality Control</div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">QC Inspector</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select inspector" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="john">John Smith</SelectItem>
                                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                                <SelectItem value="mike">Mike Williams</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">QC Status</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="passed">Passed</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">QC Notes</label>
                          <Textarea placeholder="Add quality control notes here..." className="min-h-[100px]" />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch id="qc-approval" />
                          <Label htmlFor="qc-approval">Final QC Approval</Label>
                        </div>

                        <Button className="w-full">Save QC Information</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Production Details</div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Production Method</label>
                          <div className="text-sm">Digital</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Press</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select press" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hp-indigo">HP Indigo 12000</SelectItem>
                              <SelectItem value="xerox">Xerox iGen 5</SelectItem>
                              <SelectItem value="konica">Konica Minolta AccurioPress C14000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Estimated Production Time</label>
                          <div className="text-sm">2 hours</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Estimated Finishing Time</label>
                          <div className="text-sm">1.5 hours</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Production Priority</label>
                          <Select defaultValue="normal">
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="rush">Rush</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Material Requirements</div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Paper</label>
                          <div className="text-sm">200gsm Gloss Coated (GC200-SRA3)</div>
                          <div className="text-sm text-neutral-50">Required: 5,500 sheets</div>
                          <div className="text-sm text-success-70">Available: 12,000 sheets</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Ink</label>
                          <div className="text-sm">CMYK Process</div>
                          <div className="text-sm text-neutral-50">Required: Standard coverage</div>
                          <div className="text-sm text-success-70">Available: In stock</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Finishing Materials</label>
                          <div className="text-sm">Tri-fold</div>
                          <div className="text-sm text-neutral-50">Required: Standard</div>
                          <div className="text-sm text-success-70">Available: In stock</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Packaging</label>
                          <div className="text-sm">Carton boxes</div>
                          <div className="text-sm text-neutral-50">Required: 2 boxes</div>
                          <div className="text-sm text-success-70">Available: In stock</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-neutral-5 p-4 font-medium border-b">Actions</div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <Button className="w-full" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          Generate Production Report
                        </Button>
                        <Button className="w-full" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Send to External System
                        </Button>
                        <Button className="w-full" onClick={() => setShowJobTicket(true)}>
                          <FileText className="h-4 w-4 mr-1" />
                          View Job Ticket
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <div className="border rounded-md">
                <div className="bg-neutral-5 p-4 font-medium border-b">Order History</div>
                <div className="p-4">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-info-10 flex items-center justify-center mr-3 mt-1">
                        <FileCheck className="h-5 w-5 text-info-70" />
                      </div>
                      <div>
                        <div className="font-medium">Order created from Estimate #18</div>
                        <div className="text-sm text-neutral-50">May 16, 2025 10:15 AM • System</div>
                        <div className="text-sm mt-1">Order #18 was created from Estimate #18 for PrintCo Ltd.</div>
                      </div>
                    </div>

                    {artworkUploaded && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-info-10 flex items-center justify-center mr-3 mt-1">
                          <Upload className="h-5 w-5 text-info-70" />
                        </div>
                        <div>
                          <div className="font-medium">Artwork uploaded</div>
                          <div className="text-sm text-neutral-50">May 18, 2025 2:30 PM • Alex Chen</div>
                          <div className="text-sm mt-1">File "PrintCo_Brochure_Final.pdf" (5.2 MB) was uploaded.</div>
                        </div>
                      </div>
                    )}

                    {preflightPassed && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-success-10 flex items-center justify-center mr-3 mt-1">
                          <CheckCircle className="h-5 w-5 text-success-70" />
                        </div>
                        <div>
                          <div className="font-medium">Preflight check passed</div>
                          <div className="text-sm text-neutral-50">May 18, 2025 2:32 PM • System</div>
                          <div className="text-sm mt-1">Automated preflight check completed successfully.</div>
                        </div>
                      </div>
                    )}

                    {proofSent && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-info-10 flex items-center justify-center mr-3 mt-1">
                          <Send className="h-5 w-5 text-info-70" />
                        </div>
                        <div>
                          <div className="font-medium">Digital proof sent to client</div>
                          <div className="text-sm text-neutral-50">May 18, 2025 3:15 PM • John Doe</div>
                          <div className="text-sm mt-1">
                            Digital proof was sent to alex.chen@printco.com for approval.
                          </div>
                        </div>
                      </div>
                    )}

                    {proofApproved && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-success-10 flex items-center justify-center mr-3 mt-1">
                          <CheckCircle className="h-5 w-5 text-success-70" />
                        </div>
                        <div>
                          <div className="font-medium">Proof approved by client</div>
                          <div className="text-sm text-neutral-50">May 20, 2025 11:45 AM • Alex Chen</div>
                          <div className="text-sm mt-1">Client approved the digital proof without changes.</div>
                        </div>
                      </div>
                    )}

                    {orderStatus === "in-production" && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-info-10 flex items-center justify-center mr-3 mt-1">
                          <Printer className="h-5 w-5 text-info-70" />
                        </div>
                        <div>
                          <div className="font-medium">Order sent to production</div>
                          <div className="text-sm text-neutral-50">May 22, 2025 9:30 AM • John Doe</div>
                          <div className="text-sm mt-1">
                            Order was sent to production. Estimated completion: May 28, 2025.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </div>

      {/* Job Ticket Modal */}
      {showJobTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[800px] max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-bold">Job Ticket - Order #18</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowJobTicket(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-0">
              <iframe
                className="w-full h-full min-h-[70vh]"
                srcDoc={`
                  <html>
                    <head>
                      <style>
                        body {
                          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                          margin: 0;
                          padding: 20px;
                          color: #333;
                        }
                        .job-ticket {
                          max-width: 100%;
                          margin: 0 auto;
                        }
                        .header {
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          border-bottom: 2px solid #e5e7eb;
                          padding-bottom: 15px;
                          margin-bottom: 20px;
                        }
                        .logo {
                          font-size: 24px;
                          font-weight: bold;
                        }
                        .barcode {
                          background: #f3f4f6;
                          padding: 10px;
                          text-align: center;
                          font-family: monospace;
                        }
                        .job-info {
                          display: flex;
                          justify-content: space-between;
                          margin-bottom: 20px;
                        }
                        .job-info-column {
                          flex: 1;
                        }
                        .section {
                          margin-bottom: 20px;
                          border: 1px solid #e5e7eb;
                          border-radius: 5px;
                          overflow: hidden;
                        }
                        .section-header {
                          background: #f3f4f6;
                          padding: 10px 15px;
                          font-weight: bold;
                          border-bottom: 1px solid #e5e7eb;
                        }
                        .section-content {
                          padding: 15px;
                        }
                        .info-grid {
                          display: grid;
                          grid-template-columns: repeat(2, 1fr);
                          gap: 10px;
                        }
                        .info-item {
                          margin-bottom: 5px;
                        }
                        .info-label {
                          font-weight: 500;
                          color: #6b7280;
                          font-size: 0.875rem;
                        }
                        .info-value {
                          font-size: 0.875rem;
                        }
                        .production-route {
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          margin: 20px 0;
                        }
                        .route-step {
                          text-align: center;
                          position: relative;
                          flex: 1;
                        }
                        .route-step:not(:last-child):after {
                          content: "";
                          position: absolute;
                          top: 50%;
                          right: 0;
                          width: 100%;
                          height: 2px;
                          background: #e5e7eb;
                          z-index: 1;
                        }
                        .step-circle {
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          background: #f3f4f6;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          margin: 0 auto 5px;
                          position: relative;
                          z-index: 2;
                          border: 2px solid #e5e7eb;
                        }
                        .step-label {
                          font-size: 0.75rem;
                          color: #6b7280;
                        }
                        .qc-section {
                          margin-top: 30px;
                          border-top: 2px solid #e5e7eb;
                          padding-top: 20px;
                        }
                        .qc-grid {
                          display: grid;
                          grid-template-columns: repeat(3, 1fr);
                          gap: 15px;
                          margin-top: 15px;
                        }
                        .qc-item {
                          border: 1px solid #e5e7eb;
                          border-radius: 5px;
                          padding: 10px;
                        }
                        .qc-label {
                          font-weight: 500;
                          margin-bottom: 5px;
                        }
                        .qc-value {
                          height: 30px;
                          border-bottom: 1px solid #e5e7eb;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="job-ticket">
                        <div class="header">
                          <div class="logo">GelatoConnect</div>
                          <div>
                            <div><strong>Job Ticket</strong></div>
                            <div>Friday, May 22, 2025 9:30 AM</div>
                          </div>
                          <div class="barcode">J18-PC-5000</div>
                        </div>
                        
                        <div class="job-info">
                          <div class="job-info-column">
                            <div class="info-item">
                              <div class="info-label">Customer:</div>
                              <div class="info-value">PrintCo Ltd</div>
                            </div>
                            <div class="info-item">
                              <div class="info-label">Contact:</div>
                              <div class="info-value">Alex Chen</div>
                            </div>
                            <div class="info-item">
                              <div class="info-label">Email:</div>
                              <div class="info-value">alex.chen@printco.com</div>
                            </div>
                            <div class="info-item">
                              <div class="info-label">Phone:</div>
                              <div class="info-value">+44 20 1234 5678</div>
                            </div>
                          </div>
                          
                          <div class="job-info-column">
                            <div class="info-item">
                              <div class="info-label">Job Number:</div>
                              <div class="info-value">J18-PC-5000</div>
                            </div>
                            <div class="info-item">
                              <div class="info-label">Order Number:</div>
                              <div class="info-value">18</div>
                            </div>
                            <div class="info-item">
                              <div class="info-label">Sales Rep:</div>
                              <div class="info-value">John Doe</div>
                            </div>
                            <div class="info-item">
                              <div class="info-label">Due Date:</div>
                              <div class="info-value">June 1, 2025</div>
                            </div>
                          </div>
                        </div>
                        
                        <div class="section">
                          <div class="section-header">General Information</div>
                          <div class="section-content">
                            <div class="info-grid">
                              <div class="info-item">
                                <div class="info-label">Job Name:</div>
                                <div class="info-value">PrintCo Tri-fold Brochures</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Quantity:</div>
                                <div class="info-value">5,000</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Size:</div>
                                <div class="info-value">A4 (210 x 297 mm)</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Orientation:</div>
                                <div class="info-value">Portrait</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Sides:</div>
                                <div class="info-value">Double-sided (4/4)</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Finishing:</div>
                                <div class="info-value">Tri-fold</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div class="section">
                          <div class="section-header">Paper & Printing</div>
                          <div class="section-content">
                            <div class="info-grid">
                              <div class="info-item">
                                <div class="info-label">Stock:</div>
                                <div class="info-value">200gsm Gloss Coated (GC200-SRA3)</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Stock #:</div>
                                <div class="info-value">GC200-SRA3</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Color:</div>
                                <div class="info-value">CMYK Process</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Press:</div>
                                <div class="info-value">HP Indigo 12000</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Ordered Qty:</div>
                                <div class="info-value">5,000</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Parent Sheets:</div>
                                <div class="info-value">1,700</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Run Size:</div>
                                <div class="info-value">SRA3 (320 x 450 mm)</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Imposition:</div>
                                <div class="info-value">3-up</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div class="section">
                          <div class="section-header">Production Route</div>
                          <div class="section-content">
                            <div class="production-route">
                              <div class="route-step">
                                <div class="step-circle">1</div>
                                <div class="step-label">Prepress</div>
                              </div>
                              <div class="route-step">
                                <div class="step-circle">2</div>
                                <div class="step-label">Printing</div>
                              </div>
                              <div class="route-step">
                                <div class="step-circle">3</div>
                                <div class="step-label">Finishing</div>
                              </div>
                              <div class="route-step">
                                <div class="step-circle">4</div>
                                <div class="step-label">QC</div>
                              </div>
                              <div class="route-step">
                                <div class="step-circle">5</div>
                                <div class="step-label">Packaging</div>
                              </div>
                              <div class="route-step">
                                <div class="step-circle">6</div>
                                <div class="step-label">Shipping</div>
                              </div>
                            </div>
                            
                            <div class="info-grid">
                              <div class="info-item">
                                <div class="info-label">Prepress Time:</div>
                                <div class="info-value">30 min</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Print Time:</div>
                                <div class="info-value">2 hours</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Finishing Time:</div>
                                <div class="info-value">1.5 hours</div>
                              </div>
                              <div class="info-item">
                                <div class="info-label">Total Production Time:</div>
                                <div class="info-value">4 hours</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div class="section">
                          <div class="section-header">Special Instructions</div>
                          <div class="section-content">
                            <p>Standard tri-fold. Fold with text inside. Package in cartons of 500 pieces.</p>
                          </div>
                        </div>
                        
                        <div class="qc-section">
                          <h3>FINAL QC SIGN-OFF:</h3>
                          <div class="qc-grid">
                            <div class="qc-item">
                              <div class="qc-label">Prepress</div>
                              <div class="qc-value"></div>
                            </div>
                            <div class="qc-item">
                              <div class="qc-label">Press</div>
                              <div class="qc-value"></div>
                            </div>
                            <div class="qc-item">
                              <div class="qc-label">Finishing</div>
                              <div class="qc-value"></div>
                            </div>
                            <div class="qc-item">
                              <div class="qc-label">QC Inspector</div>
                              <div class="qc-value"></div>
                            </div>
                            <div class="qc-item">
                              <div class="qc-label">Packaging</div>
                              <div class="qc-value"></div>
                            </div>
                            <div class="qc-item">
                              <div class="qc-label">Shipping</div>
                              <div class="qc-value"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </body>
                  </html>
                `}
              />
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowJobTicket(false)}>
                Close
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button>
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function X({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
