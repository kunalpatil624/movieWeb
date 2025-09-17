import React from "react";
import useGetAllTheaters from "../hooks/useGetAllTheaters";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Theaters = () => {
  useGetAllTheaters();
  const theaters = useSelector((state) => state.theater.theaters);
  const navigate = useNavigate();
  return (
    <div className="px-6 md:px-10 lg:px-14 xl:px-44 overflow-hidden my-40">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {theaters && theaters.length > 0 ? (
          theaters.map((theater, idx) => (
            <div
              key={idx}
              className=" shadow-lg rounded-2xl border border-red-800 p-4 hover:shadow-2xl transition-all"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full overflow-hidden border">
                  <img
                    src={theater.theaterLogo}
                    alt="theater-logo"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{theater.name}</h2>
                  <p className="text-gray-500 text-sm w-50 truncate ">{theater.location}</p>
                </div>
              </div>

              {/* Theater Details */}
              <div className="space-y-2 text-sm text-gray-700">
                {/* <p>
                  <span className="font-semibold">Owner:</span>{" "}
                  {theater.ownerName}
                </p> */}
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {theater.theaterEmail}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {theater.theaterPhone}
                </p>
                <p>
                  <span className="font-semibold">Capacity:</span>{" "}
                  {theater.capacity} seats
                </p>
              </div>

              {/* Button */}
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" onClick={()=> navigate(`theater/${theater._id}`)}>
                  See More
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No theaters found</p>
        )}
      </div>
    </div>
  );
};

export default Theaters;
