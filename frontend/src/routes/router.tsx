import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import Movies from "../pages/movies/Movies";
import MovieDetails from "../pages/movieDetails/MovieDetails";
import SeatLayout from "../pages/seatLayout/SeatLayout";
import MyBooking from "../pages/mybooking/MyBooking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "movies",
        Component: Movies,
      },
      {
        path: "movies/:id",
        Component: MovieDetails,
      },
      {
        path: "movies/:id/:date",
        Component: SeatLayout,
      },
      {
        path: "myBooking",
        Component: MyBooking,
      },
    ],
  },
]);
