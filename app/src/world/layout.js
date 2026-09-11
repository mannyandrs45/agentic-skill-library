import * as THREE from "three";

// Shared coordinates so world, stations, and resident behavior agree on
// "where things are" without importing each other's internals.
export const GARDEN_RADIUS = 8.5;

const STATION_RING_RADIUS = 3.1;
const REST_RING_RADIUS = 6.4;
export const WANDER_RADIUS = 1.3;

/**
 * Places resident `index` of `total` around two concentric rings: stations
 * closer to the center (so the camera reads them as "the work area"), rest
 * spots further out along the garden's edge path. A small angular offset
 * between the two rings keeps a resident's own station and rest spot from
 * sitting on the same radial line, which reads better as "two places" than
 * "one place, two radii."
 */
export function ringLayout(index, total) {
  const angle = (index / total) * Math.PI * 2;
  const stationAngle = angle;
  const restAngle = angle + Math.PI / total;

  const stationPosition = new THREE.Vector3(
    Math.cos(stationAngle) * STATION_RING_RADIUS,
    0,
    Math.sin(stationAngle) * STATION_RING_RADIUS,
  );
  const restPosition = new THREE.Vector3(
    Math.cos(restAngle) * REST_RING_RADIUS,
    0,
    Math.sin(restAngle) * REST_RING_RADIUS,
  );
  const workAnchor = stationPosition.clone().add(
    new THREE.Vector3(Math.cos(stationAngle) * 0.95, 0, Math.sin(stationAngle) * 0.95),
  );

  return { stationPosition, restPosition, workAnchor, wanderRadius: WANDER_RADIUS };
}
