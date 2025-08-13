// // import React from 'react'
// // import { Navigate } from 'react-router-dom'
// // import {FaSearch } from "react-icons/fa";
// // import { Button } from "@/components/ui/button"
// // export const AdminNav = () => {
// //   return (
// //     <div>
// //         <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
// //             <div onClick={()=> {Navigate("/admin")}} className='w-35 cursor-pointer'>
// //                 <img src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754556239/ChatGPT_Image_Aug_7_2025_02_09_46_PM_vzt1bq.png" alt="" />
// //             </div>
// //         </div>
// //     </div>
// //   )
// // }

// import { Outlet } from "react-router-dom";

// export default function AdminLayout() {
//   return (
//     <div className="flex h-screen bg-[#0d0d0d] text-white">
//       <div className="flex-1 flex flex-col">

//         <header className="">
//           <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
//             <div onClick={()=> {Navigate("/admin")}} className='w-35 cursor-pointer'>
//                 <img src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754556239/ChatGPT_Image_Aug_7_2025_02_09_46_PM_vzt1bq.png" alt="" />
//             </div>
//         </div>
//         </header>
//         <div>

//       <aside className="w-64 bg-[#141414] p-4 flex flex-col">
//         <div className="text-xl font-bold mb-8">QuickShow</div>
//         <nav className="flex flex-col gap-4">
//           <a href="/admin/dashboard" className="hover:text-red-500">Dashboard</a>
//           <a href="/admin/add-show" className="hover:text-red-500">Add Shows</a>
//           <a href="/admin/list-shows" className="hover:text-red-500">List Shows</a>
//           <a href="/admin/list-bookings" className="hover:text-red-500">List Bookings</a>
//         </nav>
//       </aside>
//         <main className="p-6 overflow-y-auto">
//           <Outlet />g
//         </main>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react'
import { Outlet } from 'react-router-dom'
import { TfiLayoutGrid2, TfiLayoutListThumb } from "react-icons/tfi";
import { CgAddR, CgIfDesign } from "react-icons/cg";
const AdminLayout  = () => {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30">
          <div
            onClick={() => {
              Navigate("/admin");
            }}
            className="w-35 cursor-pointer"
          >
            <img
              src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754556239/ChatGPT_Image_Aug_7_2025_02_09_46_PM_vzt1bq.png"
              alt=""
            />
          </div>
        </div>
        <div className="flex">
          <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
            <nav className='flex flex-col gap-4'>
              <div>
                <img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1740127576/samples/man-portrait.jpg" alt="" />
                <p className='font-bold text-center'>Admin user</p>
              </div>
              <div className="flex flex-col gap-4">
              <a href="/admin" className="hover:text-red-500">
               <TfiLayoutGrid2 className='inline mr-1'/> Dashboard
              </a>
              <a href="/admin/add-show" className="hover:text-red-500">
               <CgAddR className='inline mr-1'/> Add Show
              </a>
              <a href="/admin/list-shows" className="hover:text-red-500">
               <TfiLayoutListThumb className='inline mr-1'/>  List Shows
              </a>
              <a href="/admin/list-bookings" className="hover:text-red-500">
                <CgIfDesign className='inline mr-1'/>List Bookings
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