import { el, mount } from '../utils.js';
import { createFormspreeForm } from '../formspree.js';

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
    formNode = createFormspreeForm(cfg, {
      id: 'contact',
      fields: [
        { name: 'name', label: 'Name', autocomplete: 'name', required: true },
        { name: 'email', label: 'Email', type: 'email', autocomplete: 'email', required: true },
        { name: 'message', label: 'Message', required: true },
      ],
      submitLabel: 'Send message',
      successMessage: 'Thank you! Your message has been sent.',
    });
  } else {
    formNode = el('div', { class: 'contact-form' }, [
      el('p', {}, 'The contact form isn\u2019t wired up yet — drop me a line directly and I\u2019ll get back to you.'),
      el('a', { href: `mailto:${cfg.fallbackMailto}`, class: 'btn btn--primary' }, `Email ${cfg.fallbackMailto}`),
    ]);
  }

  mount('contact-root', el('div', { class: 'contact-grid' }, [details, formNode]));
}
