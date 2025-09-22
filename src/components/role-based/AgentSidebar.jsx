import React from 'react';
import { Link } from 'react-router-dom';

const AgentSidebar = () => (
  <div>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/properties">Properties</Link>
    <Link to="/agent-properties">Agent Properties</Link>
    <Link to="/create-property">Create Property</Link>
    <Link to="/appointments-requests">Appointments Requests</Link>
    <Link to="/appointments-report">Appointments Report</Link>
    <Link to="/leads">Leads</Link>
    <Link to="/start-chat">Start Chat</Link>
    <Link to="/profile">Profile</Link>
  </div>
);

export default AgentSidebar;