import { type RandomMovieDataType } from "@/types/RandomMovieDataType";
import { mockData } from "@/mocks/RandomMovieData";

export const fetchData = async (limit: number): Promise<RandomMovieDataType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 0); // Change delay to simulate loading
  });
};