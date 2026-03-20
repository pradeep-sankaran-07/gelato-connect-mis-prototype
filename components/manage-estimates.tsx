"use client"

import { Search, MoreVertical, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"

export default function ManageEstimates() {
  const { navigateTo } = useNavigation()

  // Function to render status badge with appropriate styling
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Draft":
        return (
          <Badge variant="outline" className="bg-neutral-5">
            Draft
          </Badge>
        )
      case "Waiting for response":
        return <Badge className="bg-info-10 text-info-90 border-neutral-20">Waiting for response</Badge>
      case "Follow up send":
        return <Badge className="bg-primary-10 text-primary-90 border-neutral-20">Follow up send</Badge>
      case "Rejected":
        return <Badge className="bg-critical-10 text-critical-90 border-neutral-20">Rejected</Badge>
      case "Won - Job created":
        return <Badge className="bg-success-10 text-success-90 border-neutral-20">Won - Job created</Badge>
      case "Accepted":
        return <Badge className="bg-success-10 text-success-90 border-neutral-20">Accepted</Badge>
      default:
        return (
          <Badge variant="outline" className="bg-neutral-5">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage estimates</h2>
        <Button onClick={() => navigateTo("create-estimate")} className="bg-black hover:bg-neutral-90 text-white">
          Create new estimate
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative">
          <div className="flex items-center border rounded-md px-3 py-2 w-[180px] cursor-pointer">
            <Calendar className="h-4 w-4 mr-2 text-neutral-50" />
            <span>Last 7 days</span>
            <ChevronDown className="h-4 w-4 ml-auto text-neutral-50" />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center border rounded-md px-3 py-2 w-[180px] cursor-pointer">
            <span>Status</span>
            <ChevronDown className="h-4 w-4 ml-auto text-neutral-50" />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center border rounded-md px-3 py-2 w-[180px] cursor-pointer">
            <span>Customer</span>
            <ChevronDown className="h-4 w-4 ml-auto text-neutral-50" />
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-50" />
            <Input type="text" placeholder="Search for a job name or #" className="pl-9" />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center border rounded-md px-3 py-2 w-[180px] cursor-pointer">
            <span>Sort by: Last updated</span>
            <ChevronDown className="h-4 w-4 ml-auto text-neutral-50" />
          </div>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-5 text-left">
              <th className="px-4 py-3 text-sm font-medium text-neutral-50">#</th>
              <th className="px-4 py-3 text-sm font-medium text-neutral-50">Job name</th>
              <th className="px-4 py-3 text-sm font-medium text-neutral-50">Estimate number</th>
              <th className="px-4 py-3 text-sm font-medium text-neutral-50">Date modified</th>
              <th className="px-4 py-3 text-sm font-medium text-neutral-50">Customer</th>
              <th className="px-4 py-3 text-sm font-medium text-neutral-50">Estimate value</th>
              <th className="px-4 py-3 text-sm font-medium text-neutral-50">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-neutral-50"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[#F3F9FF] border-b cursor-pointer hover:bg-[#E3F2FD]" onClick={() => navigateTo("estimate-detail")}>
              <td className="px-4 py-3 text-sm">1</td>
              <td className="px-4 py-3 font-medium">PrintCo Tri-fold Brochures</td>
              <td className="px-4 py-3 text-sm">18</td>
              <td className="px-4 py-3 text-sm">May 16th, 2025 10:09</td>
              <td className="px-4 py-3 text-sm">PrintCo Ltd</td>
              <td className="px-4 py-3 text-sm">EUR 1,250.00</td>
              <td className="px-4 py-3">{renderStatusBadge("Draft")}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </tr>
            <tr className="border-b hover:bg-neutral-5">
              <td className="px-4 py-3 text-sm">2</td>
              <td className="px-4 py-3 font-medium">Paragon Annual Report</td>
              <td className="px-4 py-3 text-sm">17</td>
              <td className="px-4 py-3 text-sm">May 15th, 2025 09:59</td>
              <td className="px-4 py-3 text-sm">Paragon Publishing</td>
              <td className="px-4 py-3 text-sm">EUR 2,487.50</td>
              <td className="px-4 py-3">{renderStatusBadge("Waiting for response")}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </tr>
            <tr className="border-b hover:bg-neutral-5">
              <td className="px-4 py-3 text-sm">3</td>
              <td className="px-4 py-3 font-medium">TechCorp Product Catalogs</td>
              <td className="px-4 py-3 text-sm">16</td>
              <td className="px-4 py-3 text-sm">May 14th, 2025 12:55</td>
              <td className="px-4 py-3 text-sm">TechCorp Inc</td>
              <td className="px-4 py-3 text-sm">EUR 3,125.75</td>
              <td className="px-4 py-3">{renderStatusBadge("Follow up send")}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </tr>
            <tr className="border-b hover:bg-neutral-5">
              <td className="px-4 py-3 text-sm">4</td>
              <td className="px-4 py-3 font-medium">GreenLeaf Eco Flyers</td>
              <td className="px-4 py-3 text-sm">15</td>
              <td className="px-4 py-3 text-sm">May 14th, 2025 11:04</td>
              <td className="px-4 py-3 text-sm">GreenLeaf Sustainability</td>
              <td className="px-4 py-3 text-sm">EUR 702.32</td>
              <td className="px-4 py-3">{renderStatusBadge("Rejected")}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </tr>
            <tr className="border-b hover:bg-neutral-5">
              <td className="px-4 py-3 text-sm">5</td>
              <td className="px-4 py-3 font-medium">MediCare Health Booklets</td>
              <td className="px-4 py-3 text-sm">14</td>
              <td className="px-4 py-3 text-sm">May 13th, 2025 20:25</td>
              <td className="px-4 py-3 text-sm">MediCare Solutions</td>
              <td className="px-4 py-3 text-sm">EUR 2,162.81</td>
              <td className="px-4 py-3">{renderStatusBadge("Won - Job created")}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </tr>
            <tr className="border-b hover:bg-neutral-5">
              <td className="px-4 py-3 text-sm">6</td>
              <td className="px-4 py-3 font-medium">Luxury Hotel Brochures</td>
              <td className="px-4 py-3 text-sm">13</td>
              <td className="px-4 py-3 text-sm">May 13th, 2025 20:21</td>
              <td className="px-4 py-3 text-sm">Grand Hospitality Group</td>
              <td className="px-4 py-3 text-sm">EUR 2,129.01</td>
              <td className="px-4 py-3">{renderStatusBadge("Accepted")}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </tr>
            <tr className="border-b hover:bg-neutral-5">
              <td className="px-4 py-3 text-sm">7</td>
              <td className="px-4 py-3 font-medium">BioZen Wellness Guides</td>
              <td className="px-4 py-3 text-sm">9</td>
              <td className="px-4 py-3 text-sm">May 13th, 2025 17:44</td>
              <td className="px-4 py-3 text-sm">BioZen Wellness</td>
              <td className="px-4 py-3 text-sm">EUR 1,180.13</td>
              <td className="px-4 py-3">{renderStatusBadge("Won - Job created")}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </tr>
            <tr className="border-b hover:bg-neutral-5">
              <td className="px-4 py-3 text-sm">8</td>
              <td className="px-4 py-3 font-medium">Athletix Training Manuals</td>
              <td className="px-4 py-3 text-sm">10</td>
              <td className="px-4 py-3 text-sm">May 13th, 2025 17:44</td>
              <td className="px-4 py-3 text-sm">Athletix Sports</td>
              <td className="px-4 py-3 text-sm">EUR 1,534.86</td>
              <td className="px-4 py-3">{renderStatusBadge("Waiting for response")}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </tr>
            <tr className="border-b hover:bg-neutral-5">
              <td className="px-4 py-3 text-sm">9</td>
              <td className="px-4 py-3 font-medium">FestivalPro Event Programs</td>
              <td className="px-4 py-3 text-sm">12</td>
              <td className="px-4 py-3 text-sm">May 13th, 2025 09:42</td>
              <td className="px-4 py-3 text-sm">FestivalPro Events</td>
              <td className="px-4 py-3 text-sm">EUR 1,875.50</td>
              <td className="px-4 py-3">{renderStatusBadge("Follow up send")}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-neutral-50">
        <div>Showing 1-9 of 12 estimates</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
