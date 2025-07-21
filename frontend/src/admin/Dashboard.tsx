import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  UsersIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyDashboardData } from "../assets/assets";
import Loader from "./components/Loader";
import moment from 'moment'

type DashboardData = {
  totalBookings: number;
  totalRevenue: number;
  activeShows: any[];
  totalUser: number;
};

type DashboardCard = {
  title: string;
  value: string | number;
  icon: any;
};

const Dashboard = () => {
  const currency = "$";

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);

  const dashboardCards: DashboardCard[] = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue}` || `${currency}0`,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center justify-start gap-3 mb-4">
        <div className="w-1 h-8 bg-primary rounded-full" />
        <h2 className="text-lg font-semibold tracking-widest text-white uppercase">
          Admin <span className="text-primary">Dashboard</span>
        </h2>
      </div>
      <div className="absolute w-[10rem] h-[10rem] rounded-full bg-primary/20 blur-3xl top-20 left-30 -z-10" />
      <div className="absolute w-[20rem] h-[20rem] rounded-full bg-primary/25 blur-3xl top-35 right-20 -z-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-6">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg w-full"
          >
            <div>
              <h1 className="text-sm text-white">{card.title}</h1>
              <p className="text-xl font-semibold text-white mt-1">
                {card.value}
              </p>
            </div>
            <card.icon className="w-7 h-7 text-primary" />
          </div>
        ))}
      </div>
      <div className="relative mt-6">
        <p className="text-lg font-bold mb-8">Active Show</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pl-2">
          {dashboardData.activeShows.map((active) => (
            <div
              key={active._id}
              className="group relative bg-primary/10 border border-primary/20 rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 w-52"
            >
              {/* Poster */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={active.movie.poster_path}
                  alt={active.movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Rating */}
                <div className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold border border-primary">
                  {active.movie.vote_average.toFixed(1)}
                </div>
              </div>

              {/* Details */}
              <div className="p-3 flex flex-col gap-1 text-white">
                <p className="text-sm font-semibold truncate">
                  {active.movie.title}
                </p>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>
                    {currency}
                    {active.showPrice}
                  </span>
                  <span>{moment(active.showDateTime).format("LT")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
