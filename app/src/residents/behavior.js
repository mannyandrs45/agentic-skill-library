import * as THREE from "three";

// States are catalog metaphors only — never "running", "thinking", or
// "executing" an AI task. See labels in ui/panel.js.
export const BehaviorState = {
  WANDER: "wander",
  TRAVEL: "travel",
  WORK: "work",
  REST: "rest",
};

function randomPointInCircle(rng, center, radius) {
  const angle = rng() * Math.PI * 2;
  const r = Math.sqrt(rng()) * radius;
  return new THREE.Vector3(center.x + Math.cos(angle) * r, 0, center.z + Math.sin(angle) * r);
}

/**
 * Builds one deterministic wander -> travel -> work -> travel -> rest cycle
 * from a seeded rng. The resulting schedule is a pure function of the rng
 * sequence, so the same worldSeed + residentId always produces the same
 * cycle — reproducible for tests and screenshots.
 */
export function buildSchedule(rng, { restPosition, wanderRadius, workAnchor }) {
  const segments = [];
  let cursor = restPosition.clone();
  let time = 0;

  const push = (state, to, duration) => {
    segments.push({ state, from: cursor.clone(), to: to.clone(), start: time, duration });
    cursor = to.clone();
    time += duration;
  };

  // Two wander hops near home before heading to the station.
  for (let i = 0; i < 2; i += 1) {
    const hop = randomPointInCircle(rng, restPosition, wanderRadius);
    push(BehaviorState.WANDER, hop, 2.2 + rng() * 1.6);
  }

  push(BehaviorState.TRAVEL, workAnchor, 2.4 + rng() * 0.6);
  push(BehaviorState.WORK, workAnchor, 5 + rng() * 3);
  push(BehaviorState.TRAVEL, restPosition, 2.4 + rng() * 0.6);
  push(BehaviorState.REST, restPosition, 4 + rng() * 3);

  return { segments, totalDuration: time };
}

/** Pure function: (schedule, elapsedSeconds) -> { state, position, progress } */
export function sampleSchedule(schedule, elapsedSeconds) {
  const t = elapsedSeconds % schedule.totalDuration;
  const segment = schedule.segments.find((s) => t >= s.start && t < s.start + s.duration)
    ?? schedule.segments[schedule.segments.length - 1];
  const progress = Math.min(1, (t - segment.start) / segment.duration);
  const eased = 0.5 - 0.5 * Math.cos(Math.PI * progress); // ease in/out
  const position = segment.from.clone().lerp(segment.to, eased);
  return { state: segment.state, position, progress };
}
