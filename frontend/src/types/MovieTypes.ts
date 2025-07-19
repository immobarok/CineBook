export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  _id: string;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  original_language: string;
  genres: Genre[];
  release_date: string;
  runtime: number;
  tagline?: string;
};
