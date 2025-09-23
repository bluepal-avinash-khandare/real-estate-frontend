// // import React from 'react';
// // import Header from '../../components/common/Header';

// // const AgentDashboard = () => (
// //   <div>
// //     <Header title="Agent Dashboard" />
// //     <p>Welcome Agent</p>
// //   </div>
// // );

// // export default AgentDashboard;

// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../../components/common/Sidebar';

// const AgentDashboard = () => (
//   <div className="flex min-h-screen">
//     <Sidebar />
//     <main className="flex-1 p-6 ml-0 lg:ml-64 transition-all duration-300">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Agent Dashboard</h1>
//           <p className="text-gray-600">Welcome to your agent dashboard. Here you can manage your properties, appointments, and client interactions.</p>
//         </div>
//         <Outlet />
//       </div>
//     </main>
//   </div>
// );

// export default AgentDashboard;

//******************************** */

// AgentDashboard.js
// AgentDashboard.jsx
import React, { useContext } from 'react'; // Added useContext import
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const AgentDashboard = () => {
  const { signOut, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Agent Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || 'Agent'}!</h2>
          <p>This is your agent dashboard where you can manage properties and appointments.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">My Properties</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">8</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Appointments</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">5</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Leads</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">14</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/agent-properties')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">My Properties</h4>
                <p className="text-sm text-gray-600 mt-1">Manage your listed properties</p>
              </button>
              <button 
                onClick={() => navigate('/create-property')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">Create Property</h4>
                <p className="text-sm text-gray-600 mt-1">Add a new property listing</p>
              </button>
              <button 
                onClick={() => navigate('/appointments-requests')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">Appointment Requests</h4>
                <p className="text-sm text-gray-600 mt-1">View pending appointments</p>
              </button>
              <button 
                onClick={() => navigate('/leads')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">Leads</h4>
                <p className="text-sm text-gray-600 mt-1">Manage your customer leads</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;