export interface SearchMovieDataType {
  Genre: string;
  row_id: number;
  IMDB_Rating: number;
  Poster_Link: string;
  Released_Year: string;
  Series_Title: string;
}

export interface SearchMovieResponse {
  total: number;
  movies: SearchMovieDataType[];
}