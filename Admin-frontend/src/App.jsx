import {useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import AdminDashboard from "./components/pages/AdminDashboard";
import { AddShow } from "./components/pages/AddShow";
import ListShows from "./components/pages/ListShows";
import ListBookings from "./components/pages/ListBookings";
import AdminLayout from "./components/AdminLayout ";

function App() {
  const isAdminRoute = useLocation().pathname.startsWith("/admin")
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-show" element={<AddShow />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
