import { ChevronRight, Clapperboard, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { dummyShowsData } from "../../assets/assets";
import MovieCard from "../../shared/MovieCard";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Feature = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quad",
    });
  }, []);

  return (
    <div className="px-6 md:px-24 lg:px-32 overflow-hidden relative py-16">
      <div
        className="absolute w-96 h-96 rounded-full bg-primary/30 blur-3xl opacity-70 top-0 -right-40 -z-10 animate-none"
        data-aos="fade-left"
      />
      <div
        className="absolute w-64 h-64 rounded-full bg-secondary/30 blur-2xl opacity-60 bottom-20 -left-20 -z-10 animate-none"
        data-aos="fade-right"
      />

      <div className="relative flex flex-col">
        {/* Header section */}
        <div className="flex justify-between items-center" data-aos="fade-up">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Clapperboard color="#FF3860" strokeWidth={1.5} size={24} />
            </div>
            <p className="text-lg font-medium text-white">
              Checkout top movies
            </p>
          </div>
          <button
            className="flex gap-2 items-center text-white hover:text-primary transition-colors"
            onClick={() => navigate("/movies")}
            data-aos="fade-left"
            data-aos-delay="200"
          >
            View All <ChevronRight size={20} />
          </button>
        </div>

        {/* Title section */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-4xl md:text-5xl font-bold mt-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Top Movies in Theater
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Star className="text-yellow-400 fill-yellow-400" size={18} />
            <p className="text-gray-400">Highest rated by our audience</p>
          </div>
        </div>

        {/* Movies grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {dummyShowsData.slice(0, 4).map((show, index) => (
            <div
              key={show._id}
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
            >
              <MovieCard movie={show} />
            </div>
          ))}
        </div>
        <div
          className="flex justify-center mt-16"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <button
            onClick={() => {
              navigate("/movies");
              window.scrollTo(0, 0);
            }}
            className="px-12 py-3 text-sm bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all font-medium cursor-pointer rounded-full flex gap-2 items-center shadow-lg hover:shadow-primary/30 relative overflow-hidden group"
          >
            <span className="relative z-10">Show More Movies</span>
            <ChevronRight className="relative z-10" size={18} />
            <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
