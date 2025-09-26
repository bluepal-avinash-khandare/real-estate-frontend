
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyForm from '../../components/forms/PropertyForm';
import { createProperty } from '../../services/propertyService';

const CreateProperty = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initialValues = { 
    title: '', 
    description: '', 
    address: '', 
    price: 0, 
    bedrooms: 0, 
    bathrooms: 0, 
    area: 0, 
    images: [] ,
    documents:[],
      amenities: [] 
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      console.log("Amenities submitted:", values.amenities); // ✅ check here
      await createProperty(values, values.images, values.documents);
      setSuccess(true);
      
      // Redirect after successful creation
      setTimeout(() => {
        navigate('/properties');
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
                </div>
                
                <PropertyForm initialValues={initialValues} onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ACR-Estates. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default CreateProperty;