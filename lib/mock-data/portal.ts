// @ts-nocheck
import type { SupportTicket, PortalUser } from "@/lib/types"

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "ST-2025-001",
    customerId: "acme-corp",
    orderId: "ORD-2025-001",
    subject: "Annual Report — minor colour variation on page 12",
    description: "We noticed a slight colour shift on the header image on page 12 compared to the PDF proof. The blue appears slightly greener in the printed version. Can you advise?",
    status: "Resolved",
    priority: "Medium",
    createdAt: "2025-09-25T09:00:00Z",
    updatedAt: "2025-09-27T14:00:00Z",
    messages: [
      { sender: "Hans Weber", text: "We noticed a slight colour shift on the header image on page 12 compared to the PDF proof. The blue appears slightly greener in the printed version. Can you advise?", timestamp: "2025-09-25T09:00:00Z" },
      { sender: "Thomas Fischer", text: "Thank you for flagging this, Hans. I've checked with our QC team — this is within the acceptable tolerance for offset CMYK printing (Delta E < 3). The screen proof and printed output will always differ slightly due to the RGB-to-CMYK conversion. I can arrange a hard-copy proof for your next order if you'd like tighter colour control.", timestamp: "2025-09-26T10:00:00Z" },
      { sender: "Hans Weber", text: "Understood. Yes, please add a hard-copy proof for future orders. Thank you for the explanation.", timestamp: "2025-09-27T14:00:00Z" },
    ],
  },
  {
    id: "ST-2025-002",
    customerId: "printco-ltd",
    orderId: "ORD-2025-002",
    subject: "Business cards — delivery timeline query",
    description: "Hi, just checking on the expected delivery date for our 50K business cards order. We have a client event on 8 December.",
    status: "In Progress",
    priority: "High",
    createdAt: "2025-11-26T11:00:00Z",
    updatedAt: "2025-11-27T09:00:00Z",
    messages: [
      { sender: "James Clarke", text: "Hi, just checking on the expected delivery date for our 50K business cards order. We have a client event on 8 December.", timestamp: "2025-11-26T11:00:00Z" },
      { sender: "Emma Thompson", text: "Hi James, the cards are currently on press and due to complete printing by end of day today. Lamination and cutting are scheduled for 3 December, with dispatch on 4 December. You should receive them by 5-6 December, well ahead of your event.", timestamp: "2025-11-27T09:00:00Z" },
    ],
  },
  {
    id: "ST-2025-003",
    customerId: "luxe-labels",
    subject: "Portal access for new team member",
    description: "Could you please create portal access for our new production coordinator, Marie Dupont (m.dupont@luxe-labels.fr)? She should have approver-level access.",
    status: "Closed",
    priority: "Low",
    createdAt: "2025-11-10T14:00:00Z",
    updatedAt: "2025-11-11T09:00:00Z",
    messages: [
      { sender: "Camille Laurent", text: "Could you please create portal access for our new production coordinator, Marie Dupont (m.dupont@luxe-labels.fr)? She should have approver-level access.", timestamp: "2025-11-10T14:00:00Z" },
      { sender: "Emma Thompson", text: "Done! Marie has been set up with approver access. She'll receive a welcome email with login instructions shortly.", timestamp: "2025-11-11T09:00:00Z" },
      { sender: "Camille Laurent", text: "Perfect, thank you!", timestamp: "2025-11-11T09:30:00Z" },
    ],
  },
  {
    id: "ST-2025-004",
    customerId: "brandex",
    orderId: "ORD-2025-003",
    subject: "Catalogue proof — Pantone colour concern",
    description: "The digital proof looks good overall, but we want to confirm the Pantone 186C will be printed as a spot colour, not a CMYK simulation. Can you confirm?",
    status: "Open",
    priority: "High",
    createdAt: "2025-11-28T10:00:00Z",
    updatedAt: "2025-11-28T10:00:00Z",
    messages: [
      { sender: "Anna Hofmann", text: "The digital proof looks good overall, but we want to confirm the Pantone 186C will be printed as a spot colour, not a CMYK simulation. Can you confirm?", timestamp: "2025-11-28T10:00:00Z" },
    ],
  },
  {
    id: "ST-2025-005",
    customerId: "acme-corp",
    orderId: "ORD-2025-016",
    subject: "Rush order — Annual Report reprint confirmation",
    description: "We've placed a rush order for 500 additional annual reports. Can you confirm the 5-day turnaround and whether you have sufficient stock on hand?",
    status: "Open",
    priority: "High",
    createdAt: "2025-11-28T15:30:00Z",
    updatedAt: "2025-11-28T15:30:00Z",
    messages: [
      { sender: "Hans Weber", text: "We've placed a rush order for 500 additional annual reports. Can you confirm the 5-day turnaround and whether you have sufficient stock on hand?", timestamp: "2025-11-28T15:30:00Z" },
    ],
  },
]

export const mockPortalUsers: PortalUser[] = [
  { id: "pu-001", customerId: "acme-corp", name: "Hans Weber", email: "h.weber@acme-corp.de", role: "admin", lastLogin: "2025-11-28T08:00:00Z" },
  { id: "pu-002", customerId: "acme-corp", name: "Lisa Braun", email: "l.braun@acme-corp.de", role: "approver", lastLogin: "2025-11-25T10:00:00Z" },
  { id: "pu-003", customerId: "acme-corp", name: "Karl Müller", email: "k.mueller@acme-corp.de", role: "viewer", lastLogin: "2025-11-20T14:00:00Z" },
  { id: "pu-004", customerId: "printco-ltd", name: "James Clarke", email: "j.clarke@printco.co.uk", role: "admin", lastLogin: "2025-11-27T09:00:00Z" },
  { id: "pu-005", customerId: "printco-ltd", name: "Sarah Mitchell", email: "s.mitchell@printco.co.uk", role: "viewer", lastLogin: "2025-11-15T11:00:00Z" },
  { id: "pu-006", customerId: "luxe-labels", name: "Camille Laurent", email: "c.laurent@luxe-labels.fr", role: "admin", lastLogin: "2025-11-28T09:00:00Z" },
  { id: "pu-007", customerId: "luxe-labels", name: "Philippe Martin", email: "p.martin@luxe-labels.fr", role: "approver", lastLogin: "2025-11-22T16:00:00Z" },
  { id: "pu-008", customerId: "luxe-labels", name: "Marie Dupont", email: "m.dupont@luxe-labels.fr", role: "approver", lastLogin: "2025-11-12T10:00:00Z" },
]
