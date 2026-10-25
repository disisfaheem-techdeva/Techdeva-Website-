/**
 * /free-trial — a three-step form that posts to the platform's existing public
 * POST /signup (app/main.py: SignupIn). Field names, limits and the password
 * rule mirror that model exactly so the browser rejects what the API would.
 *
 * The success panel is only revealed by js/modules/trial.js after the API
 * returns 2xx with a tenant_id. There is no client-side "pretend" success.
 */
import { html, raw } from '../templates/html.js';
import { icon } from '../templates/icons.js';
import { checklist } from '../templates/components.js';
import { industries } from '../data/industries.js';
import { site } from '../config/site.js';

const field = ({ id, label, required, type = 'text', hint, attrs = '', full }) => html`<div class="field${full ? ' field--full' : ''}">
  <label for="${id}">${label}${required ? html` <span aria-hidden="true">*</span>` : html` <span class="field__opt">(optional)</span>`}</label>
  <input id="${id}" name="${id}" type="${type}"${required ? html` required` : ''} ${raw(attrs)} data-label="${label}"${hint ? html` aria-describedby="${id}-hint"` : ''}>
  ${hint ? html`<p class="field__hint" id="${id}-hint">${hint}</p>` : ''}
  <p class="field__error" id="${id}-err" hidden></p>
</div>`;

const stepsNav = html`<ol class="wizard__steps" aria-label="Signup progress">
  <li class="is-current" data-step-label="1"><span>1</span>Your business</li>
  <li data-step-label="2"><span>2</span>Where you are online</li>
  <li data-step-label="3"><span>3</span>Your login</li>
</ol>`;

