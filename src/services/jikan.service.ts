import axios from 'axios';

const jikan = axios.create({ baseURL: 'https://api.jikan.moe/v4' });

export const jikanAPI = {
  getTrending: () => jikan.get('/top/anime?filter=airing&limit=20'),
  getTopRated: () => jikan.get('/top/anime?filter=bypopularity&limit=20'),
  getUpcoming: () => jikan.get('/top/anime?filter=upcoming&limit=20'),
  getAnime: (id: number) => jikan.get(`/anime/${id}/full`),
  getCharacters: (id: number) => jikan.get(`/anime/${id}/characters`),
  getSeasonal: (y: number, season: string) => jikan.get(`/seasons/${y}/${season}`),
  search: (q: string, params?: Record<string, string>) => jikan.get(`/anime?q=${encodeURIComponent(q)}`, { params }),
  getMoodAnime: (genres: string) => jikan.get(`/anime?genres=${genres}&order_by=score&sort=desc&limit=20`),
  getGenres: () => jikan.get('/genres/anime'),
};
