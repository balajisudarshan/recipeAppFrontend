import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/NavBar.css';

const NavBar = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();


  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsOpen(false);
    console.log('logged out');
    navigate('/'); // redirect to home (or /login if you prefer)
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">DishCovery</Link>
      </div>

      <div className={`links ${isOpen ? "active" : ""}`}>
        <Link to="/allRecipes" onClick={() => setIsOpen(false)}>Recipes</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          </>
        ) : (
          <>
            <Link to ='/dashboard' className="welcome-text"> Dashboard</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>

          </>
        )}
      </div>

      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
    </nav>
  );
};

export default NavBar;
