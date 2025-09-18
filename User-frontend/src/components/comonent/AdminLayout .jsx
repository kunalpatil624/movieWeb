import React from "react";
import { Outlet, Link } from "react-router-dom";
import { TfiLayoutGrid2, TfiLayoutListThumb } from "react-icons/tfi";
import { CgAddR, CgIfDesign } from "react-icons/cg";
import { useSelector } from "react-redux";
import UseGetSingleTheater from "../hooks/UseGetSingleTheater";

const AdminLayout = () => {
  const user = useSelector((state)=>state.auth.user)
  UseGetSingleTheater(user.theater._id);
  return (
    <div>
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30">
        <div className="w-35 cursor-pointer">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754556239/ChatGPT_Image_Aug_7_2025_02_09_46_PM_vzt1bq.png"
              alt="logo"
            />
          </Link>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="h-[calc(100vh-64px)] md:flex flex-col text-center items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
          <nav className="flex flex-col gap-4">
            <div>
              <img
                className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
                src={user.imageUrl}
                alt="admin"
              />
              <p className="font-bold text-center hidden sm:inline">
                {user.fullName}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Link to="/admin" className="hover:text-red-500 text-center sm:text-left">
                <TfiLayoutGrid2 className="inline mr-1" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link to="/admin/add-show" className="hover:text-red-500 text-center sm:text-left">
                <CgAddR className="inline mr-1 w-4 h-4" />
                <span className="hidden sm:inline">Add Show</span>
              </Link>
              <Link to="/admin/list-shows" className="hover:text-red-500 text-center sm:text-left">
                <TfiLayoutListThumb className="inline mr-1" />
                <span className="hidden sm:inline">List Shows</span>
              </Link>
              <Link to="/admin/list-bookings" className="hover:text-red-500 text-center sm:text-left">
                <CgIfDesign className="inline mr-1" />
                <span className="hidden sm:inline">List Bookings</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
