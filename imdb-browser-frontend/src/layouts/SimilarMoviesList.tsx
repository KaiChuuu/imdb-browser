import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchData } from "@/services/SimilarMovieDataService";
import { type SimilarMovieDataType } from "@/types/SimilarMovieDataType";

import Poster from "@/components/common/Poster";

import StarIcon from "@/assets/icons/star-solid.svg?react";

interface SimilarMoviesListProps {
  row_id: number;
  genre: string;
}

function SimilarMoviesList({ row_id, genre }: SimilarMoviesListProps) {
  const [data, setData] = useState<SimilarMovieDataType[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [movies, setMoviesPerPage] = useState(10);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth >= 1200) {
      setMoviesPerPage(10);
    } else if (windowWidth >= 900) {
      setMoviesPerPage(8);
    } else if (windowWidth >= 600) {
      setMoviesPerPage(6);
    } else if (windowWidth >= 500) {
      setMoviesPerPage(6);
    } else {
      setMoviesPerPage(2);
    }
  }, [windowWidth]);

  useEffect(() => {
    fetchData({ row_id, movies, genre }).then(setData);
  }, [movies, row_id]);

  return (
    <div className="max-w-[1320px] mx-auto">
      <div className="pt-15 flex justify-center text-base-xl font-bold">
        SIMILAR MOVIES
      </div>

      <div className="my-8 pb-20">
        <div className="flex flex-wrap gap-5 justify-center">
          {data && data.length > 0 ? (
            data.map((item, index) => {
              const poster = item.Poster_Link.replace(
                /\.jpg$/,
                "._V1_UX300.jpg"
              );
              return (
                <Link
                  to={`/detail/${item.row_id}`}
                  state={{ genres: item.Genre }}
                  className="flex flex-col w-60 border border-white/50"
                  key={index}
                >
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
                </Link>
              );
            })
          ) : (
            <div className="flex justify-center items-center w-full py-20 text-base-xl">
              No movies found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimilarMoviesList;
