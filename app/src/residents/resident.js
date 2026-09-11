import * as THREE from "three";
import { residentRng, hashSeed } from "../core/rng.js";
import { createLumin, animateLumin, LuminPhase } from "./lumin.js";
import { buildSchedule, sampleSchedule, BehaviorState } from "./behavior.js";

// Catalog-behavior labels only — never implies live execution.
export const STATE_LABELS = {
  [BehaviorState.WANDER]: "Wandering the garden",
  [BehaviorState.TRAVEL]: "Heading to its station",
  [BehaviorState.WORK]: "At work",
  [BehaviorState.REST]: "Resting",
};

// Each resident gets its own glow — deterministically derived from its id
// (not the domain), so every Lumin reads as visually distinct even when two
// residents share a domain.
export function residentAccentColor(id) {
  const hue = hashSeed(id) % 360;
  const color = new THREE.Color();
  color.setHSL(hue / 360, 0.62, 0.64);
  return color.getHex();
}

export class Resident {
  constructor(data, { worldSeed, restPosition, wanderRadius, workAnchor }) {
    this.data = data;
    this.rng = residentRng(worldSeed, data.id);
    this.selected = false;

    const accentColor = residentAccentColor(data.id);
    this.accentColor = accentColor;
    this.mesh = createLumin({ accentColor, seed: hashSeed(data.id) % 1000 });
    this.mesh.userData.residentId = data.id;
    this.mesh.position.copy(restPosition);

    this.schedule = buildSchedule(this.rng, { restPosition, wanderRadius, workAnchor });
    this._lastPosition = restPosition.clone();
    this.currentState = BehaviorState.REST;
  }

  setSelected(selected) {
    this.selected = selected;
    const targetScale = selected ? 1.12 : 1;
    this.mesh.scale.setScalar(targetScale);
  }

  update(elapsed) {
    const sample = sampleSchedule(this.schedule, elapsed);
    this.currentState = sample.state;

    const delta = sample.position.clone().sub(this._lastPosition);
    if (delta.lengthSq() > 1e-6) {
      this.mesh.rotation.y = Math.atan2(delta.x, delta.z);
    }
    this._lastPosition = sample.position.clone();
    this.mesh.position.set(sample.position.x, 0, sample.position.z);

    const phase = sample.state === BehaviorState.WORK ? LuminPhase.WORK : LuminPhase.REST;
    animateLumin(this.mesh, elapsed, phase);
  }

  get stateLabel() {
    return STATE_LABELS[this.currentState] ?? "Idle";
  }
}
