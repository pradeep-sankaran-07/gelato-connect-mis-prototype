"use client"

import { useState } from "react"
import {
  Calendar,
  ChevronDown,
  Filter,
  Search,
  Truck,
  Package,
  Palette,
  FileText,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigation } from "@/lib/navigation-context"

export default function Shipments() {
  const { navigateTo } = useNavigation()
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center text-sm text-neutral-50 mb-4">
              <span className="hover:underline cursor-pointer">Logistics</span>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="font-medium text-neutral-100">Shipments</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Shipments</h1>
              <div className="flex space-x-2">
                <Button variant="outline">Create Labels in Bulk</Button>
                <Button>+ Create label</Button>
              </div>
            </div>

            <Tabs defaultValue="orders" className="mb-6" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="draft-orders">Draft Orders</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="manifests">Manifests</TabsTrigger>
                <TabsTrigger value="exported-files">Exported files</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="col-span-1">
                <div className="flex items-center border rounded-md">
                  <Calendar className="h-4 w-4 ml-3 text-neutral-50" />
                  <Input
                    type="text"
                    placeholder="May 1, 2025"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex items-center border rounded-md">
                  <Calendar className="h-4 w-4 ml-3 text-neutral-50" />
                  <Input
                    type="text"
                    placeholder="Date created to"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex items-center border rounded-md">
                  <Search className="h-4 w-4 ml-3 text-neutral-50" />
                  <Input
                    type="text"
                    placeholder="Order reference ID"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Add filter
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="ghost" size="sm">
                  Clear
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-neutral-50">72324 results</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Show Deleted Orders
                  </Button>
                  <Button variant="outline" size="sm">
                    Export Orders
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-20">
                  <thead>
                    <tr className="bg-neutral-5">
                      <th className="px-4 py-3 text-left">
                        <Checkbox />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                        Date created
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                        Order ref. ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                        Shipping Method
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                        Origin
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                        Destination
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                        Pkgs.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider">
                        Actions
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-50 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-20">
                    {/* Parcel Shipment */}
                    <tr>
                      <td className="px-4 py-3">
                        <Checkbox />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">May 23rd, 2025 03:06</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">a92edc9c-6825-4960-9766-ec8639fba21d</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="outline" className="bg-success-10 text-success-90 border-green-200">
                          Successful
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm flex items-center">
                        <Package className="h-4 w-4 mr-2 text-neutral-50" />
                        UPS Express Saver
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className="mr-2">🇩🇪</span>
                          Donauworth, Germany
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className="mr-2">🇩🇪</span>
                          Frankfurt am Main, Germany
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>

                    {/* Freight Shipment */}
                    <tr>
                      <td className="px-4 py-3">
                        <Checkbox />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">May 23rd, 2025 02:45</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">f82c1a3b-9d47-4e12-b8a5-7f2e9c4d8e6f</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="outline" className="bg-success-10 text-success-90 border-green-200">
                          Successful
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm flex items-center">
                        <Truck className="h-4 w-4 mr-2 text-neutral-50" />
                        XPO LTL Standard
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className="mr-2">🇩🇪</span>
                          Berlin, Germany
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className="mr-2">🇫🇷</span>
                          Paris, France
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">3</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>

                    {/* Pallet Shipment */}
                    <tr>
                      <td className="px-4 py-3">
                        <Checkbox />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">May 23rd, 2025 01:30</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">e5d4c3b2-a1b2-c3d4-e5f6-a7b8c9d0e1f2</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="outline" className="bg-success-10 text-success-90 border-green-200">
                          Successful
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm flex items-center">
                        <Palette className="h-4 w-4 mr-2 text-neutral-50" />
                        DB Schenker Standard Pallet
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className="mr-2">🇩🇪</span>
                          Hamburg, Germany
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className="mr-2">🇮🇹</span>
                          Milan, Italy
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">2</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>

                    {/* More Shipments */}
                    <tr>
                      <td className="px-4 py-3">
                        <Checkbox />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">May 23rd, 2025 03:06</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">6ef0ae23-7713-429e-b74b-09232acd77d9</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="outline" className="bg-success-10 text-success-90 border-green-200">
                          Successful
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm flex items-center">
                        <Package className="h-4 w-4 mr-2 text-neutral-50" />
                        DHL Parcel
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className="mr-2">🇩🇪</span>
                          Neumünster, Germany
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className="mr-2">🇩🇪</span>
                          Darmstadt, Germany
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </div>
  )
}
