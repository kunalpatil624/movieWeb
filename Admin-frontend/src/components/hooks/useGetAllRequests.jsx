import { useEffect } from "react";
import axios from "axios";
import { ADMIN_REQUEST_API_AND_POINT } from "../utills/constand";
import { useDispatch } from "react-redux";
import { setRequests } from "../redux/requestSlice";
import { toast } from "sonner";

const useGetAllRequests = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${ADMIN_REQUEST_API_AND_POINT}/get`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setRequests(res.data.requests));
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    
    fetchRequests();
  }, [dispatch]); 
};

export default useGetAllRequests;
