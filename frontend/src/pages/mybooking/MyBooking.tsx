import { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import isoTimeFormat from "../../lib/isoTimeFormat";
import moment from "moment";
import {
  Calendar,
  Clock,
  Ticket,
  MapPin,
  ArrowRight,
  Loader2,
  ChevronRight,
} from "lucide-react";

const MyBooking = () => {
  const currency = "$";
  const [bookings, setBooking] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMyBookings = async () => {
    // Simulate API call
    setTimeout(() => {
      setBooking(dummyBookingData);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 min-h-screen mt-20 overflow-hidden">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Decorative elements */}
          <div className="absolute w-[30rem] h-[30rem] rounded-full bg-primary/10 blur-3xl -top-40 -right-40 -z-10" />
          <div className="absolute w-[20rem] h-[20rem] rounded-full bg-secondary/20 blur-3xl bottom-20 -left-20 -z-10" />

          {/* Section Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-10 bg-primary  rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Your Movie Bookings
              </h2>
            </div>
            <p className="text-gray-400 max-w-2xl">
              View, manage, and get ready for your upcoming cinematic
              experiences
            </p>
          </div>

          {/* Booking Cards */}
          <div className="space-y-6">
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <div
                  key={index}
                  className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Movie Poster */}
                    <div className="relative md:w-1/3 lg:w-1/4 p-4">
                      <img
                        src={booking.show.movie.poster_path}
                        alt={`${booking.show.movie.title} Poster`}
                        className="w-full h-full object-cover aspect-video rounded-2xl"
                      />
                      <div className="absolute bottom-6 left-6 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Ticket className="h-3 w-3" />
                        {booking.bookedSeats.length}{" "}
                        {booking.bookedSeats.length > 1 ? "seats" : "seat"}
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-6 flex-1">
                      <div className="flex flex-col h-full">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {booking.show.movie.title}
                          </h3>

                          <div className="flex flex-wrap gap-4 mt-4 mb-6">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>
                                {isoTimeFormat(booking.show.movie.runtime)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>
                                {moment(booking.show.showDateTime).format("LL")}
                              </span>
                              <span className="text-primary">•</span>
                              <span>
                                {moment(booking.show.showDateTime).format("LT")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-700/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="space-y-1">
                            <div className="text-sm text-gray-400">
                              Order #: {booking._id}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">Seats:</span>
                              <span className="font-medium">
                                {booking.bookedSeats.join(", ")}
                              </span>
                            </div>
                          </div>

                          <div className="flex  gap-6 justify-between sm:justify-baseline">
                            <div className="text-right">
                              <div className="text-sm text-gray-400">Total</div>
                              <div className="text-2xl font-bold text-white">
                                {currency}
                                {booking.amount.toFixed(2)}
                              </div>
                            </div>

                            <div>
                              {!booking.isPaid ? (
                                <button className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-6 py-2.5 rounded-lg text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex gap-2">
                                  Pay Now <ChevronRight />
                                </button>
                              ) : (
                                <p className="px-4 bg-primary/20 rounded-2xl text-sm text-center items-center">paid</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <Ticket className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-300 mb-2">
                  No bookings yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Your upcoming movie bookings will appear here once you make a
                  reservation.
                </p>
                <button className="mt-6 px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary rounded-full transition-colors duration-200 font-medium">
                  Browse Movies
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
