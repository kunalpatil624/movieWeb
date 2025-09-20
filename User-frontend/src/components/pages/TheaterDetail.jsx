import React, { useState } from "react";
import UseGetSingleTheater from "../hooks/UseGetSingleTheater";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const TheaterDetail = () => {
  const { id } = useParams();
  UseGetSingleTheater(id);
  const theater = useSelector((state) => state.theater.singleTheater);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const onlyDate = new Date(selectedTime).toISOString().split("T")[0];

  const navigate = useNavigate();
if (!theater) {
  return (
    <div className="flex justify-center items-center h-96">
      <p>Loading theater details...</p>
    </div>
  );
}

  // 🔑 Next 4 din ki dates generate karne ka function
  function getNextFourDays() {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const options = { weekday: "short", day: "numeric", month: "short" };
      days.push(date.toLocaleDateString("en-US", options));
    }
    return days;
  }

  const nextDays = getNextFourDays();

  // 🔑 Filter shows based on selectedDate
  let filteredShows = [];

if (selectedDate) {
  filteredShows = theater.shows?.filter((show) => {
    const showDate = new Date(show.dateTime).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    return showDate === selectedDate;
  });

  // Agar selected date me koi show nahi mila → fallback to all shows
  if (!filteredShows || filteredShows.length === 0) {
    filteredShows = theater.shows || [];
  }
} else {
  filteredShows = theater.shows || [];
}

  return (
    <div className="px-6 md:px-16 lg:px-36  md:px-10 lg:px-14 xl:px-44 overflow-hidden my-25">
      {/* Header Section */}
      <div className="grid grid-cols-1">
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
        <div>
          <p className="text-xs md:text-sm">{theater.theaterEmail}</p>
          <p className="text-xs md:text-sm">{theater.theaterPhone}</p>
          <div className="flex gap-3 flex-wrap">
            {theater.facilities?.map((facilitie, idx) => (
              <p key={idx} className="text-xs md:text-sm">
                • {facilitie}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Theater Images */}
      <div className="w-full my-6">
        <Dialog>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              View Images
            </button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-5xl p-4 sm:p-6 flex items-center bg-black">
            <DialogHeader />
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              className="rounded-xl shadow-md"
            >
              {theater.theaterImages?.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  className="flex justify-center items-center"
                >
                  <img
                    src={image}
                    alt={`theater-img-${idx}`}
                    className="max-h-[70vh] max-w-full object-contain rounded-xl w-120 h-50"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </DialogContent>
        </Dialog>
      </div>

      {/* 🔑 Next 4 Days Dates Section */}
      <div className="border border-red-800 p-4 rounded-lg mt-6">
        <h3 className="font-semibold mb-3">Available Dates</h3>
        <div className="flex gap-4 flex-wrap">
          {nextDays.map((day, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedDate(day);
                setSelectedTime(null); // reset selected time when date changes
              }}
              className={`px-4 py-2 border rounded-lg cursor-pointer transition 
                ${
                  selectedDate === day
                    ? "border border-red-800 text-white"
                    : "border hover:border-red-800 hover:text-white"
                }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Shows Section */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 gap-3 mt-5">
          {Object.values(
            (filteredShows || []).reduce((acc, show) => {
              const title = show.movie.title;
              if (!acc[title]) {
                acc[title] = {
                  movie: show.movie,
                  times: [],
                  price: show.showPrice,
                  id: show.movie._id,
                };
              }
              acc[title].times.push({
                time: new Date(show.dateTime).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }),
                fullDate: show.dateTime,
              });
              return acc;
            }, {})
          ).map(({ movie, times, price, id }, idx) => (
            <div key={idx} className="flex gap-2 p-3 ">
              <div>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-40 w-28 rounded-2xl object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">{movie.title}</p>
                <p className="text-sm text-gray-500">
                  {movie.genres.join(", ")}
                </p>

                <p className="text-sm text-green-600 font-medium mt-1">
                  Price: ₹{price}
                </p>

                <div className="flex gap-2 flex-wrap mt-2">
                  {times.map(({ time, fullDate }, i) => (
                    <span
                      key={i}
                      onClick={() => setSelectedTime(fullDate)}
                      className={`px-3 py-1 border rounded-md text-sm cursor-pointer ${
                        selectedTime === fullDate
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                    >
                      {time}
                    </span>
                  ))}
                </div>

                {/* Book button */}
                
                <Button
                  onClick={() => {
                    if (!selectedTime) {
                      return toast.error("Please select a time");
                    }
                    navigate(`/movies/${id}/${onlyDate}`);
                    scrollTo(0, 0);
                  }}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheaterDetail;
