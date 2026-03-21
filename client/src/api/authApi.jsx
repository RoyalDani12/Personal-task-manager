import axios from 'axios';
import api from './api.Centeral';

const URL = 'http://localhost:5000/api/auth/register';

// Create a function that takes data and returns the axios promise
const registerUserAPI = (userData) => {
  return axios.post(URL, userData, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export default registerUserAPI;

export const loginAPI = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response; // Return the whole response object
  } catch (error) {
    // CRITICAL: Throw the error so the Frontend 'catch' block catches it
    throw error; 
  }
};