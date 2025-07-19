import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { images } from "../../assets/assets";

const Hero = () => {
  const [currentMovie, setCurrentMovie] = useState(0);

  const featuredMovies = [
    {
      title: "Dune: Part Two",
      description:
        "Paul Atreides unites with the Fremen to wage war against House Harkonnen.",
      rating: "9.2",
      duration: "2h 46m",
    },
    {
      title: "Godzilla x Kong",
      description:
        "The epic next chapter in the Monsterverse pits two titans against a hidden threat.",
      rating: "8.1",
      duration: "1h 55m",
    },
    {
      title: "Furiosa: A Mad Max Saga",
      description:
        "The origin story of renegade warrior Furiosa before her encounter with Max.",
      rating: "8.7",
      duration: "2h 28m",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quad",
    });

    // Rotate featured movies every 5 seconds
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex flex-col items-start justify-center gap-6 px-6 md:px-16 lg:px-32 bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${images.banner})`,
      }}
    >
      {/* Floating elements */}
      <motion.div
        className="absolute top-10 right-10 bg-white/10 backdrop-blur-sm rounded-full p-4"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="bg-white/30 rounded-xl w-16 h-16" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 bg-white/10 backdrop-blur-sm rounded-full p-3"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      >
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mt-36">
        <motion.div
          className="inline-block bg-gradient-to-r from-primary to-secondary from- px-4 py-1 rounded-full mb-2.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold tracking-wider">
            PREMIERE CINEMA EXPERIENCE
          </span>
        </motion.div>

        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
          data-aos="fade-right"
        >
          Book Your <span className="text-primary">Cinema</span> Experience
        </h1>

        <p
          className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Discover the magic of movies in premium comfort. Book tickets for the
          latest blockbusters and enjoy exclusive perks with every reservation.
        </p>

        <div
          className="flex flex-wrap gap-4 mb-12"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <motion.button
            className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-4 rounded-lg text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Tickets Now
          </motion.button>

          <motion.button
            className="bg-white/10 backdrop-blur-lg text-white font-bold px-8 py-4 rounded-lg text-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Showtimes
          </motion.button>
        </div>

        {/* Featured Movie Card */}
        <div
          className="bg-black/60 backdrop-blur-lg rounded-xl border border-white/10 p-6 max-w-md"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Now Showing</h3>
            <div className="flex gap-2">
              {featuredMovies.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentMovie ? "bg-primary" : "bg-white/30"
                  }`}
                  onClick={() => setCurrentMovie(index)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-32 flex-shrink-0" />
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">
                {featuredMovies[currentMovie].title}
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                {featuredMovies[currentMovie].description}
              </p>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white font-medium">
                    {featuredMovies[currentMovie].rating}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-white font-medium">
                    {featuredMovies[currentMovie].duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mt-auto py-12"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        {[
          { value: "25K+", label: "Monthly Tickets" },
          { value: "120+", label: "Cinema Locations" },
          { value: "4.9", label: "User Rating" },
          { value: "24/7", label: "Support" },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {stat.value}
            </div>
            <div className="text-gray-300 text-sm uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
