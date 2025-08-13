import React, { useState, useEffect } from 'react';
import { movieData } from '../data/movieDataWithValidImages';
import MovieCard from '../comonent/MovieCard';
import { useNavigate } from 'react-router-dom';
import Loading from '../comonent/Loading';

const Movies = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMovies(movieData);
      setLoading(false);
    }, 1000); 
  }, []);

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-500">No movies available</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden my-40">
      <div className="flex flex-wrap mt-10 gap-8 justify-center">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`movie/${movie.id}`)}
            className="cursor-pointer"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
