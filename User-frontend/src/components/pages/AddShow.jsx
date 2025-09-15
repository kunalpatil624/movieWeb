import React from 'react'
import { movieData } from '../data/movieDataWithValidImages'
import AddShowCards from '../comonent/AddShowCards.jsx'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { Button } from "@/components/ui/button"
import { MdOutlineDownloadDone } from 'react-icons/md'

export const AddShow = () => {
  return (
    <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)]'>
      <h1 className='font-medium text-2xl'>Add <span className='underline text-red-700'>Shows</span></h1>
      <div className='overflow-x-auto pb-4'>
        <p className='font-bold mt-8'>Now Playing Movies</p>
        <AddShowCards movieData={movieData}/>
      </div>
      <div className='mt-8'>
        <label htmlFor="price" className='block text-sm font-medium mb-2'> Show Price </label>
        <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
          <p><FaIndianRupeeSign className='inline mt-1 mb-1' /></p>
          <input type="number" min={0} placeholder='Enter show price' className='outline-none'/>
        </div>
      </div>
      <div className='mt-5'>
        <label htmlFor="price" className='block text-sm font-medium mb-2'> Select Date and Time </label>
        <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
          <input type="datetime-local" name="" id="" className="outline-none rounded-md"/>
          <Button className='text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer'><MdOutlineDownloadDone/><span className='hidden sm:inline'>Add time</span></Button>
        </div>
      </div>
      <Button className='text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer mt-6 px-8 py-5 mb-10' >Add Show</Button>
    </div>
  )
}
