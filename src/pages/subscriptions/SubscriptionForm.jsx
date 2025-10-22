
// src/pages/subscriptions/SubscriptionForm.jsx
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import toast from 'react-hot-toast'; 

const SubscriptionForm = ({ plan, onSuccess, onCancel }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    maxProperties: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        // Ensure values are converted to string for the controlled input
        price: plan.price.toString(),
        maxProperties: plan.maxProperties.toString(),
      });
    }
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // 🚨 IMPORTANT: Prepare data for the API call, converting strings to numbers
    const dataToSend = {
        name: formData.name,
        price: parseFloat(formData.price),
        maxProperties: parseInt(formData.maxProperties, 10),
    };

    try {
      if (plan) {
        // Update existing plan
        await axios.put(`http://localhost:8088/api/subscription/plan/${plan.id}`, dataToSend, { // Using dataToSend
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        toast.success(`Plan "${formData.name}" updated successfully!`, { position: 'bottom-center' }); 
      } else {
        // Create new plan
        await axios.post('http://localhost:8088/api/subscription/plan', dataToSend, { // Using dataToSend
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        toast.success(`New plan "${formData.name}" added successfully!`, { position: 'bottom-center' }); 
      }
      onSuccess();
    } catch (err) {
      console.error('Submission error:', err);
      const message = err.response?.data?.message || 'Something went wrong. Please check your data.';
      setError(message);
      toast.error(message, { position: 'bottom-center' });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
      toast('Action cancelled.', { position: 'bottom-center', icon: '👋' });
      onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-xl font-bold mb-4">
        {plan ? 'Update Subscription Plan' : 'Add New Subscription Plan'}
      </h3>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Plan Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Max Properties</label>
          <input
            type="number"
            name="maxProperties"
            value={formData.maxProperties}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
            min="1"
            required
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <button
          type="button"
          onClick={handleCancel} 
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138871] transition-colors"
          disabled={loading}
        >
          {loading ? 'Saving...' : plan ? 'Update Plan' : 'Add Plan'}
        </button>
      </div>
    </form>
  );
};

export default SubscriptionForm;