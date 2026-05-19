import React from "react";
import "aos/dist/aos.css";
import type { Movie } from "../types/MovieTypes";
import { useNavigate } from "react-router";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const language = (movie.original_language || "EN").toUpperCase();
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div
      className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/20
             flex flex-col h-full min-h-[350px] max-h-[450px]"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden h-80">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-black/80 text-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-primary">
          <span className="font-bold text-sm">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3
            className="text-lg font-bold text-white truncate"
            title={movie.title}
          >
            {movie.title}
          </h3>
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
            {language}
          </span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-3">
          {movie.genres.slice(0, 3).map((genre) => (
            <span
              key={genre.id}
              className="text-xs text-primary bg-primary/10 px-2 py-1 rounded"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formatRuntime(movie.runtime)}</span>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={() => navigate(`/movies/${movie._id}`)}
          className="mt-4 w-full bg-gradient-to-r from-primary to-secondary cursor-pointer text-white py-2 rounded-lg font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Book Tickets
        </button>
      </div>

      {/* Tagline Ribbon */}
      {movie.tagline && (
        <div className="absolute top-0 left-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-br-lg">
          {movie.tagline}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
