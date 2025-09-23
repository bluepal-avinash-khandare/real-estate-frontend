// // import React from 'react';
// // import Header from '../../components/common/Header';

// // const CustomerDashboard = () => (
// //   <div>
// //     <Header title="Customer Dashboard" />
// //     <p>Welcome Customer</p>
// //   </div>
// // );

// // export default CustomerDashboard;

// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../../components/common/Sidebar';

// const CustomerDashboard = () => (
//   <div className="flex min-h-screen">
//     <Sidebar />
//     <main className="flex-1 p-6 ml-0 lg:ml-64 transition-all duration-300">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Customer Dashboard</h1>
//           <p className="text-gray-600">Welcome to your personalized dashboard. Here you can manage your properties, appointments, and payments.</p>
//         </div>
//         <Outlet />
//       </div>
//     </main>
//   </div>
// );

// export default CustomerDashboard;


//**********************************88 */
// CustomerDashboard.js
// CustomerDashboard.jsx
import React, { useContext } from 'react'; // Added useContext import
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const CustomerDashboard = () => {
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
          <h1 className="text-3xl font-bold text-gray-800">Customer Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || 'Customer'}!</h2>
          <p>This is your customer dashboard where you can browse properties and manage your favorites.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Saved Properties</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Appointments</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">3</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Payments</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">2</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/properties')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">Browse Properties</h4>
                <p className="text-sm text-gray-600 mt-1">View all available properties</p>
              </button>
              <button 
                onClick={() => navigate('/my-properties')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">My Properties</h4>
                <p className="text-sm text-gray-600 mt-1">Manage your saved properties</p>
              </button>
              <button 
                onClick={() => navigate('/request-appointment')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">Request Appointment</h4>
                <p className="text-sm text-gray-600 mt-1">Schedule a property viewing</p>
              </button>
              <button 
                onClick={() => navigate('/payment-history')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">Payment History</h4>
                <p className="text-sm text-gray-600 mt-1">View your payment records</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
