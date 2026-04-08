// ─── Types ───────────────────────────────────────────────────

export interface PackagingMaterial {
  id: number
  n: string    // name
  t: string    // type: Box | Pallet | Tube | Envelope
  mc: number   // material cost
  lc: number   // labour cost
  l: number    // length mm
  w: number    // width mm
  h: number    // height mm
  td: string   // tube diameter
  wt: number   // tare weight g
}

export interface PackagingRule {
  id: number
  name: string
  p: number
  customer: string
  products: string[]
  materials: string[]
  minW: string
  maxW: string
}

export interface DestinationZone {
  id: number
  name: string
  type: "geographic" | "pickup"
  countries: string[]
  postcodes: string
  desc: string
}

export interface ShippingMethod {
  id: number
  name: string
  carrier: string
  type: "PSP" | "GCL"
  on: boolean
  transit: string
  cost: string
  consignment: string
  dests: string[]
}

export interface ShipRuleMethod {
  n: string
  c: string
}

export interface ShipRule {
  id: number
  name: string
  active: boolean
  customer: string
  pkg: string
  dest: string
  methods: ShipRuleMethod[]
}

// ─── Constants ───────────────────────────────────────────────

export const allDests = [
  "UK mainland", "Continental US", "EU", "International", "Swindon (local)", "To be collected",
]

export const allProds = [
  "Softcover Books", "Stitch Books", "Hardcover Books", "Casebound Books",
  "Board", "Lettering", "POS", "Blade Sign", "Banner", "Vinyl",
  "Flyers", "Business Cards", "Posters",
]

export const allMats = [
  "Square Box", "Printers Pallet", "Pallet: Euro 120x80", "Padded Envelope",
  "Flat Mailer", "A3 18x12x6", "12x9x9", "12x9x6", "12x9x3",
  "1035x775x50mm", "Poster Tube 100cm",
]

export const allCustomers = ["All", "Hudson Printing", "PrintEvolved", "ESP", "Acme Corp"]

export const continentGroups: Record<string, string[]> = {
  Europe:         ["GB","DE","FR","IT","ES","NL","BE","AT","PL","SE","FI","DK","IE","PT","GR","CZ","RO","HU","NO","CH","BG","CY","EE","HR","LT","LU","LV","MT","SI","SK"],
  "North America": ["US","CA","MX"],
  "Asia Pacific":  ["JP","CN","IN","AU","NZ","SG","HK","AE"],
  "South America": ["BR"],
  Africa:          ["ZA"],
}

export const allCountriesFlat = Object.values(continentGroups).flat()

export const eu27 = [
  "AT","BE","BG","CY","CZ","DE","DK","EE","ES","FI",
  "FR","GR","HR","HU","IE","IT","LT","LU","LV","MT",
  "NL","PL","PT","RO","SE","SI","SK",
]

// ─── Country data ────────────────────────────────────────────

export const countryData: Record<string, { name: string; continent: string }> = {
  GB: { name: "United Kingdom",       continent: "Europe"       },
  DE: { name: "Germany",              continent: "Europe"       },
  FR: { name: "France",              continent: "Europe"       },
  IT: { name: "Italy",               continent: "Europe"       },
  ES: { name: "Spain",               continent: "Europe"       },
  NL: { name: "Netherlands",         continent: "Europe"       },
  BE: { name: "Belgium",             continent: "Europe"       },
  AT: { name: "Austria",             continent: "Europe"       },
  PL: { name: "Poland",              continent: "Europe"       },
  SE: { name: "Sweden",              continent: "Europe"       },
  FI: { name: "Finland",             continent: "Europe"       },
  DK: { name: "Denmark",             continent: "Europe"       },
  IE: { name: "Ireland",             continent: "Europe"       },
  PT: { name: "Portugal",            continent: "Europe"       },
  GR: { name: "Greece",              continent: "Europe"       },
  CZ: { name: "Czech Republic",      continent: "Europe"       },
  RO: { name: "Romania",             continent: "Europe"       },
  HU: { name: "Hungary",             continent: "Europe"       },
  NO: { name: "Norway",              continent: "Europe"       },
  CH: { name: "Switzerland",         continent: "Europe"       },
  BG: { name: "Bulgaria",            continent: "Europe"       },
  CY: { name: "Cyprus",              continent: "Europe"       },
  EE: { name: "Estonia",             continent: "Europe"       },
  HR: { name: "Croatia",             continent: "Europe"       },
  LT: { name: "Lithuania",           continent: "Europe"       },
  LU: { name: "Luxembourg",          continent: "Europe"       },
  LV: { name: "Latvia",              continent: "Europe"       },
  MT: { name: "Malta",               continent: "Europe"       },
  SI: { name: "Slovenia",            continent: "Europe"       },
  SK: { name: "Slovakia",            continent: "Europe"       },
  US: { name: "United States",       continent: "Americas"     },
  CA: { name: "Canada",              continent: "Americas"     },
  MX: { name: "Mexico",              continent: "Americas"     },
  BR: { name: "Brazil",              continent: "Americas"     },
  JP: { name: "Japan",               continent: "Asia Pacific" },
  CN: { name: "China",               continent: "Asia Pacific" },
  IN: { name: "India",               continent: "Asia Pacific" },
  AU: { name: "Australia",           continent: "Asia Pacific" },
  NZ: { name: "New Zealand",         continent: "Asia Pacific" },
  SG: { name: "Singapore",           continent: "Asia Pacific" },
  HK: { name: "Hong Kong",           continent: "Asia Pacific" },
  AE: { name: "United Arab Emirates",continent: "Asia Pacific" },
  ZA: { name: "South Africa",        continent: "Africa"       },
}

