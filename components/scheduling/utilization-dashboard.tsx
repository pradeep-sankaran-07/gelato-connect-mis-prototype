"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts"
import { AlertTriangle, TrendingUp, Clock, Activity } from "lucide-react"

interface MachineUtilization {
  id: string
  name: string
  shortName: string
  utilization: number
  todaysJobs: number
  nextAvailable: string
  isBottleneck: boolean
}

const machineData: MachineUtilization[] = [
  { id: "m1", name: "HP Indigo 7900", shortName: "Indigo 7900", utilization: 95, todaysJobs: 3, nextAvailable: "16:30", isBottleneck: true },
  { id: "m2", name: "HP Indigo 5900", shortName: "Indigo 5900", utilization: 87, todaysJobs: 3, nextAvailable: "17:00", isBottleneck: false },
  { id: "m3", name: "KBA Rapida 105", shortName: "KBA Rapida", utilization: 42, todaysJobs: 2, nextAvailable: "13:00", isBottleneck: false },
  { id: "m4", name: "HP Latex 800", shortName: "Latex 800", utilization: 78, todaysJobs: 2, nextAvailable: "16:00", isBottleneck: false },
  { id: "m5", name: "Polar N115 Cutter", shortName: "Polar N115", utilization: 62, todaysJobs: 2, nextAvailable: "15:00", isBottleneck: false },
  { id: "m6", name: "MBO K800 Folder", shortName: "MBO K800", utilization: 55, todaysJobs: 1, nextAvailable: "11:30", isBottleneck: false },
  { id: "m7", name: "Muller Martini Presto", shortName: "MM Presto", utilization: 72, todaysJobs: 1, nextAvailable: "16:00", isBottleneck: false },
  { id: "m8", name: "Komfi Delta 52", shortName: "Komfi Delta", utilization: 45, todaysJobs: 1, nextAvailable: "12:00", isBottleneck: false },
]

const getBarColor = (utilization: number) => {
  if (utilization > 90) return "#e51c00" // critical-70 (overloaded)
  if (utilization >= 70) return "#29845a" // success-70 (optimal)
  return "#956f00" // warning-70 (underutilized)
}

const getStatusLabel = (utilization: number) => {
  if (utilization > 90) return { label: "Overloaded", className: "bg-critical-20 text-critical-90" }
  if (utilization >= 70) return { label: "Optimal", className: "bg-success-10 text-success-90" }
  return { label: "Underutilized", className: "bg-caution-20 text-caution-90" }
}

const avgUtilization = Math.round(machineData.reduce((sum, m) => sum + m.utilization, 0) / machineData.length)
const bottleneck = machineData.reduce((max, m) => (m.utilization > max.utilization ? m : max), machineData[0])
const idleCapacity = machineData.reduce((min, m) => (m.utilization < min.utilization ? m : min), machineData[0])

const chartData = machineData.map((m) => ({
  name: m.shortName,
  utilization: m.utilization,
}))

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value
    return (
      <div className="bg-neutral-100 text-white rounded-lg shadow-lg px-3 py-2 text-xs">
        <p className="font-medium">{label}</p>
        <p className="mt-1">{value}% utilization</p>
      </div>
    )
  }
  return null
}

interface UtilizationDashboardProps {
  className?: string
}

export default function UtilizationDashboard({ className = "" }: UtilizationDashboardProps) {
  return (
    <div className={`space-y-5 ${className}`}>
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-md bg-info-10 flex items-center justify-center">
              <Activity className="h-3.5 w-3.5 text-info-70" />
            </div>
            <span className="text-xs text-neutral-50">Avg Utilization</span>
          </div>
          <div className="text-xl font-bold text-neutral-100">{avgUtilization}%</div>
          <div className="mt-1 h-1.5 bg-neutral-10 rounded-full overflow-hidden">
            <div className="h-full bg-info-70 rounded-full" style={{ width: `${avgUtilization}%` }} />
          </div>
        </div>

        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-md bg-critical-10 flex items-center justify-center">
              <AlertTriangle className="h-3.5 w-3.5 text-critical-70" />
            </div>
            <span className="text-xs text-neutral-50">Bottleneck</span>
          </div>
          <div className="text-sm font-bold text-neutral-100">{bottleneck.name}</div>
          <div className="text-xs text-critical-60 font-medium mt-0.5">{bottleneck.utilization}% utilization</div>
        </div>

        <div className="border border-neutral-20 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-md bg-caution-10 flex items-center justify-center">
              <Clock className="h-3.5 w-3.5 text-caution-70" />
            </div>
            <span className="text-xs text-neutral-50">Idle Capacity</span>
          </div>
          <div className="text-sm font-bold text-neutral-100">{idleCapacity.name}</div>
          <div className="text-xs text-warning-70 font-medium mt-0.5">{idleCapacity.utilization}% utilization</div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="border border-neutral-20 rounded-lg p-4 bg-white">
        <h4 className="text-sm font-semibold text-neutral-100 mb-3">Machine Utilization (%)</h4>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#8a8a8a" }} axisLine={{ stroke: "#e6e6e6" }} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#383838" }} axisLine={false} tickLine={false} width={95} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={70} stroke="#29845a" strokeDasharray="3 3" strokeWidth={1} />
              <ReferenceLine x={90} stroke="#e51c00" strokeDasharray="3 3" strokeWidth={1} />
              <Bar dataKey="utilization" radius={[0, 4, 4, 0]} barSize={18}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.utilization)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-neutral-50 justify-center">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#e51c00" }} /> &gt;90% Overloaded</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#29845a" }} /> 70-90% Optimal</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#956f00" }} /> &lt;70% Underutilized</span>
        </div>
      </div>

      {/* Detail table */}
      <div className="border border-neutral-20 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-5">
              <th className="text-left text-xs font-medium text-neutral-70 px-3 py-2.5 border-b border-neutral-20">Machine</th>
              <th className="text-center text-xs font-medium text-neutral-70 px-3 py-2.5 border-b border-neutral-20">Today&apos;s Jobs</th>
              <th className="text-center text-xs font-medium text-neutral-70 px-3 py-2.5 border-b border-neutral-20">Utilization</th>
              <th className="text-center text-xs font-medium text-neutral-70 px-3 py-2.5 border-b border-neutral-20">Next Available</th>
              <th className="text-center text-xs font-medium text-neutral-70 px-3 py-2.5 border-b border-neutral-20">Status</th>
            </tr>
          </thead>
          <tbody>
            {machineData.map((machine) => {
              const status = getStatusLabel(machine.utilization)
              return (
                <tr key={machine.id} className="hover:bg-neutral-5/50 transition-colors">
                  <td className="px-3 py-2.5 border-b border-neutral-10">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-neutral-100">{machine.name}</span>
                      {machine.isBottleneck && (
                        <AlertTriangle className="h-3.5 w-3.5 text-critical-60" />
                      )}
                    </div>
                  </td>
                  <td className="text-center px-3 py-2.5 border-b border-neutral-10 text-sm text-neutral-80">
                    {machine.todaysJobs}
                  </td>
                  <td className="text-center px-3 py-2.5 border-b border-neutral-10">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-1.5 bg-neutral-10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${machine.utilization}%`, background: getBarColor(machine.utilization) }} />
                      </div>
                      <span className="text-sm font-medium text-neutral-90 w-8">{machine.utilization}%</span>
                    </div>
                  </td>
                  <td className="text-center px-3 py-2.5 border-b border-neutral-10 text-sm text-neutral-70">
                    {machine.nextAvailable}
                  </td>
                  <td className="text-center px-3 py-2.5 border-b border-neutral-10">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
