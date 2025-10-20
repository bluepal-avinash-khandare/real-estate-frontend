import React, { useState, useEffect, useContext } from 'react';
import { getProperty } from '../../services/propertyService';
import { requestAppointment } from '../../services/appointmentService';
import { verifyPayment } from '../../services/paymentService';
import { getReviewsByProperty, createReview, updateReview, deleteReview } from '../../services/reviewService';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // Track payment status
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentMessage, setAppointmentMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const [appointmentError, setAppointmentError] = useState(null);
  const [paymentVerificationError, setPaymentVerificationError] = useState(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  
  // Review states
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewsPage, setReviewsPage] = useState(0);
  const [reviewsTotalPages, setReviewsTotalPages] = useState(1);
  const [reviewsError, setReviewsError] = useState(null);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const data = await getProperty(id);
        setProperty(data.data);
        setError(null);
        
        // Check if user has already paid for this property
        checkPaymentStatus();
        
        // Fetch reviews for this property
        fetchReviews();
      } catch (err) {
        setError('Failed to fetch property details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // Function to check payment status
  const checkPaymentStatus = () => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      setHasPaid(false);
      setPaymentStatus(null);
      return;
    }
    
    // Try to get payment status from localStorage
    const paymentKey = `payment_${id}_user_${user.userId || user.id}`;
    const paymentData = localStorage.getItem(paymentKey);
    
    if (paymentData) {
      const payment = JSON.parse(paymentData);
      setHasPaid(payment.paid);
      setPaymentStatus(payment.status || 'PENDING');
    } else {
      setHasPaid(false);
      setPaymentStatus(null);
    }
  };

  // Function to recheck payment status with backend
  const recheckPaymentStatus = async () => {
    if (!isAuthenticated || !user) return;
    
    setCheckingPayment(true);
    
    try {
      const paymentKey = `payment_${id}_user_${user.userId || user.id}`;
      const paymentDataString = localStorage.getItem(paymentKey);
      
      if (!paymentDataString) {
        setHasPaid(false);
        setPaymentStatus(null);
        return;
      }
      
      const paymentData = JSON.parse(paymentDataString);
      
      // Verify payment with backend
      const verificationResponse = await verifyPayment({ paymentId: paymentData.paymentId });
      
      if (verificationResponse.success && verificationResponse.data.verified) {
        // Update localStorage with verified status
        const updatedPaymentData = {
          ...paymentData,
          paid: true,
          status: 'PAID',
          verified: true
        };
        localStorage.setItem(paymentKey, JSON.stringify(updatedPaymentData));
        setHasPaid(true);
        setPaymentStatus('PAID');
      } else if (verificationResponse.data.status === 'PENDING') {
        // Update localStorage with pending status
        const updatedPaymentData = {
          ...paymentData,
          paid: false,
          status: 'PENDING',
          verified: false
        };
        localStorage.setItem(paymentKey, JSON.stringify(updatedPaymentData));
        setHasPaid(false);
        setPaymentStatus('PENDING');
      }
    } catch (error) {
      console.error('Error rechecking payment status:', error);
    } finally {
      setCheckingPayment(false);
    }
  };

  // Review functions
  const fetchReviews = async (page = 0) => {
    if (!isAuthenticated) return;
    
    setReviewsLoading(true);
    setReviewsError(null);
    try {
      const response = await getReviewsByProperty(id, {
        page,
        size: 5,
        sortBy: 'createdAt',
        sortDir: 'DESC'
      });
      
      setReviews(response.data.content || []);
      setReviewsTotalPages(response.data.totalPages || 1);
      setReviewsPage(page);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setReviewsError('Failed to load reviews');
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    setEditingReview(null);
    fetchReviews(0); // Refresh reviews and go to first page
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await deleteReview(reviewId);
      fetchReviews(reviewsPage); // Refresh current page
    } catch (err) {
      console.error('Failed to delete review:', err);
      alert('Failed to delete review. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setShowReviewForm(false);
  };

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/properties/${id}` } });
      return;
    }
    setShowReviewForm(true);
  };

  // Review Form Component
const ReviewForm = () => {
  const [rating, setRating] = useState(editingReview?.rating || 0);
  const [comment, setComment] = useState(editingReview?.comment || '');
  const [title, setTitle] = useState(editingReview?.title || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setReviewSubmitting(true);
    setReviewError(null);

    if (rating === 0) {
      setReviewError('Please select a rating');
      setReviewSubmitting(false);
      return;
    }

    if (!comment.trim()) {
      setReviewError('Please enter a comment');
      setReviewSubmitting(false);
      return;
    }

    try {
      // Get the current user ID from context
      const userId = user?.id || user?.userId;
      
      if (!userId) {
        throw new Error('User not found. Please log in again.');
      }

      const reviewData = {
        userId: parseInt(userId),
        propertyId: parseInt(id),
        rating: parseInt(rating),
        comment: comment.trim(),
        title: title.trim() || null
      };

      console.log('Submitting review data:', reviewData);

      if (editingReview) {
        await updateReview(editingReview.id, reviewData, []);
      } else {
        const formData = new FormData();
        
        // Convert the review data to JSON string and append as 'data'
        formData.append('data', JSON.stringify(reviewData));
        
        // Note: If you want to upload files, you would add them here
        // formData.append('files', file);
        
        console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        
        await createReview(formData);
      }

      // Reset form
      setRating(0);
      setComment('');
      setTitle('');
      
      handleReviewSubmitted();
    } catch (err) {
      console.error('Error in review submission:', err);
      setReviewError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };


    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {editingReview ? 'Edit Review' : 'Write a Review'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none transition-transform hover:scale-110"
                >
                  {star <= rating ? (
                    <span className="text-yellow-400">★</span>
                  ) : (
                    <span className="text-gray-300">★</span>
                  )}
                </button>
              ))}
            </div>
            {rating === 0 && (
              <p className="text-red-500 text-sm mt-1">Please select a rating</p>
            )}
          </div>

          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Review Title (Optional)
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-transparent"
              placeholder="Give your review a title..."
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Review Comment *
            </label>
            <textarea
              id="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-transparent"
              placeholder="Share your experience with this property..."
              required
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{comment.length}/500 characters</p>
          </div>

          {/* Error Message */}
          {reviewError && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{reviewError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={reviewSubmitting || rating === 0 || !comment.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] disabled:opacity-50 transition-colors"
            >
              {reviewSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {editingReview ? 'Updating...' : 'Submitting...'}
                </>
              ) : (
                editingReview ? 'Update Review' : 'Submit Review'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Review List Component
  const ReviewList = () => {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const renderStars = (rating) => {
      return (
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-lg ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      );
    };

    if (!reviews || reviews.length === 0) {
      return (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
          <p className="mt-1 text-sm text-gray-500">Be the first to share your experience!</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {review.title && (
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {review.title}
                  </h4>
                )}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#16A085] to-[#2C3E50] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {review.userName ? review.userName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {review.userName || 'Anonymous User'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons - Show only for review owner or admin */}
              {(user?.id === review.userId || user?.role === 'ADMIN') && (
                <div className="flex space-x-2">
                  {user?.id === review.userId && (
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

            {/* Review Image */}
            {review.imageUrl && (
              <div className="mt-4">
                <img
                  src={review.imageUrl}
                  alt="Review"
                  className="h-40 w-auto object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => window.open(review.imageUrl, '_blank')}
                />
              </div>
            )}

            {/* Updated indicator */}
            {review.updatedAt && review.updatedAt !== review.createdAt && (
              <p className="text-xs text-gray-500 mt-2">
                Updated on {formatDate(review.updatedAt)}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Format currency for Indian Rupees
  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    
    // Convert to number if it's a string
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    // Format with Indian number system
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount);
  };

  // Handle payment navigation
  const handlePayment = () => {
    navigate('/initiate-payment', {
      state: {
        amount: 200,
        gateway: 'razorpay',
        propertyId: id
      }
    });
    setShowContactPopup(false);
  };

  // Handle appointment form submission
  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setPaymentVerificationError(null);
    
    try {
      // Validate user is authenticated
      if (!isAuthenticated || !user) {
        throw new Error('You must be logged in to schedule an appointment');
      }
      
      // Get user ID
      const userId = user.userId || user.id;
      
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }
      
      // Check if user has already paid for this property
      const paymentKey = `payment_${id}_user_${userId}`;
      const paymentDataString = localStorage.getItem(paymentKey);
      
      if (!paymentDataString) {
        throw new Error('Payment not found. Please make the payment to schedule an appointment.');
      }
      
      const paymentData = JSON.parse(paymentDataString);
      
      // Check if payment is still pending
      if (!paymentData.paid) {
        throw new Error('Your payment is still being processed. Please try again later.');
      }
      
      // Verify payment with backend using the original payment ID (order ID)
      try {
        console.log('Verifying payment with ID:', paymentData.paymentId);
        const verificationResponse = await verifyPayment({ paymentId: paymentData.paymentId });
        console.log('Verification response:', verificationResponse);
        
        // FIXED: Check if verification was successful based on actual response structure
        if (verificationResponse.success) {
          // Payment is verified, proceed with appointment
          console.log('Payment verified successfully');
        } else {
          // Payment verification failed
          console.error('Payment verification failed:', verificationResponse);
          throw new Error('Payment verification failed. Please make the payment again.');
        }
      } catch (verificationError) {
        console.error('Payment verification error:', verificationError);
        
        // Handle specific error messages from the backend
        if (verificationError.response && verificationError.response.data) {
          const errorData = verificationError.response.data;
          console.error('Error response data:', errorData);
          
          if (errorData.errors && errorData.errors.length > 0) {
            setPaymentVerificationError(errorData.errors[0]);
          } else if (errorData.message) {
            setPaymentVerificationError(errorData.message);
          } else if (typeof errorData === 'string') {
            setPaymentVerificationError(errorData);
          } else {
            setPaymentVerificationError('Payment verification failed. Please make the payment again.');
          }
        } else if (verificationError.message) {
          setPaymentVerificationError(verificationError.message);
        } else {
          setPaymentVerificationError('Payment verification failed. Please make the payment again.');
        }
        return;
      }
      
      // Prepare appointment data
      const appointmentData = {
        customerId: userId,
        propertyId: id,
        agentId: property.agentId,
        date: appointmentDate,
        time: appointmentTime,
        message: appointmentMessage,
        paymentToken: paymentData.paymentId // Use paymentId as the token
      };
      
      console.log('Submitting appointment:', appointmentData);
      
      // Call API to create appointment
      const response = await requestAppointment(appointmentData);
      console.log('Appointment response:', response);
      
      setAppointmentSuccess(true);
      setAppointmentError(null);
      
      // Reset form
      setAppointmentDate('');
      setAppointmentTime('');
      setAppointmentMessage('');
      
      // Close the form after a delay
      setTimeout(() => {
        setShowAppointmentForm(false);
        setAppointmentSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error submitting appointment:', err);
      
      let errorMessage = 'Failed to submit appointment request';
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        
        if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later or contact support.';
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Error request:', err.request);
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', err.message);
        errorMessage = err.message || 'An unexpected error occurred.';
      }
      
      setAppointmentError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle appointment scheduling
  const handleAppointment = () => {
    setShowContactPopup(false);
    setShowAppointmentForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Property not found</h3>
          <p className="mt-1 text-gray-500 max-w-md mx-auto">
            The property you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Extract image URLs from the images array
  const imageUrls = property.images && property.images.length > 0 
    ? property.images.map(img => img.url) 
    : [];
    
  const hasImages = imageUrls.length > 0;
  
  // Check if property has an offer
  const hasOffer = property.offerPercentage && property.offerPercentage > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <div className="flex items-center">
                <a href="/" className="text-gray-400 hover:text-gray-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <a href="/properties" className="text-gray-400 hover:text-gray-500">
                  Properties
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </li>
            <li className="text-gray-500 truncate max-w-xs" aria-current="page">
              {property.title}
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Image Gallery */}
            <div className="md:w-1/2">
              {hasImages ? (
                <div className="relative">
                  {/* Main Image */}
                  <div className="h-96 bg-gray-200">
                    <img 
                      src={imageUrls[activeImageIndex]} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTQgMTZsNC41ODYtNC41ODZhMiAyIDAgMDEyLjgyOCAwTDE2IDE2bTItMmwxLjU4Ni0xLjU4NmEyIDIgMCAwMTIuODI4IDBMMjAgMTRtLTYtNmguMDFNNiAyMGgxMmEyIDIgMCAwMDItMlY2YTIgMiAwIDAwLTItMkg2YTIgMiAwIDAwLTIgMnYxMmEyIDIgMCAwMDIgMnoiLz48L3N2Zz4=';
                      }}
                    />
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  {imageUrls.length > 1 && (
                    <div className="flex p-4 space-x-2 overflow-x-auto">
                      {imageUrls.map((imageUrl, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`flex-shrink-0 h-20 w-20 rounded-md overflow-hidden border-2 ${
                            activeImageIndex === index ? 'border-[#16A085]' : 'border-transparent'
                          }`}
                        >
                          <img 
                            src={imageUrl} 
                            alt={`Property view ${index + 1}`} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik00IDE2bDQuNTg2LTQuNTg2YTIgMiAwIDAxMi44MjggMEwxNiAxNm0yLTJsMS41ODYtMS41ODZhMiAyIDAgMDEyLjgyOCAwTDIwIDE0bTYtNmguMDFNNiAyMGgxMmEyIDIgMCAwMDItMlY2YTIgMiAwIDAwLTItMkg2YTIgMiAwIDAwLTIgMnYxMmEyIDIgMCAwMDIgMnoiLz48L3N2Zz4=';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-gray-500">No images available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Property Details */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.address || 'Location not specified'}
                  </div>
                </div>
                <div className="text-right">
                  {hasOffer ? (
                    <>
                      <div className="text-2xl font-bold text-[#16A085]">
                        {property.offerPrice ? formatCurrency(property.offerPrice) : 'Price not set'}
                      </div>
                      <div className="text-lg text-gray-500 line-through">
                        {property.price ? formatCurrency(property.price) : 'Price not set'}
                      </div>
                      <div className="text-sm font-medium text-red-600 mt-1">
                        Save {property.offerPercentage}%
                      </div>
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-[#16A085]">
                      {property.price ? formatCurrency(property.price) : 'Price not set'}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  property.status === 'available' ? 'bg-green-100 text-green-800' : 
                  property.status === 'sold' ? 'bg-red-100 text-red-800' : 
                  property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {property.status || 'Available'}
                </span>
              </div>

              {/* Property Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600">{property.description || 'No description available'}</p>
              </div>

              {/* Property Features */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-gray-600">{property.bedrooms} Bedrooms</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">{property.bathrooms} Bathrooms</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5-5M4 4v4m11-1v4m0 0h-4m-4 0l-5-5" />
                      </svg>
                      <span className="text-gray-600">{property.area} sq ft</span>
                    </div>
                  )}
                  {property.balcony && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">{property.balcony} Balconies</span>
                    </div>
                  )}
                  {property.floor && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">Floor {property.floor}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Nearby Places */}
              {property.nearby && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Nearby Places</h2>
                  <p className="text-gray-600">{property.nearby}</p>
                </div>
              )}

              {/* Offer Details */}
              {hasOffer && (
                <div className="mb-8 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Special Offer</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Limited time offer</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Original Price: {property.price ? formatCurrency(property.price) : 'Price not set'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#16A085]">
                        {property.offerPrice ? formatCurrency(property.offerPrice) : 'Price not set'}
                      </p>
                      <p className="text-sm font-medium text-red-600 mt-1">
                        {property.offerPercentage}% OFF
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Information</h2>
                <div className="space-y-3">
                  {property.agentName && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-600">{property.agentName}</span>
                    </div>
                  )}
                  {property.agentEmail && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">{property.agentEmail}</span>
                    </div>
                  )}
                  {property.agentPhone && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.684.949V17a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                      </svg>
                      <span className="text-gray-600">{property.agentPhone}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={() => setShowContactPopup(true)}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
                  >
                    {hasPaid ? "Schedule Appointment" : "Contact Agent"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
              <p className="text-gray-600 mt-1">
                {reviews.length > 0 
                  ? `Based on ${reviews.length} review${reviews.length !== 1 ? 's' : ''}`
                  : 'No reviews yet'
                }
              </p>
            </div>
            {isAuthenticated && !showReviewForm && (
              <button
                onClick={handleWriteReview}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-colors"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Write a Review
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && <ReviewForm />}

          {/* Reviews Error */}
          {reviewsError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{reviewsError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Reviews List */}
          {!showReviewForm && (
            <>
              <ReviewList />

              {/* Reviews Pagination */}
              {reviews.length > 0 && reviewsTotalPages > 1 && (
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => fetchReviews(reviewsPage - 1)}
                    disabled={reviewsPage === 0}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      reviewsPage === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-[#16A085] text-white hover:bg-[#138871]'
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {reviewsPage + 1} of {reviewsTotalPages}
                  </span>
                  <button
                    onClick={() => fetchReviews(reviewsPage + 1)}
                    disabled={reviewsPage >= reviewsTotalPages - 1}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      reviewsPage >= reviewsTotalPages - 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-[#16A085] text-white hover:bg-[#138871]'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Loading State for Reviews */}
              {reviewsLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#16A085]"></div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Verified Listing</h3>
            </div>
            <p className="text-gray-600">This property has been verified by our team to ensure accuracy and authenticity.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Flexible Viewing</h3>
            </div>
            <p className="text-gray-600">Schedule viewings at your convenience with our flexible appointment system.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Financing Options</h3>
            </div>
            <p className="text-gray-600">Explore various financing options available for this property.</p>
          </div>
        </div>
      </div>

      {/* Contact Agent Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {hasPaid ? "Schedule Appointment" : "Contact Agent"}
                </h3>
                <button 
                  onClick={() => setShowContactPopup(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {hasPaid ? (
                // Show appointment form directly if payment is made
                <form onSubmit={handleSubmitAppointment}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        id="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#16A085] focus:border-[#16A085]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                      <input
                        type="time"
                        id="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#16A085] focus:border-[#16A085]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (Optional)</label>
                      <textarea
                        id="message"
                        rows={3}
                        value={appointmentMessage}
                        onChange={(e) => setAppointmentMessage(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#16A085] focus:border-[#16A085]"
                      />
                    </div>
                    {appointmentError && (
                      <div className="text-red-600 text-sm">{appointmentError}</div>
                    )}
                    {paymentVerificationError && (
                      <div className="text-red-600 text-sm">
                        {paymentVerificationError}
                        <div className="mt-2">
                          <button 
                            type="button"
                            onClick={() => {
                              setShowContactPopup(false);
                              handlePayment();
                            }}
                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Make Payment Again
                          </button>
                        </div>
                      </div>
                    )}
                    {appointmentSuccess && (
                      <div className="text-green-600 text-sm">Appointment request submitted successfully!</div>
                    )}
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              ) : (
                // Show payment option if payment not made
                <>
                  <div className="space-y-4">
                    {property.agentName && (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-500">Agent Name</p>
                          <p className="font-medium">{property.agentName}</p>
                        </div>
                      </div>
                    )}
                    
                    {property.agentEmail && (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{property.agentEmail}</p>
                        </div>
                      </div>
                    )}
                    
                    {property.agentPhone && (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.684.949V17a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{property.agentPhone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    {paymentStatus === 'PENDING' && (
                      <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              Your payment is being processed. Please wait a moment and then try to schedule your appointment.
                            </p>
                            <button
                              type="button"
                              onClick={recheckPaymentStatus}
                              disabled={checkingPayment}
                              className="mt-2 text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 disabled:opacity-50"
                            >
                              {checkingPayment ? 'Checking...' : 'Check Payment Status'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600 mb-4">
                      Pay ₹200 to schedule a viewing with this agent and get priority access.
                    </p>
                    <button
                      onClick={handlePayment}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
                    >
                      Pay ₹200 to Schedule Viewing
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Schedule Appointment</h3>
                <button 
                  onClick={() => setShowAppointmentForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {appointmentSuccess ? (
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <svg className="h-6 w-6 text-green-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-700 font-medium">Appointment Request Submitted</p>
                  <p className="text-sm text-green-600 mt-1">Your appointment request has been sent to the agent.</p>
                  <button
                    onClick={() => setShowAppointmentForm(false)}
                    className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitAppointment}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        id="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#16A085] focus:border-[#16A085]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                      <input
                        type="time"
                        id="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#16A085] focus:border-[#16A085]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (Optional)</label>
                      <textarea
                        id="message"
                        rows={3}
                        value={appointmentMessage}
                        onChange={(e) => setAppointmentMessage(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#16A085] focus:border-[#16A085]"
                      />
                    </div>
                    {appointmentError && (
                      <div className="text-red-600 text-sm">{appointmentError}</div>
                    )}
                    {paymentVerificationError && (
                      <div className="text-red-600 text-sm">
                        {paymentVerificationError}
                        <div className="mt-2">
                          <button 
                            type="button"
                            onClick={() => {
                              setShowAppointmentForm(false);
                              handlePayment();
                            }}
                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Make Payment Again
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;