export const allCountryCodes = Object.keys(countryData)

export function getFlag(code: string): string {
  if (!code || code.length !== 2) return "\u{1F310}"
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("")
}

export function getCountryName(code: string): string {
  return countryData[code]?.name || code
}

export function getContinent(code: string): string {
  return countryData[code]?.continent || "Other"
}

export function coverageBreakdown(codes: string[]): [string, number][] {
  const groups: Record<string, number> = {}
  codes.forEach((code) => {
    const cont = getContinent(code)
    groups[cont] = (groups[cont] || 0) + 1
  })
  return Object.entries(groups).sort((a, b) => b[1] - a[1])
}

// ─── Initial mock data ───────────────────────────────────────

export const initialMaterials: PackagingMaterial[] = [
  { id: 1,  n: "Square Box",          t: "Box",    mc: 2,    lc: 0,   l: 400,  w: 400,  h: 400,  td: "",       wt: 700   },
  { id: 2,  n: "Printers Pallet",     t: "Pallet", mc: 5,    lc: 5,   l: 920,  w: 650,  h: 1200, td: "",       wt: 1500  },
  { id: 3,  n: "Pallet: Euro 120x80", t: "Pallet", mc: 6,    lc: 6,   l: 1200, w: 1000, h: 1200, td: "",       wt: 10000 },
  { id: 4,  n: "Padded Envelope",     t: "Box",    mc: 0.31, lc: 0.6, l: 320,  w: 240,  h: 20,   td: "",       wt: 50    },
  { id: 5,  n: "Flat Mailer",         t: "Box",    mc: 0.3,  lc: 0.5, l: 350,  w: 250,  h: 30,   td: "",       wt: 100   },
  { id: 6,  n: "A3 18x12x6",          t: "Box",    mc: 2,    lc: 0,   l: 458,  w: 305,  h: 152,  td: "",       wt: 370   },
  { id: 7,  n: "12x9x9",              t: "Box",    mc: 1,    lc: 0,   l: 305,  w: 229,  h: 229,  td: "",       wt: 254   },
  { id: 8,  n: "12x9x6",              t: "Box",    mc: 0.45, lc: 0,   l: 305,  w: 229,  h: 152,  td: "",       wt: 218   },
  { id: 9,  n: "12x9x3",              t: "Box",    mc: 0.35, lc: 0,   l: 305,  w: 229,  h: 76,   td: "",       wt: 170   },
  { id: 10, n: "1035x775x50mm",       t: "Box",    mc: 3.7,  lc: 0,   l: 1035, w: 770,  h: 50,   td: "",       wt: 800   },
  { id: 11, n: "Poster Tube 100cm",   t: "Tube",   mc: 1.2,  lc: 0.5, l: 1000, w: 0,    h: 0,    td: "100mm",  wt: 200   },
]

export const initialPkgRules: PackagingRule[] = [
  { id: 1, name: "Softcover Book",    p: 50, customer: "All", products: ["Softcover Books","Stitch Books"],         materials: ["12x9x3","12x9x6","12x9x9","Square Box"],     minW: "",      maxW: "15000" },
  { id: 2, name: "Hardcover Book",    p: 40, customer: "All", products: ["Hardcover Books","Casebound Books"],      materials: ["12x9x6","12x9x9","A3 18x12x6"],             minW: "",      maxW: "8000"  },
  { id: 3, name: "Large Format Flat", p: 30, customer: "All", products: ["Board","Lettering","POS","Blade Sign"],   materials: ["1035x775x50mm","Square Box"],                minW: "",      maxW: "10000" },
  { id: 4, name: "Rollable",          p: 25, customer: "All", products: ["Banner","Vinyl"],                        materials: ["Poster Tube 100cm"],                         minW: "",      maxW: "3000"  },
  { id: 5, name: "Pallet High Vol",   p: 10, customer: "All", products: ["Softcover Books","Hardcover Books"],      materials: ["Printers Pallet","Pallet: Euro 120x80"],     minW: "15000", maxW: "650000"},
]

