import { el, mount, randomItem } from '../utils.js';

export function renderThirukural(kuralList) {
  const kural = randomItem(kuralList);
  if (!kural) return;

  const node = el('div', { class: 'kural-card' }, [
    el('div', { class: 'kural-number' }, `Kural #${kural.Number}`),
    el('div', { class: 'kural-line' }, kural.Line1),
    el('div', { class: 'kural-line' }, kural.Line2),
    el('div', { class: 'kural-explanation' }, kural.explanation || kural.Translation),
    el('div', { class: 'kural-actions' }, el('button', {
      class: 'btn btn--outline',
      onclick: () => renderThirukural(kuralList),
    }, 'Show another')),
  ]);

  mount('thirukural-root', node);
}
