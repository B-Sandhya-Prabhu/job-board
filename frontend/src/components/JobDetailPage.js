import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
import './JobDetailPage.css'; // Optional CSS file for styling

function JobDetailPage() {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null); // State to hold the job data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the job details based on the job ID
    axios
      .get(`http://localhost:5000/jobs/${id}`)
      .then((response) => {
        setJob(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load job details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="job-detail-container">
      {job && (
        <div className="job-detail-card">
          <h1 className="job-detail-title">{job.title}</h1>
          <p className="job-detail-company"><strong>Company:</strong> {job.company}</p>
          <p className="job-detail-location"><strong>Location:</strong> {job.location}</p>
          <p className="job-detail-description"><strong>Description:</strong> {job.description}</p>
          
          <h2>Candidate Details</h2>
          <ul>
            {job.candidates && job.candidates.length > 0 ? (
              job.candidates.map((candidate, index) => (
                <li key={index}>
                  <p><strong>Name:</strong> {candidate.name}</p>
                  <p><strong>Email:</strong> {candidate.email}</p>
                  <p><strong>Resume:</strong> <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                </li>
              ))
            ) : (
              <p>No candidates have applied for this job yet.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default JobDetailPage;
