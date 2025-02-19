import React, { useState } from "react";
import "../../../styles/Modal.css";

const Modal = ({ isOpen, onClose }) => {
    // States for the form fields
    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobType, setJobType] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [techStacks, setTechStacks] = useState([]);
    const [skills, setSkills] = useState([]);

    // Function to handle adding tech stack
    const handleAddTechStack = () => {
        if (techStacks.length < 5) {
            setTechStacks([...techStacks, ""]);
        }
    };

    // Function to handle adding skills
    const handleAddSkill = () => {
        if (skills.length < 5) {
            setSkills([...skills, ""]);
        }
    };

    // Function to handle changes in text inputs for tech stack or skills
    const handleChangeTechStack = (index, value) => {
        const updatedTechStacks = [...techStacks];
        updatedTechStacks[index] = value;
        setTechStacks(updatedTechStacks);
    };

    const handleChangeSkill = (index, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };
    const [techStack, setTechStack] = useState("");
    const [requiredSkills, setRequiredSkills] = useState("");
    // Handlers for adding tech stack and required skills
    const handleTechStackChange = (e) => setTechStack(e.target.value);
    const handleRequiredSkillsChange = (e) => setRequiredSkills(e.target.value);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    X
                </button>
                <form className="modal-form">
                    <h2>Add New Job Vacancy</h2>

                    <label>Job Title</label>
                    <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />

                    <label>Company Name</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

                    <label>Job Type</label>
                    <input type="text" value={jobType} onChange={(e) => setJobType(e.target.value)} />

                    <label>Description</label>
                    <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <label>Requirements</label>
                    <textarea rows="4" value={requirements} onChange={(e) => setRequirements(e.target.value)} />

                    {/* Tech Stack Section */}
                    <div className="tech-stack-container">
                        <input
                            type="text"
                            value={techStack}
                            onChange={handleTechStackChange}
                            placeholder="Enter Tech Stack"
                        />
                        <button className="add-btn">Add</button>
                    </div>

                    {/* Required Skills Section */}
                    <div className="skills-container">
                        <input
                            type="text"
                            value={requiredSkills}
                            onChange={handleRequiredSkillsChange}
                            placeholder="Enter Required Skills"
                        />
                        <button className="add-btn">Add</button>
                    </div>

                    <button type="submit" className="submit-btn">
                        Add Job
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
