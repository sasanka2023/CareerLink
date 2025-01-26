import React, { useState } from "react";
import CompanyProfile from "../components/Dashboard/CompanyDashboard/CompanyProfile";
import AboutUs from "../components/Dashboard/CompanyDashboard/AboutUs";
import JobCard from "../components/Cards/JobCard";
import { FaEnvelope, FaGlobe, FaPhone } from "react-icons/fa";
import "../styles/CompanyDashboard.css";
import Modal from "../components/Dashboard/CompanyDashboard/AddJobVacancy";
import AddJobVacancy from "../components/Dashboard/CompanyDashboard/AddJobVacancy";
import "../styles/Modal.css";
import UpdateCompanyDetailsModal from "../components/Dashboard/CompanyDashboard/UpdateCompany";

const CompanyDashboardPage = () => {
    // State to manage company data
    const [companyData, setCompanyData] = useState({
        name: "TechCorp",
        description: "Innovative solutions for modern businesses.",
        about: "TechCorp specializes in developing cutting-edge technologies...",
        technologies: ["React", "Node.js", "MongoDB"],
        products: ["Product 1", "Product 2", "Product 3"],
        clients: ["Client 1", "Client 2"],
        jobVacancies: [
            {
                title: "Frontend Developer",
                type: "Full-time",
                description: "Build modern user interfaces with React.",
                requirements: ["2+ years of React experience", "Team player"],
                techStack: ["React", "JavaScript"],
                skills: ["Communication", "Problem-solving"],
            },
            {
                title: "Backend Developer",
                type: "Part-time",
                description: "Develop robust backend systems using Node.js.",
                requirements: ["2+ years of Node.js experience", "Database management"],
                techStack: ["Node.js", "MongoDB"],
                skills: ["Critical thinking", "API design"],
            },
        ],
        applicants: [
            {
                name: "John Doe",
                position: "Frontend Developer",
                interviewDate: "2025-01-25",
            },
        ],
        reviews: [
            { reviewer: "Alice", review: "Great company!", rating: 5 },
            { reviewer: "Bob", review: "Amazing support and services.", rating: 4 },
            { reviewer: "Charlie", review: "Could improve the delivery time.", rating: 3 },
            { reviewer: "Max", review: "Great company!", rating: 5 },
        ],
        contact: {
            phone: "+1234567890",
            website: "https://techcorp.com",
            email: "info@techcorp.com",
        },
    });

    // State for handling reviews pagination
    const [currentIndex, setCurrentIndex] = useState(0);
    const reviewsPerPage = 3;

    // Functions to handle various actions
    const handleAddJobClick = () => alert("Redirecting to Add Job Vacancy form...");
    const handleDateChange = (index, date) => {
        const updatedApplicants = [...companyData.applicants];
        updatedApplicants[index].interviewDate = date;
        setCompanyData({ ...companyData, applicants: updatedApplicants });
    };

    // Pagination functions for reviews
    const handleNext = () => {
        if (currentIndex + reviewsPerPage < companyData.reviews.length) {
            setCurrentIndex(currentIndex + reviewsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - reviewsPerPage);
        }
    };

    // Slice current reviews for pagination
    const currentReviews = companyData.reviews.slice(currentIndex, currentIndex + reviewsPerPage);

    // State to manage modal visibility for job vacancy and update details
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // Functions to handle opening and closing the modals
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    return (
        <div className="company-dashboard">
            {/* Company Profile Section */}
            <section className="company-profile">
                <CompanyProfile
                    name={companyData.name}
                    description={companyData.description}
                    profilePic={companyData.profilePic}
                    coverPic={companyData.coverPic}
                />
            </section>

            {/* About Us Section */}
            <section className="about-us-section">
                <AboutUs
                    about={companyData.about}
                    technologies={companyData.technologies}
                    products={companyData.products}
                    clients={companyData.clients}
                />
            </section>

            {/* Job Vacancies Section */}
            <section className="job-vacancies-section">
                <div className="job-vacancies-header">
                    <h2 className="job-vacancies-title">Job Vacancies</h2>
                    <button className="add-job-button" onClick={handleOpenModal}>
                        Add Job Vacancy
                    </button>
                </div>
                <div className="job-cards-container">
                    {companyData.jobVacancies.map((job, index) => (
                        <JobCard key={index} jobId={job} />
                    ))}
                </div>
            </section>

            {/* Modal for Add Job Vacancy */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <AddJobVacancy />
            </Modal>

            {/* Modal for Update Company Details */}
            <UpdateCompanyDetailsModal isOpen={isUpdateModalOpen} onClose={handleCloseUpdateModal} />

            {/* CV List Section */}
            <section className="cv-list-section">
                <h3 className="section-title">CV List</h3>
                <div className="cv-list-container">
                    <h3 className="cv-list-title">Applicants</h3>
                    <div className="applicants-container">
                        {companyData.applicants.map((applicant, index) => (
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
                                        onChange={(e) => handleDateChange(index, e.target.value)}
                                        className="date-input"
                                    />
                                </div>
                                <button className="approve-button">Approve</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* User Reviews Section */}
            <section className="user-reviews-section">
                <h3 className="section-title">User Reviews</h3>
                <div className="reviews-carousel">
                    <button
                        className="arrow-button"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                    >
                        &#8249;
                    </button>
                    <div className="reviews-container">
                        {currentReviews.map((review, index) => (
                            <div className="review-card" key={index}>
                                <div className="reviewer-name-rating">
                                    <p className="reviewer-name">{review.reviewer}</p>
                                    <p className="review-rating">{"⭐".repeat(review.rating)}</p>
                                </div>
                                <p className="review-text">{review.review}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        className="arrow-button"
                        onClick={handleNext}
                        disabled={currentIndex + reviewsPerPage >= companyData.reviews.length}
                    >
                        &#8250;
                    </button>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="contact-us-section">
                <div className="contact-us-header">
                    <h2 className="section-title">Contact Us</h2>
                </div>
                <div className="contact-details-container">
                    <div className="contact-detail-item">
                        <FaPhone className="contact-icon"/>
                        <span className="contact-text">{companyData.contact.phone}</span>
                    </div>
                    <div className="contact-detail-item">
                        <FaEnvelope className="contact-icon"/>
                        <span className="contact-text">{companyData.contact.email}</span>
                    </div>
                    <div className="contact-detail-item">
                        <FaGlobe className="contact-icon"/>
                        <span className="contact-text">{companyData.contact.website}</span>
                    </div>
                </div>
                <button className="update-details-button" onClick={handleOpenUpdateModal}>Update Details</button>
            </section>
        </div>
    );
};

export default CompanyDashboardPage;
