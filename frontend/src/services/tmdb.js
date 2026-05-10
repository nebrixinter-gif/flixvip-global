import { TMDB_BASE, TMDB_KEYS, IMG_BASE } from '../mock/mock';

let keyIdx = 0;
function getKey() { return TMDB_KEYS[keyIdx % TMDB_KEYS.length]; }
function rotateKey() { keyIdx++; }

const langMap = {
  'pt-BR': 'pt-BR', en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', ja: 'ja-JP'
};

async function fetchTmdb(path, lang) {
  const language = langMap[lang] || 'en-US';
  for (let i = 0; i < TMDB_KEYS.length; i++) {
    try {
      const sep = path.includes('?') ? '&' : '?';
      const url = `${TMDB_BASE}${path}${sep}api_key=${getKey()}&language=${language}`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
      rotateKey();
    } catch (e) {
      rotateKey();
    }
  }
  return { results: [] };
}

export async function getTrending(lang) {
  const data = await fetchTmdb('/trending/all/week', lang);
  return data.results || [];
}
export async function getByGenre(genreId, type, lang) {
  const data = await fetchTmdb(`/discover/${type}?with_genres=${genreId}&sort_by=popularity.desc`, lang);
  return data.results || [];
}
export async function getTopRated(type, lang) {
  const data = await fetchTmdb(`/${type}/top_rated`, lang);
  return data.results || [];
}
export async function getNetflixOriginals(lang) {
  // with_networks=213 = Netflix
  const data = await fetchTmdb('/discover/tv?with_networks=213', lang);
  return data.results || [];
}
export async function getVideos(item, lang) {
  const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
  const data = await fetchTmdb(`/${type}/${item.id}/videos`, lang);
  const results = data.results || [];
  const trailer = results.find(r => r.type === 'Trailer' && r.site === 'YouTube') || results.find(r => r.site === 'YouTube');
  return trailer ? trailer.key : null;
}

export function imgUrl(path, size = 'original') {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${IMG_BASE}/${size}${path}`;
}
