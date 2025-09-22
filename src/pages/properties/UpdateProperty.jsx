import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyForm from '../../components/forms/PropertyForm';
import { getProperty, updateProperty } from '../../services/propertyService';

const UpdateProperty = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await getProperty(id);
      setInitialValues(data.data);
    };
    fetchProperty();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await updateProperty(id, values, values.images);
      alert('Property updated');
    } catch (error) {
      console.error(error);
    }
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div>
      <PropertyForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateProperty;