import React from 'react';
import { CgTrending, CgPlayButtonO } from "react-icons/cg";
import { LuCircleDollarSign } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa";
import { dummyDashboardData } from '../data/dummyDashboardData';
import DeshboardCards from '../DeshboardCards';

const AdminDashboard = () => {
  return (
    <div>
        <div>
          <h1 className='font-medium text-2xl'>Admin <span className='underline text-red-700'>Dashboard</span></h1>
          <div className='mt-5 flex-row md:flex gap-2 '>
            <div className='flex gap-2 mb-2 sm:mb-0'>
            <div className="flex items-center justify-between px-4 py-3 border border-red-700 rounded-md max-w-50 w-full">
              <div>
                <p className='text-sm text-gray-400'>Total Booking</p>
                <p className='text-xl font-medium mt-1'>{dummyDashboardData.totalBookings}</p>
              </div>
              <div><CgTrending className='w-6 h-6'/></div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border border-red-700 rounded-md max-w-50 w-full">
              <div>
                <p className='text-sm text-gray-400'>Total Revenue</p>
                <p className='text-xl font-medium mt-1'>{dummyDashboardData.totalRevenue}</p>
              </div>
              <div><LuCircleDollarSign  className='w-6 h-6'/></div>
            </div>
            </div>
            <div className='flex gap-2'>
            <div className="flex items-center justify-between px-4 py-3 border border-red-700 rounded-md max-w-50 w-full">
              <div>
                <p className='text-sm text-gray-400'>Active Shows</p>
                <p className='text-xl font-medium mt-1'>{dummyDashboardData.activeShows.length}</p>
              </div>
              <div><CgPlayButtonO className='w-6 h-6'/></div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border border-red-700 rounded-md max-w-50 w-full">
              <div>
                <p className='text-sm text-gray-400'>Total Users</p>
                <p className='text-xl font-medium mt-1'>{dummyDashboardData.totalUser}</p>
              </div>
              <div><FaUserGroup  className='w-6 h-6'/></div>
            </div>
            </div>
          </div>
          <p className='mt-5 font-semibold'>Active Shows</p>
          <DeshboardCards dummyDashboardData={dummyDashboardData}/>
        </div>
    </div>
  )
}

export default AdminDashboard