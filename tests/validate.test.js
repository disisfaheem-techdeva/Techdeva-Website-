/**
 * The client validators must agree with the platform's SignupIn rules
 * (app/main.py). If these fail after an API change, update both together.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkValue, normaliseUrl, EMAIL_RE, URL_RE } from '../src/js/modules/validate.js';

test('email regex is the API regex', () => {
  assert.equal(EMAIL_RE.source, String.raw`^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$`);
  assert.equal(checkValue('email', 'owner@clinic.pk'), '');
  assert.notEqual(checkValue('email', 'owner@clinic'), '');
  assert.notEqual(checkValue('email', 'not an email'), '');
});

test('url gets https:// added, like the API does', () => {
  assert.equal(normaliseUrl('clinic.pk'), 'https://clinic.pk');
  assert.equal(normaliseUrl('http://clinic.pk'), 'http://clinic.pk');
  assert.ok(URL_RE.test(normaliseUrl('clinic.pk')));
  assert.equal(checkValue('url', ''), '', 'website is optional');
  assert.notEqual(checkValue('url', 'not a site'), '');
});

test('password: 10+ chars, 5+ distinct, not on the weak list', () => {
  assert.notEqual(checkValue('password', 'short1'), '');
  assert.notEqual(checkValue('password', 'aaaaaaaaaaaa'), '', 'too few distinct characters');
  assert.notEqual(checkValue('password', '123456789'), '');
  assert.equal(checkValue('password', 'Gulberg-Clinic-2026'), '');
});

test('angle brackets are refused, as the API refuses them', () => {
  assert.notEqual(checkValue('noangle', 'Clinic <b>', 'Business name'), '');
  assert.equal(checkValue('noangle', 'Beauty Aesthetic & Lounge'), '');
});

test('phone rules', () => {
  assert.equal(checkValue('phone', '+92 335 4693665'), '');
  assert.notEqual(checkValue('phone', '12345'), '');
  assert.equal(checkValue('phone-optional', ''), '');
});
