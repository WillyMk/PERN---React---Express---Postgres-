import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Welcome to School Management Dashboard</h2>
      <p>Here you can manage students, courses, and settings.</p>
      <div className="cards">
        <div className="card">Total Students: 120</div>
        <div className="card">Total Teachers: 15</div>
        <div className="card">Active Courses: 8</div>
      </div>
    </div>
  );
};

export default Dashboard;