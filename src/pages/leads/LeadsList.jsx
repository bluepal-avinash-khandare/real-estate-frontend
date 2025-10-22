// import React, { useState, useEffect, useContext } from 'react';
// import { getLeadsForAgent } from '../../services/leadService';
// import { AuthContext } from '../../contexts/AuthContext';
// import Table from '../../components/common/Table';
// import Filter from '../../components/common/Filter';

// const LeadsList = () => {
//   const { user } = useContext(AuthContext);
//   const [leads, setLeads] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     const fetchLeads = async () => {
//       const data = await getLeadsForAgent(user.id, { search: filter, status });
//       setLeads(data.data.content);
//     };
//     fetchLeads();
//   }, [filter, status, user.id]);

//   const handleFilterChange = (e) => setFilter(e.target.value);
//   const handleStatusChange = (e) => setStatus(e.target.value);

//   const headers = ['ID', 'Status'];

//   const rows = leads.map((lead) => ({ id: lead.id, status: lead.status }));

//   return (
//     <div>
//       <Filter onChange={handleFilterChange} placeholder="Search Leads" />
//       <Filter onChange={handleStatusChange} placeholder="Status" />
//       <Table headers={headers} rows={rows} />
//     </div>
//   );
// };

// export default LeadsList;

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getLeadsForAgent } from '../../services/leadService';
import { AuthContext } from '../../contexts/AuthContext';
import Table from '../../components/common/Table';
import Filter from '../../components/common/Filter';

const LeadsList = () => {
  const { user } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, [filter, status, user.id]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await getLeadsForAgent(user.id, { search: filter, status });
      setLeads(data.data.content);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const headers = ['ID', 'Customer', 'Appointment', 'Status', 'Inquiry', 'Actions'];

  const rows = leads.map((lead) => ({ 
    id: lead.id, 
    customer: `Customer #${lead.customerId}`,
    appointment: lead.appointmentId ? `Appointment #${lead.appointmentId}` : 'N/A',
    status: (
      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
        {lead.status}
      </span>
    ),
    inquiry: lead.inquiryDetails ? lead.inquiryDetails.substring(0, 50) + '...' : 'N/A',
    actions: (
      <div className="flex space-x-2">
        <Link
          to={`/agent/start-chat?leadId=${lead.id}`}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-[#16A085] hover:bg-[#138871] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
        >
          Start Chat
        </Link>
        {lead.appointmentId && (
          <Link
            to={`/agent/appointments/${lead.appointmentId}`}
            className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            View Appointment
          </Link>
        )}
      </div>
    )
  }));

  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => lead.status?.toLowerCase() === 'new').length;
  const contactedLeads = leads.filter(lead => lead.status?.toLowerCase() === 'contacted').length;
  const inProgressLeads = leads.filter(lead => lead.status?.toLowerCase() === 'in-progress').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-600 mt-2">Track and manage all your potential clients</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">New Leads</p>
                <p className="text-2xl font-bold text-gray-900">{newLeads}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-gray-900">{contactedLeads}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressLeads}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">All Leads</h2>
                <p className="text-gray-600 mt-1">View and manage your potential clients</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <Filter 
                    onChange={handleFilterChange} 
                    placeholder="Search leads..." 
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#16A085] focus:border-[#16A085]"
                  />
                </div>
                
                <div className="relative rounded-md shadow-sm">
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#16A085] focus:border-[#16A085] sm:text-sm rounded-lg"
                  >
                    <option value="">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#16A085]"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No leads found</h3>
                <p className="mt-1 text-gray-500">
                  {filter || status ? 'No leads match your search criteria.' : 'You don\'t have any leads yet.'}
                </p>
              </div>
            ) : (
              <Table 
                headers={headers} 
                rows={rows} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsList;