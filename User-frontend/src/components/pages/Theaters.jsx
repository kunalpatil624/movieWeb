  import React from "react";
  import useGetAllTheaters from "../hooks/useGetAllTheaters";
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { FaArrowRight } from "react-icons/fa";
  import Loading from "../comonent/Loading";

  const Theaters = () => {
    const { loading } = useGetAllTheaters();
    
    const theaters = useSelector((state) => state.theater.theaters);
    const navigate = useNavigate();
    if (loading) return <Loading />;
    return (
      <div className="px-6 md:px-10 lg:px-14 xl:px-44 overflow-hidden my-35">
        <h2 className="mb-5">All Theaters</h2>
        <div className="grid grid-cols-1 gap-6">
          {theaters && theaters.length > 0 ? (
            theaters.map((theater, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`theater/${theater._id}`)}
                className=" shadow-lg rounded-2xl border border-red-800 p-4 hover:shadow-2xl transition-all w-full cursor-pointer"
              >
                <div className="flex justify-between items-center">
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
                      <p className="text-gray-500 text-sm w-50 truncate ">
                        {theater.location}
                      </p>
                    </div>
                  </div>
                  {/* Button */}
                  <div className="mt-4 flex justify-end items-center">
                    {/* Desktop Button */}

                    <button
                      className="inline-flex  p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                      onClick={() => navigate(`theater/${theater._id}`)}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>

                {/* Theater Details */}
                <div className="space-y-2 text-sm text-gray-700">
                  {/* <p>
                    <span className="font-semibold">Owner:</span>{" "}
                    {theater.ownerName}
                  </p> */}

                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {theater.theaterPhone}
                  </p>
                  <div className="flex gap-2">
                    <p>
                      <span className="font-semibold">Capacity:</span>{" "}
                      {theater.seats}
                    </p>
                    <p>
                      <span className="font-semibold">Priority:</span>{" "}
                      {theater.priority}
                    </p>
                  </div>
                  <div>
                    <div className="flex gap-3">
                      {theater.facilities.map((facilitie, idx) => (
                        <div key={idx}>
                          <p className="text-xs md:text-sm lg:text-sm ">
                            •{facilitie}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
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
