/**
 * Site-wide effects: headings, reveals, card tilt, counters, parallax,
 * progress bar, magnetic CTA and the price flip. All transform/opacity only.
 */

export function progressBar({ gsap }) {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
  return () => bar.remove();
}

/**
 * Headings rise line by line from behind a mask. autoSplit re-splits on
 * resize/font load so line breaks stay correct; SplitText keeps an
 * aria-label with the original text for screen readers.
 */
export function splitHeadings({ gsap, SplitText }) {
  const splits = [];
  document.querySelectorAll('[data-split]').forEach((el) => {
    const isHero = el.dataset.split === 'hero';
    splits.push(
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            rotationX: isHero ? -35 : -20,
            transformOrigin: '50% 100%',
            transformPerspective: 800,
            stagger: 0.1,
            duration: isHero ? 1.15 : 0.9,
            ease: 'expo.out',
            delay: isHero ? 0.15 : 0,
            scrollTrigger: isHero ? undefined : { trigger: el, start: 'top 88%' },
          }),
      }),
    );
  });
  return () => splits.forEach((s) => s.revert());
}

/** Cards flip up into place in batches as they enter — a 3D take on fade-up. */
export function reveals({ gsap, ScrollTrigger }) {
  const items = gsap.utils.toArray('.reveal:not(.section__head)');
  gsap.set(items, { autoAlpha: 0, y: 46, rotationX: -22, transformOrigin: '50% 0%', transformPerspective: 1000 });
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, rotationX: 0, stagger: 0.08, duration: 0.85, overwrite: true }),
  });
  // Anything already above the fold on load (e.g. after a refresh mid-page).
  ScrollTrigger.refresh();
  return () => gsap.set(items, { clearProps: 'all' });
}

/** Pointer-driven 3D tilt with a moving highlight. Fine pointers only. */
export function tilt({ gsap }) {
  const cards = document.querySelectorAll('.feature-card, .industry-card, .integration-card, .plan, .resource-card, .limits__item, .detail-card, .mini-card, .terms__item');
  const cleanups = [];
  cards.forEach((card) => {
    card.setAttribute('data-tilt', '');
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5 });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5 });
    gsap.set(card, { transformPerspective: 900 });
    const move = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 9);
      rx((0.5 - py) * 9);
      card.style.setProperty('--gx', `${px * 100}%`);
      card.style.setProperty('--gy', `${py * 100}%`);
      card.style.setProperty('--glare', '1');
    };
    const leave = () => {
      rx(0);
      ry(0);
      card.style.setProperty('--glare', '0');
    };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
      card.removeAttribute('data-tilt');
      gsap.set(card, { clearProps: 'transform' });
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/**
 * Proof figures count up to their real value. The final text is in the HTML
 * already; screen readers get it from a hidden copy while the visible digits
 * run, so nobody hears intermediate numbers.
 */
export function counters({ gsap }) {
  const restore = [];
  document.querySelectorAll('.stats__item dd').forEach((dd) => {
    const original = dd.textContent;
    const m = original.match(/^(\D*?)([\d,]+)(\D*)$/);
    if (!m) return;
    const [, prefix, num, suffix] = m;
    const target = Number(num.replace(/,/g, ''));
    dd.innerHTML = '';
    const sr = Object.assign(document.createElement('span'), { className: 'visually-hidden', textContent: original });
    const vis = document.createElement('span');
    vis.setAttribute('aria-hidden', 'true');
    vis.textContent = `${prefix}0${suffix}`;
    dd.append(sr, vis);
    const state = { v: 0 };
    gsap.to(state, {
      v: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: dd, start: 'top 90%', once: true },
      onUpdate: () => (vis.textContent = `${prefix}${Math.round(state.v).toLocaleString('en-US')}${suffix}`),
      onComplete: () => (vis.textContent = `${prefix}${num}${suffix}`),
    });
    restore.push(() => (dd.textContent = original));
  });
  return () => restore.forEach((fn) => fn());
}

/** Product visuals beside copy turn toward the reader as they scroll past. Decorative only. */
export function parallaxVisuals({ gsap, desktop }) {
  if (!desktop) return;
  document.querySelectorAll('.row').forEach((row) => {
    const visual = row.querySelector('.row__visual');
    if (!visual) return;
    const dir = row.classList.contains('row--flip') ? -1 : 1;
    gsap.fromTo(
      visual,
      { rotationY: 22 * dir, rotationX: 6, y: 50, transformPerspective: 1300 },
      { rotationY: -6 * dir, rotationX: -2, y: -30, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1 } },
    );
  });
}

/** One magnetic element per hero (the primary CTA), clamped so it never leaves its hit box. */
export function magnetic({ gsap }) {
  const el = document.querySelector('[data-magnetic]');
  if (!el) return;
  const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.45)' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.45)' });
  const move = (e) => {
    const r = el.getBoundingClientRect();
    xTo((e.clientX - r.left - r.width / 2) * 0.25);
    yTo((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const leave = () => {
    xTo(0);
    yTo(0);
  };
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);
  return () => {
    el.removeEventListener('pointermove', move);
    el.removeEventListener('pointerleave', leave);
    gsap.set(el, { clearProps: 'transform' });
  };
}

/** Prices flip over in 3D when the currency changes (js/modules/pricing.js swaps the text). */
export function priceFlip({ gsap }) {
  const toggles = document.querySelectorAll('[data-currency-toggle]');
  if (!toggles.length) return;
  const onChange = () =>
    gsap.fromTo('.plan__amount:not([hidden])', { rotationX: -90, autoAlpha: 0, transformPerspective: 600 }, { rotationX: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06, ease: 'back.out(1.4)' });
  toggles.forEach((t) => t.addEventListener('change', onChange));
  return () => toggles.forEach((t) => t.removeEventListener('change', onChange));
}
