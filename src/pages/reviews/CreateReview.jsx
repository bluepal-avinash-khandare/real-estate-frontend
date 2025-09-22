import React from 'react';
import ReviewForm from '../../components/forms/ReviewForm';
import { createReview } from '../../services/reviewService';

const CreateReview = () => {
  const initialValues = { userId: '', propertyId: '', rating: 1, comment: '', title: '', files: [] };

  const handleSubmit = async (values) => {
    try {
      await createReview(values, values.files);
      alert('Review created');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ReviewForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateReview;