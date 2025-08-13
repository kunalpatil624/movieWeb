import React, { useState } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DateSelect = ({dateTime, id}) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate()
  const onBookHandler = () =>{
    if(!selected){
      return toast('Please select a date')
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0,0)
  }
  return (
    <div className="pt-30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative  p-8 bg-primary/10 border border-red-800 rounded-lg">  
            <div>
                <p className='font-semibold'>Choose Date</p>
                <div>
                <div className='flex items-center gap-6 mt-5'>
                    <GoChevronLeft/>
                    <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
                        {/* <Button className='flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer border border-primary/70'><span>11</span> <span>Nov</span></Button>
                        <Button className='flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer border border-primary/70'><span>12</span> <span>Nov</span></Button>
                        <Button className='flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer border border-primary/70'><span>13</span> <span>Nov</span></Button> */
                          Object.keys(dateTime).map((date) => (
                            <Button onClick={()=>setSelected(date)}  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer border border-red-800 ${selected === date ? "bg-primary text-white" : "border border-primary/70"}`}>
                                <span>{new Date(date).getDate()}</span>
                                <span>{new Date(date).toLocaleDateString("en-US", {month:"short"})}</span>
                            </Button>
                          ))
                        }
                    </span>
                    <GoChevronRight/>
                </div>
                </div>
            </div>
            <Button onClick={onBookHandler} className='mt-6 text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer rounded px-8 py-2'>Book Now</Button>
          </div>
      </div>
  )
}

export default DateSelect