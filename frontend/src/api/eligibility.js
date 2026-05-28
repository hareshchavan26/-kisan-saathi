import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
});

export const checkEligibility = async (inputs) => {
  try {
    const response = await api.post('/api/eligibility/check', inputs);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSchemeDetails = async (id) => {
  try {
    const response = await api.get(`/api/schemes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
