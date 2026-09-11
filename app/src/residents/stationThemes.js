// Which workstation shape (see world/stations.js) each resident works at.
// Presentation only — no skill content lives here, just a pointer to one of
// the station kit's shapes, loosely matched to what the real skill does.
export const STATION_THEMES = {
  "grill-me": "halo", // interrogation halo — pressure-tests a plan
  "tufte-charts": "chart-podium", // data-ink bars
  skillopt: "loop-ring", // self-tuning feedback loop
  "no-ai-slop-personal": "writing-desk",
  "no-ai-slop-community": "writing-desk",
  ship: "dock-crate", // merge, test, tag, ship
  slideshow: "projector-screen",
};

export function stationThemeFor(residentId) {
  return STATION_THEMES[residentId] ?? "halo";
}
