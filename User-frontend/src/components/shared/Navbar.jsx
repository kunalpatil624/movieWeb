import React from 'react'
import {FaHome, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import { LuTicketPlus } from "react-icons/lu";
import LoginSignupModal from '../comonent/loginSignupModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import axios from 'axios';
import { USER_API_AND_POINT } from '../comonent/utills/constand';
import { toast } from 'sonner';
import { logout } from '../comonent/redux/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_AND_POINT}/logout`, {
        withCredentials:true,
      })
      if(res.data.success){
        dispatch(logout(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  }
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <div className="fixed top-0 top-0 z-50 w-full h-22 flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="w-35 cursor-pointer"
        >
          <img
            src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754556239/ChatGPT_Image_Aug_7_2025_02_09_46_PM_vzt1bq.png"
            alt=""
          />
        </div>
        <div className=" hidden md:flex justify-between h-auto gap-8 backdrop-blur bg-black/70 md:bg-white/10 py-3 px-8 rounded-3xl border border-gray-300/20">
          <p onClick={() => navigate("/")} className="cursor-pointer">
            Home
          </p>
          <p onClick={() => navigate("/movies")} className="cursor-pointer">
            Movie
          </p>
          <p onClick={() => navigate("/theaters")} className="cursor-pointer">
            Theaters
          </p>
          <p onClick={() => navigate("/")} className="cursor-pointer">
            Releases
          </p>
        </div>
        <div className="flex items-center gap-8">
          <FaSearch />
          {!isAuthenticated ? (
            <Button
              onClick={() => setOpen(true)}
              className="text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Team
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" >
                  Subscription
                </DropdownMenuItem>
                {
                  user?.role === "admin" && <DropdownMenuItem className="cursor-pointer" onClick={()=> navigate('/admin')}>
                    Deshboard
                  </DropdownMenuItem>
                }
                <DropdownMenuItem>
                    <Button
                      className="hover:cursor-pointer"
                      onClick={logOutHandler}
                      variant="link"
                    >
                      {" "}
                      Log-out
                    </Button>
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="fixed flex z-50 bottom-0 left-0 w-full h-15 justify-around py-2 md:hidden rounded-t-2xl shadow-lg mb-4">
        <div className="flex justify-between h-15 gap-8 backdrop-blur items-center bg-black/70 md:bg-white/10 py-3 px-8 rounded-3xl border border-gray-300/20">
          <p onClick={() => navigate("/")} className="cursor-pointer">
            Home
          </p>
          <p onClick={() => navigate("/movies")} className="cursor-pointer">
            Movie
          </p>
          <p onClick={() => navigate("/theaters")} className="cursor-pointer">
            Theaters
          </p>
          <p onClick={() => navigate("/")} className="cursor-pointer">
            Releases
          </p>
        </div>
      </div>
      <LoginSignupModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default Navbar