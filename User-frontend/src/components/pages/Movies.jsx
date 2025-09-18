import React, { useState, useEffect } from 'react';
import { movieData } from '../data/movieDataWithValidImages';
import MovieCard from '../comonent/MovieCard';
import { useNavigate } from 'react-router-dom';
import Loading from '../comonent/Loading';
import { useSelector } from 'react-redux';

const Movies = () => {
  const navigate = useNavigate();
  const movies = useSelector((state)=>state.movie.movies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
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
    <div className="px-6 md:px-16 lg:px-24  overflow-hidden my-40">
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 pt-2">
    {movies.map((movie) => (
      <div
        key={movie.id}
        onClick={() => navigate(`movie/${movie._id}`)}
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
