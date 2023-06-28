import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchPromotionsData = async () => {
  try {
    const response = await api.get('/promotions');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};