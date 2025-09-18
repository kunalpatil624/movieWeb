import React from 'react'
import { dummyDashboardData } from '../data/dummyDashboardData'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const ListBookings = () => {
  return (
    <div>
      <div className="overflow-x-auto">
            <h1 className='font-medium text-2xl mb-4'>
              List <span className='underline text-red-700'>Booking</span>
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
                {
                  dummyDashboardData.activeShows.map((show, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{show.movie.title}</TableCell>
                      <TableCell>{new Date(show.showDateTime).toLocaleString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}</TableCell>
                      <TableCell>{show.totalBookings}</TableCell>
                      <TableCell>{show.totalRevenue}</TableCell>
                    </TableRow>
                  ))
                }
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
    </div>
  )
}

export default ListBookings