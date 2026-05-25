import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // ✅ local backend
  withCredentials: true,
});

export default API;