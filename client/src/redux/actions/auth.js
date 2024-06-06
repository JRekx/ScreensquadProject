import axios from 'axios';
import { authenticateUser, unauthenticateUser } from '../slices/authSlice';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/login', credentials);
    console.log('Login response:', response.data); // Log the response
    dispatch(authenticateUser(response.data.user));
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('http://localhost:8000/api/auth/logout');
    dispatch(unauthenticateUser());
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
