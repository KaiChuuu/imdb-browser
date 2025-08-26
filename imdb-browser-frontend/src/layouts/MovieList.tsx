import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchData } from "@/services/MovieListDataService";
import type {
  MovieListResponse,
  MovieListDataType,
} from "@/types/MovieListDataType";

import Poster from "@/components/common/Poster";
import Dropdown from "@/components/common/Dropdown";

import { genres } from "@/data/genres";
import { years } from "@/data/years";
import { ratings } from "@/data/ratings";
import { sorting } from "@/data/sorting";

import StarIcon from "@/assets/icons/star-solid.svg?react";
import LeftArrowIcon from "@/assets/icons/left-arrow.svg?react";

function MovieList() {
  const [data, setData] = useState<MovieListResponse>();

  const [draftGenre, setDraftGenre] = useState("");
  const [draftYear, setDraftYear] = useState("");
  const [draftRating, setDraftRating] = useState("");
  const [draftSortRating, setDraftSortRating] = useState<"ASC" | "DESC">("ASC");
  const [draftSortYear, setDraftSortYear] = useState<"ASC" | "DESC">("ASC");

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [sortRating, setSortRating] = useState<"ASC" | "DESC">("ASC");
  const [sortYear, setSortYear] = useState<"ASC" | "DESC">("ASC");

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const movies = 20;
  const totalToShow = 10;

  useEffect(() => {
    fetchData({
      movies,
      currentPage,
      genre,
      year,
      rating,
      sortRating,
      sortYear,
    }).then(setData);
  }, [movies, currentPage, genre, year, rating, sortRating, sortYear]);

  const updateList = () => {
    setGenre(draftGenre);
    setYear(draftYear);
    setRating(draftRating);
    setSortRating(draftSortRating);
    setSortYear(draftSortYear);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (data) {
      const totalMovies = data.total;
      setTotalPages(Math.ceil(totalMovies / movies));
    }
  }, [data, movies]);

  const prevPage = () => {
    if (currentPage == 1) return;
    setCurrentPage((page) => page - 1);
  };
  const nextPage = () => {
    if (currentPage == totalPages) return;
    setCurrentPage((page) => page + 1);
  };
  const indexPage = (page: number) => {
    setCurrentPage(page);
  };

  const startPageRange = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(totalToShow / 2),
      totalPages - totalToShow + 1
    )
  );
  const endPageRange = Math.min(totalPages, startPageRange + totalToShow - 1);

  return (
    <div className="max-w-[1320px] mx-auto">
      <div className="flex justify-center text-base-xl font-bold">MOVIES</div>

      <div className="flex mt-6 bg-red text-base-xl text-white px-5 py-4 rounded items-center justify-between">
        <div className="flex gap-20">
          <div className="flex gap-5">
            <Dropdown
              placeholder="Select Genres"
              selected={draftGenre}
              setSelected={setDraftGenre}
              options={genres}
            />
            <Dropdown
              placeholder="Select Year"
              selected={draftYear}
              setSelected={setDraftYear}
              options={years}
            />
            <Dropdown
              placeholder="Select Rating"
              selected={draftRating}
              setSelected={setDraftRating}
              options={ratings}
            />
          </div>

          <div className="flex gap-5">
            <Dropdown
              title="Sort Rating"
              selected={draftSortRating}
              setSelected={(val: string) =>
                setDraftSortRating(val as "ASC" | "DESC")
              }
              options={sorting}
            />
            <Dropdown
              title="Sort Year"
              selected={draftSortYear}
              setSelected={(val: string) =>
                setDraftSortYear(val as "ASC" | "DESC")
              }
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
          {data?.movies.map((item: MovieListDataType, index) => {
            const poster = item.Poster_Link.replace(/\.jpg$/, "._V1_UX300.jpg");
            return (
              <Link
                to={`/detail/${item.row_id}`}
                state={{ genres: item.Genre }}
                className="flex flex-col w-60"
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
          })}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5 pt-2 pb-20">
        {totalPages > totalToShow && (
          <button
            onClick={prevPage}
            className="flex text-base-md w-10 h-10 items-center justify-center rounded btn-default"
          >
            <LeftArrowIcon className="h-6 text-white" />
          </button>
        )}

        {Array.from({ length: endPageRange - startPageRange + 1 }, (_, i) => {
          const page = startPageRange + i;
          return (
            <button
              key={page}
              onClick={() => indexPage(page)}
              className={`flex text-base-md w-10 h-10 items-center justify-center rounded 
            ${page === currentPage ? "bg-red" : "btn-default"}`}
            >
              {page}
            </button>
          );
        })}

        {totalPages > totalToShow && (
          <button
            onClick={nextPage}
            className="flex text-base-md w-10 h-10 items-center justify-center rounded btn-default"
          >
            <LeftArrowIcon className="h-6 rotate-180 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieList;
