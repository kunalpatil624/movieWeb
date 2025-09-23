import axios from "axios"
import { useEffect } from "react"
import { THEATER_API_AND_POINT } from "../comonent/utills/constand"
import { useDispatch, useSelector } from "react-redux"
import { setTheaters } from "../comonent/redux/theaterSlice"

const useGetAllTheaters = ()=> {
    const theaters = useSelector((state)=> state.theater.theaters);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchTheaters = async()=> {
            try {
                const res = await axios.get(`${THEATER_API_AND_POINT}/`, {withCredentials:true});
                if(res){
                    dispatch(setTheaters(res.data.theaters));
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        fetchTheaters();
    }, [dispatch]);
}
export default useGetAllTheaters;