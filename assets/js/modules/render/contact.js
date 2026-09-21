import { el, mount } from '../utils.js';

export function renderContact(profile, siteConfig) {
  const cfg = siteConfig.integrations.contactForm;

  const details = el('div', { class: 'contact-details' }, [
    el('ul', {}, [
      el('li', {}, [el('strong', {}, 'Email'), el('a', { href: `mailto:${profile.contact.email}` }, profile.contact.email)]),
      profile.contact.phone ? el('li', {}, [el('strong', {}, 'Phone'), profile.contact.phone]) : null,
      el('li', {}, [el('strong', {}, 'Location'), profile.location.display]),
    ]),
    el('div', { class: 'social-row' }, profile.social.map((s) =>
      el('a', { href: s.url, target: s.id === 'email' ? undefined : '_blank', rel: 'noopener' }, s.label)
    )),
  ]);

  let formNode;
  if (cfg.enabled) {
    formNode = el('form', { class: 'contact-form', action: cfg.endpoint, method: 'POST' }, [
      el('label', { for: 'contact-name' }, 'Name'),
      el('input', { id: 'contact-name', name: 'name', type: 'text', required: '' }),
      el('label', { for: 'contact-email' }, 'Email'),
      el('input', { id: 'contact-email', name: 'email', type: 'email', required: '' }),
      el('label', { for: 'contact-message' }, 'Message'),
      el('textarea', { id: 'contact-message', name: 'message', rows: '5', required: '' }),
      el('button', { class: 'btn btn--primary', type: 'submit' }, 'Send message'),
    ]);
  } else {
    formNode = el('div', { class: 'contact-form' }, [
      el('p', {}, 'The contact form isn\u2019t wired up yet — drop me a line directly and I\u2019ll get back to you.'),
      el('a', { href: `mailto:${cfg.fallbackMailto}`, class: 'btn btn--primary' }, `Email ${cfg.fallbackMailto}`),
    ]);
  }

  mount('contact-root', el('div', { class: 'contact-grid' }, [details, formNode]));
}
