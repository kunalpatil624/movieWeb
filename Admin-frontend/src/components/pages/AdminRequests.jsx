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
import useGetAllRequests from '../hooks/useGetAllRequests'
import { useSelector } from 'react-redux'

const AdminRequests = () => {
    useGetAllRequests();
    const requests = useSelector((state)=>state.request.requests)
    return (
      <div className="overflow-x-auto">
        <h1 className='font-medium text-2xl mb-4'>
          List <span className='underline text-red-700'>Shows</span>
        </h1>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="sticky top-0 bg-white z-10 shadow">
            <TableRow>
              <TableHead className="w-[100px]">User Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              requests.map((request, idx) => (
                <TableRow key={idx}>
                  <TableCell>{request.user.name}</TableCell>
                  <TableCell>{new Date(request.createdAt).toLocaleString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })}</TableCell>
                  <TableCell>{request.theaterPhone}</TableCell>
                  <TableCell>{request.theaterEmail}</TableCell>
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
    )
}

export default AdminRequests