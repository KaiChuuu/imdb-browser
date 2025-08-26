import { type SimilarMovieDataType } from "@/types/SimilarMovieDataType";
// import { mockData } from "@/mocks/SimilarMovieData";

interface SimilarMovieParams {
  row_id: number;
  movies: number;
  genre?: string;
}

export const fetchData = async ({row_id, movies, genre}: SimilarMovieParams): Promise<SimilarMovieDataType[]> => {
  const query = new URLSearchParams();
  if (genre) query.append("genre", genre)

  const res = await fetch(
    `http://localhost:5000/movie_details/${row_id}/similar/${movies}?${query.toString()}`
  );
  
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return (await res.json()) as SimilarMovieDataType[];
  
  // return new Promise((resolve) => {
  //   setTimeout(() => resolve(mockData), 0); // Change delay to simulate loading
  // });
};