import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";
import type { MediaItem } from "@/types/movie";

interface MovieCardProps {
  movie: MediaItem;
  index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  const navigate = useNavigate();
  const title = "title" in movie ? movie.title : (movie as any).name || "Untitled";
  const type = movie.media_type || "movie";
  const year = ("release_date" in movie ? movie.release_date : (movie as any).first_air_date)?.slice(0, 4);

  const handleClick = () => {
    navigate(`/watch/${type}/${movie.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={handleClick}
      className="group relative flex-shrink-0 w-[160px] sm:w-[200px] cursor-pointer"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-secondary mb-3 shadow-lg">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center glow-gold"
          >
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-0.5" />
          </motion.div>
        </div>
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm">
          <Star className="w-3 h-3 text-primary fill-primary" />
          <span className="text-xs font-semibold text-foreground">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Info */}
      <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground mt-0.5">
        {year} • <span className="capitalize">{type}</span>
      </p>
    </motion.div>
  );
};

export default MovieCard;
