"use client"

import { useState } from "react"
import {
  Plus,
  Truck,
  Pencil,
  Trash2,
  Zap,
  Star,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"

interface CarrierAccount {
  id: string
  name: string
  accountNumber: string
  maskedAccount: string
  status: "connected" | "disconnected"
  isDefault: boolean
  apiActive: boolean
  lastSync: string
  services: string[]
  contactEmail: string
}

const initialCarriers: CarrierAccount[] = [
  {
    id: "carrier-1",
    name: "FedEx",
    accountNumber: "1234567890",
    maskedAccount: "****7890",
    status: "connected",
    isDefault: true,
    apiActive: true,
    lastSync: "Mar 19, 2026 — 08:15",
    services: ["International Priority", "International Economy", "Ground"],
    contactEmail: "shipping@fedex.com",
  },
  {
    id: "carrier-2",
    name: "UPS",
    accountNumber: "9876543210",
    maskedAccount: "****3210",
    status: "connected",
    isDefault: false,
    apiActive: true,
    lastSync: "Mar 19, 2026 — 07:45",
    services: ["Express", "Standard", "Expedited"],
    contactEmail: "api@ups.com",
  },
  {
    id: "carrier-3",
    name: "DHL",
    accountNumber: "5555123456",
    maskedAccount: "****3456",
    status: "connected",
    isDefault: false,
    apiActive: true,
    lastSync: "Mar 18, 2026 — 22:30",
    services: ["Express Worldwide", "Economy Select", "Parcel"],
    contactEmail: "integration@dhl.com",
  },
  {
    id: "carrier-4",
    name: "Local Freight Co.",
    accountNumber: "LF-00421",
    maskedAccount: "****0421",
    status: "disconnected",
    isDefault: false,
    apiActive: false,
    lastSync: "Mar 10, 2026 — 14:00",
    services: ["Full Truckload", "Partial Truckload", "Pallet Delivery"],
    contactEmail: "ops@localfreight.co.uk",
  },
]

const carrierOptions = ["FedEx", "UPS", "DHL", "DPD", "Royal Mail", "Custom"]

export default function CarrierAccounts() {
  const { goBack } = useNavigation()
  const [carriers, setCarriers] = useState<CarrierAccount[]>(initialCarriers)
  const [showAddModal, setShowAddModal] = useState(false)
  const [testingConnection, setTestingConnection] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<{ id: string; success: boolean } | null>(null)

  // Add modal state
  const [newCarrier, setNewCarrier] = useState("")
  const [newAccountNumber, setNewAccountNumber] = useState("")
  const [newApiKey, setNewApiKey] = useState("")
  const [addingTestStatus, setAddingTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle")

  const handleTestConnection = (carrierId: string) => {
    setTestingConnection(carrierId)
    setTestResult(null)
    setTimeout(() => {
      setTestingConnection(null)
      setTestResult({ id: carrierId, success: true })
      setTimeout(() => setTestResult(null), 3000)
    }, 1500)
  }

  const handleSetDefault = (carrierId: string) => {
    setCarriers((prev) =>
      prev.map((c) => ({
        ...c,
        isDefault: c.id === carrierId,
      }))
    )
  }

  const handleRemove = (carrierId: string) => {
    setCarriers((prev) => prev.filter((c) => c.id !== carrierId))
  }

  const handleTestNewConnection = () => {
    setAddingTestStatus("testing")
    setTimeout(() => {
      setAddingTestStatus("success")
    }, 1500)
  }

  const handleAddCarrier = () => {
    if (!newCarrier || !newAccountNumber) return
    const masked = "****" + newAccountNumber.slice(-4)
    setCarriers((prev) => [
      ...prev,
      {
        id: `carrier-${Date.now()}`,
        name: newCarrier,
        accountNumber: newAccountNumber,
        maskedAccount: masked,
        status: addingTestStatus === "success" ? "connected" : "disconnected",
        isDefault: false,
        apiActive: addingTestStatus === "success",
        lastSync: addingTestStatus === "success" ? "Just now" : "Never",
        services: [],
        contactEmail: "",
      },
    ])
    setShowAddModal(false)
    resetAddForm()
  }

  const resetAddForm = () => {
    setNewCarrier("")
    setNewAccountNumber("")
    setNewApiKey("")
    setAddingTestStatus("idle")
  }

  const getCarrierIcon = (name: string) => {
    const colors: Record<string, string> = {
      FedEx: "bg-[#4D148C]",
      UPS: "bg-[#351C15]",
      DHL: "bg-[#D40511]",
    }
    return (
      <div className={`w-12 h-12 rounded-lg ${colors[name] || "bg-neutral-70"} flex items-center justify-center`}>
        <Truck className="h-6 w-6 text-white" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100">Carrier Accounts</h1>
          <p className="text-sm text-neutral-60 mt-1">Manage carrier integrations and API connections</p>
        </div>
        <Button
          size="sm"
          className="rounded-full bg-neutral-100 text-white hover:bg-neutral-90"
          onClick={() => { setShowAddModal(true); resetAddForm() }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Carrier
        </Button>
      </div>

      {/* Summary bar */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-neutral-50">Total Carriers:</span>
          <span className="font-medium text-neutral-100">{carriers.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success-70" />
          <span className="text-neutral-50">Connected:</span>
          <span className="font-medium text-neutral-100">
            {carriers.filter((c) => c.status === "connected").length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-critical-60" />
          <span className="text-neutral-50">Disconnected:</span>
          <span className="font-medium text-neutral-100">
            {carriers.filter((c) => c.status === "disconnected").length}
          </span>
        </div>
      </div>

      {/* Carrier Grid */}
      <div className="grid grid-cols-2 gap-4">
        {carriers.map((carrier) => (
          <div
            key={carrier.id}
            className={`bg-white rounded-lg border p-5 transition-shadow hover:shadow-md ${
              carrier.isDefault ? "border-neutral-100 border-2" : "border-neutral-20"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {getCarrierIcon(carrier.name)}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-neutral-100">{carrier.name}</h3>
                    {carrier.isDefault && (
                      <Badge className="bg-neutral-100 text-white border-0 text-[10px] px-1.5 py-0.5">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-neutral-50 mt-0.5 font-mono">
                    Account: {carrier.maskedAccount}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                {carrier.status === "connected" ? (
                  <Badge className="bg-success-10 text-success-90 border-0 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Connected
                  </Badge>
                ) : (
                  <Badge className="bg-critical-10 text-critical-90 border-0 flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    Disconnected
                  </Badge>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-neutral-50 mb-0.5">API Status</p>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      carrier.apiActive ? "bg-success-70" : "bg-neutral-40"
                    }`}
                  />
                  <span className="text-neutral-100 font-medium">
                    {carrier.apiActive ? "API Active" : "Manual"}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-neutral-50 mb-0.5">Last Sync</p>
                <p className="text-neutral-100 font-medium">{carrier.lastSync}</p>
              </div>
              <div className="col-span-2">
                <p className="text-neutral-50 mb-1">Services</p>
                <div className="flex flex-wrap gap-1">
                  {carrier.services.map((s) => (
                    <span
                      key={s}
                      className="inline-block bg-neutral-5 text-neutral-70 rounded px-2 py-0.5 text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                  {carrier.services.length === 0 && (
                    <span className="text-neutral-40 text-[11px]">No services configured</span>
                  )}
                </div>
              </div>
            </div>

            {/* Test result feedback */}
            {testResult?.id === carrier.id && (
              <div className={`mt-3 text-xs px-3 py-2 rounded-lg ${
                testResult.success
                  ? "bg-success-10 text-success-90"
                  : "bg-critical-10 text-critical-90"
              }`}>
                {testResult.success
                  ? "Connection test successful — API responding normally"
                  : "Connection test failed — check credentials"}
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-neutral-20 flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full border-neutral-40 text-xs h-7 px-3">
                <Pencil className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-neutral-40 text-xs h-7 px-3"
                onClick={() => handleTestConnection(carrier.id)}
                disabled={testingConnection === carrier.id}
              >
                {testingConnection === carrier.id ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Zap className="h-3 w-3 mr-1" />
                    Test Connection
                  </>
                )}
              </Button>
              {!carrier.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-neutral-40 text-xs h-7 px-3"
                  onClick={() => handleSetDefault(carrier.id)}
                >
                  <Star className="h-3 w-3 mr-1" />
                  Set Default
                </Button>
              )}
              {!carrier.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-critical-30 text-critical-60 text-xs h-7 px-3 hover:bg-critical-5"
                  onClick={() => handleRemove(carrier.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Carrier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[20001]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[480px] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-neutral-100">Add Carrier Account</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-neutral-50 hover:text-neutral-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Carrier Select */}
              <div>
                <label className="block text-xs font-medium text-neutral-90 mb-1.5">Carrier</label>
                <select
                  value={newCarrier}
                  onChange={(e) => setNewCarrier(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg text-sm border border-neutral-30 bg-white focus:outline-none focus:border-neutral-90 transition-colors"
                >
                  <option value="">Select carrier...</option>
                  {carrierOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-xs font-medium text-neutral-90 mb-1.5">Account Number</label>
                <input
                  type="text"
                  value={newAccountNumber}
                  onChange={(e) => setNewAccountNumber(e.target.value)}
                  placeholder="e.g. 1234567890"
                  className="w-full h-10 px-3 rounded-lg text-sm border border-neutral-30 bg-white focus:outline-none focus:border-neutral-90 transition-colors"
                />
              </div>

              {/* API Key */}
              <div>
                <label className="block text-xs font-medium text-neutral-90 mb-1.5">API Key</label>
                <input
                  type="password"
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  className="w-full h-10 px-3 rounded-lg text-sm border border-neutral-30 bg-white focus:outline-none focus:border-neutral-90 transition-colors"
                />
                <p className="text-[11px] text-neutral-50 mt-1">Your API key is encrypted and stored securely</p>
              </div>

              {/* Test Connection */}
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-neutral-40"
                  onClick={handleTestNewConnection}
                  disabled={!newCarrier || !newAccountNumber || addingTestStatus === "testing"}
                >
                  {addingTestStatus === "testing" ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      Testing Connection...
                    </>
                  ) : addingTestStatus === "success" ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-1 text-success-70" />
                      Connection Successful
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-1" />
                      Test Connection
                    </>
                  )}
                </Button>

                {addingTestStatus === "success" && (
                  <p className="text-xs text-success-70 mt-2">
                    API connection verified. Carrier is ready to be added.
                  </p>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-20">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-neutral-40"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="rounded-full bg-neutral-100 text-white hover:bg-neutral-90"
                onClick={handleAddCarrier}
                disabled={!newCarrier || !newAccountNumber}
              >
                Add Carrier
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
