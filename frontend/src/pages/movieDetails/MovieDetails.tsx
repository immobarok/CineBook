import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  PlayCircle,
  Clock,
  Star,
  Calendar,
  Ticket,
  Heart,
  ChevronLeft,
  User,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { dummyDateTimeData, dummyShowsData } from "../../assets/assets";
import ChooseDate from "./ChooseDate";
import Loader from "../../shared/Loader";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  casts: any;
  _id: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: Genre[];
  vote_average?: number;
  runtime?: number;
  release_date?: string;
  tagline?: string;
}

interface Showtime {
  time: string;
  showId: string;
}

interface ShowData {
  movie: Movie;
  dateTime: Record<string, Showtime[]>;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState<ShowData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    Object.keys(dummyDateTimeData)[0]
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quad",
    });

    const getShow = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const movie = dummyShowsData.find((show) => show._id === id);
      if (movie) {
        setShow({
          movie: {
            ...movie,
            vote_average: movie.vote_average || 7.5, // Default if missing
            runtime: movie.runtime || 120, // Default if missing
            release_date: movie.release_date || "2025-07-24", // Default if missing
          },
          dateTime: dummyDateTimeData,
        });
      }
      setIsLoading(false);
    };

    getShow();
  }, [id]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!show) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Movie Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The movie you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/movies")}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative pt-20">
        {/* Backdrop Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <img
            src={show.movie.backdrop_path}
            alt={show.movie.title}
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <button
            className="flex items-center gap-2 text-white hover:text-primary mb-8 transition-colors"
            onClick={() => navigate(-1)}
            data-aos="fade-right"
          >
            <ChevronLeft size={20} />
            <span>Back to Movies</span>
          </button>

          {/* Movie Header */}
          <div className="flex flex-col lg:flex-row gap-8" data-aos="fade-up">
            {/* Poster */}
            <div className="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={show.movie.poster_path}
                  alt={show.movie.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-white">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                    {show.movie.title}
                  </h1>

                  {show.movie.tagline && (
                    <p
                      className="text-lg text-gray-300 italic mb-4"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      "{show.movie.tagline}"
                    </p>
                  )}

                  <div
                    className="flex flex-wrap gap-4 mb-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {show.movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex flex-wrap gap-6 mb-6"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-400" size={18} />
                      <span>{show.movie.vote_average?.toFixed(1)}/10</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      <span>{formatRuntime(show.movie.runtime || 120)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>
                        {formatDate(show.movie.release_date || "2025-07-24")}
                      </span>
                    </div>
                  </div>

                  <p
                    className="text-gray-300 mb-8 max-w-3xl"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    {show.movie.overview}
                  </p>
                </div>

                <div
                  className="flex flex-wrap gap-4"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium hover:opacity-90 transition-opacity">
                    <PlayCircle size={20} />
                    Watch Trailer
                  </button>
                  <a
                    href="#booknow"
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg font-medium hover:bg-white/20 transition-colors"
                  >
                    <Ticket size={20} />
                    Buy Ticket
                  </a>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg font-medium hover:bg-white/20 transition-colors">
                    <Heart size={20} />
                    Favorite
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 text-white" data-aos="fade-up">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Ticket size={24} />
              <span>Showtimes</span>
            </h2>
            <div
              className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide"
              data-aos="fade-up"
            >
              {Object.keys(show.dateTime).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedDate === date
                      ? "bg-primary text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>
            {/* Your favourite cart */}
            <div className="mt-12" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-primary rounded-full"></div>
                <h2 className="text-xl font-bold text-white">Starring Cast</h2>
              </div>

              <div className="relative">
                <div className="overflow-x-auto hide-scrollbar pb-6">
                  <div className="flex gap-6 w-max px-4">
                    {show.movie.casts
                      .slice(0, 12)
                      .map((cast: any, index: string) => (
                        <div
                          key={index}
                          className="flex flex-col items-center gap-3 w-24 flex-shrink-0 group"
                        >
                          <div className="relative rounded-full overflow-hidden h-20 w-20 border-2 border-transparent group-hover:border-primary transition-all duration-300">
                            {cast.profile_path ? (
                              <img
                                src={cast.profile_path}
                                alt={cast.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                <User className="text-gray-500" size={32} />
                              </div>
                            )}
                          </div>
                          <div className="text-center">
                            <p className="text-white font-medium text-sm truncate w-full">
                              {cast.name}
                            </p>
                            {cast.character && (
                              <p className="text-gray-400 text-xs mt-1 truncate w-full">
                                {cast.character}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="booknow">
            <ChooseDate dateTime={show.dateTime} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
