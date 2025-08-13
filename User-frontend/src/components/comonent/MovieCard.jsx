import React from 'react'
import { Button } from "@/components/ui/button"
import { FaStar } from 'react-icons/fa';

const MovieCard = (movie) => {
  return (
    <div>
      <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'>
        <img className='rounded-lg h-52 w-full' src={movie.movie.image} alt="" />
        <p className='font-semibold mt-2 truncate'>{movie.movie.title}</p>
        <p className='text-sm text-gray-400 mt-2'>{movie.movie.year} • {movie.movie.genres[0]} | {movie.movie.genres[1]} • {movie.movie.duration}</p>
        <div className='flex justify-between items-center mt-4 pb-3'>
          <Button onClick={()=>navigate(`movies/movie/${movie.id}`)} className='text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer'>Buy Tickets</Button>
          <p className='flex items-center justify-center text-sm gap-1'><FaStar className='inline w-4 h-4 text-[#F84565]'/>{movie.movie.rating}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard