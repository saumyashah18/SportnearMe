import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TurfOwnerDashboard() {
  const monthlyChartRef = useRef(null);
  const revenueChartRef = useRef(null);

  useEffect(() => {
    const monthlyChartCtx = monthlyChartRef.current.getContext("2d");
    const revenueChartCtx = revenueChartRef.current.getContext("2d");

    // Destroy previous charts if they exist to prevent duplication
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

  return (
    <div className="bg-[#0f172a] text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] p-6 space-y-6">
        <h1 className="text-2xl font-bold">Owner Console</h1>
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-[#334155] cursor-pointer">Dashboard</a>
          <a href="#" className="block p-2 rounded hover:bg-[#334155] cursor-pointer">Bookings</a>
          <a href="/manage-turf" className="block p-2 rounded hover:bg-[#334155] cursor-pointer">Manage Turf</a>
          <a href="#" className="block p-2 rounded hover:bg-[#334155] cursor-pointer">Revenue</a>
          <a href="#" className="block p-2 rounded hover:bg-[#334155] cursor-pointer">Support</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
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
      </main>
    </div>
  );
}