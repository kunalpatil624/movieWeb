import axios from "axios";
import { useEffect } from "react";
import { THEATER_API_AND_POINT } from "../comonent/utills/constand";
import { useDispatch } from "react-redux";
import { setSingleTheater } from "../comonent/redux/theaterSlice";

const UseGetSingleTheater = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchTheater = async () => {
            try {
                const res = await axios.get(`${THEATER_API_AND_POINT}/${id}`);
                if (res.data.success) {
                    console.log(res.data.theater)
                    dispatch(setSingleTheater(res.data.theater));
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

        if (id) {
            fetchTheater();
        }
    }, [id, dispatch]);
};

export default UseGetSingleTheater;