const body = html`
<section class="trial">
  <div class="container trial__layout">
    <div class="trial__intro">
      <p class="eyebrow">${site.trialDays}-day free trial</p>
      <h1 class="trial__title">Put an <span class="grad-text">AI workforce</span> on your business</h1>
      <p class="hero__lead">Tell us where your business already lives online. We read your website, your pages and your competitors’ live ads — then start producing work.</p>
      ${checklist([`${site.trialDays} days free, no card required`, 'No setup fee — onboarding and WhatsApp setup included', 'You approve before anything is published or spent'])}
      <div class="note-card"><b>We only report what we can actually observe.</b> Anything we can’t reach — a private page, an account you haven’t connected — is shown to you as a gap, never filled in with a guess.</div>
      <p class="fine">Already have an account? <a href="${site.links.signIn}">Sign in</a></p>
    </div>

    <div class="trial__panel">
      <div class="notice notice--warn" data-api-missing hidden role="note">
        ${icon('shield', 18)}<div><b>This build isn’t connected to the signup service.</b> The form validates but won’t create an account. To start a real trial, use <a href="${site.links.hostedSignup}">the TechDeva signup page</a>.</div>
      </div>

      <noscript><div class="notice notice--warn">${icon('shield', 18)}<div><b>JavaScript is needed for this form.</b> You can also start at <a href="${site.links.hostedSignup}">the TechDeva signup page</a>.</div></div></noscript>

      <!-- method="post" + buttons disabled until js/modules/trial.js runs: if the
           script never loads, a submit must not put the email and password in the URL. -->
      <form class="form card wizard" method="post" novalidate data-trial-form data-js-pending>
        ${stepsNav}

        <fieldset class="wizard__step" data-step="1">
          <legend class="wizard__legend">Your business</legend>
          <div class="form__grid">
            ${field({ id: 'business_name', label: 'Business name', required: true, attrs: 'minlength="2" maxlength="120" autocomplete="organization" data-rule="noangle"', full: true })}
            <div class="field">
              <label for="industry">Industry <span aria-hidden="true">*</span></label>
              <select id="industry" name="industry" required data-label="Industry">
                <option value="">Choose one</option>
                ${industries.map((i) => html`<option value="${i.slug}">${i.name}</option>`)}
                <option value="other">Other service business</option>
              </select>
              <p class="field__error" id="industry-err" hidden></p>
            </div>
            ${field({ id: 'industry_other', label: 'Your industry', attrs: 'maxlength="120" data-rule="noangle" data-show-if="industry=other"' })}
            ${field({ id: 'website_url', label: 'Website', type: 'url', hint: 'e.g. yourbusiness.com — we add https:// if you leave it out.', attrs: 'maxlength="2000" inputmode="url" data-rule="url"', full: true })}
          </div>
        </fieldset>

        <fieldset class="wizard__step" data-step="2" hidden>
          <legend class="wizard__legend">Where you are online</legend>
          <p class="wizard__help">Every page you have. We use these to prepare your starting report.</p>
          <div class="form__grid">
            ${field({ id: 'facebook', label: 'Facebook page', attrs: 'maxlength="300" placeholder="facebook.com/yourpage"' })}
            ${field({ id: 'instagram', label: 'Instagram', attrs: 'maxlength="300" placeholder="instagram.com/yourhandle"' })}
            ${field({ id: 'linkedin', label: 'LinkedIn', attrs: 'maxlength="300" placeholder="linkedin.com/company/you"' })}
            ${field({ id: 'other', label: 'Anything else', attrs: 'maxlength="300" placeholder="TikTok, YouTube, Google Business…"' })}
          </div>
          <div class="competitors">
            <p class="wizard__sub">Competitors <span class="field__opt">(optional — we check their posts and live ads)</span></p>
            <div data-competitors></div>
            <button class="btn btn--ghost btn--sm" type="button" data-add-competitor>+ Add a competitor</button>
          </div>
        </fieldset>

        <fieldset class="wizard__step" data-step="3" hidden>
          <legend class="wizard__legend">Your login</legend>
          <div class="form__grid">
            ${field({ id: 'contact_name', label: 'Your name', attrs: 'maxlength="120" autocomplete="name" data-rule="noangle"' })}
            ${field({ id: 'contact_phone', label: 'Phone', type: 'tel', attrs: 'maxlength="120" autocomplete="tel" inputmode="tel" placeholder="+92…" data-rule="phone-optional"' })}
            ${field({ id: 'contact_email', label: 'Email', type: 'email', required: true, attrs: 'maxlength="254" autocomplete="email" data-rule="email"', full: true })}
            ${field({ id: 'password', label: 'Password', type: 'password', required: true, hint: 'Your dashboard login. At least 10 characters, not a common password.', attrs: 'minlength="10" maxlength="256" autocomplete="new-password" data-rule="password"', full: true })}
          </div>
          <div class="field field--check">
            <input type="checkbox" id="consent" name="consent" required data-label="Agreement">
            <label for="consent">I agree to the <a href="${site.links.terms}" target="_blank" rel="noopener">Terms</a> and <a href="${site.links.privacy}" target="_blank" rel="noopener">Privacy Policy</a>.</label>
            <p class="field__error" id="consent-err" hidden></p>
          </div>
        </fieldset>

        <div class="form__status" role="status" aria-live="polite" data-form-status></div>

        <div class="wizard__nav">
          <button class="btn btn--ghost btn--lg" type="button" data-prev hidden>Back</button>
          <button class="btn btn--primary btn--lg" type="button" data-next disabled>Continue ${icon('arrow', 18)}</button>
          <button class="btn btn--primary btn--lg" type="submit" data-submit hidden disabled>Start my free trial</button>
        </div>
      </form>

      <div class="card success" data-trial-success hidden tabindex="-1">
        <span class="success__icon">${icon('check', 28)}</span>
        <h2 class="success__title">Your trial has started</h2>
        <p>We’re analysing your presence and your competitors now. Your report appears in the dashboard as soon as it’s finished.</p>
        <p class="fine">Account ID: <code data-tenant-id></code></p>
        <p class="fine" data-no-login hidden>No login was created for this signup. Contact us to finish setting up your dashboard access.</p>
        <a class="btn btn--primary btn--lg" href="${site.links.signIn}" data-portal-link>Open my dashboard ${icon('arrow', 18)}</a>
      </div>
    </div>
  </div>
</section>
`;

export default {
  id: 'free-trial',
  path: '/free-trial/',
  title: `Start your ${site.trialDays}-day free trial`,
  description: `Start a ${site.trialDays}-day free TechDeva trial — no card, no setup fee. We analyse your website, pages and competitors’ live ads, then your AI workforce starts working.`,
  breadcrumbs: [{ name: 'Free trial', href: '/free-trial/' }],
  hideFooterCta: true,
  body,
};
