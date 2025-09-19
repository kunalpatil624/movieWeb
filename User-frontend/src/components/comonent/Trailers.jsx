import React, { useState } from 'react'
import { movieData } from '../data/movieDataWithValidImages';
import { FaPlay, FaVideo, FaPlayCircle   } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Trailers = () => { 
  const movies = useSelector((state)=> state.movie.movies)
  const [curreentTrailer, setCurrentTrailer] = useState("3MfsZFAeNO8");
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <div>
        <p>Trailers</p>
        <div className="relative z-10">
          <div className="mx-auto max-w-full w-[960px] h-[540px]">
            <div className="w-[100%] h-[100%]">
              <iframe
                className="w-[100%] h-[100%]"
                id="mainVideo"
                src={`https://www.youtube.com/embed/${curreentTrailer}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w3xl mx-auto'>
            {movies.slice(0, 4).map((movie, idx) => (
              <div onClick={()=>setCurrentTrailer(movie.trailerId)} key={idx} className='relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-30 cursor-pointer'>
                <img
                  src={`https://img.youtube.com/vi/${movie.trailerId}/hqdefault.jpg`}
                  alt={movie.title}
                  className="rounded-lg w-full h-full object-cover brightness-75"
                />
                <FaPlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white size-12 opacity-80 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trailers