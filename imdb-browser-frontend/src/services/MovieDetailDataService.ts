import { type MovieDetailDataType } from "@/types/MovieDetailDataType";
import { mockData } from "@/mocks/MovieDetailData";

export const fetchData = async (row_id: number): Promise<MovieDetailDataType> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 0); // Change delay to simulate loading
  });
};