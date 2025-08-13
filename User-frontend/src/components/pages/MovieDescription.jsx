import React, { useRef, useState, useEffect } from 'react';
import { movieData } from '../data/movieDataWithValidImages';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaPlayCircle, FaStar } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import MovieCards from '../comonent/MovieCards';
import DateSelect from '../comonent/DateSelect';
import Loading from '../comonent/Loading'; // tumhara spinner import

const MovieDescription = () => {
  const dateSelectRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  function generateShowtimes(days) {
    const today = new Date();
    const times = ["10:00 AM", "2:00 PM", "6:00 PM", "9:00 PM"];
    const dateTime = {};

    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateKey = date.toISOString().split("T")[0];
      dateTime[dateKey] = times;
    }

    return dateTime;
  }

  const dateTimeData = generateShowtimes(4);

  const scrollToDateSelect = () => {
    dateSelectRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setTimeout(() => {
      const foundMovie = movieData.find((m) => m.id === parseInt(id));
      setMovie(foundMovie);
      setLoading(false);
    }, 1000); 
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-500 text-lg">Movies not found</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden my-40">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <div>
          <img
            className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
            src={movie.image}
            alt={movie.title}
          />
        </div>
        <div className="relative flex flex-col gap-3">
          <p className="text-[#F84565]">{movie.language.toUpperCase()}</p>
          <h6 className="font-semibold text-4xl max-w-96 text-balance">
            {movie.title}
          </h6>
          <p className="flex items-center gap-2 text-gray-300">
            <FaStar className="inline w-5 h-5 text-[#F84565]" />
            {movie.rating} User Rating
          </p>
          <p className="text-sm text-gray-400 max-w-xl">{movie.description}</p>
          <p>
            {movie.duration} • {movie.genres.join(", ")} • {movie.year}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Button className="text-white hover:bg-[#1e2939dc] bg-[#1E2939]">
              <FaPlayCircle /> Watch Trailer
            </Button>
            <Button
              onClick={scrollToDateSelect}
              className="text-white hover:bg-[#f84566bf] bg-[#F84565]"
            >
              Buy Tickets
            </Button>
            <Button className="text-white hover:bg-[#1e2939dc] bg-[#1E2939] rounded-full">
              <FaHeart />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <p className="mt-20 text-lg font-medium">Your Favorite Cast</p>
        <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
          <div className="flex items-center w-max px-4 gap-2 ">
            {movie.characters.map((character, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <img
                  className="rounded-full h-20 md:h-20 aspect-square object-cover"
                  src={character.image}
                  alt=""
                />
                <p className="font-medium text-xs mt-3">{character.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={dateSelectRef}>
        <DateSelect dateTime={dateTimeData} id={id} />
      </div>

      <div>
        <p className="text-lg font-medium mt-20 mb-20">You may also like</p>
        <MovieCards movie={movie} />
        <div className="flex justify-center mt-20">
          <Button
            onClick={() => {
              navigate("/movies");
              scrollTo(0, 0);
            }}
            className="text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer w-35 h-10"
          >
            Show more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
