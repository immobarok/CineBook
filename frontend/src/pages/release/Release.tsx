import { useEffect } from "react";
import { CalendarDays, ChevronRight, Film, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { dummyShowsData } from "../../assets/assets";
import type { Movie } from "../../types/MovieTypes";

const Release = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quad",
    });
  }, []);

  const releases: Movie[] = [...dummyShowsData].sort(
    (a, b) =>
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
  );

  const spotlight = releases[0];

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-16 lg:px-32 overflow-hidden">
      <div className="absolute w-[34rem] h-[34rem] rounded-full bg-primary/15 blur-3xl -top-40 -right-40 -z-10" />
      <div className="absolute w-[26rem] h-[26rem] rounded-full bg-secondary/20 blur-3xl bottom-10 -left-32 -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10" data-aos="fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.2em] text-gray-300">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Upcoming Releases
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">
              Release Calendar <span className="text-primary">2025</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-xl">
              Stay ahead of the crowd with curated premiere dates, spotlight picks, and quick access to tickets.
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm transition-colors"
            onClick={() => navigate("/movies")}
          >
            Explore All Movies <ChevronRight size={18} />
          </button>
        </div>

        {spotlight && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-black/60 via-black/30 to-black/10 border border-white/10 mb-12" data-aos="fade-up">
            <div className="absolute inset-0">
              <img
                src={spotlight.backdrop_path}
                alt={spotlight.title}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            </div>
            <div className="relative flex flex-col lg:flex-row gap-6 p-6 lg:p-10">
              <img
                src={spotlight.poster_path}
                alt={spotlight.title}
                className="w-full max-w-[220px] lg:max-w-[240px] rounded-xl shadow-2xl"
              />
              <div className="flex-1 text-white">
                <div className="flex items-center gap-2 text-sm text-primary mb-3">
                  <Film size={16} />
                  Spotlight Premiere
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {spotlight.title}
                </h2>
                <p className="text-gray-300 mb-4 max-w-2xl">
                  {spotlight.overview}
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {spotlight.genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 text-sm text-gray-200">
                    <CalendarDays size={16} className="text-primary" />
                    {formatDate(spotlight.release_date)}
                  </span>
                  <button
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-sm font-medium hover:opacity-90 transition-opacity"
                    onClick={() => navigate(`/movies/${spotlight._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2" data-aos="fade-up">
          {releases.map((movie, index) => (
            <div
              key={movie._id}
              className="group flex flex-col sm:flex-row gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-primary/50 transition-all"
              data-aos="fade-up"
              data-aos-delay={150 + index * 50}
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full sm:w-36 h-48 sm:h-44 object-cover rounded-xl"
              />
              <div className="flex-1 text-white">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <span className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded-full">
                    {formatDate(movie.release_date)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                  {movie.overview}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {movie.genres.slice(0, 2).map((genre) => (
                    <span
                      key={genre.id}
                      className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <button
                  className="mt-4 text-sm text-white/80 hover:text-primary transition-colors inline-flex items-center gap-2"
                  onClick={() => navigate(`/movies/${movie._id}`)}
                >
                  View details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Release;
