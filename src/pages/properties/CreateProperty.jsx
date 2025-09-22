import React from 'react';
import PropertyForm from '../../components/forms/PropertyForm';
import { createProperty } from '../../services/propertyService';

const CreateProperty = () => {
  const initialValues = { title: '', description: '', address: '', price: 0, bedrooms: 0, bathrooms: 0, area: 0, images: [] };

  const handleSubmit = async (values) => {
    try {
      await createProperty(values, values.images);
      alert('Property created');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PropertyForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateProperty;