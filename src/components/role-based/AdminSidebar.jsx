import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => (
  <div>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/users">Users</Link>
    <Link to="/users-report">Users Report</Link>
    <Link to="/profile">Profile</Link>
  </div>
);

export default AdminSidebar;