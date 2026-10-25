/**
 * PKR / USD switch. Both prices are already in the HTML (from data/pricing.js);
 * this only swaps which one is visible, so the page is correct without JS.
 * The choice is remembered per visitor as a convenience.
 */
const KEY = 'td-currency';

export function initCurrency() {
  const toggles = document.querySelectorAll('[data-currency-toggle]');
  if (!toggles.length) return;

  const apply = (currency) => {
    document.querySelectorAll('[data-currency]').forEach((el) => {
      el.hidden = el.dataset.currency !== currency;
    });
    document.querySelectorAll('[data-currency-toggle] input').forEach((input) => {
      input.checked = input.value === currency;
    });
    try {
      localStorage.setItem(KEY, currency);
    } catch {
      /* storage unavailable (private mode) — the toggle still works */
    }
  };

  toggles.forEach((t) => t.addEventListener('change', (e) => e.target.name === 'currency' && apply(e.target.value)));

  let saved = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {
    saved = null;
  }
  if (saved === 'PKR' || saved === 'USD') apply(saved);
}
