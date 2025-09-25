// import React, { useState, useEffect } from 'react';
// import { getAllReviews } from '../../services/reviewService';
// import Table from '../../components/common/Table';
// import Filter from '../../components/common/Filter';

// const ReviewsList = () => {
//   const [reviews, setReviews] = useState([]);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     const fetchReviews = async () => {
//       const data = await getAllReviews({ search: filter });
//       setReviews(data.data.content);
//     };
//     fetchReviews();
//   }, [filter]);

//   const handleFilterChange = (e) => setFilter(e.target.value);

//   const headers = ['ID', 'Rating', 'Comment'];

//   const rows = reviews.map((review) => ({ id: review.id, rating: review.rating, comment: review.comment }));

//   return (
//     <div>
//       <Filter onChange={handleFilterChange} placeholder="Search Reviews" />
//       <Table headers={headers} rows={rows} />
//     </div>
//   );
// };

// export default ReviewsList;

import React, { useState, useEffect } from 'react';
import { getAllReviews } from '../../services/reviewService';
import Table from '../../components/common/Table';
import Filter from '../../components/common/Filter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = {
          search: filter,
          page: currentPage - 1,
          size: itemsPerPage
        };
        
        const response = await getAllReviews(params);
        
        if (response.success) {
          setReviews(response.data.content);
          setTotalPages(response.data.totalPages);
        } else {
          throw new Error(response.message || 'Failed to fetch reviews');
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message || 'An unexpected error occurred');
        toast.error(`Failed to load reviews: ${err.message}`, {
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
    
    fetchReviews();
  }, [filter, currentPage, itemsPerPage]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const headers = ['ID', 'User ID', 'Property ID', 'Rating', 'Title', 'Comment', 'Date'];

  const rows = reviews.map((review) => ({
    id: review.id,
    userId: review.userId,
    propertyId: review.propertyId,
    rating: (
      <div className="flex items-center">
        <span className="text-yellow-400 mr-1">★</span>
        <span>{review.rating}</span>
      </div>
    ),
    title: review.title,
    comment: review.comment.length > 50 
      ? `${review.comment.substring(0, 50)}...` 
      : review.comment,
    date: new Date(review.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reviews Management</h1>
          <p className="text-gray-400">Manage and view all customer reviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Reviews</p>
                <p className="text-2xl font-semibold text-white">{reviews.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Average Rating</p>
                <p className="text-2xl font-semibold text-white">
                  {reviews.length > 0 
                    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Latest Review</p>
                <p className="text-2xl font-semibold text-white">
                  {reviews.length > 0 
                    ? new Date(Math.max(...reviews.map(r => new Date(r.createdAt)))).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <Filter 
                onChange={handleFilterChange} 
                placeholder="Search reviews by title, comment, or ID..." 
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Show:</span>
                <select 
                  value={itemsPerPage} 
                  onChange={handleItemsPerPageChange}
                  className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-medium text-white mb-2">Failed to load reviews</h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <Table headers={headers} rows={rows} />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-gray-700/50 px-6 py-4 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Showing <span className="font-medium text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium text-white">
                      {Math.min(currentPage * itemsPerPage, reviews.length)}
                    </span>{' '}
                    of <span className="font-medium text-white">{reviews.length}</span> results
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === page
                              ? 'bg-cyan-600 text-white'
                              : 'bg-gray-700 text-white hover:bg-gray-600'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsList;