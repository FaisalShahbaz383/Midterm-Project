import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCustomers } from "../api/customerApi";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    inProgress: 0,
    closed: 0,
    assigned: 0,
    unassigned: 0,
  });

  useEffect(() => {
    getCustomers().then((res) => {
      const customers = res.data;

      setStats({
        total: customers.length,
        new: customers.filter(c => c.status === "New").length,
        contacted: customers.filter(c => c.status === "Contacted").length,
        inProgress: customers.filter(c => c.status === "In Progress").length,
        closed: customers.filter(c => c.status === "Closed").length,
        assigned: customers.filter(c => c.assignedTo).length,
        unassigned: customers.filter(c => !c.assignedTo).length,
      });
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="app-container">
        <h2 className="page-title">Dashboard</h2>

        <div className="dashboard-grid">
          <div className="stat-card">
            <h3>Total Customers</h3>
            <p>{stats.total}</p>
          </div>

          <div className="stat-card">
            <h3>New</h3>
            <p>{stats.new}</p>
          </div>

          <div className="stat-card">
            <h3>Contacted</h3>
            <p>{stats.contacted}</p>
          </div>

          <div className="stat-card">
            <h3>In Progress</h3>
            <p>{stats.inProgress}</p>
          </div>

          <div className="stat-card">
            <h3>Closed</h3>
            <p>{stats.closed}</p>
          </div>

          <div className="stat-card">
            <h3>Assigned</h3>
            <p>{stats.assigned}</p>
          </div>

          <div className="stat-card">
            <h3>Unassigned</h3>
            <p>{stats.unassigned}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;