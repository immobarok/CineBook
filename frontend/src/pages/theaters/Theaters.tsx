import { useEffect } from "react";
import { MapPin, Projector, Star, Ticket, Users } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const theaters = [
  {
    name: "CineBook Grand Plaza",
    city: "New York",
    address: "241 Hudson St, Tribeca",
    screens: 12,
    rating: 4.9,
    seats: "2,200",
    tags: ["IMAX", "Dolby Atmos", "VIP Lounge"],
  },
  {
    name: "CineBook Riverlight",
    city: "Chicago",
    address: "18 Wacker Dr, Loop",
    screens: 9,
    rating: 4.7,
    seats: "1,650",
    tags: ["Laser", "Couples", "4DX"],
  },
  {
    name: "CineBook Pacifica",
    city: "Los Angeles",
    address: "870 Sunset Blvd, West Hollywood",
    screens: 14,
    rating: 4.8,
    seats: "2,500",
    tags: ["IMAX", "Rooftop", "Valet"],
  },
  {
    name: "CineBook Coastline",
    city: "Miami",
    address: "57 Ocean Dr, South Beach",
    screens: 8,
    rating: 4.6,
    seats: "1,300",
    tags: ["Dolby Atmos", "Beach View", "Cafe"],
  },
];

const Theaters = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quad",
    });
  }, []);

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-16 lg:px-32 overflow-hidden">
      <div className="absolute w-[30rem] h-[30rem] rounded-full bg-primary/15 blur-3xl -top-40 -left-32 -z-10" />
      <div className="absolute w-[22rem] h-[22rem] rounded-full bg-secondary/20 blur-3xl bottom-10 -right-24 -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-12" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 bg-primary rounded-full" />
            <h1 className="text-3xl md:text-4xl font-bold">Premium Theaters</h1>
          </div>
          <p className="text-gray-400 max-w-2xl">
            Discover curated cinema spaces with immersive sound, premium seating, and boutique experiences.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2" data-aos="fade-up">
          {theaters.map((theater, index) => (
            <div
              key={theater.name}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-primary/40 transition-all"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-primary mb-2">
                    <MapPin size={16} />
                    {theater.city}
                  </div>
                  <h2 className="text-xl font-semibold text-white">{theater.name}</h2>
                  <p className="text-sm text-gray-400 mt-2">{theater.address}</p>
                </div>
                <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1 rounded-full">
                  <Star size={14} className="text-yellow-400" />
                  {theater.rating}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Projector size={16} className="text-primary" />
                  {theater.screens} Screens
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-primary" />
                  {theater.seats} Seats
                </div>
                <div className="flex items-center gap-2">
                  <Ticket size={16} className="text-primary" />
                  Fast Entry
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {theater.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="mt-6 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm text-white transition-colors">
                View Showtimes
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Theaters;
