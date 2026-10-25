/** Back-to-top button and the sticky in-page section nav's active state. */
export function initToTop() {
  const btn = document.querySelector('[data-to-top]');
  if (!btn) return;
  const onScroll = () => {
    btn.hidden = window.scrollY < window.innerHeight * 1.2;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  // innerHeight can be 0 if the page loads in a hidden tab; re-check on resize.
  window.addEventListener('resize', onScroll, { passive: true });
  btn.addEventListener('click', () => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    document.getElementById('main')?.focus({ preventScroll: true });
  });
}

export function initSubnav() {
  const links = [...document.querySelectorAll('.subnav__link')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(links.map((l) => [l.getAttribute('href').slice(1), l]));
  const targets = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => {
          const on = l === byId.get(e.target.id);
          l.classList.toggle('is-active', on);
          if (on) l.setAttribute('aria-current', 'true');
          else l.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  targets.forEach((t) => io.observe(t));
}
