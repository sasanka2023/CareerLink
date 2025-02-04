import axios from 'axios';

const API_URL = 'http://localhost:8091/api/';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const initialToken = localStorage.getItem('token');
if (initialToken) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${initialToken}`;
}

export default axiosInstance;