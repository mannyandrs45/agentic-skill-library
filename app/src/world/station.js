import * as THREE from "three";
import { STATION_POSITION } from "./layout.js";

/**
 * Original "Interview Lantern" station for grill-me: a low plinth under a
 * tilted double halo, with a small shard hovering above it — a workspace for
 * pressure-testing a plan, not anything from Bot Crossing's build/repair set.
 */
export function createGrillMeStation(accentColor = 0xffb347) {
  const group = new THREE.Group();
  group.name = "station-grill-me";
  group.position.copy(STATION_POSITION);

  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(0.62, 0.72, 0.32, 24),
    new THREE.MeshStandardMaterial({ color: 0x3a3226, roughness: 0.7 }),
  );
  plinth.position.y = 0.16;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);

  const haloMaterial = new THREE.MeshStandardMaterial({
    color: accentColor,
    emissive: accentColor,
    emissiveIntensity: 0.55,
    roughness: 0.3,
    metalness: 0.1,
  });

  const haloA = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.03, 12, 48), haloMaterial);
  haloA.rotation.x = Math.PI / 2.6;
  haloA.position.y = 1.1;
  group.add(haloA);

  const haloB = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.03, 12, 48), haloMaterial);
  haloB.rotation.x = Math.PI / 2.6;
  haloB.rotation.z = Math.PI / 2;
  haloB.position.y = 1.1;
  group.add(haloB);

  const shard = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.16, 0),
    new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 0.9,
      roughness: 0.15,
    }),
  );
  shard.position.set(0, 1.55, 0);
  shard.castShadow = true;
  group.add(shard);

  group.userData.animatedParts = { haloA, haloB, shard };
  // Where a resident stands to face the station while "working."
  group.userData.workAnchor = STATION_POSITION.clone().add(new THREE.Vector3(0, 0, 0.95));

  return group;
}

export function animateStation(station, elapsed) {
  const { haloA, haloB, shard } = station.userData.animatedParts;
  haloA.rotation.z = elapsed * 0.3;
  haloB.rotation.z = elapsed * -0.22;
  shard.rotation.y = elapsed * 0.8;
  shard.position.y = 1.55 + Math.sin(elapsed * 1.6) * 0.05;
}
