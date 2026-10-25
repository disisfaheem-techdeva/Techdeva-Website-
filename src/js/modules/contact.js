/**
 * Contact / demo form.
 *
 * The platform has no public contact endpoint (checked: app/main.py exposes
 * POST /signup as its only unauthenticated write; /leads needs a tenant
 * session). Rather than show a success message for a submission that went
 * nowhere, the form hands the validated message to WhatsApp or email, where
 * the visitor presses send themselves. See docs/zoho-research/implementation-status.md.
 */
import { site, whatsappLink } from '../../config/site.js';
import { validateAll, wireLiveValidation, setStatus } from './validate.js';

export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  wireLiveValidation(form);
  const status = form.querySelector('[data-form-status]');

  // ?topic=sales etc. preselects the topic (no personal data in the URL).
  const topic = new URLSearchParams(location.search).get('topic');
  const select = form.querySelector('[data-topic-select]');
  if (topic && select?.querySelector(`option[value="${CSS.escape(topic)}"]`)) select.value = topic;

  const compose = () => {
    const d = Object.fromEntries(new FormData(form));
    const topicLabel = select?.selectedOptions[0]?.textContent || 'Enquiry';
    return {
      subject: `${topicLabel} — ${d.business}`,
      text: [
        `${topicLabel}`,
        `Name: ${d.name}`,
        `Business: ${d.business} (${d.type})`,
        `WhatsApp: ${d.phone}`,
        d.email ? `Email: ${d.email}` : '',
        '',
        d.message,
      ]
        .filter((l) => l !== '')
        .join('\n'),
    };
  };

  const send = (channel) => {
    setStatus(status, '', '');
    if (!validateAll(form)) {
      setStatus(status, 'error', 'Please fix the highlighted fields.');
      return;
    }
    const { subject, text } = compose();
    const url =
      channel === 'email'
        ? `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
        : whatsappLink(text);
    // Honest status: we can only say what we did, never that a message arrived.
    if (channel === 'email') {
      window.location.href = url;
      setStatus(status, 'info', 'Your email app should open with the message ready. It is sent only when you press send there.');
      return;
    }
    // Not passing "noopener" here: with it, window.open always returns null
    // and a blocked popup would be indistinguishable from an opened one.
    const win = window.open(url, '_blank');
    if (win) {
      win.opener = null;
      setStatus(status, 'info', 'WhatsApp opened in a new tab with your message ready. It is sent only when you press send there.');
    } else {
      setStatus(status, 'error', `Your browser blocked the new tab. Message us directly on WhatsApp: ${site.contact.phoneDisplay}.`);
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    send('whatsapp');
  });
  form.querySelector('[data-send-email]')?.addEventListener('click', () => send('email'));
  // Shipped disabled so a submit before this script runs can't do a native GET.
  form.querySelectorAll('button[disabled]').forEach((b) => (b.disabled = false));
}
