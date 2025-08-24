import { useState, useEffect } from "react";

import { fetchData } from "@/services/MovieListDataService";
import { type MovieListDataType } from "@/types/MovieListDataType";

function MovieList() {
  const [data, setData] = useState<MovieListDataType[]>([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div>
      <div className="flex justify-center text-base-xl">MOVIES</div>
      <div className="flex mt-4 justify-between bg-red text-base-xl text-white px-5 py-4"></div>

      <div></div>
    </div>
  );
}

export default MovieList;
