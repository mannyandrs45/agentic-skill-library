import * as THREE from "three";

/**
 * Original "Lumin" garden-archivist design. A soft, round-headed figure is a
 * common enough silhouette on its own, so the distinguishing choices live in
 * the details: a mouthless, matte-porcelain face with glossy dark eyes (not
 * a glowing visor), a stub-legged standing body, a simple wide gardening hat
 * and waist sash instead of any specific costume, and drifting "pollen
 * motes" as the signature accessory. Every part below is a primitive built
 * for this project — no geometry, textures, or models are borrowed from any
 * third party or any specific character.
 */
export function createLumin({ accentColor = 0x8fd3ff, seed = 1 } = {}) {
  const group = new THREE.Group();
  group.name = "lumin";

  const skinMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf3ead9,
    roughness: 0.55,
    clearcoat: 0.18,
    clearcoatRoughness: 0.4,
  });

  // Exaggerated head-to-body ratio reads as "lifelike/childlike" without
  // copying any one character's exact proportions.
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.44, 28, 22), skinMaterial);
  head.scale.set(1, 0.94, 0.96);
  head.position.y = 0.92;
  head.castShadow = true;
  group.add(head);

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.3, 22, 16), skinMaterial);
  body.scale.set(1, 0.85, 0.9);
  body.position.y = 0.34;
  body.castShadow = true;
  group.add(body);

  // Glossy dark eyes instead of a glowing visor — reads as a face, not a
  // gadget, and keeps a soft rim highlight from the scene's warm key light.
  const eyeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1c1712,
    roughness: 0.15,
    clearcoat: 0.6,
  });
  const eyeGeometry = new THREE.SphereGeometry(0.075, 16, 12);
  const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eyeLeft.position.set(-0.16, 0.96, 0.36);
  eyeLeft.scale.set(0.85, 1, 0.6);
  group.add(eyeLeft);

  const eyeRight = eyeLeft.clone();
  eyeRight.position.x = 0.16;
  group.add(eyeRight);

  // Wide gardening hat — a plain cone, not any specific costume design.
  const hat = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 0.2, 20, 1, true),
    new THREE.MeshStandardMaterial({ color: 0xd9c187, roughness: 0.85, side: THREE.DoubleSide }),
  );
  hat.position.set(0, 1.32, 0);
  hat.rotation.z = 0.05;
  hat.castShadow = true;
  group.add(hat);
  const hatBand = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.025, 8, 24),
    new THREE.MeshStandardMaterial({ color: 0x6b4a30, roughness: 0.8 }),
  );
  hatBand.position.copy(hat.position);
  hatBand.rotation.x = Math.PI / 2;
  group.add(hatBand);

  // Nub arms: short, rounded, pudgy limbs, hanging naturally at rest — the
  // previous build rotated these ~75° out from the body, which read as a
  // stuck T-pose. Resting near-vertical (a small outward angle only) plus a
  // gentle continuous sway in animateLumin below fixes that.
  const armGeometry = new THREE.CapsuleGeometry(0.075, 0.16, 4, 8);
  const armLeft = new THREE.Mesh(armGeometry, skinMaterial);
  armLeft.position.set(-0.33, 0.32, 0.02);
  armLeft.rotation.z = 0.2;
  armLeft.castShadow = true;
  group.add(armLeft);

  const armRight = armLeft.clone();
  armRight.position.x = 0.33;
  armRight.rotation.z = -0.2;
  group.add(armRight);

  // Stub legs/feet — a standing, grounded silhouette rather than a hovering one.
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0xe4d7bf, roughness: 0.7 });
  const legLeft = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), legMaterial);
  legLeft.scale.set(1, 0.6, 1.15);
  legLeft.position.set(-0.14, 0.1, 0.02);
  legLeft.castShadow = true;
  group.add(legLeft);

  const legRight = legLeft.clone();
  legRight.position.x = 0.14;
  group.add(legRight);

  // Waist sash: a simple wrapped band with a small seed pouch, standing in
  // for plain gardening attire — no specific costume is referenced.
  const sash = new THREE.Mesh(
    new THREE.TorusGeometry(0.29, 0.035, 8, 24),
    new THREE.MeshStandardMaterial({ color: 0x5a6b3f, roughness: 0.8 }),
  );
  sash.rotation.x = Math.PI / 2;
  sash.position.y = 0.32;
  sash.scale.set(1, 1, 0.9);
  group.add(sash);

  const pouch = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.14, 0.07),
    new THREE.MeshStandardMaterial({ color: 0x8a5a3a, roughness: 0.75 }),
  );
  pouch.position.set(0.16, 0.28, 0.22);
  pouch.rotation.z = -0.2;
  pouch.castShadow = true;
  group.add(pouch);

  // Pollen motes: tiny glowing specks that drift around the resident,
  // tinted with the same accent color as the flower it tends.
  const moteMaterial = new THREE.MeshStandardMaterial({
    color: accentColor,
    emissive: accentColor,
    emissiveIntensity: 1.2,
  });
  const motes = [0, 1].map((i) => {
    const mote = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), moteMaterial);
    mote.userData.orbitOffset = i * Math.PI;
    group.add(mote);
    return mote;
  });

  // Soft contact shadow instead of a hover disc — grounded, not floating.
  const contactShadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.32, 20),
    new THREE.MeshBasicMaterial({ color: 0x0a1a0a, transparent: true, opacity: 0.32 }),
  );
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.005;
  group.add(contactShadow);

  // Aura: a very soft translucent shell carrying the resident's accent glow
  // — the color of the flower it tends.
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(0.62, 16, 12),
    new THREE.MeshStandardMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
    }),
  );
  aura.position.y = 0.55;
  group.add(aura);

  group.userData.animatedParts = { head, body, armLeft, armRight, motes };
  group.userData.seed = seed;

  return group;
}

const REST_PHASE = 0;
const WORK_PHASE = 1;

/** Idle/gesture animation only — position/state transitions live in resident.js. */
export function animateLumin(lumin, elapsed, phase = REST_PHASE) {
  const { head, body, armLeft, armRight, motes } = lumin.userData.animatedParts;
  const seed = lumin.userData.seed;
  const bob = Math.sin(elapsed * 1.4 + seed) * 0.025;
  head.position.y = 0.92 + bob;
  body.position.y = 0.34 + bob * 0.4;

  for (const mote of motes) {
    const angle = elapsed * 0.7 + mote.userData.orbitOffset;
    mote.position.set(Math.cos(angle) * 0.46, 0.7 + Math.sin(angle * 1.7) * 0.08, Math.sin(angle) * 0.46);
  }

  if (phase === WORK_PHASE) {
    // Tending: a slow forward reach-and-return, not a flapping gesture.
    const reach = 0.55 + Math.sin(elapsed * 1.4) * 0.3;
    armLeft.rotation.x = reach;
    armLeft.rotation.z = 0.2 + Math.sin(elapsed * 1.4) * 0.08;
    armRight.rotation.x = reach * 0.55;
    armRight.rotation.z = -0.2 - Math.sin(elapsed * 1.4) * 0.05;
    lumin.rotation.x = 0.12 + Math.sin(elapsed * 1.4) * 0.03;
  } else {
    // Rest/wander: a gentle idle sway, arms stay down near the body.
    const sway = Math.sin(elapsed * 0.7 + seed) * 0.07;
    armLeft.rotation.x = sway;
    armLeft.rotation.z = 0.2;
    armRight.rotation.x = -sway;
    armRight.rotation.z = -0.2;
    lumin.rotation.x = 0;
  }
}

export const LuminPhase = { REST: REST_PHASE, WORK: WORK_PHASE };
