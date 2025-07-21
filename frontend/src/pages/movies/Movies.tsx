import { dummyShowsData } from "../../assets/assets";
import MovieCard from "../../shared/MovieCard";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Movies = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quad",
    });
  }, []);

  return dummyShowsData.length > 0 ? (
    <div className="relative py-20 px-6 md:px-16 lg:px-32 xl:px-40 overflow-hidden min-h-[80vh] mt-10">
      <div
        className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl top-0 -right-40 -z-10"
        data-aos="fade-left"
      />
      <div
        className="absolute w-64 h-64 rounded-full bg-secondary/10 blur-2xl bottom-20 -left-20 -z-10"
        data-aos="fade-right"
      />

      {/* Header section */}
      <div className="mb-12 text-center" data-aos="fade-up">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-1 h-8 bg-primary rounded-full"></div>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase">
            Now Showing
          </h2>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Currently Playing <span className="text-primary">Movies</span>
        </h1>
      </div>

      {/* Movies grid */}
      <div
       className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {dummyShowsData.map((movie, index) => (
          <div
            key={movie._id}
            data-aos="fade-up"
            data-aos-delay={300 + index * 100}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* View more button */}
      <div
        className="flex justify-center mt-16"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <button className="px-8 py-3 text-sm bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium rounded-full shadow-lg hover:shadow-primary/30 transition-all">
          View More Movies
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-2xl font-bold text-gray-400 mb-4">No Movies Found</h2>
      <p className="text-gray-500 max-w-md">
        We couldn't find any movies currently showing. Please check back later.
      </p>
    </div>
  );
};

export default Movies;
