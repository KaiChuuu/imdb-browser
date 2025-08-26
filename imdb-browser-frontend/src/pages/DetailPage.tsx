import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { fetchData } from "@/services/MovieDetailDataService";
import type { MovieDetailDataType } from "@/types/MovieDetailDataType";

import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/NavBar";
import SimilarMoviesList from "@/layouts/SimilarMoviesList";

import Poster from "@/components/common/Poster";
import MovieBackground from "@/components/MovieBackground";

function DetailPage() {
  const { row_id } = useParams<{ row_id: string }>();
  const location = useLocation();
  const detailGenres = location.state?.genres;

  const [data, setData] = useState<MovieDetailDataType | null>(null);

  useEffect(() => {
    if (!row_id) return;
    fetchData(Number(row_id)).then(setData);
  }, [row_id]);

  const genresSplit = detailGenres.split(",") || [];
  const gross = data?.Gross ? "$" + data?.Gross : "";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-[1320px] mx-auto flex flex-col mb-20">
        <div className="py-10 flex gap-10">
          <Poster height="35rem" src={data?.Poster_Link} />
          <div className="mt-13 flex flex-col max-w-xl">
            <span className="text-base-xl font-bold underline underline-offset-7">
              {data?.Series_Title}
            </span>
            <span className="mt-2 text-base-lg">{data?.Released_Year}</span>
            <span className="mt-5 text-base-lg">{data?.Overview}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-2/3">
            <hr className="border-t-[0.5px] border-white opacity-35 w-full" />

            <div className="flex gap-5 py-3">
              <span className="text-base-lg">DIRECTOR: </span>
              <span className="text-base-lg font-bold">{data?.Director}</span>
            </div>
            <hr className="border-t-[0.5px] border-white opacity-35 w-full" />

            <div className="flex gap-5 py-3">
              <span className="text-base-lg">STARS: </span>
              <span className="text-base-lg font-bold">{data?.Star1}</span>
              <span className="text-base-lg font-bold">{data?.Star2}</span>
              <span className="text-base-lg font-bold">{data?.Star3}</span>
              <span className="text-base-lg font-bold">{data?.Star4}</span>
            </div>
            <hr className="border-t-[0.5px] border-white opacity-35 w-full" />

            <div className="flex gap-5 py-3">
              <span className="text-base-lg">RUNTIME: </span>
              <span className="text-base-lg font-bold">{data?.Runtime}</span>
            </div>
            <hr className="border-t-[0.5px] border-white opacity-35 w-full" />

            <div className="flex gap-5 py-3">
              <span className="text-base-lg">IMDB RATING: </span>
              <span className="text-base-lg font-bold">
                {data?.IMDB_Rating} / 10
              </span>
            </div>
            <hr className="border-t-[0.5px] border-white opacity-35 w-full" />

            <div className="flex gap-5 py-3">
              <span className="text-base-lg">META SCORE: </span>
              <span className="text-base-lg font-bold">{data?.Meta_score}</span>
            </div>
            <hr className="border-t-[0.5px] border-white opacity-35 w-full" />

            <div className="flex gap-5 py-3">
              <span className="text-base-lg">GROSS: </span>
              <span className="text-base-lg font-bold">{gross}</span>
            </div>
            <hr className="border-t-[0.5px] border-white opacity-35 w-full" />

            <div className="flex gap-5 py-3">
              <span className="text-base-lg">NUMBER OF VOTES: </span>
              <span className="text-base-lg font-bold">
                {data?.No_of_Votes}
              </span>
            </div>
            <hr className="border-t-[0.5px] border-white opacity-35 w-full" />
          </div>

          <div className="w-1/3">
            <div className="flex flex-wrap gap-3">
              {genresSplit.map((genre: string, index: number) => (
                <span
                  key={index}
                  className="text-white text-base-lg rounded bg-red px-2 py-1"
                >
                  {genre.trim()}
                </span>
              ))}
              <span className="text-white text-base-lg rounded bg-green px-2 py-1">
                {data?.Certificate}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <MovieBackground>
          <SimilarMoviesList row_id={Number(row_id)} genre={detailGenres} />
        </MovieBackground>
      </div>

      <Footer />
    </div>
  );
}

export default DetailPage;
