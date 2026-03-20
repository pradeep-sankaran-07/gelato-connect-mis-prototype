"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Download, Calendar, Settings, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNavigation } from "@/lib/navigation-context"

export default function ManageOrders() {
  const { navigateTo } = useNavigation()
  const [orderType, setOrderType] = useState("job-based")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // Sample data for job-based orders (from estimates)
  const jobBasedOrders = [
    {
      id: "j-18-pc-5000",
      customerOrderId: "PO-2025-05-18",
      date: "21.05.2025 03:29",
      customer: "PrintCo Ltd",
      destination: "🇬🇧 United Kingdom",
      status: "In Production",
    },
    {
      id: "j-19-sb-2500",
      customerOrderId: "SB-2025-05-17",
      date: "21.05.2025 03:29",
      customer: "Sandbox",
      destination: "🇺🇸 United States",
      status: "Printed",
    },
    {
      id: "j-20-at-10000",
      customerOrderId: "AT-2025-05-16",
      date: "21.05.2025 03:27",
      customer: "Athletix",
      destination: "🇩🇪 Germany",
      status: "In Production",
    },
    {
      id: "j-21-pc-1000",
      customerOrderId: "PO-2025-05-15",
      date: "20.05.2025 10:15",
      customer: "PrintCo Ltd",
      destination: "🇬🇧 United Kingdom",
      status: "Delivered",
    },
  ]

  // Sample data for product-based orders (from API)
  const productBasedOrders = [
    {
      id: "fa1d1025-00ce-40a0-aaec-39...",
      customerOrderId: "331e2a10-273c-42ad-b223-1...",
      date: "21.05.2025 03:29",
      customer: "Athletix",
      destination: "🇩🇪 Germany",
      status: "In Production",
    },
    {
      id: "988d46e2-5cba-4a32-9ee8-d...",
      customerOrderId: "0cbd92d3-c423-4e0d-9439-2...",
      date: "21.05.2025 03:29",
      customer: "Telematrix",
      destination: "🇩🇪 Germany",
      status: "Printed",
    },
    {
      id: "583f509a-3bd3-4346-b13a-0...",
      customerOrderId: "d62399ee-9bd0-45fe-95c5-4...",
      date: "21.05.2025 03:29",
      customer: "Telematrix",
      destination: "🇮🇹 Italy",
      status: "In Production",
    },
    {
      id: "bcbaff50-902c-408b-9e21-d...",
      customerOrderId: "d6f74a1c-ceed-494d-b152-4...",
      date: "21.05.2025 03:29",
      customer: "Athletix",
      destination: "🇩🇪 Germany",
      status: "In Production",
    },
    {
      id: "6570a2ce-5462-4427-aa6f-d...",
      customerOrderId: "ad7f964e-0509-4871-9bfb-6...",
      date: "21.05.2025 03:27",
      customer: "Simeron",
      destination: "🇩🇪 Germany",
      status: "In Production",
    },
    {
      id: "fbed5ab0-26f5-49b2-8bf0-12...",
      customerOrderId: "b2525274-49f0-44ec-ba57-6...",
      date: "21.05.2025 03:27",
      customer: "dynamotors",
      destination: "🇩🇪 Germany",
      status: "Delivered",
    },
  ]

  const orders = orderType === "job-based" ? jobBasedOrders : productBasedOrders

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map((order) => order.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  const handleOrderClick = (orderId: string) => {
    navigateTo("order-detail", { orderId })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Production":
        return <Badge className="bg-info-10 text-info-90 rounded-full">In Production</Badge>
      case "Printed":
        return <Badge className="bg-success-10 text-success-90 rounded-full">Printed</Badge>
      case "Delivered":
        return <Badge className="bg-success-10 text-success-90 rounded-full">Delivered</Badge>
      default:
        return <Badge className="bg-neutral-5 text-neutral-90 rounded-full">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Manage Orders</h1>
              <div className="flex gap-2">
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Last 30 days
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                  <DropdownMenuItem>Custom range</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Input placeholder="Gelato Order ID" className="w-48" />
              <Input placeholder="Package ID" className="w-48" />
              <Input placeholder="Customer Order ID" className="w-48" />

              <Select>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="printco">PrintCo Ltd</SelectItem>
                  <SelectItem value="athletix">Athletix</SelectItem>
                  <SelectItem value="sandbox">Sandbox</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Facility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Facilities</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="berlin">Berlin</SelectItem>
                  <SelectItem value="paris">Paris</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="in-production">In Production</SelectItem>
                  <SelectItem value="printed">Printed</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Fail type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="artwork">Artwork</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="shipping">Shipping</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Routing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Routes</SelectItem>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>

              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Order Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job-based">Job Based</SelectItem>
                  <SelectItem value="product-based">Product Based</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="ml-auto bg-transparent">
                Clear
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" className="text-neutral-50 bg-transparent">
                Reprocess failed orders
              </Button>
              <Button variant="outline" className="text-neutral-50 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
            </div>

            <div className="border rounded-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-5 border-b">
                      <th className="p-3 text-left">
                        <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
                      </th>
                      <th className="p-3 text-left font-medium text-neutral-60">Gelato Order ID</th>
                      <th className="p-3 text-left font-medium text-neutral-60">Customer Order ID</th>
                      <th className="p-3 text-left font-medium text-neutral-60">Date</th>
                      <th className="p-3 text-left font-medium text-neutral-60">Customer</th>
                      <th className="p-3 text-left font-medium text-neutral-60">Destination</th>
                      <th className="p-3 text-left font-medium text-neutral-60">Status</th>
                      <th className="p-3 text-left font-medium text-neutral-60"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr
                        key={order.id}
                        className={`border-b hover:bg-neutral-5 ${index === 0 ? "cursor-pointer" : ""}`}
                        onClick={index === 0 ? () => handleOrderClick(order.id) : undefined}
                      >
                        <td className="p-3">
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={() => handleSelectOrder(order.id)}
                            onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
                          />
                        </td>
                        <td className="p-3 font-mono text-sm">{order.id}</td>
                        <td className="p-3 font-mono text-sm">{order.customerOrderId}</td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">{order.customer}</td>
                        <td className="p-3">{order.destination}</td>
                        <td className="p-3">{getStatusBadge(order.status)}</td>
                        <td className="p-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (index === 0) {
                                handleOrderClick(order.id)
                              }
                            }}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </div>
  )
}
