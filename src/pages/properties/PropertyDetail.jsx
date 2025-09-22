import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProperty } from '../../services/propertyService';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await getProperty(id);
      setProperty(data.data);
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div>
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      {/* Display images, etc. */}
    </div>
  );
};

export default PropertyDetail;