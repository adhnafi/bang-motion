export class TimelineClock {
  constructor({ duration = 0 } = {}) {
    this.duration = Math.max(0, duration);
    this.time = 0;
    this.playing = false;
  }

  seek(time) {
    this.time = Math.min(this.duration, Math.max(0, Number(time) || 0));
    return this.time;
  }

  advance(deltaSeconds) {
    if (!this.playing) return this.time;
    this.time += Math.max(0, Number(deltaSeconds) || 0);
    if (this.time > this.duration) this.time = 0;
    return this.time;
  }

  play() { this.playing = true; }
  pause() { this.playing = false; }
}
