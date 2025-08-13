import React, { useEffect, useState } from 'react'
import Loading from '../comonent/Loading';
import { dummyBookingData } from '../data/dummyBookingData';
import { Button } from "@/components/ui/button";

const MyBooking = () => {
    const currency = import.meta.env.VITE_CURRENCY;
    const [bookings, setBookings] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getMyBookings = async() =>{
        setBookings(dummyBookingData)
        setLoading(false)
    }
    useEffect(() => {
        getMyBookings()
    },[])
    console.log(bookings)
  return !isLoading ? (
    <div className='relative mx-6 md:mx-16 lg:px-40 md:mt-40 min-h-[80vh] pt-0 sm:pt-0 max-sm:pt-30 '>
        <div className=''>
            <p className='text-lg font-semibold mb-4'>My bookings</p>
            {
                bookings.map((booking, idx) => {
                    return(

                        <div key={idx} className='flex flex-col md:flex-row gap-5 md:gap-20 border border-red-800 rounded-lg mt-4 p-2 max-w-3xl'>
                          <div className='flex flex-col md:flex-row gap-3 '>
                            <div className='flex items-center justify-center '>
                                <img className='w-full md:w-55 h-30 object-cover rounded-lg' src={booking.show.movie.image} alt="" />    
                            </div>
                            <div className='pt-5'>
                                <p className='font-bold truncate'>{booking.show.movie.title}</p>
                                <p className='text-xs text-gray-400 mt-1'>{booking.show.movie.duration}</p>
                                <p className='text-xs text-gray-400 mt-8'>{new Date(booking.show.showDateTime).toLocaleString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })
}</p>
                            </div>
                          </div>
                            <div className='md:ml-auto'>
                                <div className='flex items-center pt-3 gap-2'>
                                    <p className='font-bold'>Price: &#8377;{booking.show.showPrice} </p>
                                    <Button className='rounded-full bg-[#F84565]'>Pay Now</Button>
                                </div>
                                <div className='md:text-right mt-4' >
                                    <p className='text-sm' ><span className='text-gray-400'>Total Ticket: </span>1</p>
                                    <p className='text-sm' ><span className='text-gray-400'>Seat Number: </span>{booking.bookedSeats.join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  ) :(
    <Loading/>
  )
}

export default MyBooking