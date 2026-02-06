import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import MovieCard from "@/components/MovieCard";
import type { MediaItem } from "@/types/movie";

interface MovieRowProps {
  title: string;
  movies: MediaItem[];
  isLoading?: boolean;
}

const MovieRow = ({ title, movies, isLoading }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!movies?.length && !isLoading) return null;

  return (
    <section className="relative py-4 sm:py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl sm:text-3xl text-foreground mb-5 tracking-wide"
        >
          {title}
        </motion.h2>
      </div>

      <div className="relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Movies */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar pl-4 sm:pl-6 lg:pl-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] pr-4"
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[160px] sm:w-[200px]"
                >
                  <div className="aspect-[2/3] rounded-xl bg-secondary animate-pulse" />
                  <div className="h-4 w-3/4 bg-secondary rounded mt-3 animate-pulse" />
                  <div className="h-3 w-1/2 bg-secondary rounded mt-2 animate-pulse" />
                </div>
              ))
            : movies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;
