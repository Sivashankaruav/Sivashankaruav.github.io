import { dataStore } from './modules/dataStore.js';
import { applyTheme, resolveInitialTheme, initThemeToggle } from './modules/theme.js';
import { el, mount } from './modules/utils.js';
import { renderHero } from './modules/render/hero.js';
import { renderAbout } from './modules/render/about.js';
import { renderExperience } from './modules/render/experience.js';
import { renderSkills } from './modules/render/skills.js';
import { renderProjects } from './modules/render/projects.js';
import { renderTestimonials } from './modules/render/testimonials.js';
import { renderThirukural } from './modules/render/thirukural.js';
import { renderContact } from './modules/render/contact.js';
import { renderHitCounter } from './modules/render/hitcounter.js';

function renderNav(siteConfig) {
  const nav = el('ul', {}, siteConfig.nav.map((item) => el('li', {}, el('a', { href: `#${item.id}` }, item.label))));
  mount('main-nav', nav);
}

function applyMeta(siteConfig) {
  document.title = siteConfig.meta.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', siteConfig.meta.description);
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) favicon.setAttribute('href', siteConfig.meta.favicon);
}

async function init() {
  const siteConfig = await dataStore.site();

  applyMeta(siteConfig);
  applyTheme(resolveInitialTheme(siteConfig), siteConfig);
  initThemeToggle(siteConfig);
  renderNav(siteConfig);
  renderHitCounter(siteConfig);

  const [profile, experience, education, skills, projects, testimonials, kural] = await Promise.all([
    dataStore.profile(),
    dataStore.experience(),
    dataStore.education(),
    dataStore.skills(),
    dataStore.projects(),
    dataStore.testimonials(),
    dataStore.kural(),
  ]);

  renderHero(profile);
  renderAbout(profile);
  renderExperience(experience, education);
  renderSkills(skills);
  renderProjects(projects);
  renderTestimonials(testimonials, siteConfig);
  renderThirukural(kural);
  renderContact(profile, siteConfig);

  document.body.classList.add('is-ready');
}

init().catch((err) => {
  console.error('Portfolio failed to initialise:', err);
  const main = document.querySelector('main');
  if (main) {
    main.prepend(el('div', { style: 'padding:24px;color:#b00020;' }, `Something went wrong loading this page: ${err.message}`));
  }
});
