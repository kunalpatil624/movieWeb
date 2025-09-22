import { useEffect } from "react";
import axios from "axios";
import { ADMIN_REQUEST_API_AND_POINT } from "../utills/constand";
import { useDispatch } from "react-redux";
import {setSingleRequest } from "../redux/requestSlice";
import { toast } from "sonner";

const UseGetSingleRequest = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(
          `${ADMIN_REQUEST_API_AND_POINT}/${id}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleRequest(res.data.request));
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    if(id){
        fetchRequest();
    }
    
  }, [dispatch, id]); 
};

export default UseGetSingleRequest;
