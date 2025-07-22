import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useAuth } from "../Hooks/useAuth";


export default function TurfOwnerDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [ownerData, setOwnerData] = useState(null);
  const monthlyChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const { currentUser } = useAuth();
  const firebaseUid = currentUser?.uid;


  useEffect(() => {
    fetch(`/api/turf-owner/${firebaseUid}`)
      .then((res) => res.json())
      .then((data) => setOwnerData(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const monthlyChartCtx = monthlyChartRef.current.getContext("2d");
    const revenueChartCtx = revenueChartRef.current.getContext("2d");

    if (monthlyChartRef.current.chartInstance) {
      monthlyChartRef.current.chartInstance.destroy();
    }
    if (revenueChartRef.current.chartInstance) {
      revenueChartRef.current.chartInstance.destroy();
    }

    monthlyChartRef.current.chartInstance = new Chart(monthlyChartCtx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Bookings",
            data: [35, 50, 40, 60, 75, 90],
            backgroundColor: "#3b82f6",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    revenueChartRef.current.chartInstance = new Chart(revenueChartCtx, {
      type: "pie",
      data: {
        labels: ["Badminton", "Tennis", "Pickleball"],
        datasets: [
          {
            data: [30000, 15000, 15000],
            backgroundColor: ["#10b981", "#6366f1", "#f97316"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }, []);

  function ProfilePage({ ownerData }) {
    if (!ownerData) return <p className="text-white">Loading...</p>;

    return (
      <div className="bg-[#334155] p-6 rounded text-white space-y-4">
        <h2 className="text-xl font-semibold">Owner Profile</h2>
        <div><strong>Name:</strong> {ownerData.name}</div>
        <div><strong>Date of Birth:</strong> {ownerData.dob ? new Date(ownerData.dob).toLocaleDateString() : "N/A"}</div>
        <div><strong>Email:</strong> {ownerData.email}</div>
        <div><strong>Gender:</strong> {ownerData.gender}</div>
        <hr className="border-gray-600" />
        <div><strong>Turf Name:</strong> {ownerData.turfName}</div>
        <div><strong>Turf Address:</strong> {ownerData.turfAddress}</div>
        <div><strong>Turf Description:</strong> {ownerData.turfDescription || "N/A"}</div>
        <div>
          <strong>Location:</strong> {ownerData.turfLocation?.coordinates?.join(", ") || "N/A"}
          {ownerData.turfLocation?.googleMapsUrl && (
            <div>
              <a
                href={ownerData.turfLocation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                View on Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] p-6 space-y-6">
        <h1 className="text-2xl font-bold">Owner Console</h1>
        <nav className="space-y-2">
          <button onClick={() => setActivePage("dashboard")} className={`block w-full text-left p-2 rounded hover:bg-[#334155] ${activePage === "dashboard" ? "bg-[#334155]" : ""}`}>Dashboard</button>
          <button onClick={() => setActivePage("bookings")} className={`block w-full text-left p-2 rounded hover:bg-[#334155] ${activePage === "bookings" ? "bg-[#334155]" : ""}`}>Bookings</button>
          <a href="/manage-turf" className="block p-2 rounded hover:bg-[#334155]">Manage Turf</a>
          <button onClick={() => setActivePage("revenue")} className={`block w-full text-left p-2 rounded hover:bg-[#334155] ${activePage === "revenue" ? "bg-[#334155]" : ""}`}>Revenue</button>
          <button onClick={() => setActivePage("profile")} className={`block w-full text-left p-2 rounded hover:bg-[#334155] ${activePage === "profile" ? "bg-[#334155]" : ""}`}>Profile</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {activePage === "dashboard" && (
          <>
            {/* Turf Banner */}
            <section className="w-full mt-4 px-4 overflow-x-auto whitespace-nowrap space-x-2 flex">
              <img src="/images/sport.jpeg" className="inline-block rounded-lg cursor-pointer" alt="banner" />
            </section>

            {/* Analytics */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 mt-6">
              <div className="bg-[#334155] p-4 rounded shadow">
                <p className="text-sm text-gray-400">Total Revenue</p>
                <h3 className="text-2xl font-bold">₹60,000</h3>
              </div>
              <div className="bg-[#334155] p-4 rounded shadow">
                <p className="text-sm text-gray-400">This Month's Bookings</p>
                <h3 className="text-2xl font-bold">112</h3>
              </div>
              <div className="bg-[#334155] p-4 rounded shadow">
                <p className="text-sm text-gray-400">Available Slots</p>
                <h3 className="text-2xl font-bold">6am–10am, 5pm–9pm</h3>
              </div>
            </section>

            {/* Charts */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 text-black">
                <h4 className="font-semibold mb-2">Monthly Bookings Overview</h4>
                <canvas ref={monthlyChartRef}></canvas>
              </div>
              <div className="bg-white rounded-lg p-4 text-black">
                <h4 className="font-semibold mb-2">Revenue by Sport</h4>
                <canvas ref={revenueChartRef}></canvas>
              </div>
            </section>
          </>
        )}

        {activePage === "profile" && (
          <ProfilePage ownerData={ownerData} />
        )}
      </main>
    </div>
  );
}
