import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bloggingwebapp-d2o3.onrender.com', // ✅ local backend
  withCredentials: true,
});

export default API;