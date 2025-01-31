import React, { useState } from 'react';
import '../styles/JobApplicationForm.css';

const JobApplicationForm = ({ onClose }) => {
  return (
    <div className="form-overlay">
      <div className="form-container">
        <b><h2>Job Application Form</h2></b>
        <form>
          <label>First Name</label>
          <input type="text" placeholder="Enter first name" required /><br/><br/>


          <label>Last Name</label>
          <input type="text" placeholder="Enter last name" required /><br/><br/>

          <label>Phone</label>
          <input type="tel" placeholder="Enter phone number" required /><br/><br/>
                    
          <label>Email</label>
          <input type="email" placeholder="Enter email" required /><br/><br/>

          <label>Address</label>
          <textarea placeholder="Enter address" required></textarea><br/><br/>

          <button type="submit">Submit</button>

          <button type="button" onClick={onClose} className="close-btn">Close</button>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;