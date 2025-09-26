import api from './api';

// export const createProperty = async (data, images) => {
//   const formData = new FormData();
//   formData.append('data', JSON.stringify(data));
//   images.forEach((file) => formData.append('images', file));
//   const response = await api.post('/properties', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   });
//   return response.data;
// };

// export const createProperty = async (data, images, documents) => {
//   const formData = new FormData();
//   formData.append('data', JSON.stringify(data));
//   images.forEach((file) => formData.append('images', file));
//   documents.forEach((file) => formData.append('documents', file));
 

//   const response = await api.post('/properties', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   });
//   return response.data;
// };

export const createProperty = async (values, images = [], documents = []) => {
  const formData = new FormData();

  // append property JSON as string
  formData.append("data", JSON.stringify({
    title: values.title,
    description: values.description,
    address: values.address,
    price: values.price,
    bedrooms: values.bedrooms,
    bathrooms: values.bathrooms,
    area: values.area,
    balcony: values.balcony,
    floor: values.floor,
    nearby: values.nearby,
    agentId: values.agentId,
    offerPercentage: values.offerPercentage,
    rented: values.rented,
    rentedBy: values.rentedBy,
    amenities: values.amenities || []
  }));

  // append images (multiple)
  if (images && images.length > 0) {
    images.forEach(img => {
      formData.append("images", img); // key must match @RequestPart
    });
  }

  // append documents (multiple)
  if (documents && documents.length > 0) {
    documents.forEach(doc => {
      formData.append("documents", doc); // key must match @RequestPart
    });
  }

  return await api.post("/properties", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};



export const getProperty = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const getProperties = async (params) => {
  const response = await api.get('/properties', { params });
  return response.data;
};

export const updateProperty = async (id, data, images) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  images.forEach((file) => formData.append('images', file));
  const response = await api.put(`/properties/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};

export const getMyProperties = async (userId) => {
  const response = await api.get(`/properties/my/${userId}`);
  return response.data;
};

export const getAgentProperties = async (agentId) => {
  const response = await api.get(`/properties/agent/${agentId}`);
  return response.data;
};