import * as THREE from "three";
import { residentRng, hashSeed } from "../core/rng.js";
import { createLumin, animateLumin, LuminPhase } from "./lumin.js";
import { buildSchedule, sampleSchedule, BehaviorState } from "./behavior.js";

// Domain -> accent color. Every domain in registry/catalog.json gets a
// distinct glow; unrecognized/future domains fall back gracefully.
const DOMAIN_COLORS = {
  design: 0xffb347,
  engineering: 0x8fd3ff,
  media: 0xff8fd0,
  writing: 0xa7ff8f,
  marketing: 0xffe08f,
  "quality-and-release": 0x8fffe0,
  "research-and-browser": 0x8fa7ff,
  "strategy-and-product": 0xd08fff,
  orchestration: 0xcfcfcf,
  travel: 0x8fffc2,
  sports: 0xff8f8f,
};

// Catalog-behavior labels only — never implies live execution.
export const STATE_LABELS = {
  [BehaviorState.WANDER]: "Wandering the garden",
  [BehaviorState.TRAVEL]: "Heading to its station",
  [BehaviorState.WORK]: "At work",
  [BehaviorState.REST]: "Resting",
};

export function domainAccentColor(domain) {
  return DOMAIN_COLORS[domain] ?? 0xd9c9ff;
}

export class Resident {
  constructor(data, { worldSeed, restPosition, wanderRadius, workAnchor }) {
    this.data = data;
    this.rng = residentRng(worldSeed, data.id);
    this.selected = false;

    const accentColor = domainAccentColor(data.domain);
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
