import React, { useState, useEffect, useContext } from 'react';
import { getAgentProperties } from '../../services/propertyService';
import { AuthContext } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';

const AgentProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getAgentProperties(user.id);
      setProperties(data.data);
    };
    fetchProperties();
  }, [user.id]);

  return (
    <div>
      {properties.map((prop) => (
        <Card key={prop.id} title={prop.title} description={prop.description} />
      ))}
    </div>
  );
};

export default AgentProperties;