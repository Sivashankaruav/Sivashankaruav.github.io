import { el, mount } from '../utils.js';

function projectCard(project) {
  return el('div', { class: 'project-card' }, [
    el('img', { src: project.image, alt: project.title, loading: 'lazy' }),
    el('div', { class: 'project-body' }, [
      el('h4', {}, project.title),
      el('p', {}, project.summary),
      el('div', { class: 'project-tags' }, project.tags.map((t) => el('span', { class: 'tag' }, t))),
    ]),
  ]);
}

export function renderProjects(projects) {
  const grid = el('div', { class: 'projects-grid' }, projects.items.map(projectCard));
  const more = el('div', { class: 'projects-more' }, el('a', { href: projects.moreLink.url, class: 'btn btn--primary' }, projects.moreLink.label));
  mount('projects-root', el('div', {}, [grid, more]));
}
