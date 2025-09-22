import React, { useState, useEffect, useContext } from 'react';
import { getAppointmentsRequests } from '../../services/appointmentService';
import { AuthContext } from '../../contexts/AuthContext';
import Table from '../../components/common/Table';
import Filter from '../../components/common/Filter';

const AppointmentsRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getAppointmentsRequests(user.id, { search: filter });
      setRequests(data.data.content);
    };
    fetchRequests();
  }, [filter, user.id]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const headers = ['ID', 'Buyer', 'Status'];

  const rows = requests.map((req) => ({ id: req.id, buyer: req.buyerDetails, status: req.status }));

  return (
    <div>
      <Filter onChange={handleFilterChange} placeholder="Search Appointments" />
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default AppointmentsRequests;