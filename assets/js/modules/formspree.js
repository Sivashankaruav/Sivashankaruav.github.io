import { el } from './utils.js';

export function createFormspreeForm(cfg, { id, fields, submitLabel, successMessage }) {
  const status = el('p', { class: 'form-status', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
  const button = el('button', { class: 'btn btn--primary', type: 'submit' }, submitLabel);
  const form = el('form', { class: 'contact-form', action: cfg.endpoint, method: 'POST' }, [
    ...fields.flatMap((field) => [
      el('label', { for: `${id}-${field.name}` }, field.label),
      el(field.name === 'message' ? 'textarea' : 'input', {
        id: `${id}-${field.name}`,
        name: field.name,
        type: field.name === 'message' ? undefined : field.type || 'text',
        rows: field.name === 'message' ? '5' : undefined,
        autocomplete: field.autocomplete,
        required: field.required ? '' : undefined,
      }),
    ]),
    button,
    status,
    el('p', { class: 'form-note' }, [
      'Submissions are processed by Formspree. Prefer email? ',
      el('a', { href: `mailto:${cfg.fallbackMailto}` }, cfg.fallbackMailto),
    ]),
  ]);

  let submitting = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitting || !form.reportValidity()) return;
    submitting = true;
    button.disabled = true;
    button.textContent = 'Sending...';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your submission...';
    try {
      const endpoint = new URL(cfg.endpoint);
      if (endpoint.origin !== 'https://formspree.io' || !/^\/f\/[a-zA-Z0-9]+$/.test(endpoint.pathname)) {
        throw new Error('The form endpoint is not configured correctly. Please use the email link below.');
      }
      const response = await fetch(endpoint.href, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        const result = await response.json();
        const errors = Array.isArray(result.errors)
          ? result.errors.map((error) => error.message).filter((message) => typeof message === 'string')
          : [];
        throw new Error(errors.join(' ') || 'Formspree could not accept your submission. Please try again or use email.');
      }
      form.reset();
      status.textContent = successMessage;
    } catch (error) {
      console.error('Formspree submission failed:', error);
      status.textContent = error instanceof Error && error.name !== 'TypeError' && error.name !== 'SyntaxError'
        ? error.message
        : 'Unable to confirm delivery. Your text has been kept. Please check your connection or use the email link below.';
    } finally {
      submitting = false;
      button.disabled = false;
      button.textContent = submitLabel;
      form.removeAttribute('aria-busy');
    }
  });
  return form;
}
