import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log('User data:', user); // Add this log

  // Add conditional rendering
  if (!user || Object.keys(user).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
