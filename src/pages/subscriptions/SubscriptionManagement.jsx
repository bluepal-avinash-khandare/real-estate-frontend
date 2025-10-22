
// src/pages/dashboard/SubscriptionManagement.jsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
// AnimatePresence is fine, but since we removed motion.div, we can also remove this import if no other transition library is used.
import { AnimatePresence } from 'framer-motion'; 
import toast, { Toaster } from 'react-hot-toast'; 

// --- Component for the Edit/Update Form ---
const UpdateSubscriptionForm = ({ plan, onUpdate, onCancel }) => {
    const { user } = useContext(AuthContext);
    // Ensure form state initializes with string versions of numbers
    const [formData, setFormData] = useState({
        name: plan.name,
        price: plan.price.toString(),
        maxProperties: plan.maxProperties.toString(),
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        // Prepare data: Convert back to numeric types
        const dataToSend = {
            name: formData.name,
            price: parseFloat(formData.price),
            maxProperties: parseInt(formData.maxProperties, 10),
        };

        try {
            await axios.put(`http://localhost:8088/api/subscription/plan/${plan.id}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            
            toast.success(`Plan "${formData.name}" updated successfully!`, { position: 'bottom-center' }); 
            onUpdate(); // Close form and refresh list
        } catch (err) {
            console.error('Update error:', err);
            const message = err.response?.data?.message || 'Failed to update plan.';
            setError(message);
            toast.error(message, { position: 'bottom-center' });
        } finally {
            setLoading(false);
        }
    };
    
    const handleCancelClick = () => {
        toast('Update cancelled.', { position: 'bottom-center', icon: '👋' });
        onCancel();
    };

    return (
        // 🚨 CRITICAL FIX: Replaced <motion.div> with a standard <div>
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
            // Click outside closes the form
            onClick={(e) => e.target.classList.contains('bg-opacity-50') && handleCancelClick()}
        >
            <div 
                className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl"
                onClick={(e) => e.stopPropagation()} // Prevent click inside from closing form
            >
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Edit Plan: {plan.name}</h3>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <form onSubmit={handleUpdateSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Plan Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Max Properties</label>
                        <input
                            type="number"
                            name="maxProperties"
                            value={formData.maxProperties}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                            min="1"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138871] transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Plan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
// --- End UpdateSubscriptionForm ---

// --- Main Subscription Management Component ---
const SubscriptionManagement = ({ onPlanUpdate, onAddPlan }) => {
    const { user } = useContext(AuthContext);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    
    // Function to fetch plans (remains the same)
    const fetchPlans = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8088/api/subscription/plans', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setPlans(response.data?.plans || []);
            setError(null);
        } catch (err) {
            setError("Failed to fetch subscription plans: " + (err.response?.data?.message || err.message));
            setPlans([]);
            console.error("Failed to fetch subscription plans:", err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (user) {
            fetchPlans();
        }
    }, [user]);

    // Helper function for the actual delete API call
    const confirmDeleteAction = async (id, name) => {
        try {
            await axios.delete(`http://localhost:8088/api/subscription/plan/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            toast.success(`Plan "${name}" deleted successfully!`, { position: 'bottom-center' }); 
            fetchPlans(); 
            if (onPlanUpdate) onPlanUpdate(); 
        } catch (err) {
            console.error("Deletion failed:", err);
            const message = "Failed to delete plan: " + (err.response?.data?.message || err.message);
            toast.error(message, { position: 'bottom-center' }); 
        }
    }
    
    // UPDATED DELETE HANDLER using toast for confirmation
    const handleDeletePlan = (plan) => {
        toast((t) => (
            <div className='flex flex-col'>
                <p className="text-gray-700 font-semibold text-sm">
                    Are you sure you want to delete plan: <span className="text-red-600 font-bold">{plan.name}</span>?
                </p>
                <div className="mt-2 flex justify-end space-x-2">
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            confirmDeleteAction(plan.id, plan.name); 
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity, 
            position: 'bottom-center',
            icon: '⚠️',
            className: 'w-full max-w-sm', 
        });
    };

    const handleEditPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const handleUpdateSuccess = () => {
        setSelectedPlan(null); // Close the form
        fetchPlans(); // Refresh the list
        if (onPlanUpdate) onPlanUpdate();
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-xl">
            <Toaster /> 

            {/* START: Header with 'Add New Plan' button on the right */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Current Subscription Plans</h3>
                <button
                    onClick={onAddPlan}
                    className="px-4 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138871] transition-colors flex items-center shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Plan
                </button>
            </div>
            {/* END: Header with 'Add New Plan' button on the right */}
            
            {/* AnimatePresence is optional, removed key prop since we're not using motion */}
            {selectedPlan && (
                <UpdateSubscriptionForm
                    plan={selectedPlan}
                    onUpdate={handleUpdateSuccess}
                    onCancel={() => setSelectedPlan(null)}
                />
            )}
            
            {loading && <p className="text-center text-gray-500">Loading plans...</p>}
            {error && <p className="text-center text-red-600 font-medium">{error}</p>}
            
            {!loading && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (₹)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Properties</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {plans.length > 0 ? ( 
                                plans.map((plan) => (
                                    <tr key={plan.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.maxProperties}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEditPlan(plan)}
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeletePlan(plan)}
                                                className="text-red-600 hover:text-red-900 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                !error && <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No subscription plans found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SubscriptionManagement;