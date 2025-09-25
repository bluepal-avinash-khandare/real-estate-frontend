// import React from 'react';
// import ReviewForm from '../../components/forms/ReviewForm';
// import { createReview } from '../../services/reviewService';

// const CreateReview = () => {
//   const initialValues = { userId: '', propertyId: '', rating: 1, comment: '', title: '', files: [] };

//   const handleSubmit = async (values) => {
//     try {
//       await createReview(values, values.files);
//       alert('Review created');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <ReviewForm initialValues={initialValues} onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default CreateReview;


import React, { useState } from 'react';
import ReviewForm from '../../components/forms/ReviewForm';
import { createReview } from '../../services/reviewService';
import { useNavigate } from 'react-router-dom';

const CreateReview = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const initialValues = { 
    userId: '', 
    propertyId: '', 
    rating: 1, 
    comment: '', 
    title: '', 
    files: [] 
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(values).forEach(key => {
        if (key === 'files') {
          // Append each file individually
          values.files.forEach(file => {
            formData.append('files', file);
          });
        } else {
          formData.append(key, values[key]);
        }
      });

      // Call API service
      const response = await createReview(formData);
      
      // Handle successful response
      if (response.success) {
        toast.success('Review submitted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Redirect to reviews page after successful submission
        setTimeout(() => {
          navigate('/reviews');
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error creating review:', err);
      setError(err.message || 'An unexpected error occurred');
      
      toast.error(`Failed to submit review: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ReviewForm 
        initialValues={initialValues} 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      
      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-red-900/80 backdrop-blur-sm border border-red-500/50 rounded-xl p-4 shadow-lg max-w-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-400">Submission Failed</h3>
                <div className="mt-1 text-sm text-red-300">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateReview;