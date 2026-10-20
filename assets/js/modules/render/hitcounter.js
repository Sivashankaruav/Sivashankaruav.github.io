import { el, mount } from '../utils.js';

// Logs one hit per page load via the 9trees/daily counter API; the POST
// response already contains today's and total counts.
export async function renderHitCounter(siteConfig) {
  const cfg = siteConfig.integrations.hitCounter;
  if (!cfg || !cfg.enabled) return;

  try {
    const response = await fetch(cfg.endpoint, {
      method: 'POST',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: cfg.page }),
    });
    if (!response.ok) throw new Error(`Counter request failed (${response.status})`);
    const counts = await response.json();
    const fmt = (n) => Number(n).toLocaleString();
    mount('hitcounter-root', el('span', {}, `Visits: ${fmt(counts.today_hits)} today · ${fmt(counts.total_hits)} total`));
  } catch (error) {
    console.error('Visit counter unavailable:', error);
  }
}