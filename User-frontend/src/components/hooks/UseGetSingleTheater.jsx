import axios from "axios";
import { useEffect } from "react";
import { THEATER_API_AND_POINT } from "../comonent/utills/constand";
import { useDispatch } from "react-redux";
import { setSingleThater } from "../comonent/redux/theaterSlice";

const UseGetSingleTheater = (theaterId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTheater = async () => {
            try {
                const res = await axios.get(`${THEATER_API_AND_POINT}/${theaterId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleThater(res.data.theater));
                } else {
                    console.log("Backend responded with error:", res.data.message);
                }
            } catch (error) {
                if (error.response) {
                    console.log("Error fetching theater:", error.response.data);
                } else {
                    console.log("Error fetching theater:", error.message);
                }
            }
        };

        if (theaterId) {
            fetchTheater();
        }
    }, [theaterId, dispatch]);
};

export default UseGetSingleTheater;
