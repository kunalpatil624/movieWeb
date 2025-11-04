import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowRight, FaCalendar, FaClock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LatestMoviesSection() {
  const movies = useSelector((state) => state.movie.movies); // redux state
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate()
  // Latest 4 movies
  const latestMovies = movies.slice(-4);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < latestMovies.length - 1 ? prev + 1 : 0
      );
    }, 4000); // 5000ms = 5s

    return () => clearInterval(interval); // cleanup
  }, [latestMovies.length]);
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : latestMovies.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < latestMovies.length - 1 ? prev + 1 : 0));
  };

  if (!latestMovies || latestMovies.length === 0) return null;

  const movie = latestMovies[currentIndex];

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative transition-all duration-500"
      style={{ backgroundImage: `url(${movie.poster})` }}
    >
      <div className="absolute inset-0 bg-black/60 flex items-center px-6 md:px-16 lg:px-36">
        <div className="flex flex-col md:flex-row items-start gap-6 max-w-6xl mx-auto bg-black/40 p-6 rounded-lg">
          {/* Poster Left */}
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full md:w-1/3 h-auto rounded-lg object-cover"
          />

          {/* Details Right */}
          <div className="flex-1 text-white flex flex-col gap-3 ">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {movie.title}
            </h1>

            <p className="text-sm md:text-base text-slate-200 flex flex-wrap items-center gap-2">
              {movie.genres?.join(" | ")} | <FaCalendar className="inline" />{" "}
              {movie.releaseDate?.split("-")[0]} <FaClock className="inline ml-2" />{" "}
              {movie.runtime}
            </p>

            <p className="text-slate-300">{movie.description}</p>

            <Button className="text-white hover:bg-[#f84566bf] bg-[#F84565] w-max mt-2" onClick={() => navigate(`movies/movie/${movie._id}`)}>
              Explore Movie <FaArrowRight className="ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full hover:bg-red-700 transition"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full hover:bg-red-700 transition"
      >
        &#10095;
      </button>
    </div>
  );
}
