import api from './api';

export const login = async (data) => {
  const response = await api.post('/auth/signin', data);
  return response.data;
};

export const register = async (data) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

// ✅ ADD THIS FUNCTION - IT'S MISSING!
export const registerAgent = async (agentData) => {
  try {
    console.log("Starting agent registration with data:", agentData);
    
    const formData = new FormData();
    
    // Prepare the agent data object
    const agentPayload = {
      name: agentData.name,
      email: agentData.email,
      password: agentData.password,
      phone: agentData.phone,
      adharNumber: agentData.adharNumber,
      experienceYears: parseInt(agentData.experienceYears) || 0,
      agencyName: agentData.agencyName,
      address: agentData.address,
      availableTimes: agentData.availableTimes || []
    };

    console.log("Agent payload:", agentPayload);
    
    // Add agent data as JSON string
    formData.append('data', JSON.stringify(agentPayload));
    
    // Add profile image if available
    if (agentData.profileImage && agentData.profileImage instanceof File) {
      formData.append('profileImage', agentData.profileImage);
      console.log("Profile image added to form data");
    }
    
    // NO Authorization header needed - registration is public
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    
    console.log("Making API call to /api/agents/createProfile");
    const response = await api.post('/agents/createProfile', formData, config);
    console.log("Agent registration response:", response.data);
    
    return response.data;
  } catch (error) {
    console.error('Agent registration service error:', error);
    
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    throw error;
  }
};

export const forgotPassword = async (data) => {
  const response = await api.post('/auth/forgot-password', data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};