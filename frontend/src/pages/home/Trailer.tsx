import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { dummyTrailers } from "../../assets/assets";
import {
  PlayCircleIcon,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Trailer = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quad",
    });
  }, []);

  const handleTrailerChange = (trailer:any) => {
    setCurrentTrailer(trailer);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const currentIndex = dummyTrailers.findIndex(
      (t) => t.videoUrl === currentTrailer.videoUrl
    );
    const nextIndex = (currentIndex + 1) % dummyTrailers.length;
    handleTrailerChange(dummyTrailers[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = dummyTrailers.findIndex(
      (t) => t.videoUrl === currentTrailer.videoUrl
    );
    const prevIndex =
      (currentIndex - 1 + dummyTrailers.length) % dummyTrailers.length;
    handleTrailerChange(dummyTrailers[prevIndex]);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReady = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative py-16 px-6 md:px-16 lg:px-32 overflow-hidden">
      <div className="flex flex-col items-center mb-12" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-primary rounded-full"></div>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase">
            Latest Trailers
          </h2>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Watch the Latest <span className="text-primary">Movie Trailers</span>
        </h1>
      </div>

      <div className="relative" data-aos="fade-up" data-aos-delay="100">
        <div className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl top-1/2 -right-40 -translate-y-1/2 -z-10"></div>
        <div className="absolute w-64 h-64 rounded-full bg-secondary/10 blur-2xl bottom-0 -left-20 -z-10"></div>
        <div className="relative aspect-video w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-gray-900">
          <ReactPlayer
            ref={playerRef}
            src={currentTrailer.videoUrl}
            playing={isPlaying}
            muted={isMuted}
            width="100%"
            height="100%"
            controls={false}
            className="absolute top-0 left-0"
            onReady={handleReady}
            onClick={handlePlayPause}
          />

          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              onClick={handlePlayPause}
            >
              <PlayCircleIcon
                className="w-16 h-16 md:w-20 md:h-20 text-white hover:text-primary transition-colors"
                strokeWidth={1.5}
              />
            </div>
          )}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all z-10"
            aria-label="Previous trailer"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all z-10"
            aria-label="Next trailer"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute right-4 bottom-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all z-10"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
            <h3 className="text-xl font-bold text-white">
              {currentTrailer.title}
            </h3>
          </div>
        </div>
      </div>
      <div
        className="mt-12 max-w-7xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ml-4 md:ml-4 xl:ml-15">
          {dummyTrailers.map((trailer) => (
            <div
              key={trailer.videoUrl}
              className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                currentTrailer.videoUrl === trailer.videoUrl
                  ? "ring-4 ring-primary scale-105"
                  : "opacity-80 hover:opacity-100 hover:scale-102"
              }`}
              onClick={() => handleTrailerChange(trailer)}
            >
              <img
                src={trailer.image}
                alt={trailer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayCircleIcon
                  className={`w-8 h-8 ${
                    currentTrailer.videoUrl === trailer.videoUrl
                      ? "text-primary"
                      : "text-white"
                  }`}
                  strokeWidth={1.5}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-medium truncate">
                  {trailer.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trailer;
