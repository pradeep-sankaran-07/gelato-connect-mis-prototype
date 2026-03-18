"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Info } from "lucide-react"
import Header from "@/components/header"
import LeftMenu from "@/components/left-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Sample customer data
const customers = [
  { id: "acme-corp", name: "Acme Corp", status: "Active" },
  { id: "beta-solutions", name: "Beta Solutions", status: "Active" },
  { id: "gamma-industries", name: "Gamma Industries", status: "Active" },
  { id: "delta-enterprises", name: "Delta Enterprises", status: "Inactive" },
  { id: "epsilon-tech", name: "Epsilon Tech", status: "Active" },
  { id: "zeta-systems", name: "Zeta Systems", status: "Active" },
  { id: "theta-innovations", name: "Theta Innovations", status: "Active" },
  { id: "omega-designs", name: "Omega Designs", status: "Active" },
]

// Sample customer details
const customerDetails = {
  "acme-corp": {
    name: "Acme Corp",
    currency: "British Poundsterling",
    estimationEnabled: "Yes",
    contacts: [
      { name: "Jane Smith", email: "jane@acmecorp.com", phone: "+44111111111", primary: true },
      { name: "John Doe", email: "john@acmecorp.com", phone: "+44112345212", primary: false },
      { name: "Sarah Johnson", email: "sarah@acmecorp.com", phone: "+44112345213", primary: false },
    ],
    salesRep: "Mary Purwanegara",
    cse: "Josh Callahan",
    estimator: "Amy Farah Fowler",
    invoicingTerms: "Net 30",
    invoiceEmail: "accounts@acmecorp.com",
    invoiceTrigger: "automatic",
  },
  "beta-solutions": {
    name: "Beta Solutions",
    currency: "US Dollar",
    estimationEnabled: "Yes",
    contacts: [
      { name: "Michael Brown", email: "michael@betasolutions.com", phone: "+1555123456", primary: true },
      { name: "Emily Clark", email: "emily@betasolutions.com", phone: "+1555789012", primary: false },
    ],
    salesRep: "David Wilson",
    cse: "Rebecca Moore",
    estimator: "James Taylor",
    invoicingTerms: "Net 15",
    invoiceEmail: "finance@betasolutions.com",
    invoiceTrigger: "days_after",
    daysAfterShipment: 7,
  },
  "gamma-industries": {
    name: "Gamma Industries",
    currency: "Euro",
    estimationEnabled: "Yes",
    contacts: [
      { name: "Robert Martin", email: "robert@gammaindustries.eu", phone: "+33123456789", primary: true },
      { name: "Sophie Dubois", email: "sophie@gammaindustries.eu", phone: "+33987654321", primary: false },
    ],
    salesRep: "Pierre Leclerc",
    cse: "Marie Dupont",
    estimator: "Jean Rousseau",
    invoicingTerms: "Net 45",
    invoiceEmail: "accounting@gammaindustries.eu",
    invoiceTrigger: "consolidated",
    consolidationType: "monthly",
  },
  "delta-enterprises": {
    name: "Delta Enterprises",
    currency: "Japanese Yen",
    estimationEnabled: "No",
    contacts: [{ name: "Takashi Yamamoto", email: "takashi@deltaent.jp", phone: "+81312345678", primary: true }],
    salesRep: "Kenji Nakamura",
    cse: "Yuki Tanaka",
    estimator: "Hiroshi Suzuki",
    invoicingTerms: "Net 60",
    invoiceEmail: "finance@deltaent.jp",
    invoiceTrigger: "manual",
  },
  "epsilon-tech": {
    name: "Epsilon Tech",
    currency: "British Poundsterling",
    estimationEnabled: "Yes",
    contacts: [
      { name: "William Harris", email: "william@epsilontech.co.uk", phone: "+44123456789", primary: true },
      { name: "Elizabeth Taylor", email: "elizabeth@epsilontech.co.uk", phone: "+44987654321", primary: false },
    ],
    salesRep: "George Davies",
    cse: "Victoria Wilson",
    estimator: "Edward Thompson",
    invoicingTerms: "Net 30",
    invoiceEmail: "accounts@epsilontech.co.uk",
    invoiceTrigger: "automatic",
  },
  "zeta-systems": {
    name: "Zeta Systems",
    currency: "Australian Dollar",
    estimationEnabled: "Yes",
    contacts: [{ name: "James Wilson", email: "james@zetasystems.com.au", phone: "+61234567890", primary: true }],
    salesRep: "Sarah Johnson",
    cse: "Michael Brown",
    estimator: "Emma Davis",
    invoicingTerms: "Net 15",
    invoiceEmail: "billing@zetasystems.com.au",
    invoiceTrigger: "consolidated",
    consolidationType: "weekly",
  },
  "theta-innovations": {
    name: "Theta Innovations",
    currency: "Canadian Dollar",
    estimationEnabled: "Yes",
    contacts: [
      { name: "David Miller", email: "david@thetainnovations.ca", phone: "+1416123456", primary: true },
      { name: "Jennifer Wilson", email: "jennifer@thetainnovations.ca", phone: "+1416789012", primary: false },
    ],
    salesRep: "Robert Clark",
    cse: "Patricia Moore",
    estimator: "Thomas Anderson",
    invoicingTerms: "Net 30",
    invoiceEmail: "accounts@thetainnovations.ca",
    invoiceTrigger: "days_after",
    daysAfterShipment: 14,
  },
  "omega-designs": {
    name: "Omega Designs",
    currency: "Singapore Dollar",
    estimationEnabled: "Yes",
    contacts: [
      { name: "Li Wei", email: "liwei@omegadesigns.sg", phone: "+6561234567", primary: true },
      { name: "Chen Mei", email: "chenmei@omegadesigns.sg", phone: "+6567890123", primary: false },
    ],
    salesRep: "Tan Hui Ling",
    cse: "Wong Jian Hao",
    estimator: "Lim Siew Mei",
    invoicingTerms: "Net 45",
    invoiceEmail: "finance@omegadesigns.sg",
    invoiceTrigger: "manual",
  },
}

