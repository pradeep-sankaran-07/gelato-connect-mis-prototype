"use client"

import { useState, useRef, useEffect } from "react"

interface TagInputProps {
  tags: string[]
  options: string[]
  onAdd: (tag: string) => void
  onRemove: (tag: string) => void
  placeholder?: string
}

export function TagInput({ tags, options, onAdd, onRemove, placeholder = "Search..." }: TagInputProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filtered = options.filter(
    (o) => !tags.includes(o) && o.toLowerCase().includes(search.toLowerCase()),
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <div
        style={{
          border: "1px solid #d4d4d4",
          borderRadius: "8px",
          padding: "6px 8px",
          minHeight: "38px",
          background: "white",
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          alignItems: "center",
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#f5f5f5",
              borderRadius: "4px",
              padding: "2px 6px",
              fontSize: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "#999",
                lineHeight: 1,
                fontSize: "14px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
            >
              &times;
            </button>
          </span>
        ))}

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={tags.length === 0 ? placeholder : ""}
          style={{
            border: "none",
            outline: "none",
            fontSize: "13px",
            flex: 1,
            minWidth: "60px",
          }}
        />
      </div>

      {open && filtered.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "4px",
            background: "white",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 50,
          }}
        >
          {filtered.map((option) => (
            <div
              key={option}
              onClick={() => {
                onAdd(option)
                setSearch("")
                if (filtered.length <= 1) {
                  setOpen(false)
                }
              }}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                fontSize: "13px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
