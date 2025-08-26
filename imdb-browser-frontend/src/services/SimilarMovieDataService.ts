import { type SimilarMovieDataType } from "@/types/SimilarMovieDataType";
import { mockData } from "@/mocks/SimilarMovieData";

export const fetchData = async (row_id: number, limit: number): Promise<SimilarMovieDataType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 0); // Change delay to simulate loading
  });
};