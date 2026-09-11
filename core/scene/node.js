export class Node {
  constructor({ id, x = 0, y = 0, z = 0, opacity = 1, appearance = {} } = {}) {
    if (!id) throw new Error('Node requires an id');
    this.id = id;
    this.transform = { x, y, z, scaleX: 1, scaleY: 1, rotation: 0 };
    this.opacity = opacity;
    this.appearance = { ...appearance };
  }

  snapshot() {
    return JSON.parse(JSON.stringify({
      id: this.id,
      transform: this.transform,
      opacity: this.opacity,
      appearance: this.appearance,
    }));
  }
}
