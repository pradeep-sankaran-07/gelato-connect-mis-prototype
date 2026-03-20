"use client"

import { useNavigation } from "@/lib/navigation-context"
import { ArrowLeft } from "lucide-react"

interface PlaceholderScreenProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export default function PlaceholderScreen({ title, description, icon }: PlaceholderScreenProps) {
  const { goBack, canGoBack } = useNavigation()

  return (
    <div className="p-8">
      <div className="max-w-2xl">
        {canGoBack && (
          <button onClick={goBack} className="flex items-center text-sm text-neutral-60 hover:text-neutral-100 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </button>
        )}
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <h1 className="text-2xl font-semibold text-neutral-100">{title}</h1>
        </div>
        {description && <p className="text-sm text-neutral-60">{description}</p>}
        <div className="mt-8 border border-dashed border-neutral-30 rounded-lg p-12 text-center text-neutral-50">
          Building...
        </div>
      </div>
    </div>
  )
}
