/**
 * Field validation shared by the contact and trial forms.
 *
 * The trial rules deliberately copy the platform's SignupIn validators
 * (app/main.py): the same email regex, URL regex, the 10-character password
 * minimum, the weak-password list and the "< or >" ban. A form that passes
 * here should never be rejected by the API for shape — and if the API's rules
 * change, these must change with them (see tests/validate.test.js).
 */
export const EMAIL_RE = /^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/;
export const URL_RE = /^https?:\/\/[^\s/$.?#][^\s]*$/i;
export const WEAK_PASSWORDS = new Set(['password', 'password1', '12345678', '123456789', 'qwertyui', 'letmein1', 'changeme', 'admin123', 'techdeva', 'passw0rd']);

export const normaliseUrl = (v) => {
  const s = v.trim();
  if (!s) return '';
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};

const digits = (v) => v.replace(/\D/g, '');

/** Returns an error message, or '' when the value is acceptable. */
export function checkValue(rule, value, label = 'This field') {
  const v = value.trim();
  switch (rule) {
    case 'email':
      return !v || (v.length <= 254 && EMAIL_RE.test(v)) ? '' : 'Enter a valid email address, like name@business.com.';
    case 'url': {
      if (!v) return '';
      const u = normaliseUrl(v);
      return u.length <= 2000 && URL_RE.test(u) && /\.[a-z]{2,}/i.test(u) ? '' : 'Enter a website address, like yourbusiness.com.';
    }
    case 'noangle':
      return /[<>]/.test(v) ? `${label} can’t contain < or >.` : '';
    case 'phone':
      return digits(v).length >= 10 && digits(v).length <= 15 ? '' : 'Enter a WhatsApp number with country or area code, e.g. +92 3xx xxxxxxx.';
    case 'phone-optional':
      return !v || (digits(v).length >= 7 && digits(v).length <= 15) ? '' : 'Enter a phone number, or leave this empty.';
    case 'password':
      if (value.length < 10) return 'Use at least 10 characters.';
      if (value.length > 256) return 'Use 256 characters or fewer.';
      if (WEAK_PASSWORDS.has(value.toLowerCase()) || new Set(value).size < 5) return 'That password is too easy to guess — use a longer, less common one.';
      return '';
    default:
      return '';
  }
}

export function validateField(el) {
  const label = el.dataset.label || 'This field';
  let msg = '';
  if (el.type === 'checkbox') {
    if (el.required && !el.checked) msg = 'Please confirm to continue.';
  } else {
    const v = el.value.trim();
    if (el.required && !v) msg = `${label} is required.`;
    else if (v && el.minLength > 0 && v.length < el.minLength) msg = `${label} needs at least ${el.minLength} characters.`;
    else if (v && el.maxLength > 0 && v.length > el.maxLength) msg = `${label} must be ${el.maxLength} characters or fewer.`;
    else if (el.dataset.rule) msg = checkValue(el.dataset.rule, el.value, label);
    if (!msg && el.type !== 'password' && /[<>]/.test(v) && el.dataset.rule !== 'url') msg = checkValue('noangle', v, label);
  }
  setError(el, msg);
  return !msg;
}

export function setError(el, msg) {
  const err = document.getElementById(`${el.id}-err`);
  const describedBy = (el.getAttribute('aria-describedby') || '').split(' ').filter((id) => id && id !== `${el.id}-err`);
  if (msg) {
    el.setAttribute('aria-invalid', 'true');
    describedBy.push(`${el.id}-err`);
    if (err) {
      err.textContent = msg;
      err.hidden = false;
    }
  } else {
    el.removeAttribute('aria-invalid');
    if (err) {
      err.textContent = '';
      err.hidden = true;
    }
  }
  if (describedBy.length) el.setAttribute('aria-describedby', describedBy.join(' '));
  else el.removeAttribute('aria-describedby');
}

/** Validates every visible field in `scope`; focuses the first invalid one. */
export function validateAll(scope) {
  const fields = [...scope.querySelectorAll('input[id], select[id], textarea[id]')].filter((el) => !el.closest('[hidden]'));
  const bad = fields.filter((el) => !validateField(el));
  bad[0]?.focus();
  return bad.length === 0;
}

/** Re-validate a field on blur, and live once it has shown an error. */
export function wireLiveValidation(form) {
  form.addEventListener('focusout', (e) => {
    const el = e.target;
    if (el.matches?.('input[id], select[id], textarea[id]') && (el.value || el.required)) validateField(el);
  });
  form.addEventListener('input', (e) => {
    if (e.target.getAttribute?.('aria-invalid') === 'true') validateField(e.target);
  });
}

export function setStatus(node, kind, message) {
  node.className = `form__status${kind ? ` is-${kind}` : ''}`;
  node.textContent = message || '';
}
