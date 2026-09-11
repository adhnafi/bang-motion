export class MotionavRuntime {
  constructor({ scene, clock, renderer, evaluate = () => {} } = {}) {
    this.scene = scene;
    this.clock = clock;
    this.renderer = renderer;
    this.evaluate = evaluate;
    this.renderer.mount(scene);
    this._raf = null;
    this._lastNow = null;
  }

  seek(time) {
    const t = this.clock.seek(time);
    this.evaluate(this.scene, t);
    this.renderer.render(this.scene);
    return t;
  }

  play() {
    if (this.clock.playing) return;
    this.clock.play();
    this._lastNow = performance.now();
    this._tick();
  }

  pause() {
    this.clock.pause();
    if (this._raf !== null) cancelAnimationFrame(this._raf);
    this._raf = null;
    this._lastNow = null;
  }

  _tick() {
    if (!this.clock.playing) return;
    const now = performance.now();
    const delta = this._lastNow === null ? 0 : (now - this._lastNow) / 1000;
    this._lastNow = now;
    const t = this.clock.advance(delta);
    this.evaluate(this.scene, t);
    this.renderer.render(this.scene);
    this._raf = requestAnimationFrame(() => this._tick());
  }

  snapshot() {
    return this.scene.snapshot();
  }
}
