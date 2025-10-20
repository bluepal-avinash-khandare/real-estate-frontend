


import React, { useState, useEffect } from 'react';
import Footer from '../components/common/Footer';

const Home = () => {
  // State for carousels
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProperty, setCurrentProperty] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Hero images
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      title: "Luxury Living Redefined",
      subtitle: "Discover exclusive properties in prime locations worldwide"
    },
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      title: "Your Dream Home Awaits",
      subtitle: "Find the perfect property that matches your lifestyle"
    },
    {
      url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      title: "Investment Opportunities",
      subtitle: "Premium real estate investments with high returns"
    }
  ];

  // Featured properties
  const featuredProperties = [
    {
      id: 1,
      name: "Oceanview Villa",
      location: "Malibu, California",
      price: "$8,500,000",
      type: "Villa",
      image: "https://cdn.pixabay.com/photo/2024/08/01/15/08/architecture-8937462_640.jpg",
      beds: 5,
      baths: 4,
      sqft: 4200
    },
    {
      id: 2,
      name: "Modern Penthouse",
      location: "Manhattan, New York",
      price: "$12,000,000",
      type: "Apartment",
      image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      beds: 3,
      baths: 3,
      sqft: 3500
    },
    {
      id: 3,
      name: "Beachfront Estate",
      location: "Miami Beach, Florida",
      price: "$15,000,000",
      type: "Estate",
      image: "https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg",
      beds: 6,
      baths: 5,
      sqft: 6800
    },
    {
      id: 4,
      name: "Mountain Retreat",
      location: "Aspen, Colorado",
      price: "$9,200,000",
      type: "Home",
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
      beds: 4,
      baths: 3,
      sqft: 5200
    },
    {
      id: 5,
      name: "City Penthouse",
      location: "San Francisco, California",
      price: "$7,800,000",
      type: "Penthouse",
      image: "https://images.pexels.com/photos/3709348/pexels-photo-3709348.jpeg",
      beds: 3,
      baths: 2,
      sqft: 2800
    },
    {
      id: 6,
      name: "Night View Estate",
      location: "Los Angeles, California",
      price: "$11,500,000",
      type: "Estate",
      image: "https://media.istockphoto.com/id/476870060/photo/modern-house-in-the-night-scene-3d-rendering.jpg?s=612x612&w=0&k=20&c=YQPveioKaKAtRisO8oYaeWN3zjga5oPsqyTgs3JToV4=",
      beds: 5,
      baths: 4,
      sqft: 5500
    }
  ];

  // Property types
  const propertyTypes = [
    {
      name: "Luxury Villas",
      description: "Exclusive villas with premium amenities and breathtaking views",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      count: 24
    },
    {
      name: "Modern Apartments",
      description: "Contemporary apartments in prime urban locations",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      count: 42
    },
    {
      name: "Beachfront Properties",
      description: "Stunning properties with direct beach access and ocean views",
      image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      count: 18
    },
    {
      name: "Mountain Homes",
      description: "Secluded mountain retreats with panoramic views",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      count: 15
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Investor",
      content: "ACR-Estates helped me find the perfect investment property. Their expertise and attention to detail are unmatched.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Michael Chen",
      role: "Home Buyer",
      content: "The team at ACR-Estates made the home buying process seamless. They understood exactly what we were looking for.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Emily Rodriguez",
      role: "Property Seller",
      content: "Sold my luxury villa in just 3 weeks with ACR-Estates. Their marketing strategy was brilliant!",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ];

  // Auto-rotate hero carousel
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(heroInterval);
  }, [heroImages.length]);

  // Auto-rotate property carousel
  useEffect(() => {
    const propertyInterval = setInterval(() => {
      setCurrentProperty((prev) => (prev === featuredProperties.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(propertyInterval);
  }, [featuredProperties.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(testimonialInterval);
  }, [testimonials.length]);

  // Hide scrollbar
  useEffect(() => {
    // Add style to hide scrollbar
    const style = document.createElement('style');
    style.innerHTML = `
      ::-webkit-scrollbar {
        display: none;
      }
      html {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section with Carousel - Full screen with proper positioning */}
      <section className="relative h-screen w-full overflow-hidden">
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${image.url}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
        ))}
        
        <div className="relative z-10 w-full h-full flex items-center justify-center text-white px-4">
          <div className="max-w-4xl text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in tracking-tight">
              {heroImages[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-10 animate-fade-in max-w-2xl mx-auto">
              {heroImages[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <button className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#1abc9c] hover:to-[#34495e] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-xl transform hover:-translate-y-1">
                Explore Properties
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Featured Properties Carousel - Full width section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of luxury properties from around the world
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative h-96 md:h-[500px]">
                {featuredProperties.map((property, index) => (
                  <div 
                    key={property.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentProperty ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="h-full flex flex-col md:flex-row">
                      <div className="md:w-1/2 h-full">
                        <img 
                          src={property.image} 
                          alt={property.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-4">
                          <span className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {property.type}
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">{property.name}</h3>
                        <p className="text-gray-600 mb-6 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-[#16A085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {property.location}
                        </p>
                        <div className="text-4xl font-bold text-[#16A085] mb-6">{property.price}</div>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">{property.beds}</div>
                            <div className="text-gray-600">Bedrooms</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">{property.baths}</div>
                            <div className="text-gray-600">Bathrooms</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">{property.sqft}</div>
                            <div className="text-gray-600">Sq. Ft.</div>
                          </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#1abc9c] hover:to-[#34495e] text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {featuredProperties.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentProperty(index)}
                  className={`w-3 h-3 rounded-full ${index === currentProperty ? 'bg-[#16A085]' : 'bg-gray-300'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Types Section - Full width with luxury styling */}
      <section className="py-20 bg-white w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Property Types</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse portfolio of luxury properties tailored to your lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {propertyTypes.map((type, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl shadow-lg h-64 mb-6">
                  <img 
                    src={type.image} 
                    alt={type.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{type.name}</h3>
                    <p className="text-gray-200">{type.count} Properties</p>
                  </div>
                </div>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel - Full width with luxury styling */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear what our satisfied clients have to say about their experience with ACR-Estates
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`transition-opacity duration-1000 ${index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute'}`}
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-24 h-24 rounded-full mb-6 md:mb-0 md:mr-8 object-cover"
                    />
                    <div className="text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xl text-gray-700 italic mb-6">"{testimonial.content}"</p>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{testimonial.name}</h4>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${index === currentTestimonial ? 'bg-[#16A085]' : 'bg-gray-300'}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Full width with luxury styling */}
      <section className="py-20 bg-gradient-to-r from-[#16A085] to-[#2C3E50] w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Find Your Dream Property?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-100">
            Let our expert team help you discover the perfect property that matches your lifestyle and investment goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#16A085] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1">
              Browse Properties
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-[#16A085] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
      
      {/* <Footer /> */}
    </div>
  );
};

export default Home;