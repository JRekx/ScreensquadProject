import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuth && <Link to="/dashboard">Dashboard</Link>}
      {isAuth && <Link to="/profile">Profile</Link>}
      {!isAuth && <Link to="/login">Login</Link>}
      {!isAuth && <Link to="/register">Register</Link>}
    </nav>
  );
};

export default Navbar;
