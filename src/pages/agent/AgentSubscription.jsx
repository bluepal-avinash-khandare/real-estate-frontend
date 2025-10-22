import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import useSubscriptionPlans from '../../hooks/useSubscriptionPlans';
import { 
  testSubscriptionAPI, 
  createSubscriptionOrder, 
  verifyPayment
} from '../../services/subscriptionService';

const AgentSubscription = () => {
  const { user } = useContext(AuthContext);
  const { plans, loading: plansLoading, error: plansError } = useSubscriptionPlans();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);

  // Your Razorpay keys
  const RAZORPAY_KEY_ID = 'rzp_test_RBeFyHkTAK93Vw';

  useEffect(() => {
    loadRazorpayScript();
    initializeData();
    testAPIEndpoint();
  }, [user]);

  // Test API endpoint
  const testAPIEndpoint = async () => {
    const status = await testSubscriptionAPI();
    setApiStatus(status);
    console.log('API Status:', status);
  };

  // Initialize all data from localStorage
  const initializeData = () => {
    // Get current subscription from localStorage
    const savedSubscription = localStorage.getItem(`agent_subscription_${user?.id}`);
    if (savedSubscription) {
      setCurrentSubscription(JSON.parse(savedSubscription));
    }
    
    // Get properties count from localStorage
    const savedProperties = localStorage.getItem(`agent_properties_${user?.id}`);
    const properties = savedProperties ? JSON.parse(savedProperties) : [];
    setPropertiesCount(properties.length);
  };

  // Dynamically load Razorpay script
  const loadRazorpayScript = () => {
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      setRazorpayLoaded(true);
      console.log('Razorpay SDK loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      toast.error('Failed to load payment system. Please refresh the page.');
    };
    document.body.appendChild(script);
  };

  // Get feature list based on plan name
  const getPlanFeatures = (plan) => {
    const baseFeatures = [`${plan.maxProperties} Property Listings`];
    
    switch (plan.name.toLowerCase()) {
      case 'free':
        return [...baseFeatures, 'Basic Support', 'Standard Listing'];
      case 'bronze':
        return [...baseFeatures, 'Basic Support', 'Standard Listing', 'Basic Analytics'];
      case 'silver':
        return [...baseFeatures, 'Priority Support', 'Featured Listings', 'Analytics Dashboard'];
      case 'gold':
        return [...baseFeatures, '24/7 Priority Support', 'Featured Listings', 'Advanced Analytics', 'Lead Generation'];
      default:
        return [...baseFeatures, 'Basic Support', 'Standard Listing'];
    }
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast.error('Please select a plan');
      return;
    }

    if (!razorpayLoaded) {
      toast.error('Payment system is still loading. Please wait a moment.');
      return;
    }

    setLoading(true);
    try {
      const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);
      
      if (!selectedPlanDetails) {
        toast.error('Selected plan not found');
        return;
      }

      // For free plan, activate immediately without payment
      if (selectedPlanDetails.price === 0) {
        activateFreeSubscription(selectedPlanDetails);
        return;
      }

      // For paid plans, create subscription order and initiate payment
      await processSubscription(selectedPlanDetails);
      
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to initiate subscription');
    } finally {
      setLoading(false);
    }
  };

  const processSubscription = async (plan) => {
    try {
      // Create subscription order in backend
      const result = await createSubscriptionOrder(plan.id);
      console.log('Subscription order response:', result);
      
      // If backend doesn't provide order details, create frontend order
      if (!result.razorpayOrderId) {
        await createFrontendRazorpayOrder(plan);
      } else {
        // Initialize Razorpay payment with the backend order details
        initiateRazorpayPayment(result, plan);
      }
      
    } catch (error) {
      console.error('Error creating subscription:', error);
      
      // Fallback: Create frontend order if backend fails
      const selectedPlanDetails = plans.find(p => p.id === plan.id);
      if (selectedPlanDetails) {
        await createFrontendRazorpayOrder(selectedPlanDetails);
      } else {
        toast.error(error.response?.data?.message || 'Failed to create subscription');
      }
    }
  };

  // Create Razorpay order on frontend if backend doesn't support it
  const createFrontendRazorpayOrder = async (plan) => {
    try {
      // Convert price to paise (1 INR = 100 paise)
      const amountInPaise = Math.round(plan.price * 100);
      
      const orderData = {
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          planId: plan.id,
          planName: plan.name,
          agentId: user?.id
        }
      };
      
      console.log('Creating frontend order with:', orderData);
      
      // Initialize Razorpay payment with frontend order
      initiateRazorpayPayment(orderData, plan);
      
    } catch (error) {
      console.error('Error creating frontend order:', error);
      toast.error('Failed to create payment order');
    }
  };

  const activateFreeSubscription = (plan) => {
    const subscription = {
      id: `sub_${Date.now()}`,
      agentId: user?.id,
      plan: plan,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      status: 'active',
      paymentStatus: 'free'
    };

    // Save to localStorage
    localStorage.setItem(`agent_subscription_${user?.id}`, JSON.stringify(subscription));
    setCurrentSubscription(subscription);
    
    // Also update properties count in localStorage
    const savedProperties = localStorage.getItem(`agent_properties_${user?.id}`);
    const properties = savedProperties ? JSON.parse(savedProperties) : [];
    setPropertiesCount(properties.length);
    
    toast.success(`🎉 ${plan.name} plan activated successfully! You can now create up to ${plan.maxProperties} properties.`);
  };

  const initiateRazorpayPayment = (orderData, plan) => {
    if (!window.Razorpay) {
      toast.error('Payment system not available. Please refresh the page.');
      return;
    }

    // Ensure amount is in paise and currency is INR
    const amount = orderData.amount || Math.round(plan.price * 100);
    const currency = orderData.currency || 'INR';

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount, // Amount in paise
      currency: currency,
      name: 'Real Estate Platform',
      description: `Subscription: ${plan.name} Plan - ${plan.maxProperties} Properties`,
      order_id: orderData.razorpayOrderId || orderData.id, // Use order ID from backend if available
      handler: async function (response) {
        try {
          await handleSuccessfulPayment(response, plan, orderData);
        } catch (error) {
          console.error('Payment verification failed:', error);
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: user?.name || 'Agent',
        email: user?.email || 'agent@example.com',
        contact: user?.phone || '9999999999'
      },
      notes: {
        subscription: plan.name,
        agentId: user?.id,
        planId: plan.id,
        planName: plan.name,
        maxProperties: plan.maxProperties
      },
      theme: {
        color: '#16A085'
      },
      modal: {
        ondismiss: function() {
          toast.info('Payment cancelled. You can try again anytime.');
          setLoading(false);
        }
      }
    };

    console.log('Razorpay options:', options);

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error opening Razorpay:', error);
      toast.error('Failed to open payment gateway. Please try again.');
      setLoading(false);
    }
  };

  const handleSuccessfulPayment = async (paymentResponse, plan, orderData) => {
    try {
      // Try to verify payment with backend if endpoint exists
     
        const verificationData = {
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          planId: plan.id,
          amount: orderData.amount || Math.round(plan.price * 100),
          currency: orderData.currency || 'INR'
        };

        await verifyPayment(verificationData);
      
      // Update subscription in localStorage
      const subscription = {
        id: `sub_${Date.now()}`,
        agentId: user?.id,
        plan: plan,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        status: 'active',
        paymentStatus: 'paid',
        paymentId: paymentResponse.razorpay_payment_id,
        razorpayOrderId: paymentResponse.razorpay_order_id,
        razorpaySignature: paymentResponse.razorpay_signature,
        amount: orderData.amount || Math.round(plan.price * 100),
        currency: orderData.currency || 'INR'
      };

      localStorage.setItem(`agent_subscription_${user?.id}`, JSON.stringify(subscription));
      setCurrentSubscription(subscription);
      
      // Also update properties count in localStorage
      const savedProperties = localStorage.getItem(`agent_properties_${user?.id}`);
      const properties = savedProperties ? JSON.parse(savedProperties) : [];
      setPropertiesCount(properties.length);
      
      toast.success(`🎉 Payment successful! ${plan.name} plan activated. You can now create up to ${plan.maxProperties} properties.`);
      
    } catch (error) {
      console.error('Error handling payment:', error);
      toast.error('Error processing payment. Please contact support.');
    }
  };

  const getRemainingProperties = () => {
    if (!currentSubscription?.plan) return 0;
    return Math.max(0, currentSubscription.plan.maxProperties - propertiesCount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get selected plan details
  const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);

  // Show loading state while fetching plans
  if (plansLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscription plans...</p>
          {apiStatus && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">API Status: {apiStatus.status} {apiStatus.statusText}</p>
              <p className="text-xs text-blue-600">Content-Type: {apiStatus.contentType}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show error state if plans fail to load
  if (plansError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800 mb-2">Failed to load plans</h3>
            <p className="text-red-600 mb-4 text-sm">{plansError}</p>
            
            {/* API Debug Information */}
            {apiStatus && (
              <div className="mb-4 p-3 bg-yellow-50 rounded-lg text-left">
                <h4 className="font-medium text-yellow-800 mb-2">Debug Information:</h4>
                <p className="text-xs text-yellow-700"><strong>Status:</strong> {apiStatus.status} {apiStatus.statusText}</p>
                <p className="text-xs text-yellow-700"><strong>Content-Type:</strong> {apiStatus.contentType || 'Not set'}</p>
                <p className="text-xs text-yellow-700"><strong>URL:</strong> {apiStatus.url}</p>
                {apiStatus.error && (
                  <p className="text-xs text-yellow-700"><strong>Error:</strong> {apiStatus.error}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Retry
              </button>
              <button 
                onClick={testAPIEndpoint}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Test API Connection
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Plans</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your real estate business. Upgrade anytime to unlock more features.
          </p>
        </div>

        {/* API Debug Info */}
        {apiStatus && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>API Status:</strong> {apiStatus.status} {apiStatus.statusText} | 
              <strong> Content-Type:</strong> {apiStatus.contentType || 'Not set'}
            </p>
            <p className="text-sm text-blue-800">
              <strong>Plans Loaded:</strong> {plans.length} plans from database
            </p>
          </div>
        )}

        {/* Razorpay Load Status */}
        {!razorpayLoaded && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-blue-700">Loading payment system...</span>
            </div>
          </div>
        )}

        {/* Current Subscription Status */}
        {currentSubscription && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-green-500">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Current Plan: <span className="text-green-600">{currentSubscription.plan?.name}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Properties Limit:</span>{' '}
                    {propertiesCount} / {currentSubscription.plan?.maxProperties}
                  </div>
                  <div>
                    <span className="font-medium">Remaining:</span>{' '}
                    {getRemainingProperties()} properties
                  </div>
                  <div>
                    <span className="font-medium">Started:</span>{' '}
                    {formatDate(currentSubscription.startDate)}
                  </div>
                </div>
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Active
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Property Usage</span>
                <span>{propertiesCount} / {currentSubscription.plan?.maxProperties}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    (propertiesCount / currentSubscription.plan?.maxProperties) > 0.8 ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ 
                    width: `${Math.min(100, (propertiesCount / currentSubscription.plan?.maxProperties) * 100)}%` 
                  }}
                ></div>
              </div>
              {getRemainingProperties() === 0 && (
                <p className="text-red-600 text-sm mt-2">
                  ❌ You've reached your property limit. Upgrade your plan to add more properties.
                </p>
              )}
            </div>
          </div>
        )}

        {/* No Subscription Warning */}
        {!currentSubscription && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-yellow-800">No Active Subscription</h3>
                <p className="text-yellow-700 mt-1">
                  You need an active subscription to create properties. Choose a plan below to get started.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Plans Grid */}
        {plans.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.88-6.09 2.32L3 20l1.635-2.26C6.26 15.56 8.9 14 12 14c.77 0 1.52.09 2.24.26" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Plans Available</h3>
            <p className="text-gray-500">Please contact administrator to add subscription plans.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  selectedPlan === plan.id ? 'ring-4 ring-green-500' : 'hover:shadow-xl'
                } ${plan.name.toLowerCase() === 'gold' ? 'border-2 border-yellow-400' : 
                   plan.name.toLowerCase() === 'silver' ? 'border-2 border-gray-300' :
                   plan.name.toLowerCase() === 'bronze' ? 'border-2 border-orange-300' : ''}`}
              >
                {/* Plan Header */}
                <div className={`p-6 ${
                  plan.name.toLowerCase() === 'gold' ? 'bg-yellow-500' :
                  plan.name.toLowerCase() === 'silver' ? 'bg-gray-400' :
                  plan.name.toLowerCase() === 'bronze' ? 'bg-orange-500' : 'bg-blue-500'
                } text-white`}>
                  <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
                  <div className="text-center mt-2">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                    </span>
                    {plan.price > 0 && <span className="text-white/80">/month</span>}
                  </div>
                </div>

                {/* Plan Features */}
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {getPlanFeatures(plan).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Select Button */}
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      selectedPlan === plan.id
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : plan.name.toLowerCase() === 'gold' 
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : plan.name.toLowerCase() === 'silver'
                          ? 'bg-gray-500 text-white hover:bg-gray-600'
                          : plan.name.toLowerCase() === 'bronze'
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Plan Summary */}
        {selectedPlanDetails && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-green-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-gray-800">{selectedPlanDetails.name} Plan</p>
                <p className="text-gray-600">{selectedPlanDetails.maxProperties} property listings</p>
                <ul className="text-sm text-gray-500 mt-2">
                  {getPlanFeatures(selectedPlanDetails).map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  {selectedPlanDetails.price === 0 ? 'Free' : `₹${selectedPlanDetails.price}`}
                </p>
                {selectedPlanDetails.price > 0 && (
                  <p className="text-gray-500 text-sm">per month</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Subscribe Button */}
        <div className="text-center">
          <button
            onClick={handleSubscribe}
            disabled={loading || !selectedPlan || !razorpayLoaded || plans.length === 0}
            className={`px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              loading || !selectedPlan || !razorpayLoaded || plans.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 transform hover:scale-105'
            } text-white shadow-lg`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : !razorpayLoaded ? (
              'Loading Payment...'
            ) : plans.length === 0 ? (
              'No Plans Available'
            ) : selectedPlanDetails?.price === 0 ? (
              'Activate Free Plan'
            ) : (
              'Subscribe Now with Razorpay'
            )}
          </button>
          
          {!selectedPlan && plans.length > 0 && (
            <p className="text-gray-500 mt-2">Please select a plan to continue</p>
          )}
        </div>

        {/* Security Badge */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm text-gray-600">Secure payment powered by Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSubscription;