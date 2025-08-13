import React from 'react'
import { Button } from "@/components/ui/button"
import { FaArrowRight } from 'react-icons/fa'
import MovieCards from './MovieCards'
import { Link } from 'react-router-dom'
import MovieCard from './MovieCard'
import { movieData } from '../data/movieDataWithValidImages'

const TrendingShow = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
        <div className='pt-20 flex justify-between items-center'>
            <p>Kow Showing</p>
            <Button className='hover:cursor-pointer group' variant="none">View All <FaArrowRight className='group-hover:translate-x-0.5 transition h-4.5 w-4.5'/></Button>
        </div>
        <div id='movieDAta ' className='flex flex-wrap mt-10 gap-8 justify-center'>
            {
                movieData.slice(0,6).map((movie) => (
                    <div>
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