import React from 'react'
import {movieData} from '../data/movieDataWithValidImages'
import MovieCard from './MovieCard'
import {useNavigate} from 'react-router-dom'
const MovieCards = () => {
  const navigate = useNavigate();
  return (
    <div id='movieDAta ' className='flex flex-wrap mt-10 gap-8 justify-center'>
            {
                movieData.slice(0,4).map((movie) => (
                    <div onClick={()=> navigate(`/movies/movie/${movie.id}`)}>
                        <MovieCard key={movie.id} movie={movie}/>
                    </div>
                ))
            }       
    </div>
  )
}

export default MovieCards