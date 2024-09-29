import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function CandidateDashboard() {
  return (
    <div className="homepage-background centered-grid-container">
      <h1>Candidate Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Go to Home</Link>
          </li>
          <li>
            <Link to="/jobs">View Job Listings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CandidateDashboard;
