import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/userService';
import Table from '../../components/common/Table';
import Filter from '../../components/common/Filter';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers({ search: filter });
      setUsers(data.data.content);
    };
    fetchUsers();
  }, [filter]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const headers = ['ID', 'Name', 'Email'];

  const rows = users.map((user) => ({ id: user.id, name: user.name, email: user.email }));

  return (
    <div>
      <Filter onChange={handleFilterChange} placeholder="Search Users" />
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default UsersList;