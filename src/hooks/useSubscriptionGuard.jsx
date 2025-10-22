import { useState, useEffect } from 'react';

const useSubscriptionGuard = () => {
  const [canCreateProperty, setCanCreateProperty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [propertiesCount, setPropertiesCount] = useState(0);

  useEffect(() => {
    const checkSubscription = () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          // Check for subscription in localStorage
          const savedSubscription = localStorage.getItem(`agent_subscription_${user.id}`);
          if (savedSubscription) {
            const subscription = JSON.parse(savedSubscription);
            setCurrentSubscription(subscription);
            
            // Check properties count from localStorage
            const savedProperties = localStorage.getItem(`agent_properties_${user.id}`);
            const properties = savedProperties ? JSON.parse(savedProperties) : [];
            setPropertiesCount(properties.length);
            
            // Check if subscription is active and within limits
            if (subscription.status === 'active' && properties.length < subscription.plan.maxProperties) {
              setCanCreateProperty(true);
            } else {
              setCanCreateProperty(false);
            }
          } else {
            // No subscription found
            setCanCreateProperty(false);
            setCurrentSubscription(null);
          }
        } else {
          // No user logged in
          setCanCreateProperty(false);
          setCurrentSubscription(null);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        setCanCreateProperty(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
    
    // Listen for storage changes (in case subscription is updated in another tab)
    const handleStorageChange = () => {
      checkSubscription();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check when the component mounts
    const interval = setInterval(checkSubscription, 5000); // Check every 5 seconds
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const showSubscriptionAlert = () => {
    if (!currentSubscription) {
      alert('You need an active subscription to create properties. Please subscribe first.');
    } else {
      alert(`You've reached your property limit (${propertiesCount}/${currentSubscription.plan.maxProperties}). Upgrade your plan to add more properties.`);
    }
  };

  const refreshSubscriptionStatus = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const savedSubscription = localStorage.getItem(`agent_subscription_${user.id}`);
      const savedProperties = localStorage.getItem(`agent_properties_${user.id}`);
      
      if (savedSubscription) {
        const subscription = JSON.parse(savedSubscription);
        setCurrentSubscription(subscription);
        
        const properties = savedProperties ? JSON.parse(savedProperties) : [];
        setPropertiesCount(properties.length);
        
        if (subscription.status === 'active' && properties.length < subscription.plan.maxProperties) {
          setCanCreateProperty(true);
        } else {
          setCanCreateProperty(false);
        }
      }
    }
  };

  return {
    canCreateProperty,
    loading,
    showSubscriptionAlert,
    currentSubscription,
    propertiesCount,
    refreshSubscriptionStatus
  };
};

export default useSubscriptionGuard;