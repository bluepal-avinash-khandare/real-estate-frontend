import React, { useState, useEffect } from 'react';
import { getAllReviews } from '../../services/reviewService';
import Table from '../../components/common/Table';
import Filter from '../../components/common/Filter';

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getAllReviews({ search: filter });
      setReviews(data.data.content);
    };
    fetchReviews();
  }, [filter]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const headers = ['ID', 'Rating', 'Comment'];

  const rows = reviews.map((review) => ({ id: review.id, rating: review.rating, comment: review.comment }));

  return (
    <div>
      <Filter onChange={handleFilterChange} placeholder="Search Reviews" />
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default ReviewsList;