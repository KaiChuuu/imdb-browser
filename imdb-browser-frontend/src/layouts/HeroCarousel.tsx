import { useState, useEffect } from "react";

import { fetchData } from "@/services/RandomMovieDataService";
import { type RandomMovieDataType } from "@/types/RandomMovieDataType";

import StarIcon from "@/assets/icons/star-solid.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";

function HeroCarousel() {
  const [data, setData] = useState<RandomMovieDataType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div
      className="flex transition-transform duration-500 py-15"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {data.map((item, index) => (
        <div className="flex justify-center w-full flex-shrink-0" key={index}>
          <div className="flex py-15 px-25 gap-15 bg-stripes">
            <img className="w-64 h-auto" src={item.Poster_Link} />

            <div className="ml-4 max-w-lg flex flex-col h-full justify-between">
              <div>
                <div className="mt-5 text-base-xl">
                  {item.Series_Title.toUpperCase()} ({item.Released_Year})
                </div>

                {/* TAGS */}
                <div className="mt-5 flex gap-5">
                  <div className="px-2 py-1 border rounded inline-flex items-stretch gap-1">
                    <StarIcon className="w-5 h-5 text-yellow" />
                    <span className="text-base-lg leading-none">
                      {item.IMDB_Rating} / 10
                    </span>
                  </div>

                  <div className="px-2 py-1 rounded inline-flex items-center bg-red">
                    <span className="text-base-md font-bold leading-none">
                      {item.Genre.toUpperCase()}
                    </span>
                  </div>

                  <div className="px-2 py-1 border rounded inline-flex items-stretch gap-1">
                    <ClockIcon className="w-5 h-5 text-red" />
                    <span className="text-base-lg leading-none">
                      {item.Runtime}
                    </span>
                  </div>
                </div>

                <div className="mt-5 text-base-lg">{item.Overview}</div>
              </div>

              <button className="mb-5 text-base-lg self-start rounded px-3 py-2 btn-default">
                MORE DETAILS
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HeroCarousel;
