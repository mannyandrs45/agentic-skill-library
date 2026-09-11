import * as THREE from "three";
import { GARDEN_RADIUS } from "./layout.js";

/** Original archive-garden ground: a mossy disc with a soft ring path and a few blob shrubs. */
export function createGarden() {
  const group = new THREE.Group();
  group.name = "garden";

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(GARDEN_RADIUS, 48),
    new THREE.MeshStandardMaterial({ color: 0x25422f, roughness: 0.95 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  group.add(ground);

  const path = new THREE.Mesh(
    new THREE.RingGeometry(GARDEN_RADIUS * 0.55, GARDEN_RADIUS * 0.62, 48),
    new THREE.MeshStandardMaterial({ color: 0x3d5a3f, roughness: 0.9 }),
  );
  path.rotation.x = -Math.PI / 2;
  path.position.y = 0.01;
  group.add(path);

  const shrubMaterial = new THREE.MeshStandardMaterial({ color: 0x2f6b4f, roughness: 0.8 });
  const shrubPositions = [
    [-4.2, 0, -2.1],
    [-3.4, 0, 2.8],
    [4.4, 0, -3.0],
    [-5.0, 0, 0.4],
  ];
  for (const [x, y, z] of shrubPositions) {
    const shrub = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 0), shrubMaterial);
    shrub.position.set(x, 0.4, z);
    shrub.castShadow = true;
    shrub.receiveShadow = true;
    group.add(shrub);
  }

  return group;
}
