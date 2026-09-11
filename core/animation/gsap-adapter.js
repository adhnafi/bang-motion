import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/index.js';

export class AnimationAdapter {
  to(target, vars) {
    return gsap.to(target, vars);
  }

  set(target, vars) {
    return gsap.set(target, vars);
  }
}
