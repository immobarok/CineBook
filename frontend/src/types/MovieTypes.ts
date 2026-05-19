// src/types/bookingTypes.ts

export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  _id: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: Genre[];
  release_date: string;
  original_language?: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  tagline?: string;
};

export type Show = {
  _id: string;
  movie: Movie;
  showDateTime: string;
  showPrice: number;
};

export type Booking = {
  _id: string;
  user: {
    name: string;
  };
  show: Show;
  amount: number;
  bookedSeats: string[];
  isPaid: boolean;
};

export type Cast = {
  name: string;
  profile_path: string;
};

export type DateType={
  time:string;
  showId:string;
}
