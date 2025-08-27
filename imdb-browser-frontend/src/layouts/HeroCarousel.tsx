import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchData } from "@/services/RandomMovieDataService";
import { type RandomMovieDataType } from "@/types/RandomMovieDataType";

import Poster from "@/components/common/Poster";

import StarIcon from "@/assets/icons/star-solid.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";
import LeftArrowIcon from "@/assets/icons/left-arrow.svg?react";

function HeroCarousel() {
  const [data, setData] = useState<RandomMovieDataType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const movies = 10;

  useEffect(() => {
    fetchData(movies).then(setData);
  }, [movies]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [isHovered, currentIndex, data.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 py-15"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data.map((item, index) => (
          <div
            className="flex justify-center w-full flex-shrink-0 px-30"
            key={index}
          >
            <div
              className="relative flex flex-wrap py-[clamp(2rem,5%,4rem)] px-[clamp(1rem,5%,6.25rem)] gap-15 bg-stripes border rounded"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link
                to={`/detail/${item.row_id}`}
                state={{ genres: item.Genre }}
                className="border border-white/50 min-w-[256px] h-[398px]"
              >
                <Poster width="16rem" height="100%" src={item.Poster_Link} />
              </Link>

              <div className="ml-4 max-w-lg flex flex-col h-full justify-start xl:justify-between">
                <div>
                  <Link
                    to={`/detail/${item.row_id}`}
                    state={{ genres: item.Genre }}
                    className="mt-5 text-base-xl hover:underline underline-offset-5"
                  >
                    {item.Series_Title.toUpperCase()} ({item.Released_Year})
                  </Link>

                  {/* TAGS */}
                  <div className="mt-5 flex flex-wrap gap-5">
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

                <Link
                  to={`/detail/${item.row_id}`}
                  state={{ genres: item.Genre }}
                  className="mt-5 xl:mt-0 mb-0 xl:mb-5 text-base-lg self-start rounded px-3 py-2 btn-default"
                >
                  MORE DETAILS
                </Link>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-[-5rem] top-1/2 -translate-y-1/2 btn-default rounded hidden md:block"
              >
                <LeftArrowIcon className="h-13 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-[-5rem] top-1/2 -translate-y-1/2 btn-default rounded hidden md:block"
              >
                <LeftArrowIcon className="h-13 rotate-180 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
