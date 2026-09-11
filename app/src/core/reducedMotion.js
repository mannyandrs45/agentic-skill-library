// Central prefers-reduced-motion gate. The 3D world stays inspectable and
// downloadable either way — this only throttles/stops continuous animation.

const query = window.matchMedia("(prefers-reduced-motion: reduce)");

export function prefersReducedMotion() {
  return query.matches;
}

export function onReducedMotionChange(callback) {
  const handler = () => callback(query.matches);
  query.addEventListener("change", handler);
  return () => query.removeEventListener("change", handler);
}
