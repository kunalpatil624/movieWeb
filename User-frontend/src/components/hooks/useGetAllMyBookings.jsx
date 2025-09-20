import axios from "axios";
import { useEffect, useState } from "react";
import { BOOKING_API_AND_POINT } from "../comonent/utills/constand";
import { useDispatch } from "react-redux";
import { setMyBookings } from "../comonent/redux/bookingsSlice";

const useGetAllMyBookings = (userId) => {
    const dispatch = useDispatch();
  useEffect(() => {
    if (!userId) return;
    console.log(userId);
    const fetchMyBookings = async () => {
      try {
        const res = await axios.get(
          `${BOOKING_API_AND_POINT}/user/${userId}`,
          { withCredentials: true }
        );
        if(res.data.success){
            dispatch(setMyBookings(res.data.bookings));
            return;
        }
       console.log("Bookings not found, Create booking first!");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings");
      }
    };

    fetchMyBookings();
  }, [userId]);

};

export default useGetAllMyBookings;
