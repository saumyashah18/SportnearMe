import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import SignupHost from "./pages/SignupHost";
import AccountSetupHost from "./pages/AccountSetupHost";
import DashboardHost from "./pages/DashboardHost";
import SportsCatalogue from "./pages/SportsCatalogue";
import TurfBooking from "./pages/TurfBooking";
import ConfirmBooking from "./pages/ConfirmBooking";
import TurfOwnerDashboard from "./pages/TurfOwnerDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup-host" element={<SignupHost />} />
        <Route path="/account_setup_host" element={<AccountSetupHost />} />
        <Route path="/dashboard-host" element={<DashboardHost />} /> 
        <Route path="/catalogue" element={<SportsCatalogue />} />
        <Route path="/turfbooking" element={<TurfBooking />} />
        <Route path="/confirmbooking" element={<ConfirmBooking />} />
        <Route path="/turfownerdashboard" element={<TurfOwnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;