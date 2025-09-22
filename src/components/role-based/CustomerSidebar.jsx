import React from 'react';
import { Link } from 'react-router-dom';

const CustomerSidebar = () => (
  <div>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/properties">Properties</Link>
    <Link to="/my-properties">My Properties</Link>
    <Link to="/reviews">Reviews</Link>
    <Link to="/initiate-payment">Pay</Link>
    <Link to="/payment-history">Payment History</Link>
    <Link to="/request-appointment">Request Appointment</Link>
    <Link to="/profile">Profile</Link>
  </div>
);

export default CustomerSidebar;