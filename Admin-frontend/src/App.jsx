import { useLocation, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import AdminDashboard from "./components/pages/AdminDashboard";
import { AddShow } from "./components/pages/AddShow";
import ListShows from "./components/pages/ListShows";
import ListBookings from "./components/pages/ListBookings";
import { AddMovie } from "./components/pages/AddMovie";
import Login from "./components/pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout ";
import AdminRequests from "./components/pages/AdminRequests";
import RequestDetail from "./components/RequestDetail";


function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="add-movie" element={<AddMovie />} />
            <Route path="admin-requests" element={<AdminRequests />} />
            <Route path="admin-requests/:id" element={<RequestDetail />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* changase in Admin layout and unlink this page */}
            {/* <Route path="add-show" element={<AddShow />} />
             */}
            <Route path="list-shows" element={<ListShows />} />
            <Route path="list-bookings" element={<ListBookings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
