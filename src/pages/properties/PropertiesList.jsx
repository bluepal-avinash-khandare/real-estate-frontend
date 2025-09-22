import React, { useState, useEffect } from 'react';
import { getProperties } from '../../services/propertyService';
import Card from '../../components/common/Card';
import Filter from '../../components/common/Filter';

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getProperties({ q: filter });
      setProperties(data.data.content);
    };
    fetchProperties();
  }, [filter]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <Filter onChange={handleFilterChange} placeholder="Search Properties" />
      {properties.map((prop) => (
        <Card key={prop.id} title={prop.title} description={prop.description} />
      ))}
    </div>
  );
};

export default PropertiesList;