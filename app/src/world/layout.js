import * as THREE from "three";

// Shared coordinates so world, station, and resident behavior agree on
// "where things are" without importing each other's internals.
export const GARDEN_RADIUS = 6;
export const STATION_POSITION = new THREE.Vector3(0, 0, -1.4);
export const REST_POSITION = new THREE.Vector3(2.6, 0, 2.3);
export const WANDER_RADIUS = 1.5;
