import { type SearchMovieResponse } from "@/types/SearchMovieDataType";
import { mockData } from "@/mocks/SearchMovieData";

interface SearchMovieParams {
  movies: number;
  currentPage: number;
  title: string;
}

export const fetchData = async ({
  movies,
  currentPage,
  title,
}: SearchMovieParams): Promise<SearchMovieResponse> => {
  try {
    const query = new URLSearchParams();
    query.append("limit", movies.toString());
    query.append("page", currentPage.toString());

    const res = await fetch(`http://localhost:5000/movie_details/search/${title}?${query.toString()}`);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return (await res.json()) as SearchMovieResponse;
  } catch(err) {
    console.error("Falling back to mock data:", err);
    const paginatedData = mockData.movies.slice(0, movies);
  
    return {
      total: mockData.total,
      movies: paginatedData,
    } as SearchMovieResponse;
  }
};