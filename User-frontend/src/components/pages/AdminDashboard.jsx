import React from 'react';
import { CgTrending, CgPlayButtonO } from "react-icons/cg";
import { LuCircleDollarSign } from "react-icons/lu";
import { FaLocationArrow, FaUsers } from "react-icons/fa";
import { dummyDashboardData } from '../data/dummyDashboardData';
import DeshboardCards from '../comonent/DeshboardCards.jsx';
import { useSelector } from 'react-redux';
import { MdMarkEmailRead, MdPhoneCallback } from 'react-icons/md';
import { Button } from "@/components/ui/button"
const AdminDashboard = () => {
  const theater = useSelector((state)=> state.theater.singleTheater)
  if (!theater) {
  return <p className="text-center mt-10">Loading Theater Data...</p>;
}

  return (
    <div>
      <div>
        <h1 className="font-medium text-2xl">
          Admin <span className="underline text-red-700">Dashboard</span>
        </h1>
        <div className="mt-5 flex-row md:flex gap-2 ">
          <div className="flex gap-2 mb-2 sm:mb-0">
            <div className="flex items-center justify-between px-4 py-3 border border-red-700 rounded-md max-w-50 w-full">
              <div>
                <p className="text-sm text-gray-400">Total Booking</p>
                <p className="text-xl font-medium mt-1">
                  {dummyDashboardData.totalBookings}
                </p>
              </div>
              <div>
                <CgTrending className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border border-red-700 rounded-md max-w-50 w-full">
              <div>
                <p className="text-sm text-gray-400">Total Revenue</p>
                <p className="text-xl font-medium mt-1">
                  {dummyDashboardData.totalRevenue}
                </p>
              </div>
              <div>
                <LuCircleDollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center justify-between px-4 py-3 border border-red-700 rounded-md max-w-50 w-full">
              <div>
                <p className="text-sm text-gray-400">Active Shows</p>
                <p className="text-xl font-medium mt-1">
                  {dummyDashboardData.activeShows.length}
                </p>
              </div>
              <div>
                <CgPlayButtonO className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border border-red-700 rounded-md max-w-50 w-full">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-xl font-medium mt-1">
                  {dummyDashboardData.totalUser}
                </p>
              </div>
              <div>
                <FaUsers className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
        <div className="border border-red-800 p-2 mt-5 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <img
                className="h-9 md:h-14 w-9 md:w-14 rounded-full"
                src={theater?.theaterLogo}
                alt="admin"
              />
              <p className="mt-2">{theater.name}</p>
              <div className="flex flex-col md:flex-row gap-2">
                <p className="mt-2"><MdMarkEmailRead className='inline mb-1'/> {theater.theaterEmail}</p>
                <p className="mt-2"> <MdPhoneCallback className='inline mb-1'/> {theater.theaterPhone}</p>
              </div>
              <p> <FaLocationArrow className='inline mb-1' /> {theater.location}</p>
              <div className='flex flex-col md:flex-row gap-3 mt-2'>
                {theater.facilities?.map((facilitie, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    • {facilitie}
                  </p>
                ))}
              </div>
            </div>

            <Button className='ml-2'>More</Button>
          </div>
        </div>
        <p className="mt-5 font-semibold">Active Shows</p>
        <DeshboardCards movieData={theater.shows} />
      </div>
    </div>
  );
}

export default AdminDashboard