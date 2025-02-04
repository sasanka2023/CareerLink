import React, { useState } from "react";
import "../../../styles/Modal.css"; // Using the same Modal CSS for consistency

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

    // Handlers for each input field (add if necessary)
    const handleTechChange = (e) => setTechnologies(e.target.value);
    const handleProductChange = (e) => setProducts(e.target.value);
    const handleClientsChange = (e) => setClients(e.target.value);

    // Handler for saving changes
    const handleSaveChanges = () => {
        // Collect all the data from the form
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

        // Here you can call your API to save the changes (e.g., POST request)
        console.log("Saving company details:", companyDetails);

        // Close the modal after saving
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                <div className="modal-form">
                    <h2>Update Company Details</h2>

                    {/* Company Name */}
                    <label>Company Name</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />

                    {/* Description */}
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                    />

                    {/* Location */}
                    <label>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    {/* Cover Photo */}
                    <label>Cover Photo</label>
                    <input
                        type="file"
                        onChange={(e) => setCoverPhoto(e.target.files[0])}
                    />

                    {/* Logo */}
                    <label>Logo</label>
                    <input
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                    />

                    {/* Technologies */}
                    <label>Technologies</label>
                    <div className="tech-stack-container">
                        <input
                            type="text"
                            value={technologies}
                            onChange={handleTechChange}
                        />
                        <button className="add-btn">Add</button>
                    </div>

                    {/* Products */}
                    <label>Products</label>
                    <div className="tech-stack-container">
                        <input
                            type="text"
                            value={products}
                            onChange={handleProductChange}
                        />
                        <button className="add-btn">Add</button>
                    </div>

                    {/* Client Logos */}
                    <label>Client Logos</label>
                    <div className="tech-stack-container">
                        <input
                            type="text"
                            value={clients}
                            onChange={handleClientsChange}
                        />
                        <button className="add-btn">Add</button>
                    </div>

                    {/* Contact Number */}
                    <label>Contact Number</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />

                    {/* Email */}
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Website */}
                    <label>Website</label>
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />

                    {/* Social Media Links */}
                    <label>Social Media Links (comma-separated)</label>
                    <input
                        type="text"
                        value={socialLinks}
                        onChange={(e) => setSocialLinks(e.target.value)}
                    />

                    {/* Save Changes Button */}
                    <button className="submit-btn" onClick={() => alert('Changes Saved')}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCompanyDetailsModal;
