// src/pages/About.js
import React from 'react';
import Footer from '../../components/common/Footer';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Ankit Kumar",
      role: "CEO & Founder",
      bio: "With over 20 years in luxury real estate, Alexandra leads our vision of redefining property experiences globally.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNmRSkwlgrftzYG835IizLGdB2zZt_-ATQxAzTdnpl5045gmhsMO7RNW10LJURfxPY90&usqp=CAU"
    },
    {
      name: "Chandan Kumar",
      role: "Chief Investment Strategist",
      bio: "Marcus brings unparalleled expertise in international property markets and investment opportunities.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNmRSkwlgrftzYG835IizLGdB2zZt_-ATQxAzTdnpl5045gmhsMO7RNW10LJURfxPY90&usqp=CAU"
    },
    {
      name: "Akriti Kumari",
      role: "Head of Luxury Properties",
      bio: "Akriti curates our exclusive portfolio of premium properties with an eye for detail and client satisfaction.",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
    },
    {
      name: "Dibya Ranjan mohanty",
      role: "Global Expansion Director",
      bio: "Dibya oversees our international presence and strategic partnerships across key global markets.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNmRSkwlgrftzYG835IizLGdB2zZt_-ATQxAzTdnpl5045gmhsMO7RNW10LJURfxPY90&usqp=CAU"
    }
  ];

  // Core values
  const coreValues = [
    {
      title: "Excellence",
      description: "We pursue perfection in every property we represent and every client relationship we build.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Integrity",
      description: "Transparency and honesty are the foundations of our business philosophy.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "We leverage cutting-edge technology and creative solutions to enhance real estate experiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Global Perspective",
      description: "Our international expertise allows us to serve clients across borders with local insight.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // Stats
  const stats = [
    { value: "25+", label: "Years of Excellence" },
    { value: "50+", label: "Global Locations" },
    { value: "10,000+", label: "Properties Sold" },
    { value: "98%", label: "Client Satisfaction" }
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About ACR-Estates</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Redefining luxury real estate experiences across the globe since 1998
            </p>
            <div className="w-24 h-1 bg-white mb-8"></div>
            <p className="text-lg max-w-2xl">
              We are an internationally renowned real estate firm specializing in premium properties, 
              investment opportunities, and personalized client service in the world's most desirable locations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 1998, ACR-Estates began as a boutique real estate firm with a vision to transform 
                  how people experience luxury property transactions. What started as a small team of passionate 
                  professionals has now grown into an international powerhouse with offices in over 50 countries.
                </p>
                <p className="text-gray-600 mb-6">
                  Our journey has been defined by our unwavering commitment to excellence, integrity, and innovation. 
                  We've built lasting relationships with clients who trust us to handle their most significant real 
                  estate investments and transactions.
                </p>
                <p className="text-gray-600">
                  Today, ACR-Estands at the forefront of the global luxury real estate market, setting standards 
                  for quality service and exceptional property offerings that others strive to emulate.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Luxury Real Estate" 
                    className="rounded-2xl shadow-xl w-full h-auto"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white p-6 rounded-xl shadow-lg max-w-xs">
                    <p className="font-bold text-lg">25+ Years</p>
                    <p>Of Global Real Estate Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#16A085] to-[#2C3E50] mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We exist to create exceptional real estate experiences that transform lives and build lasting value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To provide unparalleled real estate services that exceed client expectations through personalized attention, 
                  market expertise, and innovative solutions. We are committed to helping our clients achieve their property 
                  goals with integrity, professionalism, and discretion.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be the world's most trusted and innovative luxury real estate firm, setting new standards for 
                  excellence in property transactions and client experiences. We aim to transform the global real estate 
                  landscape through technology, sustainability, and unwavering commitment to quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#16A085] to-[#2C3E50] mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide every decision we make and every interaction we have.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-100 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#16A085]/10 to-[#2C3E50]/10 flex items-center justify-center mx-auto mb-4">
                    <div className="text-[#16A085]">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Leadership Team</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#16A085] to-[#2C3E50] mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the visionary leaders who guide ACR-Estates toward excellence and innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-[#16A085] font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the ACR-Estates Experience</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-100">
            Discover why discerning clients worldwide trust us with their most significant real estate investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#16A085] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1">
              Browse Properties
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-[#16A085] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
{/*       
      <Footer /> */}
    </div>
  );
};

export default About;