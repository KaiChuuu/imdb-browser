import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchData } from "@/services/SearchMovieDataService";
import type {
  SearchMovieResponse,
  SearchMovieDataType,
} from "@/types/SearchMovieDataType";

import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/NavBar";

import Poster from "@/components/common/Poster";

import StarIcon from "@/assets/icons/star-solid.svg?react";
import LeftArrowIcon from "@/assets/icons/left-arrow.svg?react";
import MovieBackground from "@/components/MovieBackground";

function SearchPage() {
  const [data, setData] = useState<SearchMovieResponse>();
  const { title } = useParams<{ title: string }>();

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [movies, setMoviesPerPage] = useState(20);
  const [totalPaginationButtons, setTotalPaginationButtons] = useState(10);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth >= 1200) {
      setMoviesPerPage(20);
      setTotalPaginationButtons(10);
    } else if (windowWidth >= 900) {
      setMoviesPerPage(12);
      setTotalPaginationButtons(8);
    } else if (windowWidth >= 600) {
      setMoviesPerPage(9);
      setTotalPaginationButtons(5);
    } else if (windowWidth >= 500) {
      setMoviesPerPage(6);
      setTotalPaginationButtons(3);
    } else {
      setMoviesPerPage(2);
      setTotalPaginationButtons(3);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (!title) return;
    fetchData({ movies, currentPage, title }).then(setData);
  }, [movies, currentPage, title]);

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
      currentPage - Math.floor(totalPaginationButtons / 2),
      totalPages - totalPaginationButtons + 1
    )
  );
  const endPageRange = Math.min(
    totalPages,
    startPageRange + totalPaginationButtons - 1
  );

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex flex-1">
          <MovieBackground>
            <div className="max-w-[1320px] mx-auto mb-8 mt-15">
              <div className="flex gap-5 text-base-xl font-bold mb-8 px-5">
                <div>Search Results:</div>
                <div>{title}</div>
              </div>

              <div className="my-50 flex justify-center items-center text-base-xl">
                Loading...
              </div>
            </div>
          </MovieBackground>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <MovieBackground>
          <div className="max-w-[1320px] mx-auto mb-8 mt-15">
            <div className="flex gap-5 text-base-xl font-bold mb-8 px-5">
              <div>Search Results:</div>
              <div>{title}</div>
            </div>
            <div className="flex flex-wrap gap-5 justify-center">
              {data?.movies && data.movies.length > 0 ? (
                data?.movies.map((item: SearchMovieDataType, index) => {
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

          <div className="flex flex-wrap justify-center gap-5 pt-2 pb-20">
            {totalPages > totalPaginationButtons && (
              <button
                onClick={prevPage}
                className="flex text-base-md w-10 h-10 items-center justify-center rounded btn-default"
              >
                <LeftArrowIcon className="h-6 text-white" />
              </button>
            )}

            {Array.from(
              { length: endPageRange - startPageRange + 1 },
              (_, i) => {
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
              }
            )}

            {totalPages > totalPaginationButtons && (
              <button
                onClick={nextPage}
                className="flex text-base-md w-10 h-10 items-center justify-center rounded btn-default"
              >
                <LeftArrowIcon className="h-6 rotate-180 text-white" />
              </button>
            )}
          </div>
        </MovieBackground>
      </div>

      <Footer />
    </div>
  );
}

export default SearchPage;
