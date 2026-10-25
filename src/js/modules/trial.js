/**
 * Free-trial wizard → POST {VITE_API_BASE}/signup.
 *
 * Request body matches SignupIn in the platform (app/main.py). Responses:
 *   200  {tenant_id, login_created, ...}  → success panel (the only path to it)
 *   409  email already registered        → field error + sign-in link
 *   429  rate limited                     → status message
 *   422  pydantic validation errors       → mapped onto fields where possible
 *   other / network                       → status message, form stays editable
 *
 * With no API base configured the form still validates but refuses to submit
 * and says why, so a local build can never create a real tenant by accident.
 */
import { apiBase, site } from '../../config/site.js';
import { validateAll, wireLiveValidation, setStatus, setError, normaliseUrl } from './validate.js';

const FIELD_MAP = { business_name: 1, industry: 1, website_url: 1, contact_email: 3, contact_phone: 3, contact_name: 3, password: 3 };

export function initTrialForm() {
  const form = document.querySelector('[data-trial-form]');
  if (!form) return;
  wireLiveValidation(form);

  const steps = [...form.querySelectorAll('[data-step]')];
  const labels = [...form.querySelectorAll('[data-step-label]')];
  const btnPrev = form.querySelector('[data-prev]');
  const btnNext = form.querySelector('[data-next]');
  const btnSubmit = form.querySelector('[data-submit]');
  const status = form.querySelector('[data-form-status]');
  const success = document.querySelector('[data-trial-success]');
  let current = 1;

  if (!apiBase) document.querySelector('[data-api-missing]').hidden = false;

  /* ---- conditional "other industry" field */
  const industry = form.querySelector('#industry');
  const other = form.querySelector('#industry_other');
  const syncOther = () => {
    const show = industry.value === 'other';
    other.closest('.field').hidden = !show;
    other.required = show;
    if (!show) setError(other, '');
  };
  industry.addEventListener('change', syncOther);
  syncOther();

  /* ---- competitors (repeatable rows) */
  const comps = form.querySelector('[data-competitors]');
  let compCount = 0;
  const addCompetitor = () => {
    if (comps.children.length >= 5) return;
    compCount += 1;
    const row = document.createElement('div');
    row.className = 'competitor';
    row.innerHTML = `
      <input aria-label="Competitor ${compCount} name" placeholder="Competitor name" maxlength="120" data-comp="name">
      <input aria-label="Competitor ${compCount} website" placeholder="Their website" maxlength="2000" data-comp="website">
      <button class="icon-btn" type="button" aria-label="Remove competitor ${compCount}">✕</button>`;
    row.querySelector('button').addEventListener('click', () => {
      row.remove();
      form.querySelector('[data-add-competitor]').focus();
    });
    comps.appendChild(row);
  };
  form.querySelector('[data-add-competitor]').addEventListener('click', () => {
    addCompetitor();
    comps.lastElementChild?.querySelector('input')?.focus();
  });
  addCompetitor();

  /* ---- wizard */
  const show = (n, { focus = true } = {}) => {
    current = n;
    steps.forEach((s) => (s.hidden = Number(s.dataset.step) !== n));
    labels.forEach((l) => {
      const i = Number(l.dataset.stepLabel);
      l.classList.toggle('is-current', i === n);
      l.classList.toggle('is-done', i < n);
      if (i === n) l.setAttribute('aria-current', 'step');
      else l.removeAttribute('aria-current');
    });
    btnPrev.hidden = n === 1;
    btnNext.hidden = n === steps.length;
    btnSubmit.hidden = n !== steps.length;
    setStatus(status, '', '');
    if (focus) steps[n - 1].querySelector('input, select')?.focus();
  };

  btnNext.addEventListener('click', () => {
    if (validateAll(steps[current - 1])) show(current + 1);
  });
  btnPrev.addEventListener('click', () => show(current - 1));
  // Enter in a field advances instead of submitting early.
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && current < steps.length) {
      e.preventDefault();
      btnNext.click();
    }
  });

  /* ---- payload */
  const val = (id) => form.querySelector(`#${id}`).value.trim();
  const payload = () => {
    const social = {};
    ['facebook', 'instagram', 'linkedin', 'other'].forEach((k) => {
      if (val(k)) social[k] = val(k);
    });
    const competitors = [...comps.querySelectorAll('.competitor')]
      .map((r) => ({ name: r.querySelector('[data-comp="name"]').value.trim(), website: r.querySelector('[data-comp="website"]').value.trim() }))
      .filter((c) => c.name || c.website);
    return {
      business_name: val('business_name'),
      industry: industry.value === 'other' ? val('industry_other') || 'general' : industry.value,
      website_url: normaliseUrl(val('website_url')) || null,
      social_links: social,
      competitors,
      contact_email: val('contact_email').toLowerCase(),
      contact_phone: val('contact_phone') || null,
      contact_name: val('contact_name') || null,
      password: form.querySelector('#password').value,
    };
  };

  const busy = (on) => {
    btnSubmit.disabled = on;
    btnPrev.disabled = on;
    btnSubmit.innerHTML = on ? '<span class="spinner" aria-hidden="true"></span> Setting up your trial…' : 'Start my free trial';
    form.setAttribute('aria-busy', String(on));
  };

  const fail = (message, field) => {
    if (field) {
      const step = FIELD_MAP[field];
      if (step && step !== current) show(step, { focus: false });
      const el = form.querySelector(`#${field}`);
      if (el) {
        setError(el, message);
        el.focus();
      }
    }
    setStatus(status, 'error', message);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (current !== steps.length) return btnNext.click();
    if (!validateAll(steps[current - 1])) return;

    if (!apiBase) {
      setStatus(status, 'error', `Everything checks out, but this build isn’t connected to the signup service, so no account was created. Start your trial at ${site.links.hostedSignup}`);
      return;
    }

    busy(true);
    setStatus(status, 'info', 'Creating your trial…');
    let res;
    let data = {};
    try {
      res = await fetch(`${apiBase}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload()),
      });
      data = await res.json().catch(() => ({}));
    } catch {
      busy(false);
      fail('We couldn’t reach the signup service. Check your connection and try again — nothing was created.');
      return;
    }
    busy(false);

    if (res.ok && data.tenant_id) {
      form.hidden = true;
      document.querySelector('[data-api-missing]').hidden = true;
      success.querySelector('[data-tenant-id]').textContent = data.tenant_id;
      success.querySelector('[data-no-login]').hidden = data.login_created !== false;
      success.hidden = false;
      success.focus();
      return;
    }

    if (res.status === 409) return fail('That email is already registered. Sign in instead, or use a different email.', 'contact_email');
    if (res.status === 429) return fail('Too many signups from this connection right now. Please try again in an hour — nothing was created.');
    if (res.status === 422 && Array.isArray(data.detail)) {
      const first = data.detail[0] || {};
      const field = Array.isArray(first.loc) ? first.loc[first.loc.length - 1] : null;
      // Pydantic messages name the API field ("business_name …"); show the form's label instead.
      const label = form.querySelector(`#${field}`)?.dataset.label;
      let msg = String(first.msg || 'Please check your details.').replace(/^Value error, /, '');
      if (label) msg = msg.replace(field, label);
      return fail(msg.charAt(0).toUpperCase() + msg.slice(1), FIELD_MAP[field] ? field : null);
    }
    if (res.status >= 500) return fail(`The signup service had a problem (error ${res.status}). Nothing was created — please try again shortly or message us on WhatsApp.`);
    fail(typeof data.detail === 'string' ? data.detail : `Signup failed (error ${res.status}). Nothing was created — please try again or contact us.`);
  });

  show(1, { focus: false });
  // The markup ships these disabled so a no-JS submit can't leak fields; arm them now.
  btnNext.disabled = false;
  btnSubmit.disabled = false;
  form.removeAttribute('data-js-pending');
}
