import { type SimilarMovieDataType } from "@/types/SimilarMovieDataType";
import { mockData } from "@/mocks/SimilarMovieData";

interface SimilarMovieParams {
  row_id: number;
  movies: number;
  genre?: string;
}

export const fetchData = async ({row_id, movies, genre}: SimilarMovieParams): Promise<SimilarMovieDataType[]> => {
  try {
    const query = new URLSearchParams();
    if (genre) query.append("genre", genre)

    const res = await fetch(
      `https://imdb-browser-api.onrender.com/movie_details/${row_id}/similar/${movies}?${query.toString()}`
    );
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return (await res.json()) as SimilarMovieDataType[];
  } catch(err) {
    console.error("Falling back to mock data:", err);
    return mockData.slice(0, movies);
  }
};