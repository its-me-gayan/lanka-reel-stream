import { useState } from "react";
import { motion } from "framer-motion";
import { getVidkingMovieUrl, getVidkingTVUrl } from "@/lib/tmdb";

interface MoviePlayerProps {
  tmdbId: number;
  type: "movie" | "tv";
  title: string;
  season?: number;
  episode?: number;
}

const MoviePlayer = ({ tmdbId, type, title, season = 1, episode = 1 }: MoviePlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const embedUrl =
    type === "movie"
      ? getVidkingMovieUrl(tmdbId)
      : getVidkingTVUrl(tmdbId, season, episode);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-cinema-dark border border-border shadow-2xl"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-cinema-dark z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading {title}...</p>
          </div>
        </div>
      )}
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; encrypted-media; picture-in-picture"
        onLoad={() => setIsLoading(false)}
      />
    </motion.div>
  );
};

export default MoviePlayer;
