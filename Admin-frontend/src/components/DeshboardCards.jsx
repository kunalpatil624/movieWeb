import React from 'react'
import { FaIndianRupeeSign, FaStar } from "react-icons/fa6";

const DeshboardCards = ({ dummyDashboardData }) => {
  return (
    <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
      {
        dummyDashboardData.activeShows.map((show, idx) => (
          <div
            key={idx}
            className='w-full sm:w-55 rounded-lg overflow-hidden h-full pb-3 border border-red-800 hover:-translate-y-1 transition duration-300 '
          >
            <img
              className='h-60 w-full object-cover'
              src={show.movie.image}
              alt={show.movie.title}
            />
            <p className='font-medium p-2 truncate'>{show.movie.title}</p>
            <div className='p-2 flex justify-between items-center'>
              <p className='flex items-center font-bold'>
                <FaIndianRupeeSign className='inline mt-1' />
                {show.showPrice}
              </p>
              <p className='flex items-center font-bold gap-1'>
                <FaStar className='inline text-red-700' />
                {show.movie.rating}
              </p>
            </div>
            <p className='px-2 pt-2 text-sm text-gray-500'>
              {new Date(show.showDateTime).toLocaleString("en-IN", {
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
