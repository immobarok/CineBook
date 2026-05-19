import { useEffect, useState } from "react";
import { dummyShowsData } from "../assets/assets";
import Loader from "./components/Loader";
import { Check, StarIcon } from "lucide-react";
import { converter } from "../lib/converter";
import isoTimeFormat from "./../lib/isoTimeFormat";
import type { Movie } from "../types/MovieTypes";

const AddShow = () => {
  const currency = "$";
  const [nowPlying, setNowplaying] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [dateTimeSelection, setDateTimeSelection] = useState<
    Record<string, string[]>
  >({});
  const [dateTimeInput, setDateTimeInput] = useState<string>("");
  const [showPrice, setShowPrice] = useState<string>("");

  const fetchNowPlaiyingMovie = async () => {
    setNowplaying(dummyShowsData);
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
    setDateTimeInput("");
  };

  const handleRemoveTime = (date: string, time: string) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = (prev[date] || []).filter((t) => t !== time);

      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  const handleAddShow = () => {
    // Add your logic for submitting the show here
    console.log({
      movieId: selectedMovie,
      price: showPrice,
      showTimes: dateTimeSelection,
    });
  };

  useEffect(() => {
    fetchNowPlaiyingMovie();
  }, []);

  return nowPlying.length > 0 ? (
    <div className="max-w-4xl mx-auto p-4 group">
      <div>
        <div className="flex items-center justify-start gap-3 mb-4">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <h2 className="text-lg font-semibold tracking-widest text-white uppercase">
            Add <span className="text-primary">Shows</span>
          </h2>
        </div>
        <p className="text-base font-semibold my-6">Now Playing Movies</p>
        <div className="pb-4">
          <div className="group grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
            {nowPlying?.map((movie) => (
              <div
                onClick={() => setSelectedMovie(movie.id)}
                key={movie.id}
                className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={movie.poster_path}
                    alt=""
                    className="w-full object-cover brightness-90"
                  />
                  <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                    <p className="flex items-center gap-1 text-gray-400">
                      <StarIcon className="w-4 h-4 text-primary fill-primary" />
                      {movie.vote_average.toFixed(1)}
                    </p>
                    <p className="text-gray-300">
                      {converter(movie.vote_count)} votes
                    </p>
                  </div>
                </div>
                {selectedMovie === movie.id && (
                  <div className="absolute top-2 flex right-2 items-center bg-primary h-6 w-6 rounded">
                    <Check className="w-4 h-4 text-white ml-1" />
                  </div>
                )}

                <p className="text-sm font-semibold text-gray-300 mt-2">
                  {movie.title}
                </p>
                <p className="text-xs font-semibold text-gray-200">
                  {movie.release_date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Input */}
        <div className="mt-8">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Show Price
          </label>
          <div className="flex items-center max-w-sm border border-gray-600 rounded-lg p-2 focus-within:border-primary transition-colors">
            <span className="text-gray-400 mr-2">{currency}</span>
            <input
              min={0}
              type="number"
              value={showPrice}
              onChange={(e) => setShowPrice(e.target.value)}
              placeholder="Enter show price"
              className="outline-none bg-transparent text-white flex-1"
            />
          </div>
        </div>

        {/* Date and Time Input */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Select Date and Time
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 max-w-xs border border-gray-600 rounded-lg p-2 focus-within:border-primary transition-colors">
              <input
                type="datetime-local"
                value={dateTimeInput}
                onChange={(e) => setDateTimeInput(e.target.value)}
                className="outline-none bg-transparent text-white w-full"
              />
            </div>
            <button
              onClick={handleDateTimeAdd}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm rounded-lg transition-colors font-medium"
            >
              Add Time
            </button>
          </div>
        </div>

        {/* Display Selected Times */}
        {Object.keys(dateTimeSelection).length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2 text-gray-300">
              Selected Show Times
            </h3>
            <div className="space-y-2">
              {Object.entries(dateTimeSelection).map(([date, times]) => (
                <div key={date} className="bg-gray-800 rounded-lg p-3">
                  <div className="font-medium text-gray-200 mb-2">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(times as string[]).map((time) => (
                      <div
                        key={time}
                        className="flex items-center bg-gray-700 rounded px-3 py-1.5"
                      >
                        <span className="text-gray-200 mr-2">
                          {isoTimeFormat(`${date}T${time}`)}
                        </span>
                        <button
                          onClick={() => handleRemoveTime(date, time)}
                          className="text-red-400 hover:text-red-300 ml-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          <button
            onClick={handleAddShow}
            className="mt-6 px-8 py-3 bg-gradient-to-r z-100 from-primary to-secondary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity duration-300"
          >
            Add Show
          </button>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default AddShow;
