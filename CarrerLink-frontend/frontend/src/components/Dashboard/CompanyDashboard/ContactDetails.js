import React from "react";
import { FaEnvelope, FaGlobe, FaPhone } from "react-icons/fa";

const ContactUs = ({ contact }) => {
    return (
        <div className="contact-us-section">
            <div className="contact-us-header">
                <h2 className="contact-us-title">Contact Us</h2>
            </div>
            <div className="contact-details-container">
                <div className="contact-detail-item">
                    <FaPhone className="contact-icon" />
                    <span className="contact-text">{contact.phone}</span>
                </div>
                <div className="contact-detail-item">
                    <FaEnvelope className="contact-icon" />
                    <span className="contact-text">{contact.email}</span>
                </div>
                <div className="contact-detail-item">
                    <FaGlobe className="contact-icon" />
                    <span className="contact-text">{contact.website}</span>
                </div>
            </div>
            <button className="update-details-button">Update Details</button>
        </div>
    );
};

export default ContactUs;
