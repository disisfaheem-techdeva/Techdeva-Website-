/**
 * Header behaviour.
 *
 * Desktop menus open on click (and on hover for fine pointers, with a short
 * close delay so the pointer can travel into the panel). Escape closes and
 * returns focus to the trigger; clicking outside closes. Only one menu is
 * open at a time. This mirrors the reference behaviour observed on zoho.com.
 *
 * Mobile uses a full-screen dialog drawer with a focus trap and scroll lock.
 */
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, summary, [tabindex]:not([tabindex="-1"])';

export function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  initStickyShadow(header);
  initMenus(header);
  initDrawer();
}

function initStickyShadow(header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 4);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initMenus(header) {
  const items = [...header.querySelectorAll('[data-menu]')];
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
  let openItem = null;
  let closeTimer = 0;
  // A pointer that hovers in and then clicks would otherwise open the menu on
  // mouseenter and immediately close it on click. Clicks shortly after a
  // hover-open keep it open instead of toggling.
  let hoverOpenedAt = 0;

  const parts = (item) => ({ trigger: item.querySelector('.nav-trigger'), panel: item.querySelector('[data-menu-panel]') });

  const close = (item, { focus = false } = {}) => {
    if (!item) return;
    const { trigger, panel } = parts(item);
    trigger.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    if (openItem === item) openItem = null;
    header.classList.toggle('has-open-menu', !!openItem);
    if (focus) trigger.focus();
  };

  const open = (item) => {
    if (openItem && openItem !== item) close(openItem);
    const { trigger, panel } = parts(item);
    trigger.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    openItem = item;
    header.classList.add('has-open-menu');
  };

  items.forEach((item) => {
    const { trigger, panel } = parts(item);

    trigger.addEventListener('click', () => {
      if (openItem === item && Date.now() - hoverOpenedAt > 600) close(item);
      else open(item);
    });

    item.addEventListener('mouseenter', () => {
      if (!hoverCapable.matches) return;
      clearTimeout(closeTimer);
      if (openItem !== item) hoverOpenedAt = Date.now();
      open(item);
    });
    item.addEventListener('mouseleave', () => {
      if (!hoverCapable.matches) return;
      closeTimer = setTimeout(() => close(item), 180);
    });

    // ArrowDown from the trigger moves into the panel.
    trigger.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowDown') return;
      e.preventDefault();
      open(item);
      panel.querySelector(FOCUSABLE)?.focus();
    });

    // Leaving the panel with Tab closes it.
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget)) close(item);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openItem) close(openItem, { focus: true });
  });
  document.addEventListener('click', (e) => {
    if (openItem && !openItem.contains(e.target)) close(openItem);
  });
  // A menu left open at desktop width must not survive into the mobile layout.
  window.matchMedia('(max-width: 1023px)').addEventListener('change', () => openItem && close(openItem));
}

function initDrawer() {
  const drawer = document.querySelector('[data-drawer]');
  if (!drawer) return;
  const openers = [...document.querySelectorAll('[data-drawer-open]')];
  const closer = drawer.querySelector('[data-drawer-close]');
  let returnFocus = null;

  const setExpanded = (v) => openers.forEach((b) => b.setAttribute('aria-expanded', String(v)));

  const open = (e) => {
    returnFocus = e?.currentTarget || document.activeElement;
    drawer.hidden = false;
    document.body.classList.add('is-locked');
    setExpanded(true);
    closer.focus();
  };

  const close = () => {
    drawer.hidden = true;
    document.body.classList.remove('is-locked');
    setExpanded(false);
    returnFocus?.focus();
  };

  openers.forEach((b) => b.addEventListener('click', open));
  closer.addEventListener('click', close);

  drawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = [...drawer.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Following an in-page link from the drawer should close it.
  drawer.addEventListener('click', (e) => {
    if (e.target.closest('a[href]')) close();
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (m) => m.matches && !drawer.hidden && close());
}
