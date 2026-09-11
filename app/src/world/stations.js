import * as THREE from "three";

/**
 * A small kit of original workstation shapes, each loosely themed to the
 * kind of work its skill actually does (an interview halo, a data-bar
 * podium, a writing desk, a self-tuning loop, a shipping dock, a slideshow
 * projector). None of this borrows geometry from Bot Crossing's build/repair
 * kit — every station here is assembled from primitives for this project.
 */

function plinth(radius = 0.62, height = 0.32, color = 0x1f3634) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius + 0.1, height, 24),
    new THREE.MeshStandardMaterial({ color, roughness: 0.7 }),
  );
  mesh.position.y = height / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function emissiveMaterial(color, intensity = 0.6) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.3,
    metalness: 0.1,
  });
}

function buildHalo(group, accentColor) {
  group.add(plinth());
  const material = emissiveMaterial(accentColor, 0.55);
  const haloA = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.03, 12, 48), material);
  haloA.rotation.x = Math.PI / 2.6;
  haloA.position.y = 1.1;
  group.add(haloA);

  const haloB = haloA.clone();
  haloB.rotation.z = Math.PI / 2;
  group.add(haloB);

  const shard = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 0), emissiveMaterial(accentColor, 0.9));
  shard.position.set(0, 1.55, 0);
  shard.userData.baseY = shard.position.y;
  shard.castShadow = true;
  group.add(shard);

  return { spin: [haloA, haloB], bob: [shard] };
}

function buildChartPodium(group, accentColor) {
  group.add(plinth(0.7, 0.24, 0x1c3230));
  const heights = [0.5, 0.85, 0.65, 1.05, 0.4];
  const material = emissiveMaterial(accentColor, 0.5);
  const bars = heights.map((h, i) => {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, h, 0.12), material);
    bar.position.set(-0.4 + i * 0.2, 0.24 + h / 2, 0);
    bar.castShadow = true;
    group.add(bar);
    return bar;
  });
  return { pulse: bars };
}

function buildWritingDesk(group, accentColor) {
  group.add(plinth(0.55, 0.2, 0x233a37));
  const page = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.03, 0.5),
    new THREE.MeshStandardMaterial({ color: 0xe9e2cf, roughness: 0.8 }),
  );
  page.position.y = 0.24;
  page.rotation.x = -0.25;
  page.castShadow = true;
  group.add(page);

  const nib = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.26, 12), emissiveMaterial(accentColor, 0.8));
  nib.position.set(0, 0.75, 0.05);
  nib.userData.baseY = nib.position.y;
  nib.rotation.x = Math.PI;
  group.add(nib);

  return { bob: [nib] };
}

function buildLoopRing(group, accentColor) {
  group.add(plinth(0.5, 0.2, 0x1c2c3a));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.045, 12, 48), emissiveMaterial(accentColor, 0.5));
  ring.rotation.x = Math.PI / 2.3;
  ring.position.y = 0.85;
  group.add(ring);

  const node = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), emissiveMaterial(accentColor, 1));
  group.add(node);

  return { spin: [ring], orbit: [{ mesh: node, radius: 0.62, tiltX: Math.PI / 2.3, height: 0.85 }] };
}

function buildDockCrate(group, accentColor) {
  group.add(plinth(0.6, 0.18, 0x223838));
  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8),
    new THREE.MeshStandardMaterial({ color: 0x5a4632, roughness: 0.8 }),
  );
  post.position.y = 0.73;
  post.castShadow = true;
  group.add(post);

  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.2), emissiveMaterial(accentColor, 0.7));
  flag.material.side = THREE.DoubleSide;
  flag.position.set(0.18, 1.15, 0);
  group.add(flag);

  const crate = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.32, 0.32),
    new THREE.MeshStandardMaterial({ color: 0x6b5230, roughness: 0.75 }),
  );
  crate.position.set(-0.45, 0.34, 0);
  crate.castShadow = true;
  group.add(crate);

  return { wave: [flag] };
}

function buildProjectorScreen(group, accentColor) {
  group.add(plinth(0.45, 0.16, 0x1a2a2a));
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x101418, roughness: 0.9 }),
  );
  screen.position.set(0, 0.65, -0.3);
  group.add(screen);

  const beamMaterial = emissiveMaterial(accentColor, 0.8);
  beamMaterial.transparent = true;
  beamMaterial.opacity = 0.55;
  const beam = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.5, 4, 1, true), beamMaterial);
  beam.rotation.x = Math.PI / 2;
  beam.rotation.z = Math.PI / 4;
  beam.position.set(0, 0.5, 0.05);
  beam.userData.baseY = beam.position.y;
  group.add(beam);

  return { flicker: [screen], bob: [beam] };
}

const BUILDERS = {
  halo: buildHalo,
  "chart-podium": buildChartPodium,
  "writing-desk": buildWritingDesk,
  "loop-ring": buildLoopRing,
  "dock-crate": buildDockCrate,
  "projector-screen": buildProjectorScreen,
};

export function createStation({ theme, accentColor, position }) {
  const build = BUILDERS[theme] ?? buildHalo;
  const group = new THREE.Group();
  group.name = `station-${theme}`;
  group.position.copy(position);
  group.userData.animated = build(group, accentColor);
  return group;
}

export function animateStation(station, elapsed) {
  const animated = station.userData.animated ?? {};
  for (const mesh of animated.spin ?? []) mesh.rotation.z = elapsed * 0.3;
  for (const mesh of animated.bob ?? []) {
    mesh.position.y = mesh.userData.baseY + Math.sin(elapsed * 1.6) * 0.05;
  }
  for (const mesh of animated.wave ?? []) mesh.rotation.y = Math.sin(elapsed * 2) * 0.3;
  for (const mesh of animated.flicker ?? []) {
    mesh.material.emissiveIntensity = 0.4 + Math.sin(elapsed * 3) * 0.1;
  }
  (animated.pulse ?? []).forEach((bar, i) => {
    bar.material.emissiveIntensity = 0.4 + Math.sin(elapsed * 1.4 + i) * 0.2;
  });
  for (const { mesh, radius, tiltX, height } of animated.orbit ?? []) {
    const angle = elapsed * 0.8;
    mesh.position.set(Math.cos(angle) * radius, height + Math.sin(angle) * radius * Math.sin(tiltX), Math.sin(angle) * radius * Math.cos(tiltX));
  }
}
