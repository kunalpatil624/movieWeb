import React from 'react'
import {movieData} from '../data/movieDataWithValidImages'
import MovieCard from './MovieCard'

const MovieCards = () => {
  return (
    <div id='movieDAta ' className='flex flex-wrap mt-10 gap-8'>
            {
                movieData.slice(0,4).map((movie) => (
                    <div>
                        <MovieCard key={movie.id} movie={movie}/>
                    </div>
                ))
            }       
    </div>
  )
}

export default MovieCards