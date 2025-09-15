import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../comonent/Loading';
import { movieData } from '../data/movieDataWithValidImages';
import { dummyDateTimeData } from '../data/dummyDateTimeData';
import { FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { GoArrowRight } from 'react-icons/go';
import { Button } from "@/components/ui/button";

const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  
  const groupRows = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H'], ['I', 'J']];

  useEffect(() => {
    const movie = movieData.find((m) => m.id === Number(id));
    
    if (movie) {
      setShow({
        movie: movie,
        dateTime: dummyDateTimeData
      });
    }
  }, [id, date]);

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSeateClick = (seatId)=>{
    if(!selectedTime){
        return toast('Please select time first')
    }
    if (selectedSeats.includes(seatId)) {
        setSelectedSeats(prev => prev.filter(seat => seat !== seatId));
        return;
    }
    if (selectedSeats.length >= 5) {
        toast('You can only select 5 seats');
        return;
    }
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
  }

  const renderSeats = (row, count = 9) => {
    return (
        <div key={row} className='flex gap-2 mt-2'>
            <div className='flex flex-wrap items-center justify-center gap-2'>
                {
                    Array.from({ length: count }, (_, i) => {
                        const seatId = `${row}${i + 1}`;
                        return (
                            <button
                                key={seatId}
                                onClick={() => handleSeateClick(seatId)}
                                className={`h-8 w-8 rounded border border-red-600 cursor-pointer ${selectedSeats.includes(seatId) ? 'bg-red-800 text-white' : ''}`}
                            >
                                {seatId}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    );
}

  return show ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden my-40">
      <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 gap-8">
        <div className="w-60 bg-primary/10 border border-red-800 rounded-lg py-10 h-max md:sticky md:top-30">
          <p className="font-semibold text-lg mx-6">Available Timings</p>
          <div className="mt-5 space-y-1">
            {show.dateTime[date] && show.dateTime[date].length > 0 ? (
              show.dateTime[date].map((item, index) => {
                const localTime = new Date(item.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <div
                    key={item.date}
                    onClick={() => setSelectedTime(item)}
                    className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition text-white ${
                      selectedTime?.time === item.time
                        ? "bg-red-800"
                        : "hover:bg-red-400"
                    }`}
                  >
                    <FaClock className="inline" />
                    <p key={index} className="text-sm">
                      {localTime}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="mx-6 mt-6 text-gray-500">No timings available</p>
            )}
          </div>
        </div>
        <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
          <p className="text-2xl font-semibold mb-4">Select your seat</p>
          <img
            src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754900739/screenImage_mmg3rd.svg"
            alt=""
          />
          <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
          <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
              {groupRows[0].map((row) => renderSeats(row))}
            </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>

          </div>
        <Button className='hover:bg-[#f84566bf] bg-[#F84565] mt-10 rounded-full ' >Procced to checkout <GoArrowRight strokeWidth={3} className='w-4 h-4 '/></Button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
