import { type MovieDetailDataType } from "@/types/MovieDetailDataType";
// import { mockData } from "@/mocks/MovieDetailData";

export const fetchData = async (row_id: number): Promise<MovieDetailDataType> => {
  const res = await fetch(`http://localhost:5000/movie_details/${row_id}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return (await res.json()) as MovieDetailDataType;
  
  // return new Promise((resolve) => {
  //   setTimeout(() => resolve(mockData), 0); // Change delay to simulate loading
  // });
};