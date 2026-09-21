import { el, mount } from '../utils.js';

function categoryCard(category) {
  return el('div', { class: 'skill-card' }, [
    el('h4', {}, category.name),
    el('div', { class: 'tag-cloud' }, category.tags.map((tag) => el('span', { class: 'tag' }, tag))),
  ]);
}

function langRow(lang) {
  return el('div', { class: 'lang-row' }, [
    el('span', { class: 'lang-name' }, lang.name),
    el('span', { class: 'lang-bar' }, el('span', { style: `width:${(lang.level / 5) * 100}%` })),
  ]);
}

function interestItem(item) {
  return el('div', { class: 'interest-item' }, [
    el('i', { class: `icon ${item.icon}`, 'aria-hidden': 'true' }),
    el('span', {}, item.name),
  ]);
}

export function renderSkills(skills) {
  const grid = el('div', { class: 'skills-grid' }, skills.categories.map(categoryCard));
  mount('skills-root', grid);

  const langs = el('div', { class: 'lang-list' }, skills.languages.map(langRow));
  mount('languages-root', langs);

  const interests = el('div', { class: 'interest-list' }, skills.interests.map(interestItem));
  mount('interests-root', interests);
}
