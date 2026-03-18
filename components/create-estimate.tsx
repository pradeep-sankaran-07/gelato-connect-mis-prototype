"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  ArrowLeft,
  X,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Upload,
  Download,
  Paperclip,
  Trash2,
  FileSpreadsheet,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function CreateEstimate({ onBackClick }: { onBackClick: () => void }) {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", isExpanded: true, category: "", quantities: [{ quantity: 1000, price: 0 }] },
  ])
  const [activeTab, setActiveTab] = useState("manual")
  const [showQuantityTable, setShowQuantityTable] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
    setProducts([
      ...products,
      {
        id: newId,
        name: `Product ${newId}`,
        isExpanded: true,
        category: "",
        quantities: [{ quantity: 1000, price: 0 }],
      },
    ])
  }

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts(products.filter((product) => product.id !== id))
    }
  }

  const toggleProductExpansion = (id: number) => {
    setProducts(
      products.map((product) => (product.id === id ? { ...product, isExpanded: !product.isExpanded } : product)),
    )
  }

  const updateProductName = (id: number, name: string) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, name } : product)))
  }

  const updateProductCategory = (id: number, category: string) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, category } : product)))
  }

  const addQuantityRow = (productId: number) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const lastQuantity = product.quantities[product.quantities.length - 1]?.quantity || 0
          return {
            ...product,
            quantities: [...product.quantities, { quantity: lastQuantity + 1000, price: 0 }],
          }
        }
        return product
      }),
    )
  }

  const removeQuantityRow = (productId: number, index: number) => {
    if (index === 0) return // Don't remove the first row

    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const newQuantities = [...product.quantities]
          newQuantities.splice(index, 1)
          return { ...product, quantities: newQuantities }
        }
        return product
      }),
    )
  }

  const updateQuantity = (productId: number, index: number, quantity: number) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const newQuantities = [...product.quantities]
          newQuantities[index] = { ...newQuantities[index], quantity }
          return { ...product, quantities: newQuantities }
        }
        return product
      }),
    )
  }

  const updatePrice = (productId: number, index: number, price: number) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const newQuantities = [...product.quantities]
          newQuantities[index] = { ...newQuantities[index], price }
          return { ...product, quantities: newQuantities }
        }
        return product
      }),
    )
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real implementation, this would parse the Excel file
      // For demo purposes, we'll simulate loading products from Excel
      setProducts([
        {
          id: 1,
          name: "Business Cards",
          isExpanded: true,
          category: "Business Cards",
          quantities: [
            { quantity: 250, price: 45 },
            { quantity: 500, price: 65 },
            { quantity: 1000, price: 95 },
          ],
        },
        {
          id: 2,
          name: "Brochures",
          isExpanded: true,
          category: "Brochure",
          quantities: [
            { quantity: 500, price: 350 },
            { quantity: 1000, price: 550 },
            { quantity: 2500, price: 1200 },
          ],
        },
      ])
      setActiveTab("manual")
      setShowQuantityTable(true)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleExportExcel = () => {
    // In a real implementation, this would generate and download an Excel file
    // For demo purposes, we'll just show an alert
    alert("Exporting estimates to Excel file...")
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
            Save as draft
          </Button>
          <Button variant="outline" size="sm">
            View PDF
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6">Create a new estimate</h2>

          <div className="border rounded-md mb-6">
            <div className="flex items-center justify-between p-4 border-b bg-neutral-5">
              <h3 className="font-medium">Basic details</h3>
              <Button variant="ghost" size="sm">
                <ChevronUp className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job name</label>
                <Input placeholder="Customer product name" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Customer</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or create a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="printco">PrintCo Ltd</SelectItem>
                    <SelectItem value="sandbox">Sandbox</SelectItem>
                    <SelectItem value="athletix">Athletix</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="excel">Excel Import</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={addProduct}>
                    <Plus className="h-4 w-4 mr-1" /> Add Product
                  </Button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                  />

                  {activeTab === "excel" && (
                    <Button variant="outline" size="sm" onClick={triggerFileUpload}>
                      <Upload className="h-4 w-4 mr-1" /> Upload Excel
                    </Button>
                  )}
                </div>
              </div>

              <TabsContent value="manual" className="mt-0">
                {products.map((product, index) => (
                  <div key={product.id} className="border rounded-md mb-4">
                    <div className="flex items-center justify-between p-3 border-b bg-neutral-5">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProductExpansion(product.id)}
                          className="mr-2"
                        >
                          {product.isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                        <h3 className="font-medium flex items-center">
                          <span className="mr-2">{product.name}</span>
                          {index > 0 && (
                            <Badge variant="outline" className="text-xs">
                              Additional Product
                            </Badge>
                          )}
                        </h3>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(product.id)}
                          disabled={products.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-neutral-50" />
                        </Button>
                      </div>
                    </div>

                    {product.isExpanded && (
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Product Name</label>
                            <Input
                              value={product.name}
                              onChange={(e) => updateProductName(product.id, e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Product Category</label>
                            <Select
                              value={product.category}
                              onValueChange={(value) => updateProductCategory(product.id, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select product category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="brochure">Brochure</SelectItem>
                                <SelectItem value="flyer">Flyer</SelectItem>
                                <SelectItem value="book">Book</SelectItem>
                                <SelectItem value="businesscard">Business Card</SelectItem>
                                <SelectItem value="poster">Poster</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <label className="font-medium text-sm">Specifications</label>
                            <div className="flex items-center">
                              <Switch
                                id={`quantity-table-${product.id}`}
                                checked={showQuantityTable}
                                onCheckedChange={setShowQuantityTable}
                              />
                              <Label htmlFor={`quantity-table-${product.id}`} className="ml-2 text-sm">
                                Multi-quantity pricing
                              </Label>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Size</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="a4">A4</SelectItem>
                                  <SelectItem value="a5">A5</SelectItem>
                                  <SelectItem value="a6">A6</SelectItem>
                                  <SelectItem value="letter">Letter</SelectItem>
                                  <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Orientation</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select orientation" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="portrait">Portrait</SelectItem>
                                  <SelectItem value="landscape">Landscape</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Paper Type</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select paper type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="gloss">Gloss</SelectItem>
                                  <SelectItem value="matte">Matte</SelectItem>
                                  <SelectItem value="uncoated">Uncoated</SelectItem>
                                  <SelectItem value="recycled">Recycled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Paper Weight</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select paper weight" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="80">80 gsm</SelectItem>
                                  <SelectItem value="100">100 gsm</SelectItem>
                                  <SelectItem value="120">120 gsm</SelectItem>
                                  <SelectItem value="170">170 gsm</SelectItem>
                                  <SelectItem value="250">250 gsm</SelectItem>
                                  <SelectItem value="300">300 gsm</SelectItem>
                                  <SelectItem value="350">350 gsm</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Sides</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select sides" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="single">Single-sided</SelectItem>
                                  <SelectItem value="double">Double-sided</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Color</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="full">Full color</SelectItem>
                                  <SelectItem value="bw">Black & White</SelectItem>
                                  <SelectItem value="spot">Spot Color</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="flex items-center justify-between mb-3">
                              <label className="font-medium text-sm">Pricing</label>
                              <Button variant="ghost" size="sm" onClick={() => addQuantityRow(product.id)}>
                                <Plus className="h-4 w-4 mr-1" /> Add Quantity
                              </Button>
                            </div>

                            {showQuantityTable ? (
                              <div className="border rounded-md overflow-hidden">
                                <table className="w-full">
                                  <thead>
                                    <tr className="bg-neutral-5 text-left">
                                      <th className="px-4 py-2 text-sm font-medium text-neutral-50">Quantity</th>
                                      <th className="px-4 py-2 text-sm font-medium text-neutral-50">Unit Price</th>
                                      <th className="px-4 py-2 text-sm font-medium text-neutral-50">Total Price</th>
                                      <th className="px-4 py-2 text-sm font-medium text-neutral-50 w-10"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {product.quantities.map((q, idx) => (
                                      <tr key={idx} className="border-t">
                                        <td className="px-4 py-2">
                                          <Input
                                            type="number"
                                            value={q.quantity}
                                            onChange={(e) =>
                                              updateQuantity(product.id, idx, Number.parseInt(e.target.value) || 0)
                                            }
                                            className="w-full"
                                          />
                                        </td>
                                        <td className="px-4 py-2">
                                          <Input
                                            type="number"
                                            value={q.price}
                                            onChange={(e) =>
                                              updatePrice(product.id, idx, Number.parseFloat(e.target.value) || 0)
                                            }
                                            className="w-full"
                                            step="0.01"
                                          />
                                        </td>
                                        <td className="px-4 py-2 text-sm">EUR {(q.quantity * q.price).toFixed(2)}</td>
                                        <td className="px-4 py-2">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeQuantityRow(product.id, idx)}
                                            disabled={idx === 0}
                                          >
                                            <Minus className="h-4 w-4 text-neutral-50" />
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium mb-1">Quantity</label>
                                  <Input
                                    type="number"
                                    value={product.quantities[0].quantity}
                                    onChange={(e) =>
                                      updateQuantity(product.id, 0, Number.parseInt(e.target.value) || 0)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1">Price</label>
                                  <Input
                                    type="number"
                                    value={product.quantities[0].price}
                                    onChange={(e) => updatePrice(product.id, 0, Number.parseFloat(e.target.value) || 0)}
                                    step="0.01"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="excel" className="mt-0">
                <div className="border rounded-md p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-neutral-5 rounded-full flex items-center justify-center mb-4">
                    <FileSpreadsheet className="h-8 w-8 text-neutral-50" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Import from Excel</h3>
                  <p className="text-neutral-50 mb-6 max-w-md mx-auto">
                    Upload an Excel file with product specifications to automatically create estimates for multiple
                    products.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button onClick={triggerFileUpload}>
                      <Upload className="h-4 w-4 mr-2" /> Upload Excel File
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" /> Download Template
                    </Button>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-medium mb-2">Export to Excel</h3>
                    <p className="text-neutral-50 mb-6 max-w-md mx-auto">
                      Export your current estimates to an Excel file for sharing or further editing.
                    </p>
                    <Button onClick={handleExportExcel}>
                      <Download className="h-4 w-4 mr-2" /> Export Estimates to Excel
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="border rounded-md mb-6">
            <div className="flex items-center justify-between p-4 border-b bg-neutral-5">
              <h3 className="font-medium">Additional Information</h3>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-5 w-5" />
              </Button>
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
                className="h-6 w-6 mr-2"
              />
              <span className="font-medium">ConnectAI</span>
            </div>
            <Button variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">What would you like to estimate?</h3>
              <p className="text-sm text-neutral-50 mb-4">Describe the product or upload a file to get started</p>
              <Textarea placeholder="Describe the product you want to estimate..." className="bg-white mb-4" rows={4} />
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Send className="h-4 w-4 mr-2" /> Send
                </Button>
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
