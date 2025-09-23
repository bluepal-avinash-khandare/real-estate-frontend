import React from 'react';

const Footer = () => {
  // Current year for copyright
  const currentYear = new Date().getFullYear();

  // Property images with names
  const propertyImages = [
    { 
      url: "https://cdn.pixabay.com/photo/2024/08/01/15/08/architecture-8937462_640.jpg", 
      name: "Luxury Villa" 
    },
    { 
      url: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg", 
      name: "Modern Apartment" 
    },
    { 
      url: "https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg", 
      name: "Beachfront Property" 
    },
    { 
      url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg", 
      name: "Mountain Retreat" 
    },
    { 
      url: "https://images.pexels.com/photos/3709348/pexels-photo-3709348.jpeg", 
      name: "City Penthouse" 
    },
    { 
      url: "https://media.istockphoto.com/id/476870060/photo/modern-house-in-the-night-scene-3d-rendering.jpg?s=612x612&w=0&k=20&c=YQPveioKaKAtRisO8oYaeWN3zjga5oPsqyTgs3JToV4=", 
      name: "Night View Estate" 
    }
  ];

  return (
    <footer className="relative bg-[#1a1a1a] text-white mt-12">
      {/* Top Section with Background and Gallery */}
      <div className="relative py-16 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#16A085] flex items-center justify-center mr-4 shadow-lg transform hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="white"/>
                </svg>
              </div>
              <div>
                <span className="text-3xl font-bold text-white font-sans tracking-tight">ACR-Estates</span>
                <div className="text-sm text-gray-300 uppercase tracking-wider mt-1">Find Your Dream Home with Us</div>
              </div>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto text-base leading-relaxed">
              Discover exclusive properties worldwide with ACR-Estates. Your gateway to luxury living and premium real estate investments.
            </p>
          </div>
          
          {/* Property Gallery - Compact Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {propertyImages.map((property, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg h-28 transform transition-transform hover:scale-105">
                <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${property.url}')` }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium px-2 py-1 bg-black bg-opacity-60 rounded">{property.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-14 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold mb-5 text-white">ACR-Estates</h3>
              <p className="text-gray-400 text-base mb-6 leading-relaxed">
                Premier international real estate agency specializing in luxury properties.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center hover:bg-[#16A085] transition-colors shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center hover:bg-[#16A085] transition-colors shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center hover:bg-[#16A085] transition-colors shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.311-.623-.311-1.543c0-1.446.839-2.526 1.885-2.526.888 0 1.318.666 1.318 1.466 0 .893-.568 2.229-.861 3.467-.245 1.04.52 1.888 1.546 1.888 1.856 0 3.283-1.958 3.283-4.789 0-2.503-1.799-4.253-4.37-4.253-2.977 0-4.727 2.234-4.727 4.546 0 .9.347 1.863.781 2.387.085.104.098.195.072.301-.079.329-.254 1.037-.289 1.183-.047.196-.153.238-.353.144-1.314-.612-2.137-2.536-2.137-4.078 0-3.298 2.394-6.325 6.901-6.325 3.628 0 6.44 2.586 6.44 6.043 0 3.607-2.274 6.505-5.431 6.505-1.06 0-2.057-.552-2.396-1.209 0 0-.523 1.992-.65 2.479-.235.9-.871 2.028-1.297 2.717.976.301 2.018.461 3.096.461 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center hover:bg-[#16A085] transition-colors shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-5 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#16A085] transition-colors text-base flex items-center"><span className="w-1.5 h-1.5 bg-[#16A085] rounded-full mr-2"></span>Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A085] transition-colors text-base flex items-center"><span className="w-1.5 h-1.5 bg-[#16A085] rounded-full mr-2"></span>Properties</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A085] transition-colors text-base flex items-center"><span className="w-1.5 h-1.5 bg-[#16A085] rounded-full mr-2"></span>Agents</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A085] transition-colors text-base flex items-center"><span className="w-1.5 h-1.5 bg-[#16A085] rounded-full mr-2"></span>Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A085] transition-colors text-base flex items-center"><span className="w-1.5 h-1.5 bg-[#16A085] rounded-full mr-2"></span>About Us</a></li>
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <h3 className="text-lg font-bold mb-5 text-white">Property Types</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#16A085] transition-colors text-base flex items-center"><span className="w-1.5 h-1.5 bg-[#16A085] rounded-full mr-2"></span>Luxury Homes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A085] transition-colors text-base flex items-center"><span className="w-1.5 h-1.5 bg-[#16A085] rounded-full mr-2"></span>Apartments</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A085] transition-colors text-base flex items-center"><span className="w-1.5 h-1.5 bg-[#16A085] rounded-full mr-2"></span>Villas</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A085] transition-colors text-base flex items-center"><span className="w-1.5 h-1.5 bg-[#16A085] rounded-full mr-2"></span>Commercial</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#16A085] transition-colors text-base flex items-center"><span className="w-1.5 h-1.5 bg-[#16A085] rounded-full mr-2"></span>New Developments</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-5 text-white">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#16A085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-400 text-base">+91 7058470144</span>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#16A085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-400 text-base">info@acre-states.com</span>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#16A085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-400 text-base">Shiv bagh,Ameerpet,Hyderabad 500012</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-base mb-3 md:mb-0">
              © {currentYear} ACR-Estates. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-[#16A085] transition-colors text-base">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-[#16A085] transition-colors text-base">Terms</a>
              <a href="#" className="text-gray-500 hover:text-[#16A085] transition-colors text-base">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;