"use client"

import { useState } from "react"
import { allCountryCodes, getFlag, getCountryName } from "./shipping-data"

interface CountryPickerProps {
  selected: string[]
  onAdd: (code: string) => void
  onRemove: (code: string) => void
}

export function CountryPicker({ selected, onAdd, onRemove }: CountryPickerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const unselected = allCountryCodes.filter(
    (code) =>
      !selected.includes(code) &&
      getCountryName(code).toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div style={{ position: "relative" }}>
      {/* Selected pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: selected.length > 0 ? "8px" : 0 }}>
        {selected.map((code) => (
          <span
            key={code}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 8px",
              borderRadius: "999px",
              background: "#f5f5f5",
              fontSize: "12px",
              border: "1px solid #e5e5e5",
            }}
          >
            {getFlag(code)} {getCountryName(code)}
            <span
              role="button"
              tabIndex={0}
              onClick={() => onRemove(code)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onRemove(code) }}
              style={{ cursor: "pointer", color: "#999", marginLeft: "2px" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
            >
              &times;
            </span>
          </span>
        ))}
      </div>

      {/* Add button */}
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          setSearch("")
        }}
        style={{
          border: "1px dashed #d4d4d4",
          padding: "6px 12px",
          borderRadius: "8px",
          color: "#999",
          background: "transparent",
          cursor: "pointer",
          fontSize: "13px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        Add countries...
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "transparent",
            }}
          />

          <div
            style={{
              position: "absolute",
              zIndex: 50,
              background: "white",
              border: "1px solid #e5e5e5",
              borderRadius: "10px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              width: "320px",
              maxHeight: "300px",
              display: "flex",
              flexDirection: "column",
              marginTop: "4px",
            }}
          >
            {/* Search input */}
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search countries..."
              style={{
                position: "sticky",
                top: 0,
                padding: "8px",
                borderBottom: "1px solid #e5e5e5",
                border: "none",
                borderBottomStyle: "solid",
                borderBottomWidth: "1px",
                borderBottomColor: "#e5e5e5",
                outline: "none",
                width: "100%",
                fontSize: "13px",
                boxSizing: "border-box",
              }}
            />

            {/* Country list */}
            <div style={{ overflowY: "auto", flex: 1 }}>
              {unselected.map((code) => (
                <div
                  key={code}
                  onClick={() => {
                    onAdd(code)
                  }}
                  style={{
                    padding: "8px 10px",
                    cursor: "pointer",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    fontSize: "13px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span>{getFlag(code)}</span>
                  <span>{getCountryName(code)}</span>
                </div>
              ))}
              {unselected.length === 0 && (
                <div style={{ padding: "12px 10px", color: "#999", fontSize: "13px" }}>
                  No countries found
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
