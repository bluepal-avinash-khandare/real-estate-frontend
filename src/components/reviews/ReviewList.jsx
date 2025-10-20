import React from 'react';

const ReviewList = ({ reviews, currentUserId, onEdit, onDelete, isAdmin = false }) => {
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
            {(currentUserId === review.userId || isAdmin) && (
              <div className="flex space-x-2">
                {currentUserId === review.userId && (
                  <button
                    onClick={() => onEdit(review)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => onDelete(review.id)}
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

export default ReviewList;