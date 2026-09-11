import * as THREE from "three";
import { Reflector } from "three/addons/objects/Reflector.js";
import { GARDEN_RADIUS } from "./layout.js";

/**
 * A layered-green garden: a real mirror-reflective floor (no external
 * texture needed — Reflector is a same-license three.js core addon, not a
 * Bot Crossing asset) standing in for a moss-edged koi pond, a pale path,
 * mossy stones, and a few fern tufts instead of a flat lawn.
 */
export function createGarden() {
  const group = new THREE.Group();
  group.name = "garden";

  const floor = new Reflector(new THREE.CircleGeometry(GARDEN_RADIUS, 64), {
    color: 0x16321c,
    textureWidth: window.innerWidth * Math.min(window.devicePixelRatio, 2),
    textureHeight: window.innerHeight * Math.min(window.devicePixelRatio, 2),
    clipBias: 0.003,
  });
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  const path = new THREE.Mesh(
    new THREE.RingGeometry(GARDEN_RADIUS * 0.53, GARDEN_RADIUS * 0.58, 64),
    new THREE.MeshStandardMaterial({
      color: 0xd9e6c2,
      roughness: 0.8,
      transparent: true,
      opacity: 0.3,
    }),
  );
  path.rotation.x = -Math.PI / 2;
  path.position.y = 0.01;
  group.add(path);

  const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0x35502e, roughness: 0.9 });
  const stonePlacements = [
    [-6.2, 0.42, -3.1, 0.55],
    [-5.0, 0.3, 3.6, 0.4],
    [6.4, 0.36, -4.2, 0.48],
    [-7.1, 0.24, 0.6, 0.32],
    [5.6, 0.28, 4.6, 0.36],
  ];
  for (const [x, y, z, radius] of stonePlacements) {
    const stone = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, 0), stoneMaterial);
    stone.position.set(x, y, z);
    stone.scale.y *= 0.7;
    stone.rotation.y = x + z;
    stone.castShadow = true;
    stone.receiveShadow = true;
    group.add(stone);
  }

  const fernMaterial = new THREE.MeshStandardMaterial({ color: 0x4c8a3f, roughness: 0.8, side: THREE.DoubleSide });
  const fernClusters = [
    [-6.8, -2.4],
    [-4.6, 4.2],
    [6.9, -3.6],
    [5.0, 4.9],
    [-2.5, -7.4],
    [2.8, 7.2],
  ];
  for (const [cx, cz] of fernClusters) {
    for (let i = 0; i < 4; i += 1) {
      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.36, 6, 1, true), fernMaterial);
      const angle = (i / 4) * Math.PI * 2 + cx;
      blade.position.set(cx + Math.cos(angle) * 0.12, 0.18, cz + Math.sin(angle) * 0.12);
      blade.rotation.z = Math.cos(angle) * 0.35;
      blade.rotation.x = Math.sin(angle) * 0.35;
      blade.castShadow = true;
      group.add(blade);
    }
  }

  return group;
}
