import axios from "axios";
import { useEffect, useState } from "react";
import { BOOKING_API_AND_POINT } from "../comonent/utills/constand";
import { useDispatch } from "react-redux";
import { setAllBookings} from "../comonent/redux/bookingsSlice";

const useGetAllBookings = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await axios.get(
          `${BOOKING_API_AND_POINT}/get`,
          { withCredentials: true }
        );
        if(res.data.success){
            dispatch(setAllBookings(res.data.bookings));
            return;
        }
       console.log("Bookings not found, Create booking first!");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings");
      }
    };

    fetchMyBookings();
  }, [dispatch]);

};

export default useGetAllBookings;
