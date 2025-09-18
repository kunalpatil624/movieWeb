import React from 'react'
import {movieData} from '../data/movieDataWithValidImages'
import MovieCard from './MovieCard'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
const MovieCards = () => {
  const navigate = useNavigate();
  const movies = useSelector((state)=> state.movie.movies);
  return (
    <div id='movieDAta' className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-8 justify-center'>
            {
                movies.slice(0,4).map((movie) => (
                    <div key={movie._id} onClick={()=> navigate(`/movies/movie/${movie._id}`)}>
                        <MovieCard key={movie.id} movie={movie}/>
                    </div>
                ))
            }       
    </div>
  )
}

export default MovieCards