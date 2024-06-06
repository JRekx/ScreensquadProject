// components/Logout.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import { onLogout } from '../api/auth';

const Logout = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await onLogout();
      // Optionally clear any user data from the context or state
      history.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout} className='btn btn-secondary'>
      Logout
    </button>
  );
};

export default Logout;
