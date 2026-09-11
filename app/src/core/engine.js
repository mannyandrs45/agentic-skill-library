import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { prefersReducedMotion, onReducedMotionChange } from "./reducedMotion.js";

/**
 * Original, minimal scene/camera/renderer/loop bootstrap. Structurally in the
 * same spot Bot Crossing keeps its engine (core/), but written fresh — no
 * code copied, no third-party art loaded.
 */
export class Engine {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.updateCallbacks = [];
    this.selectable = [];
    this.onSelect = null;
    this.reducedMotion = prefersReducedMotion();

    // Moody dusk-on-water palette: cool teal fog/ambient with a warm rim
    // light, and a reflective floor (see world/garden.js) — not the flat
    // green-lawn look Phase 1 shipped with.
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b2323);
    this.scene.fog = new THREE.Fog(0x0b2323, 16, 40);

    this.camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    this.camera.position.set(8, 8, 12);
    this.camera.lookAt(0, 0.6, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);

    // No inertial damping: a drag/zoom responds and stops immediately, so
    // orbiting never becomes its own bit of continuous animation to manage
    // under prefers-reduced-motion. A 'change' listener re-renders on
    // demand, so orbiting still works even while the main loop is paused.
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 26;
    this.controls.maxPolarAngle = Math.PI / 2.05;
    this.controls.target.set(0, 0.6, 0);
    this.controls.addEventListener("change", () => this.renderOnce());
    this.controls.update();

    this._addLights();
    this._bindEvents();

    onReducedMotionChange((reduced) => {
      this.reducedMotion = reduced;
      this.renderOnce();
    });
  }

  _addLights() {
    // Cool teal sky / dark teal-stone ground ambient...
    const hemi = new THREE.HemisphereLight(0x6fd3c7, 0x0a1f1f, 0.75);
    this.scene.add(hemi);

    // ...against one warm, low, slightly golden rim light. The warm/cool
    // split is what gives a matte character a lit edge against a teal scene
    // instead of looking flat.
    const sun = new THREE.DirectionalLight(0xffcf8f, 1.35);
    sun.position.set(7, 6, -5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -11;
    sun.shadow.camera.right = 11;
    sun.shadow.camera.top = 11;
    sun.shadow.camera.bottom = -11;
    this.scene.add(sun);

    // A faint cool fill from the front-camera side so the shadowed side of
    // residents still reads as teal, not pure black.
    const fill = new THREE.DirectionalLight(0x2c5f5f, 0.4);
    fill.position.set(-6, 3, 8);
    this.scene.add(fill);
  }

  _bindEvents() {
    this._resize = () => {
      const { clientWidth, clientHeight } = this.container;
      this.camera.aspect = clientWidth / clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(clientWidth, clientHeight);
      if (this.reducedMotion) this.renderOnce();
    };
    window.addEventListener("resize", this._resize);

    // Distinguish a click (select) from an orbit-drag (look around) by how
    // far the pointer moved between down and up — OrbitControls doesn't
    // suppress the click event on its own.
    this._raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2();
    this._pointerDown = null;
    this._onPointerDown = (event) => {
      this._pointerDown = { x: event.clientX, y: event.clientY };
    };
    this._onPointerUp = (event) => {
      if (!this._pointerDown) return;
      const dx = event.clientX - this._pointerDown.x;
      const dy = event.clientY - this._pointerDown.y;
      this._pointerDown = null;
      if (Math.hypot(dx, dy) > 6) return; // was a drag, not a click

      const rect = this.renderer.domElement.getBoundingClientRect();
      this._pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this._pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      this._raycaster.setFromCamera(this._pointer, this.camera);
      const hits = this._raycaster.intersectObjects(this.selectable, true);
      if (hits.length && this.onSelect) {
        let target = hits[0].object;
        while (target && !target.userData.residentId) target = target.parent;
        if (target) this.onSelect(target.userData.residentId);
      }
    };
    this.renderer.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.renderer.domElement.addEventListener("pointerup", this._onPointerUp);
  }

  /** Register a mesh (or group) as clickable; it must carry userData.residentId. */
  registerSelectable(object3D) {
    this.selectable.push(object3D);
  }

  /** Register a per-frame update callback: (deltaSeconds, elapsedSeconds) => void. */
  onUpdate(callback) {
    this.updateCallbacks.push(callback);
  }

  /** Public so selection/resize can force a single frame while animation is paused. */
  renderOnce() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    const tick = () => {
      requestAnimationFrame(tick);
      const delta = this.clock.getDelta();
      const elapsed = this.clock.getElapsedTime();

      // Respect prefers-reduced-motion: stop the continuous loop, but a
      // resize or selection still triggers a single re-render via renderOnce().
      if (this.reducedMotion) return;

      this.controls.update();
      for (const callback of this.updateCallbacks) callback(delta, elapsed);
      this.renderOnce();
    };
    this.renderOnce();
    tick();
  }

  dispose() {
    window.removeEventListener("resize", this._resize);
    this.renderer.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.renderer.domElement.removeEventListener("pointerup", this._onPointerUp);
    this.controls.dispose();
    this.renderer.dispose();
  }
}
