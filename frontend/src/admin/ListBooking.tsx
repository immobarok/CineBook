import { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import type { Booking } from "../types/MovieTypes";
import Loader from "./components/Loader";
import moment from "moment";

const ListBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const currency = "$";
  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setLoading(false);
  };
  useEffect(() => {
    getAllBookings();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-start gap-3 mb-4">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <h2 className="text-lg font-semibold tracking-widest text-white uppercase">
            Show <span className="text-primary">List</span>
          </h2>
        </div>
        <div className="max-w-5xl mt-6 overflow-x-auto">
          <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
            <thead>
              <tr className="bg-primary/10 text-left text-white">
                <th className="p-2 font-medium pl-5">User Name</th>
                <th className="p-2 font-medium">Movie Name</th>
                <th className="p-2 font-medium">Show Time</th>
                <th className="p-2 font-medium">Seats</th>
                <th className="p-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              {bookings.map((booking, idx) => (
                <tr
                  key={idx}
                  className="border-b border-primary/15 bg-primary/5 even:bg-primary/10"
                >
                  <td className="p-2 min-w-45 pl-5">{booking.user.name}</td>
                  <td className="p-2">{booking.show.movie.title}</td>
                  <td className="p-2">
                    {moment(booking.show.showDateTime).format("LT")}
                  </td>
                  <td className="p-2">{booking.bookedSeats.join(", ")}</td>
                  <td className="p-2">
                    {currency}
                    {booking.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListBooking;
