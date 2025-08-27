import { type MovieDetailDataType } from "@/types/MovieDetailDataType";
import { mockData } from "@/mocks/MovieDetailData";

export const fetchData = async (row_id: number): Promise<MovieDetailDataType> => {
  try {
    const res = await fetch(`https://imdb-browser-api.onrender.com/movie_details/${row_id}`);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return (await res.json()) as MovieDetailDataType;
  }catch(err) {
    console.error("Falling back to mock data:", err);
    return mockData;
  }
};