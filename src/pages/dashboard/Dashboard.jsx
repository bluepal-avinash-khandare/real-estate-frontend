import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AdminDashboard from './dashboard/AdminDashboard';
import CustomerDashboard from './dashboard/CustomerDashboard';
import AgentDashboard from './dashboard/AgentDashboard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A085] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>;
  }
  
  switch (user.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'CUSTOMER':
      return <CustomerDashboard />;
    case 'AGENT':
      return <AgentDashboard />;
    default:
      return <CustomerDashboard />; // fallback to customer dashboard
  }
};

export default Dashboard;