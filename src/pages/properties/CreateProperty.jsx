
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import PropertyForm from '../../components/forms/PropertyForm';
// import { createProperty } from '../../services/propertyService';

// const CreateProperty = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const initialValues = { 
//     title: '', 
//     description: '', 
//     address: '', 
//     price: 0, 
//     bedrooms: 0, 
//     bathrooms: 0, 
//     area: 0, 
//     images: [] ,
//     documents:[],
//       amenities: [] 
//   };

//   const handleSubmit = async (values) => {
//     setIsLoading(true);
//     setError(null);
//     setSuccess(false);
    
//     try {
//       console.log("Amenities submitted:", values.amenities); // ✅ check here
//       await createProperty(values, values.images, values.documents);
//       setSuccess(true);
      
//       // Redirect after successful creation
//       setTimeout(() => {
//         navigate('/properties');
//       }, 2000);
//     } catch (err) {
//       setError(err.message || 'Failed to create property');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Gallery images from Pixabay/Pexels
//   const galleryImages = [
//     'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] shadow-lg">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Link to="/agent-properties" className="text-white hover:text-gray-200">
//                 <img src="https://cdn-icons-png.flaticon.com/128/69/69524.png" alt="Back" className="h-6 w-6 mr-2" />
//               </Link>
//               <h1 className="text-2xl font-bold text-white">Create New Property</h1>
//             </div>
//             <div className="text-sm text-white">
//               <Link to="/agent-properties" className="hover:text-gray-200">
//                 Back to Properties
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="py-8">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//           {/* Status Messages */}
//           {error && (
//             <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <img src="https://img.icons8.com/color/48/error--v1.png" alt="Error" className="h-5 w-5" />
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">
//                     {error}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {success && (
//             <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <img src="https://img.icons8.com/color/48/checkmark--v1.png" alt="Success" className="h-5 w-5" />
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-green-700">
//                     Property created successfully! Redirecting to your properties...
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Loading Overlay */}
//           {isLoading && (
//             <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
//               <div className="relative bg-white rounded-lg p-8 max-w-sm w-full shadow-2xl">
//                 <div className="text-center">
//                   <img src="https://img.icons8.com/color/96/property.png" alt="Property" className="h-12 w-12 mx-auto animate-pulse" />
//                   <h3 className="mt-4 text-lg font-medium text-gray-900">Creating Property</h3>
//                   <p className="mt-2 text-sm text-gray-500">Please wait while we create your property listing.</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Two Column Layout */}
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="flex flex-col md:flex-row">
//               {/* Left Column - Gallery */}
//               <div className="w-full md:w-2/5 bg-gray-100 p-4">
//                 <div className="grid grid-cols-2 gap-2 h-full">
//                   <div className="col-span-2 row-span-2">
//                     <img 
//                       src={galleryImages[0]} 
//                       alt="Property" 
//                       className="w-full h-full object-cover rounded-lg shadow-md"
//                     />
//                   </div>
//                   <div>
//                     <img 
//                       src={galleryImages[1]} 
//                       alt="Property" 
//                       className="w-full h-full object-cover rounded-lg shadow-md"
//                     />
//                   </div>
//                   <div>
//                     <img 
//                       src={galleryImages[2]} 
//                       alt="Property" 
//                       className="w-full h-full object-cover rounded-lg shadow-md"
//                     />
//                   </div>
//                   <div>
//                     <img 
//                       src={galleryImages[3]} 
//                       alt="Property" 
//                       className="w-full h-full object-cover rounded-lg shadow-md"
//                     />
//                   </div>
//                   <div>
//                     <img 
//                       src={galleryImages[4]} 
//                       alt="Property" 
//                       className="w-full h-full object-cover rounded-lg shadow-md"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Form */}
//               <div className="w-full md:w-3/5 p-6">
//                 <div className="mb-6">
//                   <h2 className="text-xl font-bold text-gray-800">Property Details</h2>
//                   <p className="text-gray-600">Fill in the information to list your property</p>
//                 </div>
                
//                 <PropertyForm initialValues={initialValues} onSubmit={handleSubmit} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer
//       <footer className="bg-white border-t border-gray-200 mt-12">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-sm text-gray-500">
//             © {new Date().getFullYear()} ACR-Estates. All rights reserved.
//           </p>
//         </div>
//       </footer> */}
//     </div>
//   );
// };

// export default CreateProperty;