interface CustomerManagementProps {
  onBackClick: () => void
  onInventoryClick: () => void
  onInventoryAllocationClick: () => void
  onOrderClick: () => void
  onSchedulingClick: () => void
  onControlPanelClick: () => void
  onPerformanceClick: () => void
  onCustomersClick: () => void
  onProductionTrackerClick: () => void
  onProductionStationsClick: () => void
  onLogisticsAnalyticsClick: () => void
  onShipmentsClick: () => void
}

export default function CustomerManagement({
  onBackClick,
  onInventoryClick,
  onInventoryAllocationClick,
  onOrderClick,
  onSchedulingClick,
  onControlPanelClick,
  onPerformanceClick,
  onCustomersClick,
  onProductionTrackerClick,
  onProductionStationsClick,
  onLogisticsAnalyticsClick,
  onShipmentsClick,
}: CustomerManagementProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [isEditingInvoice, setIsEditingInvoice] = useState(false)
  const [invoiceTerms, setInvoiceTerms] = useState("")
  const [invoiceTrigger, setInvoiceTrigger] = useState("")
  const [daysAfterShipment, setDaysAfterShipment] = useState(7)
  const [consolidationType, setConsolidationType] = useState("monthly")
  const [customTerms, setCustomTerms] = useState("")
  const [showCustomTerms, setShowCustomTerms] = useState(false)
  const [invoiceEmail, setInvoiceEmail] = useState("")

  const handleCustomerClick = (customerId: string) => {
    setSelectedCustomerId(customerId)
    if (customerId) {
      const customer = customerDetails[customerId as keyof typeof customerDetails]
      setInvoiceTerms(customer.invoicingTerms)
      setInvoiceTrigger(customer.invoiceTrigger || "automatic")
      setDaysAfterShipment(customer.daysAfterShipment || 7)
      setConsolidationType(customer.consolidationType || "monthly")
      setShowCustomTerms(customer.invoicingTerms.startsWith("Custom:"))
      setInvoiceEmail(customer.invoiceEmail || "")
      if (customer.invoicingTerms.startsWith("Custom:")) {
        setCustomTerms(customer.invoicingTerms.replace("Custom: ", ""))
      }
    }
  }

  const handleBackToList = () => {
    setSelectedCustomerId(null)
    setIsEditingInvoice(false)
  }

  const handleInvoiceTermsChange = (value: string) => {
    setInvoiceTerms(value)
    setShowCustomTerms(value === "custom")
  }

  const handleSaveInvoiceSettings = () => {
    setIsEditingInvoice(false)
    // In a real application, you would save these changes to the backend
  }

  const renderInvoiceTriggerOptions = () => {
    switch (invoiceTrigger) {
      case "days_after":
        return (
          <div className="mt-4 ml-6">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={daysAfterShipment}
                onChange={(e) => setDaysAfterShipment(Number(e.target.value))}
                className="w-20"
                min={1}
              />
              <span>days after shipment</span>
            </div>
          </div>
        )
      case "consolidated":
        return (
          <div className="mt-4 ml-6">
            <RadioGroup value={consolidationType} onValueChange={setConsolidationType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly consolidation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Weekly consolidation</Label>
              </div>
            </RadioGroup>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <LeftMenu
          activePage="customers"
          onNavigate={(page) => {
            switch (page) {
              case "control-panel":
                onControlPanelClick()
                break
              case "performance":
                onPerformanceClick()
                break
              case "customers":
                onCustomersClick()
                break
              case "estimates":
                onBackClick()
                break
              case "orders":
                onOrderClick()
                break
              case "scheduling":
                onSchedulingClick()
                break
              case "production-tracker":
                onProductionTrackerClick()
                break
              case "production-stations":
                onProductionStationsClick()
                break
              case "logistics-analytics":
                onLogisticsAnalyticsClick()
                break
              case "shipments":
                onShipmentsClick()
                break
              case "inventory":
                onInventoryClick()
                break
              case "allocation":
                onInventoryAllocationClick()
                break
            }
          }}
        />

        {!selectedCustomerId ? (
          // Customer List View
          <div className="flex-1 overflow-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Customers</h1>
              <Button className="bg-black hover:bg-neutral-90 text-white">Create customer</Button>
            </div>
            <div className="bg-white rounded-md shadow">
              <div className="grid grid-cols-2 p-4 font-medium border-b">
                <div>Company name</div>
                <div className="text-right">Status</div>
              </div>
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="grid grid-cols-2 p-4 border-b hover:bg-neutral-5 cursor-pointer"
                  onClick={() => handleCustomerClick(customer.id)}
                >
                  <div>{customer.name}</div>
                  <div className="text-right">
                    <Badge
                      className={`${
                        customer.status === "Active" ? "bg-success-10 text-success-90" : "bg-neutral-5 text-neutral-90"
                      }`}
                    >
                      {customer.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Customer Detail View
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="flex items-center mb-2">
                <button onClick={handleBackToList} className="text-neutral-50 hover:text-neutral-70 flex items-center mr-2">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Customers
                </button>
                <span className="text-neutral-50">/ Edit customer</span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                  {customerDetails[selectedCustomerId as keyof typeof customerDetails]?.name || "Customer"}
                </h1>
                <Button className="bg-white text-black border border-neutral-30 hover:bg-neutral-5">Edit customer</Button>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-medium text-neutral-50 mb-2">Preferred currency</h2>
                <div className="border rounded-md p-3 bg-white">
                  {customerDetails[selectedCustomerId as keyof typeof customerDetails]?.currency}
                </div>
              </div>

              <div className="border-b mb-6">
                <div className="flex">
                  <button className="px-4 py-2 font-medium text-neutral-50">Integration</button>
                  <button className="px-4 py-2 font-medium text-neutral-50">Logistic</button>
                  <button className="px-4 py-2 font-medium border-b-2 border-black">Jobs and estimation</button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-sm font-medium text-neutral-50 mb-2">Enable estimation process for this user?</h2>
                    <div className="border rounded-md p-3 bg-white">
                      {customerDetails[selectedCustomerId as keyof typeof customerDetails]?.estimationEnabled}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-neutral-50 mb-2">Preferred currency</h2>
                    <div className="border rounded-md p-3 bg-white">
                      {customerDetails[selectedCustomerId as keyof typeof customerDetails]?.currency}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-medium mb-2">Point of contact</h2>
                  <p className="text-sm text-neutral-50 mb-4">
                    Appoint members of your team to be the point of contact who are responsible to the success of this
                    client
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-50 mb-2">Sales rep</h3>
                      <div className="border rounded-md p-3 bg-white">
                        {customerDetails[selectedCustomerId as keyof typeof customerDetails]?.salesRep}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-50 mb-2">Customer Success Executive (CSE)</h3>
                      <div className="border rounded-md p-3 bg-white">
                        {customerDetails[selectedCustomerId as keyof typeof customerDetails]?.cse}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-50 mb-2">Estimator</h3>
                      <div className="border rounded-md p-3 bg-white">
                        {customerDetails[selectedCustomerId as keyof typeof customerDetails]?.estimator}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-base font-medium">Invoicing Information</h2>
                    {!isEditingInvoice ? (
                      <Button
                        variant="outline"
                        className="text-info-70 border-blue-600 hover:bg-info-10"
                        onClick={() => setIsEditingInvoice(true)}
                      >
                        Edit invoicing settings
                      </Button>
                    ) : (
                      <Button className="bg-black hover:bg-neutral-90 text-white" onClick={handleSaveInvoiceSettings}>
                        Save changes
                      </Button>
                    )}
                  </div>

                  {!isEditingInvoice ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-neutral-50 mb-2">Invoicing Terms</h3>
                        <div className="border rounded-md p-3 bg-white">
                          {customerDetails[selectedCustomerId as keyof typeof customerDetails]?.invoicingTerms}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-neutral-50 mb-2">Invoice Email</h3>
                        <div className="border rounded-md p-3 bg-white">
                          {customerDetails[selectedCustomerId as keyof typeof customerDetails]?.invoiceEmail}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-neutral-50 mb-2">Invoice Trigger</h3>
                        <div className="border rounded-md p-3 bg-white">
                          {(() => {
                            const customer = customerDetails[selectedCustomerId as keyof typeof customerDetails]
                            switch (customer?.invoiceTrigger) {
                              case "automatic":
                                return "Automatic upon shipment"
                              case "days_after":
                                return `${customer.daysAfterShipment} days after shipment`
                              case "consolidated":
                                return `Consolidated (${customer.consolidationType === "monthly" ? "Monthly" : "Weekly"})`
                              case "manual":
                                return "Manual invoicing"
                              default:
                                return "Automatic upon shipment"
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-md border p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-sm font-medium text-neutral-50 mb-2">Invoicing Terms</h3>
                          <div className="flex items-center gap-2">
                            <Select value={invoiceTerms} onValueChange={handleInvoiceTermsChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select invoice terms" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Net 15">Net 15</SelectItem>
                                <SelectItem value="Net 30">Net 30</SelectItem>
                                <SelectItem value="Net 45">Net 45</SelectItem>
                                <SelectItem value="Net 60">Net 60</SelectItem>
                                <SelectItem value="Due Upon Receipt">Due Upon Receipt</SelectItem>
                                <SelectItem value="custom">Custom Terms</SelectItem>
                              </SelectContent>
                            </Select>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 text-neutral-40" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-60">
                                    Select the payment terms for this customer's invoices. This determines when payment
                                    is due after the invoice date.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          {showCustomTerms && (
                            <div className="mt-2">
                              <Input
                                placeholder="Enter custom terms"
                                value={customTerms}
                                onChange={(e) => setCustomTerms(e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-neutral-50 mb-2">Invoice Email</h3>
                          <Input
                            value={invoiceEmail}
                            onChange={(e) => setInvoiceEmail(e.target.value)}
                            placeholder="Enter invoice email"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-neutral-50 mb-3">Invoice Trigger Criteria</h3>
                        <div className="space-y-3">
                          <RadioGroup value={invoiceTrigger} onValueChange={setInvoiceTrigger}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="automatic" id="automatic" />
                              <Label htmlFor="automatic" className="flex items-center">
                                Automatic upon shipment
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-4 w-4 text-neutral-40 ml-1" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="w-60">
                                        Invoices are automatically created when an order is marked as shipped.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="days_after" id="days_after" />
                              <Label htmlFor="days_after" className="flex items-center">
                                X days after shipment
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-4 w-4 text-neutral-40 ml-1" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="w-60">
                                        Invoices are generated a specified number of days after the order is shipped.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="consolidated" id="consolidated" />
                              <Label htmlFor="consolidated" className="flex items-center">
                                Consolidated invoicing
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-4 w-4 text-neutral-40 ml-1" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="w-60">
                                        Multiple orders are consolidated into a single invoice on a weekly or monthly
                                        basis.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="manual" id="manual" />
                              <Label htmlFor="manual" className="flex items-center">
                                Manual invoicing
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-4 w-4 text-neutral-40 ml-1" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="w-60">Invoices are created and triggered by a user action.</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                            </div>
                          </RadioGroup>

                          {renderInvoiceTriggerOptions()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-medium">Contact list</h2>
                    <Button variant="outline" className="text-info-70 border-blue-600 hover:bg-info-10">
                      + Add contact
                    </Button>
                  </div>

                  <div className="bg-white rounded-md border overflow-hidden">
                    <div className="grid grid-cols-3 p-4 font-medium border-b">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Phone number</div>
                    </div>

                    {customerDetails[selectedCustomerId as keyof typeof customerDetails]?.contacts.map(
                      (contact, index) => (
                        <div key={index} className="grid grid-cols-3 p-4 border-b">
                          <div>{contact.name}</div>
                          <div>{contact.email}</div>
                          <div className="flex justify-between">
                            <span>{contact.phone}</span>
                            {contact.primary ? (
                              <span className="text-neutral-50">Primary contact</span>
                            ) : (
                              <button className="text-info-70">Mark as primary contact</button>
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