export const initialZones: DestinationZone[] = [
  { id: 1, name: "UK mainland",     type: "geographic", countries: ["GB"],                                                                                   postcodes: "",                      desc: "United Kingdom domestic" },
  { id: 2, name: "Continental US",  type: "geographic", countries: ["US"],                                                                                   postcodes: "",                      desc: "All US states"           },
  { id: 3, name: "EU",              type: "geographic", countries: ["DE","FR","IT","ES","NL","BE","AT","PL","SE","FI","DK","IE","PT","GR","CZ","RO","HU"],   postcodes: "",                      desc: "Core EU"                 },
  { id: 4, name: "International",   type: "geographic", countries: ["JP","CN","AU","NZ","IN","BR","ZA","AE","SG","HK"],                                      postcodes: "",                      desc: "Rest of world"           },
  { id: 5, name: "Swindon (local)", type: "geographic", countries: ["GB"],                                                                                   postcodes: "SN1, SN2, SN3, SN4, SN5, SN6", desc: "Local delivery" },
  { id: 6, name: "To be collected", type: "pickup",     countries: [],                                                                                       postcodes: "",                      desc: "Customer pickup"         },
]

export const initialMethods: ShippingMethod[] = [
  { id: 1,  name: "DHL Express Worldwide",  carrier: "DHL Express",    type: "GCL", on: true, transit: "1-3 days",  cost: "",      consignment: "", dests: ["UK mainland","EU","International"] },
  { id: 2,  name: "DHL Economy Select",     carrier: "DHL Express",    type: "GCL", on: true, transit: "3-7 days",  cost: "",      consignment: "", dests: ["UK mainland","EU"] },
  { id: 3,  name: "FedEx Ground",           carrier: "FedEx",          type: "GCL", on: true, transit: "3-5 days",  cost: "",      consignment: "", dests: ["Continental US"] },
  { id: 4,  name: "Royal Mail Tracked 48",  carrier: "Royal Mail",     type: "GCL", on: true, transit: "2-3 days",  cost: "",      consignment: "", dests: ["UK mainland"] },
  { id: 5,  name: "UPS Express Saver",      carrier: "UPS",            type: "GCL", on: true, transit: "1-2 days",  cost: "",      consignment: "", dests: ["Continental US","International"] },
  { id: 6,  name: "Next day working day",   carrier: "Evri / DX",      type: "PSP", on: true, transit: "Next day",  cost: "9.20",  consignment: "3.00", dests: ["UK mainland"] },
  { id: 7,  name: "Same day",               carrier: "Courier",        type: "PSP", on: true, transit: "Same day",  cost: "250",   consignment: "", dests: ["UK mainland","Swindon (local)"] },
  { id: 8,  name: "Saturday delivery",      carrier: "Evri / DX",      type: "PSP", on: true, transit: "Saturday",  cost: "13.50", consignment: "6.00", dests: ["UK mainland"] },
  { id: 9,  name: "Pallet delivery",        carrier: "Pallet Express", type: "PSP", on: true, transit: "2-5 days",  cost: "85",    consignment: "", dests: ["UK mainland"] },
  { id: 10, name: "Pallet express",         carrier: "Pallet Express", type: "PSP", on: true, transit: "Next day",  cost: "175",   consignment: "", dests: ["UK mainland"] },
  { id: 11, name: "Own truck delivery",     carrier: "PSP Fleet",      type: "PSP", on: true, transit: "Variable",  cost: "0",     consignment: "", dests: ["Swindon (local)"] },
  { id: 12, name: "Collection",             carrier: "-",              type: "PSP", on: true, transit: "-",          cost: "0",     consignment: "", dests: ["To be collected"] },
]

export const initialShipRules: ShipRule[] = [
  { id: 1, name: "UK Small Packages - Next Day First", active: true, customer: "All", pkg: "12x9x3",          dest: "UK mainland",     methods: [{ n: "Next day working day", c: "Evri / DX" }, { n: "Same day", c: "Courier" }, { n: "Saturday delivery", c: "Evri / DX" }] },
  { id: 2, name: "UK Medium Packages",                  active: true, customer: "All", pkg: "12x9x6",          dest: "UK mainland",     methods: [{ n: "Next day working day", c: "Evri / DX" }, { n: "Same day", c: "Courier" }] },
  { id: 3, name: "UK Pallet Shipments",                 active: true, customer: "All", pkg: "Printers Pallet", dest: "UK mainland",     methods: [{ n: "Pallet delivery", c: "Pallet Express" }, { n: "Pallet express", c: "Pallet Express" }] },
  { id: 4, name: "Hudson US - FedEx Priority",          active: true, customer: "Hudson Printing", pkg: "12x9x3", dest: "Continental US", methods: [{ n: "FedEx Ground", c: "FedEx" }, { n: "UPS Express Saver", c: "UPS" }] },
  { id: 5, name: "Collection",                          active: true, customer: "All", pkg: "12x9x3",          dest: "To be collected", methods: [{ n: "Collection", c: "-" }] },
]

export const carrierColors: Record<string, string> = {
  "DHL Express":    "#FFCC00",
  FedEx:            "#4D148C",
  "Royal Mail":     "#E2001A",
  UPS:              "#351C15",
  "Evri / DX":      "#5D3FD3",
  Courier:          "#0891b2",
  "Pallet Express": "#059669",
  "PSP Fleet":      "#6b7280",
  "-":              "#9ca3af",
}
