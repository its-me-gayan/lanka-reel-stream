import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, Calendar, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import MoviePlayer from "@/components/MoviePlayer";
import MovieCard from "@/components/MovieCard";
import Footer from "@/components/Footer";
import { useMovieDetail, useTVDetail } from "@/hooks/use-movies";
import { getBackdropUrl, getImageUrl } from "@/lib/tmdb";
import { SAMPLE_MOVIES, SAMPLE_HERO } from "@/lib/tmdb";
import type { MediaItem } from "@/types/movie";

const WatchPage = () => {
  const { type = "movie", id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);

  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const { data: movieDetail } = useMovieDetail(type === "movie" ? movieId : 0);
  const { data: tvDetail } = useTVDetail(type === "tv" ? movieId : 0);

  const isTV = type === "tv";
  const detail = isTV ? tvDetail : movieDetail;

  // Fallback to sample data
  const sampleMovie = SAMPLE_MOVIES.find((m) => m.id === movieId) || SAMPLE_HERO;
  const title = detail
    ? isTV
      ? (detail as any).name
      : (detail as any).title
    : "title" in sampleMovie
    ? sampleMovie.title
    : (sampleMovie as any).name || "Movie";

  const overview = detail?.overview || sampleMovie.overview;
  const backdrop = detail?.backdrop_path || sampleMovie.backdrop_path;
  const poster = detail?.poster_path || sampleMovie.poster_path;
  const voteAvg = detail?.vote_average || sampleMovie.vote_average;
  const genres = detail && "genres" in detail ? detail.genres : [];
  const cast = detail?.credits?.cast?.slice(0, 8) || [];
  const similar = detail?.similar?.results?.slice(0, 12) || [];
  const seasons = isTV && tvDetail ? tvDetail.seasons?.filter((s) => s.season_number > 0) : [];

  const runtime = !isTV && movieDetail ? movieDetail.runtime : null;
  const releaseDate = !isTV && movieDetail ? movieDetail.release_date : tvDetail?.first_air_date || "";

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Backdrop */}
      <div className="relative w-full h-[40vh] sm:h-[50vh]">
        <img
          src={getBackdropUrl(backdrop)}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-48 sm:-mt-64 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block flex-shrink-0 w-64"
          >
            <img
              src={getImageUrl(poster)}
              alt={title}
              className="w-full rounded-2xl shadow-2xl border border-border"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-wide mb-3">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-sm font-semibold text-primary">{voteAvg.toFixed(1)}</span>
              </div>
              {releaseDate && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{releaseDate.slice(0, 4)}</span>
                </div>
              )}
              {runtime && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{Math.floor(runtime / 60)}h {runtime % 60}m</span>
                </div>
              )}
              {isTV && tvDetail && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{tvDetail.number_of_seasons} Season{tvDetail.number_of_seasons !== 1 ? "s" : ""}</span>
                </div>
              )}
              <span className="px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground font-medium">
                HD
              </span>
            </div>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-6 max-w-3xl">
              {overview}
            </p>

            {/* Season/Episode Selector for TV */}
            {isTV && seasons.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-6">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1.5">Season</label>
                  <select
                    value={selectedSeason}
                    onChange={(e) => {
                      setSelectedSeason(Number(e.target.value));
                      setSelectedEpisode(1);
                    }}
                    className="bg-secondary text-foreground rounded-lg px-4 py-2 text-sm border border-border focus:ring-2 focus:ring-primary/50 outline-none"
                  >
                    {seasons.map((s) => (
                      <option key={s.season_number} value={s.season_number}>
                        Season {s.season_number}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1.5">Episode</label>
                  <select
                    value={selectedEpisode}
                    onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                    className="bg-secondary text-foreground rounded-lg px-4 py-2 text-sm border border-border focus:ring-2 focus:ring-primary/50 outline-none"
                  >
                    {Array.from(
                      { length: seasons.find((s) => s.season_number === selectedSeason)?.episode_count || 10 },
                      (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Episode {i + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* Player */}
            <MoviePlayer
              tmdbId={movieId}
              type={isTV ? "tv" : "movie"}
              title={title}
              season={selectedSeason}
              episode={selectedEpisode}
            />
          </motion.div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-foreground mb-5 tracking-wide">Cast</h2>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
              {cast.map((member) => (
                <div key={member.id} className="flex-shrink-0 w-28 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-secondary mb-2">
                    <img
                      src={getImageUrl(member.profile_path, "w185")}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs font-medium text-foreground truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{member.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-foreground mb-5 tracking-wide">You May Also Like</h2>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
              {similar.map((movie, i) => (
                <MovieCard
                  key={movie.id}
                  movie={{ ...movie, media_type: isTV ? "tv" : "movie" } as MediaItem}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default WatchPage;
