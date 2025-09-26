// src/pages/auth/RegisterChoice.js
import React from 'react';
import { Link } from 'react-router-dom';

const RegisterChoice = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Side - Property Gallery Carousel */}
      <div className="w-full md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/185275043/photo/old-stone-house.jpg?b=1&s=612x612&w=0&k=20&c=z1Ro4Ciqjn2x7xHwpsLUIp97cWpj7s4o0yISGWPfk4U=')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
          {/* Top Quote */}
          <div className="text-white text-center md:text-left">
            <blockquote className="text-xl md:text-2xl font-light italic mb-4 max-w-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              "The secret to getting ahead is getting started."
            </blockquote>
            <cite className="text-sm text-gray-200" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>— Mark Twain</cite>
          </div>

          {/* Center Content */}
          <div className="text-white max-w-lg mx-auto md:mx-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center md:text-left" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              Join ACR-Estates
            </h2>
            <p className="text-xl text-gray-100 mb-6 text-center md:text-left" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              Find your dream property or start your real estate career
            </p>
          </div>

          {/* Bottom Info */}
          <div className="text-white text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            <p>© 2025 ACR-Estates. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Choice */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Choose your account type to get started</p>
          </div>

          <div className="space-y-6">
            {/* Customer Registration Option */}
            <Link
              to="/register"
              className="block w-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#1abc9c] hover:to-[#34495e] text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all duration-300 text-center"
            >
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xl">Customer Account</span>
                <p className="text-sm mt-1">Find and purchase properties</p>
              </div>
            </Link>

            {/* Agent Registration Option */}
            <Link
              to="/register-agent"
              className="block w-full bg-gradient-to-r from-[#2C3E50] to-[#16A085] hover:from-[#34495e] hover:to-[#1abc9c] text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all duration-300 text-center"
            >
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xl">Agent Account</span>
                <p className="text-sm mt-1">List and manage properties</p>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#16A085] hover:text-[#2C3E50] font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterChoice;