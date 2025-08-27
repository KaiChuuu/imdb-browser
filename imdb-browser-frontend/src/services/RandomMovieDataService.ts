import { type RandomMovieDataType } from "@/types/RandomMovieDataType";
import { mockData } from "@/mocks/RandomMovieData";

export const fetchData = async (limit: number): Promise<RandomMovieDataType[]> => {
  try {
    const res = await fetch(`http://localhost:5000/movies/random/${limit}`);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return (await res.json()) as RandomMovieDataType[];
  } catch(err) {
    console.error("Falling back to mock data:", err);
    return mockData;
  }
};