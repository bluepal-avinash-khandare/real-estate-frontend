// contexts/SidebarContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsVisible(true);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Adjust main content padding when sidebar is visible
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      if (isVisible && isExpanded) {
        mainElement.style.paddingLeft = '16rem'; // 64 * 0.25rem (w-64)
      } else if (isVisible && !isExpanded) {
        mainElement.style.paddingLeft = '5rem'; // 20 * 0.25rem (w-20)
      } else {
        mainElement.style.paddingLeft = '0';
      }
    }

    return () => {
      if (mainElement) {
        mainElement.style.paddingLeft = '0';
      }
    };
  }, [isVisible, isExpanded]);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SidebarContext.Provider value={{
      isVisible,
      isExpanded,
      isMobile,
       setIsExpanded,
      toggleSidebar,
      setIsVisible, 
      toggleExpand
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};