import React from 'react'
import { Button } from "@/components/ui/button"
import { FaArrowRight } from 'react-icons/fa'
import MovieCards from './MovieCards'
import { Link } from 'react-router-dom'
import MovieCard from './MovieCard'
import { movieData } from '../data/movieDataWithValidImages'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import useGetAllMovies from '../hooks/UseGetAllMovies'

const TrendingShow = () => {
    const navigate = useNavigate();
    const { loading } = useGetAllMovies();
  const movies = useSelector((state) => state.movie.movies);
  if (loading) return <p>Loading...</p>;
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
        <div className='pt-20 flex justify-between items-center'>
            <p>Kow Showing</p>
            <Button className='hover:cursor-pointer group' variant="none">View All <FaArrowRight className='group-hover:translate-x-0.5 transition h-4.5 w-4.5'/></Button>
        </div>
        <div id='movieDAta ' className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-8 justify-between items-center'>
            {
                movies.slice(0,4).map((movie) => (
                    <div key={movie._id} onClick={()=>navigate(`movies/movie/${movie._id}`)} className=''>
                        <MovieCard key={movie.id} movie={movie}/>
                    </div>
                ))
            }       
    </div>
        <div className='flex items-center justify-center mt-20'>
          <Button className='text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer w-35 h-10'><Link to={"/movies"}>Show more</Link></Button>
        </div>
    </div>
  )
}

export default TrendingShow