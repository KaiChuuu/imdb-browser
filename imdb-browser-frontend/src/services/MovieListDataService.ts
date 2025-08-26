import { type MovieListResponse } from "@/types/MovieListDataType";
// import { mockData } from "@/mocks/MovieListData";

interface MovieListParams {
  movies: number;
  currentPage: number;
  genre?: string;
  year?: string;
  rating?: string;
  sortRating?: "ASC" | "DESC";
  sortYear?: "ASC" | "DESC";
}

export const fetchData = async ({
  movies,
  currentPage,
  genre,
  year,
  rating,
  sortRating,
  sortYear,
}: MovieListParams): Promise<MovieListResponse> => {
  const query = new URLSearchParams();
  query.append("limit", movies.toString());
  query.append("page", currentPage.toString());

  if (genre) query.append("genre", genre);
  if (year) query.append("year", year);
  if (rating) {
    const numericRating = rating.replace(/[^\d.]/g, "");
    query.append("rating", numericRating);
  }
  
  query.append("sort", `rating:${sortRating}`);
  query.append("sort", `year:${sortYear}`);

  const res = await fetch(`http://localhost:5000/movies/?${query.toString()}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return (await res.json()) as MovieListResponse;

  // return new Promise((resolve) => {
  //   setTimeout(() => resolve(mockData), 0); // mock fetch
  // });
};