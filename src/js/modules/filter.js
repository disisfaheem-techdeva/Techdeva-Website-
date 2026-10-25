/** Resource library type filter (toggle-button chips). */
export function initFilters() {
  document.querySelectorAll('[data-filter-root]').forEach((root) => {
    const chips = [...root.querySelectorAll('[data-filter]')];
    const items = [...root.querySelectorAll('[data-type]')];
    const empty = root.querySelector('[data-filter-empty]');

    chips.forEach((chip) =>
      chip.addEventListener('click', () => {
        const type = chip.dataset.filter;
        chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        let shown = 0;
        items.forEach((item) => {
          const match = type === 'all' || item.dataset.type === type;
          item.hidden = !match;
          if (match) shown += 1;
        });
        if (empty) empty.hidden = shown > 0;
      }),
    );
  });
}
