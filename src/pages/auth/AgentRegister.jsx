// src/pages/auth/AgentRegister.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AgentRegisterForm from '../../components/forms/AgentRegisterForm';
import { registerAgent } from '../../services/authService'; // ✅ FIXED IMPORT
import { AuthContext } from '../../contexts/AuthContext';

const AgentRegister = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Property images for the carousel
  const propertyImages = [
    {
      url: "https://media.istockphoto.com/id/185275043/photo/old-stone-house.jpg?b=1&s=612x612&w=0&k=20&c=z1Ro4Ciqjn2x7xHwpsLUIp97cWpj7s4o0yISGWPfk4U=",
      title: "Agent Excellence",
      description: "Join our team of elite real estate professionals"
    },
    {
      url: "https://cdn.pixabay.com/photo/2017/03/30/00/25/villa-2186914_640.jpg",
      title: "Premium Properties",
      description: "Showcase and sell luxury properties to discerning clients"
    },
    {
      url: "https://media.istockphoto.com/id/1179737018/photo/were-in-the-house-mom-and-dad-are-imitating-a-roof-of-the-house-with-their-hands-while-their.jpg?s=612x612&w=0&k=20&c=UxnX0VNBl1AiFb3pxVZPn3YFApQUhK89DKT_PEvMUZg=",
      title: "Client Relationships",
      description: "Build lasting relationships with property buyers and sellers"
    },
    {
      url: "https://media.istockphoto.com/id/2148850507/photo/contemporary-urban-apartments-with-rooftop-greenery.jpg?s=612x612&w=0&k=20&c=N5JEzh21OtER3f3IHdxf-N8kWUJVll1eT4dmXdeRwPU=",
      title: "Market Expertise",
      description: "Leverage your local market knowledge to close more deals"
    },
    {
      url: "https://media.istockphoto.com/id/2112749005/photo/modern-contemporary-style-small-wooden-terrace-in-lush-garden-with-house-interior-background.jpg?s=612x612&w=0&k=20&c=rtiD90a0nA3UpHfGsL1GnVG19GjIZd8H762MTgGcJug=",
      title: "Professional Growth",
      description: "Advance your career with our comprehensive training programs"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [propertyImages.length]);

  // In your AgentRegister.js, update the handleSubmit function:
const handleSubmit = async (values) => {
  try {
    setError(null);
    setSuccess(null);
    
    console.log("Agent form values:", values);
    
    // Prepare the data for agent registration
    const agentData = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      adharNumber: values.adharNumber,
      experienceYears: values.experienceYears,
      agencyName: values.agencyName,
      address: values.address,
      availableTimes: values.availableTimes,
      profileImage: values.profileImage
    };
    
    console.log("Submitting agent registration with:", agentData);
    
    // ✅ Use registerAgent instead of register
    const registerResponse = await registerAgent(agentData);
    console.log("Agent registration response:", registerResponse);
    
    // Show success message and redirect to login
    setSuccess('Agent registration successful! Please log in with your new account.');
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate('/login');
    }, 2000);
    
  } catch (error) {
    console.error('Agent registration error:', error);
    
    // Enhanced error handling
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      
      if (error.response.status === 400) {
        const errorData = error.response.data;
        const errorMessage = errorData.message || errorData.error || 'Invalid registration data';
        
        if (errorMessage.includes('Aadhaar number already exists')) {
          setError('This Aadhaar number is already registered. Please use a different Aadhaar number.');
        } else if (errorMessage.includes('email already exists')) {
          setError('This email is already registered. Please use a different email or try logging in.');
        } else {
          setError(errorMessage);
        }
      } else if (error.response.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(error.response.data.message || 'An error occurred during registration. Please try again.');
      }
    } else if (error.request) {
      console.error('Error request:', error.request);
      setError('No response from server. Please check your internet connection and make sure all services are running.');
    } else {
      console.error('Error message:', error.message);
      setError('An error occurred during registration. Please try again.');
    }
  }
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Side - Property Gallery Carousel */}
      <div className="w-full md:w-1/2 relative overflow-hidden">
        {/* Carousel Images */}
        {propertyImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${image.url}')` }}
            ></div>
            {/* Darker overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
          </div>
        ))}

        {/* Overlay Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
          {/* Top Quote */}
          <div className="text-white text-center md:text-left">
            <blockquote className="text-xl md:text-2xl font-light italic mb-4 max-w-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              "Success in real estate depends on your ability to connect with people."
            </blockquote>
            <cite className="text-sm text-gray-200" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>— Barbara Corcoran</cite>
          </div>

          {/* Center Content */}
          <div className="text-white max-w-lg mx-auto md:mx-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center md:text-left" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              {propertyImages[currentSlide].title}
            </h2>
            <p className="text-xl text-gray-100 mb-6 text-center md:text-left" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              {propertyImages[currentSlide].description}
            </p>
          </div>

          {/* Bottom Carousel Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {propertyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  ></button>
                ))}
              </div>
              <div className="text-sm text-gray-200" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                {currentSlide + 1} / {propertyImages.length}
              </div>
            </div>
            <div className="text-white text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              <p>© 2025 ACR-Estates. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide(currentSlide === 0 ? propertyImages.length - 1 : currentSlide - 1)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide(currentSlide === propertyImages.length - 1 ? 0 : currentSlide + 1)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Right Side - Agent Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Agent Account</h2>
            <p className="text-gray-600">Join our team of professional real estate agents</p>
          </div>

          {/* Display Success or Error Messages */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Agent Register Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
            <AgentRegisterForm onSubmit={handleSubmit} />
          </div>

          {/* Additional Links */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Already have an account?{' '}
              <Link to="/login" className="text-[#16A085] hover:text-[#2C3E50] font-medium transition-colors">
                Sign in
              </Link>
            </p>
            <p className="text-gray-600">
              Are you a customer?{' '}
              <Link to="/register" className="text-[#16A085] hover:text-[#2C3E50] font-medium transition-colors">
                Register as Customer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentRegister;