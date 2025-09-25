// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ReviewForm from '../../components/forms/ReviewForm';
// import { getReviewById, updateReview } from '../../services/reviewService';

// const UpdateReview = () => {
//   const { id } = useParams();
//   const [initialValues, setInitialValues] = useState(null);

//   useEffect(() => {
//     const fetchReview = async () => {
//       const data = await getReviewById(id);
//       setInitialValues(data.data);
//     };
//     fetchReview();
//   }, [id]);

//   const handleSubmit = async (values) => {
//     try {
//       await updateReview(id, values, values.files);
//       alert('Review updated');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!initialValues) return <p>Loading...</p>;

//   return (
//     <div>
//       <ReviewForm initialValues={initialValues} onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default UpdateReview;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewForm from '../../components/forms/ReviewForm';
import { getReviewById, updateReview } from '../../services/reviewService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getReviewById(id);
        
        if (response.success) {
          const reviewData = response.data;
          setInitialValues({
            userId: reviewData.userId,
            propertyId: reviewData.propertyId,
            rating: reviewData.rating,
            title: reviewData.title,
            comment: reviewData.comment,
            files: [] // Start with empty files array for updates
          });
        } else {
          throw new Error(response.message || 'Failed to fetch review');
        }
      } catch (err) {
        console.error('Error fetching review:', err);
        setError(err.message || 'An unexpected error occurred');
        toast.error(`Failed to load review: ${err.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchReview();
  }, [id]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    
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
      const response = await updateReview(id, formData);
      
      // Handle successful response
      if (response.success) {
        toast.success('Review updated successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Redirect to reviews page after successful update
        setTimeout(() => {
          navigate('/reviews');
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to update review');
      }
    } catch (err) {
      console.error('Error updating review:', err);
      toast.error(`Failed to update review: ${err.message}`, {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-300">Loading review details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800/70 backdrop-blur-md border border-gray-700/50 rounded-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-bold text-white mb-2">Failed to Load Review</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/reviews')}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Reviews
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Update Review</h1>
            <button 
              onClick={() => navigate('/reviews')}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              ← Back to Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-2/3">
            <ReviewForm 
              initialValues={initialValues} 
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isUpdate={true}
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-4">Update Guidelines</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-white">Be Accurate</h3>
                    <p className="text-sm text-gray-400 mt-1">Ensure all information is correct and up-to-date.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-white">Add New Photos</h3>
                    <p className="text-sm text-gray-400 mt-1">You can add new photos to supplement your review.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-white">Update Rating</h3>
                    <p className="text-sm text-gray-400 mt-1">Adjust your rating if your experience has changed.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <h3 className="text-sm font-medium text-white mb-2">Review History</h3>
                <p className="text-sm text-gray-400 mb-4">View previous versions of this review.</p>
                <button 
                  onClick={() => navigate(`/reviews/${id}/history`)}
                  className="w-full py-2 px-4 bg-gray-700/50 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateReview;