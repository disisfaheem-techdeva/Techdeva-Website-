/**
 * WAI-ARIA tabs with automatic activation. Used by the mega-menu category
 * rail (vertical) and by in-page tab sets (horizontal). Arrow keys move
 * between tabs, Home/End jump to the ends.
 */
export function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((list) => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const vertical = list.getAttribute('aria-orientation') === 'vertical';
    const next = vertical ? 'ArrowDown' : 'ArrowRight';
    const prev = vertical ? 'ArrowUp' : 'ArrowLeft';

    const select = (tab, { focus = true } = {}) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      // In the mega menu, pointing at a category previews it (as on zoho.com).
      if (vertical) tab.addEventListener('mouseenter', () => window.matchMedia('(hover: hover)').matches && select(tab, { focus: false }));
      tab.addEventListener('keydown', (e) => {
        let target = null;
        if (e.key === next) target = tabs[(i + 1) % tabs.length];
        else if (e.key === prev) target = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') target = tabs[0];
        else if (e.key === 'End') target = tabs[tabs.length - 1];
        if (target) {
          e.preventDefault();
          select(target);
        }
      });
    });
  });
}
