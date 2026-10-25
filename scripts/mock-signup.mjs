/**
 * LOCAL TEST DOUBLE for the platform's POST /signup — never deploy this.
 *
 * It exists so the trial form's response handling (200 / 409 / 422 / 429 /
 * 500) can be exercised in a browser without creating real tenants. It does
 * not validate like the real API beyond what the branches below need.
 *
 *   node scripts/mock-signup.mjs            # listens on http://localhost:8787
 *   VITE_API_BASE=http://localhost:8787 npm run dev
 *
 * Choose the response with the email address:
 *   taken@…  → 409    rate@…  → 429    bad@…  → 422 (on business_name)
 *   down@…   → 500    anything else → 200 with a fake tenant id
 */
import http from 'node:http';

const PORT = Number(process.env.PORT || 8787);

const send = (res, status, body) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  });
  res.end(JSON.stringify(body));
};

http
  .createServer((req, res) => {
    if (req.method === 'OPTIONS') return send(res, 204, {});
    if (req.method !== 'POST' || req.url !== '/signup') return send(res, 404, { detail: 'Not Found' });
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      let body = {};
      try {
        body = JSON.parse(raw);
      } catch {
        return send(res, 400, { detail: 'invalid JSON' });
      }
      const email = String(body.contact_email || '');
      console.log(`[mock-signup] ${email} keys=${Object.keys(body).join(',')}`);
      setTimeout(() => {
        if (email.startsWith('taken@')) return send(res, 409, { detail: 'that email is already registered - log in instead' });
        if (email.startsWith('rate@')) return send(res, 429, { detail: 'too many signups from this address - try again later' });
        if (email.startsWith('bad@'))
          return send(res, 422, { detail: [{ loc: ['body', 'business_name'], msg: 'Value error, business_name cannot contain < or >' }] });
        if (email.startsWith('down@')) return send(res, 500, { detail: 'Internal Server Error' });
        send(res, 200, { signup_id: 'mock-signup', tenant_id: 'mock-0000-tenant', status: 'trial_started', login_created: Boolean(body.password), portal: '/portal' });
      }, 400);
    });
  })
  .listen(PORT, () => console.log(`[mock-signup] TEST DOUBLE listening on http://localhost:${PORT}/signup`));
