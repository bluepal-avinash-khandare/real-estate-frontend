import { useState, useEffect } from 'react';
import api from '../services/api';

const useSubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        console.log('Fetching plans from backend...');
        
        const response = await api.get('/subscription/plans?page=0&size=100');
        
        console.log('Plans API Response:', response.data);
        
        if (response.data) {
          // Handle different response formats from your backend
          if (response.data.plans && Array.isArray(response.data.plans)) {
            setPlans(response.data.plans);
          } else if (response.data.content && Array.isArray(response.data.content)) {
            setPlans(response.data.content);
          } else if (Array.isArray(response.data)) {
            setPlans(response.data);
          } else {
            console.warn('Unexpected API response format:', response.data);
            setPlans([]);
            throw new Error('Unexpected API response format');
          }
        }
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
        setError('Error fetching subscription plans: ' + error.message);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
};

export default useSubscriptionPlans;