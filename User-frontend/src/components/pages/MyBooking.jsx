import React, { useEffect, useState } from 'react'
import Loading from '../comonent/Loading';
import { dummyBookingData } from '../data/dummyBookingData';
import { Button } from "@/components/ui/button";
import { useSelector } from 'react-redux';
import useGetAllMyBookings from '../hooks/useGetAllMyBookings';
import { Link } from 'react-router-dom';

const MyBooking = () => {
    const user = useSelector((state)=>state.auth.user);
    useGetAllMyBookings(user._id);
    const MyBookings = useSelector((state) => state.booking.myBookings)
    const currency = import.meta.env.VITE_CURRENCY;
    const [bookings, setBookings] = useState([]);
    const [isLoading, setLoading] = useState(true);

    
  return isLoading ? (
    <div className='relative mx-6 md:mx-16 lg:px-40 md:mt-40 min-h-[80vh] pt-0 sm:pt-0 max-sm:pt-30 '>
            <p className='text-lg font-semibold mb-4'>My bookings</p>
            <div className='grid grdi-cols-1'>
            {
                MyBookings.map((booking, idx) => {
                    return(

                        <div key={idx} className='flex flex-col md:flex-row gap-5 md:gap-20 border border-red-800 rounded-lg mt-4 p-2 max-w-3xl'>
                          <div className='flex flex-col md:flex-row gap-3 '>
                            <div className='flex items-center justify-center '>
                                <img className='w-full md:w-55 h-30 object-cover rounded-lg' src={booking.show.movie.poster} alt="" />    
                            </div>
                            <div className='pt-5'>
                                <p className='font-bold truncate'>{booking.show.movie.title}</p>
                                <p className='text-xs text-gray-400 mt-1'>{booking.show.movie.runtime}</p>
                                <p className='text-xs text-gray-400 mt-8'>{new Date(booking.createdAt).toLocaleString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })
}</p>
                            </div>
                          </div>
                            <div className='md:ml-auto flex flex-row justify-between md:flex-col'>
                                <div className='flex flec-col md:flex-row items-center pt-3 gap-2'>
                                    <p className='font-bold'>Price: &#8377;{booking.amount} </p>
                                    <Link className=''>{
                                        booking.isPaid ? <p className='text-green-600'>Paid</p> : <p className='text-red-600'>Faild</p>
                                    }</Link>
                                </div>
                                <div className='md:text-right mt-4' >
                                    <p className='text-sm' ><span className='text-gray-400'>Total Ticket: </span>{booking.bookedSeats.length}</p>
                                    <p className='text-sm' ><span className='text-gray-400'>Seat Number: </span>{booking.bookedSeats.join(", ")}</p>
                                    <p className='text-xs'><span className='text-gray-400'>PayLink: </span> {booking.paymentLink}</p>
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