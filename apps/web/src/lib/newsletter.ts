import {createHash, randomBytes} from 'node:crypto';

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function hashValue(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

export function createNewsletterToken() {
  return randomBytes(24).toString('hex');
}

export function buildPendingId(email: string) {
  return `newsletterPendingSubscriber.${hashValue(email)}`;
}

export function buildSubscriberId(email: string) {
  return `newsletterSubscriber.${hashValue(email)}`;
}