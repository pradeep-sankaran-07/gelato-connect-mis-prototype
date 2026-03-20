"use client"

import React, { useState, useEffect } from "react"
import {
  ArrowLeft, Pen, Type, Highlighter, Eraser, CheckCircle, MessageSquare,
  FileImage, Clock, User, Upload
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"
import PortalHeader, { mockCustomers, type PortalCustomer } from "./portal-header"

const commentHistory = [
  {
    id: 1,
    author: "Sarah (Premium Print Co.)",
    role: "PSP",
    time: "Mar 14, 2025 at 3:45 PM",
    message: "Hi John, we've updated the proof with the corrected logo placement. The bleed area has been extended as requested. Please review version 2.",
  },
  {
    id: 2,
    author: "Sarah (Premium Print Co.)",
    role: "PSP",
    time: "Mar 13, 2025 at 11:20 AM",
    message: "Initial proof uploaded. Please check the color accuracy against your brand guidelines. Note: The back side text has been adjusted for better readability at this card size.",
  },
]

export default function PortalProofReview() {
  const { goBack, params } = useNavigation()
  const orderId = params.orderId || "ORD-2025-142"

  const [selectedCustomer, setSelectedCustomer] = useState<PortalCustomer>(mockCustomers[0])
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [showRequestChanges, setShowRequestChanges] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [artworkStatus, setArtworkStatus] = useState<"upload" | "processing" | "review" | "approved">("review")

  const tools = [
    { id: "draw", label: "Draw", icon: Pen },
    { id: "text", label: "Text", icon: Type },
    { id: "highlight", label: "Highlight", icon: Highlighter },
    { id: "eraser", label: "Eraser", icon: Eraser },
  ]

  useEffect(() => {
    if (artworkStatus === "processing") {
      const timer = setTimeout(() => setArtworkStatus("review"), 3000)
      return () => clearTimeout(timer)
    }
  }, [artworkStatus])

  function handleSubmitFeedback() {
    if (!feedback.trim()) return
    setFeedbackSent(true)
    setTimeout(() => {
      setShowRequestChanges(false)
      setFeedbackSent(false)
      setFeedback("")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-neutral-5">
      <PortalHeader activeScreen="portal-order-detail" selectedCustomer={selectedCustomer} onCustomerChange={setSelectedCustomer} />

      {/* Demo Toggle */}
      <div className="bg-neutral-10 px-6 py-2 text-xs text-neutral-50 flex items-center gap-2">
        <span>Demo:</span>
        {(["upload", "processing", "review", "approved"] as const).map(s => (
          <button key={s} onClick={() => setArtworkStatus(s)}
            className={`px-2 py-0.5 rounded text-xs ${artworkStatus === s ? "bg-neutral-100 text-white" : "bg-white text-neutral-60 border"}`}>
            {s}
          </button>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-sm text-neutral-60 hover:text-neutral-100 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-100">Proof Review</h1>
            <p className="text-sm text-neutral-60 mt-1">{orderId} &middot; Business Cards - Premium Matte</p>
          </div>
          {artworkStatus === "review" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowRequestChanges(true)
                }}
                className="h-10 px-5 border border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors"
              >
                Request Changes
              </button>
              <button
                onClick={() => setArtworkStatus("approved")}
                className="h-10 px-5 bg-success-70 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Approve Proof
              </button>
            </div>
          )}
        </div>

        {/* Artwork Progress Stepper */}
        <div className="bg-white border border-neutral-20 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            {[
              { key: "upload", label: "Upload Artwork" },
              { key: "processing", label: "Processing" },
              { key: "review", label: "Review Proof" },
              { key: "approved", label: "Approved" },
            ].map((step, idx, arr) => (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center" style={{ minWidth: 120 }}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    step.key === artworkStatus ? "bg-info-70 text-white" :
                    arr.findIndex(s => s.key === artworkStatus) > idx ? "bg-success-70 text-white" : "bg-neutral-20 text-neutral-50"
                  }`}>
                    {arr.findIndex(s => s.key === artworkStatus) > idx ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                  </div>
                  <span className={`text-xs mt-1.5 ${step.key === artworkStatus ? "text-info-70 font-medium" : "text-neutral-50"}`}>
                    {step.label}
                  </span>
                </div>
                {idx < arr.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${arr.findIndex(s => s.key === artworkStatus) > idx ? "bg-success-70" : "bg-neutral-20"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Upload State */}
          {artworkStatus === "upload" && (
            <div className="col-span-2 space-y-4">
              <div className="bg-white border border-neutral-20 rounded-lg overflow-hidden">
                <div className="p-10 text-center">
                  <Upload className="h-14 w-14 mx-auto text-neutral-40 mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-100 mb-2">Upload Your Artwork</h3>
                  <p className="text-sm text-neutral-60 mb-6 max-w-md mx-auto">
                    Upload your print-ready artwork file. We accept PDF, AI, EPS, PSD, JPG, and TIF formats.
                  </p>
                  <div className="border-2 border-dashed border-neutral-30 rounded-lg p-8 mb-6 hover:border-info-70 transition-colors cursor-pointer max-w-lg mx-auto">
                    <p className="text-sm text-neutral-50">Drag & drop your file here, or click to browse</p>
                    <p className="text-xs text-neutral-40 mt-1">Maximum file size: 500 MB</p>
                  </div>
                  <button onClick={() => setArtworkStatus("processing")}
                    className="h-10 px-6 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90">
                    Upload File
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Processing State */}
          {artworkStatus === "processing" && (
            <div className="col-span-2 space-y-4">
              <div className="bg-white border border-neutral-20 rounded-lg p-10 text-center">
                <div className="animate-spin rounded-full h-14 w-14 border-4 border-neutral-20 border-t-info-70 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">Processing Your Artwork</h3>
                <p className="text-sm text-neutral-60 mb-4">Running preflight checks...</p>
                <div className="max-w-sm mx-auto space-y-2 text-left">
                  {["Resolution Check (300 DPI)", "Color Space (CMYK)", "Bleed Verification (3mm)", "Font Embedding"].map((check, i) => (
                    <div key={check} className="flex items-center gap-2 text-sm">
                      {i < 2 ? <CheckCircle className="h-4 w-4 text-success-70" /> : <Clock className="h-4 w-4 text-neutral-40" />}
                      <span className={i < 2 ? "text-neutral-100" : "text-neutral-50"}>{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Review State - existing proof area */}
          {artworkStatus === "review" && (
            <div className="col-span-2 space-y-4">
              {/* Annotation Toolbar */}
              <div className="bg-white border border-neutral-20 rounded-lg px-4 py-2 flex items-center gap-1">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                    className={`flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition-colors ${
                      activeTool === tool.id
                        ? "bg-neutral-100 text-white"
                        : "text-neutral-70 hover:bg-neutral-5"
                    }`}
                  >
                    <tool.icon className="h-3.5 w-3.5" />
                    {tool.label}
                  </button>
                ))}
                <div className="flex-1" />
                <span className="text-xs text-neutral-50">Click on the proof to annotate</span>
              </div>

              {/* Proof Preview */}
              <div className="bg-white border border-neutral-20 rounded-lg overflow-hidden">
                <div className="bg-neutral-10 flex items-center justify-center" style={{ minHeight: 480 }}>
                  <div className="text-center">
                    <div className="w-80 h-48 bg-neutral-20 rounded-lg mx-auto mb-4 flex items-center justify-center border border-neutral-30">
                      <div className="text-center">
                        <FileImage className="h-10 w-10 text-neutral-40 mx-auto mb-2" />
                        <p className="text-sm text-neutral-50">Business Card - Front</p>
                        <p className="text-xs text-neutral-40 mt-1">3.5&quot; x 2&quot; @ 300 DPI</p>
                      </div>
                    </div>
                    <div className="w-80 h-48 bg-neutral-20 rounded-lg mx-auto flex items-center justify-center border border-neutral-30">
                      <div className="text-center">
                        <FileImage className="h-10 w-10 text-neutral-40 mx-auto mb-2" />
                        <p className="text-sm text-neutral-50">Business Card - Back</p>
                        <p className="text-xs text-neutral-40 mt-1">3.5&quot; x 2&quot; @ 300 DPI</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Request Changes Panel */}
              {showRequestChanges && (
                <div className="bg-white border border-warning-30 rounded-lg p-5">
                  <h4 className="text-sm font-semibold text-neutral-100 mb-3">Request Changes</h4>
                  {feedbackSent ? (
                    <div className="flex items-center gap-2 text-sm text-success-70 py-4">
                      <CheckCircle className="h-4 w-4" />
                      Feedback submitted successfully! The printer will review your comments.
                    </div>
                  ) : (
                    <>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Describe the changes you'd like..."
                        className="w-full h-28 p-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 resize-none transition-colors"
                      />
                      <div className="flex items-center justify-between mt-3">
                        <button
                          onClick={() => setShowRequestChanges(false)}
                          className="text-sm text-neutral-60 hover:text-neutral-100 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmitFeedback}
                          disabled={!feedback.trim()}
                          className="h-9 px-4 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                        >
                          Submit Feedback
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Approved State */}
          {artworkStatus === "approved" && (
            <div className="col-span-2 space-y-4">
              <div className="bg-white border-2 border-success-70 rounded-lg p-10 text-center">
                <CheckCircle className="h-16 w-16 mx-auto text-success-70 mb-4" />
                <h3 className="text-xl font-semibold text-neutral-100 mb-2">Proof Approved!</h3>
                <p className="text-sm text-neutral-60 mb-1">Your proof has been approved and production will begin shortly.</p>
                <p className="text-xs text-neutral-50 mt-4">Approved on March 15, 2025 at 2:30 PM</p>
              </div>
            </div>
          )}

          {/* Right Sidebar - visible for all states except upload */}
          {artworkStatus !== "upload" && (
            <div className="space-y-5">
              {/* Proof Details */}
              <div className="bg-white border border-neutral-20 rounded-lg p-5">
                <h4 className="text-sm font-semibold text-neutral-100 mb-3">Proof Details</h4>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-60">Version</span>
                    <Badge className="bg-info-10 text-info-90 text-xs">v2</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-60">Uploaded</span>
                    <span className="text-neutral-90">Mar 15, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-60">File Type</span>
                    <span className="text-neutral-90">PDF (Hi-Res)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-60">File Size</span>
                    <span className="text-neutral-90">4.2 MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-60">Resolution</span>
                    <span className="text-neutral-90">300 DPI</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-60">Color Space</span>
                    <span className="text-neutral-90">CMYK</span>
                  </div>
                </div>
              </div>

              {/* Comment History */}
              <div className="bg-white border border-neutral-20 rounded-lg p-5">
                <h4 className="text-sm font-semibold text-neutral-100 mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-neutral-60" />
                  Comment History
                </h4>
                <div className="space-y-4">
                  {commentHistory.map((comment) => (
                    <div key={comment.id} className="border-b border-neutral-20 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-full bg-primary-10 flex items-center justify-center">
                          <User className="h-3 w-3 text-primary-90" />
                        </div>
                        <span className="text-xs font-medium text-neutral-90">{comment.author}</span>
                      </div>
                      <p className="text-sm text-neutral-70 leading-relaxed">{comment.message}</p>
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-neutral-50">
                        <Clock className="h-3 w-3" />
                        {comment.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
