import { el, mount } from '../utils.js';

export function renderAbout(profile) {
  const list = el('ul', { class: 'summary-list' }, profile.summary.map((line) => el('li', {}, line)));
  const node = el('div', {}, [
    list,
    el('p', { class: 'privacy-note' }, profile.privacyNote),
  ]);
  mount('about-root', node);
}
