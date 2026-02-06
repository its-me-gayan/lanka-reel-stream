import type { Movie, MovieDetail, TVShowDetail, MediaItem } from "@/types/movie";

// TMDB API Configuration
// Get your free API key at: https://www.themoviedb.org/settings/api
const TMDB_API_KEY = "5a371fda45fc0bed5e70e09cff64cdf1";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const getImageUrl = (path: string | null, size: string = "w500"): string => {
  if (!path) return "/placeholder.svg";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null): string => {
  if (!path) return "/placeholder.svg";
  return `${TMDB_IMAGE_BASE}/original${path}`;
};

// Vidking Player URLs
export const getVidkingMovieUrl = (tmdbId: number): string => {
  return `https://www.vidking.net/embed/movie/${tmdbId}?color=d4a520&autoPlay=false`;
};

export const getVidkingTVUrl = (tmdbId: number, season: number, episode: number): string => {
  return `https://www.vidking.net/embed/tv/${tmdbId}/${season}/${episode}?color=d4a520&autoPlay=false&nextEpisode=true&episodeSelector=true`;
};

const fetchTMDB = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB_API_KEY not configured");
  }
  const searchParams = new URLSearchParams({ api_key: TMDB_API_KEY, ...params });
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}?${searchParams}`);
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
};

export const tmdb = {
  getTrending: () =>
    fetchTMDB<{ results: MediaItem[] }>("/trending/all/week"),

  getPopularMovies: () =>
    fetchTMDB<{ results: Movie[] }>("/movie/popular"),

  getTopRatedMovies: () =>
    fetchTMDB<{ results: Movie[] }>("/movie/top_rated"),

  getNowPlaying: () =>
    fetchTMDB<{ results: Movie[] }>("/movie/now_playing"),

  getUpcoming: () =>
    fetchTMDB<{ results: Movie[] }>("/movie/upcoming"),

  getBollywood: () =>
    fetchTMDB<{ results: Movie[] }>("/discover/movie", {
      with_original_language: "hi",
      sort_by: "popularity.desc",
    }),

  getTamilMovies: () =>
    fetchTMDB<{ results: Movie[] }>("/discover/movie", {
      with_original_language: "ta",
      sort_by: "popularity.desc",
    }),

  getSinhalaMovies: () =>
    fetchTMDB<{ results: Movie[] }>("/discover/movie", {
      with_original_language: "si",
      sort_by: "popularity.desc",
    }),

  getMovieDetail: (id: number) =>
    fetchTMDB<MovieDetail>(`/movie/${id}`, { append_to_response: "credits,similar" }),

  getTVDetail: (id: number) =>
    fetchTMDB<TVShowDetail>(`/tv/${id}`, { append_to_response: "credits,similar" }),

  searchMulti: (query: string) =>
    fetchTMDB<{ results: MediaItem[] }>("/search/multi", { query }),

  getMoviesByGenre: (genreId: number) =>
    fetchTMDB<{ results: Movie[] }>("/discover/movie", {
      with_genres: genreId.toString(),
      sort_by: "popularity.desc",
    }),
};

// Sample data for when API key is not configured
export const SAMPLE_MOVIES: MediaItem[] = [
  {
    id: 1184918,
    title: "The Wild Robot",
    overview: "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
    poster_path: "/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
    backdrop_path: "/4zlOPT9CrtIzs0f3IGMGnzKMIFN.jpg",
    release_date: "2024-09-12",
    vote_average: 8.4,
    vote_count: 4200,
    genre_ids: [16, 878, 10751],
    media_type: "movie",
    original_language: "en",
    popularity: 850,
  },
  {
    id: 912649,
    title: "Venom: The Last Dance",
    overview: "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
    poster_path: "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
    backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    release_date: "2024-10-22",
    vote_average: 6.7,
    vote_count: 2300,
    genre_ids: [28, 878, 12],
    media_type: "movie",
    original_language: "en",
    popularity: 780,
  },
  {
    id: 1034541,
    title: "Terrifier 3",
    overview: "Art the Clown is set to unleash chaos on the unsuspecting residents of Miles County as they peacefully drift off to sleep on Christmas Eve.",
    poster_path: "/63xYQj1BwRFielxsBDXvHIJyXVm.jpg",
    backdrop_path: "/xlkclSE4aq7r3JsFIJRgs21zUew.jpg",
    release_date: "2024-10-09",
    vote_average: 7.0,
    vote_count: 1800,
    genre_ids: [27, 53],
    media_type: "movie",
    original_language: "en",
    popularity: 720,
  },
  {
    id: 933260,
    title: "The Substance",
    overview: "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
    poster_path: "/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
    backdrop_path: "/t98L9uphqBSNn2Mkvdm3xSFCQyi.jpg",
    release_date: "2024-09-07",
    vote_average: 7.3,
    vote_count: 2800,
    genre_ids: [18, 27, 878],
    media_type: "movie",
    original_language: "en",
    popularity: 650,
  },
  {
    id: 1062807,
    title: "Apartment 7A",
    overview: "A young dancer dreams of stardom, but a dark encounter with an evil force thrusts her into a nightmare she must escape before it consumes her.",
    poster_path: "/oLkGaEoMiRYjLnSJfAoFMLYdTKA.jpg",
    backdrop_path: "/dfMFYHslnmUBxKRXxmasJLBSNDi.jpg",
    release_date: "2024-09-26",
    vote_average: 6.1,
    vote_count: 800,
    genre_ids: [27, 53, 18],
    media_type: "movie",
    original_language: "en",
    popularity: 480,
  },
  {
    id: 698687,
    title: "Transformers One",
    overview: "The untold origin story of Optimus Prime and Megatron, better known as sworn enemies, but once were friends bonded like brothers who changed the fate of Cybertron forever.",
    poster_path: "/iRCbtdCMsN0JkEtgkaT30e2EoLo.jpg",
    backdrop_path: "/jbwYaoYWUwPEGCzOzAQu8BjTVBs.jpg",
    release_date: "2024-09-11",
    vote_average: 8.0,
    vote_count: 1500,
    genre_ids: [16, 878, 12, 28],
    media_type: "movie",
    original_language: "en",
    popularity: 550,
  },
  {
    id: 945961,
    title: "Alien: Romulus",
    overview: "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    poster_path: "/b33nnKl1GSFbao4l3fZDDqsMSF6.jpg",
    backdrop_path: "/9SSEUrSqhljBMzRe4aBTh17wUFP.jpg",
    release_date: "2024-08-13",
    vote_average: 7.2,
    vote_count: 3200,
    genre_ids: [27, 878],
    media_type: "movie",
    original_language: "en",
    popularity: 600,
  },
  {
    id: 573435,
    title: "Bad Boys: Ride or Die",
    overview: "After their late police captain is linked to drug cartels, Bad Boys Mike Lowrey and Marcus Burnett investigate to clear his name.",
    poster_path: "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
    backdrop_path: "/tncbMvfV0V07UZozXdBEY0inquB.jpg",
    release_date: "2024-06-05",
    vote_average: 7.6,
    vote_count: 2900,
    genre_ids: [28, 80, 35],
    media_type: "movie",
    original_language: "en",
    popularity: 520,
  },
  {
    id: 823464,
    title: "Godzilla x Kong: The New Empire",
    overview: "Following their fruit monumental clash, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world.",
    poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
    release_date: "2024-03-27",
    vote_average: 7.1,
    vote_count: 4500,
    genre_ids: [28, 878, 12],
    media_type: "movie",
    original_language: "en",
    popularity: 490,
  },
  {
    id: 693134,
    title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    release_date: "2024-02-27",
    vote_average: 8.2,
    vote_count: 6800,
    genre_ids: [878, 12, 18],
    media_type: "movie",
    original_language: "en",
    popularity: 700,
  },
  {
    id: 1078605,
    title: "Weapons",
    overview: "An action thriller following multiple intersecting storylines in a dangerous underworld.",
    poster_path: "/yTLxCMpMFxRaLGHa8LjduXJTob.jpg",
    backdrop_path: "/fNylhsaQjgenBJBh1kGsmVGjTFG.jpg",
    release_date: "2025-04-11",
    vote_average: 7.0,
    vote_count: 200,
    genre_ids: [28, 53],
    media_type: "movie",
    original_language: "en",
    popularity: 400,
  },
  {
    id: 1241982,
    title: "Moana 2",
    overview: "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania.",
    poster_path: "/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg",
    backdrop_path: "/tElnmtQ6yz1PjN1kePNl8yMB2IQ.jpg",
    release_date: "2024-11-21",
    vote_average: 7.0,
    vote_count: 1400,
    genre_ids: [16, 12, 10751],
    media_type: "movie",
    original_language: "en",
    popularity: 680,
  },
];

export const SAMPLE_HERO: MediaItem = {
  id: 693134,
  title: "Dune: Part Two",
  overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
  poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  release_date: "2024-02-27",
  vote_average: 8.2,
  vote_count: 6800,
  genre_ids: [878, 12, 18],
  media_type: "movie",
  original_language: "en",
  popularity: 700,
};
