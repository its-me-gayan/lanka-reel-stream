import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Film, Menu, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/hooks/use-movies";
import { getImageUrl } from "@/lib/tmdb";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { data: searchResults } = useSearch(searchQuery);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResultClick = (item: any) => {
    const type = item.media_type || "movie";
    navigate(`/watch/${type}/${item.id}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const getTitle = (item: any) => item.title || item.name || "Untitled";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-surface shadow-lg"
            : "bg-gradient-to-b from-background/80 to-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary flex items-center justify-center glow-gold">
                <Film className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl sm:text-3xl text-gradient-gold tracking-wider">
                CEYLON<span className="text-foreground">FLIX</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/browse/movie" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                Movies
              </Link>
              <Link to="/browse/tv" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                TV Shows
              </Link>
              <Link to="/pricing" className="text-sm font-medium text-primary hover:text-gold-light transition-colors flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" />
                Plans
              </Link>
            </div>

            {/* Search + Mobile Menu */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-primary transition-colors hover:bg-secondary"
              >
                {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-primary transition-colors hover:bg-secondary"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border/30"
            >
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies, TV shows..."
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Search Results */}
                {searchResults && searchResults.length > 0 && (
                  <div className="mt-3 max-h-80 overflow-y-auto rounded-xl bg-card border border-border">
                    {searchResults.slice(0, 8).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleResultClick(item)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors text-left"
                      >
                        <img
                          src={getImageUrl(item.poster_path, "w92")}
                          alt={getTitle(item)}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{getTitle(item)}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {item.media_type || "movie"} •{" "}
                            {("release_date" in item ? item.release_date : (item as any).first_air_date)?.slice(0, 4)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border/30"
            >
              <div className="px-4 py-4 flex flex-col gap-3 bg-card/95 backdrop-blur-md">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-foreground/80 hover:text-primary py-2">Home</Link>
                <Link to="/browse/movie" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-foreground/80 hover:text-primary py-2">Movies</Link>
                <Link to="/browse/tv" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-foreground/80 hover:text-primary py-2">TV Shows</Link>
                <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-primary hover:text-gold-light py-2 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  Plans & Pricing
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
