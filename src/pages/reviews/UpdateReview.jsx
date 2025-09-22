import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/forms/ReviewForm';
import { getReviewById, updateReview } from '../../services/reviewService';

const UpdateReview = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      const data = await getReviewById(id);
      setInitialValues(data.data);
    };
    fetchReview();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await updateReview(id, values, values.files);
      alert('Review updated');
    } catch (error) {
      console.error(error);
    }
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div>
      <ReviewForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateReview;