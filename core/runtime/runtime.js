export class MotionavRuntime {
  constructor({ scene, clock, renderer, evaluate = () => {} } = {}) {
    this.scene = scene;
    this.clock = clock;
    this.renderer = renderer;
    this.evaluate = evaluate;
    this._raf = null;
    this._lastNow = null;
    this._frame = 0;
    this.renderer.mount(scene);
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
    this._scheduleFrame();
  }

  pause() {
    this.clock.pause();
    if (this._raf !== null) cancelAnimationFrame(this._raf);
    this._raf = null;
    this._lastNow = null;
  }

  _scheduleFrame() {
    if (!this.clock.playing || this._raf !== null) return;
    this._raf = requestAnimationFrame((now) => {
      this._raf = null;
      this._tick(now);
    });
  }

  _tick(now = performance.now()) {
    if (!this.clock.playing) return;
    const delta = this._lastNow === null ? 0 : Math.max(0, (now - this._lastNow) / 1000);
    this._lastNow = now;
    const t = this.clock.advance(delta);
    this.evaluate(this.scene, t);
    this.renderer.render(this.scene);
    this._frame += 1;
    this._scheduleFrame();
  }

  snapshot() {
    return this.scene.snapshot();
  }

  get frame() {
    return this._frame;
  }
}
