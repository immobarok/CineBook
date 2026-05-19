import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import Movies from "../pages/movies/Movies";
import MovieDetails from "../pages/movieDetails/MovieDetails";
import SeatLayout from "../pages/seatLayout/SeatLayout";
import MyBooking from "../pages/mybooking/MyBooking";
import Favourite from "../pages/Favourite/Favourite";
import Release from "../pages/release/Release";
import Theaters from "../pages/theaters/Theaters";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../admin/Dashboard";
import AddShow from "../admin/AddShow";
import ListShow from "../admin/ListShow";
import ListBooking from "../admin/ListBooking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "movies", Component: Movies },
      { path: "movies/:id", Component: MovieDetails },
      { path: "movies/:id/:date", Component: SeatLayout },
      { path: "myBooking", Component: MyBooking },
      { path: "release", Component: Release },
      { path: "theaters", Component: Theaters },
      { path: "favorites", Component: Favourite },
    ],
  },
  {
    path: "admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "addShow", Component: AddShow },
      { path: "listShow", Component: ListShow },
      { path: "listBooking", Component: ListBooking },
    ],
  },
]);

