import { FaArrowRight, FaCalendar, FaClock } from "react-icons/fa";
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="w-full min-h-screen bg-[url('https://res.cloudinary.com/dtyuevzyx/image/upload/v1755086758/black-panther-4k-movie-poster-vi_rm5lp0.jpg')] bg-cover bg-center">
      <div className="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 min-h-screen text-white bg-black/60">
        <img
          src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754551933/deg04zd-91232057-059b-4a17-906b-126292445d7f_mfog0x.png"
          alt="Marvel Logo"
          className="h-11"
        />

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Guardians <br /> of the Galaxy
        </h1>

        <p className="text-sm md:text-base text-slate-200 flex flex-wrap items-center gap-1">
          Action | Adventure | Sci-Fi |<FaCalendar className="inline" /> 2018<FaClock className="inline ml-2" /> 2h 8m
        </p>

        <p className="max-w-2xl text-slate-300">
          In a post-apocalyptic world where cities ride on wheels and consume
          each other to survive, two people meet in London and try to stop a
          conspiracy.
        </p>
        <Button className='text-white hover:bg-[#f84566bf] bg-[#F84565] hover:cursor-pointer'>Explore Movie <FaArrowRight/></Button>
      </div>
    </div>
  );
}

