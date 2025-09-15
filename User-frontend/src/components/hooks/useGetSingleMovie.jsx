import { useEffect, useState } from "react";
import axios from "axios";
import { MOVIE_API_AND_POINT } from "../comonent/utills/constand";
import { useDispatch } from "react-redux";
import { setSingleMovie } from "../comonent/redux/movieSlice";

const useGetSingleMovie = (movieId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSingleMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${MOVIE_API_AND_POINT}/${movieId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleMovie(res.data.movie));
        }
      } catch (error) {
        console.log("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchSingleMovie();
    }
  }, [movieId, dispatch]);

  return { loading }; // ✅ Now it returns an object
};

export default useGetSingleMovie;
