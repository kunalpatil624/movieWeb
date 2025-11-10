import { Navigate, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Movies from "./components/pages/Movies";
import MovieDescription from "./components/pages/MovieDescription";
import { Toaster } from "react-hot-toast";
import SeatLayout from "./components/pages/SeatLayout";
import MyBooking from "./components/pages/MyBooking";
import ScrollToTop from "./components/comonent/ScrollToTop";

import AdminLayout from "./components/comonent/AdminLayout .jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";
import { AddShow } from "./components/pages/AddShow.jsx";
import ListShows from "./components/pages/ListShows.jsx";
import ListBookings from "./components/pages/ListBookings.jsx";
import ViewProfile from "./components/pages/ViewProfile.jsx";
import AdminRequest from "./components/pages/AdminRequest.jsx";
import TermsAndConditions from "./components/pages/TermsAndConditions.jsx";
import Theaters from "./components/pages/Theaters.jsx";
import TheaterDetail from "./components/pages/TheaterDetail.jsx";
import PrivateRoute from "./components/comonent/PrivateRoute.jsx";
import AboutUs from "./components/comonent/AboutUs.jsx";
import ContactUs from "./components/ContactUs.jsx";
function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const hideNavbar = pathname.startsWith("/admin");
  const hideFooter = pathname.startsWith("/admin") || pathname === "/profile";

  return (
    <>
      <Toaster />
      {!hideNavbar && <Navbar />}
      <ScrollToTop />
      <Routes>
        {/* User Routes */}
        <Route path="/login&signup" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<PrivateRoute><ViewProfile/></PrivateRoute>} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/movie/:id" element={<MovieDescription />} />
        <Route path="/movies/:id/:date" element={<PrivateRoute><SeatLayout /></PrivateRoute>} />
        <Route path="/my-bookings" element={<PrivateRoute><MyBooking /></PrivateRoute>} />
        <Route path="/theater-request" element={<PrivateRoute><AdminRequest /></PrivateRoute>} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/theaters/theater/:id" element={<TheaterDetail />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        {/* Admin Routes (Nested) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-show" element={<AddShow />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
