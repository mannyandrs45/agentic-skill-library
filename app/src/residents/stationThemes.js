// Which plant (see world/stations.js) each resident tends, and the plain
// info about it shown in the detail panel. Presentation/flavor only — no
// skill content lives here. Species are real Florida natives (four native
// orchids plus three other iconic natives) for garden variety; the models
// are stylized primitives, not botanically exact.
const GARDEN_THEMES = {
  "grill-me": {
    theme: "orchid-ghost",
    commonName: "Ghost Orchid",
    scientificName: "Dendrophylax lindenii",
    note: "Leafless and rare — blooms as a pale, hovering flower.",
  },
  "tufte-charts": {
    theme: "orchid-cowhorn",
    commonName: "Cowhorn Orchid",
    scientificName: "Cyrtopodium punctatum",
    note: "Florida's largest native orchid, with tall multi-bloom spikes.",
  },
  skillopt: {
    theme: "orchid-butterfly",
    commonName: "Butterfly Orchid",
    scientificName: "Encyclia tampensis",
    note: "One of the most common native orchids in Florida's hammocks.",
  },
  "no-ai-slop-personal": {
    theme: "orchid-clamshell",
    commonName: "Clamshell Orchid",
    scientificName: "Prosthechea cochleata",
    note: "Named for its hooded, upside-down bloom shape.",
  },
  "no-ai-slop-community": {
    theme: "palm",
    commonName: "Florida Royal Palm",
    scientificName: "Roystonea regia",
    note: "A towering native palm of South Florida hammocks.",
  },
  ship: {
    theme: "palmetto-saw",
    commonName: "Saw Palmetto",
    scientificName: "Serenoa repens",
    note: "A low, fan-leaved palm found across nearly all of Florida.",
  },
  slideshow: {
    theme: "palmetto-coontie",
    commonName: "Coontie",
    scientificName: "Zamia integrifolia",
    note: "An ancient native cycad, Florida's only one.",
  },
};

const DEFAULT_THEME = {
  theme: "orchid-ghost",
  commonName: "Ghost Orchid",
  scientificName: "Dendrophylax lindenii",
  note: "Leafless and rare — blooms as a pale, hovering flower.",
};

export function stationThemeFor(residentId) {
  return (GARDEN_THEMES[residentId] ?? DEFAULT_THEME).theme;
}

export function gardenPlantFor(residentId) {
  return GARDEN_THEMES[residentId] ?? DEFAULT_THEME;
}
