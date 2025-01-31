import React, { useState } from 'react';
import JobApplicationForm from './JobApplicationForm';
import '../styles/Jobs.css'; // Adjusted path


function Jobs() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="job-card">
      <div className="job-header">
        <h2>Senior UI/UX Designer</h2>
        
        <button className="apply-btn" onClick={() => setIsFormOpen(true)}>Apply Now</button>
        
      </div>
      <div className="job-description">
        <h3>Job description</h3>
        <p>
          A UI/UX Engineer bridges the gap between design and development by ensuring a
          seamless and intuitive user experience (UX)<br/>
          combined with an aesthetically pleasing
          user interface (UI). They focus on creating interfaces that are functional, efficient,
          and enjoyable for users.
        </p>
      </div>
      <div className="job-requirements">
        <h3>Requirements</h3>
        <ul>
          <li>A bachelor’s degree in Computer Science</li>
          <li>Proficiency in HTML, CSS, and JavaScript is essential</li>
          <li>Knowledge of version control systems like Git</li>
          <li>Ability to create wireframes, mockups, and interactive designs</li>
          <li>Excellent communication skills</li>
        </ul>
      </div>
      {isFormOpen && <JobApplicationForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}

export default Jobs;