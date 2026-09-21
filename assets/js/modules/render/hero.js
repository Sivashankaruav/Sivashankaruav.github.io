import { el, mount } from '../utils.js';

export function renderHero(profile) {
  const socialLinks = profile.social.map((s) =>
    el('a', { href: s.url, class: 'btn btn--outline', target: s.id === 'email' ? undefined : '_blank', rel: 'noopener' }, s.label)
  );

  const node = el('div', { class: 'hero-inner' }, [
    el('img', { class: 'avatar', src: profile.photo, alt: profile.name, loading: 'lazy' }),
    el('h1', {}, profile.name),
    el('p', { class: 'tagline' }, profile.tagline),
    el('p', { class: 'location' }, `📍 ${profile.location.display}`),
    el('div', { class: 'quote' }, [
      el('span', { html: `“${profile.quote.text}”` }),
      el('span', {}, `— ${profile.quote.author}`),
    ]),
    el('div', { class: 'hero-actions' }, [
      el('a', { href: profile.resume.file, class: 'btn btn--primary', download: '' }, profile.resume.label),
      ...socialLinks,
    ]),
  ]);

  mount('hero-root', node);
}
