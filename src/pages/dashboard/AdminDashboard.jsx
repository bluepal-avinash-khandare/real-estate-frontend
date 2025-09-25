// // import React from 'react';
// // import Header from '../../components/common/Header';

// // const AdminDashboard = () => (
// //   <div>
// //     <Header title="Admin Dashboard" />
// //     <p>Welcome Admin</p>
// //   </div>
// // );

// // export default AdminDashboard;

// // AdminDashboard.jsx
// import React, { useContext } from 'react'; // Added useContext import
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContext';

// const AdminDashboard = () => {
//   const { signOut, user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     signOut();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//           <button 
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || 'Admin'}!</h2>
//           <p>This is your admin dashboard where you can manage users and view reports.</p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//             <div className="bg-blue-50 p-6 rounded-lg">
//               <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
//               <p className="text-3xl font-bold text-blue-600 mt-2">248</p>
//             </div>
//             <div className="bg-green-50 p-6 rounded-lg">
//               <h3 className="text-lg font-semibold text-green-800">Properties</h3>
//               <p className="text-3xl font-bold text-green-600 mt-2">56</p>
//             </div>
//             <div className="bg-purple-50 p-6 rounded-lg">
//               <h3 className="text-lg font-semibold text-purple-800">Agents</h3>
//               <p className="text-3xl font-bold text-purple-600 mt-2">24</p>
//             </div>
//           </div>
          
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <button 
//                 onClick={() => navigate('/users')}
//                 className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <h4 className="font-medium">Manage Users</h4>
//                 <p className="text-sm text-gray-600 mt-1">View and manage all users</p>
//               </button>
//               <button 
//                 onClick={() => navigate('/properties')}
//                 className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <h4 className="font-medium">View Properties</h4>
//                 <p className="text-sm text-gray-600 mt-1">Browse all properties</p>
//               </button>
//               <button 
//                 onClick={() => navigate('/users-report')}
//                 className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <h4 className="font-medium">User Reports</h4>
//                 <p className="text-sm text-gray-600 mt-1">View user statistics</p>
//               </button>
//               <button 
//                 onClick={() => navigate('/appointments-report')}
//                 className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <h4 className="font-medium">Appointment Reports</h4>
//                 <p className="text-sm text-gray-600 mt-1">View appointment statistics</p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useContext } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Luxury Real Estate Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
      ></div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU1ZTUiPjwvcmVjdD4KPC9zdmc+')] opacity-30"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to your comprehensive administrative control center</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
        
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-[#16A085] to-[#2C3E50] relative">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
            ></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-20"></div>
            <div className="absolute inset-0 flex items-center px-8">
              <h2 className="text-2xl font-bold text-white">Welcome, {user?.name || 'Admin'}!</h2>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6">This is your comprehensive admin dashboard where you can manage users, properties, agents, and view detailed reports. Monitor and control all aspects of your real estate platform from this centralized control center.</p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-1">248</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-green-800">Properties</h3>
                    <p className="text-3xl font-bold text-green-600 mt-1">56</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-purple-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-purple-800">Agents</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-1">24</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
            <div className="h-px bg-gray-200 flex-1 mx-4"></div>
            <span className="text-sm text-gray-500">What would you like to do?</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manage Users */}
            <button 
              onClick={() => navigate('/users')}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200 group"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-[#16A085]/20 group-hover:bg-[#16A085]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800 group-hover:text-[#16A085] transition-colors">Manage Users</h4>
                  <p className="text-sm text-gray-600 mt-1">View and manage all user accounts</p>
                </div>
              </div>
            </button>
            
            {/* View Properties */}
            <button 
              onClick={() => navigate('/properties')}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200 group"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-[#16A085]/20 group-hover:bg-[#16A085]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800 group-hover:text-[#16A085] transition-colors">View Properties</h4>
                  <p className="text-sm text-gray-600 mt-1">Browse and manage all property listings</p>
                </div>
              </div>
            </button>
            
            {/* User Reports */}
            <button 
              onClick={() => navigate('/users-report')}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200 group"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-[#16A085]/20 group-hover:bg-[#16A085]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800 group-hover:text-[#16A085] transition-colors">User Reports</h4>
                  <p className="text-sm text-gray-600 mt-1">View detailed user statistics and analytics</p>
                </div>
              </div>
            </button>
            
            {/* Appointment Reports */}
            <button 
              onClick={() => navigate('/appointments-report')}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200 group"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-[#16A085]/20 group-hover:bg-[#16A085]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800 group-hover:text-[#16A085] transition-colors">Appointment Reports</h4>
                  <p className="text-sm text-gray-600 mt-1">Analyze appointment trends and statistics</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        
        {/* System Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">System Overview</h3>
            <div className="h-px bg-gray-200 flex-1 mx-4"></div>
            <span className="text-sm text-gray-500">Platform performance metrics</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#16A085]">98.5%</div>
              <div className="text-sm text-gray-600 mt-1">System Uptime</div>
              <div className="text-xs text-green-600 mt-1">↑ 0.3% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#16A085]">1.2s</div>
              <div className="text-sm text-gray-600 mt-1">Avg. Response Time</div>
              <div className="text-xs text-green-600 mt-1">↓ 0.2s from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#16A085]">4.7/5</div>
              <div className="text-sm text-gray-600 mt-1">User Satisfaction</div>
              <div className="text-xs text-green-600 mt-1">↑ 0.1 from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#16A085]">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Support Availability</div>
              <div className="text-xs text-green-600 mt-1">No downtime</div>
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent System Activity</h3>
            <button className="text-sm font-medium text-[#16A085] hover:text-[#138871] transition-colors">
              View All →
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 rounded-full bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-800">System update completed successfully</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 rounded-full bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-800">New user registration: 24 new users</p>
                <p className="text-sm text-gray-600">Yesterday</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 rounded-full bg-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-800">Security alert: Unusual login activity detected</p>
                <p className="text-sm text-gray-600">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;