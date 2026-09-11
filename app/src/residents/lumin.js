import * as THREE from "three";

/**
 * Original "Lumin" archivist design. The brief for a soft, round-headed
 * alien child is a common enough silhouette trope on its own, so the
 * distinguishing choices live in the details: a mouthless, matte-porcelain
 * face with glossy dark eyes (not a glowing visor), a stub-legged standing
 * body instead of a floating one, a diagonal scroll-satchel, and orbiting
 * "record motes" as the signature accessory. Every part below is a
 * primitive built for this project — no geometry, textures, or models are
 * borrowed from any third party or any specific character.
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

  // Nub arms: short, rounded, pudgy limbs for gesture during work.
  const armGeometry = new THREE.CapsuleGeometry(0.075, 0.14, 4, 8);
  const armLeft = new THREE.Mesh(armGeometry, skinMaterial);
  armLeft.position.set(-0.36, 0.42, 0.02);
  armLeft.rotation.z = Math.PI / 2.4;
  armLeft.castShadow = true;
  group.add(armLeft);

  const armRight = armLeft.clone();
  armRight.position.x = 0.36;
  armRight.rotation.z = -Math.PI / 2.4;
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

  // Scroll satchel: a flattened rounded box worn diagonally — the
  // archivist's signature accessory, in a muted accent-adjacent tone.
  const satchel = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, 0.19, 0.06),
    new THREE.MeshStandardMaterial({ color: 0xa8623f, roughness: 0.65 }),
  );
  satchel.position.set(0.14, 0.36, 0.24);
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
    const mote = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 10), moteMaterial);
    mote.userData.orbitOffset = i * Math.PI;
    group.add(mote);
    return mote;
  });

  // Soft contact shadow instead of a hover disc — grounded, not floating.
  const contactShadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.32, 20),
    new THREE.MeshBasicMaterial({ color: 0x061414, transparent: true, opacity: 0.35 }),
  );
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.005;
  group.add(contactShadow);

  // Aura: a very soft translucent shell carrying the resident's accent glow.
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(0.62, 16, 12),
    new THREE.MeshStandardMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.07,
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
  const bob = Math.sin(elapsed * 1.4 + lumin.userData.seed) * 0.025;
  head.position.y = 0.92 + bob;
  body.position.y = 0.34 + bob * 0.4;

  for (const mote of motes) {
    const angle = elapsed * 0.9 + mote.userData.orbitOffset;
    mote.position.set(Math.cos(angle) * 0.46, 0.7 + Math.sin(angle * 1.7) * 0.08, Math.sin(angle) * 0.46);
  }

  const gesture = phase === WORK_PHASE ? Math.sin(elapsed * 4) * 0.22 : Math.sin(elapsed * 0.8) * 0.04;
  armLeft.rotation.x = gesture;
  armRight.rotation.x = -gesture;
}

export const LuminPhase = { REST: REST_PHASE, WORK: WORK_PHASE };
