import React from 'react'
import { FaStar } from 'react-icons/fa6'
const AddShowCards = ({movieData}) => {
  return (
        <div className='group flex flex-wrap gap-4 mt-4 w-max'>
          {
            movieData.map((movie, idx) => (
              <div className='max-w-40'>
              <div className='relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 '>
                 <img className='h-60 w-full object-cover' src={movie.image} alt="" />
                 <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                   <p className='text-gray-400'><FaStar className='inline mb-1 mr-1 text-red-800'/>{movie.rating}</p>
                   <p className='text-sm text-gray-400'>{movie.voteCount} Votes</p>
                 </div>
                 
              </div>
              <p className='text-sm truncate '>{movie.title}</p>
              <p className='text-sm text-gray-400'>{movie.year }</p>
              </div>
            ))
          }
        </div>
  )
}

export default AddShowCards