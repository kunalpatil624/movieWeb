import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { MOVIE_API_AND_POINT } from "../utills/constand";
import { setMovies } from "../redux/movieSlice";

const useGetAllMovies = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${MOVIE_API_AND_POINT}/`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setMovies(res.data.movies));
          console.log(res)
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovie();
  }, [dispatch]);

  return { loading };
};

export default useGetAllMovies;
