"use client"

import { useState } from "react"
import {
  User, Users, Bell, Edit2, Plus, X, CheckCircle, Mail, Shield
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/lib/navigation-context"
import PortalHeader, { mockCustomers, type PortalCustomer } from "./portal-header"

const portalUsers = [
  { id: "U-1", name: "John Smith", email: "john.smith@acmecorp.com", role: "Admin", lastLogin: "Mar 15, 2025", status: "Active" },
  { id: "U-2", name: "Emily Chen", email: "emily.chen@acmecorp.com", role: "Approver", lastLogin: "Mar 14, 2025", status: "Active" },
  { id: "U-3", name: "David Williams", email: "d.williams@acmecorp.com", role: "Viewer", lastLogin: "Mar 10, 2025", status: "Active" },
  { id: "U-4", name: "Sarah Johnson", email: "s.johnson@acmecorp.com", role: "Viewer", lastLogin: "Feb 28, 2025", status: "Inactive" },
]

export default function PortalAccountSettings() {
  const { navigateTo } = useNavigation()
  const [selectedCustomer, setSelectedCustomer] = useState<PortalCustomer>(mockCustomers[0])
  const [activeTab, setActiveTab] = useState<"profile" | "users" | "notifications">("profile")
  const [editing, setEditing] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Viewer")
  const [inviteSent, setInviteSent] = useState(false)

  // Notification toggles
  const [notifOrderUpdates, setNotifOrderUpdates] = useState(true)
  const [notifProofReady, setNotifProofReady] = useState(true)
  const [notifInvoiceSent, setNotifInvoiceSent] = useState(true)
  const [notifShipping, setNotifShipping] = useState(true)
  const [notifMarketing, setNotifMarketing] = useState(false)

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "users" as const, label: "Users", icon: Users },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
  ]

  function handleSendInvite() {
    if (!inviteEmail.trim()) return
    setInviteSent(true)
    setTimeout(() => {
      setShowInviteModal(false)
      setInviteSent(false)
      setInviteEmail("")
      setInviteRole("Viewer")
    }, 2000)
  }

  function getRoleBadge(role: string) {
    switch (role) {
      case "Admin":
        return <Badge className="bg-primary-10 text-primary-90 text-xs"><Shield className="h-3 w-3 mr-1" />Admin</Badge>
      case "Approver":
        return <Badge className="bg-info-10 text-info-90 text-xs">Approver</Badge>
      case "Viewer":
        return <Badge variant="secondary" className="text-xs">Viewer</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-neutral-5">
      <PortalHeader activeScreen="portal-account" selectedCustomer={selectedCustomer} onCustomerChange={setSelectedCustomer} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-neutral-100 mb-6">Account Settings</h1>

        {/* Tabs */}
        <div className="border-b border-neutral-20 mb-6">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  activeTab === tab.id
                    ? "text-neutral-100 font-medium"
                    : "text-neutral-60 hover:text-neutral-90"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-100 rounded-t-sm" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <div className="bg-white border border-neutral-20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-neutral-100">Company Information</h3>
                <button
                  onClick={() => setEditing(!editing)}
                  className="flex items-center gap-1.5 h-8 px-3 border border-neutral-40 text-neutral-90 rounded-full text-xs font-medium hover:bg-neutral-5 transition-colors"
                >
                  <Edit2 className="h-3 w-3" />
                  {editing ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="space-y-5">
                {[
                  { label: "Company Name", value: "Acme Corp" },
                  { label: "Address", value: "123 Business Park, Suite 400, London EC2A 4BX, UK" },
                  { label: "Phone", value: "+44 20 7946 0958" },
                  { label: "Email", value: "orders@acmecorp.com" },
                  { label: "VAT Number", value: "GB123456789" },
                  { label: "Account Manager", value: "Sarah Mitchell (Premium Print Co.)" },
                ].map((field) => (
                  <div key={field.label} className="flex items-start gap-4">
                    <label className="text-xs font-medium text-neutral-60 w-32 pt-2.5 flex-shrink-0">{field.label}</label>
                    {editing ? (
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="flex-1 h-10 px-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
                      />
                    ) : (
                      <span className="text-sm text-neutral-100 pt-2.5">{field.value}</span>
                    )}
                  </div>
                ))}
              </div>

              {editing && (
                <div className="flex justify-end mt-6 pt-4 border-t border-neutral-20">
                  <button
                    onClick={() => setEditing(false)}
                    className="h-9 px-5 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-neutral-60">{portalUsers.length} users have access to this portal</p>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-2 h-9 px-4 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="h-3.5 w-3.5" />
                Invite User
              </button>
            </div>

            <div className="bg-white border border-neutral-20 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-5">
                    <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Name</th>
                    <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Email</th>
                    <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Role</th>
                    <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Last Login</th>
                    <th className="text-left text-xs font-medium text-neutral-70 px-4 py-2.5 border-b border-neutral-20">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {portalUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-neutral-5/50 transition-colors">
                      <td className="px-4 py-3 border-b border-neutral-20">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-primary-10 flex items-center justify-center text-xs font-semibold text-primary-90">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-sm font-medium text-neutral-100">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-70 border-b border-neutral-20">{user.email}</td>
                      <td className="px-4 py-3 border-b border-neutral-20">{getRoleBadge(user.role)}</td>
                      <td className="px-4 py-3 text-sm text-neutral-70 border-b border-neutral-20">{user.lastLogin}</td>
                      <td className="px-4 py-3 border-b border-neutral-20">
                        {user.status === "Active" ? (
                          <Badge className="bg-success-10 text-success-90 text-xs">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Inactive</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="max-w-2xl">
            <div className="bg-white border border-neutral-20 rounded-lg p-6">
              <h3 className="text-base font-semibold text-neutral-100 mb-1">Email Notifications</h3>
              <p className="text-sm text-neutral-60 mb-6">Choose which notifications you receive via email.</p>

              <div className="space-y-4">
                <NotifToggle
                  label="Order Updates"
                  description="Get notified when order status changes"
                  checked={notifOrderUpdates}
                  onChange={setNotifOrderUpdates}
                />
                <NotifToggle
                  label="Proof Ready"
                  description="Get notified when a new proof is available for review"
                  checked={notifProofReady}
                  onChange={setNotifProofReady}
                />
                <NotifToggle
                  label="Invoice Sent"
                  description="Get notified when a new invoice is generated"
                  checked={notifInvoiceSent}
                  onChange={setNotifInvoiceSent}
                />
                <NotifToggle
                  label="Shipping Updates"
                  description="Get tracking updates and delivery notifications"
                  checked={notifShipping}
                  onChange={setNotifShipping}
                />
                <NotifToggle
                  label="Marketing & Promotions"
                  description="Receive special offers and product updates"
                  checked={notifMarketing}
                  onChange={setNotifMarketing}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 text-neutral-50 hover:text-neutral-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {inviteSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-success-70" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">Invitation Sent</h3>
                <p className="text-sm text-neutral-60">An invitation email has been sent to {inviteEmail}.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-neutral-100 mb-1">Invite User</h3>
                <p className="text-sm text-neutral-60 mb-6">Add a team member to your customer portal.</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-90 mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="colleague@acmecorp.com"
                      className="w-full h-10 px-3 border border-neutral-30 rounded-lg text-sm focus:outline-none focus:border-neutral-90 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-90 mb-1.5 block">Role</label>
                    <div className="space-y-2">
                      {[
                        { value: "Viewer", desc: "Can view orders, invoices, and proofs" },
                        { value: "Approver", desc: "Can approve proofs and manage orders" },
                        { value: "Admin", desc: "Full access including user management" },
                      ].map((role) => (
                        <label
                          key={role.value}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            inviteRole === role.value
                              ? "border-neutral-100 bg-neutral-5"
                              : "border-neutral-20 hover:border-neutral-40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            checked={inviteRole === role.value}
                            onChange={(e) => setInviteRole(e.target.value)}
                            className="mt-0.5 accent-neutral-100"
                          />
                          <div>
                            <div className="text-sm font-medium text-neutral-100">{role.value}</div>
                            <div className="text-xs text-neutral-60 mt-0.5">{role.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 h-10 border border-neutral-40 text-neutral-90 rounded-full text-sm font-medium hover:bg-neutral-5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendInvite}
                    disabled={!inviteEmail.trim()}
                    className="flex-1 h-10 bg-neutral-100 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                  >
                    Send Invitation
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function NotifToggle({ label, description, checked, onChange }: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-neutral-20 last:border-0">
      <div>
        <div className="text-sm font-medium text-neutral-100">{label}</div>
        <div className="text-xs text-neutral-60 mt-0.5">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-neutral-90" : "bg-neutral-30"
        }`}
      >
        <div
          className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  )
}
