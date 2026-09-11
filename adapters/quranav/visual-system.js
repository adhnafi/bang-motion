export const quranavVisualSystem = {
  id: 'quranav-prototype',
  tokens: {
    canvas: '#F4F0E7',
    ink: '#17221C',
    accent: '#8A6A3B',
    muted: '#6D756F',
    surface: '#E5DED1',
  },
  text: {
    title: { color: '#17221C', weight: 700 },
    body: { color: '#6D756F', weight: 500 },
  },
  shapes: {
    radius: 28,
  },
};

export function appearance(role, overrides = {}) {
  const t = quranavVisualSystem.tokens;
  const base = {
    width: 120,
    height: 120,
    radius: quranavVisualSystem.shapes.radius,
    background: t.surface,
  };

  if (role === 'accent') base.background = t.accent;
  if (role === 'ink') base.background = t.ink;
  if (role === 'paper') base.background = t.canvas;

  return { ...base, ...overrides };
}

export const quranavMotion = {
  enter: (t) => Math.min(1, t / 0.7),
  drift: (t, amplitude = 10) => Math.sin(t * Math.PI * 0.8) * amplitude,
  emphasis: (t) => 1 + 0.04 * Math.sin(t * Math.PI),
};
