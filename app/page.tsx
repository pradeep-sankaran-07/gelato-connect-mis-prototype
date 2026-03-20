"use client"

import dynamic from "next/dynamic"

const App = dynamic(() => import("@/components/app-shell"), { ssr: false })

export default function Page() {
  return <App />
}
