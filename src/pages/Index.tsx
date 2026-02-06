import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import {
  useTrending,
  usePopularMovies,
  useTopRatedMovies,
  useNowPlaying,
  useBollywood,
  useTamilMovies,
} from "@/hooks/use-movies";

const Index = () => {
  const { data: trending, isLoading: trendingLoading } = useTrending();
  const { data: popular, isLoading: popularLoading } = usePopularMovies();
  const { data: topRated, isLoading: topRatedLoading } = useTopRatedMovies();
  const { data: nowPlaying, isLoading: nowPlayingLoading } = useNowPlaying();
  const { data: bollywood, isLoading: bollywoodLoading } = useBollywood();
  const { data: tamil, isLoading: tamilLoading } = useTamilMovies();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroBanner />

      <div className="-mt-16 relative z-10 space-y-2">
        <MovieRow
          title="🔥 Trending Now"
          movies={trending || []}
          isLoading={trendingLoading}
        />
        <MovieRow
          title="🎬 Now Playing"
          movies={nowPlaying || []}
          isLoading={nowPlayingLoading}
        />
        <MovieRow
          title="⭐ Top Rated"
          movies={topRated || []}
          isLoading={topRatedLoading}
        />
        <MovieRow
          title="🍿 Popular Movies"
          movies={popular || []}
          isLoading={popularLoading}
        />
        {bollywood && bollywood.length > 0 && (
          <MovieRow
            title="🇮🇳 Bollywood"
            movies={bollywood}
            isLoading={bollywoodLoading}
          />
        )}
        {tamil && tamil.length > 0 && (
          <MovieRow
            title="🎭 Tamil Cinema"
            movies={tamil}
            isLoading={tamilLoading}
          />
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Index;
