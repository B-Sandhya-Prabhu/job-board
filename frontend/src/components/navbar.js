import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import CSS for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Job Board</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/employer-dashboard">Employer Dashboard</Link></li>
        <li><Link to="/candidate-dashboard">Candidate Dashboard</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
