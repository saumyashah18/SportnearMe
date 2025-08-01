import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignupHost from "./pages/SignupHost";
import AccountSetupHost from "./pages/AccountSetupHost";
import DashboardHost from "./pages/DashboardHost";
import SportsCatalogue from "./pages/SportsCatalogue";
import TurfBooking from "./pages/TurfBooking";
import ConfirmBooking from "./pages/ConfirmBooking";
import TurfOwnerDashboard from "./pages/TurfOwnerDashboard";
import Profile from "./pages/Profile";
import TurfProfile from "./pages/TurfProfile";
import TurfDescription from "./pages/TurfDescription";   
import ManageTurf from "./pages/ManageTurf";
import OwnerBooking from "./pages/OwnerBooking";  
import AboutUs from "./pages/AboutUs";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup-host" element={<SignupHost />} />
        <Route path="/account_setup_host" element={<AccountSetupHost />} />
        <Route path="/dashboard-host" element={<DashboardHost />} /> 
        <Route path="/catalogue" element={<SportsCatalogue />} />
        <Route path="/turfbooking" element={<TurfBooking />} />
        <Route path="/confirmbooking" element={<ConfirmBooking />} />
        <Route path="/turfownerdashboard" element={<TurfOwnerDashboard />} />
        <Route path="/turf_profile" element={<TurfProfile />} />
        <Route path="/turfdescription" element={<TurfDescription />} />
        <Route path="/manage-turf" element={<ManageTurf />} />
         <Route path="/owner_bookings" element={<OwnerBooking />} />
          <Route path="/aboutus" element={<AboutUs />} />

      </Routes>
    </Router>
  );
}

export default App;