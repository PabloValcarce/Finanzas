import React from 'react';
import NavBar from '../../components/NavBarDashboard/NavBarDashboard';
import AuthForm from '../../components/Auth/AuthForm';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="main-container">
      <NavBar />
      <div className="dashboard-container">
          <AuthForm />
      </div>
    </div>
  );
}

export default Dashboard;
