import { useQuery } from "@tanstack/react-query";
import { tmdb, SAMPLE_MOVIES, SAMPLE_HERO } from "@/lib/tmdb";
import type { MediaItem, MovieDetail, TVShowDetail } from "@/types/movie";

const useTMDBQuery = <T>(
  key: string[],
  fetcher: () => Promise<{ results: T[] }>,
  fallback: T[]
) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      try {
        const data = await fetcher();
        return data.results;
      } catch {
        return fallback;
      }
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
};

export const useTrending = () =>
  useTMDBQuery<MediaItem>(
    ["trending"],
    tmdb.getTrending,
    SAMPLE_MOVIES
  );

export const usePopularMovies = () =>
  useTMDBQuery<MediaItem>(
    ["popular"],
    tmdb.getPopularMovies,
    SAMPLE_MOVIES.slice(3)
  );

export const useTopRatedMovies = () =>
  useTMDBQuery<MediaItem>(
    ["topRated"],
    tmdb.getTopRatedMovies,
    [...SAMPLE_MOVIES].sort((a, b) => b.vote_average - a.vote_average)
  );

export const useNowPlaying = () =>
  useTMDBQuery<MediaItem>(
    ["nowPlaying"],
    tmdb.getNowPlaying,
    SAMPLE_MOVIES.slice(0, 8)
  );

export const useBollywood = () =>
  useTMDBQuery<MediaItem>(
    ["bollywood"],
    tmdb.getBollywood,
    []
  );

export const useTamilMovies = () =>
  useTMDBQuery<MediaItem>(
    ["tamil"],
    tmdb.getTamilMovies,
    []
  );

export const useHeroMovie = () => {
  const { data: trending } = useTrending();
  const hero = trending?.[0] || SAMPLE_HERO;
  return hero;
};

export const useMovieDetail = (id: number) =>
  useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      try {
        return await tmdb.getMovieDetail(id);
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

export const useTVDetail = (id: number) =>
  useQuery({
    queryKey: ["tv", id],
    queryFn: async () => {
      try {
        return await tmdb.getTVDetail(id);
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

export const useSearch = (query: string) =>
  useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query || query.length < 2) return [];
      try {
        const data = await tmdb.searchMulti(query);
        return data.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );
      } catch {
        return SAMPLE_MOVIES.filter(
          (m) =>
            ("title" in m && m.title?.toLowerCase().includes(query.toLowerCase())) ||
            ("name" in m && (m as any).name?.toLowerCase().includes(query.toLowerCase()))
        );
      }
    },
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
