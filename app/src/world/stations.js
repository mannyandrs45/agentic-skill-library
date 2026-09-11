import * as THREE from "three";

/**
 * A small kit of original plant shapes a resident tends: an orchid spike
 * (four native Florida orchid species, each a size/bloom-count variation),
 * a palm, and a low palmetto/coontie-style fan. None of this borrows
 * geometry from Bot Crossing or anywhere else — every plant here is
 * assembled from primitives for this project, loosely proportioned like the
 * real species named in residents/stationThemes.js but not botanically
 * exact models.
 */

function soilMound(radius = 0.5) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius + 0.08, 0.2, 20),
    new THREE.MeshStandardMaterial({ color: 0x241d12, roughness: 0.95 }),
  );
  mesh.position.y = 0.1;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function bloomMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.35,
    roughness: 0.4,
  });
}

function sway(mesh, phase = 0) {
  mesh.userData.baseRotZ = mesh.rotation.z;
  mesh.userData.swayPhase = phase;
  return mesh;
}

function buildOrchidSpike(group, accentColor, { stemHeight = 0.7, bloomCount = 4, spread = 0.12 } = {}) {
  group.add(soilMound(0.42));

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.026, stemHeight, 8),
    new THREE.MeshStandardMaterial({ color: 0x3f6b3a, roughness: 0.8 }),
  );
  stem.position.y = 0.2 + stemHeight / 2;
  stem.castShadow = true;
  group.add(stem);

  const material = bloomMaterial(accentColor);
  const blooms = [];
  for (let i = 0; i < bloomCount; i += 1) {
    const t = bloomCount === 1 ? 1 : i / (bloomCount - 1);
    const bloom = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), material);
    bloom.scale.set(1, 0.45, 0.7);
    const side = i % 2 === 0 ? 1 : -1;
    bloom.position.set(side * spread, 0.35 + t * stemHeight * 0.85, side * spread * 0.6);
    bloom.rotation.z = side * 0.5;
    bloom.castShadow = true;
    group.add(sway(bloom, i * 0.7));
    blooms.push(bloom);
  }

  const leaf = new THREE.Mesh(
    new THREE.ConeGeometry(0.09, 0.3, 6, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x2f5a2c, roughness: 0.85, side: THREE.DoubleSide }),
  );
  leaf.position.set(-0.08, 0.32, 0);
  leaf.rotation.z = 0.5;
  group.add(leaf);

  return { sway: blooms };
}

function buildPalm(group, accentColor, { frondCount = 6, trunkHeight = 0.65 } = {}) {
  group.add(soilMound(0.48));

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.07, trunkHeight, 10),
    new THREE.MeshStandardMaterial({ color: 0x6b5334, roughness: 0.85 }),
  );
  trunk.position.y = 0.2 + trunkHeight / 2;
  trunk.castShadow = true;
  group.add(trunk);

  const frondMaterial = new THREE.MeshStandardMaterial({ color: 0x3f8a44, roughness: 0.7, side: THREE.DoubleSide });
  const fronds = [];
  for (let i = 0; i < frondCount; i += 1) {
    const frond = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.02), frondMaterial);
    const angle = (i / frondCount) * Math.PI * 2;
    frond.position.set(0, 0.2 + trunkHeight, 0);
    frond.rotation.z = Math.PI / 2.6;
    frond.rotation.y = angle;
    frond.translateY(0.25);
    frond.castShadow = true;
    group.add(sway(frond, i * 0.5));
    fronds.push(frond);
  }

  const bud = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), bloomMaterial(accentColor));
  bud.position.y = 0.24 + trunkHeight;
  group.add(bud);

  return { sway: fronds };
}

function buildPalmettoFan(group, accentColor, { frondCount = 9, frondLength = 0.42, height = 0.22 } = {}) {
  group.add(soilMound(0.5));

  const frondMaterial = new THREE.MeshStandardMaterial({ color: 0x4a6b3a, roughness: 0.75, side: THREE.DoubleSide });
  const fronds = [];
  for (let i = 0; i < frondCount; i += 1) {
    const frond = new THREE.Mesh(new THREE.BoxGeometry(0.05, frondLength, 0.015), frondMaterial);
    const angle = (i / frondCount) * Math.PI * 2;
    frond.position.set(0, 0.2 + height, 0);
    frond.rotation.z = Math.PI / 2.2;
    frond.rotation.y = angle;
    frond.translateY(frondLength / 2);
    frond.castShadow = true;
    group.add(sway(frond, i * 0.4));
    fronds.push(frond);
  }

  const heart = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), bloomMaterial(accentColor));
  heart.position.y = 0.24 + height;
  group.add(heart);

  return { sway: fronds };
}

const BUILDERS = {
  "orchid-ghost": (group, color) => buildOrchidSpike(group, color, { stemHeight: 0.55, bloomCount: 2, spread: 0.08 }),
  "orchid-cowhorn": (group, color) => buildOrchidSpike(group, color, { stemHeight: 0.95, bloomCount: 6, spread: 0.14 }),
  "orchid-butterfly": (group, color) => buildOrchidSpike(group, color, { stemHeight: 0.6, bloomCount: 5, spread: 0.1 }),
  "orchid-clamshell": (group, color) => buildOrchidSpike(group, color, { stemHeight: 0.5, bloomCount: 3, spread: 0.16 }),
  palm: (group, color) => buildPalm(group, color, { frondCount: 6, trunkHeight: 0.65 }),
  "palmetto-saw": (group, color) => buildPalmettoFan(group, color, { frondCount: 9, frondLength: 0.44, height: 0.2 }),
  "palmetto-coontie": (group, color) => buildPalmettoFan(group, color, { frondCount: 13, frondLength: 0.24, height: 0.1 }),
};

export function createStation({ theme, accentColor, position }) {
  const build = BUILDERS[theme] ?? BUILDERS["orchid-ghost"];
  const group = new THREE.Group();
  group.name = `plant-${theme}`;
  group.position.copy(position);
  group.userData.animated = build(group, accentColor);
  return group;
}

export function animateStation(station, elapsed) {
  const animated = station.userData.animated ?? {};
  for (const mesh of animated.sway ?? []) {
    mesh.rotation.z = mesh.userData.baseRotZ + Math.sin(elapsed * 1.1 + mesh.userData.swayPhase) * 0.12;
  }
}
