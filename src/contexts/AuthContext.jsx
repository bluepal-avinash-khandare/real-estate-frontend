// import React, { createContext, useState, useEffect } from 'react';
// import { login, logout as authLogout } from '../services/authService';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const signIn = async (credentials) => {
//     const response = await login(credentials);
//     const userData = { ...response, role: response.role }; // Assume response has role
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', response.jwt);
//   };

//   const signOut = () => {
//     authLogout();
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ user, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


//************************* */
// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { login, logout as authLogout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const signIn = async (credentials) => {
    try {
      const response = await login(credentials);
      
      // Check the structure of the response and handle accordingly
      let userData;
      if (response.user) {
        // If response has a user property
        userData = { 
          ...response.user, 
          role: response.user.role || 'CUSTOMER', // Default to CUSTOMER if no role
          token: response.jwt 
        };
      } else {
        // If response is the user object directly
        userData = { 
          ...response, 
          role: response.role || 'CUSTOMER',
          token: response.jwt || response.token 
        };
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      
      return userData;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = () => {
    authLogout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      signIn, 
      signOut,
      isAdmin: user?.role === 'ADMIN',
      isAgent: user?.role === 'AGENT',
      isCustomer: user?.role === 'CUSTOMER'
    }}>
      {children}
    </AuthContext.Provider>
  );
};