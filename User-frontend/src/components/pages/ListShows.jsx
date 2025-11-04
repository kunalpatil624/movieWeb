import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { dummyDashboardData } from '../data/dummyDashboardData'
import { useSelector } from 'react-redux'
import UseGetSingleTheater from '../hooks/UseGetSingleTheater'
import useGetAllMyBookings from '../hooks/useGetAllMyBookings'
import useGetAllBookings from '../hooks/useGetAllBookings'

const ListShows = () => {
  useGetAllMyBookings() 
  const theater = useSelector((state) => state.auth.user.theater);
  const shows = useSelector((state)=> state.theater.singleTheater.shows);
  const bookings = useSelector((state) => state.booking.allBookings);
  const bookingHandle = ()=> {}
  useGetAllBookings();
  return (
    <div className="overflow-x-auto">
      <h1 className="font-medium text-2xl mb-4">
        List <span className="underline text-red-700">Shows</span>
      </h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="sticky top-0 bg-white z-10 shadow">
          <TableRow>
            <TableHead className="w-[100px]">Movie Name</TableHead>
            <TableHead>Show Time</TableHead>
            <TableHead>Total Booking</TableHead>
            <TableHead className="text-right">Earnings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shows.map((show, idx) => (
            <TableRow key={idx}>
              <TableCell>{show.movie.title}</TableCell>
              <TableCell>
              {new Date(show.dateTime).toLocaleDateString("en-IN", {
                weekday:"short",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour:"numeric",
                minute:"2-digit",
                hour12:true
              })} {show.time}
              </TableCell>
              <TableCell>{bookings.map((booking, idx) => {
                if(show.movie.title === booking.show.movie.title){
                 return booking.amount
                }
              })}</TableCell>
              <TableCell className="text-right">{show.totalRevenue} Soon</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default ListShows
