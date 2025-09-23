// import React from 'react';
// import Header from '../../components/common/Header';

// const AdminDashboard = () => (
//   <div>
//     <Header title="Admin Dashboard" />
//     <p>Welcome Admin</p>
//   </div>
// );

// export default AdminDashboard;

// AdminDashboard.jsx
import React, { useContext } from 'react'; // Added useContext import
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const AdminDashboard = () => {
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
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || 'Admin'}!</h2>
          <p>This is your admin dashboard where you can manage users and view reports.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">248</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Properties</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">56</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Agents</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">24</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/users')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">Manage Users</h4>
                <p className="text-sm text-gray-600 mt-1">View and manage all users</p>
              </button>
              <button 
                onClick={() => navigate('/properties')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">View Properties</h4>
                <p className="text-sm text-gray-600 mt-1">Browse all properties</p>
              </button>
              <button 
                onClick={() => navigate('/users-report')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">User Reports</h4>
                <p className="text-sm text-gray-600 mt-1">View user statistics</p>
              </button>
              <button 
                onClick={() => navigate('/appointments-report')}
                className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">Appointment Reports</h4>
                <p className="text-sm text-gray-600 mt-1">View appointment statistics</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;