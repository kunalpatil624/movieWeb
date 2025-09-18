import React from 'react'
import { Button } from "@/components/ui/button"
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="flex flex-col justify-between p-3 border border-red-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-full">
      {/* Image full width column ke andar adjust hogi */}
      <img
        className="rounded-lg h-48 sm:h-56 md:h-64 w-full object-cover"
        src={movie.poster}
        alt={movie.title}
      />

      <p className="font-semibold mt-2 truncate">{movie.title}</p>

      <p className="text-sm text-gray-400 mt-2">
        {movie.year} • {movie.genres[0]} | {movie.genres[1]} • {formatRuntime(movie.runtime)}
      </p>

      <div className="flex justify-between items-center mt-4 pb-3">
        <Button
          onClick={() => navigate(`movies/movie/${movie._id}`)}
          className="text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer w-22 sm:w-25"
        >
          Buy Tickets
        </Button>
        <p className="flex items-center justify-center text-sm gap-1">
          <FaStar className="inline w-4 h-4 text-[#F84565]" />
          {movie.vote_average}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
