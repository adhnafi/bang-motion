export class MotionavRuntime {
  constructor({ scene, clock, renderer, evaluate = () => {} } = {}) {
    this.scene = scene;
    this.clock = clock;
    this.renderer = renderer;
    this.evaluate = evaluate;
    this.renderer.mount(scene);
  }

  seek(time) {
    const t = this.clock.seek(time);
    this.evaluate(this.scene, t);
    this.renderer.render(this.scene);
    return t;
  }

  play() { this.clock.play(); }
  pause() { this.clock.pause(); }

  snapshot() {
    return this.scene.snapshot();
  }
}
