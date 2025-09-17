import React, { useState } from 'react'
import AddShowCards from '../comonent/AddShowCards.jsx'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { Button } from "@/components/ui/button"
import { MdOutlineDownloadDone, MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { SHOW_API_AND_POINT } from '../comonent/utills/constand.js'
import axios from "axios";

export const AddShow = () => {
  const movies = useSelector((state) => state.movie.movies)
  const theater = useSelector((state) => state.auth.user.theater)

  const [selectedMovie, setSelectedMovie] = useState(null)

  // Local state for form inputs
  const [price, setPrice] = useState("")
  const [dateTime, setDateTime] = useState("")

  // Array of shows
  const [shows, setShows] = useState([])

  // Function to add a show
  const handleAddShowTime = () => {
    if (!selectedMovie) {
      toast.error("Please select a movie first")
      return
    }
    if (!price || !dateTime) {
      toast.error("Please enter price and date/time")
      return
    }

    const newShow = {
      movie: selectedMovie,
      price,
      dateTime,
    }

    setShows([...shows, newShow]) // add new show to list
    setDateTime("")
  }

  // Function to remove a show
  const handleRemoveShow = (index) => {
    const updatedShows = shows.filter((_, idx) => idx !== index)
    setShows(updatedShows)
  }

const handleSubmit = async () => {
  if (shows.length === 0) {
    toast.error("Please add show first!");
    return;
  }

  try {
    // Group shows by movieId + date
    const groupedShows = {};

    shows.forEach(show => {
      const movieId = show.movie._id;
      const date = show.dateTime.split("T")[0];
      const time = show.dateTime.split("T")[1];

      const key = movieId + "_" + date;

      if (!groupedShows[key]) {
        groupedShows[key] = {
          movieId,
          theaterId: theater._id,
          date,
          time: [],
          showPrice: Number(show.price),
          totalSeates: theater.seats
        };
      }

      groupedShows[key].time.push(time);
    });

    // Send each grouped show to backend
    for (let key in groupedShows) {
      const payload = groupedShows[key];

      const res = await axios.post(`${SHOW_API_AND_POINT}/add`, payload, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
        return;
      }
    }

    toast.error(res.data.message);
    setShows([]);
    setSelectedMovie(null);

  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
};




  return (
    <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)]'>
      <h1 className='font-medium text-2xl'>
        Add <span className='underline text-red-700'>Shows</span>
      </h1>

      {/* Movie Selection */}
      <div className='overflow-x-auto pb-4'>
        <p className='font-bold mt-8'>Now Playing Movies</p>
        <AddShowCards
          movieData={movies}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      </div>

      {/* Show Price */}
      <div className='mt-8'>
        <label htmlFor="price" className='block text-sm font-medium mb-2'> Show Price </label>
        <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
          <FaIndianRupeeSign className='inline mt-1 mb-1' />
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter show price'
            className='outline-none'
          />
        </div>
      </div>

      {/* Date and Time */}
      <div className='mt-5'>
        <label htmlFor="datetime" className='block text-sm font-medium mb-2'> Select Date and Time </label>
        <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
          <input
            type="datetime-local"
            id="datetime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="outline-none rounded-md"
          />
          <Button
            type="button"
            onClick={handleAddShowTime}
            className='text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer'
          >
            <MdOutlineDownloadDone />
            <span className='hidden sm:inline'>Add time</span>
          </Button>
        </div>
      </div>

      {/* Show List */}
      {shows.length > 0 && (
        <div className='mt-8'>
          <h2 className='font-semibold text-lg mb-3'>Added Shows</h2>
          <ul className='space-y-3'>
            {shows.map((show, idx) => (
              <li key={idx} className='border border-gray-400 rounded-md p-3 flex justify-between items-center'>
                <div>
                  <p className='font-medium'>{show.movie.title}</p>
                  <p className='text-sm text-gray-600'>Price: ₹{show.price}</p>
                  <p className='text-sm text-gray-600'>Time: {new Date(show.dateTime).toLocaleString()}</p>
                </div>
                {/* ❌ Delete Button */}
                <button 
                  onClick={() => handleRemoveShow(idx)} 
                  className="text-red-600 hover:text-red-800"
                >
                  <MdClose size={22} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Final Add Button */}
      <Button onClick={handleSubmit} className='text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer mt-6 px-8 py-5 mb-10'>
        Add Show
      </Button>
    </div>
  )
}
