import { useState, useEffect } from "react";

import { fetchData } from "@/services/SimilarMovieDataService";
import { type SimilarMovieDataType } from "@/types/SimilarMovieDataType";

import Poster from "@/components/common/Poster";

import StarIcon from "@/assets/icons/star-solid.svg?react";

interface SimilarMoviesListProps {
  row_id: number;
}

function SimilarMoviesList({ row_id }: SimilarMoviesListProps) {
  const [data, setData] = useState<SimilarMovieDataType[]>([]);

  const movies = 10;

  useEffect(() => {
    fetchData(row_id, movies).then(setData);
  }, [row_id, movies]);

  return (
    <div className="max-w-[1320px] mx-auto">
      <div className="flex justify-center text-base-xl font-bold">
        SIMILAR MOVIES
      </div>

      <div className="my-8">
        <div className="flex flex-wrap gap-5 justify-center">
          {data.map((item, index) => {
            const poster = item.Poster_Link.replace(/\.jpg$/, "._V1_UX300.jpg");
            return (
              <div className="flex flex-col w-60" key={index}>
                <div className="relative w-full">
                  <Poster width="100%" height="22.5rem" src={poster} />

                  <div className="flex gap-1 leading-none absolute top-2 right-2 bg-grey px-2 py-1 rounded">
                    <StarIcon className="w-5 h-5 text-yellow" />
                    <span className="text-base-lg leading-none">
                      {item.IMDB_Rating} / 10
                    </span>
                  </div>

                  <div className="absolute text-base-lg leading-none bottom-2 left-2 bg-grey px-2 py-1 rounded">
                    {item.Released_Year}
                  </div>
                </div>
                <span className="p-1 bg-red text-base-md truncate">
                  {item.Series_Title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SimilarMoviesList;
