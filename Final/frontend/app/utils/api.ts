import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual API URL

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Optional: Add interceptors for logging requests/responses
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);
