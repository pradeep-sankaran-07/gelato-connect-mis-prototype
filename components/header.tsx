"use client"

import { ArrowLeft, ArrowRight, Search, Bell, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/lib/navigation-context"

interface HeaderProps {
  title?: string
}

export default function Header({ title }: HeaderProps) {
  const { goBack, canGoBack } = useNavigation()

  return (
    <div className="border-b border-neutral-20 bg-white">
      <div className="flex h-[56px] items-center px-4 justify-between">
        {/* Left: Nav + Title */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={goBack}
            disabled={!canGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <ArrowRight className="h-4 w-4" />
          </Button>
          {title && (
            <h1 className="text-[15px] font-semibold text-neutral-100 ml-2">{title}</h1>
          )}
        </div>

        {/* Center: Search */}
        <div className="relative w-80">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-neutral-50" />
          <input
            type="search"
            placeholder="Search orders, customers, jobs..."
            className="w-full rounded-lg border-0 ring-1 ring-inset ring-neutral-30 bg-white pl-8 pr-4 py-[7px] text-[13px] outline-none focus:ring-1 focus:ring-neutral-90 transition-shadow"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-70">
            <HelpCircle className="h-[18px] w-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-70 relative">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-critical-60 rounded-full" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-neutral-100 text-white flex items-center justify-center text-[12px] font-medium ml-1 cursor-pointer">
            PS
          </div>
        </div>
      </div>
    </div>
  )
}
