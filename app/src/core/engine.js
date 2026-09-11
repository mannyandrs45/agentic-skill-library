import * as THREE from "three";
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

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0e1420);
    this.scene.fog = new THREE.Fog(0x0e1420, 14, 34);

    this.camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    this.camera.position.set(6, 7, 9);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);

    this._addLights();
    this._bindEvents();

    onReducedMotionChange((reduced) => {
      this.reducedMotion = reduced;
      this.renderOnce();
    });
  }

  _addLights() {
    const hemi = new THREE.HemisphereLight(0x9ecbff, 0x1a1208, 0.85);
    this.scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xffe9c7, 1.1);
    sun.position.set(6, 10, 4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;
    this.scene.add(sun);
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

    this._raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2();
    this._onClick = (event) => {
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
    this.renderer.domElement.addEventListener("click", this._onClick);
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

      for (const callback of this.updateCallbacks) callback(delta, elapsed);
      this.renderOnce();
    };
    this.renderOnce();
    tick();
  }

  dispose() {
    window.removeEventListener("resize", this._resize);
    this.renderer.domElement.removeEventListener("click", this._onClick);
    this.renderer.dispose();
  }
}
