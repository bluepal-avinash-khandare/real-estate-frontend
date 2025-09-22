import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AdminSidebar from '../role-based/AdminSidebar';
import CustomerSidebar from '../role-based/CustomerSidebar';
import AgentSidebar from '../role-based/AgentSidebar';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <aside className="w-64 bg-gray-100 p-4">
      {user.role === 'ADMIN' && <AdminSidebar />}
      {user.role === 'CUSTOMER' && <CustomerSidebar />}
      {user.role === 'AGENT' && <AgentSidebar />}
    </aside>
  );
};

export default Sidebar;