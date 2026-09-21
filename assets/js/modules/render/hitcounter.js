import { el, mount } from '../utils.js';

export function renderHitCounter(siteConfig) {
  const cfg = siteConfig.integrations.hitCounter;
  if (!cfg.enabled) return;

  const badgeUrl = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${encodeURIComponent(cfg.targetUrl)}&count_bg=%23FFD42D&title_bg=%232A2A2A&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false`;
  mount('hitcounter-root', el('img', { class: 'hit-counter', src: badgeUrl, alt: 'Visitor hit counter', loading: 'lazy' }));
}
