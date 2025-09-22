import React from 'react';

const Header = ({ title }) => (
  <header className="bg-white shadow p-4">
    <h1 className="text-2xl font-bold">{title}</h1>
  </header>
);

export default Header;