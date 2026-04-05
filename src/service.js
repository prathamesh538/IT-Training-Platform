// import axios from 'axios';

// // Base URL for API calls - change this to your backend port
// const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// // Create axios instance with base URL
// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests if available
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Handle response errors
// apiClient.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );

// // GET request
// export const getRequest = async (endpoint) => {
//   try {
//     const response = await apiClient.get(endpoint);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// // POST request
// export const postRequest = async (endpoint, data) => {
//   try {
//     const response = await apiClient.post(endpoint, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// // PUT request
// export const putRequest = async (endpoint, data) => {
//   try {
//     const response = await apiClient.put(endpoint, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// // DELETE request
// export const deleteRequest = async (endpoint) => {
//   try {
//     const response = await apiClient.delete(endpoint);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// // PATCH request
// export const patchRequest = async (endpoint, data) => {
//   try {
//     const response = await apiClient.patch(endpoint, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export default apiClient;


export const Register = () => axios.post('http://localhost:9090/create-student', formData);