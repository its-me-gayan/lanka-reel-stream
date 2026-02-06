import { Film } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-cinema-dark mt-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Film className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl text-gradient-gold tracking-wider">
                CEYLON<span className="text-foreground">FLIX</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sri Lanka's premier streaming destination. Watch the latest movies and TV shows in HD quality.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-3 tracking-wide">Browse</h3>
            <ul className="space-y-2">
              {["Movies", "TV Shows", "Action", "Comedy", "Drama"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-3 tracking-wide">Help</h3>
            <ul className="space-y-2">
              {["FAQ", "Contact Us", "Terms of Use", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-3 tracking-wide">Languages</h3>
            <ul className="space-y-2">
              {["සිංහල", "தமிழ்", "English"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 CeylonFlix. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Vidking Player • Data from TMDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
