import { useEffect } from "react";
import { Heart, Ticket } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { dummyShowsData } from "../../assets/assets";
import MovieCard from "../../shared/MovieCard";

const Favourite = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quad",
    });
  }, []);

  const favourites = dummyShowsData.slice(0, 4);

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-16 lg:px-32 overflow-hidden">
      <div className="absolute w-[28rem] h-[28rem] rounded-full bg-primary/15 blur-3xl -top-40 -right-40 -z-10" />
      <div className="absolute w-[22rem] h-[22rem] rounded-full bg-secondary/20 blur-3xl bottom-10 -left-32 -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12" data-aos="fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.2em] text-gray-300">
              <Heart className="h-3.5 w-3.5 text-primary" />
              Saved Picks
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">
              Your Favourite <span className="text-primary">Movies</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-xl">
              Keep track of the titles you love and jump straight into showtimes.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm transition-colors">
            <Ticket size={16} className="text-primary" />
            Book from Favourites
          </button>
        </div>

        {favourites.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-aos="fade-up">
            {favourites.map((movie, index) => (
              <div
                key={movie._id}
                data-aos="fade-up"
                data-aos-delay={150 + index * 100}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16" data-aos="fade-up">
            <div className="mx-auto w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No favourites yet</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Browse movies and tap the heart icon to build your personal watchlist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;