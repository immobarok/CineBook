import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { dummyDateTimeData, dummyShowsData } from "../../assets/assets";
import { ArrowRightIcon, ClockIcon, MousePointer2, X } from "lucide-react";
import isoTimeFormat from "./../../lib/isoTimeFormat";
import toast from "react-hot-toast";

interface RouteParams {
  id?: string;
  date?: string;
}

interface ShowTime {
  time: string;
}

interface Show {
  _id: string;
  title: string;
}

interface ShowWithTime {
  movie: Show;
  dateTime: Record<string, ShowTime[]>;
}

const SeatLayout: React.FC = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();

  const groupRow = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<ShowTime | null>(null);
  const [show, setShow] = useState<ShowWithTime | null>(null);

  const getShow = async () => {
    const foundShow = dummyShowsData.find((show) => show._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId: string) => {
    if (!selectedTime) {
      return toast("Select time first!", {
        icon: <X color="#da2525" />,
      });
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can select at most 5 seats!", {
        icon: <X color="#da2525" />,
      });
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row: string, count = 8) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const isSelected = selectedSeats.includes(seatId);
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-10 w-10 text-sm font-medium rounded-lg border transition duration-300 
                ${
                  isSelected
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-900 text-gray-300 border-gray-700 hover:bg-primary/20 hover:text-white"
                }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    getShow();
  }, []);

  return show && date ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-20 md:pt-32 gap-10 overflow-x-hidden">
      <div className="w-full md:w-64 bg-primary/5 border backdrop-blur-lg border-primary/20 rounded-2xl py-8 h-max md:sticky md:top-32 shadow-md">
        <h2 className="text-lg font-semibold px-6 text-white mb-4">
          Available Timings
        </h2>
        <div className="space-y-2">
          {show.dateTime[date].map((item, index) => {
            const isActive = selectedTime?.time === item.time;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 px-6 py-2 rounded-md cursor-pointer transition-colors duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-br from-primary to-purple-700 text-white"
                      : "hover:bg-primary/10 text-gray-300"
                  }`}
                onClick={() => setSelectedTime(item)}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm">{isoTimeFormat(item.time)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="relative flex flex-col items-center w-full">
        {/* Background gradients */}
        <div className="absolute w-96 h-96 rounded-full bg-primary/30 blur-3xl opacity-70 top-0 -right-40 -z-10" />
        <div className="absolute w-64 h-64 rounded-full bg-secondary/30 blur-2xl opacity-60 bottom-20 -left-20 -z-10" />

        <h1 className="text-2xl font-semibold text-white mb-10">
          Select Your Seats
        </h1>

        {/* Seat Rows */}
        <div className="flex flex-col items-center text-xs text-gray-300 space-y-6">
          <div>{groupRow[0].map((row) => renderSeats(row))}</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {groupRow.slice(1).map((group, index) => (
              <div key={index} className="space-y-2">
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>
        <button className="bg-gradient-to-r my-20 from-primary to-secondary text-white font-bold px-6 py-3 rounded-lg text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex gap-2 items-center">
          <MousePointer2 />
          Process To Chekout
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen text-white text-lg">
      Loading...
    </div>
  );
};

export default SeatLayout;
