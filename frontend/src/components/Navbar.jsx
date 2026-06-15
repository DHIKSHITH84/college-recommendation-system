import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/recommend', label: 'Get Recommendations' },
  { path: '/search', label: 'Search Colleges' },
  { path: '/compare', label: 'Compare' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/favorites', label: 'Favorites' },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">EAPCET Recommender</span>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={location.pathname === path ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
