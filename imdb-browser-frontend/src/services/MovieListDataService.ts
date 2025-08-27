import { type MovieListResponse } from "@/types/MovieListDataType";
import { mockData } from "@/mocks/MovieListData";

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
  try {
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

    const res = await fetch(`https://imdb-browser-api.onrender.com/movies/?${query.toString()}`);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return (await res.json()) as MovieListResponse;
  } catch(err) {  
    console.error("Falling back to mock data:", err);
    const paginatedData = mockData.movies.slice(0, movies);
  
    return {
      total: mockData.total,
      movies: paginatedData,
    } as MovieListResponse;
  }
};