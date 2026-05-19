import { useEffect, useState } from "react";
import { dummyShowsData } from "../assets/assets";
import Loader from "../shared/Loader";
import moment from "moment";

type OccupiedSeats = {
  [seatNumber: string]: string;
};

type Movie = {
  _id: string;
  name: string;
  image: string;
  title?: string;
  [key: string]: any;
};

type Show = {
  movie: Movie;
  showDateTime: string;
  showPrice: number;
  occupiedSeats: OccupiedSeats;
};

const ListShow = () => {
  const currency = "$";
 const [shows, setShows] = useState<Show[]>([]);
 const [loading, setLoading] = useState<boolean>(true);

  const getAllShows = async () => {
    try {
      // Example fetch or mock data
      const dummyShow: Show = { 
        movie: dummyShowsData[0],
        showDateTime: "2025-06-30T02:30:00.000Z",
        showPrice: 59,
        occupiedSeats: {
          A1: "user_1",
          B1: "user_2",
          C1: "user_3",
        },
      };

      setShows([dummyShow]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load shows:", error);
    }
  };

   useEffect(() => {
     getAllShows();
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
                <th className="p-2 font-medium pl-5">Movie Name</th>
                <th className="p-2 font-medium">Show Time</th>
                <th className="p-2 font-medium">Total Booking</th>
                <th className="p-2 font-medium">Earnings</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              {shows.map((show, idx) => (
                <tr key={idx} className="border-b border-primary/15 bg-primary/5 even:bg-primary/10">
                  <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
                  <td className="p-2">
                    {moment(show.showDateTime).format("LT")}
                  </td>
                  <td className="p-2">
                    {Object.keys(show.occupiedSeats).length}
                  </td>
                  <td className="p-2">
                    {currency}
                    {Object.keys(show.occupiedSeats).length * show.showPrice} 
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

export default ListShow;
