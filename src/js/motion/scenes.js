/**
 * The three 3D scenes: hero intro + stage, the pinned lead story, and the
 * Business Brain orbit. Each is a no-op when its markup isn't on the page.
 */

/** Hero copy and visual arrive together; the headline is handled by splitHeadings. */
export function heroIntro({ gsap }) {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  const tl = gsap.timeline({ delay: 0.1 });
  tl.from(hero.querySelectorAll('[data-intro]'), { autoAlpha: 0, y: 26, stagger: 0.09, duration: 0.8 }, 0.25);
  const visual = hero.querySelector('[data-intro-visual]');
  if (visual) tl.from(visual, { autoAlpha: 0, y: 60, rotationX: 18, transformPerspective: 1400, duration: 1.3, ease: 'expo.out' }, 0.2);

  // Light field drifts slowly — decorative layer only.
  hero.querySelectorAll('.orb').forEach((orb, i) => {
    gsap.to(orb, { x: i % 2 ? -40 : 50, y: i % 2 ? 30 : -35, duration: 9 + i * 2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  });
}

/**
 * Product stage: layers enter at their depth, follow the pointer a few
 * degrees, then flatten toward the viewer as the hero scrolls away — the
 * "product turns to face you" move used on Apple product pages.
 */
export function heroStage({ gsap, desktop, fine }) {
  const stage = document.querySelector('[data-stage]');
  if (!stage || !desktop) return;
  const scene = stage.querySelector('[data-stage-scene]');
  const chips = stage.querySelectorAll('.stage__chip');

  gsap.from(chips, { autoAlpha: 0, scale: 0.6, z: 0, stagger: 0.15, duration: 0.9, ease: 'back.out(1.7)', delay: 0.9 });
  chips.forEach((chip, i) => gsap.to(chip, { y: i % 2 ? 8 : -8, duration: 2.6 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 }));

  // Scroll: the scene turns to face the viewer and lifts. Uses the wrapper so
  // it never fights the pointer tilt applied to the scene itself.
  gsap.to(stage, {
    rotationX: -6,
    rotationY: 12,
    scale: 1.06,
    y: -40,
    transformPerspective: 1600,
    ease: 'none',
    scrollTrigger: { trigger: stage, start: 'top 20%', end: 'bottom top', scrub: 1 },
  });

  if (!fine) return;
  const rx = gsap.quickTo(scene, 'rotationX', { duration: 0.8, ease: 'power3.out' });
  const ry = gsap.quickTo(scene, 'rotationY', { duration: 0.8, ease: 'power3.out' });
  gsap.set(scene, { rotationX: 9, rotationY: -15, rotationZ: 1 });
  const hero = stage.closest('[data-hero]');
  const onMove = (e) => {
    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry(-15 + px * 14);
    rx(9 - py * 10);
  };
  const onLeave = () => {
    rx(9);
    ry(-15);
  };
  hero.addEventListener('pointermove', onMove);
  hero.addEventListener('pointerleave', onLeave);
  return () => {
    hero.removeEventListener('pointermove', onMove);
    hero.removeEventListener('pointerleave', onLeave);
  };
}

/**
 * Pinned story (desktop only — pinning on phones fights native scrolling).
 * Scroll position picks the active step; the device shows every message up
 * to that step and turns slightly as the story progresses.
 */
export function story({ gsap, ScrollTrigger, desktop }) {
  const root = document.querySelector('[data-story]');
  if (!root || !desktop) return;
  const steps = [...root.querySelectorAll('[data-story-step]')];
  const msgs = [...root.querySelectorAll('[data-story-msg]')];
  const device = root.querySelector('[data-story-device]');
  // Pin the story block, not its section: the heading scrolls away first so
  // the pinned part always fits under the sticky header.
  const top = () => `top ${document.querySelector('[data-header]')?.offsetHeight + 24 || 90}px`;
  let current = -1;

  const activate = (index) => {
    if (index === current) return;
    current = index;
    steps.forEach((s, i) => {
      s.classList.toggle('is-active', i === index);
      if (i === index) s.setAttribute('aria-current', 'step');
      else s.removeAttribute('aria-current');
    });
    msgs.forEach((m) => m.classList.toggle('is-shown', Number(m.dataset.storyMsg) <= index));
  };

  root.classList.add('is-live');
  activate(0);

  const st = ScrollTrigger.create({
    trigger: root,
    start: top,
    end: () => `+=${steps.length * 55}%`,
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => activate(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
  });

  gsap.fromTo(device, { rotationY: -16, rotationX: 8 }, { rotationY: 10, rotationX: -2, ease: 'none', scrollTrigger: { trigger: root, start: top, end: () => st.end, scrub: 1 } });

  return () => {
    root.classList.remove('is-live');
    steps.forEach((s) => s.removeAttribute('aria-current'));
    msgs.forEach((m) => m.classList.remove('is-shown'));
  };
}

/** Rings spin only while visible, and slow down while hovered so labels can be read. */
export function orbits({ gsap, ScrollTrigger }) {
  document.querySelectorAll('[data-orbit]').forEach((orbit) => {
    const spin = gsap.to(orbit, { '--spin': '360deg', duration: 48, ease: 'none', repeat: -1, paused: true });
    gsap.from(orbit.querySelectorAll('.orbit__node'), {
      autoAlpha: 0,
      scale: 0.4,
      stagger: 0.07,
      duration: 0.8,
      ease: 'back.out(1.6)',
      scrollTrigger: { trigger: orbit, start: 'top 80%' },
    });
    gsap.fromTo(orbit, { '--tilt': '74deg' }, { '--tilt': '56deg', ease: 'none', scrollTrigger: { trigger: orbit, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    ScrollTrigger.create({ trigger: orbit, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? spin.play() : spin.pause()) });
    orbit.addEventListener('pointerenter', () => gsap.to(spin, { timeScale: 0.2, duration: 0.6 }));
    orbit.addEventListener('pointerleave', () => gsap.to(spin, { timeScale: 1, duration: 0.6 }));
  });
}
