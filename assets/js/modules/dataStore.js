// Fetches and caches the JSON data files under /data/. Keeping all fetch
// logic here means renderers never need to know the file layout changed.

const cache = new Map();

async function fetchJson(path) {
  if (cache.has(path)) return cache.get(path);
  const response = await fetch(path, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
  const data = await response.json();
  cache.set(path, data);
  return data;
}

export const dataStore = {
  site: () => fetchJson('data/site.json'),
  profile: () => fetchJson('data/profile.json'),
  experience: () => fetchJson('data/experience.json'),
  education: () => fetchJson('data/education.json'),
  skills: () => fetchJson('data/skills.json'),
  projects: () => fetchJson('data/projects.json'),
  testimonials: () => fetchJson('data/testimonials.json'),
  kural: async () => {
    const data = await fetchJson('json/kural.json');
    return Array.isArray(data) ? data : data.kural;
  },
};
