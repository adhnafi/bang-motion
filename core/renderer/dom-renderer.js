export class DOMRenderer {
  constructor(root) {
    if (!root) throw new Error('DOMRenderer requires a root element');
    this.root = root;
    this.elements = new Map();
  }

  mount(scene) {
    this.root.style.width = `${scene.viewport.width}px`;
    this.root.style.height = `${scene.viewport.height}px`;

    for (const node of scene.nodes.values()) {
      let el = this.root.querySelector(`[data-motionav-id="${node.id}"]`);
      if (!el) {
        el = document.createElement('div');
        el.dataset.motionavId = node.id;
        el.style.position = 'absolute';
        this.root.appendChild(el);
      }
      this.elements.set(node.id, el);
    }
  }

  render(scene) {
    const camera = scene.camera ?? { x: 0, y: 0, zoom: 1 };
    for (const node of scene.nodes.values()) {
      const el = this.elements.get(node.id);
      if (!el) continue;
      const t = node.transform;
      const a = node.appearance ?? {};
      const x = (t.x - camera.x) * camera.zoom;
      const y = (t.y - camera.y) * camera.zoom;
      if (a.width != null) el.style.width = `${a.width}px`;
      if (a.height != null) el.style.height = `${a.height}px`;
      if (a.radius != null) el.style.borderRadius = `${a.radius}px`;
      if (a.background != null) el.style.background = a.background;
      if (a.border != null) el.style.border = a.border;
      if (a.shadow != null) el.style.boxShadow = a.shadow;
      if (a.textColor != null) el.style.color = a.textColor;
      el.style.transform = `translate(${x}px, ${y}px) scale(${t.scaleX * camera.zoom}, ${t.scaleY * camera.zoom}) rotate(${t.rotation}deg)`;
      el.style.opacity = node.opacity;
    }
  }
}
