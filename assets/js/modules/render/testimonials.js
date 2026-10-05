import { el, mount } from '../utils.js';
import { createFormspreeForm } from '../formspree.js';

export function renderTestimonials(testimonials, siteConfig) {
  const items = testimonials.items || [];
  const cfg = siteConfig.integrations.testimonialForm;
  const submission = cfg.enabled
    ? el('details', { class: 'testimonial-submission' }, [
      el('summary', { class: 'btn btn--primary' }, 'Share a testimonial'),
      createFormspreeForm(cfg, {
        id: 'testimonial',
        fields: [
          { name: 'name', label: 'Name', autocomplete: 'name', required: true },
          { name: 'email', label: 'Email (not published)', type: 'email', autocomplete: 'email', required: true },
          { name: 'role', label: 'Role / company' },
          { name: 'message', label: 'Testimonial', required: true },
        ],
        submitLabel: 'Send testimonial',
        successMessage: 'Thank you! Your testimonial has been sent for review. It will not appear automatically.',
      }),
    ])
    : el('a', { href: `mailto:${cfg.fallbackMailto}?subject=Testimonial`, class: 'btn btn--primary' }, 'Email me a testimonial');

  if (items.length === 0) {
    mount('testimonials-root', el('div', { class: 'empty-state' }, [
      el('p', {}, 'No testimonials yet — if we\u2019ve worked together, I\u2019d love to hear from you.'),
      submission,
    ]));
    return;
  }

  const grid = el('div', { class: 'testimonial-grid' }, items.map((t) => el('div', { class: 'testimonial-card' }, [
    el('blockquote', {}, `“${t.quote}”`),
    el('div', { class: 'name' }, t.name),
    el('div', { class: 'role' }, t.role),
  ])));
  mount('testimonials-root', el('div', {}, [grid, submission]));
}
