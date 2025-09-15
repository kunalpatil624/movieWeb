import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { TfiLayoutGrid2, TfiLayoutListThumb } from "react-icons/tfi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { CgAddR, CgIfDesign } from "react-icons/cg";
import axios from "axios";
import { SUPER_ADMIN_API_AND_POINT } from './utills/constand';
import { useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';
import {toast} from 'sonner'
import { Button } from "@/components/ui/button"

const AdminLayout  = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async()=> {
    try {
      const res = await axios.get(`${SUPER_ADMIN_API_AND_POINT}/logout`, {
        withCredentials:true
      });
      if(res.data.success){
        dispatch(logout(null));
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.responce?.data?.message);
    }
  }
  return (
    <div>
      <div>
        <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30">
          <div
            onClick={()=> navigate("/admin")}
            className="w-35 cursor-pointer"
          >
            <img
              src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754556239/ChatGPT_Image_Aug_7_2025_02_09_46_PM_vzt1bq.png"
              alt=""
            />
          </div>
          <div>
            <Button onClick={()=>handleLogout()} className='cursor-pointer'>Log-Out</Button>
          </div>
        </div>
        <div className="flex">
          <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
            <nav className='flex flex-col gap-4'>
              <div>
                <img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1740127576/samples/man-portrait.jpg" alt="" />
                <p className='font-bold text-center hidden sm:inline ml-3'>Admin user</p>
              </div>
              <div className="flex flex-col gap-4">
              <a href="/admin" className="hover:text-red-500 text-center sm:text-left">
               <TfiLayoutGrid2 className='inline mr-1'/> <span className='hidden sm:inline'>Dashboard</span>
              </a>
              <a href="/admin/add-movie" className="hover:text-red-500 text-center sm:text-left">
                <BiSolidCameraMovie className='inline mr-1 '/> <span className='hidden sm:inline'>Add Movie</span>
              </a>
              <a href="/admin/admin-requests" className="hover:text-red-500 text-center sm:text-left">
                <BiSolidCameraMovie className='inline mr-1 '/> <span className='hidden sm:inline'>Admin Requests</span>
              </a>
              <a href="/admin/add-show" className="hover:text-red-500 text-center sm:text-left">
               <CgAddR className='inline mr-1 w-4 h-4 '/> <span className='hidden sm:inline'>Add Show</span>
              </a>
              <a href="/admin/list-shows" className="hover:text-red-500 text-center sm:text-left">
               <TfiLayoutListThumb className='inline mr-1'/> <span className='hidden sm:inline'>List Shows</span> 
              </a>
              <a href="/admin/list-bookings" className="hover:text-red-500 text-center sm:text-left">
                <CgIfDesign className='inline mr-1 '/> <span className='hidden sm:inline'>List Bookings</span>
              </a>

              </div>
            </nav>
          </div>

          <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout 