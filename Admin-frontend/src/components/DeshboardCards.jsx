import React from 'react'
import { FaIndianRupeeSign, FaStar } from "react-icons/fa6";

const DeshboardCards = ({ movieData }) => {
  return (
    <div className='relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4 max-w-5xl'>
      {
        movieData.map((movie, idx) => (
          <div
            key={idx}
            className='w-full sm:w-55 rounded-lg overflow-hidden h-full pb-3 border border-red-800 hover:-translate-y-1 transition duration-300 '
          >
            <img
              className='h-60 w-full object-cover'
              src={movie.poster}
              alt={movie.title}
            />
            <p className='font-medium p-2 truncate'>{movie.title}</p>
            <div className='p-2 flex justify-between items-center'>
              <p className='flex items-center font-bold'>
                <FaIndianRupeeSign className='inline mt-1' />
                {movie?.showPrice}
              </p>
              <p className='flex items-center font-bold gap-1'>
                <FaStar className='inline text-red-700' />
                {movie.vote_average}
              </p>
            </div>
            <p className='px-2 pt-2 text-sm text-gray-500'>
              {new Date(movie.releaseDate).toLocaleString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              })}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default DeshboardCards
