import {useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Movies from "./components/pages/Movies";
import MovieDescription from "./components/pages/MovieDescription";
import {Toaster} from 'react-hot-toast'
import SeatLayout from "./components/pages/SeatLayout";
import MyBooking from "./components/pages/MyBooking";


function App() {
  const isAdminRoute = useLocation().pathname.startsWith("/admin")
  return (
    <>
    <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/movies/movie/:id" element={<MovieDescription/>}/>
        <Route path="/movies/:id/:date" element={<SeatLayout/>}/>
        <Route path="/my-bookings" element={<MyBooking/>}/>

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
