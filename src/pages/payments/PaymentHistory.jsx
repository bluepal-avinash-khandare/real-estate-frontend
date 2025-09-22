import React, { useState, useEffect } from 'react';
import { getPaymentHistory } from '../../services/paymentService';
import Table from '../../components/common/Table';
import Filter from '../../components/common/Filter';

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getPaymentHistory({ search: filter });
      setHistory(data.data.content);
    };
    fetchHistory();
  }, [filter]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const headers = ['ID', 'Amount', 'Status'];

  const rows = history.map((payment) => ({ id: payment.paymentId, amount: payment.amount, status: payment.status }));

  return (
    <div>
      <Filter onChange={handleFilterChange} placeholder="Search Payments" />
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default PaymentHistory;