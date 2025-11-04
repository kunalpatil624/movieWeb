import axios from "axios";
import { useEffect, useState } from "react";
import { THEATER_API_AND_POINT } from "../comonent/utills/constand";
import { useDispatch, useSelector } from "react-redux";
import { setTheaters } from "../comonent/redux/theaterSlice";

const useGetAllTheaters = () => {
  const [loading, setLoading] = useState(false);
  const theaters = useSelector((state) => state.theater.theaters);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTheaters = async () => {
      try {
          setLoading(true);
        const res = await axios.get(`${THEATER_API_AND_POINT}/`, {
          withCredentials: true,
        });
        if (res) {
          dispatch(setTheaters(res.data.theaters));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTheaters();
  }, [dispatch]);
  return { loading };
};
export default useGetAllTheaters;