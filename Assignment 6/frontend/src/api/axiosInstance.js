import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Required to send HTTP-only cookies with every request
});

export default axiosInstance;
