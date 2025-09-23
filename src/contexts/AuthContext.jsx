import React, { createContext, useState, useEffect } from 'react';
import { login, logout as authLogout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

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
    setLoading(false); // Set loading to false after checking
  }, []);

  const signIn = async (credentials) => {
    try {
      const response = await login(credentials);
      
      // Handle different response structures
      let userData;
      let token;
      
      if (response.user) {
        // If response has a user property
        userData = { 
          ...response.user, 
          role: response.user.role || 'CUSTOMER',
        };
        token = response.jwt || response.token;
      } else {
        // If response is the user object directly
        userData = { 
          ...response, 
          role: response.role || 'CUSTOMER',
        };
        token = response.jwt || response.token;
      }
      
      // Add token to user object
      userData.token = token;
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
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
      loading, // Provide loading state
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