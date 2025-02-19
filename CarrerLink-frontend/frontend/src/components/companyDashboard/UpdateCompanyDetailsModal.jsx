import React, { useState } from "react";
import "../../styles/Modal.css";

const UpdateCompanyDetailsModal = ({ isOpen, onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [logo, setLogo] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [products, setProducts] = useState("");
  const [clients, setClients] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [socialLinks, setSocialLinks] = useState("");

  const handleSaveChanges = () => {
    const companyDetails = {
      companyName,
      description,
      location,
      coverPhoto,
      logo,
      technologies,
      products,
      clients,
      contactNumber,
      email,
      website,
      socialLinks,
    };
    console.log("Saving company details:", companyDetails);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <div className="modal-form">
          <h2>Update Company Details</h2>
          {/* Form fields for company details */}
          <button className="submit-btn" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCompanyDetailsModal;
