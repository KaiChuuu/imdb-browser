import { type MovieListDataType } from "@/types/MovieListDataType";
import { mockData } from "@/mocks/MovieListData";

export const fetchData = async (): Promise<MovieListDataType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 0); // Change delay to simulate loading
  });
};