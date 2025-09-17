import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa6'
const AddShowCards = ({movieData, selectedMovie, setSelectedMovie}) => {
  return (
        <div className='group flex flex-wrap gap-4 mt-4 w-max'>
          {
            movieData.map((movie, idx) => {
               const isSelected = selectedMovie?._id === movie._id
               return (
                <div key={idx} onClick={() => setSelectedMovie(movie)}>
                 <div className='max-w-40'>
                 <div className='relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 '>
                    <img className='h-60 w-full object-cover' src={movie.poster} alt="" />
                    <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                      <p className='text-gray-400'><FaStar className='inline mb-1 mr-1 text-red-800'/>{movie.rating}</p>
                      <p className='text-sm text-gray-400'>{movie.voteCount} Votes</p>
                    </div>
                    {isSelected && (
                  <FaCheckCircle 
                    className="absolute top-2 right-2 text-red-600 text-2xl drop-shadow-lg" 
                  />
                )}
                    
                 </div>
                 <p className='text-sm truncate '>{movie.title}</p>
                 <p className='text-sm text-gray-400'>{movie.releaseDate }</p>
                 </div>
                 </div>
               )}
               )
          }
        </div>
  )
}

export default AddShowCards

// import React from 'react'
// import { FaStar } from 'react-icons/fa6'

// const AddShowCards = ({ movieData, selectedMovie, setSelectedMovie }) => {
//   return (
//     <div className='group flex flex-wrap gap-4 mt-4 w-max'>
//       {movieData.map((movie, idx) => {
//         const isSelected = selectedMovie?.id === movie.id
//         return (
//           <div 
//             key={idx} 
//             onClick={() => setSelectedMovie(movie)}
//             className={`max-w-40 cursor-pointer transition duration-300 
//               ${isSelected ? 'ring-1 ring-red-600 rounded-md' : 'hover:-translate-y-1'}`}
//           >
//             <div className='relative max-w-40'>
//               <img className='h-60 w-full object-cover rounded-md' src={movie.poster} alt={movie.title} />
//               <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
//                 <p className='text-gray-400'>
//                   <FaStar className='inline mb-1 mr-1 text-red-800'/>{movie.rating}
//                 </p>
//                 <p className='text-sm text-gray-400'>{movie.voteCount} Votes</p>
//               </div>
//             </div>
//             <p className='text-sm truncate'>{movie.title}</p>
//             <p className='text-sm text-gray-400'>{movie.releaseDate}</p>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default AddShowCards
