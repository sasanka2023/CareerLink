import React from "react";

const CVList = ({ applicants, onDateChange }) => {
    return (
        <div className="cv-list-section">
            <h3 className="section-title">CV List</h3>
            <div className="cv-list-container">
                <h3 className="cv-list-title">Applicants</h3>
                <div className="applicants-container">
                    {applicants.map((applicant, index) => (
                        <div key={index} className="applicant-card">
                            <p className="applicant-name">
                                <strong>{applicant.name}</strong>
                            </p>
                            <p className="applicant-position">
                                Position: {applicant.position}
                            </p>
                            <button className="view-cv-button">View CV</button>
                            <div className="interview-date">
                                <label htmlFor={`interview-date-${index}`}>Interview Date:</label>
                                <input
                                    id={`interview-date-${index}`}
                                    type="date"
                                    value={applicant.interviewDate}
                                    onChange={(e) => onDateChange(index, e.target.value)}
                                    className="date-input"
                                />
                            </div>
                            <button className="approve-button">Approve</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CVList;
