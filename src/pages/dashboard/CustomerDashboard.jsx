import React, { useContext } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Beach Villa Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
      ></div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU1ZTUiPjwvcmVjdD4KPC9zdmc+')] opacity-30"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Customer Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to your personalized real estate experience</p>
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
              <h2 className="text-2xl font-bold text-white">Welcome, {user?.name || 'Customer'}!</h2>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6">This is your personalized dashboard where you can browse properties, manage appointments, and track payments. Explore our exclusive collection of luxury villas and beachfront properties.</p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-blue-800">Saved Properties</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-1">12</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-green-800">Appointments</h3>
                    <p className="text-3xl font-bold text-green-600 mt-1">3</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-purple-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-purple-800">Payments</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-1">2</p>
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
            {/* Browse Properties */}
            <button 
              onClick={() => navigate('/properties')}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200 group"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-[#16A085]/20 group-hover:bg-[#16A085]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800 group-hover:text-[#16A085] transition-colors">Browse Properties</h4>
                  <p className="text-sm text-gray-600 mt-1">View our exclusive collection of luxury villas and beachfront properties</p>
                </div>
              </div>
            </button>
            
            {/* My Properties */}
            <button 
              onClick={() => navigate('/my-properties')}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200 group"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-[#16A085]/20 group-hover:bg-[#16A085]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800 group-hover:text-[#16A085] transition-colors">My Properties</h4>
                  <p className="text-sm text-gray-600 mt-1">Manage your saved properties and favorites</p>
                </div>
              </div>
            </button>
            
            {/* Request Appointment */}
            <button 
              onClick={() => navigate('/request-appointment')}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200 group"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-[#16A085]/20 group-hover:bg-[#16A085]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800 group-hover:text-[#16A085] transition-colors">Request Appointment</h4>
                  <p className="text-sm text-gray-600 mt-1">Schedule a property viewing with our agents</p>
                </div>
              </div>
            </button>
            
            {/* Payment History */}
            <button 
              onClick={() => navigate('/payment-history')}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-left hover:shadow-md transition-all border border-gray-200 group"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-[#16A085]/20 group-hover:bg-[#16A085]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800 group-hover:text-[#16A085] transition-colors">Payment History</h4>
                  <p className="text-sm text-gray-600 mt-1">View your payment records and transactions</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        
        {/* Featured Properties */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Featured Properties</h3>
            <button className="text-sm font-medium text-[#16A085] hover:text-[#138871] transition-colors">
              View All →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Property 1 */}
            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}></div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800">Oceanview Villa</h4>
                <p className="text-sm text-gray-600 mt-1">Miami Beach, Florida</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold text-[#16A085]">$2,450,000</span>
                  <button className="text-xs bg-[#16A085] text-white px-3 py-1 rounded-full hover:bg-[#138871] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            
            {/* Property 2 */}
            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}></div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800">Luxury Penthouse</h4>
                <p className="text-sm text-gray-600 mt-1">Manhattan, New York</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold text-[#16A085]">$4,200,000</span>
                  <button className="text-xs bg-[#16A085] text-white px-3 py-1 rounded-full hover:bg-[#138871] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            
            {/* Property 3 */}
            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}></div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800">Beachfront Estate</h4>
                <p className="text-sm text-gray-600 mt-1">Malibu, California</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold text-[#16A085]">$5,750,000</span>
                  <button className="text-xs bg-[#16A085] text-white px-3 py-1 rounded-full hover:bg-[#138871] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;