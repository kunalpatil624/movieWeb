import React from "react";
import { FaIndianRupeeSign, FaStar } from "react-icons/fa6";

const DashboardCards = ({ dummyDashboardData }) => {
  if (!dummyDashboardData?.activeShows?.length) {
    return (
      <p className="text-gray-500 text-sm mt-4">
        No active shows available.
      </p>
    );
  }

  return (
    <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
      {dummyDashboardData.activeShows.map((show, idx) => (
        <div
          key={idx}
          className="w-full sm:w-[220px] rounded-lg overflow-hidden h-full pb-3 border border-red-800 hover:-translate-y-1 transition duration-300 shadow-sm"
        >
          <img
            className="h-60 w-full object-cover"
            src={show.movie?.image || "/fallback-movie.jpg"}
            alt={show.movie?.title || "Movie Poster"}
          />
          <p className="font-medium p-2 truncate">
            {show.movie?.title || "Untitled Movie"}
          </p>
          <div className="p-2 flex justify-between items-center">
            <p className="flex items-center font-bold">
              <FaIndianRupeeSign className="inline mt-1" />
              {show.showPrice?.toLocaleString("en-IN") ?? "N/A"}
            </p>
            <p className="flex items-center font-bold gap-1">
              <FaStar className="inline text-red-700" />
              {show.movie?.rating ?? "N/A"}
            </p>
          </div>
          <p className="px-2 pt-2 text-sm text-gray-500">
            {show.showDateTime
              ? new Date(show.showDateTime).toLocaleString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Showtime not available"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
