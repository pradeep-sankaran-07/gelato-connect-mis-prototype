"use client"

import { Mail, Trash, Reply, Forward, MoreHorizontal, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"

export default function OutlookInterface({ onEstimateClick }: { onEstimateClick: () => void }) {
  return (
    <div className="border rounded-md overflow-hidden h-screen">
      <div className="bg-[#0078D4] text-white p-3 flex items-center justify-between">
        <div className="flex items-center">
          <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h-.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3v-3zm0 4.5v3h3v-3zm0 4.5v3h3v-3zm-5.25-9v3h3v-3zm0 4.5v3h3v-3zm0 4.5v3h3v-3z" />
          </svg>
          <span className="font-semibold">Outlook</span>
        </div>
        <div className="flex items-center">
          <input type="text" placeholder="Search" className="px-3 py-1 rounded text-black text-sm w-64" />
        </div>
      </div>

      <div className="flex h-[calc(100vh-48px)]">
        <div className="w-64 bg-neutral-5 p-3 border-r h-full">
          <Button variant="outline" className="w-full mb-4 justify-start">
            <Mail className="mr-2 h-4 w-4" />
            Inbox
            <Badge className="ml-auto bg-[#0078D4]">1</Badge>
          </Button>

          <div className="space-y-1 text-sm text-neutral-70">
            <div className="px-2 py-1 hover:bg-neutral-10 rounded cursor-pointer">Drafts</div>
            <div className="px-2 py-1 hover:bg-neutral-10 rounded cursor-pointer">Sent Items</div>
            <div className="px-2 py-1 hover:bg-neutral-10 rounded cursor-pointer">Deleted Items</div>
            <div className="px-2 py-1 hover:bg-neutral-10 rounded cursor-pointer">Junk Email</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="border-b p-3 bg-neutral-5">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Inbox</h3>
              <div className="flex items-center text-sm text-neutral-50">
                <span>Sort: Newest</span>
              </div>
            </div>
          </div>

          <div className="border-b bg-[#E3F2FD] p-3 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Avatar>
                  <div className="bg-neutral-20 h-10 w-10 rounded-full flex items-center justify-center text-neutral-70">
                    AC
                  </div>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className="font-semibold">Alex Chen - PrintCo Ltd</span>
                  <span className="text-sm text-neutral-50">10:05 AM</span>
                </div>
                <div className="font-semibold">Quote Request - 5000 Brochures</div>
                <div className="text-sm text-neutral-70 truncate">
                  Please provide a quote for 5000 A4 brochures, full color, double-sided, on 200gsm gloss paper,
                  tri-fold...
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 flex-1 overflow-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">Quote Request - 5000 Brochures</h2>
                <div className="text-sm text-neutral-50 mt-1">From: Alex Chen &lt;alex.chen@printco.com&gt;</div>
                <div className="text-sm text-neutral-50">To: sales@gelatoprint.com</div>
                <div className="text-sm text-neutral-50">Today, 10:05 AM</div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Reply className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Forward className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="border-t pt-4 pb-6">
              <p className="mb-4">Hello,</p>
              <p className="mb-4">I would like to request a quote for the following print job:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>
                  <strong>Item:</strong> Tri-fold Brochures
                </li>
                <li>
                  <strong>Quantity:</strong> 5,000 pieces
                </li>
                <li>
                  <strong>Size:</strong> A4 (210 x 297 mm)
                </li>
                <li>
                  <strong>Paper:</strong> 200gsm Gloss
                </li>
                <li>
                  <strong>Printing:</strong> Full color, double-sided (4/4)
                </li>
                <li>
                  <strong>Finishing:</strong> Tri-fold
                </li>
                <li>
                  <strong>Delivery:</strong> Standard shipping to London office
                </li>
                <li>
                  <strong>Timeline:</strong> Need delivery by June 1st
                </li>
              </ul>
              <p className="mb-4">Please include a breakdown of costs and any available discounts for this quantity.</p>
              <p className="mb-4">Thank you,</p>
              <p>
                Alex Chen
                <br />
                Marketing Manager
                <br />
                PrintCo Ltd
                <br />
                +44 20 1234 5678
              </p>
            </div>
          </div>

          <div className="bg-[#F3F9FF] p-3 border-t flex items-center mt-auto">
            <div
              className="flex items-center bg-white rounded-md border p-3 ml-auto cursor-pointer hover:bg-neutral-5"
              onClick={onEstimateClick}
            >
              <div className="bg-[#0078D4] text-white rounded-full p-1 mr-3 flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2819%29-170UxeV7cg8b7kNjFagZkz9quPldwr.png"
                  alt="GelatoConnect Logo"
                  className="h-5 w-5"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-[#0078D4]">Estimate #18 created</span>
                  <span className="ml-2 px-2 py-0.5 bg-neutral-5 rounded-full text-xs flex items-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2819%29-170UxeV7cg8b7kNjFagZkz9quPldwr.png"
                      alt="GelatoConnect Logo"
                      className="h-5 w-5 mr-1"
                    />
                    AI Generated
                  </span>
                </div>
                <div className="text-sm text-neutral-60 mt-1">by ConnectAI - the print estimation agent</div>
                <div className="text-sm text-[#0078D4] flex items-center mt-1 font-medium">
                  <ExternalLink className="h-3 w-3 mr-1" /> Click to open in GelatoConnect
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
