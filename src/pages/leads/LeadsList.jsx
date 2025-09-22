import React, { useState, useEffect, useContext } from 'react';
import { getLeadsForAgent } from '../../services/leadService';
import { AuthContext } from '../../contexts/AuthContext';
import Table from '../../components/common/Table';
import Filter from '../../components/common/Filter';

const LeadsList = () => {
  const { user } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      const data = await getLeadsForAgent(user.id, { search: filter, status });
      setLeads(data.data.content);
    };
    fetchLeads();
  }, [filter, status, user.id]);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  const headers = ['ID', 'Status'];

  const rows = leads.map((lead) => ({ id: lead.id, status: lead.status }));

  return (
    <div>
      <Filter onChange={handleFilterChange} placeholder="Search Leads" />
      <Filter onChange={handleStatusChange} placeholder="Status" />
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default LeadsList;