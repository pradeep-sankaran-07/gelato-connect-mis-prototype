"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { ProductionStep } from "./types"

interface StationSelectorProps {
  open: boolean
  onClose: () => void
  onSelectStation: (station: ProductionStep) => void
}

export default function StationSelector({ open, onClose, onSelectStation }: StationSelectorProps) {
  const stations: ProductionStep[] = [
    "Production Stations",
    "Cutting",
    "Printing",
    "Binding",
    "Mounting",
    "Folding",
    "Shrink Wrapping",
    "UV Coating",
    "Laminating",
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change station</DialogTitle>
          <p className="text-sm text-neutral-50">Select a station to open it.</p>
        </DialogHeader>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-40" />
          <Input placeholder="Search for a station" className="pl-8" />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {stations.map((station) => (
            <div
              key={station}
              className="p-4 border rounded-lg hover:bg-neutral-5 cursor-pointer text-center"
              onClick={() => {
                onSelectStation(station)
                onClose()
              }}
            >
              {station}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
