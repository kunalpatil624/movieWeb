import React, { useState, useEffect } from "react";
import { movieData } from "../data/movieDataWithValidImages";
import MovieCard from "../comonent/MovieCard";
import { useNavigate } from "react-router-dom";
import Loading from "../comonent/Loading";
import { useSelector } from "react-redux";
import { FaArrowRight, FaCalendar, FaClock } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Movies = () => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movie.movies);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Auto-scroll top carousel every 4 seconds
  const trendingMovies = movies.slice(-3);
  useEffect(() => {
    if (!trendingMovies || trendingMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < trendingMovies.length - 1 ? prev + 1 : 0
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [movies]);

  if (loading) return <Loading />;
  if (!movies || movies.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-500">
          No movies available
        </p>
      </div>
    );

  const movie = movies[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : movies.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < movies.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="overflow-hidden">
      {/* Top carousel */}
      <div className="relative flex justify-center py-10">
        <div className="relative h-[40%] bg-black/60 rounded-lg overflow-hidden mt-2 md:mt-20">
          {/* Poster + Details */}
          <div className="hidden md:flex items-start gap-6 p-6  bg-black/40">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-1/3 h-auto rounded-lg object-cover"
            />
            <div className="flex-1 text-white flex flex-col gap-3">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {movie.title}
              </h1>
              <p className="text-sm md:text-base text-slate-200 flex flex-wrap items-center gap-2">
                {movie.genres?.join(" | ")} | <FaCalendar className="inline" />{" "}
                {movie.releaseDate?.split("-")[0]}{" "}
                <FaClock className="inline ml-2" /> {movie.runtime}
              </p>
              <p className="text-slate-300">{movie.description}</p>
              <Button
                className="text-white hover:bg-[#f84566bf] bg-[#F84565] w-max mt-2"
                onClick={() => navigate(`movie/${movie._id}`)}
              >
                Explore Movie <FaArrowRight className="ml-1" />
              </Button>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-red-700 transition z-10"
          >
            &#10094;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-red-700 transition z-10"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Grid of all movies */}
      <div className="px-6 md:px-16 lg:px-24 my-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
          {movies.map((m) => (
            <div
              key={m._id}
              onClick={() => navigate(`movie/${m._id}`)}
              className="cursor-pointer"
            >
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
