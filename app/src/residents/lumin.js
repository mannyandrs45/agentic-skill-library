import * as THREE from "three";

/**
 * Original "Lumin" archivist design — emotionally adjacent to a soft
 * curious-alien archetype, but deliberately NOT that: no legs (it hovers,
 * rather than walks, on a soft light disc), a continuous teardrop-blob
 * silhouette instead of a humanoid head/torso split, a single glowing visor
 * ARC instead of eyes, and a diagonal scroll-satchel plus orbiting "record
 * motes" as its signature accessory. No meshes, textures, or geometry are
 * borrowed from any third party — every part below is a primitive.
 */
export function createLumin({ accentColor = 0x8fd3ff, seed = 1 } = {}) {
  const group = new THREE.Group();
  group.name = "lumin";

  const skinColor = 0xd9c9ff;
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: skinColor,
    roughness: 0.55,
    metalness: 0.05,
  });

  // Continuous soft-blob body: a wide lower cushion fused with a smaller
  // upper dome, both flattened toward the front — silhouette reads as one
  // teardrop, not a torso-plus-head.
  const lower = new THREE.Mesh(new THREE.SphereGeometry(0.46, 24, 18), skinMaterial);
  lower.scale.set(1, 0.82, 0.92);
  lower.position.y = 0.5;
  lower.castShadow = true;
  group.add(lower);

  const upper = new THREE.Mesh(new THREE.SphereGeometry(0.33, 24, 18), skinMaterial);
  upper.scale.set(0.95, 1, 0.9);
  upper.position.y = 0.98;
  upper.castShadow = true;
  group.add(upper);

  // Visor arc: the only "face" element, a thin glowing band instead of eyes.
  const visor = new THREE.Mesh(
    new THREE.TorusGeometry(0.2, 0.02, 8, 24, Math.PI * 0.8),
    new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 1,
      roughness: 0.2,
    }),
  );
  visor.rotation.set(0, 0, Math.PI * 0.1);
  visor.position.set(0, 1.0, 0.28);
  group.add(visor);

  // Nub arms: short capsule-like limbs, one each side, for gesture during work.
  const armMaterial = skinMaterial;
  const armGeometry = new THREE.CapsuleGeometry(0.07, 0.22, 4, 8);
  const armLeft = new THREE.Mesh(armGeometry, armMaterial);
  armLeft.position.set(-0.42, 0.62, 0.05);
  armLeft.rotation.z = Math.PI / 2.6;
  armLeft.castShadow = true;
  group.add(armLeft);

  const armRight = armLeft.clone();
  armRight.position.x = 0.42;
  armRight.rotation.z = -Math.PI / 2.6;
  group.add(armRight);

  // Scroll satchel: a flattened rounded box worn diagonally — the
  // archivist's signature accessory.
  const satchel = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.24, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x6a4a8f, roughness: 0.6 }),
  );
  satchel.position.set(0.16, 0.42, 0.32);
  satchel.rotation.z = -0.35;
  satchel.castShadow = true;
  group.add(satchel);

  // Record motes: tiny glowing spheres that slowly orbit the body.
  const moteMaterial = new THREE.MeshStandardMaterial({
    color: accentColor,
    emissive: accentColor,
    emissiveIntensity: 1.2,
  });
  const motes = [0, 1].map((i) => {
    const mote = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), moteMaterial);
    mote.userData.orbitOffset = i * Math.PI;
    group.add(mote);
    return mote;
  });

  // Hover disc: soft glow ring under the body, standing in for legs/feet —
  // this is a floating archivist, not a walker.
  const hoverDisc = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 24),
    new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    }),
  );
  hoverDisc.rotation.x = -Math.PI / 2;
  hoverDisc.position.y = 0.06;
  group.add(hoverDisc);

  // Aura: a very soft translucent shell, the "unique color glow".
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(0.68, 16, 12),
    new THREE.MeshStandardMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    }),
  );
  aura.position.y = 0.62;
  group.add(aura);

  group.userData.animatedParts = { upper, lower, armLeft, armRight, motes, hoverDisc, visor };
  group.userData.seed = seed;

  return group;
}

const REST_PHASE = 0;
const WORK_PHASE = 1;

/** Idle/gesture animation only — position/state transitions live in resident.js. */
export function animateLumin(lumin, elapsed, phase = REST_PHASE) {
  const { upper, armLeft, armRight, motes, hoverDisc, visor } = lumin.userData.animatedParts;
  const bob = Math.sin(elapsed * 1.4 + lumin.userData.seed) * 0.03;
  upper.position.y = 0.98 + bob;
  hoverDisc.position.y = 0.06 + Math.sin(elapsed * 1.4 + lumin.userData.seed) * 0.01;
  visor.material.emissiveIntensity = 0.8 + Math.sin(elapsed * 2.2) * 0.2;

  for (const mote of motes) {
    const angle = elapsed * 0.9 + mote.userData.orbitOffset;
    mote.position.set(Math.cos(angle) * 0.5, 0.75 + Math.sin(angle * 1.7) * 0.08, Math.sin(angle) * 0.5);
  }

  const gesture = phase === WORK_PHASE ? Math.sin(elapsed * 4) * 0.25 : Math.sin(elapsed * 0.8) * 0.05;
  armLeft.rotation.x = gesture;
  armRight.rotation.x = -gesture;
}

export const LuminPhase = { REST: REST_PHASE, WORK: WORK_PHASE };
