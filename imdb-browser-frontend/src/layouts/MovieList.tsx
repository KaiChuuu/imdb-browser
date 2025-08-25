import { useState, useEffect } from "react";

import { fetchData } from "@/services/MovieListDataService";
import { type MovieListDataType } from "@/types/MovieListDataType";

import Poster from "@/components/common/Poster";
import Dropdown from "@/components/common/Dropdown";

import { genres } from "@/data/genres";
import { years } from "@/data/years";
import { ratings } from "@/data/ratings";
import { sorting } from "@/data/sorting";

import StarIcon from "@/assets/icons/star-solid.svg?react";

function MovieList() {
  const [data, setData] = useState<MovieListDataType[]>([]);

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  const [sortRating, setSortRating] = useState("ASC");
  const [sortYear, setSortYear] = useState("ASC");

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const updateList = () => {};

  return (
    <div className="max-w-[1320px] mx-auto">
      <div className="flex justify-center text-base-xl font-bold">MOVIES</div>

      <div className="flex mt-6 bg-red text-base-xl text-white px-5 py-4 rounded items-center justify-between">
        <div className="flex gap-20">
          <div className="flex gap-5">
            <Dropdown
              placeholder="Select Genres"
              selected={genre}
              setSelected={setGenre}
              options={genres}
            />
            <Dropdown
              placeholder="Select Year"
              selected={year}
              setSelected={setYear}
              options={years}
            />
            <Dropdown
              placeholder="Select Rating"
              selected={rating}
              setSelected={setRating}
              options={ratings}
            />
          </div>

          <div className="flex gap-5">
            <Dropdown
              title="Sort Rating"
              selected={sortRating}
              setSelected={setSortRating}
              options={sorting}
            />
            <Dropdown
              title="Sort Year"
              selected={sortYear}
              setSelected={setSortYear}
              options={sorting}
            />
          </div>
        </div>

        <div className="flex">
          <button
            onClick={updateList}
            className="text-base-lg self-start rounded px-3 py-2 btn-default"
          >
            SUBMIT
          </button>
        </div>
      </div>

      <div className="my-8">
        <div className="flex flex-wrap gap-5 justify-center">
          {data.map((item, index) => {
            const poster = item.Poster_Link.replace(/\.jpg$/, "._V1_UX300.jpg");
            return (
              <div className="flex flex-col w-60" key={index}>
                <div className="relative w-full">
                  <Poster height="22.5rem" src={poster} />

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

export default MovieList;
