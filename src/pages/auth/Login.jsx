// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import LoginForm from '../../components/forms/LoginForm';
// import { AuthContext } from '../../contexts/AuthContext';
// import { login } from '../../services/authService';

// const Login = () => {
//   const { signIn } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (values) => {
//     try {
//       const response = await login(values);
//       signIn(response);
//       navigate('/dashboard');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <LoginForm onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';
import { AuthContext } from '../../contexts/AuthContext';
import { login } from '../../services/authService';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Property images for the carousel
  const propertyImages = [
    {
      url: "https://media.istockphoto.com/id/185275043/photo/old-stone-house.jpg?b=1&s=612x612&w=0&k=20&c=z1Ro4Ciqjn2x7xHwpsLUIp97cWpj7s4o0yISGWPfk4U=",
      title: "Timeless Elegance",
      description: "Historic charm meets modern luxury in our exclusive stone properties"
    },
    {
      url: "https://cdn.pixabay.com/photo/2017/03/30/00/25/villa-2186914_640.jpg",
      title: "Mediterranean Paradise",
      description: "Breathtaking villas with panoramic views of azure coastlines"
    },
    {
      url: "https://media.istockphoto.com/id/2112749005/photo/modern-contemporary-style-small-wooden-terrace-in-lush-garden-with-house-interior-background.jpg?s=612x612&w=0&k=20&c=rtiD90a0nA3UpHfGsL1GnVG19GjIZd8H762MTgGcJug=",
      title: "Secluded Sanctuary",
      description: "Private retreats surrounded by lush landscapes and serene gardens"
    },
    {
      url: "https://media.istockphoto.com/id/1179737018/photo/were-in-the-house-mom-and-dad-are-imitating-a-roof-of-the-house-with-their-hands-while-their.jpg?s=612x612&w=0&k=20&c=UxnX0VNBl1AiFb3pxVZPn3YFApQUhK89DKT_PEvMUZg=",
      title: "Family Haven",
      description: "Spacious homes designed for creating lifelong memories with loved ones"
    },
    {
      url: "https://media.istockphoto.com/id/2148850507/photo/contemporary-urban-apartments-with-rooftop-greenery.jpg?s=612x612&w=0&k=20&c=N5JEzh21OtER3f3IHdxf-N8kWUJVll1eT4dmXdeRwPU=",
      title: "Urban Oasis",
      description: "Modern city living with rooftop gardens and sustainable design"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [propertyImages.length]);

  const handleSubmit = async (values) => {
    try {
      const response = await login(values);
      signIn(response);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
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
              "The best investment on Earth is earth."
            </blockquote>
            <cite className="text-sm text-gray-200" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>— Louis Glickman</cite>
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

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
            <LoginForm onSubmit={handleSubmit} />
          </div>

          {/* Additional Links */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#16A085] hover:text-[#2C3E50] font-medium transition-colors">
                Sign up
              </Link>
            </p>
            <Link to="/forgot-password" className="text-[#16A085] hover:text-[#2C3E50] text-sm font-medium transition-colors">
              Forgot your password?
            </Link>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;