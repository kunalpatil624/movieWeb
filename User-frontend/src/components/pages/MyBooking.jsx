import React from "react";
import Loading from "../comonent/Loading";
import { useSelector } from "react-redux";
import useGetAllMyBookings from "../hooks/useGetAllMyBookings";
import { Link } from "react-router-dom";

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
    <div className="relative mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-52 mt-25 min-h-[80vh]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🎟 My Bookings</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {MyBookings.map((booking, idx) => (
          <div
            key={idx}
            className="flex flex-row  shadow-lg rounded-xl overflow-hidden border border-red-800 hover:shadow-xl transition-all duration-300 p-2"
          >
            {/* Movie Poster */}
            <div className="w-full  md:h-auto">
              <img
                className="w-full h-full object-cover"
                src={booking.show.movie.poster}
                alt={booking.show.movie.title}
              />
            </div>

            {/* Details */}
            <div className="flex flex-col flex-1 p-4">
              {/* Movie title & runtime */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {booking.show.movie.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {formatRuntime(booking.show.movie.runtime)}
                </p>
              </div>

              {/* Price & Status */}
              <div className="mt-3 flex items-center gap-4">
                <p className="font-bold text-gray-700">
                  Price: ₹{booking.amount}
                </p>
                {booking.isPaid ? (
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    ✅ Paid
                  </span>
                ) : (
                  <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    ❌ Failed
                  </span>
                )}
              </div>

              {/* Booking Info */}
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium text-gray-500">Date: </span>
                  {new Date(booking.createdAt).toLocaleString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p>
                  <span className="font-medium text-gray-500">
                    Total Tickets:{" "}
                  </span>
                  {booking.bookedSeats.length}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Seats: </span>
                  {booking.bookedSeats.join(", ")}
                </p>
                <p className="truncate">
                  <span className="font-medium text-gray-500">PayLink: </span> {booking.paymentLink}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
