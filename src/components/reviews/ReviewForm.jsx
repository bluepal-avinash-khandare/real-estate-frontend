import React, { useState, useRef } from 'react';
import { createReview, updateReview } from '../../services/reviewService';

const ReviewForm = ({ propertyId, onReviewSubmitted, editReview, onCancel }) => {
  const [rating, setRating] = useState(editReview?.rating || 0);
  const [comment, setComment] = useState(editReview?.comment || '');
  const [title, setTitle] = useState(editReview?.title || '');
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState(editReview?.imageUrl ? [editReview.imageUrl] : []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    setImages([...images, ...files]);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviewUrls = [...previewUrls];
    
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (rating === 0) {
      setError('Please select a rating');
      setSubmitting(false);
      return;
    }

    if (!comment.trim()) {
      setError('Please enter a comment');
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      const reviewData = {
        propertyId: parseInt(propertyId),
        rating: parseInt(rating),
        comment: comment.trim(),
        title: title.trim() || null
      };

      formData.append('data', JSON.stringify(reviewData));
      
      images.forEach((image, index) => {
        formData.append('files', image);
      });

      if (editReview) {
        await updateReview(editReview.id, reviewData, images);
      } else {
        await createReview(formData);
      }

      // Reset form
      setRating(0);
      setComment('');
      setTitle('');
      setImages([]);
      setPreviewUrls([]);
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {editReview ? 'Edit Review' : 'Write a Review'}
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

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images (Optional, Max 5)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Choose Images
          </button>
          
          {/* Image Previews */}
          {previewUrls.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={typeof url === 'string' ? url : URL.createObjectURL(images[index])}
                    alt={`Preview ${index + 1}`}
                    className="h-20 w-20 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
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
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          {editReview && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={submitting || rating === 0 || !comment.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] disabled:opacity-50 transition-colors"
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {editReview ? 'Updating...' : 'Submitting...'}
              </>
            ) : (
              editReview ? 'Update Review' : 'Submit Review'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;