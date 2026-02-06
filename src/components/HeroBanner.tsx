import { motion } from "framer-motion";
import { Play, Info, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getBackdropUrl } from "@/lib/tmdb";
import { useHeroMovie } from "@/hooks/use-movies";
import { MOVIE_GENRES } from "@/types/movie";

const HeroBanner = () => {
  const hero = useHeroMovie();
  const navigate = useNavigate();

  const title = "title" in hero ? hero.title : (hero as any).name || "Featured";
  const genreNames = hero.genre_ids
    .map((id) => MOVIE_GENRES.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .slice(0, 3);

  const handleWatch = () => {
    const type = hero.media_type || "movie";
    navigate(`/watch/${type}/${hero.id}`);
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getBackdropUrl(hero.backdrop_path)}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="max-w-2xl"
        >
          {/* Genre Tags */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 mb-4"
          >
            {genreNames.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30"
              >
                {genre}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.9] text-foreground mb-4 tracking-wide">
            {title}
          </h1>

          {/* Rating + Year */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary">
                {hero.vote_average.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {"release_date" in hero ? hero.release_date?.slice(0, 4) : ""}
            </span>
            <span className="px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground font-medium">
              HD
            </span>
          </div>

          {/* Overview */}
          <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-8 line-clamp-3">
            {hero.overview}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWatch}
              className="flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl glow-gold transition-all hover:brightness-110"
            >
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWatch}
              className="flex items-center gap-2 px-8 py-3.5 glass-surface text-foreground font-semibold rounded-xl transition-all hover:bg-secondary"
            >
              <Info className="w-5 h-5" />
              More Info
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