// c k pandey 



  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { AuthContext } from '../../contexts/AuthContext';
  import PropertyForm from '../../components/forms/PropertyForm';
  import { createProperty } from '../../services/propertyService';
  import useSubscriptionGuard from '../../hooks/useSubscriptionGuard';

  const CreateProperty = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    // Use the subscription guard hook
    const { 
      canCreateProperty, 
      loading: subscriptionLoading, 
      showSubscriptionAlert,
      currentSubscription,
      propertiesCount 
    } = useSubscriptionGuard();

    const initialValues = { 
      title: '', 
      description: '', 
      address: '', 
      price: 0, 
      bedrooms: 0, 
      bathrooms: 0, 
      area: 0, 
      images: [],
      documents:[],
      amenities: [] 
    };

    const handleSubmit = async (values) => {
      // Check subscription before allowing property creation
      if (!canCreateProperty) {
        showSubscriptionAlert();
        return;
      }

      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      try {
        console.log("Amenities submitted:", values.amenities);
        await createProperty(values, values.images, values.documents);
        setSuccess(true);
        
        // Redirect after successful creation
        setTimeout(() => {
          navigate('/agent-properties');
        }, 2000);
      } catch (err) {
        setError(err.message || 'Failed to create property');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // Gallery images from Pixabay/Pexels
    const galleryImages = [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ];

    // Show subscription loading
    if (subscriptionLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking subscription status...</p>
          </div>
        </div>
      );
    }

    // Show subscription required message if agent doesn't have subscription or reached limit
    if (!canCreateProperty) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] shadow-lg">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link to="/agent-properties" className="text-white hover:text-gray-200">
                    <img src="https://cdn-icons-png.flaticon.com/128/69/69524.png" alt="Back" className="h-6 w-6 mr-2" />
                  </Link>
                  <h1 className="text-2xl font-bold text-white">Create New Property</h1>
                </div>
                <div className="text-sm text-white">
                  <Link to="/agent-properties" className="hover:text-gray-200">
                    Back to Properties
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Required Message */}
          <div className="py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {!currentSubscription ? 'Subscription Required' : 'Property Limit Reached'}
                </h2>
                
                <p className="text-gray-600 mb-6 text-lg">
                  {!currentSubscription 
                    ? 'You need an active subscription plan to create properties.'
                    : `You've reached your property limit (${propertiesCount}/${currentSubscription.plan.maxProperties}). Upgrade your plan to add more properties.`
                  }
                </p>

                {/* Current Usage Stats */}
                {currentSubscription && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{propertiesCount}</p>
                        <p className="text-gray-600">Properties Created</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{currentSubscription.plan.maxProperties}</p>
                        <p className="text-gray-600">Plan Limit</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-red-600">
                          {Math.max(0, currentSubscription.plan.maxProperties - propertiesCount)}
                        </p>
                        <p className="text-gray-600">Remaining</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Usage</span>
                        <span>{propertiesCount} / {currentSubscription.plan.maxProperties}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-red-500 h-3 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${Math.min(100, (propertiesCount / currentSubscription.plan.maxProperties) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                  <button
                    onClick={() => navigate('/agent/subscription')}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    {!currentSubscription ? 'View Subscription Plans' : 'Upgrade Plan'}
                  </button>
                  
                  <Link
                    to="/agent-properties"
                    className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 inline-block text-center"
                  >
                    Back to Properties
                  </Link>
                </div>

                {/* Plan Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">More Listings</h4>
                    <p className="text-sm text-gray-600">List more properties with higher plans</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Priority Visibility</h4>
                    <p className="text-sm text-gray-600">Get featured in search results</p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Flexible Plans</h4>
                    <p className="text-sm text-gray-600">Upgrade or downgrade anytime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Normal property creation form (only shown if agent has subscription and within limits)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] shadow-lg">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/agent-properties" className="text-white hover:text-gray-200">
                  <img src="https://cdn-icons-png.flaticon.com/128/69/69524.png" alt="Back" className="h-6 w-6 mr-2" />
                </Link>
                <h1 className="text-2xl font-bold text-white">Create New Property</h1>
              </div>
              
              {/* Subscription Status Badge */}
              <div className="flex items-center space-x-4">
                {currentSubscription && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentSubscription.plan.name} Plan • {propertiesCount}/{currentSubscription.plan.maxProperties} Properties
                  </div>
                )}
                <div className="text-sm text-white">
                  <Link to="/agent-properties" className="hover:text-gray-200">
                    Back to Properties
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Status Messages */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <img src="https://img.icons8.com/color/48/error--v1.png" alt="Error" className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <img src="https://img.icons8.com/color/48/checkmark--v1.png" alt="Success" className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Property created successfully! Redirecting to your properties...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                <div className="relative bg-white rounded-lg p-8 max-w-sm w-full shadow-2xl">
                  <div className="text-center">
                    <img src="https://img.icons8.com/color/96/property.png" alt="Property" className="h-12 w-12 mx-auto animate-pulse" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Creating Property</h3>
                    <p className="mt-2 text-sm text-gray-500">Please wait while we create your property listing.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Two Column Layout */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Left Column - Gallery */}
                <div className="w-full md:w-2/5 bg-gray-100 p-4">
                  <div className="grid grid-cols-2 gap-2 h-full">
                    <div className="col-span-2 row-span-2">
                      <img 
                        src={galleryImages[0]} 
                        alt="Property" 
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div>
                      <img 
                        src={galleryImages[1]} 
                        alt="Property" 
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div>
                      <img 
                        src={galleryImages[2]} 
                        alt="Property" 
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div>
                      <img 
                        src={galleryImages[3]} 
                        alt="Property" 
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div>
                      <img 
                        src={galleryImages[4]} 
                        alt="Property" 
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Form */}
                <div className="w-full md:w-3/5 p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Property Details</h2>
                    <p className="text-gray-600">Fill in the information to list your property</p>
                    
                    {/* Remaining Properties Counter */}
                    {currentSubscription && (
                      <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-700">
                            Properties remaining: <strong>{currentSubscription.plan.maxProperties - propertiesCount}</strong> of {currentSubscription.plan.maxProperties}
                          </span>
                          <div className="w-24 bg-blue-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${Math.min(100, (propertiesCount / currentSubscription.plan.maxProperties) * 100)}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <PropertyForm initialValues={initialValues} onSubmit={handleSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default CreateProperty;