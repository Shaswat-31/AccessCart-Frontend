import axios from 'axios';

// Create axios instance
export const axiosi = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Request interceptor for debugging
axiosi.interceptors.request.use(
  (config) => {
    console.log('Request Config:', config); // Logs entire request configuration
    console.log('Request URL:', config.url); // Logs the URL of the request
    console.log('Request Method:', config.method); // Logs the request method (GET, POST, etc.)
    console.log('Request Headers:', config.headers); // Logs request headers
    console.log('Request Data:', config.data); // Logs request data (if any)
    return config;
  },
  (error) => {
    console.error('Request Error:', error); // Logs any request error
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
axiosi.interceptors.response.use(
  (response) => {
    console.log('Response:', response); // Logs entire response
    console.log('Response Data:', response.data); // Logs the actual response data
    console.log('Response Status:', response.status); // Logs the response status code
    return response;
  },
  (error) => {
    console.error('Response Error:', error); // Logs the error if the response fails
    if (error.response) {
      console.error('Error Response Status:', error.response.status); // Logs the status code of the error
      console.error('Error Response Data:', error.response.data); // Logs the error response data
    }
    return Promise.reject(error);
  }
);
