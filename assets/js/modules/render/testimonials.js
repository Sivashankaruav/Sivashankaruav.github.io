import { el, mount } from '../utils.js';

export function renderTestimonials(testimonials, siteConfig) {
  const items = testimonials.items || [];

  if (items.length === 0) {
    const cfg = siteConfig.integrations.testimonialForm;
    const cta = cfg.enabled
      ? el('a', { href: cfg.endpoint, class: 'btn btn--primary', target: '_blank', rel: 'noopener' }, 'Share a testimonial')
      : el('a', { href: `mailto:${cfg.fallbackMailto}?subject=Testimonial`, class: 'btn btn--primary' }, 'Email me a testimonial');

    mount('testimonials-root', el('div', { class: 'empty-state' }, [
      el('p', {}, 'No testimonials yet — if we\u2019ve worked together, I\u2019d love to hear from you.'),
      cta,
    ]));
    return;
  }

  const grid = el('div', { class: 'testimonial-grid' }, items.map((t) => el('div', { class: 'testimonial-card' }, [
    el('blockquote', {}, `“${t.quote}”`),
    el('div', { class: 'name' }, t.name),
    el('div', { class: 'role' }, t.role),
  ])));
  mount('testimonials-root', grid);
}
