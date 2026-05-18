import { useQuery } from '@tanstack/react-query';
import { jikanAPI } from '../services/jikan.service';
import { anilistQuery, GET_TRENDING, GET_SEASONAL } from '../services/anilist.service';
import { getCurrentSeason, getCurrentYear } from '../utils/constants';

export const useTrending = () =>
  useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const res = await jikanAPI.getTrending();
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useTopRated = () =>
  useQuery({
    queryKey: ['top-rated'],
    queryFn: async () => {
      const res = await jikanAPI.getTopRated();
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useUpcoming = () =>
  useQuery({
    queryKey: ['upcoming'],
    queryFn: async () => {
      const res = await jikanAPI.getUpcoming();
      return res.data.data;
    },
    staleTime: 1000 * 60 * 10,
  });

export const useAnimeDetail = (id: number) =>
  useQuery({
    queryKey: ['anime', id],
    queryFn: async () => {
      const res = await jikanAPI.getAnime(id);
      return res.data.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });

export const useAnimeCharacters = (id: number) =>
  useQuery({
    queryKey: ['anime-characters', id],
    queryFn: async () => {
      const res = await jikanAPI.getCharacters(id);
      return res.data.data;
    },
    enabled: !!id,
  });

export const useSeasonal = () =>
  useQuery({
    queryKey: ['seasonal', getCurrentYear(), getCurrentSeason()],
    queryFn: async () => {
      const res = await jikanAPI.getSeasonal(getCurrentYear(), getCurrentSeason());
      return res.data.data;
    },
    staleTime: 1000 * 60 * 10,
  });

export const useAniListTrending = () =>
  useQuery({
    queryKey: ['anilist-trending'],
    queryFn: async () => {
      const data = await anilistQuery(GET_TRENDING, { page: 1, perPage: 20 });
      return data.data.Page.media;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useAniListSeasonal = () =>
  useQuery({
    queryKey: ['anilist-seasonal'],
    queryFn: async () => {
      const season = getCurrentSeason().charAt(0).toUpperCase() + getCurrentSeason().slice(1);
      const data = await anilistQuery(GET_SEASONAL, {
        season: season.toUpperCase(),
        year: getCurrentYear(),
        page: 1,
        perPage: 20,
      });
      return data.data.Page.media;
    },
    staleTime: 1000 * 60 * 10,
  });

export const useMoodAnime = (moodGenres: string | null) =>
  useQuery({
    queryKey: ['mood-anime', moodGenres],
    queryFn: async () => {
      const res = await jikanAPI.getMoodAnime(moodGenres!);
      return res.data.data;
    },
    enabled: !!moodGenres,
    staleTime: 1000 * 60 * 5,
  });

export const useSearch = (query: string) =>
  useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const res = await jikanAPI.search(query);
      return res.data.data;
    },
    enabled: query.length >= 3,
    staleTime: 1000 * 60 * 2,
  });
