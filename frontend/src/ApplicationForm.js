import React, { useState } from 'react';
import axios from 'axios';

function ApplicationForm({ jobId }) {
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobId', jobId);

    await axios.post('http://localhost:5000/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Apply</button>
    </div>
  );
}

export default ApplicationForm;
