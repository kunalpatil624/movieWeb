import React from 'react'
import {FaHome, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='fixed top-0 top-0 z-50 w-full h-22 flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
        <div onClick={()=> {navigate("/")}} className='w-35 cursor-pointer'><img src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754556239/ChatGPT_Image_Aug_7_2025_02_09_46_PM_vzt1bq.png" alt="" /></div>
        <div className=' hidden md:flex justify-between h-auto gap-8 backdrop-blur bg-black/70 md:bg-white/10 py-3 px-8 rounded-3xl border border-gray-300/20'>
          <a className='text-white' href="/">Home</a>
          <a  href="/movies">Movie</a>
          <a  href="">Theaters</a>
          <a  href="">Releases</a>
        </div>
        <div className='flex items-center gap-8'>
          <FaSearch/>
          <Button className='text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer'>Login</Button>
        </div>
      </div>

      <div className='fixed flex z-50 bottom-0 left-0 w-full h-15 justify-around py-2 md:hidden rounded-t-2xl shadow-lg mb-4'>
        <div className='flex justify-between h-15 gap-8 backdrop-blur items-center bg-black/70 md:bg-white/10 py-3 px-8 rounded-3xl border border-gray-300/20'>
          <a className='text-white' href="/">Home</a>
          <a  href="/movies">Movie</a>
          <a  href="">Theaters</a>
          <a  href="">Releases</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar