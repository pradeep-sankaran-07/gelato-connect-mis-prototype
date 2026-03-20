"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "What's the best way to fit 3 more urgent jobs today?",
    timestamp: "09:15",
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "I recommend moving J-1012 to the Polar Cutter (currently at 42% util) and splitting J-1008 across both Indigo presses. This would reduce overtime by 2 hours and free up a 90-minute window on the KBA Rapida at 13:00 for the third job.",
    timestamp: "09:15",
  },
  {
    id: "m3",
    role: "user",
    content: "Apply that recommendation",
    timestamp: "09:18",
  },
  {
    id: "m4",
    role: "assistant",
    content:
      "Done. 3 jobs rescheduled. New estimated completion: 16:30. The Indigo 7900 utilization dropped from 95% to 82%, and no jobs are at risk of missing their deadlines.",
    timestamp: "09:18",
  },
]

const suggestedPrompts = [
  "Optimize today's schedule",
  "Show bottlenecks",
  "What if J-1005 is urgent?",
  "Compare shift scenarios",
]

const simulatedResponses: Record<string, string> = {
  "optimize today's schedule":
    "I've analyzed today's workload. Key recommendations:\n\n1. Move J-1006 (labels) from Indigo 5900 to Indigo 7900's 16:30 slot — groups similar label jobs and reduces changeover.\n2. Start J-1015 (lamination) 1 hour earlier on the Komfi Delta to fill the morning gap.\n3. Swap J-1003 and J-1005 — the Rapida handles the A5 flyer substrate more efficiently.\n\nEstimated impact: 1.5h overtime saved, 8% better utilization balance.",
  "show bottlenecks":
    "Current bottlenecks:\n\n1. HP Indigo 7900 at 95% — 3 jobs back-to-back with no buffer. Risk of cascade delays.\n2. Muller Martini Presto — single binding job but dependent on upstream printing. Currently blocked waiting for J-1008.\n3. Late afternoon congestion on Polar N115 Cutter — 2 jobs scheduled after 13:00 need upstream jobs done first.\n\nRecommend redistributing 1 job from Indigo 7900 to 5900.",
  "what if j-1005 is urgent?":
    "If J-1005 (BrandHouse Flyers) becomes urgent:\n\n- Current slot: HP Indigo 5900 at 12:00\n- It would need to start by 10:00 to meet a same-day deadline\n- Option A: Swap with J-1004 (starts 08:00) — delays J-1004 by 2h but BrandHouse ships on time\n- Option B: Move to KBA Rapida 105 at 10:00 — Rapida has capacity but needs 30min substrate changeover\n\nRecommend Option B — lower impact on other jobs.",
}

interface AIAssistantPanelProps {
  open: boolean
  onClose: () => void
}

export default function AIAssistantPanel({ open, onClose }: AIAssistantPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMsg: ChatMessage = {
      id: `m${messages.length + 1}`,
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    const lowerText = messageText.toLowerCase()
    const matchedKey = Object.keys(simulatedResponses).find((k) => lowerText.includes(k))
    const responseText =
      matchedKey
        ? simulatedResponses[matchedKey]
        : "I've analyzed your request. Based on the current schedule and machine availability, I can suggest optimizations. Could you provide more details about the specific constraints or priorities you'd like me to consider?"

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `m${messages.length + 2}`,
        role: "assistant",
        content: responseText,
        timestamp: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] bg-white border-l border-neutral-20 shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-5 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-90" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-100">Schedule Assistant</h3>
            <p className="text-[11px] text-neutral-50">AI-powered scheduling help</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-neutral-5 text-neutral-50 hover:text-neutral-90 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === "assistant" ? "bg-primary-5" : "bg-neutral-10"
            }`}>
              {msg.role === "assistant" ? (
                <Bot className="h-3.5 w-3.5 text-primary-90" />
              ) : (
                <User className="h-3.5 w-3.5 text-neutral-70" />
              )}
            </div>
            <div className={`max-w-[85%] ${msg.role === "user" ? "text-right" : ""}`}>
              <div
                className={`inline-block text-sm leading-relaxed rounded-xl px-3 py-2 ${
                  msg.role === "user"
                    ? "bg-neutral-100 text-white rounded-tr-sm"
                    : "bg-neutral-5 text-neutral-90 rounded-tl-sm border border-neutral-20"
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>
              </div>
              <div className="text-[10px] text-neutral-40 mt-0.5 px-1">{msg.timestamp}</div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary-5 flex items-center justify-center flex-shrink-0">
              <Bot className="h-3.5 w-3.5 text-primary-90" />
            </div>
            <div className="bg-neutral-5 border border-neutral-20 rounded-xl rounded-tl-sm px-3 py-2.5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-neutral-40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-neutral-40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-neutral-40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested prompts */}
      <div className="px-4 py-2 border-t border-neutral-10">
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-xs px-2.5 py-1.5 rounded-full border border-neutral-20 text-neutral-70 hover:bg-neutral-5 hover:border-neutral-40 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-neutral-20 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about scheduling..."
              className="w-full h-9 px-3 text-sm rounded-lg border border-neutral-30 focus:border-neutral-90 focus:outline-none placeholder:text-neutral-40 transition-colors"
            />
          </div>
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="h-9 w-9 rounded-full bg-neutral-100 hover:bg-neutral-90 text-white disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
