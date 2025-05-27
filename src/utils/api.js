import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-notes-34zd.onrender.com/api/auth',
});

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);
export const fetchUserData = (token) => API.post('/userData', { token });

