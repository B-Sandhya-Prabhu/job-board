import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
import './JobListingsPage.css'; // Importing the CSS file for styling

function JobListingsPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch jobs when the component mounts or search changes
  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs?q=${search}`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, [search]); // Trigger refetch on search change

  // Handle search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="listings-container">
      <h1 className="listings-title">Available Jobs</h1>
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by title, company, or location"
          className="search-input"
        />
      </div>

      <div className="job-listings">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h2 className="job-title">{job.title}</h2>
              <p className="job-company">{job.company}</p>
              <p className="job-location">{job.location}</p>
              <Link to={`/job/${job._id}`} className="job-link">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default JobListingsPage;
