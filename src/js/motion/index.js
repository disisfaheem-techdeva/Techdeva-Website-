/**
 * Motion entry point.
 *
 * GSAP is loaded with a dynamic import only when the visitor allows motion,
 * so people with "reduce motion" switched on never download it and see the
 * finished static page. Everything is registered inside gsap.matchMedia so
 * flipping the OS setting mid-visit reverts every tween and ScrollTrigger.
 */
const REDUCE = '(prefers-reduced-motion: reduce)';

export async function initMotion() {
  const root = document.documentElement;
  const done = () => root.classList.remove('motion-pending');

  if (window.matchMedia(REDUCE).matches) return done();

  let mods;
  try {
    mods = await Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/SplitText'), import('./scenes.js'), import('./effects.js')]);
  } catch {
    // Network or chunk failure: show the static page rather than nothing.
    return done();
  }
  const [{ gsap }, { ScrollTrigger }, { SplitText }, scenes, effects] = mods;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });

  const mm = gsap.matchMedia();
  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 1024px)',
      fine: '(hover: hover) and (pointer: fine)',
    },
    (ctx) => {
      const { motion, desktop, fine } = ctx.conditions;
      if (!motion) return;
      const env = { gsap, ScrollTrigger, SplitText, desktop, fine };

      // gsap.matchMedia reverts tweens and triggers by itself; the functions
      // returned here undo what it can't see (listeners, DOM, classes).
      const cleanups = [
        effects.progressBar(env),
        effects.splitHeadings(env),
        scenes.heroIntro(env),
        scenes.heroStage(env),
        scenes.story(env),
        scenes.orbits(env),
        effects.reveals(env),
        effects.counters(env),
        effects.parallaxVisuals(env),
        fine && effects.tilt(env),
        fine && effects.magnetic(env),
        effects.priceFlip(env),
      ];
      return () => cleanups.forEach((fn) => typeof fn === 'function' && fn());
    },
  );

  done();
  // Fonts change line breaks and section heights; recompute pin positions once they settle.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
