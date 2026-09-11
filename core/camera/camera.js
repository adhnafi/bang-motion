export class Camera {
  constructor({ x = 0, y = 0, z = 0, zoom = 1 } = {}) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.zoom = zoom;
  }

  snapshot() {
    return { x: this.x, y: this.y, z: this.z, zoom: this.zoom };
  }
}
