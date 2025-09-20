import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../comonent/Loading";
import { FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import { GoArrowRight } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { SHOW_API_AND_POINT } from "../comonent/utills/constand";
import PaymentButton from "../comonent/PaymentButton";
import { useSelector } from "react-redux";

const SeatLayout = () => {
  const  user  = useSelector((state) => state.auth.user);
  const { id, date } = useParams(); // movieId and date from URL
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  // Fetch shows from backend on movieId or date change
  useEffect(() => {
    const fetchShows = async () => {
      if (!id || !date) return;

      try {
        setIsLoading(true);
        const res = await axios.get(`${SHOW_API_AND_POINT}/movie/${id}/${date}`
        );
        setShows(res.data.shows); // array of shows
      } catch (err) {
        console.error(err);
        toast.error("No shows available for this date");
        setShows([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShows();
  }, [id, date]);

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSeateClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((seat) => seat !== seatId));
      return;
    }
    if (selectedSeats.length >= 5) {
      toast("You can only select 5 seats");
      return;
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => {
    return (
      <div key={row} className="flex gap-2 mt-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const isBooked = selectedTime?.bookingSeates?.includes(seatId);
          return (
            <button
              key={seatId}
              disabled={isBooked}
              onClick={() => handleSeateClick(seatId)}
              className={`h-8 w-8 rounded border border-red-600 cursor-pointer ${
                isBooked
                  ? "bg-gray-500 cursor-not-allowed"
                  : selectedSeats.includes(seatId)
                  ? "bg-red-800 text-white"
                  : ""
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    );
  };

  if (isLoading) return <Loading />;

  if (!shows || shows.length === 0) {
    return <p className="text-center text-gray-500 mt-40">No shows found</p>;
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden my-40">
      <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 gap-8">
        {/* Show Timings */}
        <div className="w-60 bg-primary/10 border border-red-800 rounded-lg py-10 h-max md:sticky md:top-30">
          <p className="font-semibold text-lg mx-6">Available Timings</p>
          <div className="mt-5 space-y-1">
            {shows.map((s, idx) => (
              <div
                key={s._id}
                onClick={() => {
                  setSelectedTime(s);
                  setSelectedSeats([]); // reset selected seats on new time
                }}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition text-white ${
                  selectedTime?._id === s._id ? "bg-red-800" : "hover:bg-red-400"
                }`}
              >
                <FaClock className="inline" />
                <p className="text-sm">{formatTime(s.dateTime)}</p>
                <p className="text-xs ml-2">
                  Booked: {s.bookingSeates?.length || 0}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
  <p className="text-2xl font-semibold mb-4">Select your seat</p>
  <img
    src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754900739/screenImage_mmg3rd.svg"
    alt=""
  />
  <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

  {/* Scrollable layout on small screens */}
  <div className="flex flex-col items-center mt-10 text-xs text-gray-300 max-h-[500px] overflow-y-auto">
    {/* A and B rows */}
    <div className="grid grid-cols-1 gap-8 md:gap-2 mb-6">
      {groupRows[0].map((row) => renderSeats(row))}
    </div>

    {/* C to J rows */}
    <div className="grid grid-cols-1 gap-x-px">
      {groupRows.slice(1).map((group, idx) => (
        <div key={idx} className="grid grid-cols-1 gap-2">
          {group.map((row) => renderSeats(row))}
        </div>
      ))}
    </div>
  </div>

  <Button className="hover:bg-[#f84566bf] bg-[#F84565] mt-10 rounded-full">
  {/* Instead of navigate, render PaymentButton */}
  {selectedTime && selectedSeats.length > 0 ? (
    <PaymentButton
      amount={selectedSeats.length * 100} // ₹100 per seat
      seats={selectedSeats}
      showId={selectedTime._id}
      userId={user?._id}
    />
  ) : (
    <span onClick={() => {
      if (!selectedTime) return toast.error("Please select a show timing");
      if (selectedSeats.length === 0)
        return toast.error("Please select at least 1 seat");
    }}>
      Proceed to checkout <GoArrowRight strokeWidth={3} className="w-4 h-4 ml-1 inline" />
    </span>
  )}
</Button>

</div>

      </div>
    </div>
  );
};

export default SeatLayout;
