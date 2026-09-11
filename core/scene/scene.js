export class Scene {
  constructor({ viewport, nodes = [], camera } = {}) {
    this.viewport = viewport;
    this.nodes = new Map(nodes.map(node => [node.id, node]));
    this.camera = camera;
  }

  add(node) {
    this.nodes.set(node.id, node);
    return node;
  }

  get(id) {
    return this.nodes.get(id);
  }

  snapshot() {
    return {
      nodes: [...this.nodes.values()].map(node => node.snapshot()),
      camera: this.camera?.snapshot?.() ?? null,
    };
  }
}
