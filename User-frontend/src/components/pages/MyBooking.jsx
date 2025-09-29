import React from "react";
import { useSelector } from "react-redux";
import useGetAllMyBookings from "../hooks/useGetAllMyBookings";

const MyBooking = () => {
  const user = useSelector((state) => state.auth.user);
  useGetAllMyBookings(user._id);
  const MyBookings = useSelector((state) => state.booking.myBookings);

  if (!MyBookings) {
    return <p className="text-center mt-10">Loading MyBookings Data...</p>;
  }

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="relative mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-52 mt-10 min-h-[80vh]">
      <div className="mt-30">
        
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🎟 My Bookings</h2>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {MyBookings.map((booking, idx) => (
          <div
            key={idx}
            className="flex gap-4 shadow-md rounded-lg overflow-hidden border border-red-800 hover:shadow-xl transition-all duration-300 p-2"
          >
            {/* Movie Poster */}
            <div className="w-20 h-28 flex-shrink-0">
              <img
                className="w-full h-full object-cover rounded-md"
                src={booking.show.movie.poster}
                alt={booking.show.movie.title}
              />
            </div>

            {/* Details */}
            <div className="flex flex-col flex-1">
              {/* Title & runtime */}
              <h3 className="text-lg font-semibold text-gray-800">
                {booking.show.movie.title}
              </h3>
              <p className="text-xs text-gray-500">
                {formatRuntime(booking.show.movie.runtime)}
              </p>

              {/* Price & Status */}
              <div className="mt-2 flex items-center gap-3">
                <p className="text-sm font-medium text-gray-700">
                  ₹{booking.amount}
                </p>
                {booking.isPaid ? (
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    Paid
                  </span>
                ) : (
                  <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    Failed
                  </span>
                )}
              </div>

              {/* Extra Info */}
              <div className="mt-2 text-xs text-gray-600 space-y-0.5">
                <p>
                  <span className="font-medium text-gray-500">Date: </span>
                  {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Tickets: </span>
                  {booking.bookedSeats.length} ({booking.bookedSeats.join(", ")})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MyBooking;
