import { el, mount } from '../utils.js';

function roleCard(role) {
  return el('div', { class: 'timeline-item' }, [
    el('div', { class: 'role-line' }, [
      el('h3', {}, [role.title, role.current ? el('span', { class: 'badge-current' }, 'CURRENT') : null]),
      el('span', { class: 'dates' }, `${role.start} – ${role.end}`),
    ]),
    el('div', { class: 'company' }, role.companyUrl
      ? el('a', { href: role.companyUrl, target: '_blank', rel: 'noopener' }, `${role.company} · ${role.location}`)
      : `${role.company} · ${role.location}`),
    el('ul', {}, role.bullets.map((b) => el('li', {}, b))),
  ]);
}

function subjectsToggle(edu) {
  if (!edu.subjects || edu.subjects.length === 0) return null;
  return el('div', { class: 'edu-subjects', tabindex: '0' }, [
    el('span', { class: 'subjects-trigger' }, `Subjects (${edu.subjects.length})`),
    el('div', { class: 'subjects-popover' }, el('ul', {}, edu.subjects.map((s) => el('li', {}, s)))),
  ]);
}

function eduCard(edu) {
  return el('div', { class: 'timeline-item' }, [
    el('div', { class: 'role-line' }, [
      el('h3', {}, edu.degree),
      el('span', { class: 'dates' }, `${edu.start} – ${edu.end}`),
    ]),
    el('div', { class: 'company' }, `${edu.institution} · ${edu.location}`),
    subjectsToggle(edu),
    el('div', { class: 'thesis' }, edu.thesis ? [`Thesis: ${edu.thesis}`] : []),
  ]);
}

export function renderExperience(experience, education) {
  const timeline = el('div', { class: 'timeline' }, experience.roles.map(roleCard));
  mount('experience-root', timeline);

  const eduTimeline = el('div', { class: 'timeline' }, education.degrees.map(eduCard));
  mount('education-root', eduTimeline);
}
