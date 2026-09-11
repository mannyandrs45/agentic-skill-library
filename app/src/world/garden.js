import * as THREE from "three";
import { Reflector } from "three/addons/objects/Reflector.js";
import { GARDEN_RADIUS } from "./layout.js";

/**
 * A dusk, dockside archive garden: a real mirror-reflective floor (no
 * external texture needed — Reflector is a same-license three.js core addon,
 * not a Bot Crossing asset) standing in for wet stone/shallow water, a pale
 * ring path, and a scatter of smooth dark stones instead of a lawn.
 */
export function createGarden() {
  const group = new THREE.Group();
  group.name = "garden";

  const floor = new Reflector(new THREE.CircleGeometry(GARDEN_RADIUS, 64), {
    color: 0x14302f,
    textureWidth: window.innerWidth * Math.min(window.devicePixelRatio, 2),
    textureHeight: window.innerHeight * Math.min(window.devicePixelRatio, 2),
    clipBias: 0.003,
  });
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  const path = new THREE.Mesh(
    new THREE.RingGeometry(GARDEN_RADIUS * 0.53, GARDEN_RADIUS * 0.58, 64),
    new THREE.MeshStandardMaterial({
      color: 0xd8ece6,
      roughness: 0.8,
      transparent: true,
      opacity: 0.28,
    }),
  );
  path.rotation.x = -Math.PI / 2;
  path.position.y = 0.01;
  group.add(path);

  const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0x2f4d4c, roughness: 0.9 });
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

  return group;
}
