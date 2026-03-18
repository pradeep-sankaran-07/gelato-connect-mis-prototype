"use client"

import { ArrowLeft, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  backText?: string
  onBackClick?: () => void
}

export default function ProductionHeader({ backText = "Back", onBackClick }: HeaderProps) {
  return (
    <div className="border-b border-neutral-20 bg-white">
      <div className="flex h-20 items-center px-4 justify-between">
        <div className="flex items-center">
          {onBackClick && (
            <button onClick={onBackClick} className="flex items-center text-sm font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backText}
            </button>
          )}
        </div>

        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-50" />
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-md border-0 ring-1 ring-inset ring-neutral-30 bg-white pl-8 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-90"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="font-medium">
            Support
          </Button>
          <div className="h-8 w-8 rounded-full bg-neutral-100 text-white flex items-center justify-center text-sm font-medium">
            PS
          </div>
        </div>
      </div>
    </div>
  )
}
