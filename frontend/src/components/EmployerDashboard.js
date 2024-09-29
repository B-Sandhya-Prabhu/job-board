import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import './EmployerDashboard.css'; 

function EmployerDashboard() {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/jobs', jobData)
      .then(response => {
        console.log('Job posted:', response.data);
        setJobData({
          title: '',
          company: '',
          location: '',
          description: ''
        });
      })
      .catch(error => {
        console.error('Error posting job:', error);
      });
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={jobData.company}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Job Location"
            value={jobData.location}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Job Description</label>
          <textarea
            name="description"
            placeholder="Job Description"
            value={jobData.description}
            onChange={handleChange}
            className="input-field description-field"
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Post Job</button>
      </form>
    </div>
  );
}

export default EmployerDashboard;
