import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/NavBar.css';

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">DishCovery</Link>
      </div>

      <div className={`links ${isOpen ? 'active' : ''}`}>
        <Link to="/allRecipes" onClick={closeMenu}>Recipes</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
            <Link to="/login" onClick={closeMenu}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="welcome-text" onClick={closeMenu}>
              Dashboard
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      <div 
        className="menu-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '×' : '☰'}
      </div>
    </nav>
  );
};

export default NavBar